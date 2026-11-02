import React from 'react';
import { ArrowRight } from 'lucide-react';
import { resolveMediaUrl } from '@/lib/content';

export interface CustomSectionBlock {
  id: string;
  anchor: string; // например: #features или features
  eyebrow?: string;
  title: string;
  subtitle?: string;
  columnsCount: 1 | 2 | 3;
  textAlign: 'left' | 'center' | 'right';
  col1Text?: string;
  col1Image?: string;
  col2Text?: string;
  col2Image?: string;
  col3Text?: string;
  col3Image?: string;
  ctaText?: string;
  ctaHref?: string;
}

interface CustomSectionRendererProps {
  section: CustomSectionBlock;
  theme?: 'tricolor' | 'bolt' | 'light';
}

export function CustomSectionRenderer({ section, theme = 'tricolor' }: CustomSectionRendererProps) {
  const cleanAnchor = (section.anchor || section.id || '').replace(/^#/, '');
  const align = section.textAlign || (section.columnsCount === 3 ? 'center' : 'left');

  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  }[align];

  const cols = Number(section.columnsCount) || 1;

  // Темы стилизации
  const isTricolor = theme === 'tricolor';
  const isBolt = theme === 'bolt';

  const headingColor = isBolt ? 'text-[#071A33]' : 'text-[#0F2147]';
  const eyebrowColor = isBolt ? 'text-[#0F7B7A]' : 'text-[#D92D20]';
  const eyebrowLineColor = isBolt ? 'bg-[#0F7B7A]' : 'bg-[#D92D20]';
  const textColor = isBolt ? 'text-slate-600' : 'text-[#1B263B]';
  const cardBg = isBolt ? 'bg-white border-slate-200' : 'bg-white border-[#E2E8F0]';
  const ctaBtnColor = isBolt 
    ? 'bg-[#E8B93E] text-[#071A33] hover:bg-[#F0CF6A]' 
    : 'bg-[#D92D20] text-white hover:bg-[#b92419]';

  return (
    <section id={cleanAnchor} className="mx-auto max-w-7xl px-5 py-16 md:px-6 md:py-24">
      {/* Header блока */}
      <div className={`mb-12 max-w-3xl ${alignClasses}`}>
        {section.eyebrow && (
          <div className={`mb-3 flex items-center gap-3 text-xs font-semibold uppercase ${eyebrowColor} ${align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : 'justify-start'}`}>
            <span className={`h-0.5 w-8 ${eyebrowLineColor}`} aria-hidden="true" />
            <span>{section.eyebrow}</span>
            {align === 'center' && (
              <span className={`h-0.5 w-8 ${eyebrowLineColor}`} aria-hidden="true" />
            )}
          </div>
        )}
        <h2 className={`text-3xl font-bold leading-tight md:text-4xl ${headingColor}`}>
          {section.title}
        </h2>
        {section.subtitle && (
          <p className="mt-4 text-base leading-relaxed md:text-lg text-[#606E85]">
            {section.subtitle}
          </p>
        )}
      </div>

      {/* Колонки */}
      {cols === 1 && (
        <div className="max-w-4xl mx-auto space-y-6">
          {section.col1Image && (
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <img
                src={resolveMediaUrl(section.col1Image)}
                alt={section.title}
                className="w-full h-auto max-h-[500px] object-cover"
              />
            </div>
          )}
          {section.col1Text && (
            <div className={`text-base leading-relaxed ${textColor} whitespace-pre-line ${align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'}`}>
              {section.col1Text}
            </div>
          )}
        </div>
      )}

      {cols === 2 && (
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Колонка 1 */}
          <div className="space-y-4">
            {section.col1Image && (
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <img
                  src={resolveMediaUrl(section.col1Image)}
                  alt="Изображение 1"
                  className="w-full h-auto max-h-[420px] object-cover"
                />
              </div>
            )}
            {section.col1Text && (
              <div className={`text-base leading-relaxed ${textColor} whitespace-pre-line ${align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'}`}>
                {section.col1Text}
              </div>
            )}
          </div>

          {/* Колонка 2 */}
          <div className="space-y-4">
            {section.col2Image && (
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <img
                  src={resolveMediaUrl(section.col2Image)}
                  alt="Изображение 2"
                  className="w-full h-auto max-h-[420px] object-cover"
                />
              </div>
            )}
            {section.col2Text && (
              <div className={`text-base leading-relaxed ${textColor} whitespace-pre-line ${align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'}`}>
                {section.col2Text}
              </div>
            )}
          </div>
        </div>
      )}

      {cols === 3 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Колонка 1 */}
          <div className={`rounded-xl border p-6 shadow-sm ${cardBg} space-y-4 flex flex-col justify-between`}>
            {section.col1Image && (
              <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50 mb-2">
                <img
                  src={resolveMediaUrl(section.col1Image)}
                  alt="Колонка 1"
                  className="w-full h-48 object-cover"
                />
              </div>
            )}
            {section.col1Text && (
              <div className={`text-sm leading-relaxed ${textColor} whitespace-pre-line ${align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'}`}>
                {section.col1Text}
              </div>
            )}
          </div>

          {/* Колонка 2 */}
          <div className={`rounded-xl border p-6 shadow-sm ${cardBg} space-y-4 flex flex-col justify-between`}>
            {section.col2Image && (
              <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50 mb-2">
                <img
                  src={resolveMediaUrl(section.col2Image)}
                  alt="Колонка 2"
                  className="w-full h-48 object-cover"
                />
              </div>
            )}
            {section.col2Text && (
              <div className={`text-sm leading-relaxed ${textColor} whitespace-pre-line ${align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'}`}>
                {section.col2Text}
              </div>
            )}
          </div>

          {/* Колонка 3 */}
          <div className={`rounded-xl border p-6 shadow-sm ${cardBg} space-y-4 flex flex-col justify-between`}>
            {section.col3Image && (
              <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50 mb-2">
                <img
                  src={resolveMediaUrl(section.col3Image)}
                  alt="Колонка 3"
                  className="w-full h-48 object-cover"
                />
              </div>
            )}
            {section.col3Text && (
              <div className={`text-sm leading-relaxed ${textColor} whitespace-pre-line ${align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'}`}>
                {section.col3Text}
              </div>
            )}
          </div>
        </div>
      )}

      {/* CTA кнопка при наличии */}
      {section.ctaText && (
        <div className={`mt-10 flex ${align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : 'justify-start'}`}>
          <a
            href={section.ctaHref || `#${cleanAnchor}`}
            className={`inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold shadow-sm transition-all ${ctaBtnColor}`}
          >
            <span>{section.ctaText}</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      )}
    </section>
  );
}
