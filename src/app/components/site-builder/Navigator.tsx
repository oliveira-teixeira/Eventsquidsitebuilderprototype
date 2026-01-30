import React, { useRef, useEffect, useLayoutEffect, useState } from "react";
import { Layers, Palette, Eye, EyeOff, Lock, Unlock, ChevronRight, Settings2, GripVertical, Trash2, X, FileText, Plus } from "lucide-react";
import { BLOCK_REGISTRY, BlockSettings } from "./block-registry";
import { ThemeBuilder } from "./ThemeBuilder";
import { PropertiesPanel } from "./PropertiesPanel";
import { PageListItem } from "./PageListItem";
import { cn } from "../ui/utils";
import { useDrag, useDrop } from "react-dnd";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface Block {
  id: string;
  typeId: string;
  hidden?: boolean;
  locked?: boolean;
  variant?: string;
  settings?: BlockSettings;
}

interface Page {
    id: string;
    name: string;
    slug: string;
    blocks: Block[];
}

interface NavigatorProps {
  blocks: Block[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onDeleteBlock: (id: string) => void;
  onToggleVisibility: (id: string) => void;
  onToggleLock: (id: string) => void;
  onReorderBlock: (dragIndex: number, hoverIndex: number) => void;
  selectedBlockId: string | null;
  setSelectedBlockId: (id: string | null) => void;
  onUpdateBlockVariant: (id: string, variant: string) => void;
  onUpdateBlockSettings: (id: string, settings: BlockSettings) => void;
  onUpdateBlockType: (id: string, typeId: string) => void;
  onClose?: () => void;
  pages?: Page[];
  activePageId?: string;
  onSwitchPage?: (id: string) => void;
  onAddPage?: (name: string, slug: string) => void;
  onDeletePage?: (id: string) => void;
}

// Draggable Item Component
const SortableLayer = ({ 
  block, 
  index, 
  moveBlock, 
  selectedBlockId, 
  setSelectedBlockId, 
  onToggleVisibility, 
  onToggleLock,
  onDeleteBlock
}: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const definition = BLOCK_REGISTRY.find(d => d.id === block.typeId);

  const [{ handlerId, isOverCurrent }, drop] = useDrop({
    accept: 'layer',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        isOverCurrent: monitor.isOver({ shallow: true }),
      };
    },
    hover(item: any, monitor) {
      if (!ref.current) return;
      
      // Use ID to find actual indices to avoid stale index issues
      const dragId = item.id;
      if (dragId === block.id) return; // Don't replace with self
      
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Get current indices based on the actual item.index which gets updated
      const dragIndex = item.index;
      const hoverIndex = index;
      
      if (dragIndex === hoverIndex) return;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveBlock(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: 'layer',
    item: () => {
      return { id: block.id, index };
    },
    collect: (monitor) => {
      // Only mark as dragging if this specific block's ID matches the dragged item
      const item = monitor.getItem();
      return {
        isDragging: monitor.isDragging() && item?.id === block.id,
      };
    },
  });

  // Connect drag source to handle
  drag(dragRef);
  
  // Connect drop target to main row
  drop(ref);
  
  // Connect preview to main row
  preview(ref);

  return (
    <div 
      ref={ref}
      data-handler-id={handlerId}
      onClick={() => setSelectedBlockId(block.id)}
      className={cn(
        "group flex items-center gap-2 p-2 rounded-md cursor-pointer text-sm transition-all border border-transparent select-none relative",
        selectedBlockId === block.id 
          ? "bg-primary/10 border-primary/20 text-primary" 
          : "hover:bg-muted/60 text-muted-foreground hover:text-foreground",
        isDragging ? "opacity-0" : "opacity-100"
      )}
    >
      {/* Drag Handle */}
      <div ref={dragRef} className="cursor-grab active:cursor-grabbing text-muted-foreground/30 hover:text-foreground p-1 -ml-1">
         <GripVertical className="w-3.5 h-3.5" />
      </div>

      <div className="w-4 h-4 flex items-center justify-center opacity-70">
        {definition && definition.icon ? <div className="w-3 h-3 text-current scale-75">{/* Icons from registry */}</div> : <Layers className="w-3 h-3" />}
      </div>
      
      <span className={cn("flex-1 truncate font-medium text-xs", block.hidden && "opacity-50 line-through")}>
        {definition && definition.name ? (definition.name.split(':')[1] || definition.name) : "Unknown Block"}
      </span>
      
      <div className={cn("flex items-center gap-1 transition-opacity bg-background/80 backdrop-blur-sm rounded-sm px-1", selectedBlockId === block.id ? "opacity-100" : "opacity-0 group-hover:opacity-100")}>
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleVisibility(block.id); }}
          className="p-1 hover:bg-muted rounded hover:text-foreground text-muted-foreground transition-colors"
          title={block.hidden ? "Show" : "Hide"}
        >
          {block.hidden ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleLock(block.id); }}
          className="p-1 hover:bg-muted rounded hover:text-foreground text-muted-foreground transition-colors"
          title={block.locked ? "Unlock" : "Lock"}
        >
          {block.locked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onDeleteBlock(block.id); }}
          className="p-1 hover:bg-destructive/10 rounded hover:text-destructive text-muted-foreground transition-colors"
          title="Delete"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

export const Navigator: React.FC<NavigatorProps> = ({
  blocks,
  activeTab,
  setActiveTab,
  onDeleteBlock,
  onToggleVisibility,
  onToggleLock,
  onReorderBlock,
  selectedBlockId,
  setSelectedBlockId,
  onUpdateBlockVariant,
  onUpdateBlockSettings,
  onUpdateBlockType,
  onClose,
  pages = [],
  activePageId,
  onSwitchPage,
  onAddPage,
  onDeletePage
}) => {
  const selectedBlock = blocks.find(b => b.id === selectedBlockId);
  const selectedBlockDef = selectedBlock ? BLOCK_REGISTRY.find(d => d.id === selectedBlock.typeId) : null;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef<number>(0);
  const isUpdatingRef = useRef(false);

  const [isAddPageOpen, setIsAddPageOpen] = useState(false);
  const [newPageName, setNewPageName] = useState("");
  const [newPageSlug, setNewPageSlug] = useState("");

  const handleCreatePage = () => {
      if (onAddPage && newPageName) {
          // Auto-generate slug if empty
          const slug = newPageSlug || `/${newPageName.toLowerCase().replace(/\s+/g, '-')}`;
          onAddPage(newPageName, slug);
          setIsAddPageOpen(false);
          setNewPageName("");
          setNewPageSlug("");
      }
  };

  // Store scroll position before any updates
  useLayoutEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (!isUpdatingRef.current) {
        scrollPositionRef.current = container.scrollTop;
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Restore scroll position after settings updates
  useLayoutEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || activeTab !== 'properties') return;

    isUpdatingRef.current = true;
    const savedPosition = scrollPositionRef.current;
    
    // Restore immediately
    container.scrollTop = savedPosition;
    
    // Double-check after browser paint
    requestAnimationFrame(() => {
      container.scrollTop = savedPosition;
      isUpdatingRef.current = false;
    });
  }, [selectedBlock && selectedBlock.settings, selectedBlock && selectedBlock.variant, activeTab]);

  return (
    <aside className="w-full sm:w-80 bg-background border-l border-border flex flex-col shrink-0 z-40 h-full transition-all shadow-xl max-md:absolute max-md:inset-y-0 max-md:right-0 max-md:z-50">
      {/* Tabs */}
      <div className="flex h-14 border-b border-border p-2 gap-1 items-center bg-muted/10">
        <button 
          onClick={() => setActiveTab('navigator')}
          className={cn(
            "flex-1 h-9 rounded-md text-xs font-semibold flex items-center justify-center gap-2 transition-all",
            activeTab === 'navigator' ? "bg-background shadow-sm text-foreground ring-1 ring-border" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
          )}
        >
          <Layers className="w-3.5 h-3.5" /> Layers
        </button>
        <button 
          onClick={() => setActiveTab('pages')}
          className={cn(
            "flex-1 h-9 rounded-md text-xs font-semibold flex items-center justify-center gap-2 transition-all",
            activeTab === 'pages' ? "bg-background shadow-sm text-foreground ring-1 ring-border" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
          )}
        >
          <FileText className="w-3.5 h-3.5" /> Pages
        </button>
        <button 
          onClick={() => setActiveTab('properties')}
          className={cn(
            "flex-1 h-9 rounded-md text-xs font-semibold flex items-center justify-center gap-2 transition-all",
            activeTab === 'properties' ? "bg-background shadow-sm text-foreground ring-1 ring-border" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
          )}
        >
          <Settings2 className="w-3.5 h-3.5" /> Props
        </button>
        {onClose && (
            <button 
                onClick={onClose}
                className="p-2 ml-1 bg-background/50 rounded-md text-muted-foreground hover:text-foreground md:hidden"
            >
                <X className="w-4 h-4" />
            </button>
        )}
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto custom-scrollbar bg-background"
        style={{ 
          scrollBehavior: 'auto',
          overflowAnchor: 'none'
        }}
      >
        {activeTab === 'navigator' && (
          <div className="space-y-4 animate-in fade-in duration-200">
             <div className="flex items-center justify-between px-4 pt-4 pb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">DOM Tree</span>
                <span className="text-[10px] font-mono opacity-50 bg-muted px-1.5 py-0.5 rounded border border-border">index.html</span>
             </div>

             <div className="space-y-0.5 px-2 pb-4">
                {blocks.map((block, index) => (
                  <SortableLayer 
                    key={block.id} 
                    block={block} 
                    index={index} 
                    moveBlock={onReorderBlock} 
                    selectedBlockId={selectedBlockId}
                    setSelectedBlockId={setSelectedBlockId}
                    onToggleVisibility={onToggleVisibility}
                    onToggleLock={onToggleLock}
                    onDeleteBlock={onDeleteBlock}
                  />
                ))}
                {blocks.length === 0 && (
                   <div className="p-8 text-center flex flex-col items-center justify-center gap-2 text-muted-foreground">
                     <Layers className="w-8 h-8 opacity-20" />
                     <span className="text-xs italic">Page is empty</span>
                   </div>
                )}
             </div>
          </div>
        )}

        {activeTab === 'pages' && (
          <div className="space-y-4 animate-in fade-in duration-200">
             <div className="flex items-center justify-between px-4 pt-4 pb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Site Pages</span>
                <Dialog open={isAddPageOpen} onOpenChange={setIsAddPageOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Plus className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Page</DialogTitle>
                      <DialogDescription>
                        Create a new page for your site.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="name"
                          value={newPageName}
                          onChange={(e) => setNewPageName(e.target.value)}
                          className="col-span-3"
                          placeholder="e.g. About Us"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="slug" className="text-right">
                          Slug
                        </Label>
                        <Input
                          id="slug"
                          value={newPageSlug}
                          onChange={(e) => setNewPageSlug(e.target.value)}
                          className="col-span-3"
                          placeholder="e.g. /about"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleCreatePage}>Create Page</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
             </div>

             <div className="space-y-1 px-2 pb-4">
                {pages.map((page) => (
                   <div key={page.id} className="relative group">
                     <PageListItem
                        icon={FileText}
                        label={page.name}
                        isActive={activePageId === page.id}
                        onClick={() => onSwitchPage && onSwitchPage(page.id)}
                     />
                     {pages.length > 1 && (
                       <button
                         onClick={(e) => { e.stopPropagation(); onDeletePage && onDeletePage(page.id); }}
                         className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all bg-background shadow-sm rounded-md border border-border"
                         title="Delete Page"
                       >
                         <Trash2 className="w-3.5 h-3.5" />
                       </button>
                     )}
                   </div>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'properties' && (
          <PropertiesPanel 
            selectedBlockId={selectedBlockId}
            selectedBlockType={selectedBlock && selectedBlock.typeId}
            selectedVariant={(selectedBlock && selectedBlock.variant) || 'default'}
            selectedSettings={selectedBlock && selectedBlock.settings}
            toggleableElements={selectedBlockDef && selectedBlockDef.toggleableElements}
            configurableButtons={selectedBlockDef && selectedBlockDef.configurableButtons}
            configurableImages={selectedBlockDef && selectedBlockDef.configurableImages}
            configurableIcons={selectedBlockDef && selectedBlockDef.configurableIcons}
            configurableCounts={selectedBlockDef && selectedBlockDef.configurableCounts}
            configurableColors={selectedBlockDef && selectedBlockDef.configurableColors}
            configurableSelects={selectedBlockDef && selectedBlockDef.configurableSelects}
            configurableRanges={selectedBlockDef && selectedBlockDef.configurableRanges}
            onChangeVariant={(v) => selectedBlockId && onUpdateBlockVariant(selectedBlockId, v)}
            onChangeSettings={(s) => selectedBlockId && onUpdateBlockSettings(selectedBlockId, s)}
            onChangeType={(t) => selectedBlockId && onUpdateBlockType(selectedBlockId, t)}
            blockName={(selectedBlockDef && selectedBlockDef.name) || "Selection"}
          />
        )}
      </div>
    </aside>
  );
};
