import React from "react";
import { MapPin } from "lucide-react";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
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
  time,
  location,
  speakers,
  sponsoredBy,
}) => {
  // Combine speakers + sponsors into a single people list
  const allPeople = [
    ...speakers,
    ...(sponsoredBy ?? []),
  ];
  const visible = allPeople.slice(0, 3);
  const overflow = allPeople.length - 3;

  return (
    <div className="group flex items-center gap-4 py-2.5 border-b border-border/40 last:border-0 hover:bg-muted/30 transition-colors cursor-pointer">
      {/* Time Column */}
      <div className="shrink-0 w-[80px]">
        <span className="text-xs font-mono font-medium text-muted-foreground">{time}</span>
      </div>

      {/* Title + Description */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-sm text-foreground leading-tight truncate">{title}</h4>
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
  );
};
