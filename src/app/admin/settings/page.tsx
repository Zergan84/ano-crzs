'use client';

import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import {
  ArrowLeft,
  Settings,
  Save,
  Check,
  AlertCircle,
  Layout,
  Globe,
  FileText,
  Handshake,
  Sparkles,
} from 'lucide-react';
import { DEFAULT_SETTINGS } from '@/data/defaultContent';
import { notifyContentUpdated } from '@/lib/content';

export default function AdminSettingsPage() {
  const [data, setData] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const apiEndpoint =
        typeof window !== 'undefined' && window.location.hostname.includes('pages.dev')
          ? 'https://ano-crzs.101filmstudio.workers.dev/api/admin/content/settings'
          : '/api/admin/content/settings';

      const res = await fetch(apiEndpoint);
      if (res.ok) {
        const json = await res.json();
        if (json && typeof json === 'object') {
          setData({ ...DEFAULT_SETTINGS, ...json });
        }
      }
    } catch {}
    setLoading(false);
  }

  async function handleSave(nextData = data) {
    setSaving(true);
    setSaved(false);
    setError('');
    try {
      const apiEndpoint =
        typeof window !== 'undefined' && window.location.hostname.includes('pages.dev')
          ? 'https://ano-crzs.101filmstudio.workers.dev/api/admin/content/settings'
          : '/api/admin/content/settings';

      const res = await fetch(apiEndpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nextData),
      });

      if (res.ok) {
        setSaved(true);
        notifyContentUpdated();
        setTimeout(() => setSaved(false), 3500);
      } else {
        const err = await res.json();
        setError(err.error || 'Ошибка при сохранении настроек');
      }
    } catch {
      setError('Ошибка сети');
    }
    setSaving(false);
  }

  function handleModeSelect(mode: 'landing' | 'portal') {
    const next = { ...data, siteMode: mode };
    setData(next);
    handleSave(next);
  }

  if (loading) {
    return (
      <div className="flex h-60 items-center justify-center text-slate-500 text-sm">
        Загрузка настроек сайта...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#222] pb-5">
        <div>
          <NextLink
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Назад к дашборду</span>
          </NextLink>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wide flex items-center gap-2.5">
            <Settings className="w-7 h-7 text-amber-500" />
            <span>Настройки и режим отображения сайта</span>
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Переключение между одностраничным лендингом АНО «ЦЗСТ» и расширенным многостраничным порталом
          </p>
        </div>

        <button
          onClick={() => handleSave(data)}
          disabled={saving}
          className="flex items-center gap-2 rounded-lg bg-amber-600 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-amber-500 transition-all shadow-lg shadow-amber-950/20 disabled:opacity-50"
        >
          {saved ? <Check className="h-4 w-4 text-white" /> : <Save className={`h-4 w-4 ${saving ? 'animate-spin' : ''}`} />}
          <span>{saving ? 'Сохранение...' : saved ? 'Сохранено ✓' : 'Сохранить изменения'}</span>
        </button>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-lg bg-emerald-950/40 border border-emerald-800 p-3 text-xs text-emerald-300">
          <Check className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>
            Настройки сохранены! Активный режим сайта и состав разделов админ-панели обновлены.
          </span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-950/40 border border-red-800 p-3 text-xs text-red-300">
          <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Главный переключатель режима отображения сайта: ЛЕНДИНГ vs ПОРТАЛ */}
      <div className="rounded-xl border border-[#222] bg-[#12161f] p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-[#222] pb-3">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Режим отображения сайта</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              При выборе режима на сайте и в боковом меню админ-панели отображаются только соответствующие этому режиму блоки и общие перекрестные разделы.
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase ${
              data.siteMode === 'landing'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
            }`}
          >
            Активен: {data.siteMode === 'landing' ? 'ЛЕНДИНГ' : 'ПОРТАЛ'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Карточка режима ЛЕНДИНГ */}
          <button
            type="button"
            onClick={() => handleModeSelect('landing')}
            className={`text-left rounded-xl p-5 border-2 transition-all flex flex-col justify-between gap-4 ${
              data.siteMode === 'landing'
                ? 'border-amber-500 bg-amber-950/20 shadow-lg shadow-amber-950/20'
                : 'border-[#252d3d] bg-[#0d1118] hover:border-slate-600'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center">
                  <Layout className="w-5 h-5" />
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold uppercase ${
                    data.siteMode === 'landing'
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {data.siteMode === 'landing' ? 'Выбран по умолчанию' : 'Выбрать режим'}
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  Режим: ЛЕНДИНГ (Одностраничный сайт)
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Строгий ведомственный одностраничный лендинг АНО «ЦЗСТ» (ГОСТ-стилистика, уставные цели, 6 направлений, методология и биомеханика, взаимодействие с ведомствами, форма обращения 152-ФЗ).
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 text-[11px] text-slate-400 font-mono">
              Активные блоки: Шапка и Hero лендинга, Методология и Господдержка + перекрестные блоки (О нас, Направления, Документы, Партнёры, Контакты, Подвал)
            </div>
          </button>

          {/* Карточка режима ПОРТАЛ */}
          <button
            type="button"
            onClick={() => handleModeSelect('portal')}
            className={`text-left rounded-xl p-5 border-2 transition-all flex flex-col justify-between gap-4 ${
              data.siteMode === 'portal'
                ? 'border-blue-500 bg-blue-950/20 shadow-lg shadow-blue-950/20'
                : 'border-[#252d3d] bg-[#0d1118] hover:border-slate-600'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/40 text-blue-400 flex items-center justify-center">
                  <Globe className="w-5 h-5" />
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold uppercase ${
                    data.siteMode === 'portal'
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {data.siteMode === 'portal' ? 'Выбран сейчас' : 'Выбрать режим'}
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  Режим: ПОРТАЛ (Расширенная версия)
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Полный многостраничный отраслевой портал с Единым реестром аттестованных специалистов, проверкой удостоверений, пресс-центром, календарем мероприятий, обучением и членством.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 text-[11px] text-slate-400 font-mono">
              Активные блоки: Меню портала, Слайдер Hero, Реестр кадров, Новости, Мероприятия, Страницы + перекрестные блоки
            </div>
          </button>
        </div>
      </div>

      {/* Видимость перекрестных блоков на Лендинге */}
      {data.siteMode === 'landing' && (
        <div className="rounded-xl border border-[#222] bg-[#12161f] p-6 space-y-4">
          <h3 className="text-base font-bold text-white border-b border-[#222] pb-3">
            Перекрестные блоки на одностраничном лендинге
          </h3>
          <p className="text-xs text-slate-400">
            Блоки «О нас (Организация)», «Направления», «Контакты» и «Подвал» отображаются всегда. Дополнительно вы можете включить или скрыть на лендинге блоки «Документы» и «Партнёры / Спонсоры»:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <label className="flex items-start gap-3 p-4 rounded-xl border border-[#252d3d] bg-[#0d1118] cursor-pointer hover:border-slate-600">
              <input
                type="checkbox"
                checked={data.showDocumentsOnLanding !== false}
                onChange={(e) =>
                  setData({ ...data, showDocumentsOnLanding: e.target.checked })
                }
                className="mt-1 rounded accent-amber-500"
              />
              <div>
                <div className="flex items-center gap-1.5 text-sm font-bold text-white">
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>Показывать блок «Документы»</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Отображает карточки учредительных документов и стандартов АНО «ЦЗСТ»
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-4 rounded-xl border border-[#252d3d] bg-[#0d1118] cursor-pointer hover:border-slate-600">
              <input
                type="checkbox"
                checked={data.showPartnersOnLanding !== false}
                onChange={(e) =>
                  setData({ ...data, showPartnersOnLanding: e.target.checked })
                }
                className="mt-1 rounded accent-amber-500"
              />
              <div>
                <div className="flex items-center gap-1.5 text-sm font-bold text-white">
                  <Handshake className="w-4 h-4 text-amber-400" />
                  <span>Показывать блок «Партнёры и спонсоры»</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Отображает логотипы и карточки партнёрских организаций и курортов
                </p>
              </div>
            </label>
          </div>
        </div>
      )}

      {/* SEO & Мета-теги */}
      <div className="rounded-xl border border-[#222] bg-[#12161f] p-6 space-y-4">
        <h3 className="text-base font-bold text-white border-b border-[#222] pb-3">
          SEO и мета-данные официального профиля АНО «ЦЗСТ»
        </h3>
        <div>
          <label className="admin-label">Title страницы</label>
          <input
            type="text"
            value={data.seoTitle || ''}
            onChange={(e) => setData({ ...data, seoTitle: e.target.value })}
            className="admin-input font-bold"
          />
        </div>
        <div>
          <label className="admin-label">Meta Description</label>
          <textarea
            rows={3}
            value={data.seoDescription || ''}
            onChange={(e) => setData({ ...data, seoDescription: e.target.value })}
            className="admin-textarea"
          />
        </div>
      </div>
    </div>
  );
}
