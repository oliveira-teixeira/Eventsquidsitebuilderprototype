import React from "react";
import { MoreHorizontal, Settings } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../ui/utils";

interface PageListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
}

export const PageListItem: React.FC<PageListItemProps> = ({
  icon: Icon,
  label,
  isActive,
  className,
  onClick,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center justify-between w-full p-3 rounded-md border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md cursor-pointer select-none group",
        isActive 
            ? "border-primary bg-primary/5 ring-1 ring-primary" 
            : "hover:border-primary/50",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <div className={cn(
            "p-2 rounded-md shrink-0 transition-colors",
            isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:text-foreground"
        )}>
             <Icon className="h-4 w-4" />
        </div>
        <span className={cn(
            "text-sm font-medium truncate transition-colors",
            isActive ? "text-primary" : "text-foreground"
        )}>{label}</span>
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-background/80" onClick={(e) => e.stopPropagation()}>
          <Settings className="h-3 w-3" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-background/80" onClick={(e) => e.stopPropagation()}>
          <MoreHorizontal className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};
