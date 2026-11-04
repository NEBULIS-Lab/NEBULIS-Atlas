# Codédex local reconstruction implementation plan

**Goal:** Reconstruct the publicly observable Codédex experience for personal study, preserving its rendered visual design and providing local interactions.

**Architecture:** Capture rendered public pages and their styles/assets, inspect browser bundles with REA, then generate a static multi-page application. Replace production scripts with a small local interaction layer. No production authentication, analytics, payments, or database writes are retained.

**Tech stack:** Node.js, browser JavaScript, HTML/CSS, Playwright, REA CLI; static hosting compatible with GitHub Pages and any URL prefix.

**Design decision:** Rendered-page reconstruction gives substantially higher visual fidelity than approximating the pixel artwork/layout by hand. Public page structure is evidence; inaccessible server behavior is implemented as explicitly local demonstration functionality.

## Tasks
- [x] Capture primary navigation destinations, course maps and representative free lessons; save source inventory and screenshots.
- [x] Analyze captured frontend bundles with REA and record actual findings and limitations.
- [x] Download assets/fonts/styles and generate sanitized pages with prefix-safe internal links.
- [x] Implement navigation menus, theme, course filtering/search, local profile/progress, browser code execution and local build previews.
- [x] Verify desktop/mobile rendering, missing resources, internal links, persistence and code execution using browser tests.
- [x] Document startup, capture provenance, supported behavior and coverage gaps.
- [x] Commit and push source and deployable output; verify repository and available hosting.

Deployment verified on 2026-11-04 at https://nebulis-lab.com/NEBULIS-Atlas/. GitHub Pages and cloud verification succeeded. All 17 browser checks passed against the live deployment with zero browser errors or external requests.

## Review focus
- All local pages/resources must work beneath a repository URL prefix.
- No original production scripts, tracking, credentials or backend calls in the generated app.
- Keyboard navigation, mobile menu and page width must work at 390px.
- Course completion must be idempotent and survive refresh.
- Unknown routes, unavailable captures and errors must be reported honestly.
