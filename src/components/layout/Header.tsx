'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import { 
  Menu, 
  X, 
  Users, 
  ChevronDown 
} from 'lucide-react';
import { ORGANIZATION } from '@/data/organization';
import { GuillochePattern } from '@/components/ui/GuillochePattern';
import { useSiteContent } from '@/lib/content';
import { DEFAULT_HEADER } from '@/data/defaultContent';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { content } = useSiteContent();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };

  const headerData = content?.header || DEFAULT_HEADER;
  const navLinks = (headerData.navLinks && headerData.navLinks.length > 0)
    ? headerData.navLinks
    : DEFAULT_HEADER.navLinks;


  return (
    <header className="w-full bg-[#0A2540] text-white border-b border-slate-800 sticky top-0 z-50 shadow-md transition-all duration-300">
      {/* Main Branding Bar (Deep Navy with subtle Guilloche security ribbon) */}
      <div 
        className={`bg-gradient-to-r from-[#0A2540] via-[#0D2E50] to-[#0A2540] px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden transition-all duration-300 ${
          scrolled ? 'py-2 sm:py-2.5' : 'py-3 sm:py-4.5 lg:py-5'
        }`}
      >
        {/* Subtle dark security guilloche curves */}
        <GuillochePattern variant="ribbon" theme="dark" opacity={0.35} />

        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 relative z-10">
          {/* Logo & Organization Titles */}
          <NextLink href="/" className="flex items-center gap-3 sm:gap-4 group">
            {/* Official Logo on Dark Navy / Sign on Scroll */}
            <div className="shrink-0 flex items-center">
              <Image
                src={scrolled ? "/logo_sign.png" : "/logo.png"}
                alt="АНО «Центр развития зимнего спорта, современных спортивных технологий и туризма»"
                width={scrolled ? 100 : 210}
                height={scrolled ? 50 : 33}
                className={`w-auto object-contain drop-shadow-sm transition-all duration-300 ${
                  scrolled 
                    ? 'h-6 sm:h-7' 
                    : 'h-8 sm:h-10 lg:h-11'
                }`}
                priority
              />
            </div>

            {/* Divider (Hidden on mobile) */}
            <div className={`w-px bg-slate-700/60 hidden sm:block transition-all duration-300 ${
              scrolled ? 'h-6' : 'h-9'
            }`} />

            {/* Text block: COMPLETELY HIDDEN ON MOBILE */}
            <div className="hidden sm:flex flex-col transition-all duration-300 justify-center">
              <h1 className={`font-bold text-white transition-colors group-hover:text-blue-200 ${
                scrolled 
                  ? 'text-xs truncate max-w-md' 
                  : 'text-xs sm:text-sm lg:text-[14px] leading-snug tracking-tight max-w-xl'
              }`}>
                АНО «Центр развития зимнего спорта, современных спортивных технологий и туризма»
              </h1>
            </div>
          </NextLink>

          {/* Quick Action Badges */}
          <div className="hidden lg:flex items-center gap-2.5">
            <NextLink
              href={headerData.registryButtonHref || "/specialists"}
              className={`inline-flex items-center gap-2 font-semibold rounded-md border border-blue-400/30 bg-blue-950/60 text-blue-200 hover:bg-blue-900/80 hover:text-white transition-all shadow-2xs ${
                scrolled ? 'px-2.5 py-1 text-[11px]' : 'px-3 py-2 text-xs'
              }`}
            >
              <Users className={`${scrolled ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-blue-400`} />
              <span>{headerData.registryButtonText || 'Единый реестр специалистов'}</span>
            </NextLink>
            <NextLink
              href={headerData.ctaButtonHref || "/membership"}
              className={`inline-flex items-center gap-2 font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-2xs ${
                scrolled ? 'px-3 py-1 text-[11px]' : 'px-3.5 py-2 text-xs'
              }`}
            >
              <span>{headerData.ctaButtonText || 'Подать заявление'}</span>
            </NextLink>
          </div>


          {/* Mobile Menu Button - Minimal height */}
          <div className="flex items-center lg:hidden gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-md text-slate-200 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Открыть главное меню"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Primary Navigation Menu (Deep Navy / Slate) */}
      <nav className={`hidden lg:block bg-[#071E36] border-t border-slate-800/90 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
        scrolled ? 'py-0' : 'py-0'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <ul className={`flex items-center space-x-1 font-medium text-slate-200 transition-all duration-300 ${
            scrolled ? 'text-xs' : 'text-[13px]'
          }`}>
            {navLinks.map((item) => {
              if (item.isRed) {
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className={`inline-flex items-center gap-1.5 rounded font-black tracking-wide bg-red-600 hover:bg-red-500 text-white transition-all shadow-xs ${
                        scrolled ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-xs sm:text-[13px]'
                      }`}
                    >
                      <span>Carve CUP</span>
                      <span>🔥</span>
                    </a>
                  </li>
                );
              }

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
                      className={`inline-flex items-center gap-1 transition-all border-b-2 ${
                        scrolled ? 'px-3 py-1.5' : 'px-3.5 py-2.5'
                      } ${
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
                    className={`inline-flex items-center gap-1.5 transition-all border-b-2 ${
                      scrolled ? 'px-3 py-1.5' : 'px-3.5 py-2.5'
                    } ${
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
              if (item.isRed) {
                return (
                  <div key={item.href} className="py-1">
                    <a
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-md text-sm font-black bg-red-600 text-white hover:bg-red-500 shadow-sm"
                    >
                      <span className="flex items-center gap-1.5">
                        <span>Carve CUP</span>
                        <span>🔥</span>
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-wider bg-white/20 px-2 py-0.5 rounded">
                        Кубок 2028
                      </span>
                    </a>
                  </div>
                );
              }

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
