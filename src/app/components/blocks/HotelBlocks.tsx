import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Wifi, Coffee, Car, Dumbbell } from "lucide-react";

// Variant 1: Side by Side
export const HotelVariant1 = () => (
  <div className="w-full py-20 bg-background">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}>
          <div className="rounded-2xl overflow-hidden shadow-2xl h-[400px]">
              <img 
                src="https://images.unsplash.com/photo-1637730827702-f847ebb70dbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGxvYmJ5JTIwbW9kZXJufGVufDF8fHx8MTc2OTY1NjU4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                alt="Hotel Lobby" 
                className="w-full h-full object-cover"
              />
          </div>
          <div className="space-y-6">
              <Badge variant="secondary">Official Partner</Badge>
              <h2 className="text-4xl font-bold text-foreground">The Marriott Marquis</h2>
              <p className="text-lg text-muted-foreground">
                  Stay where the action is. Enjoy exclusive rates for conference attendees starting at $199/night. 
                  Includes free wifi and breakfast.
              </p>
              <ul className="space-y-2 text-foreground">
                  <li className="flex items-center gap-2"><Wifi className="h-4 w-4 text-primary"/> High-speed Wifi</li>
                  <li className="flex items-center gap-2"><Coffee className="h-4 w-4 text-primary"/> Continental Breakfast</li>
                  <li className="flex items-center gap-2"><Dumbbell className="h-4 w-4 text-primary"/> 24/7 Gym Access</li>
              </ul>
              <div className="pt-4">
                  <Button size="lg">Book Your Room</Button>
                  <p className="text-xs text-muted-foreground mt-2">Promo code: CONF2025</p>
              </div>
          </div>
      </div>
  </div>
);

// Variant 2: Card Grid of Options
export const HotelVariant2 = () => (
  <div className="w-full py-16 bg-muted/30">
      <div className="mx-auto w-full" style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}>
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Accommodations</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {['Luxury Suite', 'Standard King', 'Double Queen'].map((room, i) => (
                  <Card key={i} className="overflow-hidden flex flex-col">
                      <div className="h-48 bg-muted relative">
                           <img 
                                src={i === 0 ? 'https://images.unsplash.com/photo-1731336478850-6bce7235e320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJvb20lMjBsdXh1cnl8ZW58MXx8fHwxNzY5Nzc3NDI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' : i === 1 ? 'https://images.unsplash.com/photo-1559841644-08984562005a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJvb20lMjBraW5nJTIwYmVkfGVufDF8fHx8MTc2OTc3NzQyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' : 'https://images.unsplash.com/photo-1637730827702-f847ebb70dbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGxvYmJ5JTIwbW9kZXJufGVufDF8fHx8MTc2OTY1NjU4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'}
                                alt={room} 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 right-4 bg-background/90 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                                ${150 + i * 50}/night
                            </div>
                      </div>
                      <CardContent className="p-6 flex-1 flex flex-col">
                          <h3 className="text-xl font-bold mb-2 text-foreground">{room}</h3>
                          <p className="text-muted-foreground text-sm mb-4 flex-1">
                              Perfect for relaxing after a long day of networking.
                          </p>
                          <Button variant="outline" className="w-full">Select</Button>
                      </CardContent>
                  </Card>
              ))}
          </div>
      </div>
  </div>
);

// Variant 3: Banner CTA
export const HotelVariant3 = () => (
  <div className="w-full bg-primary py-12 px-4">
      <div className="mx-auto bg-background rounded-2xl p-8 lg:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8" style={{ maxWidth: 'var(--max-width)' }}>
          <div className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">Need a place to stay?</h2>
              <p className="text-muted-foreground max-w-md">
                  We have secured a block of rooms at the Hilton for a discounted rate. 
                  Limited availability remains.
              </p>
          </div>
          <div className="flex flex-col gap-3 min-w-[200px]">
              <Button size="lg" className="w-full">Reserve Now</Button>
              <span className="text-center text-xs text-muted-foreground">Expires Oct 1st</span>
          </div>
      </div>
  </div>
);

// Variant 4: Accordion List (Figma Design)
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { CheckCircle2, ExternalLink, Mail, MapPin, Phone } from "lucide-react";

export const HotelVariant4 = () => (
  <div className="w-full py-20 bg-background">
      <div className="mx-auto w-full" style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}>
          <div className="mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">Accommodations</h2>
              <p className="text-muted-foreground text-lg">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
          </div>
          
          <Accordion type="multiple" defaultValue={["item-1"]} className="w-full space-y-4">
              <AccordionItem value="item-1" className="border-b-0">
                  <AccordionTrigger className="text-3xl font-semibold hover:no-underline py-6">
                      Recommended Hotels
                  </AccordionTrigger>
                  <AccordionContent>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
                          {[1, 2, 3].map((i) => (
                              <div key={i} className="group rounded-lg border-none bg-card text-card-foreground shadow-sm overflow-hidden">
                                  <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                                       <img 
                                          src={i === 1 ? 'https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb20lMjBpbnRlcmlvcnxlbnwxfHx8fDE3Njk3NjM4MTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' : i === 2 ? 'https://images.unsplash.com/photo-1572177215152-32f247303126?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJvb20lMjBtb2Rlcm4lMjBkZXNpZ258ZW58MXx8fHwxNzY5Nzc3NTQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' : 'https://images.unsplash.com/photo-1667125095636-dce94dcbdd96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3V0aXF1ZSUyMGhvdGVsJTIwcm9vbXxlbnwxfHx8fDE3Njk3MDQ1MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'}
                                          alt="Hotel" 
                                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" 
                                      />
                                  </div>
                                  <div className="p-6 space-y-6">
                                      <div className="space-y-4">
                                          <div className="space-y-2">
                                              <h3 className="text-xl font-semibold text-primary">Hotel Name</h3>
                                              <Badge variant="secondary" className="font-normal bg-muted text-foreground hover:bg-muted/80">
                                                  <CheckCircle2 className="mr-1 h-3 w-3" />
                                                  Book by March for a 15% discount
                                              </Badge>
                                          </div>
                                          
                                          <div className="space-y-3 text-sm text-muted-foreground">
                                              <div className="flex items-start gap-2">
                                                  <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                                                  <span>123 Main St, City, Country</span>
                                              </div>
                                              <div className="flex items-center gap-2">
                                                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                                                  <span>+1 234 567 8900</span>
                                              </div>
                                              <div className="flex items-center gap-2">
                                                  <Mail className="h-4 w-4 shrink-0 text-primary" />
                                                  <span>info@grandhotel.com</span>
                                              </div>
                                          </div>
                                      </div>
                                      
                                      <Button variant="secondary" className="w-fit" asChild>
                                          <a href="#">
                                              Visit Website
                                              <ExternalLink className="ml-2 h-4 w-4" />
                                          </a>
                                      </Button>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="border-b-0">
                  <AccordionTrigger className="text-3xl font-semibold hover:no-underline py-6">
                      Find Hotels
                  </AccordionTrigger>
                  <AccordionContent>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
                          {['Hotels near the Event', 'Hotels near the Airport'].map((title, i) => (
                              <div key={i} className="rounded-lg border-none bg-card text-card-foreground shadow-sm overflow-hidden">
                                  <div className="aspect-[4/3] bg-muted relative">
                                      <img 
                                          src={i === 0 ? 'https://images.unsplash.com/photo-1769766407883-1645a93eed40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGJ1aWxkaW5nJTIwZXh0ZXJpb3IlMjBuaWdodxlbnwxfHx8fDE3Njk3Nzc1NDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' : 'https://images.unsplash.com/photo-1761048163833-950c8a1a81eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMG5lYXIlMjBhaXJwb3J0fGVufDF8fHx8MTc2OTc3NzU0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'}
                                          alt={title}
                                          className="object-cover w-full h-full"
                                      />
                                  </div>
                                  <div className="p-6 space-y-4">
                                      <div className="space-y-1">
                                          <h3 className="text-xl font-semibold">{title}</h3>
                                          <p className="text-sm text-muted-foreground">Description goes here</p>
                                      </div>
                                      <Button className="w-fit">
                                          View Options
                                          <ExternalLink className="ml-2 h-4 w-4" />
                                      </Button>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </AccordionContent>
              </AccordionItem>
          </Accordion>
      </div>
  </div>
);