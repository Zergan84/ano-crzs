'use client';

import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import {
  ArrowLeft,
  Sparkles,
  Save,
  Check,
  AlertCircle,
  Landmark,
} from 'lucide-react';
import { DEFAULT_LANDING } from '@/data/defaultContent';
import { notifyContentUpdated } from '@/lib/content';

export default function AdminLandingIdeologyPage() {
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

  function updateIdeology(field: string, val: any) {
    setData({
      ...data,
      ideology: { ...data.ideology, [field]: val },
    });
  }

  function updateFormulaItem(idx: number, val: string) {
    const items = [...(data.ideology.formulaItems || [])];
    items[idx] = val;
    updateIdeology('formulaItems', items);
  }

  function updatePillar(idx: number, field: string, val: string) {
    const pillars = [...(data.ideology.pillars || [])];
    pillars[idx] = { ...pillars[idx], [field]: val };
    updateIdeology('pillars', pillars);
  }

  function updateGovBlock(idx: number, field: string, val: any) {
    const govBlocks = [...(data.ideology.govBlocks || [])];
    govBlocks[idx] = { ...govBlocks[idx], [field]: val };
    updateIdeology('govBlocks', govBlocks);
  }

  if (loading) {
    return (
      <div className="flex h-60 items-center justify-center text-slate-500 text-sm">
        Загрузка данных методологии и господдержки...
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
              <Landmark className="w-7 h-7 text-amber-500" />
              <span>Методология и Господдержка (Лендинг)</span>
            </h1>
            <span className="rounded bg-amber-500/20 border border-amber-500/40 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-300 uppercase">
              Блок Лендинга
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Формула эффективности, принципы ДНК в госсекторе и блок взаимодействия с министерствами, курортами и грантовыми операторами
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
          <span>Разделы методологии и господдержки успешно сохранены!</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-950/40 border border-red-800 p-3 text-xs text-red-300">
          <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* 1. Формула эффективности */}
      <div className="rounded-xl border border-[#222] bg-[#12161f] p-5 space-y-4">
        <h3 className="text-base font-bold text-white border-b border-[#222] pb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Формула системной эффективности</span>
        </h3>

        <div>
          <label className="admin-label">Надзаголовок плашки формулы</label>
          <input
            type="text"
            value={data.ideology.formulaBadge || ''}
            onChange={(e) => updateIdeology('formulaBadge', e.target.value)}
            className="admin-input"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {(data.ideology.formulaItems || []).map((item, idx) => (
            <div key={idx}>
              <label className="admin-label">Множитель 0{idx + 1}</label>
              <input
                type="text"
                value={item}
                onChange={(e) => updateFormulaItem(idx, e.target.value)}
                className="admin-input font-bold"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 2. Методология и технологии */}
      <div className="rounded-xl border border-[#222] bg-[#12161f] p-5 space-y-4">
        <h3 className="text-base font-bold text-white border-b border-[#222] pb-3">
          Раздел «Методология и технологии» (ДНК из брендбука в госсектор)
        </h3>

        <div>
          <label className="admin-label">Заголовок раздела методологии</label>
          <input
            type="text"
            value={data.ideology.methodologyTitle || ''}
            onChange={(e) => updateIdeology('methodologyTitle', e.target.value)}
            className="admin-input font-bold"
          />
        </div>

        <div>
          <label className="admin-label">Вводный абзац</label>
          <textarea
            rows={3}
            value={data.ideology.methodologyLead || ''}
            onChange={(e) => updateIdeology('methodologyLead', e.target.value)}
            className="admin-textarea"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {(data.ideology.pillars || []).map((p, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-[#252d3d] bg-[#0d1118] p-4 space-y-3"
            >
              <div className="text-xs font-mono text-amber-400 font-bold">
                Принцип 0{idx + 1}
              </div>
              <div>
                <label className="admin-label">Заголовок</label>
                <input
                  type="text"
                  value={p.title || ''}
                  onChange={(e) => updatePillar(idx, 'title', e.target.value)}
                  className="admin-input font-bold"
                />
              </div>
              <div>
                <label className="admin-label">Описание</label>
                <textarea
                  rows={3}
                  value={p.desc || ''}
                  onChange={(e) => updatePillar(idx, 'desc', e.target.value)}
                  className="admin-textarea"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Взаимодействие и господдержка (4.5) */}
      <div className="rounded-xl border border-[#222] bg-[#12161f] p-5 space-y-4">
        <h3 className="text-base font-bold text-white border-b border-[#222] pb-3">
          4.5. Раздел взаимодействия и господдержки (Партнёрам и ведомствам)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="admin-label">Надзаголовок секции</label>
            <input
              type="text"
              value={data.ideology.govBadge || ''}
              onChange={(e) => updateIdeology('govBadge', e.target.value)}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label">Заголовок секции</label>
            <input
              type="text"
              value={data.ideology.govTitle || ''}
              onChange={(e) => updateIdeology('govTitle', e.target.value)}
              className="admin-input font-bold"
            />
          </div>
        </div>

        <div>
          <label className="admin-label">Подзаголовок секции</label>
          <textarea
            rows={2}
            value={data.ideology.govSubtitle || ''}
            onChange={(e) => updateIdeology('govSubtitle', e.target.value)}
            className="admin-textarea"
          />
        </div>

        <div className="space-y-4 pt-2">
          {(data.ideology.govBlocks || []).map((block, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-[#252d3d] bg-[#0d1118] p-4 space-y-3"
            >
              <div className="text-xs font-mono text-amber-400 font-bold">
                Контур взаимодействия 0{idx + 1}
              </div>
              <div>
                <label className="admin-label">Заголовок блока</label>
                <input
                  type="text"
                  value={block.title || ''}
                  onChange={(e) => updateGovBlock(idx, 'title', e.target.value)}
                  className="admin-input font-bold"
                />
              </div>
              <div>
                <label className="admin-label">Описание</label>
                <textarea
                  rows={2}
                  value={block.desc || ''}
                  onChange={(e) => updateGovBlock(idx, 'desc', e.target.value)}
                  className="admin-textarea"
                />
              </div>
              <div>
                <label className="admin-label">Ключевые тезисы (по одному в строке)</label>
                <textarea
                  rows={3}
                  value={(block.bullets || []).join('\n')}
                  onChange={(e) =>
                    updateGovBlock(
                      idx,
                      'bullets',
                      e.target.value.split('\n').filter((line) => line.trim() !== '')
                    )
                  }
                  className="admin-textarea font-mono text-xs"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
