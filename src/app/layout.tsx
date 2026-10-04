import type { Metadata } from 'next';
import './globals.css';
import { SiteShell } from '@/components/layout/SiteShell';
import FontProvider from '@/components/FontProvider';
import { ORGANIZATION } from '@/data/organization';

export const metadata: Metadata = {
  title: `${ORGANIZATION.shortName} — Центр развития зимнего спорта, современных спортивных технологий и туризма`,
  description: 'Официальный портал АНО «ЦРЗС»: Единый реестр аттестованных специалистов и инструкторов, стандартизация трасс, курсы подготовки, судейские семинары и методические регламенты зимних видов спорта в РФ.',
  keywords: 'ЦРЗС, АНО ЦРЗС, реестр инструкторов, горнолыжный спорт, сноуборд, аттестация тренеров, стандарты горнолыжных трасс, зимний спорт, спортивные технологии',
  authors: [{ name: ORGANIZATION.shortName }],
  openGraph: {
    title: `${ORGANIZATION.shortName} — Официальный портал`,
    description: ORGANIZATION.tagline,
    type: 'website',
    locale: 'ru_RU',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-900 selection:text-white">
        <FontProvider>
          <SiteShell>
            {children}
          </SiteShell>
        </FontProvider>
      </body>
    </html>
  );
}

