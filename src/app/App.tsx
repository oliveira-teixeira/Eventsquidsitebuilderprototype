import React, { useEffect, useState, useCallback, Component, ErrorInfo } from "react";
import { TopNav } from "./components/site-builder/TopNav";
import { Sidebar } from "./components/site-builder/Sidebar";
import { Canvas } from "./components/site-builder/Canvas";
import { Navigator } from "./components/site-builder/Navigator";
import { ThemeProvider, ThemeBuilder } from "./components/site-builder/ThemeBuilder";
import { AssetsPanel } from "./components/site-builder/AssetsPanel";
import { AuditLogPanel } from "./components/site-builder/AuditLogPanel";
import { Toaster, toast } from "sonner";
import { Image as ImageIcon, Code } from "lucide-react";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { BlockSettings } from "./components/site-builder/block-registry";
import { ResponsiveContainer } from "./components/site-builder/ResponsiveContainer";
import { generateFullPageHtml } from "./utils/generate-html";

// Error Boundary Component
class ErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-screen bg-background text-foreground p-8">
          <div className="max-w-2xl w-full bg-card border border-border rounded-lg p-8">
            <h1 className="text-2xl font-bold mb-4 text-destructive">Something went wrong</h1>
            <p className="text-muted-foreground mb-4">
              The application encountered an error. Please try refreshing the page.
            </p>
            {this.state.error && (
              <pre className="bg-muted p-4 rounded text-xs overflow-auto">
                {this.state.error.toString()}
              </pre>
            )}
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
            >
              Clear Data & Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * --- Technical Compliance: Native Web Components ---
 * Defining native Web Components to wrap builder sections.
 */
try {
  if (typeof customElements !== 'undefined' && !customElements.get('builder-section')) {
    customElements.define('builder-section', class extends HTMLElement {
      constructor() {
        super();
      }
    });
  }
} catch (error) {
  console.warn('Error defining custom element:', error);
}

// --- Error Suppression ---
// Suppress ResizeObserver loop limit errors which are common in this environment
// but typically benign.
const RESIZE_OBSERVER_ERROR = 'ResizeObserver loop limit exceeded';
const RESIZE_OBSERVER_ERROR_SAFARI = 'ResizeObserver loop completed with undelivered notifications';

const originalConsoleError = console.error;
console.error = (...args: any[]) => {
  if (
    typeof args[0] === 'string' && 
    (args[0].includes(RESIZE_OBSERVER_ERROR) || args[0].includes(RESIZE_OBSERVER_ERROR_SAFARI))
  ) {
    return;
  }
  // Also suppress React hydration errors in Figma environment
  if (typeof args[0] === 'string' && args[0].includes('Hydration')) {
    return;
  }
  originalConsoleError(...args);
};

if (typeof window !== 'undefined') {
  window.addEventListener('error', (e) => {
    if (
      e.message === RESIZE_OBSERVER_ERROR || 
      e.message === RESIZE_OBSERVER_ERROR_SAFARI
    ) {
      e.stopImmediatePropagation();
    }
    // Prevent Figma-specific runtime errors from bubbling
    if (e.message && e.message.includes('Unknown runtime error')) {
      console.warn('Suppressed Figma runtime error:', e.message);
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  });
}

interface Block {
  id: string;
  typeId: string;
  hidden?: boolean;
  locked?: boolean;
  variant?: string; // default, primary, secondary, accent
  settings?: BlockSettings;
}

function AppContent() {
  // State Management
  const [activePageId, setActivePageId] = useState<string>("home");
  const [pages, setPages] = useState<{ id: string; name: string; slug: string; blocks: Block[] }[]>([
    { id: "home", name: "Home", slug: "/", blocks: [] }
  ]);
  const [canvasBlocks, setCanvasBlocks] = useState<Block[]>([]);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [rightPanel, setRightPanel] = useState<"theme" | "assets" | "audit" | "properties" | "navigator" | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showNavigator, setShowNavigator] = useState(true);
  const [breakpoint, setBreakpoint] = useState(1440);
  const [initError, setInitError] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Undo/Redo State
  const [history, setHistory] = useState<any[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Maze Analytics
  useEffect(() => {
    (function (m: any, a, z, e) {
      var s, t, u, v;
      try {
        t = m.sessionStorage.getItem('maze-us');
      } catch (err) {}

      if (!t) {
        t = new Date().getTime();
        try {
          m.sessionStorage.setItem('maze-us', t);
        } catch (err) {}
      }

      u = a.currentScript || (function () {
        var w = a.getElementsByTagName('script');
        return w[w.length - 1];
      })();
      v = u && (u as any).nonce;

      s = a.createElement('script');
      s.src = z + '?apiKey=' + e;
      s.async = true;
      if (v) s.setAttribute('nonce', v);
      a.getElementsByTagName('head')[0].appendChild(s);
      m.mazeUniversalSnippetApiKey = e;
    })(window, document, 'https://snippet.maze.co/maze-universal-loader.js', '69a7327b-0f96-4cce-8d89-bd11eb3a9528');
  }, []);

  // Add global error handler for uncaught errors
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      // Ignore common benign errors
      if (
        (event.message && event.message.includes('ResizeObserver')) || 
        event.message === 'Script error.'
      ) {
        return false;
      }

      // If error object is null, it's likely a cross-origin script error or extension issue
      if (event.error === null) {
        return false;
      }

      console.error('Global error caught:', event.error);
      event.preventDefault(); // Prevent default error handling
      return true;
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      // Ignore null rejections
      if (event.reason === null) return true;
      
      console.error('Unhandled promise rejection:', event.reason);
      event.preventDefault();
      return true;
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  // Define initializeDefault before the useEffect that uses it
  const initializeDefault = useCallback(() => {
    try {
      const defaultBlocks = [
        { id: "hero-1", typeId: "hero-modern", variant: "default" }, 
        { id: "agenda-1", typeId: "agenda-clean", variant: "default" }
      ];
      const defaultPages = [
        { id: "home", name: "Home", slug: "/", blocks: defaultBlocks }
      ];
      setPages(defaultPages);
      setActivePageId("home");
      setCanvasBlocks(defaultBlocks);
      setHistory([defaultBlocks]);
      setHistoryIndex(0);
    } catch (error) {
      console.error('Error initializing default blocks:', error);
      setInitError('Failed to initialize default blocks');
    }
  }, []);

  // --- Persistence & Initial State ---
  useEffect(() => {
    try {
      const saved = localStorage.getItem("design-handoff-builder-state-v6");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.pages && Array.isArray(parsed.pages)) {
            setPages(parsed.pages);
            setActivePageId(parsed.activePageId || "home");
            const activePage = parsed.pages.find((p: any) => p.id === (parsed.activePageId || "home"));
            if (activePage) {
              setCanvasBlocks(activePage.blocks);
              setHistory([activePage.blocks]);
              setHistoryIndex(0);
            } else {
              // Fallback if active page not found
              setCanvasBlocks(parsed.pages[0].blocks);
              setHistory([parsed.pages[0].blocks]);
              setHistoryIndex(0);
            }
          } else {
            // Check for v5
            const savedV5 = localStorage.getItem("design-handoff-builder-state-v5");
            if (savedV5) {
                const parsedV5 = JSON.parse(savedV5);
                if (Array.isArray(parsedV5)) {
                    // Migrate v5 to v6
                    const migratedPages = [{ id: "home", name: "Home", slug: "/", blocks: parsedV5 }];
                    setPages(migratedPages);
                    setActivePageId("home");
                    setCanvasBlocks(parsedV5);
                    setHistory([parsedV5]);
                    setHistoryIndex(0);
                } else {
                    initializeDefault();
                }
            } else {
                initializeDefault();
            }
          }
        } catch (e) {
          console.error('Error parsing saved state:', e);
          initializeDefault();
        }
      } else {
        // Check for v5 as fallback if v6 doesn't exist
        const savedV5 = localStorage.getItem("design-handoff-builder-state-v5");
        if (savedV5) {
            try {
                const parsedV5 = JSON.parse(savedV5);
                if (Array.isArray(parsedV5)) {
                    const migratedPages = [{ id: "home", name: "Home", slug: "/", blocks: parsedV5 }];
                    setPages(migratedPages);
                    setActivePageId("home");
                    setCanvasBlocks(parsedV5);
                    setHistory([parsedV5]);
                    setHistoryIndex(0);
                } else {
                    initializeDefault();
                }
            } catch {
                initializeDefault();
            }
        } else {
            initializeDefault();
        }
      }
    } catch (error) {
      console.error('Error in initial state setup:', error);
      setInitError('Failed to load initial state');
    }
  }, [initializeDefault]);

  useEffect(() => {
    if (pages.length > 0) {
      localStorage.setItem("design-handoff-builder-state-v6", JSON.stringify({
        pages,
        activePageId
      }));
    }
  }, [pages, activePageId]);

  // Sync canvasBlocks changes back to pages state
  useEffect(() => {
    setPages(prevPages => 
      prevPages.map(p => 
        p.id === activePageId ? { ...p, blocks: canvasBlocks } : p
      )
    );
  }, [canvasBlocks, activePageId]);

  // --- Page Operations ---
  const handleSwitchPage = useCallback((pageId: string) => {
    const page = pages.find(p => p.id === pageId);
    if (page) {
      // Save current blocks to current page (handled by useEffect, but good to be explicit if needed, 
      // but useEffect handles it. However, we need to ensure state doesn't race.)
      // Actually, standard react state updates are batched.
      // We will just switch the active ID and load the new blocks.
      setActivePageId(pageId);
      setCanvasBlocks(page.blocks);
      setHistory([page.blocks]);
      setHistoryIndex(0);
      setSelectedBlockId(null);
    }
  }, [pages]);

  const handleAddPage = useCallback((name: string, slug: string) => {
    const newPageId = `page-${Date.now()}`;
    const newPage = { id: newPageId, name, slug, blocks: [] };
    setPages(prev => [...prev, newPage]);
    handleSwitchPage(newPageId);
  }, [handleSwitchPage]);

  const handleDeletePage = useCallback((pageId: string) => {
    if (pages.length <= 1) {
      toast.error("Cannot delete the last page");
      return;
    }
    const newPages = pages.filter(p => p.id !== pageId);
    setPages(newPages);
    if (activePageId === pageId) {
      handleSwitchPage(newPages[0].id);
    }
  }, [pages, activePageId, handleSwitchPage]);

  // --- Undo / Redo ---
  const pushToHistory = useCallback((newBlocks: Block[]) => {
    setHistoryIndex(prevIndex => {
      setHistory(prevHistory => {
        const newHistory = prevHistory.slice(0, prevIndex + 1);
        newHistory.push(newBlocks);
        return newHistory;
      });
      return prevIndex + 1;
    });
    setCanvasBlocks(newBlocks);
  }, []); // No dependencies needed with functional updates

  const undo = useCallback(() => {
    setHistoryIndex(prevIndex => {
      if (prevIndex > 0) {
        const newIndex = prevIndex - 1;
        setHistory(prevHistory => {
          setCanvasBlocks(prevHistory[newIndex]);
          return prevHistory;
        });
        return newIndex;
      }
      return prevIndex;
    });
  }, []);

  const redo = useCallback(() => {
    setHistoryIndex(prevIndex => {
      let newIndex = prevIndex;
      setHistory(prevHistory => {
        if (prevIndex < prevHistory.length - 1) {
          newIndex = prevIndex + 1;
          setCanvasBlocks(prevHistory[newIndex]);
        }
        return prevHistory;
      });
      return newIndex;
    });
  }, []);

  // --- Navigation Block Helpers ---
  const isNavBlock = useCallback((typeId: string) => {
    return typeId === 'navbar-master';
  }, []);

  const hasNavBlock = useCallback((blocks: Block[]) => {
    return blocks.some(b => isNavBlock(b.typeId));
  }, [isNavBlock]);

  // --- Drag and Drop Logic ---
  const handleDropBlock = useCallback((typeId: string, insertIndex?: number) => {
    if (!typeId) return;

    // Navigation block special handling
    if (isNavBlock(typeId)) {
      // If a nav block already exists, replace it instead of adding a duplicate
      if (hasNavBlock(canvasBlocks)) {
        const existingNavIndex = canvasBlocks.findIndex(b => isNavBlock(b.typeId));
        const existingNav = canvasBlocks[existingNavIndex];
        // Replace existing nav block with a new one (preserving position 0)
        const newBlock = {
          id: `${typeId}-${Math.random().toString(36).substr(2, 9)}`,
          typeId,
          variant: existingNav.variant || 'default',
          settings: existingNav.settings || {}
        };
        const newBlocks = [...canvasBlocks];
        newBlocks[existingNavIndex] = newBlock;
        // Ensure it's at index 0
        if (existingNavIndex !== 0) {
          newBlocks.splice(existingNavIndex, 1);
          newBlocks.unshift(newBlock);
        }
        pushToHistory(newBlocks);
        setSelectedBlockId(newBlock.id);
        toast.info("Navigation block replaced. Only one navigation is allowed per page.", { duration: 3000 });
        return;
      }

      // New nav block: always insert at index 0
      const newBlock = {
        id: `${typeId}-${Math.random().toString(36).substr(2, 9)}`,
        typeId,
        variant: 'default',
        settings: {}
      };
      const newBlocks = [newBlock, ...canvasBlocks];
      pushToHistory(newBlocks);
      setSelectedBlockId(newBlock.id);
      toast.success("Navigation added to the top of the page.", { duration: 2000 });
      return;
    }

    const newBlock = {
      id: `${typeId}-${Math.random().toString(36).substr(2, 9)}`,
      typeId,
      variant: 'default',
      settings: {}
    };

    const newBlocks = [...canvasBlocks];
    // If a nav block exists at index 0, ensure new blocks are inserted after it
    const navAtTop = newBlocks.length > 0 && isNavBlock(newBlocks[0].typeId);
    const minInsertIndex = navAtTop ? 1 : 0;

    if (typeof insertIndex === 'number') {
      const safeIndex = Math.max(insertIndex, minInsertIndex);
      newBlocks.splice(safeIndex, 0, newBlock);
    } else {
      newBlocks.push(newBlock);
    }
    pushToHistory(newBlocks);
    setSelectedBlockId(newBlock.id);
  }, [canvasBlocks, pushToHistory, isNavBlock, hasNavBlock]);

  // --- Block Operations ---
  const deleteBlock = useCallback((id: string) => {
    pushToHistory(canvasBlocks.filter(b => b.id !== id));
    if (selectedBlockId === id) setSelectedBlockId(null);
  }, [canvasBlocks, selectedBlockId, pushToHistory]);

  const moveBlock = useCallback((dragIndex: number, hoverIndex: number) => {
    const newBlocks = [...canvasBlocks];
    const dragBlock = newBlocks[dragIndex];

    // Navigation block is completely locked to position 0 - block all reorder attempts
    if (isNavBlock(dragBlock.typeId)) {
      return; // Silently reject - nav block drag is disabled at the UI level
    }

    // Prevent moving other blocks above nav block at index 0
    const navAtTop = newBlocks.length > 0 && isNavBlock(newBlocks[0].typeId);
    if (navAtTop && hoverIndex === 0) {
      return; // Silently reject - can't go above nav
    }

    newBlocks.splice(dragIndex, 1);
    newBlocks.splice(hoverIndex, 0, dragBlock);
    pushToHistory(newBlocks);
  }, [canvasBlocks, pushToHistory, isNavBlock]);

  const addDefaultBlock = useCallback((index: number) => {
    // Adds a default hero block at index
    const newBlock = {
      id: `new-${Math.random().toString(36).substr(2, 9)}`,
      typeId: "hero-modern",
      variant: 'default',
      settings: {}
    };
    const newBlocks = [...canvasBlocks];
    newBlocks.splice(index, 0, newBlock);
    pushToHistory(newBlocks);
    setSelectedBlockId(newBlock.id);
  }, [canvasBlocks, pushToHistory]);

  const toggleVisibility = useCallback((id: string) => {
    const newBlocks = canvasBlocks.map(b => 
      b.id === id ? { ...b, hidden: !b.hidden } : b
    );
    pushToHistory(newBlocks);
  }, [canvasBlocks, pushToHistory]);

  const toggleLock = useCallback((id: string) => {
    const newBlocks = canvasBlocks.map(b => 
      b.id === id ? { ...b, locked: !b.locked } : b
    );
    pushToHistory(newBlocks);
  }, [canvasBlocks, pushToHistory]);

  const updateBlockVariant = useCallback((id: string, variant: string) => {
    const newBlocks = canvasBlocks.map(b => 
      b.id === id ? { ...b, variant } : b
    );
    pushToHistory(newBlocks);
  }, [canvasBlocks, pushToHistory]);

  const updateBlockSettings = useCallback((id: string, settings: BlockSettings) => {
    const newBlocks = canvasBlocks.map(b => 
      b.id === id ? { ...b, settings } : b
    );
    pushToHistory(newBlocks);
  }, [canvasBlocks, pushToHistory]);

  const updateBlockType = useCallback((id: string, typeId: string) => {
    const newBlocks = canvasBlocks.map(b => 
      b.id === id ? { ...b, typeId } : b
    );
    pushToHistory(newBlocks);
  }, [canvasBlocks, pushToHistory]);

  const handleSelectBlock = useCallback((id: string | null) => {
    setSelectedBlockId(id);
  }, []);

  // Triggered from Canvas to edit settings
  const handleEditSettings = useCallback((id: string) => {
    setSelectedBlockId(id);
    setRightPanel('properties');
    if (!showNavigator) {
      setShowNavigator(true);
    }
    // Small toast to provide feedback
    toast.info("Opening block settings", {
        duration: 2000,
    });
  }, [showNavigator]);

  // Handle navigation link clicks - navigate between pages in the builder
  const handleNavLinkClick = useCallback((url: string) => {
    // Find page by slug
    const targetPage = pages.find(p => p.slug === url);
    if (targetPage) {
      handleSwitchPage(targetPage.id);
      toast.info(`Navigated to ${targetPage.name}`, { duration: 2000 });
    } else if (url.startsWith('#')) {
      // Hash links - scroll to element (in preview mode)
      toast.info(`Anchor link: ${url}`, { duration: 2000 });
    } else if (url.startsWith('http://') || url.startsWith('https://')) {
      // External links - show info in builder
      toast.info(`External link: ${url}`, { duration: 2000 });
    } else {
      // Unknown internal link - offer to create page
      toast.info(`Page "${url}" not found. Create it in the Navigator panel.`, { duration: 3000 });
    }
  }, [pages, handleSwitchPage]);

  const handleMoveBlockDirectional = useCallback((blockId: string, dir: 'up' | 'down') => {
      const index = canvasBlocks.findIndex(b => b.id === blockId);
      if (index === -1) return;
      
      // Bounds check
      if ((dir === 'up' && index === 0) || (dir === 'down' && index === canvasBlocks.length - 1)) {
          return;
      }

      const block = canvasBlocks[index];
      const targetIndex = dir === 'up' ? index - 1 : index + 1;

      // Navigation block must stay at index 0 - block all movement
      if (isNavBlock(block.typeId)) {
          toast.info("Navigation must stay at the top of the page.", { duration: 2000 });
          return;
      }

      // Prevent other blocks from moving above nav block at index 0
      const navAtTop = canvasBlocks.length > 0 && isNavBlock(canvasBlocks[0].typeId);
      if (navAtTop && targetIndex === 0) {
          toast.info("Cannot move above the navigation block.", { duration: 2000 });
          return;
      }

      const newBlocks = [...canvasBlocks];
      
      // Swap using destructuring
      [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
      
      pushToHistory(newBlocks);
  }, [canvasBlocks, pushToHistory, isNavBlock]);

  // --- Arrow Key Navigation Between Blocks ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPreviewMode) return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || (e.target as HTMLElement)?.isContentEditable) return;
      if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;

      const visibleBlocks = canvasBlocks.filter(b => !b.hidden);
      if (visibleBlocks.length === 0) return;

      // Only preventDefault once we know we'll handle the event
      e.preventDefault();

      const dir = e.key === 'ArrowUp' ? 'up' : 'down';

      // No block selected — just select first/last
      if (!selectedBlockId) {
        setSelectedBlockId(dir === 'down' ? visibleBlocks[0].id : visibleBlocks[visibleBlocks.length - 1].id);
        return;
      }

      const currentIndex = visibleBlocks.findIndex(b => b.id === selectedBlockId);
      if (currentIndex === -1) {
        setSelectedBlockId(visibleBlocks[0].id);
        return;
      }

      // Plain arrow = navigate selection, Ctrl/Cmd+arrow = reorder block
      if (e.ctrlKey || e.metaKey) {
        // Skip reorder for nav blocks - they are locked to top
        const selectedBlock = canvasBlocks.find(b => b.id === selectedBlockId);
        if (selectedBlock && isNavBlock(selectedBlock.typeId)) {
          toast.info("Navigation must stay at the top of the page.", { duration: 2000 });
        } else {
          handleMoveBlockDirectional(selectedBlockId, dir);
        }
      } else {
        const nextIndex = dir === 'up' ? currentIndex - 1 : currentIndex + 1;
        if (nextIndex >= 0 && nextIndex < visibleBlocks.length) {
          const nextBlockId = visibleBlocks[nextIndex].id;
          setSelectedBlockId(nextBlockId);
          
          // Scroll into view
          requestAnimationFrame(() => {
            const el = document.querySelector(`[data-block-id="${nextBlockId}"]`);
            el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Listen for keydown events from iframes
    const handleMessage = (event: MessageEvent) => {
        if (event.data && event.data.type === 'IFRAME_KEYDOWN') {
             const { key, code, shiftKey, ctrlKey, metaKey, altKey } = event.data;
             if (key === 'ArrowUp' || key === 'ArrowDown') {
                 // Dispatch as if it happened on the window
                 const newEvent = new KeyboardEvent('keydown', {
                     key,
                     code,
                     shiftKey,
                     ctrlKey,
                     metaKey,
                     altKey,
                     bubbles: true,
                     cancelable: true
                 });
                 // We need to bypass the "target" check in handleKeyDown because target will be null or body
                 // But handleKeyDown checks target tagName. If we dispatch on window, target might be body?
                 window.dispatchEvent(newEvent);
             }
        }
    };
    window.addEventListener('message', handleMessage);

    return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('message', handleMessage);
    };
  }, [canvasBlocks, selectedBlockId, isPreviewMode, handleMoveBlockDirectional, isNavBlock]);

  // --- Render Views ---
  const renderMainContent = () => {
    if (isPreviewMode) {
         return (
             <div className="flex-1 overflow-y-auto custom-scrollbar bg-background relative flex items-center justify-center">
                 <div style={{ width: breakpoint, maxWidth: '100%' }} className="transition-all duration-300 mx-auto shadow-2xl h-full bg-background border-x border-border">
                     <ResponsiveContainer
                        html={generateFullPageHtml(canvasBlocks)}
                        className="h-full w-full"
                        title="Live Preview"
                        onNavLinkClick={handleNavLinkClick}
                     />
                 </div>
             </div>
         )
    }

    if (rightPanel === 'assets') {
      return <AssetsPanel />;
    }

    if (rightPanel === 'theme') {
      return (
        <div className="flex flex-1 overflow-hidden relative justify-center bg-muted/20 p-6">
           <div className="w-full max-w-lg h-fit bg-background border border-border rounded-xl shadow-lg overflow-hidden">
              <ThemeBuilder />
           </div>
        </div>
      );
    }

    if (rightPanel === 'audit') {
        return <AuditLogPanel />;
    }

    return (
      <div className="flex flex-1 overflow-hidden relative">
        {showSidebar && (
          <Sidebar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onDragStart={() => {}} 
            onDragEnd={() => {}}
            onOpenThemeSettings={() => {
              setRightPanel('theme');
            }}
            onOpenAuditLog={() => {
              setRightPanel('audit');
            }}
            onClose={() => setShowSidebar(false)}
            onAddBlock={(typeId) => {
              handleDropBlock(typeId);
              // Close sidebar on mobile/tablet where it overlays content
              if (window.innerWidth < 1024) {
                setShowSidebar(false);
              }
            }}
          />
        )}
        
        <Canvas 
          blocks={canvasBlocks}
          breakpoint={breakpoint}
          onDropBlock={handleDropBlock} 
          onDeleteBlock={deleteBlock}
          onMoveBlock={handleMoveBlockDirectional}
          onAddBlock={addDefaultBlock}
          selectedBlockId={selectedBlockId}
          onSelectBlock={handleSelectBlock}
          onEditSettings={handleEditSettings}
          onUpdateVariant={updateBlockVariant}
          onUpdateSettings={updateBlockSettings}
          onReorderBlock={moveBlock}
          onNavLinkClick={handleNavLinkClick}
        />

        {showNavigator && (
          <Navigator 
            blocks={canvasBlocks}
            activeTab={rightPanel}
            setActiveTab={setRightPanel}
            onDeleteBlock={deleteBlock}
            onToggleVisibility={toggleVisibility}
            onToggleLock={toggleLock}
            onReorderBlock={moveBlock} 
            selectedBlockId={selectedBlockId}
            setSelectedBlockId={handleSelectBlock}
            onUpdateBlockVariant={updateBlockVariant}
            onUpdateBlockSettings={updateBlockSettings}
            onUpdateBlockType={updateBlockType}
            onClose={() => setShowNavigator(false)}
            pages={pages}
            activePageId={activePageId}
            onSwitchPage={handleSwitchPage}
            onAddPage={handleAddPage}
            onDeletePage={handleDeletePage}
          />
        )}
      </div>
    );
  };

  if (initError) {
    return (
      <div className="flex items-center justify-center h-screen bg-background text-foreground p-8">
        <div className="max-w-2xl w-full bg-card border border-border rounded-lg p-8">
          <h1 className="text-2xl font-bold mb-4 text-destructive">Initialization Error</h1>
          <p className="text-muted-foreground mb-4">{initError}</p>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
          >
            Clear Data & Reload
          </button>
        </div>
      </div>
    );
  }

  return (
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
      <ThemeProvider>
        <div className="flex flex-col h-screen w-full bg-background text-foreground overflow-hidden font-sans">
          <TopNav 
            activeTab={rightPanel} 
            setActiveTab={setRightPanel}
            breakpoint={breakpoint}
            setBreakpoint={setBreakpoint}
            undo={undo}
            redo={redo}
            canUndo={historyIndex > 0}
            canRedo={historyIndex < ((history && history.length) || 0) - 1}
            isSidebarOpen={showSidebar}
            setIsSidebarOpen={setShowSidebar}
            isNavigatorOpen={showNavigator}
            setIsNavigatorOpen={setShowNavigator}
            blocks={canvasBlocks || []}
            isPreviewMode={isPreviewMode}
            setIsPreviewMode={setIsPreviewMode}
          />
          
          {renderMainContent()}
          
          <Toaster position="bottom-right" />
        </div>
      </ThemeProvider>
    </DndProvider>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}
