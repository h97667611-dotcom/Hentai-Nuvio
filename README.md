# Hentai Streams — Nuvio

Metadata-only adapter scaffolds for adult anime sources.

## Sources
- Hanime.tv: page-based metadata search/details adapter
- HentaiHaven: page-based metadata search/details adapter
- Hanime.red and A-Hentai TV: disabled placeholders; site/API not verified

## Usage
The adapters export `search(query)`, `details(url)`, and `getStreams()`. Search/details use public HTML pages and Open Graph metadata where present. They do not extract media/video URLs; `getStreams()` intentionally returns an empty list.

## Important
These functions are generic HTML heuristics, not verified against the current site DOM or Nuvio's exact provider contract. Site availability, robots/terms, age gates, and legal authorization must be checked before enabling. No login, paywall, DRM, CAPTCHA, or access controls are bypassed.

Install manifest: https://raw.githubusercontent.com/h97667611-dotcom/Hentai-Nuvio/main/manifest.json
