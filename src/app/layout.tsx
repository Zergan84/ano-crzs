import type { Metadata } from 'next';
import './globals.css';
import { SiteShell } from '@/components/layout/SiteShell';
import FontProvider from '@/components/FontProvider';
import { ORGANIZATION } from '@/data/organization';

export const metadata: Metadata = {
  title: 'АНО «ЦЗСТ» — Центр развития зимнего спорта, современных спортивных технологий и туризма',
  description:
    'Автономная некоммерческая организация «Центр развития зимнего спорта, современных спортивных технологий и туризма» (АНО «ЦЗСТ»): реализация социально значимых программ, внедрение научно обоснованных методик спортивной подготовки, биомеханики и организация физкультурно-туристских мероприятий на территории РФ.',
  keywords:
    'АНО ЦЗСТ, Центр развития зимнего спорта, спортивные технологии, биомеханика спорта, бутфитинг, горнолыжный спорт, сноуборд, горнолыжный туризм, наставничество в спорте, Красногорск Архангельское',
  authors: [{ name: ORGANIZATION.shortName }],
  openGraph: {
    title: 'АНО «ЦЗСТ» — Центр развития зимнего спорта, современных спортивных технологий и туризма',
    description:
      'Развитие спортивных технологий, зимних дисциплин и активного долголетия. Методическая экспертиза, биомеханика, подготовка кадров и содействие нацпроектам спорта и туризма РФ.',
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
    <html lang="ru" className="scroll-smooth">
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
