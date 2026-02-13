import React from 'react';

// Moved from block-registry.tsx to avoid circular dependency
export interface ImageSetting {
  url: string;
  fit?: 'cover' | 'contain' | 'fill' | 'scale-down';
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  zoom?: number;
  // Container controls
  containerHeight?: number; // in px, optional override
  containerBorderRadius?: number; // in px
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

  // Map position to transform-origin so zoom scales from the correct anchor
  const transformOriginMap: Record<string, string> = {
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

  const transformOrigin = transformOriginMap[position] || 'center center';

  return {
    objectFit: fit,
    objectPosition: objectPosition,
    transform: zoom !== 100 ? `scale(${zoom / 100})` : undefined,
    transformOrigin: zoom !== 100 ? transformOrigin : undefined
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
  if (styles.transformOrigin) {
    parts.push(`transform-origin: ${styles.transformOrigin}`);
  }

  return parts.join('; ');
}

/**
 * Helper to get container styles for the image wrapper div
 * Handles overflow clipping, border-radius, and optional height override
 */
export function getContainerStyles(
  imageValue: string | ImageSetting | undefined
): React.CSSProperties {
  if (!imageValue || typeof imageValue === 'string') {
    return { overflow: 'hidden' };
  }

  const containerHeight = imageValue.containerHeight;
  const containerBorderRadius = imageValue.containerBorderRadius;

  const styles: React.CSSProperties = {
    overflow: 'hidden',
  };

  if (containerHeight && containerHeight > 0) {
    styles.minHeight = `${containerHeight}px`;
  }

  if (containerBorderRadius !== undefined && containerBorderRadius > 0) {
    styles.borderRadius = `${containerBorderRadius}px`;
  }

  return styles;
}

/**
 * Helper to generate inline style string for the image container
 * Useful for HTML string generation
 */
export function getContainerStyleString(
  imageValue: string | ImageSetting | undefined
): string {
  const styles = getContainerStyles(imageValue);
  const parts: string[] = [];

  parts.push('overflow: hidden');

  if (styles.minHeight) {
    parts.push(`min-height: ${styles.minHeight}`);
  }
  if (styles.borderRadius) {
    parts.push(`border-radius: ${styles.borderRadius}`);
  }

  return parts.join('; ');
}
