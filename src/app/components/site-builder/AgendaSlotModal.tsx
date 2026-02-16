"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "../ui/utils";
import {
  Clock,
  MapPin,
  Type,
  AlignLeft,
  Users,
  Layers,
  Megaphone,
  FileText,
  Plus,
  X,
  Search,
  Link2,
  Trash2,
  CalendarPlus,
  Calendar,
  Upload,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface AgendaDocument {
  id: string;
  title: string;
  url: string;
}

export interface AgendaSlot {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  day: string;
  dayIndex: number;
  type: string;
  speakerIds: string[];
  trackIds: string[];
  sponsorIds: string[];
  documents: AgendaDocument[];
  addToSchedule?: boolean;
}

export interface SpeakerOption {
  id: string;
  name: string;
  role?: string;
  company?: string;
  img?: string;
}

export interface TrackOption {
  id: string;
  name: string;
  color?: string;
}

export interface SponsorOption {
  id: string;
  name: string;
  logo?: string;
  tier?: string;
}

interface AgendaSlotModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  slot?: AgendaSlot | null;
  onSave: (slot: AgendaSlot) => void;
  speakers: SpeakerOption[];
  tracks: TrackOption[];
  sponsors: SponsorOption[];
  days?: string[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const generateId = () => Math.random().toString(36).substr(2, 9);

const EMPTY_SLOT: AgendaSlot = {
  id: "",
  title: "",
  description: "",
  startTime: "09:00",
  endTime: "10:00",
  location: "",
  day: "",
  dayIndex: 0,
  type: "Talk",
  speakerIds: [],
  trackIds: [],
  sponsorIds: [],
  documents: [],
  addToSchedule: false,
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

/** Searchable multi-select list that renders selected items as chips */
function MultiSelectChips<T extends { id: string }>({
  label,
  options,
  selectedIds,
  onToggle,
  renderOption,
  renderChip,
  placeholder,
  emptyIcon,
  emptyDescription,
}: {
  label: string;
  options: T[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  renderOption: (item: T, isSelected: boolean) => React.ReactNode;
  renderChip: (item: T) => React.ReactNode;
  placeholder: string;
  emptyIcon?: React.ReactNode;
  emptyDescription?: string;
}) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return options;
    const q = search.toLowerCase();
    return options.filter((o) => {
      const name = (o as any).name || "";
      return name.toLowerCase().includes(q);
    });
  }, [options, search]);

  const selected = useMemo(
    () => options.filter((o) => selectedIds.includes(o.id)),
    [options, selectedIds]
  );

  return (
    <div className="space-y-3">
      {/* Selected chips */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {selected.map((item) => (
            <Badge
              key={item.id}
              variant="secondary"
              className="gap-1 pr-1 pl-2 py-1 text-xs font-medium"
            >
              {renderChip(item)}
              <button
                type="button"
                onClick={() => onToggle(item.id)}
                className="ml-0.5 rounded-full p-0.5 hover:bg-muted-foreground/20 transition-colors"
                aria-label={`Remove ${(item as any).name}`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={placeholder}
          className="h-8 pl-8 text-xs"
        />
      </div>

      {/* Options list */}
      <ScrollArea className="max-h-[180px]">
        <div className="space-y-0.5">
          {filtered.length === 0 && (
            <div className="text-center py-6">
              {emptyIcon && <div className="flex justify-center mb-2 opacity-30">{emptyIcon}</div>}
              <p className="text-xs text-muted-foreground font-medium">
                No {label.toLowerCase()} found.
              </p>
              {emptyDescription && (
                <p className="text-[10px] text-muted-foreground/70 mt-1">{emptyDescription}</p>
              )}
            </div>
          )}
          {filtered.map((item) => {
            const isSelected = selectedIds.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onToggle(item.id)}
                className={cn(
                  "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-left text-xs transition-colors",
                  isSelected
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted text-foreground"
                )}
              >
                {renderOption(item, isSelected)}
              </button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}

/** Shows a compact cross-relationship summary above each relationship tab */
function RelationshipSummary({
  items,
}: {
  items: { icon: React.ReactNode; label: string; count: number; names: string[] }[];
}) {
  const active = items.filter((i) => i.count > 0);
  if (active.length === 0) return null;

  return (
    <div className="mb-3 p-2.5 rounded-lg border border-border bg-muted/30">
      <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
        Linked to this session
      </p>
      <div className="flex flex-wrap gap-2">
        {active.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-1.5 text-xs text-foreground"
            title={item.names.join(", ")}
          >
            {item.icon}
            <span className="font-medium">{item.count}</span>
            <span className="text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Modal
// ---------------------------------------------------------------------------
const DEFAULT_DAYS = ["Day 1", "Day 2", "Day 3"];

export const AgendaSlotModal: React.FC<AgendaSlotModalProps> = ({
  open,
  onOpenChange,
  slot,
  onSave,
  speakers,
  tracks,
  sponsors,
  days = DEFAULT_DAYS,
}) => {
  const isEditing = !!slot;

  // Local form state -- initialised from slot when modal opens
  const [form, setForm] = useState<AgendaSlot>(
    slot ? { ...slot } : { ...EMPTY_SLOT, id: generateId() }
  );

  // Reset form when slot prop changes (open / close)
  React.useEffect(() => {
    if (open) {
      setForm(slot ? { ...slot } : { ...EMPTY_SLOT, id: generateId() });
    }
  }, [open, slot]);

  const update = useCallback(
    <K extends keyof AgendaSlot>(key: K, value: AgendaSlot[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const toggleArrayItem = useCallback(
    (key: "speakerIds" | "trackIds" | "sponsorIds", id: string) => {
      setForm((prev) => {
        const arr = prev[key] as string[];
        return {
          ...prev,
          [key]: arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id],
        };
      });
    },
    []
  );

  // Documents helpers
  const addDocument = useCallback(() => {
    setForm((prev) => ({
      ...prev,
      documents: [
        ...prev.documents,
        { id: generateId(), title: "", url: "" },
      ],
    }));
  }, []);

  const updateDocument = useCallback(
    (docId: string, field: "title" | "url", value: string) => {
      setForm((prev) => ({
        ...prev,
        documents: prev.documents.map((d) =>
          d.id === docId ? { ...d, [field]: value } : d
        ),
      }));
    },
    []
  );

  const removeDocument = useCallback((docId: string) => {
    setForm((prev) => ({
      ...prev,
      documents: prev.documents.filter((d) => d.id !== docId),
    }));
  }, []);

  const handleSave = () => {
    onSave(form);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  // Validation
  const canSave = form.title.trim().length > 0;

  // Resolved relationship names for cross-reference display
  const selectedSpeakerNames = useMemo(
    () => speakers.filter((s) => form.speakerIds.includes(s.id)).map((s) => s.name),
    [speakers, form.speakerIds]
  );
  const selectedTrackNames = useMemo(
    () => tracks.filter((t) => form.trackIds.includes(t.id)).map((t) => t.name),
    [tracks, form.trackIds]
  );
  const selectedSponsorNames = useMemo(
    () => sponsors.filter((s) => form.sponsorIds.includes(s.id)).map((s) => s.name),
    [sponsors, form.sponsorIds]
  );

  const crossRelItems = useMemo(
    () => [
      {
        icon: <Users className="h-3 w-3 text-muted-foreground" />,
        label: "Speaker" + (form.speakerIds.length !== 1 ? "s" : ""),
        count: form.speakerIds.length,
        names: selectedSpeakerNames,
      },
      {
        icon: <Layers className="h-3 w-3 text-muted-foreground" />,
        label: "Track" + (form.trackIds.length !== 1 ? "s" : ""),
        count: form.trackIds.length,
        names: selectedTrackNames,
      },
      {
        icon: <Megaphone className="h-3 w-3 text-muted-foreground" />,
        label: "Sponsor" + (form.sponsorIds.length !== 1 ? "s" : ""),
        count: form.sponsorIds.length,
        names: selectedSponsorNames,
      },
      {
        icon: <FileText className="h-3 w-3 text-muted-foreground" />,
        label: "Doc" + (form.documents.length !== 1 ? "s" : ""),
        count: form.documents.length,
        names: form.documents.map((d) => d.title || "Untitled"),
      },
    ],
    [form.speakerIds, form.trackIds, form.sponsorIds, form.documents, selectedSpeakerNames, selectedTrackNames, selectedSponsorNames]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] p-0 gap-0 flex flex-col overflow-hidden">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle className="text-lg font-bold">
            {isEditing ? "Edit Agenda Slot" : "Add Agenda Slot"}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {isEditing
              ? "Update the session details and relationships."
              : "Create a new session with speakers, tracks, sponsors, and documents."}
          </DialogDescription>
        </DialogHeader>

        {/* Tabbed body */}
        <Tabs defaultValue="basics" className="flex-1 flex flex-col min-h-0">
          <div className="px-6 pt-3">
            <TabsList className="w-full grid grid-cols-5 h-9">
              <TabsTrigger value="basics" className="text-xs gap-1">
                <Type className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Basics</span>
              </TabsTrigger>
              <TabsTrigger value="speakers" className="text-xs gap-1 relative">
                <Users className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Speakers</span>
                {form.speakerIds.length > 0 && (
                  <span className="ml-0.5 inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full bg-primary text-primary-foreground text-[9px] font-bold leading-none">
                    {form.speakerIds.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="tracks" className="text-xs gap-1 relative">
                <Layers className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Tracks</span>
                {form.trackIds.length > 0 && (
                  <span className="ml-0.5 inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full bg-primary text-primary-foreground text-[9px] font-bold leading-none">
                    {form.trackIds.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="sponsors" className="text-xs gap-1 relative">
                <Megaphone className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Sponsors</span>
                {form.sponsorIds.length > 0 && (
                  <span className="ml-0.5 inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full bg-primary text-primary-foreground text-[9px] font-bold leading-none">
                    {form.sponsorIds.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="documents" className="text-xs gap-1 relative">
                <FileText className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Docs</span>
                {form.documents.length > 0 && (
                  <span className="ml-0.5 inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full bg-primary text-primary-foreground text-[9px] font-bold leading-none">
                    {form.documents.length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="flex-1 min-h-0">
            <div className="px-6 py-4">
              {/* --------------------------------------------------------- */}
              {/* BASICS TAB */}
              {/* --------------------------------------------------------- */}
              <TabsContent value="basics" className="mt-0 space-y-4">
                {/* Day */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium flex items-center gap-1.5">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    Day
                  </Label>
                  <div className="flex flex-wrap gap-1.5">
                    {days.map((d, i) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => {
                          update("day", d);
                          update("dayIndex", i);
                        }}
                        className={cn(
                          "px-3 py-1.5 rounded-md text-xs font-medium border transition-colors",
                          form.day === d
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background text-muted-foreground border-border hover:text-foreground hover:border-foreground/20"
                        )}
                      >
                        {d}
                      </button>
                    ))}
                    {!days.includes(form.day) && form.day && (
                      <span className="px-3 py-1.5 rounded-md text-xs font-medium border border-primary bg-primary/10 text-primary">
                        {form.day}
                      </span>
                    )}
                  </div>
                </div>

                {/* Title */}
                <div className="space-y-1.5">
                  <Label htmlFor="slot-title" className="text-xs font-medium">
                    Title <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="slot-title"
                    value={form.title}
                    onChange={(e) => update("title", e.target.value)}
                    placeholder="e.g. Opening Keynote"
                    className="h-9"
                  />
                </div>

                {/* Day + Time row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="slot-start" className="text-xs font-medium flex items-center gap-1.5">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      Start Time
                    </Label>
                    <Input
                      id="slot-start"
                      type="time"
                      value={form.startTime}
                      onChange={(e) => update("startTime", e.target.value)}
                      className="h-9 font-mono text-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="slot-end" className="text-xs font-medium flex items-center gap-1.5">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      End Time
                    </Label>
                    <Input
                      id="slot-end"
                      type="time"
                      value={form.endTime}
                      onChange={(e) => update("endTime", e.target.value)}
                      className="h-9 font-mono text-xs"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-1.5">
                  <Label htmlFor="slot-location" className="text-xs font-medium flex items-center gap-1.5">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    Location / Room
                  </Label>
                  <Input
                    id="slot-location"
                    value={form.location}
                    onChange={(e) => update("location", e.target.value)}
                    placeholder="e.g. Auditorium A"
                    className="h-9"
                  />
                </div>

                {/* Session Type */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Session Type</Label>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Keynote",
                      "Talk",
                      "Workshop",
                      "Panel",
                      "Networking",
                      "Fireside Chat",
                      "General",
                    ].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => update("type", t)}
                        className={cn(
                          "px-2.5 py-1 rounded-full text-xs font-medium border transition-colors",
                          form.type === t
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background text-muted-foreground border-border hover:text-foreground hover:border-foreground/20"
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <Label htmlFor="slot-desc" className="text-xs font-medium flex items-center gap-1.5">
                    <AlignLeft className="h-3 w-3 text-muted-foreground" />
                    Description
                  </Label>
                  <textarea
                    id="slot-desc"
                    value={form.description}
                    onChange={(e) => update("description", e.target.value)}
                    placeholder="Describe the session..."
                    rows={4}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                  />
                </div>

                {/* Add to schedule toggle */}
                <div className="flex items-center justify-between rounded-md border border-border px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <CalendarPlus className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs font-medium">
                      {"Add to my schedule"}
                    </span>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={form.addToSchedule}
                    onClick={() =>
                      update("addToSchedule", !form.addToSchedule)
                    }
                    className={cn(
                      "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors",
                      form.addToSchedule ? "bg-primary" : "bg-input"
                    )}
                  >
                    <span
                      className={cn(
                        "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-sm ring-0 transition-transform",
                        form.addToSchedule
                          ? "translate-x-4"
                          : "translate-x-0"
                      )}
                    />
                  </button>
                </div>
              </TabsContent>

              {/* --------------------------------------------------------- */}
              {/* SPEAKERS TAB */}
              {/* --------------------------------------------------------- */}
              <TabsContent value="speakers" className="mt-0">
                <RelationshipSummary
                  items={crossRelItems.filter((i) => i.label.startsWith("Track") || i.label.startsWith("Sponsor") || i.label.startsWith("Doc"))}
                />
                <MultiSelectChips
                  label="Speakers"
                  options={speakers}
                  selectedIds={form.speakerIds}
                  onToggle={(id) => toggleArrayItem("speakerIds", id)}
                  placeholder="Search speakers..."
                  emptyIcon={<Users className="h-8 w-8" />}
                  emptyDescription="Add speakers from your event to this session."
                  renderOption={(s, sel) => (
                    <>
                      <div className="w-7 h-7 rounded-full bg-muted overflow-hidden shrink-0 flex items-center justify-center">
                        {s.img ? (
                          <img
                            src={s.img}
                            alt={s.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-[9px] font-semibold text-muted-foreground">
                            {s.name
                              .split(" ")
                              .map((w) => w[0])
                              .join("")
                              .slice(0, 2)}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-medium block truncate">
                          {s.name}
                        </span>
                        {(s.role || s.company) && (
                          <span className="text-[10px] text-muted-foreground block truncate">
                            {[s.role, s.company].filter(Boolean).join(" @ ")}
                          </span>
                        )}
                      </div>
                      {sel && (
                        <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center shrink-0">
                          <svg
                            className="h-2.5 w-2.5 text-primary-foreground"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      )}
                    </>
                  )}
                  renderChip={(s) => (
                    <span className="flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-muted overflow-hidden shrink-0 inline-flex items-center justify-center">
                        {s.img ? (
                          <img
                            src={s.img}
                            alt={s.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-[7px] font-bold">
                            {s.name[0]}
                          </span>
                        )}
                      </span>
                      {s.name}
                    </span>
                  )}
                />
              </TabsContent>

              {/* --------------------------------------------------------- */}
              {/* TRACKS TAB */}
              {/* --------------------------------------------------------- */}
              <TabsContent value="tracks" className="mt-0">
                <RelationshipSummary
                  items={crossRelItems.filter((i) => i.label.startsWith("Speaker") || i.label.startsWith("Sponsor") || i.label.startsWith("Doc"))}
                />
                <MultiSelectChips
                  label="Tracks"
                  options={tracks}
                  selectedIds={form.trackIds}
                  onToggle={(id) => toggleArrayItem("trackIds", id)}
                  placeholder="Search tracks..."
                  emptyIcon={<Layers className="h-8 w-8" />}
                  emptyDescription="Assign color-coded tracks to categorize this session."
                  renderOption={(t, sel) => (
                    <>
                      <div
                        className="w-3 h-3 rounded-sm shrink-0"
                        style={{
                          backgroundColor: t.color || "var(--primary)",
                        }}
                      />
                      <span className="flex-1 font-medium">{t.name}</span>
                      {sel && (
                        <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center shrink-0">
                          <svg
                            className="h-2.5 w-2.5 text-primary-foreground"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      )}
                    </>
                  )}
                  renderChip={(t) => (
                    <span className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-sm shrink-0 inline-block"
                        style={{
                          backgroundColor: t.color || "var(--primary)",
                        }}
                      />
                      {t.name}
                    </span>
                  )}
                />
              </TabsContent>

              {/* --------------------------------------------------------- */}
              {/* SPONSORS TAB */}
              {/* --------------------------------------------------------- */}
              <TabsContent value="sponsors" className="mt-0">
                <RelationshipSummary
                  items={crossRelItems.filter((i) => i.label.startsWith("Speaker") || i.label.startsWith("Track") || i.label.startsWith("Doc"))}
                />
                <MultiSelectChips
                  label="Sponsors"
                  options={sponsors}
                  selectedIds={form.sponsorIds}
                  onToggle={(id) => toggleArrayItem("sponsorIds", id)}
                  placeholder="Search sponsors..."
                  emptyIcon={<Megaphone className="h-8 w-8" />}
                  emptyDescription="Link sponsors to sessions they are supporting."
                  renderOption={(sp, sel) => (
                    <>
                      <div className="w-8 h-6 rounded bg-muted overflow-hidden shrink-0 flex items-center justify-center p-0.5">
                        {sp.logo ? (
                          <img
                            src={sp.logo}
                            alt={sp.name}
                            className="max-w-full max-h-full object-contain"
                          />
                        ) : (
                          <span className="text-[8px] font-bold text-muted-foreground">
                            {sp.name.slice(0, 3).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-medium block truncate">
                          {sp.name}
                        </span>
                        {sp.tier && (
                          <span className="text-[10px] text-muted-foreground">
                            {sp.tier}
                          </span>
                        )}
                      </div>
                      {sel && (
                        <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center shrink-0">
                          <svg
                            className="h-2.5 w-2.5 text-primary-foreground"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      )}
                    </>
                  )}
                  renderChip={(sp) => (
                    <span className="flex items-center gap-1.5">
                      <span className="w-4 h-3 rounded bg-muted overflow-hidden shrink-0 inline-flex items-center justify-center">
                        {sp.logo ? (
                          <img
                            src={sp.logo}
                            alt={sp.name}
                            className="max-w-full max-h-full object-contain"
                          />
                        ) : (
                          <span className="text-[6px] font-bold">
                            {sp.name[0]}
                          </span>
                        )}
                      </span>
                      {sp.name}
                    </span>
                  )}
                />
              </TabsContent>

              {/* --------------------------------------------------------- */}
              {/* DOCUMENTS TAB */}
              {/* --------------------------------------------------------- */}
              <TabsContent value="documents" className="mt-0 space-y-3">
                <RelationshipSummary
                  items={crossRelItems.filter((i) => i.label.startsWith("Speaker") || i.label.startsWith("Track") || i.label.startsWith("Sponsor"))}
                />
                {form.documents.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Upload className="h-8 w-8 mx-auto mb-2 opacity-30" />
                    <p className="text-xs font-medium">No documents attached yet</p>
                    <p className="text-[10px] mt-1 text-muted-foreground/70">Attach presentations, handouts, or reference materials.</p>
                  </div>
                )}

                {form.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-start gap-2 p-3 rounded-md border border-border bg-muted/30"
                  >
                    <FileText className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                    <div className="flex-1 space-y-2">
                      <Input
                        value={doc.title}
                        onChange={(e) =>
                          updateDocument(doc.id, "title", e.target.value)
                        }
                        placeholder="Document title"
                        className="h-7 text-xs"
                      />
                      <div className="relative">
                        <Link2 className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                        <Input
                          value={doc.url}
                          onChange={(e) =>
                            updateDocument(doc.id, "url", e.target.value)
                          }
                          placeholder="https://..."
                          className="h-7 text-xs pl-7 font-mono"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeDocument(doc.id)}
                      className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors shrink-0"
                      aria-label="Remove document"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addDocument}
                  className="w-full gap-1.5 text-xs"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add Document
                </Button>
              </TabsContent>
            </div>
          </ScrollArea>

          {/* Fixed footer actions */}
          <Separator />
          <div className="flex items-center justify-between px-6 py-3 bg-background">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
              {form.day && (
                <Badge variant="secondary" className="text-[10px] gap-1">
                  <Calendar className="h-2.5 w-2.5" />
                  {form.day}
                </Badge>
              )}
              {form.speakerIds.length > 0 && (
                <Badge variant="outline" className="text-[10px] gap-1" title={selectedSpeakerNames.join(", ")}>
                  <Users className="h-2.5 w-2.5" />
                  {form.speakerIds.length} {form.speakerIds.length === 1 ? "speaker" : "speakers"}
                </Badge>
              )}
              {form.trackIds.length > 0 && (
                <Badge variant="outline" className="text-[10px] gap-1" title={selectedTrackNames.join(", ")}>
                  <Layers className="h-2.5 w-2.5" />
                  {form.trackIds.length} {form.trackIds.length === 1 ? "track" : "tracks"}
                </Badge>
              )}
              {form.sponsorIds.length > 0 && (
                <Badge variant="outline" className="text-[10px] gap-1" title={selectedSponsorNames.join(", ")}>
                  <Megaphone className="h-2.5 w-2.5" />
                  {form.sponsorIds.length} {form.sponsorIds.length === 1 ? "sponsor" : "sponsors"}
                </Badge>
              )}
              {form.documents.length > 0 && (
                <Badge variant="outline" className="text-[10px] gap-1">
                  <FileText className="h-2.5 w-2.5" />
                  {form.documents.length} {form.documents.length === 1 ? "doc" : "docs"}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={handleSave}
                disabled={!canSave}
              >
                {isEditing ? "Save Changes" : "Add Session"}
              </Button>
            </div>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
