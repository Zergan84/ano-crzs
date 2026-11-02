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
import { DEFAULT_HERO_SLIDES } from '@/data/defaultContent';

export type HeroTransitionEffect =
  | 'motion-blur'
  | 'fade'
  | 'fast-wind'
  | 'transparent'
  | 'dip-to-white'
  | 'dip-to-color';

interface Slide {
  id: string;
  badge?: string;
  showBadge?: boolean;
  tabLabel?: string;
  title: string;
  description: string;
  primaryBtn?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
    isExternal?: boolean;
    isHot?: boolean;
  };
  secondaryBtn?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
  };
  tertiaryBtn?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
  };
  rightContent: React.ReactNode;
}

export function HeroSlider() {
  const { content } = useSiteContent();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [animPhase, setAnimPhase] = useState<'idle' | 'out'>('idle');
  const [slideProgress, setSlideProgress] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showControls = Boolean(content?.hero?.showControls);
  const slideDurationSec = Math.max(1, Number(content?.hero?.slideDuration) || 8);
  const sliderHeight = (content?.hero as any)?.sliderHeight || 'compact';
  const transitionEffect: HeroTransitionEffect =
    (content?.hero?.transitionEffect as HeroTransitionEffect) || 'motion-blur';

  const activeThemeId =
    content?.themes?.activeThemeId ||
    content?.settings?.activeThemeId ||
    'tricolor';
  const activeTheme =
    (content?.themes?.items || []).find((t: any) => t.id === activeThemeId) || null;
  const isBoltStyle = activeThemeId === 'bolt-style';
  const isTricolor = activeThemeId === 'tricolor';
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

    const primaryBtn =
      dyn.ctaText !== undefined
        ? dyn.ctaText.trim()
          ? {
              ...base.primaryBtn,
              label: dyn.ctaText.trim(),
              href: dyn.ctaHref || base.primaryBtn?.href || '#partnership',
            }
          : undefined
        : base.primaryBtn;

    const secondaryBtn =
      dyn.secondaryBtnText !== undefined
        ? dyn.secondaryBtnText.trim()
          ? {
              label: dyn.secondaryBtnText.trim(),
              href: dyn.secondaryBtnHref || base.secondaryBtn?.href || '#documents',
              icon: base.secondaryBtn?.icon || <FileText className="w-4 h-4 text-slate-500" />,
            }
          : undefined
        : base.secondaryBtn;

    const tertiaryBtn =
      dyn.tertiaryBtnText !== undefined
        ? dyn.tertiaryBtnText.trim()
          ? {
              label: dyn.tertiaryBtnText.trim(),
              href: dyn.tertiaryBtnHref || base.tertiaryBtn?.href || '#contacts',
              icon: base.tertiaryBtn?.icon || <GraduationCap className="w-4 h-4 text-blue-700" />,
            }
          : undefined
        : base.tertiaryBtn;

    return {
      ...base,
      id: dyn.id || base.id || `slide-${idx + 1}`,
      title: dyn.title || base.title,
      description: dyn.desc || base.description,
      badge: dyn.tag !== undefined ? dyn.tag : base.badge,
      showBadge: dyn.showBadge !== false,
      tabLabel:
        dyn.tabLabel ||
        base.tabLabel ||
        (idx === 0 ? 'Стандарты и Реестр' : idx === 1 ? 'Carve CUP 🔥' : idx === 2 ? 'Правительство МО' : dyn.tag || `Слайд ${idx + 1}`),
      rightContent,
      primaryBtn,
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
      }, 140);
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

  // Auto-advance slides every slideDurationSec seconds with real-time progress update
  useEffect(() => {
    if (activeSlides.length <= 1) {
      setSlideProgress(100);
      return;
    }
    if (isPaused) return;

    setSlideProgress(0);
    const totalMs = slideDurationSec * 1000;
    const intervalMs = 50;
    const step = (intervalMs / totalMs) * 100;

    const timer = setInterval(() => {
      setSlideProgress((prev) => {
        if (prev + step >= 100) {
          nextSlide();
          return 0;
        }
        return prev + step;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide, slideDurationSec, activeSlides.length, currentSlide]);

  const slide = activeSlides[currentSlide % activeSlides.length] || activeSlides[0];

  // Compute CSS transition classes based on selected transitionEffect
  const getSlideTransitionClasses = () => {
    switch (transitionEffect) {
      case 'fade':
        return animPhase === 'out'
          ? 'opacity-0'
          : 'opacity-100';
      case 'motion-blur':
        return animPhase === 'out'
          ? 'opacity-0 blur-[6px]'
          : 'opacity-100 blur-0';
      case 'fast-wind':
        return animPhase === 'out'
          ? 'opacity-0 -translate-x-6'
          : 'opacity-100 translate-x-0';
      case 'transparent':
        return animPhase === 'out'
          ? 'opacity-0'
          : 'opacity-100';
      case 'dip-to-white':
      case 'dip-to-color':
        return animPhase === 'out'
          ? 'opacity-20'
          : 'opacity-100';
      default:
        return animPhase === 'out' ? 'opacity-0' : 'opacity-100';
    }
  };

  if (isBoltStyle || isTricolor) {
    const slidesData =
      Array.isArray(dynamicHeroSlides) && dynamicHeroSlides.length > 0
        ? dynamicHeroSlides
        : DEFAULT_HERO_SLIDES;

    const dyn0: any = slidesData[currentSlide % Math.max(1, slidesData.length)];
    const showBadge = dyn0?.showBadge !== false;
    const boltBadge = showBadge
      ? dyn0?.tag ||
        slide.badge ||
        ''
      : '';
    const boltTitle =
      dyn0?.title ||
      slide.title ||
      '';
    const boltDesc =
      dyn0?.desc ||
      slide.description ||
      '';
    const boltPrimaryText =
      dyn0?.ctaText !== undefined
        ? dyn0.ctaText.trim()
        : (slide.primaryBtn?.label || '');
    const boltPrimaryHref =
      dyn0?.ctaHref || slide.primaryBtn?.href || '#partnership';
    const boltSecondaryText =
      dyn0?.secondaryBtnText !== undefined
        ? dyn0.secondaryBtnText.trim()
        : (slide.secondaryBtn?.label || '');
    const boltSecondaryHref =
      dyn0?.secondaryBtnHref || slide.secondaryBtn?.href || '#projects';
    const textAlign: 'left' | 'center' | 'right' =
      dyn0?.textAlign === 'center' || dyn0?.textAlign === 'right'
        ? dyn0.textAlign
        : 'left';

    const alignContainerClasses =
      textAlign === 'center'
        ? 'mx-auto text-center flex flex-col items-center'
        : textAlign === 'right'
        ? 'ml-auto text-right flex flex-col items-end'
        : 'mr-auto text-left flex flex-col items-start';

    const alignDescClasses =
      textAlign === 'center'
        ? 'mx-auto text-center'
        : textAlign === 'right'
        ? 'ml-auto text-right'
        : 'text-left';

    const alignButtonsClasses =
      textAlign === 'center'
        ? 'justify-center'
        : textAlign === 'right'
        ? 'justify-end'
        : 'justify-start';

    const heightClasses = (() => {
      switch (sliderHeight) {
        case 'screen-50':
          // Ровно 50vh экрана вместе с шапкой на любых экранах (от MacBook до 30-дюймовых мониторов 2560x1600 и 4K)
          return 'h-[calc(50vh-104px)] min-h-[420px] py-6 md:py-10';
        case 'compact':
          return 'h-[calc(50vh-104px)] min-h-[420px] py-6 md:py-10';
        case 'medium':
          return 'h-[calc(65vh-104px)] min-h-[520px] py-12 md:py-16';
        case 'tall':
          return 'min-h-[780px] md:min-h-[860px] py-20 md:py-32';
        case 'fullscreen':
          return 'min-h-screen py-16 md:py-24';
        default:
          return isTricolor
            ? 'h-[calc(50vh-104px)] min-h-[420px] py-6 md:py-10'
            : 'min-h-screen py-16 md:py-24';
      }
    })();

    return (
      <section
        id="top"
        className={`relative isolate flex w-full flex-col justify-center overflow-hidden transition-all duration-300 ${
          isTricolor ? 'bg-[#0F2147]' : 'bg-[#071A33]'
        } ${heightClasses}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Фоновые изображения всех слайдов: плавный cross-fade.
            Изображение заполняет 100% высоты слайдера.
            Сдвиг sBgPaddingTop и ровнение alignToBlock регулируют внутреннюю позицию фона (top 50% + translateY(-50% + offset) / calc(50% + offset)) через object-position/calc или расширенный контейнер, чтобы никогда не образовывалась пустая полоса подложки. */}
        <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
          {slidesData.map((s: any, idx: number) => {
            const isSlideActive = currentSlide === idx;
            const fallbackHeroBg =
              idx === 0
                ? boltHeroBg
                : idx === 1
                ? '/carve-cup.jpg'
                : idx === 2
                ? '/mosreg-gov.jpg'
                : boltHeroBg;
            const bgUrl = (s.image ? resolveMediaUrl(s.image) : '') || fallbackHeroBg;
            const sBgPaddingTop = typeof s.bgPaddingTop === 'number' 
              ? s.bgPaddingTop 
              : (typeof s.bgMarginTop === 'number' ? s.bgMarginTop : 0);
            const alignToBlock = s.alignToBlock !== false;

            // Вычисляем процент базового objectPosition
            const basePos = s.bgPosition || 'center';
            let basePercent = '50%';
            if (basePos === 'top' || basePos === 'center top') basePercent = '0%';
            else if (basePos === 'bottom' || basePos === 'center bottom') basePercent = '100%';

            // При ровнении относительно экрана браузера добавляем смещение высоты шапки (-104px)
            const netOffset = alignToBlock ? sBgPaddingTop : (sBgPaddingTop - 104);

            return (
              <img
                key={s.id || idx}
                src={bgUrl}
                alt=""
                aria-hidden="true"
                onError={(e) => {
                  // Если удаленный сервер недоступен (например, fd-sport.ru), подставляем локальный надежный фолбек
                  const target = e.currentTarget;
                  if (target.src !== fallbackHeroBg) {
                    target.src = fallbackHeroBg;
                  }
                }}
                style={{
                  // Изображение всегда занимает 100% блока и покрывает его полностью без зазоров (cover).
                  // Сдвиг по вертикали задаётся через object-position: center calc(Y% + offset), что перемещает сам срез картинки без смещения границ тэга <img>!
                  objectPosition: `center calc(${basePercent} + ${netOffset}px)`,
                }}
                className={`hero-slide-bg-responsive absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
                  isSlideActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              />
            );
          })}
        </div>
        {isTricolor ? (
          <div
            className="absolute inset-0 -z-10"
            style={{
              backgroundImage:
                'linear-gradient(100deg, rgba(15,33,71,0.92) 0%, rgba(15,33,71,0.75) 38%, rgba(15,33,71,0.22) 72%, rgba(15,33,71,0.08) 100%)',
            }}
          />
        ) : (
          <>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071A33] via-[#071A33]/85 to-[#0C2444]/40" />
            <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[#071A33] to-transparent" />
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
            className={`absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-[#071A33] via-[#0C2444] to-[#E8B93E] transition-opacity duration-200 ${
              animPhase === 'out' ? 'opacity-90' : 'opacity-0'
            }`}
          />
        )}

        <div
          className={`mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 md:px-6 relative z-10 ${
            isTricolor ? 'pb-10 pt-4' : 'pb-28 pt-32'
          }`}
        >
          <div
            className={`w-full max-w-2xl min-h-[220px] sm:min-h-[260px] flex flex-col justify-center transition-all duration-300 ease-out will-change-transform ${alignContainerClasses} ${getSlideTransitionClasses()}`}
          >
            {boltBadge && (
              isTricolor ? (
                <div className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase leading-relaxed text-white">
                  <span className="h-0.5 w-8 shrink-0 bg-[#D92D20]" aria-hidden="true" />
                  <span>{boltBadge}</span>
                </div>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#D9E4F0] backdrop-blur mb-4">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E8B93E]" aria-hidden="true" />
                  {boltBadge}
                </span>
              )
            )}

            <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl leading-[1.12] tracking-[-0.02em]">
              {boltTitle}
            </h1>

            <p className={`mt-3 max-w-xl text-sm leading-relaxed text-white/90 sm:text-base line-clamp-3 ${alignDescClasses}`}>
              {boltDesc}
            </p>

            {(boltPrimaryText || boltSecondaryText) && (
              <div className={`mt-6 flex w-full flex-col gap-3 sm:flex-row ${alignButtonsClasses}`}>
                {boltPrimaryText && (
                  <a
                    href={boltPrimaryHref}
                    className={
                      isTricolor
                        ? 'group inline-flex items-center justify-center gap-2 rounded-sm bg-[#D92D20] px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-all hover:bg-[#b92419]'
                        : 'group inline-flex items-center justify-center gap-2 rounded-full bg-[#E8B93E] px-7 py-3.5 text-base font-semibold text-[#071A33] shadow-lg shadow-black/20 transition-all hover:-translate-y-0.5 hover:bg-[#F0CF6A]'
                    }
                  >
                    <span>{boltPrimaryText}</span>
                    <ArrowRight
                      className="h-5 w-5 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </a>
                )}

                {boltSecondaryText && (
                  <a
                    href={boltSecondaryHref}
                    className={
                      isTricolor
                        ? 'inline-flex items-center justify-center gap-2 rounded-sm bg-white px-6 py-3.5 text-base font-semibold text-[#0F2147] shadow-sm transition-colors hover:bg-slate-100'
                        : 'inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:border-white hover:bg-white/10'
                    }
                  >
                    {boltSecondaryText}
                  </a>
                )}
              </div>
            )}
          </div>

          {showControls && activeSlides.length > 1 && (
            <div className="mt-10 pt-4 border-t border-white/15 flex flex-wrap items-center justify-center gap-2">
              {activeSlides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => goToSlide(idx)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    currentSlide === idx
                      ? isTricolor
                        ? 'bg-[#D92D20] text-white shadow-xs'
                        : 'bg-[#E8B93E] text-[#071A33]'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                >
                  <span>0{idx + 1}</span>
                  <span className="hidden md:inline font-normal truncate max-w-[140px]">
                    {s.tabLabel}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Точки пагинации ровно по центру экрана внизу прямо над стрелочкой скролла вниз */}
        {activeSlides.length > 1 && (
          <div
            className={`absolute left-1/2 -translate-x-1/2 z-20 flex items-center justify-center gap-2.5 ${
              isTricolor ? 'bottom-12' : 'bottom-16'
            }`}
          >
            {activeSlides.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => goToSlide(idx)}
                aria-label={`Слайд ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentSlide === idx
                    ? isTricolor
                      ? 'w-8 bg-[#D92D20] shadow-sm'
                      : 'w-8 bg-[#E8B93E] shadow-sm shadow-black/30'
                    : 'w-2.5 bg-white/40 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        )}

        <a
          href="#about"
          aria-label="Перейти к разделу о центре"
          className={`absolute left-1/2 -translate-x-1/2 transition-colors hover:text-white z-10 ${
            isTricolor
              ? 'bottom-4 text-white/80'
              : 'bottom-7 animate-bounce text-white/60'
          }`}
        >
          <ChevronDown className="h-6 w-6" aria-hidden="true" />
        </a>

        {/* Прогрессбар слайдера в виде триколора (под слайдером для темы Tricolor) */}
        {isTricolor && (
          <div className="absolute inset-x-0 bottom-0 z-30 h-1.5 w-full bg-black/40 overflow-hidden">
            <div
              className="h-full transition-all duration-75 ease-linear"
              style={{
                width: `${slideProgress}%`,
                backgroundImage:
                  'linear-gradient(90deg, #FFFFFF 0 33.3%, #1447E6 33.3% 66.6%, #D92D20 66.6%)',
              }}
            />
          </div>
        )}
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
            {slide.showBadge !== false && (slide.badge || isBoltStyle) && (
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

            {(slide.primaryBtn || slide.secondaryBtn || slide.tertiaryBtn) && (
              <div className="mt-8 flex flex-wrap gap-3 sm:gap-4 items-center">
                {slide.primaryBtn && (
                  slide.primaryBtn.isExternal ? (
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
                  )
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
            )}
          </div>

          {/* Right Column: Visual Showcase */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-end">
            {slide.rightContent}
          </div>
        </div>

        {/* Slider Controls & Progress Indicators (Optional via showControls checkbox in Admin) */}
        {showControls && (
          <div className={`mt-8 pt-4 border-t ${isBoltStyle ? 'border-white/15' : 'border-slate-200/80'} flex flex-wrap items-center justify-center gap-2`}>
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
        )}

        {/* Точки пагинации по центру внизу */}
        {activeSlides.length > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2.5">
            {activeSlides.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => goToSlide(idx)}
                aria-label={`Слайд ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentSlide === idx
                    ? 'w-8 bg-[#0A2540]'
                    : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
