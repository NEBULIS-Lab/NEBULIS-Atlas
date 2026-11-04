# Template home and composed research world

The user approved: preserve the original Codédex landing layout and detailed visual elements, change its branding/copy; enter a separate full-screen interactive sea through Explore; build islands from independent terrain, scenery and node objects; reveal research content only after choosing an island. Reuse template art and styles wherever possible instead of generating replacements.

Implementation decisions: retain the original landing markup/styles in an isolated same-origin document, with live links into the atlas. Compose a data-driven world from a documented CC0 terrain atlas, independent building/tree/character sprites, and original template small sprites/fonts. Camera drag, touch pinch, zoom controls, island selection/focus and animated water/scenery are browser-side. Preserve the existing JSON catalog and static GitHub Pages publication.

- [x] Restore original layered landing and adapt only content/navigation.
- [x] Compose seven independent regions from terrain and scene objects; no flattened all-island backdrop.
- [x] Implement full-screen camera, selection, animations and research panels.
- [x] Integrate routes, accessible/mobile alternatives and retained library.
- [ ] Inspect screenshots and run one focused interaction check, then publish.

Verification is deliberately limited to the changed journey and essential display/interaction behavior, following the user's preference.

Local verification: the prefixed GitHub Pages build passed a focused 10-check browser journey at desktop and phone widths, with zero browser errors, missing requests or external runtime dependencies. It covers landing navigation, seven composed regions, camera controls, island/node selection, video playback, persisted reading marks, glossary, bookmarks, search and the mobile panel. Source syntax and catalog/scene asset references also passed. Deployment verification follows publication.
