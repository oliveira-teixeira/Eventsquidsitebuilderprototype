import React from "react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { FileText, Download, File, ExternalLink, FileSpreadsheet, FileIcon } from "lucide-react";

const DOCS = [
    { name: "Conference Brochure", size: "2.4 MB", type: "PDF" },
    { name: "Sponsorship Deck", size: "5.1 MB", type: "PDF" },
    { name: "Attendee Guidelines", size: "1.2 MB", type: "DOCX" },
    { name: "Code of Conduct", size: "0.5 MB", type: "PDF" },
];

// Variant 1: Grid Icons
export const DocumentsVariant1 = () => (
  <div className="w-full py-16 bg-muted/10">
      <div className="mx-auto w-full" style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}>
          <h2 className="text-2xl font-bold mb-8 text-foreground">Downloads</h2>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {DOCS.map((doc, i) => (
                  <Card key={i} className="border-none shadow-sm hover:shadow-md bg-card transition-all cursor-pointer group">
                      <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                          <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                              <FileText className="h-8 w-8 text-primary" />
                          </div>
                          <div>
                              <h3 className="font-medium text-foreground">{doc.name}</h3>
                              <p className="text-xs text-muted-foreground mt-1">{doc.type} • {doc.size}</p>
                          </div>
                      </CardContent>
                  </Card>
              ))}
          </div>
      </div>
  </div>
);

// Variant 2: Simple List
export const DocumentsVariant2 = () => (
  <div className="w-full py-12 bg-background">
      <div className="mx-auto w-full" style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
            <h2 className="text-2xl font-bold text-foreground">Resources</h2>
            <Button variant="link" className="w-full lg:w-auto justify-start lg:justify-center px-0 lg:px-4">View All</Button>
          </div>
          <div className="space-y-2">
              {DOCS.map((doc, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg border-none shadow-sm bg-card hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                          <File className="h-5 w-5 text-primary" />
                          <span className="font-medium text-foreground">{doc.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                          <span className="text-xs text-muted-foreground hidden sm:block">{doc.size}</span>
                          <Button size="icon" variant="ghost">
                              <Download className="h-4 w-4" />
                          </Button>
                      </div>
                  </div>
              ))}
          </div>
      </div>
  </div>
);

// Variant 3: Card Previews
export const DocumentsVariant3 = () => (
  <div className="w-full py-16 bg-background">
      <div className="mx-auto w-full" style={{ maxWidth: 'var(--max-width)', paddingLeft: 'var(--global-padding)', paddingRight: 'var(--global-padding)' }}>
          <h2 className="text-2xl font-bold mb-8 text-foreground">Media Kit</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden border-none shadow-md">
                      <div className="h-40 bg-muted flex items-center justify-center">
                          <FileIcon className="h-12 w-12 text-primary/50" />
                      </div>
                      <CardHeader>
                          <CardTitle className="text-lg">Press Release {i}</CardTitle>
                          <CardDescription>Published on Oct {10 + i}, 2025</CardDescription>
                      </CardHeader>
                      <CardContent>
                          <Button className="w-full gap-2" variant="outline">
                              <ExternalLink className="h-4 w-4" /> Open Document
                          </Button>
                      </CardContent>
                  </Card>
              ))}
          </div>
      </div>
  </div>
);
