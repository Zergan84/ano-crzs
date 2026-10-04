'use client';

import React, { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { ArrowLeft, Save, Check, Type } from 'lucide-react';
import { GOOGLE_FONTS, getFontUrl } from '@/lib/google-fonts';
import { DEFAULT_FONTS } from '@/data/defaultContent';

interface FontSettings {
  siteHeadingFont: string;
  siteBodyFont: string;
  adminFont: string;
  uppercaseHeadings: boolean;
}

const grouped = GOOGLE_FONTS.reduce<Record<string, typeof GOOGLE_FONTS>>((acc, f) => {
  const cat = f.category;
  if (!acc[cat]) acc[cat] = [];
  acc[cat].push(f);
  return acc;
}, {});

const categoryLabels: Record<string, string> = {
  'sans-serif': 'Без засечек (Sans-serif)',
  serif: 'С засечками (Serif)',
  display: 'Акцидентные (Display)',
  handwriting: 'Рукописные (Handwriting)',
};

function loadGoogleFont(family: string) {
  if (typeof document === 'undefined' || !family) return;
  const id = `gf-${family.replace(/\s/g, '')}`;
  if (document.getElementById(id)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = getFontUrl(family);
  link.id = id;
  document.head.appendChild(link);
}

function applyPreview(data: FontSettings) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.style.setProperty('--font-body', `"${data.siteBodyFont}", sans-serif`);
  root.style.setProperty('--font-heading', `"${data.siteHeadingFont}", sans-serif`);
  root.style.setProperty('--font-admin', `"${data.adminFont}", sans-serif`);
  root.style.setProperty('--heading-transform', data.uppercaseHeadings ? 'uppercase' : 'none');
  loadGoogleFont(data.siteHeadingFont);
  loadGoogleFont(data.siteBodyFont);
  loadGoogleFont(data.adminFont);
}

export default function AdminFontsPage() {
  const [data, setData] = useState<FontSettings>(DEFAULT_FONTS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const apiEndpoint = (typeof window !== 'undefined' && window.location.hostname.includes('pages.dev'))
      ? 'https://ano-crzs.101filmstudio.workers.dev/api/admin/content/fonts'
      : '/api/admin/content/fonts';

    fetch(apiEndpoint)
      .then((res) => (res.ok ? res.json() : null))
      .then((initial) => {
        if (initial && initial.siteHeadingFont) {
          setData(initial as FontSettings);
          applyPreview(initial as FontSettings);
        }
      })
      .catch(() => {});
  }, []);

  function update<K extends keyof FontSettings>(key: K, value: FontSettings[K]) {
    setData((d) => {
      const next = { ...d, [key]: value };
      applyPreview(next);
      return next;
    });
  }

  async function handleSave() {
    setSaving(true);
    setError('');
    setSaved(false);
    try {
      const apiEndpoint = (typeof window !== 'undefined' && window.location.hostname.includes('pages.dev'))
        ? 'https://ano-crzs.101filmstudio.workers.dev/api/admin/content/fonts'
        : '/api/admin/content/fonts';

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
        setError(err.error || 'Ошибка при сохранении');
      }
    } catch {
      setError('Ошибка подключения');
    }
    setSaving(false);
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
            <Type className="w-7 h-7 text-red-500" />
            <span>Управление шрифтами (Google Fonts)</span>
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Каталог из 30+ шрифтов с поддержкой кириллицы. Изменения применяются мгновенно.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-lg bg-red-600 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-red-500 transition-all shadow-lg shadow-red-950/20 disabled:opacity-50 self-start sm:self-auto"
        >
          <Save className={`h-4 w-4 ${saving ? 'animate-spin' : ''}`} />
          <span>{saving ? 'Сохранение...' : 'Сохранить изменения'}</span>
        </button>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-lg bg-emerald-950/40 border border-emerald-800 p-3 text-xs text-emerald-300">
          <Check className="h-4 w-4 text-emerald-400" />
          <span>Шрифты успешно сохранены в R2 и применены на сайте!</span>
        </div>
      )}

      {error && (
        <div className="rounded-lg bg-red-950/40 border border-red-800 p-3 text-xs text-red-300">
          {error}
        </div>
      )}

      {/* Live Preview Block */}
      <PreviewBlock
        headingFont={data.siteHeadingFont}
        bodyFont={data.siteBodyFont}
        adminFont={data.adminFont}
        uppercase={data.uppercaseHeadings}
      />

      {/* Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FontDropdown
          label="Шрифт заголовков на сайте (siteHeadingFont)"
          value={data.siteHeadingFont}
          onChange={(v) => update('siteHeadingFont', v)}
        />

        <FontDropdown
          label="Шрифт основного текста на сайте (siteBodyFont)"
          value={data.siteBodyFont}
          onChange={(v) => update('siteBodyFont', v)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FontDropdown
          label="Шрифт панели управления (adminFont)"
          value={data.adminFont}
          onChange={(v) => update('adminFont', v)}
        />

        <div className="flex flex-col justify-between border border-[#2a2a2a] bg-[#12161f] p-4 rounded-xl">
          <label className="text-slate-400 text-xs font-bold uppercase tracking-wider">
            Регистр для заголовков (UPPERCASE)
          </label>
          <p className="text-[11px] text-slate-500 my-2">
            Включает принудительное отображение всех заголовков H1–H6 прописными буквами
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => update('uppercaseHeadings', true)}
              className={`px-4 py-2 rounded text-xs font-bold tracking-wider transition-colors ${
                data.uppercaseHeadings
                  ? 'bg-red-600 text-white'
                  : 'bg-[#1c1c1c] text-slate-400 border border-[#3a3a3a] hover:text-white'
              }`}
            >
              ПРОПИСНЫЕ (UPPERCASE)
            </button>
            <button
              type="button"
              onClick={() => update('uppercaseHeadings', false)}
              className={`px-4 py-2 rounded text-xs font-bold tracking-wider transition-colors ${
                !data.uppercaseHeadings
                  ? 'bg-red-600 text-white'
                  : 'bg-[#1c1c1c] text-slate-400 border border-[#3a3a3a] hover:text-white'
              }`}
            >
              Обычный (Normal)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FontDropdown({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2 border border-[#2a2a2a] bg-[#12161f] p-4 rounded-xl">
      <label className="text-slate-300 text-xs font-bold">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#1c1c1c] border border-[#3a3a3a] text-white px-3 py-2 text-sm rounded focus:border-red-500 focus:outline-none"
      >
        {Object.entries(grouped).map(([category, fonts]) => (
          <optgroup key={category} label={categoryLabels[category] || category}>
            {fonts.map((f) => (
              <option key={f.family} value={f.family}>
                {f.family}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      <FontPreview family={value} />
    </div>
  );
}

function FontPreview({ family }: { family: string }) {
  useEffect(() => {
    loadGoogleFont(family);
  }, [family]);

  return (
    <div
      className="text-slate-400 text-xs mt-1 truncate bg-[#0b0e14] p-2 rounded border border-[#222]"
      style={{ fontFamily: `"${family}", sans-serif` }}
    >
      АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ 0123456789
    </div>
  );
}

function PreviewBlock({
  headingFont,
  bodyFont,
  adminFont,
  uppercase,
}: {
  headingFont: string;
  bodyFont: string;
  adminFont: string;
  uppercase: boolean;
}) {
  return (
    <div className="border border-[#2a2a2a] p-6 bg-[#0e121a] rounded-xl space-y-4">
      <div className="text-slate-400 text-xs font-bold tracking-wider uppercase border-b border-[#222] pb-2">
        Интерактивный предпросмотр начертаний
      </div>

      <div>
        <div className="text-slate-500 text-[10px] uppercase font-mono mb-1">
          Заголовок ({headingFont})
        </div>
        <div
          className="text-white text-2xl sm:text-3xl font-bold tracking-wide"
          style={{
            fontFamily: `"${headingFont}", sans-serif`,
            textTransform: uppercase ? 'uppercase' : 'none',
          }}
        >
          Развитие стандартов зимнего спорта в России
        </div>
      </div>

      <div>
        <div className="text-slate-500 text-[10px] uppercase font-mono mb-1">
          Основной текст ({bodyFont})
        </div>
        <p
          className="text-slate-300 text-xs sm:text-sm leading-relaxed"
          style={{ fontFamily: `"${bodyFont}", sans-serif` }}
        >
          АНО «ЦРЗС» осуществляет профессиональную аттестацию специалистов, разработку отраслевых стандартов безопасности горнолыжных комплексов, научно-методическое сопровождение и внедрение передовых спортивных технологий.
        </p>
      </div>

      <div>
        <div className="text-slate-500 text-[10px] uppercase font-mono mb-1">
          Интерфейс панели ({adminFont})
        </div>
        <div
          className="text-slate-400 text-xs font-medium"
          style={{ fontFamily: `"${adminFont}", sans-serif` }}
        >
          ПАНЕЛЬ УПРАВЛЕНИЯ • ЕДИНЫЙ РЕЕСТР КАДРОВ • МОДУЛИ САЙТА
        </div>
      </div>
    </div>
  );
}
