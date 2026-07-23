# Shared markup — single source of truth

The nav, footer, shared inline styles, and shared inline scripts for the 13
main pages live HERE, not in the pages. Pages contain marked regions
(`<!-- build:nav -->` … `<!-- /build:nav -->`) that are overwritten on every
build. **Never edit inside a marked region in a page — edit the partial, then
run:**

    python3 build.py

## Files

| File | What it is |
|---|---|
| `nav.html` | Site nav. `{{TOKENS}}` are per-page active-link classes, filled by build.py from its `PAGES` config. |
| `footer.html` | Footer for 12 pages. |
| `footer-index.html` | index.html's footer variant (different tagline + Explore links). |
| `style-main.html` | The big shared `<style>` block (~24K). `{{IDX_KF}}` = index-only keyframe fragment. |
| `style-cards.html` | 3D premium-card styles. |
| `style-transitions.html` | Page-transition (curtain) styles. |
| `style-cookiebar.html` | Cookie bar styles. |
| `script-*.html` | Shared `<script>` blocks (nav restore, cookie consent, mobile menu, motion, pointer, motion-fine). |
| `_data_svc_row.txt` | index-only mobile "Services" menu line. |
| `_data_idx_kf.txt` | index-only keyframe fragment (currently malformed — pending fix). |

## Out of scope

`thank-you.html` and `readiness-checklist.html` are standalone and not built.
index.html additionally keeps two page-specific scripts inline (availability
bar config — edit the quarter there — and its extended motion script).

## Per-page nav state

Which link is gold on which page is configured in `PAGES` at the top of
`build.py`, including some inherited quirks preserved on purpose (see
comments there).
