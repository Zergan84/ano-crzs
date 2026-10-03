import React from 'react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Camera, Calendar, MapPin, Tag } from 'lucide-react';

export const metadata = {
  title: 'Фотохроника мероприятий — АНО «ЦРЗС»',
  description: 'Официальная фотохроника всероссийских семинаров, аттестаций инструкторов, полевых испытаний оборудования и аудитов горнолыжных трасс.',
};

export default function GalleryPage() {
  const albums = [
    {
      id: 'g-01',
      title: 'Практические квалификационные экзамены инструкторов (Категория В и А)',
      location: 'Кемеровская область, ГЛК «Шерегеш»',
      date: 'Февраль 2025',
      category: 'Аттестация кадров',
      photosCount: 24,
      description: 'Демонстрация карвинговой техники на крутом рельефе, фазовый видеоанализ поворотов с использованием оптической телеметрии.',
    },
    {
      id: 'g-02',
      title: 'Технический аудит пассивных систем улавливания и маркировки зон выката',
      location: 'Мурманская область, ГЛК «Большой Вудъявр»',
      date: 'Январь 2025',
      category: 'Безопасность трасс',
      photosCount: 18,
      description: 'Проверка эластичности защитных сетей классов В и С, оценка уклонов перегибов и соответствия стандартам СТО-ЦРЗС.',
    },
    {
      id: 'g-03',
      title: 'Всероссийский судейский семинар по дисциплинам горнолыжного спорта',
      location: 'Краснодарский край, г. Сочи, Красная Поляна',
      date: 'Декабрь 2024',
      category: 'Судейский корпус',
      photosCount: 32,
      description: 'Теоретический модуль, разбор судейских прецедентов, синхронизация радиосвязи и резервного ручного хронометража.',
    },
    {
      id: 'g-04',
      title: 'Полевые испытания датчиков мониторинга плотности снежной подложки',
      location: 'Кабардино-Балкария, поляна Азау / Эльбрус',
      date: 'Ноябрь 2024',
      category: 'Спортивные технологии',
      photosCount: 15,
      description: 'Тестирование отечественных влагомеров снега и систем предиктивного планирования работы снегоуплотнительных машин.',
    },
    {
      id: 'g-05',
      title: 'Учебно-методический сбор инструкторов начального уровня (Категория С)',
      location: 'Челябинская область, «Солнечная долина»',
      date: 'Октябрь 2024',
      category: 'Обучение',
      photosCount: 28,
      description: 'Отработка методики обучения плугу и упору, организация безопасного движения детских групп на учебных склонах.',
    },
    {
      id: 'g-06',
      title: 'Ежегодная конференция «Инфраструктура и безопасность всесезонных курортов»',
      location: 'г. Москва, Конференц-зал Лужники',
      date: 'Сентябрь 2024',
      category: 'Официально',
      photosCount: 40,
      description: 'Пленарное заседание Экспертного совета, презентация новых методических пособий и подписание межрегиональных соглашений.',
    },
  ];

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Фотохроника мероприятий' }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Header */}
        <div className="border-b border-slate-200 pb-5">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-800">
            Медиатека и фотохроника
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Фотоархив официальных мероприятий Центра
          </h1>
          <p className="mt-2 text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed">
            Документальная фиксация проведения аттестаций, полевых проверок безопасности, судейских семинаров и научных конференций.
          </p>
        </div>

        {/* Albums Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums.map((album) => (
            <div 
              key={album.id}
              className="bg-white rounded-md border border-slate-200 overflow-hidden shadow-2xs hover:border-slate-300 transition-colors flex flex-col justify-between"
            >
              {/* Institutional Media Graphic Placeholder */}
              <div className="h-44 bg-gradient-to-br from-slate-800 via-[#0A2540] to-blue-950 p-4 relative flex flex-col justify-between text-white">
                <div className="flex items-center justify-between text-xs">
                  <span className="bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded text-[11px] font-medium">
                    {album.category}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-slate-300">
                    <Camera className="w-3.5 h-3.5" />
                    {album.photosCount} фото
                  </span>
                </div>

                <div>
                  <span className="font-mono text-xs text-blue-300 block">{album.date}</span>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-300 mt-1">
                    <MapPin className="w-3 h-3 text-red-400 shrink-0" />
                    <span className="truncate">{album.location}</span>
                  </div>
                </div>
              </div>

              {/* Album Body */}
              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 leading-snug">
                    {album.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {album.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400">Пресс-служба АНО «ЦРЗС»</span>
                  <span className="text-blue-800 font-semibold hover:underline cursor-pointer">
                    Смотреть альбом →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
