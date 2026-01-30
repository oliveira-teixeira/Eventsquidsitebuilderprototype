export const CODE_DOCS_VUE = {
    v1: `<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import { FileText } from 'lucide-vue-next'

const DOCS = [
    { name: "Conference Brochure", size: "2.4 MB", type: "PDF" },
    { name: "Sponsorship Deck", size: "5.1 MB", type: "PDF" },
    { name: "Attendee Guidelines", size: "1.2 MB", type: "DOCX" },
    { name: "Code of Conduct", size: "0.5 MB", type: "PDF" },
]
</script>

<template>
  <div class="w-full py-16 bg-muted/10">
      <div class="container mx-auto px-4">
          <h2 class="text-2xl font-bold mb-8 text-foreground">Downloads</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <Card v-for="(doc, i) in DOCS" :key="i" class="hover:border-primary transition-colors cursor-pointer group">
                  <CardContent class="p-6 flex flex-col items-center text-center gap-4">
                      <div class="h-16 w-16 bg-muted rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                          <FileText class="h-8 w-8 text-muted-foreground group-hover:text-primary" />
                      </div>
                      <div>
                          <h3 class="font-medium text-foreground">{{ doc.name }}</h3>
                          <p class="text-xs text-muted-foreground mt-1">{{ doc.type }} • {{ doc.size }}</p>
                      </div>
                  </CardContent>
              </Card>
          </div>
      </div>
  </div>
</template>`,
    v2: `<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { File, Download } from 'lucide-vue-next'

const DOCS = [/*...*/]
</script>

<template>
  <div class="w-full py-12 bg-background">
      <div class="container mx-auto px-4 max-w-3xl">
          <div class="flex items-center justify-between mb-8">
            <h2 class="text-2xl font-bold text-foreground">Resources</h2>
            <Button variant="link">View All</Button>
          </div>
          <div class="space-y-2">
              <div v-for="(doc, i) in DOCS" :key="i" class="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                  <div class="flex items-center gap-4">
                      <File class="h-5 w-5 text-muted-foreground" />
                      <span class="font-medium text-foreground">{{ doc.name }}</span>
                  </div>
                  <div class="flex items-center gap-4">
                      <span class="text-xs text-muted-foreground hidden sm:block">{{ doc.size }}</span>
                      <Button size="icon" variant="ghost">
                          <Download class="h-4 w-4" />
                      </Button>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>`,
    v3: `<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { FileIcon, ExternalLink } from 'lucide-vue-next'
</script>

<template>
  <div class="w-full py-16 bg-background">
      <div class="container mx-auto px-4">
          <h2 class="text-2xl font-bold mb-8 text-foreground">Media Kit</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card v-for="i in 3" :key="i" class="overflow-hidden">
                  <div class="h-40 bg-muted flex items-center justify-center border-b">
                      <FileIcon class="h-12 w-12 text-muted-foreground/50" />
                  </div>
                  <CardHeader>
                      <CardTitle class="text-lg">Press Release {{ i }}</CardTitle>
                      <CardDescription>Published on Oct {{ 10 + i }}, 2025</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <Button class="w-full gap-2" variant="outline">
                          <ExternalLink class="h-4 w-4" /> Open Document
                      </Button>
                  </CardContent>
              </Card>
          </div>
      </div>
  </div>
</template>`
};

export const CODE_DOCS_SWIFT = {
    v1: `import SwiftUI

struct DocumentsVariant1: View {
    var body: some View {
        VStack(alignment: .leading) {
            Text("Downloads").font(.title2).bold()
            LazyVGrid(columns: [GridItem(.adaptive(minimum: 150))], spacing: 20) {
                ForEach(0..<4) { _ in
                    VStack(spacing: 16) {
                        Circle().fill(Color.gray.opacity(0.1)).frame(width: 60, height: 60)
                            .overlay(Image(systemName: "doc.text").foregroundColor(.gray))
                        
                        VStack(spacing: 4) {
                            Text("Brochure").font(.headline)
                            Text("PDF • 2.4 MB").font(.caption).foregroundColor(.secondary)
                        }
                    }
                    .padding()
                    .background(Color(uiColor: .systemBackground))
                    .cornerRadius(12)
                    .shadow(radius: 2)
                }
            }
        }
        .padding()
        .background(Color(uiColor: .secondarySystemBackground))
    }
}`,
    v2: `import SwiftUI

struct DocumentsVariant2: View {
    var body: some View {
        VStack {
            HStack {
                Text("Resources").font(.title2).bold()
                Spacer()
                Button("View All") { }
            }
            .padding(.bottom)
            
            VStack(spacing: 12) {
                ForEach(0..<4) { _ in
                    HStack {
                        Image(systemName: "doc").foregroundColor(.secondary)
                        Text("Document Name").font(.headline)
                        Spacer()
                        Text("2.4 MB").font(.caption).foregroundColor(.secondary)
                        Image(systemName: "arrow.down.circle").foregroundColor(.blue)
                    }
                    .padding()
                    .background(Color(uiColor: .systemBackground))
                    .cornerRadius(8)
                    .overlay(RoundedRectangle(cornerRadius: 8).stroke(Color.gray.opacity(0.2)))
                }
            }
        }
        .padding()
    }
}`,
    v3: `import SwiftUI

struct DocumentsVariant3: View {
    var body: some View {
        VStack(alignment: .leading) {
            Text("Media Kit").font(.title2).bold()
            
            LazyVGrid(columns: [GridItem(.adaptive(minimum: 250))], spacing: 20) {
                ForEach(0..<3) { _ in
                    VStack(spacing: 0) {
                        Rectangle().fill(Color.gray.opacity(0.1)).frame(height: 120)
                            .overlay(Image(systemName: "doc").font(.largeTitle).foregroundColor(.gray))
                        
                        VStack(alignment: .leading, spacing: 12) {
                            Text("Press Release").font(.headline)
                            Text("Published Oct 10").font(.caption).foregroundColor(.secondary)
                            Button("Open Document") { }
                                .buttonStyle(.bordered)
                                .frame(maxWidth: .infinity)
                        }
                        .padding()
                    }
                    .background(Color(uiColor: .systemBackground))
                    .cornerRadius(12)
                    .shadow(radius: 5)
                }
            }
        }
        .padding()
    }
}`
};

export const CODE_HOTEL_VUE = {
    v1: `<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Wifi, Coffee, Dumbbell } from 'lucide-vue-next'
</script>

<template>
  <div class="w-full py-20 bg-background border-b border-border">
      <div class="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="rounded-2xl overflow-hidden shadow-2xl h-[400px]">
              <img 
                src="https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
                alt="Hotel Lobby" 
                class="w-full h-full object-cover"
              />
          </div>
          <div class="space-y-6">
              <Badge variant="secondary">Official Partner</Badge>
              <h2 class="text-4xl font-bold text-foreground">The Marriott Marquis</h2>
              <p class="text-lg text-muted-foreground">
                  Stay where the action is. Enjoy exclusive rates for conference attendees starting at $199/night. 
                  Includes free wifi and breakfast.
              </p>
              <ul class="space-y-2 text-foreground">
                  <li class="flex items-center gap-2"><Wifi class="h-4 w-4 text-primary"/> High-speed Wifi</li>
                  <li class="flex items-center gap-2"><Coffee class="h-4 w-4 text-primary"/> Continental Breakfast</li>
                  <li class="flex items-center gap-2"><Dumbbell class="h-4 w-4 text-primary"/> 24/7 Gym Access</li>
              </ul>
              <div class="pt-4">
                  <Button size="lg">Book Your Room</Button>
                  <p class="text-xs text-muted-foreground mt-2">Promo code: CONF2025</p>
              </div>
          </div>
      </div>
  </div>
</template>`,
    v2: `<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
</script>

<template>
  <div class="w-full py-16 bg-muted/30">
      <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-center mb-12 text-foreground">Accommodations</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card v-for="(room, i) in ['Luxury Suite', 'Standard King', 'Double Queen']" :key="i" class="overflow-hidden flex flex-col">
                  <div class="h-48 bg-muted relative">
                       <img 
                            src="https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
                            :alt="room" 
                            class="w-full h-full object-cover"
                        />
                        <div class="absolute top-4 right-4 bg-background/90 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                            \${{ 150 + i * 50 }}/night
                        </div>
                  </div>
                  <CardContent class="p-6 flex-1 flex flex-col">
                      <h3 class="text-xl font-bold mb-2 text-foreground">{{ room }}</h3>
                      <p class="text-muted-foreground text-sm mb-4 flex-1">
                          Perfect for relaxing after a long day of networking.
                      </p>
                      <Button variant="outline" class="w-full">Select</Button>
                  </CardContent>
              </Card>
          </div>
      </div>
  </div>
</template>`,
    v3: `<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="w-full bg-primary py-12 px-4">
      <div class="container mx-auto max-w-4xl bg-background rounded-2xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div class="space-y-4">
              <h2 class="text-3xl font-bold text-foreground">Need a place to stay?</h2>
              <p class="text-muted-foreground max-w-md">
                  We have secured a block of rooms at the Hilton for a discounted rate. 
                  Limited availability remains.
              </p>
          </div>
          <div class="flex flex-col gap-3 min-w-[200px]">
              <Button size="lg" class="w-full">Reserve Now</Button>
          </div>
      </div>
  </div>
</template>`,
    v4: `<script setup lang="ts">
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, ExternalLink, MapPin, Phone, Mail } from 'lucide-vue-next'
</script>

<template>
  <div class="w-full py-20 bg-background">
      <div class="container mx-auto px-4 max-w-6xl">
          <div class="mb-12">
              <h2 class="text-4xl font-bold text-foreground mb-4">Accommodations</h2>
              <p class="text-muted-foreground text-lg">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
          </div>
          
          <Accordion type="multiple" :default-value="['item-1']" class="w-full space-y-4">
              <AccordionItem value="item-1" class="border-b-0">
                  <AccordionTrigger class="text-3xl font-semibold hover:no-underline py-6">
                      Recommended Hotels
                  </AccordionTrigger>
                  <AccordionContent>
                      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
                          <div v-for="i in 3" :key="i" class="group rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
                              <div class="aspect-[4/3] bg-muted relative overflow-hidden">
                                   <img 
                                      :src="\`https://images.unsplash.com/photo-\${i === 1 ? '1566073771259-6a8506099945' : i === 2 ? '1582719508461-905c673771fd' : '1542314831-068cd1dbfeeb'}?auto=format&fit=crop&q=80&w=800\`"
                                      alt="Hotel" 
                                      class="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" 
                                  />
                              </div>
                              <div class="p-6 space-y-6">
                                  <div class="space-y-4">
                                      <div class="space-y-2">
                                          <h3 class="text-xl font-semibold text-primary">Hotel Name</h3>
                                          <Badge variant="secondary" class="font-normal bg-muted text-foreground hover:bg-muted/80">
                                              <CheckCircle2 class="mr-1 h-3 w-3" />
                                              Book by March for a 15% discount
                                          </Badge>
                                      </div>
                                      
                                      <div class="space-y-3 text-sm text-muted-foreground">
                                          <div class="flex items-start gap-2">
                                              <MapPin class="h-4 w-4 mt-0.5 shrink-0" />
                                              <span>123 Main St, City, Country</span>
                                          </div>
                                          <div class="flex items-center gap-2">
                                              <Phone class="h-4 w-4 shrink-0" />
                                              <span>+1 234 567 8900</span>
                                          </div>
                                          <div class="flex items-center gap-2">
                                              <Mail class="h-4 w-4 shrink-0" />
                                              <span>info@grandhotel.com</span>
                                          </div>
                                      </div>
                                  </div>
                                  
                                  <Button variant="secondary" class="w-fit">
                                      Visit Website
                                      <ExternalLink class="ml-2 h-4 w-4" />
                                  </Button>
                              </div>
                          </div>
                      </div>
                  </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" class="border-b-0">
                  <AccordionTrigger class="text-3xl font-semibold hover:no-underline py-6">
                      Find Hotels
                  </AccordionTrigger>
                  <AccordionContent>
                      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
                          <div v-for="(title, i) in ['Hotels near the Event', 'Hotels near the Airport']" :key="i" class="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
                              <div class="aspect-[4/3] bg-muted relative">
                                  <img 
                                      :src="\`https://images.unsplash.com/photo-\${i === 0 ? '1445019980597-93fa8acb726c' : '1569335846770-441bec083f21'}?auto=format&fit=crop&q=80&w=800\`"
                                      :alt="title"
                                      class="object-cover w-full h-full"
                                  />
                              </div>
                              <div class="p-6 space-y-4">
                                  <div class="space-y-1">
                                      <h3 class="text-xl font-semibold">{{ title }}</h3>
                                      <p class="text-sm text-muted-foreground">Description goes here</p>
                                  </div>
                                  <Button class="w-fit">
                                      View Options
                                      <ExternalLink class="ml-2 h-4 w-4" />
                                  </Button>
                              </div>
                          </div>
                      </div>
                  </AccordionContent>
              </AccordionItem>
          </Accordion>
      </div>
  </div>
</template>`
};

export const CODE_HOTEL_SWIFT = {
    v1: `import SwiftUI

struct HotelVariant1: View {
    var body: some View {
        HStack(spacing: 32) {
            AsyncImage(url: URL(string: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f")) { image in
                image.resizable().aspectRatio(contentMode: .fill)
            } placeholder: { Color.gray }
            .frame(width: 400, height: 400)
            .cornerRadius(16)
            
            VStack(alignment: .leading, spacing: 20) {
                Text("Official Partner").font(.caption).padding(4).background(Color.gray.opacity(0.1))
                Text("The Marriott Marquis").font(.largeTitle).bold()
                Text("Stay where the action is. Enjoy exclusive rates.").foregroundColor(.secondary)
                
                VStack(alignment: .leading, spacing: 8) {
                    Label("High-speed Wifi", systemImage: "wifi")
                    Label("Continental Breakfast", systemImage: "cup.and.saucer")
                }
                
                Button("Book Your Room") { }
                    .buttonStyle(.borderedProminent)
                    .controlSize(.large)
            }
        }
        .padding()
    }
}`,
    v2: `import SwiftUI

struct HotelVariant2: View {
    var body: some View {
        ScrollView {
            LazyVGrid(columns: [GridItem(.adaptive(minimum: 280))], spacing: 24) {
                ForEach(0..<3) { i in
                    VStack(alignment: .leading, spacing: 0) {
                        Color.gray
                            .frame(height: 150)
                            .overlay(alignment: .topTrailing) {
                                Text("$150/night").font(.caption).bold()
                                    .padding(6).background(.white).cornerRadius(20).padding()
                            }
                        
                        VStack(alignment: .leading, spacing: 8) {
                            Text("Luxury Suite").font(.title3).bold()
                            Text("Perfect for relaxing.").font(.caption).foregroundColor(.secondary)
                            Button("Select") { }
                                .buttonStyle(.bordered)
                                .frame(maxWidth: .infinity)
                        }
                        .padding()
                    }
                    .background(Color(uiColor: .systemBackground))
                    .cornerRadius(12)
                    .shadow(radius: 5)
                }
            }
            .padding()
        }
        .background(Color(uiColor: .secondarySystemBackground))
    }
}`,
    v3: `import SwiftUI

struct HotelVariant3: View {
    var body: some View {
        ZStack {
            Color.blue.ignoresSafeArea()
            
            HStack(spacing: 40) {
                VStack(alignment: .leading, spacing: 12) {
                    Text("Need a place to stay?").font(.title).bold()
                    Text("We have secured a block of rooms at the Hilton.").foregroundColor(.secondary)
                }
                
                Button("Reserve Now") { }
                    .buttonStyle(.borderedProminent)
            }
            .padding(40)
            .background(Color.white)
            .cornerRadius(16)
            .shadow(radius: 20)
            .padding()
        }
    }
}`,
    v4: `import SwiftUI

struct HotelVariant4: View {
    @State private var expandedSections: Set<String> = ["recommended"]
    
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 32) {
                VStack(alignment: .leading, spacing: 8) {
                    Text("Accommodations")
                        .font(.system(size: 36, weight: .bold))
                    Text("Lorem ipsum dolor sit amet, consectetur adipiscing elit.")
                        .font(.body)
                        .foregroundColor(.secondary)
                }
                
                // Recommended Hotels Section
                DisclosureGroup(
                    isExpanded: Binding(
                        get: { expandedSections.contains("recommended") },
                        set: { isExpanded in
                            if isExpanded { expandedSections.insert("recommended") }
                            else { expandedSections.remove("recommended") }
                        }
                    )
                ) {
                    LazyVGrid(columns: [GridItem(.adaptive(minimum: 300))], spacing: 24) {
                        ForEach(0..<3) { i in
                            VStack(alignment: .leading, spacing: 0) {
                                Color.gray
                                    .aspectRatio(4/3, contentMode: .fill)
                                
                                VStack(alignment: .leading, spacing: 20) {
                                    VStack(alignment: .leading, spacing: 8) {
                                        Text("Hotel Name").font(.title3).bold().foregroundColor(.blue)
                                        HStack {
                                            Image(systemName: "checkmark.circle")
                                            Text("Book by March for a 15% discount")
                                        }
                                        .font(.caption)
                                        .padding(8)
                                        .background(Color.gray.opacity(0.1))
                                        .cornerRadius(4)
                                    }
                                    
                                    VStack(alignment: .leading, spacing: 8) {
                                        Label("123 Main St, City, Country", systemImage: "map")
                                        Label("+1 234 567 8900", systemImage: "phone")
                                        Label("info@grandhotel.com", systemImage: "envelope")
                                    }
                                    .font(.subheadline)
                                    .foregroundColor(.secondary)
                                    
                                    Button(action: {}) {
                                        HStack {
                                            Text("Visit Website")
                                            Image(systemName: "arrow.up.right")
                                        }
                                    }
                                    .buttonStyle(.bordered)
                                }
                                .padding()
                            }
                            .background(Color(uiColor: .systemBackground))
                            .cornerRadius(12)
                            .shadow(radius: 4)
                        }
                    }
                    .padding(.top)
                } label: {
                    Text("Recommended Hotels")
                        .font(.title2)
                        .bold()
                        .foregroundColor(.primary)
                }
                
                Divider()
                
                // Find Hotels Section
                DisclosureGroup(
                    isExpanded: Binding(
                        get: { expandedSections.contains("find") },
                        set: { isExpanded in
                            if isExpanded { expandedSections.insert("find") }
                            else { expandedSections.remove("find") }
                        }
                    )
                ) {
                    LazyVGrid(columns: [GridItem(.adaptive(minimum: 300))], spacing: 24) {
                        ForEach(["Hotels near the Event", "Hotels near the Airport"], id: \\.self) { title in
                            VStack(alignment: .leading, spacing: 0) {
                                Color.gray
                                    .aspectRatio(4/3, contentMode: .fill)
                                
                                VStack(alignment: .leading, spacing: 16) {
                                    VStack(alignment: .leading, spacing: 4) {
                                        Text(title).font(.title3).bold()
                                        Text("Description goes here").font(.subheadline).foregroundColor(.secondary)
                                    }
                                    
                                    Button(action: {}) {
                                        HStack {
                                            Text("View Options")
                                            Image(systemName: "arrow.up.right")
                                        }
                                    }
                                    .buttonStyle(.bordered)
                                }
                                .padding()
                            }
                            .background(Color(uiColor: .systemBackground))
                            .cornerRadius(12)
                            .shadow(radius: 4)
                        }
                    }
                    .padding(.top)
                } label: {
                    Text("Find Hotels")
                        .font(.title2)
                        .bold()
                        .foregroundColor(.primary)
                }
            }
            .padding()
        }
        .background(Color(uiColor: .secondarySystemBackground))
    }
}`
};

export const CODE_BOOTH_MAP_VUE = {
    v1: `<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
</script>

<template>
  <div class="w-full py-16 bg-background">
      <div class="container mx-auto px-4">
          <div class="flex justify-between items-center mb-8">
              <h2 class="text-2xl font-bold text-foreground">Expo Floor Plan</h2>
              <Badge variant="outline">Main Hall</Badge>
          </div>
          <div class="relative w-full aspect-[16/9] bg-muted rounded-xl border-2 border-dashed border-border overflow-hidden flex items-center justify-center">
               <img 
                    src="https://images.unsplash.com/photo-1721244654210-a505a99661e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
                    alt="Floor Plan" 
                    class="absolute inset-0 w-full h-full object-cover opacity-20"
               />
               <div class="grid grid-cols-4 gap-4 relative z-10 p-8 w-full max-w-3xl">
                   <div v-for="i in 8" :key="i" class="aspect-square bg-card border-2 border-primary/50 hover:bg-primary/20 rounded-md flex items-center justify-center cursor-pointer transition-colors shadow-sm">
                       <span class="font-bold text-xs text-primary">A-{{ 100 + i }}</span>
                   </div>
               </div>
          </div>
      </div>
  </div>
</template>`,
    v2: `<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search } from 'lucide-vue-next'

const EXHIBITORS = ['Adobe', 'Figma', 'Vercel', 'Supabase', 'Linear', 'Raycast', 'Notion', 'Slack']
</script>

<template>
  <div class="w-full py-16 bg-muted/20">
      <div class="container mx-auto px-4 max-w-3xl">
          <h2 class="text-2xl font-bold mb-6 text-foreground">Exhibitor Directory</h2>
          <div class="relative mb-6">
              <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search exhibitors..." class="pl-9" />
          </div>
          <div class="space-y-2 h-[400px] overflow-y-auto pr-2">
              <div v-for="(name, i) in EXHIBITORS" :key="i" class="flex items-center justify-between p-4 bg-card rounded-lg border">
                  <span class="font-semibold text-foreground">{{ name }}</span>
                  <Badge variant="secondary">Booth #{{ 200 + i }}</Badge>
              </div>
          </div>
      </div>
  </div>
</template>`,
    v3: `<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="w-full py-12 bg-background">
      <div class="container mx-auto px-4">
          <div class="flex flex-col md:flex-row gap-8">
              <div class="w-full md:w-1/4 space-y-2">
                  <h3 class="font-bold mb-4 text-foreground">Select Floor</h3>
                  <Button variant="default" class="w-full justify-start">Level 1 - Expo Hall</Button>
                  <Button variant="ghost" class="w-full justify-start">Level 2 - Conference Rooms</Button>
                  <Button variant="ghost" class="w-full justify-start">Level 3 - VIP Lounge</Button>
              </div>
              <div class="flex-1 bg-muted rounded-xl h-[500px] relative overflow-hidden flex items-center justify-center">
                  <p class="text-muted-foreground font-medium">Interactive Map Placeholder</p>
                  <div class="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 border-2 border-primary rounded-lg flex items-center justify-center">
                      <span class="text-primary font-bold">Lounge</span>
                  </div>
                  <div class="absolute bottom-1/4 right-1/4 w-48 h-24 bg-secondary/20 border-2 border-secondary rounded-lg flex items-center justify-center">
                      <span class="text-secondary-foreground font-bold">Cafe</span>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>`
};

export const CODE_BOOTH_MAP_SWIFT = {
    v1: `import SwiftUI

struct BoothMapVariant1: View {
    var body: some View {
        VStack {
            HStack {
                Text("Expo Floor Plan").font(.title2).bold()
                Spacer()
                Text("Main Hall").font(.caption).padding(4).background(Color.gray.opacity(0.1))
            }
            .padding(.bottom)
            
            ZStack {
                Color.gray.opacity(0.2)
                
                LazyVGrid(columns: Array(repeating: GridItem(.flexible()), count: 4), spacing: 20) {
                    ForEach(0..<8) { i in
                        RoundedRectangle(cornerRadius: 8)
                            .stroke(Color.blue, lineWidth: 2)
                            .frame(height: 80)
                            .overlay(Text("A-\(100+i)").font(.caption).bold().foregroundColor(.blue))
                    }
                }
                .padding(40)
            }
            .aspectRatio(16/9, contentMode: .fit)
            .cornerRadius(12)
        }
        .padding()
    }
}`,
    v2: `import SwiftUI

struct BoothMapVariant2: View {
    let exhibitors = ["Adobe", "Figma", "Vercel", "Supabase", "Linear", "Raycast", "Notion", "Slack"]
    @State private var searchText = ""
    
    var body: some View {
        VStack {
            Text("Exhibitor Directory").font(.title2).bold().frame(maxWidth: .infinity, alignment: .leading)
            TextField("Search exhibitors...", text: $searchText)
                .textFieldStyle(.roundedBorder)
                .padding(.bottom)
            
            List(exhibitors, id: \.self) { name in
                HStack {
                    Text(name).font(.headline)
                    Spacer()
                    Text("Booth #200").font(.caption).padding(4).background(Color.gray.opacity(0.1)).cornerRadius(4)
                }
            }
            .listStyle(.plain)
        }
        .padding()
    }
}`,
    v3: `import SwiftUI

struct BoothMapVariant3: View {
    @State private var selectedLevel = 0
    
    var body: some View {
        HStack(alignment: .top, spacing: 24) {
            VStack(alignment: .leading, spacing: 12) {
                Text("Select Floor").font(.headline)
                
                ForEach(0..<3) { i in
                    Button(action: { selectedLevel = i }) {
                        Text("Level \(i+1)")
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .padding()
                            .background(selectedLevel == i ? Color.blue : Color.clear)
                            .foregroundColor(selectedLevel == i ? .white : .primary)
                            .cornerRadius(8)
                    }
                }
            }
            .frame(width: 200)
            
            ZStack {
                Color.gray.opacity(0.1)
                Text("Interactive Map Placeholder")
                
                RoundedRectangle(cornerRadius: 8)
                    .stroke(Color.blue, lineWidth: 2)
                    .frame(width: 100, height: 100)
                    .overlay(Text("Lounge"))
                    .offset(x: -50, y: -100)
            }
            .frame(height: 500)
            .cornerRadius(12)
        }
        .padding()
    }
}`
};
