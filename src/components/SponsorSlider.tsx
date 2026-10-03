'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Handshake } from 'lucide-react';

interface Sponsor {
  id: string;
  name: string;
  category: string;
  logo: string;
}

const SPONSORS: Sponsor[] = [
  { id: 'gazprom-neft', name: 'Газпром Нефть', category: 'Генеральный партнер', logo: '/sponsors/gazprom-neft.png' },
  { id: 'sberbank', name: 'Сбербанк', category: 'Стратегический партнер', logo: '/sponsors/sberbank.svg' },
  { id: 'fgssr', name: 'ФГССР', category: 'Отраслевая федерация', logo: '/sponsors/fgssr.jpg' },
  { id: 'krylatskoye', name: 'Крылатское', category: 'Спортивный комплекс', logo: '/sponsors/krylatskoye.png' },
  { id: 'kant', name: 'Кант', category: 'Спортивный комплекс и сеть', logo: '/sponsors/kant.png' },
  { id: 'sportmaster', name: 'Спортмастер', category: 'Партнер экипировки', logo: '/sponsors/sportmaster.png' },
  { id: 'sport-marafon', name: 'Спорт марафон', category: 'Аутдор-партнер', logo: '/sponsors/sport-marafon.png' },
  { id: 'abzakovo', name: 'Абзаково', category: 'Горнолыжный курорт', logo: '/sponsors/abzakovo.png' },
  { id: 'sector-e', name: 'Сектор Е (Шерегеш)', category: 'Горнолыжный комплекс', logo: '/sponsors/sector-e.png' },
  { id: 'solnechnaya-dolina', name: 'Солнечная долина', category: 'Горнолыжный курорт', logo: '/sponsors/solnechnaya-dolina.png' },
  { id: 'rosakhutor', name: 'Роза хутор', category: 'Горный курорт', logo: '/sponsors/rosakhutor.png' },
  { id: 'alpika', name: 'Альпика', category: 'Курорт Газпром Поляна', logo: '/sponsors/alpika.png' },
];

export function SponsorSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Manual scroll buttons
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  // Duplicate sponsors for seamless infinite CSS loop
  const displaySponsors = [...SPONSORS, ...SPONSORS, ...SPONSORS];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs relative overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#0A2540] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Handshake className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Официальные партнеры и спонсоры
              </h3>
              <p className="text-xs text-slate-500">
                Сотрудничество в рамках программ развития зимних видов спорта и спортивных технологий
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={() => scroll('left')}
              aria-label="Листать назад"
              className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all shadow-xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Листать вперед"
              className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all shadow-xs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Slider Track with Left & Right Gradient Masks */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left gradient fade */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-slate-50 to-transparent z-10" />
          
          {/* Right gradient fade */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-slate-50 to-transparent z-10" />

          {/* Smooth Scrolling Container */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-none py-2 px-1 select-none"
            style={{
              scrollBehavior: 'smooth',
            }}
          >
            <div
              className="flex gap-4 animate-sponsor-marquee"
              style={{
                animationPlayState: isPaused ? 'paused' : 'running',
              }}
            >
              {displaySponsors.map((sponsor, idx) => (
                <div
                  key={`${sponsor.id}-${idx}`}
                  className="w-[190px] sm:w-[210px] shrink-0 bg-white rounded-xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-400 transition-all duration-200 flex flex-col items-center justify-between group"
                >
                  {/* Logo Container */}
                  <div className="h-16 w-full flex items-center justify-center p-2 relative">
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      width={140}
                      height={56}
                      className="max-h-12 max-w-[130px] w-auto h-auto object-contain transition-transform duration-200 group-hover:scale-105 filter group-hover:brightness-105"
                    />
                  </div>

                  {/* Title & Category Caption */}
                  <div className="w-full text-center pt-2 border-t border-slate-100">
                    <div className="text-xs font-bold text-slate-800 group-hover:text-blue-900 transition-colors truncate">
                      {sponsor.name}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5 truncate">
                      {sponsor.category}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
