import React from "react";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";

interface AddBlockDividerProps {
  onClick?: () => void;
}

export const AddBlockDivider: React.FC<AddBlockDividerProps> = ({ onClick }) => {
  return (
    <div className="relative w-full py-4 group">
      {/* The Line */}
      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-primary/20 group-hover:bg-primary transition-colors duration-300" />
      
      {/* The Button */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Button 
          size="sm"
          className="rounded-full shadow-[0_0_0_2px_var(--background),0_0_0_4px_var(--primary)] hover:scale-105 transition-transform"
          onClick={onClick}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Block
        </Button>
      </div>
    </div>
  );
};
