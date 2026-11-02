'use client';

import React, { useState, useEffect, useRef } from 'react';
import NextLink from 'next/link';
import {
  Menu as MenuIcon,
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  GripVertical,
  ArrowUp,
  ArrowDown,
  Check,
  AlertCircle,
  ExternalLink,
  Layers,
  Sparkles,
} from 'lucide-react';
import { DEFAULT_LANDING } from '@/data/defaultContent';
import { notifyContentUpdated } from '@/lib/content';

interface NavLinkItem {
  label: string;
  href: string;
  isRed?: boolean;
  isExternal?: boolean;
  highlight?: boolean;
}

export default function AdminMenuPage() {
  const [navLinks, setNavLinks] = useState<NavLinkItem[]>([]);
  const [landingData, setLandingData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  // Drag & drop state
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);
  const dragItem = useRef<number | null>(null);

  useEffect(() => {
    loadMenuData();
  }, []);

  async function loadMenuData() {
    try {
      const res = await fetch('/api/admin/content/landing');
      if (res.ok) {
        const json = await res.json();
        setLandingData(json);
        const links = json?.header?.navLinks;
        if (Array.isArray(links) && links.length > 0) {
          setNavLinks(links);
        } else {
          setNavLinks(DEFAULT_LANDING.header.navLinks);
        }
      } else {
        setNavLinks(DEFAULT_LANDING.header.navLinks);
      }
    } catch {
      setNavLinks(DEFAULT_LANDING.header.navLinks);
    }
    setLoading(false);
  }

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    setError('');
    try {
      // 1. Сохраняем в landing (основной источник для лендинга)
      const currentLanding = landingData || DEFAULT_LANDING;
      const updatedLanding = {
        ...currentLanding,
        header: {
          ...(currentLanding.header || {}),
          navLinks,
        },
      };

      const res1 = await fetch('/api/admin/content/landing', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedLanding),
      });

      // 2. Также обновляем header (для режима портала и синхронизации)
      try {
        const resHeader = await fetch('/api/admin/content/header');
        let headerData = {};
        if (resHeader.ok) {
          headerData = await resHeader.json();
        }
        await fetch('/api/admin/content/header', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...headerData,
            navLinks,
          }),
        });
      } catch {}

      if (res1.ok) {
        setSaved(true);
        setLandingData(updatedLanding);
        notifyContentUpdated();
        setTimeout(() => setSaved(false), 3500);
      } else {
        const err = await res1.json();
        setError(err.error || 'Ошибка при сохранении меню');
      }
    } catch {
      setError('Ошибка сети при сохранении меню');
    }
    setSaving(false);
  }

  const updateNavLink = (idx: number, key: keyof NavLinkItem, val: any) => {
    const next = [...navLinks];
    next[idx] = { ...next[idx], [key]: val };
    setNavLinks(next);
  };

  const addNavLink = () => {
    setNavLinks([
      ...navLinks,
      { label: 'Новый раздел', href: '#section' },
    ]);
  };

  const removeNavLink = (idx: number) => {
    if (navLinks.length <= 1) {
      alert('В меню должен оставаться хотя бы один пункт.');
      return;
    }
    if (!confirm(`Удалить пункт меню "${navLinks[idx]?.label}"?`)) return;
    setNavLinks(navLinks.filter((_, i) => i !== idx));
  };

  const moveUp = (idx: number) => {
    if (idx === 0) return;
    const next = [...navLinks];
    const temp = next[idx];
    next[idx] = next[idx - 1];
    next[idx - 1] = temp;
    setNavLinks(next);
  };

  const moveDown = (idx: number) => {
    if (idx >= navLinks.length - 1) return;
    const next = [...navLinks];
    const temp = next[idx];
    next[idx] = next[idx + 1];
    next[idx + 1] = temp;
    setNavLinks(next);
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
      const next = [...navLinks];
      const [reorderedItem] = next.splice(dragItem.current, 1);
      next.splice(overIdx, 0, reorderedItem);
      setNavLinks(next);
    }
    dragItem.current = null;
    setDragIdx(null);
    setOverIdx(null);
  };

  if (loading) {
    return (
      <div className="flex h-60 items-center justify-center text-slate-500 text-sm">
        Загрузка пунктов меню...
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
              <MenuIcon className="w-7 h-7 text-amber-500" />
              <span>Меню сайта</span>
            </h1>
            <span className="rounded bg-amber-500/20 border border-amber-500/40 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-300 uppercase">
              Шапка и Подвал
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Управление пунктами главного меню сайта. Названия и порядок ссылок автоматически обновляются в верхней шапке и в подвале сайта.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-lg bg-amber-600 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-amber-500 transition-all shadow-lg shadow-amber-950/20 disabled:opacity-50"
        >
          {saved ? (
            <Check className="h-4 w-4 text-white" />
          ) : (
            <Save className={`h-4 w-4 ${saving ? 'animate-spin' : ''}`} />
          )}
          <span>{saving ? 'Сохранение...' : saved ? 'Сохранено ✓' : 'Сохранить меню'}</span>
        </button>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-lg bg-emerald-950/40 border border-emerald-800 p-3 text-xs text-emerald-300">
          <Check className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>Пункты меню успешно сохранены и синхронизированы в шапке и подвале сайта!</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-950/40 border border-red-800 p-3 text-xs text-red-300">
          <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Info Notice */}
      <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-4 text-xs text-blue-200 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-white">Удобное редактирование и перетаскивание (Drag & Drop):</p>
          <p>
            Вы можете перетаскивать пункты меню мышкой за значок с шестью точками слева, либо использовать стрелки вверх/вниз для точного позиционирования.
            Изменения в названии или порядке пунктов сразу отражаются как в основной навигации шапки, так и в блоке «Разделы» подвала.
          </p>
        </div>
      </div>

      {/* Main List */}
      <div className="rounded-xl border border-[#222] bg-[#12161f] p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-[#222] pb-3">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-amber-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Пункты навигации ({navLinks.length})
            </h2>
          </div>
          <button
            type="button"
            onClick={addNavLink}
            className="inline-flex items-center gap-1.5 rounded bg-amber-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-amber-500 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Добавить пункт</span>
          </button>
        </div>

        <div className="space-y-2.5">
          {navLinks.map((item, idx) => {
            const isDragging = dragIdx === idx;
            const isOver = overIdx === idx && dragIdx !== idx;

            return (
              <div
                key={idx}
                draggable
                onDragStart={(e) => handleDragStart(e, idx)}
                onDragEnter={() => handleDragEnter(idx)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => e.preventDefault()}
                className={`group flex items-center gap-2 rounded-lg border p-3 transition-all ${
                  isDragging
                    ? 'opacity-40 border-amber-500/60 bg-[#162032]'
                    : isOver
                    ? 'border-amber-400 bg-[#1a2333] shadow-md scale-[1.01]'
                    : 'border-[#263143] bg-[#0c101a] hover:border-[#384660]'
                }`}
              >
                {/* Drag handle */}
                <div
                  className="cursor-grab active:cursor-grabbing p-1 text-slate-500 group-hover:text-amber-400 transition-colors"
                  title="Потяните для изменения порядка (Drag & Drop)"
                >
                  <GripVertical className="h-5 w-5" />
                </div>

                {/* Index badge */}
                <span className="font-mono text-xs font-bold text-slate-500 w-6 text-center">
                  0{idx + 1}
                </span>

                {/* Label input */}
                <div className="flex-1 min-w-0">
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => updateNavLink(idx, 'label', e.target.value)}
                    placeholder="Название пункта меню"
                    className="admin-input !py-1.5 text-sm font-medium"
                  />
                </div>

                {/* Href / Anchor input */}
                <div className="w-48 sm:w-56 shrink-0">
                  <input
                    type="text"
                    value={item.href}
                    onChange={(e) => updateNavLink(idx, 'href', e.target.value)}
                    placeholder="#about или /page"
                    className="admin-input !py-1.5 font-mono text-xs text-amber-300"
                  />
                </div>

                {/* Up / Down buttons */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => moveUp(idx)}
                    disabled={idx === 0}
                    className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-20 disabled:hover:bg-transparent"
                    title="Переместить выше"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveDown(idx)}
                    disabled={idx === navLinks.length - 1}
                    className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-20 disabled:hover:bg-transparent"
                    title="Переместить ниже"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                </div>

                {/* Delete button */}
                <button
                  type="button"
                  onClick={() => removeNavLink(idx)}
                  className="p-1.5 rounded text-slate-500 hover:text-red-400 hover:bg-red-950/40 transition-colors shrink-0"
                  title="Удалить пункт меню"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Quick presets */}
        <div className="pt-4 border-t border-[#1e293b] flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <span>Подсказка: используйте якоря секций сайта (#about, #projects, #news, #documents, #partners, #contacts)</span>
          <button
            type="button"
            onClick={() => {
              if (confirm('Сбросить меню к стандартным 6 разделам?')) {
                setNavLinks(DEFAULT_LANDING.header.navLinks);
              }
            }}
            className="text-slate-500 hover:text-amber-400 underline transition-colors"
          >
            Восстановить по умолчанию
          </button>
        </div>
      </div>
    </div>
  );
}
