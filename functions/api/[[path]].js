/**
 * Cloudflare Pages Function Proxy for /api/*
 * Automatically forwards API and media requests from ano-crzs.pages.dev
 * to the Cloudflare Worker backend at ano-crzs.101filmstudio.workers.dev
 */

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const targetUrl = new URL(url.pathname + url.search, 'https://ano-crzs.101filmstudio.workers.dev');

  const forwardRequest = new Request(targetUrl, {
    method: context.request.method,
    headers: context.request.headers,
    body: context.request.body,
    redirect: 'follow',
  });

  return fetch(forwardRequest);
}
