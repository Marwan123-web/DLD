# Claude CLI Prompt — DLD About Us feature (Figma links + screenshots + pixel parity)

Build the **About Us** feature of the DLD app to **match the Figma design exactly (1:1)**. You have, per frame, a **Figma MCP link** (structure + tokens) and a **screenshot** (ground truth for the look). Work **phase by phase**, **stop at the checkpoints**, and **ask me before coding** whenever something is unclear — never guess silently.

## Frames — fill link + screenshot for each
Process one frame per pass.

| label | figma link | screenshot path |
|---|---|---|
| navbar/header (top primary nav) | <FIGMA LINK> | <SCREENSHOT PATH> |
| about-hub | <https://www.figma.com/design/YDDNC8BYfnL5Bs4RcYiEgc/DLD?node-id=4589-89260&m=dev> | <about-us-screens/AB-01 About Us — Hub.png> |
| about-dld | <https://www.figma.com/design/YDDNC8BYfnL5Bs4RcYiEgc/DLD?node-id=4058-84370&m=dev> | <about-us-screens/About DLD.png> |
| leadership-org | <https://www.figma.com/design/YDDNC8BYfnL5Bs4RcYiEgc/DLD?node-id=2786-55708&m=dev> | <about-us-screens/Leadership & Organization.png> |
| partnerships | <https://www.figma.com/design/YDDNC8BYfnL5Bs4RcYiEgc/DLD?node-id=2791-57935&m=dev> | <about-us-screens/Partnership & International Relations.png> |
| achievements | <https://www.figma.com/design/YDDNC8BYfnL5Bs4RcYiEgc/DLD?node-id=4066-87849&m=dev> | <about-us-screens/Our Achievements.png> |

> Some rows may be **sections inside one page** rather than separate routes — build whatever frames actually exist; the structure decides pages vs sections. If a frame isn't designed yet, tell me and stub it with `// TODO`. Add mobile screenshots too where you have them.

## Setup that must be in place first (verify in Phase 0, tell me if missing)
- **Fonts:** the exact Latin + Arabic families from the design are installed/loaded. If not, stop and tell me — wrong fonts shift every size, weight, and line-wrap. Fonts: <LIST OR "confirm from Figma">.
- **Browser screenshot tool** for the parity loop (Playwright MCP or headless browser) so you can capture your own rendered pages.
- **Reuse, don't recreate:** existing design-system SCSS tokens, the `<app-icon>` component + `assets/icons/`, the `TranslationService`, and the shell/footer. Detect these and reuse; ask before creating a duplicate.

## How to read each frame (MCP)
Run **get_design_context** first (structure + layout + measurements); if truncated, run **get_metadata** then re-fetch the needed child nodes; pull **get_variable_defs** (tokens); and **get_screenshot**. Also load the **provided screenshot** into context and treat it as the visual source of truth. **Ignore any hover-dropdown menu** in the frames — submenu navigation is the routed-hub flow (see Phase 1B).

## Stack & conventions (non-negotiable)
- **Match Figma exactly (1:1).** Spacing, sizes, colors, typography, radii, shadows, alignment, and layout come from `get_design_context` + the screenshot. Rebuilding in our stack changes the *implementation*, never the *look*. **Where Bootstrap's scale can't hit a Figma value, use raw SCSS with the exact px/hex** — do not round to the nearest Bootstrap utility. Any value with no matching design-system token: reproduce it exactly and flag `// AMBIGUITY:`.
- Latest **Angular** standalone, **signals**, `OnPush`; **Bootstrap 5** + **SCSS**; lazy routing.
- **MCP code output (React/Tailwind) is a design representation, not final code** — rebuild in our stack, reuse existing components, never duplicate.
- **Reconcile tokens:** map `get_variable_defs` onto our existing SCSS tokens; don't invent new ones — flag mismatches.
- **Icons:** render through `<app-icon name="…">` (SVG from `assets/icons/`); capture only the icon **name/slot** — never inline or download SVGs.
- **Images:** **placeholders at each frame's real dimensions** until I supply assets (`// TODO: image`).
- **i18n EN/AR + full RTL:** extend the signal-based `TranslationService`, keys in `assets/i18n/en.json` + `ar.json`, use **CSS logical properties**.
- **Accessibility:** semantic landmarks, headings, real lists, keyboard nav, visible focus, `aria-*`, `routerLinkActive`.
- **Responsive** to the mobile frames; **adapter pattern** for dynamic data (mock now, `// TODO(backend):`).
- **Minimal deps:** ask before adding any npm package.
- **Markers + reporting:** `// AMBIGUITY:` and `// TODO(backend):` inline; keep `docs/DLD-SSOT.md` updated; emit a **files-changed summary** each phase.

## Pixel-parity loop — run for EVERY frame before moving on
1. Build the frame.
2. Start the dev server and open the route.
3. **Screenshot your rendered page** at the frame's viewport width — desktop **and** mobile.
4. Put your screenshot **side by side** with the Figma screenshot for that frame.
5. **List every visible difference:** spacing/padding/margins, element sizes, colors, font family/size/weight/line-height, border-radius, shadows, alignment, and positions.
6. Fix and repeat from step 2 until there are **no meaningful differences**.
7. Report the final before/after comparison and remaining `// AMBIGUITY:` items.

## Phases
**PHASE 0 — Discovery (NO CODE).** Pull every frame via MCP. In `docs/DLD-SSOT.md` record: routing map, per-frame layout breakdown (reusable vs page-specific), **token-reconciliation table** (Figma variable → our SCSS token, mismatches flagged), **icon-name map**, **image slots** (name + size), i18n keys, and a **fonts/setup check**. End with an **Open Questions / AMBIGUITY** list. **STOP for approval.**

**PHASE 1 — Feature scaffold & routing.** Create the `about` feature folder, lazy routes for hub + detail pages/sections (placeholders where a frame is missing), confirm `<app-icon>` + `assets/icons/` exist. Reuse shell/footer. Update SSOT + summary. **STOP.**

**PHASE 1B — Navbar: hover → routed hubs.** Drive the navbar from a single **menu-config SSOT** (e.g. `src/app/core/navigation/menu.config.ts`) so navbar and hubs share one submenu source. Parent hub items (About DLD, Services, Open Data & Insights, News and Media, Help and Support) become `routerLink`s to their hub route; **remove** hover dropdowns. Keep Home / Trainings & Programs as direct links. Fix a11y (drop `aria-expanded`/`aria-haspopup`, add `routerLinkActive`). Match the navbar to Figma exactly and **run the parity loop**. Wire the **About** hub live; other hubs get `// TODO: content`. Update SSOT + summary. **STOP.**

**PHASE 2 — About hub.** Build from `about-hub`: breadcrumb, gradient hero (eyebrow, title, subtitle, watermark word), the group **cards** (icon chip + title + caption + green-dot link list + corner blob), logos band, footer. **Run the parity loop.** Update SSOT + summary.

**PHASE 3 — Detail pages/sections.** Build each detail frame in order, reusing shared components; adapter + mock data for dynamic content; `<app-icon>` + image placeholders. **Run the parity loop per frame.** Update SSOT + summary after each.

## Guardrails
- Don't reintroduce hover dropdowns; submenu = routed hub only.
- Don't invent copy/tokens/links not in the frames — mark gaps.
- Don't inline icons or embed real images — component + placeholders.
- Don't round Figma values into Bootstrap defaults — exact px/hex where needed.
- Keep diffs focused; reuse the shell/footer.

**Begin with Phase 0 only.**
