'use client';

import React, { useEffect } from 'react';
import { getFontUrl } from '@/lib/google-fonts';
import { DEFAULT_FONTS, DEFAULT_THEMES_LIST } from '@/data/defaultContent';
import { useSiteContent } from '@/lib/content';

const loadedFonts = new Set<string>(['Onest', 'Inter']);

function loadFont(family: string) {
  if (!family || typeof document === 'undefined') return;
  if (loadedFonts.has(family)) return;
  loadedFonts.add(family);
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = getFontUrl(family);
  document.head.appendChild(link);
}

function resolveFontStack(family: string): string {
  if (family === 'Onest') {
    return 'var(--font-onest), "Onest", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  }
  if (family === 'Inter') {
    return 'var(--font-inter), "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  }
  return `"${family}", var(--font-onest), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
}

export default function FontProvider({ children }: { children: React.ReactNode }) {
  const { content } = useSiteContent();

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const fonts = content?.fonts || DEFAULT_FONTS;
    const activeThemeId =
      content?.themes?.activeThemeId ||
      content?.settings?.activeThemeId ||
      'tricolor';
    const themesList = content?.themes?.items || DEFAULT_THEMES_LIST;
    const activeTheme =
      themesList.find((t) => t.id === activeThemeId) || DEFAULT_THEMES_LIST[0];

    const headingFont = activeTheme?.headingFont || fonts.siteHeadingFont || 'Golos Text';
    const bodyFont = activeTheme?.bodyFont || fonts.siteBodyFont || 'Golos Text';
    const adminFont = fonts.adminFont || 'Inter';
    const uppercase = activeTheme?.uppercaseHeadings ?? fonts.uppercaseHeadings ?? false;

    const root = document.documentElement;
    root.style.setProperty('--font-body', resolveFontStack(bodyFont));
    root.style.setProperty('--font-heading', resolveFontStack(headingFont));
    root.style.setProperty('--font-admin', resolveFontStack(adminFont));
    root.style.setProperty('--heading-transform', uppercase ? 'uppercase' : 'none');

    loadFont(headingFont);
    loadFont(bodyFont);
    loadFont(adminFont);
  }, [content]);

  return <>{children}</>;
}
