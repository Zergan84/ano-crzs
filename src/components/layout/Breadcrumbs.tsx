import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  items: {
    label: string;
    href?: string;
  }[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Хлебные крошки" className="py-3 px-4 sm:px-6 lg:px-8 bg-slate-100/70 border-b border-slate-200 text-xs">
      <div className="max-w-7xl mx-auto flex items-center space-x-2 text-slate-500 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="inline-flex items-center gap-1 hover:text-blue-900 transition-colors">
          <Home className="w-3.5 h-3.5 text-slate-400" />
          <span>Главная</span>
        </Link>
        
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
              {isLast || !item.href ? (
                <span className="text-slate-800 font-medium truncate max-w-xs sm:max-w-md">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-blue-900 transition-colors truncate max-w-xs">
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};
