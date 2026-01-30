# Design System Quick Reference

## 🚀 Essential Imports

```tsx
import { typography, layout, classNames, cssVars } from '@/app/utils/design-system';
```

---

## 📝 Typography Cheat Sheet

### Common Text Sizes

| Use Case | ❌ DON'T | ✅ DO |
|----------|---------|-------|
| **Large Hero** | `className="text-6xl font-bold"` | `style={typography.h1}` |
| **Section Title** | `className="text-4xl font-bold"` | `style={typography.h2}` |
| **Subsection** | `className="text-2xl font-semibold"` | `style={typography.h3}` |
| **Card Title** | `className="text-lg font-semibold"` | `style={typography.h4}` |
| **Body Text** | `className="text-base"` | `style={typography.body}` |
| **Large Body** | `className="text-lg"` | `style={typography.bodyLarge}` |
| **Small Text** | `className="text-sm"` | `style={typography.bodySmall}` |
| **Button** | `className="text-base font-medium"` | `style={typography.button}` |
| **Label** | `className="text-sm font-medium"` | `style={typography.label}` |
| **Caption** | `className="text-xs font-semibold"` | `style={typography.caption}` |

### Manual Typography Construction

```tsx
// When you need custom combinations
<p
  className={classNames.fontSans}
  style={{
    fontSize: cssVars.textXl,
    fontWeight: cssVars.fontWeightMedium,
  }}
>
  Custom text
</p>
```

---

## 🎨 Color Cheat Sheet

### Backgrounds

| Use Case | ❌ DON'T | ✅ DO |
|----------|---------|-------|
| **Page Background** | `bg-white` or `bg-gray-50` | `bg-background` |
| **Card Background** | `bg-gray-100` or `bg-white` | `bg-card` |
| **Primary Button** | `bg-blue-600` | `bg-primary` |
| **Secondary Button** | `bg-gray-200` | `bg-secondary` |
| **Muted Section** | `bg-gray-100` | `bg-muted` |
| **Accent Background** | `bg-blue-50` | `bg-accent` |
| **Error/Danger** | `bg-red-600` | `bg-destructive` |

### Text Colors

| Use Case | ❌ DON'T | ✅ DO |
|----------|---------|-------|
| **Primary Text** | `text-black` or `text-gray-900` | `text-foreground` |
| **Muted Text** | `text-gray-500` or `text-gray-400` | `text-muted-foreground` |
| **Primary Color** | `text-blue-600` | `text-primary` |
| **On Primary** | `text-white` | `text-primary-foreground` |
| **On Card** | `text-gray-900` | `text-card-foreground` |
| **Error Text** | `text-red-600` | `text-destructive` |

### Border Colors

| Use Case | ❌ DON'T | ✅ DO |
|----------|---------|-------|
| **Default Border** | `border-gray-200` | `border-border` |
| **Input Border** | `border-gray-300` | `border-input` |

---

## 📦 Layout Cheat Sheet

### Containers

| Use Case | ❌ DON'T | ✅ DO |
|----------|---------|-------|
| **Default Container** | `className="max-w-7xl mx-auto px-8"` | `className={classNames.container} style={layout.container}` |
| **Large Container** | `className="max-w-6xl mx-auto px-8"` | `style={layout.containerLg}` |
| **Medium Container** | `className="max-w-4xl mx-auto px-8"` | `style={layout.containerMd}` |
| **Small Container** | `className="max-w-2xl mx-auto px-8"` | `style={layout.containerSm}` |
| **XS Container** | `className="max-w-xl mx-auto px-8"` | `style={layout.containerXs}` |
| **XL Container** | `className="max-w-screen-2xl mx-auto px-8"` | `style={layout.containerXl}` |

---

## 🔲 Border Radius Cheat Sheet

| Use Case | ❌ DON'T | ✅ DO |
|----------|---------|-------|
| **Small Radius** | `className="rounded-sm"` | `style={{ borderRadius: cssVars.radiusSm }}` |
| **Default Radius** | `className="rounded-md"` or `rounded` | `style={{ borderRadius: cssVars.radius }}` |
| **Large Radius** | `className="rounded-lg"` | `style={{ borderRadius: cssVars.radiusLg }}` |
| **XL Radius** | `className="rounded-xl"` | `style={{ borderRadius: cssVars.radiusXl }}` |

---

## 📋 Common Patterns

### Pattern: Hero Section
```tsx
<div className="w-full py-24 bg-background">
  <div className={classNames.container} style={layout.container}>
    <h1 className={`${classNames.textForeground} ${classNames.fontSans}`} style={typography.h1}>
      Hero Title
    </h1>
    <p className={`${classNames.textMuted} ${classNames.fontSans}`} style={typography.bodyLarge}>
      Hero description
    </p>
  </div>
</div>
```

### Pattern: Card Component
```tsx
<div 
  className="bg-card text-card-foreground border border-border p-6"
  style={{ borderRadius: cssVars.radiusLg }}
>
  <h3 className={classNames.textForeground} style={typography.h3}>Card Title</h3>
  <p className={classNames.textMuted} style={typography.body}>Card content</p>
</div>
```

### Pattern: Primary Button
```tsx
<button
  className="px-6 py-3 bg-primary text-primary-foreground hover:bg-primary-hover"
  style={{ ...typography.button, borderRadius: cssVars.radiusLg }}
>
  Click Me
</button>
```

### Pattern: Section with Background
```tsx
<section className="w-full py-16 bg-muted/20">
  <div className={classNames.container} style={layout.container}>
    <h2 className={classNames.textForeground} style={typography.h2}>
      Section Title
    </h2>
    {/* content */}
  </div>
</section>
```

### Pattern: Feature Card
```tsx
<div 
  className="bg-card border border-border p-6 hover:shadow-lg transition-shadow"
  style={{ borderRadius: cssVars.radiusLg }}
>
  <div 
    className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-4"
    style={{ borderRadius: cssVars.radiusMd }}
  >
    <Icon className="text-primary" />
  </div>
  <h4 className={classNames.textForeground} style={typography.h4}>
    Feature Title
  </h4>
  <p className={classNames.textMuted} style={typography.bodySmall}>
    Feature description
  </p>
</div>
```

---

## ⚡ Quick Replacements

### Find & Replace Guide

Search for these patterns and replace them:

```tsx
// Typography
text-6xl font-bold       → style={typography.h1}
text-4xl font-bold       → style={typography.h2}
text-2xl font-semibold   → style={typography.h3}
text-lg font-semibold    → style={typography.h4}
text-base                → style={typography.body}
text-sm                  → style={typography.bodySmall}

// Colors
bg-white                 → bg-background
bg-gray-100              → bg-card or bg-muted
bg-blue-600              → bg-primary
text-gray-900            → text-foreground
text-gray-500            → text-muted-foreground
text-blue-600            → text-primary

// Layout
max-w-7xl mx-auto px-8   → className={classNames.container} style={layout.container}
max-w-6xl mx-auto px-8   → style={layout.containerLg}

// Borders
rounded-lg               → style={{ borderRadius: cssVars.radiusLg }}
border-gray-200          → border-border
```

---

## 🎯 cssVars Quick Reference

### Typography
```tsx
cssVars.text8xl      // 60-96px
cssVars.text7xl      // 50-72px
cssVars.text6xl      // 40-60px
cssVars.text5xl      // 32-48px
cssVars.text4xl      // 28-36px
cssVars.text3xl      // 24-30px
cssVars.text2xl      // 20-24px
cssVars.textXl       // 18-20px
cssVars.textLg       // 16-18px
cssVars.textBase     // 14-16px
cssVars.textSm       // 12-14px
cssVars.textXs       // 11-12px
```

### Font Weights
```tsx
cssVars.fontWeightNormal    // 400
cssVars.fontWeightMedium    // 500
cssVars.fontWeightSemibold  // 600
```

### Font Families
```tsx
cssVars.fontSans    // Inter
cssVars.fontSerif   // Playfair Display
cssVars.fontMono    // JetBrains Mono
```

### Layout
```tsx
cssVars.maxWidth         // Default container
cssVars.globalPadding    // Default padding
cssVars.containerXs      // 512px
cssVars.containerSm      // 768px
cssVars.containerMd      // 1024px
cssVars.containerLg      // 1280px
cssVars.containerXl      // 1536px
```

### Radius
```tsx
cssVars.radius      // 0.5rem (base)
cssVars.radiusSm    // calc(--radius - 2px)
cssVars.radiusMd    // --radius
cssVars.radiusLg    // calc(--radius + 2px)
cssVars.radiusXl    // calc(--radius + 4px)
```

---

## 🎨 classNames Quick Reference

### Containers
```tsx
classNames.container           // mx-auto w-full
```

### Text Colors
```tsx
classNames.textForeground      // text-foreground
classNames.textMuted           // text-muted-foreground
classNames.textPrimary         // text-primary
classNames.textSecondary       // text-secondary-foreground
classNames.textDestructive     // text-destructive
```

### Backgrounds
```tsx
classNames.bgBackground        // bg-background
classNames.bgCard              // bg-card
classNames.bgPrimary           // bg-primary
classNames.bgSecondary         // bg-secondary
classNames.bgMuted             // bg-muted
classNames.bgDestructive       // bg-destructive
```

### Borders
```tsx
classNames.border              // border border-border
classNames.borderTop           // border-t border-border
classNames.borderBottom        // border-b border-border
classNames.borderLeft          // border-l border-border
classNames.borderRight         // border-r border-border
```

### Font Families (Safe to Use)
```tsx
classNames.fontSans            // font-sans
classNames.fontSerif           // font-serif
classNames.fontMono            // font-mono
```

---

## ✅ Before Committing Checklist

- [ ] No `text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl)` classes
- [ ] No `font-(thin|light|normal|medium|semibold|bold|black)` classes
- [ ] No `text-[arbitrary]` values
- [ ] All font sizes use `cssVars.text*` or `typography.*`
- [ ] All font weights use `cssVars.fontWeight*` or `typography.*`
- [ ] All colors use design system classes (`bg-background`, `text-foreground`, etc.)
- [ ] All containers use `layout.*` or `cssVars.maxWidth`
- [ ] All border radius use `cssVars.radius*`
- [ ] Imported design system utilities at top of file

---

## 🔍 Testing Commands

```bash
# Search for non-compliant patterns
grep -r "text-6xl\|text-4xl\|text-2xl\|text-xl\|text-lg\|font-bold\|font-semibold" src/app/components/blocks/

# Search for hardcoded colors
grep -r "bg-blue-\|bg-gray-\|text-gray-\|bg-zinc-" src/app/components/blocks/

# Search for hardcoded max-width
grep -r "max-w-7xl\|max-w-6xl\|max-w-4xl" src/app/components/blocks/
```

---

## 💾 Save This for Quick Access!

Bookmark this page or keep it open while refactoring components. It has everything you need at a glance.
