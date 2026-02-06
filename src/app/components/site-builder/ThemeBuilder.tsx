import React, { useState, createContext, useContext, ReactNode, useEffect, useMemo } from "react";
import { Palette, RotateCcw, Save, Moon, Sun, Info, Play } from "lucide-react";
import { cn } from "../ui/utils";
import { toast } from "sonner";
import { createTheme, themeToCssVars, type CoreColors, type CoreNumbers, type Theme } from "../../../utils/theme-engine";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

// --- Types & Constants ---

export interface ThemeConfig {
  themeId: string;       
  isDarkMode: boolean;
  coreColors: CoreColors;
  coreNumbers: CoreNumbers;
  globalPadding: number;
  baseFontSize: number;
  maxWidth: string;
  animationPreset: 'none' | 'fade' | 'slide-up' | 'scale';
  overrides: Record<string, string>; 
}

const DEFAULT_CORE_COLORS: CoreColors = {
  c1Base: '#ffffff',      // Background
  c2Surface: '#f4f4f5',   // Surface (Zinc 100)
  c3Foreground: '#18181b',// Text (Zinc 900)
  c4Brand: '#2563eb',     // Primary (Blue 600)
  c5Utility: '#71717a',   // Secondary (Zinc 500)
  c6Border: '#e4e4e7',    // Border (Zinc 200)
};

const DEFAULT_CORE_NUMBERS: CoreNumbers = {
  radiusBase: 0.5,
  strokeBase: 1,
  focusRingWidth: 2,
};

const DEFAULT_THEME: ThemeConfig = {
  themeId: 'default',
  isDarkMode: false,
  coreColors: DEFAULT_CORE_COLORS,
  coreNumbers: DEFAULT_CORE_NUMBERS,
  globalPadding: 2,
  baseFontSize: 16,
  maxWidth: 'var(--container-width-lg)',
  animationPreset: 'none',
  overrides: {}
};

// --- Context ---

const ThemeContext = createContext<{
  config: ThemeConfig;
  theme: Theme | null;
  updateConfig: (updates: Partial<ThemeConfig>) => void;
  updateCoreColor: (key: keyof CoreColors, value: string) => void;
  updateCoreNumber: (key: keyof CoreNumbers, value: number) => void;
  resetTheme: () => void;
}>({
  config: DEFAULT_THEME,
  theme: null,
  updateConfig: () => {},
  updateCoreColor: () => {},
  updateCoreNumber: () => {},
  resetTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

// --- Provider ---

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<ThemeConfig>(DEFAULT_THEME);

  // Compute the theme object
  const theme = useMemo(() => {
    try {
      return createTheme(
        config.coreColors,
        config.coreNumbers,
        config.isDarkMode ? 'dark' : 'light'
      );
    } catch (error) {
      console.error('Error creating theme:', error);
      return null;
    }
  }, [config.coreColors, config.coreNumbers, config.isDarkMode]);

  // Apply theme changes to the document root
  useEffect(() => {
    if (!theme) return; // Skip if theme creation failed
    
    try {
      const root = document.documentElement;
      const cssVars = themeToCssVars(theme);
      
      // Apply theme variables to root
      Object.entries(cssVars).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
      
      // Apply extra structural vars
      root.style.setProperty('--global-padding', `${config.globalPadding}rem`);
      root.style.setProperty('--text-base', `${config.baseFontSize}px`);
      root.style.setProperty('--max-width', config.maxWidth);

      // Sync Tailwind 'dark' class
      if (config.isDarkMode) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    } catch (error) {
      console.error('Error applying theme to root:', error);
    }

  }, [theme, config.isDarkMode, config.globalPadding, config.baseFontSize, config.maxWidth]);
  
  const updateConfig = (updates: Partial<ThemeConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const updateCoreColor = (key: keyof CoreColors, value: string) => {
    setConfig(prev => ({
      ...prev,
      coreColors: { ...prev.coreColors, [key]: value }
    }));
  };

  const updateCoreNumber = (key: keyof CoreNumbers, value: number) => {
    setConfig(prev => ({
      ...prev,
      coreNumbers: { ...prev.coreNumbers, [key]: value }
    }));
  };

  const resetTheme = () => {
    setConfig(DEFAULT_THEME);
    toast.success("Theme reset to defaults");
  };

  return (
    <ThemeContext.Provider value={{ config, theme, updateConfig, updateCoreColor, updateCoreNumber, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const generateThemeStyles = (config: ThemeConfig): React.CSSProperties => {
  try {
    const theme = createTheme(
      config.coreColors,
      config.coreNumbers,
      config.isDarkMode ? 'dark' : 'light'
    );
    
    const cssVars = themeToCssVars(theme);
    
    return {
      ...cssVars,
      '--global-padding': `${config.globalPadding}rem`,
      '--text-base': `${config.baseFontSize}px`,
      '--max-width': config.maxWidth,
    } as React.CSSProperties;
  } catch (error) {
    console.error('Error generating theme styles:', error);
    return {} as React.CSSProperties;
  }
};

// --- Builder UI Component ---

const FIXED_LIGHT = {
  c1Base: '#ffffff',
  c2Surface: '#f4f4f5',   // Zinc 100
  c3Foreground: '#18181b',// Zinc 900
  c5Utility: '#71717a',   // Zinc 500
  c6Border: '#e4e4e7',    // Zinc 200
};

const FIXED_DARK = {
  c1Base: '#09090b',      // Zinc 950
  c2Surface: '#18181b',   // Zinc 900
  c3Foreground: '#fafafa',// Zinc 50
  c5Utility: '#a1a1aa',   // Zinc 400
  c6Border: '#27272a',    // Zinc 800
};

const MAX_WIDTH_OPTIONS = [
  { label: "Small (512px)", value: "var(--container-width-xs)" },
  { label: "Medium (768px)", value: "var(--container-width-sm)" },
  { label: "Large (1024px)", value: "var(--container-width-md)" },
  { label: "X-Large (1280px)", value: "var(--container-width-lg)" },
  { label: "2X-Large (1536px)", value: "var(--container-width-xl)" },
];

const ANIMATION_PRESETS = [
  { value: 'none', label: 'None' },
  { value: 'fade', label: 'Fade In' },
  { value: 'slide-up', label: 'Slide Up' },
  { value: 'scale', label: 'Scale In' },
];

export const ThemeBuilder: React.FC = () => {
  const { config, theme, updateConfig, updateCoreColor, updateCoreNumber, resetTheme } = useTheme();

  const setMode = (isDark: boolean) => {
    const fixed = isDark ? FIXED_DARK : FIXED_LIGHT;
    updateConfig({
      isDarkMode: isDark,
      coreColors: {
        ...fixed,
        c4Brand: config.coreColors.c4Brand // Preserve brand choice
      }
    });
  };

  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex items-center justify-between p-4 pb-3 sticky top-0 bg-background z-10 border-b border-border">
        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
          <Palette className="w-4 h-4" /> Theme Engine
        </h3>
        <button onClick={resetTheme} className="text-muted-foreground hover:text-foreground p-1" title="Reset to default">
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="p-4 space-y-5">
        
        {/* Mode Toggle */}
        <div className="flex bg-muted/50 p-1 rounded-lg border border-border">
           <button 
             onClick={() => setMode(false)}
             className={cn("flex-1 py-1.5 text-xs font-medium rounded-md flex items-center justify-center gap-2 transition-all", !config.isDarkMode ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}
           >
             <Sun className="w-3.5 h-3.5" /> Light
           </button>
           <button 
             onClick={() => setMode(true)}
             className={cn("flex-1 py-1.5 text-xs font-medium rounded-md flex items-center justify-center gap-2 transition-all", config.isDarkMode ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}
           >
             <Moon className="w-3.5 h-3.5" /> Dark
           </button>
        </div>

        {/* Core Colors */}
        <div className="space-y-3">
           <label className="text-xs font-medium text-muted-foreground">Core Palette</label>
           
           <ColorInput label="Brand (Accent)" value={config.coreColors.c4Brand} onChange={(v) => updateCoreColor('c4Brand', v)} />
        </div>

        {/* Radius */}
        <div className="space-y-2">
           <div className="flex justify-between">
              <label className="text-xs font-medium text-muted-foreground">Radius Base</label>
              <span className="text-[10px] font-mono opacity-50">{config.coreNumbers.radiusBase}rem</span>
           </div>
           <input 
             type="range" 
             min="0" 
             max="2" 
             step="0.1"
             value={config.coreNumbers.radiusBase}
             onChange={(e) => updateCoreNumber('radiusBase', parseFloat(e.target.value))}
             className="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
           />
        </div>

        {/* Global Padding */}
        <div className="space-y-2">
           <div className="flex justify-between">
              <label className="text-xs font-medium text-muted-foreground">Spacing</label>
              <span className="text-[10px] font-mono opacity-50">{config.globalPadding}rem</span>
           </div>
           <input 
             type="range" 
             min="0.5" 
             max="4" 
             step="0.5"
             value={config.globalPadding}
             onChange={(e) => updateConfig({ globalPadding: parseFloat(e.target.value) })}
             className="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
           />
        </div>

        {/* Max Width */}
        <div className="space-y-2">
           <label className="text-xs font-medium text-muted-foreground">Container Max Width</label>
           <div className="grid grid-cols-1 gap-1">
             {MAX_WIDTH_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => updateConfig({ maxWidth: opt.value })}
                  className={cn(
                    "px-3 py-2 text-xs text-left rounded-md border transition-all",
                    config.maxWidth === opt.value 
                      ? "bg-primary/10 border-primary text-primary font-medium" 
                      : "bg-background border-border text-muted-foreground hover:bg-muted"
                  )}
                >
                  {opt.label}
                </button>
             ))}
           </div>
        </div>

        {/* Base Font Size */}
        <div className="space-y-2">
           <div className="flex justify-between">
              <label className="text-xs font-medium text-muted-foreground">Base Font Size</label>
              <span className="text-[10px] font-mono opacity-50">{config.baseFontSize}px</span>
           </div>
           <input 
             type="range" 
             min="12" 
             max="20" 
             step="1"
             value={config.baseFontSize}
             onChange={(e) => updateConfig({ baseFontSize: parseFloat(e.target.value) })}
             className="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
           />
        </div>

        {/* Animations */}
        <div className="space-y-2">
           <label className="text-xs font-medium text-muted-foreground flex items-center gap-2">
             <Play className="w-3.5 h-3.5" /> Text Intro Animations
           </label>
           <div className="grid grid-cols-2 gap-1">
             {ANIMATION_PRESETS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => updateConfig({ animationPreset: opt.value as any })}
                  className={cn(
                    "px-3 py-2 text-xs text-left rounded-md border transition-all",
                    config.animationPreset === opt.value 
                      ? "bg-primary/10 border-primary text-primary font-medium" 
                      : "bg-background border-border text-muted-foreground hover:bg-muted"
                  )}
                >
                  {opt.label}
                </button>
             ))}
           </div>
        </div>

        {/* Contrast Report */}
        {theme && (
          <Popover>
            <PopoverTrigger asChild>
              <button className="w-full py-2 bg-secondary text-secondary-foreground text-xs font-medium rounded-md hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2">
                <Info className="w-3.5 h-3.5" /> View Contrast Report
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 max-h-[400px] overflow-auto p-4">
              <h4 className="font-semibold mb-2">WCAG Contrast Report</h4>
              <div className="space-y-2">
                {theme.meta.report.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs p-2 rounded border border-border">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-muted-foreground">{item.fg} on {item.bg}</div>
                    </div>
                    <div className={cn("px-2 py-1 rounded font-bold", item.pass ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100" : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100")}>
                      {item.ratio.toFixed(2)}:1
                    </div>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        )}

      </div>

      <div className="px-4 pt-4 pb-4 border-t border-border">
         <button 
           onClick={() => toast.success("Theme preset saved")}
           className="w-full py-2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
         >
           <Save className="w-3.5 h-3.5" /> Save Preset
         </button>
      </div>
    </div>
  );
};

const ColorInput = ({ label, value, onChange }: { label: string, value: string, onChange: (val: string) => void }) => (
  <div className="flex items-center gap-2">
    <div className="h-8 w-8 rounded-md border border-border overflow-hidden shrink-0 relative shadow-sm">
      <input 
        type="color" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] cursor-pointer p-0 border-0"
      />
    </div>
    <div className="flex-1">
      <div className="text-[10px] font-medium text-muted-foreground uppercase">{label}</div>
      <input 
         type="text" 
         value={value}
         onChange={(e) => onChange(e.target.value)}
         className="w-full bg-transparent text-xs font-mono focus:outline-none"
      />
    </div>
  </div>
);
