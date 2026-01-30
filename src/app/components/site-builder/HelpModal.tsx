import React from "react";
import { 
  X, 
  MousePointer2, 
  Palette, 
  LayoutTemplate, 
  Settings2,
  Move
} from "lucide-react";
import { Dialog, DialogContent, DialogClose, DialogTitle } from "../ui/dialog";

interface HelpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] w-full h-[90vh] p-0 overflow-hidden bg-background border-border flex flex-col" aria-describedby={undefined}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-muted/20">
            <div>
                <DialogTitle className="text-2xl font-bold tracking-tight">Welcome to Site Builder</DialogTitle>
                <p className="text-muted-foreground mt-1">Your complete guide to building stunning websites.</p>
            </div>
            <DialogClose asChild>
                <button className="p-2 rounded-full hover:bg-muted transition-colors">
                    <X className="w-6 h-6 text-muted-foreground" />
                </button>
            </DialogClose>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 lg:p-12">
            <div className="max-w-5xl mx-auto space-y-16">
                
                {/* Overview Section */}
                <section className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="p-4 rounded-2xl bg-primary/10 text-primary">
                        <LayoutTemplate className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-3">Overview</h3>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                            Site Builder is your creative workspace where designs are transformed into functional web structures. 
                            It bridges the gap between design and development, allowing you to visually construct your site 
                            while generating clean, production-ready code in the background.
                        </p>
                    </div>
                </section>

                <div className="w-full h-px bg-border/50" />

                {/* Drag and Drop */}
                <section className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-500">
                        <Move className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-3">Drag and Drop</h3>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            Building your layout is intuitive and fast. Open the sidebar to access the component library.
                        </p>
                        <ul className="grid md:grid-cols-2 gap-4">
                            <li className="bg-secondary/50 p-4 rounded-lg border border-border/50">
                                <span className="font-semibold block mb-1 text-foreground">1. Browse</span>
                                Find sections like Heroes, Features, and Footers in the sidebar.
                            </li>
                            <li className="bg-secondary/50 p-4 rounded-lg border border-border/50">
                                <span className="font-semibold block mb-1 text-foreground">2. Drag</span>
                                Click and drag any component directly onto the canvas.
                            </li>
                            <li className="bg-secondary/50 p-4 rounded-lg border border-border/50">
                                <span className="font-semibold block mb-1 text-foreground">3. Drop</span>
                                Release the mouse button when you see the drop indicator to place the block.
                            </li>
                            <li className="bg-secondary/50 p-4 rounded-lg border border-border/50">
                                <span className="font-semibold block mb-1 text-foreground">4. Reorder</span>
                                Use the up/down arrows on any selected block to rearrange the page flow.
                            </li>
                        </ul>
                    </div>
                </section>

                <div className="w-full h-px bg-border/50" />

                {/* Theme Functionality */}
                <section className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="p-4 rounded-2xl bg-purple-500/10 text-purple-500">
                        <Palette className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-3">Theme Functionality</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Maintain perfect brand consistency effortlessly. The Theme Engine controls the global styling rules for your entire site.
                            Instead of styling each element individually, you define global variables for 
                            <span className="font-medium text-foreground"> Colors</span>, 
                            <span className="font-medium text-foreground"> Typography</span>, and 
                            <span className="font-medium text-foreground"> Spacing</span>. 
                            Any change in the Theme tab automatically propagates to all components on the canvas.
                        </p>
                    </div>
                </section>

                <div className="w-full h-px bg-border/50" />

                {/* Basic Operations */}
                <section className="flex flex-col gap-8 items-center w-full max-w-[80%] mx-auto">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-4 rounded-2xl bg-orange-500/10 text-orange-500">
                            <Settings2 className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold">Basic Operations</h3>
                    </div>
                    
                    <div className="flex flex-col gap-6 w-full">
                        {/* Select */}
                        <div className="bg-secondary/30 rounded-3xl p-8 flex flex-col items-start w-full">
                            <MousePointer2 className="w-8 h-8 mb-6" />
                            <h4 className="text-2xl font-bold mb-4">Select</h4>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Click any block on the canvas to select it and reveal its toolbar.
                            </p>
                        </div>

                        {/* Edit */}
                        <div className="bg-secondary/30 rounded-3xl p-8 flex flex-col items-start w-full">
                            <Settings2 className="w-8 h-8 mb-6" />
                            <h4 className="text-2xl font-bold mb-4">Edit</h4>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Use the Properties panel on the right to customize specific settings.
                            </p>
                        </div>

                        {/* Delete */}
                        <div className="bg-secondary/30 rounded-3xl p-8 flex flex-col items-start w-full">
                            <X className="w-8 h-8 mb-6" />
                            <h4 className="text-2xl font-bold mb-4">Delete</h4>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Remove unwanted blocks using the trash icon or Delete key.
                            </p>
                        </div>

                         {/* Preview */}
                        <div className="bg-secondary/30 rounded-3xl p-8 flex flex-col items-start w-full">
                            <LayoutTemplate className="w-8 h-8 mb-6" />
                            <h4 className="text-2xl font-bold mb-4">Preview</h4>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Click the "Publish" button to see a live preview of your site.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-muted/20 flex justify-end">
            <button 
                onClick={() => onOpenChange(false)}
                className="px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-sm"
            >
                Got it, let's build!
            </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
