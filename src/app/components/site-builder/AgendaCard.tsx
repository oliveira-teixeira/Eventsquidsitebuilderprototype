"use client";

import React, { useState } from "react";
import { MapPin, Clock, CalendarPlus } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { cn } from "../ui/utils";

interface Speaker {
  name: string;
  image?: string;
}

interface AgendaCardProps {
  track?: string;
  trackColor?: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  speakers: Speaker[];
  sponsoredBy?: Speaker[];
}

export const AgendaCard: React.FC<AgendaCardProps> = ({
  track = "Track 1",
  trackColor = "bg-primary",
  title,
  description,
  date,
  time,
  location,
  speakers,
  sponsoredBy,
}) => {
  const [open, setOpen] = useState(false);

  // Combine speakers + sponsors into a single people list
  const allPeople = [
    ...speakers,
    ...(sponsoredBy ?? []),
  ];
  const visible = allPeople.slice(0, 3);
  const overflow = allPeople.length - 3;

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(true); } }}
        className="group flex items-center gap-4 py-2.5 border-b border-border/40 last:border-0 hover:bg-muted/30 transition-colors cursor-pointer"
      >
        {/* Time Column */}
        <div className="shrink-0 w-[80px]">
          <span className="text-xs font-mono font-medium text-muted-foreground">{time}</span>
        </div>

        {/* Title + Description */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-sm text-foreground leading-tight truncate group-hover:text-primary transition-colors">{title}</h4>
            <Badge variant="outline" className="shrink-0 text-[10px] px-1.5 py-0 h-4 gap-1 hidden sm:flex">
              <div className={cn("w-1.5 h-1.5 rounded-full", trackColor)} />
              {track}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground leading-snug truncate mt-0.5">
            {description}
            <span className="hidden sm:inline"> &middot; <MapPin className="inline h-3 w-3 -mt-0.5" /> {location}</span>
          </p>
        </div>

        {/* Avatar Cluster (speakers + sponsors combined) */}
        <div className="shrink-0 flex items-center -space-x-1.5 justify-end" role="group" aria-label="Speakers and sponsors">
          {visible.map((person, i) => (
            <Avatar key={i} className="w-[22px] h-[22px] border-2 border-background">
              <AvatarImage src={person.image} alt={person.name} />
              <AvatarFallback className="text-[9px] font-semibold bg-muted text-muted-foreground">
                {person.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
              </AvatarFallback>
            </Avatar>
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
      </div>

      {/* Session Detail Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="text-[10px] font-mono uppercase gap-1">
                <div className={cn("w-1.5 h-1.5 rounded-full", trackColor)} />
                {track}
              </Badge>
            </div>
            <DialogTitle className="text-xl font-bold leading-tight">{title}</DialogTitle>
            <DialogDescription className="sr-only">Details for {title}</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0 text-primary" />
              <span>{time} &middot; {date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-primary" />
              <span>{location}</span>
            </div>
          </div>

          <Separator />

          <div className="text-sm text-foreground leading-relaxed whitespace-pre-line">
            {description}
          </div>

          {allPeople.length > 0 && (
            <>
              <Separator />
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Speakers</h4>
                <div className="flex flex-col gap-2.5">
                  {allPeople.map((person, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={person.image} alt={person.name} />
                        <AvatarFallback className="text-xs font-semibold bg-muted text-muted-foreground">
                          {person.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
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
    </>
  );
};
