import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { COURSES_DATA } from '@/data/courses';
import { 
  GraduationCap, 
  Clock, 
  CheckCircle2, 
  FileText, 
  Award, 
  Calendar,
  AlertCircle,
  HelpCircle,
  ChevronRight
} from 'lucide-react';

export const metadata = {
  title: 'Обучение и аттестация кадров — АНО «ЦРЗС»',
  description: 'Программы подготовки инструкторов по горнолыжному спорту и сноуборду, судейские семинары, курсы повышения квалификации с выдачей свидетельств установленного образца.',
};

export default function EducationPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: 'Обучение и аттестация' }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* Header */}
        <div className="border-b border-slate-200 pb-5">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-800">
            Учебно-методический центр
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Программы профессиональной подготовки и аттестации
          </h1>
          <p className="mt-2 text-slate-600 text-sm max-w-3xl leading-relaxed">
            Система непрерывного образования АНО «ЦРЗС» направлена на формирование устойчивых педагогических, технических и спасательных навыков у специалистов зимних видов спорта с последующим подтверждением квалификации и включением в Единый Реестр.
          </p>
        </div>

        {/* Level Progression Indicator */}
        <div className="bg-slate-900 text-white p-6 rounded-md shadow-xs">
          <h2 className="text-sm font-bold uppercase tracking-wider text-blue-300 mb-4">
            Ступенчатая система квалификаций инструкторского состава
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-800/80 p-4 rounded border border-slate-700">
              <span className="text-amber-400 font-bold text-sm block mb-1">Категория С</span>
              <h3 className="font-bold text-white text-sm">Инструктор начального уровня</h3>
              <p className="text-slate-300 mt-1">Обучение новичков, базовая техника поворотов, техника безопасности на учебном склоне.</p>
            </div>
            <div className="bg-slate-800/80 p-4 rounded border border-slate-700">
              <span className="text-blue-400 font-bold text-sm block mb-1">Категория В</span>
              <h3 className="font-bold text-white text-sm">Инструктор спортивной техники</h3>
              <p className="text-slate-300 mt-1">Карвинг, сложный рельеф, базовые трассы слалома, видеоанализ техники.</p>
            </div>
            <div className="bg-slate-800/80 p-4 rounded border border-slate-700">
              <span className="text-emerald-400 font-bold text-sm block mb-1">Категория А</span>
              <h3 className="font-bold text-white text-sm">Инструктор-эксперт / Лектор</h3>
              <p className="text-slate-300 mt-1">Высшее мастерство, внетрассовое катание, методология преподавания, подготовка инструкторов.</p>
            </div>
          </div>
        </div>

        {/* Detailed Course Catalog */}
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">
              Действующие образовательные программы сезона
            </h2>
            <span className="text-xs text-slate-500">Учебный план на 2025/2026</span>
          </div>

          <div className="space-y-6">
            {COURSES_DATA.map((course) => (
              <div 
                key={course.id}
                className="bg-white rounded-md border border-slate-200 p-6 shadow-2xs hover:border-blue-300 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs mb-1">
                      <span className="font-mono font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {course.code}
                      </span>
                      <span className="text-slate-500 font-medium">•</span>
                      <span className="font-semibold text-slate-700">{course.level}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                      {course.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap md:flex-col items-start md:items-end gap-2 text-xs shrink-0">
                    <span className="inline-flex items-center gap-1 font-mono text-slate-700 bg-slate-100 px-2.5 py-1 rounded">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      {course.hours} академических часов
                    </span>
                    <span className="text-slate-500">
                      Формат: <strong className="text-slate-800">{course.format}</strong>
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
                  {/* Target Audience & Certification */}
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider mb-1">
                        Требования к кандидатам:
                      </h4>
                      <p className="text-slate-600 leading-relaxed">
                        {course.targetGroup}
                      </p>
                    </div>

                    <div className="p-3 bg-blue-50/60 rounded border border-blue-100">
                      <h4 className="font-bold text-blue-900 uppercase text-[11px] tracking-wider mb-1 flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-blue-700" />
                        <span>Выдаваемый документ:</span>
                      </h4>
                      <p className="text-blue-950 font-medium leading-relaxed">
                        {course.certification}
                      </p>
                    </div>

                    <div className="text-slate-600">
                      Ближайший старт курса: <strong className="text-slate-900 font-semibold">{course.nextCohortDate}</strong>
                    </div>
                  </div>

                  {/* Curriculum Details */}
                  <div className="lg:col-span-2 space-y-2">
                    <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider">
                      Содержание учебного плана:
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                      {course.curriculum.map((topic, i) => (
                        <li key={i} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded border border-slate-100">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <span className="text-xs text-slate-500">
                    Прием документов завершается за 10 дней до начала сборов.
                  </span>
                  <Link
                    href={`/membership?course=${encodeURIComponent(course.title)}`}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded text-xs font-semibold transition-colors"
                  >
                    <span>Подать заявку на курс</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Re-certification FAQ */}
        <div className="bg-slate-100 p-6 rounded-md border border-slate-200 space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-700" />
            <span>Порядок подтверждения квалификации (переаттестация)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700 leading-relaxed">
            <div className="bg-white p-4 rounded border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-1">Срок действия свидетельства</h3>
              <p>Квалификационное свидетельство выдается сроком на 3 года. По истечении срока специалист переходит в статус «На продлении» с возможностью сдачи подтверждающего супертеста в течение 6 месяцев.</p>
            </div>
            <div className="bg-white p-4 rounded border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-1">Порядок переаттестации</h3>
              <p>Для продления категории специалист обязан предоставить справку о стаже работы в спортивной организации за прошедшие сезоны и пройти однодневный практический семинар по обновленным стандартам.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
