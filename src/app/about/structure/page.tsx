import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { STRUCTURE_MEMBERS } from '@/data/structure';
import { Users, Award, ShieldCheck, ChevronRight } from 'lucide-react';

export const metadata = {
  title: 'Органы управления и структура — АНО «ЦРЗС»',
  description: 'Руководство, Правление, Экспертный совет и комиссии АНО «Центр развития зимнего спорта, современных спортивных технологий и туризма».',
};

export default function StructurePage() {
  const board = STRUCTURE_MEMBERS.filter(m => m.role === 'Правление');
  const council = STRUCTURE_MEMBERS.filter(m => m.role === 'Экспертный совет');
  const commission = STRUCTURE_MEMBERS.filter(m => m.role === 'Методическая комиссия' || m.role === 'Ревизионная комиссия');

  return (
    <div>
      <Breadcrumbs items={[
        { label: 'Об организации', href: '/about' },
        { label: 'Органы управления и структура' },
      ]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Page Title */}
        <div className="border-b border-slate-200 pb-5">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-800">
            Организационная структура
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Руководство и экспертные советы Центра
          </h1>
          <p className="mt-2 text-slate-600 text-sm max-w-3xl leading-relaxed">
            Управление организацией строится на принципах коллегиальности, экспертной независимости и открытости. В состав коллегиальных органов входят ведущие специалисты спортивной отрасли, ученые и заслуженные тренеры.
          </p>
        </div>

        {/* Governance Model Overview */}
        <div className="bg-slate-100 p-6 rounded-md border border-slate-200">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">
            Система коллегиального управления АНО «ЦРЗС»
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-white p-4 rounded border border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm mb-1">Общее собрание учредителей</h3>
              <p className="text-slate-600">Высший орган управления организацией. Определяет приоритетные направления деятельности, утверждает Устав и финансовые планы.</p>
            </div>
            <div className="bg-white p-4 rounded border border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm mb-1">Правление и Генеральный директор</h3>
              <p className="text-slate-600">Постоянно действующий исполнительный орган. Осуществляет текущее оперативное руководство и реализацию программ.</p>
            </div>
            <div className="bg-white p-4 rounded border border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm mb-1">Экспертный и методический совет</h3>
              <p className="text-slate-600">Научно-методический орган. Утверждает образовательные регламенты, стандарты безопасности и критерии аттестации.</p>
            </div>
          </div>
        </div>

        {/* 1. Правление */}
        <section className="space-y-4">
          <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-700" />
              <span>Правление организации</span>
            </h2>
            <span className="text-xs text-slate-500">Исполнительное руководство</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {board.map((member) => (
              <div 
                key={member.id}
                className="bg-white p-5 rounded-md border border-slate-200 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-sm mb-3">
                    {member.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                  <h3 className="font-bold text-base text-slate-900 leading-snug">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-blue-800 mt-1">
                    {member.position}
                  </p>
                  <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
                {member.achievements && (
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-amber-800 font-medium">
                    <Award className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{member.achievements}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 2. Экспертный совет */}
        <section className="space-y-4">
          <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-700" />
              <span>Экспертный совет по технической безопасности и технологиям</span>
            </h2>
            <span className="text-xs text-slate-500">Научно-экспертный блок</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {council.map((member) => (
              <div 
                key={member.id}
                className="bg-white p-5 rounded-md border border-slate-200 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-sm mb-3">
                    {member.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                  <h3 className="font-bold text-base text-slate-900 leading-snug">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-blue-800 mt-1">
                    {member.position}
                  </p>
                  <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
                {member.achievements && (
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-amber-800 font-medium">
                    <Award className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{member.achievements}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 3. Контрольно-ревизионные и отраслевые комиссии */}
        <section className="space-y-4">
          <div className="border-b border-slate-200 pb-2">
            <h2 className="text-xl font-bold text-slate-900">
              Комиссии и контрольные органы
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {commission.map((member) => (
              <div 
                key={member.id}
                className="bg-white p-5 rounded-md border border-slate-200 shadow-2xs"
              >
                <span className="text-[11px] font-bold text-blue-900 uppercase bg-blue-50 px-2 py-0.5 rounded">
                  {member.role}
                </span>
                <h3 className="font-bold text-base text-slate-900 mt-2">
                  {member.name}
                </h3>
                <p className="text-xs font-semibold text-slate-700 mt-0.5">
                  {member.position}
                </p>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
