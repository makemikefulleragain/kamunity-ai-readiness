# AI Readiness local release acceptance — 20 September 2026

## Outcome

AI Readiness is accepted as a local release candidate for the curated Kamunity tool set. Its twelve-question self-assessment, results, recommendations, toolkit and services pages work from the reviewed source. This acceptance does not authorise a GitHub push or Netlify deployment.

## Evidence

- 21 automated tests pass: 18 scoring/safety tests and 3 privacy, feedback and release-configuration checks.
- Production build passes with route-level code splitting and no large-chunk warning. The entry JavaScript bundle fell from approximately 643 KB to 190 KB; the results/chart code is loaded only when needed.
- Dependency audit reports zero known vulnerabilities across 223 dependencies.
- Browser acceptance completed all twelve questions with strongest answers and produced 100% / Ready to Move.
- `Take Again` returned to Question 1 with no selected answer and disabled next navigation.
- All ten public routes loaded with visible main content and correct titles at 375 × 812, with no horizontal overflow or browser errors.
- The acknowledgement banner still dismisses and stays dismissed for the browser session after its inline script was moved to `/aoc.js`.
- A simulated HTTP 500 from the feedback endpoint produced the visible error state and did not show a false success message. No real feedback was submitted.

## Defects and release risks closed

1. Public copy said no data was collected even though optional feedback sends a reaction and message to Netlify Forms. Copy now distinguishes private quiz answers from optional feedback and warns users not to include personal or sensitive information.
2. The feedback widget previously treated every completed HTTP request as success. It now requires a successful response status.
3. The single production bundle exceeded the build warning threshold. Public pages now load on demand.
4. The hosting configuration lacked a Content Security Policy. The release configuration now limits scripts, connections, forms, frames, objects and other resources to the required origins.

## Public-site comparison (read-only)

The current public site is Netlify deployment `69ad55aa4851ea0008d71542`, published 8 March 2026 from Git commit `7bcb7b6a7dbe742d4a73d7006214022a2a791a84`. It still contains the older blanket “No data collected” wording and does not contain the corrected optional-feedback disclosure or HTTP failure check. Its asset hash differs from this accepted local build.

The live address returned HTTP 200 with HSTS, frame, content-type, referrer and permissions headers. The accepted local configuration adds CSP at the next approved deployment. No remote setting or deployment was changed during this review.

## Remaining release gates

1. Owner approves the exact GitHub push and Netlify deployment.
2. Preserve deployment `69ad55aa4851ea0008d71542` as the pre-release rollback target.
3. Deploy this accepted source to `kamunity-ai-readiness.netlify.app`.
4. Repeat the quiz, feedback-failure, mobile-route, security-header and disclosure checks on the public deployment.
