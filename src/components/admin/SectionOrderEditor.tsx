'use client';

import React, { useState, useRef } from 'react';
import { 
  Sliders, 
  Search, 
  BarChart3, 
  AlertCircle, 
  Compass, 
  Users, 
  Newspaper, 
  FileText, 
  Handshake, 
  FileCode,
  ArrowUp,
  ArrowDown,
  GripVertical,
  Lock,
  Save,
  Check
} from 'lucide-react';

export interface SectionMetaItem {
  label: string;
  desc: string;
  icon: React.ElementType;
}

const SECTION_META: Record<string, SectionMetaItem> = {
  hero: { label: 'Главный экран (Hero Слайдер)', desc: 'Слайды с текстами, изображениями и кнопками', icon: Sliders },
  search: { label: 'Строка проверки реестра', desc: 'Форма быстрого поиска специалиста по номеру и фамилии', icon: Search },
  stats: { label: 'Ключевые показатели (Статистика)', desc: 'Блок цифровых показателей организации (1480+, 42+, и др.)', icon: BarChart3 },
  notice: { label: 'Официальное извещение', desc: 'Информационная плашка важных объявлений и предсезонного аудита', icon: AlertCircle },
  directions: { label: 'Направления деятельности', desc: '6 ключевых направлений уставной работы АНО «ЦРЗС»', icon: Compass },
  specialists: { label: 'Единый реестр специалистов', desc: 'Интерактивная таблица аттестованных кадров', icon: Users },
  'news-events': { label: 'Новости и календарь мероприятий', desc: 'Сетка пресс-релизов и предстоящих семинаров', icon: Newspaper },
  documents: { label: 'Официальные стандарты и документы', desc: 'Архив нормативных документов и регламентов безопасности', icon: FileText },
  partners: { label: 'Партнеры и спонсоры', desc: 'Карусель официальных партнеров и федераций', icon: Handshake },
  pages: { label: 'Пользовательские страницы и модули', desc: 'Дополнительные блоки, созданные в разделе «Страницы»', icon: FileCode },
};

function getMeta(id: string): SectionMetaItem {
  return SECTION_META[id] || { 
    label: `Раздел (${id})`, 
    desc: 'Пользовательский модуль', 
    icon: FileCode 
  };
}

interface SectionOrderEditorProps {
  order: string[];
  onOrderChange: (newOrder: string[]) => void;
  onSave: () => Promise<void>;
  saving?: boolean;
  saved?: boolean;
}

export default function SectionOrderEditor({
  order,
  onOrderChange,
  onSave,
  saving,
  saved,
}: SectionOrderEditorProps) {
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);
  const dragItem = useRef<string | null>(null);

  // Top hero is locked
  const lockedTop = order[0] || 'hero';
  // All reorderable items
  const items = order.slice(1);

  function handleDragStart(e: React.DragEvent, id: string, idx: number) {
    dragItem.current = id;
    setDragIdx(idx);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', id);
  }

  function handleDragOver(e: React.DragEvent, idx: number) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setOverIdx(idx);
  }

  function handleDrop(e: React.DragEvent, dropIdx: number) {
    e.preventDefault();
    const draggedId = dragItem.current;
    if (!draggedId) return;

    const fromIdx = items.indexOf(draggedId);
    if (fromIdx === -1 || fromIdx === dropIdx) {
      setDragIdx(null);
      setOverIdx(null);
      return;
    }

    const next = [...items];
    next.splice(fromIdx, 1);
    next.splice(dropIdx, 0, draggedId);

    onOrderChange([lockedTop, ...next]);
    setDragIdx(null);
    setOverIdx(null);
  }

  function handleDragEnd() {
    setDragIdx(null);
    setOverIdx(null);
    dragItem.current = null;
  }

  function moveUp(idx: number) {
    if (idx <= 0) return;
    const next = [...items];
    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
    onOrderChange([lockedTop, ...next]);
  }

  function moveDown(idx: number) {
    if (idx >= items.length - 1) return;
    const next = [...items];
    [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
    onOrderChange([lockedTop, ...next]);
  }

  const topMeta = getMeta(lockedTop);
  const TopIcon = topMeta.icon;

  return (
    <div className="space-y-4">
      {/* Locked Top Header (Hero Slider) */}
      <div className="flex items-center gap-3 bg-[#111622] border border-[#222e44] px-4 py-3.5 rounded-xl opacity-80">
        <div className="flex items-center gap-1.5 text-slate-500 font-mono text-xs w-6 shrink-0">
          <Lock className="w-4 h-4 text-slate-500" />
        </div>
        <div className="w-8 h-8 rounded bg-blue-950/60 border border-blue-800 text-blue-400 flex items-center justify-center shrink-0">
          <TopIcon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-white text-sm font-bold truncate">{topMeta.label}</div>
          <div className="text-slate-500 text-xs truncate">{topMeta.desc}</div>
        </div>
        <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-blue-950 border border-blue-800 text-blue-300 shrink-0">
          Фиксированный верх
        </span>
      </div>

      {/* Draggable items */}
      <div className="space-y-2">
        {items.map((id, i) => {
          const meta = getMeta(id);
          const Icon = meta.icon;
          const isDragging = dragIdx === i;
          const isOver = overIdx === i && dragIdx !== i;

          return (
            <div
              key={id}
              draggable
              onDragStart={(e) => handleDragStart(e, id, i)}
              onDragOver={(e) => handleDragOver(e, i)}
              onDrop={(e) => handleDrop(e, i)}
              onDragEnd={handleDragEnd}
              className={`flex items-center gap-3 bg-[#12161f] border px-4 py-3 rounded-xl cursor-grab active:cursor-grabbing transition-all select-none ${
                isDragging
                  ? 'border-red-500 opacity-40 scale-[0.98]'
                  : isOver
                  ? 'border-red-500 bg-red-950/20 shadow-lg'
                  : 'border-[#222] hover:border-slate-600 hover:bg-[#161c28]'
              }`}
            >
              {/* Drag handle */}
              <div className="text-slate-500 hover:text-white shrink-0 p-1">
                <GripVertical className="w-4 h-4" />
              </div>

              {/* Order number */}
              <span className="text-xs font-mono text-slate-500 w-5 shrink-0">
                0{i + 2}
              </span>

              {/* Icon */}
              <div className="w-8 h-8 rounded bg-[#1a202c] border border-[#2d3748] text-slate-300 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4" />
              </div>

              {/* Title & description */}
              <div className="flex-1 min-w-0">
                <div className="text-white text-xs sm:text-sm font-bold truncate">
                  {meta.label}
                </div>
                <div className="text-slate-500 text-[11px] truncate">
                  {meta.desc}
                </div>
              </div>

              {/* Up / Down button controls */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => moveUp(i)}
                  disabled={i === 0}
                  className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-[#222] disabled:opacity-20 disabled:hover:bg-transparent transition-colors"
                  title="Поднять выше"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => moveDown(i)}
                  disabled={i === items.length - 1}
                  className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-[#222] disabled:opacity-20 disabled:hover:bg-transparent transition-colors"
                  title="Опустить ниже"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-between pt-4 border-t border-[#222]">
        <div className="text-xs text-slate-500">
          Порядок на главной странице обновится сразу после сохранения
        </div>
        <button
          onClick={onSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-lg bg-red-600 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-red-500 transition-all shadow-lg shadow-red-950/20 disabled:opacity-50"
        >
          {saved ? <Check className="h-4 w-4 text-white" /> : <Save className={`h-4 w-4 ${saving ? 'animate-spin' : ''}`} />}
          <span>{saving ? 'Сохранение...' : saved ? 'Порядок сохранён ✓' : 'Сохранить порядок'}</span>
        </button>
      </div>
    </div>
  );
}
