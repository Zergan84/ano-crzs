'use client';

import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import {
  ArrowLeft,
  ShieldCheck,
  Save,
  Check,
  Palette,
  Eye,
  Sliders,
  Sparkles,
} from 'lucide-react';
import { useSiteContent, updateSection } from '@/lib/content';

export default function AdminPrivacyPolicyPage() {
  const { content, refresh } = useSiteContent();

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Settings for privacy consent banner & modal
  const [bannerBg, setBannerBg] = useState('#0F2147');
  const [bannerTextColor, setBannerTextColor] = useState('#FFFFFF');
  const [btnBg, setBtnBg] = useState('#D92D20');
  const [btnTextColor, setBtnTextColor] = useState('#FFFFFF');
  const [fullWidth, setFullWidth] = useState(true);
  const [autoHideSeconds, setAutoHideSeconds] = useState(0); // 0 = don't auto hide
  const [animationEffect, setAnimationEffect] = useState<'slide-up' | 'fade-in' | 'scale'>('slide-up');
  const [bannerTitle, setBannerTitle] = useState('Обработка персональных данных и файлов cookie');
  const [bannerText, setBannerText] = useState(
    'Мы используем файлы cookie и обрабатываем персональные данные пользователей в соответствии с требованиями Федерального закона № 152-ФЗ «О персональных данных». Продолжая просмотр и использование сайта, вы даете согласие на обработку данных и принимаете условия Политики конфиденциальности.'
  );

  // Policy modal text
  const [policyCustomText, setPolicyCustomText] = useState('');

  useEffect(() => {
    if (content?.organization) {
      const p = (content.organization as any)?.privacyConfig;
      if (p) {
        if (p.bannerBg) setBannerBg(p.bannerBg);
        if (p.bannerTextColor) setBannerTextColor(p.bannerTextColor);
        if (p.btnBg) setBtnBg(p.btnBg);
        if (p.btnTextColor) setBtnTextColor(p.btnTextColor);
        if (typeof p.fullWidth === 'boolean') setFullWidth(p.fullWidth);
        if (typeof p.autoHideSeconds === 'number') setAutoHideSeconds(p.autoHideSeconds);
        if (p.animationEffect) setAnimationEffect(p.animationEffect);
        if (p.bannerTitle) setBannerTitle(p.bannerTitle);
        if (p.bannerText) setBannerText(p.bannerText);
        if (p.policyCustomText) setPolicyCustomText(p.policyCustomText);
      }
    }
  }, [content]);

  const handleSave = async () => {
    setSaving(true);
    setSavedSuccess(false);
    try {
      const currentOrg = content?.organization || {};
      const updatedOrg = {
        ...currentOrg,
        privacyConfig: {
          bannerBg,
          bannerTextColor,
          btnBg,
          btnTextColor,
          fullWidth,
          autoHideSeconds,
          animationEffect,
          bannerTitle,
          bannerText,
          policyCustomText,
        },
      };

      await updateSection('organization', updatedOrg);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
      refresh();
    } catch (err) {
      console.error(err);
      alert('Ошибка при сохранении настроек политики');
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
              Политика конфиденциальности (152-ФЗ РФ)
            </h1>
            <span className="rounded bg-amber-500/20 px-2 py-0.5 font-mono text-xs font-bold uppercase text-amber-400">
              Модуль
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Настройка всплывающей плашки согласия на обработку персональных данных (размер, цвета, плавное всплывание) и текста политики.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-lg bg-amber-500 hover:bg-amber-400 px-5 py-2 text-xs font-bold text-black disabled:opacity-50 transition-all shadow-lg shadow-amber-500/20 self-start sm:self-auto"
        >
          {savedSuccess ? (
            <>
              <Check className="h-4 w-4" />
              <span>Сохранено!</span>
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              <span>{saving ? 'Сохранение...' : 'Сохранить настройки'}</span>
            </>
          )}
        </button>
      </div>

      {/* Live Preview */}
      <div className="rounded-xl border border-[#222] bg-[#12161f] p-5 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-[#222] pb-3">
          <Eye className="h-4 w-4 text-amber-400" />
          <span>Предпросмотр плашки согласия</span>
        </h3>

        <div className="rounded-lg bg-slate-900 p-4 border border-slate-800">
          <div
            style={{ backgroundColor: bannerBg, color: bannerTextColor }}
            className={`rounded-xl p-4 sm:p-5 shadow-2xl transition-all border border-white/10 ${
              fullWidth ? 'w-full text-center' : 'max-w-xl mx-auto'
            }`}
          >
            <div className={`flex flex-col gap-3 ${fullWidth ? 'items-center' : 'items-start'}`}>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-amber-400" />
                <h4 className="font-bold text-sm" style={{ color: bannerTextColor }}>
                  {bannerTitle}
                </h4>
              </div>
              <p className="text-xs leading-relaxed opacity-90 max-w-3xl">
                {bannerText}{' '}
                <span className="underline cursor-pointer text-amber-400">Политики конфиденциальности</span>.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                <button
                  type="button"
                  style={{ backgroundColor: btnBg, color: btnTextColor }}
                  className="rounded-lg px-5 py-2 text-xs font-bold shadow-md transition-opacity hover:opacity-90"
                >
                  Принять и продолжить
                </button>
                <button
                  type="button"
                  className="rounded-lg bg-white/10 px-4 py-2 text-xs font-medium hover:bg-white/20 transition-colors"
                >
                  Подробнее
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual styling and layout */}
      <div className="rounded-xl border border-[#222] bg-[#12161f] p-5 space-y-4">
        <h3 className="text-base font-bold text-white border-b border-[#222] pb-3">
          Внешний вид и анимация всплывающей плашки
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="admin-label">Ширина отображения плашки</label>
            <select
              value={fullWidth ? 'full' : 'compact'}
              onChange={(e) => setFullWidth(e.target.value === 'full')}
              className="admin-input"
            >
              <option value="full">100% полезной ширины (по умолчанию, по центру)</option>
              <option value="compact">Компактная плашка справа внизу</option>
            </select>
          </div>

          <div>
            <label className="admin-label">Эффект плавного всплывания</label>
            <select
              value={animationEffect}
              onChange={(e) => setAnimationEffect(e.target.value as any)}
              className="admin-input"
            >
              <option value="slide-up">Плавное всплывание снизу вверх (Slide-up)</option>
              <option value="fade-in">Мягкое проявление (Fade-in)</option>
              <option value="scale">Масштабирование (Zoom-in)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label className="admin-label">Цвет фона плашки</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={bannerBg}
                onChange={(e) => setBannerBg(e.target.value)}
                className="h-9 w-12 rounded border border-slate-700 bg-transparent cursor-pointer"
              />
              <input
                type="text"
                value={bannerBg}
                onChange={(e) => setBannerBg(e.target.value)}
                className="admin-input font-mono text-xs flex-1"
              />
            </div>
          </div>

          <div>
            <label className="admin-label">Цвет текста плашки</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={bannerTextColor}
                onChange={(e) => setBannerTextColor(e.target.value)}
                className="h-9 w-12 rounded border border-slate-700 bg-transparent cursor-pointer"
              />
              <input
                type="text"
                value={bannerTextColor}
                onChange={(e) => setBannerTextColor(e.target.value)}
                className="admin-input font-mono text-xs flex-1"
              />
            </div>
          </div>

          <div>
            <label className="admin-label">Цвет кнопки действия</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={btnBg}
                onChange={(e) => setBtnBg(e.target.value)}
                className="h-9 w-12 rounded border border-slate-700 bg-transparent cursor-pointer"
              />
              <input
                type="text"
                value={btnBg}
                onChange={(e) => setBtnBg(e.target.value)}
                className="admin-input font-mono text-xs flex-1"
              />
            </div>
          </div>

          <div>
            <label className="admin-label">Цвет текста кнопки</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={btnTextColor}
                onChange={(e) => setBtnTextColor(e.target.value)}
                className="h-9 w-12 rounded border border-slate-700 bg-transparent cursor-pointer"
              />
              <input
                type="text"
                value={btnTextColor}
                onChange={(e) => setBtnTextColor(e.target.value)}
                className="admin-input font-mono text-xs flex-1"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="admin-label">Авто-скрытие плашки (в секундах, 0 = не скрывать)</label>
          <input
            type="number"
            min={0}
            max={60}
            value={autoHideSeconds}
            onChange={(e) => setAutoHideSeconds(Number(e.target.value))}
            className="admin-input sm:w-48 font-mono"
          />
        </div>
      </div>

      {/* Texts configuration */}
      <div className="rounded-xl border border-[#222] bg-[#12161f] p-5 space-y-4">
        <h3 className="text-base font-bold text-white border-b border-[#222] pb-3">
          Тексты уведомления и политики
        </h3>

        <div>
          <label className="admin-label">Заголовок плашки</label>
          <input
            type="text"
            value={bannerTitle}
            onChange={(e) => setBannerTitle(e.target.value)}
            className="admin-input font-bold"
          />
        </div>

        <div>
          <label className="admin-label">Текст краткого уведомления</label>
          <textarea
            rows={3}
            value={bannerText}
            onChange={(e) => setBannerText(e.target.value)}
            className="admin-textarea"
          />
        </div>

        <div>
          <label className="admin-label">
            Дополнительный индивидуальный текст политики (необязательно, дополняет стандарт 152-ФЗ РФ)
          </label>
          <textarea
            rows={6}
            value={policyCustomText}
            onChange={(e) => setPolicyCustomText(e.target.value)}
            placeholder="Оставьте пустым для использования полного юридического текста стандарта ГАРАНТ (ст. 18.1 и 19 152-ФЗ РФ с реквизитами АНО «ЦЗСТ»)..."
            className="admin-textarea font-mono text-xs"
          />
        </div>
      </div>
    </div>
  );
}
