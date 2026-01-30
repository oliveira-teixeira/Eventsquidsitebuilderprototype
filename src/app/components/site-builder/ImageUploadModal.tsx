import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import { Upload, Cloud, Link as LinkIcon, Loader2, X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { projectId, publicAnonKey, isSupabaseConfigured } from '@/utils/supabase/info';
import { cn } from '../ui/utils';

interface Asset {
  name: string;
  id: string;
  url: string;
  size: number;
  type: string;
  created_at: string;
}

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImageSelected: (url: string) => void;
  currentImageUrl?: string;
}

// Add local storage key for assets
const LOCAL_ASSETS_KEY = 'site-builder-uploaded-assets';

// Helper to get locally stored assets
const getLocalAssets = (): Asset[] => {
  try {
    const stored = localStorage.getItem(LOCAL_ASSETS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Helper to save locally stored assets
const saveLocalAssets = (assets: Asset[]) => {
  try {
    localStorage.setItem(LOCAL_ASSETS_KEY, JSON.stringify(assets));
  } catch (error) {
    console.error('Failed to save assets to local storage:', error);
  }
};

export const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  isOpen,
  onClose,
  onImageSelected,
  currentImageUrl = ''
}) => {
  const [activeTab, setActiveTab] = useState<string>('upload');
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [linkUrl, setLinkUrl] = useState(currentImageUrl);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch assets when Library tab is opened
  useEffect(() => {
    if (isOpen && activeTab === 'library') {
      fetchAssets();
    }
  }, [isOpen, activeTab]);

  const fetchAssets = async () => {
    setLoading(true);
    try {
      // Check if Supabase is configured
      if (!isSupabaseConfigured()) {
        // Load from local storage instead
        const localAssets = getLocalAssets();
        setAssets(localAssets);
        setLoading(false);
        return;
      }
      
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-8c33ff94/assets`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch assets');
      const data = await response.json();
      setAssets(data);
    } catch (error) {
      console.error(error);
      if (isSupabaseConfigured()) {
        toast.error('Failed to load assets');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    // Check for supported file types
    const supportedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif', 'image/svg+xml'];
    if (!supportedTypes.includes(file.type)) {
      toast.error(`File type ${file.type} is not supported. Please use PNG, JPG, WEBP, or GIF.`);
      return;
    }

    // Check file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      toast.error('File size exceeds 10MB limit');
      return;
    }

    setUploading(true);

    try {
      // Check if Supabase is configured
      if (!isSupabaseConfigured()) {
        // Use local storage with Data URL
        const reader = new FileReader();
        
        reader.onload = (e) => {
          const target = e.target;
          const dataUrl = target ? (target.result as string) : '';
          
          // Create asset object for local storage
          const newAsset: Asset = {
            id: `local-${Date.now()}-${Math.random().toString(36).substring(7)}`,
            name: file.name,
            url: dataUrl,
            size: file.size,
            type: file.type,
            created_at: new Date().toISOString()
          };

          // Save to local storage
          const currentAssets = getLocalAssets();
          const updatedAssets = [newAsset, ...currentAssets];
          saveLocalAssets(updatedAssets);

          // Update state and notify user
          toast.success('Image uploaded locally');
          onImageSelected(dataUrl);
          onClose();
          setUploading(false);
        };

        reader.onerror = () => {
          toast.error('Failed to read file');
          setUploading(false);
        };

        reader.readAsDataURL(file);
        return;
      }

      // Supabase upload path
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-8c33ff94/assets`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: formData
      });

      if (!response.ok) throw new Error('Upload failed');
      const data = await response.json();
      toast.success('Image uploaded');
      onImageSelected(data.url);
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleLinkSubmit = () => {
    if (!linkUrl.trim()) {
      toast.error('Please enter a valid URL');
      return;
    }
    onImageSelected(linkUrl);
    onClose();
  };

  const handleAssetSelect = (url: string) => {
    onImageSelected(url);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 gap-0 bg-background border-border">
        <DialogHeader className="px-6 pt-6 pb-4 space-y-1.5">
          <DialogTitle className="font-sans text-foreground" style={{ fontSize: 'var(--text-lg)' }}>
            Choose Image
          </DialogTitle>
          <DialogDescription className="text-muted-foreground font-sans" style={{ fontSize: 'var(--text-sm)' }}>
            Upload an image or select from library.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6">
            <TabsList className="grid w-full grid-cols-3 bg-muted">
              <TabsTrigger value="upload" className="font-sans">Upload</TabsTrigger>
              <TabsTrigger value="library" className="font-sans">Library</TabsTrigger>
              <TabsTrigger value="link" className="font-sans">Link</TabsTrigger>
            </TabsList>
          </div>

          <div className="px-6 pb-6 pt-4">
            {/* Upload Tab */}
            <TabsContent value="upload" className="mt-0">
              <div
                className={cn(
                  "border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center gap-4 transition-colors",
                  dragActive ? "border-primary bg-primary/5" : "border-border bg-muted/20"
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  {uploading ? (
                    <Loader2 className="w-6 h-6 text-muted-foreground animate-spin" />
                  ) : (
                    <Cloud className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
                <div className="text-center">
                  <p className="font-sans text-foreground mb-1" style={{ fontSize: 'var(--text-sm)' }}>
                    {uploading ? 'Uploading...' : 'Drag & drop or click to upload'}
                  </p>
                  <p className="font-sans text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                    PNG, JPG, WEBP, or GIF up to 10MB
                  </p>
                </div>
                {!uploading && (
                  <Button
                    onClick={() => {
                      const current = fileInputRef.current;
                      if (current) {
                        current.click();
                      }
                    }}
                    variant="outline"
                    className="font-sans"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Select File
                  </Button>
                )}
              </div>
            </TabsContent>

            {/* Library Tab */}
            <TabsContent value="library" className="mt-0">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
              ) : assets.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <ImageIcon className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <p className="font-sans text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                    No images in library yet.
                  </p>
                  <Button
                    onClick={() => setActiveTab('upload')}
                    variant="outline"
                    size="sm"
                    className="mt-4 font-sans"
                  >
                    Upload an image
                  </Button>
                </div>
              ) : (
                <ScrollArea className="h-[300px] -mx-1">
                  <div className="grid grid-cols-3 gap-3 px-1">
                    {assets.map((asset) => (
                      <button
                        key={asset.id}
                        onClick={() => handleAssetSelect(asset.url)}
                        className="group relative aspect-square rounded-lg overflow-hidden border border-border hover:border-primary transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      >
                        <img
                          src={asset.url}
                          alt={asset.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white font-sans text-xs">Select</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </TabsContent>

            {/* Link Tab */}
            <TabsContent value="link" className="mt-0">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="font-sans text-foreground text-sm font-medium">
                    Image URL
                  </label>
                  <Input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    className="font-sans"
                  />
                  <p className="font-sans text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                    Paste a direct link to an image
                  </p>
                </div>
                {linkUrl && (
                  <div className="border border-border rounded-lg overflow-hidden aspect-video bg-muted flex items-center justify-center">
                    <img
                      src={linkUrl}
                      alt="Preview"
                      className="w-full h-full object-contain"
                      onError={() => toast.error('Invalid image URL')}
                    />
                  </div>
                )}
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline" onClick={onClose} className="font-sans">
                    Cancel
                  </Button>
                  <Button onClick={handleLinkSubmit} className="font-sans">
                    <LinkIcon className="w-4 h-4 mr-2" />
                    Use Link
                  </Button>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};