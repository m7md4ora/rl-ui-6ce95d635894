// Web push handlers, loaded by the generated service worker (importScripts).
self.addEventListener('push', event => {
  let d = {}
  try { d = event.data ? event.data.json() : {} } catch { d = { title: 'الرواد لاب', body: event.data ? event.data.text() : '' } }
  event.waitUntil(self.registration.showNotification(d.title || 'الرواد لاب', {
    body: d.body || '', icon: 'icon.svg', badge: 'icon.svg', dir: 'rtl', lang: 'ar', tag: d.tag || undefined, data: { url: d.url || './' } }))
})
self.addEventListener('notificationclick', event => {
  event.notification.close()
  const url = (event.notification.data && event.notification.data.url) || './'
  event.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const c of list) { if ('focus' in c) return c.focus() }
    return self.clients.openWindow(url) }))
})
