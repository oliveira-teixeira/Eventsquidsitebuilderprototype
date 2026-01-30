import React, { useState, useEffect, useRef } from "react";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { 
  Layout, 
  Calendar, 
  Clock, 
  FileText, 
  Users, 
  MapPin, 
  Home, 
  Eye,
  Send,
  Check,
  ChevronUp,
  ChevronDown,
  Trash2,
  Settings,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Image as ImageIcon,
  Type,
  Link,
  Plus,
} from "lucide-react";

import { SidebarItem } from "./SidebarItem";
import { AddBlockDivider } from "./AddBlockDivider";
import { PageListItem } from "./PageListItem";
import { AgendaCard } from "./AgendaCard";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { cn } from "../ui/utils";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

// --- Types ---
type BlockType = 'hero' | 'agenda' | 'sponsors' | 'content' | 'features';

interface BlockData {
  id: string;
  type: BlockType;
  title: string;
  props?: {
    align?: 'left' | 'center' | 'right';
    textSize?: 'sm' | 'md' | 'lg' | 'xl';
    image?: string;
    buttonText?: string;
    buttonUrl?: string;
    [key: string]: any;
  };
}

// --- Components ---

// 0. Sortable Block Item for Drag and Drop
interface SortableBlockItemProps {
  id: string;
  index: number;
  block: BlockData;
  moveBlock: (dragIndex: number, hoverIndex: number) => void;
  onSelect: () => void;
  isSelected: boolean;
}

const SortableBlockItem: React.FC<SortableBlockItemProps> = ({ id, index, block, moveBlock, onSelect, isSelected }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: 'BLOCK',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;

      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveBlock(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'BLOCK',
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;
  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity }} data-handler-id={handlerId}>
       <PageListItem 
          icon={
              block.type === 'hero' ? Home : 
              block.type === 'agenda' ? Calendar : 
              block.type === 'sponsors' ? Users : FileText
          } 
          label={block.title} 
          isActive={isSelected}
          onClick={onSelect}
          className="cursor-move"
       />
    </div>
  );
};

// 1. Block Wrapper (Handles Selection & Actions)
const BlockWrapper = ({ 
  isSelected, 
  onClick, 
  onDelete, 
  onMoveUp, 
  onMoveDown,
  onEdit,
  isFirst,
  isLast,
  children 
}: { 
  isSelected: boolean; 
  onClick: () => void; 
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onEdit: () => void;
  isFirst: boolean;
  isLast: boolean;
  children: React.ReactNode;
}) => {
  return (
    <div 
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={cn(
        "relative group border-2 rounded-lg transition-all duration-200",
        isSelected 
          ? "border-primary ring-4 ring-primary/10 shadow-lg z-10" 
          : "border-transparent hover:border-muted-foreground/20"
      )}
    >
      {/* Selected State Actions Overlay */}
      {isSelected && (
        <div className="absolute -top-3 right-4 flex items-center gap-1 bg-primary text-primary-foreground rounded-full px-2 py-1 shadow-md z-20 animate-in fade-in zoom-in duration-200">
           <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 text-primary-foreground hover:bg-primary-foreground/20 rounded-full"
            onClick={(e) => { e.stopPropagation(); onEdit(); }}
            title="Settings"
          >
             <Settings className="h-3 w-3" />
          </Button>
           <div className="w-px h-3 bg-primary-foreground/30 mx-1" />
           <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 text-primary-foreground hover:bg-primary-foreground/20 rounded-full"
            onClick={(e) => { e.stopPropagation(); onMoveUp(); }}
            disabled={isFirst}
          >
             <ChevronUp className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 text-primary-foreground hover:bg-primary-foreground/20 rounded-full"
            onClick={(e) => { e.stopPropagation(); onMoveDown(); }}
            disabled={isLast}
          >
             <ChevronDown className="h-4 w-4" />
          </Button>
          <div className="w-px h-3 bg-primary-foreground/30 mx-1" />
           <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 text-primary-foreground hover:bg-red-500 rounded-full hover:text-white"
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
          >
             <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      {/* Label for Hover */}
      {!isSelected && (
         <div className="absolute -top-3 left-4 bg-muted text-muted-foreground text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border">
            Click to Edit
         </div>
      )}

      {children}
    </div>
  );
};

// 2. Mock Component Renderers
const HeroBlock = ({ props }: { props?: BlockData['props'] }) => {
    const propsAlign = props && props.align;
    const propsTextSize = props && props.textSize;
    const alignClass = propsAlign === 'left' ? 'text-left items-start' : propsAlign === 'right' ? 'text-right items-end' : 'text-center items-center';
    const textSizeClass = propsTextSize === 'sm' ? 'text-3xl' : propsTextSize === 'md' ? 'text-5xl' : propsTextSize === 'xl' ? 'text-7xl' : 'text-5xl';
    
    return (
    <div className={`bg-background rounded-lg border shadow-sm p-12 flex flex-col ${alignClass} space-y-6`}>
        <h1 className={`${textSizeClass} font-extrabold tracking-tight text-foreground`}>Make a Bold Statement</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
            Add a subtitle that supports your title. We recommend just a couple of sentences.
        </p>
        
        {props && props.image && (
            <div className="w-full max-w-3xl aspect-video rounded-lg overflow-hidden border my-4">
                <img src={props.image} alt="Hero" className="w-full h-full object-cover" />
            </div>
        )}

        <div className={`flex items-center gap-4 pt-4 ${propsAlign === 'left' ? 'justify-start' : propsAlign === 'right' ? 'justify-end' : 'justify-center'}`}>
            <Button size="lg">{(props && props.buttonText) || "Primary Action"}</Button>
            <Button size="lg" variant="secondary">Secondary</Button>
        </div>
    </div>
)};

const AgendaBlock = () => (
    <div className="space-y-6 bg-background/50 p-6 rounded-lg border border-dashed">
        <div className="flex items-center justify-between">
                <div>
                <h2 className="text-3xl font-bold tracking-tight">Agenda Highlights</h2>
                <p className="text-muted-foreground">Don't miss these key sessions.</p>
                </div>
                <Button variant="outline">View Full Agenda</Button>
        </div>
        
        <div className="bg-background border rounded-md p-4 flex gap-4 shadow-sm">
            <Input className="flex-1" placeholder="Search sessions, speakers..." />
            <div className="flex gap-2">
                    <Button variant="outline" size="sm">Track</Button>
                    <Button variant="outline" size="sm">Room</Button>
                    <Button variant="outline" size="sm">Time</Button>
            </div>
        </div>

        <div className="grid gap-4">
            <AgendaCard 
                title="Keynote: The Future of Design"
                description="Join us for an inspiring talk about where design systems are heading in 2025."
                date="Oct 12, 2025"
                time="9:00 AM - 10:30 AM"
                location="Main Hall A"
                track="Design"
                trackColor="bg-blue-500"
                speakers={[{ name: "Sarah Connor" }, { name: "Kyle Reese" }]}
            />
            <AgendaCard 
                title="Workshop: Building with Tailwind"
                description="A hands-on session on how to leverage utility classes for rapid prototyping."
                date="Oct 12, 2025"
                time="11:00 AM - 12:30 PM"
                location="Room 101"
                track="Development"
                trackColor="bg-green-500"
                speakers={[{ name: "John Doe" }]}
            />
        </div>
    </div>
);

const ContentBlock = ({ props }: { props?: BlockData['props'] }) => {
    const propsAlign = props && props.align;
    const alignClass = propsAlign === 'left' ? 'text-left' : propsAlign === 'right' ? 'text-right' : 'text-center';
    
    return (
    <div className={`bg-background p-8 rounded-lg border shadow-sm flex flex-col md:flex-row gap-8 items-center ${propsAlign === 'right' ? 'md:flex-row-reverse' : ''}`}>
        <div className={`flex-1 space-y-4 ${alignClass}`}>
            <h3 className="text-2xl font-bold">Rich Content Area</h3>
            <p className="text-muted-foreground leading-[160%]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <Button variant="link" className={`p-0 h-auto ${alignClass === 'text-center' ? 'mx-auto' : ''}`}>
                {(props && props.buttonText) || "Read more"} &rarr;
            </Button>
        </div>
        <div className="w-full md:w-1/3 aspect-video bg-muted rounded-md flex items-center justify-center text-muted-foreground overflow-hidden">
            {(props && props.image) ? (
                <img src={props.image} alt="Content" className="w-full h-full object-cover" />
            ) : (
                "Image Placeholder"
            )}
        </div>
    </div>
)};

const SponsorsBlock = () => (
    <div className="bg-background p-8 rounded-lg border shadow-sm text-center space-y-8">
        <h3 className="text-lg font-semibold text-muted-foreground uppercase tracking-wider">Trusted by Industry Leaders</h3>
        <div className="flex flex-wrap justify-center gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
             {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-12 w-32 bg-muted rounded flex items-center justify-center font-bold text-muted-foreground/50">
                    LOGO {i}
                </div>
             ))}
        </div>
    </div>
);


export const SiteBuilderLayout = () => {
  // --- State ---
  const [activeRightTab, setActiveRightTab] = useState("page");
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  
  const [blocks, setBlocks] = useState<BlockData[]>([
    { id: "1", type: "hero", title: "Hero Section" },
    { id: "2", type: "agenda", title: "Agenda Highlights" },
  ]);

  // --- Actions ---
  const addBlock = (type: BlockType, title: string) => {
    const newBlock: BlockData = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      title
    };
    setBlocks([...blocks, newBlock]);
    // Auto select new block
    setTimeout(() => {
        handleSelectBlock(newBlock.id);
        // Scroll to bottom
        const main = document.getElementById("main-canvas");
        if(main) main.scrollTo({ top: main.scrollHeight, behavior: 'smooth' });
    }, 10);
  };

  const handleSelectBlock = (id: string) => {
    setSelectedBlockId(id);
    setActiveRightTab("block");
  };

  const deleteBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
    if (selectedBlockId === id) {
        setSelectedBlockId(null);
        setActiveRightTab("page");
    }
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === blocks.length - 1)
    ) return;

    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
    setBlocks(newBlocks);
  };

  // Drag and Drop Reordering
  const reorderBlock = (dragIndex: number, hoverIndex: number) => {
    const dragBlock = blocks[dragIndex];
    const newBlocks = [...blocks];
    newBlocks.splice(dragIndex, 1);
    newBlocks.splice(hoverIndex, 0, dragBlock);
    setBlocks(newBlocks);
  };

  // --- Render Helpers ---
  const renderBlockContent = (block: BlockData) => {
    switch (block.type) {
        case 'hero': return <HeroBlock props={block.props} />;
        case 'agenda': return <AgendaBlock />; // Agenda doesn't use these generic props yet
        case 'content': return <ContentBlock props={block.props} />;
        case 'sponsors': return <SponsorsBlock />;
        default: return <div className="p-4 border border-dashed rounded bg-muted/20">Unknown Block Type</div>;
    }
  };

  const getSelectedBlock = () => blocks.find(b => b.id === selectedBlockId);

  return (
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
    <div className="flex flex-col h-[850px] w-full bg-muted/30 border rounded-xl overflow-hidden font-sans">
      {/* Top Navigation Bar */}
      <header className="h-16 bg-background border-b flex items-center justify-between px-6 shrink-0 z-20">
        <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-primary-foreground font-bold shadow-sm">
                    SB
                </div>
                <span className="font-bold text-lg tracking-tight">SiteBuilder</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-1">
                {["Home", "Agenda", "Sponsors", "Hotels"].map((item) => (
                    <Button 
                        key={item} 
                        variant={item === "Home" ? "secondary" : "ghost"} 
                        size="sm"
                        className="text-sm font-medium"
                    >
                        {item}
                    </Button>
                ))}
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    <Plus className="h-4 w-4 mr-1" /> New Page
                </Button>
            </nav>
        </div>

        <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-2">
                <Eye className="h-4 w-4" />
                Preview
            </Button>
            <Button size="sm" className="gap-2 shadow-sm">
                <Send className="h-4 w-4" />
                Publish
            </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Sidebar - Library */}
        <aside className="w-[280px] bg-background border-r flex flex-col shrink-0 z-10 transition-all duration-300 ease-in-out">
            <div className="p-4 border-b space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm">Components</h3>
                    <Badge variant="outline" className="text-[10px] h-5">v2.4</Badge>
                </div>
                <Input placeholder="Search blocks..." className="bg-muted/50 h-9" />
            </div>
            
            <ScrollArea className="flex-1">
                <div className="p-4 space-y-8">
                    <div className="space-y-3">
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                            <Layout className="h-3 w-3" /> Layout
                        </h4>
                        <div className="space-y-1">
                            <SidebarItem icon={Home} label="Hero Section" onAdd={() => addBlock('hero', 'Hero Section')} />
                            <SidebarItem icon={FileText} label="Content Block" onAdd={() => addBlock('content', 'Content Block')} />
                        </div>
                    </div>

                    <div className="space-y-3">
                         <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                            <Calendar className="h-3 w-3" /> Event Data
                         </h4>
                         <div className="space-y-1">
                            <SidebarItem icon={Calendar} label="Agenda" onAdd={() => addBlock('agenda', 'Agenda Highlights')} />
                            <SidebarItem icon={Users} label="Sponsors" onAdd={() => addBlock('sponsors', 'Sponsors List')} />
                            <SidebarItem icon={Users} label="Speakers" onAdd={() => addBlock('content', 'Speakers Grid')} />
                            <SidebarItem icon={MapPin} label="Venue Info" onAdd={() => addBlock('content', 'Venue Info')} />
                         </div>
                    </div>
                </div>
            </ScrollArea>
        </aside>

        {/* Main Canvas */}
        <main 
            id="main-canvas"
            className="flex-1 bg-muted/30 overflow-y-auto p-8 relative scroll-smooth"
            onClick={() => {
                setSelectedBlockId(null);
                setActiveRightTab("page");
            }}
        >
            <div className="max-w-4xl mx-auto space-y-8 pb-32 min-h-full">
                
                {blocks.length === 0 && (
                    <div className="h-[400px] flex flex-col items-center justify-center border-2 border-dashed rounded-lg text-muted-foreground bg-background/50">
                        <Layout className="h-12 w-12 mb-4 opacity-20" />
                        <h3 className="text-lg font-medium">Start Building</h3>
                        <p className="max-w-sm text-center mt-2 mb-6">Select a component from the left sidebar to add it to your page.</p>
                        <Button onClick={() => addBlock('hero', 'Hero Section')}>Add Hero Section</Button>
                    </div>
                )}

                {blocks.map((block, index) => (
                    <div key={block.id}>
                        <BlockWrapper 
                            isSelected={selectedBlockId === block.id}
                            onClick={() => handleSelectBlock(block.id)}
                            onEdit={() => handleSelectBlock(block.id)}
                            onDelete={() => deleteBlock(block.id)}
                            onMoveUp={() => moveBlock(index, 'up')}
                            onMoveDown={() => moveBlock(index, 'down')}
                            isFirst={index === 0}
                            isLast={index === blocks.length - 1}
                        >
                            {renderBlockContent(block)}
                        </BlockWrapper>
                        
                        {/* Interactive Divider */}
                        <div className="opacity-0 hover:opacity-100 transition-opacity duration-200">
                             <AddBlockDivider onClick={() => {
                                 // Insert content block after this one
                                 const newBlock: BlockData = {
                                    id: Math.random().toString(36).substr(2, 9),
                                    type: 'content',
                                    title: 'New Content'
                                };
                                const newBlocks = [...blocks];
                                newBlocks.splice(index + 1, 0, newBlock);
                                setBlocks(newBlocks);
                                handleSelectBlock(newBlock.id);
                             }} />
                        </div>
                    </div>
                ))}
                
                {blocks.length > 0 && (
                    <div className="flex justify-center py-8 opacity-50 hover:opacity-100 transition-opacity">
                         <Button variant="outline" className="border-dashed" onClick={() => addBlock('content', 'New Section')}>
                            <Plus className="mr-2 h-4 w-4" /> Add Section at Bottom
                         </Button>
                    </div>
                )}
            </div>
        </main>

        {/* Right Properties Panel */}
        <aside className="w-[320px] bg-background border-l flex flex-col shrink-0 z-10 shadow-lg">
            <Tabs value={activeRightTab} onValueChange={setActiveRightTab} className="flex flex-col h-full">
                <div className="p-0 border-b">
                    <TabsList className="w-full grid grid-cols-2 rounded-none bg-transparent p-0 h-12">
                        <TabsTrigger 
                            value="block" 
                            disabled={!selectedBlockId}
                            className="rounded-none h-full data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-background transition-none"
                        >
                            Edit Block
                        </TabsTrigger>
                        <TabsTrigger 
                            value="page"
                            className="rounded-none h-full data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-background transition-none"
                        >
                            Page Outline
                        </TabsTrigger>
                    </TabsList>
                </div>

                {/* --- Tab: Page Outline --- */}
                <TabsContent value="page" className="flex-1 flex flex-col m-0 p-0 animate-in slide-in-from-right-2 duration-300">
                    <div className="p-6 border-b bg-muted/10">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-lg">Home Page</h3>
                                <p className="text-sm text-muted-foreground">{blocks.length} Blocks</p>
                            </div>
                            <Button variant="outline" size="icon" className="h-8 w-8">
                                <Clock className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    
                    <ScrollArea className="flex-1">
                        <div className="p-4 space-y-2">
                             {blocks.map((block, index) => (
                                 <SortableBlockItem 
                                    key={block.id}
                                    id={block.id}
                                    index={index}
                                    block={block}
                                    moveBlock={reorderBlock}
                                    isSelected={selectedBlockId === block.id}
                                    onSelect={() => handleSelectBlock(block.id)}
                                 />
                             ))}
                             
                             {blocks.length === 0 && (
                                <div className="text-center py-8 text-sm text-muted-foreground">
                                    No blocks added yet.
                                </div>
                             )}

                             <div className="pt-4 px-2">
                                <Button 
                                    variant="ghost" 
                                    className="w-full border-2 border-dashed border-muted-foreground/20 hover:border-primary/50 hover:bg-primary/5 text-muted-foreground hover:text-primary justify-start"
                                    onClick={() => addBlock('content', 'New Content')}
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Block
                                </Button>
                             </div>
                        </div>
                    </ScrollArea>

                    <div className="p-4 border-t mt-auto space-y-3 bg-muted/10">
                         <Button variant="outline" className="w-full justify-start gap-2">
                            <Layout className="h-4 w-4" />
                            Page Settings
                         </Button>
                         <div className="flex gap-2">
                             <Button variant="destructive" className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 shadow-none border-0" onClick={() => setBlocks([])}>
                                Clear All
                             </Button>
                         </div>
                    </div>
                </TabsContent>

                 {/* --- Tab: Block Properties --- */}
                 <TabsContent value="block" className="flex-1 flex flex-col m-0 p-0 animate-in slide-in-from-right-2 duration-300">
                    {selectedBlockId ? (
                         <>
                            <div className="p-6 border-b bg-muted/10">
                                <div className="flex items-center gap-2 mb-2">
                                    <Badge variant="outline" className="uppercase text-[10px] tracking-wider">
                                        {getSelectedBlock() ? getSelectedBlock().type : ''}
                                    </Badge>
                                </div>
                                <h3 className="font-semibold text-lg">{getSelectedBlock() ? getSelectedBlock().title : ''}</h3>
                            </div>
                            
                            <ScrollArea className="flex-1 p-6">
                                <div className="space-y-6">
                                    {/* Common Properties */}
                                    <div className="space-y-3">
                                        <Label>Block Title</Label>
                                        <Input 
                                            value={getSelectedBlock() ? getSelectedBlock().title : ''} 
                                            onChange={(e) => {
                                                const newBlocks = blocks.map(b => 
                                                    b.id === selectedBlockId ? { ...b, title: e.target.value } : b
                                                );
                                                setBlocks(newBlocks);
                                            }}
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <Label>Visibility</Label>
                                            <Switch defaultChecked />
                                        </div>
                                        <p className="text-xs text-muted-foreground">Hide this block from the public site without deleting it.</p>
                                    </div>

                                    {/* Text Alignment */}
                                    <div className="space-y-3">
                                        <Label>Alignment</Label>
                                        <ToggleGroup 
                                            type="single" 
                                            variant="outline"
                                            value={(getSelectedBlock() && getSelectedBlock().props && getSelectedBlock().props.align) || 'center'}
                                            onValueChange={(value) => {
                                                if (value) {
                                                    const newBlocks = blocks.map(b => 
                                                        b.id === selectedBlockId ? { ...b, props: { ...b.props, align: value as any } } : b
                                                    );
                                                    setBlocks(newBlocks);
                                                }
                                            }}
                                            className="justify-start w-full"
                                        >
                                            <ToggleGroupItem value="left" aria-label="Align Left" className="flex-1">
                                                <AlignLeft className="h-4 w-4" />
                                            </ToggleGroupItem>
                                            <ToggleGroupItem value="center" aria-label="Align Center" className="flex-1">
                                                <AlignCenter className="h-4 w-4" />
                                            </ToggleGroupItem>
                                            <ToggleGroupItem value="right" aria-label="Align Right" className="flex-1">
                                                <AlignRight className="h-4 w-4" />
                                            </ToggleGroupItem>
                                        </ToggleGroup>
                                    </div>

                                    {/* Text Size */}
                                    <div className="space-y-3">
                                        <Label>Text Size</Label>
                                        <div className="grid grid-cols-4 gap-2">
                                            {['sm', 'md', 'lg', 'xl'].map((size) => (
                                                <Button
                                                    key={size}
                                                    variant={(getSelectedBlock() && getSelectedBlock().props && getSelectedBlock().props.textSize === size) ? "default" : "outline"}
                                                    size="sm"
                                                    className="text-xs"
                                                    onClick={() => {
                                                        const newBlocks = blocks.map(b => 
                                                            b.id === selectedBlockId ? { ...b, props: { ...b.props, textSize: size as any } } : b
                                                        );
                                                        setBlocks(newBlocks);
                                                    }}
                                                >
                                                    {size.toUpperCase()}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Media */}
                                    <div className="space-y-3">
                                        <Label>Image / Media</Label>
                                        <div className="flex gap-2">
                                            <Input 
                                                placeholder="Paste image URL..." 
                                                value={(getSelectedBlock() && getSelectedBlock().props && getSelectedBlock().props.image) || ''}
                                                onChange={(e) => {
                                                    const newBlocks = blocks.map(b => 
                                                        b.id === selectedBlockId ? { ...b, props: { ...b.props, image: e.target.value } } : b
                                                    );
                                                    setBlocks(newBlocks);
                                                }}
                                            />
                                            <Button variant="outline" size="icon">
                                                <ImageIcon className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Button Settings */}
                                    <div className="space-y-4 pt-2 border-t">
                                        <Label className="flex items-center gap-2">
                                            <Link className="h-3 w-3" />
                                            Primary Action
                                        </Label>
                                        <div className="grid gap-3">
                                            <div className="grid gap-1">
                                                <Label className="text-xs text-muted-foreground">Button Text</Label>
                                                <Input 
                                                    placeholder="Button Text" 
                                                    value={(getSelectedBlock() && getSelectedBlock().props && getSelectedBlock().props.buttonText) || ''}
                                                    onChange={(e) => {
                                                        const newBlocks = blocks.map(b => 
                                                            b.id === selectedBlockId ? { ...b, props: { ...b.props, buttonText: e.target.value } } : b
                                                        );
                                                        setBlocks(newBlocks);
                                                    }}
                                                />
                                            </div>
                                            <div className="grid gap-1">
                                                <Label className="text-xs text-muted-foreground">Button URL</Label>
                                                <Input 
                                                    placeholder="https://..." 
                                                    value={(getSelectedBlock() && getSelectedBlock().props && getSelectedBlock().props.buttonUrl) || ''}
                                                    onChange={(e) => {
                                                        const newBlocks = blocks.map(b => 
                                                            b.id === selectedBlockId ? { ...b, props: { ...b.props, buttonUrl: e.target.value } } : b
                                                        );
                                                        setBlocks(newBlocks);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Label>Background Color</Label>
                                        <div className="flex gap-2">
                                            <div className="w-8 h-8 rounded-full bg-background border-2 border-primary cursor-pointer ring-offset-2 ring-2 ring-transparent" />
                                            <div className="w-8 h-8 rounded-full bg-muted border border-border cursor-pointer hover:border-primary" />
                                            <div className="w-8 h-8 rounded-full bg-primary/10 border border-border cursor-pointer hover:border-primary" />
                                        </div>
                                    </div>

                                    <div className="h-px bg-border my-4" />

                                    {/* Type Specific Mock Controls */}
                                    {(getSelectedBlock() && getSelectedBlock().type === 'agenda') && (
                                        <div className="space-y-4">
                                            <Label className="text-xs uppercase text-muted-foreground font-bold">Agenda Settings</Label>
                                            <div className="space-y-2">
                                                <Label>Tracks to Show</Label>
                                                <div className="flex gap-2 flex-wrap">
                                                    <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">Design</Badge>
                                                    <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">Dev</Badge>
                                                    <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">Product</Badge>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </ScrollArea>

                            <div className="p-4 border-t bg-muted/10">
                                <Button 
                                    variant="outline" 
                                    className="w-full text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-200"
                                    onClick={() => deleteBlock(selectedBlockId)}
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete Block
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-6 text-center">
                             <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                                <Layout className="h-8 w-8 opacity-50" />
                             </div>
                             <p>Select a block from the canvas to edit its properties.</p>
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </aside>
      </div>
    </div>
    </DndProvider>
  );
};
