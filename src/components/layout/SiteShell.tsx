'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LandingView } from '@/components/landing/LandingView';
import { useSiteContent } from '@/lib/content';
import { DEFAULT_THEMES_LIST, ThemeConfig } from '@/data/defaultContent';
import { getFontUrl } from '@/lib/google-fonts';

const loadedThemeFonts = new Set<string>(['Onest', 'Inter']);

function ensureGoogleFont(family: string) {
  if (!family || typeof document === 'undefined') return;
  if (loadedThemeFonts.has(family)) return;
  loadedThemeFonts.add(family);
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = getFontUrl(family);
  document.head.appendChild(link);
}

function resolveCssFontStack(family: string): string {
  if (family === 'Onest') {
    return 'var(--font-onest), "Onest", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  }
  if (family === 'Inter') {
    return 'var(--font-inter), "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  }
  return `"${family}", var(--font-onest), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
}

function getShadowCss(shadow: ThemeConfig['cardShadow']): string {
  switch (shadow) {
    case 'none':
      return 'none';
    case 'sm':
      return '0 1px 3px 0 rgba(15, 23, 42, 0.05)';
    case 'md':
      return '0 1px 2px rgba(7, 26, 51, 0.04), 0 8px 24px -12px rgba(7, 26, 51, 0.12)';
    case 'lg':
      return '0 2px 4px rgba(7, 26, 51, 0.06), 0 20px 40px -16px rgba(7, 26, 51, 0.25)';
    default:
      return '0 1px 3px 0 rgba(15, 23, 42, 0.05)';
  }
}

function buildThemeCss(t: ThemeConfig): string {
  const shadowVal = getShadowCss(t.cardShadow);
  return `
    :root {
      --font-heading: ${resolveCssFontStack(t.headingFont)};
      --font-body: ${resolveCssFontStack(t.bodyFont)};
      --heading-transform: ${t.uppercaseHeadings ? 'uppercase' : 'none'};
      --theme-bg-primary: ${t.bgPrimary};
      --theme-bg-secondary: ${t.bgSecondary};
      --theme-card-bg: ${t.cardBg};
      --theme-card-border: ${t.cardBorder};
      --theme-header-bg: ${t.headerBg};
      --theme-dark-panel: ${t.darkPanelBg};
      --theme-text-heading: ${t.textHeading};
      --theme-text-body: ${t.textBody};
      --theme-text-muted: ${t.textMuted};
      --theme-btn-from: ${t.btnPrimaryFrom};
      --theme-btn-to: ${t.btnPrimaryTo};
      --theme-btn-text: ${t.btnPrimaryText};
      --theme-btn-sec-bg: ${t.btnSecondaryBg};
      --theme-btn-sec-text: ${t.btnSecondaryText};
      --theme-accent: ${t.accentColor};
      --theme-badge-bg: ${t.badgeBg};
      --theme-badge-text: ${t.badgeText};
      --theme-card-radius: ${t.cardRadius};
      --theme-btn-radius: ${t.buttonRadius};
    }

    .site-themed-root {
      font-family: var(--font-body) !important;
      font-size: ${t.baseFontSize || '16px'};
      background-color: ${t.bgPrimary} !important;
      color: ${t.textBody} !important;
    }

    .site-themed-root h1,
    .site-themed-root h2,
    .site-themed-root h3,
    .site-themed-root h4 {
      font-family: var(--font-heading) !important;
      text-transform: ${t.uppercaseHeadings ? 'uppercase' : 'none'};
    }

    /* Фоны секций */
    .site-themed-root section.bg-white,
    .site-themed-root section.bg-\\[\\#FFFFFF\\],
    .site-themed-root div.bg-\\[\\#FFFFFF\\] {
      background-color: ${t.bgPrimary} !important;
    }

    .site-themed-root section.bg-\\[\\#F8F9FA\\],
    .site-themed-root section.bg-slate-50,
    .site-themed-root .bg-\\[\\#F8F9FA\\]:not(input):not(select):not(textarea) {
      background-color: ${t.bgSecondary} !important;
    }

    /* Шапка лендинга */
    .site-themed-root > div > header:not(.bolt-header),
    .site-themed-root header.bg-\\[\\#FFFFFF\\]\\/95 {
      background-color: ${t.headerBg} !important;
      border-color: ${t.cardBorder} !important;
    }

    /* Карточки */
    .site-themed-root article:not(.bolt-card-dark),
    .site-themed-root .rounded-xl.border:not(.bg-\\[\\#0F172A\\]):not(.bg-slate-900):not(.bg-\\[\\#071A33\\]):not(.bolt-keep-bg) {
      background-color: ${t.cardBg} !important;
      border-color: ${t.cardBorder} !important;
      border-radius: ${t.cardRadius} !important;
      box-shadow: ${shadowVal} !important;
    }

    /* Границы */
    .site-themed-root .border-\\[\\#E2E8F0\\],
    .site-themed-root .border-slate-200 {
      border-color: ${t.cardBorder} !important;
    }

    /* Тёмные плашки и подвал */
    .site-themed-root footer,
    .site-themed-root .bg-\\[\\#0F172A\\],
    .site-themed-root .bg-\\[\\#0A192F\\] {
      background-color: ${t.darkPanelBg} !important;
    }

    /* Заголовки и текст (вне тёмных блоков и подвала) */
    .site-themed-root :not(footer):not(.bg-\\[\\#0F172A\\]) > .text-\\[\\#0F172A\\],
    .site-themed-root :not(footer):not(.bg-\\[\\#0F172A\\]) > .text-slate-900,
    .site-themed-root :not(footer):not(.bg-\\[\\#0F172A\\]) > .text-\\[\\#1E293B\\] {
      color: ${t.textHeading} !important;
    }

    .site-themed-root :not(footer):not(.bg-\\[\\#0F172A\\]) > .text-\\[\\#334155\\],
    .site-themed-root :not(footer):not(.bg-\\[\\#0F172A\\]) > .text-slate-600,
    .site-themed-root :not(footer):not(.bg-\\[\\#0F172A\\]) > .text-slate-700 {
      color: ${t.textBody} !important;
    }

    /* Основные кнопки (Primary CTA) */
    .site-themed-root a.from-orange-600,
    .site-themed-root button.from-orange-600,
    .site-themed-root a.bg-\\[\\#0A2540\\],
    .site-themed-root a.bg-blue-600 {
      background-image: linear-gradient(to right, ${t.btnPrimaryFrom}, ${t.btnPrimaryTo}) !important;
      background-color: ${t.btnPrimaryFrom} !important;
      color: ${t.btnPrimaryText} !important;
      border-radius: ${t.buttonRadius} !important;
    }

    /* Второстепенные кнопки */
    .site-themed-root a.bg-slate-100 {
      background-color: ${t.btnSecondaryBg} !important;
      color: ${t.btnSecondaryText} !important;
      border-color: ${t.cardBorder} !important;
      border-radius: ${t.buttonRadius} !important;
    }

    /* Акцентные иконки, линии и бейджи */
    .site-themed-root .text-orange-600,
    .site-themed-root .text-orange-700 {
      color: ${t.accentColor} !important;
    }

    .site-themed-root .bg-amber-50 {
      background-color: ${t.badgeBg} !important;
      color: ${t.badgeText} !important;
      border-color: ${t.cardBorder} !important;
    }
  `;
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { content } = useSiteContent();
  const isAdmin = pathname?.startsWith('/admin');

  const activeThemeId =
    content?.themes?.activeThemeId ||
    content?.settings?.activeThemeId ||
    'bolt-style';

  const themesList: ThemeConfig[] =
    content?.themes?.items && content.themes.items.length > 0
      ? content.themes.items
      : DEFAULT_THEMES_LIST;

  const activeTheme: ThemeConfig =
    themesList.find((t) => t.id === activeThemeId) ||
    themesList[0] ||
    DEFAULT_THEMES_LIST[0];

  useEffect(() => {
    if (!isAdmin && activeTheme) {
      ensureGoogleFont(activeTheme.headingFont);
      ensureGoogleFont(activeTheme.bodyFont);
    }
  }, [isAdmin, activeTheme]);

  if (isAdmin) {
    return <>{children}</>;
  }

  const siteMode = content?.settings?.siteMode || 'landing';

  return (
    <div className="site-themed-root min-h-screen flex flex-col">
      <style dangerouslySetInnerHTML={{ __html: buildThemeCss(activeTheme) }} />
      {siteMode === 'landing' ? (
        <LandingView />
      ) : (
        <>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </>
      )}
    </div>
  );
}
