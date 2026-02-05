import React from 'react';

// Moved from block-registry.tsx to avoid circular dependency
export interface ImageSetting {
  url: string;
  fit?: 'cover' | 'contain' | 'fill' | 'scale-down';
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  zoom?: number;
  // Link settings for clickable images
  linkType?: 'internal' | 'external';
  linkUrl?: string;
  linkPageId?: string;
}

/**
 * Helper to get image URL from settings
 * Supports both string URLs and ImageSetting objects
 */
export function getImageUrl(
  imageValue: string | ImageSetting | undefined,
  defaultUrl: string
): string {
  if (!imageValue) return defaultUrl;
  if (typeof imageValue === 'string') return imageValue;
  // Ensure we access properties safely
  return (imageValue && imageValue.url) ? imageValue.url : defaultUrl;
}

/**
 * Helper to get CSS styles for image display from ImageSetting
 * Returns object-fit and object-position styles
 */
export function getImageStyles(
  imageValue: string | ImageSetting | undefined
): React.CSSProperties {
  if (!imageValue || typeof imageValue === 'string') {
    return {
      objectFit: 'cover',
      objectPosition: 'center'
    };
  }

  // Safe property access without optional chaining
  const fit = (imageValue && imageValue.fit) ? imageValue.fit : 'cover';
  const position = (imageValue && imageValue.position) ? imageValue.position : 'center';
  const zoom = (imageValue && imageValue.zoom !== undefined) ? imageValue.zoom : 100;

  // Convert position value to CSS object-position value
  const positionMap: Record<string, string> = {
    'top-left': 'left top',
    'top': 'center top',
    'top-right': 'right top',
    'left': 'left center',
    'center': 'center center',
    'right': 'right center',
    'bottom-left': 'left bottom',
    'bottom': 'center bottom',
    'bottom-right': 'right bottom'
  };

  const objectPosition = positionMap[position] || 'center center';

  return {
    objectFit: fit,
    objectPosition: objectPosition,
    transform: zoom !== 100 ? `scale(${zoom / 100})` : undefined
  };
}

/**
 * Helper to generate inline style string for image display
 * Useful for HTML string generation
 */
export function getImageStyleString(
  imageValue: string | ImageSetting | undefined
): string {
  const styles = getImageStyles(imageValue);
  const parts: string[] = [];

  if (styles.objectFit) {
    parts.push(`object-fit: ${styles.objectFit}`);
  }
  if (styles.objectPosition) {
    parts.push(`object-position: ${styles.objectPosition}`);
  }
  if (styles.transform) {
    parts.push(`transform: ${styles.transform}`);
  }

  return parts.join('; ');
}
