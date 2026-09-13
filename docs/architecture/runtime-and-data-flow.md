# Runtime And Data Flow

1. The browser bootstraps `App` inside `StrictMode`, `BrowserRouter`, `BouquetProvider`, and `TransitionProvider`.
2. `/` renders the landing page. Beginning the flow marks a module-level flag and navigates to `/build/flowers`.
3. Flower selection dispatches reducer actions into in-memory context. The UI allows up to 10 selected flowers and enables continuation at 5 flowers.
4. Bouquet selection stores one of three greenery styles and previews the bouquet from the current context.
5. Note writing stores recipient, message, and sender fields. All three must be non-empty before creation; recipient and sender are limited to 50 characters and the message to 300 characters.
6. Creation serializes flowers, bouquet type, note, and shuffle order into a URL-safe base64-like route parameter.
7. `/bouquet/:id` decodes the parameter locally and renders the bouquet and note without requiring the builder context.
8. Vercel rewrites share-link requests to `api/bouquet-preview.js`, which injects dynamic metadata. The metadata references `api/bouquet-image.js`, which generates a 1200x630 social image and may fetch the Dancing Script font from Google Fonts.

## State and navigation notes

- Draft state is lost on refresh and is not shared across tabs.
- `FlowGuard` uses a module-level flag for entry into the builder.
- `TransitionContext` preloads flower and bush assets and controls forward/back transitions.
- The route guard currently permits four flowers while the flower page's continue control requires five; the intended rule is unknown and requires human confirmation before changing.

## Trust boundary

The share identifier is client-decodable and unsigned. The preview handler places decoded sender text into HTML metadata; escaping and input validation are not currently evident and should be treated as a security risk when changing this path.