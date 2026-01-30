# Design System Migration Checklist

## Overview
This checklist helps ensure all components in the Site Builder are fully compliant with the design system defined in `/src/styles/theme.css`.

---

## 📋 Pre-Migration

- [ ] Review `/DESIGN_SYSTEM_COMPLIANCE.md`
- [ ] Review `/REFACTORING_EXAMPLES.md`
- [ ] Understand the design system utilities in `/src/app/utils/design-system.ts`
- [ ] Set up testing environment to verify theme changes

---

## 🔍 Files to Audit

### High Priority - Block Components
These files generate user-facing UI and must be 100% compliant:

- [ ] `/src/app/components/blocks/HeroBlocks.tsx`
- [ ] `/src/app/components/blocks/AgendaBlocks.tsx`
- [ ] `/src/app/components/blocks/SpeakerBlocks.tsx`
- [ ] `/src/app/components/blocks/PricingBlocks.tsx`
- [ ] `/src/app/components/blocks/FAQBlocks.tsx`
- [ ] `/src/app/components/blocks/SponsorBlocks.tsx`
- [ ] `/src/app/components/blocks/CountdownBlocks.tsx`
- [ ] `/src/app/components/blocks/TestimonialBlocks.tsx`
- [ ] `/src/app/components/blocks/BoothMapBlocks.tsx`
- [ ] `/src/app/components/blocks/DocumentsBlocks.tsx`
- [ ] `/src/app/components/blocks/NewsletterBlocks.tsx`
- [ ] `/src/app/components/blocks/ImageGalleryBlocks.tsx`
- [ ] `/src/app/components/blocks/VideoBlocks.tsx`
- [ ] `/src/app/components/blocks/BlockCategoryView.tsx`

### Medium Priority - UI Components
Reusable UI components used throughout the application:

- [ ] `/src/app/components/ui/button.tsx`
- [ ] `/src/app/components/ui/card.tsx`
- [ ] `/src/app/components/ui/badge.tsx`
- [ ] `/src/app/components/ui/input.tsx`
- [ ] `/src/app/components/ui/label.tsx`
- [ ] `/src/app/components/ui/dialog.tsx`
- [ ] `/src/app/components/ui/select.tsx`
- [ ] `/src/app/components/ui/tabs.tsx`
- [ ] Other UI components in `/src/app/components/ui/`

### Low Priority - Internal Components
Builder interface components (less critical for user-generated output):

- [ ] `/src/app/components/site-builder/TopNav.tsx`
- [ ] `/src/app/components/site-builder/Sidebar.tsx`
- [ ] `/src/app/components/site-builder/Canvas.tsx`
- [ ] `/src/app/components/site-builder/SettingsPanel.tsx`
- [ ] `/src/app/components/theme-builder/ThemeBuilder.tsx`

---

## 🛠️ Migration Steps for Each File

### Step 1: Import Design System Utilities
```tsx
import { typography, layout, classNames, cssVars } from '@/app/utils/design-system';
```

### Step 2: Identify Violations
Run a search for these patterns:
- `text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl)`
- `font-(thin|light|normal|medium|semibold|bold|black)`
- `text-\[` (arbitrary values)
- `bg-(gray|zinc|blue|red|green)-\d+`
- `text-(gray|zinc|blue|red|green)-\d+`
- Inline styles with hardcoded `fontSize`, `fontWeight`, `fontFamily`

### Step 3: Replace Typography
| Find | Replace With |
|------|-------------|
| `className="text-6xl font-bold"` | `style={typography.h1}` |
| `className="text-4xl font-bold"` | `style={typography.h2}` |
| `className="text-2xl font-semibold"` | `style={typography.h3}` |
| `className="text-lg font-semibold"` | `style={typography.h4}` |
| `className="text-base"` | `style={typography.body}` |
| `className="text-sm"` | `style={typography.bodySmall}` |

### Step 4: Replace Colors
| Find | Replace With |
|------|-------------|
| `bg-white` or `bg-gray-50` | `bg-background` |
| `bg-gray-100` or `bg-zinc-100` | `bg-card` or `bg-muted` |
| `bg-blue-600` | `bg-primary` |
| `text-black` or `text-gray-900` | `text-foreground` |
| `text-gray-500` or `text-gray-400` | `text-muted-foreground` |
| `text-blue-600` | `text-primary` |

### Step 5: Replace Layout
| Find | Replace With |
|------|-------------|
| `className="max-w-7xl mx-auto px-8"` | `className="mx-auto w-full" style={layout.container}` |
| `className="max-w-6xl mx-auto px-8"` | `className="mx-auto w-full" style={layout.containerLg}` |
| `className="max-w-4xl mx-auto px-8"` | `className="mx-auto w-full" style={layout.containerMd}` |

### Step 6: Replace Border Radius
| Find | Replace With |
|------|-------------|
| `className="rounded-lg"` | `style={{ borderRadius: cssVars.radiusLg }}` |
| `className="rounded-xl"` | `style={{ borderRadius: cssVars.radiusXl }}` |
| `className="rounded-md"` | `style={{ borderRadius: cssVars.radiusMd }}` |

### Step 7: Test
- [ ] Component renders correctly
- [ ] Modify CSS variables in `/src/styles/theme.css`
- [ ] Verify component updates to reflect new values
- [ ] Test in light mode
- [ ] Test in dark mode
- [ ] Test responsive behavior

---

## 🎯 Specific Component Patterns

### Pattern: Hero Block
```tsx
<div className="w-full py-24 bg-background">
  <div className={classNames.container} style={layout.container}>
    <h1 className={classNames.textForeground} style={typography.h1}>
      Hero Title
    </h1>
    <p className={classNames.textMuted} style={typography.bodyLarge}>
      Description
    </p>
  </div>
</div>
```

### Pattern: Card
```tsx
<div 
  className="bg-card border border-border p-6"
  style={{ borderRadius: cssVars.radiusLg }}
>
  <h3 className={classNames.textForeground} style={typography.h3}>
    Card Title
  </h3>
  <p className={classNames.textMuted} style={typography.body}>
    Card content
  </p>
</div>
```

### Pattern: Button
```tsx
<button
  className="px-6 py-3 bg-primary text-primary-foreground hover:bg-primary-hover"
  style={{
    ...typography.button,
    borderRadius: cssVars.radiusLg
  }}
>
  Click Me
</button>
```

---

## 🧪 Testing Protocol

### Visual Testing
1. [ ] Render component in browser
2. [ ] Open DevTools > Elements
3. [ ] Verify CSS variables are applied (look for `var(--text-*)`, etc.)
4. [ ] Take before screenshot

### Theme Testing
1. [ ] Open `/src/styles/theme.css`
2. [ ] Change `--text-6xl` from `clamp(40px, 2.5vw + 30px, 60px)` to `80px`
3. [ ] Verify all H1 elements update to 80px
4. [ ] Change `--primary` from `#2563eb` to `#ff0000`
5. [ ] Verify all primary-colored elements turn red
6. [ ] Revert changes
7. [ ] Take after screenshot

### Dark Mode Testing
1. [ ] Add `className="dark"` to root element
2. [ ] Verify colors invert correctly
3. [ ] Verify all text remains readable
4. [ ] Remove dark class

### Responsive Testing
1. [ ] Test at 375px (mobile)
2. [ ] Test at 768px (tablet)
3. [ ] Test at 1280px (desktop)
4. [ ] Verify typography scales appropriately
5. [ ] Verify layouts adapt correctly

---

## 📊 Progress Tracking

### Block Components
- [ ] 0/14 Hero variants
- [ ] 0/8 Agenda variants
- [ ] 0/8 Speaker variants
- [ ] 0/6 Pricing variants
- [ ] 0/5 FAQ variants
- [ ] 0/6 Sponsor variants
- [ ] 0/3 Countdown variants
- [ ] 0/5 Testimonial variants
- [ ] 0/3 Booth Map variants
- [ ] 0/3 Documents variants
- [ ] 0/4 Newsletter variants
- [ ] 0/4 Image Gallery variants
- [ ] 0/3 Video variants

### UI Components
- [ ] 0/20 UI components

### Builder Components
- [ ] 0/10 Builder components

---

## ✅ Definition of Done

A component is considered migrated when:

1. [ ] No hardcoded Tailwind typography classes (`text-*`, `font-*`)
2. [ ] No arbitrary values (`text-[24px]`)
3. [ ] All font sizes use CSS variables via inline styles
4. [ ] All font weights use CSS variables via inline styles
5. [ ] All font families use `font-sans/serif/mono` classes or CSS variables
6. [ ] All colors use design system color classes
7. [ ] Container widths use CSS variables
8. [ ] Border radius uses CSS variables
9. [ ] Component passes visual testing
10. [ ] Component passes theme testing
11. [ ] Component passes dark mode testing
12. [ ] Component passes responsive testing
13. [ ] Code review completed
14. [ ] Documentation updated if needed

---

## 🚨 Common Pitfalls

### Pitfall 1: Mixing Approaches
❌ **Wrong:**
```tsx
<h1 className="text-6xl" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
```

✅ **Correct:**
```tsx
<h1 style={typography.h1}>
```

### Pitfall 2: Forgetting Font Family
❌ **Wrong:**
```tsx
<h1 style={{ fontSize: 'var(--text-6xl)', fontWeight: 'var(--font-weight-semibold)' }}>
```

✅ **Correct:**
```tsx
<h1 style={{ ...typography.h1 }}>
// OR
<h1 className="font-sans" style={{ fontSize: 'var(--text-6xl)', fontWeight: 'var(--font-weight-semibold)' }}>
```

### Pitfall 3: Using Tailwind's Built-in Color Scale
❌ **Wrong:**
```tsx
<div className="bg-blue-600 text-white">
```

✅ **Correct:**
```tsx
<div className="bg-primary text-primary-foreground">
```

### Pitfall 4: Hardcoding Max Width
❌ **Wrong:**
```tsx
<div className="max-w-7xl mx-auto">
```

✅ **Correct:**
```tsx
<div className="mx-auto w-full" style={layout.container}>
```

---

## 📝 Notes

- **Backwards Compatibility**: Existing user sites won't break - they'll continue using current values
- **Progressive Migration**: Migrate files incrementally, test thoroughly
- **Documentation**: Update component docs as you migrate
- **Team Communication**: Share learnings and patterns with the team

---

## 🎓 Resources

- `/DESIGN_SYSTEM_COMPLIANCE.md` - Full compliance guide
- `/REFACTORING_EXAMPLES.md` - Before/after examples
- `/src/app/utils/design-system.ts` - Helper utilities
- `/src/app/utils/validate-design-system.ts` - Validation tools
- `/src/styles/theme.css` - Design system source of truth

---

## 🏁 Final Validation

Before marking migration as complete:

1. [ ] Run a global search for `text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)` - should return 0 results in block files
2. [ ] Run a global search for `font-(bold|semibold|medium)` - should return 0 results in block files
3. [ ] Test a complete theme change (modify multiple CSS variables)
4. [ ] Verify all generated blocks update accordingly
5. [ ] Test dark mode across all block categories
6. [ ] Get final sign-off from design team
