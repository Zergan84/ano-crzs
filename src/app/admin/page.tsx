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
      description: 'Редактор визуальных тем сайта (Basic light и др.): смена шрифтов, цветов фонов, текста, кнопок и скруглений без изменения контента',
      countLabel: `Активна: ${content.themes?.items?.find((t) => t.id === (content.themes?.activeThemeId || content.settings?.activeThemeId))?.name || 'Basic light'}`,
      href: '/admin/themes',
      icon: Palette,
      modes: ['landing', 'portal'],
      scopeTag: 'Общий блок',
    },
    {
      id: 'hero',
      title: 'Главный экран — Слайдер (Hero)',
      description: 'Слайды главного экрана: заголовки, описания, кнопки действий, ссылки, изображения и плашки каждого слайда',
      countLabel: `${content.hero.slides.length} слайда`,
      href: '/admin/hero',
      icon: Sliders,
      modes: ['landing', 'portal'],
      scopeTag: 'Общий блок',
    },
    // Landing-only blocks
    {
      id: 'landing-hero',
      title: 'Шапка сайта (Лендинг)',
      description: 'Логотип АНО «ЦЗСТ», подзаголовок, ссылки якорной навигации и кнопка обращения в верхней шапке лендинга',
      countLabel: 'Шапка и меню',
      href: '/admin/landing-hero',
      icon: Sliders,
      modes: ['landing'],
      scopeTag: 'Только Лендинг',
    },
    {
      id: 'landing-ideology',
      title: 'Методология и Господдержка (Лендинг)',
      description: 'Формула эффективности, системные принципы ДНК в госсекторе и блок взаимодействия с министерствами и грантовыми операторами',
      countLabel: 'Формула • 3 контура',
      href: '/admin/landing-ideology',
      icon: Landmark,
      modes: ['landing'],
      scopeTag: 'Только Лендинг',
    },
    // Portal-only blocks
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
      id: 'news',
      title: 'Новости и статьи (Портал)',
      description: 'Публикация пресс-релизов, анонсы, даты, категории, тексты статей и фото обложек',
      countLabel: `${content.news.items.length} публикаций`,
      href: '/admin/news',
      icon: Newspaper,
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
    // Shared Cross-blocks (Перекрестные блоки для Лендинга и Портала)
    {
      id: 'organization',
      title: 'О нас, Философия и Реквизиты',
      description: 'Официальное наименование АНО «ЦЗСТ», уставные цели и миссия, 4 опорных принципа работы, реквизиты и статистика',
      countLabel: '4 принципа • Реквизиты',
      href: '/admin/organization',
      icon: Building2,
      modes: ['landing', 'portal'],
      scopeTag: 'Общий блок',
    },
    {
      id: 'directions',
      title: 'Направления деятельности',
      description: '6 ключевых уставных направлений работы АНО «ЦЗСТ»: спорт, биомеханика, туризм, бутфитинг, сертификация и резерв',
      countLabel: `${content.organization.directions.length} направлений`,
      href: '/admin/directions',
      icon: Compass,
      modes: ['landing', 'portal'],
      scopeTag: 'Общий блок',
    },
    {
      id: 'documents',
      title: 'Официальные документы',
      description: 'Учредительные документы, отраслевые стандарты, регламенты и политика 152-ФЗ с ссылками на файлы',
      countLabel: `${content.documents.items.length} документов`,
      href: '/admin/documents',
      icon: FileText,
      modes: ['landing', 'portal'],
      scopeTag: 'Общий блок',
    },
    {
      id: 'partners',
      title: 'Партнёры и спонсоры',
      description: 'Список официальных партнёров, спортивных федераций и горнолыжных комплексов',
      countLabel: `${content.partners.items.length} партнёров`,
      href: '/admin/partners',
      icon: Handshake,
      modes: ['landing', 'portal'],
      scopeTag: 'Общий блок',
    },
    {
      id: 'contacts',
      title: 'Контакты и реквизиты',
      description: 'Телефоны, email приёмной, часы работы, адрес в п. Архангельское г.о. Красногорск и банковские реквизиты',
      countLabel: 'Полные контакты',
      href: '/admin/contacts',
      icon: Phone,
      modes: ['landing', 'portal'],
      scopeTag: 'Общий блок',
    },
    {
      id: 'footer',
      title: 'Подвал сайта (Footer)',
      description: 'Полное наименование АНО «ЦЗСТ» (ANO «CWST»), юридический адрес, реквизиты и копирайт 2026',
      countLabel: 'Подвал',
      href: '/admin/footer',
      icon: Building2,
      modes: ['landing', 'portal'],
      scopeTag: 'Общий блок',
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
      description: 'Выбор системных и гротескных шрифтов (Inter, Manrope и др.) с предпросмотром',
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
