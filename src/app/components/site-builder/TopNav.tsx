import React, { useState } from "react";
import { 
  LayoutGrid,
  Eye,
  Send,
  Settings,
  HelpCircle,
  Monitor,
  Tablet,
  Smartphone,
  Undo2,
  Redo2,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  Image as ImageIcon,
  Palette,
  Globe,
  Share2,
  Check,
  X
} from "lucide-react";
import { cn } from "../ui/utils";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "../ui/dialog";
import { ResponsiveContainer } from "./ResponsiveContainer";
import { BLOCK_REGISTRY } from "./block-registry";
import { HelpModal } from "./HelpModal";
import { generateFullPageHtml } from "../../utils/generate-html";

interface TopNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  breakpoint: number;
  setBreakpoint: (bp: number) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  isNavigatorOpen: boolean;
  setIsNavigatorOpen: (isOpen: boolean) => void;
  blocks?: {id: string, typeId: string, hidden?: boolean, settings?: any, variant?: string}[];
  isPreviewMode?: boolean;
  setIsPreviewMode?: (isPreview: boolean) => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  setActiveTab,
  breakpoint,
  setBreakpoint,
  undo,
  redo,
  canUndo,
  canRedo,
  isSidebarOpen,
  setIsSidebarOpen,
  isNavigatorOpen,
  setIsNavigatorOpen,
  blocks = [],
  isPreviewMode = false,
  setIsPreviewMode
}) => {
  const [isPublishOpen, setIsPublishOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [publishStep, setPublishStep] = useState<'preview' | 'success'>('preview');
  const [modalWidth, setModalWidth] = useState(800);
  const [modalHeight, setModalHeight] = useState(600);
  const [isResizing, setIsResizing] = useState(false);
  const resizeRef = React.useRef<{ startX: number; startY: number; startWidth: number; startHeight: number } | null>(null);
  
  const breakpoints = [
    { label: "Mobile", size: 375, icon: Smartphone },
    { label: "Tablet", size: 768, icon: Tablet },
    { label: "Horizontal", size: 1024, icon: Tablet, rotate: true },
    { label: "Laptop", size: 1280, icon: Monitor }, 
    { label: "Desktop", size: 1440, icon: Monitor }
  ];

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    resizeRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startWidth: modalWidth,
      startHeight: modalHeight
    };
  };

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !resizeRef.current) return;
      
      const deltaX = e.clientX - resizeRef.current.startX;
      const deltaY = e.clientY - resizeRef.current.startY;
      
      const newWidth = Math.max(400, Math.min(1600, resizeRef.current.startWidth + deltaX));
      const newHeight = Math.max(300, Math.min(800, resizeRef.current.startHeight + deltaY));
      
      setModalWidth(newWidth);
      setModalHeight(newHeight);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      resizeRef.current = null;
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isResizing]);

  if (isPreviewMode) {
      return (
        <nav className="h-14 bg-background border-b border-border flex items-center justify-between px-4 z-50 shrink-0 sticky top-0 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold shadow-sm">SB</div>
                <span className="font-semibold tracking-tight text-sm hidden md:block">Preview Mode</span>
            </div>
            
            {/* Breakpoint Switcher for Preview */}
             <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-1 bg-secondary/50 p-1 rounded-lg">
                {breakpoints.map((bp) => (
                <button
                    key={bp.size}
                    onClick={() => setBreakpoint(bp.size)}
                    className={cn(
                    "p-1.5 rounded-md transition-all relative group",
                    breakpoint === bp.size 
                        ? "bg-background shadow-sm text-foreground" 
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                    title={`${bp.label} (${bp.size}px)`}
                >
                    <bp.icon className={cn("w-4 h-4", bp.rotate && "rotate-90")} />
                </button>
                ))}
            </div>

            <button 
                onClick={() => setIsPreviewMode && setIsPreviewMode(false)}
                className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 text-foreground text-xs font-semibold rounded-md transition-all"
            >
                <X className="w-3.5 h-3.5" />
                Exit Preview
            </button>
        </nav>
      )
  }

  return (
    <nav className="h-14 bg-background/80 backdrop-blur-md border-b border-border flex items-center justify-between px-4 z-50 shrink-0 sticky top-0">
      {/* Left: Brand & Tabs */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
           <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className={cn(
                    "p-2 rounded-md transition-all mr-2",
                    isSidebarOpen ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
                title="Toggle Component Rail"
            >
                {isSidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
            </button>
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold shadow-sm">SB</div>
          <span className="font-semibold tracking-tight text-sm hidden md:block">Site Builder</span>
          <button 
            onClick={() => setIsHelpOpen(true)}
            className="p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors ml-1"
            title="Help & Information"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>

        <div className="h-6 w-px bg-border hidden md:block" />

        <div className="flex items-center gap-1 bg-secondary/50 p-1 rounded-lg">
          <button 
            onClick={() => setActiveTab("builder")}
            className={cn(
              "px-3 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-2",
              activeTab === "builder" 
                ? "bg-background shadow-sm text-foreground" 
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
            title="Site Builder"
          >
            <LayoutGrid className="w-4 h-4 md:hidden" />
            <span className="hidden md:inline">Site Builder</span>
          </button>
          <button 
            onClick={() => setActiveTab("assets")}
            className={cn(
              "px-3 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-2",
              activeTab === "assets" 
                ? "bg-background shadow-sm text-foreground" 
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
            title="Assets"
          >
            <ImageIcon className="w-4 h-4 md:hidden" />
            <span className="hidden md:inline">Assets</span>
          </button>
          <button 
            onClick={() => setActiveTab("theme")}
            className={cn(
              "px-3 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-2",
              activeTab === "theme" 
                ? "bg-background shadow-sm text-foreground" 
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
            title="Theme"
          >
            <Palette className="w-4 h-4 md:hidden" />
            <span className="hidden md:inline">Theme</span>
          </button>
        </div>
      </div>

      {/* Center: Breakpoints */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-1 bg-secondary/50 p-1 rounded-lg">
        {breakpoints.map((bp) => (
          <button
            key={bp.size}
            onClick={() => setBreakpoint(bp.size)}
            className={cn(
              "p-1.5 rounded-md transition-all relative group",
              breakpoint === bp.size 
                ? "bg-background shadow-sm text-foreground" 
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
            title={`${bp.label} (${bp.size}px)`}
          >
            <bp.icon className={cn("w-4 h-4", bp.rotate && "rotate-90")} />
            <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-[10px] px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 border border-border">
               {bp.label} - {bp.size}px
            </span>
          </button>
        ))}
        <div className="w-px h-4 bg-border mx-1" />
        <span className="text-[10px] font-mono text-muted-foreground px-2">{breakpoint}px</span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 mr-2">
          <button 
            onClick={undo} 
            disabled={!canUndo} 
            className="p-2 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
            title="Undo"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button 
            onClick={redo} 
            disabled={!canRedo} 
            className="p-2 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
            title="Redo"
          >
            <Redo2 className="w-4 h-4" />
          </button>
        </div>
        
        <button 
            onClick={() => setIsPreviewMode && setIsPreviewMode(true)}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
          Preview
        </button>
        
        <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors">
          <Share2 className="w-3.5 h-3.5" />
          Share
        </button>

        <Dialog open={isPublishOpen} onOpenChange={(open) => {
            setIsPublishOpen(open);
            if (!open) setTimeout(() => setPublishStep('preview'), 300);
        }}>
            <DialogTrigger asChild>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-xs font-semibold rounded-md shadow-sm hover:bg-primary/90 transition-all">
                    <Globe className="w-3.5 h-3.5" />
                    Publish
                </button>
            </DialogTrigger>
            <DialogContent 
                className="flex flex-col bg-background border-border overflow-hidden p-[0px] group" 
                style={{ width: `${modalWidth}px`, height: `${modalHeight}px`, maxWidth: 'calc(100vw - 2rem)', maxHeight: 'calc(100vh - 2rem)' }}
                aria-describedby={undefined}
            >
                {publishStep === 'preview' ? (
                    <>
                        <div className="flex items-center gap-6 p-6 pr-16 border-b border-border bg-background shrink-0">
                             <div className="flex items-center gap-4">
                                <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                                    <Globe className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <DialogTitle className="font-sans font-bold whitespace-nowrap" style={{ fontSize: 'var(--text-lg)' }}>Publish to Web</DialogTitle>
                                    <p className="font-sans text-muted-foreground whitespace-nowrap" style={{ fontSize: 'var(--text-sm)' }}>Preview your live site before publishing.</p>
                                </div>
                             </div>
                             <div className="flex items-center gap-3 ml-auto shrink-0">
                                <button 
                                    onClick={() => setIsPublishOpen(false)} 
                                    className="px-4 py-2 font-sans text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted/50 whitespace-nowrap" 
                                    style={{ fontSize: 'var(--text-sm)' }}
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={() => setPublishStep('success')}
                                    className="px-5 py-2 bg-primary text-primary-foreground font-sans font-semibold rounded-md hover:bg-primary/90 transition-all whitespace-nowrap"
                                    style={{ fontSize: 'var(--text-sm)' }}
                                >
                                    Publish Now
                                </button>
                             </div>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto custom-scrollbar bg-muted/30 p-8 min-h-0">
                            <div 
                                className="mx-auto bg-background rounded-xl shadow-2xl overflow-hidden border border-border"
                                style={{ width: `${modalWidth}px`, maxWidth: '100%' }}
                            >
                                {/* Browser Bar Mockup */}
                                <div className="h-8 bg-muted border-b flex items-center px-4 gap-2 shrink-0">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                                    </div>
                                    <div className="flex-1 mx-4 bg-background/50 h-5 rounded flex items-center justify-center text-[10px] text-muted-foreground font-mono">
                                        design-handoff.com/live-preview
                                    </div>
                                </div>
                                <div 
                                    className="bg-background overflow-y-auto custom-scrollbar"
                                    style={{ height: `${modalHeight - 200}px` }}
                                >
                                     <ResponsiveContainer 
                                        html={generateFullPageHtml(blocks)} 
                                        className="min-h-full" 
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-background to-background" />
                        
                        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-8 animate-in zoom-in duration-500 relative z-10">
                            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
                                <Check className="w-8 h-8 text-primary-foreground" />
                            </div>
                        </div>
                        
                        <h2 className="text-3xl font-bold mb-4 relative z-10">Your site is live!</h2>
                        <p className="text-muted-foreground max-w-md mb-8 text-lg relative z-10">
                            Congratulations! Your landing page has been successfully published and is now available to the world.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                            <button className="px-8 py-3 bg-secondary text-foreground font-medium rounded-lg hover:bg-secondary/80 transition-all flex items-center gap-2">
                                Copy Link
                            </button>
                            <a 
                                href="#" 
                                onClick={(e) => { e.preventDefault(); setIsPublishOpen(false); }}
                                className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg shadow-lg hover:bg-primary/90 transition-all"
                            >
                                View Live Site
                            </a>
                        </div>
                    </div>
                )}
                
                {/* Modal Resize Handles */}
                <div
                    onMouseDown={handleResizeStart}
                    className={cn(
                        "absolute bottom-0 right-0 w-8 h-8 cursor-nwse-resize opacity-0 group-hover:opacity-100 transition-opacity z-50",
                        isResizing && "opacity-100"
                    )}
                    style={{
                        background: 'linear-gradient(135deg, transparent 50%, var(--color-primary) 50%)'
                    }}
                    title="Drag to resize modal"
                />
                <div
                    onMouseDown={handleResizeStart}
                    className={cn(
                        "absolute top-0 right-0 bottom-0 w-2 cursor-ew-resize bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/50 z-50",
                        isResizing && "opacity-100 bg-primary/50"
                    )}
                    title="Drag to resize width"
                />
                <div
                    onMouseDown={handleResizeStart}
                    className={cn(
                        "absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/50 z-50",
                        isResizing && "opacity-100 bg-primary/50"
                    )}
                    title="Drag to resize height"
                />
            </DialogContent>
        </Dialog>

         <button 
            onClick={() => setIsNavigatorOpen(!isNavigatorOpen)}
            className={cn(
                "p-2 rounded-md transition-all ml-2",
                isNavigatorOpen ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
            title="Toggle Navigator"
        >
            {isNavigatorOpen ? <PanelRightClose className="w-5 h-5" /> : <PanelRightOpen className="w-5 h-5" />}
        </button>
      </div>
      
      <HelpModal open={isHelpOpen} onOpenChange={setIsHelpOpen} />
    </nav>
  );
};
