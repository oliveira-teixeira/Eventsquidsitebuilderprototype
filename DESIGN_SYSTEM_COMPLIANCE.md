# Design System Compliance Guide

## Overview
All UI generation in Site Builder **must strictly adhere** to the CSS variables and font faces defined in `/src/styles/theme.css` and `/src/styles/tailwind.css`. This ensures full themeability—users can update styling by modifying CSS alone.

---

## 🚫 What NOT to Do

### ❌ Never Use Hardcoded Tailwind Typography Classes
```tsx
// ❌ WRONG - These bypass CSS variables
<h1 className="text-6xl font-bold">Title</h1>
<p className="text-lg font-medium">Body text</p>
<button className="text-base font-semibold">Click me</button>
```

### ❌ Never Use Inline Hardcoded Values
```tsx
// ❌ WRONG - Hardcoded values prevent theming
<h1 style={{ fontSize: '48px', fontWeight: 600 }}>Title</h1>
<p style={{ fontFamily: 'Arial' }}>Body</p>
```

### ❌ Never Use Arbitrary Tailwind Values
```tsx
// ❌ WRONG - Arbitrary values bypass design system
<div className="text-[24px] font-[600]">Content</div>
```

---

## ✅ What TO Do

### Typography Sizes
Use CSS variables via inline styles for font sizes:

```tsx
// ✅ CORRECT - Uses CSS variables
<h1 style={{ fontSize: 'var(--text-6xl)' }}>Hero Title</h1>
<h2 style={{ fontSize: 'var(--text-4xl)' }}>Section Title</h2>
<h3 style={{ fontSize: 'var(--text-2xl)' }}>Subsection</h3>
<p style={{ fontSize: 'var(--text-base)' }}>Body text</p>
<span style={{ fontSize: 'var(--text-sm)' }}>Caption</span>
```

**Available Typography Variables:**
- `--text-8xl` (60-96px responsive)
- `--text-7xl` (50-72px responsive)
- `--text-6xl` (40-60px responsive)
- `--text-5xl` (32-48px responsive)
- `--text-4xl` (28-36px responsive)
- `--text-3xl` (24-30px responsive)
- `--text-2xl` (20-24px responsive)
- `--text-xl` (18-20px responsive)
- `--text-lg` (16-18px responsive)
- `--text-base` (14-16px responsive)
- `--text-sm` (12-14px responsive)
- `--text-xs` (11-12px responsive)

### Font Weights
Use CSS variables for font weights:

```tsx
// ✅ CORRECT - Uses CSS variables
<h1 style={{ 
  fontSize: 'var(--text-6xl)', 
  fontWeight: 'var(--font-weight-semibold)' 
}}>
  Title
</h1>

<p style={{ 
  fontSize: 'var(--text-base)', 
  fontWeight: 'var(--font-weight-normal)' 
}}>
  Body text
</p>
```

**Available Font Weight Variables:**
- `--font-weight-normal` (400)
- `--font-weight-medium` (500)
- `--font-weight-semibold` (600)

### Font Families
**ONLY use the defined font faces:**

```tsx
// ✅ CORRECT - Uses CSS variable
<h1 style={{ fontFamily: 'var(--font-sans)' }}>Sans Serif Title</h1>
<h2 style={{ fontFamily: 'var(--font-serif)' }}>Serif Title</h2>
<code style={{ fontFamily: 'var(--font-mono)' }}>Code Block</code>
```

**Available Font Families:**
- `--font-sans` ('Inter', sans-serif)
- `--font-serif` ('Playfair Display', serif)
- `--font-mono` ('JetBrains Mono', monospace)

**Alternative: Use Tailwind Font Classes (Acceptable)**
```tsx
// ✅ ALSO ACCEPTABLE - Tailwind font classes map to CSS variables
<h1 className="font-sans">Sans Serif</h1>
<h2 className="font-serif">Serif</h2>
<code className="font-mono">Monospace</code>
```

### Colors
Always use Tailwind color classes that map to CSS variables:

```tsx
// ✅ CORRECT - Uses design system colors
<div className="bg-background text-foreground">
  <div className="bg-card text-card-foreground border border-border">
    <h2 className="text-primary">Primary Color</h2>
    <p className="text-muted-foreground">Muted text</p>
    <Button className="bg-primary text-primary-foreground hover:bg-primary-hover">
      Click Me
    </Button>
  </div>
</div>
```

**Available Color Variables:**
- `background` / `foreground`
- `card` / `card-foreground`
- `popover` / `popover-foreground`
- `primary` / `primary-foreground` / `primary-hover`
- `secondary` / `secondary-foreground` / `secondary-hover`
- `muted` / `muted-foreground`
- `accent` / `accent-foreground`
- `destructive` / `destructive-foreground`
- `border` / `input` / `ring`

### Spacing & Layout
Use CSS variables for container widths and padding:

```tsx
// ✅ CORRECT - Uses CSS variables
<div style={{ 
  maxWidth: 'var(--max-width)', 
  paddingLeft: 'var(--global-padding)', 
  paddingRight: 'var(--global-padding)' 
}}>
  Content
</div>

// ✅ CORRECT - Using specific container widths
<div style={{ maxWidth: 'var(--container-width-lg)' }}>
  Large container
</div>
```

**Available Layout Variables:**
- `--max-width` (default container max-width)
- `--global-padding` (default padding)
- `--container-width-xs` (512px)
- `--container-width-sm` (768px)
- `--container-width-md` (1024px)
- `--container-width-lg` (1280px)
- `--container-width-xl` (1536px)

### Border Radius
Use CSS variables for border radius:

```tsx
// ✅ CORRECT - Uses CSS variables
<div style={{ borderRadius: 'var(--radius)' }}>Content</div>

// ✅ ALSO CORRECT - Tailwind classes that map to variables
<div className="rounded-md">Content</div> {/* Uses --radius-md */}
```

**Available Radius Variables:**
- `--radius-sm` (calc(var(--radius) - 2px))
- `--radius-md` (var(--radius)) - same as `--radius`
- `--radius-lg` (calc(var(--radius) + 2px))
- `--radius-xl` (calc(var(--radius) + 4px))

---

## 📋 Complete Example: Hero Block

### ❌ WRONG - Uses hardcoded Tailwind classes
```tsx
export const HeroWrong = () => (
  <div className="w-full py-24 bg-zinc-900">
    <div className="max-w-7xl mx-auto px-8">
      <h1 className="text-6xl font-bold mb-4">Hero Title</h1>
      <p className="text-xl font-normal text-gray-400">
        Description text goes here
      </p>
      <button className="px-6 py-3 bg-blue-600 text-white text-base font-semibold rounded-lg">
        Get Started
      </button>
    </div>
  </div>
);
```

### ✅ CORRECT - Uses CSS variables
```tsx
export const HeroCorrect = () => (
  <div className="w-full py-24 bg-background">
    <div 
      className="mx-auto w-full" 
      style={{ 
        maxWidth: 'var(--max-width)', 
        paddingLeft: 'var(--global-padding)', 
        paddingRight: 'var(--global-padding)' 
      }}
    >
      <h1 
        className="mb-4 text-foreground font-sans" 
        style={{ 
          fontSize: 'var(--text-6xl)', 
          fontWeight: 'var(--font-weight-semibold)' 
        }}
      >
        Hero Title
      </h1>
      <p 
        className="text-muted-foreground font-sans" 
        style={{ 
          fontSize: 'var(--text-xl)', 
          fontWeight: 'var(--font-weight-normal)' 
        }}
      >
        Description text goes here
      </p>
      <button 
        className="px-6 py-3 bg-primary text-primary-foreground hover:bg-primary-hover font-sans"
        style={{ 
          fontSize: 'var(--text-base)', 
          fontWeight: 'var(--font-weight-medium)',
          borderRadius: 'var(--radius-lg)'
        }}
      >
        Get Started
      </button>
    </div>
  </div>
);
```

---

## 🎯 Quick Reference Patterns

### Pattern 1: Headings
```tsx
// H1
<h1 
  className="text-foreground font-sans" 
  style={{ 
    fontSize: 'var(--text-6xl)', 
    fontWeight: 'var(--font-weight-semibold)' 
  }}
>
  Heading 1
</h1>

// H2
<h2 
  className="text-foreground font-sans" 
  style={{ 
    fontSize: 'var(--text-4xl)', 
    fontWeight: 'var(--font-weight-semibold)' 
  }}
>
  Heading 2
</h2>

// H3
<h3 
  className="text-foreground font-sans" 
  style={{ 
    fontSize: 'var(--text-2xl)', 
    fontWeight: 'var(--font-weight-semibold)' 
  }}
>
  Heading 3
</h3>
```

### Pattern 2: Body Text
```tsx
<p 
  className="text-foreground font-sans" 
  style={{ 
    fontSize: 'var(--text-base)', 
    fontWeight: 'var(--font-weight-normal)' 
  }}
>
  Body text paragraph
</p>
```

### Pattern 3: Labels/Captions
```tsx
<label 
  className="text-muted-foreground font-sans" 
  style={{ 
    fontSize: 'var(--text-sm)', 
    fontWeight: 'var(--font-weight-medium)' 
  }}
>
  Form Label
</label>
```

### Pattern 4: Buttons
```tsx
<button 
  className="bg-primary text-primary-foreground hover:bg-primary-hover font-sans"
  style={{ 
    fontSize: 'var(--text-base)', 
    fontWeight: 'var(--font-weight-medium)',
    borderRadius: 'var(--radius)'
  }}
>
  Button Text
</button>
```

### Pattern 5: Cards
```tsx
<div 
  className="bg-card text-card-foreground border border-border"
  style={{ borderRadius: 'var(--radius-lg)' }}
>
  <h3 
    className="font-sans" 
    style={{ 
      fontSize: 'var(--text-xl)', 
      fontWeight: 'var(--font-weight-semibold)' 
    }}
  >
    Card Title
  </h3>
  <p 
    className="text-muted-foreground font-sans" 
    style={{ 
      fontSize: 'var(--text-sm)', 
      fontWeight: 'var(--font-weight-normal)' 
    }}
  >
    Card description
  </p>
</div>
```

---

## 🔍 Validation Checklist

Before submitting code, verify:

- [ ] No hardcoded Tailwind typography classes (`text-xl`, `font-bold`, etc.)
- [ ] All font sizes use `var(--text-*)` via inline styles
- [ ] All font weights use `var(--font-weight-*)` via inline styles
- [ ] All font families use `var(--font-*)` or `font-sans/serif/mono` classes
- [ ] All colors use Tailwind classes that map to CSS variables
- [ ] Container widths use `var(--max-width)` or `var(--container-width-*)`
- [ ] Padding uses `var(--global-padding)` where appropriate
- [ ] Border radius uses `var(--radius*)` where appropriate
- [ ] No arbitrary values like `text-[24px]`

---

## 📚 Mobile Typography

For mobile-specific sizing, use the mobile typography variables:

```tsx
<h1 
  className="text-foreground font-sans" 
  style={{ 
    fontSize: 'var(--text-mobile-hero)', 
    fontWeight: 'var(--font-weight-semibold)' 
  }}
>
  Mobile Hero
</h1>
```

**Available Mobile Variables:**
- `--text-mobile-hero` (28px)
- `--text-mobile-hero-split` (26px)
- `--text-mobile-hero-video` (32px)
- `--text-mobile-body` (13px)
- `--text-mobile-badge` (9px)
- `--text-mobile-button` (13px)
- `--text-mobile-caption` (11px)
- `--text-mobile-tiny` (10px)

---

## 🎨 Default Typography Styles

The theme defines default styles for semantic HTML elements (when no Tailwind text class is applied):

| Element | Font Size | Font Weight | Font Family |
|---------|-----------|-------------|-------------|
| `<h1>` | `var(--text-6xl)` | `var(--font-weight-semibold)` | Inter |
| `<h2>` | `var(--text-4xl)` | `var(--font-weight-semibold)` | Inter |
| `<h3>` | `var(--text-2xl)` | `var(--font-weight-semibold)` | Inter |
| `<h4>` | `var(--text-lg)` | `var(--font-weight-semibold)` | Inter |
| `<p>` | `var(--text-base)` | `var(--font-weight-normal)` | Inter |
| `<label>` | `var(--text-sm)` | `var(--font-weight-medium)` | Inter |
| `<button>` | `var(--text-base)` | `var(--font-weight-medium)` | Inter |
| `<input>` | `var(--text-base)` | `var(--font-weight-normal)` | Inter |

**Note:** These defaults only apply when the element doesn't have any Tailwind text classes in its ancestry. To ensure consistency, always apply styles explicitly as shown in the examples above.

---

## 🚀 Benefits of This Approach

1. **Full Themeability**: Users can modify `/src/styles/theme.css` to update the entire app
2. **Consistent Design**: All components use the same design tokens
3. **Responsive by Default**: CSS variables use `clamp()` for fluid typography
4. **Dark Mode Support**: Colors automatically adapt to `.dark` class
5. **Maintainability**: Centralized design system in one file

---

## 💡 Tips

- When unsure, check existing compliant blocks like `HeroBlocks.tsx` for reference
- Use browser DevTools to verify CSS variables are being applied
- Test theme changes by modifying values in `/src/styles/theme.css`
- Remember: If it's not using a CSS variable, users can't theme it!
