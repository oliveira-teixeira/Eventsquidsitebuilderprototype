# Image Crop and Display Controls

## Overview

The Site Builder now supports advanced image display controls, allowing users to control how uploaded images fit and display within their placeholders across all blocks (Hero, Speakers, Location, Hotel, etc.).

## Features

### 1. Image Upload with Adjustment Step

When a user uploads or selects an image, they can now:
- Adjust how the image fits within the placeholder
- Reposition the image focal point  
- Apply zoom to the image

This happens immediately after image selection via the **ImageCropModal**.

### 2. Image Settings Panel

After an image is applied, users can fine-tune the display using controls in the **Properties Panel** (right sidebar):

#### Image Fit Options
- **Cover**: Fills the area completely, may crop edges (default)
- **Contain**: Fits entire image within area, may show background
- **Fill**: Stretches image to fill area (may distort)
- **Stretch**: Never enlarges image, similar to contain

#### Image Position
A 3x3 grid control allows positioning the image:
- Top Left, Top, Top Right
- Left, Center, Right
- Bottom Left, Bottom, Bottom Right

#### Zoom Control
A slider (50% - 200%) allows zooming the image in or out.

## Technical Implementation

### Data Structure

Images are now stored as `ImageSetting` objects (or backward-compatible strings):

```typescript
export interface ImageSetting {
  url: string;
  fit?: 'cover' | 'contain' | 'fill' | 'scale-down';
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  zoom?: number; // percentage 50-200
}
```

### Block Settings

The `BlockSettings.images` property now supports both formats:

```typescript
export interface BlockSettings {
  // ... other settings
  images?: Record<string, string | ImageSetting>;
}
```

### Helper Utilities

Use the helper functions in `/src/app/utils/image-helpers.ts`:

```typescript
import { getImageUrl, getImageStyles, getImageStyleString } from '@/app/utils/image-helpers';

// Get the image URL (handles both string and ImageSetting)
const url = getImageUrl(settings.images?.['hero'], defaultUrl);

// Get React CSS styles object
const styles = getImageStyles(settings.images?.['hero']);
<img src={url} style={styles} />

// Get inline style string for HTML generation
const styleStr = getImageStyleString(settings.images?.['hero']);
<img src="${url}" style="${styleStr}" />
```

### ES2019 Compatibility

All code follows ES2019 compatibility:
- No optional chaining (`?.`)
- No nullish coalescing (`??`)
- Explicit conditional checks used throughout

## Components

### ImageCropModal
**Location**: `/src/app/components/site-builder/ImageCropModal.tsx`

Modal that appears after image selection, showing:
- Live preview of image with current settings
- Image fit options (4 buttons)
- Image position grid (3x3)
- Zoom slider

### PropertiesPanel Updates
**Location**: `/src/app/components/site-builder/PropertiesPanel.tsx`

Enhanced Images section now includes:
- Image preview thumbnail
- Upload/choose button
- Image Fit controls (inline)
- Position grid picker (inline)
- Zoom slider (inline)

### Block Registry Updates
**Location**: `/src/app/components/site-builder/block-registry.tsx`

- Added `ImageSetting` interface
- Updated `BlockSettings.images` to support `string | ImageSetting`
- Added `defaultFit` and `defaultPosition` to `BlockImageDefinition`

## User Workflow

1. **Select Block**: User selects a block with images (e.g., Hero, Speaker card)
2. **Open Properties**: Properties panel opens automatically
3. **Choose Image**: Click "Choose Image..." button
4. **Upload/Select**: Upload new image or select from library
5. **Adjust Display** (ImageCropModal opens automatically):
   - Choose fit option (Cover, Contain, etc.)
   - Position focal point using grid
   - Adjust zoom level
   - Click "Apply Changes"
6. **Fine-tune** (back in Properties Panel):
   - Real-time controls available for further adjustments
   - Changes apply immediately to preview

## Design System Compliance

All UI components use CSS variables from the design system:
- Typography: `var(--text-*)` variables
- Colors: `var(--primary)`, `var(--muted-foreground)`, etc.
- Spacing: `var(--spacing-*)` where applicable
- Border radius: `var(--radius)` and variants
- Font families: `var(--font-sans)`, `var(--font-serif)`, etc.

## Future Enhancements

Potential additions:
- Filter effects (brightness, contrast, saturation)
- Advanced cropping with aspect ratio constraints
- Image rotation controls
- Multiple focal points for responsive layouts
- AI-powered smart cropping suggestions
