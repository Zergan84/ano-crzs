'use client';

import React, { useMemo } from 'react';

interface GuillochePatternProps {
  className?: string;
  variant?: 'waves' | 'ribbon' | 'full';
  theme?: 'light' | 'dark' | 'navy';
  opacity?: number;
}

export const GuillochePattern: React.FC<GuillochePatternProps> = ({
  className = '',
  theme = 'light',
  opacity = 1,
}) => {
  const width = 1600;
  const height = 650;

  // Generate pure horizontal parametric guilloche wave ribbons
  const paths = useMemo(() => {
    const list: { d: string; color: string; strokeWidth: number; opacity: number }[] = [];

    // Helper for smoothing points into Q/T bezier SVG string
    const toSmoothPath = (pts: { x: number; y: number }[]) => {
      if (pts.length < 2) return '';
      let d = `M ${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
      for (let i = 1; i < pts.length - 1; i++) {
        const xc = (pts[i].x + pts[i + 1].x) / 2;
        const yc = (pts[i].y + pts[i + 1].y) / 2;
        d += ` Q ${pts[i].x.toFixed(1)},${pts[i].y.toFixed(1)} ${xc.toFixed(1)},${yc.toFixed(1)}`;
      }
      const last = pts[pts.length - 1];
      d += ` T ${last.x.toFixed(1)},${last.y.toFixed(1)}`;
      return d;
    };

    // Color palettes based on theme
    const primaryColor = theme === 'dark' || theme === 'navy' ? '#60A5FA' : '#1E40AF';
    const secondaryColor = theme === 'dark' || theme === 'navy' ? '#93C5FD' : '#2563EB';
    const accentColor = theme === 'dark' || theme === 'navy' ? '#F59E0B' : '#C53030';
    const tertiaryColor = theme === 'dark' || theme === 'navy' ? '#38BDF8' : '#3B82F6';

    // 1. Primary Moiré Guilloché Ribbon (32 braided harmonic waves across width)
    const waveCount = 32;
    const steps = 75;

    for (let i = 0; i < waveCount; i++) {
      const t = i / waveCount;
      const phase = t * Math.PI * 2;
      const pts: { x: number; y: number }[] = [];

      for (let s = 0; s <= steps; s++) {
        const x = (s / steps) * width;
        const nx = x / width;
        // Security envelope - natural graceful taper at borders
        const envelope = Math.sin(nx * Math.PI * 0.98 + 0.01);

        const y =
          height * 0.48 +
          Math.sin(nx * Math.PI * 3.5 + phase) * (78 + 32 * Math.sin(phase * 2)) * envelope +
          Math.sin(nx * Math.PI * 7 - phase * 1.5) * (36 + 16 * Math.cos(phase)) * envelope +
          Math.cos(nx * Math.PI * 12 + phase * 2.5) * (18 * envelope);

        pts.push({ x, y });
      }

      const waveOpacity = (0.04 + 0.075 * Math.sin(t * Math.PI)) * opacity;
      list.push({
        d: toSmoothPath(pts),
        color: i % 4 === 0 ? accentColor : i % 2 === 0 ? primaryColor : secondaryColor,
        strokeWidth: 0.85,
        opacity: Math.max(0.02, waveOpacity),
      });
    }

    // 2. Counter-phase braided horizontal ribbon
    const counterCount = 26;
    for (let i = 0; i < counterCount; i++) {
      const t = i / counterCount;
      const phase = t * Math.PI * 2;
      const pts: { x: number; y: number }[] = [];

      for (let s = 0; s <= steps; s++) {
        const x = (s / steps) * width;
        const nx = x / width;
        const envelope = Math.sin(nx * Math.PI);

        const y =
          height * 0.52 +
          Math.cos(nx * Math.PI * 4 - phase) * (88 * envelope) +
          Math.sin(nx * Math.PI * 8 + phase * 1.8) * (42 * envelope) +
          Math.cos(nx * Math.PI * 14 - phase) * (14 * envelope);

        pts.push({ x, y });
      }

      const counterOpacity = (0.03 + 0.055 * Math.sin(t * Math.PI)) * opacity;
      list.push({
        d: toSmoothPath(pts),
        color: secondaryColor,
        strokeWidth: 0.75,
        opacity: Math.max(0.02, counterOpacity),
      });
    }

    // 3. Fine-pitch micro-guilloché horizontal security lattice (no radial curves)
    const microCount = 18;
    for (let i = 0; i < microCount; i++) {
      const t = i / microCount;
      const phase = t * Math.PI * 2;
      const pts: { x: number; y: number }[] = [];

      for (let s = 0; s <= steps; s++) {
        const x = (s / steps) * width;
        const nx = x / width;
        const envelope = Math.sin(nx * Math.PI);

        const y =
          height * 0.5 +
          Math.sin(nx * Math.PI * 5 + phase * 1.2) * (50 * envelope) +
          Math.cos(nx * Math.PI * 10 - phase * 2) * (25 * envelope);

        pts.push({ x, y });
      }

      const microOpacity = (0.025 + 0.04 * Math.sin(t * Math.PI)) * opacity;
      list.push({
        d: toSmoothPath(pts),
        color: tertiaryColor,
        strokeWidth: 0.65,
        opacity: Math.max(0.015, microOpacity),
      });
    }

    return list;
  }, [theme, opacity]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {paths.map((p, idx) => (
          <path
            key={idx}
            d={p.d}
            stroke={p.color}
            strokeWidth={p.strokeWidth}
            opacity={p.opacity}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </svg>
    </div>
  );
};
