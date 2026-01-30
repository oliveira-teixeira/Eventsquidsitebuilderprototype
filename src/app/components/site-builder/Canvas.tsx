import React, { useMemo, useRef, useState } from "react";
import {
  Plus,
  GripVertical,
  Trash2,
  ChevronUp,
  ChevronDown,
  Settings,
  Copy,
  Eye,
  Lock,
  EyeOff,
  Layout
} from "lucide-react";
import { cn } from "../ui/utils";
import { BLOCK_REGISTRY } from "./block-registry";
import { toast } from "sonner";
import { useTheme, generateThemeStyles } from "./ThemeBuilder";
import { useDrop } from "react-dnd";
import { ResponsiveContainer } from "./ResponsiveContainer";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "../ui/command";
import { ImageUploadModal } from "./ImageUploadModal";

interface CanvasProps {
  blocks: {id: string, typeId: string, hidden?: boolean, locked?: boolean, variant?: string, settings?: any}[];
  breakpoint: number;
  onDropBlock: (typeId: string, index?: number) => void;
  onDeleteBlock: (id: string) => void;
  onMoveBlock: (blockId: string, direction: 'up' | 'down') => void;
  onAddBlock: (index: number) => void;
  selectedBlockId: string | null;
  onSelectBlock: (id: string | null) => void;
  onEditSettings: (id: string) => void;
  onUpdateVariant: (id: string, variant: string) => void;
  onUpdateSettings: (id: string, settings: any) => void;
}

export const Canvas: React.FC<CanvasProps> = ({
  blocks,
  breakpoint,
  onDropBlock,
  onDeleteBlock,
  onMoveBlock,
  onAddBlock,
  selectedBlockId,
  onSelectBlock,
  onEditSettings,
  onUpdateVariant,
  onUpdateSettings
}) => {
  const { config } = useTheme();
  const themeStyles = useMemo(() => {
    try {
      return generateThemeStyles(config);
    } catch (error) {
      console.error('Error generating theme styles for canvas:', error);
      return {} as React.CSSProperties;
    }
  }, [config]);
  
  // Scaling Logic for Responsive Preview
  const mainRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [scale, setScale] = useState(1);

  React.useEffect(() => {
    if (!mainRef.current) return;

    let rafId: number | null = null;

    const calculateScale = () => {
        if (!mainRef.current) return;
        
        try {
            const containerWidth = mainRef.current.clientWidth;
            // p-10 = 2.5rem = 40px. Total horizontal padding = 80px.
            // On smaller screens it might be p-0, but we mainly care about desktop scaling here.
            // We'll use a safe buffer to ensure it doesn't touch edges.
            const paddingX = 80; 
            const availableWidth = Math.max(320, containerWidth - paddingX);
            
            // Only scale if content is wider than available space
            if (breakpoint > availableWidth && breakpoint > 0) {
                const newScale = availableWidth / breakpoint;
                // Cap the scale to avoid it becoming invisible or invalid
                const safeScale = Math.max(0.2, Math.min(1, newScale));
                if (isFinite(safeScale)) {
                    setScale(safeScale);
                }
            } else {
                setScale(1);
            }
        } catch (error) {
            console.error('Error calculating scale:', error);
            setScale(1);
        }
    };

    const observer = new ResizeObserver((entries) => {
        // Wrap in RAF to debounce and avoid loop limit errors
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(calculateScale);
    });

    observer.observe(mainRef.current);
    
    // Initial calculation
    calculateScale();

    return () => {
        observer.disconnect();
        if (rafId) cancelAnimationFrame(rafId);
    };
  }, [breakpoint]);

  React.useEffect(() => {
    if (!contentRef.current) return;
    
    const updateHeight = () => {
        if (contentRef.current) {
            try {
                setContentHeight(contentRef.current.scrollHeight);
            } catch (error) {
                console.error('Error updating height:', error);
            }
        }
    };

    // Use a ResizeObserver to track height changes of the content
    const observer = new ResizeObserver(updateHeight);
    observer.observe(contentRef.current);
    
    // Also update on block changes immediately
    updateHeight();

    return () => observer.disconnect();
  }, [blocks]);

  // Drop target for adding new blocks from sidebar
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'NEW_BLOCK',
    drop: (item: { typeId: string }, monitor) => {
      // CRITICAL: Ensure we don't process drops that were already handled by nested DropZones
      if (monitor.didDrop()) return;
      onDropBlock(item.typeId);
      return { handled: true };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
    }),
  }), [onDropBlock]);

  const containerRef = useRef<HTMLDivElement>(null);
  drop(containerRef);

  return (
    <main 
      ref={mainRef}
      className="flex-1 overflow-y-scroll overflow-x-hidden bg-muted/30 relative custom-scrollbar"
      style={{ overflowY: 'scroll', overflowAnchor: 'none' }}
      onClick={() => onSelectBlock(null)}
    >
      <div className="min-h-full w-full flex flex-col items-center justify-center p-0 md:p-10">
        <div
            className="mb-auto"
            style={{
                width: breakpoint,
                transform: `scale(${scale})`,
                transformOrigin: 'top center',
                flexShrink: 0,
                transition: "width 0.3s ease-out, height 0.3s ease-out, transform 0.2s ease-out"
            }}
        >
            <div 
                ref={containerRef}
                style={{ 
                    width: breakpoint,
                }}
            >
                <div
                    ref={contentRef}
                    id="canvas-viewport"
                style={{ 
                ...themeStyles, 
                width: '100%',
                transition: "width 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)" 
                }}
                className={cn(
                "bg-background shadow-2xl min-h-[calc(100vh-8rem)] relative border border-border/50 rounded-sm overflow-hidden",
                isOver && canDrop && "ring-2 ring-primary ring-offset-2"
                )}
                onClick={(e) => e.stopPropagation()} 
            >
                {/* Viewport Info */}
                <div className="absolute top-0 left-0 right-0 h-6 -mt-6 flex justify-center items-center opacity-50 pointer-events-none" style={{ transform: `translateY(-100%)` }}>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground bg-muted px-2 py-0.5 rounded-full border border-border whitespace-nowrap">
                        {breakpoint}px
                    </span>
                </div>

        {/* Blocks Content */}
        <div className="w-full pb-20">
          {blocks.map((block, index) => {
            const definition = BLOCK_REGISTRY.find(d => d.id === block.typeId);
            if (!definition) return null;

            const isSelected = selectedBlockId === block.id;

            if (block.hidden) {
              return (
                <div 
                  key={block.id} 
                  className={cn(
                    "h-12 border-y border-dashed border-border bg-muted/20 flex items-center justify-center text-xs text-muted-foreground gap-2 select-none",
                    isSelected && "ring-2 ring-primary inset-0 z-10 bg-primary/5"
                  )}
                  onClick={(e) => { e.stopPropagation(); onSelectBlock(block.id); }}
                >
                  <EyeOff className="w-3.5 h-3.5" />
                  <span className="font-mono">Hidden: {definition.name}</span>
                </div>
              );
            }

            return (
              <CanvasBlockWrapper
                key={block.id}
                block={block}
                definition={definition}
                index={index}
                totalBlocks={blocks.length}
                isSelected={isSelected}
                breakpoint={breakpoint}
                onSelectBlock={onSelectBlock}
                onAddBlock={onAddBlock}
                onMoveBlock={onMoveBlock}
                onDeleteBlock={onDeleteBlock}
                onDropBlock={onDropBlock} 
                onEditSettings={onEditSettings}
                onUpdateVariant={onUpdateVariant}
                onUpdateSettings={onUpdateSettings}
              />
            );
          })}

          {blocks.length === 0 && (
            <div 
              className="h-[500px] flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-border m-8 rounded-xl bg-muted/10"
            >
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-6 shadow-inner">
                <Plus className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-sans font-semibold mb-2 text-foreground" style={{ fontSize: 'var(--text-xl)' }}>Start Building</h3>
              <p className="font-sans text-muted-foreground mb-8 max-w-sm" style={{ fontSize: 'var(--text-sm)' }}>
                Drag blocks from the sidebar to create your page.
              </p>
              <DropZone 
                index={0} 
                onDropBlock={onDropBlock} 
                onAddBlock={onAddBlock}
                isInitial={true}
              />
            </div>
          )}
          
           {/* Bottom Insertion Area */}
           {blocks.length > 0 && (
             <DropZone 
                index={blocks.length} 
                onDropBlock={onDropBlock} 
                onAddBlock={onAddBlock}
             />
           )}
        </div>
      </div>
     </div>

      {/* Global Drag Overlay */}
      {canDrop && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
        </div>
      )}
     </div>
    </div>
    </main>
  );
};

// --- Helper Components ---

const DropZone = ({ index, onDropBlock, onAddBlock, isInitial = false }: { index: number, onDropBlock: (id: string, idx: number) => void, onAddBlock: (idx: number) => void, isInitial?: boolean }) => {
    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: 'NEW_BLOCK',
        drop: (item: { typeId: string }, monitor) => {
            if (monitor.didDrop()) return;
            onDropBlock(item.typeId, index);
            return { handled: true };
        },
        collect: (monitor) => ({
            isOver: monitor.isOver({ shallow: true }),
            canDrop: monitor.canDrop(),
        }),
    }), [onDropBlock, index]);

    const [open, setOpen] = useState(false);

    const categories = useMemo(() => {
        const groups: Record<string, typeof BLOCK_REGISTRY> = {};
        BLOCK_REGISTRY.forEach(block => {
            // Skip hidden blocks
            if (block.hidden === true) return;
            
            const cat = block.category || "Other";
            if (!groups[cat]) groups[cat] = [];
            groups[cat].push(block);
        });
        return groups;
    }, []);

    if (isInitial) {
         return (
             <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <button 
                        className="px-6 py-2.5 font-sans font-medium rounded-lg shadow-sm transition-all bg-primary text-primary-foreground hover:bg-primary-hover"
                        style={{ 
                            borderRadius: 'var(--radius)',
                            fontSize: 'var(--text-base)'
                        }}
                    >
                        Insert First Section
                    </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[400px] sm:w-[500px] p-0 z-[100]">
                     <Command className="h-full border-none rounded-none">
                        <div className="p-4 border-b">
                            <SheetTitle>Add Section</SheetTitle>
                        </div>
                        <CommandInput placeholder="Search sections..." />
                        <CommandList className="h-full max-h-none custom-scrollbar pb-20">
                            <CommandEmpty>No section found.</CommandEmpty>
                            {Object.entries(categories).map(([category, blocks]) => (
                                <div key={category}>
                                    <CommandGroup heading={category}>
                                        <div className="grid grid-cols-2 gap-2 px-2">
                                            {blocks.map(block => (
                                                <CommandItem 
                                                    key={block.id} 
                                                    onSelect={() => {
                                                        onDropBlock(block.id, index);
                                                        setOpen(false);
                                                    }}
                                                    className="cursor-pointer flex flex-col items-start gap-2 p-2 h-auto border border-border/50 rounded-lg hover:border-primary/50 transition-all bg-card/50"
                                                >
                                                    <div className="w-full aspect-video bg-muted rounded flex items-center justify-center text-muted-foreground/50 overflow-hidden">
                                                        <div className="w-3/4 h-3/4 [&>svg]:w-full [&>svg]:h-full">
                                                            {block.icon}
                                                        </div>
                                                    </div>
                                                    <div className="w-full">
                                                        <div className="font-semibold text-xs">{block.name}</div>
                                                        <div className="text-[10px] text-muted-foreground line-clamp-2 leading-tight mt-0.5">{block.description}</div>
                                                    </div>
                                                </CommandItem>
                                            ))}
                                        </div>
                                    </CommandGroup>
                                    <CommandSeparator />
                                </div>
                            ))}
                        </CommandList>
                    </Command>
                </SheetContent>
             </Sheet>
         )
    }

    return (
        <div 
            ref={drop} 
            className={cn(
                "w-full relative z-50 transition-all duration-200 ease-out",
                isOver ? "my-4" : "my-0"
            )} 
            style={{ 
                height: isOver ? '100px' : '0px',
            }}
        >
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <div 
                        className={cn(
                            "absolute left-0 right-0 top-1/2 -translate-y-1/2 flex items-center justify-center z-[60]",
                            // Hit area: when not dragging, we need a strip to hover over
                            // When dragging (canDrop), we increase the hit area to make it easier to drop
                            isOver 
                                ? "h-full w-full pointer-events-none" 
                                : canDrop
                                    ? "h-24 w-full cursor-copy" 
                                    : "h-0 w-full cursor-pointer group hover:h-12 transition-[height]"
                        )}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        {/* Visual Indicator */}
                        <div className={cn(
                            "flex items-center justify-center transition-all duration-200",
                            isOver ? "w-full h-full border-2 border-primary border-dashed bg-primary/5 rounded-xl" : ""
                        )}>
                            {isOver ? (
                                <div className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg animate-in fade-in zoom-in-95">
                                    <Plus className="w-4 h-4" />
                                    <span className="font-semibold text-sm">Drop Section Here</span>
                                </div>
                            ) : (
                                /* Blue Button and Line interaction similar to Wix */
                                <div className={cn(
                                    "relative w-full flex items-center justify-center"
                                )}>
                                    {/* The Line - visible on hover OR when dragging */}
                                    <div className={cn(
                                        "absolute inset-x-0 h-[2px] bg-primary shadow-[0_0_4px_rgba(37,99,235,0.3)] transition-all duration-300 ease-in-out",
                                        "opacity-0 scale-x-90 group-hover:opacity-100 group-hover:scale-x-100",
                                        open && "opacity-100 scale-x-100",
                                        // Show line hint when dragging but not hovering
                                        (canDrop && !isOver) && "opacity-40 scale-x-95 bg-primary/50" 
                                    )} />

                                    {/* The Button - visible on hover or always on mobile */}
                                    <div className={cn(
                                        "w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg transition-all duration-300 relative z-10 hover:scale-110",
                                        "opacity-0 scale-0 -rotate-90",
                                        "group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-0",
                                        "max-md:opacity-100 max-md:scale-100 max-md:rotate-0", // Always visible on mobile
                                        open && "opacity-100 scale-100 rotate-0"
                                    )}>
                                        <Plus className="w-5 h-5" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </PopoverTrigger>
                <PopoverContent side="bottom" sideOffset={10} className="w-[400px] p-0 z-[100] bg-popover text-popover-foreground border-border shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
                     <Command className="h-full border-none rounded-none w-full">
                        <div className="p-3 border-b border-border">
                            <h4 className="font-medium text-sm text-foreground">Add Section</h4>
                        </div>
                        <CommandInput placeholder="Search sections..." className="h-9" />
                        <CommandList className="max-h-[300px] overflow-y-auto custom-scrollbar p-1">
                            <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">No section found.</CommandEmpty>
                            {Object.entries(categories).map(([category, blocks]) => (
                                <div key={category}>
                                    <CommandGroup heading={category}>
                                        <div className="grid grid-cols-2 gap-2 px-1">
                                            {blocks.map(block => (
                                                <CommandItem 
                                                    key={block.id} 
                                                    onSelect={() => {
                                                        onDropBlock(block.id, index);
                                                        setOpen(false);
                                                    }}
                                                    className="cursor-pointer flex flex-col items-start gap-2 p-2 h-auto border border-border/50 rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-all bg-card"
                                                >
                                                    <div className="w-full aspect-video bg-muted rounded flex items-center justify-center text-muted-foreground/50 overflow-hidden border border-border/50">
                                                        <div className="w-3/4 h-3/4 [&>svg]:w-full [&>svg]:h-full text-foreground/40">
                                                            {block.icon}
                                                        </div>
                                                    </div>
                                                    <div className="w-full">
                                                        <div className="font-semibold text-xs text-foreground">{block.name}</div>
                                                    </div>
                                                </CommandItem>
                                            ))}
                                        </div>
                                    </CommandGroup>
                                    <CommandSeparator className="my-1" />
                                </div>
                            ))}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}

// Wrapper for individual blocks to handle selection and toolbar
const CanvasBlockWrapper = ({ 
    block, 
    definition, 
    index, 
    totalBlocks = 0,
    isSelected, 
    breakpoint,
    onSelectBlock, 
    onAddBlock, 
    onMoveBlock,
    onDeleteBlock,
    onDropBlock,
    onEditSettings,
    onUpdateVariant,
    onUpdateSettings
}: any) => {
    const settings = block.settings || {};
    const showInMobile = settings.showInMobile !== undefined ? settings.showInMobile : true;
    const isMobileView = breakpoint < 768;
    const isHiddenInSimulation = !showInMobile && isMobileView;
    const isMobile = breakpoint < 1024;
    const [mounted, setMounted] = useState(false);
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
    
    // Calculate these once for consistency - ensure they're always boolean
    const isLastBlock = Boolean(totalBlocks > 0 && index === totalBlocks - 1);
    const isFirstBlock = Boolean(index === 0);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    // Handle text editing
    const handleContentChange = (key: string, content: string) => {
        const currentTextSettings = (block.settings && block.settings.text) || {};
        if (currentTextSettings[key] !== content && onUpdateSettings) {
            onUpdateSettings(block.id, {
                ...block.settings,
                text: {
                    ...currentTextSettings,
                    [key]: content
                }
            });
        }
    };

    // Handle image click
    const handleImageClick = (imageId: string) => {
        setSelectedImageId(imageId);
        setImageModalOpen(true);
    };

    // Handle image selection from modal
    const handleImageSelected = (url: string) => {
        if (!selectedImageId) return;
        
        const currentImageSettings = (block.settings && block.settings.images) || {};
        onUpdateSettings(block.id, {
            ...block.settings,
            images: {
                ...currentImageSettings,
                [selectedImageId]: url
            }
        });
        toast.success('Image updated');
    };

    const VARIANTS = [
      { id: 'default', color: 'bg-background border-border' },
      { id: 'primary', color: 'bg-primary border-primary' },
      { id: 'secondary', color: 'bg-secondary border-secondary' },
      { id: 'accent', color: 'bg-accent border-accent' },
    ];

    // Get current image URL for the modal
    const getCurrentImageUrl = () => {
        if (!selectedImageId) return '';
        const images = (block.settings && block.settings.images) || {};
        return images[selectedImageId] || '';
    };

    return (
        <>
        <div className={cn("relative", isHiddenInSimulation && "hidden")}>
            {/* Top Drop Zone */}
            <DropZone index={index} onDropBlock={onDropBlock} onAddBlock={onAddBlock} />

            <div 
                className={cn(
                    "relative group/block transition-all border-y border-transparent",
                    isSelected ? "ring-2 ring-primary z-10" : "hover:border-primary/20",
                    block.locked && "opacity-90 grayscale-[0.5]",
                    !showInMobile && "max-md:hidden"
                )}
                onClick={(e) => { e.stopPropagation(); onSelectBlock(block.id); }}
            >
                {/* Block Content */}
                <ResponsiveContainer 
                    title={definition.name} 
                    html={(() => {
                        try {
                            // Validate inputs before generating HTML
                            if (!definition || typeof definition.html !== 'function') {
                                console.error('Invalid definition for block:', block.typeId);
                                return '<div class="p-4 bg-muted text-muted-foreground">Invalid block definition</div>';
                            }

                            const generatedHtml = definition.html(block.id, block.variant || 'default', block.settings || {});
                            
                            // Validate output
                            if (typeof generatedHtml !== 'string') {
                                console.error('HTML function did not return string for:', block.typeId);
                                return '<div class="p-4 bg-muted text-muted-foreground">Invalid HTML output</div>';
                            }
                            
                            // Check for unclosed tags (basic validation)
                            if (generatedHtml.includes('<script') && !generatedHtml.includes('</script>')) {
                                console.error('Unclosed script tag in:', block.typeId);
                                return '<div class="p-4 bg-muted text-muted-foreground">Invalid HTML structure</div>';
                            }
                            
                            return generatedHtml;
                        } catch (e) {
                            console.error("Block render error for", block.typeId, ":", e);
                            return '<div class="p-4 text-destructive bg-destructive/10 border border-destructive/20 rounded">Error rendering block. Check console for details.</div>';
                        }
                    })()}
                    onContentChange={handleContentChange}
                    onClick={() => onSelectBlock(block.id)}
                    onImageClick={handleImageClick}
                />
                
                {/* Click Catcher - Only cover if locked */}
                {block.locked && <div className="absolute inset-0 z-[5] cursor-default bg-transparent" />}

                {/* Locked Overlay */}
                {block.locked && (
                   <div className="absolute inset-0 z-20 bg-background/10 backdrop-blur-[1px] flex items-center justify-center opacity-0 group-hover/block:opacity-100 transition-opacity pointer-events-none">
                      <div className="bg-background/80 px-3 py-1.5 rounded-full shadow-lg border border-border flex items-center gap-2">
                        <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-xs font-medium text-muted-foreground">Locked</span>
                      </div>
                   </div>
                )}

                {/* Contextual Toolbar - Desktop */}
                {!block.locked && !isMobile && (
                  <div className={cn(
                    "absolute top-4 right-4 flex items-center gap-1 transition-all z-40 bg-background/95 backdrop-blur shadow-lg border border-border/50 p-1 rounded-full origin-right",
                    isSelected ? "opacity-100 scale-100" : "opacity-0 group-hover/block:opacity-100 scale-95 group-hover/block:scale-100"
                  )}>
                    <div className="flex items-center gap-2 px-3 border-r border-border mr-1">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{definition.category}</span>
                    </div>
                    
                    <button 
                      onClick={(e) => { e.stopPropagation(); onMoveBlock(block.id, 'up'); }} 
                      disabled={isFirstBlock} 
                      className="p-1.5 hover:bg-secondary rounded-full text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      title="Move Up"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onMoveBlock(block.id, 'down'); }} 
                      disabled={isLastBlock}
                      className="p-1.5 hover:bg-secondary rounded-full text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      title="Move Down"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>

                    <div className="w-px h-3 bg-border mx-1" />

                    {/* Variant Switcher Tooltip */}
                    <div className="flex items-center gap-1 px-1">
                        {VARIANTS.map(v => (
                            <button
                                key={v.id}
                                onClick={(e) => { 
                                    e.stopPropagation(); 
                                    if (onUpdateVariant) onUpdateVariant(block.id, v.id); 
                                }}
                                className={cn(
                                    "w-3 h-3 rounded-full border shadow-sm transition-transform hover:scale-125",
                                    v.color,
                                    block.variant === v.id ? "ring-2 ring-primary ring-offset-1" : "opacity-70 hover:opacity-100"
                                )}
                                title={`Variant: ${v.id}`}
                            />
                        ))}
                    </div>

                    <div className="w-px h-3 bg-border mx-1" />

                    <button 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        onSelectBlock(block.id);
                        onEditSettings(block.id);
                      }} 
                      className="p-1.5 hover:bg-secondary rounded-full text-muted-foreground hover:text-foreground transition-colors"
                      title="Settings"
                    >
                      <Settings className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        onDeleteBlock(block.id); 
                      }} 
                      className="p-1.5 hover:bg-destructive/10 rounded-full text-muted-foreground hover:text-destructive transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Contextual Toolbar - Mobile Bottom Bar */}
                {!block.locked && isMobile && isSelected && (
                    <div className="absolute bottom-4 left-4 right-4 z-[60] bg-background/95 backdrop-blur-xl shadow-2xl border border-border/50 rounded-2xl p-2 animate-in slide-in-from-bottom-10 fade-in duration-300 font-sans">
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                                    {definition.icon ? <div className="w-4 h-4 [&>svg]:w-full [&>svg]:h-full">{definition.icon}</div> : <Layout className="w-4 h-4" />}
                                </div>
                                <span className="text-xs font-semibold px-2 truncate max-w-[100px]">{definition.name}</span>
                            </div>

                            <div className="h-6 w-px bg-border" />

                            <div className="flex items-center gap-1">
                                <button 
                                onClick={(e) => { e.stopPropagation(); onMoveBlock(block.id, 'up'); }} 
                                disabled={isFirstBlock} 
                                className="p-2 hover:bg-secondary rounded-xl text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                >
                                <ChevronUp className="w-4 h-4" />
                                </button>
                                <button 
                                onClick={(e) => { e.stopPropagation(); onMoveBlock(block.id, 'down'); }} 
                                disabled={isLastBlock}
                                className="p-2 hover:bg-secondary rounded-xl text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                >
                                <ChevronDown className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="h-6 w-px bg-border" />

                            <div className="flex items-center gap-1">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button className="p-2 hover:bg-secondary rounded-xl text-muted-foreground hover:text-foreground transition-colors">
                                            <Layout className="w-4 h-4" />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-40 p-1" align="center" side="top">
                                        <div className="space-y-1">
                                            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Variants</div>
                                            {VARIANTS.map(v => (
                                                <button
                                                    key={v.id}
                                                    onClick={() => onUpdateVariant(block.id, v.id)}
                                                    className={cn(
                                                        "w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded-sm hover:bg-secondary transition-colors",
                                                        block.variant === v.id && "bg-secondary font-medium"
                                                    )}
                                                >
                                                    <div className={cn("w-3 h-3 rounded-full border shadow-sm", v.color)} />
                                                    <span className="capitalize">{v.id}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </PopoverContent>
                                </Popover>

                                <button 
                                    onClick={(e) => { e.stopPropagation(); onEditSettings(block.id); }} 
                                    className="p-2 hover:bg-secondary rounded-xl text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <Settings className="w-4 h-4" />
                                </button>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); onDeleteBlock(block.id); }} 
                                    className="p-2 hover:bg-destructive/10 text-muted-foreground hover:text-destructive rounded-xl transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
        <ImageUploadModal
            isOpen={imageModalOpen}
            onClose={() => setImageModalOpen(false)}
            onImageSelected={handleImageSelected}
            currentImageUrl={getCurrentImageUrl()}
        />
        </>
    );
};