import React, { useEffect, useRef, useState } from "react";
import { Search, Palette, LayoutGrid, Type, Users, Calendar, Megaphone, Clock, MapPin, FileText, X, History, Sparkles } from "lucide-react";
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
  
  // Get unique categories from non-hidden blocks
  const categories = Array.from(new Set(BLOCK_REGISTRY.filter(b => b.hidden !== true).map(b => b.category)));
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);

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
        const current = searchInputRef.current;
        if (current) {
          current.focus();
        }
      }
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        const current = searchInputRef.current;
        if (current) {
          current.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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
    <aside className="w-full sm:w-[450px] bg-background border-r border-border flex flex-col shrink-0 z-40 h-full shadow-lg overflow-hidden max-md:absolute max-md:inset-y-0 max-md:left-0 max-md:z-50 transition-transform duration-300">
      {/* Search Header */}
      <div className="p-4 border-b border-border bg-background sticky top-0 z-10 shrink-0 flex gap-2">
        <div className="relative group flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input 
            ref={searchInputRef}
            type="text" 
            placeholder="Search components..." 
            className="w-full pl-9 pr-10 py-2.5 bg-secondary/50 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:bg-background border border-border/50 focus:border-primary/30 transition-all placeholder:text-muted-foreground/70"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
             <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
               <span className="text-xs">⌘</span>K
             </kbd>
          </div>
        </div>
        {onClose && (
            <button 
                onClick={onClose}
                className="p-2.5 bg-secondary/50 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted md:hidden"
            >
                <X className="w-5 h-5" />
            </button>
        )}
      </div>
      
      <div className="flex flex-1 overflow-hidden">
          {/* Category Rail */}
          {!searchQuery && (
              <div className="w-16 bg-muted/20 border-r border-border flex flex-col items-center py-4 gap-2 shrink-0 overflow-y-auto custom-scrollbar">
                  {/* Category Icons */}
                  <div className="flex flex-col items-center gap-2 flex-1">
                      {categories.map(cat => (
                          <button
                              key={cat}
                              onClick={() => setActiveCategory(cat)}
                              className={cn(
                                  "w-10 h-10 rounded-lg flex items-center justify-center transition-all relative group",
                                  activeCategory === cat 
                                      ? "bg-primary text-primary-foreground shadow-sm" 
                                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                              )}
                              title={cat}
                          >
                              {CATEGORY_ICONS[cat] || <LayoutGrid className="w-4 h-4" />}
                              {activeCategory === cat && (
                                  <div className="absolute left-full ml-2 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                                      {cat}
                                  </div>
                              )}
                          </button>
                      ))}
                  </div>
                  
                  {/* Audit Log Button - Below Resources */}
                  {onOpenAuditLog && (
                      <>
                          <div className="w-8 h-px bg-border my-1" />
                          <button
                              onClick={onOpenAuditLog}
                              className="w-10 h-10 rounded-lg flex items-center justify-center transition-all relative group text-muted-foreground hover:bg-muted hover:text-foreground"
                              title="Audit Log"
                          >
                              <History className="w-4 h-4" />
                              <div className="absolute left-full ml-2 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                                  Audit Log
                              </div>
                          </button>
                      </>
                  )}
              </div>
          )}

          {/* Block Grid */}
          <div className="flex-1 overflow-y-auto custom-scrollbar bg-background p-4">
               {!searchQuery && (
                   <div className="mb-4 pb-2 border-b border-border">
                       <h2 className="text-sm font-bold">{activeCategory}</h2>
                       <p className="text-xs text-muted-foreground">Select a layout to add to your page.</p>
                   </div>
               )}
               
               {displayedBlocks.length > 0 ? (
                   <div className="grid grid-cols-2 gap-4">
                        {displayedBlocks.map((block) => (
                             <DraggableBlockItem key={block.id} block={block} onAddBlock={onAddBlock} />
                        ))}
                   </div>
               ) : (
                   <div className="py-12 text-center text-sm text-muted-foreground flex flex-col items-center gap-3">
                        <Search className="w-8 h-8 opacity-20" />
                        <p>No components found for "{searchQuery}"</p>
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

      {/* Footer Actions */}
      <div className="p-4 border-t border-border bg-muted/10 sticky bottom-0 shrink-0 space-y-2">
        <button 
          onClick={onOpenThemeSettings}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-border bg-background text-xs font-bold hover:bg-muted transition-all shadow-sm"
        >
          <Palette className="w-4 h-4" />
          Theme Settings
        </button>
      </div>
    </aside>
  );
};
