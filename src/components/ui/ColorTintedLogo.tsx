import React from 'react';

/**
 * Renders a PNG / SVG image with an optional solid color tint and opacity control.
 * The original image remains 100% visible and sharp.
 * If color is specified and opacity > 0:
 * An overlay using CSS mask (webkitMaskImage) with the exact alpha silhouette of the logo
 * is tinted with the chosen color and blended over the logo with the given opacity.
 */
export function ColorTintedLogo({
  src,
  alt,
  className = '',
  color,
  opacity = 100,
  style = {},
}: {
  src: string;
  alt: string;
  className?: string;
  color?: string;
  opacity?: number;
  style?: React.CSSProperties;
}) {
  const hasColor = Boolean(color && color.trim() && color !== 'transparent');
  const tintOpacity = typeof opacity === 'number' ? Math.max(0, Math.min(100, opacity)) / 100 : 1;

  if (!hasColor || tintOpacity <= 0) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        style={style}
      />
    );
  }

  // If tintOpacity is 100% (1.0), the color fully replaces the logo pixels via mask
  // If tintOpacity is between 0 and 1, the tinted mask is layered over the original logo
  return (
    <div className={`relative inline-block ${className}`} style={{ ...style, lineHeight: 0 }}>
      {/* 1. Original sharp logo image */}
      <img
        src={src}
        alt={alt}
        className="w-full h-auto block select-none pointer-events-none"
      />
      {/* 2. Color tint overlay using the exact alpha silhouette of the logo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none transition-opacity duration-150"
        style={{
          backgroundColor: color,
          opacity: tintOpacity,
          WebkitMaskImage: `url("${src}")`,
          maskImage: `url("${src}")`,
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          maskPosition: 'center',
        }}
      />
    </div>
  );
}
