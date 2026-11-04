# Reconstruction record

Source: https://www.codedex.io/ · Capture date: 2026-11-04.

## REA investigation

REA **6.8.0** was downloaded and used through its CLI to inspect a dedicated Chromium instance. `list-browser-targets` identified the Codédex homepage; `analyze-web-bundle` captured and statically inspected its same-origin scripts.

The resulting evidence retains 16 scripts, with 15 parsed successfully and one framework script reaching its per-script analysis deadline. REA observed Next.js/Webpack signatures and reported **364 candidate route patterns and 648 occurrences**. Candidate routes are static findings, not a claim that every route exists or was exercised. Server behavior remains unknown.

The sanitized, retained report is [`rea-analysis.json`](rea-analysis.json), including source digests, coverage and unknowns. Raw evidence and third-party JavaScript bundles are not part of the deployed app.

The route and endpoint findings informed the implementation boundary: preserve the browser-visible views, replace production dependencies with local operations, and do not proxy to original authentication, grading, AI or payment endpoints. The public SQL exercise bundle also contains `createShowsTable`; its 50-row initialization is retained as `public/data/shows.sql` and loaded into local SQLite for the exercise.

## Visual reconstruction

Playwright captured public pages at 1440 × 1000. Capturing `page.content()` alone was insufficient: styled-components inserts its rules through CSSOM. The capture step serializes those rules into their owning style elements before exporting HTML. This preserves the reference's generated classes and media queries.

The importer:

1. Copies captured public images, fonts, styles and bounded media files.
2. Resolves CSS URLs, including quoted filenames containing spaces.
3. Removes original executable scripts, trackers, iframes, overlays and preload hints.
4. Rewrites internal navigation and resources for a configurable hosting prefix.
5. Excludes captured registration/Club access gates from the lesson inventory.
6. Replaces unavailable source images with a labeled local placeholder.

The independent `src/app.mjs` layer supplies local interactions. The lesson text and surrounding layout remain captured material; the original server-backed editor is replaced by a browser runner. Python/SQL run in workers; JavaScript has a 5-second worker deadline; HTML previews use a sandboxed iframe. The local SQL database resets to its seed for each run.

## Refreshing selected source pages

```bash
pip install -r requirements.txt
npm ci
npx playwright install chromium
CAPTURE_DIR=.local/capture node scripts/capture.mjs / /courses /python
python3 scripts/import_capture.py .local/capture
npm run build
```

Refreshing is an explicit network operation. Raw captures can include third-party scripts and public service metadata; `.local/` is ignored by Git. Review new captures and the generated diff before publishing. The importer replaces the route inventory with the pages in that capture directory, so use a complete capture when refreshing the complete site.

REA investigation of a browser you have launched with a loopback CDP endpoint:

```bash
rea list-browser-targets http://127.0.0.1:9222 --format json
rea analyze-web-bundle http://127.0.0.1:9222 TARGET_ID \
  --allowed-origins https://www.codedex.io \
  --detail complete --format json > .local/rea-evidence.json
```

## Explicit limits

The 92-page inventory is finite. Original registration/Club gates, private course material, live grading, payments, OAuth, AI mentoring and hosted project deployment are not reconstructed. The local profile is a nickname with browser persistence. Progress/XP are local and self-reported. Java/C++/C# examples can be read but require separate compilers. Captured project tutorials may describe third-party services that are not installed by this repository. No live community writes are performed.
