# Research media provenance

Verified: 2026-11-04. The atlas stores all display media locally under `public/research-media/`; `content/media.json` maps 13 catalog entries to 11 images and 5 MP4 excerpts. Related RoboTwin and PARTNR entries intentionally share the same media.

All inputs were retrieved from the public official project pages or the official ManiSkill repository. No unpublished experiment outputs were used. The still figures are byte-for-byte copies; video posters are frame extractions. Videos were clipped, resized to 960 pixels wide, encoded as H.264 / yuv420p at 24 fps, stripped of audio, and given MP4 fast-start metadata. Original source overlays and playback-speed labels are preserved. The excerpts are illustrations of the published demos, not independent evaluations.

## Sources and transformations

| Local media | Official source file | Transformation | Credit |
|---|---|---|---|
| `aloha.jpg; aloha.mp4` | [Original](https://tonyzhaozh.github.io/aloha/resources/slot_battery.mp4) | Poster at 3 s; video 0–12 s | ALOHA / ACT, Tony Z. Zhao et al. |
| `diffusion-policy.jpg; diffusion-policy.mp4` | [Original](https://diffusion-policy.cs.columbia.edu/videos/highlight_mug.mp4) | Poster at 3 s; video 0–12 s (or source end); source video displays 4× speed | Diffusion Policy, Cheng Chi et al. |
| `droid.jpg; droid.mp4` | [Original](https://droid-dataset.github.io/videos/droid_eval_videos/apple_droid.mp4) | Poster at 3 s; video 0–12 s; source display aspect ratio preserved | DROID Dataset Team |
| `robotwin.jpg; robotwin.mp4` | [Original](https://robotwin-platform.github.io/RoboTwin2.0_video.mp4) | Poster at 20 s; video 18–30 s | RoboTwin Team |
| `d-jepa.jpg; d-jepa.mp4` | [Original](https://nebulis-lab.com/D-JEPA/static/videos/robotwin.mp4) | Poster at 3 s; video 0–12 s | NEBULIS-Lab / D-JEPA Team |
| `dino-wm.png` | [Original](https://dino-wm.github.io/mfiles/figs/intro.png) | Unmodified official overview image | Gaoyue Zhou, Hengkai Pan, Yann LeCun, Lerrel Pinto |
| `maniskill.jpg` | [Original](https://raw.githubusercontent.com/mani-skill/ManiSkill/main/figures/teaser.jpg) | Unmodified official environment montage | ManiSkill Team; scene datasets AI2THOR and ReplicaCAD |
| `robotwin-od.png` | [Original](https://robotwin-platform.github.io/assets/images/robotwin-od.png) | Unmodified official object-asset overview | RoboTwin Team |
| `partnr.png` | [Original](https://aihabitat.org/partnr/assets/images/gen_pipeline.png) | Unmodified official task-generation pipeline figure | Meta FAIR / PARTNR Team |
| `bas-vla.png` | [Original](https://nebulis-lab.com/image/projects/beyond-appearance-shifts/overview.png) | Unmodified public lab overview figure | NEBULIS-Lab / BAS-VLA Team |
| `brace.png` | [Original](https://nebulis-lab.com/image/projects/brace/overview.png) | Unmodified public lab overview figure | NEBULIS-Lab / BRACE Team |

## Rights notes

Copyright remains with the respective project authors and other identified rights holders. Public availability and attribution do not themselves establish a redistribution license. No code repository license has been assumed to cover the images or videos.

- **ALOHA, Diffusion Policy, DROID, RoboTwin, DINO-WM, PARTNR:** no media-specific reuse license was found on the consulted project pages. These files are attributed research illustrations; permission or a separately applicable license should be established for uses requiring it.
- **ManiSkill:** the [official README](https://github.com/mani-skill/ManiSkill#license) states that assets use [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/); it credits AI2THOR and ReplicaCAD for scenes in the teaser. The teaser image is not separately licensed on that page, so this record does not assert that the repository code license grants image rights.
- **BAS-VLA, D-JEPA, BRACE:** retrieved from the lab’s already-public website for its own atlas. No separate media license was stated on the consulted pages; credit is retained and no open-license assertion is added.

PARTNR’s benchmark video endpoint timed out during acquisition. The local atlas therefore uses the official task-generation image for PARTNR, and does not reference an unavailable video.

## File verification

| File | Bytes | Format / size | SHA-256 |
|---|---:|---|---|
| `aloha.jpg` | 40,263 | JPEG; 960 × 540 | `6d8aa9c1d60806b1d81dee8c7339748f6d56dc36cf9816f904611fa8171f68da` |
| `aloha.mp4` | 632,969 | MP4; H.264, yuv420p; decoded successfully; fast-start | `46d47b605155b24e389861b5a2c8b5e3428370942ee2adf04901972481330843` |
| `bas-vla.png` | 1,642,021 | PNG; 1149 × 1318 | `1760712cc8af77dc7aa9339def1078afcaadba951443dda86f4c24d68c3cafb1` |
| `brace.png` | 1,289,235 | PNG; 2052 × 1144 | `0abf0617c660f51dd6573207fe5d6db97b6ec051a94878cb5f366c04a4584bf8` |
| `d-jepa.jpg` | 36,178 | JPEG; 960 × 420 | `2618a55033058af9b78d1147a465dba854240bba6a4a81813a7368bf4a7e4cc1` |
| `d-jepa.mp4` | 155,871 | MP4; H.264, yuv420p; decoded successfully; fast-start | `a1ddfd723f7ee8a2198d491e894fe6c5a4530243d4b38ef12b400ecb3b270ed1` |
| `diffusion-policy.jpg` | 83,107 | JPEG; 960 × 640 | `7551fea6f9f129dc35c2f152d427bfb0f06cb93d0da844202198b916a408d234` |
| `diffusion-policy.mp4` | 841,161 | MP4; H.264, yuv420p; decoded successfully; fast-start | `52231eb4bd200e05a06519d7339da2d9f794912576230f76aad15d4206d62fcf` |
| `dino-wm.png` | 331,741 | PNG; 2298 × 942 | `44a1b8d05245b0bcd837142bd438d03fed4e17aa24f8ee0306a6bf0579e716a3` |
| `droid.jpg` | 58,144 | JPEG; 960 × 540 | `debb756c870bacea6bc88ae3722697748dec0bc19475744093bcf0dff54a60d2` |
| `droid.mp4` | 489,834 | MP4; H.264, yuv420p; decoded successfully; fast-start | `7a38c3395d9b6ae2abf92bd68e6e512b60c6db1d9d4b43b55b418cd278707860` |
| `maniskill.jpg` | 1,317,676 | JPEG; 4800 × 2161 | `cc7e9b031db396d0fdb972672f23a8d4cbc591dd822e9d6044f362e612b3a3e0` |
| `partnr.png` | 685,167 | PNG; 3337 × 634 | `c93f6d9965a9581f7ddb7a6968a6fca127fd275a81a4f0ccbda3451b35067612` |
| `robotwin-od.png` | 1,285,608 | PNG; 2350 × 1040 | `6d20b126d2cb4d07fa916123e7ec17e0910ab73aadfece6fc068629a4d5e94b8` |
| `robotwin.jpg` | 83,756 | JPEG; 960 × 540 | `690d7c755d93ea71083f8782d11c53ed1455a0f220f3b6f458e6c573b0aa1514` |
| `robotwin.mp4` | 511,412 | MP4; H.264, yuv420p; decoded successfully; fast-start | `9938d9957c3181fb9462d25ba9dc46863cad823adba7798bc45484181695eb41` |

Total local media: **9,484,143 bytes (9.48 MB)**. All 11 images were visually inspected. All 5 MP4s passed a complete CPU decode and contain fast-start metadata. Every catalog media path resolves locally.
