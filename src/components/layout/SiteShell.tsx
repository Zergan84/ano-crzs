'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LandingView } from '@/components/landing/LandingView';
import { useSiteContent } from '@/lib/content';

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { content } = useSiteContent();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  const siteMode = content?.settings?.siteMode || 'landing';

  if (siteMode === 'landing') {
    return <LandingView />;
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
