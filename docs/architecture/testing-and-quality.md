# Testing And Quality

## Confirmed tooling

- ESLint is configured in `eslint.config.js`.
- `npm run lint` is the only static quality command in `package.json`.
- `npm run build` is the available production compilation check.
- No test runner, test files, type checker, formatter, coverage tool, or CI workflow was found.

## Current gaps

- Browser behavior, route guards, URL encoding, API handlers, accessibility, and responsive layouts have no repository-level automated tests.
- Production Vercel behavior is not validated by a checked-in workflow.
- No browser/device matrix or quality bar is documented.

## Working expectation until human guidance changes it

Use the narrowest relevant lint/build check after edits. For behavior changes, add focused tests only after confirming the preferred test strategy; do not invent a framework or claim coverage that does not exist.