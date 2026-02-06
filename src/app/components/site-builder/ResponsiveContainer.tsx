import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { Monitor, Tablet, Smartphone } from 'lucide-react';
import { useTheme, generateThemeStyles } from './ThemeBuilder';
import { cn } from '../ui/utils';
import gsap from 'gsap';

interface ResponsiveContainerProps {
  children?: React.ReactNode;
  html?: string;
  className?: string;
  title?: string;
  onContentChange?: (key: string, content: string) => void;
  onClick?: () => void;
  onImageClick?: (imageId: string) => void;
  onNavLinkClick?: (url: string) => void;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({ 
  children, 
  html,
  className,
  title = "Component Preview",
  onContentChange,
  onClick,
  onImageClick,
  onNavLinkClick
}) => {
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const figmaContainerRef = useRef<HTMLDivElement>(null);
  const updateHeightRef = useRef<() => void>(() => {});
  const previousHtmlRef = useRef<string | undefined>(undefined);
  const { config } = useTheme();
  
  // Detect if we're in Figma environment
  const isFigmaEnvironment = typeof window !== 'undefined' && window.location.hostname.includes('figma.com');

  const handleInteraction = (target: HTMLElement, e: Event | React.MouseEvent | React.TouchEvent) => {
      // Check if an image with data-configurable-image was clicked
      if (target.tagName === 'IMG' && target.hasAttribute('data-configurable-image')) {
          e.stopPropagation();
          e.preventDefault();
          const imageId = target.getAttribute('data-configurable-image');
          if (imageId && onImageClick) {
              onImageClick(imageId);
              return;
          }
      }
      
      // Check if a navigation link was clicked
      const navLink = target.closest('a[data-nav-link="true"]') as HTMLAnchorElement | null;
      if (navLink) {
          e.stopPropagation();
          e.preventDefault();
          const href = navLink.getAttribute('href');
          if (href && onNavLinkClick) {
              onNavLinkClick(href);
              return;
          }
      }
      
      if (onClick) {
          onClick();
      }
  };

  // Handle interactions for iframe mode
  useEffect(() => {
    if (!mountNode) return;

    const handleBlur = (e: Event) => {
      if (!onContentChange) return;
      const target = e.target as HTMLElement;
      if (target.isContentEditable) {
        const key = target.getAttribute('data-key');
        if (key) {
          onContentChange(key, target.innerHTML);
        }
      }
    };
    
    const handleClick = (e: Event) => {
        handleInteraction(e.target as HTMLElement, e);
    };

    // We use capturing to ensure we catch the blur event
    mountNode.addEventListener('blur', handleBlur, true);
    
    // Forward key events to parent for navigation
    const handleKeyDown = (e: KeyboardEvent) => {
        const target = e.target as HTMLElement;
        if (target.isContentEditable || target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
            return;
        }

        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            try {
                window.parent.postMessage({
                    type: 'IFRAME_KEYDOWN',
                    key: e.key,
                    code: e.code,
                    shiftKey: e.shiftKey,
                    ctrlKey: e.ctrlKey,
                    metaKey: e.metaKey,
                    altKey: e.altKey
                }, '*');
            } catch (err) {
                // ignore
            }
        }
    };
    mountNode.addEventListener('keydown', handleKeyDown);

    // Listen for clicks on the body to handle selection
    mountNode.addEventListener('click', handleClick);
    mountNode.addEventListener('touchstart', handleClick, { passive: true });
    
    return () => {
      mountNode.removeEventListener('blur', handleBlur, true);
      mountNode.removeEventListener('keydown', handleKeyDown);
      mountNode.removeEventListener('click', handleClick);
      mountNode.removeEventListener('touchstart', handleClick);
    };
  }, [mountNode, onContentChange, onClick, onImageClick, onNavLinkClick]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      try {
        // Double check iframe availability
        if (!iframe || !iframe.contentWindow) return;
        
        const doc = iframe.contentDocument;
        if (!doc) return;

        // Ensure head exists (sometimes it might not in some envs)
        if (!doc.head) {
          try {
             const head = doc.createElement('head');
             if (doc.documentElement) {
               doc.documentElement.appendChild(head);
             } else {
               return; // Can't proceed without documentElement
             }
          } catch(e) {
             console.warn("Could not create head element", e);
             return; // Critical failure
          }
        }

        // Copy styles from main document - Wrap individually to prevent one failure stopping all
        const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'));
        styles.forEach(style => {
          try {
            // Check if style is valid
            if (style instanceof HTMLLinkElement && !style.href) return;
            // Additional safety for cross-origin sheets that might throw on access
            if (doc.head) {
              doc.head.appendChild(style.cloneNode(true));
            }
          } catch (e) {
            // Silent fail for individual styles
          }
        });

        // Inject custom styles for transparency and layout
        try {
            if (!doc.head) return;
            const customStyle = doc.createElement('style');
            customStyle.textContent = `
              body { 
                background-color: transparent; 
                margin: 0;
                padding: 0;
                min-height: 0;
                width: 100%;
                overflow: hidden;
              }
              /* Allow modal overlay to render on top */
              .session-modal-overlay {
                overflow-y: auto;
              }
              #root {
                width: 100%;
                min-height: 0;
              }
              builder-section {
                display: block;
                width: 100%;
                min-height: 0;
              }
            `;
            doc.head.appendChild(customStyle);
        } catch(e) {
            console.warn("Failed to inject custom styles", e);
        }

        // Only set mountNode if we have a valid body
        if (doc.body) {
          setMountNode(doc.body);
        }
      } catch (error) {
        console.error('Error setting up iframe:', error);
      }
    };

    // Add delay to ensure iframe is ready in Figma environment
    const setupTimer = setTimeout(() => {
        try {
            const contentDocument = iframe.contentDocument;
            if (contentDocument && contentDocument.readyState === 'complete') {
                handleLoad();
            } else {
                iframe.addEventListener('load', handleLoad);
            }
        } catch (e) {
             console.warn("Error checking iframe state:", e);
        }
    }, 0);

    return () => {
      clearTimeout(setupTimer);
      iframe.removeEventListener('load', handleLoad);
    };
  }, []);

  // Inject HTML directly into iframe if provided
  useEffect(() => {
    if (!mountNode || !html) return;
    
    // Skip re-injection if HTML content hasn't changed - prevents flickering during reordering
    const htmlChanged = previousHtmlRef.current !== html;
    previousHtmlRef.current = html;
    
    // Store the current height before resetting - this helps prevent flickering
    // when re-rendering with the same content (e.g., during block reordering)
    const previousHeight = iframeRef.current?.offsetHeight || 0;
    
    // If HTML hasn't changed, just ensure height is correct and return
    if (!htmlChanged && previousHeight > 50) {
        // Still trigger height update in case something changed externally
        setTimeout(() => updateHeightRef.current(), 50);
        return;
    }
    
    // Reset height to allow shrinking (Hug contents behavior)
    // But use 'auto' instead of '1px' to prevent content from being cut off
    if (iframeRef.current) {
        iframeRef.current.style.height = 'auto';
        iframeRef.current.style.minHeight = `${Math.max(50, previousHeight)}px`;
    }
    
        try {
            // Safety check if mountNode is still valid
            if (mountNode && mountNode.isConnected) {
                // Validate HTML before setting
                if (typeof html !== 'string') {
                    console.error('Invalid HTML type:', typeof html);
                    return;
                }
                
                // Try to detect problematic content
                if (html.includes('<script') && !html.includes('</script>')) {
                    console.error('Unclosed script tag detected');
                    mountNode.innerHTML = '<div class="p-4 text-red-500 bg-red-50">Invalid HTML: Unclosed script tag</div>';
                    return;
                }
                
                mountNode.innerHTML = html;
                
                // --- Session Detail Modal Handler (applies to all agenda blocks) ---
                const setupSessionModal = (sectionContainer: Element) => {
                    const overlay = sectionContainer.querySelector('.session-modal-overlay') as HTMLElement;
                    if (!overlay) return;

                    const closeModal = () => {
                        overlay.style.display = 'none';
                    };

                    const openModal = (el: HTMLElement) => {
                        const title = el.getAttribute('data-session-title') || '';
                        const time = el.getAttribute('data-session-time') || '';
                        const day = el.getAttribute('data-session-day') || '';
                        const location = el.getAttribute('data-session-location') || '';
                        const type = el.getAttribute('data-session-type') || '';
                        const desc = el.getAttribute('data-session-desc') || '';
                        const speakersRaw = el.getAttribute('data-session-speakers') || '';

                        const badgeEl = overlay.querySelector('.session-modal-badge') as HTMLElement;
                        const titleEl = overlay.querySelector('.session-modal-title') as HTMLElement;
                        const timeEl = overlay.querySelector('.session-modal-time') as HTMLElement;
                        const locationEl = overlay.querySelector('.session-modal-location') as HTMLElement;
                        const descEl = overlay.querySelector('.session-modal-desc') as HTMLElement;
                        const speakersSection = overlay.querySelector('.session-modal-speakers-section') as HTMLElement;
                        const speakersContainer = overlay.querySelector('.session-modal-speakers') as HTMLElement;

                        if (badgeEl) badgeEl.textContent = type;
                        if (titleEl) titleEl.textContent = title;
                        if (timeEl) timeEl.textContent = `${time} \u00B7 ${day}`;
                        if (locationEl) locationEl.textContent = location;
                        if (descEl) descEl.textContent = desc;

                        if (speakersContainer && speakersSection) {
                            const speakers = speakersRaw.split(',').filter(Boolean);
                            if (speakers.length > 0) {
                                speakersSection.style.display = 'block';
                                speakersContainer.innerHTML = speakers.map(initials => `
                                    <div style="display:flex; align-items:center; gap:12px;">
                                        <div style="width:32px; height:32px; border-radius:50%; background:var(--muted); display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                                            <span style="font-size:12px; font-weight:600; color:var(--muted-foreground); font-family:var(--font-sans);">${initials.trim()}</span>
                                        </div>
                                        <span style="font-size:14px; font-weight:500; color:var(--foreground); font-family:var(--font-sans);">Speaker ${initials.trim()}</span>
                                    </div>
                                `).join('');
                            } else {
                                speakersSection.style.display = 'none';
                            }
                        }

                        overlay.style.display = 'block';
                    };

                    // Close on overlay click
                    overlay.addEventListener('click', (e: Event) => {
                        const target = e.target as HTMLElement;
                        if (target === overlay || target.closest('.session-modal-close')) {
                            closeModal();
                        }
                    });

                    // Close on Escape
                    const doc = overlay.ownerDocument;
                    doc.addEventListener('keydown', (e: KeyboardEvent) => {
                        if (e.key === 'Escape' && overlay.style.display !== 'none') {
                            closeModal();
                        }
                    });

                    // Session item click delegation
                    sectionContainer.addEventListener('click', (e: Event) => {
                        const target = e.target as HTMLElement;
                        // Don't open modal if user is editing text
                        if (target.isContentEditable || target.closest('[contenteditable="true"]')) return;
                        const sessionEl = target.closest('[data-session-click]') as HTMLElement;
                        if (sessionEl) {
                            openModal(sessionEl);
                        }
                    });

                    // Keyboard support
                    sectionContainer.addEventListener('keydown', (e: KeyboardEvent) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            const target = e.target as HTMLElement;
                            const sessionEl = target.closest('[data-session-click]') as HTMLElement;
                            if (sessionEl) {
                                e.preventDefault();
                                openModal(sessionEl);
                            }
                        }
                    });
                };

                // Apply session modal to all builder-sections that have one
                const allSections = mountNode.querySelectorAll('builder-section');
                allSections.forEach((section: Element) => {
                    if (section.querySelector('.session-modal-overlay')) {
                        setupSessionModal(section);
                    }
                });

                // Setup event listeners for agenda day tabs
                const agendaSection = mountNode.querySelector('builder-section[data-active-day]');
                if (agendaSection) {
                    // Initialize active day attribute
                    if (!agendaSection.hasAttribute('data-active-day')) {
                        agendaSection.setAttribute('data-active-day', '0');
                    }
                    
                    // Add click event delegation for tab buttons
                    const handleTabClick = (e: Event) => {
                        const target = e.target as HTMLElement;
                        const tabBtn = target.closest('.tab-btn');
                        if (tabBtn) {
                            const tabIndex = tabBtn.getAttribute('data-tab-index');
                            if (tabIndex !== null) {
                                const dayIndex = parseInt(tabIndex, 10);
                                
                                // Update data-active-day attribute
                                agendaSection.setAttribute('data-active-day', tabIndex);
                                
                                // Update tab styles
                                const allTabs = agendaSection.querySelectorAll('.tab-btn');
                                allTabs.forEach((tab, idx) => {
                                    if (idx === dayIndex) {
                                        tab.classList.add('border-foreground', 'text-foreground');
                                        tab.classList.remove('border-transparent', 'text-muted-foreground');
                                    } else {
                                        tab.classList.remove('border-foreground', 'text-foreground');
                                        tab.classList.add('border-transparent', 'text-muted-foreground');
                                    }
                                });
                                
                                // Show/hide panels
                                const allPanels = agendaSection.querySelectorAll('.tab-panel');
                                allPanels.forEach((panel, idx) => {
                                    (panel as HTMLElement).style.display = idx === dayIndex ? 'block' : 'none';
                                });
                                
                                // Notify parent window about day change
                                try {
                                    window.parent.postMessage({
                                        type: 'AGENDA_DAY_CHANGED',
                                        blockId: agendaSection.id,
                                        activeDay: dayIndex
                                    }, '*');
                                } catch (err) {
                                    console.warn('Failed to post message:', err);
                                }
                            }
                        }
                    };
                    
                    agendaSection.addEventListener('click', handleTabClick);
                    
                    // Add search functionality
                    const searchInput = agendaSection.querySelector('input[data-search-input]');
                    if (searchInput) {
                        const handleSearch = () => {
                            const searchTerm = (searchInput as HTMLInputElement).value.toLowerCase();
                            const allSessions = agendaSection.querySelectorAll('.session-item');
                            
                            allSessions.forEach((session) => {
                                const titleEl = session.querySelector('h4');
                                const descEl = session.querySelector('p');
                                const titleText = titleEl ? titleEl.textContent : null;
                                const descText = descEl ? descEl.textContent : null;
                                const title = titleText ? titleText.toLowerCase() : '';
                                const desc = descText ? descText.toLowerCase() : '';
                                const matchesSearch = title.includes(searchTerm) || desc.includes(searchTerm);
                                
                                (session as HTMLElement).style.display = matchesSearch ? 'flex' : 'none';
                            });
                            
                            // Show empty state if needed
                            const allPanels = agendaSection.querySelectorAll('.tab-panel');
                            allPanels.forEach((panel) => {
                                const visibleSessions = Array.from(panel.querySelectorAll('.session-item')).filter(
                                    (s) => (s as HTMLElement).style.display !== 'none'
                                );
                                let emptyState = panel.querySelector('.empty-state');
                                
                                if (visibleSessions.length === 0 && !emptyState && searchTerm) {
                                    const sessionsList = panel.querySelector('.sessions-list');
                                    if (sessionsList) {
                                        const emptyDiv = document.createElement('div');
                                        emptyDiv.className = 'empty-state text-center py-8 text-muted-foreground font-sans';
                                        emptyDiv.innerHTML = `<p>No sessions found matching "${searchTerm}"</p>`;
                                        sessionsList.insertAdjacentElement('afterend', emptyDiv);
                                    }
                                } else if (visibleSessions.length > 0 && emptyState) {
                                    emptyState.remove();
                                }
                            });
                        };
                        
                        searchInput.addEventListener('input', handleSearch);
                    }
                }
            }
        } catch (e) {
            console.error("Error setting iframe content:", e);
            // Set a fallback error message
            try {
                if (mountNode && mountNode.isConnected) {
                    mountNode.innerHTML = '<div class="p-4 text-red-500 bg-red-50">Error rendering block content</div>';
                }
            } catch (fallbackError) {
                console.error("Failed to set error message:", fallbackError);
            }
        }
        
        // Force height update immediately after content change
        updateHeightRef.current();
        
        // Clear minHeight after content is set to allow proper resizing
        if (iframeRef.current) {
            iframeRef.current.style.minHeight = '';
        }
    
    // Double check after a short delay to catch any layout shifts
    setTimeout(() => updateHeightRef.current(), 50);
    // Additional check for cases where ResizeObserver doesn't fire
    setTimeout(() => updateHeightRef.current(), 150);
  }, [html, mountNode]);

  // Sync theme variables
  useEffect(() => {
    if (!mountNode) return;
    
    try {
      const themeStyles = generateThemeStyles(config);
      const body = mountNode as HTMLElement;
      
      Object.entries(themeStyles).forEach(([key, value]) => {
        try {
          body.style.setProperty(key, value as string);
        } catch (e) {
          console.warn(`Failed to set CSS property ${key}:`, e);
        }
      });

      if (config.isDarkMode) {
        body.classList.add('dark');
      } else {
        body.classList.remove('dark');
      }
    } catch (error) {
      console.error('Error syncing theme variables to iframe:', error);
    }
  }, [config, mountNode]);

  // Auto-resize height based on content
  useEffect(() => {
    // If we're in simplified mode (isFigmaEnvironment && html), we don't use this resize logic
    // because we render a div that autosizes.
    // However, we must not return early from the HOOK itself, but inside.
    if (isFigmaEnvironment && html) return;
    
    if (!mountNode || !iframeRef.current) return;

    // Use a flag to prevent updates if component unmounted
    let isMounted = true;

    const updateHeight = () => {
      if (!isMounted) return;
      
      requestAnimationFrame(() => {
          if (!isMounted || !mountNode || !iframeRef.current) return;
          
          try {
              // Prevent loop: Don't reset to 'auto'. 
              // Just measure content and expand/shrink if needed.
              // Note: This means 'min-height: 100vh' content might not shrink if it was previously expanded,
              // but this prevents Critical ResizeObserver loops in restricted environments like Figma.
              
              const currentHeight = iframeRef.current.offsetHeight;

              let contentHeight = 0;
              for (const child of Array.from(mountNode.children)) {
                contentHeight += (child as HTMLElement).offsetHeight;
              }

              contentHeight = Math.min(contentHeight, mountNode.scrollHeight);
              
              // Validate contentHeight to prevent Infinity (but allow 0 as it might be transitional)
              if (!Number.isFinite(contentHeight)) return;
              
              // If content height is 0, schedule a retry as the DOM might still be initializing
              if (contentHeight === 0) {
                  setTimeout(updateHeight, 100);
                  return;
              }

              // Threshold of 4px to avoid micro-adjustments and loops
              if (Math.abs(currentHeight - contentHeight) > 4) {
                 // Double check connectivity to avoid "Unknown runtime error" in some environments
                 if (iframeRef.current && iframeRef.current.isConnected && iframeRef.current.style) {
                     iframeRef.current.style.height = `${contentHeight}px`;
                 }
              }
          } catch (e) {
              // Ignore resize errors silently
          }
      });
    };
    
    updateHeightRef.current = updateHeight;

    // Initial calculation with delay
    const initialTimer = setTimeout(updateHeight, 100);

    // Use try-catch for observer creation in case it's not supported or restricted
    let resizeObserver: ResizeObserver | null = null;
    let mutationObserver: MutationObserver | null = null;

    try {
        if (typeof ResizeObserver !== 'undefined') {
            resizeObserver = new ResizeObserver(() => {
                // Wrap in another RAF to break any synchronous loop
                if (isMounted) {
                    requestAnimationFrame(updateHeight);
                }
            });
            
            if (mountNode && mountNode.isConnected) {
                resizeObserver.observe(mountNode);
            }
        }
    } catch (e) {
        console.warn("ResizeObserver not available or failed:", e);
    }

    try {
        if (typeof MutationObserver !== 'undefined') {
            mutationObserver = new MutationObserver(() => {
                // Throttle mutations
                if (isMounted) {
                    requestAnimationFrame(updateHeight);
                }
            });
            
            if (mountNode && mountNode.isConnected) {
                mutationObserver.observe(mountNode, { subtree: true, childList: true, attributes: true });
            }
        }
    } catch (e) {
        console.warn("MutationObserver not available or failed:", e);
    }

    return () => {
      isMounted = false;
      clearTimeout(initialTimer);
      
      try {
        if (resizeObserver) {
          resizeObserver.disconnect();
        }
      } catch (e) {
        // Ignore disconnect errors
      }
      
      try {
        if (mutationObserver) {
          mutationObserver.disconnect();
        }
      } catch (e) {
        // Ignore disconnect errors
      }
    };
  }, [mountNode, isFigmaEnvironment, html]);

  // GSAP Animations
  useEffect(() => {
    if (!mountNode || !config.animationPreset || config.animationPreset === 'none') return;
    
    // Disable animations in Figma environment to prevent runtime errors
    if (typeof window !== 'undefined' && window.location.hostname.includes('figma.com')) {
      return;
    }
    
    // Check if we are currently editing (don't animate if user is typing)
    const activeElement = document.activeElement;
    if (activeElement && activeElement.getAttribute('contenteditable') === 'true') {
        return;
    }

    // Small delay to ensure DOM is ready and painted
    const timer = setTimeout(() => {
        try {
            // Check if GSAP is available
            if (typeof gsap === 'undefined') return;

            const ctx = gsap.context(() => {
                const targets = mountNode.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, button, img');
                
                if (targets.length === 0) return;

                // Kill existing animations on these targets to prevent conflicts
                gsap.killTweensOf(targets);
                
                // Reset to initial state (remove inline styles from previous animations)
                gsap.set(targets, { clearProps: 'all' });

                let fromVars: any = { 
                    duration: 0.8, 
                    stagger: 0.05, 
                    ease: "power2.out",
                    clearProps: "all" // Clear props after animation so it doesn't interfere with editing/layout
                };

                switch (config.animationPreset) {
                    case 'fade':
                        fromVars.opacity = 0;
                        break;
                    case 'slide-up':
                        fromVars.y = 30;
                        fromVars.opacity = 0;
                        break;
                    case 'scale':
                        fromVars.scale = 0.9;
                        fromVars.opacity = 0;
                        break;
                    default:
                        return;
                }

                gsap.from(targets, fromVars);

            }, mountNode); 

            return () => ctx.revert();
        } catch (error) {
            console.warn('GSAP animation failed:', error);
        }
    }, 100);

    return () => clearTimeout(timer);

  }, [mountNode, html, config.animationPreset]);

  // Setup event listeners for Figma environment (when using dangerouslySetInnerHTML)
  useEffect(() => {
    if (!isFigmaEnvironment || !html || !figmaContainerRef.current) return;
    
    try {
      const container = figmaContainerRef.current;

      // --- Session Detail Modal Handler for Figma mode ---
      const setupFigmaSessionModal = (containerEl: Element) => {
          const overlay = containerEl.querySelector('.session-modal-overlay') as HTMLElement;
          if (!overlay) return;

          const closeModal = () => { overlay.style.display = 'none'; };

          const openModal = (el: HTMLElement) => {
              const title = el.getAttribute('data-session-title') || '';
              const time = el.getAttribute('data-session-time') || '';
              const day = el.getAttribute('data-session-day') || '';
              const location = el.getAttribute('data-session-location') || '';
              const type = el.getAttribute('data-session-type') || '';
              const desc = el.getAttribute('data-session-desc') || '';
              const speakersRaw = el.getAttribute('data-session-speakers') || '';

              const badgeEl = overlay.querySelector('.session-modal-badge') as HTMLElement;
              const titleEl = overlay.querySelector('.session-modal-title') as HTMLElement;
              const timeEl = overlay.querySelector('.session-modal-time') as HTMLElement;
              const locationEl = overlay.querySelector('.session-modal-location') as HTMLElement;
              const descEl = overlay.querySelector('.session-modal-desc') as HTMLElement;
              const speakersSection = overlay.querySelector('.session-modal-speakers-section') as HTMLElement;
              const speakersContainer = overlay.querySelector('.session-modal-speakers') as HTMLElement;

              if (badgeEl) badgeEl.textContent = type;
              if (titleEl) titleEl.textContent = title;
              if (timeEl) timeEl.textContent = `${time} \u00B7 ${day}`;
              if (locationEl) locationEl.textContent = location;
              if (descEl) descEl.textContent = desc;

              if (speakersContainer && speakersSection) {
                  const speakers = speakersRaw.split(',').filter(Boolean);
                  if (speakers.length > 0) {
                      speakersSection.style.display = 'block';
                      speakersContainer.innerHTML = speakers.map(initials => `
                          <div style="display:flex; align-items:center; gap:12px;">
                              <div style="width:32px; height:32px; border-radius:50%; background:var(--muted); display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                                  <span style="font-size:12px; font-weight:600; color:var(--muted-foreground); font-family:var(--font-sans);">${initials.trim()}</span>
                              </div>
                              <span style="font-size:14px; font-weight:500; color:var(--foreground); font-family:var(--font-sans);">Speaker ${initials.trim()}</span>
                          </div>
                      `).join('');
                  } else {
                      speakersSection.style.display = 'none';
                  }
              }
              overlay.style.display = 'block';
          };

          overlay.addEventListener('click', (e) => {
              const target = e.target as HTMLElement;
              if (target === overlay || target.closest('.session-modal-close')) closeModal();
          });
          document.addEventListener('keydown', (e) => {
              if (e.key === 'Escape' && overlay.style.display !== 'none') closeModal();
          });
          containerEl.addEventListener('click', (e) => {
              const target = e.target as HTMLElement;
              if (target.isContentEditable || target.closest('[contenteditable="true"]')) return;
              const sessionEl = target.closest('[data-session-click]') as HTMLElement;
              if (sessionEl) openModal(sessionEl);
          });
          containerEl.addEventListener('keydown', (e: Event) => {
              const ke = e as KeyboardEvent;
              if (ke.key === 'Enter' || ke.key === ' ') {
                  const target = ke.target as HTMLElement;
                  const sessionEl = target.closest('[data-session-click]') as HTMLElement;
                  if (sessionEl) { ke.preventDefault(); openModal(sessionEl); }
              }
          });
      };

      // Apply session modal to all builder-sections (runs for both clean list and grid)
      const allFigmaSections = container.querySelectorAll('builder-section');
      allFigmaSections.forEach((section: Element) => {
          if (section.querySelector('.session-modal-overlay')) {
              setupFigmaSessionModal(section);
          }
      });

      const agendaSection = container.querySelector('builder-section[data-active-day]');
      
      if (!agendaSection) return;
      
      // Initialize active day attribute
      if (!agendaSection.hasAttribute('data-active-day')) {
        agendaSection.setAttribute('data-active-day', '0');
      }
      
      // Tab click handler
      const handleTabClick = (e) => {
        try {
          const target = e.target;
          const tabBtn = target.closest('.tab-btn');
          if (tabBtn) {
            const tabIndex = tabBtn.getAttribute('data-tab-index');
            if (tabIndex !== null) {
              const dayIndex = parseInt(tabIndex, 10);
              
              agendaSection.setAttribute('data-active-day', tabIndex);
              
              // Update tab styles
              const allTabs = agendaSection.querySelectorAll('.tab-btn');
              allTabs.forEach((tab, idx) => {
                if (idx === dayIndex) {
                  tab.classList.add('border-foreground', 'text-foreground');
                  tab.classList.remove('border-transparent', 'text-muted-foreground');
                } else {
                  tab.classList.remove('border-foreground', 'text-foreground');
                  tab.classList.add('border-transparent', 'text-muted-foreground');
                }
              });
              
              // Show/hide panels
              const allPanels = agendaSection.querySelectorAll('.tab-panel');
              allPanels.forEach((panel, idx) => {
                panel.style.display = idx === dayIndex ? 'block' : 'none';
              });
              
              // Notify parent window about day change
              if (window.parent) {
                try {
                  window.parent.postMessage({
                    type: 'AGENDA_DAY_CHANGED',
                    blockId: agendaSection.id,
                    activeDay: dayIndex
                  }, '*');
                } catch (err) {
                  // Ignore postMessage errors
                }
              }
            }
          }
        } catch (err) {
          console.warn('Tab click handler error:', err);
        }
      };
      
      agendaSection.addEventListener('click', handleTabClick);
      
      // Search handler
      const searchInput = agendaSection.querySelector('input[data-search-input]');
      if (searchInput) {
        const handleSearch = () => {
          try {
            const searchTerm = searchInput.value.toLowerCase();
            const allSessions = agendaSection.querySelectorAll('.session-item');
            
            allSessions.forEach((session) => {
              const titleEl = session.querySelector('h4');
              const descEl = session.querySelector('p');
              const titleText = titleEl ? titleEl.textContent : null;
              const descText = descEl ? descEl.textContent : null;
              const title = titleText ? titleText.toLowerCase() : '';
              const desc = descText ? descText.toLowerCase() : '';
              const matchesSearch = title.includes(searchTerm) || desc.includes(searchTerm);
              
              session.style.display = matchesSearch ? 'flex' : 'none';
            });
            
            // Show empty state if needed
            const allPanels = agendaSection.querySelectorAll('.tab-panel');
            allPanels.forEach((panel) => {
              const sessionsList = Array.from(panel.querySelectorAll('.session-item'));
              const visibleSessions = sessionsList.filter((s) => s.style.display !== 'none');
              let emptyState = panel.querySelector('.empty-state');
              
              if (visibleSessions.length === 0 && !emptyState && searchTerm) {
                const sessionsListEl = panel.querySelector('.sessions-list');
                if (sessionsListEl) {
                  const emptyDiv = document.createElement('div');
                  emptyDiv.className = 'empty-state text-center py-8 text-muted-foreground font-sans';
                  emptyDiv.innerHTML = '<p>No sessions found matching "' + searchTerm + '"</p>';
                  sessionsListEl.insertAdjacentElement('afterend', emptyDiv);
                }
              } else if (visibleSessions.length > 0 && emptyState) {
                emptyState.remove();
              }
            });
          } catch (err) {
            console.warn('Search handler error:', err);
          }
        };
        
        searchInput.addEventListener('input', handleSearch);
      }
      
      return () => {
          agendaSection.removeEventListener('click', handleTabClick);
          if (searchInput) searchInput.removeEventListener('input', handleSearch);
      };
    } catch (err) {
      console.warn('Error setting up Figma event listeners:', err);
    }
  }, [isFigmaEnvironment, html]);

  // Render Logic
  
  // If we're in Figma and have HTML, use a simpler rendering approach
  if (isFigmaEnvironment && html) {
    return (
      <div 
        ref={figmaContainerRef}
        className={cn("w-full relative bg-background text-foreground font-sans", className)}
        onClick={(e) => handleInteraction(e.target as HTMLElement, e)}
      >
        <div 
          dangerouslySetInnerHTML={{ __html: html }} 
          style={{
            fontFamily: 'var(--font-sans)',
            color: 'var(--foreground)',
            backgroundColor: 'var(--background)'
          }}
        />
      </div>
    );
  }

  return (
    <div className={cn("w-full relative", className)}>
      <iframe 
        ref={iframeRef}
        className="w-full block bg-transparent border-none"
        title={title}
        scrolling="no"
        src="about:blank"
      />
      {mountNode && !html && children && createPortal(children, mountNode)}
    </div>
  );
};
