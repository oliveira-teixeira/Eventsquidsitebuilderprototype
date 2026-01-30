import React from "react";
import { Separator } from "../ui/separator";
import { ComponentPreview } from "../design-system/ComponentPreview";

import { HeroVariant1, HeroVariant2, HeroVariant3, HeroVariant4, HeroVariant5 } from "./HeroBlocks";
import { AgendaVariant1, AgendaVariant2, AgendaVariant3, AgendaVariant4, AgendaVariant5, AgendaVariant6, AgendaVariant7, AgendaVariant8 } from "./AgendaBlocks";
import { CountdownVariant1, CountdownVariant2, CountdownVariant3 } from "./CountdownBlocks";
import { SpeakersVariant1, SpeakersVariant2, SpeakersVariant3 } from "./SpeakersBlocks";
import { SponsorsVariant1, SponsorsVariant2, SponsorsVariant3, SponsorsVariant4, SponsorsVariant5, SponsorsVariant6, SponsorsVariant7, SponsorsVariant8, SponsorsVariant9 } from "./SponsorsBlocks";
import { LocationVariant1, LocationVariant2, LocationVariant3 } from "./LocationBlocks";
import { DocumentsVariant1, DocumentsVariant2, DocumentsVariant3 } from "./DocumentsBlocks";
import { HotelVariant1, HotelVariant2, HotelVariant3, HotelVariant4 } from "./HotelBlocks";
import { BoothMapVariant1, BoothMapVariant2, BoothMapVariant3 } from "./BoothMapBlocks";

import { 
    CODE_HERO_VUE, CODE_HERO_SWIFT, 
    CODE_AGENDA_VUE, CODE_AGENDA_SWIFT, 
    CODE_COUNTDOWN_VUE, CODE_COUNTDOWN_SWIFT, 
    CODE_SPEAKERS_VUE, CODE_SPEAKERS_SWIFT 
} from "./block-code-data";
import { 
    CODE_SPONSORS_VUE, CODE_SPONSORS_SWIFT, 
    CODE_LOCATION_VUE, CODE_LOCATION_SWIFT 
} from "./block-code-data-2";
import { 
    CODE_DOCS_VUE, CODE_DOCS_SWIFT, 
    CODE_HOTEL_VUE, CODE_HOTEL_SWIFT, 
    CODE_BOOTH_MAP_VUE, CODE_BOOTH_MAP_SWIFT 
} from "./block-code-data-3";

const CODE_HERO = {
    v1: `import React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

// Variant 1: Centered with Background Image
export const HeroVariant1 = () => (
  <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden bg-zinc-900 text-white">
    <div 
      className="absolute inset-0 bg-cover bg-center z-0 opacity-50"
      style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080)' }}
    />
    <div className="relative z-10 max-w-3xl mx-auto text-center px-4 space-y-6">
      <Badge variant="secondary" className="mb-4">Annual Conference 2025</Badge>
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
        Future of Tech
      </h1>
      <p className="text-xl md:text-2xl text-zinc-200 max-w-2xl mx-auto">
        Join the world's leading minds to shape the future of technology and innovation.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <Button size="lg" className="text-lg px-8">Register Now</Button>
        <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent border-white text-white hover:bg-white/10">
          View Agenda
        </Button>
      </div>
    </div>
  </div>
);`,
    v2: `import React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Calendar, MapPin } from "lucide-react";

// Variant 2: Split Screen
export const HeroVariant2 = () => (
  <div className="w-full bg-background border-b border-border">
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
      <div className="flex flex-col justify-center p-12 lg:p-20 space-y-8">
        <div className="space-y-4">
          <Badge className="w-fit">Oct 15-17, 2025</Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            Design Systems Summit
          </h1>
          <p className="text-xl text-muted-foreground leading-[160%]">
            Scale your design workflow with the latest tools and methodologies. 
            Connect with 5,000+ designers globally.
          </p>
        </div>
        <div className="flex gap-4">
            <Button size="lg">Get Tickets</Button>
            <Button size="lg" variant="outline">Learn More</Button>
        </div>
        <div className="flex gap-8 text-sm text-muted-foreground pt-8 border-t">
            <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" /> San Francisco, CA
            </div>
            <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Moscone Center
            </div>
        </div>
      </div>
      <div className="relative h-64 lg:h-auto bg-muted">
        <img 
            src="https://images.unsplash.com/photo-1759852174174-7beac185d35f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
            alt="Abstract" 
            className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
);`,
    v3: `import React from "react";
import { Button } from "../ui/button";

// Variant 3: Minimal Solid Color
export const HeroVariant3 = () => (
  <div className="w-full bg-primary text-primary-foreground py-24 md:py-32">
    <div className="container mx-auto px-4 max-w-4xl text-center space-y-8">
      <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
        Innovate. Create. Deploy.
      </h1>
      <p className="text-xl md:text-2xl opacity-90 font-light max-w-2xl mx-auto">
        The developer conference for the modern web. 
        Experience 3 days of code, community, and chaos.
      </p>
      <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" variant="secondary" className="h-14 px-10 text-lg">
            Save Your Spot
        </Button>
      </div>
    </div>
  </div>
);`,
    v4: `import React from "react";
import { Button } from "../ui/button";
import { Play } from "lucide-react";

// Variant 4: Video Style (Simulated)
export const HeroVariant4 = () => (
  <div className="relative w-full h-[700px] flex items-end pb-20 px-4 md:px-10 overflow-hidden text-white">
     <div 
      className="absolute inset-0 bg-cover bg-center z-0"
      style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1762968269894-1d7e1ce8894e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080)' }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
    
    <div className="relative z-20 max-w-4xl space-y-6">
        <div className="flex items-center gap-3">
            <Button size="icon" className="rounded-full h-16 w-16 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-none">
                <Play className="h-8 w-8 ml-1" fill="currentColor" />
            </Button>
            <span className="font-semibold tracking-widest uppercase text-sm">Watch Showreel</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold leading-none">
            Unleash Your <br/> Potential
        </h1>
        <div className="flex flex-wrap gap-x-8 gap-y-2 text-lg font-medium opacity-90">
            <span>Nov 12-14, 2025</span>
            <span>•</span>
            <span>London, UK</span>
            <span>•</span>
            <span>ExCel Center</span>
        </div>
    </div>
  </div>
);`,
    v5: `import React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ArrowRight } from "lucide-react";

// Variant 5: Floating Cards / SaaS Style
export const HeroVariant5 = () => (
  <div className="w-full bg-muted/30 py-20 overflow-hidden">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 relative z-10">
              <Badge variant="outline" className="border-primary/50 text-primary bg-primary/10">
                  New Features Available
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">
                  Everything you need to <span className="text-primary">scale</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                  The complete platform for building modern applications. 
                  Streamline your workflow from design to deployment.
              </p>
              <div className="flex gap-4">
                  <Button size="lg" className="shadow-lg shadow-primary/20">Start Building</Button>
                  <Button size="lg" variant="ghost">Read Documentation <ArrowRight className="ml-2 h-4 w-4"/></Button>
              </div>
              <div className="pt-8 flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex -space-x-2">
                      {[1,2,3,4].map(i => (
                          <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-zinc-200" />
                      ))}
                  </div>
                  <span>Trusted by 10,000+ developers</span>
              </div>
          </div>
          
          <div className="relative lg:h-[500px] flex items-center justify-center">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl opacity-50" />
              <div className="relative z-10 grid grid-cols-2 gap-4 rotate-[-6deg] scale-90 md:scale-100">
                   <div className="space-y-4 mt-12">
                       <div className="bg-card p-4 rounded-xl shadow-xl border border-border w-64 h-40 animate-pulse" />
                       <div className="bg-card p-4 rounded-xl shadow-xl border border-border w-64 h-56" />
                   </div>
                   <div className="space-y-4">
                       <div className="bg-card p-4 rounded-xl shadow-xl border border-border w-64 h-56" />
                       <div className="bg-card p-4 rounded-xl shadow-xl border border-border w-64 h-40" />
                   </div>
              </div>
          </div>
      </div>
  </div>
);`
};

const CODE_AGENDA = {
    v1: `import React from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { MapPin } from "lucide-react";

const SAMPLE_AGENDA = [
    { time: "09:00 AM", title: "Registration & Breakfast", location: "Main Hall", type: "General" },
    { time: "10:00 AM", title: "Opening Keynote: The Future of AI", location: "Auditorium A", type: "Keynote" },
    { time: "11:30 AM", title: "Breakout Session: React Server Components", location: "Room 204", type: "Workshop" },
    { time: "01:00 PM", title: "Networking Lunch", location: "Dining Area", type: "Networking" },
    { time: "02:30 PM", title: "Design Systems at Scale", location: "Auditorium B", type: "Panel" },
];

// Variant 1: Simple List
export const AgendaVariant1 = () => (
  <div className="w-full py-12 bg-background">
    <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-foreground">Event Schedule</h2>
        <div className="space-y-4">
            {SAMPLE_AGENDA.map((item, i) => (
                <Card key={i} className="hover:shadow-md transition-shadow">
                    <CardContent className="flex flex-col md:flex-row items-start md:items-center gap-4 p-6">
                        <div className="min-w-[100px] font-mono text-primary font-bold">
                            {item.time}
                        </div>
                        <div className="flex-1 space-y-1">
                            <h3 className="font-semibold text-lg text-foreground">{item.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {item.location}</span>
                                <Badge variant="secondary" className="text-xs">{item.type}</Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
  </div>
);`,
    v2: `import React from "react";
import { Badge } from "../ui/badge";
import { MapPin } from "lucide-react";

const SAMPLE_AGENDA = [
    { time: "09:00 AM", title: "Registration & Breakfast", location: "Main Hall", type: "General" },
    { time: "10:00 AM", title: "Opening Keynote: The Future of AI", location: "Auditorium A", type: "Keynote" },
    { time: "11:30 AM", title: "Breakout Session: React Server Components", location: "Room 204", type: "Workshop" },
    { time: "01:00 PM", title: "Networking Lunch", location: "Dining Area", type: "Networking" },
    { time: "02:30 PM", title: "Design Systems at Scale", location: "Auditorium B", type: "Panel" },
];

// Variant 2: Timeline View
export const AgendaVariant2 = () => (
  <div className="w-full py-16 bg-muted/30">
    <div className="container mx-auto px-4 max-w-3xl">
         <div className="text-center mb-12">
            <Badge className="mb-2">Day 1</Badge>
            <h2 className="text-4xl font-bold text-foreground">Timeline</h2>
        </div>
        <div className="relative border-l-2 border-primary/20 ml-4 md:ml-0 space-y-12">
            {SAMPLE_AGENDA.map((item, i) => (
                <div key={i} className="relative pl-8 md:pl-0">
                    <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-primary border-4 border-background" />
                    <div className="md:grid md:grid-cols-5 md:gap-8">
                        <div className="md:col-span-1 md:text-right pt-0.5">
                            <span className="text-sm font-bold text-muted-foreground">{item.time}</span>
                        </div>
                        <div className="md:col-span-4 mt-2 md:mt-0">
                            <div className="bg-card p-6 rounded-lg border shadow-sm space-y-3">
                                <Badge variant="outline" className="w-fit">{item.type}</Badge>
                                <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <MapPin className="h-4 w-4" /> {item.location}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  </div>
);`,
    v3: `import React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { ChevronRight, User, MapPin } from "lucide-react";

const SAMPLE_AGENDA = [
    { time: "09:00 AM", title: "Registration & Breakfast", location: "Main Hall", type: "General" },
    { time: "10:00 AM", title: "Opening Keynote: The Future of AI", location: "Auditorium A", type: "Keynote" },
    { time: "11:30 AM", title: "Breakout Session: React Server Components", location: "Room 204", type: "Workshop" },
    { time: "01:00 PM", title: "Networking Lunch", location: "Dining Area", type: "Networking" },
    { time: "02:30 PM", title: "Design Systems at Scale", location: "Auditorium B", type: "Panel" },
];

// Variant 3: Compact Tabbed View
export const AgendaVariant3 = () => (
  <div className="w-full py-12 bg-background border-y border-border">
    <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b pb-4">
             <div>
                <h2 className="text-2xl font-bold text-foreground">Sessions</h2>
                <p className="text-muted-foreground">Explore the tracks and sessions.</p>
             </div>
             <div className="flex gap-2 mt-4 md:mt-0">
                 <Button variant="default" size="sm">Day 1</Button>
                 <Button variant="ghost" size="sm">Day 2</Button>
                 <Button variant="ghost" size="sm">Day 3</Button>
             </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SAMPLE_AGENDA.map((item, i) => (
                <div key={i} className="group p-5 rounded-xl border bg-card hover:border-primary/50 transition-colors cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                        <Badge variant="secondary" className="font-mono">{item.time}</Badge>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        Join us for an in-depth session about {item.title.toLowerCase()} and learn from industry experts.
                    </p>
                    <Separator className="my-3" />
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><User className="h-3 w-3"/> Speaker Name</span>
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3"/> {item.location}</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
  </div>
);`,
    v4: `import React from "react";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

const SAMPLE_AGENDA = [
    { time: "09:00 AM", title: "Registration & Breakfast", location: "Main Hall", type: "General" },
    { time: "10:00 AM", title: "Opening Keynote: The Future of AI", location: "Auditorium A", type: "Keynote" },
    { time: "11:30 AM", title: "Breakout Session: React Server Components", location: "Room 204", type: "Workshop" },
    { time: "01:00 PM", title: "Networking Lunch", location: "Dining Area", type: "Networking" },
    { time: "02:30 PM", title: "Design Systems at Scale", location: "Auditorium B", type: "Panel" },
];

// Variant 4: Brutalist Split
export const AgendaVariant4 = () => (
    <div className="w-full py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
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
);`,
    v5: `import React, { useState } from "react";
import { Badge } from "../ui/badge";
import { Plus, Minus, MapPin } from "lucide-react";
import { cn } from "../ui/utils";

const SAMPLE_AGENDA = [
    { time: "09:00 AM", title: "Registration & Breakfast", location: "Main Hall", type: "General" },
    { time: "10:00 AM", title: "Opening Keynote: The Future of AI", location: "Auditorium A", type: "Keynote" },
    { time: "11:30 AM", title: "Breakout Session: React Server Components", location: "Room 204", type: "Workshop" },
    { time: "01:00 PM", title: "Networking Lunch", location: "Dining Area", type: "Networking" },
    { time: "02:30 PM", title: "Design Systems at Scale", location: "Auditorium B", type: "Panel" },
];

// Variant 5: Interactive Accordion Stack
export const AgendaVariant5 = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(1);

    return (
        <div className="w-full py-12 bg-background">
            <div className="container mx-auto px-4 max-w-3xl">
                <h2 className="text-3xl font-bold mb-8 text-foreground">Sessions</h2>
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
                                        <span className="font-bold text-lg">{item.title}</span>
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
                                                <img src={item.img} alt={item.speaker} className="h-full w-full object-cover" />
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2">
                                                    <Badge variant="secondary">{item.type}</Badge>
                                                    <span className="text-sm font-medium">{item.speaker}</span>
                                                </div>
                                                <p className="text-muted-foreground leading-relaxed">
                                                    Join us for this exclusive session where we dive deep into the methodologies and frameworks that define modern development.
                                                </p>
                                                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase pt-2">
                                                    <MapPin className="h-3 w-3" /> {item.location}
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
};`,
    v6: `import React from "react";
import { cn } from "../ui/utils";

const SAMPLE_AGENDA = [
    { time: "09:00 AM", title: "Registration & Breakfast", location: "Main Hall", type: "General" },
    { time: "10:00 AM", title: "Opening Keynote: The Future of AI", location: "Auditorium A", type: "Keynote" },
    { time: "11:30 AM", title: "Breakout Session: React Server Components", location: "Room 204", type: "Workshop" },
    { time: "01:00 PM", title: "Networking Lunch", location: "Dining Area", type: "Networking" },
    { time: "02:30 PM", title: "Design Systems at Scale", location: "Auditorium B", type: "Panel" },
];

// Variant 6: Timeline Wireframe
export const AgendaVariant6 = () => (
    <div className="w-full py-16 bg-zinc-950 text-zinc-50 font-mono">
        <div className="container mx-auto px-4 max-w-4xl">
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
);`,
    v7: `import React from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../ui/utils";

const SAMPLE_AGENDA = [
    { time: "09:00 AM", title: "Registration & Breakfast", location: "Main Hall", type: "General" },
    { time: "10:00 AM", title: "Opening Keynote: The Future of AI", location: "Auditorium A", type: "Keynote" },
    { time: "11:30 AM", title: "Breakout Session: React Server Components", location: "Room 204", type: "Workshop" },
    { time: "01:00 PM", title: "Networking Lunch", location: "Dining Area", type: "Networking" },
    { time: "02:30 PM", title: "Design Systems at Scale", location: "Auditorium B", type: "Panel" },
];

// Variant 7: Modular Bento Grid
export const AgendaVariant7 = () => (
    <div className="w-full py-16 bg-muted/10">
        <div className="container mx-auto px-4">
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
                                                <img src={item.img} alt={item.speaker} className="h-full w-full object-cover" />
                                            </div>
                                            <span>{item.speaker}</span>
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
);`,
    v8: `import React from "react";
import { Button } from "../ui/button";
import { ArrowUpRight } from "lucide-react";

const SAMPLE_AGENDA = [
    { time: "09:00 AM", title: "Registration & Breakfast", location: "Main Hall", type: "General" },
    { time: "10:00 AM", title: "Opening Keynote: The Future of AI", location: "Auditorium A", type: "Keynote" },
    { time: "11:30 AM", title: "Breakout Session: React Server Components", location: "Room 204", type: "Workshop" },
    { time: "01:00 PM", title: "Networking Lunch", location: "Dining Area", type: "Networking" },
    { time: "02:30 PM", title: "Design Systems at Scale", location: "Auditorium B", type: "Panel" },
];

// Variant 8: Typographic Ledger
export const AgendaVariant8 = () => (
    <div className="w-full py-20 bg-background text-foreground">
        <div className="container mx-auto px-4 max-w-6xl">
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
);`
};

const CODE_COUNTDOWN = {
    v1: `import React from "react";
// Variant 1: Big Numbers Centered
export const CountdownVariant1 = () => (
  <div className="w-full py-20 bg-foreground text-background">
      <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-medium opacity-80 mb-8 uppercase tracking-widest">Event Starts In</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {[
                  { val: "14", label: "Days" },
                  { val: "08", label: "Hours" },
                  { val: "45", label: "Minutes" },
                  { val: "12", label: "Seconds" }
              ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center">
                      <span className="text-6xl md:text-8xl font-black tabular-nums tracking-tighter">
                          {item.val}
                      </span>
                      <span className="text-sm md:text-base opacity-60 font-mono mt-2">{item.label}</span>
                  </div>
              ))}
          </div>
      </div>
  </div>
);`,
    v2: `import React from "react";
import { Card } from "../ui/card";

// Variant 2: Cards
export const CountdownVariant2 = () => (
  <div 
    className="w-full py-24 bg-cover bg-center relative"
    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1761304891716-eb8b8b7f1a37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080)' }}
  >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div className="container relative z-10 mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-10 text-foreground">Don't Miss Out</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                  { val: "14", label: "DAYS" },
                  { val: "08", label: "HOURS" },
                  { val: "45", label: "MINS" },
                  { val: "12", label: "SECS" }
              ].map((item, i) => (
                  <Card key={i} className="p-6 flex flex-col items-center justify-center bg-card/50 border-primary/20 shadow-xl backdrop-blur-md">
                      <span className="text-4xl md:text-5xl font-bold text-primary mb-1">{item.val}</span>
                      <span className="text-xs font-bold text-muted-foreground tracking-widest">{item.label}</span>
                  </Card>
              ))}
          </div>
      </div>
  </div>
);`,
    v3: `import React from "react";

// Variant 3: Minimal Strip
export const CountdownVariant3 = () => (
  <div className="w-full bg-primary text-primary-foreground py-4">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm md:text-base font-medium">
          <span className="opacity-90">Registration closes in:</span>
          <div className="flex items-center gap-4 font-mono text-lg md:text-xl">
              <span>14d</span>
              <span className="opacity-50">:</span>
              <span>08h</span>
              <span className="opacity-50">:</span>
              <span>45m</span>
              <span className="opacity-50">:</span>
              <span>12s</span>
          </div>
          <button className="underline hover:opacity-80 decoration-2 underline-offset-4">Register Now</button>
      </div>
  </div>
);`
};

const CODE_SPEAKERS = {
    v1: `import React from "react";

const SPEAKERS = [
    { name: "Sarah Johnson", role: "VP of Design", company: "Acme Corp", img: "https://images.unsplash.com/photo-1766928963-c72589b9ef3f?w=400" },
    { name: "Michael Chen", role: "CTO", company: "TechStart", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400" },
    { name: "Jessica Williams", role: "Product Lead", company: "Innovate", img: "https://images.unsplash.com/photo-1762968269894-1d7e1ce8894e?w=400" },
    { name: "David Kim", role: "Founder", company: "NextGen", img: "https://images.unsplash.com/photo-1766928963-c72589b9ef3f?w=400" }, 
    { name: "Emily Davis", role: "Director", company: "Future", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400" },
    { name: "Robert Wilson", role: "Engineer", company: "BuildIt", img: "https://images.unsplash.com/photo-1762968269894-1d7e1ce8894e?w=400" },
];

// Variant 1: Grid Cards
export const SpeakersVariant1 = () => (
  <div className="w-full py-16 bg-background">
      <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Featured Speakers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {SPEAKERS.map((s, i) => (
                  <div key={i} className="group relative overflow-hidden rounded-xl">
                      <div className="aspect-[3/4] overflow-hidden bg-muted">
                          <img 
                            src={s.img} 
                            alt={s.name} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
                          />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                      <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                          <h3 className="text-xl font-bold">{s.name}</h3>
                          <p className="text-sm opacity-80">{s.role}, {s.company}</p>
                      </div>
                  </div>
              ))}
          </div>
      </div>
  </div>
);`,
    v2: `import React from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Linkedin, Twitter } from "lucide-react";

// Variant 2: List with Avatars
export const SpeakersVariant2 = () => (
  <div className="w-full py-16 bg-muted/20">
      <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">Speakers</h2>
            <Button variant="outline">View All</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SPEAKERS.map((s, i) => (
                  <Card key={i} className="flex items-center gap-4 p-4 hover:border-primary transition-colors">
                      <Avatar className="h-16 w-16">
                          <AvatarImage src={s.img} />
                          <AvatarFallback>{s.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                          <h3 className="font-bold text-lg text-foreground">{s.name}</h3>
                          <p className="text-sm text-muted-foreground">{s.role} @ {s.company}</p>
                      </div>
                      <div className="flex gap-2">
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-primary">
                              <Linkedin className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-primary">
                              <Twitter className="h-4 w-4" />
                          </Button>
                      </div>
                  </Card>
              ))}
          </div>
      </div>
  </div>
);`,
    v3: `import React from "react";
import { Card, CardContent } from "../ui/card";

// Variant 3: Horizontal Scroll
export const SpeakersVariant3 = () => (
  <div className="w-full py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
          <h2 className="text-4xl font-bold text-foreground">World Class Experts</h2>
          <p className="text-muted-foreground mt-2">Hear from the people building the future.</p>
      </div>
      <div className="flex gap-6 overflow-x-auto pb-8 px-4 container mx-auto snap-x">
          {SPEAKERS.map((s, i) => (
              <Card key={i} className="min-w-[280px] snap-center bg-card border-none shadow-lg">
                  <div className="aspect-square bg-muted rounded-t-xl overflow-hidden">
                      <img src={s.img} alt={s.name} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="p-6 text-center space-y-2">
                      <h3 className="font-bold text-xl text-foreground">{s.name}</h3>
                      <p className="text-primary font-medium text-sm">{s.company}</p>
                      <p className="text-xs text-muted-foreground">{s.role}</p>
                  </CardContent>
              </Card>
          ))}
      </div>
  </div>
);`
};

const CODE_SPONSORS = {
    v1: `import React, { useState } from "react";
import { Slider } from "../ui/slider";

// Mock Data
const ALL_SPONSORS = [
    { name: "Acme Corp", logo: "https://images.unsplash.com/photo-1612519348055-5948319a0714?w=200&h=100&fit=crop", tier: "Platinum", desc: "Building the future of everything." },
    { name: "Globex", logo: "https://images.unsplash.com/photo-1628760584600-6c31148991e9?w=200&h=100&fit=crop", tier: "Gold", desc: "Global logistics partner." },
    { name: "Soylent", logo: "https://images.unsplash.com/photo-1746047420047-03fc7a9b9226?w=200&h=100&fit=crop", tier: "Gold", desc: "Nutritional solutions." },
    { name: "Initech", logo: "/path/to/logo.png", tier: "Silver", desc: "Software for the modern age." },
    { name: "Umbrella", logo: "https://images.unsplash.com/photo-1612519348055-5948319a0714?w=200&h=100&fit=crop", tier: "Silver", desc: "Biotech research." },
    { name: "Stark Ind", logo: "https://images.unsplash.com/photo-1628760584600-6c31148991e9?w=200&h=100&fit=crop", tier: "Bronze", desc: "Advanced defense tech." },
    { name: "Cyberdyne", logo: "https://images.unsplash.com/photo-1746047420047-03fc7a9b9226?w=200&h=100&fit=crop", tier: "Bronze", desc: "AI systems." },
    { name: "Massive", logo: "https://images.unsplash.com/photo-1612519348055-5948319a0714?w=200&h=100&fit=crop", tier: "Bronze", desc: "Dynamic solutions." },
];

// Helper for user control simulation
const SponsorControl = ({ count, setCount }: { count: number, setCount: (n: number) => void }) => (
    <div className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm p-4 rounded-lg border shadow-sm w-64">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
            Show Sponsors: {count}
        </label>
        <Slider 
            value={[count]} 
            min={1} 
            max={8} 
            step={1} 
            onValueChange={(val) => setCount(val[0])} 
        />
    </div>
);

// Variant 1: Responsive Grid with Control
export const SponsorsVariant1 = () => {
  const [count, setCount] = useState(6);
  const displaySponsors = ALL_SPONSORS.slice(0, count);

  return (
    <div className="w-full py-24 bg-background border-y border-border relative group">
       <SponsorControl count={count} setCount={setCount} />
       
       <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Our Partners</h2>
            <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
                We really appreciate our sponsors! Supported by the best in the industry.
            </p>
            
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                {displaySponsors.map((s, i) => (
                    <div 
                        key={i} 
                        className="w-32 h-20 md:w-48 md:h-24 bg-muted/30 rounded-lg flex items-center justify-center p-4 grayscale hover:grayscale-0 hover:bg-muted transition-all duration-300 cursor-pointer"
                    >
                         <img 
                            src={s.logo} 
                            alt={s.name} 
                            className="max-w-full max-h-full object-contain opacity-70 hover:opacity-100" 
                         />
                    </div>
                ))}
            </div>
       </div>
    </div>
  );
};`,
    v2: `import React from "react";
import { Badge } from "../ui/badge";

const ALL_SPONSORS = [
    { name: "Acme Corp", logo: "https://images.unsplash.com/photo-1612519348055-5948319a0714?w=200&h=100&fit=crop", tier: "Platinum", desc: "Building the future of everything." },
    { name: "Globex", logo: "https://images.unsplash.com/photo-1628760584600-6c31148991e9?w=200&h=100&fit=crop", tier: "Gold", desc: "Global logistics partner." },
    { name: "Soylent", logo: "https://images.unsplash.com/photo-1746047420047-03fc7a9b9226?w=200&h=100&fit=crop", tier: "Gold", desc: "Nutritional solutions." },
    { name: "Initech", logo: "/path/to/logo.png", tier: "Silver", desc: "Software for the modern age." },
    { name: "Umbrella", logo: "https://images.unsplash.com/photo-1612519348055-5948319a0714?w=200&h=100&fit=crop", tier: "Silver", desc: "Biotech research." },
    { name: "Stark Ind", logo: "https://images.unsplash.com/photo-1628760584600-6c31148991e9?w=200&h=100&fit=crop", tier: "Bronze", desc: "Advanced defense tech." },
    { name: "Cyberdyne", logo: "https://images.unsplash.com/photo-1746047420047-03fc7a9b9226?w=200&h=100&fit=crop", tier: "Bronze", desc: "AI systems." },
    { name: "Massive", logo: "https://images.unsplash.com/photo-1612519348055-5948319a0714?w=200&h=100&fit=crop", tier: "Bronze", desc: "Dynamic solutions." },
];

// Variant 2: Tiered Layout (Platinum/Gold/Silver)
export const SponsorsVariant2 = () => {
    return (
      <div className="w-full py-20 bg-background">
          <div className="container mx-auto px-4 max-w-5xl text-center space-y-20">
              
              {/* Platinum */}
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <Badge variant="outline" className="px-4 py-1 text-sm border-primary/50 text-primary bg-primary/5">Platinum Partner</Badge>
                  <div className="flex justify-center">
                       <div className="w-64 h-32 bg-card border-2 border-primary/20 rounded-2xl flex items-center justify-center p-8 shadow-xl shadow-primary/5 transform hover:scale-105 transition-transform duration-300">
                           <img src={ALL_SPONSORS[0].logo} alt="Platinum" className="max-w-full max-h-full object-contain" />
                       </div>
                  </div>
              </div>

              {/* Gold */}
              <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-muted-foreground uppercase tracking-widest">Gold Partners</h3>
                  <div className="flex flex-wrap justify-center gap-8">
                       {ALL_SPONSORS.slice(1, 4).map((s, i) => (
                           <div key={i} className="w-48 h-24 bg-muted/20 border border-border rounded-xl flex items-center justify-center p-6 hover:bg-card hover:shadow-md transition-all">
                               <img src={s.logo} alt={s.name} className="max-w-full max-h-full object-contain opacity-80" />
                           </div>
                       ))}
                  </div>
              </div>

               {/* Silver */}
               <div className="space-y-6">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest opacity-70">Silver Partners</h3>
                  <div className="flex flex-wrap justify-center gap-6">
                       {ALL_SPONSORS.slice(4, 8).map((s, i) => (
                           <div key={i} className="w-40 h-20 bg-muted/10 rounded-lg flex items-center justify-center p-4 opacity-60 hover:opacity-100 transition-opacity">
                               <img src={s.logo} alt={s.name} className="max-w-full max-h-full object-contain grayscale" />
                           </div>
                       ))}
                  </div>
              </div>
          </div>
      </div>
    );
};`,
    v3: `import React from "react";

const ALL_SPONSORS = [
    { name: "Acme Corp", logo: "https://images.unsplash.com/photo-1612519348055-5948319a0714?w=200&h=100&fit=crop", tier: "Platinum", desc: "Building the future of everything." },
    { name: "Globex", logo: "https://images.unsplash.com/photo-1628760584600-6c31148991e9?w=200&h=100&fit=crop", tier: "Gold", desc: "Global logistics partner." },
    { name: "Soylent", logo: "https://images.unsplash.com/photo-1746047420047-03fc7a9b9226?w=200&h=100&fit=crop", tier: "Gold", desc: "Nutritional solutions." },
    { name: "Initech", logo: "/path/to/logo.png", tier: "Silver", desc: "Software for the modern age." },
    { name: "Umbrella", logo: "https://images.unsplash.com/photo-1612519348055-5948319a0714?w=200&h=100&fit=crop", tier: "Silver", desc: "Biotech research." },
    { name: "Stark Ind", logo: "https://images.unsplash.com/photo-1628760584600-6c31148991e9?w=200&h=100&fit=crop", tier: "Bronze", desc: "Advanced defense tech." },
    { name: "Cyberdyne", logo: "https://images.unsplash.com/photo-1746047420047-03fc7a9b9226?w=200&h=100&fit=crop", tier: "Bronze", desc: "AI systems." },
    { name: "Massive", logo: "https://images.unsplash.com/photo-1612519348055-5948319a0714?w=200&h=100&fit=crop", tier: "Bronze", desc: "Dynamic solutions." },
];

// Variant 3: Infinite Marquee
export const SponsorsVariant3 = () => {
    return (
      <div className="w-full py-16 bg-muted/10 border-y border-border overflow-hidden">
          <div className="container mx-auto px-4 mb-10 text-center">
              <p className="font-medium text-muted-foreground">Trusted by innovative teams worldwide</p>
          </div>
          
          <div className="relative flex overflow-hidden group">
              <div className="flex gap-12 animate-marquee whitespace-nowrap py-4">
                  {[...ALL_SPONSORS, ...ALL_SPONSORS, ...ALL_SPONSORS].map((s, i) => (
                      <div key={i} className="flex items-center gap-3 min-w-[200px] opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                          <img src={s.logo} alt={s.name} className="h-8 w-auto object-contain grayscale hover:grayscale-0" />
                          <span className="font-bold text-xl text-foreground/80">{s.name}</span>
                      </div>
                  ))}
              </div>
              
              {/* Fade edges */}
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
          </div>
          
          <style jsx>{\`
            @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
            }
            .animate-marquee {
                animation: marquee 30s linear infinite;
            }
            .group:hover .animate-marquee {
                animation-play-state: paused;
            }
          \`}</style>
      </div>
    );
};`,
    v4: `import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Star, ArrowRight } from "lucide-react";

const ALL_SPONSORS = [
    { name: "Acme Corp", logo: "https://images.unsplash.com/photo-1612519348055-5948319a0714?w=200&h=100&fit=crop", tier: "Platinum", desc: "Building the future of everything." },
    { name: "Globex", logo: "https://images.unsplash.com/photo-1628760584600-6c31148991e9?w=200&h=100&fit=crop", tier: "Gold", desc: "Global logistics partner." },
    { name: "Soylent", logo: "https://images.unsplash.com/photo-1746047420047-03fc7a9b9226?w=200&h=100&fit=crop", tier: "Gold", desc: "Nutritional solutions." },
    { name: "Initech", logo: "/path/to/logo.png", tier: "Silver", desc: "Software for the modern age." },
    { name: "Umbrella", logo: "https://images.unsplash.com/photo-1612519348055-5948319a0714?w=200&h=100&fit=crop", tier: "Silver", desc: "Biotech research." },
    { name: "Stark Ind", logo: "https://images.unsplash.com/photo-1628760584600-6c31148991e9?w=200&h=100&fit=crop", tier: "Bronze", desc: "Advanced defense tech." },
    { name: "Cyberdyne", logo: "https://images.unsplash.com/photo-1746047420047-03fc7a9b9226?w=200&h=100&fit=crop", tier: "Bronze", desc: "AI systems." },
    { name: "Massive", logo: "https://images.unsplash.com/photo-1612519348055-5948319a0714?w=200&h=100&fit=crop", tier: "Bronze", desc: "Dynamic solutions." },
];

// Variant 4: Card Grid with Descriptions
export const SponsorsVariant4 = () => {
    const [count, setCount] = useState(4);
    
    return (
      <div className="w-full py-20 bg-background relative">
          {/* <SponsorControl count={count} setCount={setCount} /> */}
          <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight">Sponsors</h2>
                    <p className="text-muted-foreground mt-2">Meet the organizations making this possible.</p>
                  </div>
                  <Button variant="outline">Become a Sponsor</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {ALL_SPONSORS.slice(0, count).map((s, i) => (
                      <Card key={i} className="hover:shadow-lg transition-all duration-300 group">
                          <CardContent className="p-6 space-y-4">
                              <div className="h-12 w-full flex items-center justify-start">
                                  <img src={s.logo} alt={s.name} className="h-10 object-contain" />
                              </div>
                              <div>
                                  <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-bold text-foreground">{s.name}</h3>
                                    {s.tier === "Platinum" && <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />}
                                  </div>
                                  <p className="text-sm text-muted-foreground line-clamp-2">{s.desc}</p>
                              </div>
                              <div className="pt-2">
                                  <span className="text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                      Visit Website <ArrowRight className="h-3 w-3" />
                                  </span>
                              </div>
                          </CardContent>
                      </Card>
                  ))}
              </div>
          </div>
      </div>
    );
};`,
    v5: `import React from "react";
import { Button } from "../ui/button";

const ALL_SPONSORS = [
    { name: "Acme Corp", logo: "https://images.unsplash.com/photo-1612519348055-5948319a0714?w=200&h=100&fit=crop", tier: "Platinum", desc: "Building the future of everything." },
    { name: "Globex", logo: "https://images.unsplash.com/photo-1628760584600-6c31148991e9?w=200&h=100&fit=crop", tier: "Gold", desc: "Global logistics partner." },
    { name: "Soylent", logo: "https://images.unsplash.com/photo-1746047420047-03fc7a9b9226?w=200&h=100&fit=crop", tier: "Gold", desc: "Nutritional solutions." },
    { name: "Initech", logo: "/path/to/logo.png", tier: "Silver", desc: "Software for the modern age." },
    { name: "Umbrella", logo: "https://images.unsplash.com/photo-1612519348055-5948319a0714?w=200&h=100&fit=crop", tier: "Silver", desc: "Biotech research." },
    { name: "Stark Ind", logo: "https://images.unsplash.com/photo-1628760584600-6c31148991e9?w=200&h=100&fit=crop", tier: "Bronze", desc: "Advanced defense tech." },
    { name: "Cyberdyne", logo: "https://images.unsplash.com/photo-1746047420047-03fc7a9b9226?w=200&h=100&fit=crop", tier: "Bronze", desc: "AI systems." },
    { name: "Massive", logo: "https://images.unsplash.com/photo-1612519348055-5948319a0714?w=200&h=100&fit=crop", tier: "Bronze", desc: "Dynamic solutions." },
];

// Variant 5: Sidebar List
export const SponsorsVariant5 = () => {
    return (
      <div className="w-full py-16 bg-muted/20 border-y border-border">
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4 space-y-6">
                  <h2 className="text-3xl font-bold">Supported By</h2>
                  <p className="text-muted-foreground leading-relaxed">
                      Our sponsors play a pivotal role in our community. 
                      They help us keep ticket prices low and quality high.
                  </p>
                  <Button className="w-full md:w-auto">Download Prospectus</Button>
              </div>
              
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {ALL_SPONSORS.slice(0, 6).map((s, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 bg-background rounded-lg border hover:border-primary/50 transition-colors">
                          <div className="h-12 w-16 flex items-center justify-center bg-muted/30 rounded p-2">
                              <img src={s.logo} alt={s.name} className="max-w-full max-h-full object-contain" />
                          </div>
                          <div className="flex-1">
                              <h4 className="font-semibold text-sm">{s.name}</h4>
                              <p className="text-xs text-muted-foreground">{s.tier} Partner</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>
    );
};`,
    v6: `import React from "react";
import { Badge } from "../ui/badge";

const ALL_SPONSORS = [
    { name: "Acme Corp", logo: "https://images.unsplash.com/photo-1612519348055-5948319a0714?w=200&h=100&fit=crop", tier: "Platinum", desc: "Building the future of everything." },
    { name: "Globex", logo: "https://images.unsplash.com/photo-1628760584600-6c31148991e9?w=200&h=100&fit=crop", tier: "Gold", desc: "Global logistics partner." },
    { name: "Soylent", logo: "https://images.unsplash.com/photo-1746047420047-03fc7a9b9226?w=200&h=100&fit=crop", tier: "Gold", desc: "Nutritional solutions." },
    { name: "Initech", logo: "/path/to/logo.png", tier: "Silver", desc: "Software for the modern age." },
    { name: "Umbrella", logo: "https://images.unsplash.com/photo-1612519348055-5948319a0714?w=200&h=100&fit=crop", tier: "Silver", desc: "Biotech research." },
    { name: "Stark Ind", logo: "https://images.unsplash.com/photo-1628760584600-6c31148991e9?w=200&h=100&fit=crop", tier: "Bronze", desc: "Advanced defense tech." },
    { name: "Cyberdyne", logo: "https://images.unsplash.com/photo-1746047420047-03fc7a9b9226?w=200&h=100&fit=crop", tier: "Bronze", desc: "AI systems." },
    { name: "Massive", logo: "https://images.unsplash.com/photo-1612519348055-5948319a0714?w=200&h=100&fit=crop", tier: "Bronze", desc: "Dynamic solutions." },
];

// Variant 6: Featured + Grid
export const SponsorsVariant6 = () => {
    return (
      <div className="w-full py-24 bg-background">
          <div className="container mx-auto px-4 text-center">
              <Badge variant="secondary" className="mb-6">Presented By</Badge>
              
              <div className="mb-16 flex justify-center">
                  <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/10 border border-border max-w-2xl w-full">
                       <img src={ALL_SPONSORS[0].logo} alt="Presenting Sponsor" className="h-16 md:h-24 mx-auto object-contain mb-6" />
                       <p className="text-lg font-medium">Acme Corp is dedicated to bringing you the best experience.</p>
                  </div>
              </div>
              
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-8">In Association With</p>
              
              <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 max-w-4xl mx-auto">
                   {ALL_SPONSORS.slice(1).map((s, i) => (
                       <div key={i} className="w-32 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                           <img src={s.logo} alt={s.name} className="max-w-full h-10 object-contain mx-auto" />
                       </div>
                   ))}
              </div>
          </div>
      </div>
    );
};`,
    v7: `import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const ALL_SPONSORS = [
    { name: "Acme Corp", logo: "https://images.unsplash.com/photo-1612519348055-5948319a0714?w=200&h=100&fit=crop", tier: "Platinum", desc: "Building the future of everything." },
    { name: "Globex", logo: "https://images.unsplash.com/photo-1628760584600-6c31148991e9?w=200&h=100&fit=crop", tier: "Gold", desc: "Global logistics partner." },
    { name: "Soylent", logo: "https://images.unsplash.com/photo-1746047420047-03fc7a9b9226?w=200&h=100&fit=crop", tier: "Gold", desc: "Nutritional solutions." },
    { name: "Initech", logo: "/path/to/logo.png", tier: "Silver", desc: "Software for the modern age." },
    { name: "Umbrella", logo: "https://images.unsplash.com/photo-1612519348055-5948319a0714?w=200&h=100&fit=crop", tier: "Silver", desc: "Biotech research." },
    { name: "Stark Ind", logo: "https://images.unsplash.com/photo-1628760584600-6c31148991e9?w=200&h=100&fit=crop", tier: "Bronze", desc: "Advanced defense tech." },
    { name: "Cyberdyne", logo: "https://images.unsplash.com/photo-1746047420047-03fc7a9b9226?w=200&h=100&fit=crop", tier: "Bronze", desc: "AI systems." },
    { name: "Massive", logo: "https://images.unsplash.com/photo-1612519348055-5948319a0714?w=200&h=100&fit=crop", tier: "Bronze", desc: "Dynamic solutions." },
];

// Variant 7: Auto-scroll Logo Carousel (Embla)
export const SponsorsVariant7 = () => {
    const plugin = React.useMemo(() => Autoplay({ delay: 2000, stopOnInteraction: false }), []);
    const opts = React.useMemo(() => ({ align: "start" as const, loop: true }), []);

    return (
        <div className="w-full py-20 bg-background border-t border-border">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-2xl font-bold tracking-tight mb-8">Official Partners</h2>
                
                <Carousel
                    plugins={[plugin]}
                    className="w-full max-w-5xl mx-auto"
                    opts={opts}
                >
                    <CarouselContent className="-ml-4">
                        {ALL_SPONSORS.map((s, i) => (
                            <CarouselItem key={i} className="pl-4 basis-1/2 md:basis-1/4 lg:basis-1/5">
                                <div className="p-4 bg-muted/10 rounded-lg border flex items-center justify-center h-24 hover:bg-muted/30 transition-colors">
                                    <img src={s.logo} alt={s.name} className="max-w-full max-h-full object-contain mix-blend-multiply opacity-80" />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </div>
    );
};`,
    v8: `import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const ALL_SPONSORS = [
    { name: "Acme Corp", logo: "https://images.unsplash.com/photo-1612519348055-5948319a0714?w=200&h=100&fit=crop", tier: "Platinum", desc: "Building the future of everything." },
    { name: "Globex", logo: "https://images.unsplash.com/photo-1628760584600-6c31148991e9?w=200&h=100&fit=crop", tier: "Gold", desc: "Global logistics partner." },
    { name: "Soylent", logo: "https://images.unsplash.com/photo-1746047420047-03fc7a9b9226?w=200&h=100&fit=crop", tier: "Gold", desc: "Nutritional solutions." },
    { name: "Initech", logo: "/path/to/logo.png", tier: "Silver", desc: "Software for the modern age." },
    { name: "Umbrella", logo: "https://images.unsplash.com/photo-1612519348055-5948319a0714?w=200&h=100&fit=crop", tier: "Silver", desc: "Biotech research." },
    { name: "Stark Ind", logo: "https://images.unsplash.com/photo-1628760584600-6c31148991e9?w=200&h=100&fit=crop", tier: "Bronze", desc: "Advanced defense tech." },
    { name: "Cyberdyne", logo: "https://images.unsplash.com/photo-1746047420047-03fc7a9b9226?w=200&h=100&fit=crop", tier: "Bronze", desc: "AI systems." },
    { name: "Massive", logo: "https://images.unsplash.com/photo-1612519348055-5948319a0714?w=200&h=100&fit=crop", tier: "Bronze", desc: "Dynamic solutions." },
];

// Variant 8: Sponsor Spotlight Carousel
export const SponsorsVariant8 = () => {
    const opts = React.useMemo(() => ({ align: "start" as const, loop: true }), []);

    return (
        <div className="w-full py-24 bg-muted/30">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Meet Our Partners</h2>
                
                <Carousel
                    className="w-full max-w-4xl mx-auto"
                    opts={opts}
                >
                    <CarouselContent>
                        {ALL_SPONSORS.slice(0, 5).map((s, i) => (
                            <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/2">
                                <div className="p-1">
                                    <Card className="h-full border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                                        <CardContent className="flex flex-col gap-6 p-8 h-full justify-between">
                                            <div className="h-16 flex items-center justify-center border-b border-border/50 pb-6">
                                                <img src={s.logo} alt={s.name} className="h-12 object-contain" />
                                            </div>
                                            <div className="flex-1 space-y-4">
                                                <div>
                                                    <h3 className="font-bold text-lg text-foreground">{s.name}</h3>
                                                    <p className="text-sm font-medium text-primary">{s.tier} Partner</p>
                                                </div>
                                                <p className="text-muted-foreground text-sm leading-relaxed">
                                                    {s.desc}
                                                </p>
                                            </div>
                                            <div className="pt-4 mt-auto">
                                                <Button variant="outline" className="w-full group">
                                                    Learn More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </div>
    );
};`,
    v9: `import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Badge } from "../ui/badge";
import { ArrowRight } from "lucide-react";

const ALL_SPONSORS = [
    { name: "Acme Corp", logo: "https://images.unsplash.com/photo-1612519348055-5948319a0714?w=200&h=100&fit=crop", tier: "Platinum", desc: "Building the future of everything." },
    { name: "Globex", logo: "https://images.unsplash.com/photo-1628760584600-6c31148991e9?w=200&h=100&fit=crop", tier: "Gold", desc: "Global logistics partner." },
    { name: "Soylent", logo: "https://images.unsplash.com/photo-1746047420047-03fc7a9b9226?w=200&h=100&fit=crop", tier: "Gold", desc: "Nutritional solutions." },
    { name: "Initech", logo: "/path/to/logo.png", tier: "Silver", desc: "Software for the modern age." },
    { name: "Umbrella", logo: "https://images.unsplash.com/photo-1612519348055-5948319a0714?w=200&h=100&fit=crop", tier: "Silver", desc: "Biotech research." },
    { name: "Stark Ind", logo: "https://images.unsplash.com/photo-1628760584600-6c31148991e9?w=200&h=100&fit=crop", tier: "Bronze", desc: "Advanced defense tech." },
    { name: "Cyberdyne", logo: "https://images.unsplash.com/photo-1746047420047-03fc7a9b9226?w=200&h=100&fit=crop", tier: "Bronze", desc: "AI systems." },
    { name: "Massive", logo: "https://images.unsplash.com/photo-1612519348055-5948319a0714?w=200&h=100&fit=crop", tier: "Bronze", desc: "Dynamic solutions." },
];

// Variant 9: Highlight Center Carousel
export const SponsorsVariant9 = () => {
    const opts = React.useMemo(() => ({ align: "center" as const, loop: true }), []);

    return (
        <div className="w-full py-20 bg-background overflow-hidden">
            <div className="container mx-auto px-4 flex flex-col items-center">
                <Badge className="mb-4">Spotlight</Badge>
                <h2 className="text-4xl font-bold tracking-tight mb-12 text-center">Featured Sponsors</h2>
                
                <Carousel
                    className="w-full max-w-6xl"
                    opts={opts}
                >
                    <CarouselContent className="-ml-4">
                        {ALL_SPONSORS.map((s, i) => (
                            <CarouselItem key={i} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                                <div className="p-1">
                                    <div className="group relative aspect-video overflow-hidden rounded-xl bg-card border shadow-sm hover:shadow-xl transition-all duration-300 flex items-center justify-center p-8">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <img 
                                            src={s.logo} 
                                            alt={s.name} 
                                            className="max-w-[70%] max-h-[60%] object-contain transition-transform duration-500 group-hover:scale-110" 
                                        />
                                        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                                            <span className="text-sm font-bold text-primary flex items-center gap-1">
                                                View Profile <ArrowRight className="h-3 w-3" />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-center mt-4">
                                        <h3 className="font-semibold text-lg">{s.name}</h3>
                                        <p className="text-sm text-muted-foreground">{s.tier} Sponsor</p>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:flex" />
                    <CarouselNext className="hidden md:flex" />
                </Carousel>
            </div>
        </div>
    );
};`
};

const CODE_LOCATION = {
    v1: `import React from "react";
import { Button } from "../ui/button";
import { MapPin, Navigation, Phone, Mail } from "lucide-react";

// Variant 1: Map Side Info
export const LocationVariant1 = () => (
  <div className="w-full bg-background border-y border-border">
      <div className="grid grid-cols-1 md:grid-cols-2 h-[500px]">
          <div className="bg-muted relative">
              <img 
                src="https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
                alt="Map" 
                className="w-full h-full object-cover grayscale opacity-70"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-primary text-primary-foreground p-3 rounded-full shadow-xl animate-bounce">
                      <MapPin className="h-8 w-8" />
                  </div>
              </div>
          </div>
          <div className="p-12 flex flex-col justify-center bg-card">
              <h2 className="text-3xl font-bold mb-6 text-foreground">The Venue</h2>
              <div className="space-y-6">
                  <div>
                      <h3 className="font-semibold text-lg">Moscone Center</h3>
                      <p className="text-muted-foreground">747 Howard St<br/>San Francisco, CA 94103</p>
                  </div>
                  <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-primary" /> +1 (555) 123-4567
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-primary" /> events@example.com
                      </div>
                  </div>
                  <Button className="w-fit gap-2">
                      <Navigation className="h-4 w-4" /> Get Directions
                  </Button>
              </div>
          </div>
      </div>
  </div>
);`,
    v2: `import React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

// Variant 2: Full Map with Card
export const LocationVariant2 = () => (
  <div className="relative w-full h-[600px] bg-muted">
       <img 
            src="https://images.unsplash.com/photo-1694702702714-a48c5fabdaf3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
            alt="Map Background" 
            className="w-full h-full object-cover"
       />
       <div className="absolute top-1/2 left-8 md:left-20 -translate-y-1/2 w-[350px]">
           <Card className="shadow-2xl border-none">
               <CardContent className="p-8 space-y-4">
                   <Badge>Venue</Badge>
                   <h2 className="text-2xl font-bold text-foreground">Grand Hyatt</h2>
                   <p className="text-muted-foreground">
                       Experience luxury in the heart of the city. Located 5 minutes from the airport.
                   </p>
                   <div className="pt-4 border-t">
                       <p className="font-medium text-foreground">1000 Blvd of the Arts</p>
                       <p className="text-sm text-muted-foreground">Sarasota, FL 34236</p>
                   </div>
                   <Button className="w-full" variant="secondary">View on Google Maps</Button>
               </CardContent>
           </Card>
       </div>
  </div>
);`,
    v3: `import React from "react";
import { MapPin } from "lucide-react";

// Variant 3: Text Heavy
export const LocationVariant3 = () => (
  <div className="w-full py-20 bg-background">
      <div className="container mx-auto px-4 flex flex-col items-center text-center space-y-8">
          <MapPin className="h-12 w-12 text-primary" />
          <h2 className="text-4xl font-bold text-foreground">How to get there</h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
              Located in the vibrant Arts District, our venue is accessible by all major public transport lines. 
              Parking is available on-site for registered attendees.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl pt-8">
              <div className="p-6 bg-muted/30 rounded-lg">
                  <h3 className="font-bold mb-2">By Train</h3>
                  <p className="text-sm text-muted-foreground">Central Station is a 5-minute walk from the venue.</p>
              </div>
              <div className="p-6 bg-muted/30 rounded-lg">
                  <h3 className="font-bold mb-2">By Car</h3>
                  <p className="text-sm text-muted-foreground">Valet parking at the main entrance on 4th St.</p>
              </div>
              <div className="p-6 bg-muted/30 rounded-lg">
                  <h3 className="font-bold mb-2">By Air</h3>
                  <p className="text-sm text-muted-foreground">Direct shuttle from INT Airport every 30 mins.</p>
              </div>
          </div>
      </div>
  </div>
);`
};

const CODE_DOCS = {
    v1: `import React from "react";
import { Card, CardContent } from "../ui/card";
import { FileText } from "lucide-react";

const DOCS = [
    { name: "Conference Brochure", size: "2.4 MB", type: "PDF" },
    { name: "Sponsorship Deck", size: "5.1 MB", type: "PDF" },
    { name: "Attendee Guidelines", size: "1.2 MB", type: "DOCX" },
    { name: "Code of Conduct", size: "0.5 MB", type: "PDF" },
];

// Variant 1: Grid Icons
export const DocumentsVariant1 = () => (
  <div className="w-full py-16 bg-muted/10">
      <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-foreground">Downloads</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {DOCS.map((doc, i) => (
                  <Card key={i} className="hover:border-primary transition-colors cursor-pointer group">
                      <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                          <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                              <FileText className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
                          </div>
                          <div>
                              <h3 className="font-medium text-foreground">{doc.name}</h3>
                              <p className="text-xs text-muted-foreground mt-1">{doc.type} • {doc.size}</p>
                          </div>
                      </CardContent>
                  </Card>
              ))}
          </div>
      </div>
  </div>
);`,
    v2: `import React from "react";
import { Button } from "../ui/button";
import { File, Download } from "lucide-react";

const DOCS = [
    { name: "Conference Brochure", size: "2.4 MB", type: "PDF" },
    { name: "Sponsorship Deck", size: "5.1 MB", type: "PDF" },
    { name: "Attendee Guidelines", size: "1.2 MB", type: "DOCX" },
    { name: "Code of Conduct", size: "0.5 MB", type: "PDF" },
];

// Variant 2: Simple List
export const DocumentsVariant2 = () => (
  <div className="w-full py-12 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">Resources</h2>
            <Button variant="link">View All</Button>
          </div>
          <div className="space-y-2">
              {DOCS.map((doc, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                          <File className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium text-foreground">{doc.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                          <span className="text-xs text-muted-foreground hidden sm:block">{doc.size}</span>
                          <Button size="icon" variant="ghost">
                              <Download className="h-4 w-4" />
                          </Button>
                      </div>
                  </div>
              ))}
          </div>
      </div>
  </div>
);`,
    v3: `import React from "react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { FileIcon, ExternalLink } from "lucide-react";

// Variant 3: Card Previews
export const DocumentsVariant3 = () => (
  <div className="w-full py-16 bg-background">
      <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-foreground">Media Kit</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden">
                      <div className="h-40 bg-muted flex items-center justify-center border-b">
                          <FileIcon className="h-12 w-12 text-muted-foreground/50" />
                      </div>
                      <CardHeader>
                          <CardTitle className="text-lg">Press Release {i}</CardTitle>
                          <CardDescription>Published on Oct {10 + i}, 2025</CardDescription>
                      </CardHeader>
                      <CardContent>
                          <Button className="w-full gap-2" variant="outline">
                              <ExternalLink className="h-4 w-4" /> Open Document
                          </Button>
                      </CardContent>
                  </Card>
              ))}
          </div>
      </div>
  </div>
);`
};

const CODE_HOTEL = {
    v1: `import React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Wifi, Coffee, Dumbbell } from "lucide-react";

// Variant 1: Side by Side
export const HotelVariant1 = () => (
  <div className="w-full py-20 bg-background border-b border-border">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden shadow-2xl h-[400px]">
              <img 
                src="https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
                alt="Hotel Lobby" 
                className="w-full h-full object-cover"
              />
          </div>
          <div className="space-y-6">
              <Badge variant="secondary">Official Partner</Badge>
              <h2 className="text-4xl font-bold text-foreground">The Marriott Marquis</h2>
              <p className="text-lg text-muted-foreground">
                  Stay where the action is. Enjoy exclusive rates for conference attendees starting at $199/night. 
                  Includes free wifi and breakfast.
              </p>
              <ul className="space-y-2 text-foreground">
                  <li className="flex items-center gap-2"><Wifi className="h-4 w-4 text-primary"/> High-speed Wifi</li>
                  <li className="flex items-center gap-2"><Coffee className="h-4 w-4 text-primary"/> Continental Breakfast</li>
                  <li className="flex items-center gap-2"><Dumbbell className="h-4 w-4 text-primary"/> 24/7 Gym Access</li>
              </ul>
              <div className="pt-4">
                  <Button size="lg">Book Your Room</Button>
                  <p className="text-xs text-muted-foreground mt-2">Promo code: CONF2025</p>
              </div>
          </div>
      </div>
  </div>
);`,
    v2: `import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

// Variant 2: Card Grid of Options
export const HotelVariant2 = () => (
  <div className="w-full py-16 bg-muted/30">
      <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Accommodations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {['Luxury Suite', 'Standard King', 'Double Queen'].map((room, i) => (
                  <Card key={i} className="overflow-hidden flex flex-col">
                      <div className="h-48 bg-muted relative">
                           <img 
                                src={\`https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080\`} 
                                alt={room} 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 right-4 bg-background/90 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                                \${150 + i * 50}/night
                            </div>
                      </div>
                      <CardContent className="p-6 flex-1 flex flex-col">
                          <h3 className="text-xl font-bold mb-2 text-foreground">{room}</h3>
                          <p className="text-muted-foreground text-sm mb-4 flex-1">
                              Perfect for relaxing after a long day of networking.
                          </p>
                          <Button variant="outline" className="w-full">Select</Button>
                      </CardContent>
                  </Card>
              ))}
          </div>
      </div>
  </div>
);`,
    v3: `import React from "react";
import { Button } from "../ui/button";

// Variant 3: Banner CTA
export const HotelVariant3 = () => (
  <div className="w-full bg-primary py-12 px-4">
      <div className="container mx-auto max-w-4xl bg-background rounded-2xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">Need a place to stay?</h2>
              <p className="text-muted-foreground max-w-md">
                  We have secured a block of rooms at the Hilton for a discounted rate. 
                  Limited availability remains.
              </p>
          </div>
          <div className="flex flex-col gap-3 min-w-[200px]">
              <Button size="lg" className="w-full">Reserve Now</Button>
              <span className="text-center text-xs text-muted-foreground">Expires Oct 1st</span>
          </div>
      </div>
  </div>
);`,
    v4: `import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { CheckCircle2, ExternalLink, Mail, MapPin, Phone } from "lucide-react";

// Variant 4: Accordion List (Figma Design)
export const HotelVariant4 = () => (
  <div className="w-full py-20 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">Accommodations</h2>
              <p className="text-muted-foreground text-lg">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
          </div>
          
          <Accordion type="multiple" defaultValue={["item-1"]} className="w-full space-y-4">
              <AccordionItem value="item-1" className="border-b-0">
                  <AccordionTrigger className="text-3xl font-semibold hover:no-underline py-6">
                      Recommended Hotels
                  </AccordionTrigger>
                  <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
                          {[1, 2, 3].map((i) => (
                              <div key={i} className="group rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
                                  <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                                       <img 
                                          src={\`https://images.unsplash.com/photo-\${i === 1 ? '1566073771259-6a8506099945' : i === 2 ? '1582719508461-905c673771fd' : '1542314831-068cd1dbfeeb'}?auto=format&fit=crop&q=80&w=800\`}
                                          alt="Hotel" 
                                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" 
                                      />
                                  </div>
                                  <div className="p-6 space-y-6">
                                      <div className="space-y-4">
                                          <div className="space-y-2">
                                              <h3 className="text-xl font-semibold text-primary">Hotel Name</h3>
                                              <Badge variant="secondary" className="font-normal bg-muted text-foreground hover:bg-muted/80">
                                                  <CheckCircle2 className="mr-1 h-3 w-3" />
                                                  Book by March for a 15% discount
                                              </Badge>
                                          </div>
                                          
                                          <div className="space-y-3 text-sm text-muted-foreground">
                                              <div className="flex items-start gap-2">
                                                  <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                                                  <span>123 Main St, City, Country</span>
                                              </div>
                                              <div className="flex items-center gap-2">
                                                  <Phone className="h-4 w-4 shrink-0" />
                                                  <span>+1 234 567 8900</span>
                                              </div>
                                              <div className="flex items-center gap-2">
                                                  <Mail className="h-4 w-4 shrink-0" />
                                                  <span>info@grandhotel.com</span>
                                              </div>
                                          </div>
                                      </div>
                                      
                                      <Button variant="secondary" className="w-fit" asChild>
                                          <a href="#">
                                              Visit Website
                                              <ExternalLink className="ml-2 h-4 w-4" />
                                          </a>
                                      </Button>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="border-b-0">
                  <AccordionTrigger className="text-3xl font-semibold hover:no-underline py-6">
                      Find Hotels
                  </AccordionTrigger>
                  <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
                          {['Hotels near the Event', 'Hotels near the Airport'].map((title, i) => (
                              <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
                                  <div className="aspect-[4/3] bg-muted relative">
                                      <img 
                                          src={\`https://images.unsplash.com/photo-\${i === 0 ? '1445019980597-93fa8acb726c' : '1569335846770-441bec083f21'}?auto=format&fit=crop&q=80&w=800\`}
                                          alt={title}
                                          className="object-cover w-full h-full"
                                      />
                                  </div>
                                  <div className="p-6 space-y-4">
                                      <div className="space-y-1">
                                          <h3 className="text-xl font-semibold">{title}</h3>
                                          <p className="text-sm text-muted-foreground">Description goes here</p>
                                      </div>
                                      <Button className="w-fit">
                                          View Options
                                          <ExternalLink className="ml-2 h-4 w-4" />
                                      </Button>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </AccordionContent>
              </AccordionItem>
          </Accordion>
      </div>
  </div>
);`
};

const CODE_BOOTH = {
    v1: `import React from "react";
import { Badge } from "../ui/badge";

// Variant 1: Interactive Map (Visual)
export const BoothMapVariant1 = () => (
  <div className="w-full py-16 bg-background">
      <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-foreground">Expo Floor Plan</h2>
              <Badge variant="outline">Main Hall</Badge>
          </div>
          <div className="relative w-full aspect-[16/9] bg-muted rounded-xl border-2 border-dashed border-border overflow-hidden flex items-center justify-center">
               <img 
                    src="https://images.unsplash.com/photo-1721244654210-a505a99661e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
                    alt="Floor Plan" 
                    className="absolute inset-0 w-full h-full object-cover opacity-20"
               />
               <div className="grid grid-cols-4 gap-4 relative z-10 p-8 w-full max-w-3xl">
                   {[...Array(8)].map((_, i) => (
                       <div key={i} className="aspect-square bg-card border-2 border-primary/50 hover:bg-primary/20 rounded-md flex items-center justify-center cursor-pointer transition-colors shadow-sm">
                           <span className="font-bold text-xs text-primary">A-{100 + i}</span>
                       </div>
                   ))}
               </div>
          </div>
      </div>
  </div>
);`,
    v2: `import React from "react";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

// Variant 2: Directory List
export const BoothMapVariant2 = () => (
  <div className="w-full py-16 bg-muted/20">
      <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Exhibitor Directory</h2>
          <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search exhibitors..." className="pl-9" />
          </div>
          <div className="space-y-2 h-[400px] overflow-y-auto pr-2">
              {['Adobe', 'Figma', 'Vercel', 'Supabase', 'Linear', 'Raycast', 'Notion', 'Slack'].map((name, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-card rounded-lg border">
                      <span className="font-semibold text-foreground">{name}</span>
                      <Badge variant="secondary">Booth #{200 + i}</Badge>
                  </div>
              ))}
          </div>
      </div>
  </div>
);`,
    v3: `import React from "react";
import { Button } from "../ui/button";

// Variant 3: Floor Tabs
export const BoothMapVariant3 = () => (
  <div className="w-full py-12 bg-background">
      <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/4 space-y-2">
                  <h3 className="font-bold mb-4 text-foreground">Select Floor</h3>
                  <Button variant="default" className="w-full justify-start">Level 1 - Expo Hall</Button>
                  <Button variant="ghost" className="w-full justify-start">Level 2 - Conference Rooms</Button>
                  <Button variant="ghost" className="w-full justify-start">Level 3 - VIP Lounge</Button>
              </div>
              <div className="flex-1 bg-muted rounded-xl h-[500px] relative overflow-hidden flex items-center justify-center">
                  <p className="text-muted-foreground font-medium">Interactive Map Placeholder</p>
                  {/* Simulated booths */}
                  <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 border-2 border-primary rounded-lg flex items-center justify-center">
                      <span className="text-primary font-bold">Lounge</span>
                  </div>
                  <div className="absolute bottom-1/4 right-1/4 w-48 h-24 bg-secondary/20 border-2 border-secondary rounded-lg flex items-center justify-center">
                      <span className="text-secondary-foreground font-bold">Cafe</span>
                  </div>
              </div>
          </div>
      </div>
  </div>
);`
};

export const BlockCategoryView = ({ category }: { category: string }) => {
    let title = "";
    let description = "";
    let variants: React.ReactNode[] = [];

    switch (category) {
        case "hero":
            title = "Hero Sections";
            description = "High-impact headers to start your page.";
            variants = [
                <ComponentPreview key="1" title="Hero Variant 1: Centered with Image" description="A classic hero with a background image and centered text." preview={<HeroVariant1 />} code={CODE_HERO.v1} vueCode={CODE_HERO_VUE.v1} swiftCode={CODE_HERO_SWIFT.v1} />,
                <ComponentPreview key="2" title="Hero Variant 2: Split Screen" description="Content on the left, visual on the right." preview={<HeroVariant2 />} code={CODE_HERO.v2} vueCode={CODE_HERO_VUE.v2} swiftCode={CODE_HERO_SWIFT.v2} />,
                <ComponentPreview key="3" title="Hero Variant 3: Minimal Brand" description="Bold typography on a solid brand color background." preview={<HeroVariant3 />} code={CODE_HERO.v3} vueCode={CODE_HERO_VUE.v3} swiftCode={CODE_HERO_SWIFT.v3} />,
                <ComponentPreview key="4" title="Hero Variant 4: Video Style" description="Simulated video background with overlay text." preview={<HeroVariant4 />} code={CODE_HERO.v4} vueCode={CODE_HERO_VUE.v4} swiftCode={CODE_HERO_SWIFT.v4} />,
                <ComponentPreview key="5" title="Hero Variant 5: SaaS / Floating Cards" description="Modern SaaS style with floating elements and depth." preview={<HeroVariant5 />} code={CODE_HERO.v5} vueCode={CODE_HERO_VUE.v5} swiftCode={CODE_HERO_SWIFT.v5} />,
            ];
            break;
        case "agenda":
            title = "Agenda & Schedule";
            description = "Display event schedules and timelines.";
            variants = [
                <ComponentPreview key="1" title="Agenda Variant 1: Simple List" description="A clean vertical list of events." preview={<AgendaVariant1 />} code={CODE_AGENDA.v1} vueCode={CODE_AGENDA_VUE.v1} swiftCode={CODE_AGENDA_SWIFT.v1} />,
                <ComponentPreview key="2" title="Agenda Variant 2: Timeline" description="A vertical timeline with connected nodes." preview={<AgendaVariant2 />} code={CODE_AGENDA.v2} vueCode={CODE_AGENDA_VUE.v2} swiftCode={CODE_AGENDA_SWIFT.v2} />,
                <ComponentPreview key="3" title="Agenda Variant 3: Compact Cards" description="Grid layout with compact cards for sessions." preview={<AgendaVariant3 />} code={CODE_AGENDA.v3} vueCode={CODE_AGENDA_VUE.v3} swiftCode={CODE_AGENDA_SWIFT.v3} />,
                <ComponentPreview key="4" title="Agenda Variant 4: Brutalist Split" description="High-contrast editorial look with vertical divider." preview={<AgendaVariant4 />} code={CODE_AGENDA.v4} vueCode="" swiftCode="" />,
                <ComponentPreview key="5" title="Agenda Variant 5: Interactive Accordion" description="Minimalist stack revealing details on expand." preview={<AgendaVariant5 />} code={CODE_AGENDA.v5} vueCode="" swiftCode="" />,
                <ComponentPreview key="6" title="Agenda Variant 6: Timeline Wireframe" description="Technical blueprint style with mono-spaced fonts." preview={<AgendaVariant6 />} code={CODE_AGENDA.v6} vueCode="" swiftCode="" />,
                <ComponentPreview key="7" title="Agenda Variant 7: Modular Bento Grid" description="Varied card sizes implying importance." preview={<AgendaVariant7 />} code={CODE_AGENDA.v7} vueCode="" swiftCode="" />,
                <ComponentPreview key="8" title="Agenda Variant 8: Typographic Ledger" description="Sophisticated low-fi look with extreme whitespace." preview={<AgendaVariant8 />} code={CODE_AGENDA.v8} vueCode="" swiftCode="" />,
            ];
            break;
        case "countdown":
            title = "Countdown Timers";
            description = "Build urgency for your event.";
            variants = [
                <ComponentPreview key="1" title="Countdown Variant 1: Big Numbers" description="Large typography centered." preview={<CountdownVariant1 />} code={CODE_COUNTDOWN.v1} vueCode={CODE_COUNTDOWN_VUE.v1} swiftCode={CODE_COUNTDOWN_SWIFT.v1} />,
                <ComponentPreview key="2" title="Countdown Variant 2: Cards with Image" description="Glassmorphism cards over a background." preview={<CountdownVariant2 />} code={CODE_COUNTDOWN.v2} vueCode={CODE_COUNTDOWN_VUE.v2} swiftCode={CODE_COUNTDOWN_SWIFT.v2} />,
                <ComponentPreview key="3" title="Countdown Variant 3: Minimal Bar" description="A slim sticky-style bar." preview={<CountdownVariant3 />} code={CODE_COUNTDOWN.v3} vueCode={CODE_COUNTDOWN_VUE.v3} swiftCode={CODE_COUNTDOWN_SWIFT.v3} />,
            ];
            break;
        case "speakers":
            title = "Speakers";
            description = "Showcase your experts and guests.";
            variants = [
                <ComponentPreview key="1" title="Speakers Variant 1: Grid with Hover" description="Image-heavy grid with hover effects." preview={<SpeakersVariant1 />} code={CODE_SPEAKERS.v1} vueCode={CODE_SPEAKERS_VUE.v1} swiftCode={CODE_SPEAKERS_SWIFT.v1} />,
                <ComponentPreview key="2" title="Speakers Variant 2: List Layout" description="Horizontal cards with avatars." preview={<SpeakersVariant2 />} code={CODE_SPEAKERS.v2} vueCode={CODE_SPEAKERS_VUE.v2} swiftCode={CODE_SPEAKERS_SWIFT.v2} />,
                <ComponentPreview key="3" title="Speakers Variant 3: Horizontal Scroll" description="Swipeable row of cards." preview={<SpeakersVariant3 />} code={CODE_SPEAKERS.v3} vueCode={CODE_SPEAKERS_VUE.v3} swiftCode={CODE_SPEAKERS_SWIFT.v3} />,
            ];
            break;
        case "sponsors":
            title = "Sponsors";
            description = "Highlight your partners. Use the controls to adjust the number of displayed sponsors.";
            variants = [
                <ComponentPreview key="1" title="Sponsors Variant 1: Responsive Grid with Control" description="A clean grid of logos. You can adjust the number of items using the slider (top right)." preview={<SponsorsVariant1 />} code={CODE_SPONSORS.v1} vueCode={CODE_SPONSORS_VUE.v1} swiftCode={CODE_SPONSORS_SWIFT.v1} />,
                <ComponentPreview key="2" title="Sponsors Variant 2: Tiered Layout" description="Hierarchical display for Platinum, Gold, and Silver levels." preview={<SponsorsVariant2 />} code={CODE_SPONSORS.v2} vueCode={CODE_SPONSORS_VUE.v2} swiftCode={CODE_SPONSORS_SWIFT.v2} />,
                <ComponentPreview key="3" title="Sponsors Variant 3: Infinite Marquee" description="Infinite scrolling marquee for a dynamic display." preview={<SponsorsVariant3 />} code={CODE_SPONSORS.v3} vueCode={CODE_SPONSORS_VUE.v3} swiftCode={CODE_SPONSORS_SWIFT.v3} />,
                <ComponentPreview key="4" title="Sponsors Variant 4: Card Grid" description="Detailed cards with descriptions and website links." preview={<SponsorsVariant4 />} code={CODE_SPONSORS.v4} vueCode={CODE_SPONSORS_VUE.v4} swiftCode={CODE_SPONSORS_SWIFT.v4} />,
                <ComponentPreview key="5" title="Sponsors Variant 5: Sidebar List" description="A layout suitable for showing sponsors alongside other content." preview={<SponsorsVariant5 />} code={CODE_SPONSORS.v5} vueCode={CODE_SPONSORS_VUE.v5} swiftCode={CODE_SPONSORS_SWIFT.v5} />,
                <ComponentPreview key="6" title="Sponsors Variant 6: Featured" description="Highlights a main sponsor with others in a supporting role." preview={<SponsorsVariant6 />} code={CODE_SPONSORS.v6} vueCode={CODE_SPONSORS_VUE.v6} swiftCode={CODE_SPONSORS_SWIFT.v6} />,
                <ComponentPreview key="7" title="Sponsors Variant 7: Auto-scroll Carousel" description="A continuous loop of sponsor logos using Autoplay." preview={<SponsorsVariant7 />} code={CODE_SPONSORS.v7} vueCode={CODE_SPONSORS_VUE.v7} swiftCode={CODE_SPONSORS_SWIFT.v7} />,
                <ComponentPreview key="8" title="Sponsors Variant 8: Sponsor Spotlight Carousel" description="Carousel cards highlighting partner details and descriptions." preview={<SponsorsVariant8 />} code={CODE_SPONSORS.v8} vueCode={CODE_SPONSORS_VUE.v8} swiftCode={CODE_SPONSORS_SWIFT.v8} />,
                <ComponentPreview key="9" title="Sponsors Variant 9: Center Focus Carousel" description="A carousel highlighting the centered sponsor card." preview={<SponsorsVariant9 />} code={CODE_SPONSORS.v9} vueCode={CODE_SPONSORS_VUE.v9} swiftCode={CODE_SPONSORS_SWIFT.v9} />,
            ];
            break;
        case "location":
            title = "Location & Map";
            description = "Guide attendees to your venue.";
            variants = [
                <ComponentPreview key="1" title="Location Variant 1: Split with Info" description="Map alongside contact details." preview={<LocationVariant1 />} code={CODE_LOCATION.v1} vueCode={CODE_LOCATION_VUE.v1} swiftCode={CODE_LOCATION_SWIFT.v1} />,
                <ComponentPreview key="2" title="Location Variant 2: Full Width Overlay" description="Floating card over a large map background." preview={<LocationVariant2 />} code={CODE_LOCATION.v2} vueCode={CODE_LOCATION_VUE.v2} swiftCode={CODE_LOCATION_SWIFT.v2} />,
                <ComponentPreview key="3" title="Location Variant 3: Text Focused" description="Detailed travel instructions." preview={<LocationVariant3 />} code={CODE_LOCATION.v3} vueCode={CODE_LOCATION_VUE.v3} swiftCode={CODE_LOCATION_SWIFT.v3} />,
            ];
            break;
        case "documents":
            title = "Documents & Resources";
            description = "Provide downloadable content.";
            variants = [
                <ComponentPreview key="1" title="Documents Variant 1: Grid Icons" description="Large clickable icons." preview={<DocumentsVariant1 />} code={CODE_DOCS.v1} vueCode={CODE_DOCS_VUE.v1} swiftCode={CODE_DOCS_SWIFT.v1} />,
                <ComponentPreview key="2" title="Documents Variant 2: Simple List" description="Compact file list." preview={<DocumentsVariant2 />} code={CODE_DOCS.v2} vueCode={CODE_DOCS_VUE.v2} swiftCode={CODE_DOCS_SWIFT.v2} />,
                <ComponentPreview key="3" title="Documents Variant 3: Card Previews" description="Cards with preview headers." preview={<DocumentsVariant3 />} code={CODE_DOCS.v3} vueCode={CODE_DOCS_VUE.v3} swiftCode={CODE_DOCS_SWIFT.v3} />,
            ];
            break;
        case "hotel":
            title = "Hotel & Accommodations";
            description = "Help attendees find a place to stay.";
            variants = [
                <ComponentPreview key="1" title="Hotel Variant 1: Feature Section" description="Showcase a partner hotel." preview={<HotelVariant1 />} code={CODE_HOTEL.v1} vueCode={CODE_HOTEL_VUE.v1} swiftCode={CODE_HOTEL_SWIFT.v1} />,
                <ComponentPreview key="2" title="Hotel Variant 2: Options Grid" description="Compare room types." preview={<HotelVariant2 />} code={CODE_HOTEL.v2} vueCode={CODE_HOTEL_VUE.v2} swiftCode={CODE_HOTEL_SWIFT.v2} />,
                <ComponentPreview key="3" title="Hotel Variant 3: Banner CTA" description="Simple call to action." preview={<HotelVariant3 />} code={CODE_HOTEL.v3} vueCode={CODE_HOTEL_VUE.v3} swiftCode={CODE_HOTEL_SWIFT.v3} />,
                <ComponentPreview key="4" title="Hotel Variant 4: Accordion List" description="Expandable list of recommended and nearby hotels." preview={<HotelVariant4 />} code={CODE_HOTEL.v4} vueCode={CODE_HOTEL_VUE.v4} swiftCode={CODE_HOTEL_SWIFT.v4} />,
            ];
            break;
        case "booth-map":
            title = "Booth Map";
            description = "Interactive or static floor plans.";
            variants = [
                <ComponentPreview key="1" title="Booth Map Variant 1: Interactive Visual" description="Map with clickable booths." preview={<BoothMapVariant1 />} code={CODE_BOOTH.v1} vueCode={CODE_BOOTH_MAP_VUE.v1} swiftCode={CODE_BOOTH_MAP_SWIFT.v1} />,
                <ComponentPreview key="2" title="Booth Map Variant 2: Directory List" description="Searchable list of exhibitors." preview={<BoothMapVariant2 />} code={CODE_BOOTH.v2} vueCode={CODE_BOOTH_MAP_VUE.v2} swiftCode={CODE_BOOTH_MAP_SWIFT.v2} />,
                <ComponentPreview key="3" title="Booth Map Variant 3: Floor Tabs" description="Tabs to switch between different floor levels." preview={<BoothMapVariant3 />} code={CODE_BOOTH.v3} vueCode={CODE_BOOTH_MAP_VUE.v3} swiftCode={CODE_BOOTH_MAP_SWIFT.v3} />,
            ];
            break;
        default:
            return <div>Select a category</div>;
    }

    return (
         <div className="max-w-7xl mx-auto px-6 pb-20">
            <div className="py-8">
                <h1 className="text-3xl font-extrabold tracking-tight mb-2">{title}</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mb-8">
                    {description}
                </p>
            </div>
            <div className="space-y-8">
                {variants}
            </div>
        </div>
    );
};
