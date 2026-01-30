import React, { useState } from "react";
import { X, Clock, RotateCcw, Trash2, AlertCircle, CheckCircle2, Archive, Plus, Minus, Edit3, Palette, Type, AlignCenter, Settings, Smartphone, Monitor, Code, Layers } from "lucide-react";
import { cn } from "../ui/utils";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

interface AuditLogEntry {
  id: string;
  timestamp: Date;
  actionType: 
    | "component_added"
    | "component_removed" 
    | "component_edited"
    | "component_archived"
    | "color_changed"
    | "text_changed"
    | "alignment_changed"
    | "visibility_changed"
    | "responsiveness_updated"
    | "functionality_changed"
    | "system_updated"
    | "layout_changed"
    | "spacing_adjusted"
    | "typography_scaled"
    | "mobile_optimized"
    | "breakpoint_modified"
    | "interaction_added"
    | "state_changed"
    | "configuration_updated";
  targetElement: string;
  description: string;
  previousState?: any;
  newState?: any;
}

interface AuditLogPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock data for demonstration
const MOCK_AUDIT_LOG: AuditLogEntry[] = [
  {
    id: "1",
    timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 min ago
    actionType: "mobile_optimized",
    targetElement: "Hero: Modern",
    description: "Mobile responsiveness improved: reduced heading size from text-6xl to text-3xl on mobile, adjusted padding from py-24 to py-12",
    previousState: { mobile: "text-6xl py-24" },
    newState: { mobile: "text-3xl py-12" }
  },
  {
    id: "2",
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 min ago
    actionType: "typography_scaled",
    targetElement: "All Hero Variants",
    description: "Typography scaled for 375px mobile breakpoint: h1 reduced, line-height optimized to 110%",
    previousState: { lineHeight: "120%" },
    newState: { lineHeight: "110%" }
  },
  {
    id: "3",
    timestamp: new Date(Date.now() - 8 * 60 * 1000), // 8 min ago
    actionType: "spacing_adjusted",
    targetElement: "Hero: Split",
    description: "Vertical spacing reduced on mobile: space-y-8 → space-y-4, gaps adjusted for better viewport fit",
    previousState: { spacing: "space-y-8" },
    newState: { spacing: "space-y-4 md:space-y-6 lg:space-y-8" }
  },
  {
    id: "4",
    timestamp: new Date(Date.now() - 12 * 60 * 1000), // 12 min ago
    actionType: "component_edited",
    targetElement: "Hero: Video BG",
    description: "Badge sizing reduced: py-1 px-4 → py-0.5 px-3 on mobile, font-size: text-xs → text-[10px]",
    previousState: { badge: "py-1 px-4 text-xs" },
    newState: { badge: "py-0.5 px-3 text-[10px]" }
  },
  {
    id: "5",
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 min ago
    actionType: "system_updated",
    targetElement: "Sponsors: Tiered",
    description: "Component hidden from sidebar by adding hidden property to block definition",
    previousState: { hidden: false },
    newState: { hidden: true }
  },
  {
    id: "6",
    timestamp: new Date(Date.now() - 20 * 60 * 1000), // 20 min ago
    actionType: "responsiveness_updated",
    targetElement: "Hero Buttons",
    description: "Button padding made responsive: px-8 py-3 → px-6 py-2.5 on mobile with text-sm sizing",
    previousState: { button: "px-8 py-3 text-base" },
    newState: { button: "px-6 py-2.5 md:px-8 md:py-3 text-sm md:text-base" }
  },
  {
    id: "7",
    timestamp: new Date(Date.now() - 25 * 60 * 1000), // 25 min ago
    actionType: "breakpoint_modified",
    targetElement: "Hero: Video BG",
    description: "Min-height adjusted for mobile: min-h-[600px] → min-h-[450px] on mobile viewports",
    previousState: { minHeight: "600px" },
    newState: { minHeight: "450px (mobile), 550px (tablet), 600px (desktop)" }
  },
  {
    id: "8",
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 min ago
    actionType: "color_changed",
    targetElement: "Primary Button",
    description: "Button color changed from blue to green",
    previousState: { color: "#2563eb" },
    newState: { color: "#16a34a" }
  },
  {
    id: "9",
    timestamp: new Date(Date.now() - 35 * 60 * 1000), // 35 min ago
    actionType: "functionality_changed",
    targetElement: "Sidebar Filter",
    description: "Updated filtering logic to exclude blocks with hidden property from component library",
  },
  {
    id: "10",
    timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 min ago
    actionType: "layout_changed",
    targetElement: "Hero: Split",
    description: "Image min-height adjusted: 400px → 250px on mobile for better viewport usage",
    previousState: { imageHeight: "400px" },
    newState: { imageHeight: "250px (mobile), 400px (desktop)" }
  },
  {
    id: "11",
    timestamp: new Date(Date.now() - 50 * 60 * 1000), // 50 min ago
    actionType: "alignment_changed",
    targetElement: "Hero Section",
    description: "Text alignment updated to center",
    previousState: { align: "left" },
    newState: { align: "center" }
  },
  {
    id: "12",
    timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    actionType: "component_added",
    targetElement: "Agenda Block",
    description: "New component added to page",
  },
  {
    id: "13",
    timestamp: new Date(Date.now() - 70 * 60 * 1000), // 1 hour 10 min ago
    actionType: "text_changed",
    targetElement: "Hero Section",
    description: "Headline text updated",
    previousState: { text: "Welcome to our Event" },
    newState: { text: "Make a Bold Statement" }
  },
  {
    id: "14",
    timestamp: new Date(Date.now() - 90 * 60 * 1000), // 1.5 hours ago
    actionType: "configuration_updated",
    targetElement: "Theme Settings",
    description: "CSS variables configured for design system consistency",
  },
];

const ACTION_ICONS: Record<AuditLogEntry["actionType"], React.ReactNode> = {
  component_added: <Plus className="w-4 h-4" />,
  component_removed: <Minus className="w-4 h-4" />,
  component_edited: <Edit3 className="w-4 h-4" />,
  component_archived: <Archive className="w-4 h-4" />,
  color_changed: <Palette className="w-4 h-4" />,
  text_changed: <Type className="w-4 h-4" />,
  alignment_changed: <AlignCenter className="w-4 h-4" />,
  visibility_changed: <AlertCircle className="w-4 h-4" />,
  responsiveness_updated: <Smartphone className="w-4 h-4" />,
  functionality_changed: <Code className="w-4 h-4" />,
  system_updated: <Settings className="w-4 h-4" />,
  layout_changed: <Layers className="w-4 h-4" />,
  spacing_adjusted: <Monitor className="w-4 h-4" />,
  typography_scaled: <Type className="w-4 h-4" />,
  mobile_optimized: <Smartphone className="w-4 h-4" />,
  breakpoint_modified: <Monitor className="w-4 h-4" />,
  interaction_added: <Edit3 className="w-4 h-4" />,
  state_changed: <CheckCircle2 className="w-4 h-4" />,
  configuration_updated: <Settings className="w-4 h-4" />,
};

const ACTION_COLORS: Record<AuditLogEntry["actionType"], string> = {
  component_added: "text-green-600 bg-green-50 border-green-200",
  component_removed: "text-red-600 bg-red-50 border-red-200",
  component_edited: "text-blue-600 bg-blue-50 border-blue-200",
  component_archived: "text-orange-600 bg-orange-50 border-orange-200",
  color_changed: "text-purple-600 bg-purple-50 border-purple-200",
  text_changed: "text-cyan-600 bg-cyan-50 border-cyan-200",
  alignment_changed: "text-indigo-600 bg-indigo-50 border-indigo-200",
  visibility_changed: "text-amber-600 bg-amber-50 border-amber-200",
  responsiveness_updated: "text-teal-600 bg-teal-50 border-teal-200",
  functionality_changed: "text-slate-600 bg-slate-50 border-slate-200",
  system_updated: "text-violet-600 bg-violet-50 border-violet-200",
  layout_changed: "text-sky-600 bg-sky-50 border-sky-200",
  spacing_adjusted: "text-emerald-600 bg-emerald-50 border-emerald-200",
  typography_scaled: "text-fuchsia-600 bg-fuchsia-50 border-fuchsia-200",
  mobile_optimized: "text-lime-600 bg-lime-50 border-lime-200",
  breakpoint_modified: "text-rose-600 bg-rose-50 border-rose-200",
  interaction_added: "text-pink-600 bg-pink-50 border-pink-200",
  state_changed: "text-yellow-600 bg-yellow-50 border-yellow-200",
  configuration_updated: "text-zinc-600 bg-zinc-50 border-zinc-200",
};

const formatActionType = (type: AuditLogEntry["actionType"]) => {
  return type.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
};

const formatTimeAgo = (date: Date) => {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  
  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hour${Math.floor(seconds / 3600) > 1 ? 's' : ''} ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} day${Math.floor(seconds / 86400) > 1 ? 's' : ''} ago`;
  
  return date.toLocaleDateString();
};

export const AuditLogPanel: React.FC<AuditLogPanelProps> = ({ open, onOpenChange }) => {
  const [logs] = useState<AuditLogEntry[]>(MOCK_AUDIT_LOG);
  const [revertingEntry, setRevertingEntry] = useState<AuditLogEntry | null>(null);
  const [showRevertDialog, setShowRevertDialog] = useState(false);

  const handleRevertClick = (entry: AuditLogEntry) => {
    setRevertingEntry(entry);
    setShowRevertDialog(true);
  };

  const handleConfirmRevert = () => {
    if (revertingEntry) {
      // This is where you would implement the actual revert logic
      // For now, we'll just show a success message
      console.log("Reverting change:", revertingEntry);
      
      // Close dialog
      setShowRevertDialog(false);
      setRevertingEntry(null);
      
      // In a real implementation, you would:
      // 1. Apply the previous state
      // 2. Update the canvas
      // 3. Add a new log entry for the revert action
      // 4. Show success notification
    }
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 animate-in fade-in duration-300"
        onClick={() => onOpenChange(false)}
      />

      {/* Panel */}
      <aside 
        className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] bg-background border-l border-border shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-border bg-muted/10 shrink-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-sans font-bold tracking-tight text-foreground" style={{ fontSize: 'var(--text-xl)' }}>Audit Log</h2>
                <p className="font-sans text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>Track and revert changes</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => onOpenChange(false)}
              className="rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Stats */}
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2 font-sans text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>{logs.length} changes tracked</span>
            </div>
            <Badge variant="outline" className="font-sans" style={{ fontSize: 'var(--text-xs)' }}>
              Last 24 hours
            </Badge>
          </div>
        </div>

        {/* Content - Fixed height for scrolling */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-background">
          <div className="p-6">{logs.length > 0 ? (
              <div className="space-y-4">{logs.map((entry, index) => (
                  <div 
                    key={entry.id}
                    className="group relative"
                  >
                    {/* Timeline connector */}
                    {index < logs.length - 1 && (
                      <div className="absolute left-[23px] top-12 bottom-0 w-px bg-border" />
                    )}
                    
                    <div className="flex gap-4">
                      {/* Icon */}
                      <div className="relative shrink-0">
                        <div className={cn(
                          "w-10 h-10 rounded-lg border flex items-center justify-center transition-all",
                          ACTION_COLORS[entry.actionType]
                        )}>
                          {ACTION_ICONS[entry.actionType]}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                          {/* Header */}
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge 
                                  variant="outline" 
                                  className="text-[10px] uppercase tracking-wider font-semibold"
                                >
                                  {formatActionType(entry.actionType)}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {formatTimeAgo(entry.timestamp)}
                                </span>
                              </div>
                              <h4 className="font-semibold text-sm text-foreground truncate">
                                {entry.targetElement}
                              </h4>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-sm text-muted-foreground mb-3">
                            {entry.description}
                          </p>

                          {/* State Changes (if available) */}
                          {entry.previousState && entry.newState && (
                            <div className="flex items-center gap-2 text-xs bg-muted/50 rounded-md p-2 mb-3 font-mono">
                              <span className="text-muted-foreground">
                                {JSON.stringify(entry.previousState).slice(0, 30)}...
                              </span>
                              <span className="text-muted-foreground">→</span>
                              <span className="text-foreground">
                                {JSON.stringify(entry.newState).slice(0, 30)}...
                              </span>
                            </div>
                          )}

                          {/* Actions */}
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRevertClick(entry)}
                              className="text-xs h-7 gap-1.5"
                            >
                              <RotateCcw className="w-3 h-3" />
                              Revert
                            </Button>
                            <span className="text-xs text-muted-foreground">
                              {entry.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-6">
                  <Clock className="w-8 h-8 text-muted-foreground opacity-50" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">No Changes Yet</h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Your audit log is empty. Start building and all changes will be tracked here automatically.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        {logs.length > 0 && (
          <div className="p-4 border-t border-border bg-muted/10 shrink-0">
            <div className="flex items-center justify-between font-sans text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
              <span>Showing all {logs.length} entries</span>
            </div>
          </div>
        )}
      </aside>

      {/* Revert Confirmation Dialog */}
      <AlertDialog open={showRevertDialog} onOpenChange={setShowRevertDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              Confirm Revert
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to revert this change? This will restore the previous state of:
              <div className="mt-3 p-3 bg-muted rounded-lg">
                <p className="font-semibold text-foreground text-sm mb-1">
                  {revertingEntry ? revertingEntry.targetElement : ''}
                </p>
                <p className="text-xs text-muted-foreground">
                  {revertingEntry ? revertingEntry.description : ''}
                </p>
              </div>
              <p className="mt-3 text-xs">
                This action will create a new audit log entry and can be reverted again if needed.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmRevert}
              className="bg-primary text-primary-foreground gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              Confirm Revert
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};