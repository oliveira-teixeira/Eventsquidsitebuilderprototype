import React, { useCallback, useState, useEffect } from "react";
import {
  Sliders,
  Check,
  AlignJustify,
  AlignLeft,
  AlignCenter,
  AlignRight,
  MoveVertical,
  Eye,
  Smartphone,
  Link,
  Layout,
  Image as ImageIcon,
  Box,
  Hash,
  Palette,
  Upload,
  Cloud,
  Monitor,
  Move,
  Maximize2,
  Minus,
  ExternalLink,
  FileText,
  Plus,
  ChevronDown,
  ChevronUp,
  Link2,
  LinkIcon,
  Unlink,
  Info,
} from "lucide-react";
import { cn } from "../ui/utils";
import { Switch } from "../ui/switch";
import { 
    BlockSettings, 
    DividerSettings,
    ToggleableElement, 
    BlockButtonDefinition, 
    BlockImageDefinition, 
    BlockIconDefinition, 
    BlockCountDefinition, 
    BlockColorDefinition,
    BlockSelectDefinition,
    BlockRangeDefinition,
    ButtonSetting,
    BLOCK_REGISTRY, 
    ICONS 
} from "./block-registry";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { ImageCropModal } from "./ImageCropModal";
import { Slider } from "../ui/slider";
import { ImageSetting, getImageUrl as getHelpersImageUrl, getImageStyles } from "@/app/utils/image-helpers";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";

// Page interface for internal linking
interface Page {
  id: string;
  name: string;
  slug: string;
}

// LinkPicker component for selecting internal pages or external URLs
interface LinkPickerProps {
  value: ButtonSetting;
  onChange: (value: ButtonSetting) => void;
  pages: Page[];
  onCreatePage?: (name: string, slug: string) => void;
}

const LinkPicker: React.FC<LinkPickerProps> = ({ value, onChange, pages, onCreatePage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNewPageForm, setShowNewPageForm] = useState(false);
  const [newPageName, setNewPageName] = useState("");
  const [newPageSlug, setNewPageSlug] = useState("");

  const linkType = value.linkType || 'external';
  const selectedPage = pages.find(p => p.id === value.pageId);

  const handleSelectPage = (page: Page) => {
    onChange({
      ...value,
      linkType: 'internal',
      pageId: page.id,
      url: page.slug
    });
    setIsOpen(false);
  };

  const handleExternalUrl = (url: string) => {
    onChange({
      ...value,
      linkType: 'external',
      pageId: undefined,
      url
    });
  };

  const handleCreatePage = () => {
    if (onCreatePage && newPageName) {
      const slug = newPageSlug || `/${newPageName.toLowerCase().replace(/\s+/g, '-')}`;
      onCreatePage(newPageName, slug);
      // After creating, select the new page (we'll need to find it by name since we don't have the ID yet)
      setShowNewPageForm(false);
      setNewPageName("");
      setNewPageSlug("");
    }
  };

  const getLinkDisplayText = () => {
    if (linkType === 'internal' && selectedPage) {
      return selectedPage.name;
    }
    if (value.url) {
      return value.url.length > 25 ? value.url.substring(0, 25) + '...' : value.url;
    }
    return 'Select link...';
  };

  return (
    <div className="space-y-2">
      {/* Link Type Toggle */}
      <div className="flex gap-1 bg-muted/30 p-0.5 rounded-md border border-border">
        <button
          type="button"
          onClick={() => onChange({ ...value, linkType: 'internal', url: selectedPage?.slug || '' })}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-sm text-[10px] font-medium transition-all",
            linkType === 'internal' 
              ? "bg-background shadow-sm text-foreground" 
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <FileText className="w-3 h-3" />
          Page
        </button>
        <button
          type="button"
          onClick={() => onChange({ ...value, linkType: 'external' })}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-sm text-[10px] font-medium transition-all",
            linkType === 'external' 
              ? "bg-background shadow-sm text-foreground" 
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <ExternalLink className="w-3 h-3" />
          URL
        </button>
      </div>

      {/* Internal Page Selector */}
      {linkType === 'internal' && (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className={cn(
                "flex h-8 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-xs shadow-sm transition-colors",
                "hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              )}
            >
              <span className={cn(
                "truncate",
                !selectedPage && "text-muted-foreground"
              )}>
                {selectedPage ? selectedPage.name : "Select a page..."}
              </span>
              <ChevronDown className="h-3.5 w-3.5 opacity-50" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-[220px] p-0" align="start">
            {!showNewPageForm ? (
              <div className="max-h-[200px] overflow-y-auto">
                {pages.length > 0 ? (
                  <div className="p-1">
                    {pages.map((page) => (
                      <button
                        key={page.id}
                        type="button"
                        onClick={() => handleSelectPage(page)}
                        className={cn(
                          "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-xs transition-colors",
                          "hover:bg-muted",
                          value.pageId === page.id && "bg-primary/10 text-primary"
                        )}
                      >
                        <FileText className="h-3.5 w-3.5 opacity-70" />
                        <span className="flex-1 text-left truncate">{page.name}</span>
                        <span className="text-[10px] text-muted-foreground font-mono">{page.slug}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-xs text-muted-foreground">
                    No pages available
                  </div>
                )}
                {onCreatePage && (
                  <>
                    <div className="h-px bg-border" />
                    <button
                      type="button"
                      onClick={() => setShowNewPageForm(true)}
                      className="flex w-full items-center gap-2 px-3 py-2 text-xs text-primary hover:bg-muted transition-colors"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Create new page
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className="p-3 space-y-3">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-medium">Page Name</Label>
                  <Input
                    value={newPageName}
                    onChange={(e) => setNewPageName(e.target.value)}
                    placeholder="e.g. About Us"
                    className="h-7 text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-medium">Slug (optional)</Label>
                  <Input
                    value={newPageSlug}
                    onChange={(e) => setNewPageSlug(e.target.value)}
                    placeholder="e.g. /about"
                    className="h-7 text-xs font-mono"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setShowNewPageForm(false);
                      setNewPageName("");
                      setNewPageSlug("");
                    }}
                    className="flex-1 h-7 text-xs"
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleCreatePage}
                    disabled={!newPageName}
                    className="flex-1 h-7 text-xs"
                  >
                    Create
                  </Button>
                </div>
              </div>
            )}
          </PopoverContent>
        </Popover>
      )}

      {/* External URL Input */}
      {linkType === 'external' && (
        <input 
          type="text" 
          value={value.url}
          onChange={(e) => handleExternalUrl(e.target.value)}
          placeholder="https:// or #section"
          className="flex h-8 w-full rounded-md border border-input bg-background px-3 py-1 text-xs shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring font-mono text-[10px]"
        />
      )}
    </div>
  );
};

interface PropertiesPanelProps {
  selectedBlockId: string | null;
  selectedBlockType?: string;
  selectedVariant: string; 
  selectedSettings?: BlockSettings;
  toggleableElements?: ToggleableElement[];
  configurableButtons?: BlockButtonDefinition[];
  configurableImages?: BlockImageDefinition[];
  configurableIcons?: BlockIconDefinition[];
  configurableCounts?: BlockCountDefinition[];
  configurableColors?: BlockColorDefinition[];
  configurableSelects?: BlockSelectDefinition[];
  configurableRanges?: BlockRangeDefinition[];
  onChangeVariant: (variant: string) => void;
  onChangeSettings: (settings: BlockSettings) => void;
  onChangeType?: (typeId: string) => void;
  blockName: string;
  pages?: Page[];
  onAddPage?: (name: string, slug: string) => void;
}

const VerticalPaddingIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h10" />
    <path d="M2 11h10" />
    <path d="M7 5v4" />
    <path d="M7 5l-1.5 1.5" />
    <path d="M7 5l1.5 1.5" />
    <path d="M7 9l-1.5-1.5" />
    <path d="M7 9l1.5-1.5" />
  </svg>
);

const PositionPicker = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => {
  const positions = [
    { id: 'top left', title: 'Top Left' },
    { id: 'top', title: 'Top' },
    { id: 'top right', title: 'Top Right' },
    { id: 'left', title: 'Left' },
    { id: 'center', title: 'Center' },
    { id: 'right', title: 'Right' },
    { id: 'bottom left', title: 'Bottom Left' },
    { id: 'bottom', title: 'Bottom' },
    { id: 'bottom right', title: 'Bottom Right' },
  ];

  return (
    <div className="grid grid-cols-3 gap-1 w-[120px] aspect-square bg-muted/20 p-1 rounded-md border border-border">
      {positions.map((pos) => (
        <button
          key={pos.id}
          type="button"
          onClick={() => onChange(pos.id)}
          title={pos.title}
          className={cn(
            "w-full h-full rounded-sm transition-all border border-transparent flex items-center justify-center",
            value === pos.id 
              ? "bg-primary text-primary-foreground border-primary shadow-sm z-10" 
              : "bg-background hover:bg-muted text-muted-foreground hover:scale-105"
          )}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-current" />
        </button>
      ))}
    </div>
  );
};


const VARIANTS = [
  { id: 'default', name: 'Default', class: 'bg-background border-border' },
  { id: 'primary', name: 'Primary', class: 'bg-primary border-primary' },
  { id: 'secondary', name: 'Secondary', class: 'bg-secondary border-secondary' },
  { id: 'accent', name: 'Accent', class: 'bg-accent border-accent' },
];

const PADDINGS = [
  { id: 'none', name: 'None', class: 'h-4' },
  { id: 'small', name: 'Small', class: 'h-6' },
  { id: 'medium', name: 'Medium', class: 'h-8' },
  { id: 'large', name: 'Large', class: 'h-10' },
  { id: 'xlarge', name: 'X-Large', class: 'h-12' },
];

// Padding icons showing horizontal bars with vertical arrows between them
const PaddingIcon = ({ size }: { size: 'none' | 'small' | 'medium' | 'large' | 'xlarge' }) => {
  if (size === 'none') {
    return (
      <svg width="20" height="24" viewBox="0 0 20 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="2" y1="11" x2="18" y2="11" />
        <line x1="2" y1="13" x2="18" y2="13" />
      </svg>
    );
  }
  
  if (size === 'small') {
    return (
      <svg width="20" height="24" viewBox="0 0 20 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="2" y1="9" x2="18" y2="9" />
        <line x1="2" y1="15" x2="18" y2="15" />
        <line x1="10" y1="11" x2="10" y2="13" />
        <polyline points="8,13 10,11 12,13" />
        <polyline points="8,11 10,13 12,11" />
      </svg>
    );
  }
  
  if (size === 'medium') {
    return (
      <svg width="20" height="24" viewBox="0 0 20 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="2" y1="7" x2="18" y2="7" />
        <line x1="2" y1="17" x2="18" y2="17" />
        <line x1="10" y1="9" x2="10" y2="15" />
        <polyline points="8,11 10,9 12,11" />
        <polyline points="8,13 10,15 12,13" />
      </svg>
    );
  }
  
  if (size === 'large') {
    return (
      <svg width="20" height="24" viewBox="0 0 20 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="2" y1="5" x2="18" y2="5" />
        <line x1="2" y1="19" x2="18" y2="19" />
        <line x1="10" y1="7" x2="10" y2="17" />
        <polyline points="8,9 10,7 12,9" />
        <polyline points="8,15 10,17 12,15" />
      </svg>
    );
  }
  
  // xlarge
  return (
    <svg width="20" height="24" viewBox="0 0 20 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="2" y1="3" x2="18" y2="3" />
      <line x1="2" y1="21" x2="18" y2="21" />
      <line x1="10" y1="5" x2="10" y2="19" />
      <polyline points="8,7 10,5 12,7" />
      <polyline points="8,17 10,19 12,17" />
    </svg>
  );
};

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedBlockId,
  selectedBlockType,
  selectedVariant,
  selectedSettings = {},
  toggleableElements,
  configurableButtons,
  configurableImages,
  configurableIcons,
  configurableCounts,
  configurableColors,
  configurableSelects,
  configurableRanges,
  onChangeVariant,
  onChangeSettings,
  onChangeType,
  blockName,
  pages = [],
  onAddPage
}) => {
  const [assetModalOpen, setAssetModalOpen] = useState(false);
  const [currentImageId, setCurrentImageId] = useState<string | null>(null);
  const [tempImageUrl, setTempImageUrl] = useState("");
  const [activeAgendaDay, setActiveAgendaDay] = useState(0);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [cropImageUrl, setCropImageUrl] = useState("");
  const [cropImageSettings, setCropImageSettings] = useState<ImageSetting | undefined>(undefined);

  // Reset active day when block changes
  useEffect(() => {
    setActiveAgendaDay(0);
  }, [selectedBlockId]);

  // Listen for agenda day changes from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const eventData = event.data;
      if (eventData && eventData.type === 'AGENDA_DAY_CHANGED') {
        console.log('Received AGENDA_DAY_CHANGED message:', eventData);
        console.log('Current selectedBlockId:', selectedBlockId);
        
        // Check if the message is for the currently selected block
        // The blockId in the message should match the selectedBlockId
        if (eventData.blockId === selectedBlockId) {
          console.log('Setting active day to:', eventData.activeDay);
          setActiveAgendaDay(eventData.activeDay);
        }
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [selectedBlockId]);

  const handlePaddingChange = useCallback((padding: any) => {
    onChangeSettings({ ...selectedSettings, padding });
  }, [selectedSettings, onChangeSettings]);

  const handleTextAlignChange = useCallback((align: 'left' | 'center' | 'right') => {
      onChangeSettings({ ...selectedSettings, textAlign: align });
  }, [selectedSettings, onChangeSettings]);

  const handleImageUpdate = (url: string) => {
      if (currentImageId) {
          // Open crop modal after image selection
          setCropImageUrl(url);
          
          // Get existing settings if any
          const images = selectedSettings.images || {};
          const existing = images[currentImageId];
          const existingSettings = typeof existing === 'object' ? existing : undefined;
          
          setCropImageSettings(existingSettings);
          setAssetModalOpen(false);
          setCropModalOpen(true);
      }
  };

  const handleCropConfirm = (settings: ImageSetting) => {
      if (currentImageId) {
          const newImages = {
              ...selectedSettings.images,
              [currentImageId]: settings
          };
          onChangeSettings({ ...selectedSettings, images: newImages });
      }
  };

  const handleImageSettingChange = (imageId: string, key: keyof ImageSetting, value: any) => {
      const images = selectedSettings.images || {};
      const currentImage = images[imageId];
      
      let updatedImage: ImageSetting;
      if (typeof currentImage === 'string') {
          updatedImage = { url: currentImage, [key]: value };
      } else if (currentImage) {
          updatedImage = { ...currentImage, [key]: value };
      } else {
          return;
      }
      
      const newImages = {
          ...images,
          [imageId]: updatedImage
      };
      onChangeSettings({ ...selectedSettings, images: newImages });
  };

  const getImageUrl = (imageId: string, defaultUrl: string): string => {
      const images = selectedSettings.images || {};
      const image = images[imageId];
      if (typeof image === 'string') {
          return image;
      } else if (image && image.url) {
          return image.url;
      }
      return defaultUrl;
  };

  const getImageSettings = (imageId: string): ImageSetting | undefined => {
      const images = selectedSettings.images || {};
      const image = images[imageId];
      if (typeof image === 'object') {
          return image;
      }
      return undefined;
  };

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const file = files && files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target && event.target.result;
        const url = result as string;
        handleImageUpdate(url);
      };
      reader.readAsDataURL(file);
    }
  }, [selectedSettings, onChangeSettings, currentImageId]);

  const handleIconChange = useCallback((iconId: string, iconKey: string) => {
      // @ts-ignore
      const svg = ICONS[iconKey];
      const newIcons = {
          ...selectedSettings.icons,
          [iconId]: svg
      };
      onChangeSettings({ ...selectedSettings, icons: newIcons });
  }, [selectedSettings, onChangeSettings]);

  const handleVisibilityChange = useCallback((elementId: string, checked: boolean) => {
    const currentVisibility = selectedSettings.visibility || {};
    onChangeSettings({
      ...selectedSettings,
      visibility: {
        ...currentVisibility,
        [elementId]: checked
      }
    });
  }, [selectedSettings, onChangeSettings]);

  const currentBlockDef = BLOCK_REGISTRY.find(b => b.id === selectedBlockType);
  const currentCategory = currentBlockDef ? currentBlockDef.category : undefined;
  const availableLayouts = currentCategory 
      ? BLOCK_REGISTRY.filter(b => b.category === currentCategory && b.hidden !== true) 
      : [];

  if (!selectedBlockId) {
    return (
      <div className="p-8 text-center text-muted-foreground flex flex-col items-center justify-center h-full">
         <Sliders className="w-8 h-8 opacity-20 mb-2" />
         <span className="text-xs">Select a block to edit properties</span>
      </div>
    );
  }

  return (
    <div 
      className="p-4 space-y-6"
      style={{ 
        contain: 'layout',
        willChange: 'auto'
      }}
    >
      <div className="pb-2 border-b border-border">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Editing</h3>
        <p className="font-medium text-sm truncate">{blockName}</p>
      </div>

      {/* Text Formatting Hint */}
      <div className="flex items-start gap-2 bg-muted/40 border border-border rounded-md p-2.5">
        <Info className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="text-[10px] leading-relaxed text-muted-foreground">
            Select text on the canvas to format it. Allowed: <span className="font-semibold text-foreground">Bold</span>, <span className="italic text-foreground">Italic</span>, <span className="underline text-foreground">Underline</span>.
          </p>
          <p className="text-[10px] leading-relaxed text-muted-foreground">
            Font, size, and color are controlled by the Theme.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        
        {/* Layout Selection */}
        {availableLayouts.length > 1 && onChangeType && (
            <>
                <div className="space-y-3">
                    <label className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
                        <Layout className="w-3.5 h-3.5" />
                        Layout
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        {availableLayouts.map((b) => b && b.id && b.name && (
                            <button 
                                key={b.id}
                                type="button"
                                onClick={() => onChangeType(b.id)}
                                onMouseDown={(e) => e.preventDefault()}
                                className={cn(
                                    "flex flex-col items-center gap-2 p-2 rounded-md border text-xs transition-all h-20 justify-center",
                                    selectedBlockType === b.id 
                                    ? "border-primary bg-primary/5 ring-1 ring-primary/20 text-primary" 
                                    : "border-border hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <div className="w-8 h-5 opacity-70 scale-75 origin-center">{b.icon}</div>
                                <span className="truncate w-full text-center text-[10px]">{b.name.replace(`${currentCategory}: `, '')}</span>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="h-px bg-border w-full" />
            </>
        )}

        {/* Color Variant */}
        <div className="space-y-3">
            <label className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5" />
                Color Variant
            </label>
            <div className="space-y-2">
            {VARIANTS.map((v) => (
                <button
                key={v.id}
                type="button"
                onClick={() => onChangeVariant(v.id)}
                onMouseDown={(e) => e.preventDefault()}
                className={cn(
                    "w-full flex items-center justify-between p-2 rounded-md border text-xs transition-all",
                    selectedVariant === v.id 
                    ? "border-primary bg-primary/5 ring-1 ring-primary/20" 
                    : "border-border hover:bg-muted/50"
                )}
                >
                <div className="flex items-center gap-3">
                    <div className={cn("w-4 h-4 rounded-full border shadow-sm", v.class)} />
                    <span className="font-medium">{v.name}</span>
                </div>
                {selectedVariant === v.id && <Check className="w-3.5 h-3.5 text-primary" />}
                </button>
            ))}
            </div>
        </div>

        <div className="h-px bg-border w-full" />

        {/* Text Alignment */}
        <div className="space-y-3">
            <label className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
                <AlignJustify className="w-3.5 h-3.5" />
                Text Alignment
            </label>
            <div className="grid grid-cols-3 gap-2 bg-muted/30 p-1 rounded-md border border-border">
                {[
                    { id: 'left', icon: AlignLeft, label: 'Left' },
                    { id: 'center', icon: AlignCenter, label: 'Center' },
                    { id: 'right', icon: AlignRight, label: 'Right' },
                ].map((option) => (
                    <button
                        key={option.id}
                        type="button"
                        // @ts-ignore
                        onClick={() => handleTextAlignChange(option.id)}
                        onMouseDown={(e) => e.preventDefault()}
                        className={cn(
                            "flex items-center justify-center py-1.5 rounded-sm transition-all",
                            (selectedSettings.textAlign === option.id || (!selectedSettings.textAlign && option.id === 'left'))
                                ? "bg-background shadow-sm text-primary" 
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                        title={option.label}
                    >
                        <option.icon className="w-4 h-4" />
                    </button>
                ))}
            </div>
        </div>

        <div className="h-px bg-border w-full" />

        {/* Hyperlink */}
        <div className="space-y-3">
            <label className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
                <Link2 className="w-3.5 h-3.5" />
                Text Link
            </label>
            <div className="bg-muted/30 p-3 rounded-md border border-border space-y-3">
                <div className="space-y-1.5">
                    <label className="text-[10px] text-muted-foreground">Link Label</label>
                    <input 
                        type="text" 
                        value={(selectedSettings.textLinks && selectedSettings.textLinks['inline'] && selectedSettings.textLinks['inline'].label) || ''}
                        onChange={(e) => {
                            const currentLinks = selectedSettings.textLinks || {};
                            const currentInline = currentLinks['inline'] || { url: '', label: '' };
                            const newLinks = {
                                ...currentLinks,
                                inline: { ...currentInline, label: e.target.value }
                            };
                            onChangeSettings({ ...selectedSettings, textLinks: newLinks });
                        }}
                        placeholder="e.g. Learn more"
                        className="flex h-8 w-full rounded-md border border-input bg-background px-3 py-1 text-xs shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[10px] text-muted-foreground">URL</label>
                    <input 
                        type="text" 
                        value={(selectedSettings.textLinks && selectedSettings.textLinks['inline'] && selectedSettings.textLinks['inline'].url) || ''}
                        onChange={(e) => {
                            const currentLinks = selectedSettings.textLinks || {};
                            const currentInline = currentLinks['inline'] || { url: '', label: '' };
                            const newLinks = {
                                ...currentLinks,
                                inline: { ...currentInline, url: e.target.value }
                            };
                            onChangeSettings({ ...selectedSettings, textLinks: newLinks });
                        }}
                        placeholder="https:// or #section"
                        className="flex h-8 w-full rounded-md border border-input bg-background px-3 py-1 text-xs shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring font-mono text-[10px]"
                    />
                </div>
                {/* Remove Link button - only show when a link exists */}
                {selectedSettings.textLinks && selectedSettings.textLinks['inline'] && selectedSettings.textLinks['inline'].url && (
                    <button
                        type="button"
                        onClick={() => {
                            const currentLinks = { ...selectedSettings.textLinks };
                            delete currentLinks['inline'];
                            onChangeSettings({ ...selectedSettings, textLinks: Object.keys(currentLinks).length > 0 ? currentLinks : undefined });
                        }}
                        className="flex items-center gap-1.5 text-[10px] text-destructive hover:text-destructive/80 transition-colors"
                    >
                        <Unlink className="w-3 h-3" />
                        Remove link
                    </button>
                )}
            </div>
        </div>

        <div className="h-px bg-border w-full" />

        {/* Elements Visibility */}
        {toggleableElements && toggleableElements.length > 0 && (
            <>
                <div className="space-y-3">
                    <label className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
                        <Eye className="w-3.5 h-3.5" />
                        Elements
                    </label>
                    <div className="space-y-2 bg-muted/30 p-2 rounded-md border border-border">
                        {toggleableElements.map((element) => {
                            const visibility = selectedSettings.visibility || {};
                            const isVisible = visibility[element.id] !== undefined ? visibility[element.id] : element.defaultValue;
                            
                            // Check if this is a brand toggle with inline controls
                            const isBrandImage = element.id === 'showBrandImage';
                            const isBrandText = element.id === 'showBrandText';
                            
                            return (
                                <div key={element.id}>
                                    <div className="flex items-center justify-between p-1">
                                        <span className="text-xs font-medium">{element.label}</span>
                                        <Switch 
                                            checked={isVisible} 
                                            onCheckedChange={(checked) => handleVisibilityChange(element.id, checked)}
                                            className="scale-75 origin-right"
                                        />
                                    </div>
                                    
                                    {/* Brand Image controls - shown when Brand Image toggle is on */}
                                    {isBrandImage && isVisible && configurableImages && (() => {
                                        const brandImgDef = configurableImages.find(img => img.id === 'logo');
                                        if (!brandImgDef) return null;
                                        const currentUrl = getImageUrl(brandImgDef.id, brandImgDef.defaultUrl);
                                        return (
                                            <div className="ml-1 mt-2 mb-1 pl-3 border-l-2 border-primary/20 space-y-2">
                                                <div className="flex gap-2 items-center">
                                                    <div 
                                                        className="relative w-12 h-12 shrink-0 overflow-hidden rounded-md border border-border bg-muted group cursor-pointer shadow-sm hover:ring-2 hover:ring-primary hover:ring-offset-1 transition-all" 
                                                        onClick={() => {
                                                            setCurrentImageId(brandImgDef.id);
                                                            setTempImageUrl(currentUrl);
                                                            setAssetModalOpen(true);
                                                        }}
                                                    >
                                                        {currentUrl ? (
                                                            <img src={currentUrl} alt={brandImgDef.label} className="h-full w-full object-contain" />
                                                        ) : (
                                                            <div className="h-full w-full flex items-center justify-center">
                                                                <ImageIcon className="w-4 h-4 text-muted-foreground" />
                                                            </div>
                                                        )}
                                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <Upload className="w-3.5 h-3.5 text-white" />
                                                        </div>
                                                    </div>
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm" 
                                                        className="text-[10px] h-7 font-normal flex-1"
                                                        onClick={() => {
                                                            setCurrentImageId(brandImgDef.id);
                                                            setTempImageUrl(currentUrl);
                                                            setAssetModalOpen(true);
                                                        }}
                                                    >
                                                        <ImageIcon className="w-3 h-3 mr-1.5" />
                                                        {currentUrl ? 'Change' : 'Upload'}
                                                    </Button>
                                                </div>
                                            </div>
                                        );
                                    })()}
                                    
                                    {/* Brand Text controls - shown when Brand Text toggle is on */}
                                    {isBrandText && isVisible && (
                                        <div className="ml-1 mt-2 mb-1 pl-3 border-l-2 border-primary/20">
                                            <input 
                                                type="text" 
                                                value={(selectedSettings.text && selectedSettings.text['brandText']) || 'Brand'}
                                                onChange={(e) => {
                                                    const newText = {
                                                        ...selectedSettings.text,
                                                        brandText: e.target.value
                                                    };
                                                    onChangeSettings({ ...selectedSettings, text: newText });
                                                }}
                                                placeholder="Enter brand name"
                                                className="flex h-8 w-full rounded-md border border-input bg-background px-3 py-1 text-xs shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                            />
                                        </div>
                                    )}
                                    
                                    {/* Session Type Badge controls - per-session inputs shown when toggle is on */}
                                    {element.id === 'showSessionType' && isVisible && (() => {
                                        const counts = selectedSettings.counts || {};
                                        const dayCountKey = `day${activeAgendaDay}Count`;
                                        const sessionsForDay = counts[dayCountKey] || counts['count'] || 6;
                                        const defaultTypes = ['Workshop', 'Keynote', 'Panel', 'Networking', 'Talk', 'Fireside Chat'];
                                        
                                        return (
                                            <div className="ml-1 mt-2 mb-1 pl-3 border-l-2 border-primary/20 space-y-2">
                                                <div className="flex items-center gap-2 mb-1.5">
                                                    <span className="text-[10px] font-medium text-muted-foreground">Types for</span>
                                                    <span className="text-[10px] text-primary bg-primary/10 px-1.5 py-0.5 rounded font-medium">
                                                        Day {activeAgendaDay + 1}
                                                    </span>
                                                </div>
                                                {Array.from({ length: sessionsForDay }, (_, sIdx) => {
                                                    const typeKey = `type-d${activeAgendaDay}-s${sIdx}`;
                                                    const defaultType = defaultTypes[(activeAgendaDay + sIdx) % defaultTypes.length];
                                                    const currentVal = (selectedSettings.text && selectedSettings.text[typeKey]) || '';
                                                    
                                                    return (
                                                        <div key={typeKey} className="space-y-0.5">
                                                            <label className="text-[10px] text-muted-foreground font-medium">
                                                                Session {sIdx + 1}
                                                            </label>
                                                            <input 
                                                                type="text" 
                                                                value={currentVal}
                                                                onChange={(e) => {
                                                                    const newText = {
                                                                        ...selectedSettings.text,
                                                                        [typeKey]: e.target.value
                                                                    };
                                                                    onChangeSettings({ ...selectedSettings, text: newText });
                                                                }}
                                                                placeholder={defaultType}
                                                                className="flex h-7 w-full rounded-md border border-input bg-background px-2.5 py-1 text-[11px] shadow-sm transition-colors placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring font-sans"
                                                            />
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        );
                                    })()}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="h-px bg-border w-full" />
            </>
        )}

        {/* Colors - Restricted to Color Variant only */}
        {configurableColors && configurableColors.length > 0 && (
            <>
                <div className="space-y-3">
                    <label className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
                        <Palette className="w-3.5 h-3.5" />
                        Colors
                    </label>
                    <div className="flex items-start gap-2 bg-muted/30 border border-border rounded-md p-2.5">
                        <Info className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
                        <p className="text-[10px] leading-relaxed text-muted-foreground">
                            Colors are controlled by the <span className="font-semibold text-foreground">Color Variant</span> setting above. Select Default, Primary, Secondary, or Accent to change colors.
                        </p>
                    </div>
                </div>
                <div className="h-px bg-border w-full" />
            </>
        )}

        {/* Counts */}
        {configurableCounts && configurableCounts.length > 0 && (
            <>
                <div className="space-y-3">
                    <label className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
                        <Hash className="w-3.5 h-3.5" />
                        Quantities
                    </label>
                    <div className="space-y-4 bg-muted/30 p-3 rounded-md border border-border">
                        {configurableCounts.map((count) => {
                            // Handle per-day session counts for agenda blocks
                            const isPerDayCount = count.id === 'count' && count.label === 'Sessions per Day';
                            const dayCountKey = isPerDayCount ? `day${activeAgendaDay}Count` : count.id;
                            const counts = selectedSettings.counts || {};
                            const value = counts[dayCountKey] !== undefined ? counts[dayCountKey] : (counts[count.id] !== undefined ? counts[count.id] : count.defaultValue);
                            
                            return (
                                <div key={count.id} className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <label className="text-xs font-medium text-foreground">
                                            {count.label}
                                            {isPerDayCount && (
                                                <span className="ml-2 text-[10px] text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                                                    Day {activeAgendaDay + 1}
                                                </span>
                                            )}
                                        </label>
                                        <span className="text-xs font-mono text-muted-foreground">{value}</span>
                                    </div>
                                    <input 
                                        type="range"
                                        min={count.min}
                                        max={count.max}
                                        step={1}
                                        value={value}
                                        onChange={(e) => {
                                            const newCounts = {
                                                ...selectedSettings.counts,
                                                [dayCountKey]: parseInt(e.target.value)
                                            };
                                            onChangeSettings({ ...selectedSettings, counts: newCounts });
                                        }}
                                        className="w-full h-1.5 bg-background rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="h-px bg-border w-full" />
            </>
        )}

        {/* Button Actions */}
        {configurableButtons && configurableButtons.length > 0 && (
            <>
                <div className="space-y-3">
                    <label className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
                        <Link className="w-3.5 h-3.5" />
                        Actions
                    </label>
                    <div className="space-y-4 bg-muted/30 p-3 rounded-md border border-border">
                        {configurableButtons.map((btn) => {
                            const buttons = selectedSettings.buttons || {};
                            const currentBtn: ButtonSetting = buttons[btn.id] || { 
                                text: btn.defaultText, 
                                url: btn.defaultUrl,
                                linkType: 'external'
                            };
                            return (
                                <div key={btn.id} className="space-y-3">
                                    <label className="text-xs font-medium text-foreground">{btn.label}</label>
                                    
                                    {/* Button Text */}
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] text-muted-foreground">Button Text</label>
                                        <input 
                                            type="text" 
                                            value={currentBtn.text}
                                            onChange={(e) => {
                                                const newButtons = { 
                                                    ...selectedSettings.buttons,
                                                    [btn.id]: { ...currentBtn, text: e.target.value }
                                                };
                                                onChangeSettings({ ...selectedSettings, buttons: newButtons });
                                            }}
                                            placeholder="Label"
                                            className="flex h-8 w-full rounded-md border border-input bg-background px-3 py-1 text-xs shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                        />
                                    </div>
                                    
                                    {/* Link Picker */}
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] text-muted-foreground">Link To</label>
                                        <LinkPicker
                                            value={currentBtn}
                                            onChange={(newValue) => {
                                                const newButtons = { 
                                                    ...selectedSettings.buttons,
                                                    [btn.id]: newValue
                                                };
                                                onChangeSettings({ ...selectedSettings, buttons: newButtons });
                                            }}
                                            pages={pages}
                                            onCreatePage={onAddPage}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="h-px bg-border w-full" />
            </>
        )}

        {/* Images */}
        {configurableImages && configurableImages.length > 0 && (() => {
            // Filter out brand image if handled by brand toggle controls
            const hasBrandToggle = toggleableElements && toggleableElements.some(el => el.id === 'showBrandImage');
            const filteredImages = hasBrandToggle 
                ? configurableImages.filter(img => img.id !== 'logo') 
                : configurableImages;
            if (filteredImages.length === 0) return null;
            return (
            <>
                <div className="space-y-3">
                    <label className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
                        <ImageIcon className="w-3.5 h-3.5" />
                        Images
                    </label>
                    <div className="space-y-6 bg-muted/30 p-3 rounded-md border border-border">
                        {filteredImages.map((img) => {
                            const currentUrl = getImageUrl(img.id, img.defaultUrl);
                            const imageSettings = getImageSettings(img.id);
                            const fit = (imageSettings && imageSettings.fit) ? imageSettings.fit : (img.defaultFit || 'cover');
                            const position = (imageSettings && imageSettings.position) ? imageSettings.position : (img.defaultPosition || 'center');
                            const zoom = (imageSettings && imageSettings.zoom !== undefined) ? imageSettings.zoom : 100;
                            
                            return (
                                <div key={img.id} className="space-y-3">
                                    <label className="text-xs font-medium text-foreground">{img.label}</label>
                                    
                                    {/* Image preview and upload */}
                                    <div className="flex gap-3">
                                        <div 
                                            className="relative w-20 h-20 shrink-0 overflow-hidden rounded-md border border-border bg-muted group cursor-pointer shadow-sm hover:ring-2 hover:ring-primary hover:ring-offset-1 transition-all" 
                                            onClick={() => {
                                                setCurrentImageId(img.id);
                                                setTempImageUrl(currentUrl);
                                                setAssetModalOpen(true);
                                            }}
                                        >
                                            <img src={currentUrl} alt={img.label} className="h-full w-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Upload className="w-5 h-5 text-white" />
                                            </div>
                                        </div>
                                        <div className="flex-1 flex flex-col gap-2 justify-center">
                                            <Button 
                                                variant="outline" 
                                                size="sm" 
                                                className="w-full text-xs h-8 justify-start font-normal"
                                                onClick={() => {
                                                    setCurrentImageId(img.id);
                                                    setTempImageUrl(currentUrl);
                                                    setAssetModalOpen(true);
                                                }}
                                            >
                                                <ImageIcon className="w-3.5 h-3.5 mr-2" />
                                                Choose Image...
                                            </Button>
                                            <div className="flex items-center gap-2">
                                                 <span className="text-[10px] text-muted-foreground font-mono bg-muted px-1.5 py-0.5 rounded border truncate max-w-[140px]" title={currentUrl}>
                                                    {((currentUrl.split('/').pop() || 'image.jpg').substring(0, 20))}...
                                                 </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Image Fit */}
                                    <div className="space-y-2 pt-2 border-t border-border/50">
                                        <label className="text-[10px] font-semibold text-muted-foreground flex items-center gap-1.5">
                                            <Move className="w-3 h-3" />
                                            Image Fit
                                        </label>
                                        <div className="grid grid-cols-2 gap-1.5">
                                            {[
                                                { value: 'cover', label: 'Cover' },
                                                { value: 'contain', label: 'Contain' },
                                                { value: 'fill', label: 'Fill' },
                                                { value: 'scale-down', label: 'Stretch' }
                                            ].map((option) => (
                                                <button
                                                    key={option.value}
                                                    type="button"
                                                    onClick={() => handleImageSettingChange(img.id, 'fit', option.value)}
                                                    className={cn(
                                                        'px-2 py-1.5 rounded text-[10px] font-medium transition-all border',
                                                        fit === option.value
                                                            ? 'border-primary bg-primary/10 text-primary'
                                                            : 'border-border bg-background text-muted-foreground hover:bg-muted'
                                                    )}
                                                >
                                                    {option.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Image Position */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-semibold text-muted-foreground flex items-center gap-1.5">
                                            <Maximize2 className="w-3 h-3" />
                                            Position
                                        </label>
                                        <div className="grid grid-cols-3 gap-0.5 w-full max-w-[120px] aspect-square bg-muted/20 p-0.5 rounded border border-border mx-auto">
                                            {[
                                                { value: 'top-left', label: 'Top Left' },
                                                { value: 'top', label: 'Top' },
                                                { value: 'top-right', label: 'Top Right' },
                                                { value: 'left', label: 'Left' },
                                                { value: 'center', label: 'Center' },
                                                { value: 'right', label: 'Right' },
                                                { value: 'bottom-left', label: 'Bottom Left' },
                                                { value: 'bottom', label: 'Bottom' },
                                                { value: 'bottom-right', label: 'Bottom Right' }
                                            ].map((option) => (
                                                <button
                                                    key={option.value}
                                                    type="button"
                                                    onClick={() => handleImageSettingChange(img.id, 'position', option.value)}
                                                    title={option.label}
                                                    className={cn(
                                                        'w-full h-full rounded-sm transition-all border border-transparent flex items-center justify-center',
                                                        position === option.value
                                                            ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                                                            : 'bg-background hover:bg-muted text-muted-foreground'
                                                    )}
                                                >
                                                    <div className="w-1 h-1 rounded-full bg-current" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Zoom */}
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <label className="text-[10px] font-semibold text-muted-foreground">
                                                Zoom
                                            </label>
                                            <span className="text-[10px] font-mono text-muted-foreground">{zoom}%</span>
                                        </div>
                                        <Slider
                                            value={[zoom]}
                                            onValueChange={(values) => handleImageSettingChange(img.id, 'zoom', values[0])}
                                            min={50}
                                            max={200}
                                            step={5}
                                            className="w-full"
                                        />
                                    </div>

                                    {/* Image Link (if linkable) */}
                                    {img.linkable && (
                                        <div className="space-y-2 pt-2 border-t border-border/50">
                                            <label className="text-[10px] font-semibold text-muted-foreground flex items-center gap-1.5">
                                                <Link className="w-3 h-3" />
                                                Link To
                                            </label>
                                            <LinkPicker
                                                value={{
                                                    text: '',
                                                    url: imageSettings?.linkUrl || '',
                                                    linkType: imageSettings?.linkType || 'external',
                                                    pageId: imageSettings?.linkPageId
                                                }}
                                                onChange={(newValue) => {
                                                    handleImageSettingChange(img.id, 'linkType', newValue.linkType);
                                                    handleImageSettingChange(img.id, 'linkUrl', newValue.url);
                                                    handleImageSettingChange(img.id, 'linkPageId', newValue.pageId);
                                                }}
                                                pages={pages}
                                                onCreatePage={onAddPage}
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="h-px bg-border w-full" />
            </>
            );
        })()}

        {/* Selects */}
        {configurableSelects && configurableSelects.length > 0 && (
            <>
                <div className="space-y-3">
                    <label className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
                        <Sliders className="w-3.5 h-3.5" />
                        Settings
                    </label>
                    <div className="space-y-4 bg-muted/30 p-3 rounded-md border border-border">
                        {configurableSelects.map((select) => {
                            const selects = selectedSettings.selects || {};
                            const value = selects[select.id] || select.defaultValue;
                            const isPosition = select.id.toLowerCase().includes('position');
                            
                            return (
                                <div key={select.id} className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <label className="text-xs font-medium text-foreground">{select.label}</label>
                                    </div>
                                    {isPosition ? (
                                        <div className="flex justify-center py-2">
                                            <PositionPicker 
                                                value={value} 
                                                onChange={(val) => {
                                                    const newSelects = {
                                                        ...selectedSettings.selects,
                                                        [select.id]: val
                                                    };
                                                    onChangeSettings({ ...selectedSettings, selects: newSelects });
                                                }} 
                                            />
                                        </div>
                                    ) : (
                                        <select
                                            value={value}
                                            onChange={(e) => {
                                                const newSelects = {
                                                    ...selectedSettings.selects,
                                                    [select.id]: e.target.value
                                                };
                                                onChangeSettings({ ...selectedSettings, selects: newSelects });
                                            }}
                                            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                        >
                                            {select.options.map((opt) => (
                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="h-px bg-border w-full" />
            </>
        )}

        {/* Ranges */}
        {configurableRanges && configurableRanges.length > 0 && (
            <>
                <div className="space-y-3">
                    <label className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
                        <Sliders className="w-3.5 h-3.5" />
                        Adjustments
                    </label>
                    <div className="space-y-4 bg-muted/30 p-3 rounded-md border border-border">
                        {configurableRanges.map((range) => {
                            const ranges = selectedSettings.ranges || {};
                            const value = ranges[range.id] !== undefined ? ranges[range.id] : range.defaultValue;
                            return (
                                <div key={range.id} className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <label className="text-xs font-medium text-foreground">{range.label}</label>
                                        <span className="text-xs font-mono text-muted-foreground">{value}{range.unit}</span>
                                    </div>
                                    <input 
                                        type="range"
                                        min={range.min}
                                        max={range.max}
                                        step={range.step}
                                        value={value}
                                        onChange={(e) => {
                                            const newRanges = {
                                                ...selectedSettings.ranges,
                                                [range.id]: parseInt(e.target.value)
                                            };
                                            onChangeSettings({ ...selectedSettings, ranges: newRanges });
                                        }}
                                        className="w-full h-1.5 bg-background rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="h-px bg-border w-full" />
            </>
        )}

        {/* Icons */}
        {configurableIcons && configurableIcons.length > 0 && (
            <>
                <div className="space-y-3">
                    <label className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
                        <Box className="w-3.5 h-3.5" />
                        Icons
                    </label>
                    <div className="space-y-4 bg-muted/30 p-3 rounded-md border border-border">
                        {configurableIcons.map((iconDef) => {
                            // Find which key corresponds to current svg if possible, or just show list
                             return (
                                <div key={iconDef.id} className="space-y-2">
                                    <label className="text-xs font-medium text-foreground">{iconDef.label}</label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {Object.keys(ICONS).map((iconKey) => (
                                            <button
                                                key={iconKey}
                                                type="button"
                                                // @ts-ignore
                                                onClick={() => handleIconChange(iconDef.id, iconKey)}
                                                onMouseDown={(e) => e.preventDefault()}
                                                className={cn(
                                                    "flex items-center justify-center p-2 rounded-md border transition-all hover:bg-muted",
                                                    // This check is a bit naive if checking raw SVG string equality but it works for now since we set it from ICONS
                                                    // @ts-ignore
                                                    ((selectedSettings.icons && selectedSettings.icons[iconDef.id] === ICONS[iconKey]) || (!selectedSettings.icons || !selectedSettings.icons[iconDef.id]) && ICONS[iconDef.defaultIcon] === ICONS[iconKey])
                                                        ? "border-primary bg-primary/10 text-primary" 
                                                        : "border-border bg-background text-muted-foreground"
                                                )}
                                                title={iconKey}
                                            >
                                                <div className="w-4 h-4 [&>svg]:w-full [&>svg]:h-full" dangerouslySetInnerHTML={{ 
                                                    // @ts-ignore
                                                    __html: ICONS[iconKey] 
                                                }} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="h-px bg-border w-full" />
            </>
        )}

        {/* Padding / Spacing */}
        <div className="space-y-3">
            <label className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
                <VerticalPaddingIcon />
                Vertical Padding
            </label>
            <div className="grid grid-cols-5 gap-1 bg-muted/30 p-1 rounded-md border border-border">
                {PADDINGS.map((p) => {
                    const isActive = selectedSettings.padding === p.id || (!selectedSettings.padding && p.id === 'medium'); // defaulting visual
                    return (
                        <button 
                            key={p.id}
                            type="button"
                            onClick={() => onChangeSettings({ ...selectedSettings, padding: p.id as any })}
                            onMouseDown={(e) => e.preventDefault()}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 py-1.5 rounded transition-all",
                                isActive ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                            title={p.name}
                        >
                            <PaddingIcon size={p.id as 'none' | 'small' | 'medium' | 'large' | 'xlarge'} />
                        </button>
                    )
                })}
            </div>
            <div className="flex justify-between px-1">
                <span className="text-[10px] text-muted-foreground">None</span>
                <span className="text-[10px] text-muted-foreground">Max</span>
            </div>
        </div>

        <div className="h-px bg-border w-full" />

        {/* Section Divider */}
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
                    <Minus className="w-3.5 h-3.5" />
                    Section Divider
                </label>
                <Switch 
                    checked={selectedSettings.divider?.enabled || false} 
                    onCheckedChange={(checked) => {
                        const currentDivider = selectedSettings.divider || {};
                        onChangeSettings({ 
                            ...selectedSettings, 
                            divider: { 
                                ...currentDivider,
                                enabled: checked,
                                // Set defaults when enabling
                                color: currentDivider.color || 'var(--border)',
                                thickness: currentDivider.thickness || 1,
                                width: currentDivider.width || 100,
                                marginTop: currentDivider.marginTop || 0,
                                marginBottom: currentDivider.marginBottom || 0
                            } 
                        });
                    }}
                    className="scale-75 origin-right"
                />
            </div>
            
            {selectedSettings.divider?.enabled && (
                <div className="space-y-4 bg-muted/30 p-3 rounded-md border border-border">
                    {/* Divider Color */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-semibold text-muted-foreground">Color</label>
                        <div className="flex items-center gap-2">
                            <input 
                                type="color"
                                value={selectedSettings.divider?.color?.startsWith('var') ? '#e5e7eb' : selectedSettings.divider?.color || '#e5e7eb'}
                                onChange={(e) => {
                                    const currentDivider = selectedSettings.divider || {};
                                    onChangeSettings({ 
                                        ...selectedSettings, 
                                        divider: { ...currentDivider, color: e.target.value } as DividerSettings
                                    });
                                }}
                                className="w-8 h-8 rounded cursor-pointer border border-border"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    const currentDivider = selectedSettings.divider || {};
                                    onChangeSettings({ 
                                        ...selectedSettings, 
                                        divider: { ...currentDivider, color: 'var(--border)' } as DividerSettings
                                    });
                                }}
                                className={cn(
                                    "px-2 py-1 rounded text-[10px] font-medium border transition-all",
                                    selectedSettings.divider?.color === 'var(--border)' || !selectedSettings.divider?.color
                                        ? "border-primary bg-primary/10 text-primary"
                                        : "border-border bg-background text-muted-foreground hover:bg-muted"
                                )}
                            >
                                Theme
                            </button>
                        </div>
                    </div>

                    {/* Divider Thickness */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-[10px] font-semibold text-muted-foreground">Thickness</label>
                            <span className="text-[10px] font-mono text-muted-foreground">{selectedSettings.divider?.thickness || 1}px</span>
                        </div>
                        <input 
                            type="range"
                            min={1}
                            max={8}
                            step={1}
                            value={selectedSettings.divider?.thickness || 1}
                            onChange={(e) => {
                                const currentDivider = selectedSettings.divider || {};
                                onChangeSettings({ 
                                    ...selectedSettings, 
                                    divider: { ...currentDivider, thickness: parseInt(e.target.value) } as DividerSettings
                                });
                            }}
                            className="w-full h-1.5 bg-background rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                        />
                    </div>

                    {/* Divider Width */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-[10px] font-semibold text-muted-foreground">Width</label>
                            <span className="text-[10px] font-mono text-muted-foreground">{selectedSettings.divider?.width || 100}%</span>
                        </div>
                        <input 
                            type="range"
                            min={10}
                            max={100}
                            step={5}
                            value={selectedSettings.divider?.width || 100}
                            onChange={(e) => {
                                const currentDivider = selectedSettings.divider || {};
                                onChangeSettings({ 
                                    ...selectedSettings, 
                                    divider: { ...currentDivider, width: parseInt(e.target.value) } as DividerSettings
                                });
                            }}
                            className="w-full h-1.5 bg-background rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                        />
                    </div>

                    {/* Divider Margins */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-[10px] font-semibold text-muted-foreground flex items-center gap-1">
                                    <ChevronUp className="w-2.5 h-2.5" />
                                    Top
                                </label>
                                <span className="text-[10px] font-mono text-muted-foreground">{selectedSettings.divider?.marginTop || 0}px</span>
                            </div>
                            <input 
                                type="range"
                                min={0}
                                max={80}
                                step={4}
                                value={selectedSettings.divider?.marginTop || 0}
                                onChange={(e) => {
                                    const currentDivider = selectedSettings.divider || {};
                                    onChangeSettings({ 
                                        ...selectedSettings, 
                                        divider: { ...currentDivider, marginTop: parseInt(e.target.value) } as DividerSettings
                                    });
                                }}
                                className="w-full h-1.5 bg-background rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-[10px] font-semibold text-muted-foreground flex items-center gap-1">
                                    <ChevronDown className="w-2.5 h-2.5" />
                                    Bottom
                                </label>
                                <span className="text-[10px] font-mono text-muted-foreground">{selectedSettings.divider?.marginBottom || 0}px</span>
                            </div>
                            <input 
                                type="range"
                                min={0}
                                max={80}
                                step={4}
                                value={selectedSettings.divider?.marginBottom || 0}
                                onChange={(e) => {
                                    const currentDivider = selectedSettings.divider || {};
                                    onChangeSettings({ 
                                        ...selectedSettings, 
                                        divider: { ...currentDivider, marginBottom: parseInt(e.target.value) } as DividerSettings
                                    });
                                }}
                                className="w-full h-1.5 bg-background rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>

      </div>

      <div className="pt-4 border-t border-border">
        <div className="bg-primary/10 text-primary p-3 rounded-md text-xs">
          <strong>Tip:</strong> Double-click text on the canvas to edit content. Use font weight and alignment controls above for basic formatting.
        </div>
      </div>

      <Dialog open={assetModalOpen} onOpenChange={setAssetModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-sans" style={{ fontSize: 'var(--text-lg)' }}>Choose Image</DialogTitle>
            <DialogDescription className="font-sans" style={{ fontSize: 'var(--text-sm)' }}>
              Upload an image or select from library.
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upload" className="font-sans">Upload</TabsTrigger>
              <TabsTrigger value="library" className="font-sans">Library</TabsTrigger>
              <TabsTrigger value="link" className="font-sans">Link</TabsTrigger>
            </TabsList>
            <TabsContent value="upload" className="py-4">
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-md p-6 gap-2 hover:bg-muted/50 transition-colors cursor-pointer relative h-[200px]">
                 <Cloud className="w-8 h-8 text-muted-foreground" />
                 <span className="text-sm font-medium text-muted-foreground font-sans">Drag &amp; drop or click to upload</span>
                 <input 
                    type="file" 
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleImageUpload}
                 />
              </div>
            </TabsContent>
            <TabsContent value="library" className="py-4">
               <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto custom-scrollbar">
                  {/* Mock Library */}
                  {[
                      "https://images.unsplash.com/photo-1762279389053-d5a30239ae45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
                      "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
                      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
                      "https://images.unsplash.com/photo-1762968269894-1d7e1ce8894e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
                  ].map((url, i) => (
                      <div 
                        key={i} 
                        className="aspect-square bg-muted rounded-md overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary relative group"
                        onClick={() => handleImageUpdate(url)}
                      >
                         <img src={url} alt="" className="w-full h-full object-cover" />
                         <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                  ))}
               </div>
            </TabsContent>
            <TabsContent value="link" className="py-4 space-y-4">
               <div className="space-y-2">
                  <label className="text-sm font-medium font-sans">Image URL</label>
                  <input 
                     className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring font-sans"
                     value={tempImageUrl}
                     onChange={(e) => setTempImageUrl(e.target.value)}
                     placeholder="https://example.com/image.jpg"
                  />
               </div>
               <Button onClick={() => handleImageUpdate(tempImageUrl)} className="w-full font-sans">
                  Use Image
               </Button>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Image Crop/Adjust Modal */}
      <ImageCropModal
        isOpen={cropModalOpen}
        onClose={() => setCropModalOpen(false)}
        imageUrl={cropImageUrl}
        onConfirm={handleCropConfirm}
        initialSettings={cropImageSettings}
      />
    </div>
  );
};
