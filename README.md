# NEBULIS Research Adventure

**Embark on an Embodied AI Adventure with NEBULIS-Lab**

An interactive research atlas for robotics, embodied intelligence, world models, multi-agent collaboration and distributed AI. Explore the pixel-art archipelago, follow a learning trail, or go straight to the searchable resource library.

**[Explore the live atlas](https://nebulis-lab.com/NEBULIS-Atlas/)** · [NEBULIS-Lab](https://nebulis-lab.com/)

## What is here

- Original template landing with adapted lab branding; Explore opens a separate full-screen sea.
- Seven independently composed regions: a starting camp, five research islands and a shared resource harbor.
- Tile terrain, separate buildings and animated props, camera panning/zooming, and click-to-open resource panels.
- 66 curated resource nodes, five learning journeys and 15 short glossary entries.
- Papers, official repositories, datasets, simulators, benchmarks and laboratory research.
- Chinese introductions and learning guidance alongside English research names.
- Local, attributed research images and five short videos; videos load on demand.
- Search, direction/type filters, bookmarks and reading marks. Progress lives in the current browser, with no account.

This is a resource guide. It does not provide login, a community feed, payments, model training or an online code runner. All learning nodes are open.

## Run locally

Node.js 18+ and Python 3 are sufficient. The normal build needs no package installation and makes no network requests.

```bash
npm run build
npm start
```

Open **http://localhost:4387**. Use `PORT=8080 npm start` for a different port.

## Maintain the content

| File | Purpose |
| --- | --- |
| `content/catalog.json` | Resource records, learning journeys, glossary |
| `content/islands.json` | Region names, node order and connected research directions |
| `content/world.json` | Editable terrain footprints, building/tree positions and sea connections |
| `content/media.json` | Resource-to-media mappings, credits and source links |
| `public/research-media/` | Locally hosted scientific images and short videos |
| `public/atlas/` | Lab logo and supplementary pixel font |
| `public/template-assets/` | Original landing art, decorative GIFs, fonts and styles |
| `public/scene-assets/atlas.json` | Original tile/sprite rectangles, anchors and animation frames |
| `public/scene-assets/` | CC0 terrain and independently placed props; template decorative sprites |
| `src/atlas/` | Page shell, theme and browser interactions |

To add a resource, create a unique ID with a title, island, type, level, summary, learning points and official links. Use IDs for `prerequisites` and `related`; add it to the desired island or journey. Keep resource URLs canonical and free of tracking parameters. Dataset entries may also provide `dataset: {data_type, scale, access, recommended_use}`. Do not infer a media license from a repository's code license.

A resource can have both a paper and repository link. The “含开源代码” filter finds any resource with a GitHub implementation. Harbor resources remain centrally maintained and appear under research-direction filters through their related nodes. `aliasOf` allows two learning views to share one reading mark.

```bash
npm test                  # Small JSON graph / links / local media check
npm run build
```

Optional focused browser smoke check:

```bash
npm ci
npx playwright install chromium
npm start                 # Leave running in one terminal
npm run test:e2e          # Run in another terminal
```

This checks the principal navigation, search/filtering, video playback, reading marks and phone layout. It does not train or reproduce the linked research projects.

## Publish to GitHub Pages

The repository uses **`main` for source** and **`gh-pages` for static output**. GitHub Pages serves the `gh-pages` root and the organization domain supplies the final URL. The verification workflow checks the catalog and repository-prefix build after each source push.

After committing and pushing source changes, publish through the already configured Git remote:

```bash
git push origin main
npm run publish:pages
```

The script validates content, builds `dist-pages/` for `/NEBULIS-Atlas`, fetches the existing Pages branch, and pushes a new descendant commit without touching the working index. A rejected push must be rerun after reviewing concurrent changes; it never force-pushes. Pages deployment can take a few minutes.

For a different repository path, pass it as the first argument:

```bash
bash scripts/publish-pages.sh /your-repository
```

To preview the deployed path locally:

```bash
python3 scripts/build.py --base /NEBULIS-Atlas --out dist-pages
PORT=4388 BASE_PATH=/NEBULIS-Atlas node scripts/serve.mjs dist-pages
# http://localhost:4388/NEBULIS-Atlas/
```

Hash routes preserve shareable resource links on static hosting; no rewrite server is required. The production bundle is about 14 MiB including videos, with only images/content needed for the active view loaded initially.

## Sources and credits

- [Content sources and link verification](docs/content-sources.md)
- [Research media sources and attribution](docs/media-sources.md)
- [Scene composition and maintenance](docs/map-artwork.md)
- [Scene asset sources and licenses](docs/scene-asset-sources.md)
- [Original homepage asset provenance](docs/template-home-assets.json)
- [Third-party notices](THIRD_PARTY_NOTICES.md)

The earlier Codédex study reconstruction is preserved in Git history at `1f8fc20` and in a separate local baseline backup. The current landing reuses that template’s original layers, detailed art, type and buttons. The research world is composed separately from the documented tile/sprite collection, with the catalog maintained independently.
