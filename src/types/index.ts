export interface Specialist {
  id: string;
  regNumber: string;
  fullName: string;
  discipline: 'Горнолыжный спорт' | 'Сноуборд' | 'Фристайл' | 'Беговые лыжи' | 'Ски-альпинизм' | 'Инструкторская деятельность';
  qualificationCategory: 'Категория А (Высшая)' | 'Категория B (Первая)' | 'Категория C (Вторая)' | 'Инструктор начального уровня' | 'Спортивный судья I категории' | 'Всероссийская судейская категория';
  sportsRank?: string; // e.g. "Мастер спорта России", "КМС", "МСМК"
  region: string;
  certDate: string;
  validUntil: string;
  status: 'Действителен' | 'На продлении' | 'Архив';
  workplace?: string;
  photoUrl?: string;
}

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string[];
  date: string;
  category: 'Официально' | 'Мероприятия' | 'Образование' | 'Стандарты' | 'Регионы';
  isImportant?: boolean;
  pressReleaseNumber?: string;
  source?: string;
}

export interface EventItem {
  id: string;
  title: string;
  type: 'Всероссийский семинар' | 'Квалификационный курс' | 'Конференция' | 'Судейский сбор' | 'Мастер-класс';
  discipline: string;
  startDate: string;
  endDate: string;
  location: string;
  region: string;
  status: 'Открыта регистрация' | 'Идет прием заявок' | 'Завершено' | 'Регистрация закрыта';
  targetAudience: string;
  organizer: string;
  documentRef?: string;
  seatsTotal?: number;
  seatsLeft?: number;
}

export interface DocumentItem {
  id: string;
  title: string;
  number: string;
  date: string;
  category: 'Учредительные документы' | 'Регламенты и стандарты' | 'Методические материалы' | 'Отчетность и протоколы';
  format: 'PDF' | 'DOCX';
  fileSize: string;
  downloadUrl: string;
  signatory?: string;
}

export interface CourseItem {
  id: string;
  code: string;
  title: string;
  level: string;
  hours: number;
  format: 'Очно-заочный' | 'Очный практикум' | 'Дистанционный теоретический';
  targetGroup: string;
  curriculum: string[];
  certification: string;
  nextCohortDate: string;
}

export interface StructureMember {
  id: string;
  name: string;
  position: string;
  role: 'Правление' | 'Экспертный совет' | 'Методическая комиссия' | 'Ревизионная комиссия';
  bio: string;
  achievements?: string;
}
