import React, { useState } from "react";
import {
  Plus,
  Send,
  Clock,
  Edit,
  Trash2,
  CalendarClock,
  FileText,
  AlertCircle,
  CheckCircle2,
  Search,
  Filter,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { cn } from "../ui/utils";
import { mockMessages, mockGroups } from "./mock-data";
import type { ScheduledMessage } from "./types";

const MAX_CHARS = 160;

export function Messages() {
  const [messages, setMessages] = useState<ScheduledMessage[]>(mockMessages);
  const [showCompose, setShowCompose] = useState(false);
  const [editingMessage, setEditingMessage] = useState<ScheduledMessage | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Compose form state
  const [composeContent, setComposeContent] = useState("");
  const [composeGroups, setComposeGroups] = useState<string[]>([]);
  const [composeDate, setComposeDate] = useState("");
  const [composeTime, setComposeTime] = useState("");

  const resetCompose = () => {
    setComposeContent("");
    setComposeGroups([]);
    setComposeDate("");
    setComposeTime("");
    setEditingMessage(null);
  };

  const handleOpenCompose = (message?: ScheduledMessage) => {
    if (message) {
      setEditingMessage(message);
      setComposeContent(message.content);
      setComposeGroups(message.groupIds);
      const dt = new Date(message.scheduledAt);
      setComposeDate(dt.toISOString().split("T")[0]);
      setComposeTime(dt.toTimeString().slice(0, 5));
    } else {
      resetCompose();
    }
    setShowCompose(true);
  };

  const handleSaveMessage = (asDraft: boolean) => {
    const scheduledAt = composeDate && composeTime
      ? new Date(`${composeDate}T${composeTime}`).toISOString()
      : new Date().toISOString();

    if (editingMessage) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === editingMessage.id
            ? {
                ...m,
                content: composeContent,
                groupIds: composeGroups,
                scheduledAt,
                status: asDraft ? "draft" : "scheduled",
                characterCount: composeContent.length,
              }
            : m
        )
      );
    } else {
      const newMsg: ScheduledMessage = {
        id: `m${Date.now()}`,
        content: composeContent,
        scheduledAt,
        groupIds: composeGroups,
        status: asDraft ? "draft" : "scheduled",
        characterCount: composeContent.length,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setMessages((prev) => [...prev, newMsg]);
    }

    setShowCompose(false);
    resetCompose();
  };

  const handleDeleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const handleSendNow = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: "sent" as const } : m))
    );
  };

  const toggleGroup = (groupId: string) => {
    setComposeGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((g) => g !== groupId)
        : [...prev, groupId]
    );
  };

  const filteredMessages = messages.filter((m) => {
    if (filterStatus !== "all" && m.status !== filterStatus) return false;
    if (searchQuery && !m.content.toLowerCase().includes(searchQuery.toLowerCase()))
      return false;
    return true;
  });

  const sortedMessages = [...filteredMessages].sort(
    (a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()
  );

  const formatDateTime = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "scheduled":
        return <CalendarClock className="w-4 h-4 text-green-500" />;
      case "sent":
        return <CheckCircle2 className="w-4 h-4 text-blue-500" />;
      case "draft":
        return <FileText className="w-4 h-4 text-muted-foreground" />;
      case "failed":
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
      scheduled: { variant: "secondary", label: "Scheduled" },
      sent: { variant: "default", label: "Sent" },
      draft: { variant: "outline", label: "Draft" },
      failed: { variant: "destructive", label: "Failed" },
    };
    const s = variants[status] || variants.draft;
    return <Badge variant={s.variant}>{s.label}</Badge>;
  };

  const charCount = composeContent.length;
  const segmentCount = Math.ceil(charCount / MAX_CHARS) || 1;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Messages</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Create, schedule, and manage your event messages
          </p>
        </div>
        <Button onClick={() => handleOpenCompose()} className="gap-2">
          <Plus className="w-4 h-4" />
          New Message
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Tabs value={filterStatus} onValueChange={setFilterStatus}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
            <TabsTrigger value="sent">Sent</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Messages List */}
      <div className="space-y-3">
        {sortedMessages.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <MessageSquareIcon className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
              <p className="text-muted-foreground">No messages found</p>
              <Button
                variant="outline"
                className="mt-4 gap-2"
                onClick={() => handleOpenCompose()}
              >
                <Plus className="w-4 h-4" />
                Create your first message
              </Button>
            </CardContent>
          </Card>
        ) : (
          sortedMessages.map((msg) => {
            const groups = msg.groupIds
              .map((gid) => mockGroups.find((g) => g.id === gid))
              .filter(Boolean);
            return (
              <Card key={msg.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">{getStatusIcon(msg.status)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {getStatusBadge(msg.status)}
                        <span className="text-xs text-muted-foreground">
                          {formatDateTime(msg.scheduledAt)}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <span className="text-xs text-muted-foreground">To:</span>
                        {groups.map((g) => (
                          <Badge
                            key={g!.id}
                            variant="outline"
                            className="text-[10px] px-1.5 py-0"
                            style={{ borderColor: g!.color, color: g!.color }}
                          >
                            {g!.name}
                          </Badge>
                        ))}
                        <span className="text-xs text-muted-foreground ml-auto">
                          {msg.characterCount} chars
                          {msg.characterCount > MAX_CHARS && ` (${Math.ceil(msg.characterCount / MAX_CHARS)} segments)`}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {msg.status !== "sent" && (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleOpenCompose(msg)}
                            title="Edit"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Button>
                          {msg.status === "scheduled" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleSendNow(msg.id)}
                              title="Send Now"
                            >
                              <Send className="w-3.5 h-3.5" />
                            </Button>
                          )}
                        </>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => handleDeleteMessage(msg.id)}
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Compose Dialog */}
      <Dialog open={showCompose} onOpenChange={setShowCompose}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingMessage ? "Edit Message" : "Compose Message"}
            </DialogTitle>
            <DialogDescription>
              {editingMessage
                ? "Update your scheduled message"
                : "Create a new message to send to your guests"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Recipients */}
            <div>
              <label className="text-sm font-medium mb-2 block">Send to</label>
              <div className="flex flex-wrap gap-2">
                {mockGroups.map((group) => (
                  <button
                    key={group.id}
                    onClick={() => toggleGroup(group.id)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
                      composeGroups.includes(group.id)
                        ? "border-transparent text-white"
                        : "border-border text-muted-foreground hover:bg-accent"
                    )}
                    style={
                      composeGroups.includes(group.id)
                        ? { backgroundColor: group.color }
                        : undefined
                    }
                  >
                    {group.name} ({group.contactIds.length})
                  </button>
                ))}
              </div>
            </div>

            {/* Message Content */}
            <div>
              <label className="text-sm font-medium mb-2 block">Message</label>
              <Textarea
                placeholder="Type your message here..."
                value={composeContent}
                onChange={(e) => setComposeContent(e.target.value)}
                className="min-h-[120px]"
              />
              <div className="flex items-center justify-between mt-1.5">
                <span
                  className={cn(
                    "text-xs",
                    charCount > MAX_CHARS
                      ? "text-orange-500"
                      : "text-muted-foreground"
                  )}
                >
                  {charCount} / {MAX_CHARS} characters
                  {segmentCount > 1 && ` (${segmentCount} segments)`}
                </span>
              </div>
            </div>

            {/* Schedule */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium mb-2 block">Date</label>
                <Input
                  type="date"
                  value={composeDate}
                  onChange={(e) => setComposeDate(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Time</label>
                <Input
                  type="time"
                  value={composeTime}
                  onChange={(e) => setComposeTime(e.target.value)}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => handleSaveMessage(true)}
              disabled={!composeContent.trim()}
            >
              Save as Draft
            </Button>
            <Button
              onClick={() => handleSaveMessage(false)}
              disabled={!composeContent.trim() || composeGroups.length === 0 || !composeDate || !composeTime}
              className="gap-2"
            >
              <CalendarClock className="w-4 h-4" />
              Schedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function MessageSquareIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
