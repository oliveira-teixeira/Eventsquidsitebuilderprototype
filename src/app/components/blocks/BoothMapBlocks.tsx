import React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Search } from "lucide-react";
import { Input } from "../ui/input";

// Variant 1: Interactive Map (Visual)
export const BoothMapVariant1 = () => (
  <div className="w-full py-16 bg-background">
      <div className="mx-auto w-full" style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}>
          <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-foreground">Expo Floor Plan</h2>
              <Badge variant="outline">Main Hall</Badge>
          </div>
          <div className="relative w-full aspect-[16/9] bg-muted rounded-xl border-none shadow-inner overflow-hidden flex items-center justify-center">
               <img 
                    src="https://images.unsplash.com/photo-1721244654210-a505a99661e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
                    alt="Floor Plan" 
                    className="absolute inset-0 w-full h-full object-cover opacity-20"
               />
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 relative z-10 p-8 w-full max-w-3xl">
                   {[...Array(8)].map((_, i) => (
                       <div key={i} className="aspect-square bg-card border-none shadow-md hover:shadow-lg hover:bg-primary/20 rounded-md flex items-center justify-center cursor-pointer transition-all">
                           <span className="font-bold text-xs text-primary">A-{100 + i}</span>
                       </div>
                   ))}
               </div>
          </div>
      </div>
  </div>
);

// Variant 2: Directory List
export const BoothMapVariant2 = () => (
  <div className="w-full py-16 bg-muted/20">
      <div className="mx-auto w-full" style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}>
          <h2 className="text-2xl font-bold mb-6 text-foreground">Exhibitor Directory</h2>
          <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
              <Input placeholder="Search exhibitors..." className="pl-9" />
          </div>
          <div className="space-y-2 h-[400px] overflow-y-auto pr-2">
              {['Adobe', 'Figma', 'Vercel', 'Supabase', 'Linear', 'Raycast', 'Notion', 'Slack'].map((name, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-card rounded-lg border-none shadow-sm hover:shadow-md transition-all">
                      <span className="font-semibold text-foreground">{name}</span>
                      <Badge variant="secondary">Booth #{200 + i}</Badge>
                  </div>
              ))}
          </div>
      </div>
  </div>
);

// Variant 3: Floor Tabs
export const BoothMapVariant3 = () => (
  <div className="w-full py-12 bg-background">
      <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-1/4 space-y-2">
                  <h3 className="font-bold mb-4 text-foreground">Select Floor</h3>
                  <Button variant="default" className="w-full justify-start">Level 1 - Expo Hall</Button>
                  <Button variant="ghost" className="w-full justify-start">Level 2 - Conference Rooms</Button>
                  <Button variant="ghost" className="w-full justify-start">Level 3 - VIP Lounge</Button>
              </div>
              <div className="flex-1 bg-muted rounded-xl h-[500px] relative overflow-hidden flex items-center justify-center">
                  <p className="text-muted-foreground font-medium">Interactive Map Placeholder</p>
                  {/* Simulated booths */}
                  <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 border-none shadow-md rounded-lg flex items-center justify-center">
                      <span className="text-primary font-bold">Lounge</span>
                  </div>
                  <div className="absolute bottom-1/4 right-1/4 w-48 h-24 bg-secondary/20 border-none shadow-md rounded-lg flex items-center justify-center">
                      <span className="text-secondary-foreground font-bold">Cafe</span>
                  </div>
              </div>
          </div>
      </div>
  </div>
);
