import React, { useState, useEffect } from "react";
import { Check, Code, Copy, Moon, Sun, Monitor, Smartphone, Tablet, Info, RotateCcw, Paintbrush, Type, Scaling, Palette, MoveHorizontal, Maximize, Terminal, FileCode, Package, LayoutTemplate, ArrowRight, Download, Clipboard } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "../ui/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Slider } from "../ui/slider";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { SmartTooltip } from "../ui/smart-tooltip";
import { useTheme } from "./ThemeProvider";
import { HeroVariant2 } from "../blocks/HeroBlocks";

import { CodeHighlighter } from "../ui/code-highlighter";

// --- Helpers ---

const copyToClipboard = async (text: string): Promise<boolean> => {
    // Always use execCommand fallback since Clipboard API is blocked in iframe
    try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        textarea.style.top = '0';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textarea);
        if (successful) return true;
    } catch (err) { 
        console.error('Failed to copy:', err);
    }
    return false;
};

const hexToRgb = (hex: string) => {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    const num = parseInt(hex, 16);
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
};

const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

const adjustColor = (hex: string, amount: number) => {
    let usePound = false;
    if (hex[0] === "#") {
        hex = hex.slice(1);
        usePound = true;
    }
    const num = parseInt(hex, 16);
    let r = (num >> 16) + amount;
    if (r > 255) r = 255; else if (r < 0) r = 0;
    
    let b = ((num >> 8) & 0x00FF) + amount;
    if (b > 255) b = 255; else if (b < 0) b = 0;
    
    let g = (num & 0x0000FF) + amount;
    if (g > 255) g = 255; else if (g < 0) g = 0;
    
    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16).padStart(6, '0');
};

const mixColor = (color1: string, color2: string, weight: number) => {
    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);
    const r = Math.round(c1.r * (1 - weight) + c2.r * weight);
    const g = Math.round(c1.g * (1 - weight) + c2.g * weight);
    const b = Math.round(c1.b * (1 - weight) + c2.b * weight);
    return rgbToHex(r, g, b);
};

const getContrastColor = (hex: string) => {
    // 1. Remove hash and whitespace
    let cleanHex = hex.replace('#', '').trim();

    // 2. Expand shorthand (e.g. "f00" -> "ff0000")
    if (cleanHex.length === 3) {
        cleanHex = cleanHex.split('').map(char => char + char).join('');
    }

    // Safety check for invalid length
    if (cleanHex.length !== 6) return '#09090b';

    // 3. Extract RGB
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);

    // 4. Calculate YIQ
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

    // 5. Return contrast color (Standard threshold 128)
    return (yiq >= 128) ? '#09090b' : '#ffffff';
};

// --- Constants & Types ---

type ThemeMode = 'light' | 'dark';

interface NeutralPalette {
    background: string;
    foreground: string;
    muted: string;
    mutedForeground: string;
    border: string;
    card: string;
    popover: string;
    popoverForeground: string;
}

interface ThemeBackgroundOption {
    name: string;
    light: NeutralPalette;
    dark: NeutralPalette;
}

interface ThemePalette {
  id: string;
  name: string;
  colors: string[]; 
  backgrounds: ThemeBackgroundOption[];
  light: React.CSSProperties; 
  dark: React.CSSProperties;  
}

const ZINC_NEUTRALS = {
    light: {
        background: "#FFFFFF",      // Pure White for content clarity
        foreground: "#0F172A",      // Slate-900 for text
        muted: "#F1F5F9",           // Slate-100: Distinct from white, good for secondary backgrounds
        mutedForeground: "#64748B", // Slate-500
        border: "#E2E8F0",          // Slate-200: Subtle but visible border
        card: "#F8FAFC",            // Slate-50: Very subtle off-white for cards/sidebars (High Brightness)
        popover: "#FFFFFF",
        popoverForeground: "#0F172A"
    },
    dark: {
        background: "#020617",      // Slate-950 (Midnight)
        foreground: "#F8FAFC",      // Slate-50
        muted: "#1E293B",           // Slate-800
        mutedForeground: "#94A3B8", // Slate-400
        border: "#1E293B",          // Slate-800
        card: "#0F172A",            // Slate-900 (Slightly lighter than BG)
        popover: "#0F172A",
        popoverForeground: "#F8FAFC"
    }
};

// Override ZINC with stricter Blue-Tinted "Clean" look if requested
// "Clean" implies high clarity. 
// Clean: White Content, Grey Sidebar (Slate-100)
ZINC_NEUTRALS.light.background = "#FFFFFF";
ZINC_NEUTRALS.light.card = "#F1F5F9"; // Slate-100 (Distinct Sidebar)
ZINC_NEUTRALS.light.muted = "#E2E8F0"; // Slate-200 (Distinct Inputs)

const SLATE_NEUTRALS = {
    light: {
        // Tech: Grey Tinted Background, White Cards (Inverted)
        background: "#F1F5F9", // Slate-100 (Tinted App Background)
        foreground: "#0F172A", // Slate-900
        muted: "#E2E8F0",      // Slate-200
        mutedForeground: "#64748B",
        border: "#CBD5E1",     // Slate-300 (Tech = Sharper Borders)
        card: "#FFFFFF",       // White Cards floating on Grey
        popover: "#FFFFFF", 
        popoverForeground: "#0F172A"
    },
    dark: {
        background: "#0B1120", // Deep Midnight
        foreground: "#F8FAFC", 
        muted: "#1E293B", 
        mutedForeground: "#94A3B8",
        border: "#334155",     // Slate-700 (Lighter border for tech look)
        card: "#1E293B",       // Slate-800 (Lighter Card on Dark BG)
        popover: "#1E293B", 
        popoverForeground: "#F8FAFC"
    }
};

const STONE_NEUTRALS = {
    light: {
        background: "#FFFFFF", 
        foreground: "#1C1917", 
        muted: "#F5F5F4", 
        mutedForeground: "#78716C",
        border: "#E7E5E4", 
        card: "#FAFAF9", 
        popover: "#FFFFFF", 
        popoverForeground: "#1C1917"
    },
    dark: {
        background: "#0C0A09", foreground: "#FAFAF9", muted: "#292524", mutedForeground: "#A8A29E",
        border: "#292524", card: "#1C1917", popover: "#1C1917", popoverForeground: "#FAFAF9"
    }
};

const GRAY_NEUTRALS = {
    light: {
        background: "#FFFFFF", 
        foreground: "#030712", 
        muted: "#F3F4F6", 
        mutedForeground: "#6B7280",
        border: "#E5E7EB", 
        card: "#F9FAFB", 
        popover: "#FFFFFF", 
        popoverForeground: "#030712"
    },
    dark: {
        background: "#030712", foreground: "#F9FAFB", muted: "#1F2937", mutedForeground: "#9CA3AF",
        border: "#1F2937", card: "#111827", popover: "#111827", popoverForeground: "#F9FAFB"
    }
};

const generateTintedNeutrals = (primary: string): { light: NeutralPalette, dark: NeutralPalette } => {
    const bgLight = mixColor("#ffffff", primary, 0.03);
    const mutedLight = mixColor("#f4f4f5", primary, 0.05);
    const borderLight = mixColor("#e4e4e7", primary, 0.1);
    
    const bgDark = mixColor("#09090b", primary, 0.05);
    const mutedDark = mixColor("#27272a", primary, 0.08);
    const borderDark = mixColor("#27272a", primary, 0.15);
    const cardDark = mixColor("#09090b", primary, 0.04);

    return {
        light: {
            background: bgLight, foreground: "#09090b", muted: mutedLight, mutedForeground: "#71717a",
            border: borderLight, card: "#ffffff", popover: "#ffffff", popoverForeground: "#09090b"
        },
        dark: {
            background: bgDark, foreground: "#fafafa", muted: mutedDark, mutedForeground: "#a1a1aa",
            border: borderDark, card: cardDark, popover: cardDark, popoverForeground: "#fafafa"
        }
    };
};

const FOREGROUND_PAIRS: Record<string, string> = {
    "--primary": "--primary-foreground",
    "--secondary": "--secondary-foreground",
    "--accent": "--accent-foreground",
    "--destructive": "--destructive-foreground",
    "--card": "--card-foreground",
    "--popover": "--popover-foreground",
    "--muted": "--muted-foreground"
};

const CONTRAST_LOGIC_CODE = `/**
 * Calculate optimal text color (black/white) based on background brightness.
 * Using YIQ color space formula.
 */
export const getContrastColor = (hex: string) => {
    // 1. Remove hash and whitespace
    let cleanHex = hex.replace('#', '').trim();

    // 2. Expand shorthand (e.g. "f00" -> "ff0000")
    if (cleanHex.length === 3) {
        cleanHex = cleanHex.split('').map(char => char + char).join('');
    }

    // Safety check
    if (cleanHex.length !== 6) return '#09090b';

    // 3. Extract RGB
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);

    // 4. Calculate YIQ
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

    // 5. Return contrast color (Standard threshold 128)
    return (yiq >= 128) ? '#09090b' : '#ffffff';
};`;

const VANILLA_JS_IMPLEMENTATION = `/**
 * CORE THEME LOGIC (Vanilla JS)
 * This logic ensures all text remains legible regardless of the background color.
 */

// 1. Calculate optimal text color (black/white) based on background brightness (YIQ)
const getContrastColor = (hex) => {
    // Clean and validate hex
    let cleanHex = hex.replace('#', '').trim();
    if (cleanHex.length === 3) cleanHex = cleanHex.split('').map(c => c + c).join('');
    
    // Parse RGB
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    
    // YIQ Equation: ((R*299)+(G*587)+(B*114))/1000
    // Returns black for bright backgrounds, white for dark ones.
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#09090b' : '#ffffff';
};

// 2. Apply theme colors to CSS Variables
export const updateThemeColors = (hexColor) => {
    const foregroundColor = getContrastColor(hexColor);
    const root = document.documentElement;
    
    // Set the Main Brand Color
    root.style.setProperty('--primary', hexColor);
    root.style.setProperty('--primary-foreground', foregroundColor);
};`;



const VANILLA_BLOCKS_IMPLEMENTATION = `/**
 * VANILLA JS BUILDING BLOCKS
 * Framework-agnostic implementations of the application's core UI blocks.
 */

// --- UTILITIES ---

const VARIANTS = {
    button: {
        base: "inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius)] text-sm font-medium ring-offset-[var(--background)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 cursor-pointer",
        primary: "bg-[var(--primary)] text-[var(--primary-foreground)] hover:brightness-90 border border-transparent",
        secondary: "bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:brightness-90 border border-transparent",
        destructive: "bg-[var(--destructive)] text-[var(--destructive-foreground)] hover:brightness-90 border border-transparent",
        outline: "border border-[var(--input)] bg-[var(--background)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]",
        ghost: "hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]",
    },
    badge: {
        base: "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2",
        primary: "border-transparent bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/80",
        secondary: "border-transparent bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--secondary)]/80",
        outline: "text-[var(--foreground)] border-[var(--border)]",
    },
    card: {
        base: "rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] shadow-sm",
    }
};

const createButton = (text, variant = 'primary') => {
    const btn = document.createElement('button');
    btn.className = \`\${VARIANTS.button.base} \${VARIANTS.button[variant] || VARIANTS.button.primary}\`;
    btn.textContent = text;
    return btn;
};

const createBadge = (text, variant = 'primary') => {
    const badge = document.createElement('div');
    badge.className = \`\${VARIANTS.badge.base} \${VARIANTS.badge[variant] || VARIANTS.badge.primary}\`;
    badge.textContent = text;
    return badge;
};

const createCard = () => {
    const card = document.createElement('div');
    card.className = VARIANTS.card.base;
    return card;
};

// --- HERO BLOCKS ---

export const createHeroVariant1 = () => {
    const container = document.createElement('div');
    container.className = "relative w-full h-[600px] flex items-center justify-center overflow-hidden bg-[var(--background)] text-[var(--foreground)]";
    container.innerHTML = \`
        <div class="absolute inset-0 bg-cover bg-center z-0 opacity-20" style="background-image: url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')"></div>
        <div class="absolute inset-0 bg-[var(--background)]/60 z-0"></div>
        <div class="relative z-10 max-w-3xl mx-auto text-center px-4 space-y-6" style="padding: var(--global-padding)">
            <div class="\${VARIANTS.badge.base} \${VARIANTS.badge.secondary} mb-4 border-none">Annual Conference 2025</div>
            <h1 class="font-extrabold tracking-tight" style="font-size: var(--text-6xl)">Future of Tech</h1>
            <p class="text-[var(--muted-foreground)] max-w-2xl mx-auto" style="font-size: var(--text-xl)">Join the world's leading minds to shape the future of technology and innovation.</p>
            <div class="flex flex-col sm:flex-row gap-3 pt-4 w-full justify-center">
                <button class="\${VARIANTS.button.base} \${VARIANTS.button.primary} w-full sm:w-auto min-w-[160px] text-lg px-8">Register Now</button>
                <button class="\${VARIANTS.button.base} \${VARIANTS.button.outline} w-full sm:w-auto min-w-[160px] text-lg px-8 border-none bg-[var(--secondary)]/50">View Agenda</button>
            </div>
        </div>
    \`;
    return container;
};

export const createHeroVariant2 = () => {
    const container = document.createElement('div');
    container.className = "w-full bg-[var(--background)] overflow-hidden";
    container.innerHTML = \`
        <div class="flex flex-wrap w-full">
            <div class="flex-1 min-w-[320px] flex flex-col justify-center space-y-6 md:space-y-8 order-2 md:order-1" style="padding: calc(var(--global-padding) * 1.5)">
                <div class="space-y-4">
                    <div class="\${VARIANTS.badge.base} \${VARIANTS.badge.secondary} w-fit border-none">Oct 15-17, 2025</div>
                    <h1 class="font-bold tracking-tight text-[var(--foreground)] leading-[110%]" style="font-size: var(--text-6xl)">Design Systems Summit</h1>
                    <p class="text-[var(--muted-foreground)] leading-[160%] max-w-xl" style="font-size: var(--text-xl)">Scale your design workflow with the latest tools and methodologies. Connect with 5,000+ designers globally.</p>
                </div>
                <div class="flex flex-wrap gap-4 pt-2 w-full">
                    <button class="\${VARIANTS.button.base} \${VARIANTS.button.primary} w-full lg:w-auto min-w-[140px]">Get Tickets</button>
                    <button class="\${VARIANTS.button.base} \${VARIANTS.button.outline} w-full lg:w-auto min-w-[140px] border-none bg-[var(--secondary)]/50">Learn More</button>
                </div>
            </div>
            <div class="flex-1 min-w-[320px] min-h-[300px] md:min-h-[500px] bg-[var(--muted)] relative order-1 md:order-2">
                <img src="https://images.unsplash.com/photo-1759852174174-7beac185d35f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" class="absolute inset-0 w-full h-full object-cover" alt="Abstract">
            </div>
        </div>
    \`;
    return container;
};

// --- AGENDA BLOCKS ---

export const createAgendaVariant1 = () => {
    const container = document.createElement('div');
    container.className = "w-full py-12 bg-[var(--background)]";
    
    const items = [
        { time: "09:00 AM", title: "Registration & Breakfast", location: "Main Hall", type: "General" },
        { time: "10:00 AM", title: "Opening Keynote", location: "Auditorium A", type: "Keynote" },
        { time: "11:30 AM", title: "Breakout Session", location: "Room 204", type: "Workshop" }
    ];

    const cardsHtml = items.map(item => \`
        <div class="\${VARIANTS.card.base} border-none shadow-sm hover:shadow-md transition-shadow">
            <div class="flex flex-col lg:flex-row items-start lg:items-center gap-4 p-6">
                <div class="min-w-[100px] font-mono text-[var(--primary)] font-bold">\${item.time}</div>
                <div class="flex-1 space-y-1">
                    <h3 class="font-semibold text-lg text-[var(--foreground)]">\${item.title}</h3>
                    <div class="flex items-center gap-4 text-sm text-[var(--muted-foreground)]">
                        <span class="flex items-center gap-1">\${item.location}</span>
                        <div class="\${VARIANTS.badge.base} \${VARIANTS.badge.secondary} text-xs">\${item.type}</div>
                    </div>
                </div>
            </div>
        </div>
    \`).join('');

    container.innerHTML = \`
        <div class="container mx-auto px-4 max-w-4xl">
            <h2 class="text-3xl font-bold mb-8 text-center text-[var(--foreground)]">Event Schedule</h2>
            <div class="space-y-4">\${cardsHtml}</div>
        </div>
    \`;
    return container;
};

// --- SPEAKERS BLOCKS ---

export const createSpeakersVariant1 = () => {
    const container = document.createElement('div');
    container.className = "w-full py-12 bg-[var(--background)]";
    
    const speakers = [
        { name: "Sarah Johnson", role: "VP of Design", company: "Acme Corp", img: "https://images.unsplash.com/photo-1766928963-c72589b9ef3f?w=400" },
        { name: "Michael Chen", role: "CTO", company: "TechStart", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400" },
        { name: "Jessica Williams", role: "Product Lead", company: "Innovate", img: "https://images.unsplash.com/photo-1762968269894-1d7e1ce8894e?w=400" }
    ];

    const gridHtml = speakers.map(s => \`
        <div class="group relative overflow-hidden rounded-xl cursor-pointer">
            <div class="aspect-square overflow-hidden bg-[var(--muted)]">
                <img src="\${s.img}" alt="\${s.name}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0">
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
            <div class="absolute bottom-0 left-0 p-4 text-white w-full">
                <h3 class="text-lg font-bold">\${s.name}</h3>
                <p class="text-xs opacity-80">\${s.role}, \${s.company}</p>
            </div>
        </div>
    \`).join('');

    container.innerHTML = \`
        <div class="container mx-auto px-4">
            <h2 class="text-2xl lg:text-3xl font-bold text-center mb-8 text-[var(--foreground)]">Featured Speakers</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">\${gridHtml}</div>
        </div>
    \`;
    return container;
};

// --- SPONSORS BLOCKS ---

export const createSponsorsVariant1 = () => {
    const container = document.createElement('div');
    container.className = "w-full py-24 bg-[var(--background)] border-y border-[var(--border)]";
    
    const logos = Array(6).fill("https://images.unsplash.com/photo-1612519348055-5948319a0714?w=200&h=100&fit=crop");
    
    const logosHtml = logos.map(src => \`
        <div class="w-32 h-20 md:w-48 md:h-24 bg-[var(--muted)]/30 rounded-lg flex items-center justify-center p-4 grayscale hover:grayscale-0 hover:bg-[var(--muted)] transition-all duration-300 cursor-pointer">
            <img src="\${src}" class="max-w-full max-h-full object-contain opacity-70 hover:opacity-100">
        </div>
    \`).join('');

    container.innerHTML = \`
        <div class="container mx-auto px-4 text-center">
            <h2 class="text-3xl font-bold tracking-tight mb-4">Our Partners</h2>
            <p class="text-[var(--muted-foreground)] mb-12 max-w-2xl mx-auto">We really appreciate our sponsors! Supported by the best in the industry.</p>
            <div class="flex flex-wrap justify-center gap-8 md:gap-12">\${logosHtml}</div>
        </div>
    \`;
    return container;
};

// --- LOCATION BLOCKS ---

export const createLocationVariant1 = () => {
    const container = document.createElement('div');
    container.className = "w-full bg-[var(--background)]";
    
    container.innerHTML = \`
        <div class="grid grid-cols-1 lg:grid-cols-2 h-auto lg:h-[500px]">
            <div class="bg-[var(--muted)] relative h-[300px] lg:h-full">
                <img src="https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" class="w-full h-full object-cover grayscale opacity-70">
                <div class="absolute inset-0 flex items-center justify-center">
                    <div class="bg-[var(--primary)] text-[var(--primary-foreground)] p-3 rounded-full shadow-xl animate-bounce">
                        <!-- Map Pin Icon Placeholder -->
                        <div class="w-8 h-8 flex items-center justify-center font-bold">📍</div>
                    </div>
                </div>
            </div>
            <div class="p-8 lg:p-12 flex flex-col justify-center bg-[var(--card)]">
                <h2 class="text-3xl font-bold mb-6 text-[var(--foreground)]">The Venue</h2>
                <div class="space-y-6">
                    <div>
                        <h3 class="font-semibold text-lg">Moscone Center</h3>
                        <p class="text-[var(--muted-foreground)]">747 Howard St<br/>San Francisco, CA 94103</p>
                    </div>
                    <button class="\${VARIANTS.button.base} \${VARIANTS.button.primary} w-full lg:w-fit gap-2">Get Directions</button>
                </div>
            </div>
        </div>
    \`;
    return container;
};

// --- COUNTDOWN BLOCKS ---

export const createCountdownVariant1 = () => {
    const container = document.createElement('div');
    container.className = "w-full py-20 bg-[var(--foreground)] text-[var(--background)]";
    
    const items = [
        { val: "14", label: "Days" },
        { val: "08", label: "Hours" },
        { val: "45", label: "Minutes" },
        { val: "12", label: "Seconds" }
    ];

    const gridHtml = items.map(item => \`
        <div class="flex flex-col items-center">
            <span class="text-5xl lg:text-8xl font-black tabular-nums tracking-tighter">\${item.val}</span>
            <span class="text-sm lg:text-base opacity-60 font-mono mt-2">\${item.label}</span>
        </div>
    \`).join('');

    container.innerHTML = \`
        <div class="container mx-auto px-4 text-center">
            <p class="text-lg font-medium opacity-80 mb-8 uppercase tracking-widest">Event Starts In</p>
            <div class="flex flex-wrap justify-center gap-8 lg:gap-16">\${gridHtml}</div>
        </div>
    \`;
    return container;
};

// --- DOCUMENTS BLOCKS ---

export const createDocumentsVariant2 = () => {
    const container = document.createElement('div');
    container.className = "w-full py-12 bg-[var(--background)]";
    
    const docs = [
        { name: "Conference Brochure", size: "2.4 MB" },
        { name: "Sponsorship Deck", size: "5.1 MB" }
    ];

    const listHtml = docs.map(doc => \`
        <div class="flex items-center justify-between p-4 rounded-lg border-none shadow-sm bg-[var(--card)] hover:bg-[var(--muted)]/50 transition-colors">
            <div class="flex items-center gap-4">
                <span class="font-medium text-[var(--foreground)]">\${doc.name}</span>
            </div>
            <div class="flex items-center gap-4">
                <span class="text-xs text-[var(--muted-foreground)] hidden sm:block">\${doc.size}</span>
                <button class="\${VARIANTS.button.base} \${VARIANTS.button.ghost} h-8 w-8 p-0">⬇</button>
            </div>
        </div>
    \`).join('');

    container.innerHTML = \`
        <div class="container mx-auto px-4 max-w-3xl">
            <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
                <h2 class="text-2xl font-bold text-[var(--foreground)]">Resources</h2>
                <button class="\${VARIANTS.button.base} \${VARIANTS.button.ghost} text-[var(--primary)] underline-offset-4 hover:underline">View All</button>
            </div>
            <div class="space-y-2">\${listHtml}</div>
        </div>
    \`;
    return container;
};

// --- HOTEL BLOCKS ---

export const createHotelVariant1 = () => {
    const container = document.createElement('div');
    container.className = "w-full py-20 bg-[var(--background)]";
    
    container.innerHTML = \`
        <div class="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div class="rounded-2xl overflow-hidden shadow-2xl h-[400px]">
                <img src="https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" class="w-full h-full object-cover">
            </div>
            <div class="space-y-6">
                <div class="\${VARIANTS.badge.base} \${VARIANTS.badge.secondary}">Official Partner</div>
                <h2 class="text-4xl font-bold text-[var(--foreground)]">The Marriott Marquis</h2>
                <p class="text-lg text-[var(--muted-foreground)]">Stay where the action is. Enjoy exclusive rates for conference attendees starting at $199/night.</p>
                <div class="pt-4">
                    <button class="\${VARIANTS.button.base} \${VARIANTS.button.primary} h-12 px-8 text-lg">Book Your Room</button>
                    <p class="text-xs text-[var(--muted-foreground)] mt-2">Promo code: CONF2025</p>
                </div>
            </div>
        </div>
    \`;
    return container;
};

// --- BOOTH MAP BLOCKS ---

export const createBoothMapVariant3 = () => {
    const container = document.createElement('div');
    container.className = "w-full py-12 bg-[var(--background)]";
    
    container.innerHTML = \`
        <div class="container mx-auto px-4">
            <div class="flex flex-col lg:flex-row gap-8">
                <div class="w-full lg:w-1/4 space-y-2">
                    <h3 class="font-bold mb-4 text-[var(--foreground)]">Select Floor</h3>
                    <button class="\${VARIANTS.button.base} \${VARIANTS.button.primary} w-full justify-start">Level 1 - Expo Hall</button>
                    <button class="\${VARIANTS.button.base} \${VARIANTS.button.ghost} w-full justify-start">Level 2 - Conference Rooms</button>
                    <button class="\${VARIANTS.button.base} \${VARIANTS.button.ghost} w-full justify-start">Level 3 - VIP Lounge</button>
                </div>
                <div class="flex-1 bg-[var(--muted)] rounded-xl h-[500px] relative overflow-hidden flex items-center justify-center">
                    <p class="text-[var(--muted-foreground)] font-medium">Interactive Map Placeholder</p>
                    <div class="absolute top-1/4 left-1/4 w-32 h-32 bg-[var(--primary)]/20 rounded-lg flex items-center justify-center">
                        <span class="text-[var(--primary)] font-bold">Lounge</span>
                    </div>
                    <div class="absolute bottom-1/4 right-1/4 w-48 h-24 bg-[var(--secondary)]/20 rounded-lg flex items-center justify-center">
                        <span class="text-[var(--secondary-foreground)] font-bold">Cafe</span>
                    </div>
                </div>
            </div>
        </div>
    \`;
    return container;
};
`;

const generateTailwindConfig = () => `import type { Config } from "tailwindcss";

const config = {
    darkMode: ["class"],
    content: [
      './pages/**/*.{ts,tsx}',
      './components/**/*.{ts,tsx}',
      './app/**/*.{ts,tsx}',
      './src/**/*.{ts,tsx}',
    ],
    theme: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      extend: {
        colors: {
          border: "var(--border)",
          input: "var(--input)",
          ring: "var(--ring)",
          background: "var(--background)",
          foreground: "var(--foreground)",
          primary: {
            DEFAULT: "var(--primary)",
            foreground: "var(--primary-foreground)",
          },
          secondary: {
            DEFAULT: "var(--secondary)",
            foreground: "var(--secondary-foreground)",
          },
          destructive: {
            DEFAULT: "var(--destructive)",
            foreground: "var(--destructive-foreground)",
          },
          muted: {
            DEFAULT: "var(--muted)",
            foreground: "var(--muted-foreground)",
          },
          accent: {
            DEFAULT: "var(--accent)",
            foreground: "var(--accent-foreground)",
          },
          popover: {
            DEFAULT: "var(--popover)",
            foreground: "var(--popover-foreground)",
          },
          card: {
            DEFAULT: "var(--card)",
            foreground: "var(--card-foreground)",
          },
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
      },
    },
    plugins: [require("tailwindcss-animate")],
  } satisfies Config;

export default config;`;

const generateSetupScript = () => `#!/bin/bash

# 1. Install Dependencies
echo "📦 Installing Tailwind CSS and utilities..."
npm install -D tailwindcss postcss autoprefixer
npm install tailwindcss-animate class-variance-authority clsx tailwind-merge lucide-react

# 2. Init Tailwind
npx tailwindcss init -p

# 3. Create Utilities
echo "🛠️ Creating lib/utils.ts..."
mkdir -p lib
cat << 'EOF' > lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
EOF

# 4. Create CSS
echo "🎨 Creating app/globals.css..."
# Note: You need to paste the CSS content from the "CSS Variables" tab here manually 
# or automate it by replacing this line with the exported CSS.
touch app/globals.css

echo "✅ Setup complete! Don't forget to update tailwind.config.ts with the content from the Config tab."
`;

const createTheme = (
  id: string, 
  name: string, 
  primary: string, 
  primaryFg: string = "#ffffff",
  swatchTints: [string, string] = ["#ffffff", "#f4f4f5"],
  strategy: 'cool' | 'warm' | 'grayscale' = 'cool'
): ThemePalette => {
  const colors = [
    swatchTints[0],
    swatchTints[1],
    primary,
    ZINC_NEUTRALS.light.mutedForeground,
    ZINC_NEUTRALS.light.foreground
  ];

  const defaultOption = {
      name: "Clean",
      light: ZINC_NEUTRALS.light,
      dark: ZINC_NEUTRALS.dark
  };

  let harmonicOption;
  if (strategy === 'cool') {
      harmonicOption = { name: "Tech", light: SLATE_NEUTRALS.light, dark: SLATE_NEUTRALS.dark };
  } else if (strategy === 'warm') {
      harmonicOption = { name: "Warm", light: STONE_NEUTRALS.light, dark: STONE_NEUTRALS.dark };
  } else {
      harmonicOption = { name: "Soft", light: GRAY_NEUTRALS.light, dark: GRAY_NEUTRALS.dark };
  }

  const tinted = generateTintedNeutrals(primary);
  const immersiveOption = {
      name: "Immersive",
      light: tinted.light,
      dark: tinted.dark
  };

  const backgrounds = [defaultOption, harmonicOption, immersiveOption];

  const commonVars = {
    "--primary": primary,
    "--primary-foreground": primaryFg,
    "--ring": primary,
    "--radius": "0.5rem",
  };
  
  const primaryHoverLight = adjustColor(primary, -20);
  const secondaryHoverLight = adjustColor(defaultOption.light.muted, -10);
  const destructiveHoverLight = adjustColor("#ef4444", -20);

  const primaryHoverDark = adjustColor(primary, 20);
  const secondaryHoverDark = adjustColor(defaultOption.dark.muted, 10);
  const destructiveHoverDark = adjustColor("#7f1d1d", 20);

  const generateVars = (neutrals: NeutralPalette, mode: ThemeMode) => {
      const isDark = mode === 'dark';
      return {
        ...commonVars,
        "--primary-hover": isDark ? primaryHoverDark : primaryHoverLight,
        "--primary-hover-foreground": getContrastColor(isDark ? primaryHoverDark : primaryHoverLight),
        "--background": neutrals.background,
        "--foreground": neutrals.foreground,
        "--muted": neutrals.muted,
        "--muted-foreground": neutrals.mutedForeground,
        "--card": neutrals.card,
        "--card-foreground": neutrals.foreground,
        "--popover": neutrals.popover,
        "--popover-foreground": neutrals.popoverForeground,
        "--border": neutrals.border,
        "--input": neutrals.border,
        "--input-background": neutrals.background,
        "--secondary": neutrals.muted,
        "--secondary-foreground": neutrals.foreground,
        "--secondary-hover": isDark ? secondaryHoverDark : secondaryHoverLight,
        "--secondary-hover-foreground": getContrastColor(isDark ? secondaryHoverDark : secondaryHoverLight),
        "--accent": neutrals.muted,
        "--accent-foreground": neutrals.foreground,
        "--sidebar": neutrals.card,
        "--sidebar-foreground": neutrals.foreground,
        "--sidebar-primary": neutrals.foreground,
        "--sidebar-primary-foreground": neutrals.background,
        "--sidebar-accent": neutrals.muted,
        "--sidebar-accent-foreground": neutrals.foreground,
        "--sidebar-border": neutrals.border,
        "--sidebar-ring": neutrals.border,
        "--destructive": isDark ? "#7f1d1d" : "#ef4444",
        "--destructive-foreground": isDark ? "#fef2f2" : "#ffffff",
        "--destructive-hover": isDark ? destructiveHoverDark : destructiveHoverLight,
        "--destructive-hover-foreground": getContrastColor(isDark ? destructiveHoverDark : destructiveHoverLight),
      } as React.CSSProperties;
  };

  return {
    id,
    name,
    colors,
    backgrounds,
    light: generateVars(defaultOption.light, 'light'),
    dark: generateVars(defaultOption.dark, 'dark'),
  };
};

const THEMES: ThemePalette[] = [
  createTheme("grayscale", "Grayscale", "#18181b", "#ffffff", ["#ffffff", "#f4f4f5"], 'grayscale'),
  createTheme("blue", "Ocean", "#3b82f6", "#ffffff", ["#ffffff", "#eff6ff"], 'cool'),
  createTheme("green", "Nature", "#22c55e", "#ffffff", ["#ffffff", "#f0fdf4"], 'warm'),
  createTheme("orange", "Sunset", "#f97316", "#ffffff", ["#ffffff", "#fff7ed"], 'warm'),
  createTheme("red", "Berry", "#dc2626", "#ffffff", ["#ffffff", "#fef2f2"], 'warm'),
  createTheme("purple", "Royal", "#7e22ce", "#ffffff", ["#ffffff", "#f3e8ff"], 'cool'),
  createTheme("teal", "Teal", "#14b8a6", "#ffffff", ["#ffffff", "#f0fdfa"], 'cool'),
  createTheme("yellow", "Sunshine", "#eab308", "#000000", ["#ffffff", "#fefce8"], 'warm'),
  createTheme("slate", "Corporate", "#64748b", "#ffffff", ["#ffffff", "#f8fafc"], 'cool'),
  createTheme("rose", "Rose", "#e11d48", "#ffffff", ["#ffffff", "#fff1f2"], 'warm'),
];

interface ColorEditorProps {
    color: string;
    label?: string;
    variable?: string;
    onChange?: (val: string) => void;
}

const ColorEditor = ({ color, label, variable, onChange }: ColorEditorProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    copyToClipboard(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-2 p-1 w-52">
        {label && <div className="font-semibold text-xs border-b pb-1 mb-1 flex justify-between items-center">
            {label}
            {variable && <span className="text-[10px] text-muted-foreground font-mono font-normal">{variable}</span>}
        </div>}
        
        <div className="flex items-center gap-3">
             <div className="relative h-8 w-8 rounded-md border border-border shadow-sm shrink-0 overflow-hidden group">
                 <input 
                    type="color" 
                    value={color}
                    onChange={(e) => onChange && onChange(e.target.value)}
                    className="absolute inset-[-50%] h-[200%] w-[200%] cursor-pointer p-0 border-0"
                 />
             </div>
             <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs font-mono truncate select-all">{color}</span>
                <span className="text-[10px] text-muted-foreground">Click swatch to edit</span>
             </div>
        </div>
        
        <Button 
            size="sm" 
            variant="secondary" 
            className="h-6 text-[10px] w-full mt-1"
            onClick={handleCopy}
        >
            {copied ? "Copied!" : "Copy Hex"}
        </Button>
    </div>
  );
};

const PreviewInspector = ({ 
    children, 
    label, 
    variable, 
    value,
    onColorChange 
}: { 
    children: React.ReactNode; 
    label: string; 
    variable: string; 
    value: string;
    onColorChange: (val: string) => void;
}) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="relative group/inspector cursor-pointer">
                    {children}
                    <div className="absolute inset-0 border-2 border-dashed border-blue-500/0 group-hover/inspector:border-blue-500/50 rounded-md pointer-events-none transition-all duration-200 z-10" />
                        <div className="absolute top-0 right-0 p-1 opacity-0 group-hover/inspector:opacity-100 transition-opacity z-20">
                        <div className="bg-blue-500 text-white rounded-full p-1 shadow-sm">
                            <Paintbrush className="h-3 w-3" />
                        </div>
                    </div>
                </div>
            </PopoverTrigger>
            <PopoverContent side="top" className="p-2 border bg-popover text-popover-foreground shadow-xl z-50 w-auto">
                <ColorEditor 
                    color={value} 
                    label={label} 
                    variable={variable} 
                    onChange={onColorChange}
                />
            </PopoverContent>
        </Popover>
    );
};

const ThemeRow = ({ 
  theme, 
  isSelected, 
  onSelect 
}: { 
  theme: ThemePalette; 
  isSelected: boolean; 
  onSelect: () => void; 
}) => {
  return (
    <div 
      onClick={onSelect}
      className={cn(
        "group relative flex items-center gap-1 p-2 rounded-lg cursor-pointer border-2 transition-all duration-200",
        isSelected 
          ? "border-blue-500 bg-blue-50/50" 
          : "border-transparent hover:bg-muted/50"
      )}
    >
      <div className="flex gap-1 flex-1">
        {theme.colors.map((color, i) => (
             <div 
                key={i}
                className="h-6 w-1/5 rounded-sm shadow-sm border border-black/5" 
                style={{ backgroundColor: color }}
             />
        ))}
      </div>
      
      <span className="ml-2 text-xs font-medium text-muted-foreground w-16 truncate">{theme.name}</span>

      {isSelected && (
        <div className="absolute right-[-6px] top-[-6px] bg-blue-500 text-white p-0.5 rounded-full shadow-md z-10">
          <Check className="h-3 w-3" />
        </div>
      )}
    </div>
  );
};

export const ThemeSwitcher = () => {
  const { setThemeStyles, config, setConfig } = useTheme();
  const [selectedThemeId, setSelectedThemeId] = useState("blue");
  const [selectedBgIndex, setSelectedBgIndex] = useState(0);
  const [previewWidth, setPreviewWidth] = useState<"100%" | "768px" | "375px">("100%");
  const [overrides, setOverrides] = useState<Record<string, string>>({});
  
  const isDarkMode = config.isDarkMode;

  // Global Settings
  const [radius, setRadius] = useState(0.5);
  const [baseFontSize, setBaseFontSize] = useState(16);
  const [globalPadding, setGlobalPadding] = useState(2);
  const [maxWidthPreset, setMaxWidthPreset] = useState<'small' | 'medium' | 'large'>('medium');

  const selectedTheme = THEMES.find(t => t.id === selectedThemeId) || THEMES[0];
  
  // Dynamic Background Generation to ensure Immersive mode respects manual Primary overrides
  const effectivePrimary = overrides["--primary"] || selectedTheme.light["--primary"] as string;
  
  const backgroundOptions = React.useMemo(() => {
      // 1. Get base options from theme (Clean, Tech/Warm/Soft)
      const baseOptions = selectedTheme.backgrounds.filter(b => b.name !== "Immersive");
      
      // 2. Regenerate Immersive option using effectivePrimary
      const tinted = generateTintedNeutrals(effectivePrimary);
      const immersiveOption = {
          name: "Immersive",
          light: tinted.light,
          dark: tinted.dark
      };
      
      return [...baseOptions, immersiveOption];
  }, [selectedTheme, effectivePrimary]);

  // Calculate scaled typography
  const scaleRatio = baseFontSize / 16;
  
  // Use Container Query Units (cqw) for fluid typography that responds to the preview container width
  const typographyVars = React.useMemo(() => ({
      "--text-xs": `clamp(${11 * scaleRatio}px, 0.5cqw + ${10 * scaleRatio}px, ${13 * scaleRatio}px)`,
      "--text-sm": `clamp(${13 * scaleRatio}px, 0.75cqw + ${11 * scaleRatio}px, ${15 * scaleRatio}px)`,
      "--text-base": `clamp(${15 * scaleRatio}px, 1cqw + ${13 * scaleRatio}px, ${17 * scaleRatio}px)`,
      "--text-lg": `clamp(${17 * scaleRatio}px, 1.25cqw + ${14 * scaleRatio}px, ${19 * scaleRatio}px)`,
      "--text-xl": `clamp(${19 * scaleRatio}px, 1.5cqw + ${16 * scaleRatio}px, ${22 * scaleRatio}px)`,
      "--text-2xl": `clamp(${22 * scaleRatio}px, 2cqw + ${18 * scaleRatio}px, ${26 * scaleRatio}px)`,
      "--text-3xl": `clamp(${26 * scaleRatio}px, 2.5cqw + ${20 * scaleRatio}px, ${32 * scaleRatio}px)`,
      "--text-4xl": `clamp(${30 * scaleRatio}px, 3cqw + ${24 * scaleRatio}px, ${40 * scaleRatio}px)`,
      "--text-5xl": `clamp(${34 * scaleRatio}px, 4cqw + ${26 * scaleRatio}px, ${52 * scaleRatio}px)`,
      "--text-6xl": `clamp(${38 * scaleRatio}px, 5cqw + ${28 * scaleRatio}px, ${72 * scaleRatio}px)`,
  }), [scaleRatio]);

  const currentBgOption = backgroundOptions[selectedBgIndex] || backgroundOptions[0];
  const bgPalette = isDarkMode ? currentBgOption.dark : currentBgOption.light;

  const baseVars = React.useMemo(() => {
      const base = isDarkMode ? selectedTheme.dark : selectedTheme.light;
      
      return {
          ...base,
          "--background": bgPalette.background,
          "--foreground": bgPalette.foreground,
          "--muted": bgPalette.muted,
          "--muted-foreground": bgPalette.mutedForeground,
          "--card": bgPalette.card,
          "--card-foreground": bgPalette.foreground,
          "--popover": bgPalette.popover,
          "--popover-foreground": bgPalette.popoverForeground,
          "--border": bgPalette.border,
          "--input": bgPalette.border,
          "--input-background": bgPalette.background,
          "--secondary": bgPalette.muted,
          "--secondary-foreground": bgPalette.foreground,
          "--accent": bgPalette.muted,
          "--accent-foreground": bgPalette.foreground,
          // Re-apply primary here to ensure it propagates if not overridden yet (though overrides take precedence)
          "--primary": effectivePrimary, 
      } as React.CSSProperties;
  }, [selectedTheme, isDarkMode, bgPalette, effectivePrimary]);

  const maxWidthMap = {
      small: '800px',
      medium: '1280px',
      large: '1600px'
  };

  const activeVars = React.useMemo(() => ({
    ...baseVars,
    ...overrides,
    "--radius": `${radius}rem`,
    "--global-padding": `clamp(${Math.max(1, globalPadding * 0.5)}rem, 5vw, ${globalPadding}rem)`,
    "--container-max-width": maxWidthMap[maxWidthPreset as keyof typeof maxWidthMap],
    ...typographyVars
  }), [baseVars, overrides, radius, globalPadding, maxWidthPreset, typographyVars]);
  
  useEffect(() => {
      setThemeStyles(activeVars as React.CSSProperties);
  }, [activeVars, setThemeStyles]);

  useEffect(() => {
      setSelectedBgIndex(0);
      setOverrides({});
  }, [selectedThemeId]);

  const handleColorChange = (variable: string, value: string) => {
    const newOverrides = { ...overrides, [variable]: value };

    if (FOREGROUND_PAIRS[variable]) {
        const fgVar = FOREGROUND_PAIRS[variable];
        const contrastColor = getContrastColor(value);
        newOverrides[fgVar] = contrastColor;
    }
    
    const hoverAmount = isDarkMode ? 20 : -20;
    const secondaryHoverAmount = isDarkMode ? 10 : -10;

    if (variable === "--primary") {
        const hoverColor = adjustColor(value, hoverAmount);
        newOverrides["--primary-hover"] = hoverColor;
        newOverrides["--primary-hover-foreground"] = getContrastColor(hoverColor);
        newOverrides["--ring"] = value;
    }
    
    if (variable === "--secondary") {
        const hoverColor = adjustColor(value, secondaryHoverAmount);
        newOverrides["--secondary-hover"] = hoverColor;
        newOverrides["--secondary-hover-foreground"] = getContrastColor(hoverColor);
    }
    
    if (variable === "--destructive") {
        const hoverColor = adjustColor(value, hoverAmount);
        newOverrides["--destructive-hover"] = hoverColor;
        newOverrides["--destructive-hover-foreground"] = getContrastColor(hoverColor);
    }

    setOverrides(newOverrides);
  };

  const resetOverrides = () => {
    setOverrides({});
  };

  const getVar = (name: keyof React.CSSProperties) => (activeVars[name] as string) || "";

  const getCssCode = () => {
    const v = activeVars as Record<string, string>;
    
    const sections = [
        { name: "Base", keys: ["--background", "--foreground"] },
        { name: "Layout", keys: ["--global-padding", "--container-max-width"] },
        { name: "Typography", keys: ["--text-6xl", "--text-4xl", "--text-3xl", "--text-2xl", "--text-lg", "--text-base", "--text-sm", "--text-xs"] },
        { name: "Primary", keys: ["--primary", "--primary-foreground", "--primary-hover", "--primary-hover-foreground"] },
        { name: "Secondary", keys: ["--secondary", "--secondary-foreground", "--secondary-hover", "--secondary-hover-foreground"] },
        { name: "Accent", keys: ["--accent", "--accent-foreground"] },
        { name: "Destructive", keys: ["--destructive", "--destructive-foreground", "--destructive-hover", "--destructive-hover-foreground"] },
        { name: "Muted", keys: ["--muted", "--muted-foreground"] },
        { name: "Containers", keys: ["--card", "--card-foreground", "--popover", "--popover-foreground"] },
        { name: "Borders & Inputs", keys: ["--border", "--input", "--input-background", "--ring"] },
        { name: "Radius", keys: ["--radius"] },
    ];

    let css = `:root {
  /* ${isDarkMode ? 'Dark' : 'Light'} Mode - ${selectedTheme.name} (${currentBgOption.name}) ${Object.keys(overrides).length > 0 ? '(Customized)' : ''} */`;

    sections.forEach(section => {
        const groupVars = section.keys
            .filter(key => v[key] !== undefined)
            .map(key => `  ${key}: ${v[key]};`);
        
        if (groupVars.length > 0) {
            css += `\n\n  /* ${section.name} */\n${groupVars.join('\n')}`;
        }
    });
    
    css += `\n}`;
    return css;
  };

  const generateAutoSetupScript = () => {
    const v = activeVars as Record<string, string>;
    const kvPairs = Object.entries(v)
        .filter(([_, val]) => typeof val === 'string')
        .map(([key, val]) => `    root.style.setProperty('${key}', '${val}');`)
        .join('\n');

    return `/**
 * AUTO-GENERATED THEME LOADER
 * Immediately applies the currently selected design system tokens to the document.
 * 
 * Usage: Paste this script at the top of your <body> or in your main entry point.
 */
(function applyTheme() {
    const root = document.documentElement;
    
    // --- Theme: ${selectedTheme.name} (${isDarkMode ? 'Dark' : 'Light'}) ---
${kvPairs}
})();`;
  };

  return (
    <div className="flex flex-col lg:flex-row h-[800px] w-full border-none rounded-xl overflow-hidden bg-background shadow-md font-sans">
      
      {/* Left Panel: Theme Picker */}
      <aside className="w-full lg:w-[320px] bg-card flex flex-col shrink-0 z-20">
        <div className="p-6 pb-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold tracking-tight">Theme Builder</h2>
                {Object.keys(overrides).length > 0 && (
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={resetOverrides}
                        title="Reset all changes"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    >
                        <RotateCcw className="h-4 w-4" />
                    </Button>
                )}
            </div>
          <p className="text-sm text-muted-foreground mt-1">Customize your design system.</p>
        </div>

        <Tabs defaultValue="colors" className="flex-1 flex flex-col overflow-hidden">
             <div className="px-6 pb-2">
                <TabsList className="w-full grid grid-cols-2">
                    <TabsTrigger value="colors" className="gap-2">
                        <Paintbrush className="h-4 w-4" />
                        Colors
                    </TabsTrigger>
                    <TabsTrigger value="global" className="gap-2">
                        <Scaling className="h-4 w-4" />
                        Global
                    </TabsTrigger>
                </TabsList>
             </div>

             <TabsContent value="colors" className="flex-1 overflow-y-auto px-6 pb-6 mt-0">
                <div className="space-y-6">
                    {/* Brand Colors */}
                    <div className="space-y-3">
                         <SmartTooltip 
                            id="brand-colors" 
                            title="Brand Colors" 
                            description="Define your application's core color palette." 
                            tip="Primary is used for main actions, Secondary for supportive elements."
                        >
                            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-help w-fit">Brand Colors</Label>
                        </SmartTooltip>
                        <div className="grid grid-cols-2 gap-4">
                            {/* Primary */}
                            <PreviewInspector 
                                label="Primary Color" 
                                variable="--primary" 
                                value={getVar("--primary")} 
                                onColorChange={(v) => handleColorChange("--primary", v)}
                            >
                                <div className="h-10 w-full rounded-md border shadow-sm cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all flex items-center justify-center gap-2 group/btn" style={{ backgroundColor: getVar("--primary") }}>
                                    <span className="text-[10px] font-medium opacity-0 group-hover/btn:opacity-100 transition-opacity" style={{ color: getVar("--primary-foreground") }}>Edit</span>
                                </div>
                            </PreviewInspector>

                            {/* Secondary */}
                            <PreviewInspector 
                                label="Secondary Color" 
                                variable="--secondary" 
                                value={getVar("--secondary")} 
                                onColorChange={(v) => handleColorChange("--secondary", v)}
                            >
                                <div className="h-10 w-full rounded-md border shadow-sm cursor-pointer hover:ring-2 hover:ring-secondary/50 transition-all flex items-center justify-center gap-2 group/btn" style={{ backgroundColor: getVar("--secondary") }}>
                                    <span className="text-[10px] font-medium opacity-0 group-hover/btn:opacity-100 transition-opacity" style={{ color: getVar("--secondary-foreground") }}>Edit</span>
                                </div>
                            </PreviewInspector>
                        </div>
                    </div>

                    {/* Color Schemes */}
                    <div className="space-y-3">
                        <SmartTooltip 
                            id="color-scheme" 
                            title="Color Scheme" 
                            description="Select a predefined color palette for your brand." 
                            tip="Changing the scheme updates primary, secondary, and accent colors automatically."
                        >
                            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-help w-fit">Color Scheme</Label>
                        </SmartTooltip>
                        <div className="space-y-2">
                            {THEMES.map((theme) => (
                                <ThemeRow 
                                key={theme.id}
                                theme={theme}
                                isSelected={selectedThemeId === theme.id}
                                onSelect={() => {
                                    setSelectedThemeId(theme.id);
                                }}
                                />
                            ))}
                        </div>
                    </div>
                    
                    {/* Background Options */}
                    <div className="space-y-3">
                        <SmartTooltip 
                            id="bg-style" 
                            title="Background Style" 
                            description="Choose how neutral colors (backgrounds, cards) interact." 
                            tip="'Immersive' tints the background with your primary color."
                        >
                            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-help w-fit">Background Style</Label>
                        </SmartTooltip>
                        <div className="grid grid-cols-3 gap-2">
                            {backgroundOptions.map((bg, idx) => {
                                const palette = isDarkMode ? bg.dark : bg.light;
                                const isActive = selectedBgIndex === idx;
                                return (
                                    <div 
                                        key={idx}
                                        onClick={() => setSelectedBgIndex(idx)}
                                        className={cn(
                                            "cursor-pointer rounded-lg border-2 p-2 flex flex-col items-center gap-2 transition-all hover:bg-muted/50",
                                            isActive ? "border-primary bg-primary/5" : "border-transparent bg-muted/20"
                                        )}
                                    >
                                        <div className="w-full aspect-square rounded-md shadow-sm border flex flex-col overflow-hidden">
                                            <div className="flex-1" style={{ backgroundColor: palette.background }} />
                                            <div className="h-1/3 w-full flex">
                                                <div className="h-full w-1/2" style={{ backgroundColor: palette.muted }} />
                                                <div className="h-full w-1/2" style={{ backgroundColor: palette.card }} />
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-medium text-center truncate w-full">{bg.name}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
             </TabsContent>

             <TabsContent value="global" className="flex-1 overflow-y-auto px-6 pb-6 space-y-6 mt-0">
                 {/* Layout Control */}
                 <div className="space-y-4">
                     <h3 className="font-semibold text-sm">Layout & Spacing</h3>
                     
                     {/* Padding Control */}
                     <div className="space-y-3">
                         <div className="flex items-center justify-between">
                            <SmartTooltip 
                                id="global-padding" 
                                title="Global Padding" 
                                description="Adjusts the base spacing unit for the entire application." 
                                tip="Larger padding creates a more spacious, modern feel."
                            >
                                <Label className="flex items-center gap-2 cursor-help">
                                    <MoveHorizontal className="h-4 w-4 text-muted-foreground" />
                                    Global Padding
                                </Label>
                            </SmartTooltip>
                            <span className="text-xs text-muted-foreground font-mono">{globalPadding}rem</span>
                         </div>
                         <Slider 
                            value={[globalPadding]} 
                            min={0} 
                            max={6} 
                            step={0.5} 
                            onValueChange={([val]) => setGlobalPadding(val)}
                         />
                     </div>

                     {/* Max Width Control */}
                     <div className="space-y-3">
                         <div className="flex items-center justify-between">
                            <SmartTooltip 
                                id="max-width" 
                                title="Container Max Width" 
                                description="Sets the maximum width of the main content area." 
                                tip="'Medium' (1280px) is standard for most laptops."
                            >
                                <Label className="flex items-center gap-2 cursor-help">
                                    <Maximize className="h-4 w-4 text-muted-foreground" />
                                    Max Width
                                </Label>
                            </SmartTooltip>
                            <span className="text-xs text-muted-foreground font-mono capitalize">{maxWidthPreset}</span>
                         </div>
                         <RadioGroup 
                             defaultValue="medium" 
                             value={maxWidthPreset} 
                             onValueChange={(v) => setMaxWidthPreset(v as any)}
                             className="grid grid-cols-3 gap-2"
                         >
                            <div>
                                <RadioGroupItem value="small" id="mw-small" className="peer sr-only" />
                                <Label
                                htmlFor="mw-small"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-2 hover:bg-muted hover:text-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer text-xs"
                                >
                                Small
                                </Label>
                            </div>
                            <div>
                                <RadioGroupItem value="medium" id="mw-medium" className="peer sr-only" />
                                <Label
                                htmlFor="mw-medium"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-2 hover:bg-muted hover:text-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer text-xs"
                                >
                                Medium
                                </Label>
                            </div>
                            <div>
                                <RadioGroupItem value="large" id="mw-large" className="peer sr-only" />
                                <Label
                                htmlFor="mw-large"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-2 hover:bg-muted hover:text-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer text-xs"
                                >
                                Loose
                                </Label>
                            </div>
                         </RadioGroup>
                     </div>
                 </div>

                 <div className="h-px bg-border" />

                 {/* Radius Control */}
                 <div className="space-y-3">
                     <div className="flex items-center justify-between">
                        <SmartTooltip 
                            id="border-radius" 
                            title="Border Radius" 
                            description="Controls the roundness of buttons, cards, and inputs." 
                            tip="0.5rem is the industry standard (Shadcn default)."
                        >
                            <Label className="flex items-center gap-2 cursor-help">
                                <Scaling className="h-4 w-4 text-muted-foreground" />
                                Border Radius
                            </Label>
                        </SmartTooltip>
                        <span className="text-xs text-muted-foreground font-mono">{radius}rem</span>
                     </div>
                     <Slider 
                        value={[radius]} 
                        min={0} 
                        max={2} 
                        step={0.1} 
                        onValueChange={([val]) => setRadius(val)}
                     />
                     <div className="flex justify-between text-[10px] text-muted-foreground px-1">
                         <span>Sharp</span>
                         <span>Rounded</span>
                     </div>
                 </div>

                 <div className="h-px bg-border" />

                 {/* Typography Control */}
                 <div className="space-y-3">
                     <div className="flex items-center justify-between">
                        <SmartTooltip 
                            id="base-font" 
                            title="Base Font Size" 
                            description="The root font size (1rem). All other sizes scale from this." 
                            tip="Increase this for better accessibility."
                        >
                            <Label className="flex items-center gap-2 cursor-help">
                                <Type className="h-4 w-4 text-muted-foreground" />
                                Base Font Size
                            </Label>
                        </SmartTooltip>
                        <span className="text-xs text-muted-foreground font-mono">{baseFontSize}px</span>
                     </div>
                     <Slider 
                        value={[baseFontSize]} 
                        min={12} 
                        max={20} 
                        step={1} 
                        onValueChange={([val]) => setBaseFontSize(val)}
                     />
                     <div className="flex justify-between text-[10px] text-muted-foreground px-1">
                         <span>Compact</span>
                         <span>Large</span>
                     </div>
                     <p className="text-xs text-muted-foreground">
                        Scales all typography proportionally.
                     </p>
                 </div>
             </TabsContent>
        </Tabs>

        <div className="p-4 border-t bg-muted/10 space-y-3">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="w-full gap-2">
                        <Code className="h-4 w-4" />
                        View CSS Variables
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-5xl max-h-[85vh] overflow-hidden flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Theme Configuration</DialogTitle>
                        <DialogDescription>
                            Export your theme or view the logic behind the system.
                        </DialogDescription>
                    </DialogHeader>
                    
                    <Tabs defaultValue="css" className="w-full mt-4 flex-1 flex flex-col overflow-hidden">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="css">CSS Variables</TabsTrigger>
                            <TabsTrigger value="logic">Contrast Logic</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="css" className="mt-4 flex-1 overflow-hidden">
                            <div className="relative rounded-md bg-zinc-950 p-4 h-full">
                                <Button 
                                    size="icon" 
                                    variant="ghost" 
                                    className="absolute right-4 top-4 h-6 w-6 text-zinc-400 hover:text-white hover:bg-zinc-800 z-10"
                                    onClick={() => copyToClipboard(getCssCode())}
                                >
                                     <Copy className="h-3 w-3" />
                                </Button>
                                <pre className="overflow-auto text-xs font-mono text-zinc-50 p-2 h-[calc(85vh-240px)] max-h-[600px]">
                                    <code>{getCssCode()}</code>
                                </pre>
                            </div>
                        </TabsContent>
                        
                        <TabsContent value="logic" className="mt-4 flex-1 overflow-auto">
                            <div className="space-y-4 pb-4">
                                <div className="p-4 bg-muted/50 rounded-lg border text-sm text-muted-foreground flex flex-wrap gap-2 items-start">
                                    <p className="flex-1 min-w-[300px]">
                                        This system uses the <strong>YIQ color space</strong> formula to automatically determine whether text should be black or white based on the background color's brightness.
                                    </p>
                                </div>
                                <div className="relative rounded-md bg-zinc-950 p-4">
                                    <Button 
                                        size="icon" 
                                        variant="ghost" 
                                        className="absolute right-4 top-4 h-6 w-6 text-zinc-400 hover:text-white hover:bg-zinc-800 z-10"
                                        onClick={() => copyToClipboard(CONTRAST_LOGIC_CODE)}
                                    >
                                         <Copy className="h-3 w-3" />
                                    </Button>
                                    <pre className="overflow-auto text-xs font-mono text-zinc-50 p-2 h-[calc(85vh-340px)] max-h-[500px]">
                                        <code>{CONTRAST_LOGIC_CODE}</code>
                                    </pre>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </DialogContent>
            </Dialog>
        </div>
      </aside>

      {/* Right Panel: Live Preview */}
      <main className="flex-1 bg-muted overflow-hidden relative flex flex-col">
        
        {/* Toolbar */}
        <div className="h-12 bg-card flex items-center justify-center gap-2 px-4 shrink-0">
             <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-md">
                 <Button 
                    variant={previewWidth === "375px" ? "secondary" : "ghost"} 
                    size="icon" 
                    className="h-7 w-7"
                    onClick={() => setPreviewWidth("375px")}
                 >
                     <Smartphone className="h-4 w-4" />
                 </Button>
                 <Button 
                    variant={previewWidth === "768px" ? "secondary" : "ghost"} 
                    size="icon" 
                    className="h-7 w-7"
                    onClick={() => setPreviewWidth("768px")}
                 >
                     <Tablet className="h-4 w-4" />
                 </Button>
                 <Button 
                    variant={previewWidth === "100%" ? "secondary" : "ghost"} 
                    size="icon" 
                    className="h-7 w-7"
                    onClick={() => setPreviewWidth("100%")}
                 >
                     <Monitor className="h-4 w-4" />
                 </Button>
             </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-muted/20 p-4 md:p-8 flex justify-center">
            <div 
                className={cn(
                    "bg-background text-foreground shadow-2xl transition-all duration-300 ease-in-out overflow-hidden flex flex-col h-fit min-h-full",
                    previewWidth !== "100%" && "rounded-[2rem] border-[8px] border-zinc-800"
                )}
                style={{ 
                    width: previewWidth,
                    containerType: 'inline-size', // Enable Container Queries for cqw units
                    ...activeVars 
                }}
            >
                {/* Hero Header Section */}
                <section className="bg-background border-none">
                    <HeroVariant2 />
                </section>

                {/* Typography & States Documentation Section */}
                <section className="bg-muted/30" style={{ padding: 'var(--global-padding)' }}>
                    <div className="mx-auto space-y-8" style={{ maxWidth: 'var(--container-max-width)' }}>
                        <div className="flex items-center gap-2 mb-6">
                            <Info className="h-5 w-5 text-primary" />
                            <h2 className="text-xl font-bold">Design Tokens & States</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Surface Colors</h3>
                                <div className="space-y-2">
                                    <PreviewInspector label="Card Background" variable="--card" value={getVar("--card")} onColorChange={(v) => handleColorChange("--card", v)}>
                                        <div className="p-4 rounded-lg bg-card text-card-foreground shadow-sm flex items-center justify-between">
                                            <span className="font-medium">Card Component</span>
                                            <span className="text-xs text-muted-foreground">--card</span>
                                        </div>
                                    </PreviewInspector>
                                    
                                    <PreviewInspector label="Muted Background" variable="--muted" value={getVar("--muted")} onColorChange={(v) => handleColorChange("--muted", v)}>
                                        <div className="p-4 rounded-lg bg-muted text-muted-foreground flex items-center justify-between">
                                            <span className="font-medium">Muted Area</span>
                                            <span className="text-xs">--muted</span>
                                        </div>
                                    </PreviewInspector>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Interactive States</h3>
                                <div className="space-y-2">
                                    <PreviewInspector label="Destructive Action" variable="--destructive" value={getVar("--destructive")} onColorChange={(v) => handleColorChange("--destructive", v)}>
                                        <Button variant="destructive" className="w-full justify-between hover:bg-[var(--destructive-hover)] hover:text-[var(--destructive-hover-foreground)]">
                                            <span>Delete Account</span>
                                            <span className="text-xs opacity-80">--destructive</span>
                                        </Button>
                                    </PreviewInspector>
                                    
                                    <PreviewInspector label="Outline Input" variable="--input" value={getVar("--input")} onColorChange={(v) => handleColorChange("--input", v)}>
                                        <Input placeholder="Type something..." className="bg-input-background" />
                                    </PreviewInspector>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Content Layout Section */}
                <section className="bg-background flex-1" style={{ padding: 'var(--global-padding)' }}>
                     <div className="mx-auto" style={{ maxWidth: 'var(--container-max-width)' }}>
                        <div className="flex items-center gap-2 mb-6">
                            <Palette className="h-5 w-5 text-primary" />
                            <h2 className="text-xl font-bold">Content Components</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                            {[1, 2, 3].map((i) => (
                                <Card key={i} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-200">
                                    <div className="h-32 bg-muted relative group">
                                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground opacity-20 text-4xl font-bold select-none">
                                            IMG
                                        </div>
                                    </div>
                                    <div className="p-4 space-y-2">
                                        <div className="h-4 w-2/3 bg-muted rounded animate-pulse" style={{ animationDuration: '2s' }} />
                                        <div className="h-3 w-full bg-muted/50 rounded" />
                                        <div className="h-3 w-5/6 bg-muted/50 rounded" />
                                    </div>
                                </Card>
                            ))}
                        </div>
                     </div>
                </section>

                {/* Developer Documentation Section */}
                <section className="bg-background border-t border-border" style={{ padding: 'var(--global-padding)' }}>
                     <div className="mx-auto space-y-8" style={{ maxWidth: 'var(--container-max-width)' }}>
                        <div className="flex items-center gap-2 mb-2">
                            <Code className="h-6 w-6 text-primary" />
                            <h2 className="text-2xl font-bold tracking-tight">Developer Integration</h2>
                        </div>
                        <p className="text-muted-foreground max-w-2xl text-lg">
                            Automated setup tools and configurations to export this design system to your project.
                        </p>
                        
                        <Tabs defaultValue="quickstart" className="mt-8">
                            <TabsList className="flex flex-wrap w-full h-auto p-1">
                                <TabsTrigger value="quickstart" className="flex-1 min-w-[100px]">Quick Start</TabsTrigger>
                                <TabsTrigger value="config" className="flex-1 min-w-[80px]">Config</TabsTrigger>
                                <TabsTrigger value="vanilla" className="flex-1 min-w-[80px]">Logic</TabsTrigger>
                                <TabsTrigger value="components" className="flex-1 min-w-[100px]">Blocks</TabsTrigger>
                                <TabsTrigger value="files" className="flex-1 min-w-[80px]">File Tree</TabsTrigger>
                            </TabsList>

                            {/* TAB 1: QUICK START */}
                            <TabsContent value="quickstart" className="space-y-6 mt-6">
                                <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold flex items-center gap-2">
                                            <Terminal className="h-5 w-5 text-primary" />
                                            Automated Setup
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Run this script to automatically scaffold your project with the necessary dependencies and file structure.
                                        </p>
                                        <CodeHighlighter code={generateSetupScript()} language="bash" />
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold flex items-center gap-2">
                                            <Package className="h-5 w-5 text-primary" />
                                            Manual Installation
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Prefer manual control? Install the core dependencies required for the design system.
                                        </p>
                                        <CodeHighlighter code="npm install tailwindcss-animate class-variance-authority clsx tailwind-merge lucide-react" language="bash" />
                                    </div>
                                </div>
                            </TabsContent>

                            {/* TAB 2: CONFIGURATION */}
                            <TabsContent value="config" className="space-y-6 mt-6">
                                <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                                <MoveHorizontal className="h-5 w-5 text-primary" />
                                                One-Click Theme Loader
                                            </h3>
                                            <Badge variant="outline" className="text-xs">Recommended</Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            Immediately apply the current theme configuration (colors, spacing, typography) to your project without needing a CSS file.
                                        </p>
                                        <CodeHighlighter code={generateAutoSetupScript()} language="javascript" />
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold flex items-center gap-2">
                                            <FileCode className="h-5 w-5 text-primary" />
                                            tailwind.config.ts
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            This config maps your CSS variables to Tailwind utility classes.
                                        </p>
                                        <CodeHighlighter code={generateTailwindConfig()} language="typescript" />
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold flex items-center gap-2">
                                            <Palette className="h-5 w-5 text-primary" />
                                            globals.css
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Your active theme variables. Paste this into your main CSS file.
                                        </p>
                                        <CodeHighlighter code={getCssCode()} language="css" />
                                    </div>
                                </div>
                            </TabsContent>

                            {/* TAB 3: VANILLA JS */}
                            <TabsContent value="vanilla" className="space-y-6 mt-6">
                                <div className="space-y-4 max-w-4xl mx-auto">
                                    <h3 className="text-lg font-semibold flex items-center gap-2">
                                        <LayoutTemplate className="h-5 w-5 text-primary" />
                                        Framework Agnostic Implementation
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Use this module to implement the theme engine in any environment (HTML/PHP/Rails/etc).
                                    </p>
                                    <CodeHighlighter code={VANILLA_JS_IMPLEMENTATION} language="javascript" />
                                </div>
                            </TabsContent>

                            {/* TAB 4: COMPONENTS */}
                            <TabsContent value="components" className="space-y-6 mt-6">
                                <div className="space-y-4 max-w-4xl mx-auto">
                                    <h3 className="text-lg font-semibold flex items-center gap-2">
                                        <Package className="h-5 w-5 text-primary" />
                                        Building Blocks
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Framework-agnostic implementations of the application's core UI blocks (Hero Sections).
                                    </p>
                                    <CodeHighlighter code={VANILLA_BLOCKS_IMPLEMENTATION} language="javascript" />
                                </div>
                            </TabsContent>

                            {/* TAB 5: FILE TREE */}
                            <TabsContent value="files" className="space-y-6 mt-6">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">Recommended Project Structure</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Organize your design system files as follows for maximum maintainability.
                                    </p>
                                    <div className="rounded-lg border bg-card p-6 font-mono text-sm">
                                        <ul className="space-y-2">
                                            <li className="flex items-center gap-2 text-muted-foreground">
                                                <span className="text-primary">src/</span>
                                            </li>
                                            <li className="flex items-center gap-2 pl-4">
                                                <span className="text-muted-foreground">├──</span>
                                                <span className="text-foreground">app/</span>
                                            </li>
                                            <li className="flex items-center gap-2 pl-8">
                                                <span className="text-muted-foreground">├──</span>
                                                <span className="text-blue-500">globals.css</span>
                                                <span className="text-xs text-muted-foreground ml-2">← Paste CSS Variables here</span>
                                            </li>
                                            <li className="flex items-center gap-2 pl-8">
                                                <span className="text-muted-foreground">└──</span>
                                                <span className="text-foreground">layout.tsx</span>
                                            </li>
                                            <li className="flex items-center gap-2 pl-4">
                                                <span className="text-muted-foreground">├──</span>
                                                <span className="text-foreground">components/</span>
                                            </li>
                                            <li className="flex items-center gap-2 pl-8">
                                                <span className="text-muted-foreground">├──</span>
                                                <span className="text-foreground">ui/</span>
                                                <span className="text-xs text-muted-foreground ml-2">← Place Shadcn primitives here</span>
                                            </li>
                                            <li className="flex items-center gap-2 pl-8">
                                                <span className="text-muted-foreground">└──</span>
                                                <span className="text-foreground">theme-provider.tsx</span>
                                            </li>
                                            <li className="flex items-center gap-2 pl-4">
                                                <span className="text-muted-foreground">├──</span>
                                                <span className="text-foreground">lib/</span>
                                            </li>
                                            <li className="flex items-center gap-2 pl-8">
                                                <span className="text-muted-foreground">└──</span>
                                                <span className="text-yellow-500">utils.ts</span>
                                                <span className="text-xs text-muted-foreground ml-2">← cn() helper</span>
                                            </li>
                                            <li className="flex items-center gap-2 text-muted-foreground pt-2">
                                                <span className="text-purple-500">tailwind.config.ts</span>
                                                <span className="text-xs text-muted-foreground ml-2">← Paste Config here</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                     </div>
                </section>
                
                <footer className="bg-muted py-8 px-6 text-center text-xs text-muted-foreground">
                    <p>© 2025 Design System. All variables are automatically generated.</p>
                </footer>
            </div>
        </div>
      </main>
    </div>
  );
};
