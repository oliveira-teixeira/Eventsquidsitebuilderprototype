import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { Clock, MapPin, User, ChevronRight, Plus, Minus, ArrowUpRight, Circle, Check } from "lucide-react";
import { cn } from "../ui/utils";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const SAMPLE_AGENDA = [
    { time: "09:00 AM", title: "Registration & Breakfast", location: "Main Hall", type: "General", speaker: "Staff", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
    { time: "10:00 AM", title: "Opening Keynote", location: "Auditorium A", type: "Keynote", speaker: "Sarah Connor", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
    { time: "11:30 AM", title: "React Server Components", location: "Room 204", type: "Workshop", speaker: "Dan Abramov", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop" },
    { time: "01:00 PM", title: "Networking Lunch", location: "Dining Area", type: "Networking", speaker: "All", img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" },
    { time: "02:30 PM", title: "Design Systems", location: "Auditorium B", type: "Panel", speaker: "Design Team", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop" },
];

// Variant 1: Compact Scannable List
export const AgendaVariant1 = () => {
  const [activeDay, setActiveDay] = useState(0);
  const days = ["Fri", "Sat", "Sun"];

  return (
    <div className="w-full py-12 bg-background">
      <div className="mx-auto w-full" style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}>
          <h2 className="text-2xl font-bold mb-2 text-foreground">Event Schedule</h2>
          <p className="text-muted-foreground text-sm mb-6">Browse sessions by day.</p>

          {/* Search */}
          <div className="mb-4 relative max-w-md">
              <input
                type="text"
                placeholder="Search sessions..."
                className="w-full px-4 py-2 pr-10 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              />
          </div>

          {/* Day Tabs */}
          <div className="flex gap-0 mb-6 border-b border-border">
              {days.map((day, i) => (
                <button
                  key={day}
                  onClick={() => setActiveDay(i)}
                  className={cn(
                    "flex-1 text-center px-4 py-2.5 text-sm font-medium border-b-2 transition-colors",
                    activeDay === i
                      ? "border-foreground text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  {day}
                </button>
              ))}
          </div>

          {/* Session Rows */}
          <div>
              {SAMPLE_AGENDA.map((item, i) => (
                <div
                  key={i}
                  className="group flex items-center gap-4 py-2.5 border-b border-border/40 last:border-0 hover:bg-muted/30 transition-colors cursor-pointer"
                >
                    {/* Time */}
                    <div className="shrink-0 w-[80px]">
                        <span className="text-xs font-mono font-medium text-muted-foreground">{item.time}</span>
                    </div>

                    {/* Title + Description */}
                    <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-foreground leading-tight truncate">{item.title}</h4>
                        <p className="text-xs text-muted-foreground leading-snug truncate mt-0.5">
                          A deep-dive session led by {item.speaker} at {item.location}.
                        </p>
                    </div>

                    {/* Thumbnail Cluster */}
                    <div className="shrink-0 flex items-center -space-x-2 w-[72px] justify-end">
                        <div className="w-7 h-7 rounded-full bg-muted border-2 border-background overflow-hidden">
                            <ImageWithFallback src={item.img} alt={item.speaker} className="w-full h-full object-cover" />
                        </div>
                        <div className="w-7 h-7 rounded-full bg-muted border-2 border-background overflow-hidden flex items-center justify-center">
                            <span className="text-[9px] font-medium text-muted-foreground">+1</span>
                        </div>
                    </div>
                </div>
              ))}
          </div>
      </div>
    </div>
  );
};

// Variant 2: Timeline View
export const AgendaVariant2 = () => (
  <div className="w-full py-16 bg-muted/30">
    <div className="mx-auto w-full" style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}>
         <div className="text-center mb-12">
            <Badge className="mb-2">Day 1</Badge>
            <h2 className="text-4xl font-bold text-foreground">Timeline</h2>
        </div>
        <div className="relative border-l-2 border-primary/20 ml-4 lg:ml-0 space-y-12">
            {SAMPLE_AGENDA.map((item, i) => (
                <div key={i} className="relative pl-8 lg:pl-0">
                    <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-primary border-4 border-background" />
                    <div className="lg:grid lg:grid-cols-5 lg:gap-8">
                        <div className="lg:col-span-1 lg:text-right pt-0.5">
                            <span className="text-sm font-bold text-muted-foreground">{item.time}</span>
                        </div>
                        <div className="lg:col-span-4 mt-2 lg:mt-0">
                            <div className="bg-card p-6 rounded-lg border-none shadow-md space-y-3">
                                <Badge variant="outline" className="w-fit">{item.type}</Badge>
                                <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <MapPin className="h-4 w-4 text-primary" /> {item.location}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  </div>
);

// Variant 3: Compact Tabbed View
export const AgendaVariant3 = () => {
  const [activeDay, setActiveDay] = useState(0);
  const days = ["Day 1", "Day 2", "Day 3"];

  return (
    <div className="w-full py-12 bg-background">
      <div className="mx-auto w-full" style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
              <div>
                  <h2 className="text-2xl font-bold text-foreground">Sessions</h2>
                  <p className="text-sm text-muted-foreground">Explore the tracks and sessions.</p>
              </div>
              <div className="flex gap-1">
                  {days.map((day, i) => (
                    <Button
                      key={day}
                      variant={activeDay === i ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setActiveDay(i)}
                    >
                      {day}
                    </Button>
                  ))}
              </div>
          </div>

          <div>
              {SAMPLE_AGENDA.map((item, i) => (
                <div
                  key={i}
                  className="group flex items-center gap-4 py-2.5 border-b border-border/40 last:border-0 hover:bg-muted/30 transition-colors cursor-pointer"
                >
                    {/* Time */}
                    <div className="shrink-0 w-[80px]">
                        <span className="text-xs font-mono font-medium text-muted-foreground">{item.time}</span>
                    </div>

                    {/* Title + Description */}
                    <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-foreground leading-tight truncate">{item.title}</h4>
                        <p className="text-xs text-muted-foreground leading-snug truncate mt-0.5">
                          In-depth session about {item.title.toLowerCase()} with industry experts.
                        </p>
                    </div>

                    {/* Thumbnail Cluster */}
                    <div className="shrink-0 flex items-center -space-x-2 w-[72px] justify-end">
                        <div className="w-7 h-7 rounded-full bg-muted border-2 border-background overflow-hidden">
                            <ImageWithFallback src={item.img} alt={item.speaker} className="w-full h-full object-cover" />
                        </div>
                        <div className="w-7 h-7 rounded-full bg-muted border-2 border-background overflow-hidden flex items-center justify-center">
                            <span className="text-[9px] font-medium text-muted-foreground">+1</span>
                        </div>
                    </div>

                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              ))}
          </div>
      </div>
    </div>
  );
};

// Variant 4: Brutalist Split
export const AgendaVariant4 = () => (
    <div className="w-full py-16 bg-background">
        <div className="mx-auto w-full" style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}>
             <div className="mb-12 border-b-4 border-foreground pb-4">
                <h2 className="text-5xl font-black uppercase tracking-tighter">Day 01 / Schedule</h2>
             </div>
             
             <div className="space-y-0">
                {SAMPLE_AGENDA.map((item, i) => (
                    <div key={i} className="group grid grid-cols-1 lg:grid-cols-[200px_1fr] border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                        {/* Time Column */}
                        <div className="p-6 border-b lg:border-b-0 lg:border-r border-border flex items-center">
                            <span className="font-serif text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                                {item.time.split(' ')[0]}
                            </span>
                            <span className="ml-2 text-sm font-sans text-muted-foreground lg:hidden">{item.time.split(' ')[1]}</span>
                        </div>
                        
                        {/* Content Column */}
                        <div className="p-6 flex flex-col justify-center space-y-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <h3 className="text-2xl font-bold tracking-tight">{item.title}</h3>
                                <Badge variant="outline" className="w-fit rounded-none border-2 font-mono uppercase text-xs">{item.type}</Badge>
                            </div>
                            <Separator className="bg-border" />
                            <div className="flex items-center gap-4 text-sm text-muted-foreground font-mono">
                                <span>{item.location}</span>
                                <span>•</span>
                                <span className="uppercase">{item.speaker}</span>
                            </div>
                        </div>
                    </div>
                ))}
             </div>
        </div>
    </div>
);

// Variant 5: Interactive Accordion Stack
export const AgendaVariant5 = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(1);

    return (
        <div className="w-full py-12 bg-background">
            <div className="mx-auto w-full" style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}>
                <h2 className="text-3xl font-bold mb-8 text-foreground font-sans">Sessions</h2>
                <div className="flex flex-col border-t-2 border-foreground">
                    {SAMPLE_AGENDA.map((item, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <div 
                                key={i} 
                                className="border-b-2 border-foreground overflow-hidden transition-all duration-300"
                            >
                                <button 
                                    onClick={() => setOpenIndex(isOpen ? null : i)}
                                    className="w-full flex items-center justify-between p-4 h-[72px] hover:bg-muted/50 transition-colors text-left"
                                >
                                    <div className="flex items-center gap-6">
                                        <span className="font-mono text-sm text-muted-foreground w-20">{item.time}</span>
                                        <span className="font-bold text-lg font-sans">{item.title}</span>
                                    </div>
                                    <div className="bg-foreground text-background rounded-full p-1">
                                        {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                                    </div>
                                </button>
                                
                                <div 
                                    className={cn(
                                        "grid transition-[grid-template-rows] duration-300 ease-out",
                                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                    )}
                                >
                                    <div className="overflow-hidden bg-muted/20">
                                        <div className="p-6 flex flex-col md:flex-row gap-6">
                                            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg grayscale">
                                                <ImageWithFallback src={item.img} alt={item.speaker} className="h-full w-full object-cover" />
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2">
                                                    <Badge variant="secondary" className="font-sans">{item.type}</Badge>
                                                    <span className="text-sm font-medium font-sans">{item.speaker}</span>
                                                </div>
                                                <p className="text-muted-foreground leading-relaxed font-sans">
                                                    Join us for this exclusive session where we dive deep into the methodologies and frameworks that define modern development.
                                                </p>
                                                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase pt-2">
                                                    <MapPin className="h-3 w-3 text-primary" /> {item.location}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

// Variant 6: Timeline Wireframe
export const AgendaVariant6 = () => (
    <div className="w-full py-16 bg-zinc-950 text-zinc-50 font-mono">
        <div className="mx-auto w-full" style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}>
            <div className="mb-12 border-b border-dashed border-zinc-800 pb-4 flex justify-between items-end">
                <h2 className="text-2xl tracking-tighter text-zinc-100">&lt;System_Log /&gt;</h2>
                <span className="text-xs text-zinc-500">v.2.0.25</span>
            </div>

            <div className="relative">
                {/* Central Dashed Line */}
                <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px border-l border-dashed border-zinc-800" />

                <div className="space-y-12">
                    {SAMPLE_AGENDA.map((item, i) => {
                        const isEven = i % 2 === 0;
                        return (
                            <div key={i} className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                                {/* Node */}
                                <div className="absolute left-4 lg:left-1/2 top-0 -translate-x-1/2 w-4 h-4 bg-zinc-950 border border-zinc-500 rounded-full z-10">
                                    <div className="absolute inset-0.5 bg-zinc-500 rounded-full opacity-50" />
                                </div>

                                {/* Content Wrapper */}
                                <div className={cn(
                                    "pl-12 lg:pl-0",
                                    isEven ? "lg:text-right lg:pr-8" : "lg:col-start-2 lg:pl-8"
                                )}>
                                    <div className="space-y-2">
                                        <div className={cn(
                                            "flex items-center gap-2 text-zinc-400 text-xs mb-1",
                                            isEven ? "lg:justify-end" : "justify-start"
                                        )}>
                                            <span>{item.time}</span>
                                            <span>//</span>
                                            <span>{item.type}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-zinc-100">{item.title}</h3>
                                        <div className={cn(
                                            "flex items-center gap-2 text-zinc-500 text-sm",
                                            isEven ? "lg:justify-end" : "justify-start"
                                        )}>
                                            <span className="w-2 h-2 bg-green-500 rounded-full inline-block" />
                                            {item.location}
                                        </div>
                                        <div className={cn(
                                            "pt-4",
                                            isEven ? "lg:flex lg:justify-end" : ""
                                        )}>
                                            <div className="border border-zinc-800 bg-zinc-900/50 p-3 rounded text-xs text-zinc-400 max-w-xs">
                                                <span className="text-green-500">$</span> init session --speaker="{item.speaker}"
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Spacer for opposite side on desktop */}
                                <div className="hidden lg:block" />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    </div>
);

// Variant 7: Modular Bento Grid
export const AgendaVariant7 = () => (
    <div className="w-full py-16 bg-muted/10">
        <div className="mx-auto w-full" style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}>
            <h2 className="text-3xl font-bold mb-8 text-foreground">Schedule Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)]">
                {SAMPLE_AGENDA.map((item, i) => {
                    // Make Keynotes larger
                    const isKeynote = item.type === "Keynote";
                    const isLunch = item.type === "Networking";
                    
                    return (
                        <Card 
                            key={i} 
                            className={cn(
                                "border-none shadow-sm hover:shadow-md transition-all group overflow-hidden relative flex flex-col justify-between",
                                isKeynote ? "md:col-span-2 md:row-span-2 bg-primary text-primary-foreground" : "bg-card",
                                isLunch ? "md:col-span-3 h-24 min-h-0 flex-row items-center bg-muted" : ""
                            )}
                        >
                            {isKeynote && (
                                <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                            )}
                            
                            <CardContent className={cn("p-6 h-full flex flex-col justify-between relative z-10", isLunch ? "flex-row items-center w-full py-4" : "")}>
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <Badge variant={isKeynote ? "secondary" : "outline"} className={cn("mb-2", isKeynote ? "bg-white/20 text-white hover:bg-white/30 border-none" : "")}>
                                            {item.type}
                                        </Badge>
                                        <span className={cn("font-mono text-sm opacity-80", isKeynote ? "text-primary-foreground" : "text-muted-foreground")}>
                                            {item.time}
                                        </span>
                                    </div>
                                    <h3 className={cn("font-bold leading-tight", isKeynote ? "text-4xl" : "text-xl", isLunch ? "text-lg m-0" : "mb-2")}>
                                        {item.title}
                                    </h3>
                                    {!isLunch && (
                                        <p className={cn("text-sm line-clamp-2", isKeynote ? "opacity-90 max-w-lg mt-4" : "text-muted-foreground")}>
                                            A comprehensive session led by industry experts covering key topics in {item.title}.
                                        </p>
                                    )}
                                </div>
                                
                                {!isLunch && (
                                    <div className="flex items-center justify-between mt-6 pt-6 border-t border-border/10">
                                        <div className="flex items-center gap-2 text-sm font-medium">
                                            <div className="h-6 w-6 rounded-full bg-muted overflow-hidden">
                                                <ImageWithFallback src={item.img} alt={item.speaker} className="h-full w-full object-cover" />
                                            </div>
                                            <span className="font-sans">{item.speaker}</span>
                                        </div>
                                        <Button size="icon" variant={isKeynote ? "secondary" : "ghost"} className={cn("rounded-full h-8 w-8", isKeynote ? "bg-white text-primary hover:bg-white/90" : "")}>
                                            <ArrowUpRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    </div>
);

// Variant 8: Typographic Ledger
export const AgendaVariant8 = () => (
    <div className="w-full py-20 bg-background text-foreground">
        <div className="mx-auto w-full" style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}>
            <div className="flex justify-between items-end mb-20 border-b-2 border-foreground pb-2">
                <h1 className="text-8xl font-black tracking-tighter leading-none hidden md:block">AGENDA</h1>
                <div className="text-right font-mono text-sm uppercase tracking-widest">
                    <p>Volume 1.0</p>
                    <p>Conference 2025</p>
                </div>
            </div>
            
            <div className="space-y-24">
                {SAMPLE_AGENDA.map((item, i) => (
                    <div key={i} className="group relative">
                        {/* Meta Top Line */}
                        <div className="flex flex-wrap justify-between items-start text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4 border-t border-transparent group-hover:border-foreground/20 pt-4 transition-all">
                            <span>{item.type}</span>
                            <div className="flex items-center gap-8">
                                <span>{item.time}</span>
                                <span>{item.location}</span>
                            </div>
                        </div>
                        
                        {/* Main Title */}
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase leading-[0.9] max-w-4xl text-foreground group-hover:text-primary transition-colors">
                                {item.title}
                            </h2>
                            <div className="lg:text-right min-w-[200px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <p className="font-bold text-lg">{item.speaker}</p>
                                <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground">
                                    View Details <ArrowUpRight className="ml-1 h-3 w-3" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-20 border-t-2 border-foreground" />
        </div>
    </div>
);
