'use client';

import React, { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  Plus,
  Copy,
  Trash2,
  Edit,
  Save,
  Check,
  Layers,
  Sparkles,
  SlidersVertical,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Columns,
  Image as ImageIcon,
  HelpCircle,
  Eye,
  ExternalLink,
} from 'lucide-react';
import { useSiteContent, updateSection } from '@/lib/content';
import { MediaPickerModal } from '@/components/admin/MediaPickerModal';

interface CustomSection {
  id: string;
  anchor: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  columnsCount: 1 | 2 | 3;
  textAlign: 'left' | 'center' | 'right';
  verticalAlign?: 'top' | 'center' | 'bottom';
  col1VAlign?: 'top' | 'center' | 'bottom';
  col2VAlign?: 'top' | 'center' | 'bottom';
  col3VAlign?: 'top' | 'center' | 'bottom';
  col1Text: string;
  col1Image?: string;
  col2Text?: string;
  col2Image?: string;
  col3Text?: string;
  col3Image?: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function SectionsManagerPage() {
  const { content, refresh } = useSiteContent();
  const searchParams = useSearchParams();
  const editIdParam = searchParams.get('edit');

  const [customSections, setCustomSections] = useState<CustomSection[]>([]);
  const [selectedSection, setSelectedSection] = useState<CustomSection | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Media Picker state
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [activeMediaTarget, setActiveMediaTarget] = useState<'col1' | 'col2' | 'col3' | null>(null);

  // Sync from content
  useEffect(() => {
    if (content?.landing) {
      const list: CustomSection[] = (content.landing as any)?.customSections || [];
      setCustomSections(list);

      if (editIdParam) {
        const found = list.find((s) => s.id === editIdParam);
        if (found) {
          setSelectedSection({ ...found });
          setIsCreatingNew(false);
        }
      }
    }
  }, [content, editIdParam]);

  // Handle create new from scratch
  const handleStartCreate = () => {
    const newId = `custom-${Date.now().toString(36)}`;
    const newSec: CustomSection = {
      id: newId,
      anchor: `section-${newId.slice(-4)}`,
      eyebrow: 'НОВЫЙ РАЗДЕЛ',
      title: 'Заголовок нового раздела',
      subtitle: 'Краткое описание назначения и основных тезисов этого модуля',
      columnsCount: 3,
      textAlign: 'center',
      verticalAlign: 'center',
      col1VAlign: 'center',
      col2VAlign: 'center',
      col3VAlign: 'center',
      col1Text: 'Текст первой колонки с описанием ключевых преимуществ или сервисов.',
      col1Image: '',
      col2Text: 'Текст второй колонки с деталями проекта или подробным описанием.',
      col2Image: '',
      col3Text: 'Текст третьей колонки с контактной информацией или призывом к действию.',
      col3Image: '',
      ctaText: '',
      ctaHref: '',
    };
    setSelectedSection(newSec);
    setIsCreatingNew(true);
  };

  // Handle clone/copy existing module (either custom or base module template)
  const handleCopySection = (source: { title: string; eyebrow?: string; subtitle?: string; colCount?: 1 | 2 | 3 }) => {
    const newId = `custom-${Date.now().toString(36)}`;
    const newSec: CustomSection = {
      id: newId,
      anchor: `section-${Date.now().toString().slice(-4)}`,
      eyebrow: source.eyebrow || 'АНО «ЦЗСТ»',
      title: `${source.title} (Копия)`,
      subtitle: source.subtitle || 'Дополнительный модуль на основе существующего шаблона',
      columnsCount: source.colCount || 2,
      textAlign: (source.colCount || 2) === 3 ? 'center' : 'left',
      verticalAlign: 'center',
      col1VAlign: 'center',
      col2VAlign: 'center',
      col3VAlign: 'center',
      col1Text: 'Контент первой колонки. Вы можете разместить здесь подробный текст или тезисы.',
      col1Image: '',
      col2Text: 'Контент второй колонки (или изображение в противоположной колонке).',
      col2Image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80',
      col3Text: '',
      col3Image: '',
      ctaText: 'Подробнее',
      ctaHref: '#contacts',
    };
    setSelectedSection(newSec);
    setIsCreatingNew(true);
  };

  // Save changes
  const handleSave = async () => {
    if (!selectedSection) return;
    setSaving(true);
    setSavedSuccess(false);

    try {
      const currentLanding = content?.landing || {};
      const existingList: CustomSection[] = (currentLanding as any).customSections || [];
      const currentOrder: string[] = (currentLanding as any).sectionOrder || [
        'hero', 'about', 'projects', 'news', 'documents', 'partners', 'partnership', 'contacts'
      ];

      let updatedList: CustomSection[];
      const idx = existingList.findIndex((s) => s.id === selectedSection.id);
      if (idx >= 0) {
        updatedList = [...existingList];
        updatedList[idx] = selectedSection;
      } else {
        updatedList = [...existingList, selectedSection];
      }

      // Add to sectionOrder if not already present
      let updatedOrder = [...currentOrder];
      if (!updatedOrder.includes(selectedSection.id)) {
        // insert before 'contacts' or at the end
        const contactsIdx = updatedOrder.indexOf('contacts');
        if (contactsIdx !== -1) {
          updatedOrder.splice(contactsIdx, 0, selectedSection.id);
        } else {
          updatedOrder.push(selectedSection.id);
        }
      }

      const updatedLanding = {
        ...currentLanding,
        customSections: updatedList,
        sectionOrder: updatedOrder,
      };

      await updateSection('landing', updatedLanding);
      setCustomSections(updatedList);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
      refresh();
    } catch (err) {
      console.error(err);
      alert('Ошибка при сохранении раздела');
    } finally {
      setSaving(false);
    }
  };

  // Delete custom section
  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот раздел?')) return;
    setSaving(true);
    try {
      const currentLanding = content?.landing || {};
      const existingList: CustomSection[] = (currentLanding as any).customSections || [];
      const currentOrder: string[] = (currentLanding as any).sectionOrder || [];

      const updatedList = existingList.filter((s) => s.id !== id);
      const updatedOrder = currentOrder.filter((sId) => sId !== id);

      const updatedLanding = {
        ...currentLanding,
        customSections: updatedList,
        sectionOrder: updatedOrder,
      };

      await updateSection('landing', updatedLanding);
      setCustomSections(updatedList);
      if (selectedSection?.id === id) {
        setSelectedSection(null);
      }
      refresh();
    } catch (err) {
      console.error(err);
      alert('Ошибка при удалении');
    } finally {
      setSaving(false);
    }
  };

  // Standard modules catalog for quick copying
  const baseTemplates = [
    {
      id: 'about',
      title: 'О центре (#about)',
      eyebrow: 'О ЦЕНТРЕ',
      subtitle: 'Миссия и ключевые принципы работы организации',
      desc: '2 колонки: Текст слева + Фотография / Изображение справа',
      colCount: 2 as const,
    },
    {
      id: 'directions',
      title: 'Проекты и программы (#projects)',
      eyebrow: 'НАПРАВЛЕНИЯ',
      subtitle: 'Масштабные инициативы и целевые спортивные проекты',
      desc: '3 колонки: Центрированные блоки преимуществ / услуг',
      colCount: 3 as const,
    },
    {
      id: 'partnership',
      title: 'Сотрудничество (#partnership)',
      eyebrow: 'СОТРУДНИЧЕСТВО',
      subtitle: 'Приглашаем к партнёрству федерации, регионы и бизнес',
      desc: '1 или 2 колонки: Текстовый манифест с кнопкой действия (CTA)',
      colCount: 1 as const,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-24 text-slate-100">
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
              Разделы и модули лендинга
            </h1>
            <span className="rounded bg-amber-500/20 px-2 py-0.5 font-mono text-xs font-bold uppercase text-amber-400">
              Конструктор
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Краткие карточки текущих модулей, создание и копирование разделов (1, 2 или 3 колонки). Созданный раздел сразу появляется в левом сайдбаре.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <NextLink
            href="/admin/section-order"
            className="flex items-center gap-2 rounded-lg border border-[#333] bg-[#181818] px-3.5 py-2 text-xs font-medium text-slate-300 hover:border-slate-500 hover:text-white transition-all"
          >
            <SlidersVertical className="h-4 w-4 text-amber-400" />
            <span>Порядок модулей</span>
          </NextLink>

          <button
            onClick={handleStartCreate}
            className="flex items-center gap-2 rounded-lg bg-amber-500 hover:bg-amber-400 px-4 py-2 text-xs font-bold text-black transition-all shadow-lg shadow-amber-500/20"
          >
            <Plus className="h-4 w-4" />
            <span>Создать модуль</span>
          </button>
        </div>
      </div>

      {/* Editor Modal / Panel if editing or creating */}
      {selectedSection && (
        <div className="rounded-xl border-2 border-amber-500/50 bg-[#12141a] p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-3">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400 font-bold text-xs">
                <Layers className="h-4 w-4" />
              </span>
              <div>
                <h3 className="font-bold text-white text-base">
                  {isCreatingNew ? 'Создание нового модуля' : `Редактирование: ${selectedSection.title}`}
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  ID: #{selectedSection.anchor || selectedSection.id} (автоматически добавлен в сайдбар)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedSection(null)}
                className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/5"
              >
                Закрыть
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 rounded-lg bg-amber-500 hover:bg-amber-400 px-4 py-1.5 text-xs font-bold text-black disabled:opacity-50 transition-all shadow-md"
              >
                {savedSuccess ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>Сохранено!</span>
                  </>
                ) : (
                  <>
                    <Save className="h-3.5 w-3.5" />
                    <span>{saving ? 'Сохранение...' : 'Сохранить модуль'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Configuration Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Anchor & Title */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Якорная ссылка (Anchor ID)
              </label>
              <div className="flex items-center rounded-lg border border-slate-800 bg-[#0a0a0c] px-3 py-2 text-sm text-white focus-within:border-amber-500">
                <span className="text-slate-500 select-none mr-1">#</span>
                <input
                  type="text"
                  value={selectedSection.anchor.replace(/^#/, '')}
                  onChange={(e) =>
                    setSelectedSection({
                      ...selectedSection,
                      anchor: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''),
                    })
                  }
                  className="w-full bg-transparent focus:outline-none font-mono text-xs text-amber-300"
                  placeholder="about-2, programs, training"
                />
              </div>
              <p className="text-[10px] text-slate-500 mt-1">
                Используется для меню сайта (например, #programs)
              </p>
            </div>

            {/* Eyebrow */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Надзаголовок (Eyebrow)
              </label>
              <input
                type="text"
                value={selectedSection.eyebrow}
                onChange={(e) =>
                  setSelectedSection({ ...selectedSection, eyebrow: e.target.value })
                }
                className="w-full rounded-lg border border-slate-800 bg-[#0a0a0c] px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                placeholder="— НАПРАВЛЕНИЯ РАБОТЫ"
              />
            </div>

            {/* Columns Count */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Количество колонок
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() =>
                      setSelectedSection({
                        ...selectedSection,
                        columnsCount: num as 1 | 2 | 3,
                        textAlign: num === 3 ? 'center' : selectedSection.textAlign,
                      })
                    }
                    className={`rounded-lg py-1.5 text-xs font-bold border transition-all ${
                      selectedSection.columnsCount === num
                        ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                        : 'border-slate-800 bg-[#0a0a0c] text-slate-400 hover:text-white'
                    }`}
                  >
                    {num} {num === 1 ? 'колонка' : 'колонки'}
                  </button>
                ))}
              </div>
            </div>

            {/* H2 Title */}
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Заголовок секции (H2)
              </label>
              <input
                type="text"
                value={selectedSection.title}
                onChange={(e) =>
                  setSelectedSection({ ...selectedSection, title: e.target.value })
                }
                className="w-full rounded-lg border border-slate-800 bg-[#0a0a0c] px-3 py-2 text-sm font-semibold text-white focus:border-amber-500 focus:outline-none"
                placeholder="Заголовок модуля на лендинге"
              />
            </div>

            {/* Text Alignment */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Выравнивание текста (Заголовки и контент)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'left', label: 'По левому', icon: AlignLeft },
                  { id: 'center', label: 'По центру', icon: AlignCenter },
                  { id: 'right', label: 'По правому', icon: AlignRight },
                ].map((al) => {
                  const Icon = al.icon;
                  return (
                    <button
                      key={al.id}
                      type="button"
                      onClick={() =>
                        setSelectedSection({
                          ...selectedSection,
                          textAlign: al.id as 'left' | 'center' | 'right',
                        })
                      }
                      className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-medium border transition-all ${
                        selectedSection.textAlign === al.id
                          ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                          : 'border-slate-800 bg-[#0a0a0c] text-slate-400 hover:text-white'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span>{al.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Vertical Alignment (По высоте) */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Вертикальное равнение по высоте (Top, Center, Bottom)
              </label>
              <select
                value={selectedSection.verticalAlign || 'center'}
                onChange={(e) =>
                  setSelectedSection({
                    ...selectedSection,
                    verticalAlign: e.target.value as any,
                  })
                }
                className="w-full rounded-lg border border-slate-800 bg-[#0a0a0c] px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
              >
                <option value="top">По верху (Top)</option>
                <option value="center">По центру (Center)</option>
                <option value="bottom">По низу (Bottom)</option>
              </select>
            </div>

            {/* Subtitle */}
            <div className="md:col-span-3">
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Подзаголовок секции
              </label>
              <textarea
                rows={2}
                value={selectedSection.subtitle}
                onChange={(e) =>
                  setSelectedSection({ ...selectedSection, subtitle: e.target.value })
                }
                className="w-full rounded-lg border border-slate-800 bg-[#0a0a0c] px-3 py-2 text-xs text-slate-200 focus:border-amber-500 focus:outline-none"
                placeholder="Краткое описание назначения и основных тезисов этого модуля"
              />
            </div>
          </div>

          {/* Columns Editor */}
          <div className="border-t border-white/10 pt-5 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Columns className="h-4 w-4 text-amber-400" />
              <span>Содержимое колонок ({selectedSection.columnsCount})</span>
            </h4>

            <div
              className={`grid gap-4 ${
                selectedSection.columnsCount === 1
                  ? 'grid-cols-1'
                  : selectedSection.columnsCount === 2
                  ? 'grid-cols-1 md:grid-cols-2'
                  : 'grid-cols-1 md:grid-cols-3'
              }`}
            >
              {/* Column 1 */}
              <div className="rounded-lg border border-slate-800 bg-[#0a0a0c] p-4 space-y-3">
                                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-amber-400">Колонка 1</span>
                  <select
                    value={selectedSection.col1VAlign || selectedSection.verticalAlign || 'center'}
                    onChange={(e) => setSelectedSection({ ...selectedSection, col1VAlign: e.target.value as any })}
                    className="rounded bg-[#14151b] border border-slate-800 text-[10px] text-slate-300 px-2 py-0.5"
                    title="Выравнивание по высоте для колонки 1"
                  >
                    <option value="top">По верху</option>
                    <option value="center">По центру</option>
                    <option value="bottom">По низу</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Текст</label>
                  <textarea
                    rows={4}
                    value={selectedSection.col1Text || ''}
                    onChange={(e) =>
                      setSelectedSection({ ...selectedSection, col1Text: e.target.value })
                    }
                    className="w-full rounded border border-slate-800 bg-[#14151b] p-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                    placeholder="Основной текст первой колонки..."
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Изображение (URL)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={selectedSection.col1Image || ''}
                      onChange={(e) =>
                        setSelectedSection({ ...selectedSection, col1Image: e.target.value })
                      }
                      className="w-full rounded border border-slate-800 bg-[#14151b] px-2 py-1 text-xs text-slate-300 focus:border-amber-500 focus:outline-none"
                      placeholder="https://... или выбор из медиатеки"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setActiveMediaTarget('col1');
                        setMediaPickerOpen(true);
                      }}
                      className="rounded bg-slate-800 px-2.5 py-1 text-xs text-white hover:bg-slate-700"
                    >
                      Обзор
                    </button>
                  </div>
                  {selectedSection.col1Image && (
                    <div className="mt-2 h-24 w-full rounded overflow-hidden border border-slate-700 bg-black">
                      <img
                        src={selectedSection.col1Image}
                        alt="Превью"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Column 2 */}
              {selectedSection.columnsCount >= 2 && (
                <div className="rounded-lg border border-slate-800 bg-[#0a0a0c] p-4 space-y-3">
                                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-amber-400">
                      Колонка 2 {selectedSection.columnsCount === 2 ? '(Противоположная)' : ''}
                    </span>
                    <select
                      value={selectedSection.col2VAlign || selectedSection.verticalAlign || 'center'}
                      onChange={(e) => setSelectedSection({ ...selectedSection, col2VAlign: e.target.value as any })}
                      className="rounded bg-[#14151b] border border-slate-800 text-[10px] text-slate-300 px-2 py-0.5"
                      title="Выравнивание по высоте для колонки 2"
                    >
                      <option value="top">По верху</option>
                      <option value="center">По центру</option>
                      <option value="bottom">По низу</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Текст</label>
                    <textarea
                      rows={4}
                      value={selectedSection.col2Text || ''}
                      onChange={(e) =>
                        setSelectedSection({ ...selectedSection, col2Text: e.target.value })
                      }
                      className="w-full rounded border border-slate-800 bg-[#14151b] p-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                      placeholder="Текст второй колонки (или оставьте пустым, если используется только картинка)..."
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Изображение (URL)</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={selectedSection.col2Image || ''}
                        onChange={(e) =>
                          setSelectedSection({ ...selectedSection, col2Image: e.target.value })
                        }
                        className="w-full rounded border border-slate-800 bg-[#14151b] px-2 py-1 text-xs text-slate-300 focus:border-amber-500 focus:outline-none"
                        placeholder="https://... или выбор из медиатеки"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setActiveMediaTarget('col2');
                          setMediaPickerOpen(true);
                        }}
                        className="rounded bg-slate-800 px-2.5 py-1 text-xs text-white hover:bg-slate-700"
                      >
                        Обзор
                      </button>
                    </div>
                    {selectedSection.col2Image && (
                      <div className="mt-2 h-24 w-full rounded overflow-hidden border border-slate-700 bg-black">
                        <img
                          src={selectedSection.col2Image}
                          alt="Превью"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Column 3 */}
              {selectedSection.columnsCount === 3 && (
                <div className="rounded-lg border border-slate-800 bg-[#0a0a0c] p-4 space-y-3">
                                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-amber-400">Колонка 3</span>
                    <select
                      value={selectedSection.col3VAlign || selectedSection.verticalAlign || 'center'}
                      onChange={(e) => setSelectedSection({ ...selectedSection, col3VAlign: e.target.value as any })}
                      className="rounded bg-[#14151b] border border-slate-800 text-[10px] text-slate-300 px-2 py-0.5"
                      title="Выравнивание по высоте для колонки 3"
                    >
                      <option value="top">По верху</option>
                      <option value="center">По центру</option>
                      <option value="bottom">По низу</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Текст</label>
                    <textarea
                      rows={4}
                      value={selectedSection.col3Text || ''}
                      onChange={(e) =>
                        setSelectedSection({ ...selectedSection, col3Text: e.target.value })
                      }
                      className="w-full rounded border border-slate-800 bg-[#14151b] p-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                      placeholder="Текст третьей колонки..."
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Изображение (URL)</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={selectedSection.col3Image || ''}
                        onChange={(e) =>
                          setSelectedSection({ ...selectedSection, col3Image: e.target.value })
                        }
                        className="w-full rounded border border-slate-800 bg-[#14151b] px-2 py-1 text-xs text-slate-300 focus:border-amber-500 focus:outline-none"
                        placeholder="https://... или выбор из медиатеки"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setActiveMediaTarget('col3');
                          setMediaPickerOpen(true);
                        }}
                        className="rounded bg-slate-800 px-2.5 py-1 text-xs text-white hover:bg-slate-700"
                      >
                        Обзор
                      </button>
                    </div>
                    {selectedSection.col3Image && (
                      <div className="mt-2 h-24 w-full rounded overflow-hidden border border-slate-700 bg-black">
                        <img
                          src={selectedSection.col3Image}
                          alt="Превью"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action CTA button settings */}
          <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Текст кнопки действия (необязательно)
              </label>
              <input
                type="text"
                value={selectedSection.ctaText || ''}
                onChange={(e) =>
                  setSelectedSection({ ...selectedSection, ctaText: e.target.value })
                }
                className="w-full rounded border border-slate-800 bg-[#0a0a0c] px-3 py-1.5 text-xs text-white focus:border-amber-500 focus:outline-none"
                placeholder="Например: Узнать больше"
              />
            </div>
            <div className="flex-1 w-full">
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Ссылка кнопки (URL или якорь #)
              </label>
              <input
                type="text"
                value={selectedSection.ctaHref || ''}
                onChange={(e) =>
                  setSelectedSection({ ...selectedSection, ctaHref: e.target.value })
                }
                className="w-full rounded border border-slate-800 bg-[#0a0a0c] px-3 py-1.5 text-xs text-white focus:border-amber-500 focus:outline-none"
                placeholder="#contacts или /docs"
              />
            </div>
          </div>
        </div>
      )}

      {/* Existing Custom Modules Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="h-5 w-5 text-amber-400" />
            <span>Пользовательские модули ({customSections.length})</span>
          </h2>
          <span className="text-xs text-slate-400">
            Отображаются на лендинге и в сайдбаре
          </span>
        </div>

        {customSections.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#333] p-8 text-center bg-[#111]">
            <p className="text-sm text-slate-400 mb-3">
              У вас пока нет созданных кастомных модулей.
            </p>
            <p className="text-xs text-slate-500 mb-4">
              Вы можете создать новый модуль с нуля или скопировать готовый шаблон из списка ниже.
            </p>
            <button
              onClick={handleStartCreate}
              className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-xs font-bold text-black hover:bg-amber-400 transition-all"
            >
              <Plus className="h-4 w-4" />
              <span>Создать первый модуль</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {customSections.map((sec) => (
              <div
                key={sec.id}
                className="rounded-xl border border-[#2b2b2b] bg-[#14151a] p-5 flex flex-col justify-between hover:border-amber-500/50 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] uppercase font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                      #{sec.anchor || sec.id}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {sec.columnsCount} {sec.columnsCount === 1 ? 'колонка' : 'колонки'} • {sec.textAlign}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-base group-hover:text-amber-400 transition-colors">
                    {sec.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                    {sec.subtitle || sec.col1Text}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setSelectedSection({ ...sec });
                        setIsCreatingNew(false);
                      }}
                      className="flex items-center gap-1.5 rounded bg-slate-800 hover:bg-amber-500 hover:text-black px-2.5 py-1 text-xs font-semibold text-slate-300 transition-colors"
                    >
                      <Edit className="h-3 w-3" />
                      <span>Изменить</span>
                    </button>

                    <button
                      onClick={() => handleCopySection({
                        title: sec.title,
                        eyebrow: sec.eyebrow,
                        subtitle: sec.subtitle,
                        colCount: sec.columnsCount,
                      })}
                      className="flex items-center gap-1 rounded bg-slate-800 hover:bg-slate-700 px-2 py-1 text-xs text-slate-400 hover:text-white transition-colors"
                      title="Копировать модуль"
                    >
                      <Copy className="h-3 w-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => handleDelete(sec.id)}
                    className="p-1 rounded text-red-400 hover:bg-red-500/10 transition-colors"
                    title="Удалить модуль"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Templates / Copy from Base Modules Catalog */}
      <div className="space-y-4 pt-6 border-t border-[#222]">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Copy className="h-5 w-5 text-amber-400" />
            <span>Создать на основе существующего модуля</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Кликните «Копировать шаблон», чтобы создать новый полнофункциональный модуль на базе одного из ключевых блоков сайта.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {baseTemplates.map((tmpl) => (
            <div
              key={tmpl.id}
              className="rounded-xl border border-[#222] bg-[#111] p-5 flex flex-col justify-between hover:border-slate-600 transition-all"
            >
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                  {tmpl.eyebrow}
                </span>
                <h3 className="font-bold text-white text-base mt-2">{tmpl.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{tmpl.subtitle}</p>
                <div className="mt-3 text-[11px] text-amber-400/90 bg-amber-500/5 p-2 rounded border border-amber-500/10">
                  {tmpl.desc}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => handleCopySection(tmpl)}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-black py-2 text-xs font-bold text-white transition-all shadow"
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>Копировать шаблон модуля</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Media Picker Modal */}
      {mediaPickerOpen && (
        <MediaPickerModal
          isOpen={mediaPickerOpen}
          onClose={() => setMediaPickerOpen(false)}
          onSelect={(url) => {
            if (selectedSection && activeMediaTarget) {
              if (activeMediaTarget === 'col1') {
                setSelectedSection({ ...selectedSection, col1Image: url });
              } else if (activeMediaTarget === 'col2') {
                setSelectedSection({ ...selectedSection, col2Image: url });
              } else if (activeMediaTarget === 'col3') {
                setSelectedSection({ ...selectedSection, col3Image: url });
              }
            }
            setMediaPickerOpen(false);
          }}
        />
      )}
    </div>
  );
}
