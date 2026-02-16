"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { cn } from "../ui/utils";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  Search,
  Clock,
  MapPin,
  CalendarDays,
  X,
  User,
  ChevronRight,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface Speaker {
  id: string;
  name: string;
  role?: string;
  company?: string;
  img?: string;
}

export interface SpeakerSession {
  title: string;
  day: string;
  dayIndex: number;
  time: string;
  endTime?: string;
  location: string;
  type: string;
  description?: string;
}

// ---------------------------------------------------------------------------
// Alphabet chip groups
// ---------------------------------------------------------------------------
const ALPHABET_GROUPS = [
  { label: "A\u2013G", letters: "ABCDEFG" },
  { label: "H\u2013M", letters: "HIJKLM" },
  { label: "N\u2013S", letters: "NOPQRS" },
  { label: "T\u2013Z", letters: "TUVWXYZ" },
];

// ---------------------------------------------------------------------------
// Speaker Profile Modal
// ---------------------------------------------------------------------------
interface SpeakerProfileModalProps {
  speaker: Speaker | null;
  sessions: SpeakerSession[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SpeakerProfileModal: React.FC<SpeakerProfileModalProps> = ({
  speaker,
  sessions,
  open,
  onOpenChange,
}) => {
  if (!speaker) return null;

  // Group sessions by day
  const sessionsByDay = useMemo(() => {
    const grouped: Record<string, SpeakerSession[]> = {};
    sessions.forEach((s) => {
      if (!grouped[s.day]) grouped[s.day] = [];
      grouped[s.day].push(s);
    });
    // Sort each day's sessions by time
    Object.values(grouped).forEach((arr) =>
      arr.sort((a, b) => a.time.localeCompare(b.time))
    );
    return grouped;
  }, [sessions]);

  const dayKeys = Object.keys(sessionsByDay);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] p-0 gap-0 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <DialogHeader className="flex-row items-start gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-muted shrink-0 border-2 border-border">
              {speaker.img ? (
                <ImageWithFallback
                  src={speaker.img}
                  alt={speaker.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="flex items-center justify-center w-full h-full text-lg font-bold text-muted-foreground select-none">
                  {speaker.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-xl font-bold leading-tight text-foreground">
                {speaker.name}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-0.5">
                {[speaker.role, speaker.company].filter(Boolean).join(" @ ")}
              </DialogDescription>
              <Badge variant="secondary" className="mt-2 text-xs">
                {sessions.length} session{sessions.length !== 1 ? "s" : ""} assigned
              </Badge>
            </div>
          </DialogHeader>
        </div>

        <Separator />

        {/* Sessions list -- scrollable */}
        <ScrollArea className="flex-1 min-h-0">
          <div className="px-6 py-4">
            {sessions.length === 0 ? (
              <div className="text-center py-12">
                <User className="h-8 w-8 text-muted-foreground/40 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">
                  No sessions assigned to this speaker yet.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {dayKeys.map((day) => (
                  <div key={day}>
                    {/* Day header */}
                    <div className="flex items-center gap-2 mb-2.5">
                      <CalendarDays className="h-3.5 w-3.5 text-primary" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {day}
                      </span>
                      <span className="text-[10px] text-muted-foreground/60">
                        ({sessionsByDay[day].length})
                      </span>
                    </div>

                    {/* Session cards */}
                    <div className="space-y-1.5">
                      {sessionsByDay[day].map((session, i) => (
                        <div
                          key={`${session.title}-${i}`}
                          className="group flex items-start gap-3 px-3 py-2.5 rounded-lg border border-border/50 bg-card hover:border-primary/30 hover:bg-primary/[0.02] transition-colors"
                        >
                          {/* Time column */}
                          <div className="shrink-0 w-[72px] pt-0.5">
                            <span className="text-xs font-mono font-semibold text-foreground leading-none">
                              {session.time}
                            </span>
                            {session.endTime && (
                              <span className="block text-[10px] font-mono text-muted-foreground mt-0.5">
                                {session.endTime}
                              </span>
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-foreground leading-tight truncate group-hover:text-primary transition-colors">
                              {session.title}
                            </h4>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                                <MapPin className="h-3 w-3" />
                                {session.location}
                              </span>
                              <Badge
                                variant="outline"
                                className="text-[10px] px-1.5 py-0 h-4"
                              >
                                {session.type}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Footer */}
        <Separator />
        <div className="px-6 py-3 flex justify-end">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// ---------------------------------------------------------------------------
// Speaker List with Search + Alphabet Chips + Profile Panel
// ---------------------------------------------------------------------------
interface SpeakerDirectoryProps {
  speakers: Speaker[];
  /** Map of speaker ID -> list of sessions they are assigned to */
  speakerSessions: Record<string, SpeakerSession[]>;
}

export const SpeakerDirectory: React.FC<SpeakerDirectoryProps> = ({
  speakers,
  speakerSessions,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);

  // Filter speakers by search + alphabet group
  const filteredSpeakers = useMemo(() => {
    let list = speakers;

    // Alphabet group filter
    if (activeGroup) {
      const group = ALPHABET_GROUPS.find((g) => g.label === activeGroup);
      if (group) {
        list = list.filter((s) => {
          const firstChar = s.name.charAt(0).toUpperCase();
          return group.letters.includes(firstChar);
        });
      }
    }

    // Search filter
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          (s.role && s.role.toLowerCase().includes(q)) ||
          (s.company && s.company.toLowerCase().includes(q))
      );
    }

    // Sort alphabetically
    return [...list].sort((a, b) => a.name.localeCompare(b.name));
  }, [speakers, searchTerm, activeGroup]);

  const openProfile = useCallback((speaker: Speaker) => {
    setSelectedSpeaker(speaker);
    setProfileOpen(true);
  }, []);

  const selectedSessions = useMemo(() => {
    if (!selectedSpeaker) return [];
    return speakerSessions[selectedSpeaker.id] || [];
  }, [selectedSpeaker, speakerSessions]);

  // Count speakers per group for badges
  const groupCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    ALPHABET_GROUPS.forEach((g) => {
      counts[g.label] = speakers.filter((s) =>
        g.letters.includes(s.name.charAt(0).toUpperCase())
      ).length;
    });
    return counts;
  }, [speakers]);

  return (
    <div className="w-full py-12 bg-background">
      <div
        className="mx-auto w-full"
        style={{
          maxWidth: "var(--max-width)",
          paddingLeft: "var(--global-padding)",
          paddingRight: "var(--global-padding)",
        }}
      >
        {/* Header */}
        <div className="flex flex-col gap-4 mb-6">
          <div>
            <h2
              className="text-2xl lg:text-3xl font-bold text-foreground text-balance"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Speakers
            </h2>
            <p
              className="text-muted-foreground text-sm mt-1"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Click a speaker to view their full session schedule.
            </p>
          </div>
        </div>

        {/* Controls row: search + alphabet chips */}
        <div className="sticky top-0 z-[1] bg-background pb-3 border-b border-border">
          <div className="flex flex-col gap-2.5">
            {/* Search */}
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, role, or company..."
                className="h-9 pl-9 text-sm"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Alphabet chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => setActiveGroup(null)}
                className={cn(
                  "shrink-0 inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-all border",
                  activeGroup === null
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:border-foreground/20 hover:text-foreground"
                )}
              >
                All ({speakers.length})
              </button>
              {ALPHABET_GROUPS.map((group) => (
                <button
                  key={group.label}
                  onClick={() =>
                    setActiveGroup(
                      activeGroup === group.label ? null : group.label
                    )
                  }
                  className={cn(
                    "shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border whitespace-nowrap",
                    activeGroup === group.label
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-muted-foreground border-border hover:border-foreground/20 hover:text-foreground"
                  )}
                >
                  {group.label}
                  <span
                    className={cn(
                      "text-[10px]",
                      activeGroup === group.label
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground/60"
                    )}
                  >
                    {groupCounts[group.label]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Speaker Grid */}
        <div className="relative z-0 max-h-[60vh] overflow-y-auto mt-3">
          {filteredSpeakers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredSpeakers.map((speaker) => {
                const sessionCount = (speakerSessions[speaker.id] || []).length;
                return (
                  <button
                    key={speaker.id}
                    type="button"
                    onClick={() => openProfile(speaker)}
                    className="group flex items-center gap-3.5 p-3.5 rounded-xl border border-border/60 bg-card hover:border-primary/40 hover:shadow-sm transition-all text-left"
                    aria-label={`View profile for ${speaker.name}`}
                  >
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-muted shrink-0 border border-border/50">
                      {speaker.img ? (
                        <ImageWithFallback
                          src={speaker.img}
                          alt={speaker.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="flex items-center justify-center w-full h-full text-sm font-bold text-muted-foreground select-none">
                          {speaker.name
                            .split(" ")
                            .map((w) => w[0])
                            .join("")
                            .slice(0, 2)}
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3
                        className="font-semibold text-sm text-foreground truncate group-hover:text-primary transition-colors"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {speaker.name}
                      </h3>
                      <p
                        className="text-xs text-muted-foreground truncate"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {[speaker.role, speaker.company]
                          .filter(Boolean)
                          .join(" @ ")}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Badge
                          variant="secondary"
                          className="text-[10px] px-1.5 py-0 h-4"
                        >
                          <Clock className="h-2.5 w-2.5 mr-0.5" />
                          {sessionCount} session{sessionCount !== 1 ? "s" : ""}
                        </Badge>
                      </div>
                    </div>

                    {/* Arrow */}
                    <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary/60 transition-colors shrink-0" />
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <User className="h-8 w-8 mx-auto mb-3 text-muted-foreground/40" />
              <p className="text-sm font-medium">No speakers found</p>
              <p className="text-xs mt-1">
                Try adjusting your search or filter.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Profile Modal */}
      <SpeakerProfileModal
        speaker={selectedSpeaker}
        sessions={selectedSessions}
        open={profileOpen}
        onOpenChange={setProfileOpen}
      />
    </div>
  );
};
