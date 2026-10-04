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
  Flame,
  ChevronDown,
  Layers,
  Sparkles
} from 'lucide-react';
import { DEFAULT_HEADER } from '@/data/defaultContent';

interface NavSubItem {
  label: string;
  href: string;
}

interface NavLinkItem {
  label: string;
  href: string;
  isRed?: boolean;
  isExternal?: boolean;
  highlight?: boolean;
  hasSubmenu?: boolean;
  subItems?: NavSubItem[];
}

interface HeaderData {
  navLinks: NavLinkItem[];
  phone: string;
  phoneTel: string;
  ctaButtonText: string;
  ctaButtonHref: string;
  registryButtonText: string;
  registryButtonHref: string;
}

export default function HeaderMenuAdminPage() {
  const [data, setData] = useState<HeaderData>(DEFAULT_HEADER);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  // Drag & drop state
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);
  const dragItem = useRef<number | null>(null);

  // New module modal
  const [createModuleOpen, setCreateModuleOpen] = useState(false);
  const [moduleTitle, setModuleTitle] = useState('');
  const [moduleId, setModuleId] = useState('');

  useEffect(() => {
    loadHeaderData();
  }, []);

  async function loadHeaderData() {
    try {
      const apiEndpoint = (typeof window !== 'undefined' && window.location.hostname.includes('pages.dev'))
        ? 'https://ano-crzs.101filmstudio.workers.dev/api/admin/content/header'
        : '/api/admin/content/header';

      const res = await fetch(apiEndpoint);
      if (res.ok) {
        const json = await res.json();
        if (json && Array.isArray(json.navLinks)) {
          setData({
            ...DEFAULT_HEADER,
            ...json,
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
      const apiEndpoint = (typeof window !== 'undefined' && window.location.hostname.includes('pages.dev'))
        ? 'https://ano-crzs.101filmstudio.workers.dev/api/admin/content/header'
        : '/api/admin/content/header';

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
        setError(err.error || 'Ошибка при сохранении меню');
      }
    } catch {
      setError('Ошибка сети');
    }
    setSaving(false);
  }

  // Reordering functions
  function handleDragStart(e: React.DragEvent, idx: number) {
    dragItem.current = idx;
    setDragIdx(idx);
    e.dataTransfer.effectAllowed = 'move';
  }

  function handleDragOver(e: React.DragEvent, idx: number) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setOverIdx(idx);
  }

  function handleDrop(e: React.DragEvent, dropIdx: number) {
    e.preventDefault();
    const fromIdx = dragItem.current;
    if (fromIdx === null || fromIdx === dropIdx) {
      setDragIdx(null);
      setOverIdx(null);
      return;
    }

    const next = [...data.navLinks];
    const [moved] = next.splice(fromIdx, 1);
    next.splice(dropIdx, 0, moved);

    setData({ ...data, navLinks: next });
    setDragIdx(null);
    setOverIdx(null);
    dragItem.current = null;
  }

  function handleDragEnd() {
    setDragIdx(null);
    setOverIdx(null);
    dragItem.current = null;
  }

  function moveUp(idx: number) {
    if (idx <= 0) return;
    const next = [...data.navLinks];
    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
    setData({ ...data, navLinks: next });
  }

  function moveDown(idx: number) {
    if (idx >= data.navLinks.length - 1) return;
    const next = [...data.navLinks];
    [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
    setData({ ...data, navLinks: next });
  }

  function updateItem(idx: number, updates: Partial<NavLinkItem>) {
    const next = [...data.navLinks];
    next[idx] = { ...next[idx], ...updates };
    setData({ ...data, navLinks: next });
  }

  function removeItem(idx: number) {
    if (!confirm(`Удалить пункт меню "${data.navLinks[idx]?.label}"?`)) return;
    const next = data.navLinks.filter((_, i) => i !== idx);
    setData({ ...data, navLinks: next });
  }

  function addMenuItem() {
    const newItem: NavLinkItem = {
      label: 'Новый пункт',
      href: '/#new',
      isRed: false,
      isExternal: false,
    };
    setData({ ...data, navLinks: [...data.navLinks, newItem] });
  }

  // Quick module creation
  async function handleCreateNewModule() {
    const title = moduleTitle.trim();
    const id = moduleId.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-') || `sec-${Date.now()}`;
    if (!title) return;

    // 1. Add to navLinks
    const newNavLink: NavLinkItem = {
      label: title,
      href: `/#${id}`,
      isRed: false,
      isExternal: false,
    };
    const nextNav = [...data.navLinks, newNavLink];
    setData({ ...data, navLinks: nextNav });

    // 2. Add to pages in backend R2 if possible
    try {
      const pagesRes = await fetch('/api/admin/content/pages');
      if (pagesRes.ok) {
        const pagesData = await pagesRes.json();
        const items = Array.isArray(pagesData.items) ? pagesData.items : [];
        if (!items.some((p: any) => p.id === id)) {
          items.push({
            id,
            label: title,
            heading: title,
            text: 'Текст нового раздела...',
            image: '',
            layout: 'left',
            showButton: false,
            buttonText: '',
            buttonHref: '',
            socialLinks: [],
          });
          await fetch('/api/admin/content/pages', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items }),
          });
        }
      }
    } catch {}

    setModuleTitle('');
    setModuleId('');
    setCreateModuleOpen(false);
  }

  // Subitems management
  function addSubItem(parentIdx: number) {
    const parent = data.navLinks[parentIdx];
    const subItems = Array.isArray(parent.subItems) ? [...parent.subItems] : [];
    subItems.push({ label: 'Новый подраздел', href: parent.href });
    updateItem(parentIdx, { hasSubmenu: true, subItems });
  }

  function updateSubItem(parentIdx: number, subIdx: number, updates: Partial<NavSubItem>) {
    const parent = data.navLinks[parentIdx];
    const subItems = Array.isArray(parent.subItems) ? [...parent.subItems] : [];
    subItems[subIdx] = { ...subItems[subIdx], ...updates };
    updateItem(parentIdx, { subItems });
  }

  function removeSubItem(parentIdx: number, subIdx: number) {
    const parent = data.navLinks[parentIdx];
    const subItems = (parent.subItems || []).filter((_, i) => i !== subIdx);
    updateItem(parentIdx, { subItems, hasSubmenu: subItems.length > 0 });
  }

  if (loading) {
    return (
      <div className="flex h-60 items-center justify-center text-slate-500 text-sm">
        Загрузка меню сайта...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
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
            <MenuIcon className="w-7 h-7 text-red-500" />
            <span>Управление Меню сайта (Навигация)</span>
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Перетаскивайте пункты меню (Drag & Drop), добавляйте новые ссылки и создавайте новые модули
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setCreateModuleOpen(true)}
            className="flex items-center gap-1.5 rounded-lg border border-blue-500/40 bg-blue-950/40 px-3.5 py-2.5 text-xs font-bold text-blue-300 hover:bg-blue-900/60 transition-colors"
          >
            <Layers className="h-4 w-4" />
            <span>+ Новый модуль сайта</span>
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-red-500 transition-all shadow-lg shadow-red-950/20 disabled:opacity-50"
          >
            {saved ? <Check className="h-4 w-4 text-white" /> : <Save className={`h-4 w-4 ${saving ? 'animate-spin' : ''}`} />}
            <span>{saving ? 'Сохранение...' : saved ? 'Сохранено ✓' : 'Сохранить изменения'}</span>
          </button>
        </div>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-lg bg-emerald-950/40 border border-emerald-800 p-3 text-xs text-emerald-300">
          <Check className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>Структура меню успешно сохранена в R2 и обновлена на сайте!</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-950/40 border border-red-800 p-3 text-xs text-red-300">
          <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Drag & Drop List of Menu Links */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#222] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Пункты главного меню ({data.navLinks.length})
          </span>
          <button
            type="button"
            onClick={addMenuItem}
            className="flex items-center gap-1.5 rounded bg-[#1e2533] border border-[#334155] px-3 py-1.5 text-xs font-bold text-slate-200 hover:bg-[#283244] transition-colors"
          >
            <Plus className="h-3.5 w-3.5 text-red-400" />
            <span>Добавить пункт</span>
          </button>
        </div>

        <div className="space-y-3">
          {data.navLinks.map((item, i) => {
            const isDragging = dragIdx === i;
            const isOver = overIdx === i && dragIdx !== i;

            return (
              <div
                key={i}
                draggable
                onDragStart={(e) => handleDragStart(e, i)}
                onDragOver={(e) => handleDragOver(e, i)}
                onDrop={(e) => handleDrop(e, i)}
                onDragEnd={handleDragEnd}
                className={`rounded-xl border p-4 transition-all ${
                  isDragging
                    ? 'border-red-500 opacity-40 scale-[0.98]'
                    : isOver
                    ? 'border-red-500 bg-red-950/20 shadow-lg'
                    : 'border-[#222] bg-[#12161f] hover:border-slate-600'
                }`}
              >
                {/* Header row of item */}
                <div className="flex items-center gap-3">
                  {/* Drag handle */}
                  <div className="text-slate-500 hover:text-white cursor-grab active:cursor-grabbing p-1 shrink-0">
                    <GripVertical className="w-4 h-4" />
                  </div>

                  <span className="font-mono text-xs text-slate-500 w-5 shrink-0">
                    0{i + 1}
                  </span>

                  {/* Input Label */}
                  <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1 font-mono uppercase">
                        Название в меню
                      </label>
                      <input
                        type="text"
                        value={item.label}
                        onChange={(e) => updateItem(i, { label: e.target.value })}
                        className="admin-input font-bold"
                        placeholder="Название"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1 font-mono uppercase">
                        Ссылка (href / якорь)
                      </label>
                      <input
                        type="text"
                        value={item.href}
                        onChange={(e) => updateItem(i, { href: e.target.value })}
                        className="admin-input font-mono text-xs"
                        placeholder="/about или https://..."
                      />
                    </div>
                  </div>

                  {/* Up / Down Controls */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => moveUp(i)}
                      disabled={i === 0}
                      className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-[#222] disabled:opacity-20 transition-colors"
                      title="Выше"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveDown(i)}
                      disabled={i === data.navLinks.length - 1}
                      className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-[#222] disabled:opacity-20 transition-colors"
                      title="Ниже"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeItem(i)}
                      className="p-1.5 rounded text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors"
                      title="Удалить пункт"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Additional Options Strip */}
                <div className="mt-3 pt-3 border-t border-[#1c2230] flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="flex flex-wrap items-center gap-4">
                    {/* isRed Toggle */}
                    <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white">
                      <input
                        type="checkbox"
                        checked={!!item.isRed}
                        onChange={(e) => updateItem(i, { isRed: e.target.checked })}
                        className="rounded accent-red-600"
                      />
                      <Flame className="w-3.5 h-3.5 text-red-500" />
                      <span className={item.isRed ? 'text-red-400 font-bold' : ''}>
                        Выделять красным 🔥
                      </span>
                    </label>

                    {/* isExternal Toggle */}
                    <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white">
                      <input
                        type="checkbox"
                        checked={!!item.isExternal}
                        onChange={(e) => updateItem(i, { isExternal: e.target.checked })}
                        className="rounded accent-blue-600"
                      />
                      <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                      <span>Новая вкладка</span>
                    </label>

                    {/* highlight Toggle */}
                    <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white">
                      <input
                        type="checkbox"
                        checked={!!item.highlight}
                        onChange={(e) => updateItem(i, { highlight: e.target.checked })}
                        className="rounded accent-blue-600"
                      />
                      <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                      <span>Синяя точка-индикатор</span>
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={() => addSubItem(i)}
                    className="text-[11px] text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  >
                    + Добавить подпункт (выпадающее меню)
                  </button>
                </div>

                {/* Submenu editor */}
                {Array.isArray(item.subItems) && item.subItems.length > 0 && (
                  <div className="mt-3 pl-6 border-l-2 border-blue-500/40 space-y-2">
                    <div className="text-[11px] text-slate-400 font-mono uppercase">
                      Выпадающие подпункты:
                    </div>
                    {item.subItems.map((sub, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={sub.label}
                          onChange={(e) => updateSubItem(i, sIdx, { label: e.target.value })}
                          className="admin-input text-xs py-1.5 flex-1"
                          placeholder="Название подпункта"
                        />
                        <input
                          type="text"
                          value={sub.href}
                          onChange={(e) => updateSubItem(i, sIdx, { href: e.target.value })}
                          className="admin-input font-mono text-xs py-1.5 flex-1"
                          placeholder="Ссылка /about/..."
                        />
                        <button
                          type="button"
                          onClick={() => removeSubItem(i, sIdx)}
                          className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Header Secondary Info: Phone & Buttons */}
      <div className="rounded-xl border border-[#222] bg-[#12161f] p-5 space-y-4">
        <h3 className="text-base font-bold text-white border-b border-[#222] pb-3">
          Параметры и кнопки шапки сайта
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="admin-label">Телефон в шапке (отображение)</label>
            <input
              type="text"
              value={data.phone || ''}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label">Телефон для звонка (tel:)</label>
            <input
              type="text"
              value={data.phoneTel || ''}
              onChange={(e) => setData({ ...data, phoneTel: e.target.value })}
              className="admin-input font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="admin-label">Главная кнопка действия (текст)</label>
            <input
              type="text"
              value={data.ctaButtonText || ''}
              onChange={(e) => setData({ ...data, ctaButtonText: e.target.value })}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label">Главная кнопка действия (ссылка)</label>
            <input
              type="text"
              value={data.ctaButtonHref || ''}
              onChange={(e) => setData({ ...data, ctaButtonHref: e.target.value })}
              className="admin-input font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="admin-label">Кнопка реестра (текст)</label>
            <input
              type="text"
              value={data.registryButtonText || ''}
              onChange={(e) => setData({ ...data, registryButtonText: e.target.value })}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label">Кнопка реестра (ссылка)</label>
            <input
              type="text"
              value={data.registryButtonHref || ''}
              onChange={(e) => setData({ ...data, registryButtonHref: e.target.value })}
              className="admin-input font-mono"
            />
          </div>
        </div>
      </div>

      {/* Modal: Create new module / section */}
      {createModuleOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-xl border border-[#2a2a2a] bg-[#12161f] p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-400" />
              <span>Создать новый раздел / модуль сайта</span>
            </h3>
            <p className="text-xs text-slate-400">
              Новый раздел будет автоматически добавлен в пункт меню и в список страниц сайта.
            </p>

            <div>
              <label className="admin-label">Название раздела (в меню и на сайте)</label>
              <input
                type="text"
                value={moduleTitle}
                onChange={(e) => {
                  setModuleTitle(e.target.value);
                  if (!moduleId) {
                    setModuleId(e.target.value.toLowerCase().replace(/[^a-z0-9а-яё]/gi, '-'));
                  }
                }}
                placeholder="Например: Пресс-конференция 2026"
                className="admin-input"
                autoFocus
              />
            </div>

            <div>
              <label className="admin-label">Идентификатор якоря (#id, латиницей)</label>
              <input
                type="text"
                value={moduleId}
                onChange={(e) => setModuleId(e.target.value)}
                placeholder="press-2026"
                className="admin-input font-mono text-xs"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#222]">
              <button
                type="button"
                onClick={() => setCreateModuleOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Отмена
              </button>
              <button
                type="button"
                onClick={handleCreateNewModule}
                className="px-5 py-2 rounded-lg bg-blue-600 text-xs font-bold text-white hover:bg-blue-500 shadow-sm"
              >
                Создать и добавить в меню
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
