import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ORGANIZATION } from '@/data/organization';
import { ShieldCheck, Target, Award, Users, BookOpen, FileCheck, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Об организации — АНО «ЦРЗС»',
  description: 'История создания, уставные цели, миссия и правовой статус АНО «Центр развития зимнего спорта, современных спортивных технологий и туризма».',
};

export default function AboutPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: 'Об организации' }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Page Header */}
        <div className="border-b border-slate-200 pb-5">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-800">
            Официальный статус и правовые основы
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Об организации: АНО «ЦРЗС»
          </h1>
          <p className="mt-2 text-slate-600 text-sm max-w-3xl leading-relaxed">
            Автономная некоммерческая организация «Центр развития зимнего спорта, современных спортивных технологий и туризма» создана в 2012 году для консолидации экспертного потенциала, создания единых профессиональных стандартов и содействия развитию индустрии зимних видов спорта в Российской Федерации.
          </p>
        </div>

        {/* Section 1: Mission and Key Objectives */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-md border border-slate-200 shadow-2xs">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-blue-700" />
                <span>Уставные цели и предмет деятельности</span>
              </h2>
              <div className="space-y-3 text-slate-700 text-sm leading-relaxed">
                <p>
                  Деятельность Центра направлена на удовлетворение общественных потребностей в области физической культуры, спорта и туризма, повышение уровня безопасности спортивных объектов и развитие методического потенциала тренерско-инструкторских кадров.
                </p>
                <p>
                  В соответствии с Уставом, зарегистрированным Министерством юстиции РФ, ключевыми задачами организации являются:
                </p>
                <ul className="space-y-2 mt-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Разработка и практическое внедрение научно обоснованных отраслевых регламентов, стандартов маркировки трасс и требований к безопасности зон катания.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Создание и администрирование публичного Единого реестра аттестованных инструкторов, тренеров и судей зимних видов спорта.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Организация и проведение многоуровневых квалификационных курсов, всероссийских методических семинаров и аттестационных экзаменов.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Апробация и трансфер инновационных спортивных технологий: телеметрии, цифрового видеоанализа биомеханики, мониторинга снеголедовой обстановки.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Экспертная оценка проектов развития всесезонных спортивно-туристских комплексов и горнолыжной инфраструктуры в субъектах РФ.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-md border border-slate-200 shadow-2xs">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
                <ShieldCheck className="w-5 h-5 text-blue-700" />
                <span>Принципы деятельности</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-slate-50 rounded border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-1">Научная обоснованность</h3>
                  <p className="text-slate-600">Все образовательные программы опираются на биомеханику, физиологию спорта и практический опыт ведущих тренеров страны.</p>
                </div>
                <div className="p-3 bg-slate-50 rounded border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-1">Публичная открытость</h3>
                  <p className="text-slate-600">Статус любого специалиста проверяется в открытом Едином Реестре по уникальному регистрационному номеру.</p>
                </div>
                <div className="p-3 bg-slate-50 rounded border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-1">Приоритет безопасности</h3>
                  <p className="text-slate-600">Снижение детского и взрослого травматизма на снежных трассах через внедрение международных и национальных регламентов.</p>
                </div>
                <div className="p-3 bg-slate-50 rounded border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-1">Межрегиональная интеграция</h3>
                  <p className="text-slate-600">Сотрудничество с курортами от Кавказа и Северо-Запада до Сибири, Алтая и Сахалина.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Legal Credentials Card */}
          <div className="space-y-6">
            <div className="bg-slate-900 text-white p-6 rounded-md shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-blue-300 border-b border-slate-800 pb-2 mb-4">
                Юридические реквизиты
              </h3>
              <dl className="space-y-2 text-xs">
                <div>
                  <dt className="text-slate-400">Полное наименование:</dt>
                  <dd className="font-semibold text-slate-200 mt-0.5 leading-snug">{ORGANIZATION.fullName}</dd>
                </div>
                <div className="pt-2 border-t border-slate-800">
                  <dt className="text-slate-400">Сокращенное наименование:</dt>
                  <dd className="font-mono font-bold text-blue-400">{ORGANIZATION.shortName}</dd>
                </div>
                <div className="pt-2 border-t border-slate-800">
                  <dt className="text-slate-400">ОГРН:</dt>
                  <dd className="font-mono text-slate-200">{ORGANIZATION.ogrn}</dd>
                </div>
                <div className="pt-2 border-t border-slate-800">
                  <dt className="text-slate-400">ИНН / КПП:</dt>
                  <dd className="font-mono text-slate-200">{ORGANIZATION.inn} / {ORGANIZATION.kpp}</dd>
                </div>
                <div className="pt-2 border-t border-slate-800">
                  <dt className="text-slate-400">ОКПО:</dt>
                  <dd className="font-mono text-slate-200">{ORGANIZATION.okpo}</dd>
                </div>
                <div className="pt-2 border-t border-slate-800">
                  <dt className="text-slate-400">Юридический адрес:</dt>
                  <dd className="text-slate-300 mt-0.5">{ORGANIZATION.legalAddress}</dd>
                </div>
              </dl>

              <div className="mt-6 pt-4 border-t border-slate-800">
                <Link
                  href="/documents?cat=Учредительные+документы"
                  className="w-full text-center block py-2 px-3 bg-blue-700 hover:bg-blue-600 text-white rounded font-medium text-xs transition-colors"
                >
                  Свидетельства и Устав в PDF →
                </Link>
              </div>
            </div>

            {/* Quick Links inside About */}
            <div className="bg-white p-5 rounded-md border border-slate-200 text-xs space-y-3">
              <h4 className="font-bold text-slate-900 uppercase tracking-wide">Разделы об организации</h4>
              <ul className="space-y-2 text-slate-700">
                <li>
                  <Link href="/about/structure" className="hover:text-blue-900 font-medium flex items-center justify-between">
                    <span>Органы управления и Правление</span>
                    <span>→</span>
                  </Link>
                </li>
                <li>
                  <Link href="/activities" className="hover:text-blue-900 font-medium flex items-center justify-between">
                    <span>Направления деятельности</span>
                    <span>→</span>
                  </Link>
                </li>
                <li>
                  <Link href="/documents" className="hover:text-blue-900 font-medium flex items-center justify-between">
                    <span>Годовые отчеты и публикации</span>
                    <span>→</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
