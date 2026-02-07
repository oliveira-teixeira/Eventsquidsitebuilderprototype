import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Phone,
  Globe,
  UserPlus,
  Trash2,
  Save,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { mockEventSettings } from "./mock-data";
import type { EventSettings } from "./types";

const timezones = [
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Phoenix",
  "Pacific/Honolulu",
];

export function EventSettingsPage() {
  const [settings, setSettings] = useState<EventSettings>(mockEventSettings);
  const [newCoOwner, setNewCoOwner] = useState("");

  const handleAddCoOwner = () => {
    if (newCoOwner.trim() && !settings.coOwners.includes(newCoOwner.trim())) {
      setSettings((prev) => ({
        ...prev,
        coOwners: [...prev.coOwners, newCoOwner.trim()],
      }));
      setNewCoOwner("");
    }
  };

  const handleRemoveCoOwner = (email: string) => {
    setSettings((prev) => ({
      ...prev,
      coOwners: prev.coOwners.filter((e) => e !== email),
    }));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Event Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Configure your event details and messaging preferences
        </p>
      </div>

      {/* Event Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Event Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Event Name</label>
            <Input
              value={settings.eventName}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, eventName: e.target.value }))
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Event Date</label>
              <Input
                type="date"
                value={settings.eventDate.split("T")[0]}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    eventDate: `${e.target.value}T${prev.eventDate.split("T")[1] || "00:00:00"}`,
                  }))
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Event Time</label>
              <Input
                type="time"
                value={settings.eventDate.split("T")[1]?.slice(0, 5) || ""}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    eventDate: `${prev.eventDate.split("T")[0]}T${e.target.value}:00`,
                  }))
                }
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Timezone</label>
            <Select
              value={settings.timezone}
              onValueChange={(val) =>
                setSettings((prev) => ({ ...prev, timezone: val }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timezones.map((tz) => (
                  <SelectItem key={tz} value={tz}>
                    {tz.replace("_", " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Dedicated Number */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Dedicated Phone Number
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-accent/50 border border-border">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-lg font-mono font-bold">{settings.dedicatedNumber}</p>
              <p className="text-xs text-muted-foreground">
                Your guests will receive messages from this number. Your personal number
                stays private.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Co-Owners */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            Co-Owners
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Co-owners have full access to create messages, manage groups, add/remove
            guests, and view replies.
          </p>

          <div className="flex gap-2">
            <Input
              placeholder="email@example.com"
              value={newCoOwner}
              onChange={(e) => setNewCoOwner(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddCoOwner()}
            />
            <Button onClick={handleAddCoOwner} disabled={!newCoOwner.trim()}>
              Add
            </Button>
          </div>

          {settings.coOwners.length > 0 && (
            <div className="space-y-2">
              {settings.coOwners.map((email) => (
                <div
                  key={email}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-border"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-[10px] font-medium">
                      {email[0].toUpperCase()}
                    </div>
                    <span className="text-sm">{email}</span>
                    <Badge variant="secondary" className="text-[10px]">
                      Co-Owner
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-destructive hover:text-destructive"
                    onClick={() => handleRemoveCoOwner(email)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Privacy Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Privacy & Security
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
              <p>Your personal phone number is never shared with guests</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
              <p>Messages are broadcast-style: replies come only to you, preventing "reply-all"</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
              <p>Guests don't need to download any app to receive your messages</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
              <p>97% of text messages are opened within 15 minutes</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="gap-2">
          <Save className="w-4 h-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}
