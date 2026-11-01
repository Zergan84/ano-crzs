'use client';

import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import {
  ArrowLeft,
  Save,
  CheckCircle2,
  Palette,
  Type,
  Sparkles,
  Plus,
  RotateCcw,
  Trash2,
  Check,
  Sliders,
  Eye,
} from 'lucide-react';
import {
  DEFAULT_THEMES,
  DEFAULT_THEMES_LIST,
  DEFAULT_SETTINGS,
  ThemeConfig,
} from '@/data/defaultContent';
import { GOOGLE_FONTS, getFontUrl } from '@/lib/google-fonts';
import { notifyContentUpdated } from '@/lib/content';

export default function AdminThemesPage() {
  const [themesData, setThemesData] = useState(DEFAULT_THEMES);
  const [selectedThemeId, setSelectedThemeId] = useState<string>('basic-light');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadThemes();
  }, []);

  async function loadThemes() {
    try {
      const [themesRes, settingsRes] = await Promise.all([
        fetch('/api/admin/content/themes'),
        fetch('/api/admin/content/settings'),
      ]);

      let activeId = DEFAULT_THEMES.activeThemeId;
      let items: ThemeConfig[] = DEFAULT_THEMES_LIST;

      if (settingsRes.ok) {
        const sJson = await settingsRes.json();
        if (sJson?.activeThemeId) {
          activeId = sJson.activeThemeId;
        }
      }

      if (themesRes.ok) {
        const tJson = await themesRes.json();
        if (tJson && typeof tJson === 'object') {
          if (tJson.activeThemeId) activeId = tJson.activeThemeId;
          if (Array.isArray(tJson.items) && tJson.items.length > 0) {
            items = tJson.items.map((it: ThemeConfig) => {
              const def = DEFAULT_THEMES_LIST.find((d) => d.id === it.id);
              return def ? { ...def, ...it } : it;
            });
            for (const def of DEFAULT_THEMES_LIST) {
              if (!items.some((m) => m.id === def.id)) {
                items.push(def);
              }
            }
          }
        }
      }

      // Check URL query param ?theme=...
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const paramTheme = urlParams.get('theme');
        if (paramTheme && items.some((t) => t.id === paramTheme)) {
          setSelectedThemeId(paramTheme);
        } else {
          setSelectedThemeId(activeId);
        }
      } else {
        setSelectedThemeId(activeId);
      }

      setThemesData({ activeThemeId: activeId, items });
    } catch {}
    setLoading(false);
  }

  const currentTheme: ThemeConfig =
    themesData.items.find((t) => t.id === selectedThemeId) ||
    themesData.items[0] ||
    DEFAULT_THEMES_LIST[0];

  // Load Google Fonts for live preview
  useEffect(() => {
    if (!currentTheme || typeof document === 'undefined') return;
    [currentTheme.headingFont, currentTheme.bodyFont].forEach((family) => {
      if (!family) return;
      const id = `preview-font-${family.replace(/\s+/g, '-')}`;
      if (!document.getElementById(id)) {
        const link = document.createElement('link');
        link.id = id;
        link.rel = 'stylesheet';
        link.href = getFontUrl(family);
        document.head.appendChild(link);
      }
    });
  }, [currentTheme?.headingFont, currentTheme?.bodyFont]);

  async function saveThemesPayload(nextThemes = themesData) {
    setSaving(true);
    setSaved(false);
    setError('');
    try {
      const putThemes = await fetch('/api/admin/content/themes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nextThemes),
      });

      // Also keep settings.activeThemeId in sync
      const settingsRes = await fetch('/api/admin/content/settings');
      const currentSettings = settingsRes.ok ? await settingsRes.json() : DEFAULT_SETTINGS;
      await fetch('/api/admin/content/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...DEFAULT_SETTINGS,
          ...(currentSettings || {}),
          activeThemeId: nextThemes.activeThemeId,
        }),
      });

      if (putThemes.ok) {
        setSaved(true);
        notifyContentUpdated();
        setTimeout(() => setSaved(false), 3500);
      } else {
        const err = await putThemes.json().catch(() => ({}));
        setError(err.error || 'Ошибка при сохранении темы');
      }
    } catch {
      setError('Ошибка сети при сохранении темы');
    }
    setSaving(false);
  }

  function updateThemeField<K extends keyof ThemeConfig>(key: K, value: ThemeConfig[K]) {
    const nextItems = themesData.items.map((item) =>
      item.id === currentTheme.id ? { ...item, [key]: value } : item
    );
    setThemesData({ ...themesData, items: nextItems });
  }

  function handleActivateTheme(themeId: string) {
    const next = { ...themesData, activeThemeId: themeId };
    setThemesData(next);
    saveThemesPayload(next);
  }

  function handleCreateCustomTheme() {
    const newId = `theme-${Date.now()}`;
    const newTheme: ThemeConfig = {
      ...currentTheme,
      id: newId,
      name: `${currentTheme.name} (Копия)`,
      description: 'Пользовательская тема оформления сайта АНО «ЦЗСТ»',
      isBuiltin: false,
    };
    const next = {
      ...themesData,
      items: [...themesData.items, newTheme],
    };
    setThemesData(next);
    setSelectedThemeId(newId);
  }

  function handleResetToFactory() {
    const builtin = DEFAULT_THEMES_LIST.find((t) => t.id === currentTheme.id) || DEFAULT_THEMES_LIST[0];
    if (!confirm(`Сбросить все цвета и шрифты темы «${currentTheme.name}» к исходным значениям?`)) return;
    const nextItems = themesData.items.map((item) =>
      item.id === currentTheme.id
        ? { ...builtin, id: item.id, name: item.isBuiltin ? builtin.name : item.name }
        : item
    );
    const next = { ...themesData, items: nextItems };
    setThemesData(next);
    saveThemesPayload(next);
  }

  function handleDeleteTheme(themeId: string) {
    const target = themesData.items.find((t) => t.id === themeId);
    if (!target || target.id === 'basic-light') {
      alert('Базовую тему Basic light нельзя удалить.');
      return;
    }
    if (!confirm(`Удалить тему «${target.name}»?`)) return;
    const nextItems = themesData.items.filter((t) => t.id !== themeId);
    const nextActive =
      themesData.activeThemeId === themeId ? 'basic-light' : themesData.activeThemeId;
    const next = { activeThemeId: nextActive, items: nextItems };
    setThemesData(next);
    setSelectedThemeId(nextActive);
    saveThemesPayload(next);
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent"></div>
      </div>
    );
  }

  const isCurrentActive = themesData.activeThemeId === currentTheme.id;

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
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
              Темы оформления (Themes)
            </h1>
            <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-700/40 text-emerald-300 text-[10px] font-mono uppercase">
              Лендинг + Портал
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Управление визуальным дизайном сайта без изменения контента: шрифты, палитра фонов, цвета кнопок, текста и геометрия карточек
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleCreateCustomTheme}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#2d3748] bg-[#161c28] px-3.5 py-2.5 text-xs font-bold text-slate-200 hover:bg-[#1e2638] transition-colors"
          >
            <Plus className="h-4 w-4 text-amber-400" />
            <span>Дублировать / Новая тема</span>
          </button>

          <button
            type="button"
            onClick={() => saveThemesPayload(themesData)}
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-600 to-amber-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:from-orange-500 hover:to-amber-400 disabled:opacity-50 transition-all shadow-lg shadow-orange-950/30"
          >
            <Save className="h-4 w-4" />
            <span>{saving ? 'Сохранение...' : 'Сохранить изменения'}</span>
          </button>
        </div>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-800/60 bg-emerald-950/40 p-3.5 text-xs text-emerald-300">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>Параметры темы сохранены и мгновенно применены к сайту!</span>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-800 bg-red-950/40 p-3.5 text-xs text-red-300">
          {error}
        </div>
      )}

      {/* Выбор темы для редактирования и активации */}
      <div className="rounded-xl border border-[#222] bg-[#12161f] p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#222] pb-3">
          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4 text-amber-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Выберите тему для редактирования или активации
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            Активная тема на сайте:{' '}
            <strong className="text-amber-400">
              {themesData.items.find((t) => t.id === themesData.activeThemeId)?.name || 'Basic light'}
            </strong>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {themesData.items.map((theme) => {
            const isSelected = theme.id === currentTheme.id;
            const isActive = theme.id === themesData.activeThemeId;
            return (
              <div
                key={theme.id}
                onClick={() => setSelectedThemeId(theme.id)}
                className={`rounded-xl border p-4 cursor-pointer transition-all flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'border-amber-500 bg-amber-950/15 shadow-md'
                    : 'border-[#262f40] bg-[#0c0f17] hover:border-slate-600'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-bold text-white leading-snug">
                      {theme.name}
                    </h3>
                    {isActive && (
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold uppercase shrink-0">
                        Активна
                      </span>
                    )}
                  </div>

                  {/* Палитра кружков */}
                  <div className="mt-3 flex items-center gap-1.5">
                    <span
                      title={`Фон: ${theme.bgPrimary}`}
                      className="w-5 h-5 rounded-full border border-white/20"
                      style={{ backgroundColor: theme.bgPrimary }}
                    />
                    <span
                      title={`Вторичный фон: ${theme.bgSecondary}`}
                      className="w-5 h-5 rounded-full border border-white/20"
                      style={{ backgroundColor: theme.bgSecondary }}
                    />
                    <span
                      title={`Текст: ${theme.textHeading}`}
                      className="w-5 h-5 rounded-full border border-white/20"
                      style={{ backgroundColor: theme.textHeading }}
                    />
                    <span
                      title={`Кнопки: ${theme.btnPrimaryFrom} → ${theme.btnPrimaryTo}`}
                      className="w-8 h-5 rounded-full border border-white/20"
                      style={{
                        backgroundImage: `linear-gradient(to right, ${theme.btnPrimaryFrom}, ${theme.btnPrimaryTo})`,
                      }}
                    />
                    <span
                      title={`Тёмный блок: ${theme.darkPanelBg}`}
                      className="w-5 h-5 rounded-full border border-white/20"
                      style={{ backgroundColor: theme.darkPanelBg }}
                    />
                  </div>

                  <div className="mt-2 text-[11px] text-slate-400 font-mono truncate">
                    {theme.headingFont} / {theme.bodyFont}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#1e2636] flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold text-amber-400">
                    {isSelected ? '● Редактируется' : 'Выбрать для правки'}
                  </span>

                  {!isActive && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleActivateTheme(theme.id);
                      }}
                      className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider transition-colors"
                    >
                      Включить
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Основная сетка: Редактор параметров слева + Живой предпросмотр справа */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Левая часть (7 колонок): Параметры выбранной темы */}
        <div className="lg:col-span-7 space-y-5">
          {/* Заголовок редактируемой темы и быстрые действия */}
          <div className="rounded-xl border border-[#222] bg-[#12161f] p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#222] pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400">
                  Редактирование параметров темы
                </span>
                <h3 className="text-lg font-extrabold text-white mt-0.5">
                  {currentTheme.name}
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {!isCurrentActive ? (
                  <button
                    type="button"
                    onClick={() => handleActivateTheme(currentTheme.id)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-3.5 py-2 text-xs font-bold text-white transition-colors"
                  >
                    <Check className="h-3.5 w-3.5" />
                    <span>Сделать активной темой сайта</span>
                  </button>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-950/60 border border-emerald-700/50 px-3 py-1.5 text-xs font-bold text-emerald-300">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Тема активна на сайте</span>
                  </span>
                )}

                <button
                  type="button"
                  onClick={handleResetToFactory}
                  className="inline-flex items-center gap-1 rounded-lg border border-[#2d3748] bg-[#161c28] px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-[#1e2638]"
                  title="Сбросить настройки этой темы к исходным"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Сбросить</span>
                </button>

                {currentTheme.id !== 'basic-light' && !currentTheme.isBuiltin && (
                  <button
                    type="button"
                    onClick={() => handleDeleteTheme(currentTheme.id)}
                    className="inline-flex items-center gap-1 rounded-lg border border-red-900/50 bg-red-950/30 px-3 py-2 text-xs text-red-300 hover:bg-red-900/50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="admin-label">Название темы</label>
                <input
                  type="text"
                  value={currentTheme.name}
                  onChange={(e) => updateThemeField('name', e.target.value)}
                  className="admin-input font-bold"
                />
              </div>
              <div>
                <label className="admin-label">Краткое описание</label>
                <input
                  type="text"
                  value={currentTheme.description || ''}
                  onChange={(e) => updateThemeField('description', e.target.value)}
                  className="admin-input"
                />
              </div>
            </div>
          </div>

          {/* 1. ШРИФТЫ И ТИПОГРАФИКА */}
          <div className="rounded-xl border border-[#222] bg-[#12161f] p-5 space-y-4">
            <h3 className="text-sm font-bold text-white border-b border-[#222] pb-2.5 flex items-center gap-2">
              <Type className="h-4 w-4 text-amber-400" />
              <span>1. Шрифты и типографика</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="admin-label">Шрифт заголовков (H1–H4)</label>
                <select
                  value={currentTheme.headingFont}
                  onChange={(e) => updateThemeField('headingFont', e.target.value)}
                  className="admin-input font-semibold"
                >
                  {GOOGLE_FONTS.map((f) => (
                    <option key={f.family} value={f.family}>
                      {f.family} ({f.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="admin-label">Шрифт основного текста</label>
                <select
                  value={currentTheme.bodyFont}
                  onChange={(e) => updateThemeField('bodyFont', e.target.value)}
                  className="admin-input"
                >
                  {GOOGLE_FONTS.map((f) => (
                    <option key={f.family} value={f.family}>
                      {f.family} ({f.category})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-1">
              <div>
                <label className="admin-label">Базовый размер шрифта сайта</label>
                <select
                  value={currentTheme.baseFontSize || '16px'}
                  onChange={(e) =>
                    updateThemeField('baseFontSize', e.target.value as '15px' | '16px' | '17px')
                  }
                  className="admin-input"
                >
                  <option value="15px">Компактный (15px)</option>
                  <option value="16px">Стандартный (16px)</option>
                  <option value="17px">Увеличенный (17px)</option>
                </select>
              </div>

              <label className="flex items-center gap-2.5 cursor-pointer select-none pt-4">
                <input
                  type="checkbox"
                  checked={Boolean(currentTheme.uppercaseHeadings)}
                  onChange={(e) => updateThemeField('uppercaseHeadings', e.target.checked)}
                  className="h-4 w-4 rounded border-slate-600 bg-[#0c0f16] text-amber-500"
                />
                <span className="text-xs font-bold text-slate-200">
                  Заголовки ВЕРХНИМ РЕГИСТРОМ (CAPS)
                </span>
              </label>
            </div>
          </div>

          {/* 2. ЦВЕТА КНОПОК И АКЦЕНТОВ */}
          <div className="rounded-xl border border-[#222] bg-[#12161f] p-5 space-y-4">
            <h3 className="text-sm font-bold text-white border-b border-[#222] pb-2.5 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span>2. Цвета кнопок, иконок и акцентов</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <ColorField
                label="Основная кнопка (Цвет 1)"
                value={currentTheme.btnPrimaryFrom}
                onChange={(v) => updateThemeField('btnPrimaryFrom', v)}
              />
              <ColorField
                label="Основная кнопка (Градиент 2)"
                value={currentTheme.btnPrimaryTo}
                onChange={(v) => updateThemeField('btnPrimaryTo', v)}
              />
              <ColorField
                label="Текст основной кнопки"
                value={currentTheme.btnPrimaryText}
                onChange={(v) => updateThemeField('btnPrimaryText', v)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#1e2636]">
              <ColorField
                label="Вторая кнопка (Фон)"
                value={currentTheme.btnSecondaryBg}
                onChange={(v) => updateThemeField('btnSecondaryBg', v)}
              />
              <ColorField
                label="Вторая кнопка (Текст)"
                value={currentTheme.btnSecondaryText}
                onChange={(v) => updateThemeField('btnSecondaryText', v)}
              />
              <ColorField
                label="Главный акцент (Иконки)"
                value={currentTheme.accentColor}
                onChange={(v) => updateThemeField('accentColor', v)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#1e2636]">
              <ColorField
                label="Фон плашек / бейджей"
                value={currentTheme.badgeBg}
                onChange={(v) => updateThemeField('badgeBg', v)}
              />
              <ColorField
                label="Текст плашек / бейджей"
                value={currentTheme.badgeText}
                onChange={(v) => updateThemeField('badgeText', v)}
              />
            </div>
          </div>

          {/* 3. ЦВЕТА ФОНА И ТЕКСТА */}
          <div className="rounded-xl border border-[#222] bg-[#12161f] p-5 space-y-4">
            <h3 className="text-sm font-bold text-white border-b border-[#222] pb-2.5 flex items-center gap-2">
              <Palette className="h-4 w-4 text-amber-400" />
              <span>3. Цвета фонов, карточек и текста</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <ColorField
                label="Основной фон сайта"
                value={currentTheme.bgPrimary}
                onChange={(v) => updateThemeField('bgPrimary', v)}
              />
              <ColorField
                label="Вторичный фон секций"
                value={currentTheme.bgSecondary}
                onChange={(v) => updateThemeField('bgSecondary', v)}
              />
              <ColorField
                label="Фон шапки (Header)"
                value={currentTheme.headerBg}
                onChange={(v) => updateThemeField('headerBg', v)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#1e2636]">
              <ColorField
                label="Фон карточек"
                value={currentTheme.cardBg}
                onChange={(v) => updateThemeField('cardBg', v)}
              />
              <ColorField
                label="Цвет рамок и линий"
                value={currentTheme.cardBorder}
                onChange={(v) => updateThemeField('cardBorder', v)}
              />
              <ColorField
                label="Фон подвала и тёмных плашек"
                value={currentTheme.darkPanelBg}
                onChange={(v) => updateThemeField('darkPanelBg', v)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#1e2636]">
              <ColorField
                label="Цвет заголовков (H1–H4)"
                value={currentTheme.textHeading}
                onChange={(v) => updateThemeField('textHeading', v)}
              />
              <ColorField
                label="Цвет основного текста"
                value={currentTheme.textBody}
                onChange={(v) => updateThemeField('textBody', v)}
              />
              <ColorField
                label="Второстепенный текст"
                value={currentTheme.textMuted}
                onChange={(v) => updateThemeField('textMuted', v)}
              />
            </div>
          </div>

          {/* 4. ГЕОМЕТРИЯ, СКРУГЛЕНИЯ И ТЕНИ */}
          <div className="rounded-xl border border-[#222] bg-[#12161f] p-5 space-y-4">
            <h3 className="text-sm font-bold text-white border-b border-[#222] pb-2.5 flex items-center gap-2">
              <Sliders className="h-4 w-4 text-amber-400" />
              <span>4. Скругления элементов и тени</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="admin-label">Скругление карточек</label>
                <select
                  value={currentTheme.cardRadius}
                  onChange={(e) =>
                    updateThemeField('cardRadius', e.target.value as ThemeConfig['cardRadius'])
                  }
                  className="admin-input"
                >
                  <option value="0px">Острые углы (0px)</option>
                  <option value="6px">Строгие (6px)</option>
                  <option value="12px">Стандартные (12px)</option>
                  <option value="20px">Мягкие (20px)</option>
                </select>
              </div>

              <div>
                <label className="admin-label">Скругление кнопок</label>
                <select
                  value={currentTheme.buttonRadius}
                  onChange={(e) =>
                    updateThemeField('buttonRadius', e.target.value as ThemeConfig['buttonRadius'])
                  }
                  className="admin-input"
                >
                  <option value="0px">Прямоугольные (0px)</option>
                  <option value="6px">Строгие (6px)</option>
                  <option value="8px">Стандартные (8px)</option>
                  <option value="9999px">Капсула (Pill)</option>
                </select>
              </div>

              <div>
                <label className="admin-label">Тень карточек</label>
                <select
                  value={currentTheme.cardShadow}
                  onChange={(e) =>
                    updateThemeField('cardShadow', e.target.value as ThemeConfig['cardShadow'])
                  }
                  className="admin-input"
                >
                  <option value="none">Без теней (Плоский ГОСТ)</option>
                  <option value="sm">Минимальная (sm)</option>
                  <option value="md">Выраженная (md)</option>
                  <option value="lg">Глубокая (lg)</option>
                </select>
              </div>
            </div>

            {/* 5. ФОНОВЫЕ И ДЕКОРАТИВНЫЕ ИЗОБРАЖЕНИЯ ТЕМЫ (Bolt style и др.) */}
            <div className="pt-3 border-t border-[#1e2636] space-y-3">
              <div className="text-xs font-bold text-slate-300">
                5. Тематические изображения шаблона (для Bolt style и кастомных тем)
              </div>
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="admin-label">Фоновое фото первого экрана (Hero Background URL)</label>
                  <input
                    type="text"
                    value={currentTheme.heroBgImage || ''}
                    onChange={(e) => updateThemeField('heroBgImage', e.target.value)}
                    className="admin-input font-mono text-xs"
                    placeholder="https://images.pexels.com/photos/5961806/..."
                  />
                </div>
                <div>
                  <label className="admin-label">Фото блока «О Центре» (#about Image URL)</label>
                  <input
                    type="text"
                    value={currentTheme.aboutImage || ''}
                    onChange={(e) => updateThemeField('aboutImage', e.target.value)}
                    className="admin-input font-mono text-xs"
                    placeholder="https://images.pexels.com/photos/7207549/..."
                  />
                </div>
                <div>
                  <label className="admin-label">Фото блока «Сотрудничество и партнёрство» (Partner Image URL)</label>
                  <input
                    type="text"
                    value={currentTheme.partnerImage || ''}
                    onChange={(e) => updateThemeField('partnerImage', e.target.value)}
                    className="admin-input font-mono text-xs"
                    placeholder="https://images.pexels.com/photos/4963360/..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Правая часть (5 колонок): Интерактивный предпросмотр темы */}
        <div className="lg:col-span-5 lg:sticky lg:top-6 space-y-4">
          <div className="rounded-xl border border-[#222] bg-[#12161f] p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-[#222] pb-2.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
                <Eye className="h-4 w-4 text-amber-400" />
                <span>Живой предпросмотр: {currentTheme.name}</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                Реальное время
              </span>
            </div>

            {/* Мини-макет сайта с применёнными параметрами темы */}
            <div
              className="rounded-lg overflow-hidden border border-[#2d3748] transition-all"
              style={{
                backgroundColor: currentTheme.bgPrimary,
                color: currentTheme.textBody,
                fontFamily: `"${currentTheme.bodyFont}", sans-serif`,
              }}
            >
              {/* Шапка макета */}
              <div
                className="px-4 py-3 border-b flex items-center justify-between"
                style={{
                  backgroundColor: currentTheme.headerBg,
                  borderColor: currentTheme.cardBorder,
                }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: currentTheme.accentColor }}
                  />
                  <span
                    className="text-xs font-extrabold"
                    style={{
                      color: currentTheme.textHeading,
                      fontFamily: `"${currentTheme.headingFont}", sans-serif`,
                    }}
                  >
                    АНО «ЦЗСТ»
                  </span>
                </div>
                <span
                  className="px-2.5 py-1 text-[10px] font-bold"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${currentTheme.btnPrimaryFrom}, ${currentTheme.btnPrimaryTo})`,
                    color: currentTheme.btnPrimaryText,
                    borderRadius: currentTheme.buttonRadius,
                  }}
                >
                  Обращение / Партнёрство
                </span>
              </div>

              {/* Секция 1: Главный экран / Заголовок */}
              <div className="p-4 space-y-3">
                <span
                  className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: currentTheme.badgeBg,
                    color: currentTheme.badgeText,
                    borderRadius: '4px',
                  }}
                >
                  Отраслевой стандарт
                </span>

                <h4
                  className="text-base font-extrabold leading-snug"
                  style={{
                    color: currentTheme.textHeading,
                    fontFamily: `"${currentTheme.headingFont}", sans-serif`,
                    textTransform: currentTheme.uppercaseHeadings ? 'uppercase' : 'none',
                  }}
                >
                  Развитие спортивных технологий и активного долголетия
                </h4>

                <p className="text-xs leading-relaxed" style={{ color: currentTheme.textBody }}>
                  АНО «ЦЗСТ» осуществляет научно-методическое сопровождение и внедрение современных спортивных технологий.
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    className="px-3.5 py-2 text-xs font-bold shadow-xs"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${currentTheme.btnPrimaryFrom}, ${currentTheme.btnPrimaryTo})`,
                      color: currentTheme.btnPrimaryText,
                      borderRadius: currentTheme.buttonRadius,
                    }}
                  >
                    Основная кнопка
                  </button>
                  <button
                    type="button"
                    className="px-3.5 py-2 text-xs font-semibold border"
                    style={{
                      backgroundColor: currentTheme.btnSecondaryBg,
                      color: currentTheme.btnSecondaryText,
                      borderColor: currentTheme.cardBorder,
                      borderRadius: currentTheme.buttonRadius,
                    }}
                  >
                    Вторая кнопка
                  </button>
                </div>
              </div>

              {/* Секция 2: Вторичный фон и карточка */}
              <div
                className="p-4 border-t"
                style={{
                  backgroundColor: currentTheme.bgSecondary,
                  borderColor: currentTheme.cardBorder,
                }}
              >
                <div
                  className="p-3.5 border space-y-1.5"
                  style={{
                    backgroundColor: currentTheme.cardBg,
                    borderColor: currentTheme.cardBorder,
                    borderRadius: currentTheme.cardRadius,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs font-bold"
                      style={{
                        color: currentTheme.textHeading,
                        fontFamily: `"${currentTheme.headingFont}", sans-serif`,
                        textTransform: currentTheme.uppercaseHeadings ? 'uppercase' : 'none',
                      }}
                    >
                      Спортивные технологии и биомеханика
                    </span>
                    <span
                      className="text-[10px] font-mono font-bold"
                      style={{ color: currentTheme.accentColor }}
                    >
                      01
                    </span>
                  </div>
                  <p className="text-[11px]" style={{ color: currentTheme.textMuted }}>
                    Пример карточки направления с настраиваемым фоном, рамкой и радиусом скругления.
                  </p>
                </div>
              </div>

              {/* Подвал макета */}
              <div
                className="px-4 py-3 text-[11px] flex items-center justify-between text-slate-300"
                style={{ backgroundColor: currentTheme.darkPanelBg }}
              >
                <span className="font-bold text-white">АНО «ЦЗСТ» (ANO «CWST»)</span>
                <span>© 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div>
      <label className="admin-label">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value || '#000000'}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 w-11 cursor-pointer rounded border border-[#2d3748] bg-[#0c0f16] p-0.5 shrink-0"
        />
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="admin-input font-mono text-xs uppercase"
          placeholder="#FFFFFF"
        />
      </div>
    </div>
  );
}
