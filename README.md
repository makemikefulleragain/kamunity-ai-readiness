# AI Readiness
## AI Readiness Self-Assessment Tool

*Inherits: BRAIN/CONSTITUTION.md in full. No sub-constitution — project-level only.*

---

## What It Is

Free 12-question AI readiness quiz for WA community organisations. Fully client-side — no data collected. Results show readiness across 4 dimensions with practical next steps.

**Live URL:** https://kamunity-ai-readiness.netlify.app *(check current Netlify dashboard for actual URL)*
**Stack:** React + Vite + Tailwind

## Status

Standalone tool retained as one of the curated public/commercial Kamunity tools. An earlier copy was embedded in Ring Two MVP (R2-02); that historical reuse does not replace this repository as the canonical standalone source.

Quiz questions ported verbatim to `PROJECTS/ring-two-mvp/site/js/quiz-aiready.js`.

## Phase Status

| Phase | Name | Status |
|---|---|---|
| 1 | Quiz engine + 12 questions + results | ✅ Complete |
| 2 | Connect to Tools & Kits (consulting warm path) | 🔨 Partial — Ring Two handles this via R2-02 |
| 3 | Kai integration (describes + recommends tool) | ⬜ Pending |

## Release status

The current public site is live, but the accepted 20 September 2026 local candidate is not yet published. See `LOCAL_RELEASE_ACCEPTANCE_2026-09-20.md` for tests, browser evidence, the public comparison and the owner-approval gate.

## Human Actions Pending

- Review and approve or defer the exact GitHub push and Netlify deployment.
- After an approved deployment, repeat the public quiz, mobile-route, feedback-failure and security-header checks before calling the release complete.

## Key Files

```
src/data/questions.js   — 12 questions, 4 dimensions (source of truth — Ring Two ports from here)
src/App.jsx             — quiz engine
src/components/         — results rendering
```
