'use client';

import React, { useEffect } from 'react';
import { getFontUrl } from '@/lib/google-fonts';
import { DEFAULT_FONTS, DEFAULT_THEMES_LIST } from '@/data/defaultContent';
import { useSiteContent } from '@/lib/content';

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

export default function FontProvider({ children }: { children: React.ReactNode }) {
  const { content } = useSiteContent();

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const fonts = content?.fonts || DEFAULT_FONTS;
    const activeThemeId =
      content?.themes?.activeThemeId ||
      content?.settings?.activeThemeId ||
      'basic-light';
    const themesList = content?.themes?.items || DEFAULT_THEMES_LIST;
    const activeTheme =
      themesList.find((t) => t.id === activeThemeId) || DEFAULT_THEMES_LIST[0];

    const headingFont = activeTheme?.headingFont || fonts.siteHeadingFont || 'Inter';
    const bodyFont = activeTheme?.bodyFont || fonts.siteBodyFont || 'Inter';
    const adminFont = fonts.adminFont || 'Inter';
    const uppercase = activeTheme?.uppercaseHeadings ?? fonts.uppercaseHeadings ?? false;

    const root = document.documentElement;
    root.style.setProperty(
      '--font-body',
      `"${bodyFont}", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
    );
    root.style.setProperty(
      '--font-heading',
      `"${headingFont}", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
    );
    root.style.setProperty(
      '--font-admin',
      `"${adminFont}", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
    );
    root.style.setProperty('--heading-transform', uppercase ? 'uppercase' : 'none');

    loadFont(headingFont);
    loadFont(bodyFont);
    loadFont(adminFont);
  }, [content]);

  return <>{children}</>;
}
