'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Users, 
  FileText, 
  GraduationCap, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown,
  ArrowRight,
  Trophy, 
  Building2, 
  Calendar,
  Sparkles,
  Flame
} from 'lucide-react';
import { GuillochePattern } from '@/components/ui/GuillochePattern';
import { useSiteContent, resolveMediaUrl } from '@/lib/content';

export type HeroTransitionEffect =
  | 'motion-blur'
  | 'fast-wind'
  | 'transparent'
  | 'dip-to-white'
  | 'dip-to-color';

interface Slide {
  id: string;
  badge?: string;
  tabLabel?: string;
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
  const [animPhase, setAnimPhase] = useState<'idle' | 'out'>('idle');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showControls = Boolean(content?.hero?.showControls);
  const slideDurationSec = Math.max(1, Number(content?.hero?.slideDuration) || 8);
  const transitionEffect: HeroTransitionEffect =
    (content?.hero?.transitionEffect as HeroTransitionEffect) || 'motion-blur';

  const activeThemeId =
    content?.themes?.activeThemeId ||
    content?.settings?.activeThemeId ||
    'bolt-style';
  const activeTheme =
    (content?.themes?.items || []).find((t: any) => t.id === activeThemeId) || null;
  const isBoltStyle = activeThemeId === 'bolt-style';
  const boltHeroBg =
    activeTheme?.heroBgImage ||
    'https://skisport.ru/upload/iblock/9aa/a90b092yyp4qdml3bju3dxvf3njv2asn.jpg';

  const baseSlides: Slide[] = [
    {
      id: 'standards',
      tabLabel: 'Стандарты и Реестр',
      title: 'Развитие стандартов, экспертных компетенций и технологий зимнего спорта в России',
      description: 'АНО «ЦЗСТ» осуществляет профессиональную аттестацию специалистов, разработку отраслевых стандартов безопасности горнолыжных комплексов, научно-методическое сопровождение и внедрение современных спортивно-инженерных технологий.',
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
      tabLabel: 'Carve CUP 🔥',
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
      tabLabel: 'Правительство МО',
      title: 'День открытых дверей в здании Правительства Московской области',
      description: 'Ежегодная встреча руководства АНО «ЦЗСТ», представителей профильных министерств, федераций и директоров горнолыжных курортов в Доме Правительства Московской области. Презентация стандартов безопасности и кадровых программ.',
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
  const sourceCount =
    Array.isArray(dynamicHeroSlides) && dynamicHeroSlides.length > 0
      ? dynamicHeroSlides.length
      : baseSlides.length;

  const activeSlides: Slide[] = Array.from({ length: sourceCount }).map((_, idx) => {
    const base = baseSlides[idx] || baseSlides[0];
    const dyn: any = dynamicHeroSlides?.[idx];
    if (!dyn) return base;

    const dynamicImg = (dyn.image ? resolveMediaUrl(dyn.image) : '') ||
      (idx === 0 ? '/Gemini_Generated_Image_hkfhw8hkfhw8hkfh.png' : idx === 1 ? '/carve-cup.jpg' : '/mosreg-gov.jpg');

    const isCardMode = dyn.displayMode
      ? dyn.displayMode === 'card'
      : (idx > 0);

    const blockSize = dyn.blockSize || 'md';
    const sizeConfig = {
      sm: { container: 'max-w-xs sm:max-w-sm', imgH: 'max-h-[300px] sm:max-h-[340px]' },
      md: { container: 'max-w-md', imgH: 'max-h-[380px] sm:max-h-[440px]' },
      lg: { container: 'max-w-lg', imgH: 'max-h-[440px] sm:max-h-[500px]' },
    }[blockSize as 'sm' | 'md' | 'lg'] || { container: 'max-w-md', imgH: 'max-h-[380px] sm:max-h-[440px]' };

    let rightContent: React.ReactNode;

    if (!isCardMode) {
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

    const secondaryBtn =
      dyn.secondaryBtnText === ''
        ? undefined
        : dyn.secondaryBtnText
        ? {
            label: dyn.secondaryBtnText,
            href: dyn.secondaryBtnHref || base.secondaryBtn?.href || '#documents',
            icon: base.secondaryBtn?.icon || <FileText className="w-4 h-4 text-slate-500" />,
          }
        : base.secondaryBtn;

    const tertiaryBtn =
      dyn.tertiaryBtnText === ''
        ? undefined
        : dyn.tertiaryBtnText
        ? {
            label: dyn.tertiaryBtnText,
            href: dyn.tertiaryBtnHref || base.tertiaryBtn?.href || '#contacts',
            icon: base.tertiaryBtn?.icon || <GraduationCap className="w-4 h-4 text-blue-700" />,
          }
        : base.tertiaryBtn;

    return {
      ...base,
      id: dyn.id || base.id || `slide-${idx + 1}`,
      title: dyn.title || base.title,
      description: dyn.desc || base.description,
      badge: dyn.tag !== undefined ? dyn.tag : base.badge,
      tabLabel:
        dyn.tabLabel ||
        base.tabLabel ||
        (idx === 0 ? 'Стандарты и Реестр' : idx === 1 ? 'Carve CUP 🔥' : idx === 2 ? 'Правительство МО' : dyn.tag || `Слайд ${idx + 1}`),
      rightContent,
      primaryBtn: {
        ...base.primaryBtn,
        label: dyn.ctaText || base.primaryBtn.label,
        href: dyn.ctaHref || base.primaryBtn.href,
      },
      secondaryBtn,
      tertiaryBtn,
    };
  });

  const switchToSlide = useCallback(
    (getTargetIdx: (prev: number) => number) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setAnimPhase('out');
      timeoutRef.current = setTimeout(() => {
        setCurrentSlide((prev) => getTargetIdx(prev));
        setAnimPhase('idle');
      }, 210);
    },
    []
  );

  const nextSlide = useCallback(() => {
    switchToSlide((prev) => (prev + 1) % activeSlides.length);
  }, [activeSlides.length, switchToSlide]);

  const prevSlide = useCallback(() => {
    switchToSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  }, [activeSlides.length, switchToSlide]);

  const goToSlide = useCallback(
    (idx: number) => {
      if (idx === currentSlide) return;
      switchToSlide(() => idx);
    },
    [currentSlide, switchToSlide]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Auto-advance slides every slideDurationSec seconds when not paused
  useEffect(() => {
    if (isPaused || activeSlides.length <= 1) return;
    const interval = setInterval(() => {
      nextSlide();
    }, slideDurationSec * 1000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide, slideDurationSec, activeSlides.length]);

  const slide = activeSlides[currentSlide % activeSlides.length] || activeSlides[0];

  // Compute CSS transition classes based on selected transitionEffect
  const getSlideTransitionClasses = () => {
    switch (transitionEffect) {
      case 'motion-blur':
        return animPhase === 'out'
          ? 'opacity-0 blur-[10px] translate-x-8 scale-x-[1.03]'
          : 'opacity-100 blur-0 translate-x-0 scale-x-100';
      case 'fast-wind':
        return animPhase === 'out'
          ? 'opacity-0 -translate-x-16 -skew-x-6 scale-95'
          : 'opacity-100 translate-x-0 skew-x-0 scale-100';
      case 'transparent':
        return animPhase === 'out'
          ? 'opacity-0 scale-[0.99]'
          : 'opacity-100 scale-100';
      case 'dip-to-white':
      case 'dip-to-color':
        return animPhase === 'out'
          ? 'opacity-10 scale-[0.99]'
          : 'opacity-100 scale-100';
      default:
        return animPhase === 'out' ? 'opacity-0' : 'opacity-100';
    }
  };

  if (isBoltStyle) {
    const landingHero = content?.landing?.hero;
    const dyn0: any = dynamicHeroSlides?.[currentSlide % Math.max(1, dynamicHeroSlides?.length || 1)];
    const boltBadge =
      (currentSlide === 0 ? landingHero?.badge : dyn0?.tag) ||
      'Автономная некоммерческая организация';
    const boltTitle =
      currentSlide === 0
        ? 'Развиваем спорт, который объединяет регионы'
        : slide.title;
    const boltDesc =
      currentSlide === 0
        ? 'Мы реализуем государственные и социальные программы в сфере физической культуры и спорта: от школьных секций до подготовки спортивного резерва. Открыто говорим о нашей работе и ждём партнёров.'
        : slide.description;

    return (
      <section
        id="top"
        className="relative isolate flex min-h-screen w-full flex-col overflow-hidden bg-[#071A33]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <img
          src={boltHeroBg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071A33] via-[#071A33]/85 to-[#0C2444]/40" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[#071A33] to-transparent" />

        {/* Dip to White / Dip to Color Flash Overlay */}
        {transitionEffect === 'dip-to-white' && (
          <div
            className={`absolute inset-0 z-20 pointer-events-none bg-white transition-opacity duration-200 ${
              animPhase === 'out' ? 'opacity-95' : 'opacity-0'
            }`}
          />
        )}
        {transitionEffect === 'dip-to-color' && (
          <div
            className={`absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-[#071A33] via-[#0C2444] to-[#E8B93E] transition-opacity duration-200 ${
              animPhase === 'out' ? 'opacity-90' : 'opacity-0'
            }`}
          />
        )}

        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pb-24 pt-32 lg:px-8 relative z-10">
          <div
            className={`max-w-3xl transition-all duration-300 ease-out will-change-transform ${getSlideTransitionClasses()}`}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#D9E4F0] backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E8B93E]" aria-hidden="true" />
              {boltBadge}
            </span>

            <h1 className="mt-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl leading-[1.12] tracking-[-0.02em]">
              {boltTitle}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#D9E4F0] sm:text-lg">
              {boltDesc}
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="#partnership"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#E8B93E] px-7 py-3.5 text-base font-semibold text-[#071A33] shadow-lg shadow-black/20 transition-all hover:-translate-y-0.5 hover:bg-[#F0CF6A]"
              >
                <span>Стать партнёром</span>
                <ArrowRight
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>

              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
              >
                Наши проекты
              </a>
            </div>
          </div>

          {showControls && (
            <div className="mt-10 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-4 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                {activeSlides.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => goToSlide(idx)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      currentSlide === idx
                        ? 'bg-[#E8B93E] text-[#071A33]'
                        : 'bg-white/10 text-[#D9E4F0] hover:bg-white/20'
                    }`}
                  >
                    <span>0{idx + 1}</span>
                    <span className="hidden md:inline font-normal truncate max-w-[140px]">
                      {s.tabLabel}
                    </span>
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  aria-label="Предыдущий слайд"
                  className="p-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Следующий слайд"
                  className="p-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        <a
          href="#about"
          aria-label="Перейти к разделу о центре"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/60 transition-colors hover:text-white z-10"
        >
          <ChevronDown className="h-6 w-6" aria-hidden="true" />
        </a>
      </section>
    );
  }

  return (
    <section 
      className="bg-white text-slate-900 pt-10 pb-12 lg:pt-14 lg:pb-16 border-b border-slate-200 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {isBoltStyle ? (
        <>
          <img
            src={boltHeroBg}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 h-full w-full object-cover opacity-45"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071A33] via-[#071A33]/85 to-[#0C2444]/40" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[#071A33] to-transparent" />
        </>
      ) : (
        <>
          {/* Parametric Script-Generated Guilloche Background Curves */}
          <GuillochePattern variant="full" theme="light" opacity={1.15} />

          {/* Subtle geometric pattern overlay */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:16px_16px]" />
        </>
      )}

      {/* Dip to White / Dip to Color Flash Overlay */}
      {transitionEffect === 'dip-to-white' && (
        <div
          className={`absolute inset-0 z-20 pointer-events-none bg-white transition-opacity duration-200 ${
            animPhase === 'out' ? 'opacity-95' : 'opacity-0'
          }`}
        />
      )}
      {transitionEffect === 'dip-to-color' && (
        <div
          className={`absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-orange-600 transition-opacity duration-200 ${
            animPhase === 'out' ? 'opacity-90' : 'opacity-0'
          }`}
        />
      )}

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full ${isBoltStyle ? 'pb-12 pt-4 lg:pt-8' : ''}`}>
        {/* Slide Content */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[440px] transition-all duration-300 ease-out will-change-transform ${getSlideTransitionClasses()}`}
        >
          {/* Left Column: Text & Actions */}
          <div className="lg:col-span-7">
            {(slide.badge || isBoltStyle) && (
              <div
                className={
                  isBoltStyle
                    ? 'inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#D9E4F0] backdrop-blur mb-5'
                    : 'inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold uppercase tracking-wider mb-4'
                }
              >
                <span
                  className={
                    isBoltStyle
                      ? 'h-1.5 w-1.5 rounded-full bg-[#E8B93E] inline-block'
                      : 'w-2 h-2 rounded-full bg-red-600 inline-block animate-pulse'
                  }
                />
                {slide.badge || 'Автономная некоммерческая организация'}
              </div>
            )}

            <h1
              className={
                isBoltStyle
                  ? 'text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.12] tracking-[-0.02em] min-h-[2.4em] flex items-center'
                  : 'text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight min-h-[2.6em] flex items-center'
              }
            >
              {slide.title}
            </h1>

            <p
              className={
                isBoltStyle
                  ? 'mt-5 text-[#D9E4F0] text-base sm:text-lg leading-relaxed min-h-[4.2em]'
                  : 'mt-4 text-slate-600 text-sm sm:text-base leading-relaxed min-h-[4.5em]'
              }
            >
              {slide.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4 items-center">
              {slide.primaryBtn.isExternal ? (
                <a
                  href={slide.primaryBtn.href}
                  className={
                    isBoltStyle
                      ? 'group inline-flex items-center justify-center gap-2 rounded-full bg-[#E8B93E] px-7 py-3.5 text-sm sm:text-base font-semibold text-[#071A33] shadow-lg shadow-black/20 transition-all hover:-translate-y-0.5 hover:bg-[#F0CF6A]'
                      : `inline-flex items-center gap-2 px-5 py-3 rounded-md font-semibold text-sm transition-all shadow-sm hover:shadow ${
                          slide.primaryBtn.isHot
                            ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-200'
                            : 'bg-[#0A2540] hover:bg-[#123962] text-white'
                        }`
                  }
                >
                  {slide.primaryBtn.icon}
                  <span>{slide.primaryBtn.label}</span>
                </a>
              ) : (
                <Link
                  href={slide.primaryBtn.href}
                  className={
                    isBoltStyle
                      ? 'group inline-flex items-center justify-center gap-2 rounded-full bg-[#E8B93E] px-7 py-3.5 text-sm sm:text-base font-semibold text-[#071A33] shadow-lg shadow-black/20 transition-all hover:-translate-y-0.5 hover:bg-[#F0CF6A]'
                      : 'inline-flex items-center gap-2 px-5 py-3 rounded-md bg-[#0A2540] hover:bg-[#123962] text-white font-semibold text-sm transition-all shadow-sm hover:shadow'
                  }
                >
                  {slide.primaryBtn.icon}
                  <span>{slide.primaryBtn.label}</span>
                </Link>
              )}

              {slide.secondaryBtn && (
                <Link
                  href={slide.secondaryBtn.href}
                  className={
                    isBoltStyle
                      ? 'inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-sm sm:text-base font-semibold text-white transition-colors hover:border-white hover:bg-white/10'
                      : 'inline-flex items-center gap-2 px-5 py-3 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-sm border border-slate-300 transition-colors'
                  }
                >
                  {slide.secondaryBtn.icon}
                  <span>{slide.secondaryBtn.label}</span>
                </Link>
              )}

              {slide.tertiaryBtn && !isBoltStyle && (
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
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-end">
            {slide.rightContent}
          </div>
        </div>

        {/* Slider Controls & Progress Indicators (Optional via showControls checkbox in Admin) */}
        {showControls && (
          <div className={`mt-8 pt-4 border-t ${isBoltStyle ? 'border-white/15' : 'border-slate-200/80'} flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
            {/* Dot & Slide Selectors */}
            <div className="flex flex-wrap items-center gap-2">
              {activeSlides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => goToSlide(idx)}
                  aria-label={`Перейти к слайду ${idx + 1}`}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    currentSlide === idx
                      ? isBoltStyle
                        ? 'bg-[#E8B93E] text-[#071A33] shadow-xs'
                        : 'bg-[#0A2540] text-white shadow-xs'
                      : isBoltStyle
                      ? 'bg-white/10 text-[#D9E4F0] hover:bg-white/20'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span>0{idx + 1}</span>
                  <span className="hidden md:inline font-normal truncate max-w-[140px]">
                    {s.tabLabel}
                  </span>
                </button>
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                onClick={prevSlide}
                aria-label="Предыдущий слайд"
                className="p-2 rounded-lg border transition-colors shadow-2xs bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Следующий слайд"
                className="p-2 rounded-lg border transition-colors shadow-2xs bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
