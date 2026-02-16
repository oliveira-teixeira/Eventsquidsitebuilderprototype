import React from "react";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Linkedin, Twitter, Globe } from "lucide-react";
import {
  SpeakerDirectory,
  type Speaker,
  type SpeakerSession,
} from "../site-builder/SpeakerProfilePanel";

const SPEAKERS = [
    { name: "Sarah Johnson", role: "VP of Design", company: "Acme Corp", img: "https://images.unsplash.com/photo-1766928963-c72589b9ef3f?w=400" },
    { name: "Michael Chen", role: "CTO", company: "TechStart", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400" },
    { name: "Jessica Williams", role: "Product Lead", company: "Innovate", img: "https://images.unsplash.com/photo-1762968269894-1d7e1ce8894e?w=400" },
    { name: "David Kim", role: "Founder", company: "NextGen", img: "https://images.unsplash.com/photo-1766928963-c72589b9ef3f?w=400" }, // reusing
    { name: "Emily Davis", role: "Director", company: "Future", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400" },
    { name: "Robert Wilson", role: "Engineer", company: "BuildIt", img: "https://images.unsplash.com/photo-1762968269894-1d7e1ce8894e?w=400" },
];

// ---------------------------------------------------------------------------
// Full speaker roster with IDs (cross-referenced from agenda data)
// ---------------------------------------------------------------------------
const FULL_SPEAKERS: Speaker[] = [
  { id: "sp-1", name: "Sarah Connor", role: "VP of Design", company: "Acme Corp", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
  { id: "sp-2", name: "Dan Abramov", role: "React Core Team", company: "Meta", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop" },
  { id: "sp-3", name: "Emma K", role: "Design Lead", company: "Figma", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop" },
  { id: "sp-4", name: "Matt Pocock", role: "TypeScript Educator", company: "Total TypeScript", img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" },
  { id: "sp-5", name: "Andrej K", role: "AI Researcher", company: "OpenAI", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
  { id: "sp-6", name: "Jake Archibald", role: "Developer Advocate", company: "Google" },
  { id: "sp-7", name: "Guillermo Rauch", role: "CEO", company: "Vercel", img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" },
  { id: "sp-8", name: "Kelsey Hightower", role: "Distinguished Engineer", company: "Google Cloud", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
  { id: "sp-9", name: "Addy Osmani", role: "Engineering Lead", company: "Google", img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" },
  { id: "sp-10", name: "Una Kravets", role: "CSS Advocate", company: "Google", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop" },
  { id: "sp-11", name: "Werner Vogels", role: "CTO", company: "Amazon", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop" },
  { id: "sp-12", name: "Jina Anne", role: "Design Tokens Pioneer", company: "Independent", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop" },
  { id: "sp-13", name: "Troy Hunt", role: "Security Researcher", company: "Have I Been Pwned", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
  { id: "sp-14", name: "Jen Simmons", role: "Web Technologies Evangelist", company: "Apple" },
  { id: "sp-15", name: "Phil Sturgeon", role: "API Design Expert", company: "Stoplight", img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" },
  { id: "sp-16", name: "Oscar T", role: "Accessibility Lead", company: "A11y Co", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
  { id: "sp-17", name: "Lena R", role: "UX Researcher", company: "DesignLab", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
];

// ---------------------------------------------------------------------------
// Session assignments per speaker (cross-relationship data)
// ---------------------------------------------------------------------------
const SPEAKER_SESSIONS: Record<string, SpeakerSession[]> = {
  "sp-1": [
    { title: "Opening Keynote: Future of the Web", day: "Friday, March 14", dayIndex: 0, time: "09:00 AM", endTime: "10:00 AM", location: "Auditorium A", type: "Keynote" },
  ],
  "sp-2": [
    { title: "React Server Components Workshop", day: "Friday, March 14", dayIndex: 0, time: "10:00 AM", endTime: "11:00 AM", location: "Room 204", type: "Workshop" },
  ],
  "sp-3": [
    { title: "Design Tokens at Scale", day: "Friday, March 14", dayIndex: 0, time: "10:00 AM", endTime: "11:00 AM", location: "Room 305", type: "Talk" },
    { title: "Design Systems Panel", day: "Friday, March 14", dayIndex: 0, time: "02:00 PM", endTime: "03:00 PM", location: "Auditorium B", type: "Panel" },
  ],
  "sp-4": [
    { title: "TypeScript Advanced Patterns", day: "Friday, March 14", dayIndex: 0, time: "11:00 AM", endTime: "12:00 PM", location: "Room 204", type: "Workshop" },
  ],
  "sp-5": [
    { title: "AI in Production", day: "Friday, March 14", dayIndex: 0, time: "01:00 PM", endTime: "02:00 PM", location: "Auditorium A", type: "Keynote" },
  ],
  "sp-6": [
    { title: "State of Web Standards", day: "Saturday, March 15", dayIndex: 1, time: "09:00 AM", endTime: "10:00 AM", location: "Auditorium A", type: "Keynote" },
  ],
  "sp-7": [
    { title: "Building with Edge Functions", day: "Saturday, March 15", dayIndex: 1, time: "11:00 AM", endTime: "12:00 PM", location: "Auditorium B", type: "Talk" },
  ],
  "sp-8": [
    { title: "DevOps & CI/CD", day: "Saturday, March 15", dayIndex: 1, time: "01:00 PM", endTime: "02:00 PM", location: "Room 204", type: "Workshop" },
  ],
  "sp-9": [
    { title: "Performance Deep-Dive", day: "Friday, March 14", dayIndex: 0, time: "03:00 PM", endTime: "04:00 PM", location: "Room 204", type: "Workshop" },
  ],
  "sp-10": [
    { title: "Advanced CSS Architecture", day: "Saturday, March 15", dayIndex: 1, time: "10:00 AM", endTime: "11:00 AM", location: "Room 204", type: "Workshop" },
  ],
  "sp-11": [
    { title: "Edge Computing Keynote", day: "Sunday, March 16", dayIndex: 2, time: "09:00 AM", endTime: "10:00 AM", location: "Auditorium A", type: "Keynote" },
  ],
  "sp-12": [
    { title: "Building Design Tokens", day: "Sunday, March 16", dayIndex: 2, time: "10:00 AM", endTime: "11:00 AM", location: "Room 204", type: "Workshop" },
  ],
  "sp-13": [
    { title: "Security in Modern Apps", day: "Sunday, March 16", dayIndex: 2, time: "11:00 AM", endTime: "12:00 PM", location: "Room 204", type: "Workshop" },
  ],
  "sp-14": [
    { title: "Mobile-First Strategies", day: "Sunday, March 16", dayIndex: 2, time: "11:00 AM", endTime: "12:00 PM", location: "Auditorium B", type: "Talk" },
  ],
  "sp-15": [
    { title: "API Design Best Practices", day: "Sunday, March 16", dayIndex: 2, time: "10:00 AM", endTime: "11:00 AM", location: "Room 305", type: "Talk" },
  ],
  "sp-16": [
    { title: "Accessibility Masterclass", day: "Friday, March 14", dayIndex: 0, time: "11:00 AM", endTime: "12:00 PM", location: "Auditorium B", type: "Panel" },
    { title: "Design Systems Panel", day: "Friday, March 14", dayIndex: 0, time: "02:00 PM", endTime: "03:00 PM", location: "Auditorium B", type: "Panel" },
  ],
  "sp-17": [
    { title: "Accessibility Masterclass", day: "Friday, March 14", dayIndex: 0, time: "11:00 AM", endTime: "12:00 PM", location: "Auditorium B", type: "Panel" },
  ],
};

// Variant 1: Grid Cards
export const SpeakersVariant1 = () => (
  <div className="w-full py-12 bg-background">
      <div className="mx-auto w-full" style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}>
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8 text-foreground" style={{ fontFamily: 'var(--font-sans)' }}>Featured Speakers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SPEAKERS.map((s, i) => (
                  <div key={i} className="group relative overflow-hidden rounded-xl">
                      <div className="aspect-square overflow-hidden bg-muted">
                          <img 
                            src={s.img} 
                            alt={s.name} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
                          />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                      <div className="absolute bottom-0 left-0 p-4 text-white w-full">
                          <h3 className="text-lg font-bold" style={{ fontFamily: 'var(--font-sans)' }}>{s.name}</h3>
                          <p className="text-xs opacity-80" style={{ fontFamily: 'var(--font-sans)' }}>{s.role}, {s.company}</p>
                      </div>
                  </div>
              ))}
          </div>
      </div>
  </div>
);

// Variant 2: List with Avatars
export const SpeakersVariant2 = () => (
  <div className="w-full py-12 bg-muted/20">
      <div className="mx-auto w-full" style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground" style={{ fontFamily: 'var(--font-sans)' }}>Speakers</h2>
            <Button variant="outline" className="w-full lg:w-auto">View All</Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {SPEAKERS.map((s, i) => (
                  <Card key={i} className="flex items-center gap-4 p-4 border-none bg-card shadow-sm hover:shadow-md transition-all">
                      <Avatar className="h-16 w-16">
                          <AvatarImage src={s.img} />
                          <AvatarFallback>{s.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                          <h3 className="font-bold text-lg text-foreground" style={{ fontFamily: 'var(--font-sans)' }}>{s.name}</h3>
                          <p className="text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-sans)' }}>{s.role} @ {s.company}</p>
                      </div>
                      <div className="flex gap-2">
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-primary/70 hover:text-primary">
                              <Linkedin className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-primary/70 hover:text-primary">
                              <Twitter className="h-4 w-4" />
                          </Button>
                      </div>
                  </Card>
              ))}
          </div>
      </div>
  </div>
);

// Variant 3: Horizontal Scroll
export const SpeakersVariant3 = () => (
  <div className="w-full py-12 bg-background overflow-hidden">
      <div className="mx-auto mb-6" style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}>
          <h2 className="text-3xl font-bold text-foreground" style={{ fontFamily: 'var(--font-sans)' }}>World Class Experts</h2>
          <p className="text-muted-foreground mt-2" style={{ fontFamily: 'var(--font-sans)' }}>Hear from the people building the future.</p>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-6 mx-auto snap-x" style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}>
          {SPEAKERS.map((s, i) => (
              <Card key={i} className="min-w-[260px] snap-center bg-card border-none shadow-lg">
                  <div className="aspect-square bg-muted rounded-t-xl overflow-hidden">
                      <img src={s.img} alt={s.name} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="p-6 text-center space-y-2">
                      <h3 className="font-bold text-xl text-foreground" style={{ fontFamily: 'var(--font-sans)' }}>{s.name}</h3>
                      <p className="text-primary font-medium text-sm" style={{ fontFamily: 'var(--font-sans)' }}>{s.company}</p>
                      <p className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-sans)' }}>{s.role}</p>
                  </CardContent>
              </Card>
          ))}
      </div>
  </div>
);

// Variant 4: Interactive Speaker Directory with Search, Alphabet Chips & Profile Panel
export const SpeakersVariant4 = () => (
  <SpeakerDirectory
    speakers={FULL_SPEAKERS}
    speakerSessions={SPEAKER_SESSIONS}
  />
);
