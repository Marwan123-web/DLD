# DLD Web App — Single Source of Truth (SSOT)

> Last updated: Phase 0 — Discovery  
> All values marked ⚠️ APPROX were inferred from screenshots and must be confirmed against the official brand guide.

---

## 1. Design Tokens

### 1.1 Color Palette

| CSS Custom Property | Value | Usage |
|---|---|---|
| `--color-primary` | `#22A87C` ⚠️ APPROX | Main interactive green — buttons, active states, icons |
| `--color-primary-dark` | `#1B5E45` ⚠️ APPROX | DLD Initiatives section bg, App Download section bg |
| `--color-navy` | `#192032` ⚠️ APPROX | Navbar background, Footer background |
| `--color-white` | `#FFFFFF` | Cards, content areas |
| `--color-bg-tint` | `#EBF5F0` ⚠️ APPROX | Page canvas background (mint-green tint visible in Figma canvas) |
| `--color-text-primary` | `#1A2235` ⚠️ APPROX | Primary body text |
| `--color-text-muted` | `#6B7280` ⚠️ APPROX | Secondary/caption text |
| `--color-border` | `#E5E7EB` ⚠️ APPROX | Card borders, dividers |

> AMBIGUITY #1: All hex values are approximate, inferred visually from screenshots. Request official brand palette before Phase 3.

### 1.2 Typography

**Font family:** `"Dubai"` — Google Font (bilingual Latin + Arabic script, official UAE government typeface)  
Import URL: `https://fonts.googleapis.com/css2?family=Dubai:wght@300;400;500;700&display=swap`

| Token | Size | Weight | Usage |
|---|---|---|---|
| `--text-hero` | 48–56px ⚠️ APPROX | 700 Bold | Hero section heading |
| `--text-xl` | 32–40px ⚠️ APPROX | 600 Semi-bold | Section headings |
| `--text-lg` | 24–28px ⚠️ APPROX | 600 Semi-bold | Card headings, sub-section titles |
| `--text-md` | 18–20px ⚠️ APPROX | 500 Medium | Emphasized body |
| `--text-base` | 15–16px ⚠️ APPROX | 400 Regular | Body text |
| `--text-sm` | 13–14px ⚠️ APPROX | 400 Regular | Labels, captions, metadata |

Line heights: `1.5` for body, `1.25` for headings.

> AMBIGUITY #2: Confirm that the "Dubai" Google Font includes weights 300–700 in both scripts before wiring the import.

### 1.3 Spacing Scale

Base unit: `4px`

```
4px · 8px · 12px · 16px · 20px · 24px · 32px · 40px · 48px · 64px · 80px · 96px
```

### 1.4 Border Radius

| Context | Value |
|---|---|
| Cards, inputs, buttons | `8px` ⚠️ APPROX |
| Pills, active tabs | `24px` (fully rounded) |
| Avatar circles | `50%` |

### 1.5 Shadows

| Context | Value |
|---|---|
| Cards | `0 2px 16px rgba(0, 0, 0, 0.08)` ⚠️ APPROX |
| Navbar | `0 2px 8px rgba(0, 0, 0, 0.12)` ⚠️ APPROX |
| Dropdown menus | `0 8px 24px rgba(0, 0, 0, 0.12)` ⚠️ APPROX |

### 1.6 Breakpoints

| Name | Min-width | Source |
|---|---|---|
| `xs` | 390px | iPhone viewport visible in `Responsive view.png` |
| `sm` | 576px | Bootstrap standard (inferred) |
| `md` | 768px | Bootstrap standard (inferred, tablet breakpoint) |
| `lg` | 992px | Bootstrap standard |
| `xl` | 1200px | Bootstrap standard |
| `xxl` | 1440px | Design canvas width observed in screenshots |

---

## 2. Shared Shell Inventory

### 2.1 Navbar

**Component:** `NavbarComponent` (`layout/navbar/`)

| Property | Value |
|---|---|
| Background | `--color-navy` |
| Height | ~72px desktop, ~60px mobile ⚠️ APPROX |
| Position | `sticky top-0`, `z-index: 1000` |

**Structure (LTR):**
```
[DLD Crest + Arabic label]  [Home | About Us | Services ˅ | Trainings ˅ | Open Data ˅ | News ˅ | Help ˅]  [Search | Bell | User | UAE Flag + "UAE" | Lang Toggle]
```

**Nav links with dropdowns:**
- Home
- About Us
- Services ˅ (dropdown)
- Trainings & Programs ˅ (dropdown)
- Open Data & Insights ˅ (dropdown)
- News and Media ˅ (dropdown)
- Help and Support ˅ (dropdown)

**Right icons (left-to-right):**
1. Search icon (opens search overlay)
2. Bell/Notifications icon (with badge indicator)
3. User avatar circle (profile/auth)
4. UAE flag + "UAE" text (language/region)
5. Language toggle (EN ↔ AR)

**Active state:** Underline + tinted highlight on active nav link.

**RTL:** All directional properties use CSS logical properties. Nav links reorder naturally; icons mirror.

**Mobile behavior:**
- Collapses to: `[DLD Logo]` + `[Hamburger ≡]`
- Hamburger opens full-screen drawer overlay with nav links stacked vertically
- Drawer closes on: link click, outside tap, Escape key

**Accessibility:**
- `role="navigation"` + `aria-label="Main navigation"`
- Dropdown triggers: `aria-expanded`, `aria-haspopup="true"`
- Mobile drawer: `aria-modal="true"`, focus trap, `aria-label="Navigation menu"`
- Skip-to-content link as first focusable element

### 2.2 Bottom Toolbar (Floating)

**Component:** `BottomToolbarComponent` (`layout/bottom-toolbar/`)

Always visible across all pages (fixed position, above footer).

**Icons (LTR order):** Chat/AI · Services · Survey · Locations · Announcements · Contact Us · dubai.ae · Language · AI

> AMBIGUITY #3: Unclear if all 9 icons are always shown or if some are context-aware (e.g., only on certain pages). Building as always-visible; mark `// AMBIGUITY:` in component.

### 2.3 Footer

**Component:** `FooterComponent` (`layout/footer/`)

**Background:** `--color-navy`

**Row 1 — Brand block:**
- DLD crest emblem + Arabic name "دائرة الأراضي والأملاك دبي" + English "Dubai Land Department"
- Tagline: "Shaping Dubai's real estate future through innovation and excellence."
- Social links: X (Twitter) · YouTube
- "Last updated: DD Mon YYYY – HH:MM AM"

**Row 2 — Navigation columns (3 columns):**
- Column A: Home · About Us · Services · Trainings & Programs
- Column B: Open Data & Insights · News and Media · Help and Support
- Column C: (empty or additional links — ⚠️ AMBIGUITY #4: third column content not fully visible)

**Copyright line:** `© 2026 Dubai Land Department – All Right Reserved`

**Mobile:** Single-column stacked layout.

---

## 3. Per-Page Layout Breakdown

### 3.1 Homepage (`/`)

**Source:** `Home Screen.png` + `Responsive view.png`

#### Section 1 — Hero
- Full-width Dubai skyline photo (dark/dusk tones)
- Centered content:
  - Heading: "Dubai Land Department" (white, `--text-hero`)
  - Mission text: "Dubai Land Department seeks to achieve the objectives of Dubai Government's strategy in the real estate sector, and improve land registration procedures."
  - Search bar (white/light input + green search button)
  - Quick-link chips below search (e.g., "I want to register a property", "I want to renew my Ejari") ⚠️ AMBIGUITY #5: exact link labels not legible
- Pagination dots (bottom of hero, for carousel)
- Reusable? No — page-specific section

#### Section 2 — Service Category Tabs
- Pills: **Popular Services & Tools** (active) · Owner · Tenant · Broker · Developer · Management Companies · Partners
- Active pill: filled green (`--color-primary`), white text
- Inactive pills: outlined or ghost style
- Reusable: `TabGroupComponent` (shared)

#### Section 3 — Service Cards Grid
- Section label chip: "POPULAR SERVICES" (small green label)
- Title: "Popular Services & Tools"
- Subtitle: "Discover additional tools including property indexes, valuations, certificates, and digital services"
- Grid: 2 rows × 3 columns (desktop), 1 column (mobile)
- Each card: Icon (line SVG) + Title + Description + Arrow link (green circle arrow)
- Cards visible:
  1. Rental Index — "Check average rental values for any area and property type"
  2. Service Charge Index — "View average service charges for any community and building"
  3. Property Valuation — "Get an official DLD-certified property valuation report"
  4. Download Rental Certificate (Ejari) — "Download your registered Ejari certificate instantly"
  5. To Whom It May Concern Certificate — "Obtain an official DLD certificate confirming your ownership"
  6. Property Status Enquiry — "Check your property status, ownership, and registration"
- "View More" ghost button (centered below grid)
- Reusable: `ServiceCardComponent` (shared)

#### Section 4 — DLD Initiatives
- Background: `--color-primary-dark` (dark green)
- Section label chip: "DLD INITIATIVES"
- Title: "DLD Initiatives"
- Subtitle: "Fostering innovation & collaboration through cutting-edge research, technology development, & strategic partnerships"
- Horizontal scroll of `InitiativeCardComponent`:
  - Card 1: "Emirati Real Estate Companies Incubator" — deadline + CTA "Apply now" + "Learn more"
  - Card 2: "Your First Home in Dubai" — "Register your interest" + CTA button
  - Card 3: (partially visible, more cards)
- Card style: dark image background, white text overlay, pill badge (status), two CTAs
- Reusable: `InitiativeCardComponent` (shared)

#### Section 5 — Real Estate Transactions
- Title: "Real Estate Transactions" + date picker `[DD/MM/YYYY]` icon
- Subtitle: "Stay ahead with the latest real estate transactions in Dubai. Gain accurate, real-time market insights to make smarter, data-driven decisions"
- Tab switch: **Analytics** | **Map**
- **Analytics tab** (donut chart via Chart.js/ng2-charts):
  - Center label: "Total Transactions · 1.64 B · 13th May 2025"
  - Segments: green (primary), navy, purple/accent ⚠️ AMBIGUITY #6: exact segment colors and labels
  - Legend: "Mortgaged: 435" visible; more segments unlabeled
- **Map tab** (Leaflet map):
  - Interactive map of Dubai with location pins showing prices (e.g., "AED 1.2M")
  - Click on pin shows popup: Location name + No. of Transactions + AED value + Top Price Range + "Add It" button
  - Example popup: "CREEK HARBOUR · 3,124,580,000 AED · Top Price Range: AED 9,990–12,500"
  - Map tiles: OpenStreetMap (TODO: confirm tile provider license; `// TODO(backend): swap tile URL for approved provider`)
- Reusable: page-specific section; chart and map are page-specific

#### Section 6 — App Download
- Background: `--color-primary-dark`
- Title: "Download Dubai REST APP Now" (white heading)
- Subtitle: description of app features
- Tagline: "Available on All Platforms"
- Phone mockups (3 phone screens showing app UI)
- App store badges: App Store · Google Play · AppGallery
- Reusable: page-specific section

#### Section 7 — Partners
- White background
- Partner logos: Dubai Careers · Dubai Pulse (dubai pulse)
- Reusable: `PartnersRowComponent` (reused on About page)

---

### 3.2 About Us (`/about`)

**Source:** `About Us.png` + `Responsive view.png`

#### Section 1 — Page Header / Hero
- Background: `--color-primary-dark`
- Breadcrumb: Home > About DLD (white text)
- Heading: "Who We Are" (white, `--text-xl`)
- Tagline: "Trusted by millions, built on integrity, driving Dubai's property market since 1960." ⚠️ AMBIGUITY #7: exact tagline text not fully legible
- Reusable: `PageHeroComponent` (shared; accepts heading, breadcrumb, tagline)

#### Section 2 — Stats Bar
- Inline stats row (3 columns):
  - `500K+` — Annual Transactions ⚠️ APPROX label
  - `AED 1288` — Dubai Data 2025 ⚠️ APPROX label
  - `4.5+` — ⚠️ AMBIGUITY #8: third stat label not legible
- Reusable: `StatBarComponent` (shared)

#### Section 3 — Cornerstone
- Illustration: magnifying glass over house icon
- Large heading: "The Cornerstone of Dubai's Real Estate Ecosystem." ⚠️ APPROX
- Body text describing DLD's role and history
- Split layout (text left, illustration right) on desktop; stacked on mobile

#### Section 4 — Values Watermark
- Large semi-transparent watermark text: "TRUST VISION GROWTH INTEGRITY" in `--color-primary` at low opacity
- Dubai skyline photo beneath/behind the text
- Visual depth effect (z-index layering)

#### Section 5 — Empowering Section
- Dark overlay + Dubai photo
- Small label: "Our Mission" ⚠️ APPROX
- Heading: "Empowering the Real Estate Community"
- Subtitle: "Through seamless services, smart legislation, integrated data, digital infrastructure, and skilled human capital"

#### Section 6 — Our Strategic Map
- Section label chip: "OUR STRATEGIC MAP" ⚠️ APPROX
- 3 cards (horizontal grid on desktop, stacked mobile):
  - "Financing RE Model" — "Enable civic systems and ecosystems for the RE sector"
  - "RE Innovation Platform" — "Enable a private-driven and collaborative RE development" ⚠️ APPROX
  - "Agile R&D" — "Cultivate a flourishing digital ecosystem / Smart partnerships with private sector / Ensure government efficiency"
- Each card: icon + title + description

#### Section 7 — Our Achievements
- Section label: "OUR ACHIEVEMENTS"
- 4 stat counters (approximate values visible):
  - `AED 7618+` ⚠️ AMBIGUITY #9: unit and label not fully legible
  - `226,000+` ⚠️ AMBIGUITY #9: label not legible
  - 2 more stats not legible
- Reusable: `StatCounterComponent` (shared)

#### Section 8 — Partners Row
- Same as Homepage partners row
- Reusable: `PartnersRowComponent`

---

### 3.3 Leadership & Organization (`/about/leadership`)

Sub-page under About Us (lazy child route)

#### Section 1 — Page Header
- Background: `--color-primary-dark`
- Breadcrumb: Home > About DLD > Leadership & Organization
- Heading: "Leadership & Organization"
- Reusable: `PageHeroComponent`

#### Section 2 — Messages from Leadership
- Section title: "Messages from Leadership"
- `LeaderCardComponent` × 2+ cards:
  - Photo (portrait of official in traditional dress)
  - Name + Title
  - Excerpt text
  - CTA: "Read Message" or similar
- ⚠️ AMBIGUITY #10: number of leader cards and exact titles not fully legible

#### Section 3 — Organization Chart
- Section title: "Organization Chart"
- Hierarchical tree structure showing DLD organizational hierarchy
- Multiple levels visible (Director General → Department heads → sub-departments)
- Implementation: CSS/HTML flexbox tree (no library); `// AMBIGUITY: may need a chart library if tree is deep/complex`
- `// TODO(backend): fetch live org chart data from DLD API`

---

### 3.4 News & Media (`/news`)

**Source:** `News and Media.png`

#### Section 1 — Latest News (Hero)
- Section label chip: "LATEST NEWS"
- Title: "Latest News"
- Subtitle: "Stay updated with the latest developments in Dubai's real estate..."
- 3 featured `NewsCardComponent` (hero variant):
  - Large image (full card bg)
  - Date tag
  - Headline title
  - Optional category badge
- Horizontal row of 3 cards on desktop; single column on mobile

#### Section 2 — All News Listing
- Section title: "All News"
- Subtitle: "Explore all of our news and stay updated"
- `NewsCardComponent` (list variant) — horizontal layout:
  - Left: thumbnail image
  - Right: category chip · title · date · excerpt · "Read More →" link
- List grows vertically
- "Showing X out of Y results" text + "Load More" button
- `// TODO(backend): paginate from DLD News API`

---

## 4. Routing Map

```
/                        → HomeComponent           (lazy feature module)
/about                   → AboutComponent          (lazy feature module)
/about/leadership        → LeadershipComponent     (lazy child route)
/news                    → NewsComponent           (lazy feature module)
/news/:id                → ArticleDetailComponent  (lazy, placeholder stub only)
/services                → ServicesPlaceholderComponent (out of scope — stub)
/trainings               → placeholder
/open-data               → placeholder
/help                    → placeholder
/auth/signin             → AuthPlaceholderComponent (scaffold for guard)
/auth/register           → AuthPlaceholderComponent (scaffold for guard)
**                       → NotFoundComponent
```

**Auth Guards:**
- `AuthGuard` — stub returning `true` for all routes; wired to `/services/**` as example
- `// TODO(backend): implement real auth check against DLD identity provider`

---

## 5. i18n Key Plan

```json
// en.json / ar.json structure (nested by namespace)
{
  "nav": {
    "home": "Home",
    "about": "About Us",
    "services": "Services",
    "trainings": "Trainings & Programs",
    "open_data": "Open Data & Insights",
    "news": "News and Media",
    "help": "Help and Support",
    "search": "Search",
    "notifications": "Notifications",
    "profile": "My Profile",
    "language": "العربية"
  },
  "hero": {
    "title": "Dubai Land Department",
    "subtitle": "...",
    "search_placeholder": "Search for services, properties...",
    "search_cta": "Search"
  },
  "services": {
    "popular_label": "POPULAR SERVICES",
    "title": "Popular Services & Tools",
    "subtitle": "Discover additional tools including property indexes, valuations, certificates, and digital services",
    "view_more": "View More"
  },
  "service": {
    "rental_index": { "title": "Rental Index", "desc": "..." },
    "charge_index": { "title": "Service Charge Index", "desc": "..." },
    "valuation": { "title": "Property Valuation", "desc": "..." },
    "ejari": { "title": "Download Rental Certificate (Ejari)", "desc": "..." },
    "cert": { "title": "To Whom It May Concern Certificate", "desc": "..." },
    "status": { "title": "Property Status Enquiry", "desc": "..." }
  },
  "initiatives": {
    "title": "DLD Initiatives",
    "subtitle": "Fostering innovation & collaboration through cutting-edge research, technology development, & strategic partnerships"
  },
  "transactions": {
    "title": "Real Estate Transactions",
    "subtitle": "Stay ahead with the latest real estate transactions in Dubai...",
    "analytics_tab": "Analytics",
    "map_tab": "Map"
  },
  "app": {
    "download_title": "Download Dubai REST APP Now",
    "download_subtitle": "...",
    "available_on": "Available on All Platforms"
  },
  "about": {
    "who_we_are": "Who We Are",
    "tagline": "...",
    "stats": {
      "transactions": "500K+ Annual Transactions",
      "index": "AED 1288 Dubai Data 2025",
      "rating": "4.5+"
    },
    "cornerstone_title": "The Cornerstone of Dubai's Real Estate Ecosystem.",
    "cornerstone_body": "...",
    "values": {
      "trust": "TRUST", "vision": "VISION", "growth": "GROWTH", "integrity": "INTEGRITY"
    },
    "empower_title": "Empowering the Real Estate Community",
    "empower_subtitle": "Through seamless services, smart legislation, integrated data, digital infrastructure, and skilled human capital",
    "strategic_map_title": "Our Strategic Map",
    "achievements_title": "Our Achievements"
  },
  "leadership": {
    "title": "Leadership & Organization",
    "messages_title": "Messages from Leadership",
    "org_chart_title": "Organization Chart"
  },
  "news": {
    "latest_label": "LATEST NEWS",
    "latest_title": "Latest News",
    "all_title": "All News",
    "all_subtitle": "Explore all of our news and stay updated",
    "read_more": "Read More",
    "load_more": "Load More",
    "showing_count": "Showing {{shown}} out of {{total}} results"
  },
  "footer": {
    "tagline": "Shaping Dubai's real estate future through innovation and excellence.",
    "copyright": "© 2026 Dubai Land Department – All Right Reserved",
    "last_updated": "Last updated on {{date}}"
  },
  "common": {
    "loading": "Loading...",
    "error": "Something went wrong. Please try again.",
    "back": "Back",
    "learn_more": "Learn more",
    "apply_now": "Apply now"
  }
}
```

---

## 6. Asset List

### SVG Icons (`src/assets/icons/`)

```
logo/
  dld-emblem.svg           (crest/seal icon)
  dld-wordmark-en.svg      (English logotype)
  dld-wordmark-ar.svg      (Arabic logotype)

nav/
  search.svg
  bell.svg
  user.svg
  hamburger.svg
  close.svg
  flag-uae.svg
  chevron-down.svg

services/
  rental-index.svg
  charge-index.svg
  valuation.svg
  ejari.svg
  cert.svg
  property-status.svg

social/
  x.svg
  youtube.svg

stores/
  app-store.svg
  google-play.svg
  appgallery.svg

toolbar/
  chat.svg
  survey.svg
  location.svg
  announcement.svg
  contact.svg
  globe.svg
  ai.svg
  services.svg

common/
  arrow-right.svg
  arrow-left.svg
  external-link.svg
  calendar.svg
  map-pin.svg
```

### Raster Images (`src/assets/images/`)

```
hero-dubai.jpg              (Dubai skyline — placeholder; real asset from client)
about-dubai-day.jpg         (Dubai buildings — about page)
about-dubai-night.jpg       (Dubai skyline night — values section)
app-mockup.png              (phone screens — app download section)
news-placeholder.jpg        (generic news thumbnail)
leader-placeholder.jpg      (generic portrait — leadership cards)
```

### Partner Logos (`src/assets/images/partners/`)

```
dubai-careers.svg
dubai-pulse.svg
```

---

## 7. Open Questions / Ambiguities

| # | Area | Ambiguity | Assumption Made |
|---|---|---|---|
| 1 | Colors | All hex values approximate; exact brand palette not confirmed | Using inferred values; marked `⚠️ APPROX` throughout |
| 2 | Typography | "Dubai" Google Font weight range not confirmed | Assume 300–700 available; verify before Phase 1 |
| 3 | Bottom Toolbar | Always visible or context-dependent? | Building as always-visible; mark `// AMBIGUITY:` in component |
| 4 | Footer Column C | Third footer nav column content not fully legible | Left empty; add links when confirmed |
| 5 | Hero Quick Links | Exact text of quick-link chips below search not legible | Using placeholder text |
| 6 | Donut Chart Segments | Colors and labels of chart segments not confirmed | Green + navy + purple/accent; update in Phase 3 |
| 7 | About Tagline | Exact tagline text under "Who We Are" partially illegible | Using approximate; flag `// AMBIGUITY:` in translation key |
| 8 | Stats Bar | Third stat label on About page not legible | Using placeholder `"4.5+"` |
| 9 | Achievements Stats | Exact values and labels not fully legible | Using placeholder values; `// AMBIGUITY:` in mock data |
| 10 | Leadership Cards | Number of leaders and exact titles not legible | Using 2 placeholder cards; `// TODO(backend):` |
| 11 | SSR | Brief says off; may impact SEO for a government site | Off; marked `// AMBIGUITY: SSR omitted per brief; consider for SEO` |
| 12 | Map Tile Provider | Leaflet needs tile server; licensing concern | OpenStreetMap tiles; `// TODO(backend): confirm approved tile provider` |
| 13 | Service Tab Behavior | Switching tabs: filter in place or navigate? | Filter in place (no route change); `// AMBIGUITY:` in component |
| 14 | Real Images | Hero/about/news images are brand assets; not extractable from screenshots | Placeholder JPGs; `// TODO(backend): replace with official assets` |

---

## 8. Component Registry (to be kept updated)

### Shell (`layout/`)
- `NavbarComponent`
- `FooterComponent`
- `BottomToolbarComponent`

### Shared (`shared/components/`)
- `PageHeroComponent` — dark-green banner, breadcrumb, heading, tagline
- `SectionHeaderComponent` — label chip, title, subtitle
- `ServiceCardComponent` — icon + title + desc + arrow link
- `InitiativeCardComponent` — dark image card + title + desc + CTAs
- `NewsCardComponent` — hero variant + list variant
- `StatBarComponent` — inline stat row
- `StatCounterComponent` — animated counter
- `TabGroupComponent` — pill-style tab bar
- `SearchBarComponent` — input + green submit button
- `PartnersRowComponent` — logo row
- `LeaderCardComponent` — photo + name + title + excerpt
- `BreadcrumbComponent` — accessible breadcrumb trail

### Features (`features/`)
- `HomeComponent` — `/`
- `AboutComponent` — `/about`
- `LeadershipComponent` — `/about/leadership`
- `NewsComponent` — `/news`
- `ArticleDetailComponent` — `/news/:id` (stub)
- `NotFoundComponent` — `**`
- Placeholder components for out-of-scope routes

### Core (`core/`)

**Services:**
- `TranslationService` — signal-based i18n, `currentLang` signal, JSON loading, `<html>` dir/lang mutation
- `AuthService` — stub; `isAuthenticated$` signal always `false`; `// TODO(backend):`
- `NewsService` — mock news data through adapter
- `ServicesDataService` — mock service cards through adapter

**Guards:**
- `AuthGuard` — functional guard; returns `true` (stub); `// TODO(backend): real auth check`

**Adapters:**
- `NewsAdapter` — `RawNewsItem → NewsArticle`
- `ServiceAdapter` — `RawServiceItem → ServiceCard`
- `InitiativeAdapter` — `RawInitiative → Initiative`

**Models:**
- `NewsArticle` — `{ id, title, excerpt, date, imageUrl, category, slug }`
- `ServiceCard` — `{ id, iconName, title, description, linkUrl }`
- `Initiative` — `{ id, title, description, imageUrl, deadline, status, ctaPrimary, ctaSecondary }`
- `LeaderProfile` — `{ id, name, title, photoUrl, messageExcerpt }`
- `StatItem` — `{ value, label, suffix }`

---

---

## 9. Phase 1 — Project Setup Notes

**Completed:** Phase 1 scaffold + token layer + i18n + auth scaffold.

**Packages installed:**
- `bootstrap@5` (SCSS import; deprecation warning from Bootstrap's internal `@import` — harmless)
- `ng2-charts`, `chart.js` (for Real Estate Transactions donut chart — Phase 3)
- `leaflet`, `@asymmetrik/ngx-leaflet`, `@types/leaflet` (for map — Phase 3)

**npm note:** npm cache had root-owned files (run `sudo chown -R $(whoami) ~/.npm` to fix permanently). Workaround: `npm install --cache /tmp/npm-cache`.

**RTL approach:**
- Bootstrap LTR loaded via `@import` in `styles.scss`
- `TranslationService` dynamically appends/removes a `<link>` for Bootstrap RTL CSS (CDN) on `lang` switch
- All custom CSS uses CSS logical properties (`inset-inline-*`, `padding-inline-*`, `margin-block-*`, `text-align: start`)

**TranslationService:** Signal-based; statically imports EN/AR JSON (TypeScript `resolveJsonModule`); updates `<html lang dir>` via `effect()`.

**Folder structure:**
```
src/app/
├── core/
│   ├── models/         (5 models: NewsArticle, ServiceCard, Initiative, LeaderProfile, StatItem)
│   ├── adapters/       (3 adapters: news, service, initiative)
│   ├── services/       (TranslationService, AuthService)
│   └── guards/         (authGuard — functional, stub returns true)
├── layout/             (navbar/, footer/, bottom-toolbar/ — stubs, built Phase 2)
├── shared/components/  (built Phase 2+)
├── features/
│   ├── home/           (stub — Phase 3)
│   ├── about/          (stub + leadership/ child — Phase 4)
│   ├── news/           (stub — Phase 5)
│   └── not-found/      (functional)
src/styles/
│   ├── _tokens.scss
│   ├── _typography.scss
│   ├── _breakpoints.scss
│   └── _mixins.scss
src/assets/
│   ├── i18n/en.json
│   └── i18n/ar.json
```

---

## 10. Phase 2 — Shell Notes

**Completed:** NavbarComponent + FooterComponent + BottomToolbarComponent wired into AppComponent.

**NavbarComponent (`layout/navbar/`):**
- Sticky top, `z-index: 1040`, dark navy background
- Desktop: 7 nav links (dropdowns placeholder — content added in future phases); 4 right-action buttons (search, bell, user, lang toggle)
- Mobile: hamburger → fixed side drawer (`z-index: 1042`), overlay backdrop (`z-index: 1041`)
- RTL: drawer slides from `inset-inline-start`/`inset-inline-end` (logical properties)
- Escape key closes drawer + dropdowns via `@HostListener`
- Keyboard accessible: `aria-expanded`, `aria-haspopup`, `aria-modal`, focus ring

**FooterComponent (`layout/footer/`):**
- Dark navy; 3-column grid (brand + 2 nav cols); collapses to 2-col on `lg`, 1-col on `sm`
- `lastUpdated` timestamp set at component init; `// TODO(backend): fetch from CMS/deployment metadata`
- AMBIGUITY: Third footer nav column content not confirmed — left empty with comment

**BottomToolbarComponent (`layout/bottom-toolbar/`):**
- `position: fixed; inset-block-end: 0` — always visible
- 9 items with inline SVG icons; labels hidden on mobile (`xs`)
- Body gets `padding-block-end: 64px` to avoid content overlap

**SVG assets created (placeholder):**
- `assets/icons/logo/dld-emblem.svg` — geometric placeholder; replace with official brand crest
- `assets/icons/social/x.svg`, `youtube.svg`

**SCSS fixes:**
- `_breakpoints.scss`: migrated from deprecated `map-get()` to `@use 'sass:map'` + `map.get()`
- Remaining deprecation warning: Bootstrap's own `@import` — cannot fix without Bootstrap library update

*End of SSOT — Phase 2*
