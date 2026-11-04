# Composed research world

The active world uses no flattened island or all-map image. `src/atlas/explorer.mjs` builds each region from a terrain canvas and independent DOM sprite objects. The former generated map is preserved in Git history at `a7dbf35` and is no longer shipped.

## Edit the scene

- `content/world.json`: region position, irregular terrain rows, buildings, trees, decorative character, and sea-route connections. Each shape row is an inclusive `[firstColumn, lastColumn]`; each tile is 40 world pixels.
- `public/scene-assets/atlas.json`: source rectangles and anchors for the unmodified original sprite sheets. Buildings and trees are separate objects, sorted by ground position; animated sheets advance individual frames.
- `content/islands.json`: human-readable labels and learning-node IDs. The resource catalog remains in `content/catalog.json`.
- `src/atlas/explorer.mjs`: terrain composition, camera, mobile arrangement, selection and panels.
- `src/atlas/explorer.css`: full-screen scene and template-style interface.

Sea routes connect regions. Selecting a region moves the camera toward it, reveals its learning nodes and opens the resource panel. Selecting a node moves its decorative guide and shows the resource introduction, official links and any research demonstration. All regions remain freely accessible. Phone layouts use two columns and a bottom content panel; desktop layouts use a wide sea and side panel. The map supports pointer drag, touch pinch, wheel/button zoom and focused keyboard arrow controls. Reading progress is stored locally.

## Original landing

`src/atlas/landing.html` preserves the supplied template’s layered sky, mountains, hills, foreground, mascot, original course-card artwork, pixel fonts and buttons. Text, branding, navigation and card destinations are adapted for the laboratory. A same-origin frame isolates the original CSS; it reports content height to the parent so the home page scrolls naturally. Links target the main application.

See [scene-asset-sources.md](scene-asset-sources.md) and [template-home-assets.json](template-home-assets.json) for exact provenance. Tiny Swords is the old CC0 collection; the original Codédex assets retain their separate rights and are not included in that license.
