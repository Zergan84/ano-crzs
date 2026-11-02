import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Award, 
  HeartHandshake, 
  Medal, 
  Compass, 
  Trophy, 
  Users, 
  Activity, 
  Zap, 
  Flame, 
  Mountain 
} from 'lucide-react';

export interface WidgetItem {
  id: string;
  title: string;
  subtitle: string;
  icon?: string;
}

interface WidgetsBarProps {
  widgets?: WidgetItem[];
  theme?: 'tricolor' | 'bolt' | 'light';
}

const ICON_MAP: Record<string, React.ElementType> = {
  mountain: Mountain,
  activity: Activity,
  zap: Zap,
  users: Users,
  shield: ShieldCheck,
  sparkles: Sparkles,
  award: Award,
  heart: HeartHandshake,
  medal: Medal,
  trophy: Trophy,
  compass: Compass,
  flame: Flame,
};

export const DEFAULT_WIDGETS: WidgetItem[] = [
  { id: 'w-1', title: 'Зимний спорт', subtitle: 'Наш приоритет', icon: 'mountain' },
  { id: 'w-2', title: 'Здоровье', subtitle: 'Активная жизнь', icon: 'activity' },
  { id: 'w-3', title: 'Инновации', subtitle: 'Современные технологии', icon: 'zap' },
  { id: 'w-4', title: 'Сообщество', subtitle: 'Объединяем людей', icon: 'users' },
];

export function WidgetsBar({ widgets, theme = 'tricolor' }: WidgetsBarProps) {
  const items = Array.isArray(widgets) && widgets.length >= 3 ? widgets.slice(0, 5) : DEFAULT_WIDGETS;

  return (
    <section 
      id="widgets" 
      aria-label="Ключевые преимущества и направления" 
      className="relative z-20 border-y border-[#E2E8F0] bg-white shadow-sm"
    >
      <div className="mx-auto max-w-7xl px-5 py-6 md:px-6 md:py-8">
        <div 
          className={`grid gap-6 sm:grid-cols-2 ${
            items.length === 3 
              ? 'lg:grid-cols-3' 
              : items.length === 5 
              ? 'lg:grid-cols-5' 
              : 'lg:grid-cols-4'
          }`}
        >
          {items.map((item, idx) => {
            const Icon = (item.icon && ICON_MAP[item.icon.toLowerCase()]) || [Mountain, Activity, Zap, Users, Trophy][idx % 5];

            return (
              <div 
                key={item.id || idx} 
                className="flex items-center gap-4 rounded-xl border border-slate-100 bg-[#F8FAFC] p-4 transition-all hover:border-[#1447E6]/40 hover:bg-white hover:shadow-md group"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0F2147] text-white shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:bg-[#1447E6]">
                  <Icon className="h-6 w-6 stroke-[2.2]" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-[#0F2147] leading-snug group-hover:text-[#1447E6] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#606E85] leading-tight mt-0.5 font-medium">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
