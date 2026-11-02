'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import NextLink from 'next/link';
import { 
  LayoutDashboard, 
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
  ExternalLink, 
  LogOut, 
  Menu, 
  X,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Layers,
  Type,
  LayoutTemplate,
  Settings,
  Landmark,
  Palette,
  LayoutGrid,
  ShieldCheck,
} from 'lucide-react';
import { useSiteContent } from '@/lib/content';
import './globals.css';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
  modes: ('landing' | 'portal')[];
  badge?: string;
  category?: 'system' | 'modules' | 'portal' | 'media';
}

const navItems: NavItem[] = [
  // 1. Системные разделы
  { id: 'dashboard', label: 'Дашборд', icon: LayoutDashboard, href: '/admin', modes: ['landing', 'portal'], category: 'system' },
  { id: 'settings', label: 'Настройки', icon: Settings, href: '/admin/settings', modes: ['landing', 'portal'], category: 'system' },
  { id: 'themes', label: 'Темы', icon: Palette, href: '/admin/themes', modes: ['landing', 'portal'], category: 'system' },
  { id: 'section-order', label: 'Порядок', icon: SlidersHorizontal, href: '/admin/section-order', modes: ['landing', 'portal'], badge: 'Структура', category: 'system' },
  { id: 'sections', label: 'Разделы', icon: Layers, href: '/admin/sections', modes: ['landing', 'portal'], badge: 'Конструктор', category: 'system' },
  { id: 'menu', label: 'Меню сайта', icon: Menu, href: '/admin/menu', modes: ['landing', 'portal'], badge: 'Навигация', category: 'system' },

  // 2. МОДУЛИ САЙТА (выделены в отдельный блок в порядке отображения на сайте)
  { id: 'landing-hero', label: 'Шапка сайта', icon: SlidersHorizontal, href: '/admin/landing-hero', modes: ['landing', 'portal'], category: 'modules' },
  { id: 'hero', label: 'Главный экран', icon: Sliders, href: '/admin/hero', modes: ['landing', 'portal'], category: 'modules' },
  { id: 'widgets', label: 'Виджеты', icon: LayoutGrid, href: '/admin/widgets', modes: ['landing', 'portal'], badge: 'Траст-бар', category: 'modules' },
  { id: 'organization', label: 'О центре', icon: Building2, href: '/admin/organization', modes: ['landing', 'portal'], category: 'modules' },
  { id: 'directions', label: 'Проекты и программы', icon: Compass, href: '/admin/directions', modes: ['landing', 'portal'], category: 'modules' },
  { id: 'news', label: 'Новости', icon: Newspaper, href: '/admin/news', modes: ['landing', 'portal'], category: 'modules' },
  { id: 'documents', label: 'Документы и отчёты', icon: FileText, href: '/admin/documents', modes: ['landing', 'portal'], category: 'modules' },
  { id: 'partners', label: 'Партнёры', icon: Handshake, href: '/admin/partners', modes: ['landing', 'portal'], category: 'modules' },
  { id: 'landing-ideology', label: 'Сотрудничество', icon: Landmark, href: '/admin/landing-ideology', modes: ['landing'], category: 'modules' },
  { id: 'contacts', label: 'Контакты', icon: Phone, href: '/admin/contacts', modes: ['landing', 'portal'], category: 'modules' },
  { id: 'footer', label: 'Подвал', icon: LayoutTemplate, href: '/admin/footer', modes: ['landing', 'portal'], category: 'modules' },
  { id: 'privacy-policy', label: 'Политика конфиденциальности', icon: ShieldCheck, href: '/admin/privacy-policy', modes: ['landing', 'portal'], badge: '152-ФЗ', category: 'modules' },

  // 3. Портал
  { id: 'header', label: 'Меню портала', icon: Menu, href: '/admin/header', modes: ['portal'], badge: 'Портал', category: 'portal' },
  { id: 'pages', label: 'Страницы портала', icon: Layers, href: '/admin/pages', modes: ['portal'], badge: 'Портал', category: 'portal' },
  { id: 'specialists', label: 'Реестр кадров', icon: Users, href: '/admin/specialists', modes: ['portal'], badge: 'Портал', category: 'portal' },
  { id: 'events', label: 'Мероприятия', icon: Calendar, href: '/admin/events', modes: ['portal'], badge: 'Портал', category: 'portal' },

  // 4. Медиа и Шрифты
  { id: 'media', label: 'Медиатека R2', icon: ImageIcon, href: '/admin/media', modes: ['landing', 'portal'], category: 'media' },
  { id: 'fonts', label: 'Шрифты', icon: Type, href: '/admin/fonts', modes: ['landing', 'portal'], category: 'media' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { content } = useSiteContent();
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const siteMode: 'landing' | 'portal' = content?.settings?.siteMode || 'landing';
  
  // Custom modules created dynamically in "Разделы"
  const customSections = (content?.landing as any)?.customSections || [];
  const customNavItems: NavItem[] = customSections.map((cs: any) => ({
    id: cs.id.startsWith('custom-') ? cs.id : ('custom-' + cs.id),
    label: cs.title || cs.anchor || 'Новый раздел',
    icon: Layers,
    href: `/admin/sections?edit=${encodeURIComponent(cs.id)}`,
    modes: ['landing', 'portal'],
    badge: 'Модуль',
    category: 'modules',
  }));

  const baseNavItems = navItems.filter((item) => item.modes.includes(siteMode));

  // Actual section order on site (from landing.sectionOrder)
  const siteSectionOrder: string[] = (content?.landing as any)?.sectionOrder || [
    'hero', 'widgets', 'about', 'projects', 'news', 'documents', 'partners', 'partnership', 'contacts'
  ];

  // Map internal sectionOrder keys to sidebar item IDs:
  // 'hero' -> 'hero'
  // 'widgets' -> 'widgets'
  // 'about' -> 'organization'
  // 'projects' -> 'directions'
  // 'news' -> 'news'
  // 'documents' -> 'documents'
  // 'partners' -> 'partners'
  // 'partnership' -> 'landing-ideology'
  // 'contacts' -> 'contacts'
  // 'custom-xxx' -> 'custom-xxx'
  const sectionKeyToNavId: Record<string, string> = {
    hero: 'hero',
    widgets: 'widgets',
    about: 'organization',
    projects: 'directions',
    news: 'news',
    documents: 'documents',
    partners: 'partners',
    partnership: 'landing-ideology',
    contacts: 'contacts',
  };

  // Build the list of modules ordered EXACTLY as on the site:
  // Start with 'landing-hero' (Header is always on top)
  const orderedModuleNavItems: NavItem[] = [];
  const headerItem = baseNavItems.find(i => i.id === 'landing-hero');
  if (headerItem) orderedModuleNavItems.push(headerItem);

  // Pool of all available module items (standard + custom)
  const allModuleItems = [
    ...baseNavItems.filter(i => i.category === 'modules' && i.id !== 'landing-hero' && i.id !== 'footer' && i.id !== 'privacy-policy'),
    ...customNavItems
  ];

  // Follow siteSectionOrder precisely
  siteSectionOrder.forEach((secKey) => {
    const targetNavId = secKey.startsWith('custom-') ? secKey : sectionKeyToNavId[secKey] || secKey;
    const found = allModuleItems.find(i => i.id === targetNavId);
    if (found && !orderedModuleNavItems.some(i => i.id === found.id)) {
      orderedModuleNavItems.push(found);
    }
  });

  // Any module items in pool not yet in ordered list:
  allModuleItems.forEach(item => {
    if (!orderedModuleNavItems.some(i => i.id === item.id)) {
      orderedModuleNavItems.push(item);
    }
  });

  // Finally add Footer and Privacy Policy at the bottom of modules
  const footerItem = baseNavItems.find(i => i.id === 'footer');
  if (footerItem) orderedModuleNavItems.push(footerItem);
  const privacyItem = baseNavItems.find(i => i.id === 'privacy-policy');
  if (privacyItem) orderedModuleNavItems.push(privacyItem);

  // Assemble full visibleNavItems list:
  // 1. System items
  // 2. Ordered modules
  // 3. Other items (portal, media, etc.)
  const systemItems = baseNavItems.filter(i => i.category === 'system');
  const otherItems = baseNavItems.filter(i => i.category !== 'system' && i.category !== 'modules');
  const visibleNavItems = [...systemItems, ...orderedModuleNavItems, ...otherItems];

  useEffect(() => {
    checkAuth();
  }, [pathname]);

  const isLoginPage = pathname?.startsWith('/admin/login');

  async function checkAuth() {
    try {
      const res = await fetch('/api/admin/check', {
        credentials: 'same-origin',
        cache: 'no-store',
      });
      const isAuth = res.ok;
      setAuth(isAuth);
      if (!isAuth && !isLoginPage) {
        router.push('/admin/login');
      }
    } catch {
      if (!isLoginPage) {
        router.push('/admin/login');
      }
    }
    setLoading(false);
  }

  async function handleLogout() {
    try {
      await fetch('/api/admin/logout', { method: 'POST', credentials: 'same-origin' });
    } catch {}
    router.push('/admin/login');
  }

  if (isLoginPage) {
    return <div className="min-h-screen bg-[#0a0a0a] text-white">{children}</div>;
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent"></div>
          <span className="font-mono text-xs uppercase tracking-widest text-slate-400">Загрузка панели...</span>
        </div>
      </div>
    );
  }

  if (!auth) {
    return null;
  }

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-slate-100 overflow-hidden font-sans">
      {/* Mobile Top Header */}
      <div className="fixed top-0 inset-x-0 z-40 flex h-14 items-center justify-between border-b border-[#222] bg-[#111] px-4 md:hidden">
        <div className="flex items-center gap-2">
          <span className="font-black text-sm tracking-widest text-white">АНО «ЦЗСТ»</span>
          <span
            className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase ${
              siteMode === 'landing'
                ? 'bg-amber-500/20 text-amber-400'
                : 'bg-blue-500/20 text-blue-400'
            }`}
          >
            {siteMode === 'landing' ? 'ЛЕНДИНГ' : 'ПОРТАЛ'}
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded p-1.5 text-slate-400 hover:bg-[#222] hover:text-white"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-[#222] bg-[#111] transition-all duration-300 md:static ${
          mobileOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0'
        } ${collapsed ? 'md:w-16' : 'md:w-64'}`}
      >
        {/* Brand Header */}
        <div className="flex h-14 items-center justify-between border-b border-[#222] px-4">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <span className="font-black text-sm tracking-wider text-white">АНО «ЦЗСТ»</span>
              <span
                className={`rounded px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase ${
                  siteMode === 'landing'
                    ? 'bg-amber-600 text-white'
                    : 'bg-blue-600 text-white'
                }`}
              >
                {siteMode === 'landing' ? 'ЛЕНДИНГ' : 'ПОРТАЛ'}
              </span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden p-1 text-slate-400 hover:text-white md:block"
            title={collapsed ? 'Развернуть' : 'Свернуть'}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Active Mode Quick Banner */}
        {!collapsed && (
          <div className="px-3 py-2 border-b border-[#222] bg-[#0d1118] flex items-center justify-between text-[11px]">
            <span className="text-slate-400">
              Режим: <strong className="text-white">{siteMode === 'landing' ? 'Лендинг' : 'Портал'}</strong>
            </span>
            <NextLink
              href="/admin/settings"
              className="text-amber-400 hover:text-amber-300 font-semibold underline"
            >
              Изменить
            </NextLink>
          </div>
        )}

        {/* Navigation list with distinct "Модули" section */}
        <nav className="flex-1 overflow-y-auto p-2 space-y-1">
          {(() => {
            const systemItems = visibleNavItems.filter((i) => i.category === 'system');
            const moduleItems = visibleNavItems.filter((i) => i.category === 'modules');
            const otherItems = visibleNavItems.filter((i) => i.category !== 'system' && i.category !== 'modules');

            const renderLink = (item: NavItem, isModule?: boolean) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <NextLink
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  title={collapsed ? item.label : undefined}
                  className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                    isActive
                      ? isModule
                        ? 'bg-blue-600/25 text-blue-300 border-l-2 border-blue-400 font-semibold shadow-sm'
                        : 'bg-amber-600/20 text-amber-400 border-l-2 border-amber-500 font-semibold'
                      : isModule
                      ? 'text-slate-300 hover:bg-[#151c2e] hover:text-white'
                      : 'text-slate-400 hover:bg-[#1a1a1a] hover:text-white'
                  } ${collapsed ? 'justify-center px-0' : ''}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className={`h-4 w-4 shrink-0 ${isActive ? (isModule ? 'text-blue-400' : 'text-amber-400') : (isModule ? 'text-blue-400/80' : 'text-slate-400')}`} />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </div>
                  {!collapsed && item.badge && (
                    <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded shrink-0 ${
                      isModule ? 'bg-blue-500/15 text-blue-300 border border-blue-500/20' : 'bg-white/5 text-slate-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </NextLink>
              );
            };

            return (
              <>
                {/* 1. Управление и система */}
                {systemItems.map((item) => renderLink(item, false))}

                {/* 2. Блок "МОДУЛИ САЙТА" - выделен синим акцентом */}
                {moduleItems.length > 0 && (
                  <div className="pt-3 pb-1">
                    {!collapsed && (
                      <div className="flex items-center justify-between px-3 py-1 mb-1">
                        <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-blue-400/90 flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
                          Модули сайта
                        </span>
                        <span className="text-[9px] text-slate-500 font-mono">по порядку</span>
                      </div>
                    )}
                    <div className="rounded-xl border border-blue-900/30 bg-[#0d1322]/60 p-1 space-y-0.5 shadow-inner">
                      {moduleItems.map((item) => renderLink(item, true))}
                    </div>
                  </div>
                )}

                {/* 3. Дополнительно (Портал, Медиа, Шрифты) */}
                {otherItems.length > 0 && (
                  <div className="pt-2">
                    {otherItems.map((item) => renderLink(item, false))}
                  </div>
                )}
              </>
            );
          })()}
        </nav>

        {/* Bottom actions */}
        <div className="border-t border-[#222] p-2 space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            title={collapsed ? 'Открыть сайт' : undefined}
            className={`flex items-center gap-3 rounded px-3 py-2 text-xs text-slate-400 hover:bg-[#1a1a1a] hover:text-white transition-colors ${
              collapsed ? 'justify-center px-0' : ''
            }`}
          >
            <ExternalLink className="h-4 w-4 shrink-0" />
            {!collapsed && <span>Открыть сайт</span>}
          </a>

          <button
            onClick={handleLogout}
            title={collapsed ? 'Выйти' : undefined}
            className={`flex w-full items-center gap-3 rounded px-3 py-2 text-xs text-red-400 hover:bg-red-950/40 transition-colors ${
              collapsed ? 'justify-center px-0' : ''
            }`}
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {!collapsed && <span>Выйти</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 pt-18 md:p-8 md:pt-8 bg-[#0a0a0a]">
        {children}
      </main>
    </div>
  );
}
