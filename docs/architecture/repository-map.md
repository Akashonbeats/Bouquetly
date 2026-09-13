# Repository Map

- `src/main.jsx`: browser bootstrap and iOS/WebKit class handling.
- `src/App.jsx`: router, providers, transition shell, builder layout, and route guards.
- `src/context/BouquetContext.jsx`: in-memory bouquet reducer state.
- `src/context/TransitionContext.jsx`: image preload and route transition lifecycle.
- `src/pages/`: landing, flower selection, greenery selection, note writing, and gift display flows.
- `src/components/`: reusable cards, bouquet rendering, navigation, loaders, overlays, and guards.
- `src/utils/flowers.js`: flower, bush, and bouquet-type catalog data.
- `src/utils/bouquetEncoder.js`: compact URL serialization and decoding.
- `src/utils/preloader.js`: startup asset preloading.
- `src/assets/`: flower WebP and bush PNG artwork.
- `api/bouquet-preview.js`: HTML metadata injection for gift links.
- `api/bouquet-image.js`: Vercel OG image generation.
- `vercel.json`: request rewrites.
- `index.html`: SPA shell and default social metadata.
- `.github/skills/`: APC composition, update, and custom-agent skills.
- `docs/`: APC architecture, product, decisions, plans, and quality context.