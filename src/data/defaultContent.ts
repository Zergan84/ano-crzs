import { ORGANIZATION } from './organization';
import { NEWS_DATA } from './news';
import { EVENTS_DATA } from './events';
import { SPECIALISTS_DATA } from './specialists';
import { DOCUMENTS_DATA } from './documents';
import { COURSES_DATA } from './courses';
import { STRUCTURE_MEMBERS } from './structure';

export const DEFAULT_HERO_SLIDES = [
  {
    id: 'slide-1',
    tag: 'Отраслевой стандарт',
    title: 'Развитие стандартов, экспертных компетенций и технологий зимнего спорта в России',
    desc: 'АНО «ЦРЗС» осуществляет профессиональную аттестацию специалистов, разработку отраслевых стандартов безопасности горнолыжных комплексов, научно-методическое сопровождение и внедрение передовых спортивных технологий.',
    ctaText: 'Единый Реестр специалистов',
    ctaHref: '/specialists',
    image: '/Gemini_Generated_Image_hkfhw8hkfhw8hkfh.png',
  },
  {
    id: 'slide-2',
    tag: 'Всероссийские соревнования',
    title: 'Carve Cup 2028: соревнования в разных дисциплинах',
    desc: 'Масштабные старты нового поколения: слалом, гигантский слалом, скоростной спуск, могул, фристайл и фрирайд на одной горе. Призовой фонд 10 000 000 ₽.',
    ctaText: 'Подробнее о Carve CUP',
    ctaHref: 'https://ano-crzs.pages.dev/#carvecup',
    image: '/carve-cup.jpg',
  },
  {
    id: 'slide-3',
    tag: 'События и встречи',
    title: 'День открытых дверей в здании Правительства Московской области',
    desc: 'Презентация программ развития спортивной инфраструктуры, обсуждение стандартов безопасности трасс и встреча с ведущими отраслевыми экспертами и представителями министерств.',
    ctaText: 'Зарегистрироваться',
    ctaHref: '/events',
    image: '/mosreg-gov.jpg',
  },
];

export const DEFAULT_PARTNERS = [
  { id: 'gazprom-neft', name: 'Газпром Нефть', category: 'Генеральный партнер', logo: '/sponsors/gazprom-neft.png' },
  { id: 'sberbank', name: 'Сбербанк', category: 'Стратегический партнер', logo: '/sponsors/sberbank.svg' },
  { id: 'fgssr', name: 'ФГССР', category: 'Отраслевая федерация', logo: '/sponsors/fgssr.jpg' },
  { id: 'krylatskoye', name: 'Крылатское', category: 'Спортивный комплекс', logo: '/sponsors/krylatskoye.png' },
  { id: 'kant', name: 'Кант', category: 'Спортивный комплекс и сеть', logo: '/sponsors/kant.png' },
  { id: 'sportmaster', name: 'Спортмастер', category: 'Партнер экипировки', logo: '/sponsors/sportmaster.png' },
  { id: 'sport-marafon', name: 'Спорт марафон', category: 'Аутдор-партнер', logo: '/sponsors/sport-marafon.png' },
  { id: 'abzakovo', name: 'Абзаково', category: 'Горнолыжный курорт', logo: '/sponsors/abzakovo.png' },
  { id: 'sector-e', name: 'Сектор Е (Шерегеш)', category: 'Горнолыжный комплекс', logo: '/sponsors/sector-e.png' },
  { id: 'solnechnaya-dolina', name: 'Солнечная долина', category: 'Горнолыжный курорт', logo: '/sponsors/solnechnaya-dolina.png' },
  { id: 'rosakhutor', name: 'Роза хутор', category: 'Горный курорт', logo: '/sponsors/rosakhutor.png' },
  { id: 'alpika', name: 'Альпика', category: 'Курорт Газпром Поляна', logo: '/sponsors/alpika.png' },
];

export const DEFAULT_CONTENT = {
  organization: ORGANIZATION,
  hero: { slides: DEFAULT_HERO_SLIDES },
  news: { items: NEWS_DATA },
  events: { items: EVENTS_DATA },
  specialists: { items: SPECIALISTS_DATA },
  documents: { items: DOCUMENTS_DATA },
  courses: { items: COURSES_DATA },
  structure: { items: STRUCTURE_MEMBERS },
  partners: { items: DEFAULT_PARTNERS },
};

export type SiteContent = typeof DEFAULT_CONTENT;
