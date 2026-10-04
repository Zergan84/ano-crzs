'use client';

import React from 'react';
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
  ChevronRight
} from 'lucide-react';

const sections = [
  { id: 'header', label: 'Меню и навигация', desc: 'Ссылки главного меню, Drag & Drop порядок, подсветка и телефон', icon: MenuIcon, href: '/admin/header' },
  { id: 'hero', label: 'Главный экран (Hero Слайдер)', desc: 'Слайды, заголовки, слоганы, режим отдельного блока или картинки', icon: Sliders, href: '/admin/hero' },
  { id: 'section-order', label: 'Порядок разделов', desc: 'Drag & Drop порядок отображения модулей на главной странице', icon: SlidersVertical, href: '/admin/section-order' },
  { id: 'pages', label: 'Страницы и модули', desc: 'Создание произвольных контентных страниц и секций', icon: Layers, href: '/admin/pages' },
  { id: 'organization', label: 'Организация', desc: 'Полное наименование, ИНН, ОГРН, адреса и ключевые показатели', icon: Building2, href: '/admin/organization' },
  { id: 'specialists', label: 'Единый реестр специалистов', desc: 'База данных аттестованных инструкторов, судей и тренеров', icon: Users, href: '/admin/specialists' },
  { id: 'news', label: 'Пресс-центр и новости', desc: 'Публикации, пресс-релизы, даты, авторы и обложки', icon: Newspaper, href: '/admin/news' },
  { id: 'events', label: 'Календарный план мероприятий', desc: 'Семинары, всероссийские сборы, расписание и количество мест', icon: Calendar, href: '/admin/events' },
  { id: 'documents', label: 'Нормативно-правовая база', desc: 'Стандарты разметки трасс, регламенты, приказы и файлы', icon: FileText, href: '/admin/documents' },
  { id: 'directions', label: 'Направления деятельности', desc: '6 ключевых направлений уставной работы АНО «ЦРЗС»', icon: Compass, href: '/admin/directions' },
  { id: 'partners', label: 'Партнёры и спонсоры', desc: 'Генеральные, отраслевые и технические партнеры', icon: Handshake, href: '/admin/partners' },
  { id: 'contacts', label: 'Контакты и реквизиты', desc: 'Телефоны, электронная приемная, режим работы и банк', icon: Phone, href: '/admin/contacts' },
  { id: 'media', label: 'Медиатека Cloudflare R2', desc: 'Загрузка изображений, документов и получение публичных ссылок', icon: ImageIcon, href: '/admin/media' },
  { id: 'fonts', label: 'Шрифты Google Fonts', desc: 'Каталог из 30+ кириллических шрифтов и управление регистром', icon: Type, href: '/admin/fonts' },
  { id: 'footer', label: 'Подвал сайта (Footer)', desc: 'Юридические дисклеймеры, копирайт, ссылки и контактные данные', icon: LayoutTemplate, href: '/admin/footer' },
];

export default function SectionsCatalogPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Top Header */}
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
            Каталог всех разделов и модулей
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Полный перечень модулей управления контентом сайта АНО «ЦРЗС»
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {sections.map((s, i) => {
          const Icon = s.icon;
          return (
            <NextLink
              key={s.id}
              href={s.href}
              className="flex items-center gap-4 rounded-xl border border-[#222] bg-[#12161f] p-4 hover:border-red-500/50 hover:bg-[#161c28] transition-all group"
            >
              <span className="font-mono text-xs text-slate-500 w-6 text-right">
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="w-10 h-10 rounded-lg bg-[#1a202c] border border-[#2d3748] text-slate-300 group-hover:text-red-400 group-hover:border-red-500/40 flex items-center justify-center shrink-0 transition-colors">
                <Icon className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                  {s.label}
                </h3>
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
