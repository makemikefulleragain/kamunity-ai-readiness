# AI Readiness
## AI Readiness Self-Assessment Tool

*Inherits: BRAIN/CONSTITUTION.md in full. No sub-constitution — project-level only.*

---

## What It Is

Free 12-question AI readiness quiz for WA community organisations. Fully client-side — no data collected. Results show readiness across 4 dimensions with practical next steps.

**Live URL:** https://kamunity-ai-readiness.netlify.app *(check current Netlify dashboard for actual URL)*
**Stack:** React + Vite + Tailwind

## Status

Standalone tool — **cannibalised into Ring Two MVP (R2-02)** as the embedded AI Readiness page. The standalone site remains live for direct linking and SEO.

Quiz questions ported verbatim to `PROJECTS/ring-two-mvp/site/js/quiz-aiready.js`.

## Phase Status

| Phase | Name | Status |
|---|---|---|
| 1 | Quiz engine + 12 questions + results | ✅ Complete |
| 2 | Connect to Tools & Kits (consulting warm path) | 🔨 Partial — Ring Two handles this via R2-02 |
| 3 | Kai integration (describes + recommends tool) | ⬜ Pending |

## Human Actions Pending

- Confirm standalone site URL is still live and not broken post Ring Two launch
- Decide: retire standalone to redirect → Ring Two, or keep as separate entry point?

## Key Files

```
src/data/questions.js   — 12 questions, 4 dimensions (source of truth — Ring Two ports from here)
src/App.jsx             — quiz engine
src/components/         — results rendering
```
