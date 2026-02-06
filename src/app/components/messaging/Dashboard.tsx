import React from "react";
import {
  MessageSquare,
  Users,
  Inbox,
  Image,
  CalendarClock,
  Send,
  TrendingUp,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  mockMessages,
  mockContacts,
  mockReplies,
  mockGallery,
  mockGroups,
  mockEventSettings,
} from "./mock-data";
import type { MessagingPage } from "./types";

interface DashboardProps {
  onNavigate: (page: MessagingPage) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const scheduledMessages = mockMessages.filter((m) => m.status === "scheduled");
  const draftMessages = mockMessages.filter((m) => m.status === "draft");
  const unreadReplies = mockReplies.filter((r) => !r.isRead);
  const totalPhotos = mockGallery.length;

  const eventDate = new Date(mockEventSettings.eventDate);
  const now = new Date();
  const daysUntilEvent = Math.ceil(
    (eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  const stats = [
    {
      label: "Guests",
      value: mockContacts.length,
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Scheduled",
      value: scheduledMessages.length,
      icon: CalendarClock,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      label: "Unread Replies",
      value: unreadReplies.length,
      icon: Inbox,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      label: "Photos",
      value: totalPhotos,
      icon: Image,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ];

  const formatDateTime = (dateStr: string) => {
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
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">{mockEventSettings.eventName}</h1>
          <p className="text-muted-foreground mt-1">
            {daysUntilEvent > 0
              ? `${daysUntilEvent} days until your event`
              : daysUntilEvent === 0
              ? "Your event is today!"
              : "Event has passed"}
          </p>
        </div>
        <Button onClick={() => onNavigate("messages")} className="gap-2">
          <Send className="w-4 h-4" />
          Compose Message
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}
                  >
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Messages */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <CalendarClock className="w-4 h-4" />
                Upcoming Messages
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-xs"
                onClick={() => onNavigate("messages")}
              >
                View All <ArrowRight className="w-3 h-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {scheduledMessages.slice(0, 4).map((msg) => {
                const groups = msg.groupIds
                  .map((gid) => mockGroups.find((g) => g.id === gid))
                  .filter(Boolean);
                return (
                  <div
                    key={msg.id}
                    className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm line-clamp-2">{msg.content}</p>
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span className="text-xs text-muted-foreground">
                          {formatDateTime(msg.scheduledAt)}
                        </span>
                        {groups.map((g) => (
                          <Badge
                            key={g!.id}
                            variant="secondary"
                            className="text-[10px] px-1.5 py-0"
                            style={{ borderColor: g!.color, color: g!.color }}
                          >
                            {g!.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
              {draftMessages.length > 0 && (
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    {draftMessages.length} draft{draftMessages.length !== 1 ? "s" : ""} saved
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Replies */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Recent Replies
                {unreadReplies.length > 0 && (
                  <Badge variant="destructive" className="text-[10px]">
                    {unreadReplies.length} new
                  </Badge>
                )}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-xs"
                onClick={() => onNavigate("replies")}
              >
                View All <ArrowRight className="w-3 h-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockReplies.slice(0, 5).map((reply) => (
                <div
                  key={reply.id}
                  className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-xs font-semibold text-primary">
                    {reply.contactName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{reply.contactName}</span>
                      {!reply.isRead && (
                        <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                      {reply.content}
                    </p>
                    {reply.mediaUrl && (
                      <div className="flex items-center gap-1 mt-1 text-xs text-primary">
                        <Image className="w-3 h-3" />
                        <span>Photo attached</span>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap shrink-0">
                    {new Date(reply.receivedAt).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Groups Overview */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Users className="w-4 h-4" />
                Groups
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-xs"
                onClick={() => onNavigate("contacts")}
              >
                Manage <ArrowRight className="w-3 h-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockGroups.map((group) => (
                <div
                  key={group.id}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-border"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: group.color }}
                    />
                    <span className="text-sm font-medium">{group.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {group.contactIds.length} contacts
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Message Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Messages Scheduled</span>
                <span className="text-sm font-semibold">{scheduledMessages.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Drafts</span>
                <span className="text-sm font-semibold">{draftMessages.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Guests</span>
                <span className="text-sm font-semibold">{mockContacts.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Guest Groups</span>
                <span className="text-sm font-semibold">{mockGroups.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Replies</span>
                <span className="text-sm font-semibold">{mockReplies.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Photos Collected</span>
                <span className="text-sm font-semibold">{mockGallery.length}</span>
              </div>

              <div className="pt-3 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Est. Open Rate</span>
                  <span className="text-sm font-semibold text-green-500">97%</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">
                  97% of text messages are read within 15 minutes
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
