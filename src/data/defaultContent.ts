import { ORGANIZATION } from './organization';
import { NEWS_DATA } from './news';
import { EVENTS_DATA } from './events';
import { SPECIALISTS_DATA } from './specialists';
import { DOCUMENTS_DATA } from './documents';
import { COURSES_DATA } from './courses';
import { STRUCTURE_MEMBERS } from './structure';

export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  isBuiltin?: boolean;
  // Шрифты и типографика
  headingFont: string;
  bodyFont: string;
  uppercaseHeadings: boolean;
  baseFontSize: '15px' | '16px' | '17px';
  // Цвета фонов и поверхностей
  bgPrimary: string;
  bgSecondary: string;
  cardBg: string;
  cardBorder: string;
  headerBg: string;
  darkPanelBg: string;
  // Цвета текста
  textHeading: string;
  textBody: string;
  textMuted: string;
  // Цвета кнопок и акцентов
  btnPrimaryFrom: string;
  btnPrimaryTo: string;
  btnPrimaryText: string;
  btnSecondaryBg: string;
  btnSecondaryText: string;
  accentColor: string;
  badgeBg: string;
  badgeText: string;
  // Геометрия и эффекты
  cardRadius: '0px' | '6px' | '12px' | '20px';
  buttonRadius: '0px' | '6px' | '8px' | '9999px';
  cardShadow: 'none' | 'sm' | 'md' | 'lg';
}

export const DEFAULT_THEMES_LIST: ThemeConfig[] = [
  {
    id: 'basic-light',
    name: 'Basic light',
    description: 'Базовая светлая ведомственная тема АНО «ЦЗСТ» (чистый белый фон, графитовый текст и тёплые янтарно-оранжевые акценты по Уставу)',
    isBuiltin: true,
    headingFont: 'Inter',
    bodyFont: 'Inter',
    uppercaseHeadings: false,
    baseFontSize: '16px',
    bgPrimary: '#FFFFFF',
    bgSecondary: '#F8F9FA',
    cardBg: '#FFFFFF',
    cardBorder: '#E2E8F0',
    headerBg: '#FFFFFF',
    darkPanelBg: '#0F172A',
    textHeading: '#0F172A',
    textBody: '#334155',
    textMuted: '#64748B',
    btnPrimaryFrom: '#EA580C',
    btnPrimaryTo: '#F59E0B',
    btnPrimaryText: '#FFFFFF',
    btnSecondaryBg: '#F1F5F9',
    btnSecondaryText: '#1E293B',
    accentColor: '#EA580C',
    badgeBg: '#FFFBEB',
    badgeText: '#9A3412',
    cardRadius: '12px',
    buttonRadius: '8px',
    cardShadow: 'sm',
  },
  {
    id: 'state-navy',
    name: 'State Navy (Госстандарт)',
    description: 'Строгая государственная сине-белая палитра с академической типографикой Montserrat и холодными стальными оттенками',
    isBuiltin: true,
    headingFont: 'Montserrat',
    bodyFont: 'Inter',
    uppercaseHeadings: false,
    baseFontSize: '16px',
    bgPrimary: '#FFFFFF',
    bgSecondary: '#F1F5F9',
    cardBg: '#FFFFFF',
    cardBorder: '#CBD5E1',
    headerBg: '#FFFFFF',
    darkPanelBg: '#0A2540',
    textHeading: '#0A2540',
    textBody: '#1E293B',
    textMuted: '#475569',
    btnPrimaryFrom: '#1D4ED8',
    btnPrimaryTo: '#2563EB',
    btnPrimaryText: '#FFFFFF',
    btnSecondaryBg: '#E2E8F0',
    btnSecondaryText: '#0A2540',
    accentColor: '#1D4ED8',
    badgeBg: '#EFF6FF',
    badgeText: '#1E40AF',
    cardRadius: '6px',
    buttonRadius: '6px',
    cardShadow: 'sm',
  },
  {
    id: 'alpine-dark',
    name: 'Alpine Dark (Тёмный графит)',
    description: 'Контрастная тёмная тема с глубоким сланцевым фоном, графитовыми карточками и энергичными янтарными кнопками',
    isBuiltin: true,
    headingFont: 'Manrope',
    bodyFont: 'Inter',
    uppercaseHeadings: false,
    baseFontSize: '16px',
    bgPrimary: '#0B1120',
    bgSecondary: '#111827',
    cardBg: '#1E293B',
    cardBorder: '#334155',
    headerBg: '#0F172A',
    darkPanelBg: '#030712',
    textHeading: '#F8FAFC',
    textBody: '#CBD5E1',
    textMuted: '#94A3B8',
    btnPrimaryFrom: '#EA580C',
    btnPrimaryTo: '#F59E0B',
    btnPrimaryText: '#FFFFFF',
    btnSecondaryBg: '#334155',
    btnSecondaryText: '#F8FAFC',
    accentColor: '#F59E0B',
    badgeBg: '#1E293B',
    badgeText: '#FBBF24',
    cardRadius: '12px',
    buttonRadius: '8px',
    cardShadow: 'md',
  },
  {
    id: 'emerald-sport',
    name: 'Emerald Sport (Туризм и Эко)',
    description: 'Природная спортивно-туристическая палитра с изумрудными акцентами, мягкими скруглениями и современным гротеском Rubik',
    isBuiltin: true,
    headingFont: 'Rubik',
    bodyFont: 'Open Sans',
    uppercaseHeadings: false,
    baseFontSize: '16px',
    bgPrimary: '#FFFFFF',
    bgSecondary: '#F2FBF7',
    cardBg: '#FFFFFF',
    cardBorder: '#D1FAE5',
    headerBg: '#FFFFFF',
    darkPanelBg: '#064E3B',
    textHeading: '#064E3B',
    textBody: '#1F2937',
    textMuted: '#4B5563',
    btnPrimaryFrom: '#059669',
    btnPrimaryTo: '#10B981',
    btnPrimaryText: '#FFFFFF',
    btnSecondaryBg: '#ECFDF5',
    btnSecondaryText: '#065F46',
    accentColor: '#059669',
    badgeBg: '#ECFDF5',
    badgeText: '#065F46',
    cardRadius: '20px',
    buttonRadius: '9999px',
    cardShadow: 'md',
  },
];

export const DEFAULT_THEMES = {
  activeThemeId: 'basic-light',
  items: DEFAULT_THEMES_LIST,
};

export const DEFAULT_SETTINGS = {
  siteMode: 'landing' as 'landing' | 'portal',
  activeThemeId: 'basic-light',
  seoTitle: 'АНО «ЦЗСТ» — Центр развития зимнего спорта, современных спортивных технологий и туризма',
  seoDescription: 'Официальный сайт АНО «ЦЗСТ»: реализация социально значимых программ, внедрение научно обоснованных методик спортивной подготовки, биомеханики и организация физкультурно-туристских мероприятий на территории РФ.',
  showDocumentsOnLanding: true,
  showPartnersOnLanding: true,
};

export const DEFAULT_LANDING = {
  header: {
    logoTitle: 'АНО «ЦЗСТ»',
    logoSubtitle: 'Центр развития зимнего спорта, спортивных технологий и туризма',
    ctaText: 'Обращение / Партнёрство',
    ctaHref: '#appeal-form',
    navLinks: [
      { label: 'О Центре', href: '#about' },
      { label: 'Направления', href: '#directions' },
      { label: 'Методология и технологии', href: '#methodology' },
      { label: 'Проекты и туризм', href: '#gov-support' },
      { label: 'Контакты', href: '#contacts' },
    ],
  },
  hero: {
    badge: 'Автономная некоммерческая организация',
    title: 'Развитие спортивных технологий, зимних дисциплин и активного долголетия',
    lead: 'Реализация социально значимых программ, внедрение научно обоснованных методик спортивной подготовки, биомеханики и организация физкультурно-туристских мероприятий на территории РФ.',
    primaryCtaText: 'Ознакомиться с направлениями',
    primaryCtaHref: '#directions',
    secondaryCtaText: 'Направить проектное предложение',
    secondaryCtaHref: '#appeal-form',
    metrics: [
      {
        tag: 'Методический контур 01',
        title: 'Системный мониторинг подготовки',
        desc: 'Цифровой контроль биомеханических параметров, оценка техники движения и долгосрочное планирование нагрузок',
      },
      {
        tag: 'Технологический контур 02',
        title: 'Методология биомеханики и бутфитинга',
        desc: 'Анатомическая адаптация спортивного инвентаря, профилактика травматизма и повышение эргономики движения',
      },
      {
        tag: 'Федеральный контур 03',
        title: 'Интеграция туризма и массового спорта',
        desc: 'Стандарты спортивно-оздоровительного горнолыжного туризма, профильные сборы и содействие нацпроектам РФ',
      },
    ],
  },
  ideology: {
    formulaBadge: 'Формула системной эффективности АНО «ЦЗСТ»',
    formulaItems: [
      'Методическая экспертиза',
      'Инфраструктура',
      'Безопасная среда',
      'Институт наставничества',
    ],
    methodologyTitle: 'Методология, стандарты кадров и спортивные технологии',
    methodologyLead: 'Спорт рассматривается как системная культура развития личности, воспитания дисциплины и национального потенциала. Фокус организации направлен на квалификацию тренеров и инструкторов, единые регламенты подготовки, биомеханику движения и долгосрочное спортивное долголетие.',
    pillars: [
      {
        code: '01',
        title: 'Системность и методология вместо коммерции',
        desc: 'Формирование устойчивой культуры физической подготовки, воспитания дисциплины и развития человеческого потенциала на научно-методическом фундаменте.',
      },
      {
        code: '02',
        title: 'Стандарты и квалификация кадров',
        desc: 'Единые регламенты подготовки инструкторов и тренеров, профильная сертификация, биомеханический аудит техники и развитие института наставничества.',
      },
      {
        code: '03',
        title: 'Биомеханика и адаптация экипировки',
        desc: 'Инструментальная диагностика опорно-двигательного аппарата, профессиональный бутфитинг и точная настройка оборудования для сохранения здоровья и спортивного долголетия.',
      },
      {
        code: '04',
        title: 'Государственная ориентация и нацпроекты',
        desc: 'Содействие реализации национальных проектов в области физической культуры, массового детско-юношеского спорта и внутреннего горнолыжного туризма РФ.',
      },
    ],
    govBadge: 'Партнёрам, курортам и профильным ведомствам',
    govTitle: 'Взаимодействие и государственная поддержка',
    govSubtitle: 'Экспертно-методическая и проектная работа с региональными министерствами спорта, спортивными федерациями, горнолыжными курортами и грантовыми операторами.',
    govBlocks: [
      {
        title: 'Совместная реализация социально ориентированных программ',
        desc: 'Разработка и выполнение грантовых, региональных и межведомственных инициатив по развитию зимних видов спорта, массовой физической культуры и активного долголетия.',
        bullets: [
          'Проектирование и сопровождение грантовых программ',
          'Организация открытых первенств, кубков и мастер-классов',
          'Социальные программы привлечения детей и молодёжи к спорту',
        ],
      },
      {
        title: 'Экспертиза горнолыжной инфраструктуры и безопасности трасс',
        desc: 'Независимый методический и технический аудит горнолыжных комплексов, разработка стандартов безопасной эксплуатации склонов, учебных зон и сервисных центров.',
        bullets: [
          'Аудит безопасности и маркировки горнолыжных трасс',
          'Стандартизация технических сервисов и центров бутфитинга',
          'Рекомендации по развитию всесезонных туристских маршрутов',
        ],
      },
      {
        title: 'Подготовка кадров для спортивно-туристических кластеров',
        desc: 'Целевое обучение, переподготовка и аттестация инструкторско-тренерского состава и технических специалистов для горнолыжных курортов и спортивных школ РФ.',
        bullets: [
          'Обучающие семинары, стажировки и круглые столы',
          'Внедрение единых регламентов работы с начинающими и детьми',
          'Методическое обеспечение региональных спортивных федераций',
        ],
      },
    ],
  },
  sectionOrder: [
    'hero',
    'about',
    'directions',
    'methodology',
    'gov-support',
    'documents',
    'partners',
    'appeal-form',
  ],
};

export const DEFAULT_HERO_SLIDES = [
  {
    id: 'slide-1',
    tag: 'Отраслевой стандарт',
    title: 'Развитие стандартов, экспертных компетенций и технологий зимнего спорта в России',
    desc: 'АНО «ЦЗСТ» осуществляет профессиональную аттестацию специалистов, разработку отраслевых стандартов безопасности горнолыжных комплексов, научно-методическое сопровождение и внедрение передовых спортивных технологий.',
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
  phone: '+7 (495) 789-34-20',
  phoneTel: '+74957893420',
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
  description: 'Автономная некоммерческая организация «ЦЕНТР РАЗВИТИЯ ЗИМНЕГО СПОРТА, СОВРЕМЕННЫХ СПОРТИВНЫХ ТЕХНОЛОГИЙ И ТУРИЗМА»',
  shortName: 'АНО «ЦЗСТ» (ANO «CWST»)',
  ogrn: '1127799014582',
  inn: '7704812390',
  kpp: '770401001',
  okpo: '09834125',
  phone: '+7 (495) 789-34-20',
  email: 'info@ano-czst.ru',
  workHours: 'Пн–Пт: 09:00 – 18:00 (МСК)',
  address: 'РФ, Московская обл., Красногорск г.о., п. Архангельское',
  copyright: '© 2026 АНО «ЦЗСТ» (ANO «CWST»). Все права защищены.',
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
  settings: DEFAULT_SETTINGS,
  themes: DEFAULT_THEMES,
  landing: DEFAULT_LANDING,
  organization: ORGANIZATION,
  hero: {
    showControls: false,
    slideDuration: 8,
    transitionEffect: 'motion-blur' as 'motion-blur' | 'fast-wind' | 'transparent' | 'dip-to-white' | 'dip-to-color',
    slides: DEFAULT_HERO_SLIDES,
  },
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
