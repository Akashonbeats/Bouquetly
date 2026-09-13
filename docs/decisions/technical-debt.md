# Technical Debt And Intentional Compromises

## Status

Human-confirmed.

## Intentional behavior

- The builder's visible continuation threshold is 5 flowers while route guards allow 4. This difference fixed a prior bug; the precise historical reason is unknown. Do not normalize the values without explicit approval.
- Drafts remain in memory and share links remain client-decodable; no server-side personal-data storage is intended.

## Unintentional debt

The developer identified the other initial inspection findings as unintentional, including the absence of tests, accessibility gaps, and preview metadata escaping risk. Address them according to task relevance and the established quality boundaries.