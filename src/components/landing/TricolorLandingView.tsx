import React, { useState } from 'react';
import { 
  Users, 
  HeartHandshake, 
  Trophy, 
  GraduationCap, 
  Landmark, 
  Medal, 
  Building2, 
  FileText, 
  Waves, 
  TrendingUp, 
  ArrowRight, 
  Download, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Check, 
  X, 
  Menu 
} from 'lucide-react';
import { HeroSlider } from '@/components/HeroSlider';
import { resolveMediaUrl } from '@/lib/content';

interface TricolorLandingProps {
  header: any;
  org: any;
  directions: any[];
  principles: any[];
  newsItems: any[];
  docItems: any[];
  partnerItems: any[];
  ideology: any;
  footer: any;
  activeTheme: any;
  scrolled: boolean;
}

export function TricolorLandingView({
  header,
  org,
  directions,
  principles,
  newsItems,
  docItems,
  partnerItems,
  ideology,
  footer,
  activeTheme,
  scrolled,
}: TricolorLandingProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [docCategoryFilter, setDocCategoryFilter] = useState('Все');

  const navLinks = [
    { label: 'О центре', href: '#about' },
    { label: 'Проекты', href: '#projects' },
    { label: 'Новости', href: '#news' },
    { label: 'Документы', href: '#documents' },
    { label: 'Партнёры', href: '#partners' },
    { label: 'Контакты', href: '#contacts' },
  ];

  const logoUrl = resolveMediaUrl(header?.logoUrl) || '/logo.png';
  const logoColor = (header as any)?.logoColor || '';
  const logoOpacity = (header as any)?.logoOpacity;
  const headerCtaText = header?.ctaText || 'Стать партнёром';
  const headerCtaHref = header?.ctaHref || '#partnership';

  // About
  const aboutEyebrow = org?.aboutEyebrow || 'О центре';
  const aboutTitle = org?.aboutTitle || 'Миссия: спорт доступен каждому';
  const aboutDescription =
    org?.tagline ||
    org?.missionRole ||
    'Центр развития спорта создан для того, чтобы физическая культура стала частью жизни каждого человека, а регионы получили устойчивую систему подготовки спортсменов и тренеров.';
  const aboutBullets: string[] =
    Array.isArray(principles) && principles.length > 0
      ? principles.map((p: any) => p.title || p.description || '').filter(Boolean)
      : [
          'Прозрачность целевого использования средств и публичная отчётность',
          'Равный доступ к спортивной инфраструктуре в малых городах и сёлах',
          'Инклюзивные программы для детей и людей с ОВЗ',
          'Научно-методическое сопровождение и современные стандарты безопасности',
        ];
  const aboutImgUrl =
    resolveMediaUrl(org?.aboutImage) ||
    activeTheme?.aboutImage ||
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80';

  // Projects
  const projectsEyebrow = org?.projectsEyebrow || 'Проекты и программы';
  const projectsTitle = org?.projectsTitle || 'Спортивные и социальные проекты центра';
  const projectsSubtitle =
    org?.projectsSubtitle ||
    'Каждый проект направлен на конкретный результат: больше участников, лучшая инфраструктура и подготовленные кадры.';
  const projectIconList = [Users, HeartHandshake, Trophy, GraduationCap, Landmark, Medal];

  // News
  const newsList = Array.isArray(newsItems) && newsItems.length > 0 ? newsItems : [];

  // Documents
  const docList = Array.isArray(docItems) && docItems.length > 0 ? docItems : [];
  const docCategories = ['Все', 'Учредительные', 'Отчётность', 'Положения'];
  const filteredDocs =
    docCategoryFilter === 'Все'
      ? docList
      : docList.filter((d: any) =>
          d.category?.toLowerCase().includes(docCategoryFilter.toLowerCase())
        );

  // Partners
  const partnerGroups = (() => {
    const minList: any[] = [];
    const fedList: any[] = [];
    const sponList: any[] = [];
    (Array.isArray(partnerItems) ? partnerItems : []).forEach((p: any) => {
      const c = (p.category || '').toLowerCase();
      if (c.includes('ведомств') || c.includes('министерств')) minList.push(p.name);
      else if (c.includes('федерац')) fedList.push(p.name);
      else sponList.push(p.name);
    });
    return [
      {
        title: 'Министерства и ведомства',
        icon: Building2,
        members: minList.length ? minList : ['Министерство спорта РФ', 'Комитет по физической культуре и спорту', 'Фонд президентских грантов'],
      },
      {
        title: 'Федерации',
        icon: Medal,
        members: fedList.length ? fedList : ['Всероссийская федерация школьного спорта', 'Федерация зимних видов спорта', 'Российский студенческий спортивный союз'],
      },
      {
        title: 'Спонсоры и партнёры',
        icon: Trophy,
        members: sponList.length ? sponList : ['ГК «СеверИнвест»', 'Банк «Развитие»', 'Экипировочный центр «АтлетПро»'],
      },
    ];
  })();

  // Partnership
  const partnershipIconList = [Landmark, Waves, FileText, TrendingUp];
  const partnershipItems =
    Array.isArray(ideology?.govBlocks) && ideology.govBlocks.length > 0
      ? ideology.govBlocks.map((b: any, idx: number) => ({
          title: b.title || '',
          text: b.desc || '',
          icon: partnershipIconList[idx % partnershipIconList.length],
        }))
      : [
          { title: 'Гранты и субсидии', text: 'Участие в федеральных и региональных грантовых программах, совместное финансирование.', icon: Landmark },
          { title: 'Совместные программы', text: 'Запуск целевых инициатив с федерациями, вузами и бизнесом.', icon: Waves },
          { title: 'Открытая отчётность', text: 'Публикация аудиторских заключений, отчётов в Минюст и аналитических записок.', icon: FileText },
          { title: 'Социальный эффект', text: 'Измеримые показатели: число участников, построенные объекты, подготовленные тренеры.', icon: TrendingUp },
        ];
  const partnershipBadge = ideology?.govBadge || 'Сотрудничество';
  const partnershipTitle = ideology?.govTitle || 'Станьте партнёром центра';
  const partnershipSubtitle =
    ideology?.govSubtitle ||
    'Спонсорство, гранты и совместные проекты. Расскажите о своей организации, и мы предложим формат участия.';
  const partnershipCtaText = ideology?.govCtaText || 'Оставить заявку на партнёрство';

  // Contacts
  const contactsEyebrow = org?.contactsEyebrow || 'Контакты';
  const contactsTitle = org?.contactsTitle || 'Свяжитесь с нами';
  const contactsSubtitle =
    org?.contactsSubtitle ||
    'Ответим на вопросы о программах, документах и формах сотрудничества.';

  const footerLogoUrl = resolveMediaUrl(footer?.logoUrl) || logoUrl;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1B263B] font-sans selection:bg-[#D92D20]/20 selection:text-[#0F2147]">
      {/* 1. TOPMOST TRICOLOR BAR */}
      <div
        className="h-1 w-full"
        style={{
          backgroundImage:
            'linear-gradient(90deg, #FFFFFF 0 33.3%, #1447E6 33.3% 66.6%, #D92D20 66.6%)',
        }}
      />

      {/* 2. TOP BLUE SUBHEADER (Гос. шапка с контактами) */}
      <div className="bg-[#0F2147] text-white/80">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-5 py-2 text-xs md:px-6">
          <span>Автономная некоммерческая организация</span>
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <a
              href={`tel:${(org?.phone || footer?.phone || '+7 (495) 000-00-00').replace(/[^+\d]/g, '')}`}
              className="hover:text-white transition-colors"
            >
              {org?.phone || footer?.phone || '+7 (495) 000-00-00'}
            </a>
            <a
              href={`mailto:${org?.receptionEmail || footer?.email || 'info@crzs-sport.ru'}`}
              className="break-all hover:text-white transition-colors"
            >
              {org?.receptionEmail || footer?.email || 'info@crzs-sport.ru'}
            </a>
          </div>
        </div>
      </div>

      {/* 3. MAIN STICKY HEADER */}
      <header
        className={`sticky top-0 z-30 border-b border-[#E2E8F0] bg-white/95 backdrop-blur transition-shadow ${
          scrolled ? 'shadow-sm' : ''
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-5 md:px-6">
          <a href="#top" aria-label="Центр развития спорта, на главную" className="min-w-0 shrink-0">
            <img
              src={logoUrl}
              alt={header?.logoTitle || 'АНО ЦЗСТ — Центр развития спорта'}
              style={{
                opacity: typeof logoOpacity === 'number' ? logoOpacity / 100 : undefined,
                filter: logoColor ? `drop-shadow(0px 0px 0px ${logoColor})` : undefined,
              }}
              className="brand-logo h-auto w-52 max-w-full md:w-64 transition-all"
            />
          </a>

          <nav aria-label="Основная навигация" className="hidden items-center gap-5 text-sm font-medium lg:flex">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="whitespace-nowrap border-b-2 border-transparent py-1 transition-colors hover:border-[#D92D20] hover:text-[#1447E6]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href={headerCtaHref}
            className="hidden items-center justify-center gap-2 whitespace-nowrap text-sm font-medium cursor-pointer transition-colors shadow-sm bg-[#D92D20] text-white hover:bg-[#b92419] h-auto rounded-sm px-5 py-3 lg:inline-flex"
          >
            <span>{headerCtaText}</span>
            <ArrowRight className="h-4 w-4" />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            className="inline-flex items-center justify-center rounded-sm text-[#0F2147] hover:bg-slate-100 h-9 w-9 shrink-0 lg:hidden"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav
            id="mobile-menu"
            aria-label="Мобильная навигация"
            className="border-t border-[#E2E8F0] bg-white px-5 py-4 lg:hidden"
          >
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block border-b border-[#E2E8F0] py-3 text-sm font-medium text-[#0F2147] hover:text-[#1447E6]"
              >
                {item.label}
              </a>
            ))}
            <a
              href={headerCtaHref}
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-sm bg-[#D92D20] text-sm font-semibold text-white hover:bg-[#b92419]"
            >
              <span>{headerCtaText}</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </nav>
        )}
      </header>

      <main>
        {/* 2. HERO SLIDER */}
        <div id="hero">
          <HeroSlider />
        </div>

        {/* 3. ABOUT (#about) */}
        <section id="about" className="mx-auto max-w-7xl px-5 py-16 md:px-6 md:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="mb-10 max-w-3xl">
                <div className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase text-[#D92D20]">
                  <span className="h-0.5 w-8 bg-[#D92D20]" aria-hidden="true" />
                  {aboutEyebrow}
                </div>
                <h2 className="text-3xl font-bold leading-tight md:text-4xl text-[#0F2147]">
                  {aboutTitle}
                </h2>
                <p className="mt-4 text-base leading-relaxed md:text-lg text-[#606E85]">
                  {aboutDescription}
                </p>
              </div>

              <ul className="space-y-4">
                {aboutBullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm leading-relaxed md:text-base text-[#1B263B]">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-[#1447E6]/10 text-[#1447E6]">
                      <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                    </div>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-sm border border-[#E2E8F0] bg-white shadow-sm">
                <img
                  src={aboutImgUrl}
                  alt="О центре развития спорта"
                  className="h-[360px] w-full object-cover sm:h-[420px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 4. PROJECTS (#projects) */}
        <section id="projects" className="bg-[#EFF3F8] py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-6">
            <div className="mb-10 max-w-3xl">
              <div className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase text-[#D92D20]">
                <span className="h-0.5 w-8 bg-[#D92D20]" aria-hidden="true" />
                {projectsEyebrow}
              </div>
              <h2 className="text-3xl font-bold leading-tight md:text-4xl text-[#0F2147]">
                {projectsTitle}
              </h2>
              <p className="mt-4 text-base leading-relaxed md:text-lg text-[#606E85]">
                {projectsSubtitle}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {(Array.isArray(directions) && directions.length > 0 ? directions : []).map((dir: any, idx: number) => {
                const IconComp = projectIconList[idx % projectIconList.length];
                return (
                  <article
                    key={dir.id || idx}
                    className="group rounded-sm border-t-4 border-[#1447E6] bg-white p-7 shadow-sm transition-all hover:border-[#D92D20] hover:shadow-md"
                  >
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-[#1447E6]/10 text-[#1447E6] transition-colors group-hover:bg-[#D92D20]/10 group-hover:text-[#D92D20]">
                        <IconComp className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-semibold text-[#606E85]">
                        {dir.category || 'Программа'}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold leading-snug text-[#0F2147]">
                      {dir.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#606E85]">
                      {dir.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. NEWS (#news) */}
        <section id="news" className="mx-auto max-w-7xl px-5 py-16 md:px-6 md:py-24">
          <div className="mb-10 max-w-3xl">
            <div className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase text-[#D92D20]">
              <span className="h-0.5 w-8 bg-[#D92D20]" aria-hidden="true" />
              Новости
            </div>
            <h2 className="text-3xl font-bold leading-tight md:text-4xl text-[#0F2147]">
              Лента новостей и пресс-релизов
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {newsList.map((item: any, idx: number) => (
              <article key={item.id || idx} className="flex flex-col rounded-sm border border-[#E2E8F0] bg-white p-7 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-semibold text-[#D92D20]">{item.category || 'Новость'}</span>
                  <time className="text-[#606E85]">{item.date}</time>
                </div>
                <h3 className="mt-4 text-lg font-bold leading-snug text-[#0F2147]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#606E85]">
                  {item.excerpt || item.summary || item.content}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* 6. DOCUMENTS (#documents) */}
        <section id="documents" className="bg-[#EFF3F8] py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-6">
            <div className="mb-10 max-w-3xl">
              <div className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase text-[#D92D20]">
                <span className="h-0.5 w-8 bg-[#D92D20]" aria-hidden="true" />
                Документы и отчёты
              </div>
              <h2 className="text-3xl font-bold leading-tight md:text-4xl text-[#0F2147]">
                Открытость в каждой детали
              </h2>
              <p className="mt-4 text-base leading-relaxed md:text-lg text-[#606E85]">
                Устав, отчётность и внутренние положения центра. Все документы доступны для ознакомления.
              </p>
            </div>

            <div role="group" aria-label="Категория документов" className="mb-7 flex flex-wrap gap-2">
              {docCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setDocCategoryFilter(cat)}
                  className={`rounded-sm px-4 py-2 text-xs font-semibold transition-colors ${
                    docCategoryFilter === cat
                      ? 'bg-[#1447E6] text-white shadow-sm'
                      : 'bg-white text-[#1B263B] border border-[#E2E8F0] hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredDocs.map((doc: any, idx: number) => (
                <article
                  key={doc.id || idx}
                  className="flex flex-col justify-between rounded-sm border border-[#E2E8F0] bg-white p-6 shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs text-[#606E85]">
                      <span className="font-semibold text-[#1447E6]">{doc.category || 'Документ'}</span>
                      <span>{doc.year || doc.date || '2026'}</span>
                    </div>
                    <h3 className="mt-3 text-base font-bold text-[#0F2147] leading-snug">
                      {doc.title}
                    </h3>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
                    <span className="font-mono text-[#606E85]">PDF</span>
                    <a
                      href={doc.fileUrl || '#'}
                      className="inline-flex items-center gap-1.5 font-semibold text-[#1447E6] hover:text-[#D92D20] transition-colors"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Скачать</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 7. PARTNERS (#partners) */}
        <section id="partners" className="mx-auto max-w-7xl px-5 py-16 md:px-6 md:py-24">
          <div className="mb-10 max-w-3xl">
            <div className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase text-[#D92D20]">
              <span className="h-0.5 w-8 bg-[#D92D20]" aria-hidden="true" />
              Партнёры
            </div>
            <h2 className="text-3xl font-bold leading-tight md:text-4xl text-[#0F2147]">
              Министерства, федерации и спонсоры
            </h2>
            <p className="mt-4 text-base leading-relaxed md:text-lg text-[#606E85]">
              Мы работаем с органами власти, спортивными федерациями и бизнесом, чтобы программы доходили до каждого региона.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {partnerGroups.map((grp, idx) => {
              const IconComp = grp.icon;
              return (
                <article key={idx} className="rounded-sm border border-[#E2E8F0] bg-white p-7 shadow-sm">
                  <IconComp className="h-8 w-8 text-[#1447E6]" />
                  <h3 className="mt-5 text-xl font-bold text-[#0F2147]">{grp.title}</h3>
                  <ul className="mt-5 space-y-3 text-sm text-[#1B263B]">
                    {grp.members.map((m: string, mIdx: number) => (
                      <li key={mIdx} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#D92D20]" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>

        {/* 8. PARTNERSHIP (#partnership) */}
        <section id="partnership" className="bg-[#0F2147] py-16 text-white md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
              <div>
                <div className="mb-8 max-w-3xl">
                  <div className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase text-white/75">
                    <span className="h-0.5 w-8 bg-[#D92D20]" aria-hidden="true" />
                    {partnershipBadge}
                  </div>
                  <h2 className="text-3xl font-bold leading-tight md:text-4xl text-white">
                    {partnershipTitle}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed md:text-lg text-white/80">
                    {partnershipSubtitle}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setPartnerModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#D92D20] px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#b92419]"
                >
                  <span>{partnershipCtaText}</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {partnershipItems.map((item: any, idx: number) => {
                  const IconComp = item.icon || Landmark;
                  return (
                    <div key={idx} className="rounded-sm border border-white/15 bg-white/5 p-6 backdrop-blur-xs">
                      <IconComp className="h-6 w-6 text-[#D92D20]" />
                      <h3 className="mt-4 text-base font-bold text-white">{item.title}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-white/75">{item.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 9. CONTACTS (#contacts) */}
        <section id="contacts" className="mx-auto max-w-7xl px-5 py-16 md:px-6 md:py-24">
          <div className="grid gap-8 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-2">
              <div className="mb-10 max-w-3xl">
                <div className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase text-[#D92D20]">
                  <span className="h-0.5 w-8 bg-[#D92D20]" aria-hidden="true" />
                  {contactsEyebrow}
                </div>
                <h2 className="text-3xl font-bold leading-tight md:text-4xl text-[#0F2147]">
                  {contactsTitle}
                </h2>
                <p className="mt-4 text-base leading-relaxed md:text-lg text-[#606E85]">
                  {contactsSubtitle}
                </p>
              </div>

              <div className="space-y-4 text-sm text-[#1B263B]">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 shrink-0 text-[#1447E6] mt-0.5" />
                  <span className="whitespace-pre-line">{org?.legalAddress || 'г. Москва, ул. Спортивная, д. 12, оф. 304'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-[#1447E6]" />
                  <a href={`tel:${(org?.phone || '+7 (495) 000-00-00').replace(/[^+\d]/g, '')}`} className="hover:text-[#1447E6] font-medium">
                    {org?.phone || '+7 (495) 000-00-00'}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-[#1447E6]" />
                  <a href={`mailto:${org?.receptionEmail || 'info@crzs-sport.ru'}`} className="hover:text-[#1447E6] font-medium">
                    {org?.receptionEmail || 'info@crzs-sport.ru'}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 shrink-0 text-[#1447E6]" />
                  <span>{org?.workHours || 'Пн–Пт, 09:00–18:00 (МСК)'}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Обращение успешно отправлено!');
                }}
                className="grid gap-5 rounded-sm border border-[#E2E8F0] bg-white p-7 shadow-sm sm:grid-cols-2"
              >
                <div>
                  <label className="text-sm font-semibold text-[#0F2147]">
                    Имя и фамилия <span className="text-[#D92D20]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Иван Иванов"
                    className="mt-1.5 flex w-full rounded-sm border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#1B263B] placeholder:text-[#606E85] focus:border-[#1447E6] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-[#0F2147]">
                    Организация
                  </label>
                  <input
                    type="text"
                    placeholder="Спортивная федерация / НКО"
                    className="mt-1.5 flex w-full rounded-sm border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#1B263B] placeholder:text-[#606E85] focus:border-[#1447E6] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-[#0F2147]">
                    Телефон <span className="text-[#D92D20]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+7 (999) 000-00-00"
                    className="mt-1.5 flex w-full rounded-sm border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#1B263B] placeholder:text-[#606E85] focus:border-[#1447E6] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-[#0F2147]">
                    Электронная почта <span className="text-[#D92D20]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.ru"
                    className="mt-1.5 flex w-full rounded-sm border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#1B263B] placeholder:text-[#606E85] focus:border-[#1447E6] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm font-semibold text-[#0F2147]">
                    {org?.contactsFormMessageLabel || 'Ваше обращение *'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder={org?.contactsFormMessagePlaceholder || 'Опишите вопрос или предложение о сотрудничестве...'}
                    className="mt-1.5 flex w-full rounded-sm border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#1B263B] placeholder:text-[#606E85] focus:border-[#1447E6] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#D92D20] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#b92419]"
                  >
                    <span>{org?.contactsFormSubmitLabel || 'Отправить обращение'}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* 10. FOOTER WITH RUSSIAN TRICOLOR BAR */}
      <footer className="bg-[#0F2147] text-white/75">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.3fr_0.9fr_1fr] md:px-6">
          <div>
            <a href="#top" aria-label="Центр развития спорта, на главную">
              <img
                src={footerLogoUrl}
                alt={footer?.shortName || 'Центр развития спорта'}
                className="h-9 w-auto max-w-full"
              />
            </a>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/75">
              {footer?.description ||
                'Автономная некоммерческая организация. Реализуем программы развития массового и высшего спорта, поддерживаем тренеров и спортивную инфраструктуру регионов.'}
            </p>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase text-white tracking-wider">
              Разделы
            </h2>
            <nav aria-label="Разделы сайта" className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3 text-sm">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="hover:text-white transition-colors">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase text-white tracking-wider">
              Контакты
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="whitespace-pre-line">
                {footer?.address || org?.legalAddress || 'г. Москва, ул. Спортивная, д. 12, оф. 304'}
              </li>
              <li>
                <a
                  href={`tel:${(footer?.phone || org?.phone || '+7 (495) 000-00-00').replace(/[^+\d]/g, '')}`}
                  className="hover:text-white transition-colors"
                >
                  {footer?.phone || org?.phone || '+7 (495) 000-00-00'}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${footer?.email || org?.receptionEmail || 'info@crzs-sport.ru'}`}
                  className="hover:text-white transition-colors"
                >
                  {footer?.email || org?.receptionEmail || 'info@crzs-sport.ru'}
                </a>
              </li>
              <li>{footer?.workHours || org?.workHours || 'Пн–Пт, 09:00–18:00 (МСК)'}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/15">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-5 py-6 text-xs md:flex-row md:px-6">
            <p>{footer?.copyright || '© 2026 АНО «ЦРЗС». Все права защищены.'}</p>
            <p>
              {footer?.disclosureNote ||
                'Информация о деятельности организации раскрывается в разделе «Документы».'}
            </p>
          </div>
        </div>

        {/* The signature Russian Tricolor bar at the bottom */}
        <div
          className="h-1 w-full"
          style={{
            backgroundImage:
              'linear-gradient(90deg, #FFFFFF 0 33.3%, #1447E6 33.3% 66.6%, #D92D20 66.6%)',
          }}
        />
      </footer>

      {/* Partner Modal */}
      {partnerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-md rounded-sm border border-[#E2E8F0] bg-white p-6 shadow-xl">
            <button
              type="button"
              onClick={() => setPartnerModalOpen(false)}
              className="absolute right-4 top-4 text-[#606E85] hover:text-[#0F2147]"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-lg font-bold text-[#0F2147]">Заявка на партнёрство</h3>
            <p className="mt-2 text-xs text-[#606E85]">
              Оставьте контактные данные, и мы свяжемся с вами для обсуждения форматов сотрудничества.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Заявка на партнёрство принята!');
                setPartnerModalOpen(false);
              }}
              className="mt-4 space-y-3"
            >
              <input
                type="text"
                required
                placeholder="Организация или компания"
                className="w-full rounded-sm border border-[#E2E8F0] px-3 py-2 text-sm text-[#1B263B] placeholder:text-[#606E85] focus:border-[#1447E6] focus:outline-none"
              />
              <input
                type="text"
                required
                placeholder="Контактное лицо"
                className="w-full rounded-sm border border-[#E2E8F0] px-3 py-2 text-sm text-[#1B263B] placeholder:text-[#606E85] focus:border-[#1447E6] focus:outline-none"
              />
              <input
                type="tel"
                required
                placeholder="Телефон"
                className="w-full rounded-sm border border-[#E2E8F0] px-3 py-2 text-sm text-[#1B263B] placeholder:text-[#606E85] focus:border-[#1447E6] focus:outline-none"
              />
              <input
                type="email"
                required
                placeholder="Email"
                className="w-full rounded-sm border border-[#E2E8F0] px-3 py-2 text-sm text-[#1B263B] placeholder:text-[#606E85] focus:border-[#1447E6] focus:outline-none"
              />
              <button
                type="submit"
                className="w-full rounded-sm bg-[#D92D20] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#b92419]"
              >
                Отправить заявку
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
