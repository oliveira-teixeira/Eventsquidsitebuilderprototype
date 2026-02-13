import React, { useState } from "react";
import {
  Search,
  Image,
  Check,
  CheckCheck,
  Filter,
  Mail,
  MailOpen,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { cn } from "../ui/utils";
import { mockReplies } from "./mock-data";
import type { Reply } from "./types";

export function Replies() {
  const [replies, setReplies] = useState<Reply[]>(mockReplies);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRead, setFilterRead] = useState<string>("all");
  const [selectedReply, setSelectedReply] = useState<Reply | null>(null);

  const unreadCount = replies.filter((r) => !r.isRead).length;

  const handleMarkRead = (id: string) => {
    setReplies((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isRead: true } : r))
    );
  };

  const handleMarkAllRead = () => {
    setReplies((prev) => prev.map((r) => ({ ...r, isRead: true })));
  };

  const handleViewReply = (reply: Reply) => {
    if (!reply.isRead) {
      handleMarkRead(reply.id);
    }
    setSelectedReply(reply);
  };

  const filteredReplies = replies.filter((r) => {
    if (filterRead === "unread" && r.isRead) return false;
    if (filterRead === "read" && !r.isRead) return false;
    if (filterRead === "photos" && !r.mediaUrl) return false;
    if (
      searchQuery &&
      !r.contactName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !r.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  const sortedReplies = [...filteredReplies].sort(
    (a, b) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime()
  );

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor(
      (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (diffDays === 0) {
      return d.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      });
    }
    if (diffDays === 1) return "Yesterday";
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const formatFullDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Replies</h1>
          <p className="text-muted-foreground text-sm mt-1">
            View messages and photos from your guests
            {unreadCount > 0 && (
              <span className="ml-2">
                <Badge variant="destructive" className="text-[10px]">
                  {unreadCount} unread
                </Badge>
              </span>
            )}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" className="gap-2" onClick={handleMarkAllRead}>
            <CheckCheck className="w-4 h-4" />
            Mark All Read
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search replies..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Tabs value={filterRead} onValueChange={setFilterRead}>
          <TabsList>
            <TabsTrigger value="all">All ({replies.length})</TabsTrigger>
            <TabsTrigger value="unread">
              Unread ({unreadCount})
            </TabsTrigger>
            <TabsTrigger value="photos">
              Photos ({replies.filter((r) => r.mediaUrl).length})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Replies List */}
      <div className="space-y-2">
        {sortedReplies.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Mail className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
              <p className="text-muted-foreground">No replies yet</p>
              <p className="text-xs text-muted-foreground mt-1">
                Replies from your guests will appear here
              </p>
            </CardContent>
          </Card>
        ) : (
          sortedReplies.map((reply) => (
            <div
              key={reply.id}
              onClick={() => handleViewReply(reply)}
              className={cn(
                "flex items-start gap-3 p-4 rounded-lg border border-border cursor-pointer transition-colors",
                !reply.isRead
                  ? "bg-primary/5 border-primary/20 hover:bg-primary/10"
                  : "hover:bg-accent/50"
              )}
            >
              {/* Avatar */}
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0",
                  !reply.isRead
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {reply.contactName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "text-sm",
                      !reply.isRead ? "font-semibold" : "font-medium"
                    )}
                  >
                    {reply.contactName}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {reply.contactPhone}
                  </span>
                  {!reply.isRead && (
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  )}
                </div>
                <p
                  className={cn(
                    "text-sm mt-0.5 line-clamp-2",
                    !reply.isRead ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {reply.content}
                </p>
                {reply.mediaUrl && (
                  <div className="mt-2">
                    <div className="w-16 h-16 rounded-lg overflow-hidden border border-border bg-muted">
                      <img
                        src={reply.mediaUrl}
                        alt="Attached"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Time */}
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="text-[11px] text-muted-foreground">
                  {formatTime(reply.receivedAt)}
                </span>
                {reply.mediaUrl && (
                  <Image className="w-3.5 h-3.5 text-primary" />
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Reply Detail Dialog */}
      <Dialog
        open={!!selectedReply}
        onOpenChange={() => setSelectedReply(null)}
      >
        {selectedReply && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                  {selectedReply.contactName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                {selectedReply.contactName}
              </DialogTitle>
              <DialogDescription>
                {selectedReply.contactPhone} &middot;{" "}
                {formatFullDate(selectedReply.receivedAt)}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-accent/50 border border-border">
                <p className="text-sm leading-relaxed">{selectedReply.content}</p>
              </div>
              {selectedReply.mediaUrl && (
                <div className="rounded-lg overflow-hidden border border-border">
                  <img
                    src={selectedReply.mediaUrl}
                    alt="Attached media"
                    className="w-full h-auto"
                  />
                </div>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
