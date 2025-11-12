// Versioned cache for easy invalidation
const CACHE_NAME = "expense-tracker-v1.1";

// ✅ Core assets to pre-cache
const ASSETS = [
    "/",
    "/index.html",
    "/manifest.json",
    "/pwa-icon-192.png",
    "/pwa-icon-512.png",
];

// 🟢 INSTALL EVENT – pre-cache app shell
self.addEventListener("install", (event) => {

    event.waitUntil(
        caches.open(CACHE_NAME).then(async (cache) => {
            try {
                await cache.addAll(ASSETS);
            } catch (err) {
            }
        })
    );

    // Forces the waiting SW to activate immediately
    self.skipWaiting();
});

// ⚙️ ACTIVATE EVENT – clean up old caches
self.addEventListener("activate", (event) => {

    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            )
        )
    );

    self.clients.claim();
});

// 🌐 FETCH EVENT – network-first with cache fallback
self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") return;

    // ✅ Ignore Vite dev URLs and hot-reload modules
    const url = event.request.url;
    if (url.includes("localhost:") || url.includes("@vite") || url.includes("react-refresh")) {
        return;
    }

    event.respondWith(
        (async () => {
            try {
                // Try network first
                const networkResponse = await fetch(event.request);
                const cache = await caches.open(CACHE_NAME);
                cache.put(event.request, networkResponse.clone());
                return networkResponse;
            } catch {
                // Offline fallback
                const cachedResponse = await caches.match(event.request);
                if (cachedResponse) return cachedResponse;

                // Fallback to index.html for SPA routing
                if (event.request.mode === "navigate") {
                    return caches.match("/index.html");
                }

                return new Response("Offline", { status: 503, statusText: "Offline" });
            }
        })()
    );
});

// 🔁 MESSAGE HANDLER – handle skipWaiting from client
self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});
