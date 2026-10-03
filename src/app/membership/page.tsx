'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { 
  FileCheck, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Upload, 
  AlertCircle,
  Users,
  Building2,
  GraduationCap
} from 'lucide-react';

function MembershipContent() {
  const searchParams = useSearchParams();
  const initialProgram = searchParams.get('course') || searchParams.get('event') || '';

  const [applicantType, setApplicantType] = useState<'individual' | 'organization'>('individual');
  const [formData, setFormData] = useState({
    fullName: '',
    birthDate: '',
    organizationName: '',
    inn: '',
    region: 'г. Москва',
    phone: '',
    email: '',
    program: initialProgram || 'Аттестация в Единый реестр специалистов',
    qualificationLevel: 'Категория С (начальный уровень)',
    sportsRank: 'Без разряда',
    notes: '',
    agreeData: false,
    agreeCharter: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');

  const regions = [
    'г. Москва',
    'г. Санкт-Петербург',
    'Московская область',
    'Краснодарский край (г. Сочи)',
    'Кемеровская область (Шерегеш)',
    'Мурманская область (Кировск)',
    'Красноярский край',
    'Сахалинская область',
    'Камчатский край',
    'Республика Алтай',
    'Кабардино-Балкарская Республика',
    'Челябинская область',
    'Свердловская область',
    'Республика Татарстан',
    'Другой субъект РФ',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeData || !formData.agreeCharter) {
      alert('Пожалуйста, подтвердите согласие с обработкой данных и Уставом АНО «ЦРЗС»');
      return;
    }
    const generatedTicket = `ЗВ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketNumber(generatedTicket);
    setSubmitted(true);
  };

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Членство и электронная подача документов' }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Header */}
        <div className="border-b border-slate-200 pb-5">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-800">
            Взаимодействие и партнерство
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Порядок вступления и подача заявлений в АНО «ЦРЗС»
          </h1>
          <p className="mt-2 text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed">
            Прием специалистов в профессиональный реестр, зачисление на курсы повышения квалификации, а также присоединение спортивных комплексов и региональных организаций к соглашению об отраслевых стандартах.
          </p>
        </div>

        {/* Categories of Participation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="bg-white p-5 rounded-md border border-slate-200 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded bg-blue-100 text-blue-900 flex items-center justify-center font-bold">
              <Users className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Инструкторы и тренеры</h3>
            <p className="text-slate-600 leading-relaxed">
              Включение в Единый Реестр специалистов, участие в методических сборах, подтверждение и повышение квалификационных категорий А, В, С.
            </p>
          </div>

          <div className="bg-white p-5 rounded-md border border-slate-200 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded bg-blue-100 text-blue-900 flex items-center justify-center font-bold">
              <Building2 className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Горнолыжные комплексы и курорты</h3>
            <p className="text-slate-600 leading-relaxed">
              Технический аудит паспортов трасс, методическое сопровождение патрульных и спасательных служб, корпоративная переаттестация инструкторских школ.
            </p>
          </div>

          <div className="bg-white p-5 rounded-md border border-slate-200 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded bg-blue-100 text-blue-900 flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Спортивные судьи и эксперты</h3>
            <p className="text-slate-600 leading-relaxed">
              Аттестация в Главную судейскую коллегию, участие в заседаниях Экспертного совета по технологиям и безопасности склонов.
            </p>
          </div>
        </div>

        {/* Application Form Container */}
        <div className="bg-white rounded-md border border-slate-200 shadow-2xs overflow-hidden">
          <div className="bg-slate-900 text-white p-6">
            <h2 className="text-lg font-bold">Электронная подача документов и регистрация</h2>
            <p className="text-xs text-slate-300 mt-1">
              Заполните официальную форму для формирования электронного учетного дела. Рассмотрение осуществляется секретариатом в течение 3 рабочих дней.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 sm:p-12 text-center space-y-4 max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Заявление успешно зарегистрировано в системе
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Регистрационный номер учетного дела:
              </p>
              <div className="font-mono text-lg font-bold text-blue-900 bg-blue-50 py-2 px-4 rounded border border-blue-200 inline-block">
                {ticketNumber}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Копия уведомления направлена на адрес <strong>{formData.email}</strong>. Секретариат аттестационной комиссии свяжется с вами для проверки оригиналов документов.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: '',
                      birthDate: '',
                      organizationName: '',
                      inn: '',
                      region: 'г. Москва',
                      phone: '',
                      email: '',
                      program: 'Аттестация в Единый реестр специалистов',
                      qualificationLevel: 'Категория С (начальный уровень)',
                      sportsRank: 'Без разряда',
                      notes: '',
                      agreeData: false,
                      agreeCharter: false,
                    });
                  }}
                  className="px-4 py-2 bg-slate-800 text-white rounded text-xs font-semibold hover:bg-slate-900"
                >
                  Подать еще одно заявление
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 text-xs sm:text-sm">
              
              {/* Type Switcher */}
              <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
                <span className="font-semibold text-slate-700 text-xs">Категория заявителя:</span>
                <label className="flex items-center gap-1.5 cursor-pointer text-xs">
                  <input
                    type="radio"
                    name="applicantType"
                    checked={applicantType === 'individual'}
                    onChange={() => setApplicantType('individual')}
                    className="text-blue-600"
                  />
                  <span>Физическое лицо (инструктор / судья / спортсмен)</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer text-xs">
                  <input
                    type="radio"
                    name="applicantType"
                    checked={applicantType === 'organization'}
                    onChange={() => setApplicantType('organization')}
                    className="text-blue-600"
                  />
                  <span>Юридическое лицо (курорт / спортивный клуб)</span>
                </label>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {applicantType === 'individual' ? (
                  <>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1 text-xs">
                        ФИО заявителя (полностью) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Иванов Сергей Павлович"
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1 text-xs">
                        Дата рождения *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.birthDate}
                        onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1 text-xs">
                        Полное наименование организации *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.organizationName}
                        onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                        placeholder="ООО «Горнолыжный комплекс Сахалин»"
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1 text-xs">
                        ИНН организации *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.inn}
                        onChange={(e) => setFormData({ ...formData, inn: e.target.value })}
                        placeholder="7704812390"
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block font-semibold text-slate-700 mb-1 text-xs">
                    Контактный телефон *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+7 (999) 000-00-00"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1 text-xs">
                    Электронная почта (e-mail) *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="example@mail.ru"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1 text-xs">
                    Субъект Российской Федерации *
                  </label>
                  <select
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                  >
                    {regions.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1 text-xs">
                    Цель обращения / Программа *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    placeholder="Например: Квалификационный курс Категория В"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </div>

              {/* Additional notes */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1 text-xs">
                  Сведения о спортивном стаже / Дополнительные сведения:
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Укажите стаж катания, предыдущее место работы, имеющиеся судейские или инструкторские категории..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                ></textarea>
              </div>

              {/* Uploads Note */}
              <div className="p-4 bg-slate-50 rounded border border-dashed border-slate-300 flex items-center gap-3">
                <Upload className="w-5 h-5 text-slate-400 shrink-0" />
                <div className="text-xs text-slate-600">
                  <span className="font-semibold text-slate-800">Прикрепление сканов документов (паспорт, диплом, квалификационная книжка):</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">В электронном формате PDF / JPG до 15 МБ. Также оригиналы документов предоставляются в первый день очного сбора.</p>
                </div>
              </div>

              {/* Agreements Checkboxes */}
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.agreeData}
                    onChange={(e) => setFormData({ ...formData, agreeData: e.target.checked })}
                    className="mt-0.5 rounded text-blue-600"
                  />
                  <span>
                    Я подтверждаю достоверность указанных сведений и даю согласие АНО «ЦРЗС» на обработку персональных данных в соответствии с требованиями Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных».
                  </span>
                </label>

                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.agreeCharter}
                    onChange={(e) => setFormData({ ...formData, agreeCharter: e.target.checked })}
                    className="mt-0.5 rounded text-blue-600"
                  />
                  <span>
                    Ознакомлен с Уставом АНО «ЦРЗС», Положением о Едином реестре специалистов и обязуюсь соблюдать профессиональный этический кодекс.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-blue-800 hover:bg-blue-900 text-white rounded font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Отправить официальное заявление</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}

export default function MembershipPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto p-10 text-center text-sm text-slate-500">Загрузка формы заявления...</div>}>
      <MembershipContent />
    </Suspense>
  );
}
