'use client';

import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { NEWS_DATA } from '@/data/news';
import { NewsItem } from '@/types';
import { Calendar, Tag, ChevronRight, X, Newspaper, Share2 } from 'lucide-react';

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [activeArticle, setActiveArticle] = useState<NewsItem | null>(null);

  const categories = ['Все', 'Официально', 'Мероприятия', 'Образование', 'Стандарты', 'Регионы'];

  const filteredNews = useMemo(() => {
    return NEWS_DATA.filter((item) => {
      if (selectedCategory === 'Все') return true;
      return item.category === selectedCategory;
    });
  }, [selectedCategory]);

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Пресс-центр и новости' }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Header */}
        <div className="border-b border-slate-200 pb-5">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-800">
            Официальные сообщения
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Пресс-центр АНО «ЦРЗС»
          </h1>
          <p className="mt-2 text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed">
            Публикация пресс-релизов, итогов заседаний коллегиальных органов, оперативных уведомлений для спортивных комплексов и информационных писем.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-200">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-900 text-white font-semibold'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News Feed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((news) => (
            <article
              key={news.id}
              id={news.slug}
              className="bg-white rounded-md border border-slate-200 p-5 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
                  <span className="font-semibold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    {news.category}
                  </span>
                  <span className="font-mono text-slate-400">{news.pressReleaseNumber}</span>
                </div>

                <div className="text-[11px] text-slate-500 flex items-center gap-1 mb-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{news.date}</span>
                </div>

                <h2 className="font-bold text-base text-slate-900 leading-snug">
                  {news.title}
                </h2>

                <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {news.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">{news.source}</span>
                <button
                  onClick={() => setActiveArticle(news)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-800 hover:text-blue-950"
                >
                  <span>Читать полностью</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Full Article Modal */}
        {activeArticle && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full border border-slate-300 shadow-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in duration-150">
              
              <div className="bg-slate-900 text-white p-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-blue-400" />
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Официальный релиз</span>
                    <span className="font-mono text-xs font-semibold text-slate-200">{activeArticle.pressReleaseNumber}</span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-xs text-slate-500 pb-3 border-b border-slate-100">
                  <span className="bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded">
                    {activeArticle.category}
                  </span>
                  <span>•</span>
                  <span>{activeArticle.date}</span>
                  <span>•</span>
                  <span>{activeArticle.source}</span>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  {activeArticle.title}
                </h2>

                <div className="p-3 bg-slate-50 rounded border-l-4 border-blue-700 text-xs text-slate-700 font-medium leading-relaxed italic">
                  {activeArticle.summary}
                </div>

                <div className="space-y-3 text-slate-700 leading-relaxed text-xs sm:text-sm">
                  {activeArticle.content.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-between items-center shrink-0 text-xs">
                <span className="text-[11px] text-slate-500">
                  АНО «ЦРЗС» • Все материалы открыты для цитирования со ссылкой на источник
                </span>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded font-medium"
                >
                  Закрыть
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
