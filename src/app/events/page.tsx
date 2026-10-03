'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { EVENTS_DATA } from '@/data/events';
import { 
  Calendar, 
  MapPin, 
  Users, 
  FileText, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  Filter,
  Download
} from 'lucide-react';

export default function EventsPage() {
  const [selectedType, setSelectedType] = useState<string>('Все');
  const [selectedStatus, setSelectedStatus] = useState<string>('Все');

  const types = ['Все', 'Всероссийский семинар', 'Квалификационный курс', 'Конференция', 'Судейский сбор', 'Мастер-класс'];
  const statuses = ['Все', 'Открыта регистрация', 'Идет прием заявок', 'Завершено'];

  const filteredEvents = useMemo(() => {
    return EVENTS_DATA.filter((evt) => {
      const matchType = selectedType === 'Все' || evt.type === selectedType;
      const matchStatus = selectedStatus === 'Все' || evt.status === selectedStatus;
      return matchType && matchStatus;
    });
  }, [selectedType, selectedStatus]);

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Календарь мероприятий' }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Header */}
        <div className="border-b border-slate-200 pb-5">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-800">
            План спортивно-методических мероприятий
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Календарь семинаров, курсов и конференций АНО «ЦРЗС»
          </h1>
          <p className="mt-2 text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed">
            Утвержденный план мероприятий на спортивный сезон 2025/2026 годов. Включает выездные аттестационные комиссии, судейские коллегии, конференции и практические сборы по горной безопасности.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-md border border-slate-200 shadow-2xs flex flex-wrap gap-4 items-center justify-between text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-semibold text-slate-700 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              Тип мероприятия:
            </span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="p-1.5 bg-slate-50 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
            >
              {types.map(t => <option key={t} value={t}>{t}</option>)}
            </select>

            <span className="font-semibold text-slate-700 ml-2">Статус:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="p-1.5 bg-slate-50 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
            >
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="text-slate-500">
            Отображено: <strong>{filteredEvents.length}</strong> мероприятий
          </div>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((evt) => (
            <div 
              key={evt.id} 
              id={evt.id}
              className="bg-white rounded-md border border-slate-200 p-5 shadow-2xs flex flex-col justify-between hover:border-blue-400 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                    {evt.type}
                  </span>
                  <span className={`px-2 py-0.5 rounded font-semibold text-[11px] ${
                    evt.status === 'Открыта регистрация'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}>
                    {evt.status}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 leading-snug">
                  {evt.title}
                </h3>

                <div className="mt-3 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-700 shrink-0" />
                    <span className="font-mono font-medium text-slate-800">
                      {evt.startDate} — {evt.endDate}
                    </span>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>{evt.location} ({evt.region})</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span><strong>Аудитория:</strong> {evt.targetAudience}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
                <div>
                  {evt.seatsTotal && (
                    <span className="text-[11px] text-slate-500">
                      Свободно: <strong className="text-emerald-700 font-semibold">{evt.seatsLeft}</strong> из {evt.seatsTotal} мест
                    </span>
                  )}
                  {evt.documentRef && (
                    <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <FileText className="w-3 h-3" />
                      <span>{evt.documentRef}</span>
                    </div>
                  )}
                </div>

                <Link
                  href={`/membership?event=${encodeURIComponent(evt.title)}`}
                  className="px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded font-medium text-center transition-colors"
                >
                  Подать заявку
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
