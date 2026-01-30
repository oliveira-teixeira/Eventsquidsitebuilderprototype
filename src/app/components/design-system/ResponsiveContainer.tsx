import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Monitor, Smartphone, Tablet } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../ui/utils';
import { useTheme } from '../theme-builder/ThemeProvider';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
}

type Viewport = 'mobile' | 'tablet' | 'desktop';

const VIEWPORTS = {
  mobile: { width: '375px', height: '667px', icon: Smartphone, label: 'Mobile' },
  tablet: { width: '768px', height: '1024px', icon: Tablet, label: 'Tablet' },
  desktop: { width: '100%', height: '100%', icon: Monitor, label: 'Desktop' },
};

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({ children, className }) => {
  const [viewport, setViewport] = useState<Viewport>('desktop');
  const [contentHeight, setContentHeight] = useState<number>(200); // Default min height
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  const { themeStyles, config } = useTheme();

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      const doc = iframe.contentDocument;
      if (!doc) return;

      // Copy styles from parent
      const parentStyles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'));
      parentStyles.forEach(style => {
        doc.head.appendChild(style.cloneNode(true));
      });
      
      // Add base styles to ensure correct rendering
      const baseStyle = doc.createElement('style');
      baseStyle.textContent = `
        body { 
          margin: 0; 
          padding: 0; 
          background-color: transparent;
          font-family: 'Inter', sans-serif; /* Fallback */
          overflow-x: hidden;
          min-height: 100px; /* Minimal height to prevent collapse */
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        #root { 
          flex: 1; 
          display: flex; 
          flex-direction: column; 
          align-items: center;
          justify-content: center;
          width: 100%;
        }
        /* Hide scrollbars if content fits */
        body::-webkit-scrollbar { display: none; }
        * { box-sizing: border-box; }
      `;
      doc.head.appendChild(baseStyle);

      // Set mount node
      setMountNode(doc.body);
    };

    // If iframe is already loaded (e.g. from cache or fast load)
    const contentDocument = iframe.contentDocument;
    if (contentDocument && contentDocument.readyState === 'complete') {
        handleLoad();
    } else {
        iframe.addEventListener('load', handleLoad);
    }
    
    return () => {
        iframe.removeEventListener('load', handleLoad);
    };
  }, []);

  // Sync Theme Styles to Iframe Body
  useEffect(() => {
      if (mountNode && themeStyles) {
          const style = mountNode.style;
          Object.entries(themeStyles).forEach(([key, value]) => {
              style.setProperty(key, value as string);
          });
          
          // Also sync dark mode class
          if (config.isDarkMode) {
              mountNode.classList.add('dark');
          } else {
              mountNode.classList.remove('dark');
          }
          
          // Apply color to body (but NOT background-color, so it stays transparent)
          mountNode.style.color = 'var(--foreground)';
      }
  }, [mountNode, themeStyles, config.isDarkMode]);

  // Adjust iframe height to content for Desktop view
  useEffect(() => {
      if (!mountNode || viewport !== 'desktop') return;
      
      const updateHeight = () => {
          if (mountNode) {
              // Measure the scrollHeight of the body or root element
              // We use a small delay or ensure we measure after render
              const height = mountNode.scrollHeight;
              // Ensure a minimum height so it doesn't look broken (loading state)
              setContentHeight(Math.max(height, 100));
          }
      };

      // Initial update
      updateHeight();

      const resizeObserver = new ResizeObserver(updateHeight);
      resizeObserver.observe(mountNode);
      
      // Also observe children changes (DOM mutations) which might affect height
      const mutationObserver = new MutationObserver(updateHeight);
      mutationObserver.observe(mountNode, { childList: true, subtree: true, attributes: true });

      return () => {
          resizeObserver.disconnect();
          mutationObserver.disconnect();
      };
  }, [mountNode, viewport]);

  return (
    <div className={cn("flex flex-col w-full", className)}>
      <div className="flex items-center justify-end gap-2 p-2">
        {(Object.keys(VIEWPORTS) as Viewport[]).map((v) => {
           const Icon = VIEWPORTS[v].icon;
           return (
             <Button
               key={v}
               variant={viewport === v ? "secondary" : "ghost"}
               size="sm"
               onClick={() => setViewport(v)}
               title={VIEWPORTS[v].label}
               className="h-8 w-8 p-0"
             >
               <Icon className="h-4 w-4" />
             </Button>
           );
        })}
      </div>

      <div className="w-full flex justify-center overflow-hidden relative min-h-[100px]">
          <div 
             className={cn(
                 "transition-all duration-300 ease-in-out shadow-lg overflow-hidden",
                 viewport !== 'desktop' ? "my-8 rounded-[2rem]" : "w-full border-none"
             )}
             style={{
                 width: VIEWPORTS[viewport].width,
                 // For desktop, use dynamic content height. For others, use fixed device height.
                 height: viewport === 'desktop' ? `${contentHeight}px` : VIEWPORTS[viewport].height,
                 // Max height for mobile/tablet to ensure it fits on screen reasonably, but they scroll internally
                 maxHeight: viewport === 'desktop' ? 'none' : '800px', 
             }}
          >
              <iframe 
                ref={iframeRef}
                className="w-full h-full border-none block"
                title="Component Preview"
                scrolling={viewport === 'desktop' ? 'no' : 'auto'} // Disable scroll on desktop iframe (outer div grows), enable on mobile
              />
          </div>
      </div>
      
      {mountNode && createPortal(
          // We wrap in a div to ensure full width usage inside the body
          <div className="w-full h-full">{children}</div>, 
          mountNode
      )}
    </div>
  );
};