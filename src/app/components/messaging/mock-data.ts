import type { Contact, Group, ScheduledMessage, Reply, GalleryItem, EventSettings } from "./types";

export const mockEventSettings: EventSettings = {
  eventName: "Sarah & James Wedding",
  eventDate: "2026-06-15T16:00:00",
  dedicatedNumber: "(555) 867-5309",
  timezone: "America/New_York",
  coOwners: ["james@example.com"],
};

export const mockGroups: Group[] = [
  { id: "g1", name: "All Guests", color: "#2563eb", contactIds: ["c1","c2","c3","c4","c5","c6","c7","c8","c9","c10"] },
  { id: "g2", name: "Bridal Party", color: "#ec4899", contactIds: ["c1","c2","c3","c4"] },
  { id: "g3", name: "Family", color: "#f59e0b", contactIds: ["c5","c6","c7"] },
  { id: "g4", name: "Out of Town", color: "#10b981", contactIds: ["c8","c9","c10"] },
  { id: "g5", name: "VIP", color: "#8b5cf6", contactIds: ["c1","c5","c6"] },
];

export const mockContacts: Contact[] = [
  { id: "c1", name: "Emily Chen", phone: "(555) 111-0001", email: "emily@example.com", groups: ["g1","g2","g5"], addedAt: "2026-01-15" },
  { id: "c2", name: "Marcus Johnson", phone: "(555) 111-0002", email: "marcus@example.com", groups: ["g1","g2"], addedAt: "2026-01-15" },
  { id: "c3", name: "Olivia Williams", phone: "(555) 111-0003", groups: ["g1","g2"], addedAt: "2026-01-16" },
  { id: "c4", name: "Daniel Kim", phone: "(555) 111-0004", email: "daniel@example.com", groups: ["g1","g2"], addedAt: "2026-01-16" },
  { id: "c5", name: "Robert Taylor", phone: "(555) 111-0005", groups: ["g1","g3","g5"], addedAt: "2026-01-20" },
  { id: "c6", name: "Linda Taylor", phone: "(555) 111-0006", groups: ["g1","g3","g5"], addedAt: "2026-01-20" },
  { id: "c7", name: "Michael Chen", phone: "(555) 111-0007", email: "michael@example.com", groups: ["g1","g3"], addedAt: "2026-01-22" },
  { id: "c8", name: "Jessica Adams", phone: "(555) 111-0008", groups: ["g1","g4"], addedAt: "2026-02-01" },
  { id: "c9", name: "David Nguyen", phone: "(555) 111-0009", email: "david@example.com", groups: ["g1","g4"], addedAt: "2026-02-01" },
  { id: "c10", name: "Amanda Foster", phone: "(555) 111-0010", groups: ["g1","g4"], addedAt: "2026-02-03" },
];

export const mockMessages: ScheduledMessage[] = [
  {
    id: "m1",
    content: "Welcome to Sarah & James' wedding weekend! We're so glad you're here. Check-in at the Grand Hotel starts at 3pm. See you soon!",
    scheduledAt: "2026-06-14T15:00:00",
    groupIds: ["g1"],
    status: "scheduled",
    characterCount: 128,
    createdAt: "2026-02-01",
  },
  {
    id: "m2",
    content: "Bridal party reminder: Please arrive at the venue by 2pm tomorrow for photos. Bring your outfits and comfortable shoes for the garden!",
    scheduledAt: "2026-06-14T18:00:00",
    groupIds: ["g2"],
    status: "scheduled",
    characterCount: 135,
    createdAt: "2026-02-01",
  },
  {
    id: "m3",
    content: "Good morning! Today is the big day! The ceremony starts at 4pm at Rosewood Gardens. Shuttle pickup at Grand Hotel lobby at 3:15pm.",
    scheduledAt: "2026-06-15T09:00:00",
    groupIds: ["g1"],
    status: "scheduled",
    characterCount: 134,
    createdAt: "2026-02-02",
  },
  {
    id: "m4",
    content: "The reception is moving to the indoor ballroom due to weather. Same time, same fun - just with AC! Cocktail hour begins at 5:30pm.",
    scheduledAt: "2026-06-15T14:00:00",
    groupIds: ["g1"],
    status: "draft",
    characterCount: 137,
    createdAt: "2026-02-03",
  },
  {
    id: "m5",
    content: "Family photos at the gazebo at 3pm sharp! Please gather by the fountain. We can't wait to capture these memories with you.",
    scheduledAt: "2026-06-15T14:30:00",
    groupIds: ["g3"],
    status: "scheduled",
    characterCount: 123,
    createdAt: "2026-02-03",
  },
  {
    id: "m6",
    content: "Thank you for celebrating with us! We had the most magical day. Safe travels home, and don't forget to text us your favorite photos!",
    scheduledAt: "2026-06-16T10:00:00",
    groupIds: ["g1"],
    status: "scheduled",
    characterCount: 136,
    createdAt: "2026-02-04",
  },
  {
    id: "m7",
    content: "Shuttle reminder: The shuttle to the airport departs from the Grand Hotel at 11am and 2pm tomorrow. Reply SHUTTLE to confirm your spot.",
    scheduledAt: "2026-06-16T08:00:00",
    groupIds: ["g4"],
    status: "scheduled",
    characterCount: 139,
    createdAt: "2026-02-04",
  },
];

export const mockReplies: Reply[] = [
  { id: "r1", contactId: "c1", contactName: "Emily Chen", contactPhone: "(555) 111-0001", content: "So excited for this weekend!! Can't wait to see you both!", receivedAt: "2026-06-14T15:32:00", isRead: true },
  { id: "r2", contactId: "c8", contactName: "Jessica Adams", contactPhone: "(555) 111-0008", content: "Just checked in! The hotel is gorgeous. See you at the welcome dinner?", receivedAt: "2026-06-14T16:15:00", isRead: true },
  { id: "r3", contactId: "c5", contactName: "Robert Taylor", contactPhone: "(555) 111-0005", content: "We're so proud of you both! Love, Mom and Dad", receivedAt: "2026-06-15T09:22:00", isRead: true },
  { id: "r4", contactId: "c2", contactName: "Marcus Johnson", contactPhone: "(555) 111-0002", content: "The ceremony was absolutely beautiful. Tears of joy over here!", receivedAt: "2026-06-15T17:05:00", isRead: false, mediaUrl: "https://picsum.photos/seed/wedding1/400/300", mediaType: "image" },
  { id: "r5", contactId: "c3", contactName: "Olivia Williams", contactPhone: "(555) 111-0003", content: "Best. Wedding. Ever. Here are some pics from the dance floor!", receivedAt: "2026-06-15T22:41:00", isRead: false, mediaUrl: "https://picsum.photos/seed/wedding2/400/300", mediaType: "image" },
  { id: "r6", contactId: "c9", contactName: "David Nguyen", contactPhone: "(555) 111-0009", content: "SHUTTLE please! Flight at 3pm.", receivedAt: "2026-06-16T07:30:00", isRead: false },
  { id: "r7", contactId: "c6", contactName: "Linda Taylor", contactPhone: "(555) 111-0006", content: "What a wonderful celebration! Here's my favorite moment from the first dance.", receivedAt: "2026-06-15T23:10:00", isRead: false, mediaUrl: "https://picsum.photos/seed/wedding3/400/300", mediaType: "image" },
  { id: "r8", contactId: "c10", contactName: "Amanda Foster", contactPhone: "(555) 111-0010", content: "Thank you for including me! Safe travels everyone!", receivedAt: "2026-06-16T10:45:00", isRead: false },
  { id: "r9", contactId: "c4", contactName: "Daniel Kim", contactPhone: "(555) 111-0004", content: "Caught the bouquet toss! Look at this photo!", receivedAt: "2026-06-15T21:15:00", isRead: false, mediaUrl: "https://picsum.photos/seed/wedding4/400/300", mediaType: "image" },
  { id: "r10", contactId: "c7", contactName: "Michael Chen", contactPhone: "(555) 111-0007", content: "The food was incredible. Please share the caterer's info!", receivedAt: "2026-06-15T20:30:00", isRead: true },
];

export const mockGallery: GalleryItem[] = [
  { id: "gi1", url: "https://picsum.photos/seed/wed-gallery1/800/600", thumbnailUrl: "https://picsum.photos/seed/wed-gallery1/400/300", contactName: "Marcus Johnson", contactPhone: "(555) 111-0002", receivedAt: "2026-06-15T17:05:00", caption: "The ceremony" },
  { id: "gi2", url: "https://picsum.photos/seed/wed-gallery2/800/600", thumbnailUrl: "https://picsum.photos/seed/wed-gallery2/400/300", contactName: "Olivia Williams", contactPhone: "(555) 111-0003", receivedAt: "2026-06-15T22:41:00", caption: "Dance floor fun" },
  { id: "gi3", url: "https://picsum.photos/seed/wed-gallery3/800/600", thumbnailUrl: "https://picsum.photos/seed/wed-gallery3/400/300", contactName: "Linda Taylor", contactPhone: "(555) 111-0006", receivedAt: "2026-06-15T23:10:00", caption: "First dance" },
  { id: "gi4", url: "https://picsum.photos/seed/wed-gallery4/800/600", thumbnailUrl: "https://picsum.photos/seed/wed-gallery4/400/300", contactName: "Daniel Kim", contactPhone: "(555) 111-0004", receivedAt: "2026-06-15T21:15:00", caption: "Bouquet toss" },
  { id: "gi5", url: "https://picsum.photos/seed/wed-gallery5/800/600", thumbnailUrl: "https://picsum.photos/seed/wed-gallery5/400/300", contactName: "Emily Chen", contactPhone: "(555) 111-0001", receivedAt: "2026-06-15T19:30:00", caption: "Table decor" },
  { id: "gi6", url: "https://picsum.photos/seed/wed-gallery6/800/600", thumbnailUrl: "https://picsum.photos/seed/wed-gallery6/400/300", contactName: "Robert Taylor", contactPhone: "(555) 111-0005", receivedAt: "2026-06-15T18:00:00", caption: "Family together" },
  { id: "gi7", url: "https://picsum.photos/seed/wed-gallery7/800/600", thumbnailUrl: "https://picsum.photos/seed/wed-gallery7/400/300", contactName: "Jessica Adams", contactPhone: "(555) 111-0008", receivedAt: "2026-06-15T20:15:00", caption: "Sunset at the venue" },
  { id: "gi8", url: "https://picsum.photos/seed/wed-gallery8/800/600", thumbnailUrl: "https://picsum.photos/seed/wed-gallery8/400/300", contactName: "David Nguyen", contactPhone: "(555) 111-0009", receivedAt: "2026-06-15T21:45:00", caption: "Cake cutting" },
];
