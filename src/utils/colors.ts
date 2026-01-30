
// Utility functions for color manipulation and theme logic

/**
 * Converts a Hex color to RGB object
 */
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

/**
 * Converts RGB object to Hex string
 */
export const rgbToHex = (r: number, g: number, b: number): string => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

/**
 * Mixes two colors together with a weight (0-1)
 * weight = 0 is all color1, weight = 1 is all color2
 */
export const mixColor = (color1: string, color2: string, weight: number): string => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return color1;

  const w = Math.min(Math.max(weight, 0), 1);
  const r = Math.round(rgb1.r * (1 - w) + rgb2.r * w);
  const g = Math.round(rgb1.g * (1 - w) + rgb2.g * w);
  const b = Math.round(rgb1.b * (1 - w) + rgb2.b * w);

  return rgbToHex(r, g, b);
};

/**
 * Adjusts the brightness of a hex color
 * amount > 0 lightens, amount < 0 darkens
 */
export const adjustColor = (hex: string, amount: number): string => {
    return mixColor(hex, amount > 0 ? '#ffffff' : '#000000', Math.abs(amount));
};

/**
 * Calculates optimal text color (black/white) based on background brightness (YIQ)
 */
export const getContrastColor = (hex: string): string => {
  // Clean and validate hex
  let cleanHex = hex.replace('#', '').trim();
  if (cleanHex.length === 3) cleanHex = cleanHex.split('').map(c => c + c).join('');
  
  // Parse RGB
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  
  if (isNaN(r) || isNaN(g) || isNaN(b)) return '#000000';

  // YIQ Equation: ((R*299)+(G*587)+(B*114))/1000
  // Returns black for bright backgrounds, white for dark ones.
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? '#09090b' : '#ffffff';
};

/**
 * Generates a full palette of tinted neutrals based on a brand color
 */
export const generateTintedNeutrals = (primaryHex: string, isDark: boolean = false) => {
    const baseGray = isDark ? '#000000' : '#ffffff';
    const contrast = isDark ? '#ffffff' : '#000000';
    
    // We mix the primary color into the neutral gray to create a tinted scale
    // 50 (lightest) to 950 (darkest) logic usually, but here we just return key semantic tokens
    
    return {
        background: isDark ? mixColor('#0a0a0a', primaryHex, 0.05) : '#ffffff',
        foreground: isDark ? '#fafafa' : '#0a0a0a',
        card: isDark ? mixColor('#0a0a0a', primaryHex, 0.05) : '#ffffff',
        cardForeground: isDark ? '#fafafa' : '#0a0a0a',
        popover: isDark ? mixColor('#0a0a0a', primaryHex, 0.05) : '#ffffff',
        popoverForeground: isDark ? '#fafafa' : '#0a0a0a',
        primary: primaryHex,
        primaryForeground: getContrastColor(primaryHex),
        secondary: isDark ? mixColor('#262626', primaryHex, 0.1) : mixColor('#f5f5f5', primaryHex, 0.05),
        secondaryForeground: getContrastColor(isDark ? mixColor('#262626', primaryHex, 0.1) : mixColor('#f5f5f5', primaryHex, 0.05)),
        muted: isDark ? mixColor('#262626', primaryHex, 0.1) : mixColor('#f5f5f5', primaryHex, 0.05),
        mutedForeground: isDark ? mixColor('#a3a3a3', primaryHex, 0.1) : mixColor('#737373', primaryHex, 0.1),
        accent: primaryHex,
        accentForeground: getContrastColor(primaryHex),
        destructive: '#ef4444',
        destructiveForeground: '#ffffff',
        border: isDark ? mixColor('#262626', primaryHex, 0.2) : mixColor('#e5e5e5', primaryHex, 0.1),
        input: isDark ? mixColor('#262626', primaryHex, 0.2) : mixColor('#e5e5e5', primaryHex, 0.1),
        ring: isDark ? mixColor('#d4d4d4', primaryHex, 0.3) : mixColor('#171717', primaryHex, 0.3),
    };
};
