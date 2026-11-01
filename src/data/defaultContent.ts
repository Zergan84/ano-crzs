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
  // Дополнительные изображения и стилевые параметры темы (например, Bolt style)
  heroBgImage?: string;
  aboutImage?: string;
  partnerImage?: string;
}

export const DEFAULT_THEMES_LIST: ThemeConfig[] = [
  {
    id: 'tricolor',
    name: 'Tricolor',
    description: 'Официальный патриотический шаблон с полосой триколора, шрифтом Golos Text, строгой ведомственной стилистикой, глубоким сапфировым и акцентным алым цветом (по образцу state-sports-showcase).',
    isBuiltin: true,
    headingFont: 'Golos Text',
    bodyFont: 'Golos Text',
    uppercaseHeadings: false,
    baseFontSize: '16px',
    bgPrimary: '#F8FAFC',
    bgSecondary: '#EFF3F8',
    cardBg: '#FFFFFF',
    cardBorder: '#E2E8F0',
    headerBg: '#FFFFFF',
    darkPanelBg: '#0F2147',
    textHeading: '#0F2147',
    textBody: '#1B263B',
    textMuted: '#606E85',
    btnPrimaryFrom: '#D92D20',
    btnPrimaryTo: '#DC2626',
    btnPrimaryText: '#FFFFFF',
    btnSecondaryBg: '#FFFFFF',
    btnSecondaryText: '#0F2147',
    accentColor: '#D92D20',
    badgeBg: '#EFF3F8',
    badgeText: '#1447E6',
    cardRadius: '6px',
    buttonRadius: '6px',
    cardShadow: 'sm',
    heroBgImage: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=2440&q=80',
    aboutImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
  },
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
    id: 'bolt-style',
    name: 'Bolt style',
    description: 'Дизайн-шаблон 1-в-1 по референсу Bolt: шрифт Onest, глубокий морской сапфир (#071A33), тёплое золото (#E8B93E), бирюзовые акценты (#0F7B7A), капсульные кнопки и фото-блоки',
    isBuiltin: true,
    headingFont: 'Onest',
    bodyFont: 'Onest',
    uppercaseHeadings: false,
    baseFontSize: '16px',
    bgPrimary: '#FFFFFF',
    bgSecondary: '#F8FAFC',
    cardBg: '#FFFFFF',
    cardBorder: '#E2E8F0',
    headerBg: '#071A33',
    darkPanelBg: '#071A33',
    textHeading: '#071A33',
    textBody: '#475569',
    textMuted: '#64748B',
    btnPrimaryFrom: '#E8B93E',
    btnPrimaryTo: '#F0CF6A',
    btnPrimaryText: '#071A33',
    btnSecondaryBg: '#EEF3F9',
    btnSecondaryText: '#071A33',
    accentColor: '#0F7B7A',
    badgeBg: '#E9F7F6',
    badgeText: '#0B6160',
    cardRadius: '20px',
    buttonRadius: '9999px',
    cardShadow: 'md',
    heroBgImage: 'https://skisport.ru/upload/iblock/9aa/a90b092yyp4qdml3bju3dxvf3njv2asn.jpg',
    aboutImage: 'https://discover.moscow/media/images/DSC00979_1-min.min-1920x1920.webp',
    partnerImage: 'https://images.pexels.com/photos/4963360/pexels-photo-4963360.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
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
  activeThemeId: 'tricolor',
  items: DEFAULT_THEMES_LIST,
};

export const DEFAULT_SETTINGS = {
  siteMode: 'landing' as 'landing' | 'portal',
  activeThemeId: 'tricolor',
  seoTitle: 'Центр развития спорта — АНО «ЦЗСТ»',
  seoDescription: 'Автономная некоммерческая организация. Реализуем государственные и социальные программы в сфере физической культуры и спорта: от школьных секций до подготовки спортивного резерва.',
  showDocumentsOnLanding: true,
  showPartnersOnLanding: true,
};

export const DEFAULT_LANDING = {
  header: {
    logoUrl: '/logo.png',
    logoTitle: 'Центр развития спорта',
    logoSubtitle: 'Автономная некоммерческая организация',
    ctaText: 'Стать партнёром',
    ctaHref: '#partnership',
    navLinks: [
      { label: 'О центре', href: '#about' },
      { label: 'Проекты', href: '#projects' },
      { label: 'Новости', href: '#news' },
      { label: 'Документы', href: '#documents' },
      { label: 'Партнёры', href: '#partners' },
      { label: 'Контакты', href: '#contacts' },
    ],
  },
  hero: {
    badge: 'Автономная некоммерческая организация',
    title: 'Развиваем спорт, который объединяет регионы',
    lead: 'Мы реализуем государственные и социальные программы в сфере физической культуры и спорта: от школьных секций до подготовки спортивного резерва. Открыто говорим о нашей работе и ждём партнёров.',
    primaryCtaText: 'Стать партнёром',
    primaryCtaHref: '#partnership',
    secondaryCtaText: 'Наши проекты',
    secondaryCtaHref: '#projects',
    metrics: [],
  },
  ideology: {
    formulaBadge: 'Сотрудничество',
    formulaItems: [
      'Гранты и субсидии',
      'Совместные программы',
      'Открытая отчётность',
      'Социальный эффект',
    ],
    methodologyTitle: 'Станьте партнёром центра',
    methodologyLead: 'Спонсорство, гранты и совместные проекты. Расскажите о своей организации, и мы предложим формат участия.',
    pillars: [
      {
        code: '01',
        title: 'Гранты и субсидии',
        desc: 'Участие в конкурсах грантовых программ и совместное финансирование проектов.',
      },
      {
        code: '02',
        title: 'Совместные программы',
        desc: 'Разработка проектов с учётом целей вашей организации и задач региона.',
      },
      {
        code: '03',
        title: 'Открытая отчётность',
        desc: 'Прозрачное использование средств и регулярные публичные отчёты по каждому проекту.',
      },
      {
        code: '04',
        title: 'Социальный эффект',
        desc: 'Измеримые результаты: число участников, построенные площадки, подготовленные тренеры.',
      },
    ],
    govBadge: 'Сотрудничество',
    govTitle: 'Станьте партнёром центра',
    govSubtitle: 'Спонсорство, гранты и совместные проекты. Расскажите о своей организации, и мы предложим формат участия.',
    govCtaText: 'Оставить заявку на партнёрство',
    govModalTitle: 'Заявка на партнёрство',
    govBlocks: [
      {
        title: 'Гранты и субсидии',
        desc: 'Участие в конкурсах грантовых программ и совместное финансирование проектов.',
        bullets: [],
      },
      {
        title: 'Совместные программы',
        desc: 'Разработка проектов с учётом целей вашей организации и задач региона.',
        bullets: [],
      },
      {
        title: 'Открытая отчётность',
        desc: 'Прозрачное использование средств и регулярные публичные отчёты по каждому проекту.',
        bullets: [],
      },
      {
        title: 'Социальный эффект',
        desc: 'Измеримые результаты: число участников, построенные площадки, подготовленные тренеры.',
        bullets: [],
      },
    ],
  },
  sectionOrder: [
    'hero',
    'about',
    'projects',
    'news',
    'documents',
    'partners',
    'partnership',
    'contacts',
  ],
};

// На странице отображается 1 слайд по умолчанию. Если в админке добавить 2-й и 3-й слайд — автоматически заработает слайдер.
export const DEFAULT_HERO_SLIDES = [
  {
    id: 'slide-1',
    tag: '',
    tabLabel: 'Слайд 01',
    title: 'Спорт, который объединяет',
    desc: 'АНО «ЦРЗС» поддерживает массовый и детско-юношеский спорт, реализует инфраструктурные и образовательные программы совместно с федерациями, регионами и бизнесом.',
    ctaText: 'Стать партнёром',
    ctaHref: '#partnership',
    secondaryBtnText: 'Наши проекты',
    secondaryBtnHref: '#projects',
    tertiaryBtnText: '',
    tertiaryBtnHref: '',
    image: 'https://skisport.ru/upload/iblock/9aa/a90b092yyp4qdml3bju3dxvf3njv2asn.jpg',
    displayMode: 'image',
    showBadge: false,
    bgMarginTop: 0,
    bgPosition: 'top',
    textAlign: 'left',
    blockSize: 'md',
    blockTitle: '',
    blockSubtitle: '',
    blockBtnText: '',
    blockBtnHref: '',
    blockBtnColor: 'blue',
  },
  {
    id: 'slide-1793556329271',
    tag: '',
    tabLabel: 'Слайд 02',
    title: 'Системный подход к спортивному развитию',
    desc: 'Создаем методическую базу и инфраструктуру для непрерывного роста спортсменов и любителей.',
    ctaText: 'Стать партнёром',
    ctaHref: '#partnership',
    secondaryBtnText: 'Наши проекты',
    secondaryBtnHref: '#projects',
    tertiaryBtnText: '',
    tertiaryBtnHref: '',
    image: 'https://fd-sport.ru/spartakiada/wp-content/uploads/2026/08/tdg36_resized.jpeg',
    displayMode: 'image',
    showBadge: false,
    bgMarginTop: 0,
    bgPosition: 'center',
    textAlign: 'left',
    blockSize: 'md',
    blockTitle: '',
    blockSubtitle: '',
    blockBtnText: '',
    blockBtnHref: '',
    blockBtnColor: 'blue',
  },
  {
    id: 'slide-1793557280833',
    tag: '',
    tabLabel: 'Слайд 03',
    title: 'От активного туризма к высшим вершинам',
    desc: 'Популяризируем зимние маршруты нашей страны и открываем путь от любительских стартов к сборным командам.',
    ctaText: 'Стать партнёром',
    ctaHref: '#partnership',
    secondaryBtnText: 'Наши проекты',
    secondaryBtnHref: '#projects',
    tertiaryBtnText: '',
    tertiaryBtnHref: '',
    image: 'https://static.tildacdn.com/tild3866-6664-4662-b762-383066343462/DSC00253.jpg',
    displayMode: 'image',
    showBadge: false,
    bgMarginTop: 0,
    bgPosition: 'center',
    textAlign: 'left',
    blockSize: 'md',
    blockTitle: '',
    blockSubtitle: '',
    blockBtnText: '',
    blockBtnHref: '',
    blockBtnColor: 'blue',
  },
  {
    id: 'slide-1793557966510',
    tag: 'Автономная некоммерческая организация',
    tabLabel: 'Слайд 04',
    title: 'Формируем культуру безопасного катания',
    desc: 'Повышаем стандарты подготовки на горнолыжных склонах и делаем активный отдых доступным для каждого.',
    ctaText: 'Стать партнёром',
    ctaHref: '#partnership',
    secondaryBtnText: 'Наши проекты',
    secondaryBtnHref: '#projects',
    tertiaryBtnText: '',
    tertiaryBtnHref: '',
    image: 'https://rst.ru/assets/images/pictures_news/rst-news-12-01-26-1.jpg',
    displayMode: 'image',
    showBadge: false,
    bgMarginTop: 0,
    bgPosition: 'center',
    textAlign: 'left',
    blockSize: 'md',
    blockTitle: '',
    blockSubtitle: '',
    blockBtnText: '',
    blockBtnHref: '',
    blockBtnColor: 'blue',
  },
];

export const DEFAULT_PARTNERS = [
  { id: 'min-sport', name: 'Министерство спорта', category: 'Министерства и ведомства', logo: '' },
  { id: 'min-edu', name: 'Министерство образования', category: 'Министерства и ведомства', logo: '' },
  { id: 'min-econ', name: 'Министерство экономического развития', category: 'Министерства и ведомства', logo: '' },
  { id: 'fed-athletics', name: 'Федерация лёгкой атлетики', category: 'Федерации', logo: '' },
  { id: 'fed-swimming', name: 'Федерация плавания', category: 'Федерации', logo: '' },
  { id: 'fed-gymnastics', name: 'Федерация гимнастики', category: 'Федерации', logo: '' },
  { id: 'partner-bank', name: 'Региональный банк', category: 'Спонсоры и партнёры', logo: '' },
  { id: 'partner-build', name: 'Строительная группа', category: 'Спонсоры и партнёры', logo: '' },
  { id: 'partner-fund', name: 'Фонд поддержки спорта', category: 'Спонсоры и партнёры', logo: '' },
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
  phone: '+7 (495) 000-00-00',
  phoneTel: '+74950000000',
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
  siteHeadingFont: 'Golos Text',
  siteBodyFont: 'Golos Text',
  adminFont: 'Inter',
  uppercaseHeadings: false,
};

export const DEFAULT_FOOTER = {
  logoUrl: '/logo.png',
  description: 'Автономная некоммерческая организация. Реализуем программы развития массового и высшего спорта, поддерживаем тренеров и спортивную инфраструктуру регионов.',
  shortName: 'Центр развития спорта',
  ogrn: '1127799014582',
  inn: '7704812390',
  kpp: '770401001',
  okpo: '09834125',
  phone: '+7 (495) 000-00-00',
  email: 'info@centr-razvitiya-sporta.ru',
  workHours: 'Пн–Пт, 09:00–18:00',
  address: 'г. Москва, ул. Спортивная, д. 1, стр. 2',
  copyright: '© 2026 Центр развития спорта. Все права защищены.',
  disclosureNote: 'Информация о деятельности организации раскрывается в разделе «Документы».',
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
    sliderHeight: 'compact' as 'compact' | 'medium' | 'tall' | 'fullscreen',
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
