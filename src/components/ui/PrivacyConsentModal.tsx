'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';
import { useSiteContent } from '@/lib/content';

const STORAGE_KEY = 'ano_privacy_accepted_v1';

export function PrivacyConsentModal() {
  const { content } = useSiteContent();
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const org = content?.organization || {};
  const footer = content?.footer || {};

  useEffect(() => {
    // Проверяем согласие в localStorage
    try {
      const accepted = localStorage.getItem(STORAGE_KEY);
      if (!accepted) {
        setShowBanner(true);
      }
    } catch {
      setShowBanner(true);
    }

    // Слушаем глобальное событие открытия окна политики (из футера или шапки)
    const handleOpenPrivacy = () => {
      setShowModal(true);
    };

    window.addEventListener('open-privacy-policy', handleOpenPrivacy);
    return () => {
      window.removeEventListener('open-privacy-policy', handleOpenPrivacy);
    };
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {}
    setShowBanner(false);
  };

  const orgFullName =
    org.fullName ||
    'АВТОНОМНАЯ НЕКОММЕРЧЕСКАЯ ОРГАНИЗАЦИЯ «ЦЕНТР РАЗВИТИЯ ЗИМНЕГО СПОРТА, СОВРЕМЕННЫХ СПОРТИВНЫХ ТЕХНОЛОГИЙ И ТУРИЗМА»';
  const orgInn = org.inn || '7704812390';
  const orgOgrn = org.ogrn || '1127799014582';
  const orgAddress =
    footer.address ||
    org.legalAddress ||
    'РФ, Московская обл., Красногорск г.о., п. Архангельское, д. 29';
  const orgEmail = footer.email || org.receptionEmail || 'info@crzs-sport.ru';

  return (
    <>
      {/* 1. Легкий аккуратный баннер внизу экрана (десктоп, планшет, мобильные) */}
      {showBanner && (
        <aside
          role="region"
          aria-label="Согласие на обработку персональных данных и использование файлов cookie"
          className="fixed bottom-3 left-3 right-3 sm:left-6 sm:right-6 md:left-auto md:right-6 md:max-w-xl z-50 rounded-xl bg-[#0F2147]/95 backdrop-blur-md border border-[#1e3a6a] text-white p-4 sm:p-5 shadow-2xl transition-all animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          <div className="flex items-start gap-3.5">
            <div className="mt-0.5 rounded-lg bg-[#1447E6]/20 p-2 text-[#4682FA] shrink-0 border border-[#1447E6]/40">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="flex-1 text-xs text-slate-200 leading-relaxed">
              <p className="font-semibold text-white text-sm mb-1">
                Обработка персональных данных и файлов cookie
              </p>
              <p>
                Мы используем файлы cookie и обрабатываем персональные данные пользователей в соответствии с требованиями Федерального закона{' '}
                <span className="font-semibold text-white">№ 152-ФЗ «О персональных данных»</span>. Продолжая просмотр и использование сайта, вы даете согласие на обработку данных и принимаете условия{' '}
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="font-medium text-amber-400 underline underline-offset-2 hover:text-amber-300 transition-colors"
                >
                  Политики конфиденциальности
                </button>
                .
              </p>
              <div className="mt-3.5 flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleAccept}
                  className="rounded-lg bg-[#D92D20] px-4 py-2 text-xs font-bold text-white hover:bg-[#b92419] shadow-md transition-colors"
                >
                  Принять и продолжить
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="rounded-lg bg-white/10 hover:bg-white/15 px-3.5 py-2 text-xs text-slate-200 hover:text-white transition-colors"
                >
                  Подробнее
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={handleAccept}
              className="text-slate-400 hover:text-white p-1 rounded transition-colors"
              aria-label="Закрыть уведомление"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </aside>
      )}

      {/* 2. Полный официальный текст Политики конфиденциальности (152-ФЗ РФ, стандарт ГАРАНТ) в попап окне */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-3 sm:p-5"
        >
          <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col rounded-2xl border border-slate-700 bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-[#0F2147] px-6 py-4 text-white">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-amber-400" />
                <div>
                  <h2 className="text-base sm:text-lg font-bold leading-tight">
                    Политика обработки персональных данных
                  </h2>
                  <p className="text-[11px] text-slate-300 font-mono">
                    В соответствии с Федеральным законом РФ № 152-ФЗ
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Закрыть"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body: Официальный текст политики Гарант */}
            <div className="flex-1 overflow-y-auto px-6 py-5 text-xs sm:text-sm text-[#1B263B] leading-relaxed space-y-4">
              <section className="space-y-2">
                <h3 className="font-bold text-[#0F2147] text-sm sm:text-base border-b border-slate-200 pb-1">
                  1. Общие положения
                </h3>
                <p>
                  1.1. Настоящая Политика обработки персональных данных (далее — «Политика») определяет порядок сбора, систематизации, накопления, хранения, уточнения (обновления, изменения), использования, обезличивания, блокирования и уничтожения персональных данных, предпринимаемые <strong>{orgFullName}</strong> (далее — «Оператор», ОГРН {orgOgrn}, ИНН {orgInn}, адрес: {orgAddress}).
                </p>
                <p>
                  1.2. Политика разработана в строгом соответствии с Конституцией Российской Федерации, Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных» и иными нормативными правовыми актами РФ в области защиты информации.
                </p>
                <p>
                  1.3. Действие настоящей Политики распространяется на всю информацию, которую Оператор может получить о посетителях и пользователях официального сайта (далее — «Пользователи»).
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold text-[#0F2147] text-sm sm:text-base border-b border-slate-200 pb-1">
                  2. Категории обрабатываемых данных
                </h3>
                <p>2.1. В рамках функционирования сайта Оператор может обрабатывать следующие персональные данные:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Фамилия, имя, отчество субъекта персональных данных;</li>
                  <li>Номер контактного телефона;</li>
                  <li>Адрес электронной почты (E-mail);</li>
                  <li>Наименование представляемой организации или ведомства;</li>
                  <li>Текст электронного обращения, заявки на партнерство или участие в спортивных мероприятиях;</li>
                  <li>Технические обезличенные данные, собираемые при помощи веб-аналитики и файлов cookie (IP-адрес, тип браузера, операционная система, дата и время визита, источник перехода).</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold text-[#0F2147] text-sm sm:text-base border-b border-slate-200 pb-1">
                  3. Цели обработки персональных данных
                </h3>
                <p>3.1. Оператор осуществляет обработку персональных данных исключительно в целях:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Приема и рассмотрения официальных обращений граждан и представителей юридических лиц;</li>
                  <li>Экспертно-методического, организационного и партнерского взаимодействия в области физической культуры и спорта;</li>
                  <li>Направления официальных ответов, уведомлений, сообщений информационного характера;</li>
                  <li>Улучшения работы веб-ресурса, оптимизации пользовательского опыта и обеспечения информационной безопасности сервисов.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold text-[#0F2147] text-sm sm:text-base border-b border-slate-200 pb-1">
                  4. Правовые основания и порядок обработки
                </h3>
                <p>
                  4.1. Правовым основанием обработки является согласие Пользователя на обработку его персональных данных, предоставляемое путем добровольного заполнения форм на сайте, а также продолжения использования сайта.
                </p>
                <p>
                  4.2. Обработка персональных данных осуществляется с использованием средств автоматизации и без использования таковых. Срок обработки данных определяется достижением целей, для которых они были собраны, либо до момента отзыва согласия субъектом.
                </p>
                <p>
                  4.3. Оператор обеспечивает конфиденциальность персональных данных. Передача третьим лицам не производится, за исключением случаев, прямо предусмотренных действующим законодательством Российской Федерации (по запросу уполномоченных государственных органов).
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold text-[#0F2147] text-sm sm:text-base border-b border-slate-200 pb-1">
                  5. Меры по обеспечению безопасности данных
                </h3>
                <p>
                  5.1. Оператор реализует правовые, организационные и технические меры, предусмотренные ст. 18.1 и ст. 19 Федерального закона № 152-ФЗ, направленные на предотвращение несанкционированного доступа, уничтожения, изменения, блокирования или копирования персональных данных.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold text-[#0F2147] text-sm sm:text-base border-b border-slate-200 pb-1">
                  6. Права субъекта персональных данных и контакты
                </h3>
                <p>
                  6.1. Субъект персональных данных имеет право на получение сведений об обработке его данных, их уточнение, блокирование или уничтожение в случае, если данные являются неполными, устаревшими или незаконно полученными.
                </p>
                <p>
                  6.2. Для реализации своих прав либо отзыва согласия на обработку персональных данных Пользователь может направить письменное заявление по адресу местонахождения Оператора или на официальный адрес электронной почты:{' '}
                  <a href={`mailto:${orgEmail}`} className="font-semibold text-[#1447E6] hover:underline">
                    {orgEmail}
                  </a>.
                </p>
              </section>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
              <span className="text-[11px] text-slate-500">
                Дата редакции: 2026 год • Регулируется законодательством РФ
              </span>
              <button
                type="button"
                onClick={() => {
                  handleAccept();
                  setShowModal(false);
                }}
                className="rounded-lg bg-[#0F2147] px-6 py-2 text-xs font-bold text-white hover:bg-[#1B263B] transition-colors"
              >
                Понятно / Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
