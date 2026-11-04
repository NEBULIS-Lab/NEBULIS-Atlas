# NEBULIS Research Adventure

## Intent
Turn the preserved Codédex study template into NEBULIS-Lab's public research onboarding atlas. Readers explore connections between robotics, embodied intelligence, world models, multi-agent collaboration and distributed AI, then leave with useful papers, repositories and experimental resources.

## Design decisions
The user supplied the resource inventory and delegated layout/content organization decisions. Preserve the template's dark colors, pixel typography, tactile buttons and game exploration atmosphere. Replace its branding and proprietary scene artwork with the lab identity and an original illustrated archipelago. English names and the exact English slogan sit beside concise Chinese learning guidance.

Considered a pure resource directory, a game-only map, and a shared catalog with map and directory views. Use the third: the map gives orientation, while search and filters provide direct retrieval. All content stays open; recommended order never locks a node. No login, community, pricing, code execution or backend services.

## Structure
- World map: starting island, five research islands, resource harbor. Clickable islands lead to connected learning nodes.
- Island pages: orientation, ordered nodes, optional branches, linked datasets/benchmarks and laboratory frontier.
- Resource directory: search by title, summary and tags; filter by direction and resource type. Dataset, simulator and benchmark remain distinct types.
- Resource pages: introduction, what to learn, prerequisites, official links, attributed visual demonstrations, related resources and term definitions.
- Five learning journeys and a laboratory frontier page.
- Optional browser-local reading marks and bookmarks; no account or XP.

## Implementation
Reuse the repository's lightweight Python build and Node static server. Application is plain HTML/CSS/JavaScript with hash routes so deep links survive GitHub Pages without server rewrites. Data lives in content/catalog.json, content/islands.json and content/media.json. Share one resource object between maps, search and journeys. Render with escaped content. Bundle images, fonts and selected short videos; videos load only on demand. Honor reduced motion and support keyboard/mobile use.

## Content rules
Use the user-approved inventory; verify primary sources, fix mistaken links and distinguish paper versions from evolving repos. Preserve explicit differences such as bimanual manipulation versus multi-agent learning. Unpublished lab directions must not be assigned fabricated papers or venue claims. Strip tracking parameters. Keep asset provenance in documentation and credits next to demonstrations.

## Verification and delivery
Follow the user's request for proportionate testing: data/reference validation, one focused browser smoke check and desktop/mobile visual inspection. Deploy source to main and static output to gh-pages using the already authorized personal SSH account. Preserve the separately verified pre-redesign backup. Keep machine details out of repository files.
