import React from 'react';

export interface LogoStyleProps {
  color?: string;
  opacity?: number;
}

/**
 * Returns CSS styles to apply color tinting and opacity to a transparent PNG/SVG logo.
 * If color is provided and not default/empty, applies SVG filter or drop-shadow trick,
 * or returns standard styles.
 */
export function getLogoEffectsStyle(logoColor?: string, logoOpacity?: number): React.CSSProperties {
  const style: React.CSSProperties = {};

  if (typeof logoOpacity === 'number') {
    // 0 to 100 or 0 to 1
    const normalized = logoOpacity > 1 ? logoOpacity / 100 : logoOpacity;
    style.opacity = Math.max(0, Math.min(1, normalized));
  }

  // If color is specified and not transparent/none
  if (logoColor && logoColor.trim() && logoColor !== 'transparent' && logoColor !== 'inherit') {
    // For transparent PNG: using drop-shadow color tinting or CSS filter
    // e.g. drop-shadow(0 0 0 [color])
    style.filter = `drop-shadow(0px 0px 0px ${logoColor.trim()})`;
  }

  return style;
}
