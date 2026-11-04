# Research Adventure Implementation Plan

**Goal:** Publish a polished, searchable pixel-island research atlas for NEBULIS-Lab.
**Architecture:** Static HTML/CSS/ES modules; shared JSON catalog; hash routes; local reading marks.
**Tech Stack:** Existing Python build, Node static server, browser JavaScript, GitHub Pages.
**Spec:** ../specs/2026-11-04-research-adventure-design.md

The user delegated design choices and requested limited testing. Implement directly in the backed-up checkout; bounded content and media research run independently. Do not change other projects.

- [x] Create original archipelago artwork, lab branding and theme; keep asset provenance.
- [x] Verify and assemble the supplied catalog, learning journeys, glossary and attributed research demos.
- [x] Build map, island node paths, searchable library, resource details, journeys and lab frontier; remove unused template flows and runtimes.
- [x] Adapt static build/404/deployment workflow and document JSON content maintenance.
- [x] Validate content references, review desktop/mobile screenshots and run one focused interaction smoke check.
- [x] Commit source, deploy gh-pages through SSH, verify the live page and report.

## Review focus
Repository URL prefix; usable map labels on touch screens; resource links without tracking; storage unavailable; video files loaded on demand; duplicate concepts shown as related resources rather than duplicate progress requirements.

## Verification record

2026-11-04: content references validated; repository-prefix build succeeded (11.9 MiB); one focused browser pass completed 14 checks with zero browser errors or off-origin requests. Desktop/mobile visuals reviewed. A focused independent review identified the harbor return route and skip-link collision; both were fixed and covered by the same smoke pass.

Source implementation: `662dd92`. Static deployment: `b11a9d7`. GitHub content workflow and Pages deployment succeeded. Live https://nebulis-lab.com/NEBULIS-Atlas/ returned HTTP 200; seven map regions and scientific-video playback verified with no browser or asset-loading errors.
