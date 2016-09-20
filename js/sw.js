// SERVICE_WORKER_CACHE_VERSION - this string updates on every deploy

self.addEventListener('install', (event) => {
    console.log('Service Worker install..');
    event.waitUntil(
        caches
        .open('matreshka')
        .then((cache) => {
            return cache.addAll(`
                ./
                css/fonts.css
                css/style.css
                img/mk5-logo_matreshka.svg
                img/mk5-logo_text.svg
                img/logos/shooju.png
                img/logos/habrahabr.svg
                img/logos/browserstack.svg
                img/liqpay-donate-button.png
                fonts/Material-Design-Icons.ttf
                fonts/Roboto-Regular.ttf
                fonts/Roboto-Bold.ttf
                fonts/Roboto-Light.ttf
                js/app.js
                icons/favicon.ico
          `.trim().split(/\s+/));
        })
        /*.then(() => {
            return caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (__cacheName !== cacheName) {
                            return caches.delete(cacheName);
                        }
                    })
                )
            })
        })*/
    )
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches
        .match(event.request)
        .then(cachedResponse => cachedResponse || fetch(event.request))
        .catch(() => fetch(event.request))
    );
});