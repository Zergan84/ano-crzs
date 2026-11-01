import type { Metadata } from 'next';
import { Onest, Inter } from 'next/font/google';
import './globals.css';
import { SiteShell } from '@/components/layout/SiteShell';
import FontProvider from '@/components/FontProvider';
import { ORGANIZATION } from '@/data/organization';

const onest = Onest({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-onest',
});

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Центр развития спорта — АНО «ЦЗСТ»',
  description:
    'Автономная некоммерческая организация. Реализуем государственные и социальные программы в сфере физической культуры и спорта: от школьных секций до подготовки спортивного резерва.',
  keywords:
    'АНО ЦЗСТ, Центр развития спорта, зимний спорт, спортивные технологии, программы спорта, подготовка тренеров, спортивный резерв',
  authors: [{ name: ORGANIZATION.shortName }],
  openGraph: {
    title: 'Центр развития спорта — АНО «ЦЗСТ»',
    description:
      'Развиваем спорт, который объединяет регионы. Государственные и социальные программы в сфере физической культуры и спорта.',
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
    <html lang="ru" className={`scroll-smooth ${onest.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#1E293B] antialiased selection:bg-amber-500/20 selection:text-[#0F172A]">
        <FontProvider>
          <SiteShell>
            {children}
          </SiteShell>
        </FontProvider>
      </body>
    </html>
  );
}
