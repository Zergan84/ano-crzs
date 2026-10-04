'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShieldCheck, 
  Users, 
  GraduationCap, 
  FileText, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  Search, 
  Download, 
  Building2, 
  AlertCircle, 
  ExternalLink,
  ChevronRight,
  Cpu,
  Compass,
  BookOpen,
  Award
} from 'lucide-react';
import { ORGANIZATION } from '@/data/organization';
import { SPECIALISTS_DATA } from '@/data/specialists';
import { NEWS_DATA } from '@/data/news';
import { EVENTS_DATA } from '@/data/events';
import { DOCUMENTS_DATA } from '@/data/documents';
import { GuillochePattern } from '@/components/ui/GuillochePattern';
import { SponsorSlider } from '@/components/SponsorSlider';
import { HeroSlider } from '@/components/HeroSlider';
import { useSiteContent } from '@/lib/content';

export default function HomePage() {
  const { content } = useSiteContent();

  const specialists = (content?.specialists?.items && content.specialists.items.length > 0)
    ? content.specialists.items
    : SPECIALISTS_DATA;
  const news = (content?.news?.items && content.news.items.length > 0)
    ? content.news.items
    : NEWS_DATA;
  const events = (content?.events?.items && content.events.items.length > 0)
    ? content.events.items
    : EVENTS_DATA;
  const documents = (content?.documents?.items && content.documents.items.length > 0)
    ? content.documents.items
    : DOCUMENTS_DATA;
  const organization = content?.organization || ORGANIZATION;

  const recentSpecialists = specialists.slice(0, 5);
  const latestNews = news.slice(0, 3);
  const upcomingEvents = events.slice(0, 3);
  const featuredDocs = documents.slice(0, 4);

  const sectionOrder = (content as any)?.['section-order']?.order 
    || (content as any)?.sectionOrder?.order 
    || [
      'hero',
      'search',
      'stats',
      'notice',
      'directions',
      'specialists',
      'news-events',
      'documents',
      'partners',
    ];

  const customPages = (content as any)?.pages?.items || [];

  function renderSection(sectionId: string) {
    switch (sectionId) {
      case 'hero':
        return <HeroSlider key="hero" />;

      case 'search':
        return (
          <div key="search" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 relative z-20">
            <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm text-slate-900">
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-blue-100 text-blue-900 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">Проверка квалификационного статуса</h3>
                    <p className="text-xs text-slate-500">Поиск специалиста по фамилии, номеру свидетельства или региону</p>
                  </div>
                </div>

                <form action="/specialists" method="GET" className="flex-1 max-w-xl flex gap-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      name="q"
                      placeholder="Введите фамилию (например, Воронов) или номер свидетельства..."
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#0A2540] hover:bg-slate-800 text-white rounded text-xs sm:text-sm font-semibold transition-colors shrink-0"
                  >
                    Найти в реестре
                  </button>
                </form>
              </div>
            </div>
          </div>
        );

      case 'stats':
        return (
          <section key="stats" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg border border-slate-200 shadow-xs grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200">
              {(organization.stats || ORGANIZATION.stats).map((stat: any, idx: number) => (
                <div key={idx} className="p-4 sm:p-6 text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#0A2540] font-mono tracking-tight">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs text-slate-600 font-medium leading-snug">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

      case 'notice':
        return (
          <section key="notice" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-amber-50 border-l-4 border-amber-600 p-4 rounded-r-md flex items-start gap-3 shadow-2xs">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="flex-1 text-xs sm:text-sm text-amber-900">
                <span className="font-bold">Информационное извещение: </span>
                Идет прием заявок от горнолыжных комплексов и центров активного отдыха на проведение предсезонного аудита трасс и паспортизации зон катания на сезон 2025/2026. Обращения принимаются через электронную приемную.
              </div>
              <Link
                href="/contacts"
                className="text-xs font-semibold text-amber-800 hover:text-amber-950 underline whitespace-nowrap hidden sm:inline"
              >
                Подать заявку →
              </Link>
            </div>
          </section>
        );

      case 'directions':
        return (
          <section key="directions" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border-b border-slate-200 pb-3 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-blue-800">
                  Уставная деятельность
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  Ключевые направления работы Центра
                </h2>
              </div>
              <Link 
                href="/activities" 
                className="text-xs font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1 group"
              >
                <span>Подробное описание программ</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(organization.directions || ORGANIZATION.directions).map((dir: any) => (
                <div 
                  key={dir.id}
                  className="bg-white rounded-md border border-slate-200 p-5 hover:border-blue-400 hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-9 h-9 rounded bg-blue-50 text-blue-800 flex items-center justify-center font-bold text-sm mb-3">
                      {dir.id === 'standards' && <ShieldCheck className="w-5 h-5" />}
                      {dir.id === 'specialists' && <GraduationCap className="w-5 h-5" />}
                      {dir.id === 'tech' && <Cpu className="w-5 h-5" />}
                      {dir.id === 'safety' && <AlertCircle className="w-5 h-5" />}
                      {dir.id === 'tourism' && <Compass className="w-5 h-5" />}
                      {dir.id === 'methodology' && <BookOpen className="w-5 h-5" />}
                    </div>

                    <h3 className="font-bold text-base text-slate-900 leading-snug">
                      {dir.title}
                    </h3>
                    
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                      {dir.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <ul className="space-y-1">
                      {dir.topics.map((t: string, idx: number) => (
                        <li key={idx} className="text-[11px] text-slate-500 flex items-center gap-1.5">
                          <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

      case 'specialists':
        return (
          <section key="specialists" className="bg-slate-100/80 py-10 border-y border-slate-200 relative overflow-hidden">
            <GuillochePattern variant="waves" theme="light" opacity={0.65} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 mb-4 border-b border-slate-200 gap-2">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-800">
                    Публичный информационный ресурс
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                    Единый реестр аттестованных специалистов
                  </h2>
                  <p className="text-xs text-slate-600 mt-1">
                    Подтвержденный статус тренеров, инструкторов и спортивных судей с действующими свидетельствами
                  </p>
                </div>
                <Link
                  href="/specialists"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded text-xs font-semibold transition-colors"
                >
                  <span>Открыть полный реестр</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="bg-white rounded-md border border-slate-200 overflow-x-auto shadow-2xs">
                <table className="official-table">
                  <thead>
                    <tr>
                      <th>Рег. номер</th>
                      <th>ФИО специалиста</th>
                      <th>Дисциплина</th>
                      <th>Квалификация</th>
                      <th>Субъект РФ</th>
                      <th>Срок действия</th>
                      <th>Статус</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentSpecialists.map((sp: any) => (
                      <tr key={sp.id} className="transition-colors">
                        <td className="font-mono text-xs font-semibold text-blue-900">
                          {sp.regNumber}
                        </td>
                        <td className="font-semibold text-slate-900">
                          {sp.fullName}
                          {sp.sportsRank && (
                            <span className="block text-[11px] font-normal text-slate-500">
                              {sp.sportsRank}
                            </span>
                          )}
                        </td>
                        <td className="text-xs text-slate-700">
                          {sp.discipline}
                        </td>
                        <td>
                          <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-800 border border-slate-200">
                            {sp.qualificationCategory}
                          </span>
                        </td>
                        <td className="text-xs text-slate-600">
                          {sp.region}
                        </td>
                        <td className="text-xs font-mono text-slate-600">
                          до {sp.validUntil}
                        </td>
                        <td>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold ${
                            sp.status === 'Действителен'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : sp.status === 'На продлении'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}>
                            <CheckCircle2 className="w-3 h-3" />
                            {sp.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        );

      case 'news-events':
        return (
          <section key="news-events" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-4">
                <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-800">Пресс-центр</span>
                    <h2 className="text-xl font-bold text-slate-900">Новости и официальные сообщения</h2>
                  </div>
                  <Link href="/news" className="text-xs font-semibold text-blue-700 hover:text-blue-900">
                    Все публикации →
                  </Link>
                </div>

                <div className="space-y-4">
                  {latestNews.map((newsItem: any) => (
                    <article
                      key={newsItem.id}
                      className="bg-white p-4 rounded-md border border-slate-200 hover:border-slate-300 transition-shadow hover:shadow-2xs"
                    >
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-1.5">
                        <span className="font-semibold text-blue-800 bg-blue-50 px-2 py-0.5 rounded">
                          {newsItem.category}
                        </span>
                        <span>•</span>
                        <span>{newsItem.date}</span>
                        {newsItem.pressReleaseNumber && (
                          <>
                            <span>•</span>
                            <span className="font-mono text-slate-400">{newsItem.pressReleaseNumber}</span>
                          </>
                        )}
                      </div>

                      <h3 className="font-bold text-sm sm:text-base text-slate-900 leading-snug hover:text-blue-800 transition-colors">
                        <Link href={`/news#${newsItem.slug || newsItem.id}`}>
                          {newsItem.title}
                        </Link>
                      </h3>

                      <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {newsItem.summary || newsItem.excerpt}
                      </p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-800">Календарный план</span>
                    <h2 className="text-xl font-bold text-slate-900">Ближайшие мероприятия</h2>
                  </div>
                  <Link href="/events" className="text-xs font-semibold text-blue-700 hover:text-blue-900">
                    Календарь →
                  </Link>
                </div>

                <div className="space-y-3">
                  {upcomingEvents.map((evt: any) => (
                    <div 
                      key={evt.id} 
                      className="bg-white p-4 rounded-md border border-slate-200 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[11px] mb-1.5">
                          <span className="font-mono font-semibold text-blue-900">
                            {evt.startDate}
                          </span>
                          <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-200">
                            {evt.status}
                          </span>
                        </div>

                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                          {evt.title}
                        </h4>

                        <div className="mt-2 text-[11px] text-slate-500 space-y-0.5">
                          <p>📍 {evt.location}</p>
                          <p>👥 Аудитория: {evt.targetAudience}</p>
                        </div>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-[11px] text-slate-400">
                          Осталось мест: <strong className="text-slate-700">{evt.seatsLeft}</strong> из {evt.seatsTotal}
                        </span>
                        <Link
                          href={`/events#${evt.id}`}
                          className="text-blue-800 font-semibold hover:underline"
                        >
                          Регламент →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );

      case 'documents':
        return (
          <section key="documents" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <div className="border-b border-slate-200 pb-3 mb-5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-800">Нормативно-правовая база</span>
                  <h2 className="text-xl font-bold text-slate-900">Официальные стандарты, регламенты и отчетность</h2>
                </div>
                <Link href="/documents" className="text-xs font-semibold text-blue-700 hover:text-blue-900">
                  Электронный архив документов ({DOCUMENTS_DATA.length}) →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {featuredDocs.map((doc: any) => (
                  <div 
                    key={doc.id}
                    className="p-3.5 rounded border border-slate-200 bg-slate-50/60 hover:bg-slate-50 flex items-start justify-between gap-3 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded bg-red-100 text-red-700 font-bold text-xs flex items-center justify-center shrink-0">
                        PDF
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug line-clamp-2">
                          {doc.title}
                        </h4>
                        <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-500">
                          <span className="font-mono text-slate-600">№ {doc.number}</span>
                          <span>•</span>
                          <span>{doc.date}</span>
                          <span>•</span>
                          <span>{doc.fileSize}</span>
                        </div>
                      </div>
                    </div>

                    <a
                      href={`#download-${doc.id}`}
                      className="p-2 text-slate-500 hover:text-blue-900 hover:bg-white rounded transition-colors shrink-0"
                      title="Скачать официальный документ"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'partners':
        return <SponsorSlider key="partners" />;

      case 'pages':
        if (!customPages || customPages.length === 0) return null;
        return (
          <div key="pages" className="space-y-12">
            {customPages.map((pg: any) => (
              <section key={pg.id} id={pg.id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className={`grid grid-cols-1 ${pg.image ? 'md:grid-cols-2' : ''} gap-8 items-center`}>
                  {pg.image && pg.layout === 'right' && (
                    <div className="overflow-hidden rounded-xl border border-slate-200">
                      <img src={pg.image} alt={pg.heading} className="w-full h-auto object-cover max-h-96" />
                    </div>
                  )}
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-2.5 py-1 rounded">
                      {pg.label}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                      {pg.heading}
                    </h2>
                    <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                      {pg.text}
                    </p>
                    {pg.showButton && pg.buttonText && (
                      <div className="pt-2">
                        <a
                          href={pg.buttonHref || '#'}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-800 text-white font-semibold text-xs sm:text-sm hover:bg-blue-900 transition-colors shadow-sm"
                        >
                          <span>{pg.buttonText}</span>
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    )}
                  </div>
                  {pg.image && pg.layout !== 'right' && (
                    <div className="overflow-hidden rounded-xl border border-slate-200">
                      <img src={pg.image} alt={pg.heading} className="w-full h-auto object-cover max-h-96" />
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>
        );

      default:
        return null;
    }
  }

  return (
    <div className="space-y-12 pb-16">
      {sectionOrder.map((secId: string) => renderSection(secId))}
    </div>
  );
}

