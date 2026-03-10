export interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  groups: string[];
  addedAt: string;
}

export interface Group {
  id: string;
  name: string;
  color: string;
  contactIds: string[];
}

export interface ScheduledMessage {
  id: string;
  content: string;
  scheduledAt: string;
  groupIds: string[];
  status: "scheduled" | "sent" | "draft" | "failed";
  characterCount: number;
  createdAt: string;
}

export interface Reply {
  id: string;
  contactId: string;
  contactName: string;
  contactPhone: string;
  content: string;
  mediaUrl?: string;
  mediaType?: "image" | "video";
  receivedAt: string;
  isRead: boolean;
}

export interface GalleryItem {
  id: string;
  url: string;
  thumbnailUrl: string;
  contactName: string;
  contactPhone: string;
  receivedAt: string;
  caption?: string;
}

export interface EventSettings {
  eventName: string;
  eventDate: string;
  dedicatedNumber: string;
  timezone: string;
  coOwners: string[];
}

export type MessagingPage = "dashboard" | "messages" | "contacts" | "replies" | "gallery" | "settings";
