# NEBULIS Atlas

A local study reconstruction of the publicly observable [Codédex](https://www.codedex.io/) website, investigated with [REA](https://github.com/morluto/rea). It preserves captured page structure, dynamic CSS, pixel artwork, fonts and responsive layouts, with an independent browser-local interaction layer.

## Run locally

Requires Node.js 18+ and Python 3. The normal build uses the Python standard library; no network access or npm dependencies are required to run the included site.

```bash
npm run build
npm start
```

Open **http://localhost:4387**. Use `PORT=8080 npm start` to change the port.

## Included

- **92 captured public pages:** homepage, course catalog, 26 course overview pages, signup/login presentation, pricing, community, Builds, coding challenges, introductory exercises, project tutorials and blog articles. The exact inventory is in [`src/routes.json`](src/routes.json).
- Local navigation and search, course/project filtering, responsive menus, pricing toggles and FAQ accordions.
- A nickname-only local profile, saved code, self-reported lesson completion and XP, and a 30-day coding log.
- Python execution using bundled Pyodide, JavaScript execution in a worker, sandboxed HTML/CSS previews, and SQL execution with bundled SQLite. The SQL introduction includes the `shows` dataset recovered from its public frontend bundle.
- Browser-local community reactions and discussion notes. These never post to the original community.
- A local Builds editor with saving and downloading.

## Coverage

This is a **public-page reconstruction, not an exact copy of Codédex's private backend**. Captured appearances are retained; local behavior is implemented separately. Authentication, purchases, live AI mentoring, certificates, multiplayer/community synchronization, hosted Builds, and registration/membership-gated lesson content are not replicated. Unsupported destinations display an explicit availability notice. Java, C++, C# and server-side packages require separate runtimes and are not executed here. Python's bundled standard library is available; third-party Python packages are not bundled.

The public community feed is a dated snapshot. Profile and progress data live only in your current browser; there is no account server or password collection. Completion is manually recorded with 15 local XP per exercise, not the original grading service. Some source images were unavailable during capture and use a labeled placeholder; see [`docs/capture-errors.json`](docs/capture-errors.json).

## Verification

```bash
npm ci
npx playwright install chromium
npm test
npm run build
npm start
# In another terminal:
npm run test:e2e
```

Browser tests cover local search, profile creation, Python execution, SQL data, code persistence, idempotent completion, HTML preview, mobile navigation, responsive widths and representative pages. They also reject unexpected external network requests and missing resources. Screenshots and diagnostics are written under `test-results/`.

## GitHub Pages

The live site is **[nebulis-lab.com/NEBULIS-Atlas](https://nebulis-lab.com/NEBULIS-Atlas/)**, published from the **`gh-pages` branch**. The default GitHub Pages address redirects to this organization domain.

Deployment was verified on 2026-11-04: GitHub Pages and the cloud verification workflow succeeded; all 17 browser checks passed against the live site, with no browser errors, missing resources or requests outside the hosting origin. The three state unit tests also passed.

For repository-path deployment:

```bash
npm run build -- --base /NEBULIS-Atlas
BASE_PATH=/NEBULIS-Atlas npm start
# Open http://localhost:4387/NEBULIS-Atlas/
```

A verification workflow tests this prefix as well. To publish a new version, copy the prefix build's `dist/` contents to `gh-pages`; do not commit machine configuration, captures, credentials or local logs.

## Reconstruction evidence

[`docs/RECONSTRUCTION.md`](docs/RECONSTRUCTION.md) describes the capture/import method, REA findings and remaining boundaries. [`docs/asset-provenance.json`](docs/asset-provenance.json) records the original locations of captured visual resources.

Codédex's name, artwork, educational material and other original assets belong to their respective owners. This repository is a personal learning reconstruction, is not affiliated with Codédex, and grants no license to their material. The original Terms and Privacy pages included in the visual capture describe the original service, not this local implementation. Third-party runtime notices are in [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md).
