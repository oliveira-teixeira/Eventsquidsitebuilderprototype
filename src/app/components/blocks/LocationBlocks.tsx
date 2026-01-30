import React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { MapPin, Navigation, Phone, Mail } from "lucide-react";

// Variant 1: Map Side Info
export const LocationVariant1 = () => (
  <div className="w-full bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-auto lg:h-[500px]" style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
          <div className="bg-muted relative h-[300px] lg:h-full">
              <img 
                src="https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
                alt="Map" 
                className="w-full h-full object-cover grayscale opacity-70"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-primary text-primary-foreground p-3 rounded-full shadow-xl animate-bounce">
                      <MapPin className="h-8 w-8" />
                  </div>
              </div>
          </div>
          <div className="p-8 lg:p-12 flex flex-col justify-center bg-card">
              <h2 className="text-3xl font-bold mb-6 text-foreground">The Venue</h2>
              <div className="space-y-6">
                  <div>
                      <h3 className="font-semibold text-lg">Moscone Center</h3>
                      <p className="text-muted-foreground">747 Howard St<br/>San Francisco, CA 94103</p>
                  </div>
                  <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-primary" /> +1 (555) 123-4567
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-primary" /> events@example.com
                      </div>
                  </div>
                  <Button className="w-full lg:w-fit gap-2">
                      <Navigation className="h-4 w-4" /> Get Directions
                  </Button>
              </div>
          </div>
      </div>
  </div>
);

// Variant 2: Full Map with Card
export const LocationVariant2 = () => (
  <div className="relative w-full h-[600px] bg-muted">
       <img 
            src="https://images.unsplash.com/photo-1694702702714-a48c5fabdaf3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
            alt="Map Background" 
            className="w-full h-full object-cover"
       />
       <div className="absolute top-1/2 left-1/2 lg:left-20 -translate-x-1/2 lg:translate-x-0 -translate-y-1/2 w-[calc(100%-2rem)] lg:w-[350px] max-w-sm">
           <Card className="shadow-2xl border-none">
               <CardContent className="p-8 space-y-4">
                   <Badge>Venue</Badge>
                   <h2 className="text-2xl font-bold text-foreground">Grand Hyatt</h2>
                   <p className="text-muted-foreground">
                       Experience luxury in the heart of the city. Located 5 minutes from the airport.
                   </p>
                   <div className="pt-4">
                       <p className="font-medium text-foreground">1000 Blvd of the Arts</p>
                       <p className="text-sm text-muted-foreground">Sarasota, FL 34236</p>
                   </div>
                   <Button className="w-full" variant="secondary">View on Google Maps</Button>
               </CardContent>
           </Card>
       </div>
  </div>
);

// Variant 3: Text Heavy
export const LocationVariant3 = () => (
  <div className="w-full py-20 bg-background">
      <div className="mx-auto flex flex-col items-center text-center space-y-8" style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}>
          <MapPin className="h-12 w-12 text-primary" />
          <h2 className="text-4xl font-bold text-foreground">How to get there</h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
              Located in the vibrant Arts District, our venue is accessible by all major public transport lines. 
              Parking is available on-site for registered attendees.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-4xl pt-8">
              <div className="p-6 bg-muted/30 rounded-lg">
                  <h3 className="font-bold mb-2">By Train</h3>
                  <p className="text-sm text-muted-foreground">Central Station is a 5-minute walk from the venue.</p>
              </div>
              <div className="p-6 bg-muted/30 rounded-lg">
                  <h3 className="font-bold mb-2">By Car</h3>
                  <p className="text-sm text-muted-foreground">Valet parking at the main entrance on 4th St.</p>
              </div>
              <div className="p-6 bg-muted/30 rounded-lg">
                  <h3 className="font-bold mb-2">By Air</h3>
                  <p className="text-sm text-muted-foreground">Direct shuttle from INT Airport every 30 mins.</p>
              </div>
          </div>
      </div>
  </div>
);
