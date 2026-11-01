'use client';

import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import {
  ArrowLeft,
  Save,
  CheckCircle2,
  Sliders,
  Plus,
  Trash2,
  ArrowRight,
  Image as ImageIcon,
} from 'lucide-react';
import { DEFAULT_LANDING } from '@/data/defaultContent';
import { notifyContentUpdated } from '@/lib/content';
import { MediaPickerModal } from '@/components/admin/MediaPickerModal';

type LandingContent = typeof DEFAULT_LANDING;

export default function AdminLandingHeroPage() {
  const [data, setData] = useState<LandingContent>(DEFAULT_LANDING);
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

  const updateNavLink = (idx: number, key: 'label' | 'href', val: string) => {
    const next = [...(data.header.navLinks || [])];
    next[idx] = { ...next[idx], [key]: val };
    updateHeader('navLinks', next);
  };

  const addNavLink = () => {
    updateHeader('navLinks', [
      ...(data.header.navLinks || []),
      { label: 'Новый пункт', href: '#about' },
    ]);
  };

  const removeNavLink = (idx: number) => {
    const next = (data.header.navLinks || []).filter((_, i) => i !== idx);
    updateHeader('navLinks', next);
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent"></div>
      </div>
    );
  }

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
            Логотип сайта, пункты якорного меню («О центре», «Проекты», «Новости», «Документы», «Партнёры», «Контакты») и кнопка «Стать партнёром»
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

      {/* Быстрый переход к редактированию Главного экрана (Main Hero) */}
      <div className="rounded-xl border border-amber-500/30 bg-amber-950/15 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">
              Следующий блок на странице: 2. Главный экран (Main Hero / Слайдер)
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Редактирование первого слайда и добавление 2-го и 3-го слайдов доступно в разделе «2. Главный экран (Hero)».
            </p>
          </div>
        </div>
        <NextLink
          href="/admin/hero"
          className="inline-flex items-center gap-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2.5 text-xs font-bold transition-colors shrink-0"
        >
          <span>Перейти к Main Hero</span>
          <ArrowRight className="w-4 h-4" />
        </NextLink>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-800/60 bg-emerald-950/40 p-3.5 text-xs text-emerald-300">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>Изменения шапки сайта успешно сохранены!</span>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-800 bg-red-950/40 p-3.5 text-xs text-red-300">
          {error}
        </div>
      )}

      {/* ШАПКА (HEADER) */}
      <div className="rounded-xl border border-[#222] bg-[#12161f] p-6 space-y-5">
        <h2 className="text-base font-bold text-white border-b border-[#222] pb-3 flex items-center gap-2">
          <Sliders className="h-4 w-4 text-amber-400" />
          <span>Настройки верхней шапки сайта</span>
        </h2>

        <div>
          <label className="admin-label">Логотип в шапке (URL или из Медиатеки R2)</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={(data.header as any).logoUrl || '/logo.png'}
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
          {((data.header as any).logoUrl || '/logo.png') && (
            <div className="mt-2 inline-flex items-center rounded-lg border border-[#2a2a2a] bg-[#071A33] px-4 py-2">
              <img
                src={(data.header as any).logoUrl || '/logo.png'}
                alt="Logo preview"
                className="h-9 w-auto"
              />
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="admin-label">Текст кнопки справа в шапке</label>
            <input
              type="text"
              value={data.header.ctaText || ''}
              onChange={(e) => updateHeader('ctaText', e.target.value)}
              className="admin-input font-semibold"
              placeholder="Стать партнёром"
            />
          </div>
          <div>
            <label className="admin-label">Ссылка кнопки в шапке (якорь)</label>
            <input
              type="text"
              value={data.header.ctaHref || ''}
              onChange={(e) => updateHeader('ctaHref', e.target.value)}
              className="admin-input font-mono text-xs"
              placeholder="#partnership"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-[#222] space-y-3">
          <div className="flex items-center justify-between">
            <label className="admin-label mb-0">Пункты меню в шапке и в подвале сайта</label>
            <button
              type="button"
              onClick={addNavLink}
              className="inline-flex items-center gap-1 rounded bg-[#1e2638] border border-[#334155] px-2.5 py-1 text-xs text-slate-200 hover:bg-[#28334a]"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Добавить пункт</span>
            </button>
          </div>

          <div className="space-y-2">
            {(data.header.navLinks || []).map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-500 w-6">0{idx + 1}</span>
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => updateNavLink(idx, 'label', e.target.value)}
                  className="admin-input flex-1"
                  placeholder="Название раздела"
                />
                <input
                  type="text"
                  value={item.href}
                  onChange={(e) => updateNavLink(idx, 'href', e.target.value)}
                  className="admin-input font-mono text-xs w-48"
                  placeholder="#about"
                />
                <button
                  type="button"
                  onClick={() => removeNavLink(idx)}
                  className="p-2 rounded text-slate-500 hover:text-red-400 hover:bg-red-950/30"
                  title="Удалить"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
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
