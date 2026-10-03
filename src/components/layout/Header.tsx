'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import { 
  Phone, 
  Mail, 
  Menu, 
  X, 
  Users, 
  ChevronDown 
} from 'lucide-react';
import { ORGANIZATION } from '@/data/organization';
import { GuillochePattern } from '@/components/ui/GuillochePattern';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };

  const navLinks = [
    { 
      label: 'Организация', 
      href: '/about',
      hasSubmenu: true,
      subItems: [
        { label: 'Общие сведения и цели', href: '/about' },
        { label: 'Руководство и структура', href: '/about/structure' },
        { label: 'Учредительные документы', href: '/documents?cat=Учредительные+документы' },
      ]
    },
    { label: 'Направления', href: '/activities' },
    { label: 'Реестр', href: '/specialists', highlight: true },
    { label: 'Обучение', href: '/education' },
    { label: 'Мероприятия', href: '/events' },
    { label: 'Документы', href: '/documents' },
    { label: 'Членство', href: '/membership' },
    { label: 'Контакты', href: '/contacts' },
  ];

  return (
    <header className="w-full bg-[#0A2540] text-white border-b border-slate-800 sticky top-0 z-50 shadow-md">
      {/* Top Official Info Bar */}
      <div className="bg-[#071A2E] text-slate-300 text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center gap-1.5 font-medium text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block animate-pulse"></span>
              Официальный портал отраслевой некоммерческой организации РФ
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-slate-400">ОГРН: {ORGANIZATION.ogrn}</span>
            <span className="hidden lg:inline text-slate-400">ИНН: {ORGANIZATION.inn}</span>
          </div>

          <div className="flex items-center space-x-4 text-slate-300">
            <a 
              href={`tel:${ORGANIZATION.phone.replace(/[^0-9+]/g, '')}`} 
              className="inline-flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>{ORGANIZATION.phone}</span>
            </a>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <a 
              href={`mailto:${ORGANIZATION.receptionEmail}`} 
              className="inline-flex items-center gap-1 hover:text-white transition-colors hidden sm:inline-flex"
            >
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>{ORGANIZATION.receptionEmail}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Branding Bar (Deep Navy with subtle Guilloche security ribbon) */}
      <div className="bg-gradient-to-r from-[#0A2540] via-[#0D2E50] to-[#0A2540] py-3.5 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        {/* Subtle dark security guilloche curves */}
        <GuillochePattern variant="ribbon" theme="dark" opacity={0.35} />

        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 relative z-10">
          {/* Logo & Organization Titles */}
          <NextLink href="/" className="flex items-center gap-4 group">
            {/* Official Logo on Dark Navy */}
            <div className="shrink-0 flex items-center">
              <Image
                src="/logo.png"
                alt="АНО ЦЗСТ — Winter Sports Technologies"
                width={210}
                height={33}
                className="h-9 sm:h-10 w-auto object-contain drop-shadow-sm"
                priority
              />
            </div>

            <div className="h-9 w-px bg-slate-700/60 hidden sm:block"></div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-wider uppercase text-blue-200 bg-blue-900/60 px-2 py-0.5 rounded border border-blue-400/30">
                  {ORGANIZATION.shortName}
                </span>
                <span className="text-[11px] text-slate-400 hidden sm:inline">
                  Основана в {ORGANIZATION.establishedYear} году
                </span>
              </div>
              <h1 className="text-xs sm:text-sm lg:text-[14px] font-bold text-white leading-snug tracking-tight max-w-xl group-hover:text-blue-200 transition-colors">
                {ORGANIZATION.fullName}
              </h1>
              <p className="text-[11px] text-slate-300 hidden md:block">
                Официальный реестр кадров, стандарты безопасности и научно-методическое сопровождение
              </p>
            </div>
          </NextLink>

          {/* Quick Action Badges */}
          <div className="hidden lg:flex items-center gap-3">
            <NextLink
              href="/specialists"
              className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-md border border-blue-400/30 bg-blue-950/60 text-blue-200 hover:bg-blue-900/80 hover:text-white transition-colors shadow-2xs"
            >
              <Users className="w-4 h-4 text-blue-400" />
              <span>Единый реестр специалистов</span>
            </NextLink>
            <NextLink
              href="/membership"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-2xs"
            >
              <span>Подать заявление</span>
            </NextLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-200 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Открыть главное меню"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Primary Navigation Menu (Deep Navy / Slate) */}
      <nav className="hidden lg:block bg-[#071E36] border-t border-slate-800/90 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <ul className="flex items-center space-x-1 text-[13px] font-medium text-slate-200">
            {navLinks.map((item) => {
              const active = isActive(item.href);
              
              if (item.hasSubmenu) {
                return (
                  <li 
                    key={item.href} 
                    className="relative"
                    onMouseEnter={() => setAboutDropdownOpen(true)}
                    onMouseLeave={() => setAboutDropdownOpen(false)}
                  >
                    <NextLink
                      href={item.href}
                      className={`inline-flex items-center gap-1 px-3.5 py-2.5 transition-colors border-b-2 ${
                        active
                          ? 'border-blue-400 text-white font-semibold bg-white/10'
                          : 'border-transparent text-slate-200 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </NextLink>

                    {aboutDropdownOpen && (
                      <div className="absolute left-0 top-full w-64 bg-[#0A2540] border border-slate-700 shadow-xl rounded-b-md py-1.5 z-50">
                        {item.subItems?.map((sub) => (
                          <NextLink
                            key={sub.href}
                            href={sub.href}
                            className="block px-4 py-2 text-xs text-slate-200 hover:bg-blue-900/60 hover:text-white transition-colors"
                          >
                            {sub.label}
                          </NextLink>
                        ))}
                      </div>
                    )}
                  </li>
                );
              }

              return (
                <li key={item.href}>
                  <NextLink
                    href={item.href}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 transition-colors border-b-2 ${
                      active
                        ? 'border-blue-400 text-white font-semibold bg-white/10'
                        : item.highlight
                        ? 'border-transparent text-blue-300 font-semibold hover:bg-white/5 hover:text-white'
                        : 'border-transparent text-slate-200 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.highlight && <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>}
                    {item.label}
                  </NextLink>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A2540] border-t border-slate-800 px-4 pt-3 pb-6 shadow-xl">
          <div className="space-y-1">
            {navLinks.map((item) => {
              const active = isActive(item.href);
              return (
                <div key={item.href} className="py-1">
                  <NextLink
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium ${
                      active
                        ? 'bg-blue-900/60 text-white font-semibold'
                        : 'text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.highlight && (
                      <span className="text-[10px] bg-blue-900 text-blue-200 px-2 py-0.5 rounded border border-blue-700/50">
                        Реестр
                      </span>
                    )}
                  </NextLink>

                  {item.hasSubmenu && (
                    <div className="pl-4 mt-1 space-y-1 border-l-2 border-slate-700 ml-3">
                      {item.subItems?.map((sub) => (
                        <NextLink
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-2 py-1.5 text-xs text-slate-300 hover:text-white"
                        >
                          {sub.label}
                        </NextLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col gap-2">
            <NextLink
              href="/specialists"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 px-3 rounded-md bg-blue-950 border border-blue-700/50 text-blue-200 font-medium text-sm"
            >
              Проверить специалиста в Реестре
            </NextLink>
            <NextLink
              href="/membership"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 px-3 rounded-md bg-blue-600 text-white font-medium text-sm hover:bg-blue-500"
            >
              Подать документы на членство
            </NextLink>
          </div>
        </div>
      )}
    </header>
  );
};
