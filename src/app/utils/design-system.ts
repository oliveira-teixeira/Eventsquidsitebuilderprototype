/**
 * Design System Utilities
 * Helper functions and constants for using CSS variables from theme.css
 */

// Typography presets using CSS variables
export const typography = {
  h1: {
    fontSize: 'var(--text-6xl)',
    fontWeight: 'var(--font-weight-semibold)',
    fontFamily: 'var(--font-sans)',
  },
  h2: {
    fontSize: 'var(--text-4xl)',
    fontWeight: 'var(--font-weight-semibold)',
    fontFamily: 'var(--font-sans)',
  },
  h3: {
    fontSize: 'var(--text-2xl)',
    fontWeight: 'var(--font-weight-semibold)',
    fontFamily: 'var(--font-sans)',
  },
  h4: {
    fontSize: 'var(--text-lg)',
    fontWeight: 'var(--font-weight-semibold)',
    fontFamily: 'var(--font-sans)',
  },
  body: {
    fontSize: 'var(--text-base)',
    fontWeight: 'var(--font-weight-normal)',
    fontFamily: 'var(--font-sans)',
  },
  bodyLarge: {
    fontSize: 'var(--text-lg)',
    fontWeight: 'var(--font-weight-normal)',
    fontFamily: 'var(--font-sans)',
  },
  bodySmall: {
    fontSize: 'var(--text-sm)',
    fontWeight: 'var(--font-weight-normal)',
    fontFamily: 'var(--font-sans)',
  },
  label: {
    fontSize: 'var(--text-sm)',
    fontWeight: 'var(--font-weight-medium)',
    fontFamily: 'var(--font-sans)',
  },
  button: {
    fontSize: 'var(--text-base)',
    fontWeight: 'var(--font-weight-medium)',
    fontFamily: 'var(--font-sans)',
  },
};

// Layout utilities
export const layout = {
  container: {
    maxWidth: 'var(--max-width)',
    paddingLeft: 'var(--global-padding)',
    paddingRight: 'var(--global-padding)',
  },
};

// CSS variable references
export const cssVars = {
  text6xl: 'var(--text-6xl)',
  text4xl: 'var(--text-4xl)',
  text2xl: 'var(--text-2xl)',
  textXl: 'var(--text-xl)',
  textLg: 'var(--text-lg)',
  textBase: 'var(--text-base)',
  textSm: 'var(--text-sm)',
  fontWeightSemibold: 'var(--font-weight-semibold)',
  fontWeightMedium: 'var(--font-weight-medium)',
  fontWeightNormal: 'var(--font-weight-normal)',
  fontSans: 'var(--font-sans)',
  radiusLg: 'var(--radius-lg)',
  radius: 'var(--radius)',
};
