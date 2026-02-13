"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Clock, MapPin, User, ChevronRight, Plus, Minus, ArrowUpRight, Circle, Check, CalendarPlus, X, Search, Filter } from "lucide-react";
import { cn } from "../ui/utils";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const SAMPLE_AGENDA = [
    { time: "09:00 AM", title: "Registration & Breakfast", location: "Main Hall", type: "General", speaker: "Staff",
      day: "Friday, March 14",
      description: "Start your day right with a warm welcome, badge pick-up, and a curated breakfast spread. Meet fellow attendees, grab your swag bag, and get oriented with the venue before sessions begin.",
      people: [
        { name: "Anna M", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
        { name: "Ben L", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
      ],
    },
    { time: "10:00 AM", title: "Opening Keynote", location: "Auditorium A", type: "Keynote", speaker: "Sarah Connor",
      day: "Friday, March 14",
      description: "Explore the future of web development in this inspiring keynote. Sarah Connor will share insights on emerging trends, the evolution of developer tooling, and what the next decade holds for the web platform. This is a can't-miss session to kick off the conference.",
      people: [
        { name: "Sarah C", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
        { name: "James R", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop" },
        { name: "Li Wei" },
        { name: "Priya S", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop" },
      ],
    },
    { time: "11:30 AM", title: "React Server Components", location: "Room 204", type: "Workshop", speaker: "Dan Abramov",
      day: "Friday, March 14",
      description: "A hands-on workshop where you'll build a production-ready application using React Server Components. Learn how to leverage server-side rendering for improved performance, reduce client-side JavaScript, and architect your components for the modern web.\n\nBring your laptop and be ready to code along.",
      people: [
        { name: "Dan A", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop" },
        { name: "Kent D", img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" },
        { name: "Tina H" },
      ],
    },
    { time: "01:00 PM", title: "Networking Lunch", location: "Dining Area", type: "Networking", speaker: "All",
      day: "Friday, March 14",
      description: "Take a break, refuel, and connect with fellow attendees and speakers over a catered lunch. Roundtable discussions and topic-specific tables will be available for those who want more structured networking.",
      people: [
        { name: "All", img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" },
      ],
    },
    { time: "02:30 PM", title: "Design Systems", location: "Auditorium B", type: "Panel", speaker: "Design Team",
      day: "Friday, March 14",
      description: "Join a panel of industry experts as they discuss the art and science of building scalable design systems. Topics include component architecture, token-based theming, cross-team collaboration, and maintaining consistency at scale.\n\nQ&A session included at the end.",
      people: [
        { name: "Emma K", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop" },
        { name: "Oscar T", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
        { name: "Lena R", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
        { name: "Ravi P" },
        { name: "Zoe M" },
      ],
    },
];

// Type for agenda items
type AgendaItem = (typeof SAMPLE_AGENDA)[number];

// Shared Session Detail Modal
const SessionDetailModal = ({ session, open, onOpenChange }: { session: AgendaItem | null; open: boolean; onOpenChange: (open: boolean) => void }) => {
  if (!session) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-[10px] font-mono uppercase">{session.type}</Badge>
          </div>
          <DialogTitle className="text-xl font-bold leading-tight">{session.title}</DialogTitle>
          <DialogDescription className="sr-only">Details for {session.title}</DialogDescription>
        </DialogHeader>

        {/* Time & Day */}
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 shrink-0 text-primary" />
            <span>{session.time} &middot; {session.day}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-primary" />
            <span>{session.location}</span>
          </div>
        </div>

        <Separator />

        {/* Description */}
        <div className="text-sm text-foreground leading-relaxed whitespace-pre-line">
          {session.description}
        </div>

        {/* Speaker List */}
        {session.people && session.people.length > 0 && (
          <>
            <Separator />
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Speakers</h4>
              <div className="flex flex-col gap-2.5">
                {session.people.map((person, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-muted shrink-0">
                      {person.img ? (
                        <ImageWithFallback src={person.img} alt={person.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="flex items-center justify-center w-full h-full text-xs font-semibold text-muted-foreground select-none">
                          {person.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-medium text-foreground">{person.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <Separator />

        {/* Action Button */}
        <Button className="w-full gap-2" size="lg">
          <CalendarPlus className="h-4 w-4" />
          Add to Schedule
        </Button>
      </DialogContent>
    </Dialog>
  );
};

// Reusable avatar cluster: shows up to 3 circular 22px avatars, then a "+N" overflow circle
const AvatarCluster = ({ people }: { people: { name: string; img?: string }[] }) => {
  const visible = people.slice(0, 3);
  const overflow = people.length - 3;

  return (
    <div className="shrink-0 flex items-center -space-x-1.5 justify-end" role="group" aria-label="Speakers and sponsors">
      {visible.map((p, i) => (
        <div
          key={i}
          className="w-[22px] h-[22px] rounded-full border-2 border-background overflow-hidden bg-muted"
          title={p.name}
        >
          {p.img ? (
            <ImageWithFallback src={p.img} alt={p.name} className="w-full h-full object-cover" />
          ) : (
            <span className="flex items-center justify-center w-full h-full text-[9px] font-semibold text-muted-foreground select-none">
              {p.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
            </span>
          )}
        </div>
      ))}
      {overflow > 0 && (
        <div
          className="w-[22px] h-[22px] rounded-full border-2 border-background bg-muted flex items-center justify-center"
          title={`${overflow} more`}
        >
          <span className="text-[8px] font-semibold text-muted-foreground leading-none select-none">
            +{overflow}
          </span>
        </div>
      )}
    </div>
  );
};

// Helper: get time category from time string
const getTimeCategoryFromString = (time: string): string => {
  const match = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return 'morning';
  let hour = parseInt(match[1], 10);
  const ampm = match[3].toUpperCase();
  if (ampm === 'PM' && hour !== 12) hour += 12;
  if (ampm === 'AM' && hour === 12) hour = 0;
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  return 'evening';
};

const SESSION_TYPES = ['Workshop', 'Keynote', 'Panel', 'Networking', 'General'] as const;
const TIME_RANGES = ['morning', 'afternoon', 'evening'] as const;
const TIME_RANGE_LABELS: Record<string, string> = { morning: 'Morning', afternoon: 'Afternoon', evening: 'Evening' };

// Variant 1: Compact Scannable List
export const AgendaVariant1 = () => {
  const [activeDay, setActiveDay] = useState(0);
  const [selectedSession, setSelectedSession] = useState<AgendaItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTypeFilters, setActiveTypeFilters] = useState<Set<string>>(new Set());
  const [activeTimeFilters, setActiveTimeFilters] = useState<Set<string>>(new Set());
  const [filtersOpen, setFiltersOpen] = useState(false);
  const days = ["Friday", "Saturday", "Sunday"];
  const daysMobile = ["Fri", "Sat", "Sun"];
  const dates = ["March 14", "March 15", "March 16"];

  const totalFilters = activeTypeFilters.size + activeTimeFilters.size;

  const toggleTypeFilter = (type: string) => {
    setActiveTypeFilters(prev => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type); else next.add(type);
      return next;
    });
  };

  const toggleTimeFilter = (time: string) => {
    setActiveTimeFilters(prev => {
      const next = new Set(prev);
      if (next.has(time)) next.delete(time); else next.add(time);
      return next;
    });
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setActiveTypeFilters(new Set());
    setActiveTimeFilters(new Set());
  };

  const filteredItems = SAMPLE_AGENDA.filter(item => {
    const matchesSearch = !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.speaker.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = activeTypeFilters.size === 0 || activeTypeFilters.has(item.type);
    const timeCat = getTimeCategoryFromString(item.time);
    const matchesTime = activeTimeFilters.size === 0 || activeTimeFilters.has(timeCat);
    return matchesSearch && matchesType && matchesTime;
  });

  return (
    <div className="w-full py-12 bg-background">
      <div className="mx-auto w-full" style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}>
          <h2 className="text-2xl font-bold mb-2 text-foreground">Event Schedule</h2>
          <p className="text-muted-foreground text-sm mb-6">Browse sessions by day.</p>

          {/* Search + Filters Bar */}
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <div className="relative flex-1 min-w-[200px] max-w-xs">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search sessions..."
                  className="w-full px-3 py-2 pr-9 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                />
                <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
              <Button variant="outline" size="sm" onClick={() => setFiltersOpen(!filtersOpen)} className="gap-1.5">
                <Filter className="h-3.5 w-3.5" />
                Filters
                {totalFilters > 0 && (
                  <Badge className="h-4 min-w-4 px-1 text-[10px] leading-none">{totalFilters}</Badge>
                )}
              </Button>
              {totalFilters > 0 && (
                <Button variant="ghost" size="sm" onClick={clearAllFilters} className="gap-1 text-muted-foreground text-xs">
                  <X className="h-3 w-3" />
                  Clear filters
                </Button>
              )}
          </div>

          {/* Filters Panel */}
          {filtersOpen && (
            <div className="mb-4 p-3.5 border border-border rounded-lg bg-muted/30">
              <div className="mb-3">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Session Type</span>
                <div className="flex flex-wrap gap-1.5">
                  {SESSION_TYPES.map(type => (
                    <button key={type} onClick={() => toggleTypeFilter(type)} className={cn("inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-medium transition-all", activeTypeFilters.has(type) ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground border-border hover:border-foreground/20")}>
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Time of Day</span>
                <div className="flex flex-wrap gap-1.5">
                  {TIME_RANGES.map(time => (
                    <button key={time} onClick={() => toggleTimeFilter(time)} className={cn("inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-medium transition-all", activeTimeFilters.has(time) ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground border-border hover:border-foreground/20")}>
                      {TIME_RANGE_LABELS[time]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Day Tabs */}
          <nav className="flex gap-2 mb-8 border-b-2 border-border" aria-label="Event days">
              {days.map((day, i) => (
                <button
                  key={day}
                  onClick={() => setActiveDay(i)}
                  aria-selected={activeDay === i}
                  className={cn(
                    "relative flex-1 text-center px-5 py-3.5 md:py-4 font-semibold transition-all duration-200 -mb-[2px]",
                    "text-base md:text-lg",
                    activeDay === i
                      ? "border-b-[3px] border-primary text-foreground bg-primary/5"
                      : "border-b-[3px] border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  )}
                >
                  <span className="hidden sm:inline">{day}</span>
                  <span className="sm:hidden">{daysMobile[i]}</span>
                  <span className={cn(
                    "block text-xs font-normal mt-0.5 transition-colors",
                    activeDay === i ? "text-muted-foreground" : "text-muted-foreground/60"
                  )}>{dates[i]}</span>
                </button>
              ))}
          </nav>

          {/* Session Rows */}
          <div>
              {filteredItems.length > 0 ? filteredItems.map((item, i) => (
                <div
                  key={i}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedSession(item)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedSession(item); } }}
                  className="group flex items-center gap-4 py-2.5 border-b border-border/40 last:border-0 hover:bg-muted/30 transition-colors cursor-pointer"
                >
                    {/* Time */}
                    <div className="shrink-0 w-[80px]">
                        <span className="text-xs font-mono font-medium text-muted-foreground">{item.time}</span>
                    </div>

                    {/* Title + Description */}
                    <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-foreground leading-tight truncate group-hover:text-primary transition-colors">{item.title}</h4>
                        <p className="text-xs text-muted-foreground leading-snug truncate mt-0.5">
                          A deep-dive session led by {item.speaker} at {item.location}.
                        </p>
                    </div>

                    {/* Avatar Cluster */}
                    <AvatarCluster people={item.people} />
                </div>
              )) : (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No sessions found for this day.
                </div>
              )}
          </div>
      </div>

      <SessionDetailModal session={selectedSession} open={!!selectedSession} onOpenChange={(open) => { if (!open) setSelectedSession(null); }} />
    </div>
  );
};

// Variant 2: Timeline View
export const AgendaVariant2 = () => {
  const [selectedSession, setSelectedSession] = useState<AgendaItem | null>(null);

  return (
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
                              <div
                                role="button"
                                tabIndex={0}
                                onClick={() => setSelectedSession(item)}
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedSession(item); } }}
                                className="bg-card p-6 rounded-lg border-none shadow-md space-y-3 cursor-pointer hover:shadow-lg hover:ring-1 hover:ring-primary/20 transition-all"
                              >
                                  <div className="flex items-center justify-between">
                                      <Badge variant="outline" className="w-fit">{item.type}</Badge>
                                      <AvatarCluster people={item.people} />
                                  </div>
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

      <SessionDetailModal session={selectedSession} open={!!selectedSession} onOpenChange={(open) => { if (!open) setSelectedSession(null); }} />
    </div>
  );
};

// Variant 3: Compact Tabbed View
export const AgendaVariant3 = () => {
  const [activeDay, setActiveDay] = useState(0);
  const [selectedSession, setSelectedSession] = useState<AgendaItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTypeFilters, setActiveTypeFilters] = useState<Set<string>>(new Set());
  const [activeTimeFilters, setActiveTimeFilters] = useState<Set<string>>(new Set());
  const [filtersOpen, setFiltersOpen] = useState(false);
  const days = ["Day 1", "Day 2", "Day 3"];
  const dayLabels = ["Friday", "Saturday", "Sunday"];

  const totalFilters = activeTypeFilters.size + activeTimeFilters.size;

  const toggleTypeFilter = (type: string) => {
    setActiveTypeFilters(prev => { const next = new Set(prev); if (next.has(type)) next.delete(type); else next.add(type); return next; });
  };
  const toggleTimeFilter = (time: string) => {
    setActiveTimeFilters(prev => { const next = new Set(prev); if (next.has(time)) next.delete(time); else next.add(time); return next; });
  };
  const clearAllFilters = () => { setSearchTerm(""); setActiveTypeFilters(new Set()); setActiveTimeFilters(new Set()); };

  const filteredItems = SAMPLE_AGENDA.filter(item => {
    const matchesSearch = !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.speaker.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = activeTypeFilters.size === 0 || activeTypeFilters.has(item.type);
    const timeCat = getTimeCategoryFromString(item.time);
    const matchesTime = activeTimeFilters.size === 0 || activeTimeFilters.has(timeCat);
    return matchesSearch && matchesType && matchesTime;
  });

  return (
    <div className="w-full py-12 bg-background">
      <div className="mx-auto w-full" style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
              <div>
                  <h2 className="text-2xl font-bold text-foreground">Sessions</h2>
                  <p className="text-sm text-muted-foreground">Explore the tracks and sessions.</p>
              </div>
              <nav className="flex gap-2" aria-label="Event days">
                  {days.map((day, i) => (
                    <Button
                      key={day}
                      variant={activeDay === i ? "default" : "outline"}
                      size="lg"
                      onClick={() => setActiveDay(i)}
                      aria-selected={activeDay === i}
                      className={cn(
                        "text-base font-semibold px-6 py-3 h-auto transition-all",
                        activeDay === i
                          ? "shadow-md ring-2 ring-primary/20"
                          : "hover:bg-muted/60"
                      )}
                    >
                      <span className="flex flex-col items-center leading-tight">
                        <span>{day}</span>
                        <span className={cn(
                          "text-xs font-normal",
                          activeDay === i ? "text-primary-foreground/70" : "text-muted-foreground"
                        )}>{dayLabels[i]}</span>
                      </span>
                    </Button>
                  ))}
              </nav>
          </div>

          {/* Search + Filters Bar */}
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <div className="relative flex-1 min-w-[200px] max-w-xs">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search sessions..."
                  className="w-full px-3 py-2 pr-9 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                />
                <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
              <Button variant="outline" size="sm" onClick={() => setFiltersOpen(!filtersOpen)} className="gap-1.5">
                <Filter className="h-3.5 w-3.5" />
                Filters
                {totalFilters > 0 && (
                  <Badge className="h-4 min-w-4 px-1 text-[10px] leading-none">{totalFilters}</Badge>
                )}
              </Button>
              {totalFilters > 0 && (
                <Button variant="ghost" size="sm" onClick={clearAllFilters} className="gap-1 text-muted-foreground text-xs">
                  <X className="h-3 w-3" />
                  Clear filters
                </Button>
              )}
          </div>

          {/* Filters Panel */}
          {filtersOpen && (
            <div className="mb-4 p-3.5 border border-border rounded-lg bg-muted/30">
              <div className="mb-3">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Session Type</span>
                <div className="flex flex-wrap gap-1.5">
                  {SESSION_TYPES.map(type => (
                    <button key={type} onClick={() => toggleTypeFilter(type)} className={cn("inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-medium transition-all", activeTypeFilters.has(type) ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground border-border hover:border-foreground/20")}>
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Time of Day</span>
                <div className="flex flex-wrap gap-1.5">
                  {TIME_RANGES.map(time => (
                    <button key={time} onClick={() => toggleTimeFilter(time)} className={cn("inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-medium transition-all", activeTimeFilters.has(time) ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground border-border hover:border-foreground/20")}>
                      {TIME_RANGE_LABELS[time]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div>
              {filteredItems.length > 0 ? filteredItems.map((item, i) => (
                <div
                  key={i}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedSession(item)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedSession(item); } }}
                  className="group flex items-center gap-4 py-2.5 border-b border-border/40 last:border-0 hover:bg-muted/30 transition-colors cursor-pointer"
                >
                    {/* Time */}
                    <div className="shrink-0 w-[80px]">
                        <span className="text-xs font-mono font-medium text-muted-foreground">{item.time}</span>
                    </div>

                    {/* Title + Description */}
                    <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-foreground leading-tight truncate group-hover:text-primary transition-colors">{item.title}</h4>
                        <p className="text-xs text-muted-foreground leading-snug truncate mt-0.5">
                          In-depth session about {item.title.toLowerCase()} with industry experts.
                        </p>
                    </div>

                    {/* Avatar Cluster */}
                    <AvatarCluster people={item.people} />

                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              )) : (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No sessions found for this day.
                </div>
              )}
          </div>
      </div>

      <SessionDetailModal session={selectedSession} open={!!selectedSession} onOpenChange={(open) => { if (!open) setSelectedSession(null); }} />
    </div>
  );
};

// Variant 4: Brutalist Split
export const AgendaVariant4 = () => {
    const [selectedSession, setSelectedSession] = useState<AgendaItem | null>(null);

    return (
        <div className="w-full py-16 bg-background">
            <div className="mx-auto w-full" style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}>
                 <div className="mb-12 border-b-4 border-foreground pb-4">
                    <h2 className="text-5xl font-black uppercase tracking-tighter">Day 01 / Schedule</h2>
                 </div>
                 
                 <div className="space-y-0">
                    {SAMPLE_AGENDA.map((item, i) => (
                        <div
                          key={i}
                          role="button"
                          tabIndex={0}
                          onClick={() => setSelectedSession(item)}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedSession(item); } }}
                          className="group grid grid-cols-1 lg:grid-cols-[200px_1fr] border-b border-border last:border-0 hover:bg-muted/30 transition-colors cursor-pointer"
                        >
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
                                    <AvatarCluster people={item.people} />
                                </div>
                            </div>
                        </div>
                    ))}
                 </div>
            </div>

            <SessionDetailModal session={selectedSession} open={!!selectedSession} onOpenChange={(open) => { if (!open) setSelectedSession(null); }} />
        </div>
    );
};

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
                                    <div className="flex items-center gap-3">
                                        <AvatarCluster people={item.people} />
                                        <div className="bg-foreground text-background rounded-full p-1">
                                            {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                                        </div>
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
export const AgendaVariant6 = () => {
    const [selectedSession, setSelectedSession] = useState<AgendaItem | null>(null);

    return (
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
                                <div
                                  key={i}
                                  role="button"
                                  tabIndex={0}
                                  onClick={() => setSelectedSession(item)}
                                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedSession(item); } }}
                                  className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 cursor-pointer group"
                                >
                                    {/* Node */}
                                    <div className="absolute left-4 lg:left-1/2 top-0 -translate-x-1/2 w-4 h-4 bg-zinc-950 border border-zinc-500 rounded-full z-10 group-hover:border-green-500 transition-colors">
                                        <div className="absolute inset-0.5 bg-zinc-500 rounded-full opacity-50 group-hover:bg-green-500 transition-colors" />
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
                                            <h3 className="text-lg font-bold text-zinc-100 group-hover:text-green-400 transition-colors">{item.title}</h3>
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
                                                <div className="border border-zinc-800 bg-zinc-900/50 p-3 rounded text-xs text-zinc-400 max-w-xs group-hover:border-zinc-700 transition-colors">
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

            <SessionDetailModal session={selectedSession} open={!!selectedSession} onOpenChange={(open) => { if (!open) setSelectedSession(null); }} />
        </div>
    );
};

// Variant 7: Modular Bento Grid
export const AgendaVariant7 = () => {
    const [selectedSession, setSelectedSession] = useState<AgendaItem | null>(null);

    return (
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
                                role="button"
                                tabIndex={0}
                                onClick={() => setSelectedSession(item)}
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedSession(item); } }}
                                className={cn(
                                    "border-none shadow-sm hover:shadow-md transition-all group overflow-hidden relative flex flex-col justify-between cursor-pointer",
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
                                            <AvatarCluster people={item.people} />
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

            <SessionDetailModal session={selectedSession} open={!!selectedSession} onOpenChange={(open) => { if (!open) setSelectedSession(null); }} />
        </div>
    );
};

// Variant 8: Typographic Ledger
export const AgendaVariant8 = () => {
    const [selectedSession, setSelectedSession] = useState<AgendaItem | null>(null);

    return (
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
                        <div
                          key={i}
                          role="button"
                          tabIndex={0}
                          onClick={() => setSelectedSession(item)}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedSession(item); } }}
                          className="group relative cursor-pointer"
                        >
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
                                    <span className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center">
                                        View Details <ArrowUpRight className="ml-1 h-3 w-3" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-20 border-t-2 border-foreground" />
            </div>

            <SessionDetailModal session={selectedSession} open={!!selectedSession} onOpenChange={(open) => { if (!open) setSelectedSession(null); }} />
        </div>
    );
};
