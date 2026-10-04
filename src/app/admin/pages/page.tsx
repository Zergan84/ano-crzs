'use client';

import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { 
  ArrowLeft, 
  Layers, 
  Plus, 
  Trash2, 
  Save, 
  Check, 
  AlertCircle, 
  Image as ImageIcon,
  ExternalLink,
  ChevronRight,
  Eye
} from 'lucide-react';
import { MediaPickerModal } from '@/components/admin/MediaPickerModal';

interface CustomPage {
  id: string;
  label: string;
  heading: string;
  text: string;
  image: string;
  layout: 'left' | 'center' | 'right';
  showButton: boolean;
  buttonText: string;
  buttonHref: string;
}

export default function AdminPagesPage() {
  const [items, setItems] = useState<CustomPage[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  // Media picker modal
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [mediaPickerCallback, setMediaPickerCallback] = useState<((url: string) => void) | null>(null);

  useEffect(() => {
    loadPages();
  }, []);

  async function loadPages() {
    try {
      const apiEndpoint = (typeof window !== 'undefined' && window.location.hostname.includes('pages.dev'))
        ? 'https://ano-crzs.101filmstudio.workers.dev/api/admin/content/pages'
        : '/api/admin/content/pages';

      const res = await fetch(apiEndpoint);
      if (res.ok) {
        const json = await res.json();
        if (json && Array.isArray(json.items)) {
          setItems(json.items);
        }
      }
    } catch {}
    setLoading(false);
  }

  async function handleSave(newItems = items) {
    setSaving(true);
    setSaved(false);
    setError('');
    try {
      const apiEndpoint = (typeof window !== 'undefined' && window.location.hostname.includes('pages.dev'))
        ? 'https://ano-crzs.101filmstudio.workers.dev/api/admin/content/pages'
        : '/api/admin/content/pages';

      const res = await fetch(apiEndpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: newItems }),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3500);
      } else {
        const err = await res.json();
        setError(err.error || 'Ошибка при сохранении страниц');
      }
    } catch {
      setError('Ошибка подключения');
    }
    setSaving(false);
  }

  function createPage() {
    const rawId = prompt('Идентификатор раздела (латиницей, например: promo или seminar)') || '';
    const id = rawId.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
    if (!id) return;

    if (items.some((p) => p.id === id)) {
      alert('Раздел с таким идентификатором уже существует');
      return;
    }

    const label = (prompt('Название раздела в меню (например: АКЦИИ)') || id).trim() || id;

    const newPage: CustomPage = {
      id,
      label,
      heading: label,
      text: 'Описание и ключевая информация нового модуля...',
      image: '',
      layout: 'left',
      showButton: true,
      buttonText: 'Узнать больше',
      buttonHref: `/#${id}`,
    };

    const nextItems = [...items, newPage];
    setItems(nextItems);
    setSelectedIdx(nextItems.length - 1);
    handleSave(nextItems);

    // Offer adding to menu automatically
    if (confirm(`Добавить раздел "${label}" в главное меню сайта?`)) {
      fetch('/api/admin/content/header')
        .then((r) => (r.ok ? r.json() : null))
        .then((header) => {
          if (!header) return;
          const navLinks = Array.isArray(header.navLinks) ? [...header.navLinks] : [];
          if (!navLinks.some((l: any) => l.href === `/#${id}`)) {
            navLinks.push({ label, href: `/#${id}` });
            fetch('/api/admin/content/header', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ...header, navLinks }),
            });
          }
        })
        .catch(() => {});
    }
  }

  function deletePage(idx: number) {
    const item = items[idx];
    if (!confirm(`Удалить страницу / модуль "${item.label || item.id}"?`)) return;
    const next = items.filter((_, i) => i !== idx);
    setItems(next);
    setSelectedIdx(null);
    handleSave(next);
  }

  function updatePage(idx: number, updates: Partial<CustomPage>) {
    const next = [...items];
    next[idx] = { ...next[idx], ...updates };
    setItems(next);
  }

  function openMediaPicker(onSelect: (url: string) => void) {
    setMediaPickerCallback(() => onSelect);
    setMediaPickerOpen(true);
  }

  if (loading) {
    return (
      <div className="flex h-60 items-center justify-center text-slate-500 text-sm">
        Загрузка страниц...
      </div>
    );
  }

  // Edit Single Page Mode
  if (selectedIdx !== null && items[selectedIdx]) {
    const page = items[selectedIdx];

    return (
      <div className="max-w-4xl mx-auto space-y-6 pb-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#222] pb-5">
          <div>
            <button
              onClick={() => setSelectedIdx(null)}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors mb-2"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Назад ко всем страницам</span>
            </button>
            <h1 className="text-2xl font-black text-white tracking-wide">
              Редактирование модуля &laquo;{page.label || page.id}&raquo;
            </h1>
            <p className="mt-1 text-xs text-slate-400 font-mono">#{page.id}</p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => deletePage(selectedIdx)}
              className="flex items-center gap-1.5 rounded-lg border border-red-500/40 bg-red-950/40 px-3.5 py-2.5 text-xs font-bold text-red-400 hover:bg-red-900/60 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              <span>Удалить</span>
            </button>

            <button
              onClick={() => handleSave()}
              disabled={saving}
              className="flex items-center gap-2 rounded-lg bg-red-600 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-red-500 transition-all shadow-lg shadow-red-950/20 disabled:opacity-50"
            >
              <Save className={`h-4 w-4 ${saving ? 'animate-spin' : ''}`} />
              <span>{saving ? 'Сохранение...' : 'Сохранить'}</span>
            </button>
          </div>
        </div>

        {saved && (
          <div className="flex items-center gap-2 rounded-lg bg-emerald-950/40 border border-emerald-800 p-3 text-xs text-emerald-300">
            <Check className="h-4 w-4 text-emerald-400" />
            <span>Страница успешно сохранена!</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="admin-label">Идентификатор якоря (ID)</label>
              <input
                type="text"
                value={page.id}
                readOnly
                className="admin-input font-mono text-xs opacity-60 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="admin-label">Название в меню (Метка)</label>
              <input
                type="text"
                value={page.label}
                onChange={(e) => updatePage(selectedIdx, { label: e.target.value })}
                className="admin-input font-bold"
              />
            </div>

            <div>
              <label className="admin-label">Главный заголовок блока</label>
              <input
                type="text"
                value={page.heading}
                onChange={(e) => updatePage(selectedIdx, { heading: e.target.value })}
                className="admin-input font-bold"
              />
            </div>

            <div>
              <label className="admin-label">Основной текст блока</label>
              <textarea
                rows={5}
                value={page.text}
                onChange={(e) => updatePage(selectedIdx, { text: e.target.value })}
                className="admin-textarea"
              />
            </div>

            <div>
              <label className="admin-label">Выравнивание блока</label>
              <select
                value={page.layout || 'left'}
                onChange={(e) => updatePage(selectedIdx, { layout: e.target.value as any })}
                className="admin-input"
              >
                <option value="left">Текст слева, фото справа</option>
                <option value="right">Фото слева, текст справа</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="admin-label">Изображение блока</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={page.image}
                  onChange={(e) => updatePage(selectedIdx, { image: e.target.value })}
                  className="admin-input font-mono text-xs flex-1"
                  placeholder="URL или выбор из R2"
                />
                <button
                  type="button"
                  onClick={() => openMediaPicker((url) => updatePage(selectedIdx, { image: url }))}
                  className="flex items-center gap-1.5 rounded bg-[#1e2638] border border-[#334155] px-3 py-2 text-xs text-slate-200 hover:bg-[#28334a]"
                >
                  <ImageIcon className="h-3.5 w-3.5" />
                  <span>Медиатека</span>
                </button>
              </div>
              {page.image && (
                <div className="mt-2 h-36 w-full overflow-hidden rounded-xl border border-[#2a2a2a] bg-black">
                  <img src={page.image} alt="" className="h-full w-full object-cover" />
                </div>
              )}
            </div>

            <div className="rounded-xl border border-[#222] bg-[#12161f] p-4 space-y-3">
              <label className="flex items-center gap-2 text-slate-200 text-xs font-bold cursor-pointer">
                <input
                  type="checkbox"
                  checked={page.showButton}
                  onChange={(e) => updatePage(selectedIdx, { showButton: e.target.checked })}
                  className="accent-red-600 rounded"
                />
                <span>Отображать кнопку действия</span>
              </label>

              {page.showButton && (
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="admin-label">Текст кнопки</label>
                    <input
                      type="text"
                      value={page.buttonText}
                      onChange={(e) => updatePage(selectedIdx, { buttonText: e.target.value })}
                      className="admin-input"
                      placeholder="Например: Подать заявку"
                    />
                  </div>
                  <div>
                    <label className="admin-label">Ссылка кнопки (href)</label>
                    <input
                      type="text"
                      value={page.buttonHref}
                      onChange={(e) => updatePage(selectedIdx, { buttonHref: e.target.value })}
                      className="admin-input font-mono text-xs"
                      placeholder="/contacts или https://..."
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Media Picker */}
        <MediaPickerModal
          isOpen={mediaPickerOpen}
          onClose={() => setMediaPickerOpen(false)}
          onSelect={(url) => {
            if (mediaPickerCallback) mediaPickerCallback(url);
            setMediaPickerOpen(false);
          }}
        />
      </div>
    );
  }

  // List of Pages Mode
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
            <Layers className="w-7 h-7 text-red-500" />
            <span>Пользовательские страницы и модули</span>
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Создание и управление дополнительными информационными разделами сайта
          </p>
        </div>

        <button
          onClick={createPage}
          className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-red-500 transition-all shadow-lg shadow-red-950/20"
        >
          <Plus className="h-4 w-4" />
          <span>Создать модуль</span>
        </button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#333] p-12 text-center space-y-4">
          <Layers className="w-12 h-12 text-slate-600 mx-auto" />
          <div>
            <h3 className="text-base font-bold text-white">Нет созданных страниц</h3>
            <p className="text-xs text-slate-400 mt-1">
              Нажмите кнопку ниже, чтобы создать новый контентный блок или страницу
            </p>
          </div>
          <button
            onClick={createPage}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500"
          >
            <Plus className="h-4 w-4" />
            <span>+ Создать страницу</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((page, i) => (
            <div
              key={page.id || i}
              onClick={() => setSelectedIdx(i)}
              className="rounded-xl border border-[#222] bg-[#12161f] p-5 hover:border-red-500/50 hover:bg-[#161c28] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {page.image && (
                  <div className="w-full h-32 rounded-lg overflow-hidden bg-black mb-3 border border-[#222]">
                    <img src={page.image} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-800">
                    #{page.id}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-base font-bold text-white mt-2 group-hover:text-red-400 transition-colors">
                  {page.label || page.id}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {page.heading}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#1c2230] flex items-center justify-between text-[11px] text-slate-500">
                <span>{page.showButton ? 'С кнопкой' : 'Без кнопки'}</span>
                <span className="text-blue-400 group-hover:underline">Редактировать →</span>
              </div>
            </div>
          ))}

          {/* Add Page Card */}
          <button
            onClick={createPage}
            className="rounded-xl border-2 border-dashed border-[#2d3748] hover:border-red-500 p-8 flex flex-col items-center justify-center gap-3 transition-colors text-slate-400 hover:text-white min-h-[220px]"
          >
            <div className="w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center text-red-500 text-2xl font-light">
              +
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Создать новую страницу
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
