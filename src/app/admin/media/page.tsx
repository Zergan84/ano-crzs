'use client';

import React, { useEffect, useState, useCallback } from 'react';
import NextLink from 'next/link';
import { 
  Upload, 
  Trash2, 
  Copy, 
  Check, 
  Search, 
  ArrowLeft, 
  RefreshCw, 
  File, 
  Image as ImageIcon,
  ExternalLink,
  Layers
} from 'lucide-react';

interface MediaItem {
  key: string;
  size: number;
  lastModified: string;
  url: string;
}

export default function AdminMediaPage() {
  const [files, setFiles] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [search, setSearch] = useState('');
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const fetchFiles = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/media');
      if (res.ok) {
        const data = await res.json();
        setFiles(data);
      } else {
        setError('Не удалось загрузить список файлов из R2');
      }
    } catch {
      setError('Ошибка соединения с API');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    setUploading(true);
    setError('');
    setSuccess('');

    try {
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const formData = new FormData();
        formData.set('file', file);

        const res = await fetch('/api/admin/media', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || `Ошибка при загрузке ${file.name}`);
        }
      }
      setSuccess(`Успешно загружено файлов: ${fileList.length}`);
      await fetchFiles();
    } catch (err) {
      setError(String(err));
    }
    setUploading(false);
    e.target.value = '';
  }

  async function handleDelete(key: string) {
    if (!confirm(`Вы действительно хотите удалить файл ${key} из R2?`)) return;

    try {
      const res = await fetch('/api/admin/media', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key }),
      });

      if (res.ok) {
        setFiles((prev) => prev.filter((f) => f.key !== key));
        setSelectedKeys((prev) => {
          const next = new Set(prev);
          next.delete(key);
          return next;
        });
      } else {
        const err = await res.json();
        setError(err.error || 'Ошибка при удалении');
      }
    } catch {
      setError('Ошибка сети при удалении');
    }
  }

  async function handleBulkDelete() {
    if (selectedKeys.size === 0) return;
    if (!confirm(`Удалить выбранные файлы (${selectedKeys.size} шт.) из R2?`)) return;

    for (const key of selectedKeys) {
      try {
        await fetch('/api/admin/media', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key }),
        });
      } catch {}
    }
    setSelectedKeys(new Set());
    await fetchFiles();
  }

  function handleCopy(url: string, key: string) {
    navigator.clipboard.writeText(url);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  }

  const toggleSelect = (key: string) => {
    setSelectedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const filtered = files.filter((f) =>
    f.key.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#222] pb-5">
        <div>
          <NextLink
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Назад к дашборду</span>
          </NextLink>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
            Медиатека Cloudflare R2
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Файлы сохраняются в бакет <code className="text-red-400 font-mono">ano-crzs</code> и доступны по быстрой CDN-ссылке.
          </p>
        </div>

        {/* Upload Action */}
        <div className="flex items-center gap-3">
          <button
            onClick={fetchFiles}
            className="flex items-center gap-2 rounded-lg border border-[#333] bg-[#16191f] px-3 py-2 text-xs text-slate-300 hover:bg-[#222] hover:text-white transition-colors"
            title="Обновить список"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Обновить</span>
          </button>

          <label className="flex items-center gap-2 cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-red-500 transition-colors shadow-lg shadow-red-950/20">
            <Upload className="h-4 w-4" />
            <span>{uploading ? 'Загрузка...' : 'Загрузить файлы'}</span>
            <input
              type="file"
              multiple
              onChange={handleUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="rounded-lg bg-red-950/40 border border-red-800 p-3 text-xs text-red-300">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-lg bg-emerald-950/40 border border-emerald-800 p-3 text-xs text-emerald-300">
          {success}
        </div>
      )}

      {/* Filter and Bulk Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#222] bg-[#12161f] p-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Поиск по имени файла в R2..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="admin-input pl-9 text-xs"
          />
        </div>

        {selectedKeys.size > 0 && (
          <button
            onClick={handleBulkDelete}
            className="flex items-center gap-1.5 rounded bg-red-900/60 border border-red-700 px-3 py-1.5 text-xs font-medium text-red-200 hover:bg-red-800 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Удалить выбранные ({selectedKeys.size})</span>
          </button>
        )}
      </div>

      {/* Grid of Files */}
      {loading ? (
        <div className="flex h-60 items-center justify-center text-slate-500 text-sm">
          Загрузка файлов из Cloudflare R2...
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col h-60 items-center justify-center rounded-xl border border-dashed border-[#222] text-slate-500 text-sm gap-2">
          <ImageIcon className="h-10 w-10 text-slate-600" />
          <p>{search ? 'Файлы не найдены по запросу' : 'В бакете R2 пока нет файлов'}</p>
          <p className="text-xs text-slate-600">Нажмите «Загрузить файлы», чтобы загрузить изображения или документы.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {filtered.map((file) => {
            const isImg = /\.(jpg|jpeg|png|webp|gif|svg|avif)$/i.test(file.key);
            const isSelected = selectedKeys.has(file.key);

            return (
              <div
                key={file.key}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-lg border transition-all ${
                  isSelected ? 'border-red-500 bg-[#1e1518]' : 'border-[#222] bg-[#12161f] hover:border-[#384252]'
                }`}
              >
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleSelect(file.key)}
                  className="absolute left-2 top-2 z-10 h-4 w-4 rounded accent-red-600"
                />

                {/* Preview */}
                <div className="aspect-square w-full bg-[#0a0c10] flex items-center justify-center overflow-hidden">
                  {isImg ? (
                    <img
                      src={file.url}
                      alt={file.key}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-500">
                      <File className="h-10 w-10 mb-1 text-slate-400" />
                      <span className="font-mono text-[10px] uppercase">{file.key.split('.').pop()}</span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-2.5">
                  <p className="truncate text-xs font-medium text-slate-200" title={file.key}>
                    {file.key.split('/').pop()}
                  </p>
                  <p className="mt-0.5 font-mono text-[10px] text-slate-500">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center border-t border-[#1e2430] bg-[#0d1017]">
                  <button
                    onClick={() => handleCopy(file.url, file.key)}
                    className="flex flex-1 items-center justify-center gap-1 py-1.5 text-[11px] text-slate-400 hover:text-white hover:bg-[#1a202c] transition-colors"
                    title="Копировать URL ссылки"
                  >
                    {copiedKey === file.key ? (
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    <span>{copiedKey === file.key ? 'Скопировано' : 'URL'}</span>
                  </button>

                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-[#1a202c] transition-colors"
                    title="Открыть оригинал"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>

                  <button
                    onClick={() => handleDelete(file.key)}
                    className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors"
                    title="Удалить файл"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
