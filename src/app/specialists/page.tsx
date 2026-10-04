'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SPECIALISTS_DATA } from '@/data/specialists';
import { useSiteContent } from '@/lib/content';
import { Specialist } from '@/types';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  Archive, 
  X, 
  ShieldCheck, 
  Award, 
  FileCheck, 
  Download, 
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { GuillochePattern } from '@/components/ui/GuillochePattern';

function SpecialistsRegistryContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const { content } = useSiteContent();

  const specialistsList = (content?.specialists?.items && content.specialists.items.length > 0)
    ? (content.specialists.items as Specialist[])
    : SPECIALISTS_DATA;

  const [query, setQuery] = useState(initialQuery);
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('Все');
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [selectedStatus, setSelectedStatus] = useState<string>('Все');
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null);

  const disciplines = ['Все', 'Горнолыжный спорт', 'Сноуборд', 'Фристайл', 'Беговые лыжи', 'Ски-альпинизм', 'Инструкторская деятельность'];
  const categories = [
    'Все',
    'Категория А (Высшая)',
    'Категория B (Первая)',
    'Категория C (Вторая)',
    'Инструктор начального уровня',
    'Спортивный судья I категории',
    'Всероссийская судейская категория'
  ];
  const statuses = ['Все', 'Действителен', 'На продлении', 'Архив'];

  const filteredSpecialists = useMemo(() => {
    return specialistsList.filter((sp) => {
      const matchQuery = 
        !query || 
        sp.fullName.toLowerCase().includes(query.toLowerCase()) ||
        sp.regNumber.toLowerCase().includes(query.toLowerCase()) ||
        sp.region.toLowerCase().includes(query.toLowerCase()) ||
        (sp.workplace && sp.workplace.toLowerCase().includes(query.toLowerCase()));

      const matchDiscipline = selectedDiscipline === 'Все' || sp.discipline === selectedDiscipline;
      const matchCategory = selectedCategory === 'Все' || sp.qualificationCategory === selectedCategory;
      const matchStatus = selectedStatus === 'Все' || sp.status === selectedStatus;

      return matchQuery && matchDiscipline && matchCategory && matchStatus;
    });
  }, [query, selectedDiscipline, selectedCategory, selectedStatus]);

  const resetFilters = () => {
    setQuery('');
    setSelectedDiscipline('Все');
    setSelectedCategory('Все');
    setSelectedStatus('Все');
  };

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Единый реестр аттестованных специалистов' }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Header */}
        <div className="border-b border-slate-200 pb-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-800">
                <ShieldCheck className="w-4 h-4 text-blue-700" />
                <span>Официальный публичный верификатор</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                Единый реестр аттестованных специалистов и инструкторов
              </h1>
              <p className="mt-2 text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed">
                Реестр ведется АНО «ЦРЗС» в целях подтверждения легитимности квалификации тренеров, инструкторов по горнолыжному спорту и сноуборду, а также спортивных судей в соответствии с отраслевыми стандартами РФ.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-3 rounded-md text-xs text-blue-900 shrink-0">
              <p className="font-semibold">Всего в базе: {specialistsList.length} записей</p>
              <p className="text-[11px] text-blue-700 mt-0.5">Данные синхронизированы: Сезон 2025/2026</p>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-5 rounded-md border border-slate-200 shadow-2xs space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск по ФИО, номеру свидетельства (напр. RU-ЦРЗС-...), региону или месту работы..."
                className="w-full pl-9 pr-8 py-2 text-sm bg-slate-50 border border-slate-300 rounded focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {query && (
                <button 
                  onClick={() => setQuery('')}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Reset Button */}
            {(query || selectedDiscipline !== 'Все' || selectedCategory !== 'Все' || selectedStatus !== 'Все') && (
              <button
                onClick={resetFilters}
                className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-red-700 border border-slate-300 rounded hover:bg-slate-50 transition-colors shrink-0"
              >
                Сбросить фильтры
              </button>
            )}
          </div>

          {/* Facet Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Вид спорта / дисциплина:</label>
              <select
                value={selectedDiscipline}
                onChange={(e) => setSelectedDiscipline(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
              >
                {disciplines.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Квалификационная категория:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Статус свидетельства:</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
              >
                {statuses.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Найдено специалистов: <strong className="text-slate-800">{filteredSpecialists.length}</strong></span>
          <span className="text-[11px]">Кликните по строке для просмотра электронного подтверждения</span>
        </div>

        {/* Table of Specialists */}
        <div className="bg-white rounded-md border border-slate-200 overflow-x-auto shadow-2xs">
          <table className="official-table">
            <thead>
              <tr>
                <th>Рег. номер</th>
                <th>ФИО специалиста</th>
                <th>Дисциплина</th>
                <th>Квалификационная категория</th>
                <th>Субъект РФ / Организация</th>
                <th>Срок действия</th>
                <th>Статус</th>
                <th className="text-right">Подтверждение</th>
              </tr>
            </thead>
            <tbody>
              {filteredSpecialists.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-slate-500 text-sm">
                    По заданным критериям поиска специалистов не найдено. Попробуйте изменить параметры запроса.
                  </td>
                </tr>
              ) : (
                filteredSpecialists.map((sp) => (
                  <tr 
                    key={sp.id} 
                    onClick={() => setSelectedSpecialist(sp)}
                    className="cursor-pointer hover:bg-blue-50/50 transition-colors"
                  >
                    <td className="font-mono text-xs font-bold text-blue-900 whitespace-nowrap">
                      {sp.regNumber}
                    </td>
                    <td>
                      <div className="font-semibold text-slate-900">{sp.fullName}</div>
                      {sp.sportsRank && (
                        <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <Award className="w-3 h-3 text-amber-600 shrink-0" />
                          <span>{sp.sportsRank}</span>
                        </div>
                      )}
                    </td>
                    <td className="text-xs text-slate-800 whitespace-nowrap">
                      {sp.discipline}
                    </td>
                    <td>
                      <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-800 border border-slate-200">
                        {sp.qualificationCategory}
                      </span>
                    </td>
                    <td className="text-xs text-slate-600">
                      <div>{sp.region}</div>
                      {sp.workplace && <div className="text-[11px] text-slate-400">{sp.workplace}</div>}
                    </td>
                    <td className="text-xs font-mono text-slate-700 whitespace-nowrap">
                      до {sp.validUntil}
                    </td>
                    <td className="whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold ${
                        sp.status === 'Действителен'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : sp.status === 'На продлении'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}>
                        {sp.status === 'Действителен' && <CheckCircle2 className="w-3 h-3" />}
                        {sp.status === 'На продлении' && <Clock className="w-3 h-3" />}
                        {sp.status === 'Архив' && <Archive className="w-3 h-3" />}
                        {sp.status}
                      </span>
                    </td>
                    <td className="text-right whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSpecialist(sp);
                        }}
                        className="text-xs font-semibold text-blue-800 hover:text-blue-900 bg-blue-50 px-2.5 py-1 rounded border border-blue-200 hover:bg-blue-100 transition-colors"
                      >
                        Верификация →
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Official Verification Modal */}
        {selectedSpecialist && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-xl w-full border border-slate-300 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
              
              {/* Modal Header */}
              <div className="bg-[#0A2540] text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <div>
                    <h3 className="text-sm font-bold tracking-wide">
                      Электронная выписка из Единого Реестра
                    </h3>
                    <p className="text-[11px] text-slate-300">АНО «ЦРЗС» • Официальное подтверждение</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSpecialist(null)}
                  className="text-slate-300 hover:text-white p-1 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body / Certificate Styling */}
              <div className="p-6 space-y-4 text-xs bg-gradient-to-b from-slate-50 to-white">
                <div className="border-2 border-dashed border-blue-300 rounded p-5 bg-white space-y-3 relative overflow-hidden shadow-2xs">
                  {/* Security Guilloche Watermark */}
                  <GuillochePattern variant="full" theme="light" opacity={0.5} />
                  <div className="relative z-10 space-y-3">
                    <div className="flex justify-between items-start border-b border-slate-100 pb-2">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Регистрационный номер свидетельства</span>
                        <span className="font-mono text-sm font-bold text-blue-900">{selectedSpecialist.regNumber}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        {selectedSpecialist.status}
                      </span>
                    </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">ФИО аттестованного лица</span>
                    <span className="text-base font-bold text-slate-900 block">{selectedSpecialist.fullName}</span>
                    {selectedSpecialist.sportsRank && (
                      <span className="text-slate-600 font-medium">{selectedSpecialist.sportsRank}</span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Дисциплина</span>
                      <span className="font-semibold text-slate-800">{selectedSpecialist.discipline}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Квалификационная категория</span>
                      <span className="font-semibold text-blue-900">{selectedSpecialist.qualificationCategory}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Субъект РФ</span>
                      <span className="text-slate-700">{selectedSpecialist.region}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Срок действия свидетельства</span>
                      <span className="font-mono font-semibold text-slate-800">{selectedSpecialist.certDate} — {selectedSpecialist.validUntil}</span>
                    </div>
                  </div>

                  {selectedSpecialist.workplace && (
                    <div className="pt-2 border-t border-slate-100">
                      <span className="text-[10px] text-slate-400 block">Место основной профессиональной деятельности</span>
                      <span className="text-slate-700">{selectedSpecialist.workplace}</span>
                    </div>
                  )}

                  {/* Stamp / Verification footer inside certificate */}
                  <div className="pt-3 border-t-2 border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                    <div>
                      <p>Уполномоченный орган аттестации: <strong>АНО «ЦРЗС»</strong></p>
                      <p>Сведения внесены в информационную систему учета кадров</p>
                    </div>
                    <div className="w-12 h-12 rounded-full border-2 border-blue-600/30 flex items-center justify-center text-blue-800 font-bold text-[8px] text-center leading-tight">
                      ЭЦП ВЕРНА
                    </div>
                  </div>
                </div>
              </div>

                <p className="text-[11px] text-slate-500 text-center">
                  Настоящая выписка сформирована в режиме реального времени на основании официальной базы данных АНО «ЦРЗС».
                </p>
              </div>

              {/* Modal Actions */}
              <div className="bg-slate-100 p-3 border-t border-slate-200 flex justify-end gap-2 text-xs">
                <button
                  onClick={() => setSelectedSpecialist(null)}
                  className="px-4 py-2 border border-slate-300 rounded text-slate-700 hover:bg-white font-medium"
                >
                  Закрыть
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded font-medium inline-flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Распечатать выписку</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function SpecialistsPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto p-10 text-center text-sm text-slate-500">Загрузка данных Единого Реестра...</div>}>
      <SpecialistsRegistryContent />
    </Suspense>
  );
}
