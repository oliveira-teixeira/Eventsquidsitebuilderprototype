import React from "react";
import { 
  Users, 
  CalendarCheck,
  AlignLeft,
  Layout,
  List,
  MapPin,
  Download,
  Building,
  Grid3X3,
  Timer,
  Megaphone,
  CreditCard,
  Image as ImageIcon
} from "lucide-react";
import { getImageUrl, getImageStyleString, ImageSetting } from '@/app/utils/image-helpers';

// --- Settings Interface ---
export interface ButtonSetting {
  text: string;
  url: string;
  linkType?: 'internal' | 'external'; // 'internal' for page links, 'external' for URLs
  pageId?: string; // Used when linkType is 'internal'
}

export interface DividerSettings {
  enabled: boolean;
  color?: string;
  thickness?: number; // in pixels
  width?: number; // percentage of page width (1-100)
  marginTop?: number; // in pixels
  marginBottom?: number; // in pixels
}

export interface BlockSettings {
  padding?: 'none' | 'small' | 'medium' | 'large' | 'xlarge';
  showInMobile?: boolean;
  visibility?: Record<string, boolean>; // e.g. { showImage: true, showButton: false }
  buttons?: Record<string, ButtonSetting>;
  images?: Record<string, string | ImageSetting>;
  icons?: Record<string, string>;
  text?: Record<string, string>;
  textAlign?: 'left' | 'center' | 'right';
  fontWeight?: 'normal' | 'semibold';
  textLinks?: Record<string, { url: string; label?: string }>;
  counts?: Record<string, number>;
  colors?: Record<string, string>;
  selects?: Record<string, string>;
  ranges?: Record<string, number>;
  cmsCollectionId?: string;
  cmsItems?: any[];
  divider?: DividerSettings;
}

export interface ToggleableElement {
    id: string;
    label: string;
    defaultValue: boolean;
}

export interface BlockButtonDefinition {
    id: string;
    label: string;
    defaultText: string;
    defaultUrl: string;
}

export interface BlockImageDefinition {
    id: string;
    label: string;
    defaultUrl: string;
    defaultFit?: 'cover' | 'contain' | 'fill' | 'scale-down';
    defaultPosition?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    linkable?: boolean; // Whether this image can be linked to a page/URL
}

export interface BlockIconDefinition {
    id: string;
    label: string;
    defaultIcon: keyof typeof ICONS;
}

export interface BlockCountDefinition {
    id: string;
    label: string;
    min: number;
    max: number;
    defaultValue: number;
}

export interface BlockColorDefinition {
    id: string;
    label: string;
    defaultValue: string;
}

export interface BlockSelectDefinition {
    id: string;
    label: string;
    options: { label: string; value: string }[];
    defaultValue: string;
}

export interface BlockRangeDefinition {
    id: string;
    label: string;
    min: number;
    max: number;
    step: number;
    defaultValue: number;
    unit?: string;
}

// --- Helper Functions ---

// Default images from Unsplash for better first impression - Hotels theme
const DEFAULT_IMAGES = {
  hero: "https://images.unsplash.com/photo-1723465308831-29da05e011f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGV4dGVyaW9yfGVufDF8fHx8MTc2OTcwNzU0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  conference: "https://images.unsplash.com/photo-1584564928625-483c5be78288?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGNvbmZlcmVuY2UlMjByb29tfGVufDF8fHx8MTc2OTY4MTE1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  hotel: "https://images.unsplash.com/photo-1637730827702-f847ebb70dbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGxvYmJ5JTIwbW9kZXJufGVufDF8fHx8MTc2OTY1NjU4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  location: "https://images.unsplash.com/photo-1725962479542-1be0a6b0d444?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHN1aXRlJTIwYmVkcm9vbXxlbnwxfHx8fDE3Njk3NTY2MTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  speaker: "https://images.unsplash.com/photo-1729717949948-56b52db111dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHBvb2wlMjByZXNvcnR8ZW58MXx8fHwxNzY5NzQxMDYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
};

const PLACEHOLDER_IMG = DEFAULT_IMAGES.hero; // Fallback to hero image

// Helper to generate schematic thumbnails as SVG strings
const Schematics = {
  Hero: (
    <svg viewBox="0 0 100 60" className="w-full h-full text-foreground/20 fill-current">
      <rect x="10" y="10" width="80" height="8" rx="1" />
      <rect x="10" y="22" width="50" height="4" rx="1" />
      <rect x="10" y="30" width="20" height="6" rx="1" className="text-primary/20" />
      <rect x="35" y="30" width="20" height="6" rx="1" />
    </svg>
  ),
  HeroModern: (
    <svg viewBox="0 0 100 60" className="w-full h-full text-foreground/20 fill-current">
      <rect x="20" y="15" width="60" height="8" rx="1" />
      <rect x="30" y="27" width="40" height="4" rx="1" />
      <rect x="35" y="38" width="12" height="6" rx="1" className="text-primary/20" />
      <rect x="53" y="38" width="12" height="6" rx="1" />
    </svg>
  ),
  HeroSplit: (
    <svg viewBox="0 0 100 60" className="w-full h-full text-foreground/20 fill-current">
      <rect x="10" y="15" width="35" height="6" rx="1" />
      <rect x="10" y="25" width="30" height="4" rx="1" />
      <rect x="10" y="35" width="12" height="6" rx="1" className="text-primary/20" />
      <rect x="55" y="10" width="35" height="40" rx="1" />
    </svg>
  ),
  HeroVideo: (
    <svg viewBox="0 0 100 60" className="w-full h-full text-foreground/20 fill-current">
      <rect x="0" y="0" width="100" height="60" className="text-primary/5" />
      <circle cx="50" cy="30" r="8" className="text-primary/40" />
      <polygon points="48,26 54,30 48,34" className="text-foreground" fill="currentColor" />
    </svg>
  ),
  Agenda: (
    <svg viewBox="0 0 100 60" className="w-full h-full text-foreground/20 fill-current">
      {/* Schedule List (Compact) - time | title+badge | avatars */}
      {/* Row 1 */}
      <rect x="6" y="8" width="14" height="3" rx="0.5" className="opacity-60" />
      <rect x="24" y="7" width="30" height="4" rx="0.5" />
      <rect x="24" y="12" width="20" height="2" rx="0.5" className="opacity-40" />
      <circle cx="82" cy="10" r="3" className="opacity-50" />
      <circle cx="88" cy="10" r="3" className="opacity-50" />
      <line x1="6" y1="17" x2="94" y2="17" stroke="currentColor" strokeWidth="0.3" className="opacity-30" />
      {/* Row 2 */}
      <rect x="6" y="21" width="14" height="3" rx="0.5" className="opacity-60" />
      <rect x="24" y="20" width="34" height="4" rx="0.5" />
      <rect x="24" y="25" width="18" height="2" rx="0.5" className="opacity-40" />
      <rect x="56" y="20" width="10" height="3" rx="1" className="text-primary/30" />
      <circle cx="82" cy="23" r="3" className="opacity-50" />
      <circle cx="88" cy="23" r="3" className="opacity-50" />
      <circle cx="94" cy="23" r="3" className="opacity-50" />
      <line x1="6" y1="30" x2="94" y2="30" stroke="currentColor" strokeWidth="0.3" className="opacity-30" />
      {/* Row 3 */}
      <rect x="6" y="34" width="14" height="3" rx="0.5" className="opacity-60" />
      <rect x="24" y="33" width="28" height="4" rx="0.5" />
      <rect x="24" y="38" width="22" height="2" rx="0.5" className="opacity-40" />
      <circle cx="82" cy="36" r="3" className="opacity-50" />
      <circle cx="88" cy="36" r="3" className="opacity-50" />
      <line x1="6" y1="43" x2="94" y2="43" stroke="currentColor" strokeWidth="0.3" className="opacity-30" />
      {/* Row 4 */}
      <rect x="6" y="47" width="14" height="3" rx="0.5" className="opacity-60" />
      <rect x="24" y="46" width="32" height="4" rx="0.5" />
      <rect x="24" y="51" width="16" height="2" rx="0.5" className="opacity-40" />
      <rect x="56" y="46" width="8" height="3" rx="1" className="text-primary/30" />
      <circle cx="82" cy="49" r="3" className="opacity-50" />
    </svg>
  ),
  AgendaGrid: (
    <svg viewBox="0 0 100 60" className="w-full h-full text-foreground/20 fill-current">
      {/* 2-column grid with 6 cards (3 rows x 2 cols) */}
      {/* Row 1 */}
      <rect x="8" y="8" width="40" height="14" rx="1.5" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-border" />
      <rect x="10" y="10" width="16" height="3" rx="0.5" />
      <rect x="10" y="15" width="24" height="2" rx="0.5" className="opacity-60" />
      
      <rect x="52" y="8" width="40" height="14" rx="1.5" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-border" />
      <rect x="54" y="10" width="16" height="3" rx="0.5" />
      <rect x="54" y="15" width="24" height="2" rx="0.5" className="opacity-60" />
      
      {/* Row 2 */}
      <rect x="8" y="25" width="40" height="14" rx="1.5" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-border" />
      <rect x="10" y="27" width="16" height="3" rx="0.5" />
      <rect x="10" y="32" width="24" height="2" rx="0.5" className="opacity-60" />
      
      <rect x="52" y="25" width="40" height="14" rx="1.5" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-border" />
      <rect x="54" y="27" width="16" height="3" rx="0.5" />
      <rect x="54" y="32" width="24" height="2" rx="0.5" className="opacity-60" />
      
      {/* Row 3 */}
      <rect x="8" y="42" width="40" height="14" rx="1.5" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-border" />
      <rect x="10" y="44" width="16" height="3" rx="0.5" />
      <rect x="10" y="49" width="24" height="2" rx="0.5" className="opacity-60" />
      
      <rect x="52" y="42" width="40" height="14" rx="1.5" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-border" />
      <rect x="54" y="44" width="16" height="3" rx="0.5" />
      <rect x="54" y="49" width="24" height="2" rx="0.5" className="opacity-60" />
    </svg>
  ),
  Bento: (
    <svg viewBox="0 0 100 60" className="w-full h-full text-foreground/20 fill-current">
      <rect x="10" y="10" width="45" height="40" rx="1" />
      <rect x="60" y="10" width="30" height="18" rx="1" />
      <rect x="60" y="32" width="30" height="18" rx="1" />
    </svg>
  ),
  Ledger: (
    <svg viewBox="0 0 100 60" className="w-full h-full text-foreground/20 fill-current">
      <line x1="10" y1="10" x2="90" y2="10" stroke="currentColor" strokeWidth="1" />
      <rect x="10" y="15" width="20" height="4" rx="1" />
      <rect x="50" y="15" width="40" height="8" rx="1" />
      <line x1="10" y1="30" x2="90" y2="30" stroke="currentColor" strokeWidth="1" />
      <rect x="10" y="35" width="20" height="4" rx="1" />
      <rect x="50" y="35" width="40" height="8" rx="1" />
    </svg>
  ),
  SpeakersList: (
    <svg viewBox="0 0 100 60" className="w-full h-full text-foreground/20 fill-current">
      <circle cx="13" cy="11" r="5" />
      <rect x="21" y="8" width="20" height="2.5" rx="0.5" />
      <rect x="21" y="12" width="14" height="1.5" rx="0.5" className="opacity-60" />
      <circle cx="13" cy="28" r="5" />
      <rect x="21" y="25" width="20" height="2.5" rx="0.5" />
      <rect x="21" y="29" width="14" height="1.5" rx="0.5" className="opacity-60" />
      <circle cx="13" cy="45" r="5" />
      <rect x="21" y="42" width="20" height="2.5" rx="0.5" />
      <rect x="21" y="46" width="14" height="1.5" rx="0.5" className="opacity-60" />
      <circle cx="55" cy="11" r="5" />
      <rect x="63" y="8" width="20" height="2.5" rx="0.5" />
      <rect x="63" y="12" width="14" height="1.5" rx="0.5" className="opacity-60" />
      <circle cx="55" cy="28" r="5" />
      <rect x="63" y="25" width="20" height="2.5" rx="0.5" />
      <rect x="63" y="29" width="14" height="1.5" rx="0.5" className="opacity-60" />
      <circle cx="55" cy="45" r="5" />
      <rect x="63" y="42" width="20" height="2.5" rx="0.5" />
      <rect x="63" y="46" width="14" height="1.5" rx="0.5" className="opacity-60" />
    </svg>
  ),
  SpeakersGrid: (
    <svg viewBox="0 0 100 60" className="w-full h-full text-foreground/20 fill-current">
      <circle cx="17" cy="14" r="5" />
      <rect x="10" y="21" width="14" height="2" rx="0.5" />
      <circle cx="50" cy="14" r="5" />
      <rect x="43" y="21" width="14" height="2" rx="0.5" />
      <circle cx="83" cy="14" r="5" />
      <rect x="76" y="21" width="14" height="2" rx="0.5" />
      <circle cx="17" cy="40" r="5" />
      <rect x="10" y="47" width="14" height="2" rx="0.5" />
      <circle cx="50" cy="40" r="5" />
      <rect x="43" y="47" width="14" height="2" rx="0.5" />
      <circle cx="83" cy="40" r="5" />
      <rect x="76" y="47" width="14" height="2" rx="0.5" />
    </svg>
  ),
  RSVP: (
    <svg viewBox="0 0 100 60" className="w-full h-full text-foreground/20 fill-current">
      <rect x="25" y="15" width="50" height="30" rx="2" stroke="currentColor" fill="none" strokeWidth="1" />
      <rect x="30" y="22" width="40" height="4" rx="1" />
      <rect x="30" y="30" width="20" height="4" rx="1" />
      <rect x="55" y="30" width="15" height="6" rx="1" className="fill-primary/50" />
    </svg>
  ),
  CountdownSimple: (
    <svg viewBox="0 0 100 60" className="w-full h-full text-foreground/20 fill-current">
      <rect x="8" y="12" width="16" height="24" rx="2" />
      <rect x="10" y="38" width="12" height="2" rx="0.5" className="opacity-60" />
      <rect x="28" y="12" width="16" height="24" rx="2" />
      <rect x="30" y="38" width="12" height="2" rx="0.5" className="opacity-60" />
      <rect x="48" y="12" width="16" height="24" rx="2" />
      <rect x="50" y="38" width="12" height="2" rx="0.5" className="opacity-60" />
      <rect x="68" y="12" width="16" height="24" rx="2" />
      <rect x="70" y="38" width="12" height="2" rx="0.5" className="opacity-60" />
    </svg>
  ),
  CountdownBanner: (
    <svg viewBox="0 0 100 60" className="w-full h-full text-foreground/20 fill-current">
      <rect x="12" y="22" width="8" height="16" rx="1" />
      <rect x="24" y="22" width="8" height="16" rx="1" />
      <rect x="36" y="22" width="8" height="16" rx="1" />
      <rect x="48" y="22" width="8" height="16" rx="1" />
      <rect x="70" y="24" width="18" height="12" rx="1" className="fill-primary/50" />
    </svg>
  ),
  LocationInfo: (
    <svg viewBox="0 0 100 60" className="w-full h-full text-foreground/20 fill-current">
       <rect x="10" y="10" width="40" height="40" rx="2" stroke="currentColor" fill="none" />
       <circle cx="30" cy="30" r="5" fill="currentColor" />
       <rect x="60" y="15" width="30" height="4" rx="1" />
       <rect x="60" y="25" width="20" height="4" rx="1" />
    </svg>
  ),
  LocationCardOverlay: (
    <svg viewBox="0 0 100 60" className="w-full h-full text-foreground/20 fill-current">
      <rect x="8" y="8" width="84" height="44" rx="2" className="opacity-40" />
      <circle cx="50" cy="26" r="4" className="opacity-40" />
      <rect x="14" y="30" width="40" height="22" rx="2" className="opacity-100" />
      <rect x="18" y="34" width="20" height="3" rx="0.5" />
      <rect x="18" y="40" width="28" height="2" rx="0.5" className="opacity-60" />
      <rect x="18" y="44" width="24" height="2" rx="0.5" className="opacity-60" />
    </svg>
  ),
  SponsorsGrid: (
    <svg viewBox="0 0 100 60" className="w-full h-full text-foreground/20 fill-current">
      <rect x="8" y="8" width="18" height="12" rx="1" />
      <rect x="30" y="8" width="18" height="12" rx="1" />
      <rect x="52" y="8" width="18" height="12" rx="1" />
      <rect x="74" y="8" width="18" height="12" rx="1" />
      <rect x="8" y="24" width="18" height="12" rx="1" />
      <rect x="30" y="24" width="18" height="12" rx="1" />
      <rect x="52" y="24" width="18" height="12" rx="1" />
      <rect x="74" y="24" width="18" height="12" rx="1" />
      <rect x="8" y="40" width="18" height="12" rx="1" />
      <rect x="30" y="40" width="18" height="12" rx="1" />
      <rect x="52" y="40" width="18" height="12" rx="1" />
      <rect x="74" y="40" width="18" height="12" rx="1" />
    </svg>
  ),
  SponsorsMarquee: (
    <svg viewBox="0 0 100 60" className="w-full h-full text-foreground/20 fill-current">
      <rect x="8" y="20" width="18" height="20" rx="1" />
      <rect x="30" y="20" width="18" height="20" rx="1" />
      <rect x="52" y="20" width="18" height="20" rx="1" />
      <rect x="74" y="20" width="18" height="20" rx="1" />
    </svg>
  ),
  DocsDownloads: (
    <svg viewBox="0 0 100 60" className="w-full h-full text-foreground/20 fill-current">
      <rect x="8" y="15" width="20" height="30" rx="2" />
      <rect x="32" y="15" width="20" height="30" rx="2" />
      <rect x="56" y="15" width="20" height="30" rx="2" />
      <rect x="80" y="15" width="12" height="30" rx="2" className="opacity-40" />
    </svg>
  ),
  DocsList: (
    <svg viewBox="0 0 100 60" className="w-full h-full text-foreground/20 fill-current">
      <rect x="12" y="8" width="6" height="8" rx="1" className="opacity-60" />
      <rect x="22" y="10" width="60" height="3" rx="0.5" />
      <rect x="22" y="13" width="40" height="2" rx="0.5" className="opacity-60" />
      <rect x="12" y="20" width="6" height="8" rx="1" className="opacity-60" />
      <rect x="22" y="22" width="60" height="3" rx="0.5" />
      <rect x="22" y="25" width="40" height="2" rx="0.5" className="opacity-60" />
      <rect x="12" y="32" width="6" height="8" rx="1" className="opacity-60" />
      <rect x="22" y="34" width="60" height="3" rx="0.5" />
      <rect x="22" y="37" width="40" height="2" rx="0.5" className="opacity-60" />
      <rect x="12" y="44" width="6" height="8" rx="1" className="opacity-60" />
      <rect x="22" y="46" width="60" height="3" rx="0.5" />
      <rect x="22" y="49" width="40" height="2" rx="0.5" className="opacity-60" />
    </svg>
  ),
  Hotel: (
    <svg viewBox="0 0 100 60" className="w-full h-full text-foreground/20 fill-current">
      <path d="M10 50h80v-30h-80z" fill="none" stroke="currentColor" />
      <rect x="20" y="30" width="10" height="10" rx="1" />
      <rect x="40" y="30" width="10" height="10" rx="1" />
      <rect x="60" y="30" width="10" height="10" rx="1" />
    </svg>
  ),
  Navbar: (
    <svg viewBox="0 0 100 60" className="w-full h-full text-foreground/20 fill-current">
      <rect x="0" y="0" width="100" height="15" className="text-primary/10" />
      <rect x="10" y="5" width="20" height="5" rx="1" className="text-primary/40" />
      <rect x="60" y="6" width="10" height="3" rx="0.5" />
      <rect x="75" y="6" width="10" height="3" rx="0.5" />
    </svg>
  )
};

export interface BlockDefinition {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  hidden?: boolean;
  toggleableElements?: ToggleableElement[];
  configurableButtons?: BlockButtonDefinition[];
  configurableImages?: BlockImageDefinition[];
  configurableIcons?: BlockIconDefinition[];
  configurableCounts?: BlockCountDefinition[];
  configurableColors?: BlockColorDefinition[];
  configurableSelects?: BlockSelectDefinition[];
  configurableRanges?: BlockRangeDefinition[];
  html: (id: string, variant?: string, settings?: BlockSettings) => string;
}

const getVariantClasses = (variant?: string) => {
  switch (variant) {
    case 'primary': return 'bg-primary text-primary-foreground';
    case 'secondary': return 'bg-secondary text-secondary-foreground';
    case 'accent': return 'bg-accent text-accent-foreground';
    default: return 'bg-background text-foreground';
  }
};

// --- Helper Functions for Settings Access (without optional chaining for Figma compatibility) ---

// Sanitize inline HTML: only allow <b>, <i>, <u>, <strong>, <em>, <br>, <br/> tags.
// Strips all other HTML tags to prevent injection while preserving formatting.
const sanitizeInlineHtml = (html: string): string => {
  if (!html) return html;
  // Only process if it looks like it contains HTML tags
  if (!html.includes('<')) return html;
  // Allow only safe inline formatting tags
  return html.replace(/<\/?(?!b>|\/b>|i>|\/i>|u>|\/u>|strong>|\/strong>|em>|\/em>|br\s*\/?>)[^>]*>/gi, '');
};

const safeGetText = (settings: BlockSettings | undefined, key: string, defaultValue: string): string => {
  if (!settings || !settings.text) return defaultValue;
  const value = settings.text[key];
  if (value === undefined) return defaultValue;
  return sanitizeInlineHtml(value);
};

const safeGetButton = (settings: BlockSettings | undefined, key: string, defaultValue: ButtonSetting): ButtonSetting => {
  if (!settings || !settings.buttons) return defaultValue;
  const value = settings.buttons[key];
  return value !== undefined ? value : defaultValue;
};

const safeGetImage = (settings: BlockSettings | undefined, key: string, defaultValue?: string): string | ImageSetting | undefined => {
  if (!settings || !settings.images) return defaultValue;
  const value = settings.images[key];
  return value !== undefined ? value : defaultValue;
};

// Helper to get image link URL from ImageSetting
const getImageLinkUrl = (imageValue: string | ImageSetting | undefined): string | undefined => {
  if (!imageValue || typeof imageValue === 'string') return undefined;
  if (imageValue.linkUrl && imageValue.linkType) {
    return imageValue.linkUrl;
  }
  return undefined;
};

const safeGetIcon = (settings: BlockSettings | undefined, key: string, defaultValue: string): string => {
  if (!settings || !settings.icons) return defaultValue;
  const value = settings.icons[key];
  return value !== undefined ? value : defaultValue;
};

const safeGetCount = (settings: BlockSettings | undefined, key: string, defaultValue: number): number => {
  if (!settings || !settings.counts) return defaultValue;
  const value = settings.counts[key];
  return value !== undefined ? value : defaultValue;
};

const safeGetSelect = (settings: BlockSettings | undefined, key: string, defaultValue: string): string => {
  if (!settings || !settings.selects) return defaultValue;
  const value = settings.selects[key];
  return value !== undefined ? value : defaultValue;
};

const safeGetRange = (settings: BlockSettings | undefined, key: string, defaultValue: number): number => {
  if (!settings || !settings.ranges) return defaultValue;
  const value = settings.ranges[key];
  return value !== undefined ? value : defaultValue;
};

const safeGetTextAlign = (settings: BlockSettings | undefined): 'left' | 'center' | 'right' => {
  if (!settings || !settings.textAlign) return 'left';
  return settings.textAlign;
};

const safeGetVisibility = (settings: BlockSettings | undefined, elementId: string, defaultValue: boolean): boolean => {
  if (!settings || !settings.visibility) return defaultValue;
  const value = settings.visibility[elementId];
  return value !== undefined ? value : defaultValue;
};

const getTextAlignClass = (settings: BlockSettings | undefined) => {
  const textAlign = safeGetTextAlign(settings);
  switch (textAlign) {
    case 'center': return 'text-center';
    case 'right': return 'text-right';
    default: return 'text-left';
  }
};

const getAlignmentFlexClass = (settings: BlockSettings | undefined) => {
    const textAlign = safeGetTextAlign(settings);
    switch (textAlign) {
      case 'center': return 'items-center text-center';
      case 'right': return 'items-end text-right';
      default: return 'items-start text-left';
    }
};

const getAlignmentJustifyClass = (settings: BlockSettings | undefined) => {
    const textAlign = safeGetTextAlign(settings);
    switch (textAlign) {
      case 'center': return 'justify-center';
      case 'right': return 'justify-end';
      default: return 'justify-start';
    }
};

const getPaddingClass = (settings: BlockSettings | undefined, defaultPadding: string = 'py-20') => {
  if (!settings || !settings.padding) return defaultPadding;
  switch (settings.padding) {
  case 'none': return 'py-0';
  case 'small': return 'py-8';
  case 'medium': return 'py-16';
  case 'large': return 'py-24';
  case 'xlarge': return 'py-32';
  default: return defaultPadding;
  }
  };

// Divider helper function - renders a configurable divider at the bottom of sections
const getDividerHtml = (settings: BlockSettings | undefined) => {
  if (!settings || !settings.divider || !settings.divider.enabled) return '';
  
  const divider = settings.divider;
  const color = divider.color || 'var(--border)';
  const thickness = divider.thickness || 1;
  const width = divider.width || 100;
  const marginTop = divider.marginTop || 0;
  const marginBottom = divider.marginBottom || 0;
  
  return `
  <div class="w-full flex justify-center" style="margin-top: ${marginTop}px; margin-bottom: ${marginBottom}px;">
    <div style="width: ${width}%; height: ${thickness}px; background-color: ${color};"></div>
  </div>
  `;
};

// Session Detail Modal — injected into agenda blocks, driven by vanilla JS in ResponsiveContainer
const getSessionModalHtml = () => `
  <div class="session-modal-overlay" style="display:none; position:absolute; inset:0; z-index:9999; background:rgba(0,0,0,0.5); backdrop-filter:blur(2px); min-height:100%; overflow:auto; padding:40px 0;">
    <div class="session-modal-container" style="position:relative; margin:0 auto; width:90%; max-width:480px; border-radius:var(--radius, 12px);">
      <div style="background:var(--card); color:var(--card-foreground); border:1px solid var(--border); border-radius:var(--radius, 12px); box-shadow:0 20px 60px rgba(0,0,0,0.3); padding:24px; position:relative;">
        <!-- Close button -->
        <button class="session-modal-close" style="position:absolute; top:12px; right:12px; width:32px; height:32px; border-radius:var(--radius, 6px); border:1px solid var(--border); background:var(--muted); color:var(--muted-foreground); cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background 0.15s;" aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
        </button>

        <!-- Badge -->
        <div class="session-modal-badge" style="display:inline-block; padding:2px 8px; border-radius:var(--radius, 4px); border:1px solid var(--border); font-size:10px; font-family:monospace; text-transform:uppercase; letter-spacing:0.05em; color:var(--muted-foreground); margin-bottom:8px;"></div>

        <!-- Title -->
        <h3 class="session-modal-title" style="font-size:20px; font-weight:700; line-height:1.3; margin:0 0 16px 0; padding-right:32px; color:var(--foreground); font-family:var(--font-sans);"></h3>

        <!-- Time & Location -->
        <div style="display:flex; flex-direction:column; gap:6px; margin-bottom:16px;">
          <div style="display:flex; align-items:center; gap:8px; font-size:14px; color:var(--muted-foreground); font-family:var(--font-sans);">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span class="session-modal-time"></span>
          </div>
          <div style="display:flex; align-items:center; gap:8px; font-size:14px; color:var(--muted-foreground); font-family:var(--font-sans);">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            <span class="session-modal-location"></span>
          </div>
        </div>

        <div style="height:1px; background:var(--border); margin:16px 0;"></div>

        <!-- Description -->
        <p class="session-modal-desc" style="font-size:14px; line-height:1.6; color:var(--foreground); white-space:pre-line; margin:0 0 16px 0; font-family:var(--font-sans);"></p>

        <!-- Speakers -->
        <div class="session-modal-speakers-section" style="display:none;">
          <div style="height:1px; background:var(--border); margin:16px 0;"></div>
          <h4 style="font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.08em; color:var(--muted-foreground); margin:0 0 12px 0; font-family:var(--font-sans);">Speakers</h4>
          <div class="session-modal-speakers" style="display:flex; flex-direction:column; gap:10px;"></div>
        </div>

        <div style="height:1px; background:var(--border); margin:16px 0;"></div>

        <!-- Action Button -->
        <button class="session-modal-action" style="width:100%; padding:12px 24px; border-radius:var(--radius, 8px); background:var(--primary); color:var(--primary-foreground); font-size:14px; font-weight:500; font-family:var(--font-sans); border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; transition:opacity 0.15s;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M10 14h4"/></svg>
          Add to Schedule
        </button>
      </div>
    </div>
  </div>
`;

// Contrast Helpers
const getMutedColor = (variant?: string) => {
  if (!variant || variant === 'default') {
    return 'text-muted-foreground';
  }
  // For colored backgrounds, use opacity of the base text color instead of gray
  return 'opacity-80'; 
};

const getBadgeClasses = (variant?: string) => {
    // High contrast badges based on the block variant
    if (variant === 'primary' || variant === 'secondary') {
        return 'bg-background text-foreground border border-current/20 shadow-sm ring-1 ring-background/10';
    }
    // Default variant - use a semi-transparent primary or a more distinct secondary
    return 'bg-primary/10 text-primary border border-primary/20 shadow-sm';
  };

const getBorderColor = (variant?: string) => {
  if (!variant || variant === 'default') {
    return 'border-border';
  }
  return 'border-current/10';
};

const getVisibility = (settings: BlockSettings | undefined, elementId: string, defaultValue: boolean) => {
    return safeGetVisibility(settings, elementId, defaultValue);
}

export const ICONS = {
    ARROW_RIGHT: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`,
    CHECK: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`,
    MAP_PIN: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    PLAY: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
    CALENDAR: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    USER: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    FILE: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>`,
    DOWNLOAD: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
    STAR: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    CHEVRON_RIGHT: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>`,
    PLUS: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
    MINUS: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
    LAYOUT: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>`
};

const renderSectionHeader = (settings: BlockSettings | undefined, defaultTitle: string, defaultSubtitle?: string) => {
    const showTitle = getVisibility(settings, "showTitle", true);
    const showSubtitle = getVisibility(settings, "showSubtitle", true);
    
    if (!showTitle && !showSubtitle) return '';

    const title = safeGetText(settings, 'title', defaultTitle);
    const subtitle = safeGetText(settings, 'subtitle', defaultSubtitle || '');
    const variant = safeGetTextAlign(settings);

    // Determine margin class based on alignment
    let marginClass = '';
    if (variant === 'center') {
        marginClass = 'mx-auto';
    } else if (variant === 'right') {
        marginClass = 'ml-auto';
    }

    return `
      <div class="mb-12 ${getTextAlignClass(settings)} max-w-3xl ${marginClass}">
        ${showTitle ? `<h2 class="text-3xl font-bold tracking-tight mb-4 font-sans" contenteditable="true" data-key="title">${title}</h2>` : ''}
        ${showSubtitle && subtitle ? `<p class="text-xl font-sans opacity-70 leading-relaxed" contenteditable="true" data-key="subtitle">${subtitle}</p>` : ''}
      </div>
    `;
};

export const BLOCK_REGISTRY: BlockDefinition[] = [
  // --- NAVIGATION ---
  {
    id: "navbar-master",
    name: "Master Navigation",
    category: "Navigation",
    description: "Sticky navbar with brand image/text, responsive menu, and active states.",
    icon: Schematics.Navbar,
    toggleableElements: [
        { id: "sticky", label: "Sticky Positioning", defaultValue: true },
        { id: "showBrandImage", label: "Brand Image", defaultValue: false },
        { id: "showBrandText", label: "Brand Text", defaultValue: true },
        { id: "showLink1", label: "Show Link 1", defaultValue: true },
        { id: "showLink2", label: "Show Link 2", defaultValue: true },
        { id: "showLink3", label: "Show Link 3", defaultValue: false },
        { id: "showLink4", label: "Show Link 4", defaultValue: false },
        { id: "showButtons", label: "Show CTA Button", defaultValue: true }
    ],
    configurableButtons: [
        { id: "link1", label: "Link 1", defaultText: "Home", defaultUrl: "/" },
        { id: "link2", label: "Link 2", defaultText: "Contact", defaultUrl: "/contact" },
        { id: "link3", label: "Link 3", defaultText: "About", defaultUrl: "/about" },
        { id: "link4", label: "Link 4", defaultText: "Services", defaultUrl: "/services" },
        { id: "cta", label: "CTA Button", defaultText: "Get Started", defaultUrl: "#" }
    ],
    configurableImages: [
        { id: "logo", label: "Brand Image", defaultUrl: "" }
    ],
    html: (id, variant, settings) => {
        const isSticky = getVisibility(settings, "sticky", true);
        const showLink1 = getVisibility(settings, "showLink1", true);
        const showLink2 = getVisibility(settings, "showLink2", true);
        const showLink3 = getVisibility(settings, "showLink3", false);
        const showLink4 = getVisibility(settings, "showLink4", false);
        const showCTA = getVisibility(settings, "showButtons", true);
        
        const link1 = safeGetButton(settings, 'link1', { text: "Home", url: "/" });
        const link2 = safeGetButton(settings, 'link2', { text: "Contact", url: "/contact" });
        const link3 = safeGetButton(settings, 'link3', { text: "About", url: "/about" });
        const link4 = safeGetButton(settings, 'link4', { text: "Services", url: "/services" });
        const cta = safeGetButton(settings, 'cta', { text: "Get Started", url: "#" });
        
        const showBrandImage = getVisibility(settings, "showBrandImage", false);
        const showBrandText = getVisibility(settings, "showBrandText", true);
        
        const logoValue = safeGetImage(settings, 'logo', undefined);
        const logoUrl = getImageUrl(logoValue, '');
        const logoStyle = getImageStyleString(logoValue);
        const brandText = safeGetText(settings, 'brandText', "Brand");

        // Build brand markup based on toggles
        const buildBrandHtml = (isMobile = false) => {
            const parts: string[] = [];
            if (showBrandImage && logoUrl) {
                parts.push(`<img src="${logoUrl}" style="${logoStyle}" alt="${brandText}" class="h-8 w-auto object-contain" data-configurable-image="logo" />`);
            }
            if (showBrandText) {
                parts.push(`<span class="${isMobile ? '' : 'hidden sm:inline-block '}font-bold text-xl font-sans tracking-tight">${brandText}</span>`);
            }
            // Fallback: if both are off, show text anyway
            if (parts.length === 0) {
                parts.push(`<span class="${isMobile ? '' : 'hidden sm:inline-block '}font-bold text-xl font-sans tracking-tight">${brandText}</span>`);
            }
            return parts.join('\n');
        };

        // Mock active state (Home is active)
        const getLinkClass = (isLast = false) => `text-sm font-medium transition-colors hover:text-primary ${!isLast ? 'text-foreground/60' : 'text-foreground'}`;
        
        const stickyClass = isSticky ? 'sticky top-0 z-50' : 'relative';
        
        return `
        <header id="${id}" class="${stickyClass} w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div class="container flex h-16 max-w-[var(--max-width)] mx-auto items-center px-4 md:px-[var(--global-padding)]">
                <!-- Brand -->
                <div class="mr-4 hidden md:flex">
                    <a class="mr-6 flex items-center gap-2 nav-link" href="/" data-nav-link="true">
                        ${buildBrandHtml(false)}
                    </a>
                    
                    <!-- Desktop Nav -->
                    <nav class="flex items-center gap-6 text-sm font-medium">
                        ${showLink1 ? `<a class="transition-colors hover:text-foreground text-foreground font-semibold nav-link" href="${link1.url}" data-nav-link="true">${link1.text}</a>` : ''}
                        ${showLink2 ? `<a class="transition-colors hover:text-foreground text-foreground/60 nav-link" href="${link2.url}" data-nav-link="true">${link2.text}</a>` : ''}
                        ${showLink3 ? `<a class="transition-colors hover:text-foreground text-foreground/60 nav-link" href="${link3.url}" data-nav-link="true">${link3.text}</a>` : ''}
                        ${showLink4 ? `<a class="transition-colors hover:text-foreground text-foreground/60 nav-link" href="${link4.url}" data-nav-link="true">${link4.text}</a>` : ''}
                    </nav>
                </div>

                <!-- Mobile Brand (Left Aligned) -->
                 <a class="mr-6 flex items-center gap-2 md:hidden nav-link" href="/" data-nav-link="true">
                    ${buildBrandHtml(true)}
                </a>

                <!-- Right Side -->
                <div class="flex flex-1 items-center justify-end space-x-4">
                    ${showCTA ? `
                    <nav class="flex items-center">
                        <a href="${cta.url}" class="hidden md:inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 nav-link" data-nav-link="true">
                            ${cta.text}
                        </a>
                    </nav>
                    ` : ''}
                    
                    <!-- Mobile Hamburger Toggle (Checkbox Hack) -->
                    <label class="btn btn-circle swap swap-rotate md:hidden p-2 hover:bg-muted rounded-md cursor-pointer group">
                        <!-- this hidden checkbox controls the state -->
                        <input type="checkbox" class="peer hidden" id="mobile-menu-toggle-${id}" />
                        
                        <!-- hamburger icon -->
                        <svg class="fill-current w-6 h-6 block peer-checked:hidden transition-transform" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/></svg>
                        
                        <!-- close icon -->
                        <svg class="fill-current w-6 h-6 hidden peer-checked:block transition-transform" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"/></svg>
                        
                        <!-- Mobile Menu Dropdown -->
                        <div class="fixed inset-x-0 top-16 bottom-0 bg-background/95 backdrop-blur-sm z-50 p-6 hidden peer-checked:block animate-in slide-in-from-top-5 fade-in border-t border-border">
                            <div class="grid gap-6 text-lg font-medium">
                                ${showLink1 ? `<a href="${link1.url}" class="flex items-center gap-2 hover:text-primary transition-colors nav-link" data-nav-link="true">${link1.text}</a>` : ''}
                                ${showLink2 ? `<a href="${link2.url}" class="flex items-center gap-2 hover:text-primary transition-colors text-muted-foreground nav-link" data-nav-link="true">${link2.text}</a>` : ''}
                                ${showLink3 ? `<a href="${link3.url}" class="flex items-center gap-2 hover:text-primary transition-colors text-muted-foreground nav-link" data-nav-link="true">${link3.text}</a>` : ''}
                                ${showLink4 ? `<a href="${link4.url}" class="flex items-center gap-2 hover:text-primary transition-colors text-muted-foreground nav-link" data-nav-link="true">${link4.text}</a>` : ''}
                                ${showCTA ? `
                                <div class="pt-4 mt-4 border-t border-border">
                                    <a href="${cta.url}" class="flex w-full items-center justify-center rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 nav-link" data-nav-link="true">
                                        ${cta.text}
                                    </a>
                                </div>
                                ` : ''}
                            </div>
                        </div>
                    </label>
                </div>
            </div>
        </header>
        `;
    }
  },

  // --- HERO ---
  {
    id: "hero-modern",
    name: "Hero: Modern",
    category: "Hero",
    description: "Large heading with description and action buttons.",
    icon: Schematics.HeroModern,
    toggleableElements: [
        { id: "showBadge", label: "Show Badge", defaultValue: true },
        { id: "showDescription", label: "Show Description", defaultValue: true },
        { id: "showButtons", label: "Show Buttons", defaultValue: true }
    ],
    configurableButtons: [
        { id: "primary", label: "Primary Button", defaultText: "Register Now", defaultUrl: "#" },
        { id: "secondary", label: "Secondary Button", defaultText: "View Agenda", defaultUrl: "#" }
    ],
    html: (id, variant, settings) => {
        const showBadge = getVisibility(settings, "showBadge", true);
        const showDescription = getVisibility(settings, "showDescription", true);
        const showButtons = getVisibility(settings, "showButtons", true);

        const btnPrimary = safeGetButton(settings, 'primary', { text: "Register Now", url: "#" });
        const btnSecondary = safeGetButton(settings, 'secondary', { text: "View Agenda", url: "#" });

        const title = safeGetText(settings, 'title', "Future of Tech");
        const description = safeGetText(settings, 'description', "Join the world's leading minds to shape the future of technology and innovation.");

        return `
      <builder-section id="${id}" class="relative block w-full border-b ${getBorderColor(variant)} overflow-hidden transition-colors duration-300 ${getVariantClasses(variant)} ${getPaddingClass(settings, 'py-6 md:py-10 lg:py-12')}">
        <div class="w-full max-w-[var(--max-width)] mx-auto px-4 md:px-[var(--global-padding)]">
          <div class="w-full mx-auto flex flex-col ${getAlignmentFlexClass(settings)} space-y-3 md:space-y-6 lg:space-y-8">
            ${showBadge ? `<span class="inline-block py-0.5 px-2.5 md:py-1 md:px-4 rounded-full ${getBadgeClasses(variant)} text-mobile-badge md:text-xs font-semibold mb-1 md:mb-4 lg:mb-6 font-sans">Annual Conference 2026</span>` : ''}
            <h1 class="text-mobile-hero md:text-5xl lg:text-6xl font-bold tracking-tight font-sans ${getTextAlignClass(settings)}" contenteditable="true" data-key="title">
              ${title}
            </h1>
            ${showDescription ? `<p class="text-mobile-body md:text-lg lg:text-xl max-w-2xl font-sans ${getMutedColor(variant)} ${getTextAlignClass(settings)}" contenteditable="true" data-key="description">
              ${description}
            </p>` : ''}
            ${showButtons ? `<div class="flex flex-col sm:flex-row gap-2.5 md:gap-4 ${getAlignmentJustifyClass(settings)} pt-1 md:pt-4">
              <a href="${btnPrimary.url}" class="px-5 py-2 md:px-8 md:py-3 text-mobile-button md:text-base ${variant === 'primary' ? 'bg-background text-foreground' : 'bg-primary text-primary-foreground'} font-medium rounded-md hover:opacity-90 transition-colors shadow-sm font-sans inline-block text-center no-underline">${btnPrimary.text}</a>
              <a href="${btnSecondary.url}" class="px-5 py-2 md:px-8 md:py-3 text-mobile-button md:text-base border ${getBorderColor(variant)} font-medium rounded-md hover:bg-muted/10 transition-colors shadow-sm font-sans inline-block text-center no-underline hover:text-current">${btnSecondary.text}</a>
            </div>` : ''}
          </div>
        </div>
        ${getDividerHtml(settings)}
      </builder-section>
    `
    }
  },
  {
    id: "hero-split",
    name: "Hero: Split",
    category: "Hero",
    description: "Two column layout with image and text.",
    icon: Schematics.HeroSplit,
    toggleableElements: [
        { id: "showBadge", label: "Show Badge", defaultValue: true },
        { id: "showImage", label: "Show Image", defaultValue: true },
        { id: "showLocation", label: "Show Location", defaultValue: true }
    ],
    configurableButtons: [
        { id: "primary", label: "Primary Button", defaultText: "Get Tickets", defaultUrl: "#" },
        { id: "secondary", label: "Secondary Button", defaultText: "Learn More", defaultUrl: "#" }
    ],
configurableImages: [
    { id: "hero", label: "Hero Image", defaultUrl: DEFAULT_IMAGES.hero, defaultFit: 'cover', defaultPosition: 'center', linkable: true }
  ],
  configurableIcons: [
    { id: "calendar", label: "Date Icon", defaultIcon: "CALENDAR" },
    { id: "location", label: "Location Icon", defaultIcon: "MAP_PIN" }
  ],
  html: (id, variant, settings) => {
    const showBadge = getVisibility(settings, "showBadge", true);
    const showImage = getVisibility(settings, "showImage", true);
    const showLocation = getVisibility(settings, "showLocation", true);

        const btnPrimary = safeGetButton(settings, 'primary', { text: "Get Tickets", url: "#" });
        const btnSecondary = safeGetButton(settings, 'secondary', { text: "Learn More", url: "#" });
      
const imgHeroValue = safeGetImage(settings, 'hero', PLACEHOLDER_IMG);
    const imgHeroUrl = getImageUrl(imgHeroValue, PLACEHOLDER_IMG);
    const imgHeroStyle = getImageStyleString(imgHeroValue);
    const imgHeroLink = getImageLinkUrl(imgHeroValue);
    
    const iconCalendar = safeGetIcon(settings, 'calendar', ICONS.CALENDAR);
    const iconLocation = safeGetIcon(settings, 'location', ICONS.MAP_PIN);

        const title = safeGetText(settings, 'title', "Design Systems <br/> Summit");
        const description = safeGetText(settings, 'description', "Scale your design workflow with the latest tools and methodologies. Connect with 5,000+ designers globally.");

        return `
      <builder-section id="${id}" class="relative block w-full bg-background overflow-hidden ${getVariantClasses(variant)} ${getPaddingClass(settings, 'py-0')}">
        <div class="w-full max-w-[var(--max-width)] mx-auto px-4 md:px-[var(--global-padding)]">
          <div class="flex flex-col md:flex-row w-full h-auto min-h-0">
            <div class="flex-1 flex flex-col justify-center py-6 md:py-12 lg:py-20 space-y-3 md:space-y-6 lg:space-y-8 order-2 md:order-1 ${getAlignmentFlexClass(settings)} md:pr-[var(--global-padding)]">
              <div class="space-y-2.5 md:space-y-4 w-full flex flex-col ${getAlignmentFlexClass(settings)}">
                ${showBadge ? `<span class="inline-block py-0.5 px-2.5 md:py-1 md:px-4 rounded-full ${getBadgeClasses(variant)} text-mobile-badge md:text-xs font-semibold">Oct 15-17, 2026</span>` : ''}
                <h1 class="text-mobile-hero-split md:text-4xl lg:text-5xl font-bold tracking-tight font-sans ${getTextAlignClass(settings)}" contenteditable="true" data-key="title">
                  ${title}
                </h1>
                <p class="text-mobile-body md:text-base lg:text-lg font-sans ${getMutedColor(variant)} ${getTextAlignClass(settings)}" contenteditable="true" data-key="description">
                  ${description}
                </p>
              </div>
              <div class="flex flex-wrap gap-2.5 md:gap-4 pt-1 md:pt-4 ${getAlignmentJustifyClass(settings)} w-full">
                <a href="${btnPrimary.url}" class="px-5 py-2 md:px-8 md:py-3 text-mobile-button md:text-base bg-foreground text-background font-medium rounded-md hover:opacity-90 transition-colors shadow-sm inline-block text-center no-underline">${btnPrimary.text}</a>
                <a href="${btnSecondary.url}" class="px-5 py-2 md:px-8 md:py-3 text-mobile-button md:text-base border ${getBorderColor(variant)} font-medium rounded-md hover:bg-muted/10 transition-colors shadow-sm inline-block text-center no-underline hover:text-current font-sans">${btnSecondary.text}</a>
              </div>
              ${showLocation ? `<div class="flex flex-wrap gap-3 md:gap-8 text-mobile-caption md:text-sm pt-3 md:pt-8 border-t ${getBorderColor(variant)} mt-3 md:mt-8 ${getMutedColor(variant)} ${getAlignmentJustifyClass(settings)} w-full">
                <div class="flex items-center gap-2 font-sans">
                  ${iconCalendar} San Francisco, CA
                </div>
                <div class="flex items-center gap-2 font-sans">
                  ${iconLocation} Moscone Center
                </div>
              </div>` : ''}
            </div>
${showImage ? `<div class="flex-1 bg-muted relative order-1 md:order-2 self-stretch min-h-[280px] md:min-h-[450px] lg:min-h-[500px]">
    ${imgHeroLink ? `<a href="${imgHeroLink}" class="absolute inset-0 block">` : ''}
    <img src="${imgHeroUrl}" style="${imgHeroStyle}" class="absolute inset-0 w-full h-full cursor-pointer" alt="Hero" data-configurable-image="hero" />
    ${imgHeroLink ? `</a>` : ''}
    </div>` : ''}
          </div>
        </div>
        ${getDividerHtml(settings)}
      </builder-section>
    `
    }
  },
  {
    id: "hero-video",
    name: "Hero: Video BG",
    category: "Hero",
    description: "Immersive background with play button.",
    icon: Schematics.HeroVideo,
    configurableImages: [
        { id: "bg", label: "Background Image", defaultUrl: DEFAULT_IMAGES.conference, defaultFit: 'cover', defaultPosition: 'center' }
    ],
    configurableIcons: [
        { id: "play", label: "Play Icon", defaultIcon: "PLAY" }
    ],
    html: (id, variant, settings) => {
        const imgBgValue = safeGetImage(settings, 'bg', PLACEHOLDER_IMG);
        const imgBgUrl = getImageUrl(imgBgValue, PLACEHOLDER_IMG);
        const imgBgStyle = getImageStyleString(imgBgValue);
        const iconPlay = safeGetIcon(settings, 'play', ICONS.PLAY);

        return `
      <builder-section id="${id}" class="relative block w-full min-h-[400px] md:min-h-[550px] lg:min-h-[600px] h-auto flex items-end overflow-hidden ${getVariantClasses(variant)} ${getPaddingClass(settings, 'pb-8 md:pb-16 lg:pb-20')}">
        <div class="absolute inset-0 z-0">
           <img src="${imgBgUrl}" style="${imgBgStyle}" class="w-full h-full" data-configurable-image="bg" />
           <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        </div>
        <div class="w-full max-w-[var(--max-width)] mx-auto px-4 md:px-[var(--global-padding)] relative z-10 text-white ${getAlignmentFlexClass(settings)}">
           <div class="flex items-center gap-2.5 md:gap-4 mb-3 md:mb-6 lg:mb-8">
              <button class="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors border-none text-white">
                 ${iconPlay}
              </button>
              <span class="text-mobile-tiny md:text-sm font-bold tracking-widest uppercase font-sans">Watch Showreel</span>
           </div>
           <h1 class="text-mobile-hero-video md:text-6xl lg:text-7xl font-bold mb-3 md:mb-6 lg:mb-8 font-sans ${getTextAlignClass(settings)}">Unleash Your <br/> Potential</h1>
           <div class="flex flex-wrap gap-2 md:gap-6 lg:gap-8 text-mobile-caption md:text-base lg:text-lg font-medium opacity-90 font-sans ${getAlignmentJustifyClass(settings)}">
               <span>Nov 12-14, 2026</span>
               <span>•</span>
               <span>London, UK</span>
               <span>•</span>
               <span>ExCel Center</span>
           </div>
        </div>
        ${getDividerHtml(settings)}
      </builder-section>
    `
    }
  },

  // --- AGENDA ---
  {
    id: "agenda-clean",
    name: "Agenda: Schedule List",
    category: "Agenda",
    description: "Dense, scannable schedule with times, titles, badges, and speaker avatars.",
    icon: Schematics.Agenda,
    configurableIcons: [],
    configurableCounts: [
        { id: 'days', label: 'Days Displayed', min: 1, max: 7, defaultValue: 3 }
    ],
    toggleableElements: [
        { id: 'showTitle', label: 'Show Title', defaultValue: true },
        { id: 'showSubtitle', label: 'Show Subtitle', defaultValue: true },
        { id: 'showSessionType', label: 'Session Type Badge', defaultValue: true }
    ],
    html: (id, variant, settings) => {
        const numDays = safeGetCount(settings, 'days', 3);
        const showSessionType = safeGetVisibility(settings, 'showSessionType', true);
        
        // Always render a full realistic schedule per day (no artificial session limit)
        const sessionsPerDay = [
            // Day 0
            ['Registration & Breakfast', 'Opening Keynote', 'React Server Components Workshop', 'Design Systems Panel', 'Networking Lunch', 'AI in Production', 'Performance Deep-Dive', 'Lightning Talks', 'Closing Remarks'],
            // Day 1
            ['Morning Yoga & Coffee', 'State of Web Standards', 'Advanced TypeScript Patterns', 'Accessibility Masterclass', 'Networking Lunch', 'DevOps & CI/CD', 'Open Source Roundtable', 'Fireside Chat: Future of AI', 'Evening Social'],
            // Day 2
            ['Breakfast & Networking', 'Edge Computing Keynote', 'Building Design Tokens', 'API Design Best Practices', 'Networking Lunch', 'Mobile-First Strategies', 'Security in Modern Apps', 'Hackathon Showcase', 'Closing Ceremony'],
            // Day 3
            ['Welcome & Recap', 'Data Engineering at Scale', 'GraphQL vs REST', 'UX Research Methods', 'Working Lunch', 'Micro-Frontends', 'Testing Strategies', 'Community Lightning Talks', 'Awards & Wrap-up'],
            // Day 4
            ['Sunrise Networking', 'Platform Engineering', 'CSS Architecture', 'Inclusive Design Workshop', 'Networking Lunch', 'Serverless Patterns', 'Team Topologies', 'Ask Me Anything', 'Farewell Dinner'],
            // Day 5
            ['Early Coffee Chat', 'WebAssembly Deep Dive', 'Component Libraries', 'Content Strategy', 'Networking Lunch', 'Observability & Monitoring', 'Career Growth Panel', 'Demo Day'],
            // Day 6
            ['Final Day Kickoff', 'Emerging Tech Keynote', 'Workshop: Building CLIs', 'Networking Lunch', 'Retrospective & Planning', 'Community Showcase', 'Closing Keynote']
        ];
        const getSessionsForDay = (dayIndex: number) => sessionsPerDay[dayIndex % sessionsPerDay.length].length;
        
        const dayNames = ['Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
        const dayAbbr = ['Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu'];
        const dates = ['Dec 15', 'Dec 16', 'Dec 17', 'Dec 18', 'Dec 19', 'Dec 20', 'Dec 21'];
        
        // Helper: derive initials from a full name
        const getInitials = (fullName: string): string => {
            const trimmed = fullName.trim();
            if (!trimmed) return '?';
            const parts = trimmed.split(/\s+/);
            if (parts.length >= 2) {
                return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
            }
            return parts[0][0].toUpperCase();
        };

        // Default speaker names pool (used when no custom name is set)
        const defaultSpeakerNames = ['Anna Martin', 'Sarah Kim', 'Dan Rodriguez', 'Michael Kranitz', 'Lisa Park', 'Tom Chen', 'Nina Volkov', 'Robb Hartzog', 'Elena Wu', 'James Bell', 'Quinn Foster', 'Zara Ahmed', 'Uma Mehta', 'Grace Okafor'];

        const maxVisibleAvatars = 3;

        // Render a single session row: Time | Title + subtitle + badge | Avatars
        const renderSession = (dayIndex: number, sessionIndex: number) => {
            const hour = 8 + sessionIndex;
            const startTime = hour < 12 ? `${String(hour).padStart(2, '0')}:00 AM` : `${String(hour === 12 ? 12 : hour - 12).padStart(2, '0')}:00 PM`;
            const endHour = hour + 1;
            const endTime = endHour < 12 ? `${String(endHour).padStart(2, '0')}:00 AM` : `${String(endHour === 12 ? 12 : endHour - 12).padStart(2, '0')}:00 PM`;
            const sessionKey = `session-d${dayIndex}-s${sessionIndex}`;
            const descKey = `desc-d${dayIndex}-s${sessionIndex}`;
            const daySessions = sessionsPerDay[dayIndex % sessionsPerDay.length];
            const defaultTitle = daySessions[sessionIndex % daySessions.length] || `Session ${sessionIndex + 1}`;
            const sessionTitle = safeGetText(settings, sessionKey, defaultTitle);
            const sessionDesc = safeGetText(settings, descKey, `Join us for an engaging discussion on the latest trends and innovations.`);
            const dayLabel = `${dayNames[dayIndex % dayNames.length]}, ${dates[dayIndex % dates.length]}`;
            const locations = ['Main Hall', 'Auditorium A', 'Room 204', 'Room 305', 'Auditorium B', 'Workshop Lab'];
            const location = locations[(dayIndex * 3 + sessionIndex) % locations.length];
            const types = ['Workshop', 'Keynote', 'Panel', 'Networking', 'Talk', 'Fireside Chat'];
            const defaultType = types[(dayIndex + sessionIndex) % types.length];
            const typeKey = `type-d${dayIndex}-s${sessionIndex}`;
            const sessionType = safeGetText(settings, typeKey, defaultType);

            // Speaker count per session — configurable, defaults to a deterministic 2-4
            const speakerCountKey = `speakers-d${dayIndex}-s${sessionIndex}`;
            const defaultSpeakerCount = 2 + ((dayIndex * 5 + sessionIndex * 3) % 3);
            const totalPeople = safeGetCount(settings, speakerCountKey, defaultSpeakerCount);

            // Build speaker names list from settings
            const allSpeakerNames: string[] = [];
            for (let k = 0; k < totalPeople; k++) {
                const nameKey = `speaker-d${dayIndex}-s${sessionIndex}-${k}`;
                const defaultName = defaultSpeakerNames[(dayIndex * 7 + sessionIndex * 3 + k) % defaultSpeakerNames.length];
                allSpeakerNames.push(safeGetText(settings, nameKey, defaultName));
            }

            const visible = Math.min(totalPeople, maxVisibleAvatars);
            const overflow = totalPeople - maxVisibleAvatars;

            // Build initials for data attribute (for modal)
            const allSpeakerInitials = allSpeakerNames.map(n => getInitials(n));

            const avatarCircles = allSpeakerNames.slice(0, visible).map(name => {
                const initials = getInitials(name);
                return `<div style="width:24px; height:24px; border-radius:50%; border:2px solid var(--background); background:var(--muted); display:flex; align-items:center; justify-content:center; flex-shrink:0;" title="${name.replace(/"/g, '&quot;')}"><span style="font-size:9px; font-weight:600; color:var(--muted-foreground); line-height:1; user-select:none; font-family:var(--font-sans);">${initials}</span></div>`;
            }).join('');

            const overflowCircle = overflow > 0
                ? `<div style="width:24px; height:24px; border-radius:50%; border:2px solid var(--background); background:var(--muted); display:flex; align-items:center; justify-content:center; flex-shrink:0;" title="${overflow} more"><span style="font-size:8px; font-weight:600; color:var(--muted-foreground); line-height:1; user-select:none; font-family:var(--font-sans);">+${overflow}</span></div>`
                : '';

            // Badge color per type
            const badgeColors = {
                'Workshop': 'background:color-mix(in srgb, var(--primary) 12%, transparent); color:var(--primary); border:1px solid color-mix(in srgb, var(--primary) 25%, transparent);',
                'Keynote': 'background:color-mix(in srgb, var(--foreground) 8%, transparent); color:var(--foreground); border:1px solid var(--border);',
                'Panel': 'background:color-mix(in srgb, var(--primary) 8%, transparent); color:var(--primary); border:1px solid color-mix(in srgb, var(--primary) 20%, transparent);',
                'Networking': 'background:color-mix(in srgb, var(--muted-foreground) 10%, transparent); color:var(--muted-foreground); border:1px solid var(--border);',
                'Talk': 'background:color-mix(in srgb, var(--primary) 10%, transparent); color:var(--primary); border:1px solid color-mix(in srgb, var(--primary) 20%, transparent);',
                'Fireside Chat': 'background:color-mix(in srgb, var(--foreground) 6%, transparent); color:var(--foreground); border:1px solid var(--border);'
            };
            const badgeStyle = badgeColors[sessionType] || badgeColors['Talk'];

            const badgeHtml = showSessionType && sessionType
                ? `<span style="display:inline-flex; align-items:center; padding:1px 7px; border-radius:var(--radius, 4px); font-size:10px; font-weight:600; font-family:var(--font-sans); letter-spacing:0.03em; text-transform:uppercase; white-space:nowrap; line-height:1.6; ${badgeStyle}">${sessionType}</span>`
                : '';

            return `
                <div class="session-item group"
                     style="display:flex; align-items:center; gap:0; padding:0; border-bottom:1px solid var(--border); cursor:pointer; transition:background 0.15s;"
                     data-day="${dayIndex}"
                     data-session-click="true"
                     data-session-title="${sessionTitle.replace(/"/g, '&quot;')}"
                     data-session-time="${startTime} \u2013 ${endTime}"
                     data-session-day="${dayLabel}"
                     data-session-location="${location}"
                     data-session-type="${sessionType}"
                     data-session-desc="${sessionDesc.replace(/"/g, '&quot;')}"
                     data-session-speakers="${allSpeakerNames.map(n => n.replace(/"/g, '&quot;')).join(',')}"
                     role="button" tabindex="0"
                     onmouseover="this.style.background='var(--muted)'"
                     onmouseout="this.style.background='transparent'"
                >
                    <!-- Left: Time column -->
                    <div style="flex-shrink:0; width:120px; padding:10px 16px 10px 0; display:flex; flex-direction:column; align-items:flex-start; gap:1px;">
                        <span style="font-size:13px; font-weight:600; font-family:var(--font-mono, monospace); color:var(--foreground); line-height:1.3; white-space:nowrap;">${startTime}</span>
                        <span style="font-size:11px; font-family:var(--font-mono, monospace); color:var(--muted-foreground); line-height:1.3; white-space:nowrap;">${endTime}</span>
                    </div>

                    <!-- Middle: Title + description + badge -->
                    <div style="flex:1; min-width:0; padding:10px 12px; display:flex; flex-direction:column; gap:2px;">
                        <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                            <h4 style="font-size:14px; font-weight:600; color:var(--foreground); font-family:var(--font-sans); line-height:1.3; margin:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:100%;" contenteditable="true" data-key="${sessionKey}">
                                ${sessionTitle}
                            </h4>
                            ${badgeHtml}
                        </div>
                        <p style="font-size:12px; color:var(--muted-foreground); font-family:var(--font-sans); line-height:1.4; margin:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" contenteditable="true" data-key="${descKey}">
                            ${sessionDesc}
                        </p>
                    </div>

                    <!-- Right: Avatar cluster -->
                    <div style="flex-shrink:0; display:flex; align-items:center; padding:10px 0 10px 8px; margin-left:auto;" role="group" aria-label="Speakers and sponsors">
                        <div style="display:flex; align-items:center;">
                            ${avatarCircles}${overflowCircle}
                        </div>
                    </div>
                </div>
            `;
        };
        
        // Render sessions for a single day
        const renderDayContent = (dayIndex: number) => {
            const sessionsForThisDay = getSessionsForDay(dayIndex);
            const sessions = Array.from({length: sessionsForThisDay}, (_, i) => renderSession(dayIndex, i)).join('');
            return `
                <div class="sessions-list" style="border-top:1px solid var(--border);">
                    ${sessions}
                </div>
            `;
        };
        
        // Horizontal day tabs — larger, more prominent, with strong active state
        const dayFull = ['Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
        const tabNavigation = Array.from({length: numDays}, (_, i) => {
            const dayLabel = dayFull[i % dayFull.length];
            const dayShort = dayAbbr[i % dayAbbr.length];
            const date = dates[i % dates.length];
            const isActive = i === 0;
            const activeStyle = isActive
                ? 'background:var(--primary); color:var(--primary-foreground); border-bottom:4px solid var(--primary); font-weight:800; box-shadow:0 2px 8px color-mix(in srgb, var(--primary) 30%, transparent);'
                : 'background:none; color:var(--muted-foreground); border-bottom:4px solid transparent;';
            return `
                <button 
                    type="button"
                    class="tab-btn"
                    style="flex:1; text-align:center; padding:16px 24px; cursor:pointer; transition:all 0.2s; font-family:var(--font-sans); border:none; border-radius:var(--radius, 8px) var(--radius, 8px) 0 0; margin-bottom:-1px; ${activeStyle}"
                    data-tab-index="${i}"
                    data-day-index="${i}"
                >
                    <span style="font-weight:inherit; font-size:17px; display:block;" class="tab-day-full">${dayLabel}</span>
                    <span style="font-weight:inherit; font-size:17px; display:none;" class="tab-day-short">${dayShort}</span>
                    <span style="font-size:12px; display:block; margin-top:3px; opacity:${isActive ? '0.85' : '0.5'};">${date}</span>
                </button>
            `;
        }).join('');
        
        const tabPanels = Array.from({length: numDays}, (_, i) => `
            <div class="tab-panel" data-day="${i}" style="display: ${i === 0 ? 'block' : 'none'};">
                ${renderDayContent(i)}
            </div>
        `).join('');

        return `
        <builder-section id="${id}" class="relative block w-full transition-colors duration-300 ${getVariantClasses(variant)} ${getPaddingClass(settings, 'py-16')}" data-active-day="0">
            <div class="w-full max-w-[var(--max-width)] mx-auto px-[var(--global-padding)]">
                ${renderSectionHeader(settings, "Event Schedule", "Browse sessions by day.")}
                
                <!-- Search & Filters Bar -->
                <div style="margin-bottom:16px; display:flex; flex-wrap:wrap; align-items:center; gap:10px;">
                    <div style="position:relative; min-width:200px; flex:1; max-width:320px;">
                        <input 
                            type="text" 
                            placeholder="Search sessions..."
                            style="width:100%; padding:8px 36px 8px 12px; background:var(--background); border:1px solid var(--border); border-radius:var(--radius, 6px); color:var(--foreground); font-family:var(--font-sans); font-size:13px; outline:none; transition:all 0.15s;"
                            data-search-input="true"
                        />
                        <svg style="position:absolute; right:10px; top:50%; transform:translateY(-50%); width:16px; height:16px; color:var(--muted-foreground); pointer-events:none;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                        </svg>
                    </div>
                    <!-- Filters Toggle Button -->
                    <button type="button" data-filters-toggle="true" style="display:inline-flex; align-items:center; gap:6px; padding:8px 14px; border:1px solid var(--border); border-radius:var(--radius, 6px); background:var(--background); color:var(--foreground); font-family:var(--font-sans); font-size:13px; font-weight:500; cursor:pointer; transition:all 0.15s; white-space:nowrap;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                        Filters
                        <span data-filter-count="true" style="display:none; min-width:18px; height:18px; border-radius:9px; background:var(--primary); color:var(--primary-foreground); font-size:10px; font-weight:700; line-height:18px; text-align:center; padding:0 5px;">0</span>
                    </button>
                    <!-- Clear Filters -->
                    <button type="button" data-filters-clear="true" style="display:none; align-items:center; gap:4px; padding:8px 12px; border:none; border-radius:var(--radius, 6px); background:var(--muted); color:var(--muted-foreground); font-family:var(--font-sans); font-size:12px; font-weight:500; cursor:pointer; transition:all 0.15s; white-space:nowrap;">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
                        Clear filters
                    </button>
                </div>
                <!-- Filters Panel (hidden by default) -->
                <div data-filters-panel="true" style="display:none; margin-bottom:16px; padding:14px 16px; border:1px solid var(--border); border-radius:var(--radius, 8px); background:color-mix(in srgb, var(--muted) 50%, transparent);">
                    <!-- Session Type Filters -->
                    <div style="margin-bottom:12px;">
                        <span style="font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; color:var(--muted-foreground); font-family:var(--font-sans); display:block; margin-bottom:8px;">Session Type</span>
                        <div style="display:flex; flex-wrap:wrap; gap:6px;" data-type-filters="true">
                            ${['Workshop','Keynote','Panel','Networking','Talk','Fireside Chat'].map(t => `<button type="button" data-type-filter="${t}" style="display:inline-flex; align-items:center; padding:4px 10px; border-radius:var(--radius, 12px); border:1px solid var(--border); background:var(--background); color:var(--muted-foreground); font-size:12px; font-weight:500; font-family:var(--font-sans); cursor:pointer; transition:all 0.15s; white-space:nowrap;">${t}</button>`).join('')}
                        </div>
                    </div>
                    <!-- Time Range Filters -->
                    <div>
                        <span style="font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; color:var(--muted-foreground); font-family:var(--font-sans); display:block; margin-bottom:8px;">Time of Day</span>
                        <div style="display:flex; flex-wrap:wrap; gap:6px;" data-time-filters="true">
                            <button type="button" data-time-filter="morning" style="display:inline-flex; align-items:center; padding:4px 10px; border-radius:var(--radius, 12px); border:1px solid var(--border); background:var(--background); color:var(--muted-foreground); font-size:12px; font-weight:500; font-family:var(--font-sans); cursor:pointer; transition:all 0.15s; white-space:nowrap;">Morning</button>
                            <button type="button" data-time-filter="afternoon" style="display:inline-flex; align-items:center; padding:4px 10px; border-radius:var(--radius, 12px); border:1px solid var(--border); background:var(--background); color:var(--muted-foreground); font-size:12px; font-weight:500; font-family:var(--font-sans); cursor:pointer; transition:all 0.15s; white-space:nowrap;">Afternoon</button>
                            <button type="button" data-time-filter="evening" style="display:inline-flex; align-items:center; padding:4px 10px; border-radius:var(--radius, 12px); border:1px solid var(--border); background:var(--background); color:var(--muted-foreground); font-size:12px; font-weight:500; font-family:var(--font-sans); cursor:pointer; transition:all 0.15s; white-space:nowrap;">Evening</button>
                        </div>
                    </div>
                </div>
                
                <!-- Horizontal Day Navigation -->
                <nav aria-label="Event days" style="display:flex; gap:4px; margin-bottom:0; background:var(--muted); border-radius:var(--radius, 8px) var(--radius, 8px) 0 0; padding:4px 4px 0;">
                    ${tabNavigation}
                </nav>
                <style>
                    @media (max-width: 640px) {
                        .tab-day-full { display: none !important; }
                        .tab-day-short { display: block !important; }
                        .tab-btn { padding: 14px 8px !important; }
                    }
                </style>
                
                <!-- Session Lists by Day — scrollable after max-height -->
                <div class="tab-content" style="max-height:600px; overflow-y:auto;">
                    ${tabPanels}
                </div>
            </div>
            ${getSessionModalHtml()}
            ${getDividerHtml(settings)}
        </builder-section>
        `;
    }
  },
  {
    id: "agenda-timeline",
    name: "Agenda: Timeline",
    category: "Agenda",
    description: "Vertical timeline with connecting lines.",
    icon: Schematics.Agenda,
    hidden: true,
    configurableIcons: [
        { id: "location", label: "Location Icon", defaultIcon: "MAP_PIN" }
    ],
    configurableCounts: [
        { id: 'count', label: 'Number of Items', min: 1, max: 12, defaultValue: 4 }
    ],
    toggleableElements: [
        { id: 'showTitle', label: 'Show Title', defaultValue: true },
        { id: 'showSubtitle', label: 'Show Subtitle', defaultValue: true }
    ],
    html: (id, variant, settings) => {
        const iconLocation = safeGetIcon(settings, 'location', ICONS.MAP_PIN);
        const count = safeGetCount(settings, 'count', 4);
        
        return `
      <builder-section id="${id}" class="relative block w-full transition-colors duration-300 ${getVariantClasses(variant)} ${getPaddingClass(settings, 'py-20')}">
          <div class="w-full max-w-[var(--max-width)] mx-auto px-[var(--global-padding)]">
             ${renderSectionHeader(settings, "Timeline", "Follow the flow of events.")}
             
             <div class="relative space-y-12">
                <!-- Vertical Line -->
                <div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-px border-l-2 ${getBorderColor(variant)} transform md:-translate-x-1/2"></div>
                
                ${Array.from({length: count}, (_, i) => i + 1).map(i => `
                  <div class="relative pl-12 md:pl-0 flex flex-col md:flex-row md:items-start md:justify-between group">
                     
                     <!-- Dot -->
                     <div class="absolute left-[11px] md:left-1/2 top-1.5 md:top-8 w-3 h-3 rounded-full bg-primary ring-4 ring-background transform md:-translate-x-1/2 z-10"></div>
                     
                     <!-- Time (Mobile: Top, Desktop: Left) -->
                     <div class="md:w-1/2 md:pr-12 md:text-right mb-2 md:mb-0 pt-0.5 md:pt-6">
                        <span class="text-sm font-bold font-sans ${getMutedColor(variant)} block">0${8+i}:00 AM</span>
                     </div>
                     
                     <!-- Card (Mobile: Bottom, Desktop: Right) -->
                     <div class="md:w-1/2 md:pl-12">
                        <div class="bg-card text-card-foreground p-6 rounded-lg border ${getBorderColor(variant)} shadow-sm hover:shadow-md transition-shadow relative ${getTextAlignClass(settings)}">
                           <div class="flex items-center gap-2 mb-3 ${getAlignmentJustifyClass(settings)}">
                              <span class="inline-block px-2 py-0.5 rounded ${getBadgeClasses(variant)} text-xs font-semibold font-sans">Workshop</span>
                           </div>
                           <h3 class="text-xl font-bold font-sans mb-2" contenteditable="true">Interactive Design Session ${i}</h3>
                           <div class="flex items-center gap-2 text-sm text-muted-foreground font-sans ${getAlignmentJustifyClass(settings)}">
                              ${iconLocation} Room 20${i}
                           </div>
                        </div>
                     </div>
                  </div>
               `).join('')}
            </div>
         </div>
         ${getDividerHtml(settings)}
      </builder-section>
    `
    }
  },
  {
    id: "agenda-grid",
    name: "Agenda: Grid",
    category: "Agenda",
    description: "Grid layout for sessions with day tabs.",
    icon: Schematics.AgendaGrid,
    configurableCounts: [
        { id: 'days', label: 'Days Displayed', min: 1, max: 7, defaultValue: 3 }
    ],
    configurableSelects: [
        {
            id: 'columns',
            label: 'Cards per Row',
            defaultValue: '3',
            options: [
                { label: '1 per row', value: '1' },
                { label: '2 per row', value: '2' },
                { label: '3 per row', value: '3' },
                { label: '4 per row', value: '4' }
            ]
        }
    ],
    toggleableElements: [
        { id: 'showTitle', label: 'Show Title', defaultValue: true },
        { id: 'showSubtitle', label: 'Show Subtitle', defaultValue: true }
    ],
    html: (id, variant, settings) => {
        const numDays = safeGetCount(settings, 'days', 3);
        const columns = parseInt(safeGetSelect(settings, 'columns', '3'));
        
        let gridClass = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
        if (columns === 1) {
            gridClass = 'grid-cols-1';
        } else if (columns === 2) {
            gridClass = 'grid-cols-1 md:grid-cols-2';
        } else if (columns === 3) {
            gridClass = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
        } else if (columns === 4) {
            gridClass = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
        }

        // Realistic session data per day — all sessions always rendered
        const gridSessionsPerDay = [
            ['Registration & Breakfast', 'Opening Keynote', 'React Server Components', 'Design Systems Panel', 'Networking Lunch', 'AI in Production', 'Performance Workshop', 'Lightning Talks', 'Closing Remarks'],
            ['Morning Coffee', 'Web Standards Keynote', 'TypeScript Patterns', 'Accessibility Masterclass', 'Networking Lunch', 'DevOps Deep-Dive', 'Open Source Roundtable', 'Fireside Chat', 'Evening Social'],
            ['Breakfast', 'Edge Computing Keynote', 'Design Tokens Workshop', 'API Design', 'Networking Lunch', 'Mobile Strategies', 'Security Panel', 'Hackathon Showcase', 'Closing Ceremony'],
            ['Welcome & Recap', 'Data Engineering', 'GraphQL Workshop', 'UX Research Methods', 'Working Lunch', 'Micro-Frontends', 'Testing Strategies', 'Community Talks', 'Awards Ceremony'],
            ['Sunrise Networking', 'Platform Engineering', 'CSS Architecture', 'Inclusive Design', 'Networking Lunch', 'Serverless Patterns', 'Team Topologies', 'AMA Session', 'Farewell Dinner'],
            ['Early Coffee', 'WebAssembly Talk', 'Component Libraries', 'Content Strategy', 'Networking Lunch', 'Observability', 'Career Growth Panel', 'Demo Day'],
            ['Final Day Kickoff', 'Emerging Tech', 'CLI Workshop', 'Networking Lunch', 'Retrospective', 'Community Showcase', 'Closing Keynote']
        ];
        const types = ['Workshop', 'Keynote', 'Panel', 'Networking', 'Talk', 'Fireside Chat'];
        const locations = ['Main Hall', 'Auditorium A', 'Room 204', 'Room 305', 'Auditorium B', 'Workshop Lab'];
        const speakers = ['Anna Martin','Sarah Kim','Dan Rodriguez','Michael Kranitz','Lisa Park','Tom Chen','Nina Volkov','James Bell'];

        const dayNames = ['Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
        const dayAbbr = ['Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu'];
        const dates = ['Dec 15', 'Dec 16', 'Dec 17', 'Dec 18', 'Dec 19', 'Dec 20', 'Dec 21'];

        const renderGridDay = (dayIndex: number) => {
            const daySessions = gridSessionsPerDay[dayIndex % gridSessionsPerDay.length];
            return daySessions.map((title, i) => {
                const hour = 8 + i;
                const timeStr = hour < 12 ? `${String(hour).padStart(2, '0')}:00 AM` : `${String(hour === 12 ? 12 : hour - 12).padStart(2, '0')}:00 PM`;
                const type = types[(dayIndex + i) % types.length];
                const location = locations[(dayIndex * 3 + i) % locations.length];
                const speaker = speakers[(dayIndex * 2 + i) % speakers.length];
                return `
                    <div class="session-item group p-6 rounded-xl border border-border bg-card text-card-foreground hover:border-primary/50 hover:shadow-md transition-all cursor-pointer shadow-sm ${getTextAlignClass(settings)}"
                         data-session-click="true"
                         data-session-title="${title}"
                         data-session-time="${timeStr}"
                         data-session-day="${dayNames[dayIndex % dayNames.length]}, ${dates[dayIndex % dates.length]}"
                         data-session-location="${location}"
                         data-session-type="${type}"
                         data-session-desc="Join us for an in-depth session covering the latest developments, practical strategies, and hands-on techniques you can apply immediately."
                         data-session-speakers="${speaker},${speakers[(dayIndex * 2 + i + 1) % speakers.length]}"
                         role="button" tabindex="0"
                    >
                       <div class="flex justify-between items-start mb-4">
                          <span class="inline-block px-2 py-1 rounded bg-secondary text-xs font-mono">${timeStr}</span>
                          <div class="text-muted-foreground group-hover:text-primary transition-colors">${ICONS.CHEVRON_RIGHT}</div>
                       </div>
                       <h3 class="font-bold text-lg mb-2 group-hover:text-primary transition-colors font-sans">${title}</h3>
                       <p class="text-sm text-muted-foreground mb-4 line-clamp-2 font-sans">An engaging session led by ${speaker} at ${location}.</p>
                       <div class="h-px bg-border w-full my-3"></div>
                       <div class="flex justify-between items-center text-xs text-muted-foreground font-sans">
                          <span class="flex items-center gap-1">${ICONS.USER} ${speaker}</span>
                          <span class="flex items-center gap-1">${ICONS.MAP_PIN} ${location}</span>
                       </div>
                    </div>
                `;
            }).join('');
        };

        // Day tab navigation — identical styling to list view
        const tabNavigation = Array.from({length: numDays}, (_, i) => {
            const dayLabel = dayNames[i % dayNames.length];
            const dayShort = dayAbbr[i % dayAbbr.length];
            const date = dates[i % dates.length];
            const isActive = i === 0;
            const activeStyle = isActive
                ? 'background:var(--primary); color:var(--primary-foreground); border-bottom:4px solid var(--primary); font-weight:800; box-shadow:0 2px 8px color-mix(in srgb, var(--primary) 30%, transparent);'
                : 'background:none; color:var(--muted-foreground); border-bottom:4px solid transparent;';
            return `
                <button type="button" class="tab-btn"
                    style="flex:1; text-align:center; padding:16px 24px; cursor:pointer; transition:all 0.2s; font-family:var(--font-sans); border:none; border-radius:var(--radius, 8px) var(--radius, 8px) 0 0; margin-bottom:-1px; ${activeStyle}"
                    data-tab-index="${i}" data-day-index="${i}">
                    <span style="font-weight:inherit; font-size:17px; display:block;" class="tab-day-full">${dayLabel}</span>
                    <span style="font-weight:inherit; font-size:17px; display:none;" class="tab-day-short">${dayShort}</span>
                    <span style="font-size:12px; display:block; margin-top:3px; opacity:${isActive ? '0.85' : '0.5'};">${date}</span>
                </button>
            `;
        }).join('');

        const tabPanels = Array.from({length: numDays}, (_, i) => `
            <div class="tab-panel" data-day="${i}" style="display:${i === 0 ? 'block' : 'none'}; padding:24px 16px;">
                <div class="grid ${gridClass} gap-6">
                    ${renderGridDay(i)}
                </div>
            </div>
        `).join('');
        
        return `
      <builder-section id="${id}" class="relative block w-full transition-colors duration-300 ${getVariantClasses(variant)} ${getPaddingClass(settings, 'py-20')}" data-active-day="0">
         <div class="w-full max-w-[var(--max-width)] mx-auto px-[var(--global-padding)]">
            ${renderSectionHeader(settings, "Sessions", "Explore the tracks.")}
            
            <!-- Search & Filters Bar -->
            <div style="margin-bottom:16px; display:flex; flex-wrap:wrap; align-items:center; gap:10px;">
                <div style="position:relative; min-width:200px; flex:1; max-width:320px;">
                    <input 
                        type="text" 
                        placeholder="Search sessions..."
                        style="width:100%; padding:8px 36px 8px 12px; background:var(--background); border:1px solid var(--border); border-radius:var(--radius, 6px); color:var(--foreground); font-family:var(--font-sans); font-size:13px; outline:none; transition:all 0.15s;"
                        data-search-input="true"
                    />
                    <svg style="position:absolute; right:10px; top:50%; transform:translateY(-50%); width:16px; height:16px; color:var(--muted-foreground); pointer-events:none;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                </div>
                <!-- Filters Toggle Button -->
                <button type="button" data-filters-toggle="true" style="display:inline-flex; align-items:center; gap:6px; padding:8px 14px; border:1px solid var(--border); border-radius:var(--radius, 6px); background:var(--background); color:var(--foreground); font-family:var(--font-sans); font-size:13px; font-weight:500; cursor:pointer; transition:all 0.15s; white-space:nowrap;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                    Filters
                    <span data-filter-count="true" style="display:none; min-width:18px; height:18px; border-radius:9px; background:var(--primary); color:var(--primary-foreground); font-size:10px; font-weight:700; line-height:18px; text-align:center; padding:0 5px;">0</span>
                </button>
                <!-- Clear Filters -->
                <button type="button" data-filters-clear="true" style="display:none; align-items:center; gap:4px; padding:8px 12px; border:none; border-radius:var(--radius, 6px); background:var(--muted); color:var(--muted-foreground); font-family:var(--font-sans); font-size:12px; font-weight:500; cursor:pointer; transition:all 0.15s; white-space:nowrap;">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
                    Clear filters
                </button>
            </div>
            <!-- Filters Panel (hidden by default) -->
            <div data-filters-panel="true" style="display:none; margin-bottom:16px; padding:14px 16px; border:1px solid var(--border); border-radius:var(--radius, 8px); background:color-mix(in srgb, var(--muted) 50%, transparent);">
                <!-- Session Type Filters -->
                <div style="margin-bottom:12px;">
                    <span style="font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; color:var(--muted-foreground); font-family:var(--font-sans); display:block; margin-bottom:8px;">Session Type</span>
                    <div style="display:flex; flex-wrap:wrap; gap:6px;" data-type-filters="true">
                        ${['Workshop','Keynote','Panel','Networking','Talk','Fireside Chat'].map(t => `<button type="button" data-type-filter="${t}" style="display:inline-flex; align-items:center; padding:4px 10px; border-radius:var(--radius, 12px); border:1px solid var(--border); background:var(--background); color:var(--muted-foreground); font-size:12px; font-weight:500; font-family:var(--font-sans); cursor:pointer; transition:all 0.15s; white-space:nowrap;">${t}</button>`).join('')}
                    </div>
                </div>
                <!-- Time Range Filters -->
                <div>
                    <span style="font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; color:var(--muted-foreground); font-family:var(--font-sans); display:block; margin-bottom:8px;">Time of Day</span>
                    <div style="display:flex; flex-wrap:wrap; gap:6px;" data-time-filters="true">
                        <button type="button" data-time-filter="morning" style="display:inline-flex; align-items:center; padding:4px 10px; border-radius:var(--radius, 12px); border:1px solid var(--border); background:var(--background); color:var(--muted-foreground); font-size:12px; font-weight:500; font-family:var(--font-sans); cursor:pointer; transition:all 0.15s; white-space:nowrap;">Morning</button>
                        <button type="button" data-time-filter="afternoon" style="display:inline-flex; align-items:center; padding:4px 10px; border-radius:var(--radius, 12px); border:1px solid var(--border); background:var(--background); color:var(--muted-foreground); font-size:12px; font-weight:500; font-family:var(--font-sans); cursor:pointer; transition:all 0.15s; white-space:nowrap;">Afternoon</button>
                        <button type="button" data-time-filter="evening" style="display:inline-flex; align-items:center; padding:4px 10px; border-radius:var(--radius, 12px); border:1px solid var(--border); background:var(--background); color:var(--muted-foreground); font-size:12px; font-weight:500; font-family:var(--font-sans); cursor:pointer; transition:all 0.15s; white-space:nowrap;">Evening</button>
                    </div>
                </div>
            </div>

            <!-- Day Navigation -->
            <nav aria-label="Event days" style="display:flex; gap:4px; margin-bottom:0; background:var(--muted); border-radius:var(--radius, 8px) var(--radius, 8px) 0 0; padding:4px 4px 0;">
                ${tabNavigation}
            </nav>
            <style>
                @media (max-width: 640px) {
                    .tab-day-full { display: none !important; }
                    .tab-day-short { display: block !important; }
                    .tab-btn { padding: 14px 8px !important; }
                }
            </style>
            
            <!-- Grid content — scrollable after max-height -->
            <div class="tab-content" style="max-height:650px; overflow-y:auto;">
                ${tabPanels}
            </div>
         </div>
         ${getSessionModalHtml()}
         ${getDividerHtml(settings)}
      </builder-section>
    `
    }
  },
  {
    id: "agenda-brutalist",
    name: "Agenda: Brutalist",
    category: "Agenda",
    description: "Bold split layout.",
    icon: Schematics.Agenda,
    hidden: true,
    configurableCounts: [
        { id: 'count', label: 'Number of Items', min: 1, max: 12, defaultValue: 3 }
    ],
    toggleableElements: [
        { id: 'showTitle', label: 'Show Title', defaultValue: true },
        { id: 'showSubtitle', label: 'Show Subtitle', defaultValue: true }
    ],
    html: (id, variant, settings) => {
        const count = safeGetCount(settings, 'count', 3);
        
        return `
      <builder-section id="${id}" class="relative block w-full ${getVariantClasses(variant)} ${getPaddingClass(settings, 'py-16')}">
        <div class="w-full max-w-[var(--max-width)] mx-auto px-[var(--global-padding)]">
             ${renderSectionHeader(settings, "Day 01 / Schedule", "The main events.")}
             <div class="space-y-0">
                ${Array.from({length: count}, (_, i) => i + 1).map(i => `
                    <div class="group grid grid-cols-1 lg:grid-cols-[200px_1fr] border-b ${getBorderColor(variant)} last:border-0 hover:bg-muted/30 transition-colors">
                        <div class="p-6 border-b lg:border-b-0 lg:border-r ${getBorderColor(variant)} flex items-center">
                            <span class="font-serif text-3xl font-bold group-hover:text-primary transition-colors">
                                0${8+i}:00
                            </span>
                        </div>
                        <div class="p-6 flex flex-col justify-center space-y-4">
                            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <h3 class="text-2xl font-bold tracking-tight font-sans">Session Title ${i}</h3>
                                <span class="inline-block px-3 py-1 border-2 border-current font-mono uppercase text-xs font-bold">Keynote</span>
                            </div>
                            <div class="h-px bg-border w-full"></div>
                            <div class="flex items-center gap-4 text-sm font-mono ${getMutedColor(variant)}">
                                <span>Main Hall</span>
                                <span>•</span>
                                <span class="uppercase">Speaker Name</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
             </div>
        </div>
        ${getDividerHtml(settings)}
      </builder-section>
    `
    }
  },

  // --- SPEAKERS ---
  {
    id: "speakers-grid",
    name: "Speakers: Grid",
    category: "Speakers",
    description: "Grid layout with image overlays.",
    icon: Schematics.SpeakersGrid,
    configurableCounts: [
        { id: 'count', label: 'Total Number of Speakers', min: 1, max: 24, defaultValue: 6 }
    ],
    configurableSelects: [
        {
            id: 'columns',
            label: 'Speakers per Row',
            defaultValue: '3',
            options: [
                { label: '2 per row', value: '2' },
                { label: '3 per row', value: '3' },
                { label: '4 per row', value: '4' },
                { label: '5 per row', value: '5' },
                { label: '6 per row', value: '6' },
                { label: '7 per row', value: '7' },
                { label: '8 per row', value: '8' }
            ]
        }
    ],
    toggleableElements: [
        { id: 'showTitle', label: 'Show Title', defaultValue: true },
        { id: 'showSubtitle', label: 'Show Subtitle', defaultValue: true },
        { id: 'abbreviatedView', label: 'Abbreviated View', defaultValue: false }
    ],
    configurableButtons: [
        { id: 'viewAll', label: 'View All Button', defaultText: 'View All Speakers', defaultUrl: '/speakers' }
    ],
    html: (id, variant, settings) => {
        const count = safeGetCount(settings, 'count', 6);
        const columns = parseInt(safeGetSelect(settings, 'columns', '3'));
        const isAbbreviated = getVisibility(settings, 'abbreviatedView', false);
        const viewAllBtn = safeGetButton(settings, 'viewAll', { text: 'View All Speakers', url: '/speakers' });
        
        // Adjust grid classes - responsive breakpoints ensure cards scale properly
        // Also apply max-width constraints to prevent oversized cards
        let gridClass = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
        let gapClass = 'gap-6'; // Default gap
        let containerClass = 'justify-items-center'; // Center items when they have max-width
        
        if (columns === 2) {
            gridClass = 'grid-cols-1 md:grid-cols-2';
        } else if (columns === 3) {
            gridClass = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
        } else if (columns === 4) {
            gridClass = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
            gapClass = 'gap-5';
        } else if (columns === 5) {
            gridClass = 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5';
            gapClass = 'gap-4';
        } else if (columns === 6) {
            gridClass = 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6';
            gapClass = 'gap-4';
        } else if (columns === 7) {
            gridClass = 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7';
            gapClass = 'gap-3';
        } else if (columns === 8) {
            gridClass = 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8';
            gapClass = 'gap-3';
        }

        let itemsToRender = (settings && settings.cmsItems && settings.cmsItems.length > 0) ? settings.cmsItems : Array.from({length: count}, (_, i) => i + 1).map(i => ({
            name: `Speaker Name ${i}`,
            role: `VP of Design, Company ${i}`,
            image: "https://images.unsplash.com/photo-1762968269894-1d7e1ce8894e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
        }));

        if (isAbbreviated) {
            itemsToRender = itemsToRender.slice(0, columns); // Show one row
        }
        
        return `
      <builder-section id="${id}" class="relative block w-full transition-colors duration-300 ${getVariantClasses(variant)} ${getPaddingClass(settings, 'py-12')}">
        <div class="w-full max-w-[var(--max-width)] mx-auto px-[var(--global-padding)]">
          ${renderSectionHeader(settings, "Featured Speakers", "Meet the experts.")}
          <div class="grid ${gridClass} ${gapClass}">
            ${itemsToRender.map((item: any, i: number) => {
                const img = item.image;
                const name = item.name || `Speaker ${i+1}`;
                const role = item.role || `VP of Design, Company ${i+1}`;
                
                return `
              <div class="group relative overflow-hidden rounded-xl aspect-square bg-muted">
                 <img src="${img}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0" />
                 <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
                 <div class="absolute bottom-0 left-0 p-6 text-white w-full ${getTextAlignClass(settings)}">
                    <h3 class="text-lg font-bold font-sans">${name}</h3>
                    <p class="text-xs opacity-80 font-sans">${role}</p>
                 </div>
              </div>
            `}).join('')}
          </div>
          ${isAbbreviated ? `
            <div class="flex justify-center mt-10">
                <a href="${viewAllBtn.url}" class="px-6 py-2 border ${getBorderColor(variant)} rounded-md hover:bg-muted/10 transition-colors font-medium text-sm inline-flex items-center gap-2 no-underline text-current font-sans">
                    ${viewAllBtn.text} ${ICONS.ARROW_RIGHT}
                </a>
            </div>
          ` : ''}
        </div>
        ${getDividerHtml(settings)}
      </builder-section>
    `
    }
  },
  {
    id: "speakers-list",
    name: "Speakers: List",
    category: "Speakers",
    description: "List layout with avatars.",
    icon: Schematics.SpeakersList,
    configurableCounts: [
        { id: 'count', label: 'Number of Speakers', min: 1, max: 12, defaultValue: 4 }
    ],
    configurableSelects: [
        {
            id: 'columns',
            label: 'Cards per Row',
            defaultValue: '2',
            options: [
                { label: '1 per row', value: '1' },
                { label: '2 per row', value: '2' },
                { label: '3 per row', value: '3' }
            ]
        }
    ],
    toggleableElements: [
        { id: 'showTitle', label: 'Show Title', defaultValue: true },
        { id: 'showSubtitle', label: 'Show Subtitle', defaultValue: true }
    ],
    html: (id, variant, settings) => {
        const count = safeGetCount(settings, 'count', 4);
        const columns = parseInt(safeGetSelect(settings, 'columns', '2'));
        
        let gridClass = 'grid-cols-1 lg:grid-cols-2';
        if (columns === 1) {
            gridClass = 'grid-cols-1';
        } else if (columns === 2) {
            gridClass = 'grid-cols-1 lg:grid-cols-2';
        } else if (columns === 3) {
            gridClass = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
        }
        
        return `
      <builder-section id="${id}" class="relative block w-full bg-muted/20 ${getVariantClasses(variant)} ${getPaddingClass(settings, 'py-12')}">
        <div class="w-full max-w-[var(--max-width)] mx-auto px-[var(--global-padding)]">
          ${renderSectionHeader(settings, "Speakers", "Industry leaders sharing their knowledge.")}
          <div class="grid ${gridClass} gap-4">
             ${Array.from({length: count}, (_, i) => i + 1).map(i => `
               <div class="flex items-center gap-4 p-4 rounded-lg bg-card text-card-foreground shadow-sm hover:shadow-md transition-all">
                  <div class="h-16 w-16 rounded-full overflow-hidden bg-muted">
                     <img src="${DEFAULT_IMAGES.speaker}" class="w-full h-full object-cover" />
                  </div>
                  <div class="flex-1">
                     <h3 class="font-bold text-lg font-sans">Speaker Name</h3>
                     <p class="text-sm text-muted-foreground font-sans">Role @ Company</p>
                  </div>
               </div>
             `).join('')}
          </div>
        </div>
        ${getDividerHtml(settings)}
      </builder-section>
    `
    }
  },

  // --- SPONSORS ---
  {
    id: "sponsors-grid-responsive",
    name: "Sponsors: Responsive Grid",
    category: "Sponsors",
    description: "Grid with count control.",
    icon: Schematics.SponsorsGrid,
    configurableCounts: [
        { id: 'count', label: 'Number of Sponsors', min: 1, max: 12, defaultValue: 6 }
    ],
    toggleableElements: [
        { id: 'showTitle', label: 'Show Title', defaultValue: true },
        { id: 'showSubtitle', label: 'Show Subtitle', defaultValue: true }
    ],
    html: (id, variant, settings) => {
        const count = safeGetCount(settings, 'count', 6);
        
        return `
      <builder-section id="${id}" class="relative block w-full border-y border-border/10 ${getVariantClasses(variant)} ${getPaddingClass(settings, 'py-24')}">
         <div class="w-full max-w-[var(--max-width)] mx-auto px-[var(--global-padding)] flex flex-col ${getAlignmentFlexClass(settings)}">
            ${renderSectionHeader(settings, "Our Partners", "We really appreciate our sponsors! Supported by the best in the industry.")}
            <div class="flex flex-wrap gap-8 md:gap-12 ${getAlignmentJustifyClass(settings)}">
               ${Array.from({length: count}, (_, i) => i + 1).map(i => `
                  <div class="w-32 h-20 md:w-48 md:h-24 bg-muted/30 rounded-lg flex items-center justify-center p-4 grayscale hover:grayscale-0 hover:bg-muted transition-all duration-300 cursor-pointer">
                      <span class="font-bold text-xl opacity-70">SPONSOR ${i}</span>
                  </div>
               `).join('')}
            </div>
         </div>
         ${getDividerHtml(settings)}
      </builder-section>
    `
    }
  },
  {
    id: "sponsors-tiered",
    name: "Sponsors: Tiered",
    category: "Sponsors",
    description: "Platinum, Gold, and Silver tiers.",
    icon: Schematics.SponsorsGrid,
    hidden: true,
    toggleableElements: [
        { id: 'showTitle', label: 'Show Title', defaultValue: true },
        { id: 'showSubtitle', label: 'Show Subtitle', defaultValue: true }
    ],
    html: (id, variant, settings) => `
      <builder-section id="${id}" class="relative block w-full transition-colors duration-300 ${getVariantClasses(variant)} ${getPaddingClass(settings, 'py-20')}">
         <div class="w-full max-w-[var(--max-width)] mx-auto px-[var(--global-padding)] text-center space-y-16">
            ${renderSectionHeader(settings, "Sponsors", "Making this event possible.")}
            <div class="space-y-8">
               <span class="inline-block py-1 px-4 rounded-full border border-primary/50 text-primary bg-primary/5 text-sm font-semibold font-sans">Platinum Partner</span>
               <div class="flex justify-center">
                  <div class="w-64 h-32 bg-card text-card-foreground border-2 border-primary/20 rounded-2xl flex items-center justify-center shadow-xl shadow-primary/5 hover:scale-105 transition-transform">
                     <span class="text-3xl font-black font-sans">BIG CORP</span>
                  </div>
               </div>
            </div>
            <div class="space-y-6">
               <h3 class="text-lg font-semibold uppercase tracking-widest font-sans ${getMutedColor(variant)}">Gold Partners</h3>
               <div class="flex flex-wrap justify-center gap-8">
                  ${[1, 2, 3].map(i => `
                     <div class="w-48 h-24 bg-muted/20 border border-border rounded-xl flex items-center justify-center p-6 hover:bg-card hover:text-card-foreground hover:shadow-md transition-all">
                        <span class="font-bold text-lg font-sans">Partner ${i}</span>
                     </div>
                  `).join('')}
               </div>
            </div>
         </div>
         ${getDividerHtml(settings)}
      </builder-section>
    `
  },
  {
    id: "sponsors-marquee",
    name: "Sponsors: Marquee",
    category: "Sponsors",
    description: "Infinite scrolling marquee.",
    icon: Schematics.SponsorsMarquee,
    toggleableElements: [
        { id: 'showTitle', label: 'Show Title', defaultValue: true },
        { id: 'showSubtitle', label: 'Show Subtitle', defaultValue: false }
    ],
    html: (id, variant, settings) => `
      <builder-section id="${id}" class="relative block w-full border-y ${getBorderColor(variant)} overflow-hidden bg-muted/10 ${getVariantClasses(variant)} ${getPaddingClass(settings, 'py-16')}">
         <div class="w-full max-w-[var(--max-width)] mx-auto px-[var(--global-padding)] mb-10 text-center">
             ${renderSectionHeader(settings, "Trusted Partners")}
         </div>
         <div class="relative flex overflow-hidden group max-w-[var(--max-width)] mx-auto px-[var(--global-padding)]">
             <div class="flex gap-12 animate-marquee whitespace-nowrap py-4">
                 ${[1, 2, 3, 4, 5, 6, 1, 2, 3].map(i => `
                    <div class="flex items-center gap-3 min-w-[200px] opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                        <span class="font-bold text-xl font-sans">SPONSOR ${i}</span>
                    </div>
                 `).join('')}
             </div>
             <div class="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-${variant === 'primary' ? 'primary' : variant === 'secondary' ? 'secondary' : 'background'} to-transparent z-10"></div>
             <div class="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-${variant === 'primary' ? 'primary' : variant === 'secondary' ? 'secondary' : 'background'} to-transparent z-10"></div>
         </div>
         <style>
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
         </style>
         ${getDividerHtml(settings)}
      </builder-section>
    `
  },

  // --- COUNTDOWN ---
  {
    id: "countdown-simple",
    name: "Countdown: Simple",
    category: "Countdown",
    description: "Minimalist countdown timer.",
    icon: Schematics.CountdownSimple,
    toggleableElements: [
        { id: 'showTitle', label: 'Show Title', defaultValue: true },
        { id: 'showSubtitle', label: 'Show Subtitle', defaultValue: false }
    ],
    configurableColors: [
        { id: "numberBg", label: "Number Background", defaultValue: "transparent" },
        { id: "numberColor", label: "Number Color", defaultValue: "currentColor" }
    ],
    html: (id, variant, settings) => {
        const numberBg = (settings && settings.colors && settings.colors['numberBg']) || 'transparent';
        const numberColor = (settings && settings.colors && settings.colors['numberColor']) || 'currentColor';

        return `
      <builder-section id="${id}" class="relative block w-full ${getVariantClasses(variant)} ${getPaddingClass(settings, 'py-20')}">
         <div class="w-full max-w-[var(--max-width)] mx-auto px-[var(--global-padding)] flex flex-col ${getAlignmentFlexClass(settings)}">
            ${renderSectionHeader(settings, "Event Starts In")}
            <div class="flex flex-wrap ${getAlignmentJustifyClass(settings)} gap-8 lg:gap-16">
               ${[
                 { val: "14", label: "Days" },
                 { val: "08", label: "Hours" },
                 { val: "45", label: "Minutes" },
                 { val: "12", label: "Seconds" }
               ].map(item => `
                 <div class="flex flex-col items-center">
                    <span class="text-6xl md:text-8xl font-black tabular-nums tracking-tighter font-sans px-4 py-2 rounded-lg transition-colors" style="background-color: ${numberBg}; color: ${numberColor === 'currentColor' ? 'inherit' : numberColor}">${item.val}</span>
                    <span class="text-sm font-mono opacity-60 mt-2 uppercase">${item.label}</span>
                 </div>
               `).join('')}
            </div>
         </div>
         ${getDividerHtml(settings)}
      </builder-section>
    `
    }
  },
  {
    id: "countdown-banner",
    name: "Countdown: Banner",
    category: "Countdown",
    description: "Slim banner countdown.",
    icon: Schematics.CountdownBanner,
    html: (id, variant, settings) => `
      <builder-section id="${id}" class="relative block w-full bg-primary text-primary-foreground ${getVariantClasses(variant)} ${getPaddingClass(settings, 'py-4')}">
          <div class="w-full max-w-[var(--max-width)] mx-auto px-[var(--global-padding)] flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8 text-sm lg:text-base font-medium font-sans">
              <span class="opacity-90">Registration closes in:</span>
              <div class="flex items-center gap-4 font-mono font-bold">
                  <span>14d</span>
                  <span>08h</span>
                  <span>45m</span>
                  <span>12s</span>
              </div>
              <a href="#" class="underline opacity-80 hover:opacity-100">Register Now</a>
          </div>
          ${getDividerHtml(settings)}
      </builder-section>
    `
  },

  // --- LOCATION ---
  {
    id: "location-info",
    name: "Location: Info",
    category: "Location",
    description: "Map placeholder with venue details.",
    icon: Schematics.LocationInfo,
    toggleableElements: [
        { id: 'showTitle', label: 'Show Title', defaultValue: true },
        { id: 'showSubtitle', label: 'Show Subtitle', defaultValue: false }
    ],
    configurableImages: [
        { id: "map", label: "Map/Location Image", defaultUrl: DEFAULT_IMAGES.location, defaultFit: 'cover', defaultPosition: 'center' }
    ],
    html: (id, variant, settings) => {
        const mapValue = safeGetImage(settings, 'map', DEFAULT_IMAGES.location);
        const mapUrl = getImageUrl(mapValue, DEFAULT_IMAGES.location);
        const mapStyle = getImageStyleString(mapValue);
        
        return `
      <builder-section id="${id}" class="relative block w-full bg-background ${getVariantClasses(variant)} ${getPaddingClass(settings, 'py-0')}">
         <div class="w-full max-w-[var(--max-width)] mx-auto px-[var(--global-padding)]">
         <div class="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
            <div class="bg-muted relative flex items-center justify-center overflow-hidden h-[200px] lg:h-auto w-full aspect-video lg:aspect-auto">
                <img src="${mapUrl}" style="${mapStyle}" class="absolute inset-0 w-full h-full grayscale opacity-50" data-configurable-image="map" />
                <div class="relative z-10 p-4 bg-background rounded-full shadow-xl animate-bounce text-primary">
                   ${ICONS.MAP_PIN}
                </div>
            </div>
            <div class="p-6 md:p-12 flex flex-col justify-center bg-card text-card-foreground">
               ${renderSectionHeader(settings, "The Venue")}
               <div class="space-y-6">
                  <div>
                     <h3 class="font-bold text-xl mb-1 font-sans">Moscone Center</h3>
                     <p class="text-muted-foreground leading-relaxed font-sans">747 Howard St<br/>San Francisco, CA 94103</p>
                  </div>
                  <div class="space-y-3 text-sm font-medium">
                     <div class="flex items-center gap-3 font-sans"><span class="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">📞</span> +1 (555) 123-4567</div>
                     <div class="flex items-center gap-3 font-sans"><span class="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">✉️</span> events@example.com</div>
                  </div>
                  <button class="w-fit px-6 py-2 bg-background border border-border rounded-md font-medium hover:bg-muted transition-colors font-sans flex items-center gap-2">
                     Get Directions
                  </button>
               </div>
            </div>
         </div>
         </div>
         ${getDividerHtml(settings)}
      </builder-section>
    `;
    }
  },
  {
    id: "location-card",
    name: "Location: Card Overlay",
    category: "Location",
    description: "Map background with floating info card.",
    icon: Schematics.LocationCardOverlay,
    toggleableElements: [
        { id: 'showTitle', label: 'Show Title', defaultValue: true },
        { id: 'showSubtitle', label: 'Show Subtitle', defaultValue: true }
    ],
    html: (id, variant, settings) => `
      <builder-section id="${id}" class="relative block w-full h-[600px] bg-muted ${getVariantClasses(variant)} ${getPaddingClass(settings, 'py-0')}">
         <img src="${DEFAULT_IMAGES.location}" class="absolute inset-0 w-full h-full object-cover" />
         <div class="relative w-full h-full max-w-[var(--max-width)] mx-auto px-[var(--global-padding)] pointer-events-none">
             <div class="absolute top-1/2 left-[var(--global-padding)] -translate-y-1/2 w-[350px] pointer-events-auto">
                 <div class="bg-card text-card-foreground p-8 rounded-lg shadow-2xl border-none">
                     <span class="inline-block px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded mb-4 font-sans">Venue</span>
                     ${renderSectionHeader(settings, "Grand Hyatt", "Experience luxury in the heart of the city.")}
                     <div class="pt-4 border-t border-border">
                         <p class="font-medium font-sans">1000 Blvd of the Arts</p>
                         <p class="text-sm text-muted-foreground font-sans">Sarasota, FL 34236</p>
                     </div>
                     <button class="w-full mt-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 font-sans">View on Google Maps</button>
                 </div>
             </div>
         </div>
         ${getDividerHtml(settings)}
      </builder-section>
    `
  },

  // --- DOCS ---
  {
    id: "docs-grid",
    name: "Docs: Downloads",
    category: "Resources",
    description: "Grid of downloadable resources.",
    icon: Schematics.DocsDownloads,
    configurableSelects: [
        {
            id: 'columns',
            label: 'Cards per Row',
            defaultValue: '4',
            options: [
                { label: '2 per row', value: '2' },
                { label: '3 per row', value: '3' },
                { label: '4 per row', value: '4' }
            ]
        }
    ],
    toggleableElements: [
        { id: 'showTitle', label: 'Show Title', defaultValue: true },
        { id: 'showSubtitle', label: 'Show Subtitle', defaultValue: true }
    ],
    html: (id, variant, settings) => {
        const columns = parseInt(safeGetSelect(settings, 'columns', '4'));
        
        let gridClass = 'grid-cols-1 md:grid-cols-4';
        if (columns === 2) {
            gridClass = 'grid-cols-1 md:grid-cols-2';
        } else if (columns === 3) {
            gridClass = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
        } else if (columns === 4) {
            gridClass = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
        }
        
        return `
      <builder-section id="${id}" class="relative block w-full bg-muted/10 ${getVariantClasses(variant)} ${getPaddingClass(settings, 'py-16')}">
         <div class="w-full max-w-[var(--max-width)] mx-auto px-[var(--global-padding)]">
            ${renderSectionHeader(settings, "Downloads", "Access important documents.")}
            <div class="grid ${gridClass} gap-6">
               ${[
                 { name: "Conference Brochure", size: "2.4 MB", type: "PDF" },
                 { name: "Sponsorship Deck", size: "5.1 MB", type: "PDF" },
                 { name: "Attendee Guidelines", size: "1.2 MB", type: "DOCX" },
                 { name: "Code of Conduct", size: "0.5 MB", type: "PDF" },
               ].map(doc => `
                 <div class="p-6 rounded-xl bg-card text-card-foreground border-none shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col ${getAlignmentFlexClass(settings)} gap-4">
                    <div class="h-16 w-16 bg-muted rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                       ${ICONS.FILE}
                    </div>
                    <div>
                       <h3 class="font-medium text-sm font-sans">${doc.name}</h3>
                       <p class="text-xs text-muted-foreground mt-1 font-sans">${doc.type} • ${doc.size}</p>
                    </div>
                 </div>
               `).join('')}
            </div>
         </div>
         ${getDividerHtml(settings)}
      </builder-section>
    `
    }
  },
  {
    id: "docs-list",
    name: "Docs: List",
    category: "Resources",
    description: "Simple list of resources.",
    icon: Schematics.DocsList,
    toggleableElements: [
        { id: 'showTitle', label: 'Show Title', defaultValue: true },
        { id: 'showSubtitle', label: 'Show Subtitle', defaultValue: false }
    ],
    html: (id, variant, settings) => `
      <builder-section id="${id}" class="relative block w-full ${getVariantClasses(variant)} ${getPaddingClass(settings, 'py-12')}">
         <div class="w-full max-w-[var(--max-width)] mx-auto px-[var(--global-padding)]">
             <div class="flex items-center justify-between mb-8">
                ${renderSectionHeader(settings, "Resources")}
                <button class="text-sm font-medium hover:underline font-sans">View All</button>
             </div>
             <div class="space-y-2">
                ${[1, 2, 3, 4].map(i => `
                   <div class="flex items-center justify-between p-4 rounded-lg bg-card text-card-foreground hover:bg-muted/50 transition-colors shadow-sm">
                      <div class="flex items-center gap-4">
                          ${ICONS.FILE}
                          <span class="font-medium font-sans">Document Name ${i}</span>
                      </div>
                      <div class="flex items-center gap-4">
                          <span class="text-xs text-muted-foreground hidden sm:block font-sans">2.4 MB</span>
                          <button class="p-2 hover:bg-background rounded-full transition-colors">${ICONS.DOWNLOAD}</button>
                      </div>
                   </div>
                `).join('')}
             </div>
         </div>
         ${getDividerHtml(settings)}
      </builder-section>
    `
  }
];
