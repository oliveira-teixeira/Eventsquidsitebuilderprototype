import React, { useState } from "react";
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Inbox,
  Image,
  Settings,
  Phone,
  ChevronLeft,
  Menu,
} from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../ui/utils";
import type { MessagingPage } from "./types";
import { mockEventSettings } from "./mock-data";
import { Dashboard } from "./Dashboard";
import { Messages } from "./Messages";
import { Contacts } from "./Contacts";
import { Replies } from "./Replies";
import { Gallery } from "./Gallery";
import { EventSettingsPage } from "./EventSettings";

const navItems: { id: MessagingPage; label: string; icon: React.ElementType }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "contacts", label: "Contacts & Groups", icon: Users },
  { id: "replies", label: "Replies", icon: Inbox },
  { id: "gallery", label: "Gallery", icon: Image },
  { id: "settings", label: "Settings", icon: Settings },
];

interface MessagingAppProps {
  onBack?: () => void;
}

export function MessagingApp({ onBack }: MessagingAppProps) {
  const [activePage, setActivePage] = useState<MessagingPage>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const unreadReplies = 5;

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard onNavigate={setActivePage} />;
      case "messages":
        return <Messages />;
      case "contacts":
        return <Contacts />;
      case "replies":
        return <Replies />;
      case "gallery":
        return <Gallery />;
      case "settings":
        return <EventSettingsPage />;
      default:
        return <Dashboard onNavigate={setActivePage} />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <aside
        className={cn(
          "flex flex-col border-r border-border bg-card transition-all duration-200 shrink-0",
          sidebarOpen ? "w-64" : "w-16"
        )}
      >
        {/* Sidebar Header */}
        <div className="flex items-center gap-3 p-4 border-b border-border min-h-[60px]">
          {sidebarOpen ? (
            <>
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-sm font-semibold truncate">TextMyGuests</h2>
                  <p className="text-xs text-muted-foreground truncate">
                    {mockEventSettings.eventName}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 h-8 w-8"
                onClick={() => setSidebarOpen(false)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="mx-auto h-8 w-8"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors relative",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
                title={!sidebarOpen ? item.label : undefined}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
                {item.id === "replies" && unreadReplies > 0 && (
                  <span
                    className={cn(
                      "flex items-center justify-center text-[10px] font-bold rounded-full min-w-[18px] h-[18px] px-1",
                      isActive
                        ? "bg-primary-foreground text-primary"
                        : "bg-destructive text-white",
                      !sidebarOpen && "absolute -top-1 -right-1"
                    )}
                  >
                    {unreadReplies}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Dedicated Number */}
        {sidebarOpen && (
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Phone className="w-3 h-3" />
              <span>Your number:</span>
            </div>
            <p className="text-sm font-mono font-medium mt-1">
              {mockEventSettings.dedicatedNumber}
            </p>
          </div>
        )}

        {/* Back Button */}
        {onBack && sidebarOpen && (
          <div className="p-2 border-t border-border">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-2 text-muted-foreground"
              onClick={onBack}
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Site Builder
            </Button>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto custom-scrollbar">
        {renderPage()}
      </main>
    </div>
  );
}
