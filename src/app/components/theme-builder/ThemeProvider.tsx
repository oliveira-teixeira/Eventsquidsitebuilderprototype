import React, { createContext, useContext, useState, ReactNode } from "react";

export interface ThemeConfig {
    themeId: string;
    bgStyleIndex: number;
    isDarkMode: boolean;
    radius: number;
    baseFontSize: number;
    globalPadding: number;
    maxWidth: 'small' | 'medium' | 'large';
    overrides: Record<string, string>;
}

interface ThemeContextType {
  themeStyles: React.CSSProperties;
  setThemeStyles: (styles: React.CSSProperties) => void;
  config: ThemeConfig;
  setConfig: (config: ThemeConfig | ((prev: ThemeConfig) => ThemeConfig)) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const DEFAULT_CONFIG: ThemeConfig = {
    themeId: "blue",
    bgStyleIndex: 0,
    isDarkMode: false,
    radius: 0.5,
    baseFontSize: 16,
    globalPadding: 2,
    maxWidth: 'medium',
    overrides: {}
};

export const ThemeProvider = ({ children, className }: { children: ReactNode, className?: string }) => {
  const [config, setConfig] = useState<ThemeConfig>(DEFAULT_CONFIG);
  
  const [themeStyles, setThemeStyles] = useState<React.CSSProperties>({
      // Default safe fallback
      "--background": "#ffffff",
      "--foreground": "#09090b",
      "--primary": "#18181b",
      "--primary-foreground": "#fafafa",
      "--radius": "0.5rem",
      "--global-padding": "2rem",
      "--container-max-width": "1280px",
  } as React.CSSProperties);

  return (
    <ThemeContext.Provider value={{ themeStyles, setThemeStyles, config, setConfig }}>
      <div style={themeStyles as any} className={`min-h-screen bg-background text-foreground font-sans antialiased transition-colors duration-200 ${className || ''}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
