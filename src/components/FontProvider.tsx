'use client';

import React, { useEffect, useState } from 'react';
import { getFontUrl } from '@/lib/google-fonts';
import { DEFAULT_FONTS } from '@/data/defaultContent';

interface FontSettings {
  siteHeadingFont: string;
  siteBodyFont: string;
  adminFont: string;
  uppercaseHeadings: boolean;
}

const loadedFonts = new Set<string>();

function loadFont(family: string) {
  if (!family || typeof document === 'undefined') return;
  if (loadedFonts.has(family)) return;
  loadedFonts.add(family);
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = getFontUrl(family);
  document.head.appendChild(link);
}

function applyFonts(f: FontSettings) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.style.setProperty('--font-body', `"${f.siteBodyFont}", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`);
  root.style.setProperty('--font-heading', `"${f.siteHeadingFont}", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`);
  root.style.setProperty('--font-admin', `"${f.adminFont}", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`);
  root.style.setProperty('--heading-transform', f.uppercaseHeadings ? 'uppercase' : 'none');
  loadFont(f.siteHeadingFont);
  loadFont(f.siteBodyFont);
  loadFont(f.adminFont);
}

export default function FontProvider({ children }: { children: React.ReactNode }) {
  const [fonts, setFonts] = useState<FontSettings>(DEFAULT_FONTS);

  useEffect(() => {
    const apiEndpoint = (typeof window !== 'undefined' && window.location.hostname.includes('pages.dev'))
      ? 'https://ano-crzs.101filmstudio.workers.dev/api/admin/content/fonts'
      : '/api/admin/content/fonts';

    fetch(apiEndpoint)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.siteHeadingFont) {
          setFonts(data as FontSettings);
          applyFonts(data as FontSettings);
        } else {
          applyFonts(DEFAULT_FONTS);
        }
      })
      .catch(() => applyFonts(DEFAULT_FONTS));
  }, []);

  return <>{children}</>;
}
