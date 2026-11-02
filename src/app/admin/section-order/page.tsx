'use client';

import React, { useState, useEffect, useRef } from 'react';
import NextLink from 'next/link';
import {
  ArrowLeft,
  SlidersVertical,
  Check,
  AlertCircle,
  GripVertical,
  ArrowUp,
  ArrowDown,
  Save,
  Building2,
  Compass,
  Newspaper,
  FileText,
  Handshake,
  Landmark,
  Phone,
  Sliders,
  Sparkles,
  Layers,
  Lock,
  LayoutGrid,
} from 'lucide-react';
import { DEFAULT_LANDING } from '@/data/defaultContent';
import { notifyContentUpdated } from '@/lib/content';

const DEFAULT_LANDING_ORDER = [
  'hero',
  'widgets',
  'about',
  'projects',
  'news',
  'documents',
  'partners',
  'partnership',
  'contacts',
];

const MODULE_META: Record<string, { label: string; desc: string; icon: React.ElementType }> = {
  hero: { label: 'Главный экран (Hero Слайдер)', desc: 'Первый экран с баннерами и заголовками', icon: Sliders },
  widgets: { label: 'Виджеты (Trust Bar / Highlights)', desc: 'Траст-бар с ключевыми преимуществами и иконками (3-5 шт.)', icon: LayoutGrid },
  about: { label: 'О центре (#about)', desc: 'Миссия, 4 ключевых принципа и фотография', icon: Building2 },
  projects: { label: 'Проекты и программы (#projects)', desc: 'Спортивные и социальные проекты центра', icon: Compass },
  news: { label: 'Новости (#news)', desc: 'Пресс-релизы и лента публикаций', icon: Newspaper },
  documents: { label: 'Документы и отчёты (#documents)', desc: 'Устав, нормативы и документы с фильтрами', icon: FileText },
  partners: { label: 'Партнёры (#partners)', desc: 'Ведомства, федерации и спонсоры', icon: Handshake },
  partnership: { label: 'Сотрудничество (#partnership)', desc: 'Тёмно-синий блок взаимодействия с госсектором', icon: Landmark },
  contacts: { label: 'Контакты (#contacts)', desc: 'Форма обращения, адрес, телефон и email', icon: Phone },
};

export default function SectionOrderPage() {
  const [order, setOrder] = useState<string[]>(DEFAULT_LANDING_ORDER);
  const [landingData, setLandingData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  // Drag & Drop
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);
  const dragItem = useRef<number | null>(null);

  useEffect(() => {
    loadOrder();
  }, []);

  async function loadOrder() {
    try {
      const res = await fetch('/api/admin/content/landing');
      if (res.ok) {
        const json = await res.json();
        setLandingData(json);
        const savedOrder = json?.sectionOrder;
        const customSecs = json?.customSections || [];
        
        let initialOrder = DEFAULT_LANDING_ORDER;
        if (Array.isArray(savedOrder) && savedOrder.length > 0) {
          initialOrder = savedOrder;
        }

        // Add any missing custom sections to order
        const currentSet = new Set(initialOrder);
        const merged = [...initialOrder];
        customSecs.forEach((cs: any) => {
          if (!currentSet.has(cs.id)) {
            merged.push(cs.id);
          }
        });

        setOrder(merged);
      } else {
        setOrder(DEFAULT_LANDING_ORDER);
      }
    } catch {
      setOrder(DEFAULT_LANDING_ORDER);
    }
    setLoading(false);
  }

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    setError('');
    try {
      const currentLanding = landingData || DEFAULT_LANDING;
      const updatedLanding = {
        ...currentLanding,
        sectionOrder: order,
      };

      const res = await fetch('/api/admin/content/landing', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedLanding),
      });

      if (res.ok) {
        setSaved(true);
        setLandingData(updatedLanding);
        notifyContentUpdated();
        setTimeout(() => setSaved(false), 3500);
      } else {
        const err = await res.json();
        setError(err.error || 'Ошибка при сохранении порядка разделов');
      }
    } catch {
      setError('Ошибка сети при сохранении порядка');
    }
    setSaving(false);
  }

  // Hero is locked at index 0
  const lockedTop = order[0] === 'hero' ? 'hero' : null;
  const reorderableItems = lockedTop ? order.slice(1) : order;

  const moveUp = (idx: number) => {
    if (idx === 0) return;
    const next = [...reorderableItems];
    const temp = next[idx];
    next[idx] = next[idx - 1];
    next[idx - 1] = temp;
    setOrder(lockedTop ? [lockedTop, ...next] : next);
  };

  const moveDown = (idx: number) => {
    if (idx >= reorderableItems.length - 1) return;
    const next = [...reorderableItems];
    const temp = next[idx];
    next[idx] = next[idx + 1];
    next[idx + 1] = temp;
    setOrder(lockedTop ? [lockedTop, ...next] : next);
  };

  // Drag & drop handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    dragItem.current = index;
    setDragIdx(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnter = (index: number) => {
    if (dragItem.current === null) return;
    setOverIdx(index);
  };

  const handleDragEnd = () => {
    if (dragItem.current !== null && overIdx !== null && dragItem.current !== overIdx) {
      const next = [...reorderableItems];
      const [movedItem] = next.splice(dragItem.current, 1);
      next.splice(overIdx, 0, movedItem);
      setOrder(lockedTop ? [lockedTop, ...next] : next);
    }
    dragItem.current = null;
    setDragIdx(null);
    setOverIdx(null);
  };

  const customSections = landingData?.customSections || [];

  function getModuleInfo(id: string) {
    if (MODULE_META[id]) {
      return MODULE_META[id];
    }
    const custom = customSections.find((c: any) => c.id === id);
    if (custom) {
      return {
        label: `${custom.title || 'Пользовательский раздел'} (${custom.anchor || id})`,
        desc: `${custom.columnsCount}-колоночный модуль • выравнивание: ${custom.textAlign || 'center'}`,
        icon: Layers,
      };
    }
    return {
      label: `Раздел (${id})`,
      desc: 'Пользовательский контентный блок',
      icon: Layers,
    };
  }

  if (loading) {
    return (
      <div className="flex h-60 items-center justify-center text-slate-500 text-sm">
        Загрузка порядка модулей...
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
              <SlidersVertical className="w-7 h-7 text-amber-500" />
              <span>Порядок модулей сайта</span>
            </h1>
            <span className="rounded bg-amber-500/20 border border-amber-500/40 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-300 uppercase">
              Лендинг
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Управление очередностью отображения блоков сайта сверху вниз. Перетаскивайте мышью (Drag & Drop) или используйте стрелки.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-lg bg-amber-600 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-amber-500 transition-all shadow-lg shadow-amber-950/20 disabled:opacity-50"
        >
          {saved ? <Check className="h-4 w-4 text-white" /> : <Save className={`h-4 w-4 ${saving ? 'animate-spin' : ''}`} />}
          <span>{saving ? 'Сохранение...' : saved ? 'Сохранено ✓' : 'Сохранить порядок'}</span>
        </button>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-lg bg-emerald-950/40 border border-emerald-800 p-3 text-xs text-emerald-300">
          <Check className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>Новый порядок модулей успешно сохранен и применен на сайте!</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-950/40 border border-red-800 p-3 text-xs text-red-300">
          <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Hero locked */}
      <div className="flex items-center justify-between rounded-xl border border-slate-700/60 bg-[#121622] p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Sliders className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-white">Главный экран (Hero Слайдер)</span>
              <span className="text-[10px] font-mono uppercase bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                Верхний экран
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Всегда располагается сразу под шапкой на первом экране сайта
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Lock className="h-3.5 w-3.5" />
          <span>Закреплен</span>
        </div>
      </div>

      {/* Draggable items list */}
      <div className="space-y-2.5">
        {reorderableItems.map((id, idx) => {
          const info = getModuleInfo(id);
          const Icon = info.icon;
          const isDragging = dragIdx === idx;
          const isOver = overIdx === idx && dragIdx !== idx;

          return (
            <div
              key={id}
              draggable
              onDragStart={(e) => handleDragStart(e, idx)}
              onDragEnter={() => handleDragEnter(idx)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => e.preventDefault()}
              className={`flex items-center justify-between gap-3 rounded-xl border p-3.5 transition-all ${
                isDragging
                  ? 'opacity-40 border-amber-500/60 bg-[#162032]'
                  : isOver
                  ? 'border-amber-400 bg-[#1a2333] shadow-md scale-[1.01]'
                  : 'border-[#263143] bg-[#0c101a] hover:border-[#384660]'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="cursor-grab active:cursor-grabbing p-1 text-slate-500 hover:text-amber-400 transition-colors"
                  title="Потяните для изменения порядка"
                >
                  <GripVertical className="h-5 w-5" />
                </div>
                <span className="font-mono text-xs font-bold text-slate-500 w-5">
                  0{idx + 2}
                </span>
                <div className="p-2 rounded-lg bg-[#141b27] border border-[#222e44] text-amber-400 shrink-0">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-sm text-white truncate">{info.label}</div>
                  <div className="text-xs text-slate-400 truncate">{info.desc}</div>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => moveUp(idx)}
                  disabled={idx === 0}
                  className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-20"
                  title="Поднять выше"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => moveDown(idx)}
                  disabled={idx === reorderableItems.length - 1}
                  className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-20"
                  title="Опустить ниже"
                >
                  <ArrowDown className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Reset */}
      <div className="pt-4 border-t border-[#1e293b] flex items-center justify-between text-xs text-slate-400">
        <span>Порядок сохраняется в базе и определяет последовательность отрисовки модулей.</span>
        <button
          type="button"
          onClick={() => {
            if (confirm('Сбросить порядок модулей к заводским настройкам?')) {
              setOrder(DEFAULT_LANDING_ORDER);
            }
          }}
          className="text-slate-500 hover:text-amber-400 underline transition-colors"
        >
          Сбросить по умолчанию
        </button>
      </div>
    </div>
  );
}
