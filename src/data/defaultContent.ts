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
    displayMode: 'image',
    blockSize: 'md',
    blockTitle: '',
    blockSubtitle: '',
    blockBtnText: '',
    blockBtnHref: '',
    blockBtnColor: 'blue',
  },
  {
    id: 'slide-2',
    tag: 'Всероссийские соревнования',
    title: 'Carve Cup 2028: соревнования в разных дисциплинах',
    desc: 'Масштабные старты нового поколения: слалом, гигантский слалом, скоростной спуск, могул, фристайл и фрирайд на одной горе. Призовой фонд 10 000 000 ₽.',
    ctaText: 'Подробнее о Carve CUP',
    ctaHref: 'https://ano-crzs.pages.dev/#carvecup',
    image: '/carve-cup.jpg',
    displayMode: 'card',
    blockSize: 'md',
    blockTitle: 'Carve Cup 2028 🔥',
    blockSubtitle: 'Официальный зачет • Горные лыжи и сноуборд',
    blockBtnText: 'Скоро старт',
    blockBtnHref: 'https://ano-crzs.pages.dev/#carvecup',
    blockBtnColor: 'red',
  },
  {
    id: 'slide-3',
    tag: 'События и встречи',
    title: 'День открытых дверей в здании Правительства Московской области',
    desc: 'Презентация программ развития спортивной инфраструктуры, обсуждение стандартов безопасности трасс и встреча с ведущими отраслевыми экспертами и представителями министерств.',
    ctaText: 'Зарегистрироваться',
    ctaHref: '/events',
    image: '/mosreg-gov.jpg',
    displayMode: 'card',
    blockSize: 'md',
    blockTitle: 'Дом Правительства Московской области',
    blockSubtitle: 'г. Красногорск • День открытых дверей',
    blockBtnText: 'Отраслевой форум',
    blockBtnHref: '/events',
    blockBtnColor: 'blue',
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

export const DEFAULT_HEADER = {
  navLinks: [
    { 
      label: 'Carve CUP 🔥', 
      href: 'https://ano-crzs.pages.dev/#carvecup',
      isRed: true,
      isExternal: true,
    },
    { 
      label: 'О нас', 
      href: '/about',
      hasSubmenu: true,
      subItems: [
        { label: 'Общие сведения и цели', href: '/about' },
        { label: 'Руководство и структура', href: '/about/structure' },
        { label: 'Учредительные документы', href: '/documents?cat=Учредительные+документы' },
      ]
    },
    { label: 'Направления', href: '/activities' },
    { label: 'Реестр', href: '/specialists', highlight: true },
    { label: 'Обучение', href: '/education' },
    { label: 'Мероприятия', href: '/events' },
    { label: 'Документы', href: '/documents' },
    { label: 'Членство', href: '/membership' },
    { label: 'Контакты', href: '/contacts' },
  ],
  phone: '+7 (495) 109-01-28',
  phoneTel: '+74951090128',
  ctaButtonText: 'Подать заявление',
  ctaButtonHref: '/membership',
  registryButtonText: 'Единый реестр специалистов',
  registryButtonHref: '/specialists',
};

export const DEFAULT_SECTION_ORDER = [
  'hero',
  'search',
  'stats',
  'notice',
  'directions',
  'specialists',
  'news-events',
  'documents',
  'partners',
];

export const DEFAULT_FONTS = {
  siteHeadingFont: 'Inter',
  siteBodyFont: 'Inter',
  adminFont: 'Inter',
  uppercaseHeadings: false,
};

export const DEFAULT_FOOTER = {
  description: 'Автономная некоммерческая организация «Центр развития зимнего спорта, современных спортивных технологий и туризма»',
  shortName: 'АНО «ЦРЗС»',
  ogrn: '1127799018432',
  inn: '7704281900',
  kpp: '770401001',
  okpo: '11543820',
  phone: '+7 (495) 109-01-28',
  email: 'info@ano-crzs.ru',
  workHours: 'Пн–Пт: 09:00 – 18:00 (МСК)',
  address: '119048, г. Москва, Лужнецкая набережная, д. 8, стр. 1',
  copyright: '© 2012–2026 АНО «ЦРЗС». Все права защищены.',
};

export const DEFAULT_PAGES = {
  items: [] as Array<{
    id: string;
    label: string;
    heading: string;
    text: string;
    image: string;
    layout: 'left' | 'center' | 'right';
    showButton: boolean;
    buttonText: string;
    buttonHref: string;
    socialLinks: Array<{ label: string; href: string; type: string }>;
  }>,
};

export const DEFAULT_CONTENT = {
  organization: ORGANIZATION,
  hero: { slides: DEFAULT_HERO_SLIDES },
  header: DEFAULT_HEADER,
  'section-order': { order: DEFAULT_SECTION_ORDER },
  sectionOrder: { order: DEFAULT_SECTION_ORDER },
  fonts: DEFAULT_FONTS,
  footer: DEFAULT_FOOTER,
  pages: DEFAULT_PAGES,
  news: { items: NEWS_DATA },
  events: { items: EVENTS_DATA },
  specialists: { items: SPECIALISTS_DATA },
  documents: { items: DOCUMENTS_DATA },
  courses: { items: COURSES_DATA },
  structure: { items: STRUCTURE_MEMBERS },
  partners: { items: DEFAULT_PARTNERS },
};

export type SiteContent = typeof DEFAULT_CONTENT;

