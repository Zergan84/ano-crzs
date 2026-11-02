'use client';

import React, { useEffect, useState, use } from 'react';
import NextLink from 'next/link';
import { 
  Save, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Image as ImageIcon, 
  Check, 
  AlertCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { MediaPickerModal } from '@/components/admin/MediaPickerModal';
import { DEFAULT_CONTENT } from '@/data/defaultContent';
import { notifyContentUpdated } from '@/lib/content';

const sectionTitles: Record<string, { title: string; desc: string }> = {
  organization: { title: '3. О центре (#about)', desc: 'Надзаголовок, заголовок «Миссия: спорт доступен каждому», описание центра, 4 пункта преимуществ и фотография справа' },
  hero: { title: '2. Главный экран — Слайдер (Main Hero)', desc: 'Управление главным экраном (100% ширины и высоты). Сейчас отображается 1 слайд. При добавлении 2-го и 3-го слайдов включается слайдер.' },
  news: { title: '5. Лента новостей и пресс-релизов (#news)', desc: 'Публикация новостей, пресс-релизов, событий и отчётов с категориями, датами и краткими анонсами' },
  events: { title: 'Мероприятия (Портал)', desc: 'Календарь всероссийских семинаров, курсов подготовки и конференций' },
  specialists: { title: 'Единый реестр специалистов (Портал)', desc: 'Управление базой аттестованных инструкторов, тренеров и судей' },
  documents: { title: '6. Документы и отчёты (#documents)', desc: 'Устав, свидетельство о регистрации, годовые отчёты и положения с фильтром по категориям и PDF-файлами' },
  directions: { title: '4. Проекты и программы (#projects)', desc: 'Спортивные и социальные проекты центра (6 карточек проектов с категориями и описаниями)' },
  partners: { title: '7. Партнёры (#partners)', desc: 'Организации-партнёры по категориям: «Министерства и ведомства», «Федерации» и «Спонсоры и партнёры»' },
  contacts: { title: '9. Контакты и форма связи (#contacts)', desc: 'Заголовок и описание секции «Свяжитесь с нами», настройки формы обращения, телефон, email, часы работы и адрес' },
};

export default function SectionEditorClient({ section }: { section: string }) {

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Media Picker state
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [mediaPickerCallback, setMediaPickerCallback] = useState<((url: string) => void) | null>(null);

  const storageKey =
    section === 'directions' || section === 'contacts' ? 'organization' : section;

  useEffect(() => {
    loadSectionData();
  }, [section]);

  async function loadSectionData() {
    setLoading(true);
    setStatusMessage(null);
    try {
      const apiEndpoint = (typeof window !== 'undefined' && window.location.hostname.includes('pages.dev'))
        ? `/api/admin/content/${storageKey}`
        : `/api/admin/content/${storageKey}`;
      const res = await fetch(apiEndpoint);
      if (res.ok) {
        const json = await res.json();
        if (storageKey === 'organization') {
          setData({
            ...DEFAULT_CONTENT.organization,
            ...(json || {}),
            principles:
              Array.isArray(json?.principles) && json.principles.length > 0
                ? json.principles
                : DEFAULT_CONTENT.organization.principles,
            directions:
              Array.isArray(json?.directions) && json.directions.length > 0
                ? json.directions
                : DEFAULT_CONTENT.organization.directions,
          });
        } else {
          setData(json);
        }
      } else {
        // Fallback to default
        const def = (DEFAULT_CONTENT as any)[storageKey] || {};
        setData(def);
      }
    } catch {
      const def = (DEFAULT_CONTENT as any)[storageKey] || {};
      setData(def);
    }
    setLoading(false);
  }

  async function handleSave() {
    setSaving(true);
    setStatusMessage(null);
    try {
      const apiEndpoint = (typeof window !== 'undefined' && window.location.hostname.includes('pages.dev'))
        ? `/api/admin/content/${storageKey}`
        : `/api/admin/content/${storageKey}`;

      const res = await fetch(apiEndpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        notifyContentUpdated();
        setStatusMessage({ type: 'success', text: 'Изменения успешно сохранены и отображаются на сайте!' });
        setTimeout(() => setStatusMessage(null), 4000);
      } else {
        const err = await res.json();
        setStatusMessage({ type: 'error', text: err.error || 'Ошибка при сохранении' });
      }
    } catch (e) {
      setStatusMessage({ type: 'error', text: 'Ошибка сети: ' + String(e) });
    }
    setSaving(false);
  }

  function openMediaPicker(onSelect: (url: string) => void) {
    setMediaPickerCallback(() => onSelect);
    setMediaPickerOpen(true);
  }

  if (loading) {
    return (
      <div className="flex h-60 items-center justify-center text-slate-500 text-sm">
        Загрузка данных раздела...
      </div>
    );
  }

  const sectionMeta = sectionTitles[section] || { title: section, desc: 'Редактирование данных' };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
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
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
            {sectionMeta.title}
          </h1>
          <p className="mt-1 text-xs text-slate-400">{sectionMeta.desc}</p>
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-red-500 transition-all shadow-lg shadow-red-950/20 disabled:opacity-50"
          >
            <Save className={`h-4 w-4 ${saving ? 'animate-spin' : ''}`} />
            <span>{saving ? 'Сохранение...' : 'Сохранить изменения'}</span>
          </button>
        </div>
      </div>

      {/* Status Notice */}
      {statusMessage && (
        <div
          className={`flex items-center gap-2 rounded-lg p-3 text-xs ${
            statusMessage.type === 'success'
              ? 'bg-emerald-950/40 border border-emerald-800 text-emerald-300'
              : 'bg-red-950/40 border border-red-800 text-red-300'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <Check className="h-4 w-4 shrink-0 text-emerald-400" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Dynamic Section Editors */}
      <div className="space-y-6">
        {section === 'organization' && (
          <OrganizationEditor data={data} setData={setData} openMediaPicker={openMediaPicker} />
        )}

        {section === 'hero' && (
          <HeroEditor data={data} setData={setData} openMediaPicker={openMediaPicker} />
        )}

        {section === 'news' && (
          <NewsEditor data={data} setData={setData} openMediaPicker={openMediaPicker} />
        )}

        {section === 'events' && (
          <EventsEditor data={data} setData={setData} />
        )}

        {section === 'specialists' && (
          <SpecialistsEditor data={data} setData={setData} />
        )}

        {section === 'documents' && (
          <DocumentsEditor data={data} setData={setData} openMediaPicker={openMediaPicker} />
        )}

        {section === 'directions' && (
          <DirectionsEditor data={data} setData={setData} />
        )}

        {section === 'partners' && (
          <PartnersEditor data={data} setData={setData} openMediaPicker={openMediaPicker} />
        )}

        {section === 'contacts' && (
          <ContactsEditor data={data} setData={setData} />
        )}
      </div>

      {/* Bottom Save Action Bar */}
      <div className="flex items-center justify-between pt-6 border-t border-[#222]">
        <NextLink
          href="/admin"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Назад к дашборду</span>
        </NextLink>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-lg bg-red-600 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-red-500 transition-all shadow-lg shadow-red-950/20 disabled:opacity-50"
        >
          <Save className={`h-4 w-4 ${saving ? 'animate-spin' : ''}`} />
          <span>{saving ? 'Сохранение...' : 'Сохранить изменения'}</span>
        </button>
      </div>

      {/* Media Picker Modal */}
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

/* =========================================================================
   1. ORGANIZATION EDITOR (3. О центре #about)
   ========================================================================= */
function OrganizationEditor({
  data,
  setData,
  openMediaPicker,
}: {
  data: any;
  setData: any;
  openMediaPicker: (onSelect: (url: string) => void) => void;
}) {
  if (!data) return null;

  const updateField = (field: string, val: any) => {
    setData({ ...data, [field]: val });
  };

  const updatePrinciple = (index: number, key: string, val: string) => {
    const principles = [...(data.principles || DEFAULT_CONTENT.organization.principles)];
    principles[index] = {
      ...principles[index],
      [key]: val,
      description: key === 'title' ? val : principles[index]?.description || val,
    };
    setData({ ...data, principles });
  };

  const addPrinciple = () => {
    const principles = [
      ...(data.principles || DEFAULT_CONTENT.organization.principles),
      {
        id: `item-${Date.now()}`,
        title: 'Новый пункт преимуществ центра',
        description: 'Новый пункт преимуществ центра',
      },
    ];
    setData({ ...data, principles });
  };

  const removePrinciple = (index: number) => {
    const principles = (data.principles || DEFAULT_CONTENT.organization.principles).filter(
      (_: any, i: number) => i !== index
    );
    setData({ ...data, principles });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-[#222] bg-[#12161f] p-5 space-y-4">
        <h3 className="text-base font-bold text-white border-b border-[#222] pb-3">
          Заголовок, описание и фото секции «О центре» (#about)
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="admin-label">Надзаголовок секции (Eyebrow)</label>
            <input
              type="text"
              value={data.aboutEyebrow ?? 'О центре'}
              onChange={(e) => updateField('aboutEyebrow', e.target.value)}
              placeholder="О центре"
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label">Заголовок секции (H2)</label>
            <input
              type="text"
              value={data.aboutTitle ?? 'Миссия: спорт доступен каждому'}
              onChange={(e) => updateField('aboutTitle', e.target.value)}
              placeholder="Миссия: спорт доступен каждому"
              className="admin-input font-bold"
            />
          </div>
        </div>

        <div>
          <label className="admin-label">Основной абзац описания (под заголовком)</label>
          <textarea
            rows={3}
            value={data.tagline || ''}
            onChange={(e) => updateField('tagline', e.target.value)}
            className="admin-textarea"
          />
        </div>

        <div>
          <label className="admin-label">Фотография справа в блоке «О центре» (URL или из R2)</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={
                data.aboutImage ??
                'https://discover.moscow/media/images/DSC00979_1-min.min-1920x1920.webp'
              }
              onChange={(e) => updateField('aboutImage', e.target.value)}
              className="admin-input font-mono text-xs flex-1"
              placeholder="https://discover.moscow/media/images/..."
            />
            <button
              type="button"
              onClick={() => openMediaPicker((url: string) => updateField('aboutImage', url))}
              className="flex items-center gap-1.5 rounded bg-[#1e2638] border border-[#334155] px-3 py-2 text-xs text-slate-200 hover:bg-[#28334a]"
            >
              <ImageIcon className="h-3.5 w-3.5" />
              <span>Медиатека</span>
            </button>
          </div>
          {(data.aboutImage ||
            'https://discover.moscow/media/images/DSC00979_1-min.min-1920x1920.webp') && (
            <div className="mt-2 h-24 w-36 overflow-hidden rounded-lg border border-[#2a2a2a] bg-black">
              <img
                src={
                  data.aboutImage ||
                  'https://discover.moscow/media/images/DSC00979_1-min.min-1920x1920.webp'
                }
                alt="About preview"
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      {/* Пункты с галочками (Checklist) */}
      <div className="rounded-xl border border-[#222] bg-[#12161f] p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-[#222] pb-3">
          <div>
            <h3 className="text-base font-bold text-white">
              Список ключевых принципов с галочками (4 пункта)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Отображаются под описанием в левой колонке секции «О центре»
            </p>
          </div>
          <button
            type="button"
            onClick={addPrinciple}
            className="flex items-center gap-1.5 rounded bg-amber-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-amber-500"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Добавить пункт</span>
          </button>
        </div>

        <div className="space-y-3">
          {(data.principles || DEFAULT_CONTENT.organization.principles).map((p: any, i: number) => (
            <div
              key={p.id || i}
              className="flex items-center gap-3 rounded-lg border border-[#2a2a2a] bg-[#161a24] p-3"
            >
              <span className="text-xs font-mono text-amber-400 font-bold shrink-0">0{i + 1}</span>
              <input
                type="text"
                value={p.title || ''}
                onChange={(e) => updatePrinciple(i, 'title', e.target.value)}
                className="admin-input flex-1 font-medium"
                placeholder="Текст пункта..."
              />
              <button
                type="button"
                onClick={() => removePrinciple(i)}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   2. HERO SLIDER EDITOR
   ========================================================================= */
function HeroEditor({ data, setData, openMediaPicker }: { data: any; setData: any; openMediaPicker: any }) {
  const slides = data?.slides || [];

  const updateSlide = (index: number, key: string, val: any) => {
    const next = [...slides];
    next[index] = { ...next[index], [key]: val };
    setData({ ...data, slides: next });
  };

  const addSlide = () => {
    const next = [
      ...slides,
      {
        id: `slide-${Date.now()}`,
        tag: 'Автономная некоммерческая организация',
        showBadge: true,
        tabLabel: `Слайд 0${slides.length + 1}`,
        title: 'Новый слайд главного экрана',
        desc: 'Подзаголовок и описание для нового слайда на первом экране...',
        ctaText: 'Стать партнёром',
        ctaHref: '#partnership',
        secondaryBtnText: 'Наши проекты',
        secondaryBtnHref: '#projects',
        image: 'https://skisport.ru/upload/iblock/9aa/a90b092yyp4qdml3bju3dxvf3njv2asn.jpg',
        displayMode: 'image',
        textAlign: 'left',
      },
    ];
    setData({ ...data, slides: next });
  };

  const removeSlide = (index: number) => {
    if (slides.length <= 1) {
      alert('В слайдере должен оставаться минимум 1 слайд.');
      return;
    }
    if (!confirm(`Удалить Слайд 0${index + 1}?`)) return;
    const next = slides.filter((_: any, idx: number) => idx !== index);
    setData({ ...data, slides: next });
  };

  return (
    <div className="space-y-5">
      {/* Компактный верхний блок настроек слайдера */}
      <div className="rounded-xl border border-[#2a3346] bg-[#12161f] px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* 1. Чекбокс отображения кнопок слайдера */}
        <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={Boolean(data?.showControls)}
            onChange={(e) => setData({ ...data, showControls: e.target.checked })}
            className="h-4 w-4 rounded border-slate-600 bg-[#0c0f16] text-amber-500 focus:ring-0"
          />
          <span className="text-xs font-bold text-slate-200">
            Отображать кнопки слайдера (01, 02, 03)
          </span>
        </label>

        <div className="flex flex-wrap items-center gap-4">
          {/* 2. Задержка одного слайда в секундах */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 whitespace-nowrap">
              Задержка слайда (сек.):
            </span>
            <input
              type="number"
              min={1}
              max={120}
              value={data?.slideDuration ?? 8}
              onChange={(e) =>
                setData({
                  ...data,
                  slideDuration: Math.max(1, Number(e.target.value) || 8),
                })
              }
              className="w-16 rounded-md border border-[#2d3748] bg-[#0c0f16] px-2.5 py-1 text-xs font-mono font-bold text-white focus:border-amber-500 focus:outline-none"
            />
          </div>

          {/* 3. Высота слайдера */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 whitespace-nowrap">
              Высота:
            </span>
            <select
              value={data?.sliderHeight || 'screen-50'}
              onChange={(e) =>
                setData({ ...data, sliderHeight: e.target.value })
              }
              className="rounded-md border border-[#2d3748] bg-[#0c0f16] px-2.5 py-1 text-xs font-semibold text-white focus:border-amber-500 focus:outline-none"
            >
              <option value="screen-50">50% экрана вместе с Header (фиксированная)</option>
              <option value="compact">Компактная (~560px)</option>
              <option value="medium">Средняя (~680px)</option>
              <option value="tall">Высокая (~820px)</option>
              <option value="fullscreen">100% высота экрана (Fullscreen)</option>
            </select>
          </div>

          {/* 4. Выпадающий список эффекта смены слайда */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 whitespace-nowrap">
              Эффект смены:
            </span>
            <select
              value={data?.transitionEffect || 'motion-blur'}
              onChange={(e) =>
                setData({ ...data, transitionEffect: e.target.value })
              }
              className="rounded-md border border-[#2d3748] bg-[#0c0f16] px-2.5 py-1 text-xs font-semibold text-white focus:border-amber-500 focus:outline-none"
            >
              <option value="motion-blur">Motion blur (мягкое размытие)</option>
              <option value="fade">Fade (плавное растворение без прыжков)</option>
              <option value="fast-wind">Fast wind (динамичный сдвиг)</option>
              <option value="transparent">Transparent</option>
              <option value="dip-to-white">Dip to white</option>
              <option value="dip-to-color">Dip to color</option>
            </select>
          </div>

          {/* Кнопка добавления слайда */}
          <button
            type="button"
            onClick={addSlide}
            className="inline-flex items-center gap-1.5 rounded-md bg-amber-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-amber-500 shrink-0 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Добавить слайд</span>
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-blue-500/20 bg-blue-500/10 px-4 py-3 text-xs text-blue-200">
        Сейчас в слайдере активен <strong>{slides.length} {slides.length === 1 ? 'слайд' : 'слайда(ов)'}</strong>. Если оставить 1 слайд — отображается статичный полноэкранный Hero-экран. Как только вы нажмёте «Добавить слайд» и сохраните второй/третий слайд, слайдер автоматически начнёт переключать слайды.
      </div>

      {slides.map((slide: any, i: number) => (
        <div key={slide.id || i} className="rounded-xl border border-[#222] bg-[#12161f] p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#222] pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="rounded bg-amber-500/20 text-amber-400 px-2 py-0.5 text-xs font-mono">
                Слайд 0{i + 1}
              </span>
              <span>{slide.title || slide.tag || 'Слайд'}</span>
            </h3>
            {slides.length > 1 && (
              <button
                type="button"
                onClick={() => removeSlide(i)}
                className="inline-flex items-center gap-1 rounded px-2.5 py-1 text-xs text-red-400 hover:bg-red-950/40 border border-transparent hover:border-red-800/50 transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Удалить слайд</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <label className="admin-label !mb-0">Метка над заголовком (бейдж)</label>
                <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={slide.showBadge !== false}
                    onChange={(e) => updateSlide(i, 'showBadge', e.target.checked)}
                    className="h-3.5 w-3.5 rounded border-slate-600 bg-[#0c0f16] text-amber-500 focus:ring-0"
                  />
                  <span className="text-[11px] font-semibold text-slate-300">
                    Показывать
                  </span>
                </label>
              </div>
              <input
                type="text"
                value={slide.tag || ''}
                onChange={(e) => updateSlide(i, 'tag', e.target.value)}
                placeholder="Автономная некоммерческая организация"
                className={`admin-input ${slide.showBadge === false ? 'opacity-50' : ''}`}
              />
            </div>
            <div>
              <label className="admin-label">Ориентация текста слайда</label>
              <select
                value={slide.textAlign || 'left'}
                onChange={(e) => updateSlide(i, 'textAlign', e.target.value)}
                className="admin-input font-semibold"
              >
                <option value="left">Левая (текст ровняется влево)</option>
                <option value="center">Центр (текст ровняется по центру)</option>
                <option value="right">Правая (текст ровняется по правому краю)</option>
              </select>
            </div>
            <div>
              <label className="admin-label">Подпись вкладки слайдера (0{i + 1})</label>
              <input
                type="text"
                value={slide.tabLabel ?? `Слайд 0${i + 1}`}
                onChange={(e) => updateSlide(i, 'tabLabel', e.target.value)}
                placeholder="Например: Главный экран"
                className="admin-input"
              />
            </div>
          </div>

          <div>
            <label className="admin-label">Главный заголовок слайда (H1)</label>
            <textarea
              rows={2}
              value={slide.title || ''}
              onChange={(e) => updateSlide(i, 'title', e.target.value)}
              className="admin-textarea font-bold"
            />
          </div>

          <div>
            <label className="admin-label">Описание / Подзаголовок</label>
            <textarea
              rows={3}
              value={slide.desc || ''}
              onChange={(e) => updateSlide(i, 'desc', e.target.value)}
              className="admin-textarea"
            />
          </div>

          {/* Кнопки слайда (1, 2) */}
          <div className="rounded-lg border border-[#1e293b] bg-[#0b0f19] p-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Кнопки действий на главном экране
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="admin-label">Кнопка 1 (Основная) — Текст</label>
                <input
                  type="text"
                  value={slide.ctaText ?? 'Стать партнёром'}
                  onChange={(e) => updateSlide(i, 'ctaText', e.target.value)}
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Кнопка 1 — Ссылка (href)</label>
                <input
                  type="text"
                  value={slide.ctaHref ?? '#partnership'}
                  onChange={(e) => updateSlide(i, 'ctaHref', e.target.value)}
                  className="admin-input font-mono text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#1e293b]/60">
              <div>
                <label className="admin-label">Кнопка 2 (Вторая) — Текст</label>
                <input
                  type="text"
                  value={slide.secondaryBtnText ?? 'Наши проекты'}
                  onChange={(e) => updateSlide(i, 'secondaryBtnText', e.target.value)}
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Кнопка 2 — Ссылка (href)</label>
                <input
                  type="text"
                  value={slide.secondaryBtnHref ?? '#projects'}
                  onChange={(e) => updateSlide(i, 'secondaryBtnHref', e.target.value)}
                  className="admin-input font-mono text-xs"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="admin-label">Фоновое изображение слайда (URL или R2)</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={slide.image || ''}
                onChange={(e) => updateSlide(i, 'image', e.target.value)}
                className="admin-input font-mono text-xs flex-1"
                placeholder="https://skisport.ru/upload/iblock/9aa/a90b092yyp4qdml3bju3dxvf3njv2asn.jpg"
              />
              <button
                type="button"
                onClick={() => openMediaPicker((url: string) => updateSlide(i, 'image', url))}
                className="flex items-center gap-1.5 rounded bg-[#1e2638] border border-[#334155] px-3 py-2 text-xs text-slate-200 hover:bg-[#28334a]"
              >
                <ImageIcon className="h-3.5 w-3.5" />
                <span>Медиатека</span>
              </button>
            </div>
            
            {/* Настройки позиционирования фона (Top Padding / Смещение и привязка к блоку/экрану) */}
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-lg border border-[#1e293b] bg-[#0c101a] p-3">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-300">Отступ фона сверху (Top padding)</span>
                  <span className="font-mono text-amber-400 font-bold">{slide.bgPaddingTop ?? slide.bgMarginTop ?? 0}px</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={-200}
                    max={300}
                    step={5}
                    value={slide.bgPaddingTop ?? slide.bgMarginTop ?? 0}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      const next = [...slides];
                      next[i] = { ...next[i], bgPaddingTop: val, bgMarginTop: val };
                      setData({ ...data, slides: next });
                    }}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <input
                    type="number"
                    value={slide.bgPaddingTop ?? slide.bgMarginTop ?? 0}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      const next = [...slides];
                      next[i] = { ...next[i], bgPaddingTop: val, bgMarginTop: val };
                      setData({ ...data, slides: next });
                    }}
                    className="w-20 rounded border border-[#2d3748] bg-[#070a10] px-2 py-1 text-xs font-mono text-white text-center focus:border-amber-500 focus:outline-none"
                    placeholder="0"
                  />
                  <span className="text-xs text-slate-400">px</span>
                </div>
                <p className="mt-1 text-[11px] text-slate-400">
                  Плавный сдвиг фона по вертикали. Отрицательное поднимает, положительное опускает.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="admin-label !mb-0">Точка центрирования (Object Position)</label>
                  <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={slide.alignToBlock !== false}
                      onChange={(e) => updateSlide(i, 'alignToBlock', e.target.checked)}
                      className="h-3.5 w-3.5 rounded border-slate-600 bg-[#0c0f16] text-amber-500 focus:ring-0"
                    />
                    <span className="text-[11px] font-semibold text-amber-400">
                      Ровнение относительно блока
                    </span>
                  </label>
                </div>
                <select
                  value={slide.bgPosition || 'center'}
                  onChange={(e) => updateSlide(i, 'bgPosition', e.target.value)}
                  className="admin-input font-medium"
                >
                  <option value="center">По центру (center)</option>
                  <option value="top">По верху (top)</option>
                  <option value="bottom">По низу (bottom)</option>
                  <option value="center top">Сверху по центру (center top)</option>
                  <option value="center bottom">Снизу по центру (center bottom)</option>
                </select>
                <p className="mt-1 text-[11px] text-slate-400">
                  {slide.alignToBlock !== false
                    ? '✓ Картинка ровняется относительно верхней границы блока слайдера'
                    : '○ Картинка ровняется просто по верхней границе экрана браузера'}
                </p>
              </div>
            </div>

            {slide.image && (
              <div className="mt-4 rounded-xl border border-[#2d3748] bg-[#070b14] p-4">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#1e293b] text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">
                      Точный предпросмотр экрана сайта 1-в-1
                    </span>
                    <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-mono text-amber-300">
                      Широкоформатный масштаб (16:9)
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">
                    Сдвиг: <strong className="text-amber-400">{slide.bgPaddingTop ?? slide.bgMarginTop ?? 0}px</strong> | Режим: <strong className="text-amber-400">{slide.alignToBlock !== false ? 'От блока слайдера' : 'От верхнего края браузера'}</strong>
                  </span>
                </div>

                {/* Полноразмерный пропорциональный макет десктопного сайта */}
                <div className="relative w-full rounded-lg border border-slate-700 bg-white shadow-2xl overflow-hidden select-none">
                  {/* 1. Верхний флаг России */}
                  <div
                    className="h-1.5 w-full"
                    style={{
                      backgroundImage:
                        'linear-gradient(90deg, #FFFFFF 0 33.3%, #1447E6 33.3% 66.6%, #D92D20 66.6%)',
                    }}
                  />

                  {/* 2. Темно-синяя строка контактов (#0F2147) */}
                  <div className="bg-[#0F2147] px-6 py-1.5 flex items-center justify-between text-[11px] text-white/80">
                    <span>Автономная некоммерческая организация</span>
                    <div className="flex items-center gap-6">
                      <span>+7 (495) 000-00-00</span>
                      <span>info@centr-razvitiya-sporta.ru</span>
                    </div>
                  </div>

                  {/* 3. Белый навигационный хидер */}
                  <div className="bg-white/95 px-6 py-3.5 flex items-center justify-between border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-extrabold text-[#0F2147] tracking-tight">АНО ЦЗСТ</span>
                    </div>
                    <div className="flex items-center gap-5 text-xs text-slate-700 font-semibold">
                      <span className="text-[#0F2147]">О центре</span>
                      <span>Проекты</span>
                      <span>Новости</span>
                      <span>Документы</span>
                      <span>Партнёры</span>
                      <span>Контакты</span>
                    </div>
                    <span className="rounded-xs bg-[#D92D20] text-white text-xs font-bold px-3 py-1.5 shadow-sm">
                      {slide.ctaText || 'Стать партнёром'}
                    </span>
                  </div>

                  {/* 4. Блок слайдера ровно 50% экрана (соотношение 16:9 как в окне браузера) */}
                  <div className="relative aspect-[16/6] w-full bg-[#0F2147] overflow-hidden flex flex-col justify-center px-8 sm:px-12">
                    {/* Фоновая картинка с абсолютным позиционированием и идентичным сдвигом через object-position */}
                    {(() => {
                      const basePos = slide.bgPosition || 'center';
                      let basePercent = '50%';
                      if (basePos === 'top' || basePos === 'center top') basePercent = '0%';
                      else if (basePos === 'bottom' || basePos === 'center bottom') basePercent = '100%';

                      const sOffset = slide.bgPaddingTop ?? slide.bgMarginTop ?? 0;
                      const alignToBlock = slide.alignToBlock !== false;
                      const netOffset = (alignToBlock ? sOffset : (sOffset - 104)) * 0.65;

                      return (
                        <img
                          src={slide.image}
                          alt="Preview"
                          style={{
                            objectPosition: `center calc(${basePercent} + ${netOffset}px)`,
                          }}
                          className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none transition-all duration-200"
                        />
                      );
                    })()}

                    {/* Градиентное затемнение 1-в-1 с сайтом */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundImage:
                          'linear-gradient(100deg, rgba(15,33,71,0.92) 0%, rgba(15,33,71,0.75) 38%, rgba(15,33,71,0.22) 72%, rgba(15,33,71,0.08) 100%)',
                      }}
                    />

                    {/* Текстовый контент слайда */}
                    <div className="relative z-10 max-w-lg">
                      {slide.showBadge !== false && (
                        <div className="text-[11px] uppercase tracking-wider text-white font-bold mb-2 flex items-center gap-2">
                          <span className="h-0.5 w-6 bg-[#D92D20]" />
                          <span className="truncate">{slide.tag || 'Автономная некоммерческая организация'}</span>
                        </div>
                      )}
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                        {slide.title || 'Заголовок слайда'}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/90 mt-2 line-clamp-3 leading-relaxed">
                        {slide.desc || 'Описание слайда'}
                      </p>
                      <div className="mt-4 flex items-center gap-3">
                        <span className="bg-[#D92D20] text-white text-xs font-semibold px-4 py-2 rounded-xs shadow-sm">
                          {slide.ctaText || 'Стать партнёром'}
                        </span>
                        <span className="bg-white text-[#0F2147] text-xs font-semibold px-4 py-2 rounded-xs shadow-sm">
                          {slide.secondaryBtnText || 'Наши проекты'}
                        </span>
                      </div>
                    </div>

                    {/* Точки пагинации слайдов по центру внизу */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                      <span className="w-6 h-1.5 rounded-full bg-[#D92D20]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                    </div>

                    {/* Прогрессбар-триколор в самом низу блока слайдера */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-1.5 w-full z-30"
                      style={{
                        backgroundImage:
                          'linear-gradient(90deg, #FFFFFF 0 33.3%, #1447E6 33.3% 66.6%, #D92D20 66.6%)',
                      }}
                    />
                  </div>

                  {/* 5. Реальный блок "О центре" с картинкой спортзала, как на сайте под слайдером */}
                  <div className="bg-white px-8 py-6 border-t border-slate-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                      <div>
                        <span className="text-xs font-bold uppercase text-[#D92D20] flex items-center gap-2">
                          <span className="h-0.5 w-4 bg-[#D92D20]" />
                          О центре
                        </span>
                        <h4 className="text-base sm:text-lg font-bold text-[#0F2147] mt-1">
                          Миссия: спорт доступен каждому, от школьной площадки до пьедестала
                        </h4>
                        <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                          Центр развития спорта создан для того, чтобы физическая культура стала частью жизни каждого человека...
                        </p>
                      </div>
                      <div className="h-28 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center">
                        <img
                          src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80"
                          alt="Спортзал"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/* =========================================================================
   3. NEWS EDITOR (5. Лента новостей и пресс-релизов #news)
   ========================================================================= */
function NewsEditor({ data, setData, openMediaPicker }: { data: any; setData: any; openMediaPicker: any }) {
  const items = data?.items || [];

  const updateNews = (index: number, key: string, val: any) => {
    const next = [...items];
    const updatedItem = { ...next[index], [key]: val };
    if (key === 'excerpt') {
      updatedItem.summary = val;
    }
    next[index] = updatedItem;
    setData({ ...data, items: next });
  };

  const addNews = () => {
    const newItem = {
      id: `news-${Date.now()}`,
      slug: `news-${Date.now()}`,
      title: 'Новая публикация',
      date: '15 октября 2026',
      category: 'Пресс-релиз',
      excerpt: 'Краткий анонс новости или пресс-релиза...',
      summary: 'Краткий анонс новости или пресс-релиза...',
      content: ['Полный текст новости...'],
    };
    setData({ ...data, items: [newItem, ...items] });
  };

  const removeNews = (index: number) => {
    if (!confirm('Удалить эту публикацию?')) return;
    const next = items.filter((_: any, i: number) => i !== index);
    setData({ ...data, items: next });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
          Всего публикаций в ленте: {items.length}
        </h3>
        <button
          onClick={addNews}
          className="flex items-center gap-1.5 rounded-lg bg-amber-600 px-4 py-2 text-xs font-bold text-white hover:bg-amber-500"
        >
          <Plus className="h-4 w-4" />
          <span>Добавить публикацию</span>
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item: any, i: number) => (
          <div key={item.id || i} className="rounded-xl border border-[#222] bg-[#12161f] p-5 space-y-4">
            <div className="flex items-start justify-between border-b border-[#222] pb-3">
              <div className="flex items-center gap-2">
                <span className="rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 px-2 py-0.5 text-xs font-mono">
                  {item.category || 'Новости'}
                </span>
                <span className="text-xs text-slate-400 font-mono">{item.date}</span>
              </div>
              <button
                onClick={() => removeNews(i)}
                className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-950/40"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
              <div className="sm:col-span-2">
                <label className="admin-label">Заголовок публикации</label>
                <input
                  type="text"
                  value={item.title || ''}
                  onChange={(e) => updateNews(i, 'title', e.target.value)}
                  className="admin-input font-bold"
                />
              </div>
              <div>
                <label className="admin-label">Категория (бейдж)</label>
                <select
                  value={item.category || 'Пресс-релиз'}
                  onChange={(e) => updateNews(i, 'category', e.target.value)}
                  className="admin-input"
                >
                  <option value="Пресс-релиз">Пресс-релиз</option>
                  <option value="Новости">Новости</option>
                  <option value="Партнёрство">Партнёрство</option>
                  <option value="Событие">Событие</option>
                  <option value="Отчёт">Отчёт</option>
                </select>
              </div>
              <div>
                <label className="admin-label">Дата публикации</label>
                <input
                  type="text"
                  value={item.date || ''}
                  onChange={(e) => updateNews(i, 'date', e.target.value)}
                  placeholder="12 октября 2026"
                  className="admin-input font-mono text-xs"
                />
              </div>
            </div>

            <div>
              <label className="admin-label">Краткое описание (отображается в ленте под заголовком)</label>
              <textarea
                rows={2}
                value={item.excerpt ?? item.summary ?? ''}
                onChange={(e) => updateNews(i, 'excerpt', e.target.value)}
                className="admin-textarea"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   4. EVENTS EDITOR
   ========================================================================= */
function EventsEditor({ data, setData }: { data: any; setData: any }) {
  const items = data?.items || [];

  const updateEvent = (index: number, key: string, val: any) => {
    const next = [...items];
    next[index] = { ...next[index], [key]: val };
    setData({ ...data, items: next });
  };

  const addEvent = () => {
    const newEvt = {
      id: `evt-${Date.now()}`,
      title: 'Новое мероприятие',
      type: 'Всероссийский семинар',
      discipline: 'Горнолыжный спорт',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      location: 'г. Москва',
      region: 'Центральный ФО',
      status: 'Открыта регистрация',
      targetAudience: 'Инструкторы и специалисты',
      organizer: 'АНО «ЦЗСТ»',
      seatsTotal: 50,
      seatsLeft: 20,
    };
    setData({ ...data, items: [newEvt, ...items] });
  };

  const removeEvent = (index: number) => {
    if (!confirm('Удалить это мероприятие?')) return;
    const next = items.filter((_: any, i: number) => i !== index);
    setData({ ...data, items: next });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
          Всего мероприятий: {items.length}
        </h3>
        <button
          onClick={addEvent}
          className="flex items-center gap-1.5 rounded-lg bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-500"
        >
          <Plus className="h-4 w-4" />
          <span>Добавить мероприятие</span>
        </button>
      </div>

      <div className="space-y-5">
        {items.map((item: any, i: number) => (
          <div key={item.id || i} className="rounded-xl border border-[#222] bg-[#12161f] p-5 space-y-4">
            <div className="flex items-start justify-between border-b border-[#222] pb-3">
              <div className="flex items-center gap-2">
                <span className="rounded bg-emerald-950/60 border border-emerald-800 text-emerald-300 px-2 py-0.5 text-xs font-mono">
                  {item.status || 'Анонс'}
                </span>
                <span className="text-xs text-slate-400">{item.startDate} — {item.endDate}</span>
              </div>
              <button
                onClick={() => removeEvent(i)}
                className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-950/40"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div>
              <label className="admin-label">Название мероприятия</label>
              <textarea
                rows={2}
                value={item.title || ''}
                onChange={(e) => updateEvent(i, 'title', e.target.value)}
                className="admin-textarea font-bold"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div>
                <label className="admin-label">Тип</label>
                <input
                  type="text"
                  value={item.type || ''}
                  onChange={(e) => updateEvent(i, 'type', e.target.value)}
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Дисциплина</label>
                <input
                  type="text"
                  value={item.discipline || ''}
                  onChange={(e) => updateEvent(i, 'discipline', e.target.value)}
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Дата начала</label>
                <input
                  type="date"
                  value={item.startDate || ''}
                  onChange={(e) => updateEvent(i, 'startDate', e.target.value)}
                  className="admin-input font-mono"
                />
              </div>
              <div>
                <label className="admin-label">Дата окончания</label>
                <input
                  type="date"
                  value={item.endDate || ''}
                  onChange={(e) => updateEvent(i, 'endDate', e.target.value)}
                  className="admin-input font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <label className="admin-label">Место проведения (Локация)</label>
                <input
                  type="text"
                  value={item.location || ''}
                  onChange={(e) => updateEvent(i, 'location', e.target.value)}
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Статус записи</label>
                <input
                  type="text"
                  value={item.status || ''}
                  onChange={(e) => updateEvent(i, 'status', e.target.value)}
                  className="admin-input"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   5. SPECIALISTS REGISTRY EDITOR
   ========================================================================= */
function SpecialistsEditor({ data, setData }: { data: any; setData: any }) {
  const items = data?.items || [];
  const [filter, setFilter] = useState('');

  const updateSpec = (index: number, key: string, val: any) => {
    const next = [...items];
    next[index] = { ...next[index], [key]: val };
    setData({ ...data, items: next });
  };

  const addSpec = () => {
    const newSpec = {
      id: `spec-${Date.now()}`,
      fullName: 'Новый специалист',
      certificateNumber: `RU-CRZS-${Math.floor(1000 + Math.random() * 9000)}`,
      category: 'Инструктор категории B',
      discipline: 'Горнолыжный спорт',
      issueDate: '2025-01-15',
      validUntil: '2028-01-15',
      status: 'Действителен',
      region: 'г. Москва',
      organization: 'АНО «ЦЗСТ»',
    };
    setData({ ...data, items: [newSpec, ...items] });
  };

  const removeSpec = (index: number) => {
    if (!confirm('Удалить специалиста из реестра?')) return;
    const next = items.filter((_: any, i: number) => i !== index);
    setData({ ...data, items: next });
  };

  const filteredItems = items.filter((s: any) =>
    (s.fullName || '').toLowerCase().includes(filter.toLowerCase()) ||
    (s.certificateNumber || '').toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <input
          type="text"
          placeholder="Поиск специалиста по ФИО или номеру..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="admin-input max-w-md text-xs"
        />

        <button
          onClick={addSpec}
          className="flex items-center gap-1.5 rounded-lg bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-500"
        >
          <Plus className="h-4 w-4" />
          <span>Добавить специалиста</span>
        </button>
      </div>

      <div className="space-y-3">
        {filteredItems.map((spec: any, i: number) => (
          <div key={spec.id || i} className="rounded-xl border border-[#222] bg-[#12161f] p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-[#222] pb-2">
              <span className="font-mono text-xs text-blue-400 font-bold">
                {spec.certificateNumber}
              </span>
              <button
                onClick={() => removeSpec(i)}
                className="text-red-400 hover:text-red-300 p-1"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <label className="admin-label">ФИО специалиста</label>
                <input
                  type="text"
                  value={spec.fullName || ''}
                  onChange={(e) => updateSpec(i, 'fullName', e.target.value)}
                  className="admin-input font-bold"
                />
              </div>
              <div>
                <label className="admin-label">Номер удостоверения</label>
                <input
                  type="text"
                  value={spec.certificateNumber || ''}
                  onChange={(e) => updateSpec(i, 'certificateNumber', e.target.value)}
                  className="admin-input font-mono"
                />
              </div>
              <div>
                <label className="admin-label">Статус</label>
                <select
                  value={spec.status || 'Действителен'}
                  onChange={(e) => updateSpec(i, 'status', e.target.value)}
                  className="admin-select"
                >
                  <option value="Действителен">Действителен</option>
                  <option value="На подтверждении">На подтверждении</option>
                  <option value="Истек срок">Истек срок</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div>
                <label className="admin-label">Квалификация</label>
                <input
                  type="text"
                  value={spec.category || ''}
                  onChange={(e) => updateSpec(i, 'category', e.target.value)}
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Дисциплина</label>
                <input
                  type="text"
                  value={spec.discipline || ''}
                  onChange={(e) => updateSpec(i, 'discipline', e.target.value)}
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Регион</label>
                <input
                  type="text"
                  value={spec.region || ''}
                  onChange={(e) => updateSpec(i, 'region', e.target.value)}
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Действителен до</label>
                <input
                  type="text"
                  value={spec.validUntil || ''}
                  onChange={(e) => updateSpec(i, 'validUntil', e.target.value)}
                  className="admin-input font-mono"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   6. DOCUMENTS EDITOR
   ========================================================================= */
function DocumentsEditor({ data, setData, openMediaPicker }: { data: any; setData: any; openMediaPicker: any }) {
  const items = data?.items || [];

  const updateDoc = (index: number, key: string, val: any) => {
    const next = [...items];
    next[index] = { ...next[index], [key]: val };
    setData({ ...data, items: next });
  };

  const addDoc = () => {
    const newDoc = {
      id: `doc-${Date.now()}`,
      title: 'Новый документ организации',
      category: 'Учредительные',
      year: '2026',
      date: '2026',
      fileUrl: '#',
    };
    setData({ ...data, items: [...items, newDoc] });
  };

  const removeDoc = (index: number) => {
    if (!confirm('Удалить этот документ?')) return;
    const next = items.filter((_: any, i: number) => i !== index);
    setData({ ...data, items: next });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
          Всего документов (#documents): {items.length}
        </h3>
        <button
          onClick={addDoc}
          className="flex items-center gap-1.5 rounded-lg bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-500"
        >
          <Plus className="h-4 w-4" />
          <span>Добавить документ</span>
        </button>
      </div>

      <div className="space-y-4">
        {items.map((doc: any, i: number) => (
          <div key={doc.id || i} className="rounded-xl border border-[#222] bg-[#12161f] p-4 space-y-3">
            <div className="flex items-start justify-between border-b border-[#222] pb-2">
              <span className="font-mono text-xs text-blue-400">
                {doc.category || 'Учредительные'} • {doc.year || doc.date || '2026'}
              </span>
              <button onClick={() => removeDoc(i)} className="text-red-400 hover:text-red-300 p-1">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>

            <div>
              <label className="admin-label">Название документа</label>
              <input
                type="text"
                value={doc.title || ''}
                onChange={(e) => updateDoc(i, 'title', e.target.value)}
                className="admin-input font-bold"
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="admin-label">Категория (Учредительные / Отчётность / Положения)</label>
                <input
                  type="text"
                  value={doc.category || ''}
                  onChange={(e) => updateDoc(i, 'category', e.target.value)}
                  placeholder="Учредительные, Отчётность или Положения"
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Год документа</label>
                <input
                  type="text"
                  value={doc.year || doc.date?.slice(0, 4) || ''}
                  onChange={(e) => {
                    const next = [...items];
                    next[i] = { ...next[i], year: e.target.value, date: e.target.value };
                    setData({ ...data, items: next });
                  }}
                  placeholder="2026"
                  className="admin-input font-mono"
                />
              </div>
            </div>

            <div>
              <label className="admin-label">Файл документа (PDF/DOCX в R2 или ссылка)</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={doc.fileUrl || ''}
                  onChange={(e) => updateDoc(i, 'fileUrl', e.target.value)}
                  className="admin-input font-mono text-xs flex-1"
                  placeholder="/api/media/... или https://..."
                />
                <button
                  type="button"
                  onClick={() => openMediaPicker((url: string) => updateDoc(i, 'fileUrl', url))}
                  className="flex items-center gap-1.5 rounded bg-[#1e2638] border border-[#334155] px-3 py-2 text-xs text-slate-200 hover:bg-[#28334a]"
                >
                  <ImageIcon className="h-3.5 w-3.5" />
                  <span>Выбрать из R2</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   7. DIRECTIONS / PROJECTS EDITOR (#projects)
   ========================================================================= */
function DirectionsEditor({ data, setData }: { data: any; setData: any }) {
  const list = Array.isArray(data) ? data : data?.directions || [];

  const updateField = (field: string, val: any) => {
    if (!Array.isArray(data)) {
      setData({ ...data, [field]: val });
    }
  };

  const updateDir = (index: number, key: string, val: any) => {
    const next = [...list];
    next[index] = { ...next[index], [key]: val };
    if (Array.isArray(data)) {
      setData(next);
    } else {
      setData({ ...data, directions: next });
    }
  };

  const addDir = () => {
    const next = [
      ...list,
      {
        id: `proj-${Date.now()}`,
        category: 'Массовый спорт',
        title: 'Новый проект или программа',
        description: 'Описание проекта или программы АНО «ЦЗСТ»...',
      },
    ];
    if (Array.isArray(data)) {
      setData(next);
    } else {
      setData({ ...data, directions: next });
    }
  };

  const removeDir = (index: number) => {
    if (!confirm('Удалить этот проект?')) return;
    const next = list.filter((_: any, i: number) => i !== index);
    if (Array.isArray(data)) {
      setData(next);
    } else {
      setData({ ...data, directions: next });
    }
  };

  return (
    <div className="space-y-6">
      {!Array.isArray(data) && (
        <div className="rounded-xl border border-[#222] bg-[#12161f] p-5 space-y-4">
          <h3 className="text-base font-bold text-white border-b border-[#222] pb-3">
            Заголовок секции «Проекты и программы» (#projects)
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="admin-label">Надзаголовок секции</label>
              <input
                type="text"
                value={data?.projectsEyebrow ?? 'Направления работы'}
                onChange={(e) => updateField('projectsEyebrow', e.target.value)}
                className="admin-input"
              />
            </div>
            <div>
              <label className="admin-label">Заголовок секции (H2)</label>
              <input
                type="text"
                value={data?.projectsTitle ?? 'Проекты и программы'}
                onChange={(e) => updateField('projectsTitle', e.target.value)}
                className="admin-input font-bold"
              />
            </div>
          </div>
          <div>
            <label className="admin-label">Подзаголовок секции</label>
            <input
              type="text"
              value={
                data?.projectsSubtitle ??
                'Шесть взаимосвязанных программ — от дворовых турниров до подготовки сборных.'
              }
              onChange={(e) => updateField('projectsSubtitle', e.target.value)}
              className="admin-input"
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
          Карточки проектов: {list.length}
        </h3>
        <button
          type="button"
          onClick={addDir}
          className="flex items-center gap-1.5 rounded-lg bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-500"
        >
          <Plus className="h-4 w-4" />
          <span>Добавить проект</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {list.map((dir: any, i: number) => (
          <div key={dir.id || i} className="rounded-xl border border-[#222] bg-[#12161f] p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-[#222] pb-2">
              <h3 className="font-bold text-white text-sm">Проект 0{i + 1}</h3>
              <button
                type="button"
                onClick={() => removeDir(i)}
                className="text-red-400 hover:text-red-300 p-1"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
            <div>
              <label className="admin-label">Категория (бейдж справа вверху)</label>
              <input
                type="text"
                value={dir.category || ''}
                onChange={(e) => updateDir(i, 'category', e.target.value)}
                placeholder="Например: Массовый спорт"
                className="admin-input"
              />
            </div>
            <div>
              <label className="admin-label">Название проекта</label>
              <input
                type="text"
                value={dir.title || ''}
                onChange={(e) => updateDir(i, 'title', e.target.value)}
                className="admin-input font-bold"
              />
            </div>
            <div>
              <label className="admin-label">Описание</label>
              <textarea
                rows={3}
                value={dir.description || ''}
                onChange={(e) => updateDir(i, 'description', e.target.value)}
                className="admin-textarea"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   8. PARTNERS EDITOR (#partners)
   ========================================================================= */
function PartnersEditor({ data, setData }: { data: any; setData: any; openMediaPicker?: any }) {
  const items = data?.items || [];

  const updatePartner = (index: number, key: string, val: any) => {
    const next = [...items];
    next[index] = { ...next[index], [key]: val };
    setData({ ...data, items: next });
  };

  const addPartner = () => {
    const newPartner = {
      id: `partner-${Date.now()}`,
      name: 'Новая организация-партнёр',
      category: 'Министерства и ведомства',
    };
    setData({ ...data, items: [...items, newPartner] });
  };

  const removePartner = (index: number) => {
    const next = items.filter((_: any, i: number) => i !== index);
    setData({ ...data, items: next });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
          Всего партнёров (#partners): {items.length}
        </h3>
        <button
          onClick={addPartner}
          className="flex items-center gap-1.5 rounded-lg bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-500"
        >
          <Plus className="h-4 w-4" />
          <span>Добавить партнёра</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((p: any, i: number) => (
          <div key={p.id || i} className="rounded-xl border border-[#222] bg-[#12161f] p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-[#222] pb-2">
              <span className="font-bold text-sm text-white">{p.name || 'Партнёр'}</span>
              <button onClick={() => removePartner(i)} className="text-red-400 hover:text-red-300 p-1">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>

            <div>
              <label className="admin-label">Наименование организации</label>
              <input
                type="text"
                value={p.name || ''}
                onChange={(e) => updatePartner(i, 'name', e.target.value)}
                className="admin-input font-semibold"
              />
            </div>

            <div>
              <label className="admin-label">Колонка (Министерства и ведомства / Федерации / Спонсоры и партнёры)</label>
              <input
                type="text"
                value={p.category || ''}
                onChange={(e) => updatePartner(i, 'category', e.target.value)}
                placeholder="Министерства и ведомства, Федерации или Спонсоры и партнёры"
                className="admin-input"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   9. CONTACTS EDITOR (#contacts)
   ========================================================================= */
function ContactsEditor({ data, setData }: { data: any; setData: any }) {
  if (!data) return null;

  const updateField = (field: string, val: any) => {
    setData({ ...data, [field]: val });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-[#222] bg-[#12161f] p-5 space-y-4">
        <h3 className="text-base font-bold text-white border-b border-[#222] pb-3">
          Заголовок и форма секции «Контакты» (#contacts)
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="admin-label">Надзаголовок (Eyebrow)</label>
            <input
              type="text"
              value={data.contactsEyebrow ?? 'Контакты'}
              onChange={(e) => updateField('contactsEyebrow', e.target.value)}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label">Заголовок секции (H2)</label>
            <input
              type="text"
              value={data.contactsTitle ?? 'Свяжитесь с нами'}
              onChange={(e) => updateField('contactsTitle', e.target.value)}
              className="admin-input font-bold"
            />
          </div>
        </div>
        <div>
          <label className="admin-label">Подзаголовок секции</label>
          <textarea
            rows={2}
            value={
              data.contactsSubtitle ??
              'Ответим на вопросы о программах, документах и формах сотрудничества.'
            }
            onChange={(e) => updateField('contactsSubtitle', e.target.value)}
            className="admin-textarea"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="admin-label">Подпись поля сообщения</label>
            <input
              type="text"
              value={data.contactsFormMessageLabel ?? 'Ваше обращение *'}
              onChange={(e) => updateField('contactsFormMessageLabel', e.target.value)}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label">Текст кнопки отправки</label>
            <input
              type="text"
              value={data.contactsFormSubmitLabel ?? 'Отправить обращение'}
              onChange={(e) => updateField('contactsFormSubmitLabel', e.target.value)}
              className="admin-input font-bold"
            />
          </div>
        </div>
        <div>
          <label className="admin-label">Плейсхолдер поля сообщения</label>
          <input
            type="text"
            value={
              data.contactsFormMessagePlaceholder ??
              'Опишите вопрос, предложение о сотрудничестве или запрос документов'
            }
            onChange={(e) => updateField('contactsFormMessagePlaceholder', e.target.value)}
            className="admin-input"
          />
        </div>
      </div>

      <div className="rounded-xl border border-[#222] bg-[#12161f] p-5 space-y-4">
        <h3 className="text-base font-bold text-white border-b border-[#222] pb-3">
          Контактные данные организации
        </h3>

        <div>
          <label className="admin-label">Адрес местонахождения</label>
          <input
            type="text"
            value={data.legalAddress || ''}
            onChange={(e) => updateField('legalAddress', e.target.value)}
            className="admin-input"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="admin-label">Телефон</label>
            <input
              type="text"
              value={data.phone || ''}
              onChange={(e) => updateField('phone', e.target.value)}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label">Электронная почта</label>
            <input
              type="text"
              value={data.receptionEmail || ''}
              onChange={(e) => updateField('receptionEmail', e.target.value)}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label">Режим работы</label>
            <input
              type="text"
              value={data.workHours || ''}
              onChange={(e) => updateField('workHours', e.target.value)}
              className="admin-input"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
