# Third-party notices

## Codédex source material

Original website: https://www.codedex.io/

The captured visual design, text, artwork, brand, fonts and course data remain the property of their respective owners. This study reconstruction does not transfer or relicense those rights. Asset sources are recorded in `docs/asset-provenance.json`; page sources are in `src/routes.json`.

## Pyodide

Bundled npm package version: **314.0.7**.
Source: https://github.com/pyodide/pyodide
License: Mozilla Public License 2.0; license text is distributed in `public/vendor/pyodide/LICENSE`. The bundled Python runtime and standard library include their upstream component licenses; consult the Pyodide distribution and CPython sources for their respective notices.

## sql.js / SQLite

Source: https://github.com/sql-js/sql.js
sql.js uses the MIT license, included at `public/vendor/sqljs/LICENSE`. SQLite is public domain. No changes were made to the bundled runtime binaries.

## REA

Analysis tool: https://github.com/morluto/rea · version 6.8.0 · MIT.
REA was used to investigate the public frontend and is not bundled in the website runtime. Its generated analysis summary is retained under `docs/rea-analysis.json`.

## Browser tooling

Playwright is a development dependency under Apache-2.0. It is not loaded by the deployed website.
