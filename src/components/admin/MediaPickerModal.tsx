'use client';

import React, { useState, useEffect } from 'react';
import { Upload, X, Check, Image as ImageIcon, Search } from 'lucide-react';

interface MediaItem {
  key: string;
  size: number;
  lastModified: string;
  url: string;
}

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

export const MediaPickerModal: React.FC<MediaPickerModalProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const [files, setFiles] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchFiles();
    }
  }, [isOpen]);

  async function fetchFiles() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/media');
      if (res.ok) {
        setFiles(await res.json());
      } else {
        setError('Не удалось загрузить медиафайлы');
      }
    } catch {
      setError('Ошибка соединения');
    }
    setLoading(false);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.set('file', file);
      const res = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        await fetchFiles();
        if (data.url) {
          onSelect(data.url);
          onClose();
        }
      } else {
        const err = await res.json();
        setError(err.error || 'Ошибка загрузки');
      }
    } catch (err) {
      setError('Ошибка загрузки: ' + String(err));
    }
    setUploading(false);
  }

  if (!isOpen) return null;

  const filtered = files.filter((f) =>
    f.key.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs">
      <div className="flex h-[80vh] w-full max-w-4xl flex-col rounded-lg border border-[#2a2a2a] bg-[#111] text-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#2a2a2a] p-4">
          <div className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-red-500" />
            <h3 className="font-bold text-base tracking-wide">Медиатека Cloudflare R2</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1 text-slate-400 hover:bg-[#222] hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2a2a2a] p-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Поиск по имени файла..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded bg-[#1c1c1c] border border-[#333] pl-9 pr-3 py-1.5 text-sm text-white focus:border-red-500 focus:outline-none"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer rounded bg-red-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-red-500 transition-colors">
            <Upload className="h-4 w-4" />
            <span>{uploading ? 'Загрузка...' : 'Загрузить в R2'}</span>
            <input
              type="file"
              accept="image/*,.pdf,.doc,.docx"
              onChange={handleUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-950/50 border-b border-red-800 p-2 text-xs text-red-300 text-center">
            {error}
          </div>
        )}

        {/* Grid / List */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="flex h-40 items-center justify-center text-slate-500 text-sm">
              Загрузка файлов из R2...
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col h-40 items-center justify-center text-slate-500 text-sm gap-2">
              <p>{search ? 'Ничего не найдено' : 'В бакете R2 пока нет файлов.'}</p>
              <p className="text-xs text-slate-600">Нажмите «Загрузить в R2», чтобы добавить файл.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {filtered.map((file) => {
                const isImg = /\.(jpg|jpeg|png|webp|gif|svg|avif)$/i.test(file.key);
                return (
                  <div
                    key={file.key}
                    onClick={() => {
                      onSelect(file.url);
                      onClose();
                    }}
                    className="group relative cursor-pointer overflow-hidden rounded border border-[#262626] bg-[#181818] transition-all hover:border-red-500 hover:scale-[1.02]"
                  >
                    <div className="aspect-square w-full bg-[#141414] flex items-center justify-center overflow-hidden">
                      {isImg ? (
                        <img
                          src={file.url}
                          alt={file.key}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center p-2 text-center text-slate-400">
                          <ImageIcon className="h-8 w-8 mb-1 text-slate-500" />
                          <span className="text-[10px] uppercase font-mono">
                            {file.key.split('.').pop()}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-2">
                      <p className="truncate text-xs text-slate-300" title={file.key}>
                        {file.key.split('/').pop()}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="rounded bg-red-600 px-3 py-1 text-xs font-bold text-white shadow">
                        Выбрать
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
