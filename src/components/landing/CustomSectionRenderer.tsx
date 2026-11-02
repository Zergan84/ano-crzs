import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { resolveMediaUrl } from '@/lib/content';

export interface CustomSectionPrinciple {
  id: string;
  title: string;
  icon?: string;
  customIcon?: string;
}

export interface CustomSectionBlock {
  id: string;
  anchor: string; // например: #features или features
  eyebrow?: string;
  title: string;
  subtitle?: string;
  columnsCount: 1 | 2 | 3;
  layoutMode?: 'split' | 'stacked'; // 'split' = 50%/50% eyebrow/title/subtitle в колонке (как на скриншоте), 'stacked' = 100% ширина над колонками
  headerSide?: 'left' | 'right'; // для split: в какой колонке находится заголовочный блок
  bgType?: 'white' | 'light' | 'dark' | 'slate' | 'navy'; // Цвет заливки блока на всю ширину
  customBg?: string; // Произвольный hex-код цвета заливки
  textAlign: 'left' | 'center' | 'right';
  verticalAlign?: 'top' | 'center' | 'bottom'; // выравнивание по высоте
  col1Text?: string;
  col1Image?: string;
  col1VAlign?: 'top' | 'center' | 'bottom';
  col2Text?: string;
  col2Image?: string;
  col2VAlign?: 'top' | 'center' | 'bottom';
  col3Text?: string;
  col3Image?: string;
  col3VAlign?: 'top' | 'center' | 'bottom';
  principles?: CustomSectionPrinciple[]; // Ключевые принципы с иконками/галочками в split layout
  imageRounded?: 'none' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
  imageVAlign?: 'top' | 'center' | 'bottom';
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
  const isSplitLayout = (section.layoutMode || 'split') === 'split' && cols === 2;
  const isHeaderOnRight = isSplitLayout && section.headerSide === 'right';

  // Global vertical align for the row grid
  const rowVAlign = section.verticalAlign || 'center';
  const rowVAlignClass =
    rowVAlign === 'top'
      ? 'items-start'
      : rowVAlign === 'bottom'
      ? 'items-end'
      : 'items-center';

  // Per-column vertical flex align
  const getColVAlignClass = (valign?: 'top' | 'center' | 'bottom') => {
    const v = valign || rowVAlign;
    return v === 'top'
      ? 'justify-start'
      : v === 'bottom'
      ? 'justify-end'
      : 'justify-center';
  };


  // Image styling helpers
  const getImageRoundedClass = (rounded?: string) => {
    switch (rounded) {
      case 'none': return 'rounded-none';
      case 'md': return 'rounded-md';
      case 'lg': return 'rounded-lg';
      case '2xl': return 'rounded-2xl';
      case '3xl': return 'rounded-3xl';
      case 'full': return 'rounded-full';
      case 'xl':
      default: return 'rounded-xl';
    }
  };

  const getImageVAlignClass = (valign?: string) => {
    switch (valign) {
      case 'top': return 'self-start';
      case 'bottom': return 'self-end';
      case 'center':
      default: return 'self-center';
    }
  };

  // Темы стилизации
  const isTricolor = theme === 'tricolor';
  const isBolt = theme === 'bolt';

  // Background resolution
  const bgType = section.bgType || 'white';
  const isDarkBg = bgType === 'dark' || bgType === 'navy';

  let sectionBgClass = 'bg-white';
  let inlineBgStyle: React.CSSProperties = {};

  if (section.customBg && section.customBg.trim()) {
    inlineBgStyle = { backgroundColor: section.customBg };
  } else {
    switch (bgType) {
      case 'light':
        sectionBgClass = 'bg-[#EFF3F8]'; // как документы и проекты
        break;
      case 'slate':
        sectionBgClass = 'bg-[#F8FAFC]';
        break;
      case 'dark':
        sectionBgClass = 'bg-[#12161f] text-white';
        break;
      case 'navy':
        sectionBgClass = 'bg-[#0F2147] text-white';
        break;
      case 'white':
      default:
        sectionBgClass = 'bg-white';
        break;
    }
  }

  const headingColor = isDarkBg 
    ? 'text-white' 
    : isBolt 
    ? 'text-[#071A33]' 
    : 'text-[#0F2147]';

  const subtitleColor = isDarkBg
    ? 'text-slate-300'
    : 'text-[#606E85]';

  const eyebrowColor = isBolt ? 'text-[#0F7B7A]' : 'text-[#D92D20]';
  const eyebrowLineColor = isBolt ? 'bg-[#0F7B7A]' : 'bg-[#D92D20]';
  const textColor = isDarkBg ? 'text-slate-200' : isBolt ? 'text-slate-600' : 'text-[#1B263B]';
  const cardBg = isDarkBg ? 'bg-[#182030] border-slate-700' : isBolt ? 'bg-white border-slate-200' : 'bg-white border-[#E2E8F0]';
  const ctaBtnColor = isBolt 
    ? 'bg-[#E8B93E] text-[#071A33] hover:bg-[#F0CF6A]' 
    : 'bg-[#D92D20] text-white hover:bg-[#b92419]';

  // Header content block (reusable in standalone or inside 50/50 column)
  const renderHeader = (isCompact = false) => (
    <div className={`${isCompact ? 'mb-6' : 'mb-12 max-w-4xl'} ${alignClasses}`}>
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
        <p className={`mt-4 text-base leading-relaxed md:text-lg ${subtitleColor}`}>
          {section.subtitle}
        </p>
      )}
    </div>
  );

  return (
    <section 
      id={cleanAnchor} 
      className={`w-full py-16 md:py-24 transition-colors ${sectionBgClass}`}
      style={inlineBgStyle}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        {/* Если НЕ split 50/50, то надзаголовок, заголовок и подзаголовок занимают отдельную верхнюю строку на 100% ширины */}
        {!isSplitLayout && renderHeader(false)}

        {/* 1 колонка */}
        {cols === 1 && (
          <div className={`max-w-4xl mx-auto flex flex-col ${getColVAlignClass(section.col1VAlign)} space-y-6`}>
            {section.col1Image && (
              <div className={`overflow-hidden ${getImageRoundedClass(section.imageRounded)} ${getImageVAlignClass(section.imageVAlign)} border border-slate-200 bg-white shadow-sm`}>
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

        {/* 2 колонки (обычный режим или Split 50/50) */}
        {cols === 2 && (
          <div className={`grid gap-10 lg:grid-cols-2 lg:gap-16 ${rowVAlignClass}`}>
            {/* Колонка 1 (Левая) */}
            <div className={`flex flex-col ${getColVAlignClass(section.col1VAlign)} space-y-5 h-full ${isHeaderOnRight ? 'order-2 lg:order-2' : 'order-1 lg:order-1'}`}>
              {/* В split layout заголовочный блок находится прямо внутри соответствующей колонки */}
              {isSplitLayout && !isHeaderOnRight && renderHeader(true)}

              {section.col1Text && (
                <div className={`text-base leading-relaxed ${textColor} whitespace-pre-line ${align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'}`}>
                  {section.col1Text}
                </div>
              )}

              {/* Ключевые принципы с иконками/галочками в колонке с заголовком */}
              {!isHeaderOnRight && Array.isArray(section.principles) && section.principles.length > 0 && (
                <ul className="space-y-4 pt-2">
                  {section.principles.map((pr, pIdx) => {
                    const hasCustomIcon = Boolean(pr.customIcon && pr.customIcon.trim());
                    return (
                      <li key={pr.id || pIdx} className={`flex items-start gap-3 text-sm leading-relaxed md:text-base ${textColor}`}>
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-[#1447E6]/10 text-[#1447E6] overflow-hidden">
                          {hasCustomIcon ? (
                            <img src={resolveMediaUrl(pr.customIcon)} alt="" className="h-3.5 w-3.5 object-contain" />
                          ) : (
                            <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                          )}
                        </div>
                        <span>{pr.title}</span>
                      </li>
                    );
                  })}
                </ul>
              )}

              {section.col1Image && (
                <div className={`overflow-hidden ${getImageRoundedClass(section.imageRounded)} ${getImageVAlignClass(section.imageVAlign)} border border-slate-200 bg-white shadow-sm`}>
                  <img
                    src={resolveMediaUrl(section.col1Image)}
                    alt="Изображение 1"
                    className="w-full h-auto max-h-[440px] object-cover"
                  />
                </div>
              )}
            </div>

            {/* Колонка 2 (Правая) */}
            <div className={`flex flex-col ${getColVAlignClass(section.col2VAlign)} space-y-5 h-full ${isHeaderOnRight ? 'order-1 lg:order-1' : 'order-2 lg:order-2'}`}>
              {/* Если заголовок выбран справа */}
              {isSplitLayout && isHeaderOnRight && renderHeader(true)}

              {section.col2Text && (
                <div className={`text-base leading-relaxed ${textColor} whitespace-pre-line ${align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'}`}>
                  {section.col2Text}
                </div>
              )}

              {isHeaderOnRight && Array.isArray(section.principles) && section.principles.length > 0 && (
                <ul className="space-y-4 pt-2">
                  {section.principles.map((pr, pIdx) => {
                    const hasCustomIcon = Boolean(pr.customIcon && pr.customIcon.trim());
                    return (
                      <li key={pr.id || pIdx} className={`flex items-start gap-3 text-sm leading-relaxed md:text-base ${textColor}`}>
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-[#1447E6]/10 text-[#1447E6] overflow-hidden">
                          {hasCustomIcon ? (
                            <img src={resolveMediaUrl(pr.customIcon)} alt="" className="h-3.5 w-3.5 object-contain" />
                          ) : (
                            <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                          )}
                        </div>
                        <span>{pr.title}</span>
                      </li>
                    );
                  })}
                </ul>
              )}

              {section.col2Image && (
                <div className={`overflow-hidden ${getImageRoundedClass(section.imageRounded)} ${getImageVAlignClass(section.imageVAlign)} border border-slate-200 bg-white shadow-sm`}>
                  <img
                    src={resolveMediaUrl(section.col2Image)}
                    alt="Изображение 2"
                    className="w-full h-auto max-h-[440px] object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* 3 колонки */}
        {cols === 3 && (
          <div className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 ${rowVAlignClass}`}>
            {/* Колонка 1 */}
            <div className={`rounded-xl border p-6 shadow-sm ${cardBg} flex flex-col ${getColVAlignClass(section.col1VAlign)} space-y-4 h-full`}>
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
            <div className={`rounded-xl border p-6 shadow-sm ${cardBg} flex flex-col ${getColVAlignClass(section.col2VAlign)} space-y-4 h-full`}>
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
            <div className={`rounded-xl border p-6 shadow-sm ${cardBg} flex flex-col ${getColVAlignClass(section.col3VAlign)} space-y-4 h-full`}>
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
      </div>
    </section>
  );
}
