import React, { useState } from "react";
import { Clock, MapPin, User, ArrowRight } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card } from "../ui/card";
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
  sponsoredBy
}) => {
  const [isAdded, setIsAdded] = useState(false);

  return (
    <Card className={cn(
        "flex overflow-hidden border-border/50 transition-all duration-300 group",
        isAdded ? "ring-2 ring-primary border-primary shadow-md" : "hover:shadow-lg"
    )}>
      {/* Left Color Strip */}
      <div className={cn("w-3 shrink-0 transition-colors", trackColor)} />
      
      <div className="flex flex-col sm:flex-row w-full p-6 gap-6">
        {/* Main Content */}
        <div className="flex-1 space-y-4">
            <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">{title}</h3>
                <p className="text-muted-foreground text-sm line-clamp-2">{description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                {/* Time */}
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-foreground font-medium text-sm">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>When</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{date}</p>
                    <p className="text-sm text-muted-foreground">{time}</p>
                </div>

                {/* Location */}
                 <div className="space-y-1">
                    <div className="flex items-center gap-2 text-foreground font-medium text-sm">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>Where</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{location}</p>
                </div>

                {/* Speakers */}
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-foreground font-medium text-sm">
                        <User className="h-4 w-4 text-primary" />
                        <span>Speakers</span>
                    </div>
                    <div className="flex -space-x-2">
                        {speakers.map((speaker, i) => (
                            <Avatar key={i} className="border-2 border-background w-8 h-8 transition-transform hover:scale-110 hover:z-10">
                                <AvatarImage src={speaker.image} />
                                <AvatarFallback className="text-xs bg-muted">{speaker.name[0]}</AvatarFallback>
                            </Avatar>
                        ))}
                    </div>
                </div>
            </div>

            {sponsoredBy && (
                 <div className="space-y-1 pt-2">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sponsored By</span>
                    <div className="flex gap-2">
                         {sponsoredBy.map((sponsor, i) => (
                            <div key={i} className="h-6 w-6 rounded-full bg-muted flex items-center justify-center overflow-hidden border border-border">
                                {sponsor.image ? <img src={sponsor.image} alt={sponsor.name} className="h-full w-full object-cover"/> : <span className="text-[10px]">{sponsor.name[0]}</span>}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>

        {/* Actions Column */}
        <div className="flex flex-row sm:flex-col justify-between items-end sm:items-end gap-4 border-t sm:border-t-0 sm:border-l border-border pt-4 sm:pt-0 sm:pl-6 min-w-[140px]">
            <Badge variant="outline" className="mb-auto hidden sm:flex gap-1 items-center bg-background/50">
                <div className={cn("w-2 h-2 rounded-full", trackColor.replace('bg-', 'bg-'))} />
                {track}
            </Badge>

            <div className="flex flex-col gap-3 w-full">
                <Button variant="secondary" size="sm" className="w-full justify-between group/btn shadow-sm bg-secondary/50 hover:bg-secondary">
                    View Details
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover/btn:opacity-100 transition-all -translate-x-2 group-hover/btn:translate-x-0" />
                </Button>
                <div 
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent parent click if inside a clickable card
                        setIsAdded(!isAdded);
                    }}
                >
                    <Checkbox 
                        id={`add-${title}`} 
                        checked={isAdded}
                        onCheckedChange={(checked) => setIsAdded(checked as boolean)}
                        className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                    />
                    <label 
                        htmlFor={`add-${title}`}
                        className="text-xs font-medium leading-[100%] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer select-none pointer-events-none"
                    >
                        {isAdded ? "Added to Itinerary" : "Add to Itinerary"}
                    </label>
                </div>
            </div>
        </div>
      </div>
    </Card>
  );
};
