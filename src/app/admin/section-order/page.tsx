'use client';

import React, { useState, useEffect, useCallback } from 'react';
import NextLink from 'next/link';
import { ArrowLeft, SlidersVertical, Check, AlertCircle } from 'lucide-react';
import SectionOrderEditor from '@/components/admin/SectionOrderEditor';
import { DEFAULT_SECTION_ORDER } from '@/data/defaultContent';

export default function SectionOrderPage() {
  const [order, setOrder] = useState<string[]>(DEFAULT_SECTION_ORDER);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const loadOrder = useCallback(async () => {
    try {
      const apiEndpoint = (typeof window !== 'undefined' && window.location.hostname.includes('pages.dev'))
        ? 'https://ano-crzs.101filmstudio.workers.dev/api/admin/content/section-order'
        : '/api/admin/content/section-order';

      const res = await fetch(apiEndpoint);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.order) && data.order.length > 0) {
          // Merge with any missing defaults if necessary
          const currentSet = new Set(data.order);
          const completeOrder = [...data.order];
          DEFAULT_SECTION_ORDER.forEach((id) => {
            if (!currentSet.has(id)) {
              completeOrder.push(id);
            }
          });
          setOrder(completeOrder);
        }
      }
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => {
    loadOrder();
  }, [loadOrder]);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    setError('');
    try {
      const apiEndpoint = (typeof window !== 'undefined' && window.location.hostname.includes('pages.dev'))
        ? 'https://ano-crzs.101filmstudio.workers.dev/api/admin/content/section-order'
        : '/api/admin/content/section-order';

      const res = await fetch(apiEndpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order }),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3500);
      } else {
        const err = await res.json();
        setError(err.error || 'Ошибка при сохранении порядка');
      }
    } catch {
      setError('Ошибка подключения');
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="flex h-60 items-center justify-center text-slate-500 text-sm">
        Загрузка порядка разделов...
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
            <SlidersVertical className="w-7 h-7 text-red-500" />
            <span>Порядок разделов главной страницы</span>
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Перетаскивайте блоки мышью (Drag & Drop) или используйте стрелки вверх/вниз для изменения порядка модулей
          </p>
        </div>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-lg bg-emerald-950/40 border border-emerald-800 p-3 text-xs text-emerald-300">
          <Check className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>Новый порядок разделов успешно сохранен и применен на главной странице!</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-950/40 border border-red-800 p-3 text-xs text-red-300">
          <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <SectionOrderEditor
        order={order}
        onOrderChange={setOrder}
        onSave={handleSave}
        saving={saving}
        saved={saved}
      />
    </div>
  );
}
