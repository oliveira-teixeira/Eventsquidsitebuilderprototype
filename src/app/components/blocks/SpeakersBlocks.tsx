import React from "react";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Linkedin, Twitter, Globe } from "lucide-react";

const SPEAKERS = [
    { name: "Sarah Johnson", role: "VP of Design", company: "Acme Corp", img: "https://images.unsplash.com/photo-1766928963-c72589b9ef3f?w=400" },
    { name: "Michael Chen", role: "CTO", company: "TechStart", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400" },
    { name: "Jessica Williams", role: "Product Lead", company: "Innovate", img: "https://images.unsplash.com/photo-1762968269894-1d7e1ce8894e?w=400" },
    { name: "David Kim", role: "Founder", company: "NextGen", img: "https://images.unsplash.com/photo-1766928963-c72589b9ef3f?w=400" }, // reusing
    { name: "Emily Davis", role: "Director", company: "Future", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400" },
    { name: "Robert Wilson", role: "Engineer", company: "BuildIt", img: "https://images.unsplash.com/photo-1762968269894-1d7e1ce8894e?w=400" },
];

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