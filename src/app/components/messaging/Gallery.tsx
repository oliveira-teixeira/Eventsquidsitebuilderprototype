import React, { useState } from "react";
import {
  Download,
  X,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  LayoutList,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { cn } from "../ui/utils";
import { mockGallery } from "./mock-data";
import type { GalleryItem } from "./types";

export function Gallery() {
  const [gallery] = useState<GalleryItem[]>(mockGallery);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const selectedItem = selectedIndex !== null ? gallery[selectedIndex] : null;

  const navigateGallery = (direction: "prev" | "next") => {
    if (selectedIndex === null) return;
    if (direction === "prev" && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
    if (direction === "next" && selectedIndex < gallery.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Gallery</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Photos and media from your guests &middot; {gallery.length} items
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex border border-border rounded-lg overflow-hidden">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={() => setViewMode("list")}
            >
              <LayoutList className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {gallery.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <ImageIcon className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-lg font-medium text-muted-foreground">No photos yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              When guests reply with photos, they'll appear here
            </p>
          </CardContent>
        </Card>
      ) : viewMode === "grid" ? (
        /* Grid View */
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery.map((item, index) => (
            <div
              key={item.id}
              className="group relative aspect-square rounded-xl overflow-hidden border border-border cursor-pointer bg-muted"
              onClick={() => setSelectedIndex(index)}
            >
              <img
                src={item.thumbnailUrl}
                alt={item.caption || "Guest photo"}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-xs font-medium truncate">
                  {item.contactName}
                </p>
                {item.caption && (
                  <p className="text-white/70 text-[10px] truncate mt-0.5">
                    {item.caption}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-3">
          {gallery.map((item, index) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer"
              onClick={() => setSelectedIndex(index)}
            >
              <div className="w-16 h-16 rounded-lg overflow-hidden border border-border bg-muted shrink-0">
                <img
                  src={item.thumbnailUrl}
                  alt={item.caption || "Guest photo"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{item.contactName}</p>
                {item.caption && (
                  <p className="text-sm text-muted-foreground">{item.caption}</p>
                )}
                <p className="text-xs text-muted-foreground mt-0.5">
                  {formatDate(item.receivedAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Dialog */}
      <Dialog
        open={selectedIndex !== null}
        onOpenChange={() => setSelectedIndex(null)}
      >
        {selectedItem && (
          <DialogContent className="sm:max-w-2xl p-0 overflow-hidden">
            <DialogHeader className="sr-only">
              <DialogTitle>Photo by {selectedItem.contactName}</DialogTitle>
              <DialogDescription>
                {selectedItem.caption || "Guest photo"}
              </DialogDescription>
            </DialogHeader>
            <div className="relative">
              <img
                src={selectedItem.url}
                alt={selectedItem.caption || "Guest photo"}
                className="w-full h-auto max-h-[70vh] object-contain bg-black"
              />

              {/* Navigation Arrows */}
              {selectedIndex > 0 && (
                <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateGallery("prev");
                  }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              {selectedIndex < gallery.length - 1 && (
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateGallery("next");
                  }}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Caption Bar */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{selectedItem.contactName}</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedItem.caption && `${selectedItem.caption} · `}
                    {formatDate(selectedItem.receivedAt)}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {(selectedIndex ?? 0) + 1} of {gallery.length}
                </span>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
