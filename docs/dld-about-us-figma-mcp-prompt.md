# Claude CLI Prompt — DLD About Us feature (Figma MCP driven)

Build the **About Us** feature of the DLD app from Figma, using the **Figma MCP**. Work **phase by phase** and **stop at the checkpoints**. If anything is unclear, **ask me before coding** — do not guess silently.

## Figma nodes (paste your links)
Process one node per pass. Labeled list:
- about-hub → https://www.figma.com/design/YDDNC8BYfnL5Bs4RcYiEgc/DLD?node-id=4589-89260&m=dev
- about-dld → https://www.figma.com/design/YDDNC8BYfnL5Bs4RcYiEgc/DLD?node-id=4058-84370&m=dev
- leadership-org (Management's Message, Organization Chart) → https://www.figma.com/design/YDDNC8BYfnL5Bs4RcYiEgc/DLD?node-id=2786-55708&m=dev , https://www.figma.com/design/YDDNC8BYfnL5Bs4RcYiEgc/DLD?node-id=2225-70293&m=dev, https://www.figma.com/design/YDDNC8BYfnL5Bs4RcYiEgc/DLD?node-id=2225-70648&m=dev and https://www.figma.com/design/YDDNC8BYfnL5Bs4RcYiEgc/DLD?node-id=2225-71626&m=dev
- partnerships (Partnership, Our Partners, Contact Partnerships Team) → https://www.figma.com/design/YDDNC8BYfnL5Bs4RcYiEgc/DLD?node-id=2791-57935&m=dev
- achievements (Milestones, World First, Sustained Recognition, Global Index, Certified Excellence) → https://www.figma.com/design/YDDNC8BYfnL5Bs4RcYiEgc/DLD?node-id=4066-87849&m=dev
> Some of these may be **sections inside one page** rather than separate routes — build whatever frames actually exist; the structure decides pages vs sections. If a frame isn't designed yet, tell me and stub it with `// TODO`.

## How to read each node (MCP)
For every node: run **get_design_context** first (structure/layout); if truncated, run **get_metadata** then re-fetch the needed child nodes; pull **get_variable_defs** (tokens); and take a **screenshot** for visual reference. Only implement after you have context + screenshot. **Ignore the hover-dropdown menu** in any frame — submenu navigation is the routed-hub flow only.

## Stack & conventions (non-negotiable)
- Latest **Angular** standalone, **signals**, `OnPush`; **Bootstrap 5** + **SCSS**; lazy routing.
- **Treat MCP output (React/Tailwind) as a design representation, not final code.** Rebuild in our stack, replace Tailwind utilities with **our design-system SCSS tokens**, and **reuse existing components** — never duplicate.
- **Reconcile tokens:** map `get_variable_defs` onto our existing SCSS tokens; do **not** invent new variables — flag mismatches as `// AMBIGUITY:`.
- **Icons:** every icon renders through our reusable **`<app-icon name="…">`** (pulls SVG from `assets/icons/`). Only capture the **icon name/slot** per usage — do **not** inline or download icon SVGs.
- **Images:** use **placeholders at each frame's real dimensions** until I supply assets (`// TODO: image`).
- **i18n EN/AR + full RTL:** extend the signal-based `TranslationService`, add keys to `assets/i18n/en.json` + `ar.json`, use **CSS logical properties**.
- **Accessibility:** semantic landmarks, headings, real lists, keyboard nav, visible focus, `aria-*`, `routerLinkActive`.
- **Responsive** to the mobile frames; **adapter pattern** for any list/content data (mock now, `// TODO(backend):`).
- **Minimal deps:** ask before adding any npm package.
- **Markers everywhere:** `// AMBIGUITY:` and `// TODO(backend):`. Keep `docs/DLD-SSOT.md` updated. Emit a **files-changed summary** each phase.

## PHASE 0 — Discovery (NO CODE)
Pull every node above via the MCP. In `docs/DLD-SSOT.md` record: routing map (hub route + each detail page/section route), per-frame layout breakdown (reusable vs page-specific), **token reconciliation** table (Figma variable → our SCSS token, with mismatches flagged), **icon-name map**, **image slots** (name + size), and i18n keys. End with an **Open Questions / AMBIGUITY** list. **STOP for my approval.**

## PHASE 1 — Feature scaffold & routing
Create the `about` feature module/folder, lazy routes for the hub + detail pages/sections (placeholders where a frame is missing), and confirm the `<app-icon>` component + `assets/icons/` convention exist (create if missing). Reuse the shell/footer. Update SSOT + summary. **STOP for review.**

## PHASE 2 — About hub
Build the hub from `about-hub`: breadcrumb, gradient hero (eyebrow, title, subtitle, watermark word), the group **cards** (icon chip + title + caption + green-dot link list + corner blob), logos band, footer. Data-driven, responsive, RTL, a11y. Validate 1:1 against the screenshot. Update SSOT + summary.

## PHASE 3 — Detail pages/sections
Build each detail frame in order, reusing shared components. Adapter + mock data where content is dynamic. Placeholders for images, `<app-icon>` for icons. Validate each 1:1. Update SSOT + summary after each.

## Guardrails
- Don't reintroduce hover dropdowns; submenu = routed hub only.
- Don't invent copy/tokens/links not in the frames — mark gaps.
- Don't inline icons or embed real images — component + placeholders.
- Keep diffs focused; reuse the shell/footer.

**Begin with Phase 0 only.**
