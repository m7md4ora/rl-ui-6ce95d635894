// Web push handlers, loaded by the generated service worker (importScripts).
self.addEventListener('push', event => {
  let d = {}
  try { d = event.data ? event.data.json() : {} } catch { d = { title: 'الرواد لاب', body: event.data ? event.data.text() : '' } }
  event.waitUntil(self.registration.showNotification(d.title || 'الرواد لاب', {
    body: d.body || '', icon: 'notify-icon-192.png', badge: 'badge-96.png', dir: 'rtl', lang: 'ar',
    // Sound/heads-up are decided by the Android notification channel; these only ask for them.
    silent: false, vibrate: [200, 100, 200], timestamp: Date.now(),
    tag: d.tag || ('rl-' + Date.now()), renotify: true, requireInteraction: false, data: { url: d.url || './' } }))
})
self.addEventListener('notificationclick', event => {
  event.notification.close()
  const url = (event.notification.data && event.notification.data.url) || './'
  event.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const c of list) { if ('focus' in c) return c.focus() }
    return self.clients.openWindow(url) }))
})
