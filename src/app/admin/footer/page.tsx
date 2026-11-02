'use client';

import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { ArrowLeft, LayoutTemplate, Save, Check, AlertCircle, Image as ImageIcon, ShieldCheck, ArrowRight } from 'lucide-react';
import { DEFAULT_FOOTER } from '@/data/defaultContent';
import { notifyContentUpdated } from '@/lib/content';
import { MediaPickerModal } from '@/components/admin/MediaPickerModal';

export default function AdminFooterPage() {
  const [data, setData] = useState(DEFAULT_FOOTER);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);

  useEffect(() => {
    loadFooterData();
  }, []);

  async function loadFooterData() {
    try {
      const res = await fetch('/api/admin/content/footer');
      if (res.ok) {
        const json = await res.json();
        if (json && typeof json === 'object') {
          setData({ ...DEFAULT_FOOTER, ...json });
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
      const res = await fetch('/api/admin/content/footer', {
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
        setError(err.error || 'Ошибка при сохранении подвала');
      }
    } catch {
      setError('Ошибка сети');
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="flex h-60 items-center justify-center text-slate-500 text-sm">
        Загрузка данных подвала...
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
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wide flex items-center gap-2">
              <LayoutTemplate className="w-7 h-7 text-amber-500" />
              <span>Подвал сайта (Footer)</span>
            </h1>
            <span className="rounded bg-amber-500/20 border border-amber-500/40 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-300 uppercase">
              Блок 10 • Footer
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Логотип и описание в подвале, колонка контактов (адрес, телефон, email, часы работы) и нижняя строка копирайта
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
          <span>Подвал успешно сохранен и обновлен на сайте!</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-950/40 border border-red-800 p-3 text-xs text-red-300">
          <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="rounded-xl border border-[#222] bg-[#12161f] p-5 space-y-4">
        <h3 className="text-base font-bold text-white border-b border-[#222] pb-3">
          Логотип и тексты подвала
        </h3>

        <div>
          <label className="admin-label">Логотип в подвале (URL или из R2)</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={(data as any).logoUrl || '/logo.png'}
              onChange={(e) => setData({ ...data, logoUrl: e.target.value } as any)}
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
        </div>

        <div>
          <label className="admin-label">Описание организации под логотипом (Левая колонка)</label>
          <textarea
            rows={3}
            value={data.description || ''}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            className="admin-textarea"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="admin-label">Строка копирайта (слева внизу)</label>
            <input
              type="text"
              value={data.copyright || ''}
              onChange={(e) => setData({ ...data, copyright: e.target.value })}
              className="admin-input text-xs"
            />
          </div>
          <div>
            <label className="admin-label">Информационная сноска (справа внизу)</label>
            <input
              type="text"
              value={(data as any).disclosureNote || 'Информация о деятельности организации раскрывается в разделе «Документы».'}
              onChange={(e) => setData({ ...data, disclosureNote: e.target.value } as any)}
              className="admin-input text-xs"
            />
          </div>
        </div>

        {/* Пункт Политики конфиденциальности в подвале */}
        <div className="rounded-lg border border-slate-700/60 bg-[#0c101a] p-3.5 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-white">Пункт «Политика конфиденциальности (152-ФЗ)»</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
              Включено по закону РФ
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Ссылка на политику конфиденциальности и согласие на обработку персональных данных автоматически размещена в нижней строке подвала сайта рядом со сноской и открывает утверждённый текст (152-ФЗ РФ) в модальном окне.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-[#222] bg-[#12161f] p-5 space-y-4">
        <h3 className="text-base font-bold text-white border-b border-[#222] pb-3">
          Колонка «Контакты» в подвале сайта
        </h3>

        <div>
          <label className="admin-label">Адрес (поддерживается перенос строк Enter)</label>
          <textarea
            rows={3}
            value={data.address || ''}
            onChange={(e) => setData({ ...data, address: e.target.value })}
            placeholder="Например:&#10;РФ, Московская обл., Красногорск г.о.,&#10;п. Архангельское"
            className="admin-textarea"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="admin-label">Телефон</label>
            <input
              type="text"
              value={data.phone || ''}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label">Электронная почта (Email)</label>
            <input
              type="text"
              value={data.email || ''}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="admin-input font-mono"
            />
          </div>
          <div>
            <label className="admin-label">Часы работы</label>
            <input
              type="text"
              value={data.workHours || ''}
              onChange={(e) => setData({ ...data, workHours: e.target.value })}
              className="admin-input"
            />
          </div>
        </div>
      </div>

      <MediaPickerModal
        isOpen={mediaPickerOpen}
        onClose={() => setMediaPickerOpen(false)}
        onSelect={(url) => {
          setData({ ...data, logoUrl: url } as any);
          setMediaPickerOpen(false);
        }}
      />
    </div>
  );
}
