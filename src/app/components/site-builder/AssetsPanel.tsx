import React, { useState, useEffect, useRef } from 'react';
import { Upload, Trash2, Copy, RefreshCw, Loader2, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '../../../../utils/supabase/info';
import { cn } from '../ui/utils';

interface Asset {
  name: string;
  id: string;
  url: string;
  size: number;
  type: string;
  created_at: string;
}

export const AssetsPanel = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchAssets = async () => {
    setLoading(true);
    try {
      // Check if Supabase is configured
      if (!projectId || projectId === 'your-project-id' || !publicAnonKey || publicAnonKey === 'your-anon-key') {
        console.warn('Supabase not configured. Skipping asset fetch.');
        setAssets([]);
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
      // Don't show error toast if Supabase is not configured
      if (projectId !== 'your-project-id') {
        toast.error('Failed to load assets');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const file = files && files[0];
    if (!file) return;

    // Check if Supabase is configured
    if (!projectId || projectId === 'your-project-id' || !publicAnonKey || publicAnonKey === 'your-anon-key') {
      toast.error('Supabase is not configured. Please set up your Supabase credentials to upload assets.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // Check for supported file types
    const supportedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif', 'image/svg+xml'];
    if (!supportedTypes.includes(file.type)) {
      toast.error(`File type ${file.type} is not supported. Please convert to PNG or JPG.`);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-8c33ff94/assets`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: formData
      });

      if (!response.ok) throw new Error('Upload failed');
      const data = await response.json();
      toast.success('Asset uploaded');
      fetchAssets();
    } catch (error) {
      console.error(error);
      toast.error('Failed to upload asset');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (name: string) => {
    if (!confirm('Are you sure you want to delete this asset?')) return;
    
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-8c33ff94/assets/${name}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      
      if (!response.ok) throw new Error('Delete failed');
      toast.success('Asset deleted');
      setAssets(assets.filter(a => a.name !== name));
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete asset');
    }
  };

  const copyUrl = (url: string) => {
    // Use fallback for clipboard API since it's blocked in iframe
    try {
      const textarea = document.createElement('textarea');
      textarea.value = url;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);
      
      if (successful) {
        toast.success('URL copied to clipboard');
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex-1 bg-muted/30 p-6 overflow-hidden flex flex-col h-full">
       <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Assets Library</h2>
            <p className="text-muted-foreground text-sm">Manage your project media</p>
          </div>
          <div className="flex gap-2">
            <button 
                onClick={fetchAssets}
                className="p-2 hover:bg-muted rounded-md transition-colors"
                title="Refresh"
            >
                <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
            </button>
            <button 
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                disabled={uploading}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                Upload
            </button>
            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleUpload} 
                className="hidden" 
                accept="image/png, image/jpeg, image/jpg, image/webp, image/gif, image/svg+xml"
            />
          </div>
       </div>

       {loading && assets.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
             <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
       ) : assets.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed border-border rounded-xl m-4">
             <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <ImageIcon className="w-8 h-8 opacity-50" />
             </div>
             <p>No assets yet</p>
             <button 
                onClick={() => fileInputRef.current && fileInputRef.current.click()} 
                className="mt-2 text-primary hover:underline text-sm"
             >
                Upload your first image
             </button>
          </div>
       ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 overflow-y-auto pb-10">
             {assets.map(asset => (
                <div key={asset.id} className="group relative bg-background border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
                   <div className="aspect-square bg-muted relative">
                      <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button 
                             onClick={() => copyUrl(asset.url)}
                             className="p-2 bg-white/20 backdrop-blur-sm rounded-md text-white hover:bg-white/40 transition-colors"
                             title="Copy URL"
                          >
                             <Copy className="w-4 h-4" />
                          </button>
                          <button 
                             onClick={() => handleDelete(asset.name)}
                             className="p-2 bg-red-500/80 backdrop-blur-sm rounded-md text-white hover:bg-red-600 transition-colors"
                             title="Delete"
                          >
                             <Trash2 className="w-4 h-4" />
                          </button>
                      </div>
                   </div>
                   <div className="p-2">
                      <p className="text-xs font-medium truncate" title={asset.name}>
                        {asset.name.split('-').slice(1).join('-') || asset.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-1">
                        {(asset.size / 1024).toFixed(1)} KB
                      </p>
                   </div>
                </div>
             ))}
          </div>
       )}
    </div>
  );
};