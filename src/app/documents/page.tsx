'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { DOCUMENTS_DATA } from '@/data/documents';
import { useSiteContent } from '@/lib/content';
import { DocumentItem } from '@/types';
import { 
  FileText, 
  Download, 
  Search, 
  Filter, 
  Calendar, 
  CheckCircle,
  FileCheck
} from 'lucide-react';

function DocumentsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('cat') || 'Все';
  const { content } = useSiteContent();

  const docsList = (content?.documents?.items && content.documents.items.length > 0)
    ? (content.documents.items as DocumentItem[])
    : DOCUMENTS_DATA;

  const [category, setCategory] = useState<string>(initialCategory);
  const [search, setSearch] = useState<string>('');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const categories = [
    'Все',
    'Учредительные документы',
    'Регламенты и стандарты',
    'Методические материалы',
    'Отчетность и протоколы',
  ];

  const filteredDocs = useMemo(() => {
    return docsList.filter((doc) => {
      const matchCat = category === 'Все' || doc.category === category;
      const matchSearch = 
        !search ||
        doc.title.toLowerCase().includes(search.toLowerCase()) ||
        doc.number.toLowerCase().includes(search.toLowerCase()) ||
        (doc.signatory && doc.signatory.toLowerCase().includes(search.toLowerCase()));

      return matchCat && matchSearch;
    });
  }, [category, search]);

  const handleDownload = (doc: DocumentItem) => {
    setDownloadSuccess(doc.title);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 4000);
  };

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Официальные документы и стандарты' }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Header */}
        <div className="border-b border-slate-200 pb-5">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-800">
            Нормативно-правовая база организации
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Электронный депозитарий документов и стандартов АНО «ЦРЗС»
          </h1>
          <p className="mt-2 text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed">
            В разделе размещены учредительные документы, свидетельства Минюста РФ, отраслевые стандарты категорирования трасс, программы подготовки кадров и публичные отчеты о деятельности организации.
          </p>
        </div>

        {/* Download notification alert */}
        {downloadSuccess && (
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-3 rounded-md text-xs flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Инициировано скачивание официальной электронной копии: <strong>«{downloadSuccess}»</strong>
            </span>
          </div>
        )}

        {/* Filter Tabs and Search Bar */}
        <div className="bg-white p-4 rounded-md border border-slate-200 shadow-2xs space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск по названию документа, номеру (например, УСТ-2023, СТО-ЦРЗС)..."
                className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                  category === cat
                    ? 'bg-blue-900 text-white font-semibold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Documents Table/List */}
        <div className="bg-white rounded-md border border-slate-200 overflow-hidden shadow-2xs divide-y divide-slate-100">
          {filteredDocs.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">
              По вашему запросу документов не найдено. Попробуйте выбрать другую категорию.
            </div>
          ) : (
            filteredDocs.map((doc) => (
              <div 
                key={doc.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded bg-red-100 text-red-700 font-bold text-xs flex items-center justify-center shrink-0">
                    PDF
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-blue-900">
                        № {doc.number}
                      </span>
                      <span className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                        {doc.category}
                      </span>
                    </div>

                    <h3 className="font-semibold text-sm text-slate-900 leading-snug">
                      {doc.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 pt-0.5">
                      <span>Дата: {doc.date}</span>
                      <span>•</span>
                      <span>Объем: {doc.fileSize}</span>
                      {doc.signatory && (
                        <>
                          <span>•</span>
                          <span className="text-slate-600">{doc.signatory}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="sm:shrink-0 flex items-center justify-end">
                  <button
                    onClick={() => handleDownload(doc)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-blue-800 hover:text-white text-slate-800 rounded text-xs font-medium transition-colors border border-slate-200"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Скачать PDF</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default function DocumentsPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto p-10 text-center text-sm text-slate-500">Загрузка документов...</div>}>
      <DocumentsContent />
    </Suspense>
  );
}
