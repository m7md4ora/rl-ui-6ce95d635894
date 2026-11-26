// Preview-only service worker: makes the preview installable and gives it push handlers + light offline cache.
importScripts('push-sw.js')
const C = 'rl-demo-v1'
self.addEventListener('install', e => { self.skipWaiting() })
self.addEventListener('activate', e => e.waitUntil((async () => { for (const k of await caches.keys()) if (k !== C) await caches.delete(k); await self.clients.claim() })()))
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return
  e.respondWith((async () => { try { const res = await fetch(r); if (res.ok) { const c = await caches.open(C); c.put(r, res.clone()) } return res } catch { const m = await caches.match(r, { ignoreSearch: true }); return m || (r.mode === 'navigate' ? (await caches.match('index.html')) || (await caches.match('./')) : Response.error()) } })())
})
