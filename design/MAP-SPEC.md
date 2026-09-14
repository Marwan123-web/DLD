# MAP-SPEC.md — UAE Location Dashboard: Rebuild Specification

> **Purpose.** This file is a self-contained specification for rebuilding the UAE Location Dashboard map feature in the DLD Angular application. A developer with *only this document* should be able to produce an identical result. All code, values, and decisions are derived directly from the `uae-map-poc` source.

---

## 1. Goal & Summary

The UAE Location Dashboard is a full-viewport real-estate analytics page. It displays a styled interactive map of the UAE with coloured district polygons and population-pill markers for five seed locations (Dubai, Abu Dhabi, Sharjah). Users can search by name, filter by emirate, and click a polygon or marker to select a district, which pans the map to that district, highlights it, and opens an info card showing the district's name, emirate, coordinates, population, and description. A price-range legend and a bottom stats bar are overlaid on the map. A collapsible sidebar lists filtered locations. A toolbar at the top hosts search, emirate filter, reset, and theme toggle.

There is no clustering, no routing between sub-views, no user-editable data, and no authentication requirement.

---

## 2. Rendering Approach

### 2a. POC implementation (Google Maps)

| Item | Value |
|------|-------|
| Library | `@angular/google-maps` |
| Version | `21.2.13` (Angular 21) |
| Underlying API | Google Maps JavaScript API, loaded via dynamic `<script>` tag |
| API version param | `weekly` |
| Libraries param | `geometry,places` |
| Coordinate system | Geographic WGS-84 `{ lat: number, lng: number }` |
| Tile source | Google Maps tile servers (no custom tile URL) |
| Map style | Custom JSON style (18 rules, teal/green palette — see §7) |
| Map controls | Native zoom +/− only (`mapTypeControl`, `streetViewControl`, `fullscreenControl` all **disabled**) |
| API key location | `environment.googleMaps.apiKey` — same key in both `environment.ts` and `environment.prod.ts` |

The API is loaded lazily in `GoogleMapsLoaderService`. It injects a `<script>` tag the first time `load()` is called, resolves a Promise when the `__onGoogleMapsLoaded` callback fires, then the map component renders.

### 2b. DLD adaptation — no third-party map library

> **DLD constraint**: DLD bans third-party runtime libraries. `@angular/google-maps` and the Google Maps JS API are both prohibited.

**Recommended approach: inline SVG viewport with coordinate projection.**

Create an `<svg>` element whose `viewBox` covers the UAE's geographic bounding box. Map geographic coordinates to SVG user-space using a linear (equirectangular) projection. Render polygons as `<polygon>` elements and markers as `<g>` elements (pill shape + pointer triangle, matching the POC exactly). Overlay the legend and stats bar as absolutely-positioned `<div>` elements on top of the SVG.

#### Projection formula

The POC's visible area spans approximately:

| | Min | Max |
|--|-----|-----|
| Latitude (N) | 23.5 | 26.2 |
| Longitude (E) | 51.5 | 57.0 |

Map to SVG with a fixed `viewBox` of `"0 0 1000 600"` (width × height):

```ts
function lngToX(lng: number): number {
  return ((lng - 51.5) / (57.0 - 51.5)) * 1000;
}
function latToY(lat: number): number {
  // SVG Y increases downward; geographic lat increases upward
  return ((26.2 - lat) / (26.2 - 23.5)) * 600;
}
```

Use these helpers to convert every `MapLocation.paths` entry and the center `{ lat, lng }` pin.

#### Background map

Since there are no tile servers, place a **static PNG/SVG of the UAE outline** as the SVG background image (`<image href="assets/images/uae-map-bg.svg" ...>`). The DLD team must produce or license this asset. The background should use the same teal-green palette as the Google Maps custom style (see §7).

#### Features that **cannot** be replicated without Google Maps

| Feature | Workaround |
|---------|-----------|
| Raster road/label tiles | Replace with a static UAE outline SVG background image |
| Smooth pan animation on select | Use CSS `transition` on `transform: translate()` on the SVG group |
| Accurate boundary shapes from Google | Use the polygon `paths` arrays from the data model (included below) |
| `gestureHandling: 'greedy'` scroll | Implement `wheel` event handler on the SVG host to call `preventDefault()` and update a `scale` + `translate` CSS transform |
| Native zoom +/− controls | Build custom `+`/`−` buttons that update the SVG `transform` signal |

#### Pan/zoom implementation (summary)

Maintain two signals: `scale = signal(1)` and `translate = signal({x: 0, y: 0})`. Apply them as a CSS `transform` on an inner `<g class="pan-zoom-layer">` wrapping all polygons and markers. Clamp scale to `[0.5, 6]`. Reset button sets both back to defaults.

---

## 3. Data Model & Sample Data

### 3a. TypeScript interface

```ts
export interface MapLocation {
  id: number;
  name: string;
  emirate: string;
  lat: number;            // district centroid — used for marker pin and pan-to
  lng: number;            // district centroid
  population?: number;    // optional; formatted on marker (55K, 1.2M)
  description?: string;   // shown in info card
  image?: string;         // optional image path; shown in info card (e.g. 'assets/images/districts/dubai-marina.jpg')
  color?: string;         // hex; polygon fill and stroke color
  paths: google.maps.LatLngLiteral[];  // polygon boundary vertices — replace with { lat: number; lng: number }[] in DLD
}
```

> In DLD, replace `google.maps.LatLngLiteral` with a plain `{ lat: number; lng: number }` interface — no Google Maps types needed.

### 3b. Seed dataset (copy verbatim)

```ts
export const LOCATIONS: MapLocation[] = [
  {
    id: 101,
    name: 'Dubai Marina',
    emirate: 'Dubai',
    lat: 25.0772, lng: 55.139,
    population: 55000,
    description: 'High-density waterfront district with residential towers, retail promenade, and marina.',
    image: 'assets/images/districts/dubai-marina.jpg',
    color: '#4F46E5',
    paths: [
      { lat: 25.0915, lng: 55.1265 }, { lat: 25.0925, lng: 55.1485 },
      { lat: 25.0805, lng: 55.1545 }, { lat: 25.0665, lng: 55.1510 },
      { lat: 25.0615, lng: 55.1365 }, { lat: 25.0695, lng: 55.1245 },
    ],
  },
  {
    id: 102,
    name: 'Downtown Dubai',
    emirate: 'Dubai',
    lat: 25.1972, lng: 55.2744,
    population: 80000,
    description: 'Iconic mixed-use hub around Burj Khalifa and Dubai Mall, with premium real estate.',
    color: '#06B6D4',
    paths: [
      { lat: 25.2140, lng: 55.2590 }, { lat: 25.2145, lng: 55.2865 },
      { lat: 25.2015, lng: 55.2940 }, { lat: 25.1855, lng: 55.2895 },
      { lat: 25.1800, lng: 55.2705 }, { lat: 25.1905, lng: 55.2560 },
    ],
  },
  {
    id: 201,
    name: 'Al Reem Island',
    emirate: 'Abu Dhabi',
    lat: 24.4995, lng: 54.4089,
    population: 120000,
    description: 'Fast-growing island community near Abu Dhabi city center with modern residential zones.',
    color: '#22C55E',
    paths: [
      { lat: 24.5180, lng: 54.3890 }, { lat: 24.5235, lng: 54.4175 },
      { lat: 24.5070, lng: 54.4335 }, { lat: 24.4860, lng: 54.4290 },
      { lat: 24.4780, lng: 54.4045 }, { lat: 24.4895, lng: 54.3870 },
    ],
  },
  {
    id: 202,
    name: 'Khalifa City',
    emirate: 'Abu Dhabi',
    lat: 24.4244, lng: 54.5776,
    population: 150000,
    description: 'Suburban district popular for families, villas, and proximity to major highways and schools.',
    color: '#F97316',
    paths: [
      { lat: 24.4530, lng: 54.5420 }, { lat: 24.4545, lng: 54.6125 },
      { lat: 24.4305, lng: 54.6280 }, { lat: 24.3980, lng: 54.6195 },
      { lat: 24.3895, lng: 54.5675 }, { lat: 24.4050, lng: 54.5385 },
    ],
  },
  {
    id: 301,
    name: 'Al Majaz',
    emirate: 'Sharjah',
    lat: 25.33, lng: 55.385,
    population: 65000,
    description: 'Urban waterfront neighborhood near Khalid Lagoon with parks, cultural venues, and cafes.',
    color: '#A855F7',
    paths: [
      { lat: 25.3475, lng: 55.3660 }, { lat: 25.3480, lng: 55.3990 },
      { lat: 25.3335, lng: 55.4075 }, { lat: 25.3150, lng: 55.4020 },
      { lat: 25.3115, lng: 55.3780 }, { lat: 25.3230, lng: 55.3625 },
    ],
  },
];
```

### 3c. Location stats (stub — backend-ready)

The POC's `LocationsApiService.getLocationStats(id)` returns a hardcoded object with a 200 ms fake delay:

```ts
{ activityIndex: 74, growthIndex: 61, mobilityScore: 69 }
```

This is NOT currently displayed anywhere in the UI; it is a backend placeholder. DLD should wire it to a real API endpoint.

### 3d. Data source in DLD

In the POC, data lives in a constant in `LocationsApiService`. In DLD, replace with a real HTTP call to your locations API. The service interface remains:

```ts
getLocations(): Observable<MapLocation[]>
getLocationById(id: number): Observable<MapLocation | undefined>
getLocationStats(id: number): Observable<Record<string, number>>
```

---

## 4. Component API

All components are **standalone**, `ChangeDetectionStrategy.OnPush`, and communicate **only** through the shared `MapsStore` (Angular signals). There are no `@Input()` / `@Output()` bindings between the map components — they all inject `MapsStore` directly.

### Component tree

```
MapPageComponent            ← page shell, no inputs/outputs
  MapToolbarComponent       ← search + filter + theme toggle
  LocationListSidebarComponent  ← filtered list, click to select
  MapContainerComponent     ← map canvas, polygons, markers, info card, legend, stats bar
    LocationPopupComponent  ← info card rendered inside the map info window
```

### MapsStore (signals)

```ts
// Writable signals
loading: WritableSignal<boolean>
error: WritableSignal<string | null>
locations: WritableSignal<MapLocation[]>
searchQuery: WritableSignal<string>             // default ''
emirateFilter: WritableSignal<string>           // default 'All'
selectedLocationId: WritableSignal<number | null>
popupOpen: WritableSignal<boolean>

// Computed signals (read-only)
emirates: Signal<string[]>                      // ['All', ...sorted unique emirates]
filteredLocations: Signal<MapLocation[]>        // filtered by searchQuery AND emirateFilter
selectedLocation: Signal<MapLocation | null>    // looked up from locations by selectedLocationId

// Methods
setLocations(items: MapLocation[]): void
selectLocation(id: number | null): void         // also sets popupOpen
resetFilters(): void                            // resets searchQuery and emirateFilter to defaults
```

### How the parent page (`MapPageComponent`) uses the components

The page template (`map-page.component.html`) is purely a layout shell:

```html
<div class="page">
  <div class="top"><app-map-toolbar /></div>
  <div class="grid">
    <div class="side"><app-location-list-sidebar /></div>
    <div class="main">
      <div class="mapCard"><app-map-container /></div>
    </div>
  </div>
</div>
```

No data is passed as `@Input()`. All state flows through `MapsStore`.

---

## 5. Behavior Spec

### 5a. Page load / default view

1. `MapContainerComponent` constructor calls `GoogleMapsLoaderService.load()` (DLD: skip this; render the SVG directly).
2. While loading: show loading state overlay ("Loading map…" / "Preparing Google Maps and locations.").
3. After the map API is ready, call `LocationsApiService.getLocations()` (250 ms simulated delay).
4. On success: call `store.setLocations(items)`; `store.loading.set(false)`.
5. On API error: `store.error.set(message)`; show error overlay.
6. Default map center: `{ lat: 24.4539, lng: 54.3773 }` (Abu Dhabi, UAE centre).
7. Default zoom: **7**. Min: **6**. Max: **18**.
8. All `filteredLocations()` are rendered immediately (polygons + markers).

### 5b. Markers

- One marker per location in `filteredLocations()`.
- Position: `{ lat: l.lat, lng: l.lng }` (centroid).
- Shape: SVG pill badge with a downward-pointing triangle "pointer" at the bottom.
- Label: `formatPopulation(location.population ?? 0)`:
  - `≥ 1,000,000` → `"1.0M"` (1 decimal)
  - `≥ 1,000` → `"55K"` (0 decimals)
  - `< 1,000` → raw integer string
- Width: `max(90, labelLength × 12 + 30)` px. Height: 42 px. Total SVG height: 52 px (includes pointer triangle).
- Corner radius: `rx="21"` (fully-rounded pill).
- Pointer triangle: centred horizontally, base at y=42, tip at y=50, half-width=8.
- Anchor point: horizontally centred at the tip of the pointer (bottom centre of SVG).
- **Default state**: background `#0D235A`, text `#FFFFFF`, `zIndex: 1`.
- **Selected state**: background `#F4C430`, text `#FFFFFF`, `zIndex: 1000`.
- Font: Arial, 14px, bold (weight 700).

### 5c. Polygons

- One polygon per location in `filteredLocations()`.
- Vertices: `location.paths` (array of `{ lat, lng }`).
- **Default state**: `fillColor: location.color`, `fillOpacity: 0.12`, `strokeColor: location.color`, `strokeOpacity: 0.75`, `strokeWeight: 1.5`, `zIndex: 1`.
- **Selected state**: `fillOpacity: 0.35`, `strokeWeight: 3`, `zIndex: 1000`.
- `geodesic: false`, `clickable: true`.
- Fallback color (if `location.color` is undefined): fill `#42BFA0`, stroke `#26A88B`.

### 5d. Click interactions

| User action | Result |
|-------------|--------|
| Click polygon | `store.selectLocation(id)`. `tooltipAnchor` set to the click's `{ lat, lng }`. Map pans to `{ lat: loc.lat, lng: loc.lng }` (centroid). Zoom snapped to `max(currentZoom, 12)`. Info card opens at `tooltipAnchor`. Polygon and marker enter selected state. |
| Click marker | Same as polygon click, but `tooltipAnchor` is NOT updated (info card position stays at last `tooltipAnchor`, or falls back to map center). |
| Click map (background) | No-op — intentional. Map clicks do not deselect. |
| Click sidebar item | Same as marker click (`store.selectLocation(id)`). |
| Click "Close" in info card | `store.selectLocation(null)`. Info card closes. Polygon and marker return to default state. |
| Click "Reset" in toolbar | `store.resetFilters()` — clears search and emirate filter. Does NOT close info card or reset map view. |
| Click "Reset View" button | Calls `resetView()`: closes info card (`store.selectLocation(null)`), pans to default center, sets zoom to 7. **Note**: in the POC this method exists on `MapContainerComponent` but there is no button in the template that calls it — see Open Questions. |

### 5e. Info card (popup)

- Rendered inside Google Maps `MapInfoWindow` at position `tooltipAnchor` (polygon click lat/lng), falling back to `mapOptions().center` if `tooltipAnchor` is null.
- Opens/closes reactively via an `effect()` watching `store.popupOpen()`.
- **In DLD SVG approach**: position the info card as an absolutely-positioned `<div>` overlaid on the map. Convert `tooltipAnchor` lat/lng to pixel position using the same projection formula (§2b), then offset by the current pan/zoom transform.

**Info card contents:**
| Field | Source | Notes |
|-------|--------|-------|
| Title | `location.name` | e.g. "Dubai Marina" |
| Subtitle | `location.emirate` | e.g. "Dubai" |
| Image | `location.image` (optional) | `<img>` with `alt=name`; hidden if field absent |
| Description | `location.description` (optional) | Hidden if field absent |
| Chip: emirate | `location.emirate` | Always shown |
| Chip: coordinates | `${lat.toFixed(5)}, ${lng.toFixed(5)}` | Monospace font |
| Chip: population | `"Pop " + (population \| number)` | Angular `DecimalPipe`; hidden if `population` is null/undefined |
| Close button | `store.selectLocation(null)` | mat-button with `close` icon |
| "View analytics" button | No-op (stub) | mat-flat-button with `insights` icon |

Width: `min(340px, 88vw)`. Corner radius: 16px. Backdrop blur with semi-transparent surface.

### 5f. Search & filter

- **Search**: text input in toolbar → `store.searchQuery`. Filters `filteredLocations` to locations whose `name` contains the query (case-insensitive, trimmed).
- **Emirate filter**: `<select>` in toolbar → `store.emirateFilter`. Options: `['All', ...sorted unique emirates from loaded data]`. Value `'All'` means no filter.
- Both filters are ANDed.
- The sidebar and the map always show `store.filteredLocations()` — they update live as the user types/selects.
- "Reset" button calls `store.resetFilters()` (sets query to `''` and emirate to `'All'`).

### 5g. Loading and error states

- **Loading state** (`!ready` and no error): full-height overlay, centred text "Loading map…" / "Preparing Google Maps and locations."
- **Error state** (`store.error()` is non-null): full-height overlay, title "Map failed to load" in `#ef4444` red, error message, hint text. In DLD, adapt hint to reflect the DLD data source, not Google Maps.
- Once loaded, neither overlay is shown.

### 5h. Theme

- Two themes: `light` and `dark`. Toggled by button in toolbar.
- Active theme stored in `localStorage` under key `uae-map-poc:theme` (values: `'light'`, `'dark'`, `'system'`).
- On toggle: `document.body.classList` toggled between `.theme-dark` and `.theme-light`.
- Default on first load: `'system'` (follows `prefers-color-scheme`).
- `ThemeService` is `providedIn: 'root'`.
- The map style is **not** theme-aware — the custom Google Maps style is always the teal-green palette regardless of light/dark mode.

### 5i. Selected state (end-to-end)

```
User clicks polygon id=102
→ store.selectLocation(102)
→ store.selectedLocationId() === 102
→ store.popupOpen() === true
→ store.selectedLocation() === locations[1]
→ MapContainerComponent effect: map.panTo({ lat: 25.1972, lng: 55.2744 }); map.setZoom(max(zoom, 12))
→ MapContainerComponent effect: info.open()
→ markerOptionsFor(102): background = #F4C430
→ polygonOptionsFor(102): fillOpacity = 0.35, strokeWeight = 3
→ LocationPopupComponent vm() returns location 102's data
→ Sidebar: item 102 gets .active class
```

---

## 6. Style Spec

### 6a. Page layout

```
┌──────────────────────────────────────────────────────┐
│  Toolbar  (height: auto)                              │
├──────────────┬───────────────────────────────────────┤
│              │                                       │
│  Sidebar     │  Map card                             │
│  320px fixed │  (flex-1)                             │
│              │                                       │
└──────────────┴───────────────────────────────────────┘
```

- Page: `display: grid; grid-template-rows: auto 1fr; gap: 12px; padding: 14px; height: 100%`
- Content grid: `grid-template-columns: 320px 1fr; gap: 12px`
- Responsive breakpoint **980px**: grid collapses to `1fr` (sidebar stacks above map).
- Toolbar responsive breakpoint **900px**: collapses to single column, search/filter go full-width.

### 6b. Design tokens

| Token | Light value | Dark value | Usage |
|-------|-------------|------------|-------|
| `--app-surface-elevated` | `color-mix(in srgb, var(--mat-sys-surface) 88%, black)` | `color-mix(in srgb, var(--mat-sys-surface) 82%, black)` | Card/panel background |
| `--app-outline` | `color-mix(in srgb, var(--mat-sys-outline) 70%, transparent)` | same | Borders |
| `--mat-sys-*` | Angular Material 3 variables (azure primary palette, Roboto, density 0) | auto | Typography, surface, on-surface |

Material 3 theme setup:
```scss
@use '@angular/material' as mat;
html {
  @include mat.theme((
    color: (primary: mat.$azure-palette, tertiary: mat.$blue-palette),
    typography: Roboto,
    density: 0,
  ));
}
```

### 6c. Component surface styles

| Component | Background | Border | Border-radius | Backdrop-filter |
|-----------|-----------|--------|---------------|-----------------|
| `.toolbar` | `color-mix(surface-elevated 72%, transparent)` | `1px solid --app-outline` | `16px` | `blur(14px)` |
| `.sidebar` | `color-mix(surface-elevated 78%, transparent)` | `1px solid --app-outline` | `16px` | `blur(14px)` |
| `.mapCard` | `radial-gradient purple+cyan glows` + `surface-elevated 70%` | `1px solid --app-outline` | `18px` | `blur(10px)` |
| `.map` (google-map / SVG) | `--app-surface-elevated` | — | `16px` | — |
| `.state` (loading/error) | `color-mix(surface-elevated 78%, transparent)` | `1px solid --app-outline` | `16px` | `blur(14px)` |
| `.popup` (info card) | `color-mix(surface-elevated 86%, transparent)` | `1px solid --app-outline` | `16px` | `blur(14px)` |
| `.price-range` (legend) | `white` | — | `18px` | — |
| `.bottom-stats` | `white` | — | `24px` | — |

**mapCard background gradient** (exact CSS):
```scss
background: radial-gradient(
    1200px 600px at 15% 0%,
    color-mix(in srgb, #4f46e5 18%, transparent),
    transparent 60%
  ),
  radial-gradient(
    900px 520px at 90% 15%,
    color-mix(in srgb, #06b6d4 16%, transparent),
    transparent 55%
  ),
  color-mix(in srgb, var(--app-surface-elevated) 70%, transparent);
```

### 6d. Map overlay: Price Range legend

Position: `absolute; right: 10px; bottom: 120px` (above bottom stats bar). Width: `220px`. Padding: `16px`. `z-index: 1000`.

| Dot class | Color | Label |
|-----------|-------|-------|
| `.under` | `#0D235A` | Under AED 1M |
| `.mid` | `#0D8F4E` | AED 1M – 3M |
| `.high` | `#2B8CFF` | AED 3M – 6M |
| `.luxury` | `#F4C430` | Over AED 6M |

Dot: 14×14 px circle. Row: `display:flex; align-items:center; gap:10px; margin-bottom:10px`. Title: 16px / bold / `margin-bottom:12px`.

### 6e. Map overlay: Bottom Stats Bar

Position: `absolute; left:20px; right:20px; bottom:20px`. Height: `90px`. `display:flex`. `z-index: 1000`. `overflow:hidden`.

| Stat | Value (hardcoded) |
|------|-------------------|
| Total Transactions | **24,816** |
| Total Value | **AED 48.3B** |
| Avg Transaction | **AED 1.94M** |
| Active Areas | **187** |

Each `.stat`: `flex:1; text-align:center; border-right:1px solid #eee` (last child: no border).
`.stat strong`: `font-size:24px; color:#0b5e43`.
`.stat span`: `color:#666; font-size:13px`.

### 6f. Toolbar brand mark

A 10×10 px circle with gradient `linear-gradient(135deg, #06b6d4, #4f46e5)` and a halo `box-shadow: 0 0 0 6px color-mix(in srgb, #4f46e5 14%, transparent)`.

### 6g. Sidebar active item

```scss
a.active {
  background: color-mix(in srgb, #4f46e5 16%, transparent);
}
```

### 6h. Info card popup width

`width: min(340px, 88vw)`. Corner radius `16px`.

### 6i. Map shadow

`box-shadow: 0 18px 40px rgba(0, 0, 0, 0.22)`.

### 6j. RTL mirroring (DLD specific)

| Element | LTR | RTL |
|---------|-----|-----|
| Page grid | sidebar left, map right | sidebar right, map left — swap grid column order |
| Toolbar | brand left, controls right | brand right, controls left |
| Legend | `right:10px` | `left:10px; right:auto` |
| Bottom stats | `left:20px; right:20px` | unchanged (symmetric) |
| Toolbar `grid-template-columns` | `1fr minmax(420px,2fr) 1fr` | reverse column order in RTL |
| Info card | standard | standard (card width/position mirrored with logical props) |

Use CSS logical properties (`margin-inline-start`, `padding-inline-end`, etc.) and `[dir="rtl"]` selectors. The SVG coordinate projection is geometry-only and does not need RTL adjustment.

---

## 7. Google Maps Custom Style (full rule set)

> **DLD**: apply these color roles to the static background SVG/image.

| Feature | Element | Color |
|---------|---------|-------|
| All (base land) | geometry | `#DDEFE8` |
| landscape | geometry | `#DDEFE8` |
| water | geometry | `#83D8CF` |
| water | labels.text.fill | `#5CAEA5` |
| poi.park | geometry | `#C5E8D4` |
| poi.park | labels.text.fill | `#5C9C82` |
| road.highway | geometry | `#35C6A0` |
| road.highway | geometry.stroke | `#1DAF8B` |
| road.arterial | geometry | `#76D5B7` |
| road.arterial | geometry.stroke | `#4FC5A2` |
| road.local | geometry | `#F2F7F4` |
| road | labels.text.fill | `#53776D` |
| road | labels.text.stroke | `#DDEFE8` weight 3 |
| administrative.locality | labels.text.fill | `#3C786B` |
| administrative.neighborhood | labels.text.fill | `#638A80` |
| administrative | geometry.stroke | `#9CD8C4` weight 1 |
| poi | geometry | `#D3EAE0` |
| poi | labels.text.fill | `#668C81` |
| transit | geometry | `#CDE6DD` |
| transit | labels.text.fill | `#63877D` |
| (all) | labels.text.fill | `#52786D` |
| (all) | labels.text.stroke | `#DDEFE8` weight 3 |

---

## 8. Config / Constants

| Constant | Value | Used in |
|----------|-------|---------|
| Default center | `{ lat: 24.4539, lng: 54.3773 }` | Map initial view, reset view, info window fallback position |
| Default zoom | `7` | Map initial view, reset view |
| Min zoom | `6` | Map options |
| Max zoom | `18` | Map options |
| Zoom-on-select | `max(currentZoom, 12)` | Pan-to effect when selecting a location |
| Marker default bg | `#0D235A` | Pill badge normal state |
| Marker selected bg | `#F4C430` | Pill badge selected state |
| Marker text color | `#FFFFFF` | All states |
| Marker min width | `90px` | Pill badge |
| Marker width formula | `max(90, label.length × 12 + 30)` px | Dynamic |
| Marker pill height | `42px` | Pill body |
| Marker SVG height | `52px` | Including pointer triangle |
| Polygon default fill opacity | `0.12` | Unselected polygon |
| Polygon selected fill opacity | `0.35` | Selected polygon |
| Polygon default stroke weight | `1.5` | Unselected polygon |
| Polygon selected stroke weight | `3` | Selected polygon |
| Polygon stroke opacity | `0.75` | All states |
| Fallback polygon fill color | `#42BFA0` | When `location.color` is absent |
| Fallback polygon stroke color | `#26A88B` | When `location.color` is absent |
| Price legend: Under 1M | `#0D235A` | Legend dot |
| Price legend: 1M–3M | `#0D8F4E` | Legend dot |
| Price legend: 3M–6M | `#2B8CFF` | Legend dot |
| Price legend: Over 6M | `#F4C430` | Legend dot |
| Bottom stats | All hardcoded (§6e) | Stats bar |
| Theme storage key | `uae-map-poc:theme` | localStorage |
| API simulated delay | `250 ms` | Mock service |
| Stats simulated delay | `200 ms` | Mock service |

---

## 9. Assets Needed

| Asset | Format | Expected path | Notes |
|-------|--------|---------------|-------|
| UAE background map | SVG or PNG | `assets/images/uae-map-bg.svg` | DLD must produce or license. Should use the teal-green color palette from §7. Should cover bounding box lat 23.5–26.2, lng 51.5–57.0. |
| District image: Dubai Marina | JPEG | `assets/images/districts/dubai-marina.jpg` | Referenced in seed data. **Directory is empty in POC — this image does not exist yet.** |
| GeoJSON sample | GeoJSON | `assets/geojson/uae-districts.sample.geojson` | Present in POC but **not loaded at runtime** — it is unused reference data. DLD may choose to load it instead of the hardcoded `paths` arrays. |

### GeoJSON asset note

The file `assets/geojson/uae-districts.sample.geojson` contains simplified rectangular bounding boxes for the 5 districts — **these are coarser than the `paths` arrays in the data model** (which are hexagonal approximations). The polygon coordinates in the seed data (§3b) are the authoritative shapes used at runtime.

---

## 10. Accessibility

The POC has minimal explicit a11y. The following is what exists plus the full requirements for DLD:

| Element | Requirement |
|---------|-------------|
| Map container | `role="application"` or `role="img"` with `aria-label="UAE Location Map"` |
| Polygon / marker (SVG `<g>`) | `role="button"`, `tabindex="0"`, `aria-label="${location.name}, ${location.emirate}, population ${population}"` |
| Keyboard — polygon/marker | `Enter` and `Space` keys trigger selection (same as click) |
| Keyboard — map pan | Arrow keys pan the SVG viewport when map container is focused |
| Keyboard — zoom | `+` / `-` keys zoom |
| Info card | `role="dialog"`, `aria-labelledby` pointing to title, focus trapped on open, `Escape` closes |
| "Close" button in info card | `aria-label="Close info card"` |
| Sidebar list items | `role="option"` or native `<a>`; `aria-selected` reflects `.active` state |
| Search input | `aria-label="Search locations"` or associated `<label>` |
| Emirate filter | `aria-label="Filter by emirate"` |
| Reset button | `aria-label="Reset filters"` |
| Theme toggle | `aria-label="Switch to dark mode"` / `"Switch to light mode"` (dynamic) |
| Price legend | `role="list"` / `role="listitem"` with visible text labels |
| Bottom stats | `<dl>` / `<dt>` / `<dd>` structure |
| Loading state | `aria-live="polite"` announcement |
| Error state | `role="alert"` |

> The POC uses `keyboardShortcuts: false` in Google Maps options to suppress Google's built-in keyboard shortcuts. DLD must implement its own keyboard handling on the SVG.

---

## 11. Step-by-Step Build Order

1. **Models** — Create `MapLocation` interface (§3a) and `LatLngLiteral` type. Create `LocationStats` interface `{ activityIndex: number; growthIndex: number; mobilityScore: number }`.

2. **Data / Service** — Implement `LocationsApiService` with the seed data from §3b as a constant and `getLocations()` returning `of(LOCATIONS).pipe(delay(250))`. Add HTTP-ready stubs for `getLocationById` and `getLocationStats`.

3. **Store** — Implement `MapsStore` as a `providedIn: 'root'` signal store with the signals and computed properties from §4. No dependencies on maps library.

4. **Theme service** — Implement `ThemeService` (§5h) with `localStorage` persistence under key `dld:theme` (rename from `uae-map-poc:theme`).

5. **Coordinate projection utilities** — Create `map-projection.utils.ts` with `lngToX()` and `latToY()` from §2b, and a `toSvgPoint(lat, lng, scale, translate)` helper for use in templates.

6. **Base SVG map** — Implement `MapContainerComponent` with a host-filling `<svg viewBox="0 0 1000 600">` and `<image>` background (`uae-map-bg.svg`). Wire `loading` / `error` overlays (§5g). Add `scale` and `translate` signals for pan/zoom. Add `wheel` and pointer-drag event handlers.

7. **Polygon layer** — For each `filteredLocations()`, render a `<polygon>` using projected `paths`, wired to `polygonOptionsFor(id)` styles (§5c). Bind `(click)` to `onPolygonClick()` which sets `tooltipAnchor` and calls `store.selectLocation(id)`.

8. **Marker layer** — For each `filteredLocations()`, render an inline SVG pill group (`<g>`) using `markerOptionsFor(id)` (§5b). Position by projecting `{ lat, lng }` centroid. Bind `(click)` to `onMarkerClick(id)`.

9. **Info card** — Implement `LocationPopupComponent` as an absolutely-positioned `<div>` overlay. Position by projecting `tooltipAnchor` through the current pan/zoom transform. Contents per §5e. Focus trap + keyboard close (`Escape`).

10. **Legend overlays** — Add `.price-range` and `.bottom-stats` divs absolutely positioned over the SVG canvas per §6d and §6e. Hard-code the stats values. Wire price range dots.

11. **Custom zoom controls** — Add `+`/`−` button pair overlaid on the map (Google Maps renders these natively; in DLD they must be custom HTML buttons). Each click adjusts `scale` signal.

12. **Reset View control** — Add a "Reset View" button (resolves the Open Question — see §12). Calls `resetView()`: `store.selectLocation(null)`, reset `scale` and `translate` to default.

13. **Toolbar** — Implement `MapToolbarComponent` (§5f): brand dot, search input (bound to `store.searchQuery`), emirate select (bound to `store.emirateFilter`, options from `store.emirates()`), Reset button, theme toggle button.

14. **Sidebar** — Implement `LocationListSidebarComponent`: header with count badge, scrollable list of `filteredLocations()`, click → `store.selectLocation(id)`, `.active` on selected item.

15. **Page shell** — Implement `MapPageComponent` with the layout grid (§6a).

16. **Responsive** — Apply 980px breakpoint (sidebar above map), 900px toolbar breakpoint (§6a). Test both.

17. **RTL** — Apply logical CSS properties and `[dir="rtl"]` overrides per §6j.

18. **Accessibility** — Apply all aria attributes and keyboard handlers from §10. Test with keyboard-only navigation and a screen reader.

19. **i18n** — Extract all visible strings to i18n keys. Stats bar values, legend labels, and state messages are candidates.

---

## 12. Acceptance Checklist

- [ ] On load: map renders centred on `{ lat: 24.4539, lng: 54.3773 }` at zoom equivalent to seeing all UAE.
- [ ] All 5 districts show coloured polygons (opacity ~0.12) and population-pill markers (dark blue `#0D235A`).
- [ ] Marker labels: Dubai Marina=55K, Downtown Dubai=80K, Al Reem Island=120K, Khalifa City=150K, Al Majaz=65K.
- [ ] Typing "dubai" in search reduces visible markers and polygon to Dubai Marina + Downtown Dubai only; sidebar shows 2 items.
- [ ] Selecting "Abu Dhabi" in emirate filter reduces to Al Reem Island + Khalifa City; selecting "All" restores all 5.
- [ ] Clicking "Reset" while query="dubai" and filter="Abu Dhabi" restores all 5 items.
- [ ] Clicking a polygon or marker selects it: polygon fill-opacity becomes ~0.35, stroke becomes bolder, marker pill turns yellow (`#F4C430`), info card appears, map pans to centroid, sidebar item gets active highlight.
- [ ] Info card shows: district name, emirate, coordinates to 5 decimal places, description, population formatted with commas.
- [ ] Clicking "Close" in info card deselects all; map does NOT snap back to default view.
- [ ] Price range legend visible bottom-right with 4 rows and correct dot colors.
- [ ] Bottom stats bar shows 4 hardcoded values.
- [ ] Theme toggle cycles light↔dark; preference survives page reload.
- [ ] At 980px viewport width: sidebar stacks above map.
- [ ] At 900px viewport width: toolbar collapses to single column.
- [ ] In RTL layout: sidebar and legend swap sides; map interaction is unaffected.
- [ ] Loading overlay appears during data fetch; disappears on success.
- [ ] Error overlay appears with red "Map failed to load" title if data fetch throws.
- [ ] All markers, polygons, and info card controls are keyboard-operable (Tab + Enter/Space).
- [ ] Info card is announced by screen reader on open (`role="dialog"` or `aria-live`).
- [ ] No console errors or TypeScript strict-mode violations.

---

## 13. Open Questions / POC-Specific Items DLD Must Resolve

| # | Question | Where it arose |
|---|----------|----------------|
| OQ-1 | **Reset View button is missing from template.** `MapContainerComponent.resetView()` exists but no button in `map-container.component.html` calls it. Should DLD add a "Reset View" button to the map canvas? If so, position it top-left or top-right of the map? | `map-container.component.ts:353`, template has no call |
| OQ-2 | **District images are absent.** `assets/images/districts/dubai-marina.jpg` is referenced in the seed data but the `src/assets/images/districts/` directory is empty. DLD must source or create these images. Without them, the `<img>` in the info card is never rendered. | `locations-api.service.ts:18`, `location-popup.component.html:9` |
| OQ-3 | **GeoJSON file is unused at runtime.** `src/assets/geojson/uae-districts.sample.geojson` is present but no service or component loads it. DLD must decide whether to use it (replacing the hardcoded `paths` arrays) or continue with the hardcoded paths. The GeoJSON polygons are less detailed (rectangular bboxes) than the in-code hexagonal approximations. | `locations-api.service.ts` has no GeoJSON load |
| OQ-4 | **API key scope.** The Google Maps API key `AIzaSyCNCFk9cGE6A4evvUKF4ztWjbQUmVuf5Os` is committed to source in both `environment.ts` and `environment.prod.ts`. DLD must not reuse this key. It should be treated as a dev/POC key only. | `environment.ts`, `environment.prod.ts` |
| OQ-5 | **Bottom stats bar data is hardcoded.** The four stats (24,816 Total Transactions, AED 48.3B Total Value, AED 1.94M Avg Transaction, 187 Active Areas) are literal strings in the template. DLD must decide whether these should be driven by an API. | `map-container.component.html:63–81` |
| OQ-6 | **"View analytics" button is a stub.** The button in the info card has no click handler and navigates nowhere. DLD must wire it to the actual analytics view. | `location-popup.component.html:31` |
| OQ-7 | **`getLocationStats()` is unused in UI.** The service stub returns `{ activityIndex, growthIndex, mobilityScore }` but nothing consumes or renders these values. DLD should wire them into the info card or a detail view. | `locations-api.service.ts:125` |
| OQ-8 | **Map background for SVG approach.** No static UAE map image exists in the repo. DLD must commission or license one at the correct geographic extent and color palette. A placeholder SVG outline suffices for development. | §2b, §9 |
| OQ-9 | **`sienna-accessibility` CDN script.** `index.html` includes `<script src="https://cdn.jsdelivr.net/npm/sienna-accessibility/...">`. This is loaded via CDN in the POC. DLD must evaluate whether to include it, replace it with in-house a11y tooling, or drop it. | `src/index.html:16` |
| OQ-10 | **Marker click vs polygon click `tooltipAnchor` discrepancy.** Clicking a **marker** does not update `tooltipAnchor` — the info card opens at the last polygon-click position (or map center). This may be intentional (user should click polygon to get geo-accurate popup) or a bug. Clarify with the POC author before replicating in DLD. | `map-container.component.ts:349` vs `:385` |
