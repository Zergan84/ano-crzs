import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ORGANIZATION } from '@/data/organization';
import { 
  ShieldCheck, 
  GraduationCap, 
  Cpu, 
  AlertTriangle, 
  Compass, 
  BookOpen, 
  ArrowRight,
  FileCheck,
  CheckCircle2
} from 'lucide-react';

export const metadata = {
  title: 'Направления деятельности — АНО «ЦРЗС»',
  description: 'Ключевые направления уставной деятельности АНО «ЦРЗС»: стандартизация трасс, аттестация инструкторов, цифровые спортивные технологии, горная безопасность и туризм.',
};

export default function ActivitiesPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: 'Направления деятельности' }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* Header */}
        <div className="border-b border-slate-200 pb-5">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-800">
            Уставные программы
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Направления профессиональной деятельности Центра
          </h1>
          <p className="mt-2 text-slate-600 text-sm max-w-3xl leading-relaxed">
            В соответствии с Уставом АНО «ЦРЗС» ведет системную работу по шести стратегическим направлениям, направленным на повышение качества подготовки специалистов, безопасность спортивной инфраструктуры и технологическую независимость отрасли.
          </p>
        </div>

        {/* 6 Sections Detailed */}
        <div className="space-y-10">
          
          {/* Direction 1: Standards */}
          <section id="standards" className="bg-white p-6 sm:p-8 rounded-md border border-slate-200 shadow-2xs">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded bg-blue-100 text-blue-900 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-3 flex-1">
                <span className="text-xs font-bold text-blue-800 uppercase tracking-wide">
                  Направление 01
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Стандартизация и отраслевые регламенты зимнего спорта
                </h2>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Обеспечение безопасной и качественной эксплуатации горнолыжных центров требует внедрения единых требований. Центр разрабатывает и гармонизирует стандарты категорирования трасс, маркировки зон катания, установки пассивных систем улавливания и информационных указателей.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs text-slate-700">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Разработка стандартов сложности трасс (зеленые, синие, красные, черные) с учетом уклона и безопасности выкатов.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Критерии паспортизации и предсезонного аудита спортивных объектов.</span>
                  </div>
                </div>
                <div className="pt-3">
                  <Link href="/documents?cat=Регламенты+и+стандарты" className="text-xs font-semibold text-blue-800 hover:underline">
                    Смотреть утвержденные регламенты в архиве →
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Direction 2: Cadres & Certification */}
          <section id="specialists" className="bg-white p-6 sm:p-8 rounded-md border border-slate-200 shadow-2xs">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded bg-blue-100 text-blue-900 flex items-center justify-center shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="space-y-3 flex-1">
                <span className="text-xs font-bold text-blue-800 uppercase tracking-wide">
                  Направление 02
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Подготовка, аттестация и ведение Реестра инструкторских кадров
                </h2>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Центр реализует ступенчатую систему квалификационной подготовки инструкторов по горнолыжному спорту и сноуборду. Программы категорий С (начальная), В (продвинутая) и А (экспертная/лекторская) соответствуют высшим методическим стандартам. Все прошедшие аттестацию специалисты вносятся в публичный реестр.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs text-slate-700">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Проведение региональных выездных аттестаций и теоретико-практических экзаменов.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Публичный контроль статуса свидетельств для администраций горнолыжных комплексов.</span>
                  </div>
                </div>
                <div className="pt-3 flex gap-4">
                  <Link href="/specialists" className="text-xs font-semibold text-blue-800 hover:underline">
                    Перейти к поиску в Едином Реестре →
                  </Link>
                  <Link href="/education" className="text-xs font-semibold text-slate-600 hover:underline">
                    Учебные программы →
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Direction 3: Sports Technologies */}
          <section id="tech" className="bg-white p-6 sm:p-8 rounded-md border border-slate-200 shadow-2xs">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded bg-blue-100 text-blue-900 flex items-center justify-center shrink-0">
                <Cpu className="w-6 h-6" />
              </div>
              <div className="space-y-3 flex-1">
                <span className="text-xs font-bold text-blue-800 uppercase tracking-wide">
                  Направление 03
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Современные технологии, биомеханика и цифровая среда
                </h2>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Лаборатория спортивных технологий Центра занимается адаптацией и внедрением инженерных решений для тренировочного процесса и мониторинга: высокоточный хронометраж, оптический трекинг, датчики давления в ботинках для анализа углов закантовки, а также геоинформационное моделирование снежных склонов.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs text-slate-700">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Биомеханический видеоанализ фаз поворота для повышения мастерства спортсменов.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Датчики мониторинга глубины и плотности снега для эффективной работы ратраков.</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Direction 4: Safety & Avalanche */}
          <section id="safety" className="bg-white p-6 sm:p-8 rounded-md border border-slate-200 shadow-2xs">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="space-y-3 flex-1">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">
                  Направление 04
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Безопасность на горнолыжных трассах и противолавинный мониторинг
                </h2>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Комиссия горной безопасности разрабатывает типовые планы ликвидации аварийных ситуаций, регламенты спасательных работ при отказе канатных дорог и методики мониторинга лавиноопасных очагов вблизи горнолыжной инфраструктуры.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs text-slate-700">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Специализированные курсы первой помощи и транспортировки пострадавших в горах.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Взаимодействие со спасательными подразделениями и курортными патрулями.</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Direction 5: Tourism */}
          <section id="tourism" className="bg-white p-6 sm:p-8 rounded-md border border-slate-200 shadow-2xs">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded bg-blue-100 text-blue-900 flex items-center justify-center shrink-0">
                <Compass className="w-6 h-6" />
              </div>
              <div className="space-y-3 flex-1">
                <span className="text-xs font-bold text-blue-800 uppercase tracking-wide">
                  Направление 05
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Развитие всесезонного спортивно-оздоровительного туризма
                </h2>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Содействие горным курортам в переходе на круглогодичный формат работы: проектирование летних хайкинговых и маунтинбайк-маршрутов, развитие ски-туринга, подготовка гидов-инструкторов для активных рекреационных программ.
                </p>
              </div>
            </div>
          </section>

          {/* Direction 6: Methodology & Science */}
          <section id="methodology" className="bg-white p-6 sm:p-8 rounded-md border border-slate-200 shadow-2xs">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded bg-blue-100 text-blue-900 flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="space-y-3 flex-1">
                <span className="text-xs font-bold text-blue-800 uppercase tracking-wide">
                  Направление 06
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Научно-методическая и экспертно-аналитическая деятельность
                </h2>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Издание учебных пособий, проведение ежегодных научно-практических конференций с привлечением ученых ведущих физкультурных вузов, экспертиза нормативных правовых актов в области зимнего спорта.
                </p>
                <div className="pt-2">
                  <Link href="/documents?cat=Методические+материалы" className="text-xs font-semibold text-blue-800 hover:underline">
                    Библиотека методических пособий →
                  </Link>
                </div>
              </div>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
