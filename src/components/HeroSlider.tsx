'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Users, 
  FileText, 
  GraduationCap, 
  ChevronLeft, 
  ChevronRight, 
  Trophy, 
  Building2, 
  Calendar,
  Sparkles,
  ArrowRight,
  Flame
} from 'lucide-react';
import { GuillochePattern } from '@/components/ui/GuillochePattern';
import { useSiteContent, resolveMediaUrl } from '@/lib/content';

interface Slide {
  id: string;
  badge?: string;
  title: string;
  description: string;
  primaryBtn: {
    label: string;
    href: string;
    icon: React.ReactNode;
    isExternal?: boolean;
    isHot?: boolean;
  };
  secondaryBtn?: {
    label: string;
    href: string;
    icon: React.ReactNode;
  };
  tertiaryBtn?: {
    label: string;
    href: string;
    icon: React.ReactNode;
  };
  rightContent: React.ReactNode;
}

export function HeroSlider() {
  const { content } = useSiteContent();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides: Slide[] = [
    {
      id: 'standards',
      title: 'Развитие стандартов, экспертных компетенций и технологий зимнего спорта в России',
      description: 'АНО «ЦРЗС» осуществляет профессиональную аттестацию специалистов, разработку отраслевых стандартов безопасности горнолыжных комплексов, научно-методическое сопровождение и внедрение современных спортивно-инженерных технологий.',
      primaryBtn: {
        label: 'Единый Реестр специалистов',
        href: '/specialists',
        icon: <Users className="w-4 h-4 text-blue-300" />
      },
      secondaryBtn: {
        label: 'Нормативная база и стандарты',
        href: '/documents',
        icon: <FileText className="w-4 h-4 text-slate-500" />
      },
      tertiaryBtn: {
        label: 'Программы аттестации',
        href: '/education',
        icon: <GraduationCap className="w-4 h-4 text-blue-700" />
      },
      rightContent: (
        <div className="relative max-w-sm sm:max-w-md w-full flex justify-center lg:justify-end">
          <Image
            src="/Gemini_Generated_Image_hkfhw8hkfhw8hkfh.png"
            alt="Аттестованный специалист АНО ЦЗСТ"
            width={768}
            height={1024}
            className="w-auto h-auto max-h-[420px] sm:max-h-[460px] lg:max-h-[490px] object-contain drop-shadow-md select-none pointer-events-none"
            priority
          />
        </div>
      )
    },
    {
      id: 'carve-cup',
      badge: 'Всероссийский спортивный кубок',
      title: 'Carve Cup 2028: соревнования в разных дисциплинах',
      description: 'Масштабный турнир по спортивному карвингу и горнолыжным дисциплинам. Состязания сильнейших райдеров страны в слаломе-гиганте, скоростном ведении дуг и точности прохождения трассы по официальным стандартам.',
      primaryBtn: {
        label: 'Участвовать в Carve CUP 🔥',
        href: 'https://ano-crzs.pages.dev/#carvecup',
        icon: <Flame className="w-4 h-4 text-yellow-300" />,
        isExternal: true,
        isHot: true
      },
      secondaryBtn: {
        label: 'Регламент и правила кубка',
        href: '/documents',
        icon: <FileText className="w-4 h-4 text-slate-500" />
      },
      tertiaryBtn: {
        label: 'Календарь этапов',
        href: '/events',
        icon: <Calendar className="w-4 h-4 text-red-600" />
      },
      rightContent: (
        <div className="relative max-w-md w-full flex justify-center lg:justify-end">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white group">
            <Image
              src="/carve-cup.jpg"
              alt="Carve Cup 2028 — соревнования по карвингу"
              width={1200}
              height={800}
              className="w-full h-auto object-cover max-h-[380px] sm:max-h-[440px]"
            />
            {/* Overlay badge */}
            <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-white/20 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold flex items-center gap-1.5">
                    Carve Cup 2028
                    <span className="text-xs">🔥</span>
                  </div>
                  <div className="text-[11px] text-slate-300">
                    Официальный зачет • Горные лыжи и сноуборд
                  </div>
                </div>
              </div>
              <span className="text-[10px] bg-red-600/90 text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                Скоро старт
              </span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'open-doors',
      badge: 'Официальное событие Московской области',
      title: 'День открытых дверей в здании Правительства Московской области',
      description: 'Ежегодная встреча руководства АНО «ЦРЗС», представителей профильных министерств, федераций и директоров горнолыжных курортов в Доме Правительства Московской области. Презентация стандартов безопасности и кадровых программ.',
      primaryBtn: {
        label: 'Программа мероприятия',
        href: '/events',
        icon: <Calendar className="w-4 h-4 text-blue-300" />
      },
      secondaryBtn: {
        label: 'Регистрация делегатов',
        href: '/contacts',
        icon: <Users className="w-4 h-4 text-slate-500" />
      },
      tertiaryBtn: {
        label: 'Схема проезда в Дом Правительства',
        href: '/contacts',
        icon: <Building2 className="w-4 h-4 text-blue-700" />
      },
      rightContent: (
        <div className="relative max-w-md w-full flex justify-center lg:justify-end">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white group">
            <Image
              src="/mosreg-gov.jpg"
              alt="Дом Правительства Московской области, Красногорск"
              width={1200}
              height={800}
              className="w-full h-auto object-cover max-h-[380px] sm:max-h-[440px]"
            />
            {/* Overlay badge */}
            <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-white/20 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold">
                    Дом Правительства Московской области
                  </div>
                  <div className="text-[11px] text-slate-300">
                    г. Красногорск • День открытых дверей
                  </div>
                </div>
              </div>
              <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                Отраслевой форум
              </span>
            </div>
          </div>
        </div>
      )
    }
  ];

  // Merge dynamic slides if available from R2 content
  const dynamicHeroSlides = content?.hero?.slides;
  const activeSlides: Slide[] = slides.map((base, idx) => {
    const dyn = dynamicHeroSlides?.[idx];
    if (!dyn) return base;

    const dynamicImg = (dyn.image ? resolveMediaUrl(dyn.image) : '') ||
      (idx === 0 ? '/Gemini_Generated_Image_hkfhw8hkfhw8hkfh.png' : idx === 1 ? '/carve-cup.jpg' : '/mosreg-gov.jpg');

    // Check display mode: 'image' (отдельное изображение) vs 'card' (отдельный блок)
    const isCardMode = dyn.displayMode
      ? dyn.displayMode === 'card'
      : (idx > 0); // fallback for existing content: slide 0 is image, others card

    // Block size
    const blockSize = dyn.blockSize || 'md';
    const sizeConfig = {
      sm: { container: 'max-w-xs sm:max-w-sm', imgH: 'max-h-[300px] sm:max-h-[340px]' },
      md: { container: 'max-w-md', imgH: 'max-h-[380px] sm:max-h-[440px]' },
      lg: { container: 'max-w-lg', imgH: 'max-h-[440px] sm:max-h-[500px]' },
    }[blockSize as 'sm' | 'md' | 'lg'] || { container: 'max-w-md', imgH: 'max-h-[380px] sm:max-h-[440px]' };

    let rightContent: React.ReactNode;

    if (!isCardMode) {
      // 1. Separate free image (Отдельное изображение без рамки и плашек)
      rightContent = (
        <div className={`relative ${sizeConfig.container} w-full flex justify-center lg:justify-end`}>
          <img
            src={dynamicImg}
            alt={dyn.title || base.title}
            className={`w-auto h-auto ${sizeConfig.imgH} object-contain drop-shadow-md select-none pointer-events-none`}
          />
        </div>
      );
    } else {
      // 2. Separate card block (Отдельный блок с рамкой, плашкой, текстом и кнопкой)
      const blockTitle = dyn.blockTitle !== undefined && dyn.blockTitle !== ''
        ? dyn.blockTitle
        : (idx === 1 ? 'Carve Cup 2028 🔥' : idx === 2 ? 'Дом Правительства Московской области' : dyn.title || '');

      const blockSubtitle = dyn.blockSubtitle !== undefined && dyn.blockSubtitle !== ''
        ? dyn.blockSubtitle
        : (idx === 1 ? 'Официальный зачет • Горные лыжи и сноуборд' : idx === 2 ? 'г. Красногорск • День открытых дверей' : '');

      const blockBtnText = dyn.blockBtnText !== undefined && dyn.blockBtnText !== ''
        ? dyn.blockBtnText
        : (idx === 1 ? 'Скоро старт' : idx === 2 ? 'Отраслевой форум' : '');

      const blockBtnHref = dyn.blockBtnHref || '';
      const blockColor = dyn.blockBtnColor || (idx === 1 ? 'red' : 'blue');

      const colorMap: Record<string, { bg: string; badge: string }> = {
        red: { bg: 'bg-red-600', badge: 'bg-red-600/90 text-white hover:bg-red-500' },
        blue: { bg: 'bg-blue-600', badge: 'bg-blue-600/90 text-white hover:bg-blue-500' },
        emerald: { bg: 'bg-emerald-600', badge: 'bg-emerald-600/90 text-white hover:bg-emerald-500' },
        amber: { bg: 'bg-amber-600', badge: 'bg-amber-600/90 text-white hover:bg-amber-500' },
        slate: { bg: 'bg-slate-700', badge: 'bg-slate-700/90 text-white hover:bg-slate-600' },
      };
      const theme = colorMap[blockColor] || colorMap.blue;

      rightContent = (
        <div className={`relative ${sizeConfig.container} w-full flex justify-center lg:justify-end`}>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white group w-full">
            <img
              src={dynamicImg}
              alt={dyn.title || base.title}
              className={`w-full h-auto object-cover ${sizeConfig.imgH}`}
            />
            {/* Overlay badge with text and action button */}
            {(blockTitle || blockSubtitle || blockBtnText) && (
              <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-white/20 text-white flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-8 h-8 rounded-lg ${theme.bg} text-white flex items-center justify-center shrink-0 shadow-xs`}>
                    {idx === 1 ? <Trophy className="w-4 h-4" /> : idx === 2 ? <Building2 className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                  </div>
                  <div className="min-w-0">
                    {blockTitle && (
                      <div className="text-xs font-bold truncate">
                        {blockTitle}
                      </div>
                    )}
                    {blockSubtitle && (
                      <div className="text-[11px] text-slate-300 truncate">
                        {blockSubtitle}
                      </div>
                    )}
                  </div>
                </div>
                {blockBtnText && (
                  blockBtnHref ? (
                    <a
                      href={blockBtnHref}
                      target={blockBtnHref.startsWith('http') ? '_blank' : undefined}
                      rel={blockBtnHref.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={`text-[10px] ${theme.badge} px-2.5 py-1 rounded font-bold uppercase tracking-wider transition-colors shrink-0 shadow-xs`}
                    >
                      {blockBtnText}
                    </a>
                  ) : (
                    <span className={`text-[10px] ${theme.badge} px-2 py-0.5 rounded font-bold uppercase tracking-wider shrink-0`}>
                      {blockBtnText}
                    </span>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    return {
      ...base,
      title: dyn.title || base.title,
      description: dyn.desc || base.description,
      badge: dyn.tag || base.badge,
      rightContent,
      primaryBtn: {
        ...base.primaryBtn,
        label: dyn.ctaText || base.primaryBtn.label,
        href: dyn.ctaHref || base.primaryBtn.href,
      },
    };
  });

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
  }, [activeSlides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  }, [activeSlides.length]);

  // Auto-advance slides every 8 seconds when not paused
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const slide = activeSlides[currentSlide % activeSlides.length] || activeSlides[0];

  return (
    <section 
      className="bg-white text-slate-900 pt-10 pb-12 lg:pt-14 lg:pb-16 border-b border-slate-200 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Parametric Script-Generated Guilloche Background Curves */}
      <GuillochePattern variant="full" theme="light" opacity={1.15} />

      {/* Subtle geometric pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Slide Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[460px]">
          {/* Left Column: Text & Actions */}
          <div className="lg:col-span-7 transition-all duration-300">
            {slide.badge && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold uppercase tracking-wider mb-4">
                <span className="w-2 h-2 rounded-full bg-red-600 inline-block animate-pulse" />
                {slide.badge}
              </div>
            )}

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight min-h-[2.6em] flex items-center">
              {slide.title}
            </h1>

            <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed min-h-[4.5em]">
              {slide.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4 items-center">
              {slide.primaryBtn.isExternal ? (
                <a
                  href={slide.primaryBtn.href}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-md font-semibold text-sm transition-all shadow-sm hover:shadow ${
                    slide.primaryBtn.isHot
                      ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-200'
                      : 'bg-[#0A2540] hover:bg-[#123962] text-white'
                  }`}
                >
                  {slide.primaryBtn.icon}
                  <span>{slide.primaryBtn.label}</span>
                </a>
              ) : (
                <Link
                  href={slide.primaryBtn.href}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-[#0A2540] hover:bg-[#123962] text-white font-semibold text-sm transition-all shadow-sm hover:shadow"
                >
                  {slide.primaryBtn.icon}
                  <span>{slide.primaryBtn.label}</span>
                </Link>
              )}

              {slide.secondaryBtn && (
                <Link
                  href={slide.secondaryBtn.href}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-sm border border-slate-300 transition-colors"
                >
                  {slide.secondaryBtn.icon}
                  <span>{slide.secondaryBtn.label}</span>
                </Link>
              )}

              {slide.tertiaryBtn && (
                <Link
                  href={slide.tertiaryBtn.href}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-white hover:bg-slate-50 text-slate-700 font-medium text-sm border border-slate-300 transition-colors"
                >
                  {slide.tertiaryBtn.icon}
                  <span>{slide.tertiaryBtn.label}</span>
                </Link>
              )}
            </div>
          </div>

          {/* Right Column: Visual Showcase */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-end transition-opacity duration-300">
            {slide.rightContent}
          </div>
        </div>

        {/* Slider Controls & Progress Indicators */}
        <div className="mt-8 pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Dot & Slide Selectors */}
          <div className="flex items-center gap-2">
            {activeSlides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Перейти к слайду ${idx + 1}`}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  currentSlide === idx
                    ? 'bg-[#0A2540] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>0{idx + 1}</span>
                <span className="hidden md:inline font-normal truncate max-w-[140px]">
                  {idx === 0 ? 'Стандарты и Реестр' : idx === 1 ? 'Carve CUP 🔥' : 'Правительство МО'}
                </span>
              </button>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={prevSlide}
              aria-label="Предыдущий слайд"
              className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition-colors shadow-2xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Следующий слайд"
              className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition-colors shadow-2xs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
