# Quality

The repository currently provides `npm run lint` and `npm run build`. There is no configured test runner, type checker, formatter, coverage tool, CI workflow, or documented browser/device matrix.

Initial quality risks to keep visible:

- no automated coverage for the builder flow or URL decoder
- no reduced-motion path is evident for animated UI
- note inputs lack associated labels
- nested interactive controls exist in the flower card
- the server-rendered preview metadata does not visibly escape decoded user text
- the four-versus-five flower threshold is inconsistent

These are observations, not accepted priorities. Human quality, accessibility, security, and privacy expectations must be confirmed before APC treats them as requirements.

## Human-confirmed quality expectation

Even if the UI core changes, Bouquetly should still feel like a romantic bouquet-maker application. If the color scheme or font family changes, the combination should continue to feel romantic and coherent. No additional test, tooling, browser, or device preference was specified; use the existing lint/build checks until a more specific quality bar is confirmed.

## Human-confirmed accessibility expectation

Keyboard use is important. Agents are responsible for handling the remaining accessibility concerns with sound judgment, including labels, semantic controls, focus visibility, motion preferences, contrast, and mobile interaction, without weakening the protected visual core.

## Human-confirmed security and privacy posture

No additional security or privacy product requirements were specified. This is a side project that does not store personal information; a shared bouquet is compiled and rendered visually on client machines. The URL and preview handlers still process user-controlled text, so existing implementation risks such as unescaped metadata must remain visible for defensive engineering review without implying server-side personal-data storage.