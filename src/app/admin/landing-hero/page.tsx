'use client';

import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import {
  ArrowLeft,
  Sliders,
  Save,
  Check,
  AlertCircle,
  Plus,
  Trash2,
} from 'lucide-react';
import { DEFAULT_LANDING } from '@/data/defaultContent';
import { notifyContentUpdated } from '@/lib/content';

export default function AdminLandingHeroPage() {
  const [data, setData] = useState(DEFAULT_LANDING);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadLanding();
  }, []);

  async function loadLanding() {
    try {
      const apiEndpoint =
        typeof window !== 'undefined' && window.location.hostname.includes('pages.dev')
          ? 'https://ano-crzs.101filmstudio.workers.dev/api/admin/content/landing'
          : '/api/admin/content/landing';

      const res = await fetch(apiEndpoint);
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
      const apiEndpoint =
        typeof window !== 'undefined' && window.location.hostname.includes('pages.dev')
          ? 'https://ano-crzs.101filmstudio.workers.dev/api/admin/content/landing'
          : '/api/admin/content/landing';

      const res = await fetch(apiEndpoint, {
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

  function updateHeader(field: string, value: any) {
    setData({
      ...data,
      header: { ...data.header, [field]: value },
    });
  }

  function updateNavLink(idx: number, field: 'label' | 'href', val: string) {
    const navLinks = [...(data.header.navLinks || [])];
    navLinks[idx] = { ...navLinks[idx], [field]: val };
    updateHeader('navLinks', navLinks);
  }

  function addNavLink() {
    const navLinks = [...(data.header.navLinks || []), { label: 'Новый раздел', href: '#about' }];
    updateHeader('navLinks', navLinks);
  }

  function removeNavLink(idx: number) {
    const navLinks = (data.header.navLinks || []).filter((_, i) => i !== idx);
    updateHeader('navLinks', navLinks);
  }

  function updateHero(field: string, value: any) {
    setData({
      ...data,
      hero: { ...data.hero, [field]: value },
    });
  }

  function updateMetric(idx: number, field: string, val: string) {
    const metrics = [...(data.hero.metrics || [])];
    metrics[idx] = { ...metrics[idx], [field]: val };
    updateHero('metrics', metrics);
  }

  if (loading) {
    return (
      <div className="flex h-60 items-center justify-center text-slate-500 text-sm">
        Загрузка данных шапки и главного экрана лендинга...
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
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wide flex items-center gap-2">
              <Sliders className="w-7 h-7 text-amber-500" />
              <span>Шапка и Главный экран (Лендинг)</span>
            </h1>
            <span className="rounded bg-amber-500/20 border border-amber-500/40 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-300 uppercase">
              Блок Лендинга
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Навигация шапки, H1 заголовок, надзаголовок, лид-абзац, кнопки CTA и 3 фактоида/метрики лендинга АНО «ЦЗСТ»
          </p>
        </div>

        <button
          onClick={handleSave}
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
          <span>Шапка и главный экран лендинга успешно сохранены!</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-950/40 border border-red-800 p-3 text-xs text-red-300">
          <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* 1. Шапка Лендинга (Header) */}
      <div className="rounded-xl border border-[#222] bg-[#12161f] p-5 space-y-4">
        <h3 className="text-base font-bold text-white border-b border-[#222] pb-3">
          4.1. Шапка лендинга (Header)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="admin-label">Краткое название у логотипа</label>
            <input
              type="text"
              value={data.header.logoTitle || ''}
              onChange={(e) => updateHeader('logoTitle', e.target.value)}
              className="admin-input font-bold"
            />
          </div>
          <div>
            <label className="admin-label">Расшифровка у логотипа</label>
            <input
              type="text"
              value={data.header.logoSubtitle || ''}
              onChange={(e) => updateHeader('logoSubtitle', e.target.value)}
              className="admin-input"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="admin-label">Текст кнопки в шапке</label>
            <input
              type="text"
              value={data.header.ctaText || ''}
              onChange={(e) => updateHeader('ctaText', e.target.value)}
              className="admin-input font-semibold"
            />
          </div>
          <div>
            <label className="admin-label">Якорь кнопки в шапке</label>
            <input
              type="text"
              value={data.header.ctaHref || ''}
              onChange={(e) => updateHeader('ctaHref', e.target.value)}
              className="admin-input font-mono text-xs"
            />
          </div>
        </div>

        <div className="pt-2 space-y-3">
          <div className="flex items-center justify-between">
            <label className="admin-label mb-0">Якорные ссылки навигации лендинга</label>
            <button
              type="button"
              onClick={addNavLink}
              className="inline-flex items-center gap-1 rounded bg-[#1e2638] border border-[#334155] px-2.5 py-1 text-xs text-slate-200 hover:bg-[#28334a]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Добавить пункт</span>
            </button>
          </div>

          <div className="space-y-2">
            {(data.header.navLinks || []).map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => updateNavLink(idx, 'label', e.target.value)}
                  className="admin-input flex-1"
                  placeholder="Название (напр. О Центре)"
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
                  className="p-2 text-red-400 hover:text-red-300 rounded hover:bg-red-950/40"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Главный экран (Hero Section) */}
      <div className="rounded-xl border border-[#222] bg-[#12161f] p-5 space-y-4">
        <h3 className="text-base font-bold text-white border-b border-[#222] pb-3">
          4.2. Главный экран (Hero Section)
        </h3>

        <div>
          <label className="admin-label">Надзаголовок (Badge)</label>
          <input
            type="text"
            value={data.hero.badge || ''}
            onChange={(e) => updateHero('badge', e.target.value)}
            className="admin-input"
          />
        </div>

        <div>
          <label className="admin-label">Главный заголовок (H1)</label>
          <textarea
            rows={2}
            value={data.hero.title || ''}
            onChange={(e) => updateHero('title', e.target.value)}
            className="admin-textarea font-bold text-base"
          />
        </div>

        <div>
          <label className="admin-label">Лид-абзац (Подзаголовок)</label>
          <textarea
            rows={3}
            value={data.hero.lead || ''}
            onChange={(e) => updateHero('lead', e.target.value)}
            className="admin-textarea"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="admin-label">Основная кнопка (CTA 1) — Текст</label>
            <input
              type="text"
              value={data.hero.primaryCtaText || ''}
              onChange={(e) => updateHero('primaryCtaText', e.target.value)}
              className="admin-input font-bold"
            />
          </div>
          <div>
            <label className="admin-label">Основная кнопка (CTA 1) — Ссылка/Якорь</label>
            <input
              type="text"
              value={data.hero.primaryCtaHref || ''}
              onChange={(e) => updateHero('primaryCtaHref', e.target.value)}
              className="admin-input font-mono text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="admin-label">Вторая кнопка (CTA 2) — Текст</label>
            <input
              type="text"
              value={data.hero.secondaryCtaText || ''}
              onChange={(e) => updateHero('secondaryCtaText', e.target.value)}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label">Вторая кнопка (CTA 2) — Ссылка/Якорь</label>
            <input
              type="text"
              value={data.hero.secondaryCtaHref || ''}
              onChange={(e) => updateHero('secondaryCtaHref', e.target.value)}
              className="admin-input font-mono text-xs"
            />
          </div>
        </div>
      </div>

      {/* 3. Фактоиды / Метрики Hero */}
      <div className="rounded-xl border border-[#222] bg-[#12161f] p-5 space-y-4">
        <h3 className="text-base font-bold text-white border-b border-[#222] pb-3">
          Фактоиды и метрики главного экрана (3 плашки)
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {(data.hero.metrics || []).map((m, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-[#252d3d] bg-[#0d1118] p-4 space-y-3"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="admin-label">Метка (Tag)</label>
                  <input
                    type="text"
                    value={m.tag || ''}
                    onChange={(e) => updateMetric(idx, 'tag', e.target.value)}
                    className="admin-input font-mono text-xs"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="admin-label">Заголовок фактоида</label>
                  <input
                    type="text"
                    value={m.title || ''}
                    onChange={(e) => updateMetric(idx, 'title', e.target.value)}
                    className="admin-input font-bold"
                  />
                </div>
              </div>
              <div>
                <label className="admin-label">Краткое пояснение</label>
                <input
                  type="text"
                  value={m.desc || ''}
                  onChange={(e) => updateMetric(idx, 'desc', e.target.value)}
                  className="admin-input"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
