'use client';

import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import {
  ArrowLeft,
  LayoutGrid,
  Plus,
  Trash2,
  Save,
  Check,
  Mountain,
  Activity,
  Zap,
  Users,
  ShieldCheck,
  Sparkles,
  Trophy,
  Medal,
  Award,
  HeartHandshake,
  Compass,
  SlidersVertical,
  Image as ImageIcon,
} from 'lucide-react';
import { useSiteContent, updateSection, resolveMediaUrl } from '@/lib/content';
import { DEFAULT_WIDGETS, WidgetItem } from '@/components/landing/WidgetsBar';
import { MediaPickerModal } from '@/components/admin/MediaPickerModal';

const ICON_OPTIONS = [
  { id: 'mountain', label: 'Горы / Зима', icon: Mountain },
  { id: 'activity', label: 'Здоровье / Пульс', icon: Activity },
  { id: 'zap', label: 'Инновации / Молния', icon: Zap },
  { id: 'users', label: 'Сообщество / Люди', icon: Users },
  { id: 'shield', label: 'Надёжность / Щит', icon: ShieldCheck },
  { id: 'sparkles', label: 'Технологии / Звёзды', icon: Sparkles },
  { id: 'trophy', label: 'Победы / Кубок', icon: Trophy },
  { id: 'medal', label: 'Спорт / Медаль', icon: Medal },
  { id: 'award', label: 'Стандарты / Грамота', icon: Award },
  { id: 'heart', label: 'Забота / Рукопожатие', icon: HeartHandshake },
  { id: 'compass', label: 'Развитие / Компас', icon: Compass },
];

export default function AdminWidgetsPage() {
  const { content, refresh } = useSiteContent();
  const [widgets, setWidgets] = useState<WidgetItem[]>(DEFAULT_WIDGETS);
  const [showWidgets, setShowWidgets] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Media Picker
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [activeMediaIndex, setActiveMediaIndex] = useState<number | null>(null);

  useEffect(() => {
    if (content?.landing) {
      const saved = (content.landing as any)?.widgets;
      if (Array.isArray(saved) && saved.length > 0) {
        setWidgets(saved);
      }
      if (typeof (content.landing as any)?.showWidgets === 'boolean') {
        setShowWidgets((content.landing as any).showWidgets);
      }
    }
  }, [content]);

  const updateItem = (index: number, key: keyof WidgetItem, val: string) => {
    const next = [...widgets];
    next[index] = { ...next[index], [key]: val };
    setWidgets(next);
  };

  const addWidget = () => {
    if (widgets.length >= 5) {
      alert('Максимальное количество виджетов в траст-баре: 5');
      return;
    }
    const newW: WidgetItem = {
      id: `w-${Date.now()}`,
      title: 'Новый виджет',
      subtitle: 'Краткое пояснение\nв две строчки',
      icon: 'sparkles',
      customIcon: '',
    };
    setWidgets([...widgets, newW]);
  };

  const removeWidget = (index: number) => {
    if (widgets.length <= 3) {
      alert('Минимальное количество виджетов в траст-баре: 3');
      return;
    }
    const next = widgets.filter((_, i) => i !== index);
    setWidgets(next);
  };

  const handleSave = async () => {
    setSaving(true);
    setSavedSuccess(false);
    try {
      const currentLanding = content?.landing || {};
      const currentOrder: string[] = (currentLanding as any).sectionOrder || [
        'hero', 'widgets', 'about', 'projects', 'news', 'documents', 'partners', 'partnership', 'contacts'
      ];

      // Ensure 'widgets' is in sectionOrder right after 'hero' if missing
      let nextOrder = [...currentOrder];
      if (!nextOrder.includes('widgets')) {
        const heroIdx = nextOrder.indexOf('hero');
        if (heroIdx !== -1) {
          nextOrder.splice(heroIdx + 1, 0, 'widgets');
        } else {
          nextOrder.unshift('widgets');
        }
      }

      const updatedLanding = {
        ...currentLanding,
        widgets,
        showWidgets,
        sectionOrder: nextOrder,
      };

      await updateSection('landing', updatedLanding);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
      refresh();
    } catch (err) {
      console.error(err);
      alert('Ошибка при сохранении виджетов');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 text-slate-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#222] pb-5 gap-4">
        <div>
          <NextLink
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Назад к дашборду</span>
          </NextLink>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
              Виджеты (Trust Bar / Highlights)
            </h1>
            <span className="rounded bg-amber-500/20 px-2 py-0.5 font-mono text-xs font-bold uppercase text-amber-400">
              Модуль
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Траст-бар с иконками и акцентными тезисами (от 3 до 5 элементов). Расположение меняется в модуле «Порядок».
          </p>
        </div>

        <div className="flex items-center gap-2">
          <NextLink
            href="/admin/section-order"
            className="flex items-center gap-1.5 rounded-lg border border-[#333] bg-[#181818] px-3 py-2 text-xs text-slate-300 hover:border-slate-500 hover:text-white transition-colors"
          >
            <SlidersVertical className="h-3.5 w-3.5 text-amber-400" />
            <span>Порядок</span>
          </NextLink>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-amber-500 hover:bg-amber-400 px-5 py-2 text-xs font-bold text-black disabled:opacity-50 transition-all shadow-lg shadow-amber-500/20"
          >
            {savedSuccess ? (
              <>
                <Check className="h-4 w-4" />
                <span>Сохранено!</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>{saving ? 'Сохранение...' : 'Сохранить'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Visibility Checkbox Toggle */}
      <div className="rounded-xl border border-[#222] bg-[#12161f] p-5 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <LayoutGrid className="h-4 w-4 text-amber-400" />
            <span>Отображение виджетов на сайте</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Включите или отключите отображение полосы виджетов (Trust Bar) на лендинге
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={showWidgets}
            onChange={(e) => setShowWidgets(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
          <span className="ml-3 text-xs font-semibold text-slate-200">
            {showWidgets ? 'Отображается' : 'Скрыт'}
          </span>
        </label>
      </div>

      {/* Widgets list */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
            Элементы виджетов ({widgets.length} из 5)
          </h3>
          <button
            onClick={addWidget}
            disabled={widgets.length >= 5}
            className="flex items-center gap-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 px-3 py-1.5 text-xs font-semibold text-white transition-colors"
          >
            <Plus className="h-3.5 w-3.5 text-amber-400" />
            <span>Добавить виджет</span>
          </button>
        </div>

        <div className="space-y-4">
          {widgets.map((w, idx) => (
            <div
              key={w.id || idx}
              className="rounded-xl border border-[#222] bg-[#12161f] p-5 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#222] pb-3">
                <span className="font-mono text-xs uppercase font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                  Виджет #{idx + 1}
                </span>
                <button
                  onClick={() => removeWidget(idx)}
                  disabled={widgets.length <= 3}
                  className="text-red-400 hover:text-red-300 disabled:opacity-30 p-1 rounded hover:bg-red-950/40"
                  title={widgets.length <= 3 ? 'Минимум 3 виджета' : 'Удалить'}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Основной заголовок</label>
                  <input
                    type="text"
                    value={w.title}
                    onChange={(e) => updateItem(idx, 'title', e.target.value)}
                    placeholder="Например: Зимний спорт"
                    className="admin-input font-bold"
                  />
                </div>

                <div>
                  <label className="admin-label">Иконка (стандартный набор)</label>
                  <select
                    value={w.icon || 'mountain'}
                    onChange={(e) => updateItem(idx, 'icon', e.target.value)}
                    className="admin-input"
                  >
                    {ICON_OPTIONS.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="admin-label">Кастомная иконка (URL или из медиатеки)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={w.customIcon || ''}
                      onChange={(e) => updateItem(idx, 'customIcon', e.target.value)}
                      placeholder="Оставьте пустым для стандартной иконки или выберите PNG/SVG..."
                      className="admin-input font-mono text-xs flex-1 text-amber-300"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setActiveMediaIndex(idx);
                        setMediaPickerOpen(true);
                      }}
                      className="flex items-center gap-1.5 rounded bg-slate-800 hover:bg-slate-700 px-3 py-1.5 text-xs text-white"
                    >
                      <ImageIcon className="h-3.5 w-3.5" />
                      <span>Обзор</span>
                    </button>
                    {w.customIcon && (
                      <button
                        type="button"
                        onClick={() => updateItem(idx, 'customIcon', '')}
                        className="rounded border border-red-500/40 px-2 py-1 text-xs text-red-400 hover:bg-red-500/10"
                        title="Сбросить кастомную иконку"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="admin-label">
                    Тезис / подзаголовок (текстовое поле в 2-3 строчки)
                  </label>
                  <textarea
                    rows={2}
                    value={w.subtitle}
                    onChange={(e) => updateItem(idx, 'subtitle', e.target.value)}
                    placeholder="Например: Наш приоритет&#10;Развиваем спортивные базы"
                    className="admin-textarea"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Media Picker */}
      {mediaPickerOpen && (
        <MediaPickerModal
          isOpen={mediaPickerOpen}
          onClose={() => setMediaPickerOpen(false)}
          onSelect={(url) => {
            if (activeMediaIndex !== null) {
              updateItem(activeMediaIndex, 'customIcon', url);
            }
            setMediaPickerOpen(false);
          }}
        />
      )}
    </div>
  );
}
