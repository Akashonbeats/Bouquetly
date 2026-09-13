# AI-Understood Application

**AI Understanding — Reference Only**

This is what the AI Agent currently understands this application does based on repository evidence. This is not human-provided product truth. Treat it only as a reference.

Bouquetly is a web experience for composing a digital flower bouquet. A visitor starts from a landing page, selects repeated flower items, chooses a greenery style, writes a recipient/message/sender note, and creates a shareable URL. The gift route reconstructs the bouquet from the URL and provides a copy-link action. Vercel handlers add dynamic social metadata and generate a preview image for share links.

The interface is intentionally visual and animated, using hand-drawn flower and greenery assets, route transitions, and note-card presentation. The repository does not establish the product's audience, emotional promise, privacy model, business rules beyond current code behavior, or roadmap. Those topics require human confirmation.

## Human-confirmed product purpose

Bouquetly is a digital bouquet-making site where anybody can create a bouquet for their loved ones. The colors and animations are purposefully built to give a sense of calmness and affection. When shared, the link's preview customizes the OG image and text with the sender's name, making it feel made exclusively for the recipient.

## Human-confirmed business rules

The developer confirmed that the current rules are canonical and expected: bouquets may contain repeated flowers up to the current maximum of 10; the builder's current continuation threshold is 5 flowers; one of the three greenery styles must be chosen; recipient, message, and sender text are required before creation; and the resulting share link carries the bouquet and customized sender preview data.

The builder's visible continuation minimum is 5 flowers, while the route guards allow 4 flowers. The developer confirmed this difference is intentional and was introduced to fix a prior bug; the historical reason is unknown. Agents must preserve the distinction unless the developer explicitly approves changing it.

## Human-confirmed behavior boundaries

No additional product boundaries were specified beyond the behavior already represented in the repository. Treat the current in-memory draft, URL-encoded share link, recipient view, navigation behavior, and malformed-link handling as implementation evidence rather than inventing new requirements.