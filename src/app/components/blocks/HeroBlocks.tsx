import React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ArrowRight, Play, Calendar, MapPin } from "lucide-react";

// Variant 1: Centered with Background Image
export const HeroVariant1 = () => (
  <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden bg-background text-foreground">
    <div 
      className="absolute inset-0 bg-cover bg-center z-0 opacity-20"
      style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080)' }}
    />
    <div className="absolute inset-0 bg-background/60 z-0" />
    <div 
        className="relative z-10 mx-auto text-center space-y-6"
        style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}
    >
      <Badge variant="secondary" className="mb-4 border-none">Annual Conference 2025</Badge>
      <h1 className="font-extrabold tracking-tight" style={{ fontSize: 'var(--text-6xl)' }}>
        Future of Tech
      </h1>
      <p className="text-muted-foreground max-w-2xl mx-auto" style={{ fontSize: 'var(--text-xl)' }}>
        Join the world's leading minds to shape the future of technology and innovation.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 pt-4 w-full justify-center">
        <Button size="lg" className="w-full sm:w-auto min-w-[160px] text-lg px-8">Register Now</Button>
        <Button size="lg" variant="outline" className="w-full sm:w-auto min-w-[160px] text-lg px-8 border-none bg-secondary/50 hover:bg-secondary">
          View Agenda
        </Button>
      </div>
    </div>
  </div>
);

// Variant 2: Split Screen with Mobile Optimization (Flex Wrap for Container Awareness)
export const HeroVariant2 = () => (
  <div className="w-full bg-background overflow-hidden">
    <div className="flex flex-wrap w-full h-auto min-h-0">
      
      {/* Content Side */}
      <div 
        className="flex-1 min-w-[320px] flex flex-col justify-center space-y-6 md:space-y-8 order-2 md:order-1 items-start"
        style={{ padding: 'var(--global-padding)' }}
      >
        <div className="space-y-4 w-full flex flex-col items-start">
          <Badge className="w-fit border-none bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20" variant="secondary">Oct 15-17, 2025</Badge>
          <h1 className="font-bold tracking-tight text-foreground leading-[110%] font-sans" style={{ fontSize: 'var(--text-6xl)' }}>
            Design Systems Summit
          </h1>
          <p className="text-muted-foreground leading-[160%] max-w-xl font-sans" style={{ fontSize: 'var(--text-xl)' }}>
            Scale your design workflow with the latest tools and methodologies. 
            Connect with 5,000+ designers globally.
          </p>
        </div>
        
        {/* Buttons: Flexible wrap - Stacks on mobile */}
        <div className="flex flex-wrap gap-4 pt-2 w-full m-[0px] p-[0px] justify-start">
            <Button size="lg" className="w-full lg:w-auto min-w-[140px] font-sans">Get Tickets</Button>
            <Button size="lg" variant="outline" className="w-full lg:w-auto min-w-[140px] border border-border bg-secondary/50 hover:bg-secondary text-secondary-foreground font-sans">Learn More</Button>
        </div>

        {/* Metadata */}
        <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground pt-4 mt-4 w-full border-t border-border/50">
            <div className="flex items-center gap-2 font-sans">
                <Calendar className="h-4 w-4 shrink-0 text-primary" /> 
                <span>San Francisco, CA</span>
            </div>
            <div className="flex items-center gap-2 font-sans">
                <MapPin className="h-4 w-4 shrink-0 text-primary" /> 
                <span>Moscone Center</span>
            </div>
        </div>
      </div>

      {/* Image Side */}
      <div className="flex-1 min-w-[320px] min-h-[400px] md:min-h-[500px] bg-muted relative order-1 md:order-2 self-stretch">
        <img 
            src="https://images.unsplash.com/photo-1759852174174-7beac185d35f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
            alt="Abstract design pattern" 
            className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
);

// Variant 3: Minimal Solid Color
export const HeroVariant3 = () => (
  <div className="w-full bg-primary text-primary-foreground py-24 md:py-32">
    <div className="mx-auto w-full text-center space-y-8" style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}>
      <h1 className="font-black tracking-tighter uppercase" style={{ fontSize: 'var(--text-6xl)' }}>
        Innovate. Create. Deploy.
      </h1>
      <p className="opacity-90 font-light max-w-2xl mx-auto" style={{ fontSize: 'var(--text-2xl)' }}>
        The developer conference for the modern web. 
        Experience 3 days of code, community, and chaos.
      </p>
      <div className="pt-8 flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center w-full">
        <Button size="lg" variant="secondary" className="w-full sm:w-auto h-14 px-10 text-lg border-none min-w-[200px]">
            Save Your Spot
        </Button>
      </div>
    </div>
  </div>
);

// Variant 4: Video Style (Simulated)
export const HeroVariant4 = () => (
  <div className="relative w-full h-[700px] flex items-end pb-20 overflow-hidden text-white bg-black">
     <div 
      className="absolute inset-0 bg-cover bg-center z-0"
      style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1762968269894-1d7e1ce8894e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080)' }}
    />
    {/* Always use dark gradient for video overlay regardless of theme */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
    
    <div 
        className="relative z-20 mx-auto space-y-6 w-full"
        style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}
    >
        <div className="flex items-center gap-3">
            <Button size="icon" className="rounded-full h-16 w-16 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-none">
                <Play className="h-8 w-8 ml-1" fill="currentColor" />
            </Button>
            <span className="font-semibold tracking-widest uppercase text-sm">Watch Showreel</span>
        </div>
        <h1 className="font-bold leading-[100%]" style={{ fontSize: 'var(--text-6xl)' }}>
            Unleash Your <br/> Potential
        </h1>
        <div className="flex flex-col sm:flex-row gap-x-8 gap-y-2 font-medium opacity-90" style={{ fontSize: 'var(--text-lg)' }}>
            <span>Nov 12-14, 2025</span>
            <span className="hidden sm:inline">•</span>
            <span>London, UK</span>
            <span className="hidden sm:inline">•</span>
            <span>ExCel Center</span>
        </div>
    </div>
  </div>
);

// Variant 5: Floating Cards / SaaS Style
export const HeroVariant5 = () => (
  <div className="w-full bg-muted/30 py-20 overflow-hidden">
      <div 
        className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}
    >
          <div className="space-y-8 relative z-10">
              <Badge variant="outline" className="border-none text-primary bg-primary/10">
                  New Features Available
              </Badge>
              <h1 className="font-bold text-foreground tracking-tight" style={{ fontSize: 'var(--text-6xl)' }}>
                  Everything you need to <span className="text-primary">scale</span>
              </h1>
              <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xl)' }}>
                  The complete platform for building modern applications. 
                  Streamline your workflow from design to deployment.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 w-full">
                  <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-primary/20">Start Building</Button>
                  <Button size="lg" variant="ghost" className="w-full sm:w-auto">Read Documentation <ArrowRight className="ml-2 h-4 w-4"/></Button>
              </div>
              <div className="pt-8 flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex -space-x-2">
                      {[1,2,3,4].map(i => (
                          <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted" />
                      ))}
                  </div>
                  <span>Trusted by 10,000+ developers</span>
              </div>
          </div>
          
          <div className="relative lg:h-[500px] flex items-center justify-center">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl opacity-50" />
              <div className="relative z-10 grid grid-cols-2 gap-4 rotate-[-6deg] scale-90 md:scale-100">
                   <div className="space-y-4 mt-12">
                       <div className="bg-card p-4 rounded-xl shadow-xl border-none w-64 h-40 animate-pulse" />
                       <div className="bg-card p-4 rounded-xl shadow-xl border-none w-64 h-56" />
                   </div>
                   <div className="space-y-4">
                       <div className="bg-card p-4 rounded-xl shadow-xl border-none w-64 h-56" />
                       <div className="bg-card p-4 rounded-xl shadow-xl border-none w-64 h-40" />
                   </div>
              </div>
          </div>
      </div>
  </div>
);
