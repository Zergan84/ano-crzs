import type { Metadata } from 'next';
import { Onest, Inter, Golos_Text } from 'next/font/google';
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

const golosText = Golos_Text({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-golos',
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
    <html lang="ru" suppressHydrationWarning className={`scroll-smooth ${onest.variable} ${inter.variable} ${golosText.variable}`}>
      <head>
        {/* Скрываем сайт до отрисовки актуального контента из R2, чтобы не мелькал контент по умолчанию */}
        <style
          dangerouslySetInnerHTML={{
            __html:
              'html:not(.content-ready) .site-themed-root{visibility:hidden;opacity:0}' +
              '.site-themed-root{transition:opacity .2s ease-out}',
          }}
        />
        <noscript>
          <style>{'.site-themed-root{visibility:visible!important}'}</style>
        </noscript>
        {/* Страховка: если скрипты не загрузились, показываем страницу через 4 секунды */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "setTimeout(function(){document.documentElement.classList.add('content-ready')},4000);",
          }}
        />
      </head>
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
