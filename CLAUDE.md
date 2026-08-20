> Last generated: 2026-08-20 — regenerate after structural changes to `dld-app/src/`.

---

# CLAUDE.md — Dubai Land Department Website

## 1. Read Me First

Any agent working in this repository **must read this file before writing a single line of code**. The conventions here are non-negotiable — deviating from them produces inconsistent UI, broken RTL, missing translations, or accessibility failures. When given a task, preface your reasoning with "I checked CLAUDE.md and will follow its conventions."

The Angular application lives at **`dld-app/`** (not the repo root). All file paths below are relative to `dld-app/` unless stated otherwise.

---

## 2. Project Overview

The **Dubai Land Department (DLD)** official website — a public-facing Angular SPA for the Dubai government real estate authority. It serves residents, investors, brokers, and developers with information about DLD services, news, leadership, strategic initiatives, and real estate market data.

**Main Areas:**
- Home (hero, service tabs by persona, initiatives, transactions chart, app download, partners)
- About DLD (Who We Are, Leadership & Organization, Partnerships & International Relations)
- News & Media (Latest News, Article Detail, Announcements & Initiatives)
- Services / Trainings / Open Data / Help & Support (stub routes, not yet implemented)

**Supported Languages:** English (LTR) and Arabic (RTL). Language persists to `localStorage` under key `dld_lang`.

---

## 3. Tech Stack & Versions

| Technology | Version | Notes |
|---|---|---|
| Angular | ^19.2.0 | Standalone components, signals, new control flow |
| TypeScript | ~5.7.2 | Strict mode; `bundler` module resolution |
| Bootstrap | ^5.3.8 | Loaded via SCSS `@import`; Bootstrap RTL loaded via CDN on language switch |
| zone.js | ~0.15.0 | Required; event coalescing enabled |
| rxjs | ~7.8.0 | Used internally in Angular; avoid using it in feature code — prefer signals |
| ng2-charts | ^10.0.0 | Used in transactions section; registered globally via `provideCharts(withDefaultRegisterables())` |
| chart.js | ^4.5.1 | Peer dependency of ng2-charts |
| leaflet | ^1.9.4 | Installed but **not yet used** in any component |
| @asymmetrik/ngx-leaflet | ^17.0.0 | Installed but **not yet used** in any component |
| Node / npm | (any modern LTS) | No `.nvmrc`; use Node 20+ |

**No additional UI libraries** (date pickers, icon sets, ngx-*, animation libraries). Icons are inline SVG `<path>` strings. Charts use ng2-charts/chart.js. The map libraries (leaflet) are present in `package.json` but unintegrated — do not use them until a map feature is explicitly scoped.

Source root: `dld-app/src/` · App prefix: `app` · Inline style language: `scss`

---

## 4. Hard Rules (non-negotiable)

1. **Standalone components only.** No `NgModule` of any kind. Every component, pipe, and directive must be `standalone: true` and list its own `imports: []`.
2. **Modern Angular control flow.** Use `@if`, `@for`, `@switch` in templates. Never `*ngIf`, `*ngFor`, `[ngSwitch]`.
3. **No `*.spec.ts` files.** Do not create test files. (One exists at `src/app/app.component.spec.ts` — a legacy artefact; do not replicate it.)
4. **Signals-first reactivity.** Use `signal()`, `computed()`, `effect()`, `input()`, `output()`. Avoid `EventEmitter`, `BehaviorSubject`, or `@Input()` decorator syntax in new code.
5. **All strings via i18n.** Every user-visible string must call `tr.t('key')` or `tr.tInterp('key', vars)` from `TranslationService`. No hardcoded English text in templates or components.
6. **CSS tokens only.** Use CSS custom properties (`var(--color-primary)`, `var(--space-4)`) from `src/styles/_tokens.scss`. No hardcoded hex values, pixel sizes, or Bootstrap magic numbers in component SCSS.
7. **RTL via logical CSS properties.** Use `inset-inline-*`, `padding-inline-*`, `margin-inline-*`, `border-inline-*`, `text-align: start/end`. Never use `left`/`right` (physical) properties in any SCSS. Use Bootstrap RTL-aware classes (`ms-*`, `me-*`, `ps-*`, `pe-*`).
8. **OnPush change detection.** Every component must specify `changeDetectionStrategy: ChangeDetectionStrategy.OnPush`.
9. **Lazy-loaded features.** Every route must use `loadComponent` (never `component:`). All feature components live under `src/app/features/`.
10. **Full accessibility.** Semantic landmark elements, ARIA roles/labels where needed, visible focus rings, keyboard support for interactive widgets (modals, mega-menu, tabs), and `.skip-to-content` link already in `app.component.html`.
11. **Reuse shared components.** Before writing markup, check Section 13. If a shared component covers the case, use it. Never duplicate its HTML inline.
12. **`ChangeDetectionStrategy`** must be imported from `@angular/core`, not from `@angular/core/testing`.

---

## 5. Commands

```bash
# Install
cd dld-app && npm install

# Development server (http://localhost:4200)
npm start          # ng serve

# Production build (output: dld-app/dist/dld-app/)
npm run build      # ng build

# Watch mode (dev build, incremental)
npm run watch      # ng build --watch --configuration development

# Run tests (not used — avoid adding spec files)
npm test           # ng test
```

---

## 6. Folder Architecture

```
dld-app/src/
├── app/
│   ├── app.component.ts/.html/.scss   # Root shell: skip link + navbar + router-outlet + footer
│   ├── app.config.ts                  # provideRouter, provideHttpClient, provideCharts
│   ├── app.routes.ts                  # All routes (lazy loadComponent)
│   │
│   ├── core/                          # Singleton services, models, adapters, guards
│   │   ├── adapters/                  # Raw API → typed model transformers
│   │   ├── guards/                    # Route guards (auth.guard.ts)
│   │   ├── models/                    # TypeScript interfaces for domain entities
│   │   └── services/                  # App-wide injectable services (translation, auth, news…)
│   │
│   ├── shared/components/             # Reusable presentational components (see Section 13)
│   │
│   ├── layout/                        # App shell components rendered on every page
│   │   ├── navbar/                    # Top navigation + mega-menu + mobile offcanvas
│   │   ├── footer/                    # Site footer
│   │   └── bottom-toolbar/            # Dubai unified utility bar (9 items)
│   │
│   └── features/                      # One folder per route group; all lazy-loaded
│       ├── home/                      # / → HomeComponent + 6 section sub-components
│       ├── about/                     # /about-dld + /leadership + /partnerships
│       ├── news-media/                # /news-media/latest-news + article-detail + announcements
│       ├── news/                      # /news (legacy listing) + /news/:id
│       └── not-found/                 # Shared 404 stub used by all unimplemented routes
│
├── assets/
│   ├── i18n/
│   │   ├── en.json                    # English translation dictionary
│   │   └── ar.json                    # Arabic translation dictionary
│   ├── icons/
│   │   ├── logo/dld-emblem.svg
│   │   └── social/x.svg, youtube.svg
│   └── images/                        # Raster and vector images (see Section 16)
│
└── styles/
    ├── _tokens.scss                   # CSS custom properties (:root) — single source of truth
    ├── _fonts.scss                    # Font family SCSS vars + commented @font-face stubs
    ├── _typography.scss               # Global type scale rules
    ├── _breakpoints.scss              # SCSS breakpoint map + bp-up/bp-down mixins
    ├── _mixins.scss                   # flex-center, section-padding, sr-only, card-surface…
    └── _rtl.scss                      # [dir="rtl"] overrides + .rtl-flip helper
```

---

## 7. Routing Map

All routes use `loadComponent`. No route guards are currently applied. `withViewTransitions()` is active.

| Path | Feature | Component | Lazy? | Guard | In-page Anchors |
|---|---|---|---|---|---|
| `/` | home | `HomeComponent` | ✓ | — | — |
| `/about-dld` | about | `AboutComponent` | ✓ | — | `#about`, `#values`, `#vision`, `#strategic-map`, `#achievements` |
| `/about-dld/leadership` | about | `LeadershipComponent` | ✓ | — | `#messages`, `#org-chart` |
| `/about-dld/partnerships` | about | `PartnershipsComponent` | ✓ | — | `#commitment`, `#contact`, `#partners` |
| `/news-media/latest-news` | news-media | `LatestNewsComponent` | ✓ | — | — |
| `/news-media/article/:id` | news-media | `ArticleDetailComponent` | ✓ | — | — |
| `/news-media/announcements` | news-media | `AnnouncementsComponent` | ✓ | — | — |
| `/news` | news (legacy) | `NewsComponent` | ✓ | — | — |
| `/news/:id` | news (legacy) | `ArticleDetailComponent` | ✓ | — | — |
| `/services` | not-found | `NotFoundComponent` | ✓ | — | stub |
| `/trainings` | not-found | `NotFoundComponent` | ✓ | — | stub |
| `/open-data` | not-found | `NotFoundComponent` | ✓ | — | stub |
| `/help` | not-found | `NotFoundComponent` | ✓ | — | stub |
| `/auth/signin` | not-found | `NotFoundComponent` | ✓ | — | stub |
| `/auth/register` | not-found | `NotFoundComponent` | ✓ | — | stub |
| `**` | not-found | `NotFoundComponent` | ✓ | — | — |

**Mega-menu link targets** (used in `NavbarComponent.navLinks`):
- About: `/about-dld#about`, `/about-dld#values`, `/about-dld#vision`, `/about-dld#strategic-map`, `/about-dld#achievements`, `/about-dld/leadership#messages`, `/about-dld/leadership#org-chart`, `/about-dld/partnerships#commitment`, `/about-dld/partnerships#contact`, `/about-dld/partnerships#partners`
- News: `/news-media/latest-news`, `/news-media/announcements`

---

## 8. Layout Shell & Navigation

### App Shell (`app.component.ts`)
```
<a class="skip-to-content" href="#main-content">…</a>
<app-navbar />
<router-outlet />   ← each feature page wraps its content in <main id="main-content">
<app-footer />
```

### Navbar (`src/app/layout/navbar/`)

**Two visual states** (driven by `isScrolled` signal):
- **Transparent over hero** (`!isScrolled && atHome`): glass/transparent background, white text, used only on the home route above the 500px scroll threshold.
- **Sticky white pill** (`isScrolled || !atHome`): white background, `box-shadow: var(--shadow-navbar)`, dark text, fixed to top.

`atHome` is `window.location.pathname === '/'`. Scroll threshold: 500px on home, 0px on all other routes.

**Mega-menu rules (enforce strictly):**
- Triggered on `mouseenter` of a nav item with `megaKey`; closed on `mouseleave`, `Escape`, or click outside `.site-header`.
- The dropdown panel spans **full viewport width (100vw)** with `1rem` horizontal padding.
- Hover highlight on menu column links is **white** (not green). Active/selected state uses white background.
- Each column: icon (inline SVG path d-string), title, caption, list of links, "View All" link at bottom.
- Optional "featured card" slot per column (not currently used — reserved for imagery or promos).
- ARIA: the trigger `<button>` has `aria-expanded`, `aria-haspopup="true"`, and `aria-controls`; the panel has `role="navigation"`.
- On mobile (`<lg`): collapses into offcanvas; `isMenuOpen` signal controls open state.
- `Escape` closes mega menu first; if already closed, closes mobile menu.

**Nav Links (in order):**
1. Home (`/`, exact)
2. About DLD (`/about-dld`, megaKey: `'about'`, 3 columns: Who We Are / Leadership / Partnerships)
3. Services (`/services`, hasDropdown — not yet implemented)
4. Trainings & Programs (`/trainings`, no dropdown)
5. Open Data & Insights (`/open-data`, hasDropdown — not yet implemented)
6. News and Media (`/news-media/latest-news`, megaKey: `'news'`, 3 columns: Latest News / Announcements / Media Center)
7. Help and Support (`/help`, hasDropdown — not yet implemented)

### Footer (`src/app/layout/footer/`)
Standard site footer. Uses `TranslationService` for all copy. Imports only `RouterLink`.

### Bottom Toolbar (`src/app/layout/bottom-toolbar/`)
The Dubai Unified Service Bar — always visible below the footer (or fixed, per design). Contains 9 items with SVG icon paths and translation keys:
`toolbar.chat`, `toolbar.services`, `toolbar.survey`, `toolbar.locations`, `toolbar.announcements`, `toolbar.contact`, `toolbar.dubai_ae`, `toolbar.language`, `toolbar.ai`

---

## 9. Design System / Tokens

All tokens are CSS custom properties declared in `src/styles/_tokens.scss` on `:root`. Import the file via `@use 'styles/tokens'` (already done globally in `styles.scss` — do NOT re-import in component SCSS).

### Colors

| Token | Value | Use |
|---|---|---|
| `--color-primary` | `#00A776` | Brand green — CTAs, active states, highlights |
| `--color-primary-hover` | `#008F65` | Button hover |
| `--color-primary-dark` | `#0C6B4A` | Button hover bg, gradient start |
| `--color-primary-light` | `#E6F7F2` | Section label chip bg |
| `--color-primary-bg` | `#E6F7ED` | Light green tint backgrounds |
| `--color-navy` | `#141D2D` | Primary dark, navy-theme cards |
| `--color-heading` | `#16233B` | All heading text |
| `--color-body` | `#5A5F5C` | Body text |
| `--color-muted` | `#6B7280` | Subdued/secondary text |
| `--color-card-bg` | `#F5F5F5` | Card background |
| `--color-border` | `#E9EBEA` | Borders, dividers |
| `--color-white` | `#FFFFFF` | White surfaces |
| `--color-bg` | `#F8FAF9` | Page background |
| `--color-bg-tint` | `#E6F7F2` | Tinted section bg |
| `--color-gray` | `#8C8C8C` | Neutral gray |
| `--chart-green` | `#00A776` | Chart series 1 |
| `--chart-blue` | `#2F80ED` | Chart series 2 |
| `--chart-purple` | `#7A5AF8` | Chart series 3 |
| `--chart-yellow` | `#F5C542` | Chart series 4 |

**Gradient:** `--gradient-app: linear-gradient(135deg, #0C6B4A 0%, #00A776 100%)` — used in CTA band, app-download section.

### Border Radius

| Token | Value |
|---|---|
| `--radius-sm` | `4px` |
| `--radius-md` | `8px` |
| `--radius-lg` | `16px` |
| `--radius-xl` | `24px` |
| `--radius-tabs` | `12px` |
| `--radius-pill` | `999px` |

### Shadows

| Token | Value |
|---|---|
| `--shadow-card` | `0 2px 16px rgba(0,0,0,0.08)` |
| `--shadow-navbar` | `0 4px 24px rgba(0,0,0,0.12)` |
| `--shadow-pill` | `0 8px 32px rgba(0,0,0,0.14)` |
| `--shadow-dropdown` | `0 8px 24px rgba(0,0,0,0.12)` |

### Spacing (4px base scale)

`--space-1` (4px) · `--space-2` (8px) · `--space-3` (12px) · `--space-4` (16px) · `--space-5` (20px) · `--space-6` (24px) · `--space-8` (32px) · `--space-10` (40px) · `--space-12` (48px) · `--space-16` (64px) · `--space-20` (80px) · `--space-24` (96px)

### Typography

| Token | Value |
|---|---|
| `--text-hero` | `clamp(2.5rem, 5vw, 3.25rem)` |
| `--text-xl` | `clamp(1.75rem, 3vw, 2.5rem)` |
| `--text-lg` | `clamp(1.25rem, 2vw, 1.5rem)` |
| `--text-md` | `1.125rem` |
| `--text-base` | `0.9375rem` |
| `--text-sm` | `0.8125rem` |
| `--text-xs` | `0.6875rem` |

Weights: `--weight-light` (300) · `--weight-regular` (400) · `--weight-medium` (500) · `--weight-semibold` (600) · `--weight-bold` (700)

Line heights: `--line-height-heading: 1.25` · `--line-height-body: 1.6`

### Font Families

Declared as SCSS `$` variables in `src/styles/_fonts.scss`:
- `$font-family-base: 'Poppins', 'Segoe UI', system-ui, -apple-system, sans-serif`
- `$font-family-arabic: 'Noto Sans Arabic', 'Dubai', 'Tahoma', 'Arial', sans-serif`

CSS custom properties on `:root` (set in `_typography.scss`):
- `--font-family-base` and `--font-family-arabic`

**To swap in the real Dubai brand font:** Uncomment the `@font-face` blocks in `_fonts.scss`, update the `font-family` to `'DLDFont'`, and update `--font-family-base` (and `--font-family-arabic` for Arabic variant) to use `'DLDFont'` first. WOFF2 files go in `src/assets/fonts/DLD/`.

### Breakpoints (Bootstrap 5 aligned)

| Name | Width | Description |
|---|---|---|
| `xs` | 390px | Mobile / iPhone |
| `sm` | 576px | Bootstrap small |
| `md` | 768px | Tablet |
| `lg` | 992px | Bootstrap large |
| `xl` | 1200px | Bootstrap xl |
| `xxl` | 1400px | Design canvas |

Use `@include bp-up('md')` / `@include bp-down('md')` from `src/styles/_mixins.scss`.

### SCSS Mixins (`src/styles/_mixins.scss`)

| Mixin | Signature | Use |
|---|---|---|
| `flex-center` | `()` | `display: flex; align-items: center; justify-content: center` |
| `flex-row` | `($gap: var(--space-4))` | Flex row with gap |
| `section-padding` | `()` | `padding-block: var(--space-20)`, mobile: `var(--space-12)` |
| `sr-only` | `()` | Visually hidden, accessible |
| `focus-ring` | `()` | 2px `var(--color-primary)` outline |
| `card-surface` | `()` | White bg + `--radius-lg` + `--shadow-card` |
| `truncate` | `($lines: 1)` | Single or multi-line text truncation |
| `btn-primary` | `()` | Green pill CTA button (full style block) |

### Global Utility Classes (in `src/styles.scss`)

| Class | Purpose |
|---|---|
| `.skip-to-content` | Accessibility skip link (shown on focus) |
| `.section-label` | Green chip for section eyebrow labels |
| `.sr-only` | Screen-reader-only text |
| `.main-container` | `padding-inline: 3rem !important` |
| `.rtl-flip` | Flips chevrons/arrows via `scaleX(-1)` in RTL |

---

## 10. i18n

### How it works

`TranslationService` (`src/app/core/services/translation.service.ts`) is a singleton that:
1. Reads persisted language from `localStorage` key `dld_lang` on init (defaults to `'en'`).
2. Exposes `currentLang = signal<'en' | 'ar'>()` and `isRtl = computed()`.
3. On language change (via `effect()`): writes to `localStorage`, sets `<html lang="…">` and `<html dir="ltr|rtl">`, and injects/removes a Bootstrap RTL `<link>` tag from CDN.
4. Dictionaries are imported statically from `assets/i18n/en.json` and `assets/i18n/ar.json` using `resolveJsonModule: true`.

### API

```typescript
readonly tr = inject(TranslationService);

// In template:
{{ tr.t('nav.home') }}
{{ tr.tInterp('news.showing_count', { shown: 5, total: 91 }) }}

// Toggle language (called from navbar/toolbar):
tr.toggleLang();
```

`t(key)` uses dot-notation. Returns the key string itself if not found (fail-safe, no throw).

### Key Structure (en.json / ar.json)

```
nav.*               Navigation labels and mega-menu text
hero.*              Home hero section copy
services.*          Services section labels
service.*           Individual service card descriptions
initiatives.*       Home initiatives section
transactions.*      Transactions analytics section
app.*               App download section
about.*             About page content
strategic_map.*     Strategic pillars (5 cards)
leadership.*        Leadership page
news.*              News listing and filters
announcements.*     Announcements & initiatives page
article.*           Article detail page
footer.*            Footer sections and links
toolbar.*           Bottom utility bar items
common.*            Shared labels: loading, error, back, learn_more, apply_now, view_all, close, skip_to_content
not_found.*         404 page copy
```

### Adding a new i18n key

1. Add to `src/assets/i18n/en.json` under the appropriate group.
2. Add the Arabic translation to `src/assets/i18n/ar.json` (same key path).
3. Use `tr.t('group.key_name')` in the component template.
4. For interpolated strings, use `{{varName}}` in the JSON value and call `tr.tInterp('key', { varName: value })`.

---

## 11. RTL/LTR Conventions

### Use these (logical properties — RTL-safe)

```scss
// Positioning
inset-inline-start: …;   // NOT left:
inset-inline-end: …;     // NOT right:

// Spacing
padding-inline-start: …; // NOT padding-left:
padding-inline-end: …;   // NOT padding-right:
margin-inline-start: …;  // NOT margin-left:
margin-inline-end: …;    // NOT margin-right:
border-inline-start: …;  // NOT border-left:
border-inline-end: …;    // NOT border-right:

// Text alignment
text-align: start;        // NOT text-align: left
text-align: end;          // NOT text-align: right

// Bootstrap RTL-aware classes in templates
class="ms-2"  // margin-inline-start
class="me-2"  // margin-inline-end
class="ps-3"  // padding-inline-start
class="pe-3"  // padding-inline-end
```

### `--dir` CSS variable

`--dir` is `1` in LTR and `-1` in RTL (set by `[dir="rtl"] { --dir: -1 }` in `_rtl.scss`). Use it in `calc()` for direction-aware transforms:

```scss
transform: translateX(calc(var(--dir) * 8px));
```

### `.rtl-flip` class

Flips directional icons (`scaleX(-1)`) when inside `[dir="rtl"]`. Apply to chevrons and arrows that point directionally. **Do not apply to:** logos, avatar images, maps, checkmarks, circular/symmetric icons.

### Filter select arrow

`.filter-select` in RTL: the chevron background position flips to `left 0.75rem center`. This is handled globally in `_rtl.scss` — do not override per-component.

---

## 12. Accessibility Conventions

- **Semantic landmarks:** Every page uses `<main id="main-content">`, `<nav>`, `<header>`, `<footer>` appropriately.
- **Skip link:** `<a class="skip-to-content" href="#main-content">` in `app.component.html` — visible on focus.
- **Focus ring:** Global `:focus-visible` rule + `@mixin focus-ring` gives 2px `--color-primary` outline. Never suppress `:focus-visible`.
- **Modals (LeadershipMessageModal):** Backdrop click closes; Escape key closes; focus is trapped within the modal while open (Tab cycles through focusable elements).
- **Tabs (TabGroup):** `role="tablist"` on container, `role="tab"` on each button, `aria-selected`, `aria-controls` pointing to panel.
- **Mega menu:** Trigger button has `aria-expanded` and `aria-haspopup="true"`. Escape key closes. Click outside `.site-header` closes.
- **Images:** Always provide meaningful `alt` text. Decorative images use `alt=""`. `role="img"` for inline SVGs that convey meaning.
- **Buttons vs links:** Use `<button>` for actions (open modal, toggle), `<a>` for navigation. Never use `<div>` or `<span>` as interactive elements.
- **Color contrast:** Primary green `#00A776` on white passes AA. Heading text `#16233B` on `#F8FAF9` passes AAA.

---

## 13. Shared Component Catalog

All live in `src/app/shared/components/`. All are `standalone: true`, `ChangeDetectionStrategy.OnPush`, signals API.

| Component | Selector | Key Inputs | Key Outputs | Used In |
|---|---|---|---|---|
| `PageHeroComponent` | `app-page-hero` | `title`, `subtitle`, `breadcrumbs: Breadcrumb[]`, `illustrationSrc`, `illustrationAlt`, `watermark`, `theme` | — | about, leadership, partnerships, news pages |
| `SectionHeaderComponent` | `app-section-header` | `title` (req), `eyebrow`, `subtitle`, `align: 'start'\|'center'`, `underline: boolean` | — | all feature pages |
| `StatBarComponent` | `app-stat-bar` | `stats: StatItem[]` (req) | — | about, home |
| `StatCardComponent` | `app-stat-card` | `value` (req), `label` (req), `icon`, `iconViewBox` | — | about (achievements) |
| `WatermarkTextComponent` | `app-watermark-text` | `lines: string[]` (req), `color` | — | leadership modal, leadership page |
| `NumberedCardComponent` | `app-numbered-card` | `title` (req), `number`, `eyebrow`, `icon`, `bullets: string[]` | — | about (strategic map) |
| `IconListComponent` | `app-icon-list` | `items: string[]` (req) | — | about (values) |
| `TimelineComponent` | `app-timeline` | `items: TimelineItem[]` (req) | — | about (history) |
| `IllustrationCardComponent` | `app-illustration-card` | `src` (req), `alt`, `aspectRatio` | — | about |
| `CtaBandComponent` | `app-cta-band` | `title` (req), `subtitle`, `buttonLabel`, `buttonUrl` | `buttonClick` | various pages |
| `TabGroupComponent` | `app-tab-group` | `tabs: Tab[]` (req), `ariaLabel`, `initialId` | `tabChange` | home (persona tabs) |
| `FilterPillsComponent` | `app-filter-pills` | `pills: FilterPill[]` (req), `active: string` (req) | `selected` | news listing |
| `NewsCardComponent` | `app-news-card` | `article: NewsArticle` (req), `variant: 'hero'\|'list'` | — | latest-news, announcements |
| `LeaderCardComponent` | `app-leader-card` | `leader: LeaderProfile` (req) | — | leadership (org chart area) |
| `LeadershipCardComponent` | `app-leadership-card` | `data: LeadershipCardData` (req) | `readMore` | leadership page |
| `LeadershipMessageModalComponent` | `app-leadership-message-modal` | `data: LeadershipModalData` (req), `isOpen: boolean` (req) | `closed` | leadership page |
| `InitiativeCardComponent` | `app-initiative-card` | `initiative: Initiative` (req) | — | home (initiatives section), announcements |
| `PartnerLogoCardComponent` | `app-partner-logo-card` | `name` (req), `logoSrc`, `logoAlt` | — | via PartnerLogoGrid |
| `PartnerLogoGridComponent` | `app-partner-logo-grid` | `partners: PartnerItem[]` (req) | — | about, home (partners section) |
| `ServiceCardComponent` | `app-service-card` | `card: ServiceCard` (req) | — | home (persona tabs) |
| `SearchBarComponent` | `app-search-bar` | `placeholder`, `submitLabel` | `searched: string` | hero section, news listing |

**Interface quick-reference:**
- `Breadcrumb`: `{ label: string; url?: string }`
- `StatItem`: `{ value: string; label: string; suffix?: string }`
- `FilterPill`: `{ key: string; label: string }`
- `Tab`: `{ id: string; label: string }` (defined in `tab-group.component.ts`)
- `PartnerItem`: `{ name: string; logoSrc?: string; logoAlt?: string }`
- `LeadershipCardData`: `{ badge, role, name, excerpt, portraitSrc, portraitAlt, theme: 'green' | 'navy' }`
- `LeadershipModalData`: `{ theme, watermarkLines, portraitSrc, portraitAlt, portraitSide: 'start'|'end', eyebrow, title, paragraphs[], signature }`
- `TimelineItem`: `{ year: string; title: string; caption: string }`

---

## 14. Feature Pages Catalog

### Home (`/`)
**File:** `src/app/features/home/home.component.ts`
**Sections (in order):**
1. `app-hero-section` — Full-screen hero with Dubai skyline, search bar, service chips
2. `app-persona-tabs` — Tab group (Owner / Tenant / Broker / Developer / Management / Partners) → `app-services-section` per tab
3. `app-initiatives-section` — DLD initiatives grid (uses `app-initiative-card`)
4. `app-transactions-section` — Real estate analytics with ng2-charts donut/bar charts and price map
5. `app-app-download-section` — Mobile app download CTA with gradient background
6. `app-partners-section` — Partner logos grid (uses `app-partner-logo-grid`)

### About DLD — Who We Are (`/about-dld`)
**File:** `src/app/features/about/about.component.ts`
**Sections (in order):**
1. `app-page-hero` — Title, breadcrumb, illustration
2. `app-stat-bar` — 5 headline stats
3. Cornerstone section (`app-cornerstone-section`) — DLD mission overview
4. Values section (`app-values-section`) — 5 values with `app-icon-list`
5. Empowering section (`app-empowering-section`) — Mission and 3 pillars with `app-numbered-card`
6. Strategic map section (`app-strategic-map-section`) — 5 strategic cards (01–05) with `app-numbered-card`
7. Achievements section (`app-achievements-section`) — 4 stat cards with `app-stat-card`
8. Timeline — DLD history 1960–2024 with `app-timeline`
9. Illustration card — `app-illustration-card`
10. Partners section — reuses `PartnersSectionComponent` from home

**Inline data (not from service):** `STATS`, `STRATEGIC_CARDS` (5 items: Pioneering RE Model, RE Innovation Incubator, Data-Driven Sector, Agile DLD, Exceptional Journeys), `ACHIEVEMENT_STATS` (AED 761B+, 226,000+, No. 1, 800+), `TIMELINE_ITEMS` (6 entries: 1960–2024).

### About DLD — Leadership & Organization (`/about-dld/leadership`)
**File:** `src/app/features/about/leadership/leadership.component.ts`
**Sections:**
1. `app-page-hero`
2. `app-leadership-card` for Chairman (H.E. Marwan bin Ghalita, theme: green)
3. `app-leadership-card` for Director General (H.E. Omar Bu Shehab, theme: navy)
4. `app-org-chart` — Org chart visualization
5. `app-partners-section` (reused from home)
6. Two `app-leadership-message-modal` instances (one per leader, controlled by `chairmanModalOpen` and `dgModalOpen` signals)

### About DLD — Partnerships (`/about-dld/partnerships`)
**File:** `src/app/features/about/partnerships/partnerships.component.ts`
**Sections:** Page hero, partnership commitment text, contact info, partner logos grid

### News & Media — Latest News (`/news-media/latest-news`)
**File:** `src/app/features/news-media/latest-news/latest-news.component.ts`
Uses: `app-page-hero`, `app-filter-pills`, `app-news-card`, `app-search-bar`, pagination

### News & Media — Article Detail (`/news-media/article/:id`)
**File:** `src/app/features/news-media/article-detail/article-detail.component.ts`
Uses: `app-page-hero` (article hero variant), article body, related articles

### News & Media — Announcements & Initiatives (`/news-media/announcements`)
**File:** `src/app/features/news-media/announcements/announcements.component.ts`
Uses: `app-page-hero`, `app-initiative-card`, `app-news-card`

### News (legacy) (`/news`, `/news/:id`)
**Files:** `src/app/features/news/news.component.ts`, `src/app/features/news/article-detail/article-detail.component.ts`
Legacy alternative news route — partially duplicates news-media feature.

---

## 15. Data Models & Services

### Models (`src/app/core/models/`)

| File | Interface | Key Fields |
|---|---|---|
| `news-article.model.ts` | `NewsArticle` | `id`, `slug`, `title`, `excerpt`, `body?`, `imageUrl`, `date`, `category` |
| `leader-profile.model.ts` | `LeaderProfile` | `id`, `name`, `nameAr`, `title`, `titleAr`, `photoUrl`, `messageExcerpt`, `messageExcerptAr` |
| `stat-item.model.ts` | `StatItem` | `value`, `label`, `suffix?` |
| `initiative.model.ts` | `Initiative` | `id`, `title`, `description`, `imageUrl`, `deadline?`, `status: 'open'\|'closed'\|'upcoming'`, `ctaPrimary`, `ctaSecondary?` |
| `service-card.model.ts` | `ServiceCard` | `id`, `iconName`, `title`, `description`, `linkUrl`, `category` (7 categories) |
| `persona-tab.model.ts` | `PersonaTab`, `ServiceItem`, `Initiative`, `PriceMarker` | Used by home transactions/persona sections |

### Services (`src/app/core/services/`)

| Service | Key Signals/Methods | Data Source |
|---|---|---|
| `TranslationService` | `currentLang`, `isRtl`, `t()`, `tInterp()`, `toggleLang()`, `setLang()` | `assets/i18n/*.json` (static import) |
| `AuthService` | `isAuthenticated` (signal), `login()`, `logout()` | Stub — always false |
| `NewsService` | `allArticles`, `visibleList`, `hasMore`, `loadMore()`, `getByCategory()`, `getCategories()` | Mock array (9 articles), `PAGE_SIZE = 6` |
| `InitiativesService` | `getAll()` | Mock array (4 initiatives) |
| `LeadersService` | `getAll()` | Mock array (3 leaders) |
| `ServicesDataService` | `getByCategory(category)`, `getPopular(limit?)` | Mock array (27 service cards, 7 categories) |
| `AchievementsService` | `getAchievements()`, `getStatsBar()` | Mock arrays |

### Adapters (`src/app/core/adapters/`)
- `news.adapter.ts` — `adaptNewsItem(raw)`, `adaptNewsItems(raws)` with fallbacks for missing fields
- `initiative.adapter.ts` — maps raw API → `Initiative`
- `service.adapter.ts` — maps raw API → `ServiceCard`

### Guards (`src/app/core/guards/`)
- `auth.guard.ts` — `canActivateFn`: checks `AuthService.isAuthenticated()`; redirects to `/auth/signin` if false. **Currently not applied to any route** (all routes are public stubs).

---

## 16. Assets Conventions

### Directory Structure
```
src/assets/
├── i18n/              # Translation JSON files only
├── icons/             # SVG icons that are standalone files
│   ├── logo/          # dld-emblem.svg
│   └── social/        # x.svg, youtube.svg
└── images/            # All raster (jpg/png) and vector (svg) images
```

### Icon convention
- **UI icons** (nav arrows, buttons, chevrons, feature icons): inline SVG `<path d="…">` strings embedded directly in component templates or SCSS. These are **not files** in `assets/icons/` — they're SVG path data strings in TypeScript/HTML.
- **Standalone SVG files** go in `assets/icons/` only for things referenced by `<img src="…">` or `<use href="…">`.
- **Brand/social SVGs** go in `assets/icons/social/` or `assets/icons/logo/`.

### Current Asset Inventory

| File | Use |
|---|---|
| `images/logo.svg`, `logo2.svg`, `logo2signle.svg`, `logo2outline.svg`, `logosignle.svg` | DLD logo variants (full / single mark / outline) |
| `images/hero-dubai.jpg`, `Hero Banner.png` | Home hero background |
| `images/about-dubai.jpg`, `about-dubai-night.jpg` | About page imagery |
| `images/about-illustration.svg` | About page page-hero illustration |
| `images/leadership-illustration.svg` | Leadership page illustration |
| `images/partnerships-illustration.svg` | Partnerships page illustration |
| `images/chairman-portrait.jpg` | H.E. Marwan bin Ghalita portrait |
| `images/dg-portrait.jpg` | H.E. Omar Bu Shehab portrait |
| `images/leader-placeholder.jpg` | Placeholder for missing leader portraits |
| `images/news-placeholder.jpg` | Placeholder for missing news article images |
| `images/app-mockup.png` | App download section phone mockup |
| `images/phones.svg`, `phonestop.svg` | Phone device illustrations |
| `images/property-ownership.svg` | Service/property illustration |
| `images/footercarerrs.svg` | Footer careers image |
| `images/partner-dubai-pulse.svg` | Dubai Pulse partner logo |
| `icons/logo/dld-emblem.svg` | DLD emblem/crest |
| `icons/social/x.svg`, `youtube.svg` | Social media icons |

### Placeholder Policy
**Never render a blank or black rectangle.** When a real asset is missing:
- Use `news-placeholder.jpg` for news article images.
- Use `leader-placeholder.jpg` for missing leader portraits.
- For partner logos without a file, `PartnerLogoCardComponent` renders the partner name text as fallback.

### Pending Real Assets (placeholders still in use)
- Brand font files (`DubaiW23-Regular.woff2`, `DubaiW23-Medium.woff2`, `DubaiW23-Bold.woff2`) — font-face stubs are commented out in `_fonts.scss`
- Initiative images (all `InitiativeCard` items currently use placeholder paths)
- Additional partner logos (only `partner-dubai-pulse.svg` exists)
- Map imagery for the transactions section price map
- Additional leadership team portraits beyond chairman and DG

---

## 17. Coding Conventions

### Component file layout
```typescript
// 1. Angular + third-party imports
import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
// 2. Local imports (models, services, shared components)
import { TranslationService } from '../../core/services/translation.service';

// 3. Inline interfaces/types if small; otherwise in models file
interface Foo { bar: string }

// 4. Inline const data arrays (for static mock data)
const ITEMS = [...];

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [/* only what this template uses */],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './my-component.component.html',
  styleUrl: './my-component.component.scss',
})
export class MyComponent {
  readonly tr = inject(TranslationService);

  // Signals
  readonly activeTab = signal('owner');
  readonly isOpen = signal(false);

  // Computed
  readonly filtered = computed(() => ...);

  // Inputs (signals API)
  readonly title = input.required<string>();
  readonly variant = input<'a' | 'b'>('a');

  // Outputs (signals API)
  readonly selected = output<string>();

  // Methods (no access modifier needed for simple helpers)
  selectTab(id: string): void {
    this.activeTab.set(id);
    this.selected.emit(id);
  }
}
```

### Naming
- Component files: `kebab-case.component.ts` / `.html` / `.scss`
- Component class: `PascalCaseComponent`
- Selector: `app-kebab-case`
- Signals: prefix `readonly`, camelCase (`readonly isOpen = signal(false)`)
- Services: `PascalCaseService`, file `kebab-case.service.ts`
- Models: `PascalCase` interface, file `kebab-case.model.ts`

### SCSS per-component
```scss
// Use @use for any partial needed (breakpoints, mixins)
@use '../../../styles/mixins' as *;
@use '../../../styles/breakpoints' as *;

// Host element styles if needed
:host { display: block; }

// Use CSS custom properties for all values
.my-block {
  padding: var(--space-6);
  color: var(--color-heading);
  border-radius: var(--radius-lg);

  @include bp-down('md') {
    padding: var(--space-4);
  }
}
```

Do NOT `@use 'styles/tokens'` in component SCSS — tokens are global via `styles.scss`.

### Template formatting
- `@if (condition) { … } @else { … }` — no parentheses required but keep for readability
- `@for (item of items; track item.id) { … }` — always provide `track`
- Use `{{ tr.t('key') }}` for inline text; never raw strings

---

## 18. Playbooks — "How to add X"

### Add a new feature page

1. Create `src/app/features/my-feature/my-feature.component.ts` (and `.html`, `.scss`).
2. Add `<main id="main-content">` as root element in the template.
3. Register in `src/app/app.routes.ts`:
   ```typescript
   {
     path: 'my-feature',
     loadComponent: () =>
       import('./features/my-feature/my-feature.component').then(m => m.MyFeatureComponent),
     title: 'My Feature | Dubai Land Department',
   }
   ```
4. Add i18n keys to `en.json` and `ar.json`.
5. Add the route to the appropriate mega-menu column in `navbar.component.ts` if it should be linked from the nav.

### Add a shared component

1. Create `src/app/shared/components/my-widget/my-widget.component.ts` (+ `.html`, `.scss`).
2. Use `standalone: true`, `ChangeDetectionStrategy.OnPush`, `input()` / `output()` signals API.
3. Choose selector `app-my-widget`.
4. Update Section 13 of this file with the new component details.

### Add a nav mega-menu dropdown

1. In `navbar.component.ts`, find the `navLinks` computed array.
2. Set `hasDropdown: true` and add `megaKey: 'my-key'`.
3. Add a `megaMenu: MegaMenuConfig` object with `title`, `tagline`, and `columns: MegaMenuColumn[]`.
4. Each column needs: `iconPath` (SVG `d` string), `title`, `caption`, `links[]` (routerLink + optional fragment), `fullLink`.
5. Add translation keys for all text to `en.json` / `ar.json` under `nav.mega.my_key.*`.
6. The navbar template renders mega menus automatically based on `megaKey` — no template changes needed.

### Add an i18n key

1. Choose the correct top-level group (or create a new one matching the feature name).
2. Add to `src/assets/i18n/en.json`: `"my_group": { "my_key": "English text" }`
3. Add to `src/assets/i18n/ar.json`: `"my_group": { "my_key": "النص العربي" }`
4. Use in template: `{{ tr.t('my_group.my_key') }}`
5. For interpolation: `{{ tr.tInterp('my_group.count', { n: value }) }}` where JSON value is `"{{n}} items"`.

### Add an inline SVG icon

SVG icons in this codebase are **inline `<path>` strings**, not file references. To add one:

1. Find or create the SVG path `d` attribute string (e.g., from Heroicons, Feather, or custom).
2. Use it directly in the template:
   ```html
   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2" aria-hidden="true">
     <path d="M12 5v14M5 12l7 7 7-7" stroke-linecap="round" stroke-linejoin="round"/>
   </svg>
   ```
3. Or pass it as a component `@Input` (see `StatCardComponent.icon` pattern).
4. Always add `aria-hidden="true"` on decorative SVGs. Add `role="img"` + `<title>` for meaningful SVGs.

---

## 19. Definition of Done

Run this checklist before marking any task complete:

- [ ] **Design match:** Visual output matches the design at 1440px. Spacing, colors, and typography use only CSS tokens.
- [ ] **Shared components:** No markup duplicated from an existing shared component. Check Section 13 first.
- [ ] **Build clean:** `npm run build` in `dld-app/` exits 0 with no errors or budget overages.
- [ ] **No spec files:** No `*.spec.ts` created.
- [ ] **Responsive:** Tested at 375px (mobile), 768px (tablet), 1024px (laptop), 1440px (desktop). No horizontal overflow. No text/icon overlap.
- [ ] **RTL mirrors correctly:** Switch to Arabic; layout mirrors using logical properties only. No `left`/`right` offenders visible. Directional icons use `.rtl-flip`.
- [ ] **All strings i18n:** Zero hardcoded English text in templates. All new strings added to both `en.json` and `ar.json`.
- [ ] **Accessibility:** All interactive elements reachable by keyboard. Focus ring visible. New modals/dialogs trap focus. ARIA attributes present on non-semantic interactive elements.
- [ ] **Assets wired:** All `<img>` `src` paths resolve to real files. Placeholder images used where real assets are pending — no blank boxes.
- [ ] **OnPush + signals:** New components use `ChangeDetectionStrategy.OnPush` and signals API throughout.

---

## 20. Gaps, TODOs & Known Inconsistencies

| # | Issue | File | Impact |
|---|---|---|---|
| 1 | **leaflet & ngx-leaflet installed but unused.** `package.json` lists them but no component uses the map. Add or remove intentionally. | `dld-app/package.json` | Bundle bloat |
| 2 | **Duplicate news routing.** Both `/news` (legacy) and `/news-media/*` routes exist. `NewsComponent` and `LatestNewsComponent` partially duplicate functionality. Consolidate on `news-media`. | `app.routes.ts` | UX confusion |
| 3 | **`app.component.spec.ts` exists** — violates the "no spec files" rule. Delete it. | `src/app/app.component.spec.ts` | Convention violation |
| 4 | **Auth guard not applied.** `auth.guard.ts` exists but is attached to no route. All routes are public. | `app.routes.ts`, `auth.guard.ts` | Security (future) |
| 5 | **All services use mock data.** `NewsService`, `InitiativesService`, `LeadersService`, `ServicesDataService`, `AchievementsService` all return hardcoded arrays. No HTTP calls. Adapters exist but are not used in services. | `core/services/` | Must replace before production |
| 6 | **Brand font not loaded.** `_fonts.scss` has `@font-face` blocks commented out pointing to `assets/fonts/DLD/DubaiW23-*.woff2`. Font files do not exist in the repo. Current fallback: Poppins. | `src/styles/_fonts.scss` | Visual — will shift layout when real font is added |
| 7 | **Bootstrap RTL via CDN.** `TranslationService` injects Bootstrap RTL from `jsdelivr.net` at runtime. This adds a network dependency and may fail in restricted environments. | `translation.service.ts:73` | Reliability |
| 8 | **`atHome` uses `window.location.pathname`.** `NavbarComponent.atHome` is a getter calling `window.location.pathname` directly instead of using Angular Router's `NavigationEnd` events or `Router.url`. Works but is not SSR-safe. | `navbar.component.ts:196` | SSR incompatible |
| 9 | **Org chart component has no HTML template file.** `org-chart.component.ts` exists with a `.scss` but no `.html` file found — template may be inline. | `features/about/leadership/org-chart/` | Verify before editing |
| 10 | **Some feature sections have no HTML template.** Several section components (e.g., `achievements-section`, `cornerstone-section`, `values-section`) have no `.html` file — templates are likely inline in the `.ts` file. | `features/about/sections/*/` | Check before editing |
| 11 | **Legacy `--color-text-primary` / `--color-navy-light` / `--color-bg-light` tokens.** Marked as legacy aliases in `_tokens.scss`. Prefer canonical tokens; clean up when encountered. | `src/styles/_tokens.scss` | Token debt |
| 12 | **`--radius-full` legacy alias.** Use `--radius-pill` (999px) or `--radius-xl` (24px) for new code. | `src/styles/_tokens.scss` | Token debt |
| 13 | **`home.component.ts` has no HTML template file.** Only `.ts` found — template is inline. | `features/home/home.component.ts` | Check before editing |
| 14 | **i18n keys not used consistently.** `AboutComponent` hard-codes English strings in `STATS`, `STRATEGIC_CARDS`, `ACHIEVEMENT_STATS`, `TIMELINE_ITEMS`, and `valuesItems` instead of loading from `tr.t()`. Same in `LeadershipComponent`. | `features/about/about.component.ts`, `leadership.component.ts` | RTL/i18n incomplete |
| 15 | **`partners-section` reused from home in about/leadership pages** (imported directly from `features/home/sections/partners-section/`). This is a cross-feature import — consider moving `PartnersSectionComponent` to `shared/` if used in 3+ places. | `features/about/*.component.ts` | Architecture |
