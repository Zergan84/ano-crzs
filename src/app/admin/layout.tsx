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
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Дашборд', icon: LayoutDashboard, href: '/admin', modes: ['landing', 'portal'] },
  { id: 'settings', label: 'Настройки', icon: Settings, href: '/admin/settings', modes: ['landing', 'portal'] },
  { id: 'themes', label: 'Темы', icon: Palette, href: '/admin/themes', modes: ['landing', 'portal'] },
  // 1. Шапка сайта (Лендинг)
  { id: 'landing-hero', label: '1. Шапка сайта', icon: Menu, href: '/admin/landing-hero', modes: ['landing'], badge: 'Лендинг' },
  // 2. Главный экран (Main Hero / Слайдер)
  { id: 'hero', label: '2. Главный экран (Hero)', icon: Sliders, href: '/admin/hero', modes: ['landing', 'portal'] },
  // 3. О центре (#about)
  { id: 'organization', label: '3. О центре (#about)', icon: Building2, href: '/admin/organization', modes: ['landing', 'portal'] },
  // 4. Проекты и программы (#projects)
  { id: 'directions', label: '4. Проекты и программы', icon: Compass, href: '/admin/directions', modes: ['landing', 'portal'] },
  // 5. Новости (#news)
  { id: 'news', label: '5. Новости (#news)', icon: Newspaper, href: '/admin/news', modes: ['landing', 'portal'] },
  // 6. Документы и отчёты (#documents)
  { id: 'documents', label: '6. Документы и отчёты', icon: FileText, href: '/admin/documents', modes: ['landing', 'portal'] },
  // 7. Партнёры (#partners)
  { id: 'partners', label: '7. Партнёры (#partners)', icon: Handshake, href: '/admin/partners', modes: ['landing', 'portal'] },
  // 8. Сотрудничество (#partnership)
  { id: 'landing-ideology', label: '8. Сотрудничество', icon: Landmark, href: '/admin/landing-ideology', modes: ['landing'], badge: 'Лендинг' },
  // 9. Контакты (#contacts)
  { id: 'contacts', label: '9. Контакты (#contacts)', icon: Phone, href: '/admin/contacts', modes: ['landing', 'portal'] },
  // 10. Подвал (Footer)
  { id: 'footer', label: '10. Подвал (Footer)', icon: LayoutTemplate, href: '/admin/footer', modes: ['landing', 'portal'] },
  // Portal-only blocks (скрыты в режиме Лендинга)
  { id: 'header', label: 'Меню портала', icon: Menu, href: '/admin/header', modes: ['portal'], badge: 'Портал' },
  { id: 'section-order', label: 'Порядок разделов', icon: SlidersHorizontal, href: '/admin/section-order', modes: ['portal'], badge: 'Портал' },
  { id: 'pages', label: 'Страницы портала', icon: Layers, href: '/admin/pages', modes: ['portal'], badge: 'Портал' },
  { id: 'specialists', label: 'Реестр кадров', icon: Users, href: '/admin/specialists', modes: ['portal'], badge: 'Портал' },
  { id: 'events', label: 'Мероприятия', icon: Calendar, href: '/admin/events', modes: ['portal'], badge: 'Портал' },
  // Медиатека и Шрифты
  { id: 'media', label: 'Медиатека R2', icon: ImageIcon, href: '/admin/media', modes: ['landing', 'portal'] },
  { id: 'fonts', label: 'Шрифты', icon: Type, href: '/admin/fonts', modes: ['landing', 'portal'] },
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
  const visibleNavItems = navItems.filter((item) => item.modes.includes(siteMode));

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

        {/* Navigation list */}
        <nav className="flex-1 overflow-y-auto p-2 space-y-1">
          {visibleNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <NextLink
                key={item.id}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                title={collapsed ? item.label : undefined}
                className={`flex items-center justify-between gap-2 rounded px-3 py-2 text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-amber-600/20 text-amber-400 border-l-2 border-amber-500 font-semibold'
                    : 'text-slate-400 hover:bg-[#1a1a1a] hover:text-white'
                } ${collapsed ? 'justify-center px-0' : ''}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </div>
                {!collapsed && item.badge && (
                  <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/5 text-slate-400 shrink-0">
                    {item.badge}
                  </span>
                )}
              </NextLink>
            );
          })}
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
