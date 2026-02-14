import React, { useEffect, useRef, useState, useCallback } from "react";
import { Search, Palette, LayoutGrid, Users, Calendar, Megaphone, Clock, MapPin, FileText, X, History, PanelTop, Sparkles } from "lucide-react";
import { BLOCK_REGISTRY } from "./block-registry";
import { cn } from "../ui/utils";
import { useDrag } from "react-dnd";

interface SidebarProps {
  onDragStart: (e: React.DragEvent, typeId: string) => void;
  onDragEnd: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenThemeSettings: () => void;
  onOpenAuditLog?: () => void;
  onClose?: () => void;
  onAddBlock?: (typeId: string) => void;
}

// Map categories to icons
const CATEGORY_ICONS: Record<string, React.ReactNode> = {
    Navigation: <PanelTop className="w-4 h-4" />,
    Hero: <Sparkles className="w-4 h-4" />,
    Agenda: <Calendar className="w-4 h-4" />,
    Speakers: <Users className="w-4 h-4" />,
    Sponsors: <Megaphone className="w-4 h-4" />,
    Countdown: <Clock className="w-4 h-4" />,
    Location: <MapPin className="w-4 h-4" />,
    Resources: <FileText className="w-4 h-4" />
};

// Draggable Sidebar Item Component
const DraggableBlockItem = ({ block, onAddBlock }: { block: any, onAddBlock?: (typeId: string) => void }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'NEW_BLOCK',
    item: { typeId: block.id, type: 'NEW_BLOCK' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div 
      ref={drag}
      onClick={() => onAddBlock && onAddBlock(block.id)}
      className={cn(
        "group cursor-grab active:cursor-grabbing flex flex-col gap-2 w-full transition-all duration-200",
        isDragging ? "opacity-30 scale-95" : "opacity-100 scale-100"
      )}
      title={block.description}
    >
      <div className={cn(
        "aspect-[3/2] bg-card border border-border rounded-lg overflow-hidden relative shadow-sm transition-all duration-200",
        isDragging 
          ? "shadow-2xl ring-2 ring-primary ring-offset-2" 
          : "hover:shadow-md hover:border-primary/50 hover:-translate-y-1 group-active:scale-95 group-active:shadow-sm"
      )}>
         <div className="absolute inset-0 bg-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
         <div className={cn(
           "w-full h-full flex items-center justify-center p-4 transition-colors",
           isDragging ? "text-primary" : "text-muted-foreground/50 group-hover:text-primary"
         )}>
            {block.icon}
         </div>
         {/* Hover Overlay Icon */}
         <div className={cn(
           "absolute inset-0 flex items-center justify-center transition-opacity",
           isDragging ? "opacity-0" : "opacity-0 group-hover:opacity-100"
         )}>
            <div className="w-8 h-8 rounded-full bg-background shadow-lg flex items-center justify-center text-primary scale-0 group-hover:scale-100 transition-transform duration-200">
               <span className="text-xl leading-none">+</span>
            </div>
         </div>
      </div>
      <div className="px-1">
        <span className="text-xs font-medium text-foreground truncate block">{block.name.split(':')[1] || block.name}</span>
        <span className="text-[10px] text-muted-foreground truncate block opacity-70">{block.description}</span>
      </div>
    </div>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ 
  searchQuery, 
  setSearchQuery,
  onOpenThemeSettings,
  onOpenAuditLog,
  onClose,
  onAddBlock
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Get unique categories from non-hidden blocks
  const categories = Array.from(new Set(BLOCK_REGISTRY.filter(b => b.hidden !== true).map(b => b.category)));
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  // Update active category if it disappears (e.g. search)
  useEffect(() => {
    if (!categories.includes(activeCategory) && categories.length > 0) {
        setActiveCategory(categories[0]);
    }
  }, [categories, activeCategory]);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsPanelOpen(true);
        setIsPinned(true);
        const current = searchInputRef.current;
        if (current) {
          requestAnimationFrame(() => current.focus());
        }
      }
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        setIsPanelOpen(true);
        setIsPinned(true);
        const current = searchInputRef.current;
        if (current) {
          requestAnimationFrame(() => current.focus());
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close panel when clicking outside
  useEffect(() => {
    if (!isPanelOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsPanelOpen(false);
        setIsPinned(false);
      }
    };

    // Delay attaching to avoid catching the click that opened it
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPanelOpen]);

  const handleIconClick = useCallback((cat: string) => {
    if (isPinned && activeCategory === cat && isPanelOpen) {
      // Clicking the same pinned icon closes the panel
      setIsPanelOpen(false);
      setIsPinned(false);
    } else {
      setActiveCategory(cat);
      setIsPanelOpen(true);
      setIsPinned(true);
    }
  }, [isPinned, activeCategory, isPanelOpen]);

  const handleRailMouseEnter = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    if (!isPanelOpen) {
      setIsPanelOpen(true);
    }
  }, [isPanelOpen]);

  const handleContainerMouseLeave = useCallback(() => {
    if (isPinned) return; // Don't auto-close if pinned
    hoverTimeoutRef.current = setTimeout(() => {
      setIsPanelOpen(false);
    }, 250);
  }, [isPinned]);

  const handlePanelMouseEnter = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const filteredRegistry = BLOCK_REGISTRY.filter(b => 
    !b.hidden && (
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      b.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  
  const displayedBlocks = searchQuery 
    ? filteredRegistry 
    : filteredRegistry.filter(b => b.category === activeCategory);

  return (
    <div ref={containerRef} className="relative flex h-full shrink-0 z-40" onMouseLeave={handleContainerMouseLeave}>
      {/* Icon Rail - always visible */}
      <div
        className="w-[60px] bg-background border-r border-border flex flex-col items-center py-4 gap-2 shrink-0 h-full"
        onMouseEnter={handleRailMouseEnter}
      >
        {/* Category Icons */}
        <div className="flex flex-col items-center gap-1.5 flex-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleIconClick(cat)}
              className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center transition-all relative group/icon",
                isPanelOpen && activeCategory === cat 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              title={cat}
            >
              {CATEGORY_ICONS[cat] || <LayoutGrid className="w-4 h-4" />}
              {/* Tooltip - only show when panel is closed */}
              {!isPanelOpen && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover/icon:opacity-100 pointer-events-none whitespace-nowrap z-[60] transition-opacity">
                  {cat}
                </div>
              )}
            </button>
          ))}
        </div>
        
        {/* Bottom Actions */}
        <div className="flex flex-col items-center gap-1.5">
          {onOpenAuditLog && (
            <>
              <div className="w-8 h-px bg-border my-1" />
              <button
                onClick={() => {
                  onOpenAuditLog();
                  setIsPanelOpen(false);
                  setIsPinned(false);
                }}
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all relative group/icon text-muted-foreground hover:bg-muted hover:text-foreground"
                title="Audit Log"
              >
                <History className="w-4 h-4" />
                {!isPanelOpen && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover/icon:opacity-100 pointer-events-none whitespace-nowrap z-[60] transition-opacity">
                    Audit Log
                  </div>
                )}
              </button>
            </>
          )}
          <div className="w-8 h-px bg-border my-1" />
          <button
            onClick={() => {
              onOpenThemeSettings();
              setIsPanelOpen(false);
              setIsPinned(false);
            }}
            className="w-10 h-10 rounded-lg flex items-center justify-center transition-all relative group/icon text-muted-foreground hover:bg-muted hover:text-foreground"
            title="Theme Settings"
          >
            <Palette className="w-4 h-4" />
            {!isPanelOpen && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover/icon:opacity-100 pointer-events-none whitespace-nowrap z-[60] transition-opacity">
                Theme Settings
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Overlay Panel - slides in from left */}
      <div
        className={cn(
          "absolute left-[60px] top-0 bottom-0 w-[340px] bg-background border-r border-border shadow-xl z-50 flex flex-col",
          "transition-all duration-300 ease-in-out will-change-transform",
          isPanelOpen
            ? "translate-x-0 opacity-100 pointer-events-auto"
            : "-translate-x-full opacity-0 pointer-events-none"
        )}
        onMouseEnter={handlePanelMouseEnter}
      >
        {/* Search Header */}
        <div className="p-3 border-b border-border bg-background shrink-0 flex gap-2">
          <div className="relative group flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input 
              ref={searchInputRef}
              type="text" 
              placeholder="Search components..." 
              className="w-full pl-9 pr-10 py-2 bg-secondary/50 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:bg-background border border-border/50 focus:border-primary/30 transition-all placeholder:text-muted-foreground/70"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
              <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">{'⌘'}</span>K
              </kbd>
            </div>
          </div>
          <button 
            onClick={() => {
              setIsPanelOpen(false);
              setIsPinned(false);
            }}
            className="p-2 bg-secondary/50 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0"
            title="Close panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Block Grid */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-background p-4">
          {!searchQuery && (
            <div className="mb-4 pb-2 border-b border-border">
              <h2 className="text-sm font-bold">{activeCategory}</h2>
              <p className="text-xs text-muted-foreground">Select a layout to add to your page.</p>
            </div>
          )}
          
          {displayedBlocks.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {displayedBlocks.map((block) => (
                <DraggableBlockItem key={block.id} block={block} onAddBlock={(typeId) => {
                  onAddBlock && onAddBlock(typeId);
                  // Close on mobile
                  if (window.innerWidth < 1024) {
                    setIsPanelOpen(false);
                    setIsPinned(false);
                  }
                }} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-sm text-muted-foreground flex flex-col items-center gap-3">
              <Search className="w-8 h-8 opacity-20" />
              <p>{'No components found for "'}{searchQuery}{'"'}</p>
              <button 
                onClick={() => setSearchQuery("")}
                className="text-xs text-primary hover:underline"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
