'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  Cpu,
  Compass,
  GraduationCap,
  Wrench,
  Trophy,
  Building2,
  FileText,
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Copy,
  Check,
  Menu,
  X,
  Download,
  Scale,
  Users,
  Sparkles,
  BookOpen,
  Landmark,
  Award,
  Activity,
} from 'lucide-react';
import { useSiteContent, resolveMediaUrl } from '@/lib/content';
import { ORGANIZATION } from '@/data/organization';
import { DEFAULT_LANDING, DEFAULT_FOOTER, DEFAULT_SETTINGS } from '@/data/defaultContent';
import { HeroSlider } from '@/components/HeroSlider';

export function LandingView() {
  const { content } = useSiteContent();

  const org = content?.organization || ORGANIZATION;
  const landing = content?.landing || DEFAULT_LANDING;
  const header = landing.header || DEFAULT_LANDING.header;
  const hero = landing.hero || DEFAULT_LANDING.hero;
  const ideology = landing.ideology || DEFAULT_LANDING.ideology;
  const footer = content?.footer || DEFAULT_FOOTER;
  const settings = content?.settings || DEFAULT_SETTINGS;
  const documents = content?.documents?.items || [];
  const partners = content?.partners?.items || [];

  const activeThemeId =
    content?.themes?.activeThemeId ||
    content?.settings?.activeThemeId ||
    'basic-light';
  const activeTheme =
    (content?.themes?.items || []).find((t: any) => t.id === activeThemeId) || null;
  const isBoltStyle = activeThemeId === 'bolt-style';

  const boltAboutImg =
    activeTheme?.aboutImage ||
    'https://images.pexels.com/photos/7207549/pexels-photo-7207549.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
  const boltPartnerImg =
    activeTheme?.partnerImage ||
    'https://images.pexels.com/photos/4963360/pexels-photo-4963360.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

  const [docCategoryFilter, setDocCategoryFilter] = useState<string>('Все');

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [copiedRequisites, setCopiedRequisites] = useState(false);

  // Official Appeal Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'Сотрудничество и партнерство',
    message: '',
    consent152FZ: false,
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');

  const handleCopyRequisites = () => {
    const bank = org.bankRequisites || ORGANIZATION.bankRequisites;
    const text = [
      `Полное наименование: ${org.fullName}`,
      `Сокращенное наименование: ${org.shortName} (${(org as any).shortNameEn || 'ANO «CWST»'})`,
      `ОГРН: ${org.ogrn}`,
      `ИНН / КПП: ${org.inn} / ${org.kpp}`,
      `ОКПО: ${org.okpo}`,
      `Юридический адрес: ${org.legalAddress}`,
      `Банк: ${bank?.bankName || ''}`,
      `БИК: ${bank?.bik || ''}`,
      `Р/с: ${bank?.checkingAccount || ''}`,
      `К/с: ${bank?.correspondentAccount || ''}`,
    ].join('\n');
    navigator.clipboard.writeText(text);
    setCopiedRequisites(true);
    setTimeout(() => setCopiedRequisites(false), 3000);
  };

  const handleAppealSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent152FZ) return;
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setTicketNumber(`ЦЗСТ-2026/${randomNum}`);
    setFormSubmitted(true);
  };

  const getDirectionIcon = (dir: any, idx: number) => {
    const iconName = (dir.icon || '').toLowerCase();
    if (iconName.includes('trophy') || idx === 0) return <Trophy className="w-5 h-5" />;
    if (iconName.includes('cpu') || idx === 1) return <Cpu className="w-5 h-5" />;
    if (iconName.includes('compass') || idx === 2) return <Compass className="w-5 h-5" />;
    if (iconName.includes('graduation') || idx === 3) return <GraduationCap className="w-5 h-5" />;
    if (iconName.includes('wrench') || idx === 4) return <Wrench className="w-5 h-5" />;
    return <ShieldCheck className="w-5 h-5" />;
  };

  const principles =
    Array.isArray((org as any).principles) && (org as any).principles.length > 0
      ? (org as any).principles
      : ORGANIZATION.principles;

  const directions =
    Array.isArray(org.directions) && org.directions.length > 0
      ? org.directions
      : ORGANIZATION.directions;

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#1E293B] selection:bg-amber-500/20 selection:text-[#0F172A]">
      {/* =====================================================================
          4.1. ШАПКА (HEADER) — Ведомственный цифровой стандарт / Bolt style
         ===================================================================== */}
      {isBoltStyle ? (
        <header className="bolt-header sticky top-0 z-50 bg-[#071A33]/95 backdrop-blur-md shadow-lg shadow-black/15 border-b border-white/10">
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
            <a href="#hero" className="flex items-center gap-3.5 text-white group min-w-0">
              <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center p-2 shrink-0">
                <img
                  src="/logo_sign.png"
                  alt="АНО «ЦЗСТ»"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-[#F0CF6A] transition-colors">
                  {header.logoTitle || 'АНО «ЦЗСТ»'}
                </span>
                <span className="text-[11px] text-[#B3C9E0] truncate max-w-[230px] sm:max-w-[340px]">
                  {header.logoSubtitle || 'Центр развития зимнего спорта, спортивных технологий и туризма'}
                </span>
              </div>
            </a>

            <nav aria-label="Основная навигация" className="hidden lg:flex lg:items-center lg:gap-1">
              {(header.navLinks || DEFAULT_LANDING.header.navLinks).map((link: any, idx: number) => (
                <a
                  key={idx}
                  href={link.href}
                  className="rounded-lg px-3.5 py-2 text-sm font-medium text-[#D9E4F0] transition-colors hover:bg-white/10 hover:text-white whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden lg:block shrink-0">
              <a
                href={header.ctaHref || '#appeal-form'}
                className="inline-flex items-center gap-2 rounded-full bg-[#E8B93E] px-5 py-2.5 text-sm font-semibold text-[#071A33] shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#F0CF6A]"
              >
                <span>{header.ctaText || 'Обращение / Партнёрство'}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2.5 text-[#D9E4F0] transition-colors hover:bg-white/10 hover:text-white lg:hidden"
              aria-label="Меню навигации"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="border-t border-white/10 bg-[#071A33] px-6 pb-6 pt-3 lg:hidden">
              <nav aria-label="Мобильная навигация" className="flex flex-col gap-1">
                {(header.navLinks || DEFAULT_LANDING.header.navLinks).map((link: any, idx: number) => (
                  <a
                    key={idx}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-base font-medium text-[#D9E4F0] transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href={header.ctaHref || '#appeal-form'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-[#E8B93E] px-5 py-3 text-base font-semibold text-[#071A33] transition-colors hover:bg-[#F0CF6A]"
                >
                  <span>{header.ctaText || 'Обращение / Партнёрство'}</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </nav>
            </div>
          )}
        </header>
      ) : (
        <header className="sticky top-0 z-50 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E2E8F0]">
          {/* Верхняя официальная ведомственная полоса */}
          <div className="bg-[#0F172A] text-slate-300 text-[11px] border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-orange-600 to-amber-400" />
                <span className="font-medium text-slate-200">
                  Официальный информационный ресурс некоммерческой организации РФ
                </span>
                <span className="hidden md:inline text-slate-500">|</span>
                <span className="hidden md:inline text-slate-400">
                  {org.legalAddress || 'РФ, Московская обл., Красногорск г.о., п. Архангельское'}
                </span>
              </div>
              <div className="flex items-center gap-4 font-mono text-[11px]">
                <a
                  href={`tel:${(org.phone || '+7 (495) 789-34-20').replace(/[^0-9+]/g, '')}`}
                  className="text-slate-300 hover:text-amber-400 transition-colors"
                >
                  {org.phone || '+7 (495) 789-34-20'}
                </a>
                <span className="text-slate-600">•</span>
                <a
                  href={`mailto:${org.receptionEmail || 'info@ano-czst.ru'}`}
                  className="text-slate-300 hover:text-amber-400 transition-colors hidden sm:inline"
                >
                  {org.receptionEmail || 'info@ano-czst.ru'}
                </a>
              </div>
            </div>
          </div>

          {/* Основная навигационная панель */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
            {/* Логотип и наименование */}
            <a href="#hero" className="flex items-center gap-3.5 group min-w-0">
              <div className="w-11 h-11 rounded-lg bg-[#0F172A] border border-slate-800 flex items-center justify-center p-2 shrink-0 shadow-2xs">
                <img
                  src="/logo_sign.png"
                  alt="Эмблема АНО «ЦЗСТ»"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg font-extrabold tracking-tight text-[#0F172A] group-hover:text-orange-700 transition-colors">
                    {header.logoTitle || 'АНО «ЦЗСТ»'}
                  </span>
                  <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#F8F9FA] border border-[#E2E8F0] text-[#334155]">
                    ANO «CWST»
                  </span>
                </div>
                <span className="text-[11px] sm:text-xs text-[#334155] leading-tight truncate max-w-[240px] sm:max-w-[360px] lg:max-w-[420px]">
                  {header.logoSubtitle || 'Центр развития зимнего спорта, спортивных технологий и туризма'}
                </span>
              </div>
            </a>

            {/* Десктопная навигация */}
            <nav aria-label="Основная навигация" className="hidden xl:flex items-center gap-1">
              {(header.navLinks || DEFAULT_LANDING.header.navLinks).map((link: any, idx: number) => (
                <a
                  key={idx}
                  href={link.href}
                  className="px-3 py-2 rounded-md text-xs font-semibold text-[#1E293B] hover:text-orange-700 hover:bg-[#F8F9FA] transition-colors whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Кнопка действия (Обращение / Партнёрство) */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              <a
                href={header.ctaHref || '#appeal-form'}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 shadow-xs transition-all"
              >
                <span>{header.ctaText || 'Обращение / Партнёрство'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Мобильная кнопка меню */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg border border-[#E2E8F0] text-[#1E293B] hover:bg-[#F8F9FA]"
              aria-label="Меню навигации"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Мобильное меню */}
          {mobileMenuOpen && (
            <div className="xl:hidden bg-[#FFFFFF] border-t border-[#E2E8F0] px-4 pt-3 pb-5 space-y-2 shadow-lg">
              {(header.navLinks || DEFAULT_LANDING.header.navLinks).map((link: any, idx: number) => (
                <a
                  key={idx}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-md text-sm font-semibold text-[#1E293B] hover:bg-[#F8F9FA] hover:text-orange-700"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 border-t border-[#E2E8F0]">
                <a
                  href={header.ctaHref || '#appeal-form'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-orange-600 to-amber-500"
                >
                  <span>{header.ctaText || 'Обращение / Партнёрство'}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </header>
      )}

      <main className="flex-1">
        {/* =====================================================================
            4.2. ГЛАВНЫЙ ЭКРАН (HERO SLIDER — 1 В 1 ИЗ ВЕРСИИ ПОРТАЛ)
           ===================================================================== */}
        <div id="hero">
          <HeroSlider />
        </div>

        {/* =====================================================================
            4.3. О ЦЕНТРЕ И МИССИИ (УСТАВНЫЕ ЦЕЛИ И ФИЛОСОФИЯ)
           ===================================================================== */}
        {isBoltStyle ? (
          <section id="about" className="scroll-mt-20 bg-white py-20 sm:py-24 border-b border-slate-200">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              {/* Top 2-Column Block: Left Mission & Checklist + Right Photo with Floating Stat Card */}
              <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
                <div>
                  <div className="max-w-2xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0F7B7A]">
                      О Центре
                    </p>
                    <h2 className="mt-3 text-3xl font-bold text-[#071A33] sm:text-4xl">
                      О Центре и миссии АНО «ЦЗСТ»
                    </h2>
                    <p className="mt-4 text-base text-slate-600 sm:text-lg leading-relaxed">
                      {(org as any).missionRole ||
                        'Платформа системного взаимодействия между государственными институтами, профессиональным тренерским сообществом, экспертами спортивной биомеханики и гражданами Российской Федерации.'}
                    </p>
                  </div>

                  <ul className="mt-8 space-y-4">
                    {[
                      (org as any).ideologyStatement ||
                        'Спорт рассматривается как системная культура развития личности, воспитания дисциплины и национального потенциала, а не досугово-развлекательная услуга.',
                      'Содействие реализации государственных и социально значимых программ в сфере физической культуры, детско-юношеского спорта и внутреннего горнолыжного туризма.',
                      `Полное наименование: ${org.fullName}`,
                    ].map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-3 text-slate-700 text-sm sm:text-base">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0F7B7A]" aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative">
                  <img
                    src={boltAboutImg}
                    alt="АНО ЦЗСТ — развитие спорта и подготовка специалистов"
                    loading="lazy"
                    className="aspect-[4/3] w-full rounded-2xl object-cover shadow-[0_2px_4px_rgba(7,26,51,0.06),0_20px_40px_-16px_rgba(7,26,51,0.25)]"
                  />
                  <div className="bolt-keep-bg absolute -bottom-6 left-6 right-6 rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(7,26,51,0.04),0_8px_24px_-12px_rgba(7,26,51,0.12)] sm:left-auto sm:right-8 sm:w-72">
                    <p className="text-sm text-slate-500">
                      {(org as any).stats?.[0]?.label || 'Аттестованных специалистов'}
                    </p>
                    <p className="mt-1 text-3xl font-bold text-[#071A33]">
                      {(org as any).stats?.[0]?.value || '1 250+'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Middle Timeline Block (1-in-1 with Up timeline in Bolt Qp) */}
              <div className="mt-28 grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
                <div>
                  <h3 className="text-2xl font-bold text-[#071A33] sm:text-3xl">
                    Опорные принципы Устава
                  </h3>
                  <p className="mt-3 text-slate-600">
                    Системные принципы работы Центра в сфере физической культуры, спортивных технологий и туризма.
                  </p>
                </div>
                <ol className="relative space-y-8 border-l-2 border-slate-200 pl-8">
                  {principles.map((item: any, idx: number) => (
                    <li key={item.id || idx} className="relative">
                      <span
                        className="absolute -left-[2.7rem] top-1 h-5 w-5 rounded-full border-2 border-[#0F7B7A] bg-white"
                        aria-hidden="true"
                      />
                      <p className="text-lg font-bold text-[#0B6160]">
                        0{idx + 1} • {item.title}
                      </p>
                      <p className="mt-1 text-slate-700 leading-relaxed">{item.description}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>
        ) : (
          <section id="about" className="py-16 lg:py-20 bg-[#FFFFFF] border-b border-[#E2E8F0]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              {/* Заголовок секции */}
              <div className="max-w-3xl space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-700">
                  <span className="w-6 h-0.5 bg-gradient-to-r from-orange-600 to-amber-500" />
                  <span>Уставные цели и идеология</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                  О Центре и миссии АНО «ЦЗСТ»
                </h2>
                <p className="text-sm sm:text-base text-[#334155] leading-relaxed">
                  {(org as any).missionRole ||
                    'Платформа системного взаимодействия между государственными институтами, профессиональным тренерским сообществом, экспертами спортивной биомеханики и гражданами Российской Федерации.'}
                </p>
              </div>

              {/* Основная сетка: Идеология + 4 опорных принципа */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* Левая карточка: Системность и методология вместо коммерции */}
                <div className="lg:col-span-5 bg-[#F8F9FA] rounded-xl p-6 sm:p-8 border border-[#E2E8F0] flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-orange-600 to-amber-500 text-white flex items-center justify-center shadow-xs">
                      <Scale className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] leading-snug">
                      Системность и методология в основе развития спорта
                    </h3>
                    <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                      {(org as any).ideologyStatement ||
                        'Спорт рассматривается как системная культура развития личности, воспитания дисциплины и национального потенциала, а не досугово-развлекательная услуга.'}
                    </p>
                    <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                      Деятельность Автономной некоммерческой организации «Центр развития зимнего спорта, современных спортивных технологий и туризма» направлена на содействие реализации государственных и социально значимых программ в сфере физической культуры, детско-юношеского спорта и внутреннего горнолыжного туризма.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E2E8F0] space-y-2 text-xs text-[#1E293B]">
                    <div className="font-bold uppercase tracking-wider text-[11px] text-[#334155]">
                      Полное наименование по Уставу:
                    </div>
                    <div className="font-medium leading-relaxed bg-[#FFFFFF] p-3 rounded-lg border border-[#E2E8F0]">
                      {org.fullName}
                    </div>
                  </div>
                </div>

                {/* Правая часть: 4 опорных принципа работы */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {principles.map((item: any, idx: number) => (
                    <article
                      key={item.id || idx}
                      className="bg-[#FFFFFF] rounded-xl p-6 border border-[#E2E8F0] hover:border-slate-300 transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#0F172A] text-amber-400 font-mono text-xs font-bold">
                            0{idx + 1}
                          </span>
                          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                            Принцип Устава
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-[#0F172A] leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] font-semibold text-orange-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                        <span>Методический стандарт АНО «ЦЗСТ»</span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =====================================================================
            4.4. КЛЮЧЕВЫЕ НАПРАВЛЕНИЯ ДЕЯТЕЛЬНОСТИ (GRID 3x2)
           ===================================================================== */}
        {isBoltStyle ? (
          <section id="directions" className="scroll-mt-20 bg-[#F8FAFC] py-20 sm:py-24 border-b border-slate-200">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="max-w-2xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0F7B7A]">
                    Профильная компетенция
                  </p>
                  <h2 className="mt-3 text-3xl font-bold text-[#071A33] sm:text-4xl">
                    Ключевые направления деятельности
                  </h2>
                  <p className="mt-4 text-base text-slate-600 sm:text-lg">
                    Комплексная реализация программ развития зимних видов спорта, инженерно-технического сопровождения и подготовки профильных специалистов.
                  </p>
                </div>
                <a
                  href="#appeal-form"
                  className="inline-flex items-center gap-2 rounded-full bg-[#071A33] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0C2444] shrink-0 self-start md:self-auto"
                >
                  <span>Запросить методическую программу</span>
                  <ArrowRight className="h-4 w-4 text-[#F0CF6A]" />
                </a>
              </div>

              <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {directions.map((dir: any, idx: number) => (
                  <article
                    key={dir.id || idx}
                    className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_1px_2px_rgba(7,26,51,0.04),0_8px_24px_-12px_rgba(7,26,51,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0F7B7A]/40 hover:shadow-[0_2px_4px_rgba(7,26,51,0.06),0_20px_40px_-16px_rgba(7,26,51,0.25)]"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#071A33] text-[#F0CF6A] transition-colors group-hover:bg-[#0B6160] group-hover:text-white">
                          {getDirectionIcon(dir, idx)}
                        </span>
                        <span className="rounded-full bg-[#E9F7F6] px-3 py-1 text-xs font-semibold text-[#0B6160]">
                          Направление 0{idx + 1}
                        </span>
                      </div>

                      <h3 className="mt-6 text-xl font-bold text-[#071A33] leading-snug">
                        {dir.title}
                      </h3>
                      <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                        {dir.description}
                      </p>
                    </div>

                    {Array.isArray(dir.topics) && dir.topics.length > 0 && (
                      <div className="mt-6 pt-4 border-t border-slate-100">
                        <ul className="space-y-2">
                          {dir.topics.map((t: string, tIdx: number) => (
                            <li
                              key={tIdx}
                              className="text-xs sm:text-sm text-slate-600 flex items-center gap-2.5"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-[#0F7B7A] shrink-0" />
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section id="directions" className="py-16 lg:py-20 bg-[#F8F9FA] border-b border-[#E2E8F0]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E2E8F0] pb-6">
                <div className="space-y-2 max-w-3xl">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-700">
                    <span className="w-6 h-0.5 bg-gradient-to-r from-orange-600 to-amber-500" />
                    <span>Профильная компетенция</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                    Ключевые направления деятельности
                  </h2>
                  <p className="text-sm text-[#334155]">
                    Комплексная реализация программ развития зимних видов спорта, инженерно-технического сопровождения и подготовки профильных специалистов
                  </p>
                </div>
                <a
                  href="#appeal-form"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#FFFFFF] border border-[#CBD5E1] text-xs font-bold text-[#0F172A] hover:border-orange-500 transition-colors shrink-0 self-start md:self-auto"
                >
                  <span>Запросить методическую программу</span>
                  <ArrowRight className="w-3.5 h-3.5 text-orange-600" />
                </a>
              </div>

              {/* Сетка 3x2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {directions.map((dir: any, idx: number) => (
                  <article
                    key={dir.id || idx}
                    className="bg-[#FFFFFF] rounded-xl p-6 border border-[#E2E8F0] hover:border-orange-500/50 transition-all flex flex-col justify-between shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-600/10 to-amber-500/15 border border-orange-500/20 text-orange-700 flex items-center justify-center">
                          {getDirectionIcon(dir, idx)}
                        </div>
                        <span className="font-mono text-xs font-bold text-slate-400">
                          0{idx + 1}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-[#0F172A] leading-snug">
                        {dir.title}
                      </h3>

                      <p className="mt-2.5 text-xs sm:text-sm text-[#334155] leading-relaxed">
                        {dir.description}
                      </p>
                    </div>

                    {Array.isArray(dir.topics) && dir.topics.length > 0 && (
                      <div className="mt-5 pt-4 border-t border-[#E2E8F0]">
                        <ul className="space-y-1.5">
                          {dir.topics.map((t: string, tIdx: number) => (
                            <li
                              key={tIdx}
                              className="text-xs text-[#334155] flex items-center gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 shrink-0" />
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* =====================================================================
            РАЗДЕЛ 2. МЕТОДОЛОГИЯ, ТЕХНОЛОГИИ И ФОРМУЛА ЭФФЕКТИВНОСТИ
           ===================================================================== */}
        {isBoltStyle ? (
          <section id="methodology" className="scroll-mt-20 bg-white py-20 sm:py-24 border-b border-slate-200">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-16">
              {/* Dark Navy Formula Banner */}
              <div className="rounded-2xl bg-[#071A33] text-white p-8 sm:p-10 shadow-[0_2px_4px_rgba(7,26,51,0.06),0_20px_40px_-16px_rgba(7,26,51,0.25)] relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-5 mb-6">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#F0CF6A]">
                    <Sparkles className="w-4 h-4" />
                    <span>{ideology.formulaBadge || 'Формула системной эффективности АНО «ЦЗСТ»'}</span>
                  </div>
                  <span className="text-xs text-[#B3C9E0]">
                    Методический стандарт подготовки
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
                  {(ideology.formulaItems || DEFAULT_LANDING.ideology.formulaItems).map(
                    (factor: string, idx: number, arr: string[]) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="bolt-keep-bg flex-1 rounded-xl bg-white/10 border border-white/15 p-4 backdrop-blur-xs">
                          <div className="text-xs font-semibold text-[#F0CF6A] mb-1">
                            0{idx + 1}
                          </div>
                          <div className="text-base font-bold text-white leading-snug">
                            {factor}
                          </div>
                        </div>
                        {idx < arr.length - 1 && (
                          <span className="hidden lg:inline-block text-xl font-bold text-[#E8B93E] select-none">
                            ×
                          </span>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* 4 Pillars styled like Bolt cards */}
              <div>
                <div className="max-w-2xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0F7B7A]">
                    Научно-практическая платформа
                  </p>
                  <h2 className="mt-3 text-3xl font-bold text-[#071A33] sm:text-4xl">
                    {ideology.methodologyTitle ||
                      'Методология, стандарты кадров и спортивные технологии'}
                  </h2>
                  <p className="mt-4 text-base text-slate-600 sm:text-lg leading-relaxed">
                    {ideology.methodologyLead}
                  </p>
                </div>

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {(ideology.pillars || DEFAULT_LANDING.ideology.pillars).map(
                    (pillar: any, idx: number) => (
                      <article
                        key={idx}
                        className="group rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#0F7B7A]/40 hover:shadow-[0_1px_2px_rgba(7,26,51,0.04),0_8px_24px_-12px_rgba(7,26,51,0.12)]"
                      >
                        <div
                          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#071A33] text-lg font-bold text-[#F0CF6A]"
                          aria-hidden="true"
                        >
                          {pillar.code || `0${idx + 1}`}
                        </div>
                        <h3 className="mt-5 text-lg font-bold text-[#071A33] leading-snug">
                          {pillar.title}
                        </h3>
                        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                          {pillar.desc}
                        </p>
                      </article>
                    )
                  )}
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section id="methodology" className="py-16 lg:py-20 bg-[#FFFFFF] border-b border-[#E2E8F0]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              {/* Контрастная плашка Формулы эффективности (#0F172A) */}
              <div className="rounded-2xl bg-[#0F172A] text-white p-6 sm:p-10 border border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-400" />
                <div className="space-y-6 relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                    <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
                      <Sparkles className="w-4 h-4" />
                      <span>{ideology.formulaBadge || 'Формула системной эффективности АНО «ЦЗСТ»'}</span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">
                      ГОСТ-ориентированный методический стандарт
                    </span>
                  </div>

                  {/* Формула */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
                    {(ideology.formulaItems || DEFAULT_LANDING.ideology.formulaItems).map(
                      (factor: string, idx: number, arr: string[]) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="flex-1 rounded-xl bg-slate-900 border border-slate-800 p-4">
                            <div className="text-[11px] font-mono text-amber-400 mb-1">
                              Компонент 0{idx + 1}
                            </div>
                            <div className="text-sm sm:text-base font-bold text-white leading-snug">
                              {factor}
                            </div>
                          </div>
                          {idx < arr.length - 1 && (
                            <span className="hidden lg:inline-block text-xl font-black text-amber-500 select-none">
                              ×
                            </span>
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Стандарты, кадры и биомеханика */}
              <div className="space-y-8">
                <div className="max-w-3xl space-y-2">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-700">
                    <span className="w-6 h-0.5 bg-gradient-to-r from-orange-600 to-amber-500" />
                    <span>Научно-практическая платформа</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                    {ideology.methodologyTitle ||
                      'Методология, стандарты кадров и спортивные технологии'}
                  </h2>
                  <p className="text-sm sm:text-base text-[#334155] leading-relaxed">
                    {ideology.methodologyLead}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(ideology.pillars || DEFAULT_LANDING.ideology.pillars).map(
                    (pillar: any, idx: number) => (
                      <div
                        key={idx}
                        className="rounded-xl bg-[#F8F9FA] p-6 border border-[#E2E8F0] flex items-start gap-4"
                      >
                        <div className="w-10 h-10 rounded-lg bg-[#0F172A] text-amber-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                          {pillar.code || `0${idx + 1}`}
                        </div>
                        <div className="space-y-1.5">
                          <h3 className="text-base font-bold text-[#0F172A]">{pillar.title}</h3>
                          <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                            {pillar.desc}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =====================================================================
            4.5. РАЗДЕЛ ВЗАИМОДЕЙСТВИЯ И ГОСПОДДЕРЖКИ (ПАРТНЁРАМ И ВЕДОМСТВАМ)
           ===================================================================== */}
        {isBoltStyle ? (
          <>
            {/* Dark Navy Partnership / Gov-Support Section (1-in-1 with Bolt a0) */}
            <section id="gov-support" className="scroll-mt-20 bg-[#071A33] py-20 sm:py-24 text-white">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
                  <div className="lg:col-span-5">
                    <div className="max-w-2xl">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F0CF6A]">
                        {ideology.govBadge || 'Партнёрам, курортам и профильным ведомствам'}
                      </p>
                      <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                        {ideology.govTitle || 'Взаимодействие и государственная поддержка'}
                      </h2>
                      <p className="mt-4 text-base text-[#D9E4F0] sm:text-lg leading-relaxed">
                        {ideology.govSubtitle ||
                          'Экспертно-методическая и проектная работа с региональными министерствами спорта, спортивными федерациями, горнолыжными курортами и грантовых операторами.'}
                      </p>
                    </div>

                    <img
                      src={boltPartnerImg}
                      alt="Сотрудничество и партнёрство АНО ЦЗСТ"
                      loading="lazy"
                      className="mt-10 h-56 w-full rounded-2xl object-cover opacity-85 shadow-lg"
                    />
                  </div>

                  <div className="lg:col-span-7 grid gap-6">
                    {(ideology.govBlocks || DEFAULT_LANDING.ideology.govBlocks).map(
                      (block: any, idx: number) => (
                        <article
                          key={idx}
                          className="bolt-card-dark rounded-2xl border border-white/15 bg-white/5 p-6 sm:p-7 backdrop-blur-xs"
                        >
                          <div className="flex items-start gap-4">
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[#F0CF6A]">
                              <Building2 className="h-5 w-5" />
                            </span>
                            <div className="space-y-2">
                              <span className="text-xs font-semibold uppercase tracking-wider text-[#F0CF6A]">
                                Контур взаимодействия 0{idx + 1}
                              </span>
                              <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                                {block.title}
                              </h3>
                              <p className="text-sm text-[#B3C9E0] leading-relaxed">
                                {block.desc}
                              </p>
                            </div>
                          </div>

                          {Array.isArray(block.bullets) && block.bullets.length > 0 && (
                            <ul className="mt-5 pt-4 border-t border-white/10 grid gap-2 sm:grid-cols-1">
                              {block.bullets.map((b: string, bIdx: number) => (
                                <li
                                  key={bIdx}
                                  className="flex items-start gap-2.5 text-xs sm:text-sm text-[#D9E4F0]"
                                >
                                  <CheckCircle2 className="w-4 h-4 text-[#F0CF6A] shrink-0 mt-0.5" />
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </article>
                      )
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Documents Section in Bolt Style (1-in-1 with Bolt Xp) */}
            {settings.showDocumentsOnLanding !== false && documents.length > 0 && (
              <section id="documents" className="scroll-mt-20 bg-[#F8FAFC] py-20 sm:py-24 border-b border-slate-200">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                  <div className="max-w-2xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0F7B7A]">
                      Документы и отчёты
                    </p>
                    <h2 className="mt-3 text-3xl font-bold text-[#071A33] sm:text-4xl">
                      Открытость в каждой детали
                    </h2>
                    <p className="mt-4 text-base text-slate-600 sm:text-lg">
                      Уставные документы, регламенты и внутренние стандарты АНО «ЦЗСТ». Все документы доступны для ознакомления.
                    </p>
                  </div>

                  {/* Category Filter Pills */}
                  {(() => {
                    const cats = [
                      'Все',
                      ...Array.from(
                        new Set(documents.map((d: any) => d.category).filter(Boolean))
                      ),
                    ] as string[];
                    const filteredDocs =
                      docCategoryFilter === 'Все'
                        ? documents
                        : documents.filter((d: any) => d.category === docCategoryFilter);

                    return (
                      <>
                        <div
                          role="tablist"
                          aria-label="Категории документов"
                          className="mt-10 flex flex-wrap gap-2"
                        >
                          {cats.map((cat) => {
                            const active = cat === docCategoryFilter;
                            return (
                              <button
                                key={cat}
                                type="button"
                                role="tab"
                                aria-selected={active}
                                onClick={() => setDocCategoryFilter(cat)}
                                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                                  active
                                    ? 'bg-[#071A33] text-white'
                                    : 'bg-white text-[#13325A] ring-1 ring-inset ring-slate-200 hover:bg-[#EEF3F9]'
                                }`}
                              >
                                {cat}
                              </button>
                            );
                          })}
                        </div>

                        <ul className="mt-8 grid gap-4 md:grid-cols-2">
                          {filteredDocs.slice(0, 6).map((doc: any) => (
                            <li
                              key={doc.id}
                              className="bolt-keep-bg flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(7,26,51,0.04),0_8px_24px_-12px_rgba(7,26,51,0.12)] transition-all duration-300 hover:border-[#0F7B7A]/40 hover:shadow-[0_2px_4px_rgba(7,26,51,0.06),0_20px_40px_-16px_rgba(7,26,51,0.25)]"
                            >
                              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#EEF3F9] text-[#13325A]">
                                <FileText className="h-6 w-6" aria-hidden="true" />
                              </span>
                              <div className="min-w-0 flex-1">
                                <h3 className="font-bold text-[#071A33] text-sm sm:text-base">
                                  {doc.title}
                                </h3>
                                <p className="mt-1 flex flex-wrap items-center gap-x-3 text-xs sm:text-sm text-slate-500">
                                  <span>{doc.category || 'Уставный документ'}</span>
                                  <span aria-hidden="true">•</span>
                                  <span>{doc.date}</span>
                                </p>
                              </div>
                              {doc.fileUrl ? (
                                <a
                                  href={resolveMediaUrl(doc.fileUrl)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 hover:bg-[#EEF3F9] px-3 py-1.5 text-xs font-semibold text-[#071A33] transition-colors shrink-0"
                                >
                                  <span>PDF</span>
                                  <Download className="w-3.5 h-3.5" />
                                </a>
                              ) : (
                                <span className="hidden rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 sm:inline-flex">
                                  PDF
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </>
                    );
                  })()}
                </div>
              </section>
            )}

            {/* Partners Section in Bolt Style (1-in-1 with Bolt l0) */}
            {settings.showPartnersOnLanding !== false && partners.length > 0 && (
              <section id="partners" className="scroll-mt-20 bg-white py-20 sm:py-24 border-b border-slate-200">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                  <div className="max-w-2xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0F7B7A]">
                      Партнёры
                    </p>
                    <h2 className="mt-3 text-3xl font-bold text-[#071A33] sm:text-4xl">
                      Министерства, федерации и спортивные комплексы
                    </h2>
                    <p className="mt-4 text-base text-slate-600 sm:text-lg">
                      Межведомственное и отраслевое взаимодействие с профильными федерациями, горнолыжными курортами и стратегическими партнёрами.
                    </p>
                  </div>

                  <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {partners.map((p: any, idx: number) => (
                      <div
                        key={p.id || idx}
                        className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5 flex flex-col items-center justify-center text-center gap-2.5 transition-all hover:-translate-y-0.5 hover:border-[#0F7B7A]/40 hover:bg-white hover:shadow-[0_1px_2px_rgba(7,26,51,0.04),0_8px_24px_-12px_rgba(7,26,51,0.12)]"
                      >
                        {p.logo && (
                          <div className="h-10 flex items-center justify-center">
                            <img
                              src={resolveMediaUrl(p.logo)}
                              alt={p.name}
                              className="max-h-8 max-w-[110px] object-contain"
                            />
                          </div>
                        )}
                        <div>
                          <div className="text-xs font-bold text-[#071A33] truncate max-w-[140px]">
                            {p.name}
                          </div>
                          <div className="text-[11px] text-slate-500 truncate max-w-[140px]">
                            {p.category}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        ) : (
          <section id="gov-support" className="py-16 lg:py-20 bg-[#F8F9FA] border-b border-[#E2E8F0]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              <div className="max-w-3xl space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-700">
                  <span className="w-6 h-0.5 bg-gradient-to-r from-orange-600 to-amber-500" />
                  <span>{ideology.govBadge || 'Партнёрам, курортам и профильным ведомствам'}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                  {ideology.govTitle || 'Взаимодействие и государственная поддержка'}
                </h2>
                <p className="text-sm sm:text-base text-[#334155] leading-relaxed">
                  {ideology.govSubtitle ||
                    'Блок для региональных министерств спорта, спортивных федераций, горнолыжных курортов и грантовых операторов.'}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {(ideology.govBlocks || DEFAULT_LANDING.ideology.govBlocks).map(
                  (block: any, idx: number) => (
                    <article
                      key={idx}
                      className="bg-[#FFFFFF] rounded-xl p-6 border border-[#E2E8F0] flex flex-col justify-between shadow-2xs"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded text-[11px] font-mono font-bold bg-[#0F172A] text-amber-400">
                            Контур взаимодействия 0{idx + 1}
                          </span>
                          <Building2 className="w-4 h-4 text-slate-400" />
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-[#0F172A] leading-snug pt-1">
                          {block.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                          {block.desc}
                        </p>
                      </div>

                      {Array.isArray(block.bullets) && block.bullets.length > 0 && (
                        <div className="mt-6 pt-4 border-t border-[#E2E8F0] space-y-2">
                          {block.bullets.map((b: string, bIdx: number) => (
                            <div
                              key={bIdx}
                              className="flex items-start gap-2 text-xs text-[#1E293B]"
                            >
                              <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                              <span>{b}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </article>
                  )
                )}
              </div>

              {/* Перекрестный блок: Официальные документы (если включен) */}
              {settings.showDocumentsOnLanding !== false && documents.length > 0 && (
                <div id="documents" className="pt-6">
                  <div className="bg-[#FFFFFF] rounded-xl border border-[#E2E8F0] p-6 sm:p-8 space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2E8F0] pb-4">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-orange-700">
                          Нормативно-правовая и уставная документация
                        </span>
                        <h3 className="text-lg font-bold text-[#0F172A] mt-0.5">
                          Учредительные документы, регламенты и стандарты АНО «ЦЗСТ»
                        </h3>
                      </div>
                      <span className="text-xs font-mono text-[#334155]">
                        Официальный депозитарий
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {documents.slice(0, 4).map((doc: any) => (
                        <div
                          key={doc.id}
                          className="p-4 rounded-lg border border-[#E2E8F0] bg-[#F8F9FA] flex items-start justify-between gap-3"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded bg-[#0F172A] text-amber-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                              PDF
                            </div>
                            <div>
                              <h4 className="text-xs sm:text-sm font-bold text-[#0F172A] leading-snug">
                                {doc.title}
                              </h4>
                              <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-[#334155]">
                                <span className="font-mono">
                                  {doc.number || doc.documentNumber || 'Уставный документ'}
                                </span>
                                <span>•</span>
                                <span>{doc.date}</span>
                                {doc.fileSize && (
                                  <>
                                    <span>•</span>
                                    <span>{doc.fileSize}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          {doc.fileUrl && (
                            <a
                              href={resolveMediaUrl(doc.fileUrl)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded border border-[#E2E8F0] bg-[#FFFFFF] text-[#1E293B] hover:text-orange-700 shrink-0"
                              title="Скачать документ"
                            >
                              <Download className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Перекрестный блок: Партнёры и спонсоры (если включен) */}
              {settings.showPartnersOnLanding !== false && partners.length > 0 && (
                <div id="partners" className="pt-2">
                  <div className="bg-[#FFFFFF] rounded-xl border border-[#E2E8F0] p-6 sm:p-8 space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2E8F0] pb-4">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-orange-700">
                          Межведомственное и отраслевое взаимодействие
                        </span>
                        <h3 className="text-lg font-bold text-[#0F172A] mt-0.5">
                          Партнёры, спортивные комплексы и профильные организации
                        </h3>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                      {partners.map((p: any, idx: number) => (
                        <div
                          key={p.id || idx}
                          className="p-3 rounded-lg border border-[#E2E8F0] bg-[#F8F9FA] flex flex-col items-center justify-center text-center gap-2"
                        >
                          {p.logo && (
                            <div className="h-10 flex items-center justify-center">
                              <img
                                src={resolveMediaUrl(p.logo)}
                                alt={p.name}
                                className="max-h-8 max-w-[110px] object-contain"
                              />
                            </div>
                          )}
                          <div>
                            <div className="text-xs font-bold text-[#0F172A] truncate max-w-[140px]">
                              {p.name}
                            </div>
                            <div className="text-[10px] text-[#334155] truncate max-w-[140px]">
                              {p.category}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* =====================================================================
            4.6. ФОРМА ОБРАТНОЙ СВЯЗИ (ОФИЦИАЛЬНОЕ ОБРАЩЕНИЕ) И КОНТАКТЫ
           ===================================================================== */}
        {isBoltStyle ? (
          <section id="appeal-form" className="scroll-mt-20 bg-[#F8FAFC] py-20 sm:py-24">
            <div id="contacts" className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0F7B7A]">
                  Контакты и обращения
                </p>
                <h2 className="mt-3 text-3xl font-bold text-[#071A33] sm:text-4xl">
                  Свяжитесь с нами
                </h2>
                <p className="mt-4 text-base text-slate-600 sm:text-lg">
                  Ответим на вопросы о программах, уставных документах, аттестации и формах межведомственного сотрудничества.
                </p>
              </div>

              <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16 items-start">
                {/* Left Column: Contact Cards + Bolt SVG Map + Requisites */}
                <div className="space-y-6">
                  <ul className="space-y-4">
                    <li className="bolt-keep-bg flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(7,26,51,0.04),0_8px_24px_-12px_rgba(7,26,51,0.12)]">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#E9F7F6] text-[#0B6160]">
                        <MapPin className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-sm text-slate-500">Адрес</p>
                        <p className="mt-1 font-semibold text-[#071A33]">
                          {org.legalAddress ||
                            'РФ, Московская обл., Красногорск г.о., п. Архангельское'}
                        </p>
                      </div>
                    </li>

                    <li className="bolt-keep-bg flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(7,26,51,0.04),0_8px_24px_-12px_rgba(7,26,51,0.12)]">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#E9F7F6] text-[#0B6160]">
                        <Phone className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <a
                        href={`tel:${(org.phone || '+7 (495) 789-34-20').replace(/[^0-9+]/g, '')}`}
                        className="transition-colors hover:text-[#0B6160]"
                      >
                        <p className="text-sm text-slate-500">Телефон</p>
                        <p className="mt-1 font-semibold text-[#071A33]">
                          {org.phone || '+7 (495) 789-34-20'}
                        </p>
                      </a>
                    </li>

                    <li className="bolt-keep-bg flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(7,26,51,0.04),0_8px_24px_-12px_rgba(7,26,51,0.12)]">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#E9F7F6] text-[#0B6160]">
                        <Mail className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <a
                        href={`mailto:${org.receptionEmail || 'info@ano-czst.ru'}`}
                        className="transition-colors hover:text-[#0B6160]"
                      >
                        <p className="text-sm text-slate-500">Почта</p>
                        <p className="mt-1 font-semibold text-[#071A33]">
                          {org.receptionEmail || 'info@ano-czst.ru'}
                        </p>
                      </a>
                    </li>

                    <li className="bolt-keep-bg flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(7,26,51,0.04),0_8px_24px_-12px_rgba(7,26,51,0.12)]">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#E9F7F6] text-[#0B6160]">
                        <Clock className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-sm text-slate-500">Часы работы</p>
                        <p className="mt-1 font-semibold text-[#071A33]">
                          {org.workHours || 'Пн–Пт: 09:00 — 18:00 (МСК)'}
                        </p>
                      </div>
                    </li>
                  </ul>

                  {/* Exact 1-in-1 Bolt SVG Map Illustration (from c0 in bolt_app.js) */}
                  <div
                    role="img"
                    aria-label={`Схема расположения: ${org.legalAddress || 'РФ, Московская обл., Красногорск г.о., п. Архангельское'}`}
                    className="relative flex h-64 items-end overflow-hidden rounded-2xl border border-slate-200 bg-[#EEF3F9] p-6"
                  >
                    <svg
                      className="absolute inset-0 h-full w-full text-[#B3C9E0]"
                      aria-hidden="true"
                    >
                      <defs>
                        <pattern
                          id="map-grid"
                          width="40"
                          height="40"
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            d="M 40 0 L 0 0 0 40"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                          />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#map-grid)" />
                      <path
                        d="M-20 140 Q 160 60 320 130 T 700 110"
                        fill="none"
                        stroke="#b3c9e0"
                        strokeWidth="14"
                      />
                      <path
                        d="M 120 -10 L 180 300"
                        fill="none"
                        stroke="#d9e4f0"
                        strokeWidth="10"
                      />
                    </svg>
                    <div className="bolt-keep-bg relative flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-[0_1px_2px_rgba(7,26,51,0.04),0_8px_24px_-12px_rgba(7,26,51,0.12)]">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#071A33] text-[#F0CF6A]">
                        <MapPin className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="text-sm font-semibold text-[#071A33]">
                        {org.legalAddress ||
                          'РФ, Московская обл., Красногорск г.о., п. Архангельское'}
                      </span>
                    </div>
                  </div>

                  {/* Requisites Compact Card */}
                  <div className="bolt-keep-bg rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(7,26,51,0.04),0_8px_24px_-12px_rgba(7,26,51,0.12)] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#0B6160]">
                        Уставные реквизиты АНО «ЦЗСТ»
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyRequisites}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#EEF3F9] hover:bg-[#D9E4F0] px-3 py-1 text-xs font-semibold text-[#071A33] transition-colors"
                      >
                        {copiedRequisites ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#0F7B7A]" />
                            <span>Скопировано</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-[#13325A]" />
                            <span>Скопировать</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-slate-500 block">ОГРН:</span>
                        <span className="font-mono font-bold text-[#071A33]">{org.ogrn}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">ИНН / КПП:</span>
                        <span className="font-mono font-bold text-[#071A33]">
                          {org.inn} / {org.kpp}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Appeal Form in Bolt Style (1-in-1 with ih in bolt_app.js) */}
                <div>
                  <h3 className="mb-6 text-xl font-bold text-[#071A33]">
                    Форма официального обращения
                  </h3>
                  {formSubmitted ? (
                    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_1px_2px_rgba(7,26,51,0.04),0_8px_24px_-12px_rgba(7,26,51,0.12)] text-center space-y-4">
                      <div className="w-12 h-12 rounded-full bg-[#E9F7F6] text-[#0F7B7A] flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs font-mono uppercase tracking-wider text-slate-500">
                          Регистрационный номер: {ticketNumber}
                        </span>
                        <h4 className="text-lg font-bold text-[#071A33]">
                          Ваше обращение официально зарегистрировано
                        </h4>
                        <p className="text-sm text-slate-600 max-w-md mx-auto">
                          Специалисты профильного департамента АНО «ЦЗСТ» рассмотрят ваш запрос и направят ответ по указанным контактным данным.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setFormSubmitted(false);
                          setFormData({
                            name: '',
                            email: '',
                            phone: '',
                            category: 'Сотрудничество и партнерство',
                            message: '',
                            consent152FZ: false,
                          });
                        }}
                        className="rounded-full bg-[#071A33] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0C2444] transition-colors"
                      >
                        Направить новое обращение
                      </button>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleAppealSubmit}
                      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(7,26,51,0.04),0_8px_24px_-12px_rgba(7,26,51,0.12)] sm:p-8 space-y-5"
                    >
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label className="block text-sm font-semibold text-[#0C2444] mb-2">
                            ФИО / Организация <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Иванов И.И. / Организация"
                            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-[#071A33] placeholder:text-slate-400 focus:border-[#0F7B7A] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-[#0C2444] mb-2">
                            Электронная почта <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="name@example.ru"
                            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-[#071A33] placeholder:text-slate-400 focus:border-[#0F7B7A] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-[#0C2444] mb-2">
                            Телефон <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+7 (999) 000-00-00"
                            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-[#071A33] placeholder:text-slate-400 focus:border-[#0F7B7A] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-[#0C2444] mb-2">
                            Категория запроса <span className="text-red-600">*</span>
                          </label>
                          <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-[#071A33] focus:border-[#0F7B7A] focus:outline-none"
                          >
                            <option value="Сотрудничество и партнерство">
                              Сотрудничество и партнерство
                            </option>
                            <option value="Участие в программах">Участие в программах</option>
                            <option value="Экспертно-методический запрос">
                              Экспертно-методический запрос
                            </option>
                            <option value="Иное">Иное</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-[#0C2444] mb-2">
                          Ваш вопрос или обращение <span className="text-red-600">*</span>
                        </label>
                        <textarea
                          rows={5}
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Опишите суть предложения, тему экспертного запроса или формат участия в программах Центра"
                          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-[#071A33] placeholder:text-slate-400 focus:border-[#0F7B7A] focus:outline-none resize-y"
                        />
                      </div>

                      <div>
                        <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 leading-relaxed">
                          <input
                            type="checkbox"
                            required
                            checked={formData.consent152FZ}
                            onChange={(e) =>
                              setFormData({ ...formData, consent152FZ: e.target.checked })
                            }
                            className="mt-0.5 rounded border-slate-300 accent-[#0F7B7A]"
                          />
                          <span>
                            Даю согласие на обработку персональных данных в соответствии с Федеральным законом РФ от 27.07.2006 № 152-ФЗ «О персональных данных» и{' '}
                            <button
                              type="button"
                              onClick={() => setPrivacyModalOpen(true)}
                              className="underline font-semibold text-[#071A33] hover:text-[#0F7B7A]"
                            >
                              Политикой обработки персональных данных АНО «ЦЗСТ»
                            </button>
                            .
                          </span>
                        </label>
                      </div>

                      <div className="pt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs text-slate-500">
                          Поля, отмеченные звёздочкой, обязательны для заполнения.
                        </p>
                        <button
                          type="submit"
                          className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#071A33] px-7 py-3.5 text-base font-semibold text-white shadow-md transition-all hover:bg-[#0C2444]"
                        >
                          <span>Отправить обращение</span>
                          <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section id="appeal-form" className="py-16 lg:py-20 bg-[#FFFFFF]">
            <div id="contacts" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Левая колонка (7 колонок): Форма официального обращения граждан и организаций */}
                <div className="lg:col-span-7 bg-[#F8F9FA] rounded-xl p-6 sm:p-8 border border-[#E2E8F0]">
                  <div className="border-b border-[#E2E8F0] pb-4 mb-6">
                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-700">
                      <span className="w-6 h-0.5 bg-gradient-to-r from-orange-600 to-amber-500" />
                      <span>Электронная приёмная АНО «ЦЗСТ»</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] mt-1">
                      Официальное обращение / Проектное предложение
                    </h2>
                    <p className="text-xs sm:text-sm text-[#334155] mt-1">
                      Форма направления запросов для граждан, спортивных организаций, курортов и профильных ведомств
                    </p>
                  </div>

                  {formSubmitted ? (
                    <div className="bg-[#FFFFFF] rounded-xl p-8 border border-[#E2E8F0] text-center space-y-4">
                      <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs font-mono uppercase tracking-wider text-slate-500">
                          Регистрационный номер входящего обращения: {ticketNumber}
                        </span>
                        <h3 className="text-lg font-bold text-[#0F172A]">
                          Ваше обращение официально зарегистрировано
                        </h3>
                        <p className="text-xs sm:text-sm text-[#334155] max-w-md mx-auto leading-relaxed">
                          Специалисты профильного департамента АНО «ЦЗСТ» рассмотрят ваш запрос и направят ответ по указанным контактным данным.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setFormSubmitted(false);
                          setFormData({
                            name: '',
                            email: '',
                            phone: '',
                            category: 'Сотрудничество и партнерство',
                            message: '',
                            consent152FZ: false,
                          });
                        }}
                        className="px-5 py-2.5 rounded-lg bg-[#0F172A] text-white text-xs font-bold hover:bg-slate-800 transition-colors"
                      >
                        Направить новое обращение
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleAppealSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
                          ФИО заявителя / Наименование организации <span className="text-orange-600">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Например: Иванов И.И. / Министерство физической культуры и спорта"
                          className="w-full px-3.5 py-2.5 text-sm bg-[#FFFFFF] border border-[#CBD5E1] rounded-lg text-[#0F172A] focus:outline-none focus:border-orange-600"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
                            Электронная почта (Email) <span className="text-orange-600">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="official@organization.ru"
                            className="w-full px-3.5 py-2.5 text-sm bg-[#FFFFFF] border border-[#CBD5E1] rounded-lg text-[#0F172A] focus:outline-none focus:border-orange-600"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
                            Контактный телефон <span className="text-orange-600">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+7 (___) ___-__-__"
                            className="w-full px-3.5 py-2.5 text-sm bg-[#FFFFFF] border border-[#CBD5E1] rounded-lg text-[#0F172A] focus:outline-none focus:border-orange-600"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
                          Категория запроса <span className="text-orange-600">*</span>
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-sm bg-[#FFFFFF] border border-[#CBD5E1] rounded-lg text-[#0F172A] focus:outline-none focus:border-orange-600"
                        >
                          <option value="Сотрудничество и партнерство">
                            Сотрудничество и партнерство
                          </option>
                          <option value="Участие в программах">Участие в программах</option>
                          <option value="Экспертно-методический запрос">
                            Экспертно-методический запрос
                          </option>
                          <option value="Иное">Иное</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
                          Текст официального обращения <span className="text-orange-600">*</span>
                        </label>
                        <textarea
                          rows={4}
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Изложите суть предложения, тему экспертного запроса или формат участия в программах Центра..."
                          className="w-full px-3.5 py-2.5 text-sm bg-[#FFFFFF] border border-[#CBD5E1] rounded-lg text-[#0F172A] focus:outline-none focus:border-orange-600"
                        />
                      </div>

                      {/* Чекбокс 152-ФЗ РФ */}
                      <div className="pt-1">
                        <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#334155] leading-relaxed">
                          <input
                            type="checkbox"
                            required
                            checked={formData.consent152FZ}
                            onChange={(e) =>
                              setFormData({ ...formData, consent152FZ: e.target.checked })
                            }
                            className="mt-0.5 rounded border-slate-300 accent-orange-600"
                          />
                          <span>
                            Даю согласие на обработку персональных данных в соответствии с Федеральным законом РФ от 27.07.2006 № 152-ФЗ «О персональных данных» и{' '}
                            <button
                              type="button"
                              onClick={() => setPrivacyModalOpen(true)}
                              className="underline font-semibold text-[#0F172A] hover:text-orange-700"
                            >
                              Политикой обработки персональных данных АНО «ЦЗСТ»
                            </button>
                            .
                          </span>
                        </label>
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 shadow-sm transition-all"
                        >
                          <Send className="w-4 h-4" />
                          <span>Отправить официальное обращение</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                {/* Правая колонка (5 колонок): Контакты и официальные реквизиты */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="bg-[#FFFFFF] rounded-xl p-6 sm:p-7 border border-[#E2E8F0] space-y-5">
                    <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-orange-700">
                          Официальные сведения
                        </span>
                        <h3 className="text-lg font-bold text-[#0F172A]">
                          Контакты и реквизиты АНО «ЦЗСТ»
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyRequisites}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F8F9FA] hover:bg-slate-100 border border-[#E2E8F0] text-xs font-semibold text-[#1E293B] transition-colors"
                      >
                        {copiedRequisites ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Скопировано</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-500" />
                            <span>Реквизиты</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="space-y-3.5 text-xs sm:text-sm">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-orange-600 shrink-0 mt-1" />
                        <div>
                          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            Юридический адрес и местонахождение
                          </div>
                          <div className="font-semibold text-[#0F172A] mt-0.5">
                            {org.legalAddress ||
                              'РФ, Московская обл., Красногорск г.о., п. Архангельское'}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Phone className="w-4 h-4 text-orange-600 shrink-0 mt-1" />
                        <div>
                          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            Телефон приёмной
                          </div>
                          <a
                            href={`tel:${(org.phone || '+7 (495) 789-34-20').replace(/[^0-9+]/g, '')}`}
                            className="font-semibold text-[#0F172A] hover:text-orange-700 transition-colors mt-0.5 block"
                          >
                            {org.phone || '+7 (495) 789-34-20'}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Mail className="w-4 h-4 text-orange-600 shrink-0 mt-1" />
                        <div>
                          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            Электронная почта для официальной корреспонденции
                          </div>
                          <a
                            href={`mailto:${org.receptionEmail || 'info@ano-czst.ru'}`}
                            className="font-mono font-semibold text-[#0F172A] hover:text-orange-700 transition-colors mt-0.5 block"
                          >
                            {org.receptionEmail || 'info@ano-czst.ru'}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="w-4 h-4 text-orange-600 shrink-0 mt-1" />
                        <div>
                          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            Режим работы приёмной
                          </div>
                          <div className="text-[#1E293B] mt-0.5">
                            {org.workHours || 'Пн–Пт: 09:00 — 18:00 (МСК)'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Учётные реквизиты */}
                    <div className="pt-4 border-t border-[#E2E8F0] grid grid-cols-2 gap-3 text-xs bg-[#F8F9FA] p-4 rounded-lg">
                      <div>
                        <span className="text-slate-400 block text-[11px]">ОГРН:</span>
                        <span className="font-mono font-bold text-[#0F172A]">{org.ogrn}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">ИНН / КПП:</span>
                        <span className="font-mono font-bold text-[#0F172A]">
                          {org.inn} / {org.kpp}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">ОКПО:</span>
                        <span className="font-mono font-bold text-[#0F172A]">{org.okpo}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Краткое наименование:</span>
                        <span className="font-bold text-[#0F172A]">АНО «ЦЗСТ» (ANO «CWST»)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* =====================================================================
          4.7. ПОДВАЛ (FOOTER / РЕКВИЗИТЫ) — Глубокий графит (#0F172A)
         ===================================================================== */}
      <footer className="bg-[#0F172A] text-slate-300 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
            {/* Колонка 1 (6 кол.): Официальное наименование и статус */}
            <div className="md:col-span-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-700 p-2 flex items-center justify-center shrink-0">
                  <img
                    src="/logo_sign.png"
                    alt="АНО «ЦЗСТ»"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="text-base font-extrabold text-white tracking-wide">
                    АНО «ЦЗСТ» <span className="text-slate-400 font-mono text-xs font-normal">(ANO «CWST»)</span>
                  </div>
                  <div className="text-[11px] text-amber-400 font-mono uppercase tracking-wider">
                    Автономная некоммерческая организация
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                Автономная некоммерческая организация «ЦЕНТР РАЗВИТИЯ ЗИМНЕГО СПОРТА, СОВРЕМЕННЫХ СПОРТИВНЫХ ТЕХНОЛОГИЙ И ТУРИЗМА»
              </p>

              <div className="text-xs text-slate-400 space-y-1 font-mono">
                <p>
                  Юридический адрес:{' '}
                  <span className="text-slate-200 font-sans">
                    {footer.address || 'РФ, Московская обл., Красногорск г.о., п. Архангельское'}
                  </span>
                </p>
                <p>
                  ОГРН: <span className="text-slate-200">{footer.ogrn || org.ogrn}</span> • ИНН:{' '}
                  <span className="text-slate-200">{footer.inn || org.inn}</span> • КПП:{' '}
                  <span className="text-slate-200">{footer.kpp || org.kpp}</span>
                </p>
              </div>
            </div>

            {/* Колонка 2 (3 кол.): Навигация по разделам */}
            <div className="md:col-span-3 space-y-3 text-xs">
              <h3 className="text-white font-bold uppercase tracking-wider text-[11px]">
                Разделы лендинга
              </h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    О Центре и уставные цели
                  </a>
                </li>
                <li>
                  <a href="#directions" className="hover:text-white transition-colors">
                    Ключевые направления деятельности
                  </a>
                </li>
                <li>
                  <a href="#methodology" className="hover:text-white transition-colors">
                    Методология и биомеханика
                  </a>
                </li>
                <li>
                  <a href="#gov-support" className="hover:text-white transition-colors">
                    Взаимодействие с ведомствами
                  </a>
                </li>
                <li>
                  <a href="#appeal-form" className="hover:text-white transition-colors">
                    Направить официальное обращение
                  </a>
                </li>
              </ul>
            </div>

            {/* Колонка 3 (3 кол.): Контактная информация */}
            <div className="md:col-span-3 space-y-3 text-xs">
              <h3 className="text-white font-bold uppercase tracking-wider text-[11px]">
                Контактная информация
              </h3>
              <div className="space-y-2 text-slate-300">
                <p>
                  Тел.:{' '}
                  <a
                    href={`tel:${(footer.phone || org.phone).replace(/[^0-9+]/g, '')}`}
                    className="hover:text-amber-400 transition-colors font-mono"
                  >
                    {footer.phone || org.phone}
                  </a>
                </p>
                <p>
                  Email:{' '}
                  <a
                    href={`mailto:${footer.email || org.receptionEmail}`}
                    className="hover:text-amber-400 transition-colors font-mono"
                  >
                    {footer.email || org.receptionEmail}
                  </a>
                </p>
                <p className="text-slate-400">{footer.workHours || org.workHours}</p>
              </div>
            </div>
          </div>

          {/* Нижняя строка копирайта и политики 152-ФЗ */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div>
              © 2026 Автономная некоммерческая организация «ЦЗСТ» (ANO «CWST»). Все права защищены.
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => setPrivacyModalOpen(true)}
                className="hover:text-white underline transition-colors"
              >
                Политика обработки персональных данных (152-ФЗ РФ)
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Модальное окно Политики обработки персональных данных (152-ФЗ РФ) */}
      {privacyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-[#FFFFFF] text-[#1E293B] rounded-xl max-w-2xl w-full max-h-[85vh] flex flex-col border border-[#E2E8F0] shadow-2xl overflow-hidden">
            <div className="px-6 py-4 bg-[#0F172A] text-white flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-bold">
                Политика обработки персональных данных (152-ФЗ РФ)
              </h3>
              <button
                type="button"
                onClick={() => setPrivacyModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-3 text-xs sm:text-sm text-[#334155] leading-relaxed">
              <p className="font-semibold text-[#0F172A]">
                1. Общие положения
              </p>
              <p>
                Настоящая Политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных» и определяет порядок обработки и меры по обеспечению безопасности персональных данных, предпринимаемые Автономной некоммерческой организацией «ЦЕНТР РАЗВИТИЯ ЗИМНЕГО СПОРТА, СОВРЕМЕННЫХ СПОРТИВНЫХ ТЕХНОЛОГИЙ И ТУРИЗМА» (АНО «ЦЗСТ», ОГРН {org.ogrn}, ИНН {org.inn}, адрес: {org.legalAddress}).
              </p>
              <p className="font-semibold text-[#0F172A]">
                2. Цели сбора и обработки персональных данных
              </p>
              <p>
                Персональные данные граждан и представителей организаций (ФИО, наименование организации, телефон, адрес электронной почты и текст обращения), передаваемые через форму официального обращения на сайте АНО «ЦЗСТ», обрабатываются исключительно в целях регистрации, рассмотрения обращений, экспертно-методического взаимодействия и направления официального ответа заявителю.
              </p>
              <p className="font-semibold text-[#0F172A]">
                3. Правовые основания и конфиденциальность
              </p>
              <p>
                Обработка осуществляется с согласия субъекта персональных данных. АНО «ЦЗСТ» обеспечивает сохранность персональных данных и принимает все необходимые правовые, организационные и технические меры для защиты персональных данных от неправомерного или случайного доступа.
              </p>
            </div>
            <div className="px-6 py-3 bg-[#F8F9FA] border-t border-[#E2E8F0] flex justify-end">
              <button
                type="button"
                onClick={() => setPrivacyModalOpen(false)}
                className="px-5 py-2 rounded-lg bg-[#0F172A] text-white text-xs font-bold hover:bg-slate-800"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
