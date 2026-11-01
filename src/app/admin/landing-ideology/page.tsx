'use client';

import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import {
  ArrowLeft,
  Save,
  Check,
  AlertCircle,
  Landmark,
  Plus,
  Trash2,
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
      const res = await fetch('/api/admin/content/landing');
      if (res.ok) {
        const json = await res.json();
        if (json && typeof json === 'object') {
          setData({
            ...DEFAULT_LANDING,
            ...json,
            header: { ...DEFAULT_LANDING.header, ...(json.header || {}) },
            hero: { ...DEFAULT_LANDING.hero, ...(json.hero || {}) },
            ideology: {
              ...DEFAULT_LANDING.ideology,
              ...(json.ideology || {}),
              govBlocks:
                Array.isArray(json?.ideology?.govBlocks) && json.ideology.govBlocks.length > 0
                  ? json.ideology.govBlocks
                  : DEFAULT_LANDING.ideology.govBlocks,
            },
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

  function updateIdeology(field: string, val: any) {
    setData({
      ...data,
      ideology: { ...data.ideology, [field]: val },
    });
  }

  function updateGovBlock(idx: number, field: string, val: any) {
    const govBlocks = [...(data.ideology.govBlocks || [])];
    govBlocks[idx] = { ...govBlocks[idx], [field]: val };
    updateIdeology('govBlocks', govBlocks);
  }

  function addGovBlock() {
    const govBlocks = [
      ...(data.ideology.govBlocks || []),
      {
        title: 'Новое преимущество партнёрства',
        desc: 'Описание формата участия и сотрудничества...',
        bullets: [],
      },
    ];
    updateIdeology('govBlocks', govBlocks);
  }

  function removeGovBlock(idx: number) {
    const govBlocks = (data.ideology.govBlocks || []).filter((_, i) => i !== idx);
    updateIdeology('govBlocks', govBlocks);
  }

  if (loading) {
    return (
      <div className="flex h-60 items-center justify-center text-slate-500 text-sm">
        Загрузка данных раздела сотрудничества...
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
              <span>8. Сотрудничество (#partnership)</span>
            </h1>
            <span className="rounded bg-amber-500/20 border border-amber-500/40 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-300 uppercase">
              Блок 08 • #partnership
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Тёмно-синий блок «Станьте партнёром центра»: надзаголовок, заголовок, подзаголовок, 4 пункта преимуществ и кнопка модального окна заявки
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
          <span>Раздел «Сотрудничество (#partnership)» успешно сохранен!</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-950/40 border border-red-800 p-3 text-xs text-red-300">
          <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Основные заголовки и кнопка секции #partnership */}
      <div className="rounded-xl border border-[#222] bg-[#12161f] p-5 space-y-4">
        <h3 className="text-base font-bold text-white border-b border-[#222] pb-3">
          Заголовок, описание и кнопка блока «Станьте партнёром центра» (#partnership)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="admin-label">Надзаголовок секции (Eyebrow)</label>
            <input
              type="text"
              value={data.ideology.govBadge || ''}
              onChange={(e) => updateIdeology('govBadge', e.target.value)}
              placeholder="Сотрудничество"
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label">Заголовок секции (H2)</label>
            <input
              type="text"
              value={data.ideology.govTitle || ''}
              onChange={(e) => updateIdeology('govTitle', e.target.value)}
              placeholder="Станьте партнёром центра"
              className="admin-input font-bold"
            />
          </div>
        </div>

        <div>
          <label className="admin-label">Подзаголовок / описание секции</label>
          <textarea
            rows={2}
            value={data.ideology.govSubtitle || ''}
            onChange={(e) => updateIdeology('govSubtitle', e.target.value)}
            className="admin-textarea"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#222]">
          <div>
            <label className="admin-label">Текст золотой кнопки внизу секции</label>
            <input
              type="text"
              value={(data.ideology as any).govCtaText || 'Оставить заявку на партнёрство'}
              onChange={(e) => updateIdeology('govCtaText', e.target.value)}
              className="admin-input font-semibold"
            />
          </div>
          <div>
            <label className="admin-label">Заголовок всплывающего модального окна</label>
            <input
              type="text"
              value={(data.ideology as any).govModalTitle || 'Заявка на партнёрство'}
              onChange={(e) => updateIdeology('govModalTitle', e.target.value)}
              className="admin-input"
            />
          </div>
        </div>
      </div>

      {/* 4 строки преимуществ партнёрства */}
      <div className="rounded-xl border border-[#222] bg-[#12161f] p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-[#222] pb-3">
          <div>
            <h3 className="text-base font-bold text-white">
              Пункты преимуществ партнёрства (список в рамке)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              На странице отображаются 4 строки: «Гранты и субсидии», «Совместные программы», «Открытая отчётность», «Социальный эффект»
            </p>
          </div>
          <button
            type="button"
            onClick={addGovBlock}
            className="inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-amber-500"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Добавить пункт</span>
          </button>
        </div>

        <div className="space-y-4">
          {(data.ideology.govBlocks || []).map((block, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-[#252d3d] bg-[#0d1118] p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="text-xs font-mono text-amber-400 font-bold">
                  Пункт 0{idx + 1}
                </div>
                <button
                  type="button"
                  onClick={() => removeGovBlock(idx)}
                  className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-950/40"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div>
                <label className="admin-label">Заголовок преимущества</label>
                <input
                  type="text"
                  value={block.title || ''}
                  onChange={(e) => updateGovBlock(idx, 'title', e.target.value)}
                  className="admin-input font-bold"
                />
              </div>
              <div>
                <label className="admin-label">Текст описания</label>
                <textarea
                  rows={2}
                  value={block.desc || ''}
                  onChange={(e) => updateGovBlock(idx, 'desc', e.target.value)}
                  className="admin-textarea"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
