'use client';

import React, { useState } from 'react';
import NextLink from 'next/link';
import { 
  Building2, 
  Sliders, 
  Newspaper, 
  Calendar, 
  Users, 
  FileText, 
  Compass, 
  Handshake, 
  Phone, 
  Image as ImageIcon,
  HardDrive,
  ShieldCheck,
  ArrowUpRight,
  Settings,
  Landmark,
  Layout,
  Globe,
  Palette,
  Menu,
  SlidersHorizontal,
} from 'lucide-react';
import { useSiteContent, updateSection } from '@/lib/content';
import { DEFAULT_SETTINGS } from '@/data/defaultContent';

interface DashboardCard {
  id: string;
  title: string;
  description: string;
  countLabel?: string;
  href: string;
  icon: React.ElementType;
  modes: ('landing' | 'portal')[];
  scopeTag: string;
}

export default function AdminDashboardPage() {
  const { content, loading } = useSiteContent();
  const [switchingMode, setSwitchingMode] = useState(false);

  const siteMode: 'landing' | 'portal' = content?.settings?.siteMode || 'landing';

  async function handleQuickModeSwitch(targetMode: 'landing' | 'portal') {
    if (targetMode === siteMode || switchingMode) return;
    setSwitchingMode(true);
    const nextSettings = {
      ...DEFAULT_SETTINGS,
      ...(content?.settings || {}),
      siteMode: targetMode,
    };
    await updateSection('settings', nextSettings);
    setSwitchingMode(false);
  }

  const cards: DashboardCard[] = [
    {
      id: 'settings',
      title: 'Настройки',
      description: 'Переключатель режима отображения сайта (Лендинг / Портал), выбор активной темы оформления (Themes), SEO и видимость блоков',
      countLabel: siteMode === 'landing' ? 'Режим: ЛЕНДИНГ' : 'Режим: ПОРТАЛ',
      href: '/admin/settings',
      icon: Settings,
      modes: ['landing', 'portal'],
      scopeTag: 'Настройки',
    },
    {
      id: 'themes',
      title: 'Темы (Themes)',
      description: 'Редактор визуальных тем сайта (Bolt style, Basic light и др.): смена шрифтов, цветов фонов, текста, кнопок и скруглений',
      countLabel: `Активна: ${content.themes?.items?.find((t) => t.id === (content.themes?.activeThemeId || content.settings?.activeThemeId))?.name || 'Bolt style'}`,
      href: '/admin/themes',
      icon: Palette,
      modes: ['landing', 'portal'],
      scopeTag: 'Общий блок',
    },
    // 1. Шапка сайта (Лендинг)
    {
      id: 'landing-hero',
      title: '1. Шапка сайта (Header)',
      description: 'Верхняя строка контактов (телефон, email, статус), логотип Центра с эффектами и цветом подложки, кнопка действия в шапке',
      countLabel: 'Шапка и контакты',
      href: '/admin/landing-hero',
      icon: SlidersHorizontal,
      modes: ['landing', 'portal'],
      scopeTag: 'Блок 01 • Шапка',
    },
    // Меню сайта (общее)
    {
      id: 'menu',
      title: 'Меню сайта (Навигация)',
      description: 'Пункты меню для верхней навигации и подвала сайта. Названия разделов, ссылки, якоря и Drag & Drop сортировка.',
      countLabel: `${(content.landing?.header?.navLinks || []).length || 6} пунктов меню`,
      href: '/admin/menu',
      icon: Menu,
      modes: ['landing', 'portal'],
      scopeTag: 'Навигация',
    },
    // 2. Главный экран (Main Hero / Слайдер)
    {
      id: 'hero',
      title: '2. Главный экран — Слайдер (Main Hero)',
      description: 'Первый экран 100% ширины и высоты. Сейчас отображается 1 слайд. При добавлении 2-го и 3-го слайдов автоматически включается слайдер.',
      countLabel: `${content.hero.slides.length} ${content.hero.slides.length === 1 ? 'слайд' : 'слайда'}`,
      href: '/admin/hero',
      icon: Sliders,
      modes: ['landing', 'portal'],
      scopeTag: 'Блок 02 • Main Hero',
    },
    // 3. О центре (#about)
    {
      id: 'organization',
      title: '3. О центре (#about)',
      description: 'Заголовок «Миссия: спорт доступен каждому», описание центра, 4 пункта преимуществ с галочками и фотография зала справа',
      countLabel: `${(content.organization.principles || []).length} пункта • Фото`,
      href: '/admin/organization',
      icon: Building2,
      modes: ['landing', 'portal'],
      scopeTag: 'Блок 03 • #about',
    },
    // 4. Проекты и программы (#projects)
    {
      id: 'directions',
      title: '4. Проекты и программы (#projects)',
      description: 'Спортивные и социальные проекты центра: «Спорт для всех», «Здоровое поколение», «Юные таланты», «Тренеры будущего», «Активный регион», «Семейный спорт»',
      countLabel: `${content.organization.directions.length} проектов`,
      href: '/admin/directions',
      icon: Compass,
      modes: ['landing', 'portal'],
      scopeTag: 'Блок 04 • #projects',
    },
    // 5. Новости (#news)
    {
      id: 'news',
      title: '5. Лента новостей и пресс-релизов (#news)',
      description: 'Публикация новостей, пресс-релизов, событий и отчётов с категориями, датами и краткими анонсами',
      countLabel: `${content.news.items.length} публикаций`,
      href: '/admin/news',
      icon: Newspaper,
      modes: ['landing', 'portal'],
      scopeTag: 'Блок 05 • #news',
    },
    // 6. Документы и отчёты (#documents)
    {
      id: 'documents',
      title: '6. Документы и отчёты (#documents)',
      description: 'Устав, свидетельство о регистрации, годовые отчёты и положения с фильтром по категориям и PDF-файлами',
      countLabel: `${content.documents.items.length} документов`,
      href: '/admin/documents',
      icon: FileText,
      modes: ['landing', 'portal'],
      scopeTag: 'Блок 06 • #documents',
    },
    // 7. Партнёры (#partners)
    {
      id: 'partners',
      title: '7. Партнёры (#partners)',
      description: '3 колонки партнёров: «Министерства и ведомства», «Федерации» и «Спонсоры и партнёры»',
      countLabel: `${content.partners.items.length} организаций`,
      href: '/admin/partners',
      icon: Handshake,
      modes: ['landing', 'portal'],
      scopeTag: 'Блок 07 • #partners',
    },
    // 8. Сотрудничество (#partnership)
    {
      id: 'landing-ideology',
      title: '8. Сотрудничество — Станьте партнёром (#partnership)',
      description: 'Тёмно-синий блок партнёрства: 4 преимущества («Гранты и субсидии», «Совместные программы», «Открытая отчётность», «Социальный эффект») и кнопка заявки',
      countLabel: '4 пункта • Модальное окно',
      href: '/admin/landing-ideology',
      icon: Landmark,
      modes: ['landing'],
      scopeTag: 'Блок 08 • #partnership',
    },
    // 9. Контакты (#contacts)
    {
      id: 'contacts',
      title: '9. Контакты и форма связи (#contacts)',
      description: 'Заголовок и подзаголовок секции «Свяжитесь с нами», настройки формы обращения, телефон, email, часы работы и адрес',
      countLabel: 'Форма и контакты',
      href: '/admin/contacts',
      icon: Phone,
      modes: ['landing', 'portal'],
      scopeTag: 'Блок 09 • #contacts',
    },
    // 10. Подвал сайта (Footer)
    {
      id: 'footer',
      title: '10. Подвал сайта (Footer)',
      description: 'Логотип в подвале, описание организации, колонка контактов (адрес, телефон, email, часы работы) и копирайт',
      countLabel: 'Подвал сайта',
      href: '/admin/footer',
      icon: Building2,
      modes: ['landing', 'portal'],
      scopeTag: 'Блок 10 • Footer',
    },
    // Portal-only blocks (отображаются только в режиме ПОРТАЛ)
    {
      id: 'header',
      title: 'Меню и навигация (Портал)',
      description: 'Главное многоуровневое меню портала, порядок Drag & Drop, кнопки реестра и подачи заявления',
      countLabel: `${(content.header?.navLinks || []).length} пунктов`,
      href: '/admin/header',
      icon: Building2,
      modes: ['portal'],
      scopeTag: 'Только Портал',
    },
    {
      id: 'section-order',
      title: 'Порядок разделов (Портал)',
      description: 'Drag & Drop изменение порядка модулей на главной странице расширенного портала',
      countLabel: 'Настройка порядка',
      href: '/admin/section-order',
      icon: Sliders,
      modes: ['portal'],
      scopeTag: 'Только Портал',
    },
    {
      id: 'pages',
      title: 'Страницы и модули (Портал)',
      description: 'Создание произвольных информационных страниц и разделов расширенного портала',
      countLabel: `${((content as any).pages?.items || []).length} страниц`,
      href: '/admin/pages',
      icon: FileText,
      modes: ['portal'],
      scopeTag: 'Только Портал',
    },
    {
      id: 'specialists',
      title: 'Единый реестр специалистов (Портал)',
      description: 'Публичный реестр инструкторов и тренеров: ФИО, категории, номера удостоверений, дисциплины, регионы',
      countLabel: `${content.specialists.items.length} специалистов`,
      href: '/admin/specialists',
      icon: Users,
      modes: ['portal'],
      scopeTag: 'Только Портал',
    },
    {
      id: 'events',
      title: 'Календарь мероприятий (Портал)',
      description: 'Календарь семинаров, курсов и конференций, даты проведения, локации и статус записи',
      countLabel: `${content.events.items.length} событий`,
      href: '/admin/events',
      icon: Calendar,
      modes: ['portal'],
      scopeTag: 'Только Портал',
    },
    {
      id: 'media',
      title: 'Медиатека Cloudflare R2',
      description: 'Хранилище фото, PDF-документов и логотипов в облачном бакете R2',
      countLabel: 'R2 Бакет',
      href: '/admin/media',
      icon: ImageIcon,
      modes: ['landing', 'portal'],
      scopeTag: 'Общий блок',
    },
    {
      id: 'fonts',
      title: 'Шрифты Google Fonts',
      description: 'Выбор системных и гротескных шрифтов (Onest, Inter, Manrope и др.) с предпросмотром',
      countLabel: '30+ шрифтов',
      href: '/admin/fonts',
      icon: FileText,
      modes: ['landing', 'portal'],
      scopeTag: 'Общий блок',
    },
  ];

  const visibleCards = cards.filter((c) => c.modes.includes(siteMode));

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-[#222] pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-wide text-white">
            Дашборд управления АНО «ЦЗСТ»
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Отображаются блоки для активного режима{' '}
            <strong className="text-white">
              {siteMode === 'landing' ? '«ОДНОСТРАНИЧНЫЙ ЛЕНДИНГ»' : '«МНОГОСТРАНИЧНЫЙ ПОРТАЛ»'}
            </strong>{' '}
            и общие перекрестные разделы.
          </p>
        </div>

        {/* Mode Switcher & System Status */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Quick Mode Switcher */}
          <div className="inline-flex items-center rounded-lg border border-[#2b3545] bg-[#12161f] p-1">
            <button
              type="button"
              disabled={switchingMode}
              onClick={() => handleQuickModeSwitch('landing')}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-bold transition-all ${
                siteMode === 'landing'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layout className="w-3.5 h-3.5" />
              <span>Режим: ЛЕНДИНГ</span>
            </button>
            <button
              type="button"
              disabled={switchingMode}
              onClick={() => handleQuickModeSwitch('portal')}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-bold transition-all ${
                siteMode === 'portal'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Режим: ПОРТАЛ</span>
            </button>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-emerald-900/50 bg-emerald-950/30 px-3 py-1.5 text-xs text-emerald-300">
            <HardDrive className="h-4 w-4 text-emerald-400" />
            <span>R2: ano-crzs</span>
          </div>
        </div>
      </div>

      {/* Grid of Sections filtered by active mode */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleCards.map((card) => {
          const Icon = card.icon;
          const isLandingOnly = card.modes.length === 1 && card.modes[0] === 'landing';
          const isPortalOnly = card.modes.length === 1 && card.modes[0] === 'portal';

          return (
            <NextLink
              key={card.id}
              href={card.href}
              className="group relative flex flex-col justify-between rounded-xl border border-[#222] bg-[#12161f] p-5 transition-all duration-200 hover:border-amber-500/60 hover:bg-[#161c28] hover:shadow-lg hover:shadow-amber-950/10"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#2b3545] bg-[#1c2333] text-slate-300 group-hover:border-amber-500 group-hover:text-amber-400 group-hover:bg-amber-950/30 transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${
                        isLandingOnly
                          ? 'bg-amber-950/40 text-amber-300 border-amber-800/60'
                          : isPortalOnly
                          ? 'bg-blue-950/40 text-blue-300 border-blue-800/60'
                          : 'bg-slate-800/70 text-slate-300 border-slate-700'
                      }`}
                    >
                      {card.scopeTag}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-slate-600 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber-400" />
                  </div>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                  {card.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  {card.description}
                </p>
              </div>

              <div className="mt-5 border-t border-[#1e2636] pt-3 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>{loading ? '...' : card.countLabel}</span>
                <span className="text-slate-500 group-hover:text-amber-400 transition-colors">Управление →</span>
              </div>
            </NextLink>
          );
        })}
      </div>
    </div>
  );
}
