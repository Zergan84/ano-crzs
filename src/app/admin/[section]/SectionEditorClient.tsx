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

const sectionTitles: Record<string, { title: string; desc: string }> = {
  organization: { title: 'Организация', desc: 'Наименование, юридические реквизиты, адреса и ключевые показатели' },
  hero: { title: 'Слайдер Hero (Главный экран)', desc: 'Управление слайдами, текстами, слоганами и изображениями стартового экрана' },
  news: { title: 'Новости и статьи', desc: 'Публикация новостей, анонсов и статей с фотографиями и датами' },
  events: { title: 'Мероприятия', desc: 'Календарь всероссийских семинаров, курсов подготовки и конференций' },
  specialists: { title: 'Единый реестр специалистов', desc: 'Управление базой аттестованных инструкторов, тренеров и судей' },
  documents: { title: 'Официальные документы', desc: 'Учредительные документы, регламенты, стандарты безопасности и приказы' },
  directions: { title: 'Направления деятельности', desc: 'Ключевые сферы отраслевой работы АНО «ЦРЗС»' },
  partners: { title: 'Партнёры и спонсоры', desc: 'Список официальных, генеральных и технических спонсоров' },
  contacts: { title: 'Контакты и реквизиты', desc: 'Телефоны, адреса электронной почты отделов, режим работы и банк' },
};

export default function SectionEditorClient({ section }: { section: string }) {

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Media Picker state
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [mediaPickerCallback, setMediaPickerCallback] = useState<((url: string) => void) | null>(null);

  useEffect(() => {
    loadSectionData();
  }, [section]);

  async function loadSectionData() {
    setLoading(true);
    setStatusMessage(null);
    try {
      const apiEndpoint = (typeof window !== 'undefined' && window.location.hostname.includes('pages.dev'))
        ? `https://ano-crzs.101filmstudio.workers.dev/api/admin/content/${section}`
        : `/api/admin/content/${section}`;
      const res = await fetch(apiEndpoint);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        // Fallback to default
        const def = (DEFAULT_CONTENT as any)[section] || {};
        setData(def);
      }
    } catch {
      const def = (DEFAULT_CONTENT as any)[section] || {};
      setData(def);
    }
    setLoading(false);
  }

  async function handleSave() {
    setSaving(true);
    setStatusMessage(null);
    try {
      const apiEndpoint = (typeof window !== 'undefined' && window.location.hostname.includes('pages.dev'))
        ? `https://ano-crzs.101filmstudio.workers.dev/api/admin/content/${section}`
        : `/api/admin/content/${section}`;

      const res = await fetch(apiEndpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
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
          <OrganizationEditor data={data} setData={setData} />
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
   1. ORGANIZATION EDITOR
   ========================================================================= */
function OrganizationEditor({ data, setData }: { data: any; setData: any }) {
  if (!data) return null;

  const updateField = (field: string, val: any) => {
    setData({ ...data, [field]: val });
  };

  const updateStat = (index: number, key: string, val: string) => {
    const stats = [...(data.stats || [])];
    stats[index] = { ...stats[index], [key]: val };
    setData({ ...data, stats });
  };

  const addStat = () => {
    setData({
      ...data,
      stats: [...(data.stats || []), { value: '100+', label: 'Новый показатель' }],
    });
  };

  const removeStat = (index: number) => {
    const stats = data.stats.filter((_: any, i: number) => i !== index);
    setData({ ...data, stats });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-[#222] bg-[#12161f] p-5 space-y-4">
        <h3 className="text-base font-bold text-white border-b border-[#222] pb-3">
          Основные сведения
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="admin-label">Полное наименование</label>
            <textarea
              rows={2}
              value={data.fullName || ''}
              onChange={(e) => updateField('fullName', e.target.value)}
              className="admin-textarea"
            />
          </div>
          <div>
            <label className="admin-label">Краткое наименование</label>
            <input
              type="text"
              value={data.shortName || ''}
              onChange={(e) => updateField('shortName', e.target.value)}
              className="admin-input"
            />
          </div>
        </div>

        <div>
          <label className="admin-label">Слоган / Описание деятельности</label>
          <textarea
            rows={2}
            value={data.tagline || ''}
            onChange={(e) => updateField('tagline', e.target.value)}
            className="admin-textarea"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <label className="admin-label">Год основания</label>
            <input
              type="number"
              value={data.establishedYear || 2012}
              onChange={(e) => updateField('establishedYear', Number(e.target.value))}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label">ИНН</label>
            <input
              type="text"
              value={data.inn || ''}
              onChange={(e) => updateField('inn', e.target.value)}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label">КПП</label>
            <input
              type="text"
              value={data.kpp || ''}
              onChange={(e) => updateField('kpp', e.target.value)}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label">ОГРН</label>
            <input
              type="text"
              value={data.ogrn || ''}
              onChange={(e) => updateField('ogrn', e.target.value)}
              className="admin-input"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="admin-label">Юридический адрес</label>
            <input
              type="text"
              value={data.legalAddress || ''}
              onChange={(e) => updateField('legalAddress', e.target.value)}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label">Фактический адрес</label>
            <input
              type="text"
              value={data.actualAddress || ''}
              onChange={(e) => updateField('actualAddress', e.target.value)}
              className="admin-input"
            />
          </div>
        </div>
      </div>

      {/* Stats Counter List */}
      <div className="rounded-xl border border-[#222] bg-[#12161f] p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-[#222] pb-3">
          <h3 className="text-base font-bold text-white">Статистические показатели</h3>
          <button
            onClick={addStat}
            className="flex items-center gap-1.5 rounded bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-500"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Добавить</span>
          </button>
        </div>

        <div className="space-y-3">
          {(data.stats || []).map((st: any, i: number) => (
            <div key={i} className="flex items-center gap-3 rounded-lg border border-[#2a2a2a] bg-[#161a24] p-3">
              <div className="w-32">
                <input
                  type="text"
                  placeholder="1 480+"
                  value={st.value}
                  onChange={(e) => updateStat(i, 'value', e.target.value)}
                  className="admin-input font-bold"
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Подпись показателя"
                  value={st.label}
                  onChange={(e) => updateStat(i, 'label', e.target.value)}
                  className="admin-input"
                />
              </div>
              <button
                onClick={() => removeStat(i)}
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

  const updateSlide = (index: number, key: string, val: string) => {
    const next = [...slides];
    next[index] = { ...next[index], [key]: val };
    setData({ ...data, slides: next });
  };

  return (
    <div className="space-y-6">
      {slides.map((slide: any, i: number) => (
        <div key={slide.id || i} className="rounded-xl border border-[#222] bg-[#12161f] p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#222] pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="rounded bg-red-600/20 text-red-400 px-2 py-0.5 text-xs font-mono">
                Слайд 0{i + 1}
              </span>
              <span>{slide.tag || 'Слайд'}</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="admin-label">Метка над заголовком</label>
              <input
                type="text"
                value={slide.tag || ''}
                onChange={(e) => updateSlide(i, 'tag', e.target.value)}
                className="admin-input"
              />
            </div>
            <div>
              <label className="admin-label">Текст кнопки действия</label>
              <input
                type="text"
                value={slide.ctaText || ''}
                onChange={(e) => updateSlide(i, 'ctaText', e.target.value)}
                className="admin-input"
              />
            </div>
            <div>
              <label className="admin-label">Ссылка кнопки (href)</label>
              <input
                type="text"
                value={slide.ctaHref || ''}
                onChange={(e) => updateSlide(i, 'ctaHref', e.target.value)}
                className="admin-input font-mono"
              />
            </div>
          </div>

          <div>
            <label className="admin-label">Главный заголовок слайда</label>
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

          <div>
            <label className="admin-label">Изображение слайда (URL или R2)</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={slide.image || ''}
                onChange={(e) => updateSlide(i, 'image', e.target.value)}
                className="admin-input font-mono text-xs flex-1"
                placeholder="/carve-cup.jpg или https://..."
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
            {slide.image && (
              <div className="mt-2 h-20 w-32 overflow-hidden rounded border border-[#2a2a2a] bg-black">
                <img src={slide.image} alt="Preview" className="h-full w-full object-cover" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/* =========================================================================
   3. NEWS EDITOR
   ========================================================================= */
function NewsEditor({ data, setData, openMediaPicker }: { data: any; setData: any; openMediaPicker: any }) {
  const items = data?.items || [];

  const updateNews = (index: number, key: string, val: any) => {
    const next = [...items];
    next[index] = { ...next[index], [key]: val };
    setData({ ...data, items: next });
  };

  const addNews = () => {
    const newItem = {
      id: `news-${Date.now()}`,
      title: 'Новая публикация',
      date: new Date().toISOString().split('T')[0],
      category: 'Отраслевые стандарты',
      excerpt: 'Краткий анонс новости...',
      content: 'Полный текст новости...',
      imageUrl: '',
      author: 'Пресс-служба АНО «ЦРЗС»',
      readTime: '3 мин',
    };
    setData({ ...data, items: [newItem, ...items] });
  };

  const removeNews = (index: number) => {
    if (!confirm('Удалить эту новость?')) return;
    const next = items.filter((_: any, i: number) => i !== index);
    setData({ ...data, items: next });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
          Всего новостей: {items.length}
        </h3>
        <button
          onClick={addNews}
          className="flex items-center gap-1.5 rounded-lg bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-500"
        >
          <Plus className="h-4 w-4" />
          <span>Добавить новость</span>
        </button>
      </div>

      <div className="space-y-5">
        {items.map((item: any, i: number) => (
          <div key={item.id || i} className="rounded-xl border border-[#222] bg-[#12161f] p-5 space-y-4">
            <div className="flex items-start justify-between border-b border-[#222] pb-3">
              <div className="flex items-center gap-2">
                <span className="rounded bg-red-950/60 border border-red-800 text-red-300 px-2 py-0.5 text-xs font-mono">
                  {item.category || 'Новость'}
                </span>
                <span className="text-xs text-slate-500 font-mono">{item.date}</span>
              </div>
              <button
                onClick={() => removeNews(i)}
                className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-950/40"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <label className="admin-label">Заголовок</label>
                <input
                  type="text"
                  value={item.title || ''}
                  onChange={(e) => updateNews(i, 'title', e.target.value)}
                  className="admin-input font-bold"
                />
              </div>
              <div>
                <label className="admin-label">Категория</label>
                <input
                  type="text"
                  value={item.category || ''}
                  onChange={(e) => updateNews(i, 'category', e.target.value)}
                  className="admin-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="admin-label">Дата публикации</label>
                <input
                  type="date"
                  value={item.date || ''}
                  onChange={(e) => updateNews(i, 'date', e.target.value)}
                  className="admin-input font-mono"
                />
              </div>
              <div>
                <label className="admin-label">Автор</label>
                <input
                  type="text"
                  value={item.author || ''}
                  onChange={(e) => updateNews(i, 'author', e.target.value)}
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Время чтения</label>
                <input
                  type="text"
                  value={item.readTime || ''}
                  onChange={(e) => updateNews(i, 'readTime', e.target.value)}
                  className="admin-input"
                />
              </div>
            </div>

            <div>
              <label className="admin-label">Краткий анонс</label>
              <textarea
                rows={2}
                value={item.excerpt || ''}
                onChange={(e) => updateNews(i, 'excerpt', e.target.value)}
                className="admin-textarea"
              />
            </div>

            <div>
              <label className="admin-label">Полный текст</label>
              <textarea
                rows={4}
                value={item.content || ''}
                onChange={(e) => updateNews(i, 'content', e.target.value)}
                className="admin-textarea font-sans"
              />
            </div>

            <div>
              <label className="admin-label">Изображение обложки</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={item.imageUrl || ''}
                  onChange={(e) => updateNews(i, 'imageUrl', e.target.value)}
                  className="admin-input font-mono text-xs flex-1"
                  placeholder="/news/photo.jpg или R2 ссылка"
                />
                <button
                  type="button"
                  onClick={() => openMediaPicker((url: string) => updateNews(i, 'imageUrl', url))}
                  className="flex items-center gap-1.5 rounded bg-[#1e2638] border border-[#334155] px-3 py-2 text-xs text-slate-200 hover:bg-[#28334a]"
                >
                  <ImageIcon className="h-3.5 w-3.5" />
                  <span>Медиатека</span>
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
      organizer: 'АНО «ЦРЗС»',
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
      organization: 'АНО «ЦРЗС»',
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
      title: 'Новый нормативный документ',
      category: 'Отраслевые стандарты',
      documentNumber: '№ СТ-2025/01',
      date: new Date().toISOString().split('T')[0],
      fileUrl: '',
      fileSize: '1.2 MB',
      description: 'Краткое описание документа...',
    };
    setData({ ...data, items: [newDoc, ...items] });
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
          Всего документов: {items.length}
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
              <span className="font-mono text-xs text-red-400">{doc.documentNumber || 'Без номера'}</span>
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

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <label className="admin-label">Категория</label>
                <input
                  type="text"
                  value={doc.category || ''}
                  onChange={(e) => updateDoc(i, 'category', e.target.value)}
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Номер приказа / документа</label>
                <input
                  type="text"
                  value={doc.documentNumber || ''}
                  onChange={(e) => updateDoc(i, 'documentNumber', e.target.value)}
                  className="admin-input font-mono"
                />
              </div>
              <div>
                <label className="admin-label">Дата утверждения</label>
                <input
                  type="text"
                  value={doc.date || ''}
                  onChange={(e) => updateDoc(i, 'date', e.target.value)}
                  className="admin-input font-mono"
                />
              </div>
            </div>

            <div>
              <label className="admin-label">Файл документа (PDF/DOCX в R2)</label>
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
   7. DIRECTIONS EDITOR
   ========================================================================= */
function DirectionsEditor({ data, setData }: { data: any; setData: any }) {
  const directions = data?.directions || data || [];

  const updateDir = (index: number, key: string, val: any) => {
    const list = Array.isArray(directions) ? [...directions] : [...(data.directions || [])];
    list[index] = { ...list[index], [key]: val };
    if (Array.isArray(data)) {
      setData(list);
    } else {
      setData({ ...data, directions: list });
    }
  };

  const list = Array.isArray(directions) ? directions : (data.directions || []);

  return (
    <div className="space-y-5">
      {list.map((dir: any, i: number) => (
        <div key={dir.id || i} className="rounded-xl border border-[#222] bg-[#12161f] p-5 space-y-3">
          <h3 className="font-bold text-white text-base">Направление 0{i + 1}</h3>
          <div>
            <label className="admin-label">Заголовок направления</label>
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
  );
}

/* =========================================================================
   8. PARTNERS EDITOR
   ========================================================================= */
function PartnersEditor({ data, setData, openMediaPicker }: { data: any; setData: any; openMediaPicker: any }) {
  const items = data?.items || [];

  const updatePartner = (index: number, key: string, val: any) => {
    const next = [...items];
    next[index] = { ...next[index], [key]: val };
    setData({ ...data, items: next });
  };

  const addPartner = () => {
    const newPartner = {
      id: `partner-${Date.now()}`,
      name: 'Новый спонсор / партнёр',
      category: 'Официальный партнёр',
      logo: '',
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
          Всего партнёров: {items.length}
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
              <label className="admin-label">Наименование компании / курорта</label>
              <input
                type="text"
                value={p.name || ''}
                onChange={(e) => updatePartner(i, 'name', e.target.value)}
                className="admin-input"
              />
            </div>

            <div>
              <label className="admin-label">Категория</label>
              <input
                type="text"
                value={p.category || ''}
                onChange={(e) => updatePartner(i, 'category', e.target.value)}
                className="admin-input"
              />
            </div>

            <div>
              <label className="admin-label">Логотип (URL)</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={p.logo || ''}
                  onChange={(e) => updatePartner(i, 'logo', e.target.value)}
                  className="admin-input font-mono text-xs flex-1"
                  placeholder="/api/media/... или ссылка"
                />
                <button
                  type="button"
                  onClick={() => openMediaPicker((url: string) => updatePartner(i, 'logo', url))}
                  className="flex items-center gap-1 rounded bg-[#1e2638] border border-[#334155] px-2.5 py-1.5 text-xs text-slate-200"
                >
                  <ImageIcon className="h-3.5 w-3.5" />
                  <span>R2</span>
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
   9. CONTACTS EDITOR
   ========================================================================= */
function ContactsEditor({ data, setData }: { data: any; setData: any }) {
  if (!data) return null;

  const updateField = (field: string, val: any) => {
    setData({ ...data, [field]: val });
  };

  const updateBank = (field: string, val: any) => {
    setData({
      ...data,
      bankRequisites: { ...(data.bankRequisites || {}), [field]: val },
    });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-[#222] bg-[#12161f] p-5 space-y-4">
        <h3 className="text-base font-bold text-white border-b border-[#222] pb-3">
          Связь и часы работы
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="admin-label">Основной телефон</label>
            <input
              type="text"
              value={data.phone || ''}
              onChange={(e) => updateField('phone', e.target.value)}
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="admin-label">Email приёмной</label>
            <input
              type="text"
              value={data.receptionEmail || ''}
              onChange={(e) => updateField('receptionEmail', e.target.value)}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label">Email пресс-службы</label>
            <input
              type="text"
              value={data.pressEmail || ''}
              onChange={(e) => updateField('pressEmail', e.target.value)}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label">Email реестра специалистов</label>
            <input
              type="text"
              value={data.registryEmail || ''}
              onChange={(e) => updateField('registryEmail', e.target.value)}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label">Email учебного центра</label>
            <input
              type="text"
              value={data.educationEmail || ''}
              onChange={(e) => updateField('educationEmail', e.target.value)}
              className="admin-input"
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-[#222] bg-[#12161f] p-5 space-y-4">
        <h3 className="text-base font-bold text-white border-b border-[#222] pb-3">
          Банковские реквизиты
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="admin-label">Наименование банка</label>
            <input
              type="text"
              value={data.bankRequisites?.bankName || ''}
              onChange={(e) => updateBank('bankName', e.target.value)}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label">БИК</label>
            <input
              type="text"
              value={data.bankRequisites?.bik || ''}
              onChange={(e) => updateBank('bik', e.target.value)}
              className="admin-input font-mono"
            />
          </div>
          <div>
            <label className="admin-label">Расчётный счёт</label>
            <input
              type="text"
              value={data.bankRequisites?.checkingAccount || ''}
              onChange={(e) => updateBank('checkingAccount', e.target.value)}
              className="admin-input font-mono"
            />
          </div>
          <div>
            <label className="admin-label">Корреспондентский счёт</label>
            <input
              type="text"
              value={data.bankRequisites?.correspondentAccount || ''}
              onChange={(e) => updateBank('correspondentAccount', e.target.value)}
              className="admin-input font-mono"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
