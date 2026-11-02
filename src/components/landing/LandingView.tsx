'use client';

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Cpu,
  Compass,
  GraduationCap,
  Wrench,
  Trophy,
  Building2,
  FileText,
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Copy,
  Check,
  Menu,
  X,
  Download,
  Scale,
  Users,
  Sparkles,
  Landmark,
  Award,
  HeartHandshake,
  Medal,
  Waves,
  BarChart3,
  TrendingUp,
} from 'lucide-react';
import { useSiteContent, resolveMediaUrl } from '@/lib/content';
import { ORGANIZATION } from '@/data/organization';
import { DEFAULT_LANDING, DEFAULT_FOOTER, DEFAULT_SETTINGS } from '@/data/defaultContent';
import { HeroSlider } from '@/components/HeroSlider';
import { TricolorLandingView } from './TricolorLandingView';
import { ColorTintedLogo } from '@/components/ui/ColorTintedLogo';

const BOLT_NAV_LINKS = [
  { label: 'О центре', href: '#about' },
  { label: 'Проекты', href: '#projects' },
  { label: 'Новости', href: '#news' },
  { label: 'Документы', href: '#documents' },
  { label: 'Партнёры', href: '#partners' },
  { label: 'Контакты', href: '#contacts' },
];

const BOLT_ABOUT_BULLETS = [
  'Доступный спорт для детей, подростков и взрослых в каждом регионе',
  'Подготовка тренеров и инструкторов по современным методикам',
  'Поддержка перспективных спортсменов на пути к высшим достижениям',
  'Прозрачная работа: открытые отчёты, документы и финансирование',
];

const BOLT_PROJECTS = [
  {
    title: 'Спорт для всех',
    description: 'Бесплатные секции для детей и подростков в школах и на дворовых площадках.',
    category: 'Массовый спорт',
    icon: Users,
  },
  {
    title: 'Здоровое поколение',
    description: 'Программа физической активности для детей с ограниченными возможностями здоровья.',
    category: 'Социальный проект',
    icon: HeartHandshake,
  },
  {
    title: 'Юные таланты',
    description: 'Отбор и подготовка перспективных спортсменов совместно с федерациями.',
    category: 'Спорт высших достижений',
    icon: Trophy,
  },
  {
    title: 'Тренеры будущего',
    description: 'Повышение квалификации и переподготовка тренеров и инструкторов по всей стране.',
    category: 'Образование',
    icon: GraduationCap,
  },
  {
    title: 'Активный регион',
    description: 'Строительство и модернизация спортивных площадок в небольших городах.',
    category: 'Инфраструктура',
    icon: Landmark,
  },
  {
    title: 'Семейный спорт',
    description: 'Фестивали и соревнования для всей семьи в парках и на набережных.',
    category: 'События',
    icon: Medal,
  },
];

const BOLT_NEWS = [
  {
    date: '12 октября 2026',
    category: 'Пресс-релиз',
    title: 'Открыт приём заявок на грантовую программу 2027 года',
    excerpt:
      'Некоммерческие организации и спортивные клубы могут подать заявки на финансирование проектов до 30 ноября.',
  },
  {
    date: '28 сентября 2026',
    category: 'Новости',
    title: 'Программа «Спорт для всех» охватила более 10 000 школьников',
    excerpt:
      'Бесплатные секции работают уже в 18 регионах. Расписание и адреса площадок доступны на сайте.',
  },
  {
    date: '15 сентября 2026',
    category: 'Партнёрство',
    title: 'Подписано соглашение о сотрудничестве с региональной федерацией',
    excerpt:
      'Стороны объединят усилия в подготовке тренеров и развитии детского спорта в регионе.',
  },
  {
    date: '02 сентября 2026',
    category: 'Событие',
    title: 'Стартовал новый сезон бесплатных спортивных секций',
    excerpt:
      'Запись открыта во всех регионах присутствия центра. Занятия проходят под руководством сертифицированных тренеров.',
  },
  {
    date: '20 августа 2026',
    category: 'Отчёт',
    title: 'Опубликован ежегодный отчёт о деятельности за 2025 год',
    excerpt:
      'В отчёте представлены результаты проектов, структура расходов и показатели социального эффекта.',
  },
  {
    date: '05 августа 2026',
    category: 'Пресс-релиз',
    title: 'Центр стал оператором федеральной программы в сфере массового спорта',
    excerpt:
      'Организация будет координировать реализацию программы в восьми субъектах Российской Федерации.',
  },
];

const BOLT_NEWS_BADGE_MAP: Record<string, string> = {
  'Пресс-релиз': 'bg-[#EEF3F9] text-[#13325A]',
  Новости: 'bg-[#E9F7F6] text-[#0B6160]',
  Партнёрство: 'bg-[#FDF8E8] text-[#8C6410]',
  Событие: 'bg-[#ECF8F0] text-[#17663A]',
  Отчёт: 'bg-[#FDF5E6] text-[#8A5A14]',
};

const BOLT_DOC_CATEGORIES = ['Все', 'Учредительные', 'Отчётность', 'Положения'];

const BOLT_DOCUMENTS = [
  {
    title: 'Устав автономной некоммерческой организации',
    category: 'Учредительные',
    year: '2016',
    icon: FileText,
  },
  {
    title: 'Свидетельство о государственной регистрации',
    category: 'Учредительные',
    year: '2016',
    icon: ShieldCheck,
  },
  {
    title: 'Годовой отчёт о деятельности за 2025 год',
    category: 'Отчётность',
    year: '2026',
    icon: BarChart3,
  },
  {
    title: 'Отчёт об использовании средств грантов за 2025 год',
    category: 'Отчётность',
    year: '2026',
    icon: BarChart3,
  },
  {
    title: 'Положение о закупках',
    category: 'Положения',
    year: '2024',
    icon: FileText,
  },
  {
    title: 'Положение о попечительском совете',
    category: 'Положения',
    year: '2023',
    icon: FileText,
  },
];

const BOLT_PARTNER_GROUPS = [
  {
    title: 'Министерства и ведомства',
    icon: Landmark,
    members: [
      'Министерство спорта',
      'Министерство образования',
      'Министерство экономического развития',
    ],
  },
  {
    title: 'Федерации',
    icon: Medal,
    members: ['Федерация лёгкой атлетики', 'Федерация плавания', 'Федерация гимнастики'],
  },
  {
    title: 'Спонсоры и партнёры',
    icon: HeartHandshake,
    members: ['Региональный банк', 'Строительная группа', 'Фонд поддержки спорта'],
  },
];

const BOLT_PARTNERSHIP_ITEMS = [
  {
    title: 'Гранты и субсидии',
    text: 'Участие в конкурсах грантовых программ и совместное финансирование проектов.',
    icon: Landmark,
  },
  {
    title: 'Совместные программы',
    text: 'Разработка проектов с учётом целей вашей организации и задач региона.',
    icon: Waves,
  },
  {
    title: 'Открытая отчётность',
    text: 'Прозрачное использование средств и регулярные публичные отчёты по каждому проекту.',
    icon: FileText,
  },
  {
    title: 'Социальный эффект',
    text: 'Измеримые результаты: число участников, построенные площадки, подготовленные тренеры.',
    icon: TrendingUp,
  },
];

function BoltForm({
  submitLabel,
  messageLabel,
  messagePlaceholder,
}: {
  submitLabel: string;
  messageLabel: string;
  messagePlaceholder: string;
}) {
  const [fields, setFields] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const updateField = (key: keyof typeof fields, val: string) => {
    setFields((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErr: Record<string, string> = {};
    if (!fields.name.trim()) nextErr.name = 'Укажите имя';
    if (!fields.email.trim()) {
      nextErr.email = 'Укажите электронную почту';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
      nextErr.email = 'Проверьте формат почты, например name@mail.ru';
    }
    if (!fields.message.trim()) {
      nextErr.message = 'Расскажите, чем можем быть полезны';
    }
    setErrors(nextErr);
    if (Object.keys(nextErr).length > 0) return;
    setStatus('submitting');
    setTimeout(() => {
      setFields({ name: '', email: '', phone: '', organization: '', message: '' });
      setStatus('success');
    }, 350);
  };

  if (status === 'success') {
    return (
      <div
        role="status"
        className="bolt-keep-bg flex h-full flex-col items-center justify-center rounded-2xl bg-white p-10 text-center shadow-[0_2px_4px_rgba(7,26,51,0.06),0_20px_40px_-16px_rgba(7,26,51,0.25)]"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ECF8F0] text-[#1F8A4C]">
          <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
        </span>
        <h3 className="mt-6 text-2xl font-bold text-[#071A33]">Заявка отправлена</h3>
        <p className="mt-3 max-w-sm text-slate-600">
          Спасибо! Мы получили обращение и свяжемся с вами по указанной почте в ближайшее время.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-8 rounded-full border border-slate-300 px-6 py-2.5 text-sm font-semibold text-[#0C2444] transition-colors hover:bg-slate-50"
        >
          Отправить ещё одно обращение
        </button>
      </div>
    );
  }

  const inputBase =
    'mt-2 w-full rounded-lg border bg-white px-4 py-3 text-[#071A33] placeholder:text-slate-400 transition-colors focus:border-[#0F7B7A] focus:outline-none focus:ring-4 focus:ring-[#0F7B7A]/15';

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bolt-keep-bg rounded-2xl bg-white p-6 shadow-[0_2px_4px_rgba(7,26,51,0.06),0_20px_40px_-16px_rgba(7,26,51,0.25)] sm:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-[#0C2444]">
            Имя и фамилия <span className="text-red-500">*</span>
          </span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            value={fields.name}
            onChange={(e) => updateField('name', e.target.value)}
            className={`${inputBase} ${errors.name ? 'border-red-500' : 'border-slate-200'}`}
            maxLength={200}
            aria-invalid={!!errors.name}
          />
          {errors.name && <span className="mt-2 block text-sm text-red-500">{errors.name}</span>}
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-[#0C2444]">
            Электронная почта <span className="text-red-500">*</span>
          </span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            value={fields.email}
            onChange={(e) => updateField('email', e.target.value)}
            className={`${inputBase} ${errors.email ? 'border-red-500' : 'border-slate-200'}`}
            maxLength={320}
            aria-invalid={!!errors.email}
          />
          {errors.email && <span className="mt-2 block text-sm text-red-500">{errors.email}</span>}
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-[#0C2444]">Телефон</span>
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            value={fields.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            className={`${inputBase} border-slate-200`}
            maxLength={40}
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-[#0C2444]">Организация</span>
          <input
            type="text"
            name="organization"
            autoComplete="organization"
            value={fields.organization}
            onChange={(e) => updateField('organization', e.target.value)}
            className={`${inputBase} border-slate-200`}
            maxLength={300}
          />
        </label>
      </div>

      <div className="mt-5">
        <label className="block">
          <span className="text-sm font-semibold text-[#0C2444]">
            {messageLabel} <span className="text-red-500">*</span>
          </span>
          <textarea
            name="message"
            rows={5}
            value={fields.message}
            onChange={(e) => updateField('message', e.target.value)}
            placeholder={messagePlaceholder}
            className={`${inputBase} resize-y ${
              errors.message ? 'border-red-500' : 'border-slate-200'
            }`}
            aria-invalid={!!errors.message}
          />
          {errors.message && (
            <span className="mt-2 block text-sm text-red-500">{errors.message}</span>
          )}
        </label>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-500">
          Поля, отмеченные звёздочкой, обязательны для заполнения.
        </p>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#071A33] px-7 py-3.5 text-base font-semibold text-white shadow-md transition-all hover:bg-[#0C2444] disabled:cursor-not-allowed disabled:opacity-70"
        >
          <span>{submitLabel}</span>
          <Send
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </button>
      </div>
    </form>
  );
}

export function LandingView() {
  const { content } = useSiteContent();

  const org = content?.organization || ORGANIZATION;
  const landing = content?.landing || DEFAULT_LANDING;
  const header = landing.header || DEFAULT_LANDING.header;
  const ideology = landing.ideology || DEFAULT_LANDING.ideology;
  const footer = content?.footer || DEFAULT_FOOTER;
  const settings = content?.settings || DEFAULT_SETTINGS;
  const documents = content?.documents?.items || [];
  const partners = content?.partners?.items || [];

  const activeThemeId =
    content?.themes?.activeThemeId ||
    content?.settings?.activeThemeId ||
    'tricolor';
  const activeTheme =
    (content?.themes?.items || []).find((t: any) => t.id === activeThemeId) || null;
  const isBoltStyle = activeThemeId === 'bolt-style';
  const isTricolor = activeThemeId === 'tricolor';

  const boltAboutImg =
    activeTheme?.aboutImage ||
    'https://discover.moscow/media/images/DSC00979_1-min.min-1920x1920.webp';

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [docCategoryFilter, setDocCategoryFilter] = useState<string>('Все');
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [copiedRequisites, setCopiedRequisites] = useState(false);

  // Official Appeal Form state (for Basic light & other themes)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'Сотрудничество и партнерство',
    message: '',
    consent152FZ: false,
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!partnerModalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPartnerModalOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [partnerModalOpen]);

  const handleCopyRequisites = () => {
    const bank = org.bankRequisites || ORGANIZATION.bankRequisites;
    const text = [
      `Полное наименование: ${org.fullName}`,
      `Сокращенное наименование: ${org.shortName} (${(org as any).shortNameEn || 'ANO «CWST»'})`,
      `ОГРН: ${org.ogrn}`,
      `ИНН / КПП: ${org.inn} / ${org.kpp}`,
      `ОКПО: ${org.okpo}`,
      `Юридический адрес: ${org.legalAddress}`,
      `Банк: ${bank?.bankName || ''}`,
      `БИК: ${bank?.bik || ''}`,
      `Р/с: ${bank?.checkingAccount || ''}`,
      `К/с: ${bank?.correspondentAccount || ''}`,
    ].join('\n');
    navigator.clipboard.writeText(text);
    setCopiedRequisites(true);
    setTimeout(() => setCopiedRequisites(false), 3000);
  };

  const handleAppealSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent152FZ) return;
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setTicketNumber(`ЦЗСТ-2026/${randomNum}`);
    setFormSubmitted(true);
  };

  const getDirectionIcon = (dir: any, idx: number) => {
    const iconName = (dir.icon || '').toLowerCase();
    if (iconName.includes('trophy') || idx === 0) return <Trophy className="w-5 h-5" />;
    if (iconName.includes('cpu') || idx === 1) return <Cpu className="w-5 h-5" />;
    if (iconName.includes('compass') || idx === 2) return <Compass className="w-5 h-5" />;
    if (iconName.includes('graduation') || idx === 3) return <GraduationCap className="w-5 h-5" />;
    if (iconName.includes('wrench') || idx === 4) return <Wrench className="w-5 h-5" />;
    return <ShieldCheck className="w-5 h-5" />;
  };

  const principles =
    Array.isArray((org as any).principles) && (org as any).principles.length > 0
      ? (org as any).principles
      : ORGANIZATION.principles;

  const directions =
    Array.isArray(org.directions) && org.directions.length > 0
      ? org.directions
      : ORGANIZATION.directions;

  const newsItems =
    Array.isArray(content?.news?.items) && content.news.items.length > 0
      ? content.news.items.map((n: any, idx: number) => ({
          id: n.id || `news-${idx}`,
          date: n.date || '',
          category: n.category || 'Новости',
          title: n.title || '',
          excerpt: n.excerpt || n.summary || (Array.isArray(n.content) ? n.content[0] : n.content) || '',
        }))
      : BOLT_NEWS;

  const rawDocs =
    Array.isArray(documents) && documents.length > 0 ? documents : BOLT_DOCUMENTS;
  const mappedDocs = rawDocs.map((d: any, idx: number) => {
    const cat = d.category || 'Учредительные';
    const yr =
      d.year ||
      (d.date && String(d.date).match(/\d{4}/)?.[0]) ||
      d.date ||
      '2026';
    let DocIcon: any = FileText;
    if (cat.toLowerCase().includes('отчёт') || cat.toLowerCase().includes('отчет')) {
      DocIcon = BarChart3;
    } else if (String(d.title || '').toLowerCase().includes('свидетельство')) {
      DocIcon = ShieldCheck;
    }
    return {
      id: d.id || `doc-${idx}`,
      title: d.title || 'Документ',
      category: cat,
      year: yr,
      fileUrl: d.fileUrl || '#',
      icon: DocIcon,
    };
  });

  // =========================================================================
  // 1-IN-1 TRICOLOR STYLE RENDERING (exact match to state-sports-showcase.lovable.app, fully editable via Admin)
  // =========================================================================
  if (isTricolor) {
    return (
      <TricolorLandingView
        header={header}
        org={org}
        directions={directions}
        principles={principles}
        newsItems={newsItems}
        docItems={mappedDocs}
        partnerItems={partners}
        ideology={ideology}
        footer={footer}
        activeTheme={activeTheme}
        scrolled={scrolled}
      />
    );
  }

  // =========================================================================
  // 1-IN-1 BOLT STYLE RENDERING (exact match to sports-development-c-z4rl.bolt.host, fully editable via Admin)
  // =========================================================================
  if (isBoltStyle) {
    const boltNavLinks =
      Array.isArray(header.navLinks) && header.navLinks.length > 0
        ? header.navLinks
        : BOLT_NAV_LINKS;

    const boltLogoUrl = resolveMediaUrl((header as any).logoUrl) || '/logo.png';
    const boltLogoColor = (header as any)?.logoColor || '';
    const boltLogoOpacity = (header as any)?.logoOpacity;
    const boltHeaderCtaText = header.ctaText || 'Стать партнёром';
    const boltHeaderCtaHref = header.ctaHref || '#partnership';

    const aboutEyebrow = (org as any).aboutEyebrow || 'О центре';
    const aboutTitle = (org as any).aboutTitle || 'Миссия: спорт доступен каждому';
    const aboutDescription =
      org.tagline ||
      org.missionRole ||
      'Центр развития спорта создан для того, чтобы физическая культура стала частью жизни каждого человека, а регионы получили устойчивую систему подготовки спортсменов и тренеров.';

    const aboutBullets: string[] =
      Array.isArray(principles) && principles.length > 0
        ? principles.map((p: any) => p.title || p.description || '').filter(Boolean)
        : BOLT_ABOUT_BULLETS;

    const aboutImgUrl =
      resolveMediaUrl((org as any).aboutImage) ||
      boltAboutImg ||
      'https://discover.moscow/media/images/DSC00979_1-min.min-1920x1920.webp';

    const projectsEyebrow = (org as any).projectsEyebrow || 'Проекты и программы';
    const projectsTitle =
      (org as any).projectsTitle || 'Спортивные и социальные проекты центра';
    const projectsSubtitle =
      (org as any).projectsSubtitle ||
      'Каждый проект направлен на конкретный результат: больше участников, лучшая инфраструктура и подготовленные кадры.';

    const projectIconList = [Users, HeartHandshake, Trophy, GraduationCap, Landmark, Medal];
    const boltProjects =
      Array.isArray(directions) && directions.length > 0
        ? directions.map((dir: any, idx: number) => {
            const icName = String(dir.icon || '').toLowerCase();
            let IconComp: any = projectIconList[idx % projectIconList.length];
            if (icName.includes('users')) IconComp = Users;
            else if (icName.includes('heart')) IconComp = HeartHandshake;
            else if (icName.includes('trophy')) IconComp = Trophy;
            else if (icName.includes('grad')) IconComp = GraduationCap;
            else if (icName.includes('landmark') || icName.includes('building'))
              IconComp = Landmark;
            else if (icName.includes('medal') || icName.includes('award')) IconComp = Medal;
            return {
              id: dir.id || `proj-${idx}`,
              title: dir.title || BOLT_PROJECTS[idx]?.title || 'Проект',
              description:
                dir.description || BOLT_PROJECTS[idx]?.description || '',
              category:
                dir.category ||
                dir.topics?.[0] ||
                BOLT_PROJECTS[idx]?.category ||
                'Программа',
              icon: IconComp,
            };
          })
        : BOLT_PROJECTS;

    const newsItems =
      Array.isArray(content?.news?.items) && content.news.items.length > 0
        ? content.news.items.map((n: any, idx: number) => ({
            id: n.id || `news-${idx}`,
            date: n.date || '',
            category: n.category || 'Новости',
            title: n.title || '',
            excerpt: n.excerpt || n.summary || (Array.isArray(n.content) ? n.content[0] : n.content) || '',
          }))
        : BOLT_NEWS;

    const rawDocs =
      Array.isArray(documents) && documents.length > 0 ? documents : BOLT_DOCUMENTS;
    const mappedDocs = rawDocs.map((d: any, idx: number) => {
      const cat = d.category || 'Учредительные';
      const yr =
        d.year ||
        (d.date && String(d.date).match(/\d{4}/)?.[0]) ||
        d.date ||
        '2026';
      let DocIcon: any = FileText;
      if (cat.toLowerCase().includes('отчёт') || cat.toLowerCase().includes('отчет')) {
        DocIcon = BarChart3;
      } else if (String(d.title || '').toLowerCase().includes('свидетельство')) {
        DocIcon = ShieldCheck;
      }
      return {
        id: d.id || `doc-${idx}`,
        title: d.title || 'Документ',
        category: cat,
        year: yr,
        fileUrl: d.fileUrl || (d.downloadUrl && d.downloadUrl !== '#' ? d.downloadUrl : ''),
        icon: DocIcon,
      };
    });

    const dynamicDocCategories = [
      'Все',
      ...Array.from(new Set(mappedDocs.map((d: any) => d.category).filter(Boolean))),
    ];
    const docTabs =
      dynamicDocCategories.length > 1 ? dynamicDocCategories : BOLT_DOC_CATEGORIES;

    const filteredBoltDocs =
      docCategoryFilter === 'Все'
        ? mappedDocs
        : mappedDocs.filter((d: any) => d.category === docCategoryFilter);

    // Group partners by category
    const partnerGroupIcons = [Landmark, Medal, HeartHandshake];
    const boltPartnerGroups = (() => {
      if (!Array.isArray(partners) || partners.length === 0) {
        return BOLT_PARTNER_GROUPS;
      }
      const groupMap = new Map<string, string[]>();
      partners.forEach((p: any) => {
        const cat = p.category || 'Спонсоры и партнёры';
        if (!groupMap.has(cat)) groupMap.set(cat, []);
        if (p.name) groupMap.get(cat)!.push(p.name);
      });
      return Array.from(groupMap.entries()).map(([title, members], idx) => ({
        title,
        icon: partnerGroupIcons[idx % partnerGroupIcons.length],
        members,
      }));
    })();

    const partnershipIconList = [Landmark, Waves, FileText, TrendingUp];
    const partnershipItems =
      Array.isArray(ideology.govBlocks) && ideology.govBlocks.length > 0
        ? ideology.govBlocks.map((b: any, idx: number) => ({
            title: b.title || BOLT_PARTNERSHIP_ITEMS[idx]?.title || '',
            text: b.desc || BOLT_PARTNERSHIP_ITEMS[idx]?.text || '',
            icon: partnershipIconList[idx % partnershipIconList.length],
          }))
        : BOLT_PARTNERSHIP_ITEMS;

    const partnershipBadge = ideology.govBadge || 'Сотрудничество';
    const partnershipTitle = ideology.govTitle || 'Станьте партнёром центра';
    const partnershipSubtitle =
      ideology.govSubtitle ||
      'Спонсорство, гранты и совместные проекты. Расскажите о своей организации, и мы предложим формат участия.';
    const partnershipCtaText =
      (ideology as any).govCtaText || 'Оставить заявку на партнёрство';
    const partnershipModalTitle =
      (ideology as any).govModalTitle || 'Заявка на партнёрство';

    const contactsEyebrow = (org as any).contactsEyebrow || 'Контакты';
    const contactsTitle = (org as any).contactsTitle || 'Свяжитесь с нами';
    const contactsSubtitle =
      (org as any).contactsSubtitle ||
      'Ответим на вопросы о программах, документах и формах сотрудничества.';

    const footerLogoUrl = resolveMediaUrl((footer as any).logoUrl) || boltLogoUrl;

    return (
      <div className="min-h-screen bg-white text-[#475569]">
        {/* 1. HEADER (Lp) */}
        <header
          className={`bolt-header fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
            scrolled
              ? 'bg-[#071A33]/95 shadow-lg shadow-[#071A33]/20 backdrop-blur-md'
              : 'bg-[#071A33]/80 backdrop-blur-sm'
          }`}
        >
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-6 lg:px-8">
            <a
              href="#top"
              className="flex shrink-0 items-center"
              aria-label={`${header.logoTitle || 'Центр развития спорта'}, на главную`}
            >
              <ColorTintedLogo
                src={boltLogoUrl}
                alt={header.logoTitle || 'Центр развития спорта'}
                color={boltLogoColor}
                opacity={boltLogoOpacity}
                className="h-9 w-auto sm:h-10 transition-all"
              />
            </a>

            <nav aria-label="Основная навигация" className="hidden items-center gap-1 lg:flex">
              {boltNavLinks.map((item: any) => (
                <a
                  key={item.href + item.label}
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm text-[#D9E4F0] transition-colors hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="hidden items-center lg:flex">
              <a
                href={boltHeaderCtaHref}
                className="group inline-flex items-center gap-2 rounded-full bg-[#E8B93E] px-5 py-2.5 text-sm font-semibold text-[#071A33] shadow-sm transition-all hover:bg-[#F0CF6A] hover:shadow-md"
              >
                <span>{boltHeaderCtaText}</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10 lg:hidden"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {mobileMenuOpen && (
            <div id="mobile-menu" className="border-t border-white/10 bg-[#071A33] lg:hidden">
              <nav
                aria-label="Мобильная навигация"
                className="mx-auto flex max-w-7xl flex-col px-6 py-4"
              >
                {boltNavLinks.map((item: any) => (
                  <a
                    key={item.href + item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-md px-3 py-3 text-base text-[#D9E4F0] transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href={boltHeaderCtaHref}
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-[#E8B93E] px-5 py-3 text-sm font-semibold text-[#071A33]"
                >
                  <span>{boltHeaderCtaText}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </nav>
            </div>
          )}
        </header>

        <main>
          {/* 2. HERO (Dp — 100% width and 100% viewport height min-h-screen) */}
          <div id="hero">
            <HeroSlider />
          </div>

          {/* 3. ABOUT (#about — zp) */}
          <section id="about" className="scroll-mt-20 bg-white py-20 sm:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
                <div>
                  <div className="max-w-2xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0F7B7A]">
                      {aboutEyebrow}
                    </p>
                    <h2 className="mt-3 text-3xl font-bold text-[#071A33] sm:text-4xl">
                      {aboutTitle}
                    </h2>
                    <p className="mt-4 text-base text-slate-600 sm:text-lg">
                      {aboutDescription}
                    </p>
                  </div>

                  <ul className="mt-8 space-y-4">
                    {aboutBullets.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-700">
                        <CheckCircle2
                          className="mt-0.5 h-5 w-5 shrink-0 text-[#0F7B7A]"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <img
                  src={aboutImgUrl}
                  alt={aboutTitle}
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-2xl object-cover shadow-[0_2px_4px_rgba(7,26,51,0.06),0_20px_40px_-16px_rgba(7,26,51,0.25)]"
                />
              </div>
            </div>
          </section>

          {/* 4. PROJECTS (#projects — Fp) */}
          <section id="projects" className="scroll-mt-20 bg-[#F8FAFC] py-20 sm:py-24">
            <div id="directions" className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0F7B7A]">
                  {projectsEyebrow}
                </p>
                <h2 className="mt-3 text-3xl font-bold text-[#071A33] sm:text-4xl">
                  {projectsTitle}
                </h2>
                <p className="mt-4 text-base text-slate-600 sm:text-lg">
                  {projectsSubtitle}
                </p>
              </div>

              <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {boltProjects.map((proj: any, idx: number) => {
                  const IconComp = proj.icon;
                  return (
                    <article
                      key={proj.id || idx}
                      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_1px_2px_rgba(7,26,51,0.04),0_8px_24px_-12px_rgba(7,26,51,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0F7B7A]/40 hover:shadow-[0_2px_4px_rgba(7,26,51,0.06),0_20px_40px_-16px_rgba(7,26,51,0.25)]"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#071A33] text-[#F0CF6A] transition-colors group-hover:bg-[#0B6160]">
                          <IconComp className="h-6 w-6" aria-hidden="true" />
                        </span>
                        <span className="rounded-full bg-[#E9F7F6] px-3 py-1 text-xs font-semibold text-[#0B6160]">
                          {proj.category}
                        </span>
                      </div>
                      <h3 className="mt-6 text-xl font-bold text-[#071A33]">{proj.title}</h3>
                      <p className="mt-3 flex-1 text-slate-600">{proj.description}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          {/* 5. NEWS (#news — Wp) */}
          <section id="news" className="scroll-mt-20 bg-white py-20 sm:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0F7B7A]">
                  Новости
                </p>
                <h2 className="mt-3 text-3xl font-bold text-[#071A33] sm:text-4xl">
                  Лента новостей и пресс-релизов
                </h2>
              </div>

              <ul className="mt-12 flex flex-col divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-[#F8FAFC]">
                {newsItems.map((item: any, idx: number) => (
                  <li
                    key={item.id || idx}
                    className="group flex flex-col gap-3 px-6 py-7 transition-colors hover:bg-white sm:px-8"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          BOLT_NEWS_BADGE_MAP[item.category] || 'bg-[#EEF3F9] text-[#13325A]'
                        }`}
                      >
                        {item.category}
                      </span>
                      <time className="text-sm text-slate-500">{item.date}</time>
                    </div>
                    <h3 className="text-xl font-bold text-[#071A33] transition-colors group-hover:text-[#0B6160]">
                      {item.title}
                    </h3>
                    <p className="text-slate-600">{item.excerpt}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 6. DOCUMENTS (#documents — Hp) */}
          {settings.showDocumentsOnLanding !== false && (
            <section id="documents" className="scroll-mt-20 bg-[#F8FAFC] py-20 sm:py-24">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="max-w-2xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0F7B7A]">
                    Документы и отчёты
                  </p>
                  <h2 className="mt-3 text-3xl font-bold text-[#071A33] sm:text-4xl">
                    Открытость в каждой детали
                  </h2>
                  <p className="mt-4 text-base text-slate-600 sm:text-lg">
                    Устав, отчётность и внутренние положения центра. Все документы доступны для ознакомления.
                  </p>
                </div>

                <div
                  role="tablist"
                  aria-label="Категории документов"
                  className="mt-10 flex flex-wrap gap-2"
                >
                  {docTabs.map((cat) => {
                    const active = cat === docCategoryFilter;
                    return (
                      <button
                        key={cat}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setDocCategoryFilter(cat)}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                          active
                            ? 'bg-[#071A33] text-white'
                            : 'bg-white text-[#13325A] ring-1 ring-inset ring-slate-200 hover:bg-[#EEF3F9]'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>

                <ul className="mt-8 grid gap-4 md:grid-cols-2">
                  {filteredBoltDocs.map((doc: any, idx: number) => {
                    const DocIcon = doc.icon;
                    const resolvedUrl = doc.fileUrl ? resolveMediaUrl(doc.fileUrl) : '';
                    const inner = (
                      <>
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#EEF3F9] text-[#13325A]">
                          <DocIcon className="h-6 w-6" aria-hidden="true" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-bold text-[#071A33]">{doc.title}</h3>
                          <p className="mt-1 flex flex-wrap items-center gap-x-3 text-sm text-slate-500">
                            <span>{doc.category}</span>
                            <span aria-hidden="true">•</span>
                            <span>{doc.year}</span>
                          </p>
                        </div>
                        <span className="hidden rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 sm:inline-flex">
                          PDF
                        </span>
                      </>
                    );

                    return (
                      <li
                        key={doc.id || idx}
                        className="bolt-keep-bg rounded-xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(7,26,51,0.04),0_8px_24px_-12px_rgba(7,26,51,0.12)] transition-all duration-300 hover:border-[#0F7B7A]/40 hover:shadow-[0_2px_4px_rgba(7,26,51,0.06),0_20px_40px_-16px_rgba(7,26,51,0.25)]"
                      >
                        {resolvedUrl ? (
                          <a
                            href={resolvedUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-5"
                          >
                            {inner}
                          </a>
                        ) : (
                          <div className="flex items-center gap-4 p-5">{inner}</div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </section>
          )}

          {/* 7. PARTNERS (#partners — Vp) */}
          {settings.showPartnersOnLanding !== false && (
            <section id="partners" className="scroll-mt-20 bg-white py-20 sm:py-24">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="max-w-2xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0F7B7A]">
                    Партнёры
                  </p>
                  <h2 className="mt-3 text-3xl font-bold text-[#071A33] sm:text-4xl">
                    Министерства, федерации и спонсоры
                  </h2>
                  <p className="mt-4 text-base text-slate-600 sm:text-lg">
                    Мы работаем с органами власти, спортивными федерациями и бизнесом, чтобы программы доходили до каждого региона.
                  </p>
                </div>

                <div className="mt-14 grid gap-6 lg:grid-cols-3">
                  {boltPartnerGroups.map((group) => {
                    const GroupIcon = group.icon;
                    return (
                      <div
                        key={group.title}
                        className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-8"
                      >
                        <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#071A33] text-[#F0CF6A]">
                          <GroupIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <h3 className="mt-5 text-lg font-bold text-[#071A33]">{group.title}</h3>
                        <ul className="mt-5 divide-y divide-slate-200">
                          {group.members.map((member) => (
                            <li key={member} className="py-3 text-slate-700">
                              {member}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* 8. PARTNERSHIP (#partnership — ev) */}
          <section id="partnership" className="scroll-mt-20 bg-[#071A33] py-20 sm:py-24">
            <div id="gov-support" className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F0CF6A]">
                  {partnershipBadge}
                </p>
                <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                  {partnershipTitle}
                </h2>
                <p className="mt-4 text-base text-[#D9E4F0] sm:text-lg">
                  {partnershipSubtitle}
                </p>
              </div>

              <ul className="mt-14 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                {partnershipItems.map((item: any, idx: number) => {
                  const ItemIcon = item.icon;
                  return (
                    <li key={item.title || idx} className="flex items-start gap-5 px-6 py-6 sm:px-8">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[#F0CF6A]">
                        <ItemIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-bold text-white">{item.title}</h3>
                        <p className="mt-1.5 leading-relaxed text-[#B3C9E0]">{item.text}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-12 flex justify-center">
                <button
                  type="button"
                  onClick={() => setPartnerModalOpen(true)}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#E8B93E] px-8 py-3.5 text-base font-semibold text-[#071A33] shadow-lg shadow-black/20 transition-all hover:-translate-y-0.5 hover:bg-[#F0CF6A]"
                >
                  <span>{partnershipCtaText}</span>
                  <ArrowRight
                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>

            {partnerModalOpen && (
              <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
                <div
                  className="absolute inset-0 bg-[#071A33]/70 backdrop-blur-sm"
                  onClick={() => setPartnerModalOpen(false)}
                  aria-hidden="true"
                />
                <div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="modal-title"
                  className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-[#F8FAFC] shadow-2xl"
                >
                  <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-slate-200 bg-[#F8FAFC] px-6 py-5 sm:px-8">
                    <h2 id="modal-title" className="text-xl font-bold text-[#071A33]">
                      {partnershipModalTitle}
                    </h2>
                    <button
                      type="button"
                      onClick={() => setPartnerModalOpen(false)}
                      aria-label="Закрыть окно"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-200 hover:text-[#071A33]"
                    >
                      <X className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="p-4 sm:p-8">
                    <BoltForm
                      submitLabel="Отправить заявку"
                      messageLabel="Опишите предложение о сотрудничестве"
                      messagePlaceholder="Формат участия, сроки, регион и цели совместного проекта"
                    />
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* 9. CONTACTS (#contacts — tv) */}
          <section id="contacts" className="scroll-mt-20 bg-[#F8FAFC] py-20 sm:py-24">
            <div id="appeal-form" className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0F7B7A]">
                  {contactsEyebrow}
                </p>
                <h2 className="mt-3 text-3xl font-bold text-[#071A33] sm:text-4xl">
                  {contactsTitle}
                </h2>
                <p className="mt-4 text-base text-slate-600 sm:text-lg">
                  {contactsSubtitle}
                </p>
              </div>

              <div className="mt-14">
                <BoltForm
                  submitLabel={(org as any).contactsFormSubmitLabel || 'Отправить обращение'}
                  messageLabel={(org as any).contactsFormMessageLabel || 'Ваш вопрос или обращение'}
                  messagePlaceholder={
                    (org as any).contactsFormMessagePlaceholder || 'Опишите, что вас интересует'
                  }
                />
              </div>
            </div>
          </section>
        </main>

        {/* 10. FOOTER ($p) */}
        <footer className="bg-[#071A33] text-[#B3C9E0]">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
            <div>
              <img
                src={footerLogoUrl}
                alt={footer.shortName || 'Центр развития спорта'}
                className="h-10 w-auto"
              />
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-[#7EA3C9]">
                {footer.description ||
                  'Автономная некоммерческая организация. Реализуем программы развития массового и высшего спорта, поддерживаем тренеров и спортивную инфраструктуру регионов.'}
              </p>
            </div>

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">
                Разделы
              </h2>
              <ul className="mt-5 grid grid-cols-2 gap-3 text-sm">
                {boltNavLinks.map((link: any) => (
                  <li key={link.href + link.label}>
                    <a href={link.href} className="transition-colors hover:text-white">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">
                Контакты
              </h2>
              <ul className="mt-5 space-y-3 text-sm">
                <li className="whitespace-pre-line">{footer.address || org.legalAddress || 'г. Москва, ул. Спортивная, д. 1, стр. 2'}</li>
                <li>
                  <a
                    href={`tel:${(footer.phone || org.phone || '+7 (495) 000-00-00').replace(/[^+\d]/g, '')}`}
                    className="transition-colors hover:text-white"
                  >
                    {footer.phone || org.phone || '+7 (495) 000-00-00'}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${footer.email || org.receptionEmail || 'info@centr-razvitiya-sporta.ru'}`}
                    className="transition-colors hover:text-white"
                  >
                    {footer.email || org.receptionEmail || 'info@centr-razvitiya-sporta.ru'}
                  </a>
                </li>
                <li>{footer.workHours || org.workHours || 'Пн–Пт, 09:00–18:00'}</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10">
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-xs text-[#7EA3C9] sm:flex-row sm:items-center sm:justify-between lg:px-8">
              <p>{footer.copyright || '© 2026 Центр развития спорта. Все права защищены.'}</p>
              <p>
                {(footer as any).disclosureNote ||
                  'Информация о деятельности организации раскрывается в разделе «Документы».'}
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // =========================================================================
  // BASIC LIGHT & OTHER THEMES RENDERING (100% preserved)
  // =========================================================================
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#1E293B] selection:bg-amber-500/20 selection:text-[#0F172A]">
      {/* 4.1. ШАПКА (HEADER) */}
      <header className="sticky top-0 z-50 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E2E8F0]">
        <div className="bg-[#0F172A] text-slate-300 text-[11px] border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-orange-600 to-amber-400" />
              <span className="font-medium text-slate-200">
                Официальный информационный ресурс некоммерческой организации РФ
              </span>
              <span className="hidden md:inline text-slate-500">|</span>
              <span className="hidden md:inline text-slate-400">
                {org.legalAddress || 'РФ, Московская обл., Красногорск г.о., п. Архангельское'}
              </span>
            </div>
            <div className="flex items-center gap-4 font-mono text-[11px]">
              <a
                href={`tel:${(org.phone || '+7 (495) 789-34-20').replace(/[^0-9+]/g, '')}`}
                className="text-slate-300 hover:text-amber-400 transition-colors"
              >
                {org.phone || '+7 (495) 789-34-20'}
              </a>
              <span className="text-slate-600">•</span>
              <a
                href={`mailto:${org.receptionEmail || 'info@ano-czst.ru'}`}
                className="text-slate-300 hover:text-amber-400 transition-colors hidden sm:inline"
              >
                {org.receptionEmail || 'info@ano-czst.ru'}
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <a href="#hero" className="flex items-center gap-3.5 group min-w-0">
            <div className="w-11 h-11 rounded-lg bg-[#0F172A] border border-slate-800 flex items-center justify-center p-2 shrink-0 shadow-2xs">
              <img
                src="/logo_sign.png"
                alt="Эмблема АНО «ЦЗСТ»"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-extrabold tracking-tight text-[#0F172A] group-hover:text-orange-700 transition-colors">
                  {header.logoTitle || 'АНО «ЦЗСТ»'}
                </span>
                <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#F8F9FA] border border-[#E2E8F0] text-[#334155]">
                  ANO «CWST»
                </span>
              </div>
              <span className="text-[11px] sm:text-xs text-[#334155] leading-tight truncate max-w-[240px] sm:max-w-[360px] lg:max-w-[420px]">
                {header.logoSubtitle || 'Центр развития зимнего спорта, спортивных технологий и туризма'}
              </span>
            </div>
          </a>

          <nav aria-label="Основная навигация" className="hidden xl:flex items-center gap-1">
            {(header.navLinks || DEFAULT_LANDING.header.navLinks).map((link: any, idx: number) => (
              <a
                key={idx}
                href={link.href}
                className="px-3 py-2 rounded-md text-xs font-semibold text-[#1E293B] hover:text-orange-700 hover:bg-[#F8F9FA] transition-colors whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href={header.ctaHref || '#appeal-form'}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 shadow-xs transition-all"
            >
              <span>{header.ctaText || 'Обращение / Партнёрство'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg border border-[#E2E8F0] text-[#1E293B] hover:bg-[#F8F9FA]"
            aria-label="Меню навигации"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#FFFFFF] border-t border-[#E2E8F0] px-4 pt-3 pb-5 space-y-2 shadow-lg">
            {(header.navLinks || DEFAULT_LANDING.header.navLinks).map((link: any, idx: number) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-md text-sm font-semibold text-[#1E293B] hover:bg-[#F8F9FA] hover:text-orange-700"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-[#E2E8F0]">
              <a
                href={header.ctaHref || '#appeal-form'}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-orange-600 to-amber-500"
              >
                <span>{header.ctaText || 'Обращение / Партнёрство'}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        <div id="hero">
          <HeroSlider />
        </div>

        {/* 4.3. О ЦЕНТРЕ И МИССИИ */}
        <section id="about" className="py-16 lg:py-20 bg-[#FFFFFF] border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-700">
                <span className="w-6 h-0.5 bg-gradient-to-r from-orange-600 to-amber-500" />
                <span>Уставные цели и идеология</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                О Центре и миссии АНО «ЦЗСТ»
              </h2>
              <p className="text-sm sm:text-base text-[#334155] leading-relaxed">
                {(org as any).missionRole ||
                  'Платформа системного взаимодействия между государственными институтами, профессиональным тренерским сообществом, экспертами спортивной биомеханики и гражданами Российской Федерации.'}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-5 bg-[#F8F9FA] rounded-xl p-6 sm:p-8 border border-[#E2E8F0] flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-orange-600 to-amber-500 text-white flex items-center justify-center shadow-xs">
                    <Scale className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] leading-snug">
                    Системность и методология в основе развития спорта
                  </h3>
                  <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                    {(org as any).ideologyStatement ||
                      'Спорт рассматривается как системная культура развития личности, воспитания дисциплины и национального потенциала, а не досугово-развлекательная услуга.'}
                  </p>
                  <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                    Деятельность Автономной некоммерческой организации «Центр развития зимнего спорта, современных спортивных технологий и туризма» направлена на содействие реализации государственных и социально значимых программ в сфере физической культуры, детско-юношеского спорта и внутреннего горнолыжного туризма.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E2E8F0] space-y-2 text-xs text-[#1E293B]">
                  <div className="font-bold uppercase tracking-wider text-[11px] text-[#334155]">
                    Полное наименование по Уставу:
                  </div>
                  <div className="font-medium leading-relaxed bg-[#FFFFFF] p-3 rounded-lg border border-[#E2E8F0]">
                    {org.fullName}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {principles.map((item: any, idx: number) => (
                  <article
                    key={item.id || idx}
                    className="bg-[#FFFFFF] rounded-xl p-6 border border-[#E2E8F0] hover:border-slate-300 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#0F172A] text-amber-400 font-mono text-xs font-bold">
                          0{idx + 1}
                        </span>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                          Принцип Устава
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-[#0F172A] leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] font-semibold text-orange-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                      <span>Методический стандарт АНО «ЦЗСТ»</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4.4. КЛЮЧЕВЫЕ НАПРАВЛЕНИЯ */}
        <section id="directions" className="py-16 lg:py-20 bg-[#F8F9FA] border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E2E8F0] pb-6">
              <div className="space-y-2 max-w-3xl">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-700">
                  <span className="w-6 h-0.5 bg-gradient-to-r from-orange-600 to-amber-500" />
                  <span>Профильная компетенция</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                  Ключевые направления деятельности
                </h2>
                <p className="text-sm text-[#334155]">
                  Комплексная реализация программ развития зимних видов спорта, инженерно-технического сопровождения и подготовки профильных специалистов
                </p>
              </div>
              <a
                href="#appeal-form"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#FFFFFF] border border-[#CBD5E1] text-xs font-bold text-[#0F172A] hover:border-orange-500 transition-colors shrink-0 self-start md:self-auto"
              >
                <span>Запросить методическую программу</span>
                <ArrowRight className="w-3.5 h-3.5 text-orange-600" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {directions.map((dir: any, idx: number) => (
                <article
                  key={dir.id || idx}
                  className="bg-[#FFFFFF] rounded-xl p-6 border border-[#E2E8F0] hover:border-orange-500/50 transition-all flex flex-col justify-between shadow-2xs"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-600/10 to-amber-500/15 border border-orange-500/20 text-orange-700 flex items-center justify-center">
                        {getDirectionIcon(dir, idx)}
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-400">
                        0{idx + 1}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#0F172A] leading-snug">
                      {dir.title}
                    </h3>

                    <p className="mt-2.5 text-xs sm:text-sm text-[#334155] leading-relaxed">
                      {dir.description}
                    </p>
                  </div>

                  {Array.isArray(dir.topics) && dir.topics.length > 0 && (
                    <div className="mt-5 pt-4 border-t border-[#E2E8F0]">
                      <ul className="space-y-1.5">
                        {dir.topics.map((t: string, tIdx: number) => (
                          <li
                            key={tIdx}
                            className="text-xs text-[#334155] flex items-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 shrink-0" />
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* РАЗДЕЛ 2. МЕТОДОЛОГИЯ */}
        <section id="methodology" className="py-16 lg:py-20 bg-[#FFFFFF] border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="rounded-2xl bg-[#0F172A] text-white p-6 sm:p-10 border border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-400" />
              <div className="space-y-6 relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                  <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
                    <Sparkles className="w-4 h-4" />
                    <span>{ideology.formulaBadge || 'Формула системной эффективности АНО «ЦЗСТ»'}</span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    ГОСТ-ориентированный методический стандарт
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
                  {(ideology.formulaItems || DEFAULT_LANDING.ideology.formulaItems).map(
                    (factor: string, idx: number, arr: string[]) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="flex-1 rounded-xl bg-slate-900 border border-slate-800 p-4">
                          <div className="text-[11px] font-mono text-amber-400 mb-1">
                            Компонент 0{idx + 1}
                          </div>
                          <div className="text-sm sm:text-base font-bold text-white leading-snug">
                            {factor}
                          </div>
                        </div>
                        {idx < arr.length - 1 && (
                          <span className="hidden lg:inline-block text-xl font-black text-amber-500 select-none">
                            ×
                          </span>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="max-w-3xl space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-700">
                  <span className="w-6 h-0.5 bg-gradient-to-r from-orange-600 to-amber-500" />
                  <span>Научно-практическая платформа</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                  {ideology.methodologyTitle ||
                    'Методология, стандарты кадров и спортивные технологии'}
                </h2>
                <p className="text-sm sm:text-base text-[#334155] leading-relaxed">
                  {ideology.methodologyLead}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(ideology.pillars || DEFAULT_LANDING.ideology.pillars).map(
                  (pillar: any, idx: number) => (
                    <div
                      key={idx}
                      className="rounded-xl bg-[#F8F9FA] p-6 border border-[#E2E8F0] flex items-start gap-4"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#0F172A] text-amber-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                        {pillar.code || `0${idx + 1}`}
                      </div>
                      <div className="space-y-1.5">
                        <h3 className="text-base font-bold text-[#0F172A]">{pillar.title}</h3>
                        <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                          {pillar.desc}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 4.5. ВЗАИМОДЕЙСТВИЕ И ГОСПОДДЕРЖКА */}
        <section id="gov-support" className="py-16 lg:py-20 bg-[#F8F9FA] border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="max-w-3xl space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-700">
                <span className="w-6 h-0.5 bg-gradient-to-r from-orange-600 to-amber-500" />
                <span>{ideology.govBadge || 'Партнёрам, курортам и профильным ведомствам'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                {ideology.govTitle || 'Взаимодействие и государственная поддержка'}
              </h2>
              <p className="text-sm sm:text-base text-[#334155] leading-relaxed">
                {ideology.govSubtitle ||
                  'Блок для региональных министерств спорта, спортивных федераций, горнолыжных курортов и грантовых операторов.'}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {(ideology.govBlocks || DEFAULT_LANDING.ideology.govBlocks).map(
                (block: any, idx: number) => (
                  <article
                    key={idx}
                    className="bg-[#FFFFFF] rounded-xl p-6 border border-[#E2E8F0] flex flex-col justify-between shadow-2xs"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded text-[11px] font-mono font-bold bg-[#0F172A] text-amber-400">
                          Контур взаимодействия 0{idx + 1}
                        </span>
                        <Building2 className="w-4 h-4 text-slate-400" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-[#0F172A] leading-snug pt-1">
                        {block.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                        {block.desc}
                      </p>
                    </div>

                    {Array.isArray(block.bullets) && block.bullets.length > 0 && (
                      <div className="mt-6 pt-4 border-t border-[#E2E8F0] space-y-2">
                        {block.bullets.map((b: string, bIdx: number) => (
                          <div
                            key={bIdx}
                            className="flex items-start gap-2 text-xs text-[#1E293B]"
                          >
                            <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </article>
                )
              )}
            </div>

            {settings.showDocumentsOnLanding !== false && documents.length > 0 && (
              <div id="documents" className="pt-6">
                <div className="bg-[#FFFFFF] rounded-xl border border-[#E2E8F0] p-6 sm:p-8 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2E8F0] pb-4">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-orange-700">
                        Нормативно-правовая и уставная документация
                      </span>
                      <h3 className="text-lg font-bold text-[#0F172A] mt-0.5">
                        Учредительные документы, регламенты и стандарты АНО «ЦЗСТ»
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-[#334155]">
                      Официальный депозитарий
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {documents.slice(0, 4).map((doc: any) => (
                      <div
                        key={doc.id}
                        className="p-4 rounded-lg border border-[#E2E8F0] bg-[#F8F9FA] flex items-start justify-between gap-3"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded bg-[#0F172A] text-amber-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                            PDF
                          </div>
                          <div>
                            <h4 className="text-xs sm:text-sm font-bold text-[#0F172A] leading-snug">
                              {doc.title}
                            </h4>
                            <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-[#334155]">
                              <span className="font-mono">
                                {doc.number || doc.documentNumber || 'Уставный документ'}
                              </span>
                              <span>•</span>
                              <span>{doc.date}</span>
                              {doc.fileSize && (
                                <>
                                  <span>•</span>
                                  <span>{doc.fileSize}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        {doc.fileUrl && (
                          <a
                            href={resolveMediaUrl(doc.fileUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded border border-[#E2E8F0] bg-[#FFFFFF] text-[#1E293B] hover:text-orange-700 shrink-0"
                            title="Скачать документ"
                          >
                            <Download className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {settings.showPartnersOnLanding !== false && partners.length > 0 && (
              <div id="partners" className="pt-2">
                <div className="bg-[#FFFFFF] rounded-xl border border-[#E2E8F0] p-6 sm:p-8 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2E8F0] pb-4">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-orange-700">
                        Межведомственное и отраслевое взаимодействие
                      </span>
                      <h3 className="text-lg font-bold text-[#0F172A] mt-0.5">
                        Партнёры, спортивные комплексы и профильные организации
                      </h3>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {partners.map((p: any, idx: number) => (
                      <div
                        key={p.id || idx}
                        className="p-3 rounded-lg border border-[#E2E8F0] bg-[#F8F9FA] flex flex-col items-center justify-center text-center gap-2"
                      >
                        {p.logo && (
                          <div className="h-10 flex items-center justify-center">
                            <img
                              src={resolveMediaUrl(p.logo)}
                              alt={p.name}
                              className="max-h-8 max-w-[110px] object-contain"
                            />
                          </div>
                        )}
                        <div>
                          <div className="text-xs font-bold text-[#0F172A] truncate max-w-[140px]">
                            {p.name}
                          </div>
                          <div className="text-[10px] text-[#334155] truncate max-w-[140px]">
                            {p.category}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 4.6. ФОРМА ОБРАЩЕНИЯ И КОНТАКТЫ */}
        <section id="appeal-form" className="py-16 lg:py-20 bg-[#FFFFFF]">
          <div id="contacts" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-7 bg-[#F8F9FA] rounded-xl p-6 sm:p-8 border border-[#E2E8F0]">
                <div className="border-b border-[#E2E8F0] pb-4 mb-6">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-700">
                    <span className="w-6 h-0.5 bg-gradient-to-r from-orange-600 to-amber-500" />
                    <span>Электронная приёмная АНО «ЦЗСТ»</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] mt-1">
                    Официальное обращение / Проектное предложение
                  </h2>
                  <p className="text-xs sm:text-sm text-[#334155] mt-1">
                    Форма направления запросов для граждан, спортивных организаций, курортов и профильных ведомств
                  </p>
                </div>

                {formSubmitted ? (
                  <div className="bg-[#FFFFFF] rounded-xl p-8 border border-[#E2E8F0] text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-500">
                        Регистрационный номер входящего обращения: {ticketNumber}
                      </span>
                      <h3 className="text-lg font-bold text-[#0F172A]">
                        Ваше обращение официально зарегистрировано
                      </h3>
                      <p className="text-xs sm:text-sm text-[#334155] max-w-md mx-auto leading-relaxed">
                        Специалисты профильного департамента АНО «ЦЗСТ» рассмотрят ваш запрос и направят ответ по указанным контактным данным.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          category: 'Сотрудничество и партнерство',
                          message: '',
                          consent152FZ: false,
                        });
                      }}
                      className="px-5 py-2.5 rounded-lg bg-[#0F172A] text-white text-xs font-bold hover:bg-slate-800 transition-colors"
                    >
                      Направить новое обращение
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleAppealSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
                        ФИО заявителя / Наименование организации <span className="text-orange-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Например: Иванов И.И. / Министерство физической культуры и спорта"
                        className="w-full px-3.5 py-2.5 text-sm bg-[#FFFFFF] border border-[#CBD5E1] rounded-lg text-[#0F172A] focus:outline-none focus:border-orange-600"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
                          Электронная почта (Email) <span className="text-orange-600">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="official@organization.ru"
                          className="w-full px-3.5 py-2.5 text-sm bg-[#FFFFFF] border border-[#CBD5E1] rounded-lg text-[#0F172A] focus:outline-none focus:border-orange-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
                          Контактный телефон <span className="text-orange-600">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+7 (___) ___-__-__"
                          className="w-full px-3.5 py-2.5 text-sm bg-[#FFFFFF] border border-[#CBD5E1] rounded-lg text-[#0F172A] focus:outline-none focus:border-orange-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
                        Категория запроса <span className="text-orange-600">*</span>
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm bg-[#FFFFFF] border border-[#CBD5E1] rounded-lg text-[#0F172A] focus:outline-none focus:border-orange-600"
                      >
                        <option value="Сотрудничество и партнерство">
                          Сотрудничество и партнерство
                        </option>
                        <option value="Участие в программах">Участие в программах</option>
                        <option value="Экспертно-методический запрос">
                          Экспертно-методический запрос
                        </option>
                        <option value="Иное">Иное</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
                        Текст официального обращения <span className="text-orange-600">*</span>
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Изложите суть предложения, тему экспертного запроса или формат участия в программах Центра..."
                        className="w-full px-3.5 py-2.5 text-sm bg-[#FFFFFF] border border-[#CBD5E1] rounded-lg text-[#0F172A] focus:outline-none focus:border-orange-600"
                      />
                    </div>

                    <div className="pt-1">
                      <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#334155] leading-relaxed">
                        <input
                          type="checkbox"
                          required
                          checked={formData.consent152FZ}
                          onChange={(e) =>
                            setFormData({ ...formData, consent152FZ: e.target.checked })
                          }
                          className="mt-0.5 rounded border-slate-300 accent-orange-600"
                        />
                        <span>
                          Даю согласие на обработку персональных данных в соответствии с Федеральным законом РФ от 27.07.2006 № 152-ФЗ «О персональных данных» и{' '}
                          <button
                            type="button"
                            onClick={() => setPrivacyModalOpen(true)}
                            className="underline font-semibold text-[#0F172A] hover:text-orange-700"
                          >
                            Политикой обработки персональных данных АНО «ЦЗСТ»
                          </button>
                          .
                        </span>
                      </label>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 shadow-sm transition-all"
                      >
                        <Send className="w-4 h-4" />
                        <span>Отправить официальное обращение</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div className="bg-[#FFFFFF] rounded-xl p-6 sm:p-7 border border-[#E2E8F0] space-y-5">
                  <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-orange-700">
                        Официальные сведения
                      </span>
                      <h3 className="text-lg font-bold text-[#0F172A]">
                        Контакты и реквизиты АНО «ЦЗСТ»
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyRequisites}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F8F9FA] hover:bg-slate-100 border border-[#E2E8F0] text-xs font-semibold text-[#1E293B] transition-colors"
                    >
                      {copiedRequisites ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Скопировано</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>Реквизиты</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="space-y-3.5 text-xs sm:text-sm">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-orange-600 shrink-0 mt-1" />
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Юридический адрес и местонахождение
                        </div>
                        <div className="font-semibold text-[#0F172A] mt-0.5">
                          {org.legalAddress ||
                            'РФ, Московская обл., Красногорск г.о., п. Архангельское'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-4 h-4 text-orange-600 shrink-0 mt-1" />
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Телефон приёмной
                        </div>
                        <a
                          href={`tel:${(org.phone || '+7 (495) 789-34-20').replace(/[^0-9+]/g, '')}`}
                          className="font-semibold text-[#0F172A] hover:text-orange-700 transition-colors mt-0.5 block"
                        >
                          {org.phone || '+7 (495) 789-34-20'}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="w-4 h-4 text-orange-600 shrink-0 mt-1" />
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Электронная почта для официальной корреспонденции
                        </div>
                        <a
                          href={`mailto:${org.receptionEmail || 'info@ano-czst.ru'}`}
                          className="font-mono font-semibold text-[#0F172A] hover:text-orange-700 transition-colors mt-0.5 block"
                        >
                          {org.receptionEmail || 'info@ano-czst.ru'}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-orange-600 shrink-0 mt-1" />
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Режим работы приёмной
                        </div>
                        <div className="text-[#1E293B] mt-0.5">
                          {org.workHours || 'Пн–Пт: 09:00 — 18:00 (МСК)'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E2E8F0] grid grid-cols-2 gap-3 text-xs bg-[#F8F9FA] p-4 rounded-lg">
                    <div>
                      <span className="text-slate-400 block text-[11px]">ОГРН:</span>
                      <span className="font-mono font-bold text-[#0F172A]">{org.ogrn}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">ИНН / КПП:</span>
                      <span className="font-mono font-bold text-[#0F172A]">
                        {org.inn} / {org.kpp}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">ОКПО:</span>
                      <span className="font-mono font-bold text-[#0F172A]">{org.okpo}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Краткое наименование:</span>
                      <span className="font-bold text-[#0F172A]">АНО «ЦЗСТ» (ANO «CWST»)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 4.7. ПОДВАЛ */}
      <footer className="bg-[#0F172A] text-slate-300 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
            <div className="md:col-span-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-700 p-2 flex items-center justify-center shrink-0">
                  <img
                    src="/logo_sign.png"
                    alt="АНО «ЦЗСТ»"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="text-base font-extrabold text-white tracking-wide">
                    АНО «ЦЗСТ» <span className="text-slate-400 font-mono text-xs font-normal">(ANO «CWST»)</span>
                  </div>
                  <div className="text-[11px] text-amber-400 font-mono uppercase tracking-wider">
                    Автономная некоммерческая организация
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                Автономная некоммерческая организация «ЦЕНТР РАЗВИТИЯ ЗИМНЕГО СПОРТА, СОВРЕМЕННЫХ СПОРТИВНЫХ ТЕХНОЛОГИЙ И ТУРИЗМА»
              </p>

              <div className="text-xs text-slate-400 space-y-1 font-mono">
                <p>
                  Юридический адрес:{' '}
                  <span className="text-slate-200 font-sans whitespace-pre-line">
                    {footer.address || 'РФ, Московская обл., Красногорск г.о., п. Архангельское'}
                  </span>
                </p>
                <p>
                  ОГРН: <span className="text-slate-200">{footer.ogrn || org.ogrn}</span> • ИНН:{' '}
                  <span className="text-slate-200">{footer.inn || org.inn}</span> • КПП:{' '}
                  <span className="text-slate-200">{footer.kpp || org.kpp}</span>
                </p>
              </div>
            </div>

            <div className="md:col-span-3 space-y-3 text-xs">
              <h3 className="text-white font-bold uppercase tracking-wider text-[11px]">
                Разделы лендинга
              </h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    О Центре и уставные цели
                  </a>
                </li>
                <li>
                  <a href="#directions" className="hover:text-white transition-colors">
                    Ключевые направления деятельности
                  </a>
                </li>
                <li>
                  <a href="#methodology" className="hover:text-white transition-colors">
                    Методология и биомеханика
                  </a>
                </li>
                <li>
                  <a href="#gov-support" className="hover:text-white transition-colors">
                    Взаимодействие с ведомствами
                  </a>
                </li>
                <li>
                  <a href="#appeal-form" className="hover:text-white transition-colors">
                    Направить официальное обращение
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-3 space-y-3 text-xs">
              <h3 className="text-white font-bold uppercase tracking-wider text-[11px]">
                Контактная информация
              </h3>
              <div className="space-y-2 text-slate-300">
                <p>
                  Тел.:{' '}
                  <a
                    href={`tel:${(footer.phone || org.phone).replace(/[^0-9+]/g, '')}`}
                    className="hover:text-amber-400 transition-colors font-mono"
                  >
                    {footer.phone || org.phone}
                  </a>
                </p>
                <p>
                  Email:{' '}
                  <a
                    href={`mailto:${footer.email || org.receptionEmail}`}
                    className="hover:text-amber-400 transition-colors font-mono"
                  >
                    {footer.email || org.receptionEmail}
                  </a>
                </p>
                <p className="text-slate-400">{footer.workHours || org.workHours}</p>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div>
              © 2026 Автономная некоммерческая организация «ЦЗСТ» (ANO «CWST»). Все права защищены.
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => setPrivacyModalOpen(true)}
                className="hover:text-white underline transition-colors"
              >
                Политика обработки персональных данных (152-ФЗ РФ)
              </button>
            </div>
          </div>
        </div>
      </footer>

      {privacyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-[#FFFFFF] text-[#1E293B] rounded-xl max-w-2xl w-full max-h-[85vh] flex flex-col border border-[#E2E8F0] shadow-2xl overflow-hidden">
            <div className="px-6 py-4 bg-[#0F172A] text-white flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-bold">
                Политика обработки персональных данных (152-ФЗ РФ)
              </h3>
              <button
                type="button"
                onClick={() => setPrivacyModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-3 text-xs sm:text-sm text-[#334155] leading-relaxed">
              <p className="font-semibold text-[#0F172A]">1. Общие положения</p>
              <p>
                Настоящая Политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных» и определяет порядок обработки и меры по обеспечению безопасности персональных данных, предпринимаемые Автономной некоммерческой организацией «ЦЕНТР РАЗВИТИЯ ЗИМНЕГО СПОРТА, СОВРЕМЕННЫХ СПОРТИВНЫХ ТЕХНОЛОГИЙ И ТУРИЗМА» (АНО «ЦЗСТ», ОГРН {org.ogrn}, ИНН {org.inn}, адрес: {org.legalAddress}).
              </p>
              <p className="font-semibold text-[#0F172A]">
                2. Цели сбора и обработки персональных данных
              </p>
              <p>
                Персональные данные граждан и представителей организаций (ФИО, наименование организации, телефон, адрес электронной почты и текст обращения), передаваемые через форму официального обращения на сайте АНО «ЦЗСТ», обрабатываются исключительно в целях регистрации, рассмотрения обращений, экспертно-методического взаимодействия и направления официального ответа заявителю.
              </p>
              <p className="font-semibold text-[#0F172A]">
                3. Правовые основания и конфиденциальность
              </p>
              <p>
                Обработка осуществляется с согласия субъекта персональных данных. АНО «ЦЗСТ» обеспечивает сохранность персональных данных и принимает все необходимые правовые, организационные и технические меры для защиты персональных данных от неправомерного или случайного доступа.
              </p>
            </div>
            <div className="px-6 py-3 bg-[#F8F9FA] border-t border-[#E2E8F0] flex justify-end">
              <button
                type="button"
                onClick={() => setPrivacyModalOpen(false)}
                className="px-5 py-2 rounded-lg bg-[#0F172A] text-white text-xs font-bold hover:bg-slate-800"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
