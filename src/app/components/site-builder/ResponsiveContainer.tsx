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

    // --- Inline Formatting Toolbar ---
    const doc = mountNode.ownerDocument;
    let toolbar: HTMLDivElement | null = null;

    // Create the formatting toolbar element
    try {
      toolbar = doc.createElement('div');
      toolbar.className = 'text-format-toolbar';
      toolbar.setAttribute('data-format-toolbar', 'true');

      const boldSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/></svg>';
      const italicSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg>';
      const underlineSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4v6a6 6 0 0 0 12 0V4"/><line x1="4" y1="20" x2="20" y2="20"/></svg>';
      const colorSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a7 7 0 0 0-7 7c0 3 2.5 6.5 7 13 4.5-6.5 7-10 7-13a7 7 0 0 0-7-7z"/></svg>';

      const createBtn = (cmd: string, svg: string, title: string) => {
        const btn = doc.createElement('button');
        btn.type = 'button';
        btn.innerHTML = svg;
        btn.title = title;
        btn.setAttribute('data-command', cmd);
        btn.addEventListener('mousedown', (e) => {
          e.preventDefault(); // Prevent losing selection
          doc.execCommand(cmd, false);
          updateToolbarState();
        });
        return btn;
      };

      toolbar.appendChild(createBtn('bold', boldSvg, 'Bold (Ctrl+B)'));
      toolbar.appendChild(createBtn('italic', italicSvg, 'Italic (Ctrl+I)'));
      toolbar.appendChild(createBtn('underline', underlineSvg, 'Underline (Ctrl+U)'));

      // Separator before color picker
      const separator = doc.createElement('span');
      separator.className = 'separator';
      toolbar.appendChild(separator);

      // Color picker button with dropdown
      const colorBtnWrap = doc.createElement('div');
      colorBtnWrap.className = 'color-picker-wrap';
      colorBtnWrap.setAttribute('data-format-toolbar', 'true');

      const colorBtn = doc.createElement('button');
      colorBtn.type = 'button';
      colorBtn.title = 'Text Color';
      colorBtn.className = 'color-btn';
      colorBtn.innerHTML = `<span class="color-btn-icon">${colorSvg}</span><span class="color-btn-bar" data-color-bar></span>`;
      colorBtnWrap.appendChild(colorBtn);

      // Color dropdown panel
      const colorDropdown = doc.createElement('div');
      colorDropdown.className = 'color-dropdown';
      colorDropdown.setAttribute('data-format-toolbar', 'true');

      const presetColors = [
        { label: 'Default', value: '' },
        { label: 'Black', value: '#18181b' },
        { label: 'Dark Gray', value: '#52525b' },
        { label: 'Gray', value: '#a1a1aa' },
        { label: 'White', value: '#ffffff' },
        { label: 'Red', value: '#ef4444' },
        { label: 'Orange', value: '#f97316' },
        { label: 'Amber', value: '#f59e0b' },
        { label: 'Green', value: '#22c55e' },
        { label: 'Teal', value: '#14b8a6' },
        { label: 'Blue', value: '#3b82f6' },
        { label: 'Indigo', value: '#6366f1' },
        { label: 'Purple', value: '#a855f7' },
        { label: 'Pink', value: '#ec4899' },
        { label: 'Rose', value: '#f43f5e' },
      ];

      // Preset color grid
      const gridLabel = doc.createElement('div');
      gridLabel.className = 'color-dropdown-label';
      gridLabel.textContent = 'Presets';
      colorDropdown.appendChild(gridLabel);

      const colorGrid = doc.createElement('div');
      colorGrid.className = 'color-grid';
      presetColors.forEach(({ label, value }) => {
        const swatch = doc.createElement('button');
        swatch.type = 'button';
        swatch.className = 'color-swatch';
        swatch.title = label;
        if (value === '') {
          // "Default" swatch - show a slash-through
          swatch.innerHTML = '<span class="swatch-default"></span>';
        } else {
          swatch.style.setProperty('--swatch-color', value);
          swatch.innerHTML = `<span class="swatch-fill" style="background:${value}"></span>`;
        }
        swatch.addEventListener('mousedown', (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (value === '') {
            doc.execCommand('removeFormat', false);
          } else {
            doc.execCommand('foreColor', false, value);
          }
          // Update the bar indicator
          const bar = toolbar?.querySelector('[data-color-bar]') as HTMLElement;
          if (bar) bar.style.background = value || 'var(--foreground, #18181b)';
          colorDropdown.classList.remove('open');
        });
        colorGrid.appendChild(swatch);
      });
      colorDropdown.appendChild(colorGrid);

      // Custom color input row
      const customRow = doc.createElement('div');
      customRow.className = 'color-custom-row';
      const customLabel = doc.createElement('div');
      customLabel.className = 'color-dropdown-label';
      customLabel.textContent = 'Custom';
      customRow.appendChild(customLabel);

      const customInputWrap = doc.createElement('div');
      customInputWrap.className = 'color-custom-input-wrap';
      const customInput = doc.createElement('input');
      customInput.type = 'color';
      customInput.className = 'color-custom-input';
      customInput.value = '#3b82f6';
      customInputWrap.appendChild(customInput);

      const applyCustomBtn = doc.createElement('button');
      applyCustomBtn.type = 'button';
      applyCustomBtn.className = 'color-custom-apply';
      applyCustomBtn.textContent = 'Apply';
      applyCustomBtn.addEventListener('mousedown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const color = customInput.value;
        doc.execCommand('foreColor', false, color);
        const bar = toolbar?.querySelector('[data-color-bar]') as HTMLElement;
        if (bar) bar.style.background = color;
        colorDropdown.classList.remove('open');
      });
      customInputWrap.appendChild(applyCustomBtn);
      customRow.appendChild(customInputWrap);
      colorDropdown.appendChild(customRow);

      colorBtnWrap.appendChild(colorDropdown);

      // Toggle dropdown on click
      colorBtn.addEventListener('mousedown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        colorDropdown.classList.toggle('open');
      });

      // Close dropdown when clicking outside
      doc.addEventListener('mousedown', (e) => {
        const target = e.target as HTMLElement;
        if (!target.closest?.('.color-picker-wrap')) {
          colorDropdown.classList.remove('open');
        }
      });

      toolbar.appendChild(colorBtnWrap);

      doc.body.appendChild(toolbar);
    } catch (e) {
      console.warn('Failed to create formatting toolbar:', e);
    }

    // Update toolbar button active states based on current selection
    const updateToolbarState = () => {
      if (!toolbar) return;
      const buttons = toolbar.querySelectorAll('button[data-command]');
      buttons.forEach((btn) => {
        const cmd = btn.getAttribute('data-command');
        if (cmd) {
          try {
            const isActive = doc.queryCommandState(cmd);
            btn.classList.toggle('active', isActive);
          } catch (e) {
            // queryCommandState can throw in some cases
          }
        }
      });
      // Update color bar to reflect current text color
      try {
        const bar = toolbar.querySelector('[data-color-bar]') as HTMLElement;
        if (bar) {
          const colorVal = doc.queryCommandValue('foreColor');
          if (colorVal) {
            bar.style.background = colorVal;
          }
        }
      } catch (e) {
        // Ignore color detection errors
      }
    };

    // Track the currently focused contenteditable element
    let activeEditableElement: HTMLElement | null = null;

    // Helper to find the contenteditable parent of a node
    const findEditableParent = (node: Node | null): HTMLElement | null => {
      if (!node) return null;
      if (node.nodeType === 3) {
        // Text node - check parent
        const parent = node.parentElement;
        if (!parent) return null;
        return parent.closest('[contenteditable="true"]') as HTMLElement ||
          (parent.getAttribute('contenteditable') === 'true' ? parent : null);
      }
      const el = node as HTMLElement;
      return el.closest?.('[contenteditable="true"]') as HTMLElement || null;
    };

    // Position and show/hide the toolbar
    const positionToolbar = () => {
      if (!toolbar) return;
      const selection = doc.getSelection();

      // Determine if we're inside a contenteditable
      let editableParent: HTMLElement | null = null;
      if (selection && selection.rangeCount > 0) {
        editableParent = findEditableParent(selection.anchorNode);
      }

      // Update the active editable element tracking
      if (editableParent) {
        activeEditableElement = editableParent;
      }

      // If we have no active editable element, hide toolbar
      if (!activeEditableElement) {
        toolbar.classList.remove('visible');
        return;
      }

      // Determine positioning anchor: use selection rect if text is selected,
      // otherwise use the editable element's bounding rect
      const toolbarHeight = 34;
      const gap = 8;
      let top: number;
      let left: number;

      const toolbarWidth = 168; // Approx width: 3 format btns + separator + color picker + padding
      const halfToolbar = toolbarWidth / 2;
      const hasSelection = selection && selection.rangeCount > 0 && !selection.isCollapsed && editableParent;

      if (hasSelection) {
        // Position above the text selection
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        if (rect.width === 0 && rect.height === 0) {
          // Fallback to element positioning if range rect is zero
          const elRect = activeEditableElement.getBoundingClientRect();
          top = elRect.top - toolbarHeight - gap;
          left = elRect.left + (elRect.width / 2) - halfToolbar;
        } else {
          top = rect.top - toolbarHeight - gap;
          left = rect.left + (rect.width / 2) - halfToolbar;
        }
      } else {
        // Cursor active but no selection - anchor above the editable element
        const elRect = activeEditableElement.getBoundingClientRect();
        top = elRect.top - toolbarHeight - gap;
        left = elRect.left + (elRect.width / 2) - halfToolbar;
      }

      // Keep within viewport
      if (top < 4) {
        const fallbackRect = hasSelection 
          ? selection.getRangeAt(0).getBoundingClientRect()
          : activeEditableElement.getBoundingClientRect();
        top = fallbackRect.bottom + gap;
      }
      if (left < 4) left = 4;
      // Prevent toolbar from going off the right edge
      const viewportWidth = doc.documentElement?.clientWidth || 800;
      if (left + toolbarWidth > viewportWidth) left = viewportWidth - toolbarWidth - 4;

      toolbar.style.top = `${top}px`;
      toolbar.style.left = `${left}px`;
      toolbar.classList.add('visible');

      updateToolbarState();
    };

    // Debounced selection change handler
    let selectionTimer: ReturnType<typeof setTimeout> | null = null;
    const handleSelectionChange = () => {
      if (selectionTimer) clearTimeout(selectionTimer);
      selectionTimer = setTimeout(positionToolbar, 50);
    };

    doc.addEventListener('selectionchange', handleSelectionChange);

    // Handle focus into contenteditable elements to show toolbar immediately
    const handleFocusIn = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.getAttribute('contenteditable') === 'true' || target.closest?.('[contenteditable="true"]')) {
        const editable = target.getAttribute('contenteditable') === 'true' 
          ? target 
          : target.closest('[contenteditable="true"]') as HTMLElement;
        if (editable) {
          activeEditableElement = editable;
          // Small delay to let the cursor settle before positioning
          setTimeout(positionToolbar, 30);
        }
      }
    };
    doc.addEventListener('focusin', handleFocusIn);

    // Handle focus leaving contenteditable to hide toolbar
    const handleFocusOut = (e: Event) => {
      const relatedTarget = (e as FocusEvent).relatedTarget as HTMLElement | null;
      // Don't hide if focus moved to the toolbar itself or color picker
      if (relatedTarget?.closest?.('[data-format-toolbar]')) return;
      if (relatedTarget?.closest?.('.color-picker-wrap')) return;
      // Don't hide if focus moved to another contenteditable
      if (relatedTarget?.getAttribute('contenteditable') === 'true' || 
          relatedTarget?.closest?.('[contenteditable="true"]')) return;
      
      // Delay hiding to allow toolbar button clicks to register
      setTimeout(() => {
        // Re-check: if focus is now on toolbar, color picker, or another editable, keep visible
        const currentActive = doc.activeElement;
        if (currentActive?.closest?.('[data-format-toolbar]')) return;
        if (currentActive?.closest?.('.color-picker-wrap')) return;
        if (currentActive?.getAttribute('contenteditable') === 'true' || 
            currentActive?.closest?.('[contenteditable="true"]')) return;
        // Also check if color dropdown is open
        const dropdown = doc.querySelector('.color-dropdown.open');
        if (dropdown) return;
        
        activeEditableElement = null;
        if (toolbar) toolbar.classList.remove('visible');
      }, 150);
    };
    doc.addEventListener('focusout', handleFocusOut);

    // Hide toolbar when clicking outside contenteditable
    const handleMouseDown = (e: Event) => {
      const target = e.target as HTMLElement;
      // Don't hide if clicking the toolbar itself
      if (target.closest?.('[data-format-toolbar]')) return;
      if (!target.isContentEditable && !target.closest?.('[contenteditable="true"]')) {
        activeEditableElement = null;
        if (toolbar) toolbar.classList.remove('visible');
      }
    };
    doc.addEventListener('mousedown', handleMouseDown);

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
    
    // Intercept keyboard shortcuts to limit formatting to B/I/U only
    const handleKeyDown = (e: KeyboardEvent) => {
        const target = e.target as HTMLElement;
        
        // Inside contenteditable: restrict formatting shortcuts
        if (target.isContentEditable || target.closest('[contenteditable="true"]')) {
            const isMod = e.ctrlKey || e.metaKey;
            if (isMod) {
                const key = e.key.toLowerCase();
                // Allow Bold, Italic, Underline
                if (key === 'b' || key === 'i' || key === 'u') {
                    // Let execCommand handle it natively, just update toolbar state
                    setTimeout(updateToolbarState, 10);
                    return;
                }
                // Allow copy/paste/cut/undo/redo/select-all
                if (key === 'c' || key === 'v' || key === 'x' || key === 'z' || key === 'a') {
                    return;
                }
                // Block all other Ctrl+key formatting shortcuts (e.g., Ctrl+E for center)
                e.preventDefault();
                return;
            }
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

    // Intercept paste to strip formatting (allow only plain text + existing B/I/U)
    const handlePaste = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.isContentEditable || target.closest?.('[contenteditable="true"]')) {
        e.preventDefault();
        const text = e.clipboardData?.getData('text/plain') || '';
        doc.execCommand('insertText', false, text);
      }
    };
    mountNode.addEventListener('paste', handlePaste);

    // Listen for clicks on the body to handle selection
    mountNode.addEventListener('click', handleClick);
    mountNode.addEventListener('touchstart', handleClick, { passive: true });
    
    return () => {
      mountNode.removeEventListener('blur', handleBlur, true);
      mountNode.removeEventListener('keydown', handleKeyDown);
      mountNode.removeEventListener('paste', handlePaste);
      mountNode.removeEventListener('click', handleClick);
      mountNode.removeEventListener('touchstart', handleClick);
      doc.removeEventListener('selectionchange', handleSelectionChange);
      doc.removeEventListener('focusin', handleFocusIn);
      doc.removeEventListener('focusout', handleFocusOut);
      doc.removeEventListener('mousedown', handleMouseDown);
      activeEditableElement = null;
      if (selectionTimer) clearTimeout(selectionTimer);
      if (toolbar && toolbar.parentNode) {
        toolbar.parentNode.removeChild(toolbar);
      }
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
              /* Inline text formatting toolbar */
              .text-format-toolbar {
                position: absolute;
                z-index: 9999;
                display: none;
                align-items: center;
                gap: 2px;
                padding: 3px;
                background: var(--background, #fff);
                border: 1px solid var(--border, #e4e4e7);
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.08);
                pointer-events: auto;
                font-family: var(--font-sans, system-ui, sans-serif);
                transition: opacity 0.15s ease;
              }
              .text-format-toolbar.visible {
                display: flex;
              }
              .text-format-toolbar button {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 28px;
                height: 28px;
                border: none;
                border-radius: 5px;
                background: transparent;
                color: var(--muted-foreground, #71717a);
                cursor: pointer;
                padding: 0;
                transition: all 0.15s ease;
              }
              .text-format-toolbar button:hover {
                background: var(--muted, #f4f4f5);
                color: var(--foreground, #18181b);
              }
              .text-format-toolbar button.active {
                background: var(--primary, #2563eb);
                color: var(--primary-foreground, #fff);
              }
              .text-format-toolbar button svg {
                width: 14px;
                height: 14px;
              }
              .text-format-toolbar .separator {
                width: 1px;
                height: 16px;
                background: var(--border, #e4e4e7);
                margin: 0 2px;
                flex-shrink: 0;
              }
              /* Color picker wrapper */
              .color-picker-wrap {
                position: relative;
                display: flex;
                align-items: center;
              }
              .color-btn {
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
                justify-content: center !important;
                width: 28px !important;
                height: 28px !important;
                gap: 1px !important;
                padding: 2px 0 0 0 !important;
              }
              .color-btn-icon {
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .color-btn-icon svg {
                width: 13px !important;
                height: 13px !important;
              }
              .color-btn-bar {
                width: 14px;
                height: 3px;
                border-radius: 1px;
                background: var(--foreground, #18181b);
                flex-shrink: 0;
              }
              /* Color dropdown */
              .color-dropdown {
                display: none;
                position: absolute;
                top: calc(100% + 6px);
                left: 50%;
                transform: translateX(-50%);
                width: 192px;
                background: var(--background, #fff);
                border: 1px solid var(--border, #e4e4e7);
                border-radius: 10px;
                box-shadow: 0 8px 24px rgba(0,0,0,0.14), 0 2px 6px rgba(0,0,0,0.08);
                padding: 8px;
                z-index: 10000;
                font-family: var(--font-sans, system-ui, sans-serif);
              }
              .color-dropdown.open {
                display: block;
              }
              .color-dropdown-label {
                font-size: 10px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                color: var(--muted-foreground, #71717a);
                margin-bottom: 6px;
              }
              /* Color grid */
              .color-grid {
                display: grid;
                grid-template-columns: repeat(5, 1fr);
                gap: 4px;
                margin-bottom: 8px;
              }
              .color-swatch {
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                width: 28px !important;
                height: 28px !important;
                border-radius: 6px !important;
                border: 1px solid var(--border, #e4e4e7) !important;
                background: transparent !important;
                cursor: pointer !important;
                padding: 0 !important;
                transition: transform 0.1s ease, box-shadow 0.1s ease !important;
                margin: 0 auto;
              }
              .color-swatch:hover {
                transform: scale(1.15) !important;
                box-shadow: 0 2px 8px rgba(0,0,0,0.12) !important;
              }
              .swatch-fill {
                display: block;
                width: 18px;
                height: 18px;
                border-radius: 4px;
              }
              .swatch-default {
                display: block;
                width: 18px;
                height: 18px;
                border-radius: 4px;
                background: linear-gradient(135deg, transparent 45%, var(--muted-foreground, #71717a) 45%, var(--muted-foreground, #71717a) 55%, transparent 55%);
              }
              /* Custom color row */
              .color-custom-row {
                border-top: 1px solid var(--border, #e4e4e7);
                padding-top: 8px;
              }
              .color-custom-input-wrap {
                display: flex;
                align-items: center;
                gap: 6px;
              }
              .color-custom-input {
                width: 32px;
                height: 28px;
                border: 1px solid var(--border, #e4e4e7);
                border-radius: 6px;
                padding: 2px;
                cursor: pointer;
                background: transparent;
                -webkit-appearance: none;
                appearance: none;
              }
              .color-custom-input::-webkit-color-swatch-wrapper { padding: 0; }
              .color-custom-input::-webkit-color-swatch {
                border: none;
                border-radius: 3px;
              }
              .color-custom-apply {
                flex: 1;
                height: 28px !important;
                width: auto !important;
                font-size: 11px !important;
                font-weight: 600 !important;
                border-radius: 6px !important;
                background: var(--primary, #2563eb) !important;
                color: var(--primary-foreground, #fff) !important;
                border: none !important;
                cursor: pointer !important;
                font-family: var(--font-sans, system-ui, sans-serif) !important;
                transition: opacity 0.15s ease !important;
              }
              .color-custom-apply:hover {
                opacity: 0.9 !important;
              }
              /* Subtle focus ring for contenteditable elements */
              [contenteditable="true"]:focus {
                outline: 2px solid color-mix(in srgb, var(--primary, #2563eb) 30%, transparent);
                outline-offset: 2px;
                border-radius: 4px;
                background: color-mix(in srgb, var(--primary, #2563eb) 3%, transparent);
                transition: outline-color 0.15s ease, background 0.15s ease;
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

                    // Track which session element opened the modal (for "Edit Slot")
                    let activeSessionEl: HTMLElement | null = null;

                    const closeModal = () => {
                        overlay.style.display = 'none';
                        activeSessionEl = null;
                    };

                    const openModal = (el: HTMLElement) => {
                        activeSessionEl = el;
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
                                speakersContainer.innerHTML = speakers.map(name => {
                                    const trimmed = name.trim();
                                    const parts = trimmed.split(/\s+/);
                                    const initials = parts.length >= 2
                                        ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
                                        : (parts[0] ? parts[0][0].toUpperCase() : '?');
                                    return `
                                    <div style="display:flex; align-items:center; gap:12px;">
                                        <div style="width:32px; height:32px; border-radius:50%; background:var(--muted); display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                                            <span style="font-size:12px; font-weight:600; color:var(--muted-foreground); font-family:var(--font-sans);">${initials}</span>
                                        </div>
                                        <span style="font-size:14px; font-weight:500; color:var(--foreground); font-family:var(--font-sans);">${trimmed}</span>
                                    </div>
                                    `;
                                }).join('');
                            } else {
                                speakersSection.style.display = 'none';
                            }
                        }

                        overlay.style.display = 'block';
                    };

                    // Close on overlay click or close button
                    overlay.addEventListener('click', (e: Event) => {
                        const target = e.target as HTMLElement;
                        if (target === overlay || target.closest('.session-modal-close')) {
                            closeModal();
                        }
                    });

                    // "Edit Slot" button inside the detail modal
                    const editBtn = overlay.querySelector('.session-modal-edit');
                    if (editBtn) {
                        editBtn.addEventListener('click', (e: Event) => {
                            e.stopPropagation();
                            if (activeSessionEl) {
                                const data = extractSessionData(activeSessionEl);
                                closeModal();
                                dispatchAgendaSlotEvent({ action: 'edit', ...data });
                            }
                        });
                    }

                    // Close on Escape
                    const doc = overlay.ownerDocument;
                    doc.addEventListener('keydown', (e: KeyboardEvent) => {
                        if (e.key === 'Escape' && overlay.style.display !== 'none') {
                            closeModal();
                        }
                    });

                    // Helper: dispatch to parent window so SiteBuilderLayout can catch it
                    const dispatchAgendaSlotEvent = (detail: Record<string, string>) => {
                        try {
                            window.parent.postMessage({ type: 'agenda-slot-edit', ...detail }, '*');
                        } catch (err) {
                            window.postMessage({ type: 'agenda-slot-edit', ...detail }, '*');
                        }
                    };

                    const extractSessionData = (el: HTMLElement) => ({
                        title: el.getAttribute('data-session-title') || '',
                        time: el.getAttribute('data-session-time') || '',
                        day: el.getAttribute('data-session-day') || '',
                        location: el.getAttribute('data-session-location') || '',
                        type: el.getAttribute('data-session-type') || '',
                        desc: el.getAttribute('data-session-desc') || '',
                        speakers: el.getAttribute('data-session-speakers') || '',
                        dayIndex: el.getAttribute('data-day') || '0',
                        sessionHour: el.getAttribute('data-session-hour') || '9',
                    });

                    // Session item click delegation -- opens the detail modal (not edit)
                    sectionContainer.addEventListener('click', (e: Event) => {
                        const target = e.target as HTMLElement;
                        // Don't open modal if user is editing text
                        if (target.isContentEditable || target.closest('[contenteditable="true"]')) return;
                        // Don't intercept clicks inside the open modal overlay
                        if (target.closest('.session-modal-overlay')) return;

                        // "Add Agenda Slot" button
                        const addBtn = target.closest('[data-add-agenda-slot]') as HTMLElement;
                        if (addBtn) {
                            e.stopPropagation();
                            dispatchAgendaSlotEvent({ action: 'add' });
                            return;
                        }

                        const sessionEl = target.closest('[data-session-click]') as HTMLElement;
                        if (sessionEl) {
                            openModal(sessionEl);
                        }
                    });

                    // Keyboard support
                    sectionContainer.addEventListener('keydown', (e: KeyboardEvent) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            const target = e.target as HTMLElement;

                            const addBtn = target.closest('[data-add-agenda-slot]') as HTMLElement;
                            if (addBtn) {
                                e.preventDefault();
                                dispatchAgendaSlotEvent({ action: 'add' });
                                return;
                            }

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
                    if (!agendaSection.hasAttribute('data-active-day')) {
                        agendaSection.setAttribute('data-active-day', '0');
                    }
                    
                    // --- State ---
                    let activeTimeChip: string = 'all'; // 'all' or hour number as string

                    // Helper: style a time chip as active or inactive
                    const styleTimeChip = (chip: HTMLElement, isActive: boolean) => {
                        if (isActive) {
                            chip.style.background = 'var(--primary)';
                            chip.style.color = 'var(--primary-foreground)';
                            chip.style.borderColor = 'var(--primary)';
                            chip.style.fontWeight = '600';
                        } else {
                            chip.style.background = 'var(--background)';
                            chip.style.color = 'var(--muted-foreground)';
                            chip.style.borderColor = 'var(--border)';
                            chip.style.fontWeight = '500';
                        }
                    };

                    // Apply all filters (search + time chip) to sessions
                    const applyAllFilters = () => {
                        const searchInput = agendaSection.querySelector('input[data-search-input]') as HTMLInputElement;
                        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
                        const activeDay = agendaSection.getAttribute('data-active-day') || '0';

                        const allPanels = agendaSection.querySelectorAll('.tab-panel');
                        allPanels.forEach((panel) => {
                            const panelDay = panel.getAttribute('data-day');
                            const isActivePanel = panelDay === activeDay;
                            const sessions = panel.querySelectorAll('.session-item');
                            
                            sessions.forEach((session) => {
                                if (!isActivePanel) {
                                    (session as HTMLElement).style.display = '';
                                    return;
                                }
                                const titleEl = session.querySelector('h4') || session.querySelector('h3');
                                const descEl = session.querySelector('p');
                                const title = titleEl ? (titleEl.textContent || '').toLowerCase() : '';
                                const desc = descEl ? (descEl.textContent || '').toLowerCase() : '';
                                const sessionTitle = (session.getAttribute('data-session-title') || '').toLowerCase();
                                const matchesSearch = !searchTerm || title.includes(searchTerm) || desc.includes(searchTerm) || sessionTitle.includes(searchTerm);
                                
                                const sessionHour = session.getAttribute('data-session-hour') || '';
                                const matchesTime = activeTimeChip === 'all' || sessionHour === activeTimeChip;

                                const isGrid = !!panel.querySelector('.grid');
                                (session as HTMLElement).style.display = (matchesSearch && matchesTime) ? (isGrid ? '' : 'flex') : 'none';
                            });

                            // Empty state
                            let emptyState = panel.querySelector('.empty-state');
                            if (isActivePanel) {
                                const visibleSessions = Array.from(sessions).filter(s => (s as HTMLElement).style.display !== 'none');
                                const hasActiveFilters = searchTerm || activeTimeChip !== 'all';
                                if (visibleSessions.length === 0 && hasActiveFilters) {
                                    if (!emptyState) {
                                        const container = panel.querySelector('.sessions-list') || panel.querySelector('.grid');
                                        if (container) {
                                            const emptyDiv = document.createElement('div');
                                            emptyDiv.className = 'empty-state';
                                            emptyDiv.setAttribute('style', 'text-align:center; padding:32px 16px; color:var(--muted-foreground); font-family:var(--font-sans);');
                                            emptyDiv.innerHTML = '<p style="font-size:14px;">No sessions match your filters.</p>';
                                            container.parentElement!.insertBefore(emptyDiv, container.nextSibling);
                                        }
                                    }
                                } else if (emptyState) {
                                    emptyState.remove();
                                }
                            } else if (emptyState) {
                                emptyState.remove();
                            }
                        });
                    };

                    // Switch time chips row when day changes
                    const switchTimeChipsToDay = (dayIndex: number) => {
                        const allChipRows = agendaSection.querySelectorAll('.time-chips-row');
                        allChipRows.forEach((row) => {
                            const rowDay = row.getAttribute('data-time-chips-day');
                            (row as HTMLElement).style.display = rowDay === String(dayIndex) ? 'flex' : 'none';
                        });
                        // Reset active time chip to "all" for the new day
                        activeTimeChip = 'all';
                        const visibleRow = agendaSection.querySelector(`.time-chips-row[data-time-chips-day="${dayIndex}"]`);
                        if (visibleRow) {
                            const chips = visibleRow.querySelectorAll('[data-time-chip]');
                            chips.forEach((chip) => {
                                const val = chip.getAttribute('data-time-chip') || '';
                                styleTimeChip(chip as HTMLElement, val === 'all');
                            });
                        }
                    };

                    // Tab click handler
                    const handleTabClick = (e: Event) => {
                        const target = e.target as HTMLElement;
                        const tabBtn = target.closest('.tab-btn');
                        if (tabBtn) {
                            const tabIndex = tabBtn.getAttribute('data-tab-index');
                            if (tabIndex !== null) {
                                const dayIndex = parseInt(tabIndex, 10);
                                agendaSection.setAttribute('data-active-day', tabIndex);
                                
                                const allTabs = agendaSection.querySelectorAll('.tab-btn');
                                allTabs.forEach((tab, idx) => {
                                    const tabEl = tab as HTMLElement;
                                    if (idx === dayIndex) {
                                        tabEl.style.background = 'var(--primary)';
                                        tabEl.style.color = 'var(--primary-foreground)';
                                        tabEl.style.fontWeight = '800';
                                        tabEl.style.boxShadow = '0 2px 8px color-mix(in srgb, var(--primary) 30%, transparent)';
                                    } else {
                                        tabEl.style.background = 'color-mix(in srgb, var(--muted) 60%, transparent)';
                                        tabEl.style.color = 'var(--muted-foreground)';
                                        tabEl.style.fontWeight = '600';
                                        tabEl.style.boxShadow = 'none';
                                    }
                                });
                                
                                const allPanels = agendaSection.querySelectorAll('.tab-panel');
                                allPanels.forEach((panel, idx) => {
                                    (panel as HTMLElement).style.display = idx === dayIndex ? 'block' : 'none';
                                });

                                // Switch time chips + reset filter
                                switchTimeChipsToDay(dayIndex);
                                setTimeout(applyAllFilters, 10);
                                
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

                    // Time chip click handler (delegation)
                    const handleTimeChipClick = (e: Event) => {
                        const target = e.target as HTMLElement;
                        const chip = target.closest('[data-time-chip]');
                        if (!chip) return;
                        e.stopPropagation();
                        const chipValue = chip.getAttribute('data-time-chip') || 'all';
                        activeTimeChip = chipValue;

                        // Update chip styles in the active day's chip row
                        const activeDay = agendaSection.getAttribute('data-active-day') || '0';
                        const visibleRow = agendaSection.querySelector(`.time-chips-row[data-time-chips-day="${activeDay}"]`);
                        if (visibleRow) {
                            const chips = visibleRow.querySelectorAll('[data-time-chip]');
                            chips.forEach((c) => {
                                const val = c.getAttribute('data-time-chip') || '';
                                styleTimeChip(c as HTMLElement, val === chipValue);
                            });
                        }
                        applyAllFilters();
                    };
                    agendaSection.addEventListener('click', handleTimeChipClick);

                    // Search input
                    const searchInput = agendaSection.querySelector('input[data-search-input]');
                    if (searchInput) {
                        searchInput.addEventListener('input', applyAllFilters);
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

          let activeSessionEl: HTMLElement | null = null;

          const closeModal = () => { overlay.style.display = 'none'; activeSessionEl = null; };

          const openModal = (el: HTMLElement) => {
              activeSessionEl = el;
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
                      speakersContainer.innerHTML = speakers.map(name => {
                          const trimmed = name.trim();
                          const parts = trimmed.split(/\s+/);
                          const initials = parts.length >= 2
                              ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
                              : (parts[0] ? parts[0][0].toUpperCase() : '?');
                          return `
                          <div style="display:flex; align-items:center; gap:12px;">
                              <div style="width:32px; height:32px; border-radius:50%; background:var(--muted); display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                                  <span style="font-size:12px; font-weight:600; color:var(--muted-foreground); font-family:var(--font-sans);">${initials}</span>
                              </div>
                              <span style="font-size:14px; font-weight:500; color:var(--foreground); font-family:var(--font-sans);">${trimmed}</span>
                          </div>
                          `;
                      }).join('');
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
          const extractData = (el: HTMLElement) => ({
              title: el.getAttribute('data-session-title') || '',
              time: el.getAttribute('data-session-time') || '',
              day: el.getAttribute('data-session-day') || '',
              location: el.getAttribute('data-session-location') || '',
              type: el.getAttribute('data-session-type') || '',
              desc: el.getAttribute('data-session-desc') || '',
              speakers: el.getAttribute('data-session-speakers') || '',
              dayIndex: el.getAttribute('data-day') || '0',
              sessionHour: el.getAttribute('data-session-hour') || '9',
          });
          const dispatchEvt = (detail: Record<string, string>) => {
              try {
                  window.parent.postMessage({ type: 'agenda-slot-edit', ...detail }, '*');
              } catch {
                  window.postMessage({ type: 'agenda-slot-edit', ...detail }, '*');
              }
          };
          // "Edit Slot" button inside the detail modal
          const editBtn = overlay.querySelector('.session-modal-edit');
          if (editBtn) {
              editBtn.addEventListener('click', (e) => {
                  e.stopPropagation();
                  if (activeSessionEl) {
                      const data = extractData(activeSessionEl);
                      closeModal();
                      dispatchEvt({ action: 'edit', ...data });
                  }
              });
          }
          // Row click opens the detail modal (not the edit modal)
          containerEl.addEventListener('click', (e) => {
              const target = e.target as HTMLElement;
              if (target.isContentEditable || target.closest('[contenteditable="true"]')) return;
              if (target.closest('.session-modal-overlay')) return;
              const addBtn = target.closest('[data-add-agenda-slot]') as HTMLElement;
              if (addBtn) { e.stopPropagation(); dispatchEvt({ action: 'add' }); return; }
              const sessionEl = target.closest('[data-session-click]') as HTMLElement;
              if (sessionEl) openModal(sessionEl);
          });
          containerEl.addEventListener('keydown', (e: Event) => {
              const ke = e as KeyboardEvent;
              if (ke.key === 'Enter' || ke.key === ' ') {
                  const target = ke.target as HTMLElement;
                  const addBtn = target.closest('[data-add-agenda-slot]') as HTMLElement;
                  if (addBtn) { ke.preventDefault(); dispatchEvt({ action: 'add' }); return; }
                  const sessionEl = target.closest('[data-session-click]') as HTMLElement;
                  if (sessionEl) { ke.preventDefault(); openModal(sessionEl); }
              }
          });
      };

      // Apply session modal to all builder-sections (runs for both schedule list and grid)
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
      
      // --- State ---
      let fActiveTimeChip = 'all';

      const fStyleTimeChip = (chip, isActive) => {
          if (isActive) {
              chip.style.background = 'var(--primary)';
              chip.style.color = 'var(--primary-foreground)';
              chip.style.borderColor = 'var(--primary)';
              chip.style.fontWeight = '600';
          } else {
              chip.style.background = 'var(--background)';
              chip.style.color = 'var(--muted-foreground)';
              chip.style.borderColor = 'var(--border)';
              chip.style.fontWeight = '500';
          }
      };

      const fApplyAllFilters = () => {
          try {
              const searchInput = agendaSection.querySelector('input[data-search-input]');
              const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
              const activeDay = agendaSection.getAttribute('data-active-day') || '0';

              const allPanels = agendaSection.querySelectorAll('.tab-panel');
              allPanels.forEach((panel) => {
                  const panelDay = panel.getAttribute('data-day');
                  const isActivePanel = panelDay === activeDay;
                  const sessions = panel.querySelectorAll('.session-item');
                  
                  sessions.forEach((session) => {
                      if (!isActivePanel) { session.style.display = ''; return; }
                      const titleEl = session.querySelector('h4') || session.querySelector('h3');
                      const descEl = session.querySelector('p');
                      const title = titleEl ? (titleEl.textContent || '').toLowerCase() : '';
                      const desc = descEl ? (descEl.textContent || '').toLowerCase() : '';
                      const sessionTitle = (session.getAttribute('data-session-title') || '').toLowerCase();
                      const matchesSearch = !searchTerm || title.includes(searchTerm) || desc.includes(searchTerm) || sessionTitle.includes(searchTerm);
                      
                      const sessionHour = session.getAttribute('data-session-hour') || '';
                      const matchesTime = fActiveTimeChip === 'all' || sessionHour === fActiveTimeChip;

                      const isGrid = !!panel.querySelector('.grid');
                      session.style.display = (matchesSearch && matchesTime) ? (isGrid ? '' : 'flex') : 'none';
                  });

                  let emptyState = panel.querySelector('.empty-state');
                  if (isActivePanel) {
                      const visibleSessions = Array.from(sessions).filter(s => s.style.display !== 'none');
                      const hasActiveFilters = searchTerm || fActiveTimeChip !== 'all';
                      if (visibleSessions.length === 0 && hasActiveFilters) {
                          if (!emptyState) {
                              const container = panel.querySelector('.sessions-list') || panel.querySelector('.grid');
                              if (container) {
                                  const emptyDiv = document.createElement('div');
                                  emptyDiv.className = 'empty-state';
                                  emptyDiv.setAttribute('style', 'text-align:center; padding:32px 16px; color:var(--muted-foreground); font-family:var(--font-sans);');
                                  emptyDiv.innerHTML = '<p style="font-size:14px;">No sessions match your filters.</p>';
                                  container.parentElement.insertBefore(emptyDiv, container.nextSibling);
                              }
                          }
                      } else if (emptyState) {
                          emptyState.remove();
                      }
                  } else if (emptyState) {
                      emptyState.remove();
                  }
              });
          } catch (err) {
              console.warn('Filter handler error:', err);
          }
      };

      // Switch time chips row when day changes
      const fSwitchTimeChipsToDay = (dayIndex) => {
          const allChipRows = agendaSection.querySelectorAll('.time-chips-row');
          allChipRows.forEach((row) => {
              const rowDay = row.getAttribute('data-time-chips-day');
              row.style.display = rowDay === String(dayIndex) ? 'flex' : 'none';
          });
          fActiveTimeChip = 'all';
          const visibleRow = agendaSection.querySelector('.time-chips-row[data-time-chips-day="' + dayIndex + '"]');
          if (visibleRow) {
              const chips = visibleRow.querySelectorAll('[data-time-chip]');
              chips.forEach((chip) => {
                  const val = chip.getAttribute('data-time-chip') || '';
                  fStyleTimeChip(chip, val === 'all');
              });
          }
      };

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
              
              const allTabs = agendaSection.querySelectorAll('.tab-btn');
              allTabs.forEach((tab, idx) => {
                if (idx === dayIndex) {
                  tab.style.background = 'var(--primary)';
                  tab.style.color = 'var(--primary-foreground)';
                  tab.style.fontWeight = '800';
                  tab.style.boxShadow = '0 2px 8px color-mix(in srgb, var(--primary) 30%, transparent)';
                } else {
                  tab.style.background = 'color-mix(in srgb, var(--muted) 60%, transparent)';
                  tab.style.color = 'var(--muted-foreground)';
                  tab.style.fontWeight = '600';
                  tab.style.boxShadow = 'none';
                }
              });
              
              const allPanels = agendaSection.querySelectorAll('.tab-panel');
              allPanels.forEach((panel, idx) => {
                panel.style.display = idx === dayIndex ? 'block' : 'none';
              });

              fSwitchTimeChipsToDay(dayIndex);
              setTimeout(fApplyAllFilters, 10);
              
              if (window.parent) {
                try {
                  window.parent.postMessage({
                    type: 'AGENDA_DAY_CHANGED',
                    blockId: agendaSection.id,
                    activeDay: dayIndex
                  }, '*');
                } catch (err) {}
              }
            }
          }
        } catch (err) {
          console.warn('Tab click handler error:', err);
        }
      };
      
      agendaSection.addEventListener('click', handleTabClick);

      // Time chip click handler (delegation)
      const handleTimeChipClick = (e) => {
          const target = e.target;
          const chip = target.closest('[data-time-chip]');
          if (!chip) return;
          e.stopPropagation();
          const chipValue = chip.getAttribute('data-time-chip') || 'all';
          fActiveTimeChip = chipValue;

          const activeDay = agendaSection.getAttribute('data-active-day') || '0';
          const visibleRow = agendaSection.querySelector('.time-chips-row[data-time-chips-day="' + activeDay + '"]');
          if (visibleRow) {
              const chips = visibleRow.querySelectorAll('[data-time-chip]');
              chips.forEach((c) => {
                  const val = c.getAttribute('data-time-chip') || '';
                  fStyleTimeChip(c, val === chipValue);
              });
          }
          fApplyAllFilters();
      };
      agendaSection.addEventListener('click', handleTimeChipClick);

      // Search input
      const searchInput = agendaSection.querySelector('input[data-search-input]');
      if (searchInput) {
          searchInput.addEventListener('input', fApplyAllFilters);
      }
      
      return () => {
          agendaSection.removeEventListener('click', handleTabClick);
          agendaSection.removeEventListener('click', handleTimeChipClick);
          if (searchInput) searchInput.removeEventListener('input', fApplyAllFilters);
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
