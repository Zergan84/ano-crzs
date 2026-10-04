'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, User, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
      });

      if (res.ok) {
        router.push('/admin');
      } else {
        const data = await res.json();
        setError(data.error || 'Неверный логин или пароль');
      }
    } catch {
      setError('Ошибка подключения к серверу');
    }
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#07090e] px-4 text-slate-100">
      <div className="w-full max-w-md rounded-xl border border-slate-800 bg-[#0d121c] p-8 shadow-2xl">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-red-600/10 border border-red-500/20 text-red-500">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-black tracking-wider text-white">АНО «ЦРЗС»</h1>
          <p className="mt-1 font-mono text-xs uppercase tracking-widest text-slate-400">
            Панель управления сайтом (Cloudflare R2)
          </p>
        </div>

        {/* Error Notice */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-950/40 border border-red-800 p-3 text-center text-xs text-red-300">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="admin-label flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-slate-400" />
              <span>Логин администратора</span>
            </label>
            <input
              type="text"
              required
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="ADMIN"
              className="admin-input"
              autoFocus
            />
          </div>

          <div>
            <label className="admin-label flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-slate-400" />
              <span>Пароль доступа</span>
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="admin-input"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-red-500 disabled:opacity-50 shadow-lg shadow-red-900/20"
          >
            <span>{loading ? 'Проверка...' : 'Войти в панель'}</span>
            {!loading && <ArrowRight className="h-4 w-4" />}
          </button>
        </form>

        <div className="mt-8 border-t border-slate-800/80 pt-4 text-center">
          <p className="text-[11px] text-slate-500">
            Доступ защищен секретами Cloudflare Secrets & токеном сессии
          </p>
        </div>
      </div>
    </div>
  );
}
