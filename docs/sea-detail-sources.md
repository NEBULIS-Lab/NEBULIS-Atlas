# Sea details: authored boat sprites and stone causeways

## Wooden boats

**Wooden Boat** by **Pavel Kutejnikov**, published by Kutejnikov on [OpenGameArt](https://opengameart.org/content/wooden-boat), is CC0 / public domain. Both the author page and the archive's `ReadMe.txt` state the license. Retrieved and visually inspected on 2026-11-04.

- Original download: https://opengameart.org/sites/default/files/wooden_boat.7z
- Original archive: `public/scene-assets/sea-details/wooden_boat.7z`
- Unmodified source PNG: `public/scene-assets/sea-details/Wooden_boat/boat.png`
- Original author/license text: `public/scene-assets/sea-details/Wooden_boat/ReadMe.txt`
- Dimensions, exact source rectangles, alpha bounds and SHA-256: `public/scene-assets/sea-details/provenance.json`
- License reference: https://creativecommons.org/publicdomain/zero/1.0/

The 72×72 transparent sheet contains three north-facing rowboats with warm, natural and weathered wood palettes. These are authored sprites, not extracted scenery or generated artwork. Attribution is optional under CC0; retaining the author's credit is encouraged.

| Variant | Source rectangle `(x,y,w,h)` | Center anchor within frame | Visible pixels within frame | Suggested scale |
| --- | --- | --- | --- | --- |
| Warm | `(0,0,24,72)` | `(12,36)` | `(1,9)` through `(22,62)` | 2× |
| Natural | `(24,0,24,72)` | `(12,36)` | `(1,9)` through `(22,62)` | 2× |
| Weathered | `(48,0,24,72)` | `(12,36)` | `(1,9)` through `(22,62)` | 2× |

At 2×, each frame is 48×144 world pixels and the hull is 44×108. Scale/anchors are rendering recommendations rather than artist-provided metadata. Use nearest-neighbor rendering and center rotation on the anchor if varying orientation. Draw only one source rectangle per vessel; drawing the full sheet would create three adjacent boats. A subtle world-space bob is appropriate for decoration. Place boats in open water clear of click targets and island edges.

## Stone bridge / causeway

Reuse the already licensed Pixel Frog **Tiny Swords archived CC0** stone sheet at `public/scene-assets/tiny-swords/tiny-swords-03.png`. The source and license evidence are recorded in [scene-asset-sources.md](scene-asset-sources.md). Keeping this stone material matches the authored island palette without introducing a second terrain style.

The 256×512 source sheet has a horizontal one-cell stone strip at y=256 and its exposed front face at y=320. All rectangles below are 64×64:

| Piece | Rectangle |
| --- | --- |
| Horizontal left end | `(0,256,64,64)` |
| Horizontal middle | `(64,256,64,64)` |
| Horizontal right end | `(128,256,64,64)` |
| Exposed front left / middle / right | `(0,320,64,64)`, `(64,320,64,64)`, `(128,320,64,64)` |
| Vertical narrow strip top / middle / bottom | `(192,0,64,64)`, `(192,64,64,64)`, `(192,128,64,64)` |
| Vertical strip exposed front | `(192,192,64,64)` |

Render at the same tile scale as the existing islands. Repeat middle pieces only; ends can overlap the shoreline to make a continuous causeway. The front-face tiles supply the existing cliff depth; draw them below the walkable surface, with the same depth treatment used by the island renderer. These cells are stone terrain used compositionally as a causeway, not a separate arched-bridge asset. No source images were cropped, resized, repainted or recolored on disk.
