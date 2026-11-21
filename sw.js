// Use a fresh release ID whenever any runtime file changes.
const RELEASE = "11";
const prefix = "kincaid-sheet:" + self.registration.scope + ":";
const cacheName = prefix + RELEASE;
const entry = new URL("index.html", self.registration.scope).href;
const files = [
  "index.html",
  "./icons/favicon-d20.ico",
  "./manifest.webmanifest",
  "./icons/kincaid-d20-180.png",
  "./icons/kincaid-d20-192.png",
  "styles/sheet.css",
  "application/load-errors.js",
  "application/document.js",
  "characters/kincaid.js",
  "catalogs/items.js",
  "catalogs/feats.js",
  "application/item-catalog.js",
  "catalogs/beasts-2014.js",
  "catalogs/base-creatures.js",
  "catalogs/creatures.js",
  "catalogs/forms.js",
  "application/form-catalog.js",
  "catalogs/spells/srd-5.2-spells.js",
  "catalogs/spells/phb-2024-owned-spells.js",
  "characters/kincaid-spell-configuration.js",
  "application/join-spells.js",
  "application/spell-catalog.js",
  "catalogs/status-effects/assets.js",
  "catalogs/status-effects/rules.js",
  "application/status-catalog.js",
  "catalogs/effects.js",
  "application/effect-definitions.js",
  "characters/self-effect-reminders.js",
  "application/state.js",
  "application/wild-shape.js",
  "application/persistence.js",
  "application/elements.js",
  "application/spellcasting.js",
  "application/combat-controls.js",
  "application/information-dialog.js",
  "application/dashboard.js",
  "application/active-effects.js",
  "application/resources.js",
  "application/catalog-lists.js",
  "application/inventory.js",
  "application/feats.js",
  "application/interactions.js",
  "pwa.js",
  "icons/kincaid-d20-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    try {
      await cache.addAll(files.map(file => new Request(file, { cache: "reload" })));
    } catch (error) {
      await caches.delete(cacheName);
      throw error;
    }
  })());
});

// The browser waits for open sheets to close before activating an update.
self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) {
      if (key.startsWith(prefix) && key !== cacheName) await caches.delete(key);
    }
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET" || !request.url.startsWith(self.registration.scope)) return;
  const url = new URL(request.url);
  const page = request.mode === "navigate" &&
    [self.registration.scope, entry].includes(url.origin + url.pathname);
  event.respondWith((async () => {
    const cache = await caches.open(cacheName);
    return (await cache.match(page ? entry : request)) || fetch(request);
  })());
});
