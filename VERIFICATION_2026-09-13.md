# Local hardening and verification — 13 September 2026

Verified backup: enclosing workspace `portfolio-audit/local-recovery/2026-09-13/ai-readiness-before-dependency-hardening`, HEAD `ce99ee6a6813f763cd6cacc345420039d4767308`.

Named affected dependencies were refreshed in an isolated tracked-source copy excluding `.env*`. A compatible-range refresh left two router findings, so React Router DOM was then pinned to patched 7.18.3 (supports the app's React 18). The final isolated audit reports zero findings, down from 13. React itself remains on the existing major version. Scoring imports now use an explicit `.js` extension for direct Node tests.

Eighteen tests pass before and after the upgrade, covering dimension arithmetic, score bands, recommendation order, safety-warning triggers and repeatability. The build passes; its ~643 KB bundle warning remains. No lint script is defined, so no lint pass is claimed.

The browser walkthrough completed all twelve questions with strongest answers and produced 100% / Ready to Move. Unanswered next-navigation was disabled; back navigation retained the selected answer; Take Again reset the quiz. All nine other public/toolkit/service routes checked returned 200 with visible main content and no page exceptions. No feedback or contact form was submitted.

The first mobile check found navigation overflow and clipped radar labels. The header now wraps on narrow screens, and chart labels use compact two-line text with additional space. The rebuilt full quiz was repeated: results at 375/768/1360 pixels have no horizontal overflow, and the mobile screenshot was visually inspected. Browser console reports zero errors/warnings.

Remaining limitations: questionnaire/claims are not professionally validated by arithmetic tests; separate questionnaire versions are preserved, not merged; answers live only in memory, so page reload does not preserve completed results; bundle performance and deployment/runtime parity need review. No remote push or deployment is included.

## 20 September 2026 release-candidate update

The canonical local source now has 21 passing tests, zero dependency advisories and a code-split production build without the earlier large-chunk warning. The twelve-question flow, results, reset, all ten public routes and mobile layout passed again. Optional feedback disclosure now accurately distinguishes untransmitted quiz answers from reaction/message data sent to Netlify Forms, and non-success responses no longer show false success. A restrictive CSP was added and the acknowledgement script moved to an external same-origin file. The current public deployment remains older and was inspected read-only; no push or deployment occurred. Full evidence: `LOCAL_RELEASE_ACCEPTANCE_2026-09-20.md`.

Router reference: [v7 compatibility re-export](https://api.reactrouter.com/v7/modules/react-router-dom.html).
