"use client";

import React, { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Clock, MapPin, User, ChevronRight, Plus, Minus, ArrowUpRight, Circle, Check, CalendarPlus, X, Search, Filter, LayoutList, LayoutGrid } from "lucide-react";
import { cn } from "../ui/utils";
import { ImageWithFallback } from "../figma/ImageWithFallback";

// ---------------------------------------------------------------------------
// Large-scale multi-day sample data (3 days, 8-12 sessions each)
// ---------------------------------------------------------------------------
interface AgendaSession {
  time: string;       // e.g. "09:00 AM"
  endTime?: string;   // e.g. "10:00 AM"
  title: string;
  location: string;
  type: string;
  speaker: string;
  day: string;        // e.g. "Friday, March 14"
  dayIndex: number;
  description: string;
  people: { name: string; img?: string }[];
}

const MULTI_DAY_AGENDA: AgendaSession[] = [
  // ---- Day 0: Friday, March 14 ----
  { time: "08:00 AM", endTime: "09:00 AM", title: "Registration & Breakfast", location: "Main Hall", type: "General", speaker: "Staff", day: "Friday, March 14", dayIndex: 0,
    description: "Start your day right with a warm welcome, badge pick-up, and a curated breakfast spread.",
    people: [{ name: "Anna M", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" }, { name: "Ben L", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" }] },
  { time: "09:00 AM", endTime: "10:00 AM", title: "Opening Keynote: Future of the Web", location: "Auditorium A", type: "Keynote", speaker: "Sarah Connor", day: "Friday, March 14", dayIndex: 0,
    description: "Explore the future of web development in this inspiring keynote.",
    people: [{ name: "Sarah C", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" }, { name: "James R", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop" }, { name: "Li Wei" }, { name: "Priya S", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop" }] },
  { time: "10:00 AM", endTime: "11:00 AM", title: "React Server Components Workshop", location: "Room 204", type: "Workshop", speaker: "Dan Abramov", day: "Friday, March 14", dayIndex: 0,
    description: "A hands-on workshop building production-ready RSC applications.",
    people: [{ name: "Dan A", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop" }, { name: "Kent D", img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" }, { name: "Tina H" }] },
  { time: "10:00 AM", endTime: "11:00 AM", title: "Design Tokens at Scale", location: "Room 305", type: "Talk", speaker: "Emma K", day: "Friday, March 14", dayIndex: 0,
    description: "Learn how to implement and maintain design tokens across large organizations.",
    people: [{ name: "Emma K", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop" }] },
  { time: "11:00 AM", endTime: "12:00 PM", title: "TypeScript Advanced Patterns", location: "Room 204", type: "Workshop", speaker: "Matt Pocock", day: "Friday, March 14", dayIndex: 0,
    description: "Deep-dive into advanced TypeScript patterns for library authors.",
    people: [{ name: "Matt P", img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" }, { name: "Zoe M" }] },
  { time: "11:00 AM", endTime: "12:00 PM", title: "Accessibility Masterclass", location: "Auditorium B", type: "Panel", speaker: "Design Team", day: "Friday, March 14", dayIndex: 0,
    description: "Panel discussion on making the web accessible for everyone.",
    people: [{ name: "Oscar T", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" }, { name: "Lena R", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" }, { name: "Ravi P" }] },
  { time: "12:00 PM", endTime: "01:00 PM", title: "Networking Lunch", location: "Dining Area", type: "Networking", speaker: "All", day: "Friday, March 14", dayIndex: 0,
    description: "Take a break, refuel, and connect with fellow attendees.",
    people: [{ name: "All" }] },
  { time: "01:00 PM", endTime: "02:00 PM", title: "AI in Production", location: "Auditorium A", type: "Keynote", speaker: "Andrej K", day: "Friday, March 14", dayIndex: 0,
    description: "How leading companies are deploying AI systems into production at scale.",
    people: [{ name: "Andrej K", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop" }, { name: "Nina V" }] },
  { time: "02:00 PM", endTime: "03:00 PM", title: "Design Systems Panel", location: "Auditorium B", type: "Panel", speaker: "Design Team", day: "Friday, March 14", dayIndex: 0,
    description: "Building scalable design systems across organizations.",
    people: [{ name: "Emma K", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop" }, { name: "Oscar T", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" }, { name: "Lena R" }, { name: "Ravi P" }, { name: "Zoe M" }] },
  { time: "03:00 PM", endTime: "04:00 PM", title: "Performance Deep-Dive", location: "Room 204", type: "Workshop", speaker: "Addy Osmani", day: "Friday, March 14", dayIndex: 0,
    description: "Practical performance optimization techniques for modern web apps.",
    people: [{ name: "Addy O", img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" }] },
  { time: "04:00 PM", endTime: "05:00 PM", title: "Lightning Talks", location: "Main Hall", type: "Talk", speaker: "Various", day: "Friday, March 14", dayIndex: 0,
    description: "Quick-fire 5-minute talks on cutting-edge topics.",
    people: [{ name: "Quinn F" }, { name: "Zara A" }, { name: "Uma M" }] },
  { time: "05:00 PM", endTime: "06:00 PM", title: "Closing Remarks & Happy Hour", location: "Main Hall", type: "General", speaker: "Staff", day: "Friday, March 14", dayIndex: 0,
    description: "Wrap up day one with drinks and conversation.",
    people: [{ name: "Anna M", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" }] },

  // ---- Day 1: Saturday, March 15 ----
  { time: "08:00 AM", endTime: "09:00 AM", title: "Morning Yoga & Coffee", location: "Garden Terrace", type: "Networking", speaker: "Wellness Team", day: "Saturday, March 15", dayIndex: 1,
    description: "Start the morning with guided yoga and artisan coffee.",
    people: [{ name: "Mia T" }] },
  { time: "09:00 AM", endTime: "10:00 AM", title: "State of Web Standards", location: "Auditorium A", type: "Keynote", speaker: "Jake Archibald", day: "Saturday, March 15", dayIndex: 1,
    description: "An overview of the latest web platform features shipping in 2025.",
    people: [{ name: "Jake A", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop" }, { name: "Surma" }] },
  { time: "10:00 AM", endTime: "11:00 AM", title: "Advanced CSS Architecture", location: "Room 204", type: "Workshop", speaker: "Una Kravets", day: "Saturday, March 15", dayIndex: 1,
    description: "Modern CSS techniques: container queries, cascade layers, and more.",
    people: [{ name: "Una K", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop" }, { name: "Adam A" }] },
  { time: "10:00 AM", endTime: "11:00 AM", title: "GraphQL vs REST: The Verdict", location: "Room 305", type: "Panel", speaker: "API Team", day: "Saturday, March 15", dayIndex: 1,
    description: "A balanced discussion comparing API paradigms for modern apps.",
    people: [{ name: "Lee B" }, { name: "Eve P", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" }] },
  { time: "11:00 AM", endTime: "12:00 PM", title: "Building with Edge Functions", location: "Auditorium B", type: "Talk", speaker: "Guillermo Rauch", day: "Saturday, March 15", dayIndex: 1,
    description: "Deploy globally, run at the edge: serverless patterns for the next era.",
    people: [{ name: "Guillermo R", img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" }] },
  { time: "12:00 PM", endTime: "01:00 PM", title: "Networking Lunch", location: "Dining Area", type: "Networking", speaker: "All", day: "Saturday, March 15", dayIndex: 1,
    description: "Roundtable discussions and topic-specific tables.",
    people: [{ name: "All" }] },
  { time: "01:00 PM", endTime: "02:00 PM", title: "DevOps & CI/CD", location: "Room 204", type: "Workshop", speaker: "Kelsey Hightower", day: "Saturday, March 15", dayIndex: 1,
    description: "Hands-on CI/CD pipeline construction with modern tooling.",
    people: [{ name: "Kelsey H", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" }] },
  { time: "02:00 PM", endTime: "03:00 PM", title: "Open Source Roundtable", location: "Auditorium B", type: "Panel", speaker: "OSS Maintainers", day: "Saturday, March 15", dayIndex: 1,
    description: "Sustainability, governance, and community in open source.",
    people: [{ name: "Sindre S" }, { name: "Evan Y" }, { name: "Rich H" }] },
  { time: "03:00 PM", endTime: "04:00 PM", title: "Fireside Chat: Future of AI", location: "Auditorium A", type: "Fireside Chat", speaker: "Satya Nadella", day: "Saturday, March 15", dayIndex: 1,
    description: "An intimate conversation about AI's role in shaping the developer experience.",
    people: [{ name: "Satya N" }, { name: "Sam A" }] },
  { time: "04:00 PM", endTime: "06:00 PM", title: "Evening Social & Networking", location: "Rooftop Lounge", type: "Networking", speaker: "All", day: "Saturday, March 15", dayIndex: 1,
    description: "Casual networking with drinks and a city view.",
    people: [{ name: "All" }] },

  // ---- Day 2: Sunday, March 16 ----
  { time: "08:00 AM", endTime: "09:00 AM", title: "Breakfast & Networking", location: "Main Hall", type: "Networking", speaker: "Staff", day: "Sunday, March 16", dayIndex: 2,
    description: "Casual breakfast and morning networking.",
    people: [{ name: "Staff" }] },
  { time: "09:00 AM", endTime: "10:00 AM", title: "Edge Computing Keynote", location: "Auditorium A", type: "Keynote", speaker: "Werner Vogels", day: "Sunday, March 16", dayIndex: 2,
    description: "The future of distributed computing at the edge.",
    people: [{ name: "Werner V", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop" }] },
  { time: "10:00 AM", endTime: "11:00 AM", title: "Building Design Tokens", location: "Room 204", type: "Workshop", speaker: "Jina Anne", day: "Sunday, March 16", dayIndex: 2,
    description: "Practical workshop on building and maintaining design token systems.",
    people: [{ name: "Jina A", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop" }, { name: "Kaelig D" }] },
  { time: "10:00 AM", endTime: "11:00 AM", title: "API Design Best Practices", location: "Room 305", type: "Talk", speaker: "Phil Sturgeon", day: "Sunday, March 16", dayIndex: 2,
    description: "Designing APIs that developers love to use.",
    people: [{ name: "Phil S", img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" }] },
  { time: "11:00 AM", endTime: "12:00 PM", title: "Mobile-First Strategies", location: "Auditorium B", type: "Talk", speaker: "Jen Simmons", day: "Sunday, March 16", dayIndex: 2,
    description: "Modern approaches to responsive design and mobile performance.",
    people: [{ name: "Jen S" }, { name: "Rachel A", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" }] },
  { time: "11:00 AM", endTime: "12:00 PM", title: "Security in Modern Apps", location: "Room 204", type: "Workshop", speaker: "Troy Hunt", day: "Sunday, March 16", dayIndex: 2,
    description: "Common vulnerabilities and how to protect your applications.",
    people: [{ name: "Troy H", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" }] },
  { time: "12:00 PM", endTime: "01:00 PM", title: "Networking Lunch", location: "Dining Area", type: "Networking", speaker: "All", day: "Sunday, March 16", dayIndex: 2,
    description: "Final networking lunch of the conference.",
    people: [{ name: "All" }] },
  { time: "01:00 PM", endTime: "02:00 PM", title: "Hackathon Showcase", location: "Main Hall", type: "General", speaker: "Hackathon Teams", day: "Sunday, March 16", dayIndex: 2,
    description: "Teams present their hackathon projects to a panel of judges.",
    people: [{ name: "Team Alpha" }, { name: "Team Beta" }, { name: "Team Gamma" }] },
  { time: "02:00 PM", endTime: "03:00 PM", title: "Community Lightning Talks", location: "Auditorium A", type: "Talk", speaker: "Community", day: "Sunday, March 16", dayIndex: 2,
    description: "Five-minute talks from community members on topics they love.",
    people: [{ name: "Quinn F" }, { name: "Uma M" }, { name: "Grace O" }] },
  { time: "03:00 PM", endTime: "04:00 PM", title: "Closing Ceremony & Awards", location: "Auditorium A", type: "Keynote", speaker: "Organizers", day: "Sunday, March 16", dayIndex: 2,
    description: "Closing keynote, awards, and a look ahead to next year.",
    people: [{ name: "Anna M", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" }, { name: "Ben L", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" }] },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
type AgendaItem = AgendaSession;

// Parse hour (24h) from time string like "09:00 AM"
const parseHour24 = (time: string): number => {
  const match = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return 0;
  let hour = parseInt(match[1], 10);
  const ampm = match[3].toUpperCase();
  if (ampm === 'PM' && hour !== 12) hour += 12;
  if (ampm === 'AM' && hour === 12) hour = 0;
  return hour;
};

// Format hour bucket label, e.g. 9 => "9-10 AM", 13 => "1-2 PM"
const formatHourBucket = (hour24: number): string => {
  const nextHour = hour24 + 1;
  const fmt = (h: number) => {
    const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
    const suffix = h < 12 ? 'AM' : 'PM';
    return `${h12} ${suffix}`;
  };
  // Simplified: just show start hour with period
  const h12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
  const suffix = hour24 < 12 ? 'AM' : 'PM';
  const nh12 = nextHour === 0 ? 12 : nextHour > 12 ? nextHour - 12 : nextHour;
  const nsuffix = nextHour < 12 ? 'AM' : 'PM';
  if (suffix === nsuffix) return `${h12}\u2013${nh12} ${suffix}`;
  return `${h12} ${suffix}\u2013${nh12} ${nsuffix}`;
};

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

        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 shrink-0 text-primary" />
            <span>{session.time}{session.endTime ? ` \u2013 ${session.endTime}` : ''} &middot; {session.day}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-primary" />
            <span>{session.location}</span>
          </div>
        </div>

        <Separator />

        <div className="text-sm text-foreground leading-relaxed whitespace-pre-line">
          {session.description}
        </div>

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

        <Button className="w-full gap-2" size="lg">
          <CalendarPlus className="h-4 w-4" />
          Add to Schedule
        </Button>
      </DialogContent>
    </Dialog>
  );
};

// Reusable avatar cluster
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

// ---------------------------------------------------------------------------
// Day config
// ---------------------------------------------------------------------------
const DAY_CONFIG = [
  { label: "Friday", short: "Fri", date: "March 14" },
  { label: "Saturday", short: "Sat", date: "March 15" },
  { label: "Sunday", short: "Sun", date: "March 16" },
];

// ---------------------------------------------------------------------------
// Shared hook for agenda state
// ---------------------------------------------------------------------------
const useAgendaFilters = () => {
  const [activeDay, setActiveDay] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTimeChip, setActiveTimeChip] = useState<number | null>(null); // null = "All"

  // Sessions for the selected day
  const daySessions = useMemo(
    () => MULTI_DAY_AGENDA.filter(s => s.dayIndex === activeDay),
    [activeDay]
  );

  // Dynamic time chips from the selected day's sessions
  const timeChips = useMemo(() => {
    const hours = new Set<number>();
    daySessions.forEach(s => hours.add(parseHour24(s.time)));
    return Array.from(hours).sort((a, b) => a - b);
  }, [daySessions]);

  // Filtered sessions (day + time chip + search)
  const filteredSessions = useMemo(() => {
    return daySessions.filter(session => {
      // Time chip filter
      if (activeTimeChip !== null) {
        const sessionHour = parseHour24(session.time);
        if (sessionHour !== activeTimeChip) return false;
      }
      // Search filter
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        const matchesTitle = session.title.toLowerCase().includes(q);
        const matchesSpeaker = session.speaker.toLowerCase().includes(q);
        const matchesType = session.type.toLowerCase().includes(q);
        const matchesLocation = session.location.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSpeaker && !matchesType && !matchesLocation) return false;
      }
      return true;
    });
  }, [daySessions, activeTimeChip, searchTerm]);

  // Reset time chip when switching days
  const selectDay = (dayIndex: number) => {
    setActiveDay(dayIndex);
    setActiveTimeChip(null);
  };

  return {
    activeDay, selectDay,
    searchTerm, setSearchTerm,
    activeTimeChip, setActiveTimeChip,
    daySessions, timeChips, filteredSessions,
  };
};

// ---------------------------------------------------------------------------
// Shared Sticky Header (Day tabs + Time chips + Search)
// ---------------------------------------------------------------------------
const AgendaStickyHeader = ({
  activeDay, selectDay,
  searchTerm, setSearchTerm,
  activeTimeChip, setActiveTimeChip,
  timeChips,
}: {
  activeDay: number;
  selectDay: (i: number) => void;
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  activeTimeChip: number | null;
  setActiveTimeChip: (v: number | null) => void;
  timeChips: number[];
}) => (
  <div className="sticky top-0 z-10 bg-background pb-3 border-b border-border">
    {/* Primary: Day selector tabs */}
    <nav className="flex gap-1 mb-3" aria-label="Event days">
      {DAY_CONFIG.map((day, i) => (
        <button
          key={day.label}
          onClick={() => selectDay(i)}
          aria-selected={activeDay === i}
          className={cn(
            "relative flex-1 text-center px-4 py-3 md:py-4 font-semibold transition-all duration-200 rounded-lg",
            "text-base md:text-lg",
            activeDay === i
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <span className="hidden sm:inline">{day.label}</span>
          <span className="sm:hidden">{day.short}</span>
          <span className={cn(
            "block text-xs font-normal mt-0.5 transition-colors",
            activeDay === i ? "text-primary-foreground/70" : "text-muted-foreground/60"
          )}>{day.date}</span>
        </button>
      ))}
    </nav>

    {/* Secondary: Time chips + Search row */}
    <div className="flex flex-col gap-2">
      {/* Time chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveTimeChip(null)}
          className={cn(
            "shrink-0 inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-all border",
            activeTimeChip === null
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background text-muted-foreground border-border hover:border-foreground/20 hover:text-foreground"
          )}
        >
          All
        </button>
        {timeChips.map(hour => (
          <button
            key={hour}
            onClick={() => setActiveTimeChip(activeTimeChip === hour ? null : hour)}
            className={cn(
              "shrink-0 inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-all border whitespace-nowrap",
              activeTimeChip === hour
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-muted-foreground border-border hover:border-foreground/20 hover:text-foreground"
            )}
          >
            {formatHourBucket(hour)}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search sessions..."
          className="w-full px-3 py-1.5 pr-9 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
        />
        <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      </div>
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Variant 1: Compact Scannable List (Redesigned)
// ---------------------------------------------------------------------------
export const AgendaVariant1 = () => {
  const filters = useAgendaFilters();
  const [selectedSession, setSelectedSession] = useState<AgendaItem | null>(null);

  return (
    <div className="w-full py-12 bg-background">
      <div className="mx-auto w-full" style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}>
        <h2 className="text-2xl font-bold mb-2 text-foreground">Event Schedule</h2>
        <p className="text-muted-foreground text-sm mb-4">Browse sessions by day and time.</p>

        <AgendaStickyHeader {...filters} />

        {/* Scrollable session list */}
        <div className="max-h-[60vh] overflow-y-auto mt-1">
          {filters.filteredSessions.length > 0 ? (
            filters.filteredSessions.map((item, i) => (
              <div
                key={`${item.dayIndex}-${item.time}-${i}`}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedSession(item)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedSession(item); } }}
                className="group flex items-center gap-4 py-2.5 border-b border-border/40 last:border-0 hover:bg-muted/30 transition-colors cursor-pointer"
              >
                {/* Time */}
                <div className="shrink-0 w-[100px]">
                  <span className="text-xs font-mono font-medium text-foreground">{item.time}</span>
                  {item.endTime && (
                    <span className="block text-[11px] font-mono text-muted-foreground">{item.endTime}</span>
                  )}
                </div>

                {/* Title + Description */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-sm text-foreground leading-tight truncate group-hover:text-primary transition-colors">{item.title}</h4>
                    <Badge variant="outline" className="shrink-0 text-[10px] px-1.5 py-0 h-4 hidden sm:inline-flex">{item.type}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-snug truncate mt-0.5">
                    {item.speaker} &middot; {item.location}
                  </p>
                </div>

                {/* Avatar Cluster */}
                <AvatarCluster people={item.people} />
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground text-sm">
              No sessions found matching your filters.
            </div>
          )}
        </div>
      </div>

      <SessionDetailModal session={selectedSession} open={!!selectedSession} onOpenChange={(open) => { if (!open) setSelectedSession(null); }} />
    </div>
  );
};

// Variant 2: Timeline View (unchanged structurally, kept for compat)
export const AgendaVariant2 = () => {
  const [selectedSession, setSelectedSession] = useState<AgendaItem | null>(null);
  const daySessions = MULTI_DAY_AGENDA.filter(s => s.dayIndex === 0).slice(0, 5);

  return (
    <div className="w-full py-16 bg-muted/30">
      <div className="mx-auto w-full" style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}>
           <div className="text-center mb-12">
              <Badge className="mb-2">Day 1</Badge>
              <h2 className="text-4xl font-bold text-foreground">Timeline</h2>
          </div>
          <div className="relative border-l-2 border-primary/20 ml-4 lg:ml-0 space-y-12">
              {daySessions.map((item, i) => (
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

// ---------------------------------------------------------------------------
// Variant 3: Grid View (Redesigned with same navigation)
// ---------------------------------------------------------------------------
export const AgendaVariant3 = () => {
  const filters = useAgendaFilters();
  const [selectedSession, setSelectedSession] = useState<AgendaItem | null>(null);

  return (
    <div className="w-full py-12 bg-background">
      <div className="mx-auto w-full" style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Sessions</h2>
            <p className="text-sm text-muted-foreground">Explore the tracks and sessions.</p>
          </div>
        </div>

        <AgendaStickyHeader {...filters} />

        {/* Scrollable grid */}
        <div className="max-h-[65vh] overflow-y-auto mt-3">
          {filters.filteredSessions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filters.filteredSessions.map((item, i) => (
                <Card
                  key={`${item.dayIndex}-${item.time}-${i}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedSession(item)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedSession(item); } }}
                  className="group border hover:border-primary/50 hover:shadow-md transition-all cursor-pointer"
                >
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <Badge variant="secondary" className="text-[11px] font-mono">{item.time}{item.endTime ? ` \u2013 ${item.endTime}` : ''}</Badge>
                      <Badge variant="outline" className="text-[10px]">{item.type}</Badge>
                    </div>
                    <h3 className="font-bold text-base mb-1.5 group-hover:text-primary transition-colors leading-tight">{item.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{item.description}</p>
                    <Separator className="mb-3" />
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <User className="h-3 w-3" />
                        <span className="truncate max-w-[100px]">{item.speaker}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate max-w-[100px]">{item.location}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground text-sm">
              No sessions found matching your filters.
            </div>
          )}
        </div>
      </div>

      <SessionDetailModal session={selectedSession} open={!!selectedSession} onOpenChange={(open) => { if (!open) setSelectedSession(null); }} />
    </div>
  );
};

// ---------------------------------------------------------------------------
// Variant 4: Brutalist Split (kept for compat)
// ---------------------------------------------------------------------------
export const AgendaVariant4 = () => {
    const [selectedSession, setSelectedSession] = useState<AgendaItem | null>(null);
    const daySessions = MULTI_DAY_AGENDA.filter(s => s.dayIndex === 0).slice(0, 5);

    return (
        <div className="w-full py-16 bg-background">
            <div className="mx-auto w-full" style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}>
                 <div className="mb-12 border-b-4 border-foreground pb-4">
                    <h2 className="text-5xl font-black uppercase tracking-tighter">Day 01 / Schedule</h2>
                 </div>
                 
                 <div className="space-y-0">
                    {daySessions.map((item, i) => (
                        <div
                          key={i}
                          role="button"
                          tabIndex={0}
                          onClick={() => setSelectedSession(item)}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedSession(item); } }}
                          className="group grid grid-cols-1 lg:grid-cols-[200px_1fr] border-b border-border last:border-0 hover:bg-muted/30 transition-colors cursor-pointer"
                        >
                            <div className="p-6 border-b lg:border-b-0 lg:border-r border-border flex items-center">
                                <span className="font-serif text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                                    {item.time.split(' ')[0]}
                                </span>
                                <span className="ml-2 text-sm font-sans text-muted-foreground lg:hidden">{item.time.split(' ')[1]}</span>
                            </div>
                            <div className="p-6 flex flex-col justify-center space-y-4">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <h3 className="text-2xl font-bold tracking-tight">{item.title}</h3>
                                    <Badge variant="outline" className="w-fit rounded-none border-2 font-mono uppercase text-xs">{item.type}</Badge>
                                </div>
                                <Separator className="bg-border" />
                                <div className="flex items-center gap-4 text-sm text-muted-foreground font-mono">
                                    <span>{item.location}</span>
                                    <span>{'&bull;'}</span>
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

// ---------------------------------------------------------------------------
// Variant 5: Interactive Accordion Stack (kept for compat)
// ---------------------------------------------------------------------------
export const AgendaVariant5 = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(1);
    const daySessions = MULTI_DAY_AGENDA.filter(s => s.dayIndex === 0).slice(0, 5);

    return (
        <div className="w-full py-12 bg-background">
            <div className="mx-auto w-full" style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}>
                <h2 className="text-3xl font-bold mb-8 text-foreground font-sans">Sessions</h2>
                <div className="flex flex-col border-t-2 border-foreground">
                    {daySessions.map((item, i) => {
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
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2">
                                                    <Badge variant="secondary" className="font-sans">{item.type}</Badge>
                                                    <span className="text-sm font-medium font-sans">{item.speaker}</span>
                                                </div>
                                                <p className="text-muted-foreground leading-relaxed font-sans">
                                                    {item.description}
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

// ---------------------------------------------------------------------------
// Variant 6: Timeline Wireframe (kept for compat)
// ---------------------------------------------------------------------------
export const AgendaVariant6 = () => {
    const [selectedSession, setSelectedSession] = useState<AgendaItem | null>(null);
    const daySessions = MULTI_DAY_AGENDA.filter(s => s.dayIndex === 0).slice(0, 5);

    return (
        <div className="w-full py-16 bg-zinc-950 text-zinc-50 font-mono">
            <div className="mx-auto w-full" style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}>
                <div className="mb-12 border-b border-dashed border-zinc-800 pb-4 flex justify-between items-end">
                    <h2 className="text-2xl tracking-tighter text-zinc-100">{'<System_Log />'}</h2>
                    <span className="text-xs text-zinc-500">v.2.0.25</span>
                </div>

                <div className="relative">
                    <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px border-l border-dashed border-zinc-800" />

                    <div className="space-y-12">
                        {daySessions.map((item, i) => {
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
                                    <div className="absolute left-4 lg:left-1/2 top-0 -translate-x-1/2 w-4 h-4 bg-zinc-950 border border-zinc-500 rounded-full z-10 group-hover:border-green-500 transition-colors">
                                        <div className="absolute inset-0.5 bg-zinc-500 rounded-full opacity-50 group-hover:bg-green-500 transition-colors" />
                                    </div>

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
                                                    <span className="text-green-500">$</span>{` init session --speaker="${item.speaker}"`}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
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

// ---------------------------------------------------------------------------
// Variant 7: Modular Bento Grid (kept for compat)
// ---------------------------------------------------------------------------
export const AgendaVariant7 = () => {
    const [selectedSession, setSelectedSession] = useState<AgendaItem | null>(null);
    const daySessions = MULTI_DAY_AGENDA.filter(s => s.dayIndex === 0).slice(0, 5);

    return (
        <div className="w-full py-16 bg-muted/10">
            <div className="mx-auto w-full" style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}>
                <h2 className="text-3xl font-bold mb-8 text-foreground">Schedule Overview</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)]">
                    {daySessions.map((item, i) => {
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
                                                {item.description}
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

// ---------------------------------------------------------------------------
// Variant 8: Typographic Ledger (kept for compat)
// ---------------------------------------------------------------------------
export const AgendaVariant8 = () => {
    const [selectedSession, setSelectedSession] = useState<AgendaItem | null>(null);
    const daySessions = MULTI_DAY_AGENDA.filter(s => s.dayIndex === 0).slice(0, 5);

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
                    {daySessions.map((item, i) => (
                        <div
                          key={i}
                          role="button"
                          tabIndex={0}
                          onClick={() => setSelectedSession(item)}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedSession(item); } }}
                          className="group relative cursor-pointer"
                        >
                            <div className="flex flex-wrap justify-between items-start text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4 border-t border-transparent group-hover:border-foreground/20 pt-4 transition-all">
                                <span>{item.type}</span>
                                <div className="flex items-center gap-8">
                                    <span>{item.time}</span>
                                    <span>{item.location}</span>
                                </div>
                            </div>
                            
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
