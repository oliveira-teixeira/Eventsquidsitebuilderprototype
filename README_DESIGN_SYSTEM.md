# Site Builder Design System Implementation Guide

## 🎯 Quick Start

Your Site Builder now has a **complete design system** defined in `/src/styles/theme.css` that ensures all generated UI can be fully themeable by users via CSS variables.

**STATUS:** Design system is defined and ready. Helper utilities are available in `/src/app/utils/design-system.ts` for optional use.

---

## 📚 Documentation Overview

| Document | Purpose | When to Use |
|----------|---------|-------------|
| **`/DESIGN_SYSTEM_COMPLIANCE.md`** | Complete design system rules and patterns | Learn what to do and what to avoid |
| **`/REFACTORING_EXAMPLES.md`** | Before/after refactoring examples | See practical examples of fixes |
| **`/MIGRATION_CHECKLIST.md`** | Step-by-step migration guide | Track progress during migration |
| **`/src/app/utils/design-system.ts`** | Helper utilities and presets (optional) | Import and use in new components |
| **`/QUICK_REFERENCE.md`** | Quick cheat sheet | Keep open while coding |

---

## 🚀 Implementation Workflow

### Step 1: Understand the Design System
Read `/DESIGN_SYSTEM_COMPLIANCE.md` to understand:
- ❌ What patterns to avoid
- ✅ What patterns to use
- 📋 Quick reference for common replacements

### Step 2: Study Examples
Review `/REFACTORING_EXAMPLES.md` to see:
- Before/after comparisons
- Complete implementations
- Common patterns

### Step 3: Use Helper Utilities (Optional)
You can optionally import design system utilities in your components:

```tsx
import { typography, layout, cssVars } from '@/app/utils/design-system';
```

Or use CSS variables directly in inline styles:

```tsx
<h1 style={{ fontSize: 'var(--text-6xl)', fontWeight: 'var(--font-weight-semibold)' }}>
  Title
</h1>
```

### Step 4: Refactor Components
Follow `/MIGRATION_CHECKLIST.md` to:
- Identify files to refactor
- Apply systematic changes
- Test each component
- Track progress

### Step 5: Validate Compliance
Use validation tools to catch issues:

```tsx
import { hasNonCompliantPatterns, generateViolationReport } from '@/app/utils/validate-design-system';

const componentCode = `...your code...`;
const result = hasNonCompliantPatterns(componentCode);
console.log(generateViolationReport(result.violations));
```

---

## ✅ Design System Compliance Rules

### Typography ✏️

**❌ DON'T:**
```tsx
<h1 className="text-6xl font-bold">Title</h1>
<p className="text-lg font-medium">Body</p>
```

**✅ DO:**
```tsx
<h1 style={typography.h1}>Title</h1>
<p style={typography.bodyLarge}>Body</p>
```

**OR:**
```tsx
<h1 
  className={classNames.fontSans}
  style={{
    fontSize: cssVars.text6xl,
    fontWeight: cssVars.fontWeightSemibold,
  }}
>
  Title
</h1>
```

### Colors 🎨

**❌ DON'T:**
```tsx
<div className="bg-blue-600 text-white">
  <p className="text-gray-400">Muted text</p>
</div>
```

**✅ DO:**
```tsx
<div className="bg-primary text-primary-foreground">
  <p className="text-muted-foreground">Muted text</p>
</div>
```

### Layout 📐

**❌ DON'T:**
```tsx
<div className="max-w-7xl mx-auto px-8">
  Content
</div>
```

**✅ DO:**
```tsx
<div className={classNames.container} style={layout.container}>
  Content
</div>
```

### Border Radius 🔲

**❌ DON'T:**
```tsx
<div className="rounded-lg">Card</div>
```

**✅ DO:**
```tsx
<div style={{ borderRadius: cssVars.radiusLg }}>Card</div>
```

---

## 🎨 Design System Tokens

### Typography Sizes
```css
--text-8xl  /* 60-96px responsive */
--text-7xl  /* 50-72px responsive */
--text-6xl  /* 40-60px responsive */
--text-5xl  /* 32-48px responsive */
--text-4xl  /* 28-36px responsive */
--text-3xl  /* 24-30px responsive */
--text-2xl  /* 20-24px responsive */
--text-xl   /* 18-20px responsive */
--text-lg   /* 16-18px responsive */
--text-base /* 14-16px responsive */
--text-sm   /* 12-14px responsive */
--text-xs   /* 11-12px responsive */
```

### Font Weights
```css
--font-weight-normal    /* 400 */
--font-weight-medium    /* 500 */
--font-weight-semibold  /* 600 */
```

### Font Families
```css
--font-sans   /* 'Inter', sans-serif */
--font-serif  /* 'Playfair Display', serif */
--font-mono   /* 'JetBrains Mono', monospace */
```

### Colors
```css
--background / --foreground
--card / --card-foreground
--primary / --primary-foreground / --primary-hover
--secondary / --secondary-foreground / --secondary-hover
--muted / --muted-foreground
--accent / --accent-foreground
--destructive / --destructive-foreground
--border / --input / --ring
```

### Layout
```css
--max-width           /* Default container width */
--global-padding      /* Default padding */
--container-width-xs  /* 512px */
--container-width-sm  /* 768px */
--container-width-md  /* 1024px */
--container-width-lg  /* 1280px */
--container-width-xl  /* 1536px */
```

### Radius
```css
--radius     /* Base radius (0.5rem) */
--radius-sm  /* calc(--radius - 2px) */
--radius-md  /* --radius */
--radius-lg  /* calc(--radius + 2px) */
--radius-xl  /* calc(--radius + 4px) */
```

---

## 🛠️ Helper Utilities

### Typography Presets

```tsx
import { typography } from '@/app/utils/design-system';

// Use predefined typography styles
<h1 style={typography.h1}>Heading 1</h1>
<h2 style={typography.h2}>Heading 2</h2>
<h3 style={typography.h3}>Heading 3</h3>
<h4 style={typography.h4}>Heading 4</h4>
<p style={typography.body}>Body text</p>
<p style={typography.bodyLarge}>Large body</p>
<p style={typography.bodySmall}>Small body</p>
<label style={typography.label}>Label</label>
<button style={typography.button}>Button</button>
```

### Layout Presets

```tsx
import { layout } from '@/app/utils/design-system';

// Use predefined container styles
<div style={layout.container}>Default container</div>
<div style={layout.containerLg}>Large container</div>
<div style={layout.containerMd}>Medium container</div>
<div style={layout.containerSm}>Small container</div>
```

### CSS Variable References

```tsx
import { cssVars } from '@/app/utils/design-system';

// Direct CSS variable references
<h1 style={{ fontSize: cssVars.text6xl }}>Title</h1>
<p style={{ fontSize: cssVars.textBase }}>Body</p>
<div style={{ borderRadius: cssVars.radiusLg }}>Card</div>
```

### Tailwind Class Helpers

```tsx
import { classNames } from '@/app/utils/design-system';

// Design-system-compliant Tailwind classes
<div className={classNames.container}>Container</div>
<p className={classNames.textForeground}>Foreground text</p>
<p className={classNames.textMuted}>Muted text</p>
<div className={classNames.bgCard}>Card background</div>
<div className={classNames.border}>Bordered element</div>
```

---

## 🧪 Testing Themeability

To verify your components are themeable:

### Test 1: Change Typography Size
1. Open `/src/styles/theme.css`
2. Change `--text-6xl` from `clamp(40px, 2.5vw + 30px, 60px)` to `80px`
3. Reload your component
4. **Expected:** All H1 elements should be 80px
5. Revert the change

### Test 2: Change Primary Color
1. Open `/src/styles/theme.css`
2. Change `--primary` from `#2563eb` to `#ff0000`
3. Reload your component
4. **Expected:** All primary-colored elements should turn red
5. Revert the change

### Test 3: Dark Mode
1. Add `className="dark"` to the root `<html>` or `<body>` element
2. **Expected:** Component should adapt to dark mode colors
3. Remove the class

### Test 4: Change Container Width
1. Open `/src/styles/theme.css`
2. Change `--max-width` from `var(--container-width-lg)` to `var(--container-width-sm)`
3. Reload your component
4. **Expected:** All containers should be narrower
5. Revert the change

---

## 📊 Current Status

Your design system is **ready to use**:

1. ✅ Design system defined in `/src/styles/theme.css`
2. ✅ Typography, colors, spacing, and radius tokens established
3. ✅ Helper utilities created in `/src/app/utils/design-system.ts` (optional)
4. ✅ Complete documentation provided
5. ⏳ **Next:** Start migrating block components using the patterns in `/DESIGN_SYSTEM_COMPLIANCE.md`

---

## 🎯 Priority Action Items

### Immediate
1. [ ] Review `/DESIGN_SYSTEM_COMPLIANCE.md` for rules and patterns
2. [ ] Review `/REFACTORING_EXAMPLES.md` for before/after examples
3. [ ] Test theme changes manually in browser (change CSS variables in `/src/styles/theme.css`)
4. [ ] Practice on one component

### Short Term (Next 2 Weeks)
1. [ ] Migrate all Hero block variants
2. [ ] Migrate all Agenda block variants
3. [ ] Migrate all Speaker block variants
4. [ ] Test each migrated component thoroughly

### Medium Term (Next Month)
1. [ ] Migrate all remaining block components
2. [ ] Migrate UI components
3. [ ] Update component documentation
4. [ ] Create user-facing theme customization guide

---

## 💡 Tips & Best Practices

### 1. Always Import Utilities First
```tsx
import { typography, layout, cssVars } from '@/app/utils/design-system';
```

### 2. Use Typography Presets When Possible
Presets are easier to use and more consistent:
```tsx
// ✅ Good
<h1 style={typography.h1}>Title</h1>

// ⚠️ OK, but more verbose
<h1 style={{ fontSize: cssVars.text6xl, fontWeight: cssVars.fontWeightSemibold }}>Title</h1>
```

### 3. Combine Tailwind Classes with Inline Styles
```tsx
<h1 
  className="text-foreground font-sans tracking-tight"
  style={typography.h1}
>
  Title
</h1>
```

### 4. Keep Font Families Consistent
Always use `font-sans`, `font-serif`, or `font-mono` classes, or include `fontFamily` in inline styles.

### 5. Test After Every Change
- Verify visual appearance
- Test theme customization
- Test dark mode
- Test responsiveness

---

## 🆘 Troubleshooting

### Issue: Component doesn't update when I change CSS variables
**Solution:** Make sure you're using CSS variables in inline styles, not hardcoded Tailwind classes:
```tsx
// ❌ Won't update
<h1 className="text-6xl">Title</h1>

// ✅ Will update
<h1 style={{ fontSize: 'var(--text-6xl)' }}>Title</h1>
```

### Issue: Dark mode isn't working
**Solution:** Make sure you're using design system color classes:
```tsx
// ❌ Won't adapt
<div className="bg-white text-black">

// ✅ Will adapt
<div className="bg-background text-foreground">
```

### Issue: Typography looks wrong on mobile
**Solution:** CSS variables are responsive by default using `clamp()`. If you need mobile-specific sizes, use mobile variables:
```tsx
<h1 style={{ fontSize: cssVars.textMobileHero }}>Mobile Hero</h1>
```

---

## 📞 Support

- **Main Guide:** Start with `/DESIGN_SYSTEM_COMPLIANCE.md`
- **Examples:** Check `/REFACTORING_EXAMPLES.md`
- **Quick Reference:** See `/QUICK_REFERENCE.md`
- **Checklist:** Track migration in `/MIGRATION_CHECKLIST.md`

---

## 🎉 Benefits

By following this design system, you get:

- ✅ **Full Themeability:** Users can customize everything via CSS
- ✅ **Consistent Design:** All components use the same tokens
- ✅ **Responsive Typography:** Automatically scales with viewport
- ✅ **Dark Mode Support:** Built-in dark mode theming
- ✅ **Easy Maintenance:** Change once, update everywhere
- ✅ **Better UX:** Professional, cohesive design system
- ✅ **Future Proof:** Easy to update and extend

---

**Ready to get started? Begin with `/DESIGN_SYSTEM_COMPLIANCE.md` and the compliant example file!**