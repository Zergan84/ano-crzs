/**
 * Cloudflare Pages middleware.
 *
 * Сайт собирается как статический экспорт Next.js, поэтому в HTML на этапе сборки
 * «запекается» контент по умолчанию (DEFAULT_CONTENT). Чтобы при открытии страницы
 * не мелькал старый слайдер / тексты, этот middleware на лету встраивает в каждую
 * HTML-страницу актуальный контент из R2 (window.__SITE_CONTENT__). Клиент берёт его
 * сразу, без дополнительного сетевого запроса, и показывает страницу уже с верными данными.
 */

const CONTENT_URL = 'https://ano-crzs.101filmstudio.workers.dev/api/content';

function escapeForScript(json) {
  return json
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  // API, медиа и админка — без изменений
  if (
    request.method !== 'GET' ||
    url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/_next/') ||
    url.pathname.startsWith('/admin')
  ) {
    return context.next();
  }

  const response = await context.next();
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('text/html')) {
    return response;
  }

  let contentJson = null;
  try {
    const res = await fetch(CONTENT_URL, {
      headers: { 'User-Agent': 'ano-crzs-pages-middleware', Accept: 'application/json' },
      cf: { cacheTtl: 0, cacheEverything: false },
    });
    if (res.ok) {
      const text = await res.text();
      JSON.parse(text); // валидация
      contentJson = text;
    }
  } catch {
    contentJson = null;
  }

  if (!contentJson) {
    return response;
  }

  const script = `<script>window.__SITE_CONTENT__=${escapeForScript(contentJson)};</script>`;

  const rewritten = new HTMLRewriter()
    .on('head', {
      element(el) {
        el.prepend(script, { html: true });
      },
    })
    .transform(response);

  const headers = new Headers(rewritten.headers);
  headers.set('Cache-Control', 'no-cache, must-revalidate');
  headers.delete('content-length');
  headers.delete('etag');

  return new Response(rewritten.body, {
    status: rewritten.status,
    statusText: rewritten.statusText,
    headers,
  });
}
