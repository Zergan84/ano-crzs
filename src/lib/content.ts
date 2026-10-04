'use client';

import { useState, useEffect } from 'react';
import { DEFAULT_CONTENT, SiteContent } from '@/data/defaultContent';

let cachedContent: SiteContent | null = null;

export function getDefaultContent(): SiteContent {
  return DEFAULT_CONTENT;
}

export async function getContent(): Promise<SiteContent> {
  if (typeof window !== 'undefined') {
    try {
      const res = await fetch('/api/content');
      if (res.ok) {
        const data = await res.json();
        const fullContent: SiteContent = { ...DEFAULT_CONTENT, ...data };
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
}

export async function updateSection(section: string, data: unknown): Promise<boolean> {
  try {
    const res = await fetch(`/api/admin/content/${section}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * React hook to get live content with instant fallback to static defaults
 */
export function useSiteContent(): { content: SiteContent; loading: boolean } {
  const [content, setContent] = useState<SiteContent>(cachedContent ?? DEFAULT_CONTENT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getContent().then((data) => {
      if (isMounted) {
        setContent(data);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return { content, loading };
}
