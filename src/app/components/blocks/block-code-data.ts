export const CODE_HERO_VUE = {
    v1: `<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
</script>

<template>
  <div class="relative w-full h-[600px] flex items-center justify-center overflow-hidden bg-zinc-900 text-white">
    <div 
      class="absolute inset-0 bg-cover bg-center z-0 opacity-50"
      style="background-image: url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')"
    />
    <div class="relative z-10 max-w-3xl mx-auto text-center px-4 space-y-6">
      <Badge variant="secondary" class="mb-4">Annual Conference 2025</Badge>
      <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight">
        Future of Tech
      </h1>
      <p class="text-xl md:text-2xl text-zinc-200 max-w-2xl mx-auto">
        Join the world's leading minds to shape the future of technology and innovation.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <Button size="lg" class="text-lg px-8">Register Now</Button>
        <Button size="lg" variant="outline" class="text-lg px-8 bg-transparent border-white text-white hover:bg-white/10">
          View Agenda
        </Button>
      </div>
    </div>
  </div>
</template>`,
    v2: `<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin } from 'lucide-vue-next'
</script>

<template>
  <div class="w-full bg-background border-b border-border">
    <div class="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
      <div class="flex flex-col justify-center p-12 lg:p-20 space-y-8">
        <div class="space-y-4">
          <Badge class="w-fit">Oct 15-17, 2025</Badge>
          <h1 class="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            Design Systems Summit
          </h1>
          <p class="text-xl text-muted-foreground leading-relaxed">
            Scale your design workflow with the latest tools and methodologies. 
            Connect with 5,000+ designers globally.
          </p>
        </div>
        <div class="flex gap-4">
            <Button size="lg">Get Tickets</Button>
            <Button size="lg" variant="outline">Learn More</Button>
        </div>
        <div class="flex gap-8 text-sm text-muted-foreground pt-8 border-t">
            <div class="flex items-center gap-2">
                <Calendar class="h-4 w-4" /> San Francisco, CA
            </div>
            <div class="flex items-center gap-2">
                <MapPin class="h-4 w-4" /> Moscone Center
            </div>
        </div>
      </div>
      <div class="relative h-64 lg:h-auto bg-muted">
        <img 
            src="https://images.unsplash.com/photo-1759852174174-7beac185d35f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
            alt="Abstract" 
            class="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
</template>`,
    v3: `<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="w-full bg-primary text-primary-foreground py-24 md:py-32">
    <div class="container mx-auto px-4 max-w-4xl text-center space-y-8">
      <h1 class="text-4xl md:text-6xl font-black tracking-tighter uppercase">
        Innovate. Create. Deploy.
      </h1>
      <p class="text-xl md:text-2xl opacity-90 font-light max-w-2xl mx-auto">
        The developer conference for the modern web. 
        Experience 3 days of code, community, and chaos.
      </p>
      <div class="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" variant="secondary" class="h-14 px-10 text-lg">
            Save Your Spot
        </Button>
      </div>
    </div>
  </div>
</template>`,
    v4: `<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Play } from 'lucide-vue-next'
</script>

<template>
  <div class="relative w-full h-[700px] flex items-end pb-20 px-4 md:px-10 overflow-hidden text-white">
     <div 
      class="absolute inset-0 bg-cover bg-center z-0"
      style="background-image: url('https://images.unsplash.com/photo-1762968269894-1d7e1ce8894e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
    
    <div class="relative z-20 max-w-4xl space-y-6">
        <div class="flex items-center gap-3">
            <Button size="icon" class="rounded-full h-16 w-16 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-none">
                <Play class="h-8 w-8 ml-1" fill="currentColor" />
            </Button>
            <span class="font-semibold tracking-widest uppercase text-sm">Watch Showreel</span>
        </div>
        <h1 class="text-5xl md:text-7xl font-bold leading-none">
            Unleash Your <br/> Potential
        </h1>
        <div class="flex flex-wrap gap-x-8 gap-y-2 text-lg font-medium opacity-90">
            <span>Nov 12-14, 2025</span>
            <span>•</span>
            <span>London, UK</span>
            <span>•</span>
            <span>ExCel Center</span>
        </div>
    </div>
  </div>
</template>`,
    v5: `<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from 'lucide-vue-next'
</script>

<template>
  <div class="w-full bg-muted/30 py-20 overflow-hidden">
      <div class="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="space-y-8 relative z-10">
              <Badge variant="outline" class="border-primary/50 text-primary bg-primary/10">
                  New Features Available
              </Badge>
              <h1 class="text-5xl md:text-6xl font-bold text-foreground tracking-tight">
                  Everything you need to <span class="text-primary">scale</span>
              </h1>
              <p class="text-xl text-muted-foreground">
                  The complete platform for building modern applications. 
                  Streamline your workflow from design to deployment.
              </p>
              <div class="flex gap-4">
                  <Button size="lg" class="shadow-lg shadow-primary/20">Start Building</Button>
                  <Button size="lg" variant="ghost">Read Documentation <ArrowRight class="ml-2 h-4 w-4"/></Button>
              </div>
              <div class="pt-8 flex items-center gap-4 text-sm text-muted-foreground">
                  <div class="flex -space-x-2">
                      <div v-for="i in 4" :key="i" class="h-8 w-8 rounded-full border-2 border-background bg-zinc-200" />
                  </div>
                  <span>Trusted by 10,000+ developers</span>
              </div>
          </div>
          
          <div class="relative lg:h-[500px] flex items-center justify-center">
              <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl opacity-50" />
              <div class="relative z-10 grid grid-cols-2 gap-4 rotate-[-6deg] scale-90 md:scale-100">
                   <div class="space-y-4 mt-12">
                       <div class="bg-card p-4 rounded-xl shadow-xl border border-border w-64 h-40 animate-pulse" />
                       <div class="bg-card p-4 rounded-xl shadow-xl border border-border w-64 h-56" />
                   </div>
                   <div class="space-y-4">
                       <div class="bg-card p-4 rounded-xl shadow-xl border border-border w-64 h-56" />
                       <div class="bg-card p-4 rounded-xl shadow-xl border border-border w-64 h-40" />
                   </div>
              </div>
          </div>
      </div>
  </div>
</template>`
};

export const CODE_HERO_SWIFT = {
    v1: `import SwiftUI

struct HeroVariant1: View {
    var body: some View {
        ZStack {
            Color(red: 0.1, green: 0.1, blue: 0.1)
                .ignoresSafeArea()
            
            AsyncImage(url: URL(string: "https://images.unsplash.com/photo-1540575467063-178a50c2df87")) { image in
                image.resizable().aspectRatio(contentMode: .fill)
            } placeholder: {
                Color.gray
            }
            .opacity(0.5)
            
            VStack(spacing: 24) {
                Text("Annual Conference 2025")
                    .font(.caption)
                    .padding(.horizontal, 12)
                    .padding(.vertical, 4)
                    .background(Color.white.opacity(0.2))
                    .cornerRadius(100)
                
                Text("Future of Tech")
                    .font(.system(size: 60, weight: .heavy))
                    .multilineTextAlignment(.center)
                
                Text("Join the world's leading minds to shape the future of technology and innovation.")
                    .font(.title3)
                    .foregroundColor(.gray)
                    .multilineTextAlignment(.center)
                    .padding(.horizontal)
                
                HStack(spacing: 16) {
                    Button("Register Now") { }
                        .buttonStyle(.borderedProminent)
                        .controlSize(.large)
                    
                    Button("View Agenda") { }
                        .buttonStyle(.bordered)
                        .controlSize(.large)
                        .tint(.white)
                }
                .padding(.top, 16)
            }
            .padding()
            .foregroundColor(.white)
            .frame(maxWidth: 800)
        }
        .frame(height: 600)
    }
}`,
    v2: `import SwiftUI

struct HeroVariant2: View {
    var body: some View {
        HStack(spacing: 0) {
            VStack(alignment: .leading, spacing: 32) {
                VStack(alignment: .leading, spacing: 16) {
                    Text("Oct 15-17, 2025")
                        .font(.caption)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 4)
                        .background(Color.primary.opacity(0.1))
                        .cornerRadius(4)
                    
                    Text("Design Systems Summit")
                        .font(.system(size: 48, weight: .bold))
                    
                    Text("Scale your design workflow with the latest tools and methodologies. Connect with 5,000+ designers globally.")
                        .font(.title3)
                        .foregroundColor(.secondary)
                }
                
                HStack(spacing: 16) {
                    Button("Get Tickets") { }
                        .buttonStyle(.borderedProminent)
                        .controlSize(.large)
                    
                    Button("Learn More") { }
                        .buttonStyle(.bordered)
                        .controlSize(.large)
                }
                
                HStack(spacing: 32) {
                    Label("San Francisco, CA", systemImage: "calendar")
                    Label("Moscone Center", systemImage: "map")
                }
                .font(.subheadline)
                .foregroundColor(.secondary)
                .padding(.top, 32)
                
                Spacer()
            }
            .padding(64)
            .frame(maxWidth: .infinity, alignment: .leading)
            
            AsyncImage(url: URL(string: "https://images.unsplash.com/photo-1759852174174-7beac185d35f")) { image in
                image.resizable().aspectRatio(contentMode: .fill)
            } placeholder: {
                Color.gray
            }
            .frame(width: 500)
            .clipped()
        }
        .frame(height: 600)
    }
}`,
    v3: `import SwiftUI

struct HeroVariant3: View {
    var body: some View {
        ZStack {
            Color.blue // Primary
                .ignoresSafeArea()
            
            VStack(spacing: 32) {
                Text("INNOVATE. CREATE. DEPLOY.")
                    .font(.system(size: 64, weight: .black))
                    .textCase(.uppercase)
                    .multilineTextAlignment(.center)
                
                Text("The developer conference for the modern web. Experience 3 days of code, community, and chaos.")
                    .font(.title)
                    .fontWeight(.light)
                    .multilineTextAlignment(.center)
                    .opacity(0.9)
                
                Button("Save Your Spot") { }
                    .buttonStyle(.borderedProminent)
                    .tint(.white)
                    .foregroundColor(.blue)
                    .controlSize(.large)
                    .padding(.top, 16)
            }
            .padding()
            .foregroundColor(.white)
            .frame(maxWidth: 800)
        }
    }
}`,
    v4: `import SwiftUI

struct HeroVariant4: View {
    var body: some View {
        ZStack(alignment: .bottomLeading) {
            AsyncImage(url: URL(string: "https://images.unsplash.com/photo-1762968269894-1d7e1ce8894e")) { image in
                image.resizable().aspectRatio(contentMode: .fill)
            } placeholder: {
                Color.black
            }
            .overlay(Color.black.opacity(0.4))
            
            VStack(alignment: .leading, spacing: 24) {
                HStack {
                    Image(systemName: "play.fill")
                        .font(.title)
                        .padding()
                        .background(.ultraThinMaterial)
                        .clipShape(Circle())
                    
                    Text("WATCH SHOWREEL")
                        .font(.caption)
                        .fontWeight(.bold)
                        .tracking(2)
                }
                
                Text("Unleash Your\nPotential")
                    .font(.system(size: 72, weight: .bold))
                    .lineLimit(2)
                
                HStack(spacing: 16) {
                    Text("Nov 12-14, 2025")
                    Text("•")
                    Text("London, UK")
                    Text("•")
                    Text("ExCel Center")
                }
                .font(.title3)
                .fontWeight(.medium)
                .opacity(0.9)
            }
            .padding(40)
            .foregroundColor(.white)
        }
        .frame(height: 700)
    }
}`,
    v5: `import SwiftUI

struct HeroVariant5: View {
    var body: some View {
        HStack(spacing: 48) {
            VStack(alignment: .leading, spacing: 32) {
                Text("New Features Available")
                    .font(.caption)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(Color.blue.opacity(0.1))
                    .foregroundColor(.blue)
                    .cornerRadius(4)
                
                Text("Everything you need to scale")
                    .font(.system(size: 56, weight: .bold))
                
                Text("The complete platform for building modern applications. Streamline your workflow from design to deployment.")
                    .font(.title3)
                    .foregroundColor(.secondary)
                
                HStack(spacing: 16) {
                    Button("Start Building") { }
                        .buttonStyle(.borderedProminent)
                        .controlSize(.large)
                    
                    Button { } label: {
                        HStack {
                            Text("Read Documentation")
                            Image(systemName: "arrow.right")
                        }
                    }
                    .foregroundColor(.primary)
                }
                
                HStack(spacing: 12) {
                    HStack(spacing: -8) {
                        ForEach(0..<4) { _ in
                            Circle()
                                .fill(Color.gray.opacity(0.3))
                                .frame(width: 32, height: 32)
                                .overlay(Circle().stroke(Color.white, lineWidth: 2))
                        }
                    }
                    Text("Trusted by 10,000+ developers")
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
                .padding(.top, 16)
            }
            .padding(60)
            
            ZStack {
                Circle()
                    .fill(Color.blue.opacity(0.2))
                    .frame(width: 500, height: 500)
                    .blur(radius: 60)
                
                // Abstract cards representation
                HStack(spacing: 20) {
                    VStack(spacing: 20) {
                        RoundedRectangle(cornerRadius: 12)
                            .fill(Color(uiColor: .systemBackground))
                            .shadow(radius: 10)
                            .frame(width: 200, height: 120)
                        RoundedRectangle(cornerRadius: 12)
                            .fill(Color(uiColor: .systemBackground))
                            .shadow(radius: 10)
                            .frame(width: 200, height: 180)
                    }
                    .offset(y: 40)
                    
                    VStack(spacing: 20) {
                        RoundedRectangle(cornerRadius: 12)
                            .fill(Color(uiColor: .systemBackground))
                            .shadow(radius: 10)
                            .frame(width: 200, height: 180)
                        RoundedRectangle(cornerRadius: 12)
                            .fill(Color(uiColor: .systemBackground))
                            .shadow(radius: 10)
                            .frame(width: 200, height: 120)
                    }
                }
                .rotationEffect(.degrees(-6))
            }
        }
        .background(Color(uiColor: .secondarySystemBackground).opacity(0.3))
    }
}`
};

export const CODE_AGENDA_VUE = {
    v1: `<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin } from 'lucide-vue-next'

const SAMPLE_AGENDA = [
    { time: "09:00 AM", title: "Registration & Breakfast", location: "Main Hall", type: "General" },
    { time: "10:00 AM", title: "Opening Keynote: The Future of AI", location: "Auditorium A", type: "Keynote" },
    { time: "11:30 AM", title: "Breakout Session: React Server Components", location: "Room 204", type: "Workshop" },
    { time: "01:00 PM", title: "Networking Lunch", location: "Dining Area", type: "Networking" },
    { time: "02:30 PM", title: "Design Systems at Scale", location: "Auditorium B", type: "Panel" },
]
</script>

<template>
  <div class="w-full py-12 bg-background">
    <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-3xl font-bold mb-8 text-center text-foreground">Event Schedule</h2>
        <div class="space-y-4">
            <Card v-for="(item, i) in SAMPLE_AGENDA" :key="i" class="hover:shadow-md transition-shadow">
                <CardContent class="flex flex-col md:flex-row items-start md:items-center gap-4 p-6">
                    <div class="min-w-[100px] font-mono text-primary font-bold">
                        {{ item.time }}
                    </div>
                    <div class="flex-1 space-y-1">
                        <h3 class="font-semibold text-lg text-foreground">{{ item.title }}</h3>
                        <div class="flex items-center gap-4 text-sm text-muted-foreground">
                            <span class="flex items-center gap-1"><MapPin class="h-3 w-3" /> {{ item.location }}</span>
                            <Badge variant="secondary" class="text-xs">{{ item.type }}</Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  </div>
</template>`,
    v2: `<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { MapPin } from 'lucide-vue-next'

const SAMPLE_AGENDA = [
    { time: "09:00 AM", title: "Registration & Breakfast", location: "Main Hall", type: "General" },
    { time: "10:00 AM", title: "Opening Keynote: The Future of AI", location: "Auditorium A", type: "Keynote" },
    { time: "11:30 AM", title: "Breakout Session: React Server Components", location: "Room 204", type: "Workshop" },
    { time: "01:00 PM", title: "Networking Lunch", location: "Dining Area", type: "Networking" },
    { time: "02:30 PM", title: "Design Systems at Scale", location: "Auditorium B", type: "Panel" },
]
</script>

<template>
  <div class="w-full py-16 bg-muted/30">
    <div class="container mx-auto px-4 max-w-3xl">
         <div class="text-center mb-12">
            <Badge class="mb-2">Day 1</Badge>
            <h2 class="text-4xl font-bold text-foreground">Timeline</h2>
        </div>
        <div class="relative border-l-2 border-primary/20 ml-4 md:ml-0 space-y-12">
            <div v-for="(item, i) in SAMPLE_AGENDA" :key="i" class="relative pl-8 md:pl-0">
                <div class="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-primary border-4 border-background" />
                <div class="md:grid md:grid-cols-5 md:gap-8">
                    <div class="md:col-span-1 md:text-right pt-0.5">
                        <span class="text-sm font-bold text-muted-foreground">{{ item.time }}</span>
                    </div>
                    <div class="md:col-span-4 mt-2 md:mt-0">
                        <div class="bg-card p-6 rounded-lg border shadow-sm space-y-3">
                            <Badge variant="outline" class="w-fit">{{ item.type }}</Badge>
                            <h3 class="text-xl font-bold text-foreground">{{ item.title }}</h3>
                            <div class="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin class="h-4 w-4" /> {{ item.location }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>`,
    v3: `<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ChevronRight, User, MapPin } from 'lucide-vue-next'

const SAMPLE_AGENDA = [
    { time: "09:00 AM", title: "Registration & Breakfast", location: "Main Hall", type: "General" },
    { time: "10:00 AM", title: "Opening Keynote: The Future of AI", location: "Auditorium A", type: "Keynote" },
    { time: "11:30 AM", title: "Breakout Session: React Server Components", location: "Room 204", type: "Workshop" },
    { time: "01:00 PM", title: "Networking Lunch", location: "Dining Area", type: "Networking" },
    { time: "02:30 PM", title: "Design Systems at Scale", location: "Auditorium B", type: "Panel" },
]
</script>

<template>
  <div class="w-full py-12 bg-background border-y border-border">
    <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-end mb-8 border-b pb-4">
             <div>
                <h2 class="text-2xl font-bold text-foreground">Sessions</h2>
                <p class="text-muted-foreground">Explore the tracks and sessions.</p>
             </div>
             <div class="flex gap-2 mt-4 md:mt-0">
                 <Button variant="default" size="sm">Day 1</Button>
                 <Button variant="ghost" size="sm">Day 2</Button>
                 <Button variant="ghost" size="sm">Day 3</Button>
             </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="(item, i) in SAMPLE_AGENDA" :key="i" class="group p-5 rounded-xl border bg-card hover:border-primary/50 transition-colors cursor-pointer">
                <div class="flex justify-between items-start mb-4">
                    <Badge variant="secondary" class="font-mono">{{ item.time }}</Badge>
                    <ChevronRight class="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 class="font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">{{ item.title }}</h3>
                <p class="text-sm text-muted-foreground mb-4 line-clamp-2">
                    Join us for an in-depth session about {{ item.title.toLowerCase() }} and learn from industry experts.
                </p>
                <Separator class="my-3" />
                <div class="flex justify-between items-center text-xs text-muted-foreground">
                    <span class="flex items-center gap-1"><User class="h-3 w-3"/> Speaker Name</span>
                    <span class="flex items-center gap-1"><MapPin class="h-3 w-3"/> {{ item.location }}</span>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>`
};

export const CODE_AGENDA_SWIFT = {
    v1: `import SwiftUI

struct AgendaItem: Identifiable {
    let id = UUID()
    let time: String
    let title: String
    let location: String
    let type: String
}

struct AgendaVariant1: View {
    let agenda = [
        AgendaItem(time: "09:00 AM", title: "Registration & Breakfast", location: "Main Hall", type: "General"),
        AgendaItem(time: "10:00 AM", title: "Opening Keynote", location: "Auditorium A", type: "Keynote"),
        AgendaItem(time: "11:30 AM", title: "Breakout Session", location: "Room 204", type: "Workshop")
    ]
    
    var body: some View {
        List(agenda) { item in
            HStack(alignment: .top, spacing: 16) {
                Text(item.time)
                    .font(.caption)
                    .monospaced()
                    .foregroundColor(.blue)
                    .frame(width: 70, alignment: .leading)
                
                VStack(alignment: .leading, spacing: 4) {
                    Text(item.title)
                        .font(.headline)
                    
                    HStack {
                        Label(item.location, systemImage: "map")
                        Text("•")
                        Text(item.type)
                            .font(.caption)
                            .padding(.horizontal, 6)
                            .padding(.vertical, 2)
                            .background(Color.gray.opacity(0.1))
                            .cornerRadius(4)
                    }
                    .font(.caption)
                    .foregroundColor(.secondary)
                }
            }
            .padding(.vertical, 8)
        }
        .listStyle(.plain)
    }
}`,
    v2: `import SwiftUI

struct AgendaVariant2: View {
    let agenda = [
        AgendaItem(time: "09:00 AM", title: "Registration", location: "Main Hall", type: "General"),
        AgendaItem(time: "10:00 AM", title: "Keynote", location: "Auditorium A", type: "Keynote")
    ]
    
    var body: some View {
        ScrollView {
            VStack(spacing: 0) {
                ForEach(agenda) { item in
                    HStack(alignment: .top, spacing: 16) {
                        Text(item.time)
                            .font(.caption)
                            .bold()
                            .foregroundColor(.secondary)
                            .frame(width: 70, alignment: .trailing)
                            .padding(.top, 4)
                        
                        VStack(alignment: .leading) {
                            Circle()
                                .fill(Color.blue)
                                .frame(width: 10, height: 10)
                                .background(Circle().stroke(Color.white, lineWidth: 2))
                            
                            Rectangle()
                                .fill(Color.gray.opacity(0.2))
                                .frame(width: 2)
                                .frame(maxHeight: .infinity)
                                .padding(.leading, 4)
                        }
                        
                        VStack(alignment: .leading, spacing: 8) {
                            Text(item.type)
                                .font(.caption)
                                .padding(.horizontal, 8)
                                .padding(.vertical, 4)
                                .background(Color.white)
                                .overlay(RoundedRectangle(cornerRadius: 4).stroke(Color.gray.opacity(0.3)))
                            
                            Text(item.title)
                                .font(.title3)
                                .bold()
                            
                            Label(item.location, systemImage: "map")
                                .font(.caption)
                                .foregroundColor(.secondary)
                        }
                        .padding(16)
                        .background(Color(uiColor: .secondarySystemBackground))
                        .cornerRadius(12)
                        .padding(.bottom, 24)
                    }
                }
            }
            .padding()
        }
    }
}`,
    v3: `import SwiftUI

struct AgendaVariant3: View {
    var body: some View {
        ScrollView {
            LazyVGrid(columns: [GridItem(.adaptive(minimum: 300))], spacing: 20) {
                ForEach(0..<6) { i in
                    VStack(alignment: .leading, spacing: 12) {
                        HStack {
                            Text("09:00 AM")
                                .font(.caption)
                                .padding(6)
                                .background(Color.secondary.opacity(0.1))
                                .cornerRadius(4)
                            Spacer()
                            Image(systemName: "chevron.right")
                                .foregroundColor(.secondary)
                        }
                        
                        Text("Session Title Here")
                            .font(.headline)
                        
                        Text("Join us for an in-depth session about the topic.")
                            .font(.caption)
                            .foregroundColor(.secondary)
                            .lineLimit(2)
                        
                        Divider()
                        
                        HStack {
                            Label("Speaker", systemImage: "person")
                            Spacer()
                            Label("Room 204", systemImage: "map")
                        }
                        .font(.caption2)
                        .foregroundColor(.secondary)
                    }
                    .padding()
                    .background(Color(uiColor: .systemBackground))
                    .cornerRadius(12)
                    .shadow(color: .black.opacity(0.05), radius: 5)
                }
            }
            .padding()
            .background(Color(uiColor: .secondarySystemBackground))
        }
    }
}`
};

export const CODE_COUNTDOWN_VUE = {
    v1: `<script setup lang="ts">
const items = [
  { val: "14", label: "Days" },
  { val: "08", label: "Hours" },
  { val: "45", label: "Minutes" },
  { val: "12", label: "Seconds" }
]
</script>

<template>
  <div class="w-full py-20 bg-foreground text-background">
      <div class="container mx-auto px-4 text-center">
          <p class="text-lg font-medium opacity-80 mb-8 uppercase tracking-widest">Event Starts In</p>
          <div class="flex flex-wrap justify-center gap-8 md:gap-16">
              <div v-for="(item, i) in items" :key="i" class="flex flex-col items-center">
                  <span class="text-6xl md:text-8xl font-black tabular-nums tracking-tighter">
                      {{ item.val }}
                  </span>
                  <span class="text-sm md:text-base opacity-60 font-mono mt-2">{{ item.label }}</span>
              </div>
          </div>
      </div>
  </div>
</template>`,
    v2: `<script setup lang="ts">
import { Card } from '@/components/ui/card'

const items = [
  { val: "14", label: "DAYS" },
  { val: "08", label: "HOURS" },
  { val: "45", label: "MINS" },
  { val: "12", label: "SECS" }
]
</script>

<template>
  <div 
    class="w-full py-24 bg-cover bg-center relative"
    style="background-image: url('https://images.unsplash.com/photo-1761304891716-eb8b8b7f1a37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')"
  >
      <div class="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div class="container relative z-10 mx-auto px-4 text-center">
          <h2 class="text-3xl font-bold mb-10 text-foreground">Don't Miss Out</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <Card v-for="(item, i) in items" :key="i" class="p-6 flex flex-col items-center justify-center bg-card/50 border-primary/20 shadow-xl backdrop-blur-md">
                  <span class="text-4xl md:text-5xl font-bold text-primary mb-1">{{ item.val }}</span>
                  <span class="text-xs font-bold text-muted-foreground tracking-widest">{{ item.label }}</span>
              </Card>
          </div>
      </div>
  </div>
</template>`,
    v3: `<template>
  <div class="w-full bg-primary text-primary-foreground py-4">
      <div class="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm md:text-base font-medium">
          <span class="opacity-90">Registration closes in:</span>
          <div class="flex items-center gap-4 font-mono text-lg md:text-xl">
              <span>14d</span>
              <span class="opacity-50">:</span>
              <span>08h</span>
              <span class="opacity-50">:</span>
              <span>45m</span>
              <span class="opacity-50">:</span>
              <span>12s</span>
          </div>
          <button class="underline hover:opacity-80 decoration-2 underline-offset-4">Register Now</button>
      </div>
  </div>
</template>`
};

export const CODE_COUNTDOWN_SWIFT = {
    v1: `import SwiftUI

struct CountdownVariant1: View {
    let items = [
        ("14", "Days"), ("08", "Hours"), ("45", "Minutes"), ("12", "Seconds")
    ]
    
    var body: some View {
        ZStack {
            Color.primary.ignoresSafeArea()
            
            VStack(spacing: 32) {
                Text("EVENT STARTS IN")
                    .font(.subheadline)
                    .tracking(4)
                    .opacity(0.8)
                
                HStack(spacing: 32) {
                    ForEach(0..<4) { i in
                        VStack(spacing: 8) {
                            Text(items[i].0)
                                .font(.system(size: 64, weight: .black, design: .monospaced))
                            
                            Text(items[i].1)
                                .font(.caption)
                                .opacity(0.6)
                        }
                    }
                }
            }
            .foregroundColor(Color(uiColor: .systemBackground))
        }
    }
}`,
    v2: `import SwiftUI

struct CountdownVariant2: View {
    let items = [
        ("14", "DAYS"), ("08", "HOURS"), ("45", "MINS"), ("12", "SECS")
    ]
    
    var body: some View {
        ZStack {
            AsyncImage(url: URL(string: "https://images.unsplash.com/photo-1761304891716-eb8b8b7f1a37")) { image in
                image.resizable().aspectRatio(contentMode: .fill)
            } placeholder: {
                Color.gray
            }
            .overlay(.regularMaterial)
            
            VStack(spacing: 40) {
                Text("Don't Miss Out")
                    .font(.largeTitle)
                    .bold()
                
                HStack(spacing: 16) {
                    ForEach(0..<4) { i in
                        VStack(spacing: 4) {
                            Text(items[i].0)
                                .font(.largeTitle)
                                .bold()
                                .foregroundColor(.blue)
                            
                            Text(items[i].1)
                                .font(.caption2)
                                .bold()
                                .foregroundColor(.secondary)
                        }
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color(uiColor: .systemBackground).opacity(0.5))
                        .cornerRadius(12)
                        .shadow(radius: 5)
                    }
                }
            }
            .padding()
        }
    }
}`,
    v3: `import SwiftUI

struct CountdownVariant3: View {
    var body: some View {
        HStack(spacing: 24) {
            Text("Registration closes in:")
                .opacity(0.9)
            
            HStack(spacing: 12) {
                Text("14d")
                Text(":").opacity(0.5)
                Text("08h")
                Text(":").opacity(0.5)
                Text("45m")
                Text(":").opacity(0.5)
                Text("12s")
            }
            .font(.system(.title3, design: .monospaced))
            
            Button("Register Now") { }
                .underline()
        }
        .padding()
        .frame(maxWidth: .infinity)
        .background(Color.blue)
        .foregroundColor(.white)
    }
}`
};

export const CODE_SPEAKERS_VUE = {
    v1: `<script setup lang="ts">
const SPEAKERS = [
    { name: "Sarah Johnson", role: "VP of Design", company: "Acme Corp", img: "https://images.unsplash.com/photo-1766928963-c72589b9ef3f?w=400" },
    { name: "Michael Chen", role: "CTO", company: "TechStart", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400" },
    { name: "Jessica Williams", role: "Product Lead", company: "Innovate", img: "https://images.unsplash.com/photo-1762968269894-1d7e1ce8894e?w=400" },
]
</script>

<template>
  <div class="w-full py-16 bg-background">
      <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-center mb-12 text-foreground">Featured Speakers</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <div v-for="(s, i) in SPEAKERS" :key="i" class="group relative overflow-hidden rounded-xl">
                  <div class="aspect-[3/4] overflow-hidden bg-muted">
                      <img 
                        :src="s.img" 
                        :alt="s.name" 
                        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
                      />
                  </div>
                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                  <div class="absolute bottom-0 left-0 p-6 text-white w-full">
                      <h3 class="text-xl font-bold">{{ s.name }}</h3>
                      <p class="text-sm opacity-80">{{ s.role }}, {{ s.company }}</p>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>`,
    v2: `<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Linkedin, Twitter } from 'lucide-vue-next'

const SPEAKERS = [
    { name: "Sarah Johnson", role: "VP of Design", company: "Acme Corp", img: "https://images.unsplash.com/photo-1766928963-c72589b9ef3f?w=400" },
    { name: "Michael Chen", role: "CTO", company: "TechStart", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400" },
]
</script>

<template>
  <div class="w-full py-16 bg-muted/20">
      <div class="container mx-auto px-4 max-w-4xl">
          <div class="flex justify-between items-center mb-12">
            <h2 class="text-3xl font-bold text-foreground">Speakers</h2>
            <Button variant="outline">View All</Button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card v-for="(s, i) in SPEAKERS" :key="i" class="flex items-center gap-4 p-4 hover:border-primary transition-colors">
                  <Avatar class="h-16 w-16">
                      <AvatarImage :src="s.img" />
                      <AvatarFallback>{{ s.name[0] }}</AvatarFallback>
                  </Avatar>
                  <div class="flex-1">
                      <h3 class="font-bold text-lg text-foreground">{{ s.name }}</h3>
                      <p class="text-sm text-muted-foreground">{{ s.role }} @ {{ s.company }}</p>
                  </div>
                  <div class="flex gap-2">
                      <Button size="icon" variant="ghost" class="h-8 w-8 text-muted-foreground hover:text-primary">
                          <Linkedin class="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" class="h-8 w-8 text-muted-foreground hover:text-primary">
                          <Twitter class="h-4 w-4" />
                      </Button>
                  </div>
              </Card>
          </div>
      </div>
  </div>
</template>`,
    v3: `<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'

const SPEAKERS = [
    { name: "Sarah Johnson", role: "VP of Design", company: "Acme Corp", img: "https://images.unsplash.com/photo-1766928963-c72589b9ef3f?w=400" },
    { name: "Michael Chen", role: "CTO", company: "TechStart", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400" },
    { name: "Jessica Williams", role: "Product Lead", company: "Innovate", img: "https://images.unsplash.com/photo-1762968269894-1d7e1ce8894e?w=400" },
]
</script>

<template>
  <div class="w-full py-20 bg-background overflow-hidden">
      <div class="container mx-auto px-4 mb-8">
          <h2 class="text-4xl font-bold text-foreground">World Class Experts</h2>
          <p class="text-muted-foreground mt-2">Hear from the people building the future.</p>
      </div>
      <div class="flex gap-6 overflow-x-auto pb-8 px-4 container mx-auto snap-x">
          <Card v-for="(s, i) in SPEAKERS" :key="i" class="min-w-[280px] snap-center bg-card border-none shadow-lg">
              <div class="aspect-square bg-muted rounded-t-xl overflow-hidden">
                  <img :src="s.img" :alt="s.name" class="w-full h-full object-cover" />
              </div>
              <CardContent class="p-6 text-center space-y-2">
                  <h3 class="font-bold text-xl text-foreground">{{ s.name }}</h3>
                  <p class="text-primary font-medium text-sm">{{ s.company }}</p>
                  <p class="text-xs text-muted-foreground">{{ s.role }}</p>
              </CardContent>
          </Card>
      </div>
  </div>
</template>`
};

export const CODE_SPEAKERS_SWIFT = {
    v1: `import SwiftUI

struct Speaker: Identifiable {
    let id = UUID()
    let name: String
    let role: String
    let company: String
    let imageURL: String
}

struct SpeakersVariant1: View {
    let speakers = [
        Speaker(name: "Sarah Johnson", role: "VP of Design", company: "Acme Corp", imageURL: "https://images.unsplash.com/photo-1766928963-c72589b9ef3f"),
        Speaker(name: "Michael Chen", role: "CTO", company: "TechStart", imageURL: "https://images.unsplash.com/photo-1540575467063-178a50c2df87")
    ]
    
    var body: some View {
        ScrollView {
            LazyVGrid(columns: [GridItem(.adaptive(minimum: 150), spacing: 20)], spacing: 20) {
                ForEach(speakers) { speaker in
                    ZStack(alignment: .bottomLeading) {
                        AsyncImage(url: URL(string: speaker.imageURL)) { image in
                            image.resizable().aspectRatio(contentMode: .fill)
                        } placeholder: {
                            Color.gray
                        }
                        .frame(height: 250)
                        .clipped()
                        .overlay(LinearGradient(colors: [.black.opacity(0.8), .clear], startPoint: .bottom, endPoint: .center))
                        
                        VStack(alignment: .leading) {
                            Text(speaker.name)
                                .font(.headline)
                            Text("\(speaker.role), \(speaker.company)")
                                .font(.caption)
                                .opacity(0.8)
                        }
                        .foregroundColor(.white)
                        .padding()
                    }
                    .cornerRadius(12)
                }
            }
            .padding()
        }
    }
}`,
    v2: `import SwiftUI

struct SpeakersVariant2: View {
    var body: some View {
        VStack {
            HStack {
                Text("Speakers").font(.largeTitle).bold()
                Spacer()
                Button("View All") { }
            }
            .padding()
            
            ScrollView {
                LazyVGrid(columns: [GridItem(.adaptive(minimum: 300))], spacing: 16) {
                    ForEach(0..<4) { _ in
                        HStack(spacing: 16) {
                            Circle()
                                .fill(Color.gray)
                                .frame(width: 60, height: 60)
                            
                            VStack(alignment: .leading) {
                                Text("Sarah Johnson").font(.headline)
                                Text("VP of Design @ Acme").font(.subheadline).foregroundColor(.secondary)
                            }
                            Spacer()
                            HStack {
                                Image(systemName: "link")
                                Image(systemName: "message")
                            }
                            .foregroundColor(.secondary)
                        }
                        .padding()
                        .background(Color(uiColor: .systemBackground))
                        .cornerRadius(12)
                        .shadow(radius: 2)
                    }
                }
                .padding(.horizontal)
            }
        }
        .background(Color(uiColor: .secondarySystemBackground))
    }
}`,
    v3: `import SwiftUI

struct SpeakersVariant3: View {
    var body: some View {
        VStack(alignment: .leading) {
            Text("World Class Experts")
                .font(.largeTitle)
                .bold()
                .padding(.horizontal)
            
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 20) {
                    ForEach(0..<5) { _ in
                        VStack {
                            Rectangle()
                                .fill(Color.gray)
                                .frame(height: 250)
                            
                            VStack(spacing: 4) {
                                Text("Michael Chen")
                                    .font(.headline)
                                Text("TechStart")
                                    .font(.subheadline)
                                    .foregroundColor(.blue)
                                Text("CTO")
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                            }
                            .padding()
                        }
                        .frame(width: 250)
                        .background(Color(uiColor: .systemBackground))
                        .cornerRadius(12)
                        .shadow(radius: 5)
                    }
                }
                .padding()
            }
        }
    }
}`
};
