# Refactoring Examples - Design System Compliance

This document shows before/after examples of refactoring blocks to be fully compliant with the design system.

---

## Example 1: Simple Hero Block

### ❌ BEFORE (Non-Compliant)
```tsx
export const HeroVariant1 = () => (
  <div className="w-full py-24 bg-zinc-900 text-white">
    <div className="max-w-7xl mx-auto px-8">
      <h1 className="text-6xl font-bold mb-4">
        Future of Tech
      </h1>
      <p className="text-xl font-normal text-gray-400 max-w-2xl mx-auto">
        Join the world's leading minds to shape the future of technology.
      </p>
      <div className="flex gap-4 mt-8">
        <button className="px-6 py-3 bg-blue-600 text-white text-base font-semibold rounded-lg">
          Register Now
        </button>
        <button className="px-6 py-3 border border-white text-white text-base font-medium rounded-lg">
          Learn More
        </button>
      </div>
    </div>
  </div>
);
```

**Issues:**
- ❌ `text-6xl` - hardcoded size
- ❌ `font-bold` - hardcoded weight
- ❌ `text-xl` - hardcoded size
- ❌ `font-normal` - hardcoded weight
- ❌ `bg-zinc-900` - hardcoded color
- ❌ `text-gray-400` - hardcoded color
- ❌ `bg-blue-600` - hardcoded color
- ❌ `max-w-7xl` - hardcoded container width

### ✅ AFTER (Compliant)
```tsx
import { typography, layout, classNames } from '@/app/utils/design-system';

export const HeroVariant1 = () => (
  <div className="w-full py-24 bg-foreground text-background">
    <div className={classNames.container} style={layout.container}>
      <h1 
        className={`mb-4 ${classNames.textBackground}`}
        style={typography.h1}
      >
        Future of Tech
      </h1>
      <p 
        className="text-muted max-w-2xl mx-auto"
        style={typography.bodyLarge}
      >
        Join the world's leading minds to shape the future of technology.
      </p>
      <div className="flex gap-4 mt-8">
        <button 
          className="px-6 py-3 bg-primary text-primary-foreground hover:bg-primary-hover"
          style={{ 
            ...typography.button,
            borderRadius: 'var(--radius-lg)'
          }}
        >
          Register Now
        </button>
        <button 
          className="px-6 py-3 border border-background text-background hover:bg-background/10"
          style={{ 
            ...typography.button,
            borderRadius: 'var(--radius-lg)'
          }}
        >
          Learn More
        </button>
      </div>
    </div>
  </div>
);
```

**Benefits:**
- ✅ All typography uses CSS variables
- ✅ All colors use design system tokens
- ✅ Container width is themeable
- ✅ Border radius is themeable
- ✅ User can customize everything via CSS

---

## Example 2: Agenda List Block

### ❌ BEFORE (Non-Compliant)
```tsx
export const AgendaVariant1 = () => (
  <div className="w-full py-12 bg-white">
    <div className="max-w-6xl mx-auto px-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-black">
        Event Schedule
      </h2>
      <div className="space-y-4">
        {SAMPLE_AGENDA.map((item, i) => (
          <div key={i} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="flex gap-4">
              <div className="min-w-[100px] font-mono text-blue-600 font-bold text-sm">
                {item.time}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-black">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.speaker}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
```

**Issues:**
- ❌ `text-3xl`, `font-bold` - hardcoded typography
- ❌ `text-lg`, `font-semibold` - hardcoded typography
- ❌ `text-sm` - hardcoded size
- ❌ `bg-white`, `bg-gray-50`, `text-black` - hardcoded colors
- ❌ `text-blue-600`, `text-gray-500` - hardcoded colors
- ❌ `max-w-6xl` - hardcoded container

### ✅ AFTER (Compliant)
```tsx
import { typography, layout, classNames, cssVars } from '@/app/utils/design-system';

export const AgendaVariant1 = () => (
  <div className="w-full py-12 bg-background">
    <div className={classNames.container} style={layout.container}>
      <h2 
        className={`mb-8 text-center ${classNames.textForeground}`}
        style={typography.h2}
      >
        Event Schedule
      </h2>
      <div className="space-y-4">
        {SAMPLE_AGENDA.map((item, i) => (
          <div 
            key={i} 
            className="bg-card border border-border p-6"
            style={{ borderRadius: cssVars.radiusLg }}
          >
            <div className="flex gap-4">
              <div 
                className={`min-w-[100px] ${classNames.fontMono} ${classNames.textPrimary}`}
                style={{ 
                  fontSize: cssVars.textSm,
                  fontWeight: cssVars.fontWeightMedium
                }}
              >
                {item.time}
              </div>
              <div className="flex-1">
                <h3 
                  className={classNames.textForeground}
                  style={typography.h4}
                >
                  {item.title}
                </h3>
                <p 
                  className={classNames.textMuted}
                  style={typography.bodySmall}
                >
                  {item.speaker}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
```

**Benefits:**
- ✅ Typography scales with CSS variables
- ✅ Colors adapt to light/dark mode
- ✅ Container width is configurable
- ✅ Border radius follows design system

---

## Example 3: Card Component

### ❌ BEFORE (Non-Compliant)
```tsx
export const FeatureCard = ({ title, description, icon }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);
```

**Issues:**
- ❌ `text-xl`, `font-bold` - hardcoded
- ❌ `text-sm` - hardcoded
- ❌ `bg-white`, `bg-blue-100` - hardcoded colors
- ❌ `text-gray-900`, `text-gray-600` - hardcoded colors
- ❌ `rounded-xl` - uses Tailwind's xl, not design system

### ✅ AFTER (Compliant)
```tsx
import { typography, classNames, cssVars } from '@/app/utils/design-system';

export const FeatureCard = ({ title, description, icon }) => (
  <div 
    className="bg-card border border-border shadow-sm p-6"
    style={{ borderRadius: cssVars.radiusXl }}
  >
    <div 
      className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-4"
      style={{ borderRadius: cssVars.radiusLg }}
    >
      {icon}
    </div>
    <h3 
      className={`mb-2 ${classNames.textForeground}`}
      style={typography.h3}
    >
      {title}
    </h3>
    <p 
      className={classNames.textMuted}
      style={typography.bodySmall}
    >
      {description}
    </p>
  </div>
);
```

**Benefits:**
- ✅ Fully themeable
- ✅ Adapts to light/dark mode
- ✅ All sizes use CSS variables

---

## Example 4: Button Component

### ❌ BEFORE (Non-Compliant)
```tsx
export const PrimaryButton = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold rounded-lg transition-colors"
  >
    {children}
  </button>
);
```

**Issues:**
- ❌ `text-base`, `font-semibold` - hardcoded
- ❌ `bg-blue-600`, `hover:bg-blue-700` - hardcoded colors
- ❌ `rounded-lg` - not using design system radius

### ✅ AFTER (Compliant)
```tsx
import { typography, cssVars } from '@/app/utils/design-system';

export const PrimaryButton = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="px-6 py-3 bg-primary hover:bg-primary-hover text-primary-foreground transition-colors"
    style={{
      ...typography.button,
      borderRadius: cssVars.radiusLg
    }}
  >
    {children}
  </button>
);
```

**Benefits:**
- ✅ Button size controlled by CSS variable
- ✅ Colors use design system tokens
- ✅ Border radius is themeable

---

## Example 5: Complex Layout with Mixed Typography

### ❌ BEFORE (Non-Compliant)
```tsx
export const StatsSection = () => (
  <div className="bg-gray-900 py-20">
    <div className="max-w-7xl mx-auto px-8">
      <div className="text-center mb-12">
        <span className="text-sm font-semibold text-blue-400 uppercase tracking-wide">
          Statistics
        </span>
        <h2 className="text-4xl font-bold text-white mt-2">
          By The Numbers
        </h2>
        <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
          See what we've accomplished together
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { value: '10K+', label: 'Attendees' },
          { value: '500+', label: 'Speakers' },
          { value: '50+', label: 'Countries' },
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-5xl font-black text-white mb-2">
              {stat.value}
            </div>
            <div className="text-base text-gray-400">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
```

**Issues:**
- ❌ Multiple hardcoded text sizes
- ❌ Multiple hardcoded font weights
- ❌ Hardcoded colors throughout
- ❌ Hardcoded container width

### ✅ AFTER (Compliant)
```tsx
import { typography, layout, classNames, cssVars } from '@/app/utils/design-system';

export const StatsSection = () => (
  <div className="bg-foreground py-20">
    <div className={classNames.container} style={layout.container}>
      <div className="text-center mb-12">
        <span 
          className="text-primary uppercase tracking-wide"
          style={{
            fontSize: cssVars.textSm,
            fontWeight: cssVars.fontWeightSemibold,
            fontFamily: cssVars.fontSans,
          }}
        >
          Statistics
        </span>
        <h2 
          className="text-background mt-2"
          style={typography.h2}
        >
          By The Numbers
        </h2>
        <p 
          className="text-muted mt-4 max-w-2xl mx-auto"
          style={typography.bodyLarge}
        >
          See what we've accomplished together
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { value: '10K+', label: 'Attendees' },
          { value: '500+', label: 'Speakers' },
          { value: '50+', label: 'Countries' },
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div 
              className="text-background mb-2"
              style={{
                fontSize: cssVars.text5xl,
                fontWeight: cssVars.fontWeightSemibold,
                fontFamily: cssVars.fontSans,
              }}
            >
              {stat.value}
            </div>
            <div 
              className={classNames.textMuted}
              style={typography.body}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
```

**Benefits:**
- ✅ All typography uses CSS variables
- ✅ Colors adapt to theme changes
- ✅ Fully responsive with design system
- ✅ Easy to customize via CSS

---

## Quick Reference: Common Replacements

| ❌ Old (Hardcoded) | ✅ New (Design System) |
|-------------------|------------------------|
| `className="text-6xl font-bold"` | `style={typography.h1}` |
| `className="text-4xl font-bold"` | `style={typography.h2}` |
| `className="text-2xl font-bold"` | `style={typography.h3}` |
| `className="text-lg font-semibold"` | `style={typography.h4}` |
| `className="text-base"` | `style={typography.body}` |
| `className="text-sm"` | `style={typography.bodySmall}` |
| `className="bg-blue-600"` | `className="bg-primary"` |
| `className="text-gray-400"` | `className="text-muted-foreground"` |
| `className="max-w-7xl mx-auto px-8"` | `className="mx-auto w-full" style={layout.container}` |
| `className="rounded-lg"` | `style={{ borderRadius: cssVars.radiusLg }}` |

---

## Migration Strategy

1. **Import design system utilities:**
   ```tsx
   import { typography, layout, classNames, cssVars } from '@/app/utils/design-system';
   ```

2. **Replace hardcoded typography:**
   - Find all `text-*` and `font-*` classes
   - Replace with `style={typography.*}` or custom `style` objects using `cssVars`

3. **Replace hardcoded colors:**
   - Replace color classes with design system color classes
   - Use `bg-background`, `text-foreground`, `bg-primary`, etc.

4. **Replace container widths:**
   - Replace `max-w-*` with `style={layout.container*}`

5. **Test theming:**
   - Modify values in `/src/styles/theme.css`
   - Verify all components update correctly
   - Test dark mode
