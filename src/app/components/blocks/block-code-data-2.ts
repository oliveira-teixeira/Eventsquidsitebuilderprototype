export const CODE_SPONSORS_VUE = {
    v1: `<script setup lang="ts">
import { ref, computed } from 'vue'
import { Slider } from '@/components/ui/slider'

const ALL_SPONSORS = [
    { name: "Acme Corp", logo: "...", tier: "Platinum", desc: "Building the future of everything." },
    // ...
]

const count = ref(6)
const displaySponsors = computed(() => ALL_SPONSORS.slice(0, count.value))
</script>

<template>
  <div class="w-full py-24 bg-background border-y border-border relative group">
       <div class="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm p-4 rounded-lg border shadow-sm w-64">
          <label class="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
              Show Sponsors: {{ count }}
          </label>
          <Slider v-model="[count]" :min="1" :max="8" :step="1" />
      </div>
       
       <div class="container mx-auto px-4 text-center">
            <h2 class="text-3xl font-bold tracking-tight mb-4">Our Partners</h2>
            <p class="text-muted-foreground mb-12 max-w-2xl mx-auto">
                We really appreciate our sponsors! Supported by the best in the industry.
            </p>
            
            <div class="flex flex-wrap justify-center gap-8 md:gap-12">
                <div 
                    v-for="(s, i) in displaySponsors" :key="i"
                    class="w-32 h-20 md:w-48 md:h-24 bg-muted/30 rounded-lg flex items-center justify-center p-4 grayscale hover:grayscale-0 hover:bg-muted transition-all duration-300 cursor-pointer"
                >
                     <img :src="s.logo" :alt="s.name" class="max-w-full max-h-full object-contain opacity-70 hover:opacity-100" />
                </div>
            </div>
       </div>
  </div>
</template>`,
    v2: `<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
</script>

<template>
  <div class="w-full py-20 bg-background">
      <div class="container mx-auto px-4 max-w-5xl text-center space-y-20">
          
          <!-- Platinum -->
          <div class="space-y-8">
              <Badge variant="outline" class="px-4 py-1 text-sm border-primary/50 text-primary bg-primary/5">Platinum Partner</Badge>
              <div class="flex justify-center">
                   <div class="w-64 h-32 bg-card border-2 border-primary/20 rounded-2xl flex items-center justify-center p-8 shadow-xl shadow-primary/5 transform hover:scale-105 transition-transform duration-300">
                       <img src="..." alt="Platinum" class="max-w-full max-h-full object-contain" />
                   </div>
              </div>
          </div>

          <!-- Gold -->
          <div class="space-y-6">
              <h3 class="text-lg font-semibold text-muted-foreground uppercase tracking-widest">Gold Partners</h3>
              <div class="flex flex-wrap justify-center gap-8">
                   <div v-for="i in 3" :key="i" class="w-48 h-24 bg-muted/20 border border-border rounded-xl flex items-center justify-center p-6 hover:bg-card hover:shadow-md transition-all">
                       <img src="..." alt="Gold" class="max-w-full max-h-full object-contain opacity-80" />
                   </div>
              </div>
          </div>

           <!-- Silver -->
           <div class="space-y-6">
              <h3 class="text-sm font-semibold text-muted-foreground uppercase tracking-widest opacity-70">Silver Partners</h3>
              <div class="flex flex-wrap justify-center gap-6">
                   <div v-for="i in 4" :key="i" class="w-40 h-20 bg-muted/10 rounded-lg flex items-center justify-center p-4 opacity-60 hover:opacity-100 transition-opacity">
                       <img src="..." alt="Silver" class="max-w-full max-h-full object-contain grayscale" />
                   </div>
              </div>
          </div>
      </div>
  </div>
</template>`,
    v3: `<script setup lang="ts">
const ALL_SPONSORS = [/* ... */]
</script>

<template>
  <div class="w-full py-16 bg-muted/10 border-y border-border overflow-hidden">
      <div class="container mx-auto px-4 mb-10 text-center">
          <p class="font-medium text-muted-foreground">Trusted by innovative teams worldwide</p>
      </div>
      
      <div class="relative flex overflow-hidden group">
          <div class="flex gap-12 animate-marquee whitespace-nowrap py-4">
              <div v-for="(s, i) in [...ALL_SPONSORS, ...ALL_SPONSORS]" :key="i" class="flex items-center gap-3 min-w-[200px] opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                  <img :src="s.logo" :alt="s.name" class="h-8 w-auto object-contain grayscale hover:grayscale-0" />
                  <span class="font-bold text-xl text-foreground/80">{{ s.name }}</span>
              </div>
          </div>
          
          <div class="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div class="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
      </div>
  </div>
</template>

<style scoped>
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
</style>`,
    v4: `<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Star, ArrowRight } from 'lucide-vue-next'
</script>

<template>
  <div class="w-full py-20 bg-background relative">
      <div class="container mx-auto px-4">
          <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
              <div>
                <h2 class="text-3xl font-bold tracking-tight">Sponsors</h2>
                <p class="text-muted-foreground mt-2">Meet the organizations making this possible.</p>
              </div>
              <Button variant="outline">Become a Sponsor</Button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card v-for="i in 4" :key="i" class="hover:shadow-lg transition-all duration-300 group">
                  <CardContent class="p-6 space-y-4">
                      <div class="h-12 w-full flex items-center justify-start">
                          <img src="..." alt="Logo" class="h-10 object-contain" />
                      </div>
                      <div>
                          <div class="flex items-center gap-2 mb-2">
                            <h3 class="font-bold text-foreground">Sponsor Name</h3>
                            <Star class="h-3 w-3 text-yellow-500 fill-yellow-500" />
                          </div>
                          <p class="text-sm text-muted-foreground line-clamp-2">Description goes here.</p>
                      </div>
                      <div class="pt-2">
                          <span class="text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                              Visit Website <ArrowRight class="h-3 w-3" />
                          </span>
                      </div>
                  </CardContent>
              </Card>
          </div>
      </div>
  </div>
</template>`,
    v5: `<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="w-full py-16 bg-muted/20 border-y border-border">
      <div class="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div class="lg:col-span-4 space-y-6">
              <h2 class="text-3xl font-bold">Supported By</h2>
              <p class="text-muted-foreground leading-relaxed">
                  Our sponsors play a pivotal role in our community. 
                  They help us keep ticket prices low and quality high.
              </p>
              <Button class="w-full md:w-auto">Download Prospectus</Button>
          </div>
          
          <div class="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div v-for="i in 6" :key="i" class="flex items-center gap-4 p-4 bg-background rounded-lg border hover:border-primary/50 transition-colors">
                  <div class="h-12 w-16 flex items-center justify-center bg-muted/30 rounded p-2">
                      <img src="..." alt="Logo" class="max-w-full max-h-full object-contain" />
                  </div>
                  <div class="flex-1">
                      <h4 class="font-semibold text-sm">Sponsor Name</h4>
                      <p class="text-xs text-muted-foreground">Gold Partner</p>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>`,
    v6: `<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
</script>

<template>
  <div class="w-full py-24 bg-background">
      <div class="container mx-auto px-4 text-center">
          <Badge variant="secondary" class="mb-6">Presented By</Badge>
          
          <div class="mb-16 flex justify-center">
              <div class="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/10 border border-border max-w-2xl w-full">
                   <img src="..." alt="Presenting Sponsor" class="h-16 md:h-24 mx-auto object-contain mb-6" />
                   <p class="text-lg font-medium">Acme Corp is dedicated to bringing you the best experience.</p>
              </div>
          </div>
          
          <p class="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-8">In Association With</p>
          
          <div class="flex flex-wrap justify-center gap-x-12 gap-y-8 max-w-4xl mx-auto">
               <div v-for="i in 5" :key="i" class="w-32 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                   <img src="..." alt="Logo" class="max-w-full h-10 object-contain mx-auto" />
               </div>
          </div>
      </div>
  </div>
</template>`,
    v7: `<script setup lang="ts">
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
</script>

<template>
    <div class="w-full py-20 bg-background border-t border-border">
        <div class="container mx-auto px-4 text-center">
            <h2 class="text-2xl font-bold tracking-tight mb-8">Official Partners</h2>
            
            <Carousel
                :plugins="[Autoplay({ delay: 2000, stopOnInteraction: false })]"
                class="w-full max-w-5xl mx-auto"
                :opts="{ align: 'start', loop: true }"
            >
                <CarouselContent class="-ml-4">
                    <CarouselItem v-for="i in 8" :key="i" class="pl-4 basis-1/2 md:basis-1/4 lg:basis-1/5">
                        <div class="p-4 bg-muted/10 rounded-lg border flex items-center justify-center h-24 hover:bg-muted/30 transition-colors">
                            <img src="..." alt="Logo" class="max-w-full max-h-full object-contain mix-blend-multiply opacity-80" />
                        </div>
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    </div>
</template>`,
    v8: `<script setup lang="ts">
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-vue-next'
</script>

<template>
    <div class="w-full py-24 bg-muted/30">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold tracking-tight mb-12 text-center">Meet Our Partners</h2>
            
            <Carousel class="w-full max-w-4xl mx-auto" :opts="{ align: 'start', loop: true }">
                <CarouselContent>
                    <CarouselItem v-for="i in 5" :key="i" class="md:basis-1/2 lg:basis-1/2">
                        <div class="p-1">
                            <Card class="h-full border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                                <CardContent class="flex flex-col gap-6 p-8 h-full justify-between">
                                    <div class="h-16 flex items-center justify-center border-b border-border/50 pb-6">
                                        <img src="..." alt="Logo" class="h-12 object-contain" />
                                    </div>
                                    <div class="flex-1 space-y-4">
                                        <div>
                                            <h3 class="font-bold text-lg text-foreground">Sponsor Name</h3>
                                            <p class="text-sm font-medium text-primary">Platinum Partner</p>
                                        </div>
                                        <p class="text-muted-foreground text-sm leading-relaxed">
                                            Description goes here.
                                        </p>
                                    </div>
                                    <div class="pt-4 mt-auto">
                                        <Button variant="outline" class="w-full group">
                                            Learn More <ArrowRight class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    </div>
</template>`,
    v9: `<script setup lang="ts">
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from 'lucide-vue-next'
</script>

<template>
    <div class="w-full py-20 bg-background overflow-hidden">
        <div class="container mx-auto px-4 flex flex-col items-center">
            <Badge class="mb-4">Spotlight</Badge>
            <h2 class="text-4xl font-bold tracking-tight mb-12 text-center">Featured Sponsors</h2>
            
            <Carousel class="w-full max-w-6xl" :opts="{ align: 'center', loop: true }">
                <CarouselContent class="-ml-4">
                    <CarouselItem v-for="i in 5" :key="i" class="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                        <div class="p-1">
                            <div class="group relative aspect-video overflow-hidden rounded-xl bg-card border shadow-sm hover:shadow-xl transition-all duration-300 flex items-center justify-center p-8">
                                <div class="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <img src="..." alt="Logo" class="max-w-[70%] max-h-[60%] object-contain transition-transform duration-500 group-hover:scale-110" />
                                <div class="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                                    <span class="text-sm font-bold text-primary flex items-center gap-1">
                                        View Profile <ArrowRight class="h-3 w-3" />
                                    </span>
                                </div>
                            </div>
                            <div class="text-center mt-4">
                                <h3 class="font-semibold text-lg">Sponsor Name</h3>
                                <p class="text-sm text-muted-foreground">Tier Sponsor</p>
                            </div>
                        </div>
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious class="hidden md:flex" />
                <CarouselNext class="hidden md:flex" />
            </Carousel>
        </div>
    </div>
</template>`
};

export const CODE_SPONSORS_SWIFT = {
    v1: `import SwiftUI

struct SponsorsVariant1: View {
    @State private var count: Double = 6
    
    var body: some View {
        VStack {
            Slider(value: $count, in: 1...8, step: 1)
                .padding()
            
            Text("Our Partners")
                .font(.largeTitle)
                .bold()
            
            LazyVGrid(columns: [GridItem(.adaptive(minimum: 120))]) {
                ForEach(0..<Int(count), id: \\.self) { _ in
                    RoundedRectangle(cornerRadius: 8)
                        .fill(Color.gray.opacity(0.1))
                        .frame(height: 80)
                        .overlay(Text("Logo"))
                }
            }
            .padding()
        }
    }
}`,
    v2: `import SwiftUI

struct SponsorsVariant2: View {
    var body: some View {
        VStack(spacing: 40) {
            VStack {
                Text("Platinum Partner").font(.caption).padding(4).background(Color.blue.opacity(0.1))
                RoundedRectangle(cornerRadius: 12)
                    .stroke(Color.blue.opacity(0.3), lineWidth: 2)
                    .frame(width: 200, height: 100)
                    .overlay(Text("Platinum Logo"))
            }
            
            VStack {
                Text("Gold Partners").font(.headline)
                HStack {
                    ForEach(0..<3) { _ in
                        RoundedRectangle(cornerRadius: 8).fill(Color.gray.opacity(0.1)).frame(width: 100, height: 60)
                    }
                }
            }
        }
    }
}`,
    v3: `import SwiftUI

struct SponsorsVariant3: View {
    var body: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 32) {
                ForEach(0..<10) { _ in
                    HStack {
                        Circle().fill(Color.gray).frame(width: 30, height: 30)
                        Text("Sponsor").font(.headline)
                    }
                    .opacity(0.6)
                }
            }
            .padding()
        }
    }
}`,
    v4: `import SwiftUI

struct SponsorsVariant4: View {
    var body: some View {
        ScrollView {
            LazyVGrid(columns: [GridItem(.adaptive(minimum: 250))], spacing: 20) {
                ForEach(0..<4) { _ in
                    VStack(alignment: .leading) {
                        Image(systemName: "star.fill").foregroundColor(.yellow)
                        Text("Sponsor Name").font(.headline)
                        Text("Building the future.").font(.caption).foregroundColor(.secondary)
                        Divider()
                        Text("Visit Website").font(.caption).bold().foregroundColor(.blue)
                    }
                    .padding()
                    .background(Color(uiColor: .systemBackground))
                    .cornerRadius(12)
                    .shadow(radius: 2)
                }
            }
            .padding()
        }
        .background(Color(uiColor: .secondarySystemBackground))
    }
}`,
    v5: `import SwiftUI

struct SponsorsVariant5: View {
    var body: some View {
        HStack(alignment: .top, spacing: 32) {
            VStack(alignment: .leading, spacing: 16) {
                Text("Supported By").font(.largeTitle).bold()
                Button("Download Prospectus") { }.buttonStyle(.bordered)
            }
            .frame(width: 200)
            
            LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())]) {
                ForEach(0..<6) { _ in
                    HStack {
                        Rectangle().fill(Color.gray.opacity(0.2)).frame(width: 50, height: 50)
                        VStack(alignment: .leading) {
                            Text("Sponsor").font(.headline)
                            Text("Partner").font(.caption)
                        }
                    }
                    .padding()
                    .background(RoundedRectangle(cornerRadius: 8).stroke(Color.gray.opacity(0.2)))
                }
            }
        }
        .padding()
    }
}`,
    v6: `import SwiftUI

struct SponsorsVariant6: View {
    var body: some View {
        VStack(spacing: 40) {
            Text("Presented By").font(.caption).padding(6).background(Color.gray.opacity(0.1))
            
            RoundedRectangle(cornerRadius: 16)
                .fill(LinearGradient(colors: [.gray.opacity(0.1), .clear], startPoint: .topLeading, endPoint: .bottomTrailing))
                .frame(width: 300, height: 200)
                .overlay(Text("Main Sponsor"))
            
            Text("In Association With").font(.caption).bold()
            
            HStack(spacing: 20) {
                ForEach(0..<4) { _ in
                    Circle().fill(Color.gray.opacity(0.2)).frame(width: 50, height: 50)
                }
            }
        }
        .padding()
    }
}`,
    v7: `import SwiftUI

struct SponsorsVariant7: View {
    var body: some View {
        VStack {
            Text("Official Partners").font(.title2).bold()
            TabView {
                ForEach(0..<3) { page in
                    HStack {
                        ForEach(0..<3) { _ in
                            RoundedRectangle(cornerRadius: 8)
                                .fill(Color.gray.opacity(0.1))
                                .frame(width: 100, height: 60)
                        }
                    }
                }
            }
            .tabViewStyle(.page)
            .frame(height: 100)
        }
    }
}`,
    v8: `import SwiftUI

struct SponsorsVariant8: View {
    var body: some View {
        VStack {
            Text("Meet Our Partners").font(.title).bold()
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 20) {
                    ForEach(0..<5) { _ in
                        VStack(alignment: .leading) {
                            HStack { Spacer(); Text("Logo"); Spacer() }
                                .frame(height: 60)
                                .background(Color.gray.opacity(0.1))
                            
                            Text("Sponsor Name").font(.headline)
                            Text("Description...").font(.caption)
                            
                            Button("Learn More") { }
                                .buttonStyle(.bordered)
                        }
                        .padding()
                        .frame(width: 280)
                        .background(Color.white)
                        .cornerRadius(12)
                        .shadow(radius: 5)
                    }
                }
                .padding()
            }
        }
        .background(Color.gray.opacity(0.1))
    }
}`,
    v9: `import SwiftUI

struct SponsorsVariant9: View {
    var body: some View {
        VStack {
            Text("Featured Sponsors").font(.largeTitle).bold()
            
            TabView {
                ForEach(0..<5) { _ in
                    RoundedRectangle(cornerRadius: 12)
                        .fill(Color.white)
                        .shadow(radius: 5)
                        .frame(width: 300, height: 200)
                        .overlay(Text("Spotlight Sponsor"))
                }
            }
            .tabViewStyle(.page)
            .frame(height: 300)
        }
    }
}`
};

export const CODE_LOCATION_VUE = {
    v1: `<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { MapPin, Phone, Mail, Navigation } from 'lucide-vue-next'
</script>

<template>
  <div class="w-full bg-background border-y border-border">
      <div class="grid grid-cols-1 md:grid-cols-2 h-[500px]">
          <div class="bg-muted relative">
              <img 
                src="https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
                alt="Map" 
                class="w-full h-full object-cover grayscale opacity-70"
              />
              <div class="absolute inset-0 flex items-center justify-center">
                  <div class="bg-primary text-primary-foreground p-3 rounded-full shadow-xl animate-bounce">
                      <MapPin class="h-8 w-8" />
                  </div>
              </div>
          </div>
          <div class="p-12 flex flex-col justify-center bg-card">
              <h2 class="text-3xl font-bold mb-6 text-foreground">The Venue</h2>
              <div class="space-y-6">
                  <div>
                      <h3 class="font-semibold text-lg">Moscone Center</h3>
                      <p class="text-muted-foreground">747 Howard St<br/>San Francisco, CA 94103</p>
                  </div>
                  <div class="space-y-2">
                      <div class="flex items-center gap-2 text-sm">
                          <Phone class="h-4 w-4 text-primary" /> +1 (555) 123-4567
                      </div>
                      <div class="flex items-center gap-2 text-sm">
                          <Mail class="h-4 w-4 text-primary" /> events@example.com
                      </div>
                  </div>
                  <Button class="w-fit gap-2">
                      <Navigation class="h-4 w-4" /> Get Directions
                  </Button>
              </div>
          </div>
      </div>
  </div>
</template>`,
    v2: `<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
</script>

<template>
  <div class="relative w-full h-[600px] bg-muted">
       <img 
            src="https://images.unsplash.com/photo-1694702702714-a48c5fabdaf3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
            alt="Map Background" 
            class="w-full h-full object-cover"
       />
       <div class="absolute top-1/2 left-8 md:left-20 -translate-y-1/2 w-[350px]">
           <Card class="shadow-2xl border-none">
               <CardContent class="p-8 space-y-4">
                   <Badge>Venue</Badge>
                   <h2 class="text-2xl font-bold text-foreground">Grand Hyatt</h2>
                   <p class="text-muted-foreground">
                       Experience luxury in the heart of the city. Located 5 minutes from the airport.
                   </p>
                   <div class="pt-4 border-t">
                       <p class="font-medium text-foreground">1000 Blvd of the Arts</p>
                       <p class="text-sm text-muted-foreground">Sarasota, FL 34236</p>
                   </div>
                   <Button class="w-full" variant="secondary">View on Google Maps</Button>
               </CardContent>
           </Card>
       </div>
  </div>
</template>`,
    v3: `<script setup lang="ts">
import { MapPin } from 'lucide-vue-next'
</script>

<template>
  <div class="w-full py-20 bg-background">
      <div class="container mx-auto px-4 flex flex-col items-center text-center space-y-8">
          <MapPin class="h-12 w-12 text-primary" />
          <h2 class="text-4xl font-bold text-foreground">How to get there</h2>
          <p class="max-w-2xl text-lg text-muted-foreground">
              Located in the vibrant Arts District, our venue is accessible by all major public transport lines. 
              Parking is available on-site for registered attendees.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl pt-8">
              <div class="p-6 bg-muted/30 rounded-lg">
                  <h3 class="font-bold mb-2">By Train</h3>
                  <p class="text-sm text-muted-foreground">Central Station is a 5-minute walk from the venue.</p>
              </div>
              <div class="p-6 bg-muted/30 rounded-lg">
                  <h3 class="font-bold mb-2">By Car</h3>
                  <p class="text-sm text-muted-foreground">Valet parking at the main entrance on 4th St.</p>
              </div>
              <div class="p-6 bg-muted/30 rounded-lg">
                  <h3 class="font-bold mb-2">By Air</h3>
                  <p class="text-sm text-muted-foreground">Direct shuttle from INT Airport every 30 mins.</p>
              </div>
          </div>
      </div>
  </div>
</template>`
};

export const CODE_LOCATION_SWIFT = {
    v1: `import SwiftUI

struct LocationVariant1: View {
    var body: some View {
        HStack(spacing: 0) {
            ZStack {
                Color.gray
                Image(systemName: "mappin.circle.fill")
                    .resizable()
                    .frame(width: 50, height: 50)
                    .foregroundColor(.red)
            }
            
            VStack(alignment: .leading, spacing: 20) {
                Text("The Venue").font(.largeTitle).bold()
                
                VStack(alignment: .leading) {
                    Text("Moscone Center").font(.headline)
                    Text("747 Howard St\\nSan Francisco, CA").font(.subheadline).foregroundColor(.secondary)
                }
                
                VStack(alignment: .leading, spacing: 8) {
                    Label("+1 (555) 123-4567", systemImage: "phone")
                    Label("events@example.com", systemImage: "envelope")
                }
                
                Button("Get Directions") { }
                    .buttonStyle(.borderedProminent)
            }
            .padding(40)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(Color(uiColor: .systemBackground))
        }
        .frame(height: 500)
    }
}`,
    v2: `import SwiftUI

struct LocationVariant2: View {
    var body: some View {
        ZStack(alignment: .leading) {
            Color.gray // Map Placeholder
                .ignoresSafeArea()
            
            VStack(alignment: .leading, spacing: 16) {
                Text("Venue").font(.caption).padding(4).background(Color.blue.opacity(0.1))
                Text("Grand Hyatt").font(.title).bold()
                Text("Experience luxury in the heart of the city.").font(.body).foregroundColor(.secondary)
                Divider()
                Text("1000 Blvd of the Arts").font(.headline)
                Button("View on Google Maps") { }.buttonStyle(.bordered).frame(maxWidth: .infinity)
            }
            .padding()
            .background(Color.white)
            .cornerRadius(12)
            .shadow(radius: 10)
            .frame(width: 350)
            .padding(.leading, 40)
        }
        .frame(height: 600)
    }
}`,
    v3: `import SwiftUI

struct LocationVariant3: View {
    var body: some View {
        VStack(spacing: 32) {
            Image(systemName: "map").font(.system(size: 50)).foregroundColor(.blue)
            Text("How to get there").font(.largeTitle).bold()
            Text("Located in the vibrant Arts District.").multilineTextAlignment(.center).foregroundColor(.secondary)
            
            HStack(spacing: 20) {
                ForEach(["By Train", "By Car", "By Air"], id: \\.self) { mode in
                    VStack(alignment: .leading) {
                        Text(mode).font(.headline)
                        Text("Instructions...").font(.caption).foregroundColor(.secondary)
                    }
                    .padding()
                    .frame(maxWidth: .infinity)
                    .background(Color.gray.opacity(0.1))
                    .cornerRadius(8)
                }
            }
        }
        .padding()
    }
}`
};
