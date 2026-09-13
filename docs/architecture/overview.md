# Architecture Overview

## Current state

Bouquetly is a client-first React application built with Vite. The browser owns the bouquet-building experience and keeps the active draft in React context. Vercel-style handlers provide server-rendered social metadata and generated preview images for share links.

## Boundaries

- `src/` contains the browser application, routes, UI components, styles, state, and encoding utilities.
- `api/` contains server handlers used by Vercel rewrites and social previews.
- `public/` contains static public assets.
- `vercel.json` maps share-link requests to the preview handler and all other paths to the SPA entry point.

## Architectural constraints

- There is no database, authentication, browser persistence, or client data-fetching layer in the repository.
- A gift is represented by state encoded into the `/bouquet/:id` URL.
- React Router controls the browser flow; the transition context owns animated navigation state.
- The existing implementation is JavaScript/JSX and should be changed in sympathy with that choice unless a human decision changes it.

## Decision status

This document records repository evidence. Human-confirmed boundaries are recorded in [core foundations](../decisions/core-foundations.md) and [engineering taste](../decisions/engineering-taste.md). Other product intent and long-term architectural choices remain human-owned until confirmed.