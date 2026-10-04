'use client';

import React, { useState } from 'react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ORGANIZATION } from '@/data/organization';
import { useSiteContent } from '@/lib/content';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  Building2, 
  FileText, 
  Copy, 
  Check
} from 'lucide-react';

export default function ContactsPage() {
  const { content } = useSiteContent();
  const org = content?.organization || ORGANIZATION;
  const bank = org.bankRequisites || ORGANIZATION.bankRequisites;

  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [feedback, setFeedback] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Общий вопрос',
    message: '',
  });

  const copyRequisites = () => {
    const text = `
Наименование: ${org.fullName || ORGANIZATION.fullName}
ОГРН: ${org.ogrn || ORGANIZATION.ogrn}
ИНН: ${org.inn || ORGANIZATION.inn}
КПП: ${org.kpp || ORGANIZATION.kpp}
ОКПО: ${org.okpo || ORGANIZATION.okpo}
Адрес: ${org.legalAddress || ORGANIZATION.legalAddress}
Банк: ${bank.bankName}
БИК: ${bank.bik}
Р/с: ${bank.checkingAccount}
К/с: ${bank.correspondentAccount}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Контакты и реквизиты' }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Header */}
        <div className="border-b border-slate-200 pb-5">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-800">
            Контактная информация
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Контакты, реквизиты и электронная приемная АНО «ЦРЗС»
          </h1>
          <p className="mt-2 text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed">
            Центральный офис организации расположен по адресу: 143420, Московская обл., Красногорск г.о., Архангельское п., д. 29. Прием посетителей и выдача оригиналов документов осуществляются по предварительной записи.
          </p>
        </div>

        {/* Top Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          <div className="bg-white p-5 rounded-md border border-slate-200 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded bg-blue-50 text-blue-900 flex items-center justify-center font-bold">
              <MapPin className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Центральный офис</h3>
            <p className="text-slate-600 leading-snug">{org.actualAddress || ORGANIZATION.actualAddress}</p>
            <p className="text-[11px] text-slate-400">Пропускной режим, 4 этаж</p>
          </div>

          <div className="bg-white p-5 rounded-md border border-slate-200 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded bg-blue-50 text-blue-900 flex items-center justify-center font-bold">
              <Phone className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Телефоны</h3>
            <p className="font-semibold text-slate-800">{org.phone || ORGANIZATION.phone}</p>
            <p className="text-[11px] text-slate-500">Многоканальная приемная</p>
          </div>

          <div className="bg-white p-5 rounded-md border border-slate-200 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded bg-blue-50 text-blue-900 flex items-center justify-center font-bold">
              <Mail className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Электронная почта</h3>
            <p className="text-slate-800">
              <a href={`mailto:${org.receptionEmail || ORGANIZATION.receptionEmail}`} className="hover:underline">{org.receptionEmail || ORGANIZATION.receptionEmail}</a>
            </p>
            <p className="text-[11px] text-slate-500">
              Пресс-служба: {org.pressEmail || ORGANIZATION.pressEmail}
            </p>
          </div>

          <div className="bg-white p-5 rounded-md border border-slate-200 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded bg-blue-50 text-blue-900 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">График работы</h3>
            <p className="text-slate-800 font-medium">{org.workHours || ORGANIZATION.workHours}</p>
            <p className="text-[11px] text-slate-500">Суббота, воскресенье — выходные</p>
          </div>
        </div>

        {/* Requisites & Feedback Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Requisites (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 rounded-md border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-700" />
                <span>Официальные банковские и учетные реквизиты</span>
              </h2>
              <button
                onClick={copyRequisites}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Скопировано!' : 'Скопировать'}</span>
              </button>
            </div>

            <table className="official-table text-xs">
              <tbody>
                <tr>
                  <td className="w-1/3 font-semibold text-slate-600">Полное наименование:</td>
                  <td className="text-slate-900">{org.fullName || ORGANIZATION.fullName}</td>
                </tr>
                <tr>
                  <td className="font-semibold text-slate-600">Сокращенное наименование:</td>
                  <td className="font-bold text-blue-900">{org.shortName || ORGANIZATION.shortName}</td>
                </tr>
                <tr>
                  <td className="font-semibold text-slate-600">ОГРН:</td>
                  <td className="font-mono text-slate-900">{org.ogrn || ORGANIZATION.ogrn}</td>
                </tr>
                <tr>
                  <td className="font-semibold text-slate-600">ИНН / КПП:</td>
                  <td className="font-mono text-slate-900">{org.inn || ORGANIZATION.inn} / {org.kpp || ORGANIZATION.kpp}</td>
                </tr>
                <tr>
                  <td className="font-semibold text-slate-600">ОКПО:</td>
                  <td className="font-mono text-slate-900">{org.okpo || ORGANIZATION.okpo}</td>
                </tr>
                <tr>
                  <td className="font-semibold text-slate-600">Юридический адрес:</td>
                  <td className="text-slate-900">{org.legalAddress || ORGANIZATION.legalAddress}</td>
                </tr>
                <tr>
                  <td className="font-semibold text-slate-600">Банк:</td>
                  <td className="text-slate-900">{bank.bankName}</td>
                </tr>
                <tr>
                  <td className="font-semibold text-slate-600">БИК банка:</td>
                  <td className="font-mono text-slate-900">{bank.bik}</td>
                </tr>
                <tr>
                  <td className="font-semibold text-slate-600">Расчетный счет:</td>
                  <td className="font-mono text-slate-900">{bank.checkingAccount}</td>
                </tr>
                <tr>
                  <td className="font-semibold text-slate-600">Корреспондентский счет:</td>
                  <td className="font-mono text-slate-900">{bank.correspondentAccount}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Electronic Reception Feedback Form (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-md border border-slate-200 shadow-2xs space-y-4">
            <div className="border-b border-slate-200 pb-3">
              <h2 className="text-base font-bold text-slate-900">
                Электронная приемная
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Направление официальных обращений и запросов
              </p>
            </div>

            {formSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-bold text-slate-900 text-sm">Обращение успешно отправлено</h3>
                <p className="text-xs text-slate-600">
                  Ваш запрос зарегистрирован в журнале входящей корреспонденции. Ответ будет направлен на указанный электронный адрес.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-3 px-4 py-1.5 bg-slate-800 text-white rounded text-xs font-semibold"
                >
                  Новое сообщение
                </button>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Ваше имя / организация *</label>
                  <input
                    type="text"
                    required
                    value={feedback.name}
                    onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
                    placeholder="Сергей Николаев"
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={feedback.email}
                      onChange={(e) => setFeedback({ ...feedback, email: e.target.value })}
                      placeholder="mail@example.ru"
                      className="w-full p-2 bg-slate-50 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Телефон</label>
                    <input
                      type="tel"
                      value={feedback.phone}
                      onChange={(e) => setFeedback({ ...feedback, phone: e.target.value })}
                      placeholder="+7"
                      className="w-full p-2 bg-slate-50 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Тема обращения</label>
                  <select
                    value={feedback.subject}
                    onChange={(e) => setFeedback({ ...feedback, subject: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                  >
                    <option value="Общий вопрос">Общий вопрос</option>
                    <option value="Аттестация в Реестр">Аттестация в Единый Реестр</option>
                    <option value="Аудит трасс">Технический аудит трасс</option>
                    <option value="Запрос документов">Запрос нормативных документов</option>
                    <option value="Пресс-служба">Пресс-служба / СМИ</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Текст обращения *</label>
                  <textarea
                    rows={4}
                    required
                    value={feedback.message}
                    onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
                    placeholder="Изложите суть вопроса или запроса..."
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-blue-800 hover:bg-blue-900 text-white font-semibold rounded transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Отправить в приемную</span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Location / Interactive Map Placeholder */}
        <div className="bg-white p-6 rounded-md border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-600" />
                <span>Схема проезда к Центральному офису</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                143420, Московская обл., Красногорск г.о., Архангельское п., д. 29
              </p>
            </div>
            <a
              href="https://yandex.ru/maps/?text=143420+Московская+обл+Красногорск+Архангельское+29"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-blue-800 font-semibold hover:underline hidden sm:inline"
            >
              Открыть в Яндекс.Картах ↗
            </a>
          </div>

          <div className="w-full h-64 sm:h-72 bg-slate-100 rounded border border-slate-200 flex flex-col items-center justify-center text-slate-500 relative overflow-hidden">
            {/* Visual stylised map grid background */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]"></div>
            <div className="relative z-10 text-center space-y-2 p-4 max-w-md bg-white/90 backdrop-blur-xs rounded-md border border-slate-200 shadow-sm">
              <MapPin className="w-8 h-8 text-red-600 mx-auto animate-bounce" />
              <div className="font-bold text-sm text-slate-900">АНО «ЦРЗС» • Центральный офис</div>
              <div className="text-xs text-slate-600">
                143420, Московская обл., Красногорск г.о., Архангельское п., д. 29
              </div>
              <div className="text-[11px] text-slate-400">
                Московская область, поселок Архангельское
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
