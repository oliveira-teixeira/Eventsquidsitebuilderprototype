import {
  formatHex,
  wcagContrast,
  modeOklch,
  useMode,
  modeRgb,
  parse,
  clampChroma,
  converter
} from 'culori';

// Initialize culori modes safely
try {
  useMode(modeOklch);
  useMode(modeRgb);
} catch (error) {
  console.error('Error initializing culori modes:', error);
}

// --- Types ---

export type CoreColors = {
  c1Base: string;      // Background
  c2Surface: string;   // Surface / Card
  c3Foreground: string;// Text
  c4Brand: string;     // Primary Accent
  c5Utility: string;   // Secondary / Utility
  c6Border: string;    // Border
};

export type Mode = 'light' | 'dark';

export type CoreNumbers = {
  radiusBase: number;
  strokeBase: number;
  focusRingWidth: number;
};

export type ContrastReportItem = {
  name: string;
  fg: string;
  bg: string;
  ratio: number;
  required: number;
  pass: boolean;
};

export type Theme = {
  mode: Mode;
  bg: {
    primary: string;
    surface: string;
    card: string;
    elevated: string;
    sunken: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
    inverse: string;
    onAccent: string;
    onUtility: string;
    onSurface: string;
    link: string;
  };
  accent: {
    primary: string;
    hover: string;
    pressed: string;
    subtleBg: string;
    subtleText: string;
  };
  utility: {
    primary: string;
    subtleBg: string;
    subtleText: string;
    on: string;
  };
  stroke: {
    default: string;
    subtle: string;
    strong: string;
    focus: string;
  };
  overlay: {
    elevation1: string;
    elevation2: string;
    elevation3: string;
    hover: string;
    pressed: string;
    selected: string;
  };
  dataViz: {
    chartBg: string;
    grid: string;
    axis: string;
    tooltipBg: string;
    tooltipText: string;
    series: string[];
    thresholdGood: string;
    thresholdWarning: string;
    thresholdBad: string;
  };
  numbers: {
    radius: number;
    stroke: number;
    focusRing: number;
  };
  meta: {
    report: ContrastReportItem[];
  };
};

// --- Constants ---

const WCAG_TEXT_NORMAL = 4.5;
const WCAG_TEXT_LARGE = 3.0;
const WCAG_UI = 3.0;
const WCAG_FOCUS = 3.0;
const ABS_WHITE = '#FFFFFF';
const ABS_BLACK = '#000000';

// --- Color Utilities ---

const toOklch = converter('oklch');
const toRgb = converter('rgb');

function safeToOklch(color: string) {
  try {
    return toOklch(color);
  } catch {
    return undefined;
  }
}

function normalizeColor(hex: string): string {
  try {
    const parsed = parse(hex);
    return parsed ? formatHex(parsed) : ABS_BLACK;
  } catch {
    return ABS_BLACK;
  }
}

function contrast(fgHex: string, bgHex: string): number {
  try {
    return wcagContrast(fgHex, bgHex);
  } catch {
    return 1;
  }
}

function pickOnColor(bgHex: string, blackHex: string = ABS_BLACK, whiteHex: string = ABS_WHITE): string {
  const cBlack = contrast(blackHex, bgHex);
  const cWhite = contrast(whiteHex, bgHex);
  return cBlack >= cWhite ? blackHex : whiteHex;
}

function alphaBlend(fgHex: string, bgHex: string, alpha: number): string {
  // Simple alpha blending: out = fg * alpha + bg * (1 - alpha)
  try {
    const fg = parse(fgHex);
    const bg = parse(bgHex);
    if (!fg || !bg) return bgHex;

    // culori parse returns object with r,g,b in 0..1 (if 'rgb' mode, but parse returns the closest match or specific mode)
    // Let's ensure we work in RGB
    const fgRgb = toRgb(fg);
    const bgRgb = toRgb(bg);
    
    if (!fgRgb || !bgRgb) return bgHex;

    const out = {
      mode: 'rgb',
      r: fgRgb.r * alpha + bgRgb.r * (1 - alpha),
      g: fgRgb.g * alpha + bgRgb.g * (1 - alpha),
      b: fgRgb.b * alpha + bgRgb.b * (1 - alpha),
    };
    return formatHex(out);
  } catch {
    return bgHex;
  }
}

function adjustLightnessUntil(fgHex: string, bgHex: string, required: number): string {
  let current = safeToOklch(fgHex);
  if (!current) return fgHex;
  
  // Try keeping hue/chroma, just shift lightness
  // We search up to 40 steps, +/- 0.02
  for (let i = 0; i <= 40; i++) {
     // Try lighter
     const lUp = Math.min(1, current.l + i * 0.02);
     const cUp = { ...current, l: lUp };
     const hexUp = formatHex(cUp);
     if (contrast(hexUp, bgHex) >= required) return hexUp;

     // Try darker
     const lDown = Math.max(0, current.l - i * 0.02);
     const cDown = { ...current, l: lDown };
     const hexDown = formatHex(cDown);
     if (contrast(hexDown, bgHex) >= required) return hexDown;
  }
  
  // Fallback if adjustment fails (e.g. extremely low contrast color on mid-gray)
  // Usually pickOnColor handles the text case, this is generic
  return pickOnColor(bgHex);
}

function ensureTextContrast(textHex: string, bgHex: string, required: number, mode: Mode): string {
  const currentRatio = contrast(textHex, bgHex);
  if (currentRatio >= required) return textHex;

  // Try pure black or white first
  const on = pickOnColor(bgHex);
  if (contrast(on, bgHex) >= required) {
    // If original failed but B/W passes, try to adjust original to pass, otherwise fall back to B/W
    const adjusted = adjustLightnessUntil(textHex, bgHex, required);
    if (contrast(adjusted, bgHex) >= required) return adjusted;
    return on;
  }
  
  // If B/W also fails (unlikely unless background is weirdly mid-gray or transparent?), adjust
  return adjustLightnessUntil(textHex, bgHex, required);
}

function ensureUiContrast(fgHex: string, bgHex: string, required: number, mode: Mode): string {
  if (contrast(fgHex, bgHex) >= required) return fgHex;
  return adjustLightnessUntil(fgHex, bgHex, required);
}

function ensureFocusRing(accentHex: string, bgPrimary: string, bgSurface: string, required: number, mode: Mode): string {
  let ring = accentHex;
  ring = adjustLightnessUntil(ring, bgPrimary, required);
  ring = adjustLightnessUntil(ring, bgSurface, required);
  return ring;
}

function buildMutedText(primaryTextHex: string, bgHex: string, required: number, mode: Mode): string {
  const o = safeToOklch(primaryTextHex);
  if (!o) return primaryTextHex;
  
  // Reduce chroma and lightness/opacity visually via Oklch
  // The spec says: chroma * 0.6
  const mutedOklch = { ...o, c: o.c * 0.6 };
  const mutedHex = formatHex(mutedOklch);
  return ensureTextContrast(mutedHex, bgHex, required, mode);
}

function tweakLightness(hex: string, mode: Mode, state: 'hover' | 'pressed'): string {
  const o = safeToOklch(hex);
  if (!o) return hex;
  
  // spec: hover -> light: -0.04, dark: +0.04
  //       pressed -> light: -0.08, dark: +0.08
  let delta = 0;
  if (state === 'hover') {
    delta = mode === 'light' ? -0.04 : 0.04;
  } else {
    delta = mode === 'light' ? -0.08 : 0.08;
  }
  
  const newL = Math.max(0, Math.min(1, o.l + delta));
  return formatHex({ ...o, l: newL });
}

function applyOverlay(bgHex: string, overlayHex: string): string {
   // Assuming overlayHex includes alpha or we blend. 
   return overlayHex;
}

function buildElevationOverlay(bgHex: string, textHex: string, alpha: number): string {
  // Use text color as the "tint" for elevation (common in dark modes, or shadow-like in light)
  return alphaBlend(textHex, bgHex, alpha);
}

function buildDataViz(accentHex: string, utilityHex: string, bgHex: string, textHex: string, mode: Mode) {
  // 5.2 Chart series generation
  const seed = safeToOklch(accentHex) || { l: 0.5, c: 0.1, h: 0 };
  const count = 6;
  const series: string[] = [];
  
  for (let i = 0; i < count; i++) {
    const h = (seed.h !== undefined ? seed.h + i * (360 / count) : 0) % 360;
    const c = Math.max(0.04, Math.min(0.20, seed.c * 0.85)); // clamp chroma
    const l = Math.max(0.35, Math.min(0.75, seed.l)); // clamp lightness
    let col = formatHex({ mode: 'oklch', l, c, h });
    // ensure 3:1 against chart bg
    col = adjustLightnessUntil(col, bgHex, 3.0);
    series.push(col);
  }

  return {
    chartBg: bgHex,
    grid: alphaBlend(textHex, bgHex, 0.1),
    axis: alphaBlend(textHex, bgHex, 0.4),
    tooltipBg: mode === 'light' ? ABS_BLACK : ABS_WHITE,
    tooltipText: mode === 'light' ? ABS_WHITE : ABS_BLACK,
    series,
    thresholdGood: '#10B981', // emerald-500
    thresholdWarning: '#F59E0B', // amber-500
    thresholdBad: '#EF4444', // red-500
  };
}

// --- Main Engine ---

export function createTheme(core: CoreColors, numbers: CoreNumbers, mode: Mode): Theme {
  const bgPrimary = normalizeColor(core.c1Base);
  const bgSurface = normalizeColor(core.c2Surface);
  
  const textPrimary = ensureTextContrast(core.c3Foreground, bgPrimary, WCAG_TEXT_NORMAL, mode);
  const textOnSurface = ensureTextContrast(core.c3Foreground, bgSurface, WCAG_TEXT_NORMAL, mode);
  
  const textSecondary = buildMutedText(textPrimary, bgPrimary, 3.0, mode);
  const textMuted = buildMutedText(textPrimary, bgPrimary, 2.2, mode);
  
  const accentPrimary = ensureUiContrast(core.c4Brand, bgPrimary, WCAG_UI, mode);
  // Ensure contrast for text ON the accent
  const onAccent = ensureTextContrast(pickOnColor(accentPrimary), accentPrimary, WCAG_TEXT_NORMAL, mode);
  
  const utilityPrimary = ensureUiContrast(core.c5Utility, bgPrimary, WCAG_UI, mode);
  const onUtility = ensureTextContrast(pickOnColor(utilityPrimary), utilityPrimary, WCAG_TEXT_NORMAL, mode);
  
  // Use explicit border color or fallback to calculated
  const borderBase = core.c6Border ? normalizeColor(core.c6Border) : alphaBlend(textOnSurface, bgSurface, 0.20);
  const strokeDefault = borderBase;
  const strokeSubtle = alphaBlend(borderBase, bgSurface, 0.6); // Lighter version of border
  const strokeStrong = alphaBlend(textOnSurface, bgSurface, 0.35);
  
  const focus = ensureFocusRing(accentPrimary, bgPrimary, bgSurface, WCAG_FOCUS, mode);

  const overlayE1 = buildElevationOverlay(bgSurface, textOnSurface, 0.03);
  const overlayE2 = buildElevationOverlay(bgSurface, textOnSurface, 0.06);
  const overlayE3 = buildElevationOverlay(bgSurface, textOnSurface, 0.10);
  
  const hoverOverlay = overlayE1;
  const pressedOverlay = overlayE2;
  const selectedOverlay = alphaBlend(accentPrimary, bgSurface, 0.08);
  
  const accentHover = tweakLightness(accentPrimary, mode, 'hover');
  const accentPressed = tweakLightness(accentPrimary, mode, 'pressed');
  const accentSubtleBg = alphaBlend(accentPrimary, bgSurface, mode === 'light' ? 0.10 : 0.18);
  const accentSubtleText = ensureTextContrast(accentPrimary, accentSubtleBg, WCAG_TEXT_NORMAL, mode);
  
  const utilitySubtleBg = alphaBlend(utilityPrimary, bgSurface, mode === 'light' ? 0.10 : 0.18);
  const utilitySubtleText = ensureTextContrast(utilityPrimary, utilitySubtleBg, WCAG_TEXT_NORMAL, mode);
  
  const inverseText = ensureTextContrast(textPrimary, mode === 'light' ? ABS_BLACK : ABS_WHITE, WCAG_TEXT_NORMAL, mode);
  const link = accentPrimary;
  
  const card = bgSurface;
  const elevated = applyOverlay(bgSurface, overlayE1);
  const sunken = applyOverlay(bgSurface, alphaBlend(textOnSurface, bgSurface, mode === 'light' ? 0.02 : 0.06));
  
  const dataViz = buildDataViz(accentPrimary, utilityPrimary, bgSurface, textOnSurface, mode);

  // Report
  const report: ContrastReportItem[] = [
    { name: 'text.primary on bg.primary', fg: textPrimary, bg: bgPrimary, ratio: contrast(textPrimary, bgPrimary), required: WCAG_TEXT_NORMAL, pass: contrast(textPrimary, bgPrimary) >= WCAG_TEXT_NORMAL },
    { name: 'text.onSurface on bg.surface', fg: textOnSurface, bg: bgSurface, ratio: contrast(textOnSurface, bgSurface), required: WCAG_TEXT_NORMAL, pass: contrast(textOnSurface, bgSurface) >= WCAG_TEXT_NORMAL },
    { name: 'accent.primary on bg.primary', fg: accentPrimary, bg: bgPrimary, ratio: contrast(accentPrimary, bgPrimary), required: WCAG_UI, pass: contrast(accentPrimary, bgPrimary) >= WCAG_UI },
    { name: 'text.onAccent on accent.primary', fg: onAccent, bg: accentPrimary, ratio: contrast(onAccent, accentPrimary), required: WCAG_TEXT_NORMAL, pass: contrast(onAccent, accentPrimary) >= WCAG_TEXT_NORMAL },
  ];

  return {
    mode,
    bg: { primary: bgPrimary, surface: bgSurface, card, elevated, sunken },
    text: { primary: textPrimary, secondary: textSecondary, muted: textMuted, inverse: inverseText, onAccent, onUtility, onSurface: textOnSurface, link },
    accent: { primary: accentPrimary, hover: accentHover, pressed: accentPressed, subtleBg: accentSubtleBg, subtleText: accentSubtleText },
    utility: { primary: utilityPrimary, subtleBg: utilitySubtleBg, subtleText: utilitySubtleText, on: onUtility },
    stroke: { default: strokeDefault, subtle: strokeSubtle, strong: strokeStrong, focus },
    overlay: { elevation1: overlayE1, elevation2: overlayE2, elevation3: overlayE3, hover: hoverOverlay, pressed: pressedOverlay, selected: selectedOverlay },
    dataViz,
    numbers: { radius: numbers.radiusBase, stroke: numbers.strokeBase, focusRing: numbers.focusRingWidth },
    meta: { report }
  };
}

// --- Output to CSS Variables ---

export function themeToCssVars(theme: Theme): Record<string, string> {
  return {
    // Map to standard ShadCN / Tailwind vars where possible
    '--background': theme.bg.primary,
    '--foreground': theme.text.primary,
    
    '--card': theme.bg.card,
    '--card-foreground': (theme.text.onSurface !== null && theme.text.onSurface !== undefined) ? theme.text.onSurface : theme.text.primary, // fallback
    
    '--popover': theme.bg.elevated,
    '--popover-foreground': theme.text.primary,
    
    '--primary': theme.accent.primary,
    '--primary-foreground': theme.text.onAccent,
    
    '--secondary': theme.utility.subtleBg,
    '--secondary-foreground': theme.utility.subtleText,
    
    '--muted': theme.bg.sunken,
    '--muted-foreground': theme.text.muted,
    
    '--accent': theme.accent.subtleBg,
    '--accent-foreground': theme.accent.subtleText,
    
    '--destructive': theme.dataViz.thresholdBad,
    '--destructive-foreground': theme.text.inverse,
    
    '--border': theme.stroke.default,
    '--input': theme.stroke.subtle,
    '--ring': theme.stroke.focus,
    
    '--radius': `${theme.numbers.radius}rem`,
    
    // Additional vars specific to this engine
    '--bg-surface': theme.bg.surface,
    '--bg-elevated': theme.bg.elevated,
    '--bg-sunken': theme.bg.sunken,
    
    '--text-secondary': theme.text.secondary,
    '--text-link': theme.text.link,
    
    '--accent-hover': theme.accent.hover,
    '--accent-pressed': theme.accent.pressed,
    
    '--chart-1': theme.dataViz.series[0],
    '--chart-2': theme.dataViz.series[1],
    '--chart-3': theme.dataViz.series[2],
    '--chart-4': theme.dataViz.series[3],
    '--chart-5': theme.dataViz.series[4],
    
    // Chart specifics
    '--chart-grid': theme.dataViz.grid,
    '--chart-axis': theme.dataViz.axis,
    '--chart-tooltip-bg': theme.dataViz.tooltipBg,
    '--chart-tooltip-text': theme.dataViz.tooltipText,
  };
}