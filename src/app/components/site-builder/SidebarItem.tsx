import React from "react";
import { Plus } from "lucide-react";
import { cn } from "../ui/utils";
import { Button } from "../ui/button";

interface SidebarItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ElementType;
  label: string;
  onAdd?: () => void;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon: Icon, 
  label, 
  onAdd,
  className,
  ...props 
}) => {
  return (
    <div 
      className={cn(
        "group flex items-center justify-between w-full p-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors border border-transparent hover:border-border/50 active:scale-[0.98]",
        className
      )}
      onClick={onAdd}
      {...props}
    >
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        <span className="text-sm font-medium text-foreground">{label}</span>
      </div>
      
      {onAdd && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-primary-foreground"
          onClick={(e) => {
            e.stopPropagation();
            onAdd();
          }}
        >
          <Plus className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
};
