'use client';

import React, { useEffect, useState } from 'react';
import NextLink from 'next/link';
import {
  ArrowLeft,
  Menu as MenuIcon,
  Sliders,
  Building2,
  Users,
  Newspaper,
  Calendar,
  FileText,
  Compass,
  Handshake,
  Phone,
  SlidersVertical,
  Layers,
  ImageIcon,
  Type,
  LayoutTemplate,
  ChevronRight,
  Settings,
  Sparkles,
  Scale,
  Palette,
} from 'lucide-react';

type SiteMode = 'landing' | 'portal';

interface SectionItem {
  id: string;
  label: string;
  desc: string;
  icon: React.ElementType;
  href: string;
  scope: 'both' | 'landing' | 'portal';
}

const sections: SectionItem[] = [
  { id: 'settings', label: 'Настройки', desc: 'Переключение режима отображения сайта (Лендинг / Портал), выбор темы оформления и видимость блоков', icon: Settings, href: '/admin/settings', scope: 'both' },
  { id: 'themes', label: 'Темы (Themes)', desc: 'Настройка визуальных тем сайта (Basic light и др.): шрифты, цвета фонов, текста, кнопок и рамок', icon: Palette, href: '/admin/themes', scope: 'both' },
  { id: 'hero', label: 'Главный экран (Hero Слайдер)', desc: 'Слайды главного экрана, заголовки, описания, кнопки, изображения и плашки', icon: Sliders, href: '/admin/hero', scope: 'both' },
  { id: 'landing-hero', label: 'Шапка сайта (Header Лендинга)', desc: 'Логотип АНО «ЦЗСТ», подзаголовок, якорная навигация и кнопка обращения в шапке', icon: Sparkles, href: '/admin/landing-hero', scope: 'landing' },
  { id: 'landing-ideology', label: 'Идеология, Методология и Господдержка', desc: 'Формула эффективности, системные принципы работы и взаимодействие с госсектором', icon: Scale, href: '/admin/landing-ideology', scope: 'landing' },
  { id: 'header', label: 'Меню и навигация (Портал)', desc: 'Ссылки главного меню, Drag & Drop порядок, подсветка и телефон', icon: MenuIcon, href: '/admin/header', scope: 'portal' },
  { id: 'section-order', label: 'Порядок разделов (Портал)', desc: 'Drag & Drop порядок отображения модулей на главной странице портала', icon: SlidersVertical, href: '/admin/section-order', scope: 'portal' },
  { id: 'pages', label: 'Страницы и модули (Портал)', desc: 'Создание произвольных контентных страниц и секций портала', icon: Layers, href: '/admin/pages', scope: 'portal' },
  { id: 'organization', label: 'О нас и Философия (О Центре)', desc: 'Полное наименование АНО «ЦЗСТ», уставная роль, принципы, ИНН, ОГРН и адреса', icon: Building2, href: '/admin/organization', scope: 'both' },
  { id: 'directions', label: 'Направления деятельности', desc: '6 ключевых направлений уставной работы АНО «ЦЗСТ» (Общий блок)', icon: Compass, href: '/admin/directions', scope: 'both' },
  { id: 'documents', label: 'Документы и стандарты', desc: 'Устав, стандарты разметки трасс, регламенты, приказы и файлы (Общий блок)', icon: FileText, href: '/admin/documents', scope: 'both' },
  { id: 'partners', label: 'Партнёры и спонсоры', desc: 'Государственные, отраслевые и технические партнеры (Общий блок)', icon: Handshake, href: '/admin/partners', scope: 'both' },
  { id: 'contacts', label: 'Контакты и реквизиты', desc: 'Телефоны, электронная приемная, режим работы и банк (Общий блок)', icon: Phone, href: '/admin/contacts', scope: 'both' },
  { id: 'footer', label: 'Подвал сайта (Footer)', desc: 'Юридические реквизиты, копирайт и контактные данные (Общий блок)', icon: LayoutTemplate, href: '/admin/footer', scope: 'both' },
  { id: 'specialists', label: 'Единый реестр специалистов', desc: 'База данных аттестованных инструкторов, судей и тренеров (Портал)', icon: Users, href: '/admin/specialists', scope: 'portal' },
  { id: 'news', label: 'Пресс-центр и новости', desc: 'Публикации, пресс-релизы, даты, авторы и обложки (Портал)', icon: Newspaper, href: '/admin/news', scope: 'portal' },
  { id: 'events', label: 'Календарный план мероприятий', desc: 'Семинары, всероссийские сборы, расписание и количество мест (Портал)', icon: Calendar, href: '/admin/events', scope: 'portal' },
  { id: 'media', label: 'Медиатека Cloudflare R2', desc: 'Загрузка изображений, документов и получение публичных ссылок', icon: ImageIcon, href: '/admin/media', scope: 'both' },
  { id: 'fonts', label: 'Шрифты Google Fonts', desc: 'Каталог кириллических шрифтов и управление регистром', icon: Type, href: '/admin/fonts', scope: 'both' },
];

export default function SectionsCatalogPage() {
  const [siteMode, setSiteMode] = useState<SiteMode>('landing');

  useEffect(() => {
    const fetchMode = async () => {
      try {
        const res = await fetch('/api/content', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          const mode = data?.settings?.siteMode;
          if (mode === 'portal' || mode === 'landing') {
            setSiteMode(mode);
          }
        }
      } catch {
        // default landing
      }
    };
    fetchMode();
  }, []);

  const visibleSections = sections.filter(
    (s) => s.scope === 'both' || s.scope === siteMode
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#222] pb-5">
        <div>
          <NextLink
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Назад к дашборду</span>
          </NextLink>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
            Каталог разделов ({siteMode === 'landing' ? 'Режим ЛЕНДИНГ' : 'Режим ПОРТАЛ'})
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Отображаются только блоки, активные для выбранного режима отображения сайта АНО «ЦЗСТ»
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {visibleSections.map((s, i) => {
          const Icon = s.icon;
          return (
            <NextLink
              key={s.id}
              href={s.href}
              className="flex items-center gap-4 rounded-xl border border-[#222] bg-[#12161f] p-4 hover:border-amber-500/50 hover:bg-[#161c28] transition-all group"
            >
              <span className="font-mono text-xs text-slate-500 w-6 text-right">
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="w-10 h-10 rounded-lg bg-[#1a202c] border border-[#2d3748] text-slate-300 group-hover:text-amber-400 group-hover:border-amber-500/40 flex items-center justify-center shrink-0 transition-colors">
                <Icon className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                    {s.label}
                  </h3>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                      s.scope === 'both'
                        ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-700/40'
                        : s.scope === 'landing'
                        ? 'bg-amber-950/60 text-amber-300 border border-amber-700/40'
                        : 'bg-blue-950/60 text-blue-300 border border-blue-700/40'
                    }`}
                  >
                    {s.scope === 'both' ? 'Общий блок' : s.scope === 'landing' ? 'Лендинг' : 'Портал'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5 truncate">
                  {s.desc}
                </p>
              </div>

              <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors shrink-0" />
            </NextLink>
          );
        })}
      </div>
    </div>
  );
}
