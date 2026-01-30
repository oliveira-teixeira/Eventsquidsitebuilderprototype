import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Slider } from "../ui/slider";
import { ArrowRight, Star, Quote } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import exampleImage from 'figma:asset/550aa7df215d66b630a11970e2ebe796f0a09f21.png';

// Mock Data
const ALL_SPONSORS = [
    { name: "Acme Corp", logo: "https://images.unsplash.com/photo-1612519348055-5948319a0714?w=200&h=100&fit=crop", tier: "Platinum", desc: "Building the future of everything.", testimonial: "The best event of the year. Unmissable for industry leaders." },
    { name: "Globex", logo: "https://images.unsplash.com/photo-1628760584600-6c31148991e9?w=200&h=100&fit=crop", tier: "Gold", desc: "Global logistics partner.", testimonial: "We found our key partners here. Incredible networking opportunities." },
    { name: "Soylent", logo: "https://images.unsplash.com/photo-1746047420047-03fc7a9b9226?w=200&h=100&fit=crop", tier: "Gold", desc: "Nutritional solutions.", testimonial: "A fantastic showcase of innovation and talent." },
    { name: "Initech", logo: exampleImage, tier: "Silver", desc: "Software for the modern age.", testimonial: "Our team learned so much. Can't wait for next year." },
    { name: "Umbrella", logo: "https://images.unsplash.com/photo-1612519348055-5948319a0714?w=200&h=100&fit=crop", tier: "Silver", desc: "Biotech research.", testimonial: "Perfectly organized and attended by the right people." },
    { name: "Stark Ind", logo: "https://images.unsplash.com/photo-1628760584600-6c31148991e9?w=200&h=100&fit=crop", tier: "Bronze", desc: "Advanced defense tech.", testimonial: "Pushing boundaries together." },
    { name: "Cyberdyne", logo: "https://images.unsplash.com/photo-1746047420047-03fc7a9b9226?w=200&h=100&fit=crop", tier: "Bronze", desc: "AI systems.", testimonial: "The future is now." },
    { name: "Massive", logo: "https://images.unsplash.com/photo-1612519348055-5948319a0714?w=200&h=100&fit=crop", tier: "Bronze", desc: "Dynamic solutions.", testimonial: "Massive impact, massive results." },
];

// Helper for user control simulation
const SponsorControl = ({ count, setCount }: { count: number, setCount: (n: number) => void }) => (
    <div className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm p-4 rounded-lg border shadow-sm w-64">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
            Show Sponsors: {count}
        </label>
        <Slider 
            value={[count]} 
            min={1} 
            max={8} 
            step={1} 
            onValueChange={(val) => setCount(val[0])} 
        />
    </div>
);

// Variant 1: Responsive Grid with Control
export const SponsorsVariant1 = () => {
  const [count, setCount] = useState(6);
  const displaySponsors = ALL_SPONSORS.slice(0, count);

  return (
    <div className="w-full py-24 bg-background border-y border-border relative group">
       <SponsorControl count={count} setCount={setCount} />
       
       <div className="mx-auto w-full text-center" style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}>
            <h2 className="text-3xl font-bold tracking-tight mb-4">Our Partners</h2>
            <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
                We really appreciate our sponsors! Supported by the best in the industry.
            </p>
            
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                {displaySponsors.map((s, i) => (
                    <div 
                        key={i} 
                        className="w-32 h-20 md:w-48 md:h-24 bg-muted/30 rounded-lg flex items-center justify-center p-4 grayscale hover:grayscale-0 hover:bg-muted transition-all duration-300 cursor-pointer"
                    >
                         {/* Using img tag with fallback styles if specific image fails */}
                         <img 
                            src={s.logo} 
                            alt={s.name} 
                            className="max-w-full max-h-full object-contain opacity-70 hover:opacity-100" 
                         />
                    </div>
                ))}
            </div>
       </div>
    </div>
  );
};

// Variant 2: Tiered Layout (Platinum/Gold/Silver)
export const SponsorsVariant2 = () => {
    return (
      <div className="w-full py-20 bg-background">
          <div className="mx-auto w-full text-center space-y-20" style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}>
              
              {/* Platinum */}
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <Badge variant="outline" className="px-4 py-1 text-sm border-primary/50 text-primary bg-primary/5">Platinum Partner</Badge>
                  <div className="flex justify-center">
                       <div className="w-64 h-32 bg-card border-2 border-primary/20 rounded-2xl flex items-center justify-center p-8 shadow-xl shadow-primary/5 transform hover:scale-105 transition-transform duration-300">
                           <img src={ALL_SPONSORS[0].logo} alt="Platinum" className="max-w-full max-h-full object-contain" />
                       </div>
                  </div>
              </div>

              {/* Gold */}
              <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-muted-foreground uppercase tracking-widest">Gold Partners</h3>
                  <div className="flex flex-wrap justify-center gap-8">
                       {ALL_SPONSORS.slice(1, 4).map((s, i) => (
                           <div key={i} className="w-48 h-24 bg-muted/20 border border-border rounded-xl flex items-center justify-center p-6 hover:bg-card hover:shadow-md transition-all">
                               <img src={s.logo} alt={s.name} className="max-w-full max-h-full object-contain opacity-80" />
                           </div>
                       ))}
                  </div>
              </div>

               {/* Silver */}
               <div className="space-y-6">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest opacity-70">Silver Partners</h3>
                  <div className="flex flex-wrap justify-center gap-6">
                       {ALL_SPONSORS.slice(4, 8).map((s, i) => (
                           <div key={i} className="w-40 h-20 bg-muted/10 rounded-lg flex items-center justify-center p-4 opacity-60 hover:opacity-100 transition-opacity">
                               <img src={s.logo} alt={s.name} className="max-w-full max-h-full object-contain grayscale" />
                           </div>
                       ))}
                  </div>
              </div>
          </div>
      </div>
    );
};

// Variant 3: Infinite Marquee
export const SponsorsVariant3 = () => {
    return (
      <div className="w-full py-16 bg-muted/10 border-y border-border overflow-hidden">
          <div className="mx-auto mb-10 text-center" style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}>
              <p className="font-medium text-muted-foreground">Trusted by innovative teams worldwide</p>
          </div>
          
          <div className="relative flex overflow-hidden group">
              <div className="flex gap-12 animate-marquee whitespace-nowrap py-4">
                  {[...ALL_SPONSORS, ...ALL_SPONSORS, ...ALL_SPONSORS].map((s, i) => (
                      <div key={i} className="flex items-center gap-3 min-w-[200px] opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                          <img src={s.logo} alt={s.name} className="h-8 w-auto object-contain grayscale hover:grayscale-0" />
                          <span className="font-bold text-xl text-foreground/80">{s.name}</span>
                      </div>
                  ))}
              </div>
              
              {/* Fade edges */}
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
          </div>
          
          <style>{`
            @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
            }
            .animate-marquee {
                animation: marquee 30s linear infinite;
            }
            .group:hover .animate-marquee {
                animation-play-state: paused;
            }
          `}</style>
      </div>
    );
};

// Variant 4: Card Grid with Descriptions
export const SponsorsVariant4 = () => {
    const [count, setCount] = useState(4);
    
    return (
      <div className="w-full py-20 bg-background relative">
          <SponsorControl count={count} setCount={setCount} />
          <div className="mx-auto w-full" style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}>
              <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-4">
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight">Sponsors</h2>
                    <p className="text-muted-foreground mt-2">Meet the organizations making this possible.</p>
                  </div>
                  <Button variant="outline">Become a Sponsor</Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {ALL_SPONSORS.slice(0, count).map((s, i) => (
                      <Card key={i} className="hover:shadow-lg transition-all duration-300 group">
                          <CardContent className="p-6 space-y-4">
                              <div className="h-12 w-full flex items-center justify-start">
                                  <img src={s.logo} alt={s.name} className="h-10 object-contain" />
                              </div>
                              <div>
                                  <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-bold text-foreground">{s.name}</h3>
                                    {s.tier === "Platinum" && <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />}
                                  </div>
                                  <p className="text-sm text-muted-foreground line-clamp-2">{s.desc}</p>
                              </div>
                              <div className="pt-2">
                                  <span className="text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                      Visit Website <ArrowRight className="h-3 w-3" />
                                  </span>
                              </div>
                          </CardContent>
                      </Card>
                  ))}
              </div>
          </div>
      </div>
    );
};

// Variant 5: Sidebar List
export const SponsorsVariant5 = () => {
    return (
      <div className="w-full py-16 bg-muted/20 border-y border-border">
          <div className="mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12" style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}>
              <div className="lg:col-span-4 space-y-6">
                  <h2 className="text-3xl font-bold">Supported By</h2>
                  <p className="text-muted-foreground leading-[160%]">
                      Our sponsors play a pivotal role in our community. 
                      They help us keep ticket prices low and quality high.
                  </p>
                  <Button className="w-full lg:w-auto">Download Prospectus</Button>
              </div>
              
              <div className="lg:col-span-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {ALL_SPONSORS.slice(0, 6).map((s, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 bg-background rounded-lg border hover:border-primary/50 transition-colors">
                          <div className="h-12 w-16 flex items-center justify-center bg-muted/30 rounded p-2">
                              <img src={s.logo} alt={s.name} className="max-w-full max-h-full object-contain" />
                          </div>
                          <div className="flex-1">
                              <h4 className="font-semibold text-sm">{s.name}</h4>
                              <p className="text-xs text-muted-foreground">{s.tier} Partner</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>
    );
};

// Variant 6: Featured + Grid
export const SponsorsVariant6 = () => {
    return (
      <div className="w-full py-24 bg-background">
          <div className="mx-auto w-full text-center" style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}>
              <Badge variant="secondary" className="mb-6">Presented By</Badge>
              
              <div className="mb-16 flex justify-center">
                  <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/10 border border-border max-w-2xl w-full">
                       <img src={ALL_SPONSORS[0].logo} alt="Presenting Sponsor" className="h-16 md:h-24 mx-auto object-contain mb-6" />
                       <p className="text-lg font-medium">Acme Corp is dedicated to bringing you the best experience.</p>
                  </div>
              </div>
              
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-8">In Association With</p>
              
              <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 max-w-4xl mx-auto">
                   {ALL_SPONSORS.slice(1).map((s, i) => (
                       <div key={i} className="w-32 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                           <img src={s.logo} alt={s.name} className="max-w-full h-10 object-contain mx-auto" />
                       </div>
                   ))}
              </div>
          </div>
      </div>
    );
};

// Variant 7: Auto-scroll Logo Carousel (Embla)
export const SponsorsVariant7 = () => {
    // Memoize options to prevent infinite re-renders
    const plugin = React.useMemo(() => Autoplay({ delay: 2000, stopOnInteraction: false }), []);
    const opts = React.useMemo(() => ({
        align: "start" as const,
        loop: true,
    }), []);

    return (
        <div className="w-full py-20 bg-background border-t border-border">
            <div className="mx-auto w-full text-center" style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}>
                <h2 className="text-2xl font-bold tracking-tight mb-8">Official Partners</h2>
                
                <Carousel
                    plugins={[plugin]}
                    className="w-full mx-auto"
                    opts={opts}
                >
                    <CarouselContent className="-ml-4">
                        {ALL_SPONSORS.map((s, i) => (
                            <CarouselItem key={i} className="pl-4 basis-1/2 lg:basis-1/5">
                                <div className="p-4 bg-muted/10 rounded-lg border flex items-center justify-center h-24 hover:bg-muted/30 transition-colors">
                                    <img src={s.logo} alt={s.name} className="max-w-full max-h-full object-contain mix-blend-multiply opacity-80" />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </div>
    );
};

// Variant 8: Sponsor Spotlight Carousel
export const SponsorsVariant8 = () => {
    const opts = React.useMemo(() => ({
        align: "start" as const,
        loop: true,
    }), []);

    return (
        <div className="w-full py-24 bg-muted/30">
            <div className="mx-auto w-full" style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}>
                <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Meet Our Partners</h2>
                
                <Carousel
                    className="w-full mx-auto"
                    opts={opts}
                >
                    <CarouselContent>
                        {ALL_SPONSORS.slice(0, 5).map((s, i) => (
                            <CarouselItem key={i} className="lg:basis-1/2">
                                <div className="p-1">
                                    <Card className="h-full border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                                        <CardContent className="flex flex-col gap-6 p-8 h-full justify-between">
                                            <div className="h-16 flex items-center justify-center border-b border-border/50 pb-6">
                                                <img src={s.logo} alt={s.name} className="h-12 object-contain" />
                                            </div>
                                            <div className="flex-1 space-y-4">
                                                <div>
                                                    <h3 className="font-bold text-lg text-foreground">{s.name}</h3>
                                                    <p className="text-sm font-medium text-primary">{s.tier} Partner</p>
                                                </div>
                                                <p className="text-muted-foreground text-sm leading-[160%]">
                                                    {s.desc}
                                                </p>
                                            </div>
                                            <div className="pt-4 mt-auto">
                                                <Button variant="outline" className="w-full group">
                                                    Learn More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </div>
    );
};

// Variant 9: Highlight Center Carousel
export const SponsorsVariant9 = () => {
    const opts = React.useMemo(() => ({
        align: "center" as const,
        loop: true,
    }), []);

    return (
        <div className="w-full py-20 bg-background overflow-hidden">
            <div className="mx-auto w-full flex flex-col items-center" style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}>
                <Badge className="mb-4">Spotlight</Badge>
                <h2 className="text-4xl font-bold tracking-tight mb-12 text-center">Featured Sponsors</h2>
                
                <Carousel
                    className="w-full"
                    opts={opts}
                >
                    <CarouselContent className="-ml-4">
                        {ALL_SPONSORS.map((s, i) => (
                            <CarouselItem key={i} className="pl-4 basis-full lg:basis-1/3">
                                <div className="p-1">
                                    <div className="group relative aspect-video overflow-hidden rounded-xl bg-card border shadow-sm hover:shadow-xl transition-all duration-300 flex items-center justify-center p-8">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <img 
                                            src={s.logo} 
                                            alt={s.name} 
                                            className="max-w-[70%] max-h-[60%] object-contain transition-transform duration-500 group-hover:scale-110" 
                                        />
                                        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                                            <span className="text-sm font-bold text-primary flex items-center gap-1">
                                                View Profile <ArrowRight className="h-3 w-3" />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-center mt-4">
                                        <h3 className="font-semibold text-lg">{s.name}</h3>
                                        <p className="text-sm text-muted-foreground">{s.tier} Sponsor</p>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:flex" />
                    <CarouselNext className="hidden md:flex" />
                </Carousel>
            </div>
        </div>
    );
};
