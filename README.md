# Oracle of the Quiet Fracture

A single-purpose oracle PWA for **Signal9 Studio**. Open → draw → read. One card, one fragment, nothing else.

55 cards in two tiers: 5 **anchor** (state) cards + 50 **fragments**, ten per family across five families — Contained, Torn, Mourning, Withered, Fractured. All 55 have equal draw probability; anchors are not rare.

## Design law

Restraint is the product. If a change makes the app quieter, it is probably right. No streaks, counters, history, stats, notifications, sounds, haptics, share buttons, onboarding, settings, or light mode. The only animation is the reveal.

## Tech

- Plain HTML/CSS/JS, no framework, no build step. All logic, card data, and styles live in [`index.html`](index.html).
- Offline-first PWA: [`sw.js`](sw.js) caches the app shell, all 55 images, the font, and icons under a versioned cache. Bump `CACHE_VERSION` on every deploy.
- Self-hosted serif (EB Garamond, OFL — see [`fonts/OFL.txt`](fonts/OFL.txt)). No CDN dependencies.
- All asset paths are relative, so it works on a GitHub Pages project subpath.
- `localStorage` stores only the last drawn card index.

## Structure

```
index.html              app shell, styles, card data, draw logic, reveal, persistence
sw.js                   service worker (versioned cache, relative scope)
manifest.webmanifest    PWA manifest
fonts/fragment-serif.woff2
images/                 55 WebP cards (1200×1800, 2:3)
icons/                  icon-192.png, icon-512.png
```

## Deploy

Pushed to GitHub Pages (main branch, root). Bump `CACHE_VERSION` in `sw.js` before each deploy so clients pick up updates.

---

Card text © Signal9 Studio. Font: EB Garamond, SIL Open Font License 1.1.
