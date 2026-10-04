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
  LayoutTemplate
} from 'lucide-react';
import './globals.css';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
}

const navItems: NavItem[] = [
  { id: 'header', label: 'Меню', icon: Menu, href: '/admin/header' },
  { id: 'hero', label: 'Главный экран', icon: Sliders, href: '/admin/hero' },
  { id: 'sections', label: 'Разделы', icon: LayoutDashboard, href: '/admin/sections' },
  { id: 'section-order', label: 'Порядок', icon: SlidersHorizontal, href: '/admin/section-order' },
  { id: 'pages', label: 'Страницы', icon: Layers, href: '/admin/pages' },
  { id: 'organization', label: 'Организация', icon: Building2, href: '/admin/organization' },
  { id: 'specialists', label: 'Реестр кадров', icon: Users, href: '/admin/specialists' },
  { id: 'news', label: 'Новости', icon: Newspaper, href: '/admin/news' },
  { id: 'events', label: 'Мероприятия', icon: Calendar, href: '/admin/events' },
  { id: 'documents', label: 'Документы', icon: FileText, href: '/admin/documents' },
  { id: 'directions', label: 'Направления', icon: Compass, href: '/admin/directions' },
  { id: 'partners', label: 'Партнёры', icon: Handshake, href: '/admin/partners' },
  { id: 'contacts', label: 'Контакты', icon: Phone, href: '/admin/contacts' },
  { id: 'media', label: 'Медиа', icon: ImageIcon, href: '/admin/media' },
  { id: 'fonts', label: 'Шрифты', icon: Type, href: '/admin/fonts' },
  { id: 'footer', label: 'Подвал', icon: LayoutTemplate, href: '/admin/footer' },
];


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [pathname]);

  async function checkAuth() {
    try {
      const res = await fetch('/api/admin/check');
      const isAuth = res.ok;
      setAuth(isAuth);
      if (!isAuth && pathname !== '/admin/login') {
        router.push('/admin/login');
      }
    } catch {
      if (pathname !== '/admin/login') {
        router.push('/admin/login');
      }
    }
    setLoading(false);
  }

  async function handleLogout() {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch {}
    router.push('/admin/login');
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-red-500 border-t-transparent"></div>
          <span className="font-mono text-xs uppercase tracking-widest text-slate-400">Загрузка панели...</span>
        </div>
      </div>
    );
  }

  if (!auth && pathname !== '/admin/login') {
    return null;
  }

  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-[#0a0a0a] text-white">{children}</div>;
  }

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-slate-100 overflow-hidden font-sans">
      {/* Mobile Top Header */}
      <div className="fixed top-0 inset-x-0 z-40 flex h-14 items-center justify-between border-b border-[#222] bg-[#111] px-4 md:hidden">
        <div className="flex items-center gap-2">
          <span className="font-black text-sm tracking-widest text-white">АНО «ЦРЗС»</span>
          <span className="rounded bg-red-600/20 px-1.5 py-0.5 font-mono text-[10px] text-red-400">CMS</span>
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
              <span className="font-black text-sm tracking-wider text-white">АНО «ЦРЗС»</span>
              <span className="rounded bg-red-600 px-1.5 py-0.5 font-mono text-[9px] font-bold text-white uppercase">R2 CMS</span>
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

        {/* Navigation list */}
        <nav className="flex-1 overflow-y-auto p-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <NextLink
                key={item.id}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                title={collapsed ? item.label : undefined}
                className={`flex items-center gap-3 rounded px-3 py-2 text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-red-600/20 text-red-400 border-l-2 border-red-500 font-semibold'
                    : 'text-slate-400 hover:bg-[#1a1a1a] hover:text-white'
                } ${collapsed ? 'justify-center px-0' : ''}`}
              >
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-red-400' : 'text-slate-400'}`} />
                {!collapsed && <span>{item.label}</span>}
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
