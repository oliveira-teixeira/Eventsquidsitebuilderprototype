"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "./utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        // Base styles
        "peer inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full transition-all outline-none focus-visible:ring-[3px]",
        // ON state - primary color
        "data-[state=checked]:bg-primary data-[state=checked]:border-primary",
        // OFF state - visible muted background with border
        "data-[state=unchecked]:bg-muted data-[state=unchecked]:border-border border",
        // DISABLED state - reduced opacity but still visible, with distinct styling
        "disabled:cursor-not-allowed disabled:opacity-70 disabled:data-[state=unchecked]:bg-muted/80 disabled:data-[state=checked]:bg-primary/60",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          // Base thumb styles
          "pointer-events-none block size-4 rounded-full ring-0 transition-transform",
          // Position based on state
          "data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0",
          // ON state thumb - contrasting color
          "data-[state=checked]:bg-primary-foreground",
          // OFF state thumb - visible with shadow for depth
          "data-[state=unchecked]:bg-background data-[state=unchecked]:shadow-sm data-[state=unchecked]:border data-[state=unchecked]:border-border/50",
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
