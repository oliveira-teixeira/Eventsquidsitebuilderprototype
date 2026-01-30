import React from "react";
import { Card } from "../ui/card";

// Variant 1: Big Numbers Centered
export const CountdownVariant1 = () => (
  <div className="w-full py-20 bg-foreground text-background">
      <div className="mx-auto text-center" style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}>
          <p className="text-lg font-medium opacity-80 mb-8 uppercase tracking-widest">Event Starts In</p>
          <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
              {[
                  { val: "14", label: "Days" },
                  { val: "08", label: "Hours" },
                  { val: "45", label: "Minutes" },
                  { val: "12", label: "Seconds" }
              ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center">
                      <span className="text-5xl lg:text-8xl font-black tabular-nums tracking-tighter">
                          {item.val}
                      </span>
                      <span className="text-sm lg:text-base opacity-60 font-mono mt-2">{item.label}</span>
                  </div>
              ))}
          </div>
      </div>
  </div>
);

// Variant 2: Cards
export const CountdownVariant2 = () => (
  <div 
    className="w-full py-24 bg-cover bg-center relative"
    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1761304891716-eb8b8b7f1a37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080)' }}
  >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div className="relative z-10 mx-auto text-center" style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}>
          <h2 className="text-3xl font-bold mb-10 text-foreground">Don't Miss Out</h2>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                  { val: "14", label: "DAYS" },
                  { val: "08", label: "HOURS" },
                  { val: "45", label: "MINS" },
                  { val: "12", label: "SECS" }
              ].map((item, i) => (
                  <Card key={i} className="p-6 flex flex-col items-center justify-center bg-card/50 border-none shadow-xl backdrop-blur-md">
                      <span className="text-3xl lg:text-5xl font-bold text-primary mb-1">{item.val}</span>
                      <span className="text-xs font-bold text-muted-foreground tracking-widest">{item.label}</span>
                  </Card>
              ))}
          </div>
      </div>
  </div>
);

// Variant 3: Minimal Strip
export const CountdownVariant3 = () => (
  <div className="w-full bg-primary text-primary-foreground py-4">
      <div className="mx-auto flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8 text-sm lg:text-base font-medium" style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}>
          <span className="opacity-90">Registration closes in:</span>
          <div className="flex items-center gap-4 font-mono text-lg lg:text-xl">
              <span>14d</span>
              <span className="opacity-50">:</span>
              <span>08h</span>
              <span className="opacity-50">:</span>
              <span>45m</span>
              <span className="opacity-50">:</span>
              <span>12s</span>
          </div>
          <button className="underline hover:opacity-80 decoration-2 underline-offset-4">Register Now</button>
      </div>
  </div>
);
