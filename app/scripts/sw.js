self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('screen-rest').then((cache) => {
            return cache.addAll([
                '/app',                // Cache the main HTML page
                '/app/scripts/script.js' // Cache the core JavaScript file
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request).then((networkResponse) => {
                return caches.open('screen-rest').then((cache) => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            }).catch((error) => {
                console.error('Fetch failed:', error);
                throw error;
            });
        })
    );
});

let timer = null;
let counter = 0;

function updateCounter() {
    counter++;
    // Communicate the updated counter value to the main app (optional)
}

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim()); // Take control of existing clients
});
