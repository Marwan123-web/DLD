# DLD Web App — Single Source of Truth (SSOT)

> Last updated: **Phase 0 — Figma MCP Discovery (2026-09-02)**
> Prior approximate values have been replaced with confirmed Figma data.
> Values marked ⚠️ MISMATCH differ from the current `_tokens.scss`.
> Values marked ❓ AMBIGUITY require a decision before coding begins.

---

## 0. Phase 0 Scope

Figma file key: `YDDNC8BYfnL5Bs4RcYiEgc`

| Label | Node ID | Description |
|---|---|---|
| `about-hub` | `4589:89260` | AB-01 About Us — Hub (landing/index page) |
| `about-dld` | `4058:84370` | About DLD / Who We Are (long-scroll page) |
| `leadership-overview` | `2786:55708` | Leadership & Organization page |
| `chairman-modal` | `2225:70293` | Chairman message modal |
| `dg-modal-short` | `2225:70648` | DG message modal (short / 710px) |
| `dg-modal-full` | `2225:71626` | DG message modal (full / 1282px) |
| `partnerships` | `2791:57935` | Partnerships & International Relations page |
| `achievements` | `4066:87849` | Our Achievements page |

---

## 1. Routing Map

### 1.1 Current Routes (in `app.routes.ts`)

| Path | Component | Status |
|---|---|---|
| `/about-dld` | `AboutComponent` (Who We Are long page) | EXISTS |
| `/about-dld/leadership` | `LeadershipComponent` | EXISTS |
| `/about-dld/partnerships` | `PartnershipsComponent` | EXISTS |

### 1.2 Required Routes (from Figma)

| Path | Component | Status |
|---|---|---|
| `/about-dld` | `AboutHubComponent` (2×2 card grid) | ❓ AMBIGUITY #1 — NEW, BREAKING |
| `/about-dld/who-we-are` | `AboutComponent` (long scroll) | ❓ AMBIGUITY #1 — needs rename/move |
| `/about-dld/leadership` | `LeadershipComponent` | EXISTS — keep |
| `/about-dld/partnerships` | `PartnershipsComponent` | EXISTS — keep |
| `/about-dld/achievements` | `AchievementsComponent` (NEW) | MISSING |

> ❓ **AMBIGUITY #1 — Routing breaking change:** Figma shows `/about-dld` as a hub index page with a 2×2 card grid linking to the four sub-pages. The current codebase uses `/about-dld` for the full "Who We Are" scroll page. **Decision needed:** (a) create `AboutHubComponent` at `/about-dld` and move `AboutComponent` to `/about-dld/who-we-are`, OR (b) keep current routing and skip the hub page.

---

## 2. Per-Frame Layout Breakdown

### 2.1 About Hub — `4589:89260` (1536 × 1638px)

**Purpose:** Index/landing page for the About section. 2×2 card grid with icons, title, subtitle, and bullet links.

| Region | Dimensions | Type |
|---|---|---|
| Page hero band | 1536 × 420px | Page-specific (no illustration slot — different from `PageHeroComponent`) |
| Card grid wrapper | 1400 × 556px (centred) | Page-specific layout |
| Hub card (×4) | 680 × 254px | ❓ AMBIGUITY #2 — new shared component needed |
| Partners section | 1536 × ~200px | REUSE `PartnersSectionComponent` |

**Hub card anatomy (confirmed from `4964:99131`):**

| Element | Value |
|---|---|
| Container bg | `#ffffff` |
| Container border-radius | `20px` → maps to `--radius-xl` (24px) ⚠️ MISMATCH by 4px |
| Container box-shadow | `0px 8px 22px 0px rgba(8,35,32,0.05)` → close to `--shadow-card` |
| Container padding | `24px` → `--space-6` ✓ |
| Decor blob (absolute) | 140 × 140px, `top: -50px`, `inset-inline-end: 0` (overflows top-right corner) |
| Icon tile bg | `#e0f6ef` (light green) |
| Icon tile border-radius | `13px` → nearest: `--radius-md` (8px) ⚠️ MISMATCH |
| Icon tile padding | `11px` |
| Icon size | 22 × 22px |
| Card title | `17px` bold, `#1f2421` |
| Card subtitle | `12px` regular, `#6b7873` |
| Gap: header → bullets | `29px` |
| Bullet dot | 8px green SVG circle |
| Bullet text | `12px` medium, `#1f2421`, gap `8px` from dot |

**Hub cards (content):**

| Position | Node | Route Link | Title | Subtitle | Icon (vuesax) | Bullets |
|---|---|---|---|---|---|---|
| Top-left | `4964:99131` | `/about-dld/who-we-are` | Who We Are | Discover DLD | `courthouse` | About DLD · Values · Vision Mission · Strategic Map |
| Top-right | `4964:99180` | `/about-dld/leadership` | Leadership & Organization | How we are led | `profile-2user` | Management's Message · Organization Chart |
| Bottom-left | `4964:99220` | `/about-dld/partnerships` | Partnership & International Relations | Our network | `global` | Partnership · Our Partners · Contact the Partnerships Team |
| Bottom-right | `4964:99261` | `/about-dld/achievements` | Our Achievements | What you'll find inside at a glance | `medal-star` | Milestones Year By Year · World First · Sustained Recognition · On The Global Index · Certified Excellence |

---

### 2.2 About DLD / Who We Are — `4058:84370` (1536 × 6106px)

#### Sub-frame `4058:84418` — Hero (1536 × 630px)
- Heading: "Who We Are"
- Intro glass card beneath heading
- 4 factoid chips in a row:

| Chip label | Icon (vuesax) |
|---|---|
| Established 23 Jan 1960 | `calendar` |
| Law No.(7) 2013 | `judge` |
| Chairman HH Sheikh Hamdan | `profile-circle` |
| Regional & international reach | `global` |

- Type: Page-specific hero — REUSE `PageHeroComponent` (no illustration slot needed; pass `watermark`)

#### Sub-frame `4066:87503` — Our Story Timeline

5 numbered entries with vertical connector line on the start side:

| # | Title | Date ref | Key icon | Notable content |
|---|---|---|---|---|
| 01 | Our Genesis | 1960s | `archive-book` | Founded as official land registry |
| 02 | Under the Aegis of Excellence | — | `courthouse` | Growth under leadership |
| 03 | Our Commitment | — | multiple | RERA + 4 sectors: `security` · `buildings-2` · `folder` · `people` |
| 04 | Beyond Boundaries | — | `global-search` | Dubai 2040 plan · National Wellbeing 2031 links |
| 05 | Sculpting the Future | 2013 | `judge` | Law No.(7) 2013 |

- Type: Page-specific section (differs from existing `TimelineComponent` which is year-based)
- ❓ AMBIGUITY #3: Existing `TimelineComponent` uses `{ year, title, caption }` — doesn't support icons or multiple sub-items. Need to extend or create new component.

#### Sub-frame `4066:87596` — Values Section

- Watermark words: **TRUST · VISION · GROWTH · INTEGRITY** (large, rgba opacity, background)
- Values list (icon-list style): Proficient Team · People-centric · Justice · Passion · Boldness
- Type: REUSE `WatermarkTextComponent` + `IconListComponent` (already in `about.component`)

#### Sub-frame `4066:87631` — Strategic Map

- 5 cards numbered 01–05: 3 top row + 2 bottom row (wider)
- Matches existing `STRATEGIC_CARDS` data in `about.component.ts` ✓
- Type: REUSE `NumberedCardComponent` (already wired)

---

### 2.3 Leadership & Organization — `2786:55708` (1536 × ~3000px)

#### Region — Hero
- Heading: "Leadership & Organization"
- Breadcrumb: Home > About DLD > Leadership & Organization
- Type: REUSE `PageHeroComponent`

#### Region — Messages from Leadership
- 2 cards side by side, each 672px wide:
  - **Chairman card:** "LEADERSHIP" chip · "Chairman Message" · "H.E. Marwan bin Ghalita" · excerpt · "Read more" CTA · portrait placeholder right side (202 × 225px)
  - **DG card:** same structure · "H.E. Omar Bu Shehab"
- Clicking "Read more" opens modal overlay
- Type: REUSE `LeadershipCardComponent` (already in codebase with `green` / `navy` themes)

#### Region — Org Chart

Full hierarchy with connector lines:

```
Chairman
├── Chairman Office
└── Director General
    ├── DG Office
    ├── Internal Audit & Risk Dept
    ├── Legal Affairs Dept
    ├── Strategy & Future Dept
    └── Rental Disputes Center
        ├── Technical Office
        ├── Conciliation Dept
        ├── Central Support Dept
        ├── Execution of Judgments
        ├── Eviction Section
        └── Financial Claims
    └── [3-column sector grid]
        ├── Corporate Support Sector
        │   └── HR+Dev · Admin+Procurement · Financial Affairs · Marketing+Comms · Digital Transformation · Knowledge+Data
        ├── Real Estate Registration Sector
        │   └── RE Transactions · Rental Affairs · Survey · Custodies+Compensations · RE Services Pioneering
        └── Real Estate Regulatory Agency / RERA
            └── RE Licensing+Enablement · Jointly Owned Property · RE Control
```

- Download button in org chart header
- Type: Page-specific — REUSE `OrgChartComponent` (exists, but has no HTML template — verify)

---

### 2.4 Chairman Modal — `2225:70293` (1366 × ~800px)

**Theme:** Green gradient `#0a2e24 → #1b7a5d` (left-to-right, or top-to-bottom)

| Element | Value |
|---|---|
| Portrait | 485 × 541px, `inset-inline-start` |
| Eyebrow | "LEADERSHIP" — uppercase, letter-spaced, small, white |
| Title size | `66px` bold, white |
| Green divider bar | 48 × 4px, `#00a875` |
| Watermark: top | "Chairman" — rgba(255,255,255,0.04) |
| Watermark: bottom | "Message" — same |
| Signature line | "H.E. Marwan bin Ghalita · Director General, Dubai Land Department" |
| Close button | 51 × 51px, absolute top-right corner |
| Breadcrumb | Home > About DLD > Message from the Chairman |

- Type: REUSE `LeadershipMessageModalComponent` — verify existing green theme matches `#0a2e24 → #1b7a5d`

---

### 2.5 DG Modal — `2225:71626` (full, 1282px tall)

**Theme:** Navy gradient `#0a142e → #0f1f42 → #1c3366`

- Same layout as Chairman modal but portrait on `inset-inline-end` (right), text on left
- 5 full paragraphs visible (1282px tall = scrollable modal)
- Short version (`2225:70648`) is 710px: shows 1–2 paragraphs with scroll affordance
- Type: REUSE `LeadershipMessageModalComponent` — navy theme

---

### 2.6 Partnerships — `2791:57935` (1536 × ~2800px)

#### Hero
- Heading: "Partnership & International Relations"
- Subtitle describing strategic partnerships
- Type: REUSE `PageHeroComponent`

#### Editorial Section
- Left column: image, **570 × 517px**
- Right column: eyebrow "OUR COMMITMENT" + heading "Building Partnerships Through Excellence" + body text + green divider bar
- Type: Page-specific split layout

#### Contact Bar
- Text: "Interested in Partnering with DLD?"
- Email: `partnership@dubailand.gov.ae`
- CTA button (green pill)
- Type: REUSE `CtaBandComponent` (already in shared)

#### Partner Filter Tabs
- 4 filter buttons (tab group)
- ❓ AMBIGUITY #4: Category names not readable in metadata — need clarification. Assumed: All · Governmental · Private · International

#### Our Partners Grid
- Section heading: "Governmental Partners"
- Grid: 6 rows × 5 logos
- Each logo slot: 192 × 101px, white bg, `--radius-md`, border
- Type: REUSE `PartnerLogoGridComponent` (adjust grid columns)

---

### 2.7 Achievements — `4066:87849` (1536 × ~4000px)

#### Hero
- Heading: "Our Achievements"
- Watermark: "AWARDS"
- Type: REUSE `PageHeroComponent`

#### Achievements Timeline

Events rendered as a vertical timeline with a start-side line and year pills:

| Year pill | Event(s) |
|---|---|
| 2014 | Idea of Year (Ejari + DREI) · Stevies Silver · Guinness World Record |
| 2015 | UNEP DSCS launch (30 speakers, 500 guests) · Ideas Arabia 2 awards |
| 2016 | 20th World Land Registration Congress (500 guests, 50+ countries, 50 speakers, 18 topics) |
| **2017** | **"WORLD FIRST" blockchain pill** — first government entity to adopt blockchain for property registry |
| 2018 | 69th FIABCI World Congress · 3 DGEP awards |
| (no year) | Sustained Recognition: 4× consecutive Best Dept + Customer Satisfaction · Investors in People Silver · Hamdan bin Mohammed Award |
| 2021 | Stevie Silver (Mollak) · MENA Stevie Gold (Smart Valuation) |

**Special blocks (after timeline):**

| Block | Content |
|---|---|
| ON THE GLOBAL INDEX | #1 region RE transparency 2018 · 7th globally / 1st regionally World Bank 2019 |
| CERTIFIED EXCELLENCE | 12 ISO certificates in 3×4 grid, each with `shield-tick` icon |

- ❓ AMBIGUITY #5: Achievements currently exist as sections inside `about.component` (`AchievementStatsComponent`). Figma shows this as a full routed page at `/about-dld/achievements`. Decision needed.
- Type: Page-specific — needs new `AchievementsComponent` feature page

---

## 3. Token Reconciliation

### 3.1 Figma Variable → SCSS Token Mapping

From `get_variable_defs` on node `4589:89260`:

| Figma Variable | Figma Value | SCSS Token | SCSS Value | Status |
|---|---|---|---|---|
| `Neutral/0` | `#FFFFFF` | `--color-white` | `#FFFFFF` | ✅ MATCH |
| `surface/surface` | `#ffffff` | `--color-white` | `#FFFFFF` | ✅ MATCH |
| `surface/outline` | `#e4e2e6` | `--color-border` | `#E9EBEA` | ≈ CLOSE (4-5 point delta) |
| `gap/gap-xs` | `4px` | `--space-1` | `4px` | ✅ MATCH |
| `gap/gap-md` | `12px` | `--space-3` | `12px` | ✅ MATCH |
| `gap/gap-lg` | `16px` | `--space-4` | `16px` | ✅ MATCH |
| `gap/gap-3xl` | `64px` | `--space-16` | `64px` | ✅ MATCH |
| `padding/padding-sm` | `8px` | `--space-2` | `8px` | ✅ MATCH |
| `padding/padding-md` | `12px` | `--space-3` | `12px` | ✅ MATCH |
| `padding/padding-xxl` | `32px` | `--space-8` | `32px` | ✅ MATCH |
| `padding/padding-3xl` | `64px` | `--space-16` | `64px` | ✅ MATCH |
| `radius-pill` | `999` | `--radius-pill` | `999px` | ✅ MATCH |
| `line-height/body` | `24` | `--line-height-body` | `1.6` (≈24/15) | ✅ MATCH (conceptual) |
| `font-size/body` | `16px` | `--text-base` | `0.9375rem` (≈15px) | ⚠️ MISMATCH (15 vs 16) |
| `font-size/caption` | `14px` | `--text-sm` | `0.8125rem` (≈13px) | ⚠️ MISMATCH (13 vs 14) |
| `font-family/font-family` | `"Dubai"` | `--font-family-base` | `'Poppins', system-ui` | ⚠️ MISMATCH — see AMBIGUITY #6 |
| `Neutral/35` | `#353535` | _(none)_ | — | ❓ AMBIGUITY #7 — no token |
| `Neutral/400` | `#ADB8B4` | _(none)_ | — | ❓ AMBIGUITY #8 — no token |
| `--primary/400` (from code) | `#00a875` | `--color-primary` | `#00A776` | ❓ AMBIGUITY #9 — 1-hex delta |

### 3.2 Colors Found in Design Code (Not in Variable Defs)

| Location | Value | Nearest existing token | Notes |
|---|---|---|---|
| Hub card icon tile bg | `#e0f6ef` | `--color-primary-bg: #E6F7ED` | ≈ close, slightly more saturated |
| Hub card title text | `#1f2421` | `--color-heading: #16233B` | Different hue (warm vs cool) |
| Hub card subtitle text | `#6b7873` | `--color-muted: #6B7280` | ≈ close, slight warm shift |
| Chairman modal gradient start | `#0a2e24` | `--color-primary-dark: #0C6B4A` | Darker — for modal only |
| Chairman modal gradient end | `#1b7a5d` | `--color-primary: #00A776` | For modal only |
| DG modal gradient start | `#0a142e` | `--color-navy: #141D2D` | Darker — for modal only |
| DG modal gradient mid | `#0f1f42` | _(none)_ | For modal only |
| DG modal gradient end | `#1c3366` | _(none)_ | For modal only |
| Green divider bar | `#00a875` | `--color-primary: #00A776` | See AMBIGUITY #9 |
| Achievements "WORLD FIRST" pill | bright green | `--color-primary` | Confirm in build |

---

## 4. Icon-Name Map

### 4.1 Vuesax Icons Required

The Figma design uses the **Vuesax Outline** icon set. These icons **do not exist** in the current codebase (`src/assets/icons/` only has `dld-emblem.svg`, `x.svg`, `youtube.svg`). There is also **no `<app-icon>` component** in the codebase.

> ❓ **AMBIGUITY #10 — Icon strategy:** The build prompt spec calls for `<app-icon name="...">`. Three options:
> (a) Create `IconComponent` that lazy-loads SVGs from `assets/icons/vuesax/*.svg` files (download the Vuesax icon set)
> (b) Keep the current pattern of inline SVG `<path>` strings in TypeScript arrays (CLAUDE.md convention)
> (c) Use a CDN icon font
> **Current CLAUDE.md convention = inline SVG paths. Decision needed before implementation.**

| Icon name (Vuesax) | Used in | Notes |
|---|---|---|
| `courthouse` | Hub → Who We Are card | |
| `profile-2user` | Hub → Leadership card | |
| `global` | Hub → Partnerships card; About factoid chip | |
| `medal-star` | Hub → Achievements card | |
| `archive-book` | About → Our Story 01 | |
| `security` | About → Commitment sector | |
| `buildings-2` | About → Commitment sector | |
| `folder` | About → Commitment sector | |
| `people` | About → Commitment sector | |
| `global-search` | About → Beyond Boundaries | |
| `judge` | About → Sculpting the Future; Hero factoid | |
| `calendar` | About → Hero factoid (Established date) | |
| `profile-circle` | About → Hero factoid (Chairman) | |
| `shield-tick` | Achievements → ISO certificates (×12) | |

---

## 5. Image Slots

| Slot | Component | Dimensions | Current asset | Status |
|---|---|---|---|---|
| Hub hero bg | `AboutHubComponent` hero | 1536 × 420px | — | ❓ Needs image or gradient |
| Who We Are hero | `PageHeroComponent` | 1536 × 630px | `about-dubai.jpg` | exists |
| Who We Are illustration | `IllustrationCardComponent` | 570 × 380px | `about-illustration.svg` | exists |
| Leadership hero | `PageHeroComponent` | 1536 × 630px | `leadership-illustration.svg` | exists |
| Chairman portrait (modal) | `LeadershipMessageModalComponent` | **485 × 541px** | `chairman-portrait.jpg` | exists |
| DG portrait (modal) | `LeadershipMessageModalComponent` | **485 × 541px** | `dg-portrait.jpg` | exists |
| Chairman portrait (card) | `LeadershipCardComponent` | 202 × 225px | `chairman-portrait.jpg` | exists |
| DG portrait (card) | `LeadershipCardComponent` | 202 × 225px | `dg-portrait.jpg` | exists |
| Partnerships hero | `PageHeroComponent` | 1536 × 630px | `partnerships-illustration.svg` | exists |
| Partnerships editorial | `PartnershipsComponent` | **570 × 517px** | — | MISSING — placeholder needed |
| Partner logos (grid) | `PartnerLogoGridComponent` | 192 × 101px each | only `partner-dubai-pulse.svg` | MISSING — most logos |
| Achievements hero | `PageHeroComponent` | 1536 × 630px | — | MISSING — new page |

---

## 6. i18n Keys

### New keys to add (About Hub page)

```json
// en.json
{
  "about_hub": {
    "hero_title": "About DLD",
    "hero_subtitle": "Learn more about Dubai Land Department, our leadership, partnerships and achievements",
    "cards": {
      "who_we_are_title": "Who We Are",
      "who_we_are_subtitle": "Discover DLD",
      "who_we_are_bullets": {
        "about": "About DLD",
        "values": "Values",
        "vision": "Vision Mission",
        "strategic_map": "Strategic Map"
      },
      "leadership_title": "Leadership & Organization",
      "leadership_subtitle": "How we are led",
      "leadership_bullets": {
        "messages": "Management's Message",
        "org_chart": "Organization Chart"
      },
      "partnerships_title": "Partnership & International Relations",
      "partnerships_subtitle": "Our network",
      "partnerships_bullets": {
        "partnership": "Partnership",
        "our_partners": "Our Partners",
        "contact": "Contact the Partnerships Team"
      },
      "achievements_title": "Our Achievements",
      "achievements_subtitle": "What you'll find inside at a glance",
      "achievements_bullets": {
        "milestones": "Milestones Year By Year",
        "world_first": "World First",
        "sustained": "Sustained Recognition",
        "global_index": "On The Global Index",
        "certified": "Certified Excellence"
      }
    }
  }
}
```

### New keys to add (About DLD / Who We Are)

```json
{
  "about": {
    "our_story_title": "Our Story",
    "our_story_items": {
      "genesis_title": "Our Genesis",
      "genesis_caption": "Founded as Dubai's official land registry in the 1960s",
      "aegis_title": "Under the Aegis of Excellence",
      "aegis_caption": "Growth under visionary leadership",
      "commitment_title": "Our Commitment",
      "commitment_caption": "RERA and four key sectors established",
      "boundaries_title": "Beyond Boundaries",
      "boundaries_caption": "Dubai 2040 Urban Master Plan and National Wellbeing 2031",
      "future_title": "Sculpting the Future",
      "future_caption": "Law No.(7) 2013 — the cornerstone of real estate regulation"
    },
    "factoids": {
      "established": "Established 23 Jan 1960",
      "law": "Law No.(7) 2013",
      "chairman": "Chairman HH Sheikh Hamdan",
      "reach": "Regional & international reach"
    }
  }
}
```

### New keys to add (Achievements page)

```json
{
  "achievements": {
    "hero_title": "Our Achievements",
    "hero_subtitle": "A legacy of innovation, recognition, and global leadership in real estate",
    "timeline_title": "Milestones Year By Year",
    "world_first_label": "WORLD FIRST",
    "world_first_title": "First Government Entity to Adopt Blockchain",
    "world_first_body": "In 2017, DLD became the first government entity in the world to adopt blockchain technology for real estate transactions.",
    "global_index_title": "On The Global Index",
    "global_index_stat1": "#1 region in real estate transparency, 2018",
    "global_index_stat2": "7th globally, 1st regionally — World Bank, 2019",
    "certified_title": "Certified Excellence",
    "sustained_title": "Sustained Recognition",
    "sustained_items": {
      "best_dept": "4× consecutive Best Department Award",
      "customer_sat": "Customer Satisfaction Award",
      "investors": "Investors in People Silver",
      "hamdan": "Hamdan bin Mohammed Award"
    },
    "iso_label": "ISO Certificates"
  }
}
```

### New keys to add (Partnerships page)

```json
{
  "partnerships": {
    "hero_title": "Partnership & International Relations",
    "hero_subtitle": "Building strategic alliances to strengthen Dubai's global real estate leadership",
    "editorial_eyebrow": "OUR COMMITMENT",
    "editorial_title": "Building Partnerships Through Excellence",
    "editorial_body": "...",
    "contact_title": "Interested in Partnering with DLD?",
    "contact_email": "partnership@dubailand.gov.ae",
    "contact_cta": "Get in Touch",
    "filter_all": "All",
    "filter_governmental": "Governmental",
    "filter_private": "Private Sector",
    "filter_international": "International",
    "partners_section_title": "Governmental Partners"
  }
}
```

### Existing keys with hardcoded strings (i18n gap — CLAUDE.md gap #14)

The following strings in `about.component.ts` are hardcoded in English inside TypeScript arrays and must be moved to i18n keys:

- `STATS` array: 5 stat labels (`'Annual Transactions'`, `'Market Value 2024'`, etc.)
- `STRATEGIC_CARDS` array: `eyebrow`, `title`, and `bullets` for all 5 cards
- `ACHIEVEMENT_STATS` array: 4 `label` strings
- `TIMELINE_ITEMS` array: `title` and `caption` for all 6 items
- `valuesItems` array: 5 value strings

---

## 7. Open Questions / AMBIGUITY List

| # | Area | Question | Default assumption if not answered |
|---|---|---|---|
| 1 | **Routing (BREAKING)** | Should `/about-dld` become a hub index page (requires moving `AboutComponent` to `/about-dld/who-we-are`)? | Wait for approval — do not reroute without explicit sign-off |
| 2 | **Hub card component** | Should `AboutHubCardComponent` be a new shared component, or page-specific? | Page-specific until used in 2+ places |
| 3 | **Story timeline** | Existing `TimelineComponent` uses `{ year, title, caption }`. The "Our Story" section needs icons and sub-items. Extend or create new? | Extend `TimelineComponent` with optional `icon` and `subItems[]` inputs |
| 4 | **Partnerships filter tabs** | What are the 4 filter category names? Only visual placeholders visible in metadata. | Assume: All / Governmental / Private Sector / International |
| 5 | **Achievements page** | Figma shows `/about-dld/achievements` as a full page. Should it be extracted from `about.component` sections? | Extract to new page — add route after approval |
| 6 | **Font (Dubai vs Poppins)** | Figma uses `Dubai` font. Codebase uses `Poppins` (font files not in repo). Add the WOFF2 files for Phase 1 of this feature? | Keep Poppins until WOFF2 files provided — no visual change required in Phase 1 |
| 7 | **`Neutral/35: #353535`** | No matching token. Is this a dark body text alternative, or one-off? | Do not add token — use `--color-heading` (`#16233B`) as nearest dark alternative |
| 8 | **`Neutral/400: #ADB8B4`** | No matching token. Is this a mid-gray for disabled or border states? | Do not add token — flag with `// AMBIGUITY:` in component where used |
| 9 | **Primary green exact value** | Figma code shows `#00a875`, tokens file has `#00A776`. One-hex difference. Which is canonical? | Use existing `--color-primary: #00A776` until brand confirms |
| 10 | **Icon strategy** | CLAUDE.md convention = inline SVG `<path>` strings. Build prompt spec says `<app-icon name="...">`. Which wins? | Follow CLAUDE.md — use inline SVG paths. No new `IconComponent` unless user says otherwise |
| 11 | **Vuesax icon SVG paths** | The 14 vuesax icons (courthouse, judge, global, etc.) don't exist as files or path strings in the codebase. Where to source them? | User to provide SVG path `d` strings OR link to the vuesax outline set download |
| 12 | **Hub hero height** | Hub hero is 420px (no illustration slot). `PageHeroComponent` has an illustration slot by default. Use `PageHeroComponent` without illustration, or create variant? | Pass `illustrationSrc` as empty/undefined and let hero collapse to compact mode |
| 13 | **Hub card border-radius** | Design shows `20px`. `--radius-xl` is `24px`, `--radius-lg` is `16px`. Which token to use? | Use `--radius-xl` (24px) — visually close enough; or add `--radius-card: 20px` token |
| 14 | **Hub card icon tile border-radius** | Design shows `13px`. No matching token. | Use `--radius-md` (8px) or `--radius-lg` (16px) — flagged with `// AMBIGUITY:` |
| 15 | **Partnerships editorial image** | 570×517px image slot on partnerships page. No asset exists. | Use `about-dubai.jpg` as placeholder with `// TODO: replace with partnerships editorial image` |
| 16 | **Partner logos** | Only `partner-dubai-pulse.svg` exists. Grid expects 30 logos (6×5). | Use name-as-text fallback (already implemented in `PartnerLogoCardComponent`) |
| 17 | **Leadership modal scroll** | DG modal is 1282px on a ~900px viewport. Is it a scrollable modal, or does the page scroll beneath? | Scrollable modal (overflow-y: auto on inner content) |
| 18 | **Achievements page route** | Should achievements be `/about-dld/achievements` (child of about) or a top-level route? | Child route: `/about-dld/achievements` |

---

## 8. Reusable vs Page-Specific Classification

| Component | Source | Reuse status |
|---|---|---|
| `PageHeroComponent` | shared | ✅ REUSE — all 5 pages |
| `StatBarComponent` | shared | ✅ REUSE — about-dld |
| `SectionHeaderComponent` | shared | ✅ REUSE — all pages |
| `WatermarkTextComponent` | shared | ✅ REUSE — about-dld values |
| `NumberedCardComponent` | shared | ✅ REUSE — strategic map |
| `IconListComponent` | shared | ✅ REUSE — values section |
| `TimelineComponent` | shared | ⚠️ REUSE with extension — see AMBIGUITY #3 |
| `IllustrationCardComponent` | shared | ✅ REUSE — about-dld |
| `PartnersSectionComponent` | features/home | ✅ REUSE — hub + about-dld |
| `CtaBandComponent` | shared | ✅ REUSE — partnerships contact bar |
| `PartnerLogoGridComponent` | shared | ✅ REUSE — partnerships |
| `LeadershipCardComponent` | shared | ✅ REUSE — leadership page |
| `LeadershipMessageModalComponent` | shared | ✅ REUSE — leadership page (×2) |
| `StatCardComponent` | shared | ✅ REUSE — achievements stats |
| `AboutHubCardComponent` | NEW | ❓ AMBIGUITY #2 |
| `AchievementsTimelineComponent` | NEW | needed for achievements page |

---

## 9. Definition of Done — Phase 0

- [x] All 8 Figma nodes fetched via `get_design_context`
- [x] Hub card anatomy fully documented (dimensions, colors, typography)
- [x] Leadership modal gradients confirmed (chairman green, DG navy)
- [x] Achievements timeline event list recorded
- [x] Partnerships page structure documented
- [x] Figma variable defs extracted and mapped to SCSS tokens
- [x] Token mismatches flagged
- [x] Icon-name list compiled (14 vuesax icons)
- [x] Image slots catalogued with dimensions
- [x] i18n keys drafted for all new content
- [x] 18 open questions/ambiguities documented
- [ ] **STOP — awaiting user approval before Phase 1**

---

## 10. Historical Notes (Pre-Phase 0)

> Sections below are preserved from the earlier SSOT draft. They document the initial scaffold (Phases 1–2) built before Figma MCP was available. Some details may conflict with Phase 0 Figma findings above — Phase 0 is authoritative.

### Phase 1 — Project Setup Notes

**Packages installed:** `bootstrap@5`, `ng2-charts`, `chart.js`, `leaflet`, `@asymmetrik/ngx-leaflet`, `@types/leaflet`

**RTL approach:** Bootstrap LTR via `@import`; Bootstrap RTL via CDN `<link>` injected/removed by `TranslationService` on lang switch. All custom CSS uses CSS logical properties.

**TranslationService:** Signal-based; statically imports EN/AR JSON; updates `<html lang dir>` via `effect()`.

### Phase 2 — Shell Notes

**NavbarComponent:** Sticky top, `z-index: 1040`, dark navy background. Desktop: 7 nav links; mobile: hamburger → fixed side drawer. RTL: logical property `inset-inline-start`. Escape key closes drawer.

**FooterComponent:** Dark navy, 3-column grid, collapses to 1-col on mobile.

**BottomToolbarComponent:** `position: fixed; inset-block-end: 0`, 9 items, always visible.
