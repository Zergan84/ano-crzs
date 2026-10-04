'use client';

import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { ArrowLeft, LayoutTemplate, Save, Check, AlertCircle } from 'lucide-react';
import { DEFAULT_FOOTER } from '@/data/defaultContent';

export default function AdminFooterPage() {
  const [data, setData] = useState(DEFAULT_FOOTER);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadFooterData();
  }, []);

  async function loadFooterData() {
    try {
      const apiEndpoint = (typeof window !== 'undefined' && window.location.hostname.includes('pages.dev'))
        ? 'https://ano-crzs.101filmstudio.workers.dev/api/admin/content/footer'
        : '/api/admin/content/footer';

      const res = await fetch(apiEndpoint);
      if (res.ok) {
        const json = await res.json();
        if (json && json.shortName) {
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
      const apiEndpoint = (typeof window !== 'undefined' && window.location.hostname.includes('pages.dev'))
        ? 'https://ano-crzs.101filmstudio.workers.dev/api/admin/content/footer'
        : '/api/admin/content/footer';

      const res = await fetch(apiEndpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSaved(true);
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
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wide flex items-center gap-2">
            <LayoutTemplate className="w-7 h-7 text-red-500" />
            <span>Управление подвалом сайта (Footer)</span>
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Юридическая информация, контактные реквизиты, режим работы и копирайт
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-lg bg-red-600 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-red-500 transition-all shadow-lg shadow-red-950/20 disabled:opacity-50"
        >
          {saved ? <Check className="h-4 w-4 text-white" /> : <Save className={`h-4 w-4 ${saving ? 'animate-spin' : ''}`} />}
          <span>{saving ? 'Сохранение...' : saved ? 'Сохранено ✓' : 'Сохранить изменения'}</span>
        </button>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-lg bg-emerald-950/40 border border-emerald-800 p-3 text-xs text-emerald-300">
          <Check className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>Подвал успешно сохранен и обновлен на сайте в реальном времени!</span>
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
          Основные тексты подвала
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="admin-label">Краткое наименование</label>
            <input
              type="text"
              value={data.shortName || ''}
              onChange={(e) => setData({ ...data, shortName: e.target.value })}
              className="admin-input font-bold"
            />
          </div>
          <div>
            <label className="admin-label">Копирайт</label>
            <input
              type="text"
              value={data.copyright || ''}
              onChange={(e) => setData({ ...data, copyright: e.target.value })}
              className="admin-input font-mono text-xs"
            />
          </div>
        </div>

        <div>
          <label className="admin-label">Описание организации в подвале</label>
          <textarea
            rows={2}
            value={data.description || ''}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            className="admin-textarea"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <label className="admin-label">ОГРН</label>
            <input
              type="text"
              value={data.ogrn || ''}
              onChange={(e) => setData({ ...data, ogrn: e.target.value })}
              className="admin-input font-mono"
            />
          </div>
          <div>
            <label className="admin-label">ИНН</label>
            <input
              type="text"
              value={data.inn || ''}
              onChange={(e) => setData({ ...data, inn: e.target.value })}
              className="admin-input font-mono"
            />
          </div>
          <div>
            <label className="admin-label">КПП</label>
            <input
              type="text"
              value={data.kpp || ''}
              onChange={(e) => setData({ ...data, kpp: e.target.value })}
              className="admin-input font-mono"
            />
          </div>
          <div>
            <label className="admin-label">ОКПО</label>
            <input
              type="text"
              value={data.okpo || ''}
              onChange={(e) => setData({ ...data, okpo: e.target.value })}
              className="admin-input font-mono"
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-[#222] bg-[#12161f] p-5 space-y-4">
        <h3 className="text-base font-bold text-white border-b border-[#222] pb-3">
          Контакты центрального офиса в подвале
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="admin-label">Телефон офиса</label>
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="admin-label">Режим работы</label>
            <input
              type="text"
              value={data.workHours || ''}
              onChange={(e) => setData({ ...data, workHours: e.target.value })}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label">Фактический адрес офиса</label>
            <input
              type="text"
              value={data.address || ''}
              onChange={(e) => setData({ ...data, address: e.target.value })}
              className="admin-input"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
