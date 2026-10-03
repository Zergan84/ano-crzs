import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ORGANIZATION } from '@/data/organization';
import { Phone, Mail, MapPin, Clock, ShieldCheck, FileCheck, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A192F] text-slate-300 border-t-4 border-blue-700">
      {/* Upper Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 text-xs">
          
          {/* Column 1: Organization Identity & Legal Status */}
          <div className="space-y-4">
            <div className="space-y-3">
              <Image
                src="/logo.png"
                alt="АНО ЦЗСТ — Winter Sports Technologies"
                width={220}
                height={35}
                className="h-9 w-auto object-contain"
              />
              <div>
                <span className="font-bold text-white text-sm tracking-wide block">
                  {ORGANIZATION.shortName}
                </span>
                <span className="text-[11px] text-slate-400">
                  Автономная некоммерческая организация
                </span>
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed text-[12px]">
              {ORGANIZATION.fullName}
            </p>

            <div className="pt-2 border-t border-slate-800 space-y-1 text-slate-400 text-[11px]">
              <p>ОГРН: <span className="text-slate-300 font-mono">{ORGANIZATION.ogrn}</span></p>
              <p>ИНН: <span className="text-slate-300 font-mono">{ORGANIZATION.inn}</span> / КПП: <span className="text-slate-300 font-mono">{ORGANIZATION.kpp}</span></p>
              <p>ОКПО: <span className="text-slate-300 font-mono">{ORGANIZATION.okpo}</span></p>
            </div>
          </div>

          {/* Column 2: Core Areas & Registries */}
          <div className="space-y-3">
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase border-b border-slate-800 pb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Деятельность и Реестры</span>
            </h3>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link href="/specialists" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                  Единый реестр аттестованных специалистов
                </Link>
              </li>
              <li>
                <Link href="/activities" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                  Стандартизация и безопасность трасс
                </Link>
              </li>
              <li>
                <Link href="/education" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                  Программы подготовки инструкторов (А, В, С)
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                  Судейские сборы и всероссийские семинары
                </Link>
              </li>
              <li>
                <Link href="/activities#tech" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                  Лаборатория спортивных технологий и биомеханики
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                  Фотохроника мероприятий
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Governance & Regulatory Documents */}
          <div className="space-y-3">
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase border-b border-slate-800 pb-2 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-blue-400" />
              <span>Документы и Управление</span>
            </h3>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link href="/about/structure" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                  Правление и Экспертный совет
                </Link>
              </li>
              <li>
                <Link href="/documents?cat=Учредительные+документы" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                  Устав и государственная регистрация
                </Link>
              </li>
              <li>
                <Link href="/documents?cat=Регламенты+и+стандарты" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                  Стандарты разметки трасс и регламенты
                </Link>
              </li>
              <li>
                <Link href="/documents?cat=Методические+материалы" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                  Методические комплексы и пособия
                </Link>
              </li>
              <li>
                <Link href="/documents?cat=Отчетность+и+протоколы" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                  Публичная отчетность Минюста РФ
                </Link>
              </li>
              <li>
                <Link href="/membership" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                  Порядок вступления в организацию
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Office */}
          <div className="space-y-3">
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase border-b border-slate-800 pb-2">
              Центральный офис
            </h3>
            <div className="space-y-2.5 text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{ORGANIZATION.actualAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`tel:${ORGANIZATION.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-white transition-colors">
                  {ORGANIZATION.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`mailto:${ORGANIZATION.receptionEmail}`} className="hover:text-white transition-colors">
                  {ORGANIZATION.receptionEmail}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{ORGANIZATION.workHours}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800">
              <Link 
                href="/contacts" 
                className="inline-block px-3 py-1.5 rounded bg-blue-900/60 hover:bg-blue-800 text-blue-200 text-[11px] font-medium transition-colors border border-blue-700/50"
              >
                Банковские реквизиты и схема проезда →
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Official Bottom Disclaimer Bar */}
      <div className="bg-[#050D18] py-5 px-4 sm:px-6 lg:px-8 border-t border-slate-800 text-[11px] text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div>
            <p>© 2012–2026 {ORGANIZATION.fullName}. Все права защищены.</p>
            <p className="mt-1 text-slate-600">
              Официальный сайт некоммерческой организации. Деятельность осуществляется в соответствии с законодательством Российской Федерации.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
            <Link href="/documents" className="hover:text-slate-200 transition-colors">
              Политика обработки персональных данных (152-ФЗ)
            </Link>
            <span>•</span>
            <Link href="/contacts" className="hover:text-slate-200 transition-colors">
              Электронная приемная
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
