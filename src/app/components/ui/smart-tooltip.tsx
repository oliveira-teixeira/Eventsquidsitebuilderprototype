import React, { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover";
import { Info, HelpCircle, X } from "lucide-react";
import { Button } from "./button";
import { cn } from "./utils";

interface SmartTooltipProps {
  children: React.ReactNode;
  id: string; // Unique ID for persistence
  title: string; // Identity
  description: string; // Purpose
  tip?: string; // Contextual Tip
  side?: "top" | "right" | "bottom" | "left";
  dismissible?: boolean;
}

// Simple event logger stub
const logEvent = (action: string, details: any) => {
  console.log(`[Event Log] ${action}:`, details);
  // In a real app, send to analytics endpoint
};

export const SmartTooltip: React.FC<SmartTooltipProps> = ({
  children,
  id,
  title,
  description,
  tip,
  side = "top",
  dismissible = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (dismissible) {
        const dismissed = localStorage.getItem(`hint-dismissed-${id}`);
        if (dismissed === "true") {
            setIsDismissed(true);
        }
    }
  }, [id, dismissible]);

  const handleDismiss = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsDismissed(true);
      localStorage.setItem(`hint-dismissed-${id}`, "true");
      logEvent("hint_dismissed", { id });
  };

  const handleOpenChange = (open: boolean) => {
      setIsOpen(open);
      if (open) {
          logEvent("tooltip_viewed", { id, title });
      }
  };

  if (isDismissed) {
      return <>{children}</>;
  }

  const Content = (
    <div className="flex flex-col gap-2 max-w-xs">
      <div className="flex items-start justify-between gap-2 border-b pb-2 mb-1">
        <div>
            <h4 className="font-semibold text-sm leading-[100%] text-foreground">{title}</h4>
        </div>
        {dismissible && (
            <button onClick={handleDismiss} className="text-muted-foreground hover:text-foreground">
                <X className="h-3 w-3" />
            </button>
        )}
      </div>
      <p className="text-sm text-muted-foreground leading-[140%]">
        {description}
      </p>
      {tip && (
        <div className="bg-primary/5 p-2 rounded-md border border-primary/10 mt-1 flex gap-2 items-start">
            <HelpCircle className="h-3 w-3 text-primary mt-0.5 shrink-0" />
            <p className="text-xs font-medium text-primary">
                <span className="font-bold opacity-80 uppercase text-[10px] mr-1">Pro Tip:</span>
                {tip}
            </p>
        </div>
      )}
    </div>
  );

  // For complex content or mobile, use Popover
  // For simple content on desktop, use Tooltip
  // Using Popover for mobile consistency or if requested "Interactive Popover"
  
  const usePopover = isMobile || (description.length > 80) || tip;

  if (usePopover) {
      return (
        <Popover open={isOpen} onOpenChange={handleOpenChange}>
            <div className="relative inline-flex items-center gap-2">
                {children}
                {/* Mobile/Touch Context Trigger */}
                <PopoverTrigger asChild>
                    <button 
                        className={cn(
                            "inline-flex items-center justify-center rounded-full h-4 w-4 bg-muted text-muted-foreground hover:bg-primary/20 hover:text-primary transition-colors",
                            isMobile ? "visible" : "opacity-0 group-hover:opacity-100 focus:opacity-100" // Show on hover on desktop, always on mobile if we want an indicator
                        )}
                        onClick={(e) => e.stopPropagation()} // Prevent triggering parent actions
                        aria-label="Info"
                    >
                        <Info className="h-2.5 w-2.5" />
                    </button>
                </PopoverTrigger>
            </div>
            <PopoverContent side={side} className="w-80 p-3 shadow-xl">
                {Content}
            </PopoverContent>
        </Popover>
      );
  }

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip onOpenChange={handleOpenChange}>
        <TooltipTrigger asChild>
            <div className="inline-flex items-center gap-1.5 cursor-help group">
                {children}
            </div>
        </TooltipTrigger>
        <TooltipContent side={side} className="p-3 shadow-xl border bg-popover">
            {Content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
