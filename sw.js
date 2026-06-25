// Oracle of the Quiet Fracture — service worker.
// Bump CACHE_VERSION on every deploy so updates don't get stuck behind a stale cache.
const CACHE_VERSION = "qfo-v1";

const FAMILY_KEYS = ["contained", "torn", "mourning", "withered", "fractured"];
const IMAGE_URLS = [];
for (const fam of FAMILY_KEYS) {
  IMAGE_URLS.push(`./images/${fam}-anchor.webp`);
  for (let n = 1; n <= 10; n++) {
    IMAGE_URLS.push(`./images/${fam}-${String(n).padStart(2, "0")}.webp`);
  }
}

const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./fonts/fragment-serif.woff2",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

const PRECACHE = SHELL.concat(IMAGE_URLS); // 6 shell + 55 images

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// Cache-first for our own assets; fall back to the network and warm the cache.
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        if (res && res.status === 200 && res.type === "basic") {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(req, copy));
        }
        return res;
      }).catch(() => cached);
    })
  );
});
