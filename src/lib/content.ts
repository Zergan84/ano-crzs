'use client';

import { useState, useEffect } from 'react';
import { DEFAULT_CONTENT, SiteContent } from '@/data/defaultContent';

let cachedContent: SiteContent | null = null;

export function resolveMediaUrl(url: string | undefined): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/api/media/') && typeof window !== 'undefined' && window.location.hostname.includes('pages.dev')) {
    return `https://ano-crzs.101filmstudio.workers.dev${url}`;
  }
  return url;
}

export function getDefaultContent(): SiteContent {
  return DEFAULT_CONTENT;
}

function mergeThemesList(storedItems: any[] | undefined): any[] {
  const defaults = DEFAULT_CONTENT.themes.items;
  if (!Array.isArray(storedItems) || storedItems.length === 0) {
    return defaults;
  }
  const merged = storedItems.map((item) => {
    const def = defaults.find((d) => d.id === item.id);
    return def ? { ...def, ...item } : item;
  });
  for (const def of defaults) {
    if (!merged.some((m) => m.id === def.id)) {
      merged.push(def);
    }
  }
  return merged;
}

function mergeWithDefaults(data: any): SiteContent {
  if (!data || typeof data !== 'object') return DEFAULT_CONTENT;
  return {
    ...DEFAULT_CONTENT,
    ...data,
    settings: {
      ...DEFAULT_CONTENT.settings,
      ...(data.settings || {}),
    },
    themes: {
      ...DEFAULT_CONTENT.themes,
      ...(data.themes || {}),
      activeThemeId:
        data.themes?.activeThemeId ||
        data.settings?.activeThemeId ||
        DEFAULT_CONTENT.themes.activeThemeId,
      items: mergeThemesList(data.themes?.items),
    },
    landing: {
      ...DEFAULT_CONTENT.landing,
      ...(data.landing || {}),
      header: {
        ...DEFAULT_CONTENT.landing.header,
        ...(data.landing?.header || {}),
      },
      hero: {
        ...DEFAULT_CONTENT.landing.hero,
        ...(data.landing?.hero || {}),
      },
      ideology: {
        ...DEFAULT_CONTENT.landing.ideology,
        ...(data.landing?.ideology || {}),
      },
    },
    hero: {
      ...DEFAULT_CONTENT.hero,
      ...(data.hero || {}),
      showControls:
        typeof data.hero?.showControls === 'boolean'
          ? data.hero.showControls
          : DEFAULT_CONTENT.hero.showControls,
      slideDuration:
        typeof data.hero?.slideDuration === 'number' && data.hero.slideDuration > 0
          ? data.hero.slideDuration
          : DEFAULT_CONTENT.hero.slideDuration,
      sliderHeight:
        data.hero?.sliderHeight || DEFAULT_CONTENT.hero.sliderHeight,
      transitionEffect:
        data.hero?.transitionEffect || DEFAULT_CONTENT.hero.transitionEffect,
      slides:
        Array.isArray(data.hero?.slides) && data.hero.slides.length > 0
          ? data.hero.slides
          : DEFAULT_CONTENT.hero.slides,
    },
    organization: {
      ...DEFAULT_CONTENT.organization,
      ...(data.organization || {}),
      principles:
        Array.isArray(data.organization?.principles) && data.organization.principles.length > 0
          ? data.organization.principles
          : DEFAULT_CONTENT.organization.principles,
      directions:
        Array.isArray(data.organization?.directions) && data.organization.directions.length > 0
          ? data.organization.directions
          : DEFAULT_CONTENT.organization.directions,
      stats:
        Array.isArray(data.organization?.stats) && data.organization.stats.length > 0
          ? data.organization.stats
          : DEFAULT_CONTENT.organization.stats,
      bankRequisites: {
        ...DEFAULT_CONTENT.organization.bankRequisites,
        ...(data.organization?.bankRequisites || {}),
      },
    },
    footer: {
      ...DEFAULT_CONTENT.footer,
      ...(data.footer || {}),
    },
  };
}

export async function getContent(forceRefresh = false): Promise<SiteContent> {
  if (!forceRefresh && cachedContent) {
    return cachedContent;
  }
  if (typeof window !== 'undefined') {
    try {
      const apiEndpoint = window.location.hostname.includes('pages.dev')
        ? '/api/content'
        : '/api/content';
      const res = await fetch(apiEndpoint, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        const fullContent = mergeWithDefaults(data);
        cachedContent = fullContent;
        return fullContent;
      }
    } catch {
      // Fallback to cached or default
    }
  }
  return cachedContent ?? getDefaultContent();
}

export function setCachedContent(content: SiteContent) {
  cachedContent = content;
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('site-content-updated', { detail: content }));
  }
}

export function notifyContentUpdated() {
  cachedContent = null;
  if (typeof window !== 'undefined') {
    getContent(true).then((fresh) => {
      window.dispatchEvent(new CustomEvent('site-content-updated', { detail: fresh }));
    });
  }
}

export async function updateSection(section: string, data: unknown): Promise<boolean> {
  try {
    const apiEndpoint = (typeof window !== 'undefined' && window.location.hostname.includes('pages.dev'))
      ? `/api/admin/content/${section}`
      : `/api/admin/content/${section}`;
    const res = await fetch(apiEndpoint, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      notifyContentUpdated();
    }
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * React hook to get live content with instant fallback to static defaults
 */
export function useSiteContent(): { content: SiteContent; loading: boolean; refresh: () => void } {
  const [content, setContent] = useState<SiteContent>(cachedContent ?? DEFAULT_CONTENT);
  const [loading, setLoading] = useState(!cachedContent);

  useEffect(() => {
    let isMounted = true;
    getContent().then((data) => {
      if (isMounted) {
        setContent(data);
        setLoading(false);
      }
    });

    const handleUpdate = (e: Event) => {
      const customEvt = e as CustomEvent<SiteContent>;
      if (isMounted && customEvt.detail) {
        setContent(customEvt.detail);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('site-content-updated', handleUpdate);
    }

    return () => {
      isMounted = false;
      if (typeof window !== 'undefined') {
        window.removeEventListener('site-content-updated', handleUpdate);
      }
    };
  }, []);

  return {
    content,
    loading,
    refresh: () => notifyContentUpdated(),
  };
}
