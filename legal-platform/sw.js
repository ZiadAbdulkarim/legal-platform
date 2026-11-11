/**
 * Judicial Platform - Progressive Web App (PWA) Service Worker
 * Enables 100% offline access to legal charges, articles, and descriptions
 * during prosecution investigations and courtroom sessions.
 */

const CACHE_NAME = 'judicial-platform-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './src/styles/main.css',
  './src/data/categories.json',
  './src/data/topics.json',
  './src/app/bundle.js',
  './src/app/app.js',
  './src/app/core/storage.service.js',
  './src/app/core/data.service.js',
  './src/app/core/toast.service.js',
  './src/app/layout/header.component.js',
  './src/app/shared/legal-card.component.js',
  './src/app/shared/guideline-card.component.js',
  './src/app/shared/search-bar.component.js',
  './src/app/pages/home/home.page.js',
  './src/app/pages/featured/featured.page.js',
  './src/app/pages/search/search.page.js',
  './src/app/pages/categories/categories.page.js',
  './src/app/pages/topic-details/topic-details.page.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[PWA ServiceWorker] Pre-caching judicial platform assets');
      return cache.addAll(ASSETS_TO_CACHE).catch(err => {
        console.warn('[PWA ServiceWorker] Some assets could not be pre-cached, fallback will handle them:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[PWA ServiceWorker] Clearing old judicial cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests for http/https
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      }).catch(() => {
        // Fallback for HTML navigation requests
        if (event.request.headers.get('accept')?.includes('text/html')) {
          return caches.match('./index.html');
        }
      });
    })
  );
});

