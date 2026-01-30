import React, { useState, useEffect } from "react";
import {
  Search,
  PaintBucket,
  Layout,
  Clock,
  Timer,
  Users,
  Handshake,
  MapPin,
  FileText,
  Building,
  Map,
  Terminal,
  Palette,
  Type,
  MousePointerClick,
  Component,
  Box,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { Button } from "./ui/button";

export function GlobalSearch({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (id: string) => {
    setOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        <span className="hidden lg:inline-flex">Search documentation...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="Tools">
             <CommandItem onSelect={() => runCommand("theme-builder")}>
                <PaintBucket className="mr-2 h-4 w-4" />
                <span>Theme Builder</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Design System">
            <CommandItem onSelect={() => runCommand("intro")}>
              <Terminal className="mr-2 h-4 w-4" />
              <span>Introduction</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand("colors")}>
              <Palette className="mr-2 h-4 w-4" />
              <span>Colors</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand("typography")}>
              <Type className="mr-2 h-4 w-4" />
              <span>Typography</span>
            </CommandItem>
             <CommandItem onSelect={() => runCommand("buttons")}>
              <MousePointerClick className="mr-2 h-4 w-4" />
              <span>Buttons</span>
            </CommandItem>
             <CommandItem onSelect={() => runCommand("inputs")}>
              <Component className="mr-2 h-4 w-4" />
              <span>Inputs</span>
            </CommandItem>
             <CommandItem onSelect={() => runCommand("cards")}>
              <Box className="mr-2 h-4 w-4" />
              <span>Cards</span>
            </CommandItem>
          </CommandGroup>
          
          <CommandSeparator />

          <CommandGroup heading="Building Blocks">
            <CommandItem onSelect={() => runCommand("hero")}>
              <Layout className="mr-2 h-4 w-4" />
              <span>Hero Sections</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand("agenda")}>
              <Clock className="mr-2 h-4 w-4" />
              <span>Agenda</span>
            </CommandItem>
             <CommandItem onSelect={() => runCommand("countdown")}>
              <Timer className="mr-2 h-4 w-4" />
              <span>Countdown</span>
            </CommandItem>
             <CommandItem onSelect={() => runCommand("speakers")}>
              <Users className="mr-2 h-4 w-4" />
              <span>Speakers</span>
            </CommandItem>
             <CommandItem onSelect={() => runCommand("sponsors")}>
              <Handshake className="mr-2 h-4 w-4" />
              <span>Sponsors</span>
            </CommandItem>
             <CommandItem onSelect={() => runCommand("location")}>
              <MapPin className="mr-2 h-4 w-4" />
              <span>Location</span>
            </CommandItem>
             <CommandItem onSelect={() => runCommand("documents")}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Documents</span>
            </CommandItem>
             <CommandItem onSelect={() => runCommand("hotel")}>
              <Building className="mr-2 h-4 w-4" />
              <span>Hotel</span>
            </CommandItem>
             <CommandItem onSelect={() => runCommand("booth-map")}>
              <Map className="mr-2 h-4 w-4" />
              <span>Booth Map</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
