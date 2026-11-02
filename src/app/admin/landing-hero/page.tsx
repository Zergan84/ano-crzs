'use client';

import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import {
  ArrowLeft,
  Save,
  CheckCircle2,
  Sliders,
  Phone,
  Mail,
  Building2,
  ExternalLink,
  SlidersHorizontal,
  Image as ImageIcon,
  Menu,
} from 'lucide-react';
import { DEFAULT_LANDING } from '@/data/defaultContent';
import { notifyContentUpdated } from '@/lib/content';
import { MediaPickerModal } from '@/components/admin/MediaPickerModal';
import { ColorTintedLogo } from '@/components/ui/ColorTintedLogo';

type LandingContent = typeof DEFAULT_LANDING;

export default function AdminLandingHeroPage() {
  const [data, setData] = useState<LandingContent>(DEFAULT_LANDING);
  const [previewBgColor, setPreviewBgColor] = useState('#071A33');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);

  useEffect(() => {
    loadLanding();
  }, []);

  async function loadLanding() {
    try {
      const res = await fetch('/api/admin/content/landing');
      if (res.ok) {
        const json = await res.json();
        if (json && typeof json === 'object') {
          setData({
            ...DEFAULT_LANDING,
            ...json,
            header: { ...DEFAULT_LANDING.header, ...(json.header || {}) },
            hero: { ...DEFAULT_LANDING.hero, ...(json.hero || {}) },
            ideology: { ...DEFAULT_LANDING.ideology, ...(json.ideology || {}) },
          });
        }
      }
    } catch {}
    setLoading(false);
  }

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    setError('');
    try {
      const res = await fetch('/api/admin/content/landing', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSaved(true);
        notifyContentUpdated();
        setTimeout(() => setSaved(false), 3500);
      } else {
        const err = await res.json();
        setError(err.error || 'Ошибка при сохранении');
      }
    } catch {
      setError('Ошибка сети');
    }
    setSaving(false);
  }

  const updateHeader = (key: string, val: any) => {
    setData({
      ...data,
      header: { ...data.header, [key]: val },
    });
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent"></div>
      </div>
    );
  }

  const headerAny = data.header as any;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#222] pb-5">
        <div>
          <NextLink
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Назад к дашборду</span>
          </NextLink>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
              1. Шапка сайта (Header)
            </h1>
            <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[10px] font-mono uppercase">
              Блок 01 • Шапка
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Верхняя гос-строка контактов (телефон, email, статус), логотип Центра с эффектами перекрашивания и кнопка действия в шапке
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-600 to-amber-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:from-orange-500 hover:to-amber-400 disabled:opacity-50 transition-all shadow-lg shadow-orange-950/30 shrink-0"
        >
          <Save className="h-4 w-4" />
          <span>{saving ? 'Сохранение...' : 'Сохранить изменения'}</span>
        </button>
      </div>

      {/* Быстрые переходы к меню и слайдеру */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-amber-500/30 bg-amber-950/15 p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
              <Menu className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-white">Раздел «Меню сайта»</h2>
              <p className="text-[11px] text-slate-300">Названия ссылок, якоря и Drag & Drop</p>
            </div>
          </div>
          <NextLink
            href="/admin/menu"
            className="rounded bg-amber-500 hover:bg-amber-400 text-slate-950 px-3 py-1.5 text-xs font-bold shrink-0 transition-colors"
          >
            В меню →
          </NextLink>
        </div>

        <div className="rounded-xl border border-[#2a3346] bg-[#121622] p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-white">Раздел «2. Главный экран (Hero)»</h2>
              <p className="text-[11px] text-slate-300">Слайды, баннеры, высоты и отступы</p>
            </div>
          </div>
          <NextLink
            href="/admin/hero"
            className="rounded bg-[#1e293b] hover:bg-[#283548] text-slate-200 px-3 py-1.5 text-xs font-bold shrink-0 transition-colors border border-slate-700"
          >
            К слайдеру →
          </NextLink>
        </div>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-800/60 bg-emerald-950/40 p-3.5 text-xs text-emerald-300">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>Изменения шапки сайта успешно сохранены и применены!</span>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-800 bg-red-950/40 p-3.5 text-xs text-red-300">
          {error}
        </div>
      )}

      {/* 1. САМАЯ ВЕРХНЯЯ СТРОЧКА ШАПКИ (ГОС. СТАТУС, ТЕЛЕФОН И EMAIL) */}
      <div className="rounded-xl border border-[#222] bg-[#12161f] p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-[#222] pb-3">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-amber-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Верхняя информационная строчка шапки (Top Bar)
            </h2>
          </div>
          <span className="text-[10px] font-mono text-slate-400">Синяя полоса над логотипом</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="admin-label">Статус организации (текст слева)</label>
            <input
              type="text"
              value={headerAny.topBarOrgStatus ?? 'Автономная некоммерческая организация'}
              onChange={(e) => updateHeader('topBarOrgStatus', e.target.value)}
              className="admin-input text-xs"
              placeholder="Автономная некоммерческая организация"
            />
          </div>
          <div>
            <label className="admin-label">Телефон в верхней строчке</label>
            <input
              type="text"
              value={headerAny.phone ?? '+7 (495) 000-00-00'}
              onChange={(e) => updateHeader('phone', e.target.value)}
              className="admin-input text-xs font-mono"
              placeholder="+7 (495) 000-00-00"
            />
          </div>
          <div>
            <label className="admin-label">Электронная почта (Email)</label>
            <input
              type="text"
              value={headerAny.email ?? 'info@crzs-sport.ru'}
              onChange={(e) => updateHeader('email', e.target.value)}
              className="admin-input text-xs font-mono"
              placeholder="info@crzs-sport.ru"
            />
          </div>
        </div>
      </div>

      {/* 2. ОСНОВНОЙ ЛОГОТИП ШАПКИ И ЭФФЕКТЫ */}
      <div className="rounded-xl border border-[#222] bg-[#12161f] p-6 space-y-5">
        <h2 className="text-base font-bold text-white border-b border-[#222] pb-3 flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-amber-400" />
          <span>Логотип и эффекты отображения</span>
        </h2>

        <div>
          <label className="admin-label">Логотип в шапке (URL или из Медиатеки R2)</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={headerAny.logoUrl || '/logo.png'}
              onChange={(e) => updateHeader('logoUrl', e.target.value)}
              className="admin-input font-mono text-xs flex-1"
              placeholder="/logo.png"
            />
            <button
              type="button"
              onClick={() => setMediaPickerOpen(true)}
              className="flex items-center gap-1.5 rounded bg-[#1e2638] border border-[#334155] px-3 py-2 text-xs text-slate-200 hover:bg-[#28334a]"
            >
              <ImageIcon className="h-3.5 w-3.5" />
              <span>Медиатека</span>
            </button>
          </div>

          {(headerAny.logoUrl || '/logo.png') && (
            <div className="mt-4 rounded-xl border border-[#263143] bg-[#0c101a] p-4 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Окно предпросмотра логотипа с переключателем цвета фона */}
                <div className="flex items-center gap-3">
                  <div
                    className="inline-flex items-center rounded-lg border border-[#334155] px-4 py-2.5 transition-colors"
                    style={{ backgroundColor: previewBgColor }}
                  >
                    <ColorTintedLogo
                      src={headerAny.logoUrl || '/logo.png'}
                      alt="Logo preview"
                      color={headerAny.logoColor}
                      opacity={headerAny.logoOpacity}
                      className="h-10 w-auto max-w-[220px] object-contain transition-all"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Предпросмотр логотипа</span>
                    <span className="text-[11px] text-slate-400">
                      Цвет подложки для проверки:
                    </span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <button
                        type="button"
                        onClick={() => setPreviewBgColor('#071A33')}
                        className={`w-5 h-5 rounded border ${previewBgColor === '#071A33' ? 'border-amber-400 ring-1 ring-amber-400' : 'border-slate-600'}`}
                        style={{ backgroundColor: '#071A33' }}
                        title="Тёмно-синий фон (#071A33)"
                      />
                      <button
                        type="button"
                        onClick={() => setPreviewBgColor('#ffffff')}
                        className={`w-5 h-5 rounded border ${previewBgColor === '#ffffff' ? 'border-amber-400 ring-1 ring-amber-400' : 'border-slate-600'}`}
                        style={{ backgroundColor: '#ffffff' }}
                        title="Белый фон (#ffffff)"
                      />
                      <button
                        type="button"
                        onClick={() => setPreviewBgColor('#0F172A')}
                        className={`w-5 h-5 rounded border ${previewBgColor === '#0F172A' ? 'border-amber-400 ring-1 ring-amber-400' : 'border-slate-600'}`}
                        style={{ backgroundColor: '#0F172A' }}
                        title="Графитовый фон (#0F172A)"
                      />
                      <input
                        type="color"
                        value={previewBgColor}
                        onChange={(e) => setPreviewBgColor(e.target.value)}
                        className="w-5 h-5 rounded cursor-pointer border border-[#445] bg-transparent p-0 ml-1"
                        title="Выбрать любой цвет фона предпросмотра"
                      />
                    </div>
                  </div>
                </div>

                {/* Эффекты логотипа (цвет и прозрачность) */}
                <div className="flex flex-wrap items-center gap-4 bg-[#141b27] px-4 py-3 rounded-lg border border-[#222]">
                  <div className="flex items-center gap-2">
                    <label className="text-[11px] font-semibold text-slate-300 whitespace-nowrap">
                      Цвет логотипа:
                    </label>
                    <input
                      type="color"
                      value={headerAny.logoColor || '#ffffff'}
                      onChange={(e) => updateHeader('logoColor', e.target.value)}
                      className="w-7 h-7 rounded cursor-pointer border border-[#445] bg-transparent p-0"
                      title="Выбрать оттенок цвета"
                    />
                    {headerAny.logoColor && (
                      <button
                        type="button"
                        onClick={() => updateHeader('logoColor', '')}
                        className="text-[10px] text-slate-400 hover:text-red-400 underline"
                        title="Сбросить цвет к исходному"
                      >
                        Сброс
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2 min-w-[170px]">
                    <label className="text-[11px] font-semibold text-slate-300 whitespace-nowrap">
                      Прозрачность:
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={typeof headerAny.logoOpacity === 'number' ? headerAny.logoOpacity : 100}
                      onChange={(e) => updateHeader('logoOpacity', Number(e.target.value))}
                      className="w-20 accent-amber-500 cursor-pointer"
                    />
                    <span className="text-[11px] font-mono text-amber-400 font-bold w-9">
                      {typeof headerAny.logoOpacity === 'number' ? headerAny.logoOpacity : 100}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="admin-label">Название организации (alt логотипа)</label>
            <input
              type="text"
              value={data.header.logoTitle || ''}
              onChange={(e) => updateHeader('logoTitle', e.target.value)}
              className="admin-input font-bold"
              placeholder="Центр развития спорта"
            />
          </div>
          <div>
            <label className="admin-label">Подзаголовок (для темы Basic light)</label>
            <input
              type="text"
              value={data.header.logoSubtitle || ''}
              onChange={(e) => updateHeader('logoSubtitle', e.target.value)}
              className="admin-input"
              placeholder="Автономная некоммерческая организация"
            />
          </div>
        </div>
      </div>

      {/* 3. УПРАВЛЕНИЕ КНОПКОЙ ДЕЙСТВИЯ В ШАПКЕ */}
      <div className="rounded-xl border border-[#222] bg-[#12161f] p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-[#222] pb-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">
            Кнопка действия в правой части шапки
          </h2>
          <label className="inline-flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={headerAny.showCta !== false}
              onChange={(e) => updateHeader('showCta', e.target.checked)}
              className="h-4 w-4 rounded border-slate-600 bg-[#0c0f16] text-amber-500 focus:ring-0"
            />
            <span className="text-xs font-semibold text-slate-300">Отображать кнопку</span>
          </label>
        </div>

        {headerAny.showCta !== false && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Текст кнопки в шапке (например «Связаться» или «Стать партнёром»)</label>
              <input
                type="text"
                value={data.header.ctaText || ''}
                onChange={(e) => updateHeader('ctaText', e.target.value)}
                className="admin-input font-semibold"
                placeholder="Связаться"
              />
            </div>
            <div>
              <label className="admin-label">Ссылка / Якорь кнопки</label>
              <input
                type="text"
                value={data.header.ctaHref || ''}
                onChange={(e) => updateHeader('ctaHref', e.target.value)}
                className="admin-input font-mono text-xs"
                placeholder="#contacts или #partnership"
              />
            </div>
          </div>
        )}
      </div>

      <MediaPickerModal
        isOpen={mediaPickerOpen}
        onClose={() => setMediaPickerOpen(false)}
        onSelect={(url) => {
          updateHeader('logoUrl', url);
          setMediaPickerOpen(false);
        }}
      />
    </div>
  );
}
