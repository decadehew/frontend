const CACHE_NAME = 'restaurant-cache-v1';
const urlsToCache = [
  '/index.html',
  'restaurant.html',
  'js/main.js',
  'js/restaurant_info.js',
  'js/dbhelper.js',
  'css/styles.css',
  'img/1.jpg',
  'img/2.jpg',
  'img/3.jpg',
  'img/4.jpg',
  'img/5.jpg',
  'img/6.jpg',
  'img/7.jpg',
  'img/8.jpg',
  'img/9.jpg',
  'img/10.jpg'
];

// Install a service worker
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

// Update a service worker
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(CACHE_NAME) {
            return Promise.all(
                CACHE_NAME.filter(function(cacheName) {
                    return cacheName.startsWith('estaurant-cache-') &&
                        cacheName !== CACHE_NAME;
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            )
        })
    )
});

// Cache and return requests
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request) 
            .then(function(response) {
                if(response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});