'use client';

import React from 'react';
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
  ArrowUpRight
} from 'lucide-react';
import { useSiteContent } from '@/lib/content';

interface DashboardCard {
  id: string;
  title: string;
  description: string;
  countLabel?: string;
  href: string;
  icon: React.ElementType;
}

export default function AdminDashboardPage() {
  const { content, loading } = useSiteContent();

  const cards: DashboardCard[] = [
    {
      id: 'header',
      title: 'Меню и навигация',
      description: 'Главное меню сайта, порядок Drag & Drop, подсветка Carve CUP 🔥, телефоны и кнопки',
      countLabel: `${(content.header?.navLinks || []).length} пунктов`,
      href: '/admin/header',
      icon: Building2,
    },
    {
      id: 'hero',
      title: 'Главный экран (Hero)',
      description: '3 главных слайда на стартовом экране: тексты, слоганы, ссылки перехода, фото и плашки',
      countLabel: `${content.hero.slides.length} слайда`,
      href: '/admin/hero',
      icon: Sliders,
    },
    {
      id: 'sections',
      title: 'Каталог разделов',
      description: 'Обзор и быстрый переход ко всем модулям управления контентом сайта',
      countLabel: '15 модулей',
      href: '/admin/sections',
      icon: Building2,
    },
    {
      id: 'section-order',
      title: 'Порядок разделов',
      description: 'Drag & Drop изменение порядка модулей на главной странице сайта',
      countLabel: 'Настройка порядка',
      href: '/admin/section-order',
      icon: Sliders,
    },
    {
      id: 'pages',
      title: 'Страницы и модули',
      description: 'Создание произвольных информационных страниц, акций и разделов',
      countLabel: `${((content as any).pages?.items || []).length} страниц`,
      href: '/admin/pages',
      icon: FileText,
    },
    {
      id: 'organization',
      title: 'Организация',
      description: 'Реквизиты, официальное наименование, слоган, год основания, статистика организации',
      countLabel: `${content.organization.stats.length} показателей`,
      href: '/admin/organization',
      icon: Building2,
    },
    {
      id: 'specialists',
      title: 'Реестр специалистов',
      description: 'Единый публичный реестр инструкторов и тренеров: ФИО, категории, номера, дисциплины, регионы',
      countLabel: `${content.specialists.items.length} специалистов`,
      href: '/admin/specialists',
      icon: Users,
    },
    {
      id: 'news',
      title: 'Новости и статьи',
      description: 'Публикация новостей, анонсы, даты, категории, тексты статей и фото обложек',
      countLabel: `${content.news.items.length} публикаций`,
      href: '/admin/news',
      icon: Newspaper,
    },
    {
      id: 'events',
      title: 'Мероприятия',
      description: 'Календарь семинаров, курсов и конференций, даты проведения, локации и статус записи',
      countLabel: `${content.events.items.length} событий`,
      href: '/admin/events',
      icon: Calendar,
    },
    {
      id: 'documents',
      title: 'Официальные документы',
      description: 'Учредительные документы, отраслевые стандарты, регламенты и приказы с ссылками на файлы',
      countLabel: `${content.documents.items.length} документов`,
      href: '/admin/documents',
      icon: FileText,
    },
    {
      id: 'directions',
      title: 'Направления деятельности',
      description: '6 ключевых направлений работы Центра: стандартизация, безопасность, кадры, технологии',
      countLabel: `${content.organization.directions.length} направлений`,
      href: '/admin/directions',
      icon: Compass,
    },
    {
      id: 'partners',
      title: 'Партнёры и спонсоры',
      description: 'Слайдер и список партнёров соревнований и программ развития зимнего спорта',
      countLabel: `${content.partners.items.length} партнёров`,
      href: '/admin/partners',
      icon: Handshake,
    },
    {
      id: 'contacts',
      title: 'Контакты и реквизиты',
      description: 'Телефоны, email отделов, часы приёма, юридический и фактический адреса, банк',
      countLabel: 'Полные контакты',
      href: '/admin/contacts',
      icon: Phone,
    },
    {
      id: 'media',
      title: 'Медиатека Cloudflare R2',
      description: 'Хранилище фото, PDF-документов и баннеров в облачном бакете R2 с быстрой ссылкой',
      countLabel: 'R2 Бакет',
      href: '/admin/media',
      icon: ImageIcon,
    },
    {
      id: 'fonts',
      title: 'Шрифты Google Fonts',
      description: 'Выбор шрифтов из каталога Google Fonts с поддержкой кириллицы и предпросмотром',
      countLabel: '30+ шрифтов',
      href: '/admin/fonts',
      icon: FileText,
    },
    {
      id: 'footer',
      title: 'Подвал сайта (Footer)',
      description: 'Юридические реквизиты, режим работы, копирайт и ссылки в нижней части сайта',
      countLabel: 'Подвал',
      href: '/admin/footer',
      icon: Building2,
    },
  ];


  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#222] pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-wide text-white">Дашборд управления</h1>
          <p className="mt-1 text-sm text-slate-400">
            Редактируйте текстовый и медиа-контент сайта АНО «ЦРЗС». Данные сохраняются в облачный бакет R2.
          </p>
        </div>

        {/* System Status Badges */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-emerald-900/50 bg-emerald-950/30 px-3 py-1.5 text-xs text-emerald-300">
            <HardDrive className="h-4 w-4 text-emerald-400" />
            <span>R2: ano-crzs</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-blue-900/50 bg-blue-950/30 px-3 py-1.5 text-xs text-blue-300">
            <ShieldCheck className="h-4 w-4 text-blue-400" />
            <span>Secrets: OK</span>
          </div>
        </div>
      </div>

      {/* Grid of Sections */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <NextLink
              key={card.id}
              href={card.href}
              className="group relative flex flex-col justify-between rounded-xl border border-[#222] bg-[#12161f] p-5 transition-all duration-200 hover:border-red-500/60 hover:bg-[#161c28] hover:shadow-lg hover:shadow-red-950/10"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#2b3545] bg-[#1c2333] text-slate-300 group-hover:border-red-500 group-hover:text-red-400 group-hover:bg-red-950/30 transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-slate-600 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-red-400" />
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-red-400 transition-colors">
                  {card.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  {card.description}
                </p>
              </div>

              <div className="mt-5 border-t border-[#1e2636] pt-3 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>{loading ? '...' : card.countLabel}</span>
                <span className="text-slate-500 group-hover:text-red-400 transition-colors">Управление →</span>
              </div>
            </NextLink>
          );
        })}
      </div>
    </div>
  );
}
