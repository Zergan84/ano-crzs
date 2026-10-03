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

export default function HomePage() {
  const recentSpecialists = SPECIALISTS_DATA.slice(0, 5);
  const latestNews = NEWS_DATA.slice(0, 3);
  const upcomingEvents = EVENTS_DATA.slice(0, 3);
  const featuredDocs = DOCUMENTS_DATA.slice(0, 4);

  return (
    <div className="space-y-12 pb-16">
      
      {/* 1. HERO SECTION: Clean White Institutional Banner with Script-Generated Guilloche */}
      <section className="bg-white text-slate-900 py-12 lg:py-16 border-b border-slate-200 relative overflow-hidden">
        {/* Parametric Script-Generated Guilloche Background Curves */}
        <GuillochePattern variant="full" theme="light" opacity={1.15} />

        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold uppercase tracking-wider mb-4">
                <span className="w-2 h-2 rounded-full bg-red-600 inline-block animate-pulse"></span>
                Официальный отраслевой портал
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">
                Развитие стандартов, экспертных компетенций и технологий зимнего спорта в России
              </h1>

              <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                АНО «ЦРЗС» осуществляет профессиональную аттестацию специалистов, разработку отраслевых стандартов безопасности горнолыжных комплексов, научно-методическое сопровождение и внедрение современных спортивно-инженерных технологий.
              </p>

              <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
                <Link
                  href="/specialists"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-[#0A2540] hover:bg-[#123962] text-white font-semibold text-sm transition-all shadow-sm hover:shadow"
                >
                  <Users className="w-4 h-4 text-blue-300" />
                  <span>Единый Реестр специалистов</span>
                </Link>

                <Link
                  href="/documents"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-sm border border-slate-300 transition-colors"
                >
                  <FileText className="w-4 h-4 text-slate-500" />
                  <span>Нормативная база и стандарты</span>
                </Link>

                <Link
                  href="/education"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-white hover:bg-slate-50 text-slate-700 font-medium text-sm border border-slate-300 transition-colors"
                >
                  <GraduationCap className="w-4 h-4 text-blue-700" />
                  <span>Программы аттестации</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative max-w-sm w-full">
                {/* Official specialist photo showcase */}
                <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 bg-white">
                  <Image
                    src="/hero-specialist.jpg"
                    alt="Аттестованный специалист АНО ЦЗСТ"
                    width={768}
                    height={1024}
                    className="w-full h-auto object-cover max-h-[460px] sm:max-h-[500px]"
                    priority
                  />
                  {/* Subtle gradient vignette at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floating verification badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-white/60 shadow-lg flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        Аттестованный специалист
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Единый Реестр инструкторов и экспертов
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Registry Search Bar Strip inside Hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="bg-slate-50 p-4 sm:p-5 rounded-lg border border-slate-200 shadow-xs text-slate-900">
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
      </section>

      {/* 2. STATISTICAL INDICATORS BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {ORGANIZATION.stats.map((stat, idx) => (
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

      {/* 3. OFFICIAL NOTICE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

      {/* 4. SIX CORE DIRECTIONS OF ACTIVITY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          {ORGANIZATION.directions.map((dir) => (
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
                  {dir.topics.map((t, idx) => (
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

      {/* 5. SPECIALISTS REGISTRY PREVIEW & VERIFICATION TEASER */}
      <section className="bg-slate-100/80 py-10 border-y border-slate-200 relative overflow-hidden">
        {/* Subtle security wave curves */}
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

          {/* Table Container */}
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
                {recentSpecialists.map((sp) => (
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

      {/* 6. NEWS & UPCOMING EVENTS SPLIT GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Official News & Press Releases (7 cols) */}
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
              {latestNews.map((news) => (
                <article
                  key={news.id}
                  className="bg-white p-4 rounded-md border border-slate-200 hover:border-slate-300 transition-shadow hover:shadow-2xs"
                >
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-1.5">
                    <span className="font-semibold text-blue-800 bg-blue-50 px-2 py-0.5 rounded">
                      {news.category}
                    </span>
                    <span>•</span>
                    <span>{news.date}</span>
                    {news.pressReleaseNumber && (
                      <>
                        <span>•</span>
                        <span className="font-mono text-slate-400">{news.pressReleaseNumber}</span>
                      </>
                    )}
                  </div>

                  <h3 className="font-bold text-sm sm:text-base text-slate-900 leading-snug hover:text-blue-800 transition-colors">
                    <Link href={`/news#${news.slug}`}>
                      {news.title}
                    </Link>
                  </h3>

                  <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {news.summary}
                  </p>
                </article>
              ))}
            </div>
          </div>

          {/* Right Column: Upcoming Seminars & Events Calendar (5 cols) */}
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
              {upcomingEvents.map((evt) => (
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

      {/* 7. NORMATIVE AND METHODOLOGICAL DOCUMENTS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            {featuredDocs.map((doc) => (
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

      {/* 8. COOPERATION & INSTITUTIONAL PARTNERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100 rounded-lg p-6 border border-slate-200 text-center">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
            Отраслевое научно-методическое и межрегиональное взаимодействие
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-medium text-slate-700">
            <div className="p-3 bg-white rounded border border-slate-200">
              Региональные спортивные федерации и союзы
            </div>
            <div className="p-3 bg-white rounded border border-slate-200">
              Горнолыжные комплексы и курорты РФ
            </div>
            <div className="p-3 bg-white rounded border border-slate-200">
              Профильные кафедры спортивных вузов
            </div>
            <div className="p-3 bg-white rounded border border-slate-200">
              Службы спасения и противолавинной защиты
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
