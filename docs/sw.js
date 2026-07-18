const CACHE = 'fengmian-v1'
const URLS = ['/ra-drug-calc/', '/ra-drug-calc/index.html', '/ra-drug-calc/manifest.json', '/ra-drug-calc/icon.svg']
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(URLS)))
  self.skipWaiting()
})
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))))
})
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)))
})
