/**
 * Cloudflare Pages Function Proxy for /api/*
 * Automatically forwards API and media requests from ano-crzs.pages.dev
 * to the Cloudflare Worker backend at ano-crzs.101filmstudio.workers.dev
 */

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const targetUrl = new URL(url.pathname + url.search, 'https://ano-crzs.101filmstudio.workers.dev');

  if (url.pathname === '/api/admin/login' && context.request.method === 'POST') {
    try {
      const body = await context.request.json();
      const login = String(body?.login || '').trim();
      const password = String(body?.password || '').trim();

      if (login.toUpperCase() === 'ADMIN' && password === 'ANO_pass2026') {
        const headers = new Headers(context.request.headers);
        headers.set('Content-Type', 'application/json');

        // Try new password on Worker first, fallback to legacy worker secret if Worker wasn't redeployed
        const primaryReq = new Request(targetUrl, {
          method: 'POST',
          headers,
          body: JSON.stringify({ login: 'ADMIN', password: 'ANO_pass2026' }),
          redirect: 'follow',
        });
        const primaryRes = await fetch(primaryReq);
        if (primaryRes.ok) {
          return primaryRes;
        }

        const fallbackReq = new Request(targetUrl, {
          method: 'POST',
          headers,
          body: JSON.stringify({ login: 'ADMIN', password: 'admin2028' }),
          redirect: 'follow',
        });
        return fetch(fallbackReq);
      }

      return new Response(JSON.stringify({ error: 'Неверный логин или пароль' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch {
      return new Response(JSON.stringify({ error: 'Неверный запрос' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  const forwardRequest = new Request(targetUrl, {
    method: context.request.method,
    headers: context.request.headers,
    body: context.request.body,
    redirect: 'follow',
  });

  return fetch(forwardRequest);
}
