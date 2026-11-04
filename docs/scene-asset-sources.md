# Composable scene assets

The map assets are independent authored pixel-art tiles and transparent props. Every PNG/GIF is retained byte-for-byte; there are no generated islands, flattened town backgrounds, resized source files, or recolored sprites in this collection. Rendering composes terrain cells, props, characters, and interaction targets separately.

## Tiny Swords archived CC0 tiles

- Artist: **Pixel Frog**.
- Download: https://www.spritefusion.com/downloads/tilesets/tiny-swords.zip
- Distribution and license: https://www.spritefusion.com/tilesets/tiny-swords explicitly identifies Pixel Frog, **64×64** tiles and **CC0**.
- Author: https://pixelfrog-assets.itch.io/tiny-swords separately offers **TS_old version_CC0 Licensed**. The current Free Pack uses different terms; it was not downloaded or mixed into this collection.
- License reference: https://creativecommons.org/publicdomain/zero/1.0/ and `public/scene-assets/tiny-swords/LICENSE.txt`.
- Retrieval/license check: 2026-11-04.
- 52 original PNG files, approximately 0.3 MB. Per-file dimensions, SHA-256, source rectangles, alpha bounds, anchors, and animation frames are in `public/scene-assets/atlas.json`.

The old pack has a coherent fantasy palette, transparent houses/castles/towers, plants, animated pine trees, rocks, bridges/docks, water animation, grass, sand, and cliffs. It is an authored tile set, not the original Codédex town artwork. The original town's objects were flattened into a complete scene, so treating that scene as an independently movable island would not provide tile-level composition.

## Terrain geometry

All source coordinates below are pixels. The world-grid cell size can differ from the 64-pixel source cell size. Disable interpolation (`imageSmoothingEnabled=false` / `image-rendering: pixelated`).

`tiny-swords-04.png` is 640×256. The verified nine-patch grass block starts at (0,0), with columns 0/64/128 and rows 0/64/128. The matching sand block starts at (320,0), with columns 320/384/448 and the same rows. The nine positions are, in row order:

```
topLeft  top     topRight
left     center  right
bottomLeft bottom bottomRight
```

Every source rectangle is 64×64. Center grass is `(64,64,64,64)` and center sand is `(384,64,64,64)`. Use center cells in interior areas, the matching edge when the adjacent cell is water/outside, and corner pieces at convex outer corners. These patches support clean stepped/rectangular island footprints. Do not treat the full sheet as one repeated ground texture. Additional atlas columns include narrow-strip / transition pieces; these were intentionally not assigned unverified concave-mask semantics.

`tiny-swords-03.png` is 256×512. Its top 3×3 block is elevated rock surface. The next row at y=192 contains left/center/right cliff fronts (x=0/64/128); repeat middle fronts along the bottom exposed edge. The stairs are y=448, x=0/64/128. Draw a cliff front below the walkable edge, not on top of the walkable surface.

`tiny-swords-01.png` is 192×256. Horizontal bridge start/middle/end are the three 64×64 cells at y=0. Vertical start/middle/end are x=0 and y=64/128/192. Draw bridges over water and repeat only their middle cells.

`tiny-swords-10.png` is a 64×64 uniform sea-color tile. The atlas records its original turquoise color. Water foam `tiny-swords-05.png` has eight 192×192 frames in one horizontal row; the opaque foam occupies the center of each frame. Place below shoreline terrain and offset animation phases. Other water-rock animations `06`–`09` each have eight 128×128 frames in a horizontal row.

Recommended order: sea → foam → sand footprint → grass interior → cliff fronts / stairs / bridge → depth-sorted buildings and trees → props / characters → labels and click targets. Independent y-sorted props use their ground-contact anchors.

## Useful objects and anchors

Anchors are source-space points (x,y) to place on the ground plane. For a scale `s`, draw a source frame at `(worldX-anchorX*s, worldY-anchorY*s)`.

| Asset suffix | Object | Source/frame size | Anchor |
|---|---|---|---|
| 35 | Blue castle | 320×256 | (160,250) |
| 38 | Red castle | 320×256 | (160,250) |
| 39 | Blue house | 128×192 | (64,172) |
| 42 | Red house | 128×192 | (64,172) |
| 43 | Blue tower | 128×256 | (64,235) |
| 46 | Red tower | 128×256 | (64,235) |
| 49 | Active gold mine | 192×128 | (96,126) |
| 51 | Gold mine | 192×128 | (96,119) |
| 31 / 34 | Blue / red workshop animation | 4 frames of 256×192 | (128,171) |
| 52 | Pine animation | 6 frames of 192×192 | (96,178) |

Every suffix refers to `/scene-assets/tiny-swords/tiny-swords-NN.png`. For pine `52`, the atlas is 768×576: frames 0–3 are (0,0), (192,0), (384,0), (576,0); frames 4–5 are (0,192), (192,192). The lower row contains a stump, not further animation frames. Suggested pine animation: approximately 6 fps. Other suggested timing values in the metadata are presentation choices, not claims about the artist's original timing.

For static trees, use frame 0 `(0,0,192,192)` only. Drawing the full 768×576 sheet would incorrectly display six trees and a stump. Tiny props `11`–`25` are individual 64×64 images with transparent margins; their exact visible bounds are in the atlas.

## Original Codédex decorative sprites

The `codedex/` assets were restored from the project's supplied original template capture at commit `1f8fc20`; their source URLs match `docs/asset-provenance.json` in that commit. `codedex/provenance.json` records exact URLs, dimensions, animation counts, durations, and SHA-256 checksums. They retain their original provenance; **they are not covered by the Tiny Swords CC0 license**.

- `6wYeoCS.gif` — 280×200, six frames; original hero party / robot animation.
- `battle.gif` — 480×320, six frames; original characters and snake.
- `qOSmiVc.gif` — 480×320, five frames; original gathering scene.
- `tekmLsi.gif` — 480×430, six frames; original rocket and robot.
- `dZ7Qu9K.gif` — 280×280, six frames; original party marker.
- `Ai30sjf.gif` — 599×506, eleven frames; terminal and characters.
- `data-structures-and-algorithms.gif` — 400×400, six frames.
- `letter.gif` — 300×265, 36 frames.
- `coin-cropped.png` — 907×1033, transparent original coin; displayed at small CSS dimensions without modifying its file.

These GIFs are small transparent decorative scenes, not individual character sprite sheets. Keep native animation in an `<img>` when used. Do not assume a browser canvas automatically advances a GIF image's frame. They complement the original template identity without being used as flattened map terrain.
