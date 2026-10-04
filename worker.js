import { DEFAULT_CONTENT } from './src/data/defaultContent.ts';

/**
 * Cloudflare Worker entry point for АНО «ЦРЗС»
 * Supports:
 * - Admin Authentication with Cloudflare Secrets (ADMIN_LOGIN, ADMIN_PASSWORD, TOKEN_SECRET)
 * - Cloudflare R2 Storage (R2_BUCKET: ano-crzs) for content.json and uploaded media files
 * - Cloudflare Static Assets (env.ASSETS)
 */

async function hmacSha256(keyStr, dataStr) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(keyStr),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(dataStr));
  return btoa(String.fromCharCode(...new Uint8Array(sig)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

async function createAuthToken(login, secret) {
  const payload = JSON.stringify({ login, exp: Date.now() + 7 * 86400 * 1000 });
  const b64Payload = btoa(payload).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const signature = await hmacSha256(secret, b64Payload);
  return `${b64Payload}.${signature}`;
}

async function verifyAuthToken(token, secret) {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [b64Payload, signature] = parts;
  const expectedSig = await hmacSha256(secret, b64Payload);
  if (signature !== expectedSig) return false;
  try {
    const jsonStr = atob(b64Payload.replace(/-/g, '+').replace(/_/g, '/'));
    const data = JSON.parse(jsonStr);
    if (data.exp && Date.now() > data.exp) return false;
    return true;
  } catch {
    return false;
  }
}

function getCookie(request, name) {
  const cookieHeader = request.headers.get('Cookie');
  if (!cookieHeader) return null;
  const cookies = cookieHeader.split(';');
  for (const c of cookies) {
    const [k, ...v] = c.trim().split('=');
    if (k === name) return v.join('=');
  }
  return null;
}

function checkAuth(request, env) {
  const token = getCookie(request, 'admin_token');
  const secret = env.TOKEN_SECRET || 'crzs-nko-secret-token-key-2026-auth-v1';
  return verifyAuthToken(token, secret);
}

async function loadContentFromR2(env) {
  if (env.R2_BUCKET) {
    try {
      const obj = await env.R2_BUCKET.get('content.json');
      if (obj) {
        const text = await obj.text();
        return JSON.parse(text);
      }
    } catch (e) {
      console.error('R2 read error:', e);
    }
  }
  return JSON.parse(JSON.stringify(DEFAULT_CONTENT));
}

async function saveContentToR2(env, content) {
  if (!env.R2_BUCKET) throw new Error('R2_BUCKET binding is missing');
  await env.R2_BUCKET.put('content.json', JSON.stringify(content, null, 2), {
    httpMetadata: { contentType: 'application/json' },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // 1. PUBLIC MEDIA FROM R2: /api/media/* or /media/*
    if (pathname.startsWith('/api/media/') || pathname.startsWith('/media/')) {
      const key = pathname.startsWith('/api/media/')
        ? pathname.slice('/api/media/'.length)
        : pathname.slice('/media/'.length);

      if (key && env.R2_BUCKET) {
        const obj = await env.R2_BUCKET.get(key);
        if (obj) {
          const headers = new Headers();
          headers.set('Content-Type', obj.httpMetadata?.contentType || 'application/octet-stream');
          headers.set('Cache-Control', 'public, max-age=31536000, immutable');
          headers.set('Access-Control-Allow-Origin', '*');
          return new Response(obj.body, { headers });
        }
      }
      return new Response('Media not found in R2', { status: 404 });
    }

    // 2. PUBLIC CONTENT: GET /api/content
    if (pathname === '/api/content' && request.method === 'GET') {
      const content = await loadContentFromR2(env);
      return new Response(JSON.stringify(content), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-cache',
        },
      });
    }

    // 3. ADMIN AUTH: POST /api/admin/login
    if (pathname === '/api/admin/login' && request.method === 'POST') {
      try {
        const { login, password } = await request.json();
        const expectedLogin = env.ADMIN_LOGIN || 'ADMIN';
        const expectedPassword = env.ADMIN_PASSWORD || 'admin2028';
        const secret = env.TOKEN_SECRET || 'crzs-nko-secret-token-key-2026-auth-v1';

        if (login === expectedLogin && password === expectedPassword) {
          const token = await createAuthToken(login, secret);
          const headers = new Headers();
          headers.set('Content-Type', 'application/json');
          headers.set(
            'Set-Cookie',
            `admin_token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`
          );
          return new Response(JSON.stringify({ success: true }), { headers });
        } else {
          return new Response(JSON.stringify({ error: 'Неверный логин или пароль' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      } catch (err) {
        return new Response(JSON.stringify({ error: 'Неверный запрос' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    // 4. ADMIN AUTH: POST /api/admin/logout
    if (pathname === '/api/admin/logout' && request.method === 'POST') {
      const headers = new Headers();
      headers.set('Content-Type', 'application/json');
      headers.set('Set-Cookie', 'admin_token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0');
      return new Response(JSON.stringify({ success: true }), { headers });
    }

    // 5. ADMIN AUTH: GET /api/admin/check
    if (pathname === '/api/admin/check' && request.method === 'GET') {
      const isAuth = await checkAuth(request, env);
      if (isAuth) {
        return new Response(JSON.stringify({ authenticated: true }), {
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return new Response(JSON.stringify({ authenticated: false }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 6. ADMIN CONTENT: GET /api/admin/content/:section
    if (pathname.startsWith('/api/admin/content/') && request.method === 'GET') {
      const isAuth = await checkAuth(request, env);
      if (!isAuth) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
      }
      const section = pathname.slice('/api/admin/content/'.length);
      const content = await loadContentFromR2(env);
      const sectionData = content[section] ?? (DEFAULT_CONTENT[section] || {});
      return new Response(JSON.stringify(sectionData), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 7. ADMIN CONTENT: PUT /api/admin/content/:section
    if (pathname.startsWith('/api/admin/content/') && request.method === 'PUT') {
      const isAuth = await checkAuth(request, env);
      if (!isAuth) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
      }
      const section = pathname.slice('/api/admin/content/'.length);
      const sectionData = await request.json();
      const content = await loadContentFromR2(env);
      content[section] = sectionData;
      await saveContentToR2(env, content);
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 8. ADMIN MEDIA: GET /api/admin/media
    if (pathname === '/api/admin/media' && request.method === 'GET') {
      const isAuth = await checkAuth(request, env);
      if (!isAuth) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
      }
      if (!env.R2_BUCKET) {
        return new Response(JSON.stringify([]), { headers: { 'Content-Type': 'application/json' } });
      }
      const prefix = url.searchParams.get('prefix') || '';
      const list = await env.R2_BUCKET.list({ prefix });
      const files = (list.objects || [])
        .filter((o) => o.key && o.key !== 'content.json')
        .map((o) => ({
          key: o.key,
          size: o.size,
          lastModified: o.uploaded?.toISOString() || new Date().toISOString(),
          url: `/api/media/${o.key}`,
        }));
      return new Response(JSON.stringify(files), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 9. ADMIN MEDIA: POST /api/admin/media (Upload)
    if (pathname === '/api/admin/media' && request.method === 'POST') {
      const isAuth = await checkAuth(request, env);
      if (!isAuth) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
      }
      if (!env.R2_BUCKET) {
        return new Response(JSON.stringify({ error: 'R2 bucket unavailable' }), { status: 500 });
      }
      try {
        const formData = await request.formData();
        const file = formData.get('file');
        if (!file || typeof file === 'string') {
          return new Response(JSON.stringify({ error: 'Файл не передан' }), { status: 400 });
        }
        const customKey = formData.get('key');
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        const key = customKey || `images/${Date.now()}-${safeName}`;
        const buffer = await file.arrayBuffer();

        await env.R2_BUCKET.put(key, buffer, {
          httpMetadata: { contentType: file.type || 'application/octet-stream' },
        });

        return new Response(
          JSON.stringify({ success: true, key, url: `/api/media/${key}` }),
          { headers: { 'Content-Type': 'application/json' } }
        );
      } catch (e) {
        return new Response(JSON.stringify({ error: String(e) }), { status: 500 });
      }
    }

    // 10. ADMIN MEDIA: DELETE /api/admin/media
    if (pathname === '/api/admin/media' && request.method === 'DELETE') {
      const isAuth = await checkAuth(request, env);
      if (!isAuth) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
      }
      try {
        const { key } = await request.json();
        if (key && env.R2_BUCKET) {
          await env.R2_BUCKET.delete(key);
        }
        return new Response(JSON.stringify({ success: true }), {
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (e) {
        return new Response(JSON.stringify({ error: String(e) }), { status: 500 });
      }
    }

    // 11. STATIC ASSETS FALLBACK
    return env.ASSETS.fetch(request);
  },
};
