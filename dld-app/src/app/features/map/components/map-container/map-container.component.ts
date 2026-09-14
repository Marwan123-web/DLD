import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  computed,
  effect,
  untracked,
  ElementRef,
  ViewChild,
  OnInit,
  OnDestroy,
  AfterViewInit,
  NgZone,
} from '@angular/core';
import { TranslationService } from '../../../../core/services/translation.service';
import { MapsStore } from '../../../../core/services/maps-store.service';
import { LocationsApiService } from '../../../../core/services/locations-api.service';
import { MapLocation, LatLngLiteral } from '../../../../core/models/map-location.model';
import {
  lngToX,
  latToY,
  pathsToPoints,
  formatPopulation,
  VIEWBOX_W,
  VIEWBOX_H,
  toSvgRaw,
  svgToLatLng,
  toScreenPx,
} from '../../utils/map-projection.utils';
import { LocationPopupComponent } from '../location-popup/location-popup.component';

interface BottomStat {
  key: string;
  value: string;
}

interface LegendItem {
  key: string;
  colorVar: string;
}

const POLY_FALLBACK_FILL = '#42BFA0';
const POLY_FALLBACK_STROKE = '#26A88B';
const MARKER_DEFAULT_BG = '#0D235A';
const MARKER_SELECTED_BG = '#F4C430';
const MIN_SCALE = 0.5;
const MAX_SCALE = 6;
const ZOOM_FACTOR = 1.3;
const SELECT_SCALE = 4; // Equivalent to zoom ~12 in our scale system
const DEFAULT_CENTER: LatLngLiteral = { lat: 24.4539, lng: 54.3773 };

// OQ-5: Bottom stats hardcoded but typed for future API replacement
const BOTTOM_STATS: BottomStat[] = [
  { key: 'transactions', value: '24,816' },
  { key: 'value', value: 'AED 48.3B' },
  { key: 'avg', value: 'AED 1.94M' },
  { key: 'active_areas', value: '187' },
];

const LEGEND_ITEMS: LegendItem[] = [
  { key: 'under', colorVar: 'var(--color-map-legend-under)' },
  { key: 'mid',   colorVar: 'var(--color-map-legend-mid)' },
  { key: 'high',  colorVar: 'var(--color-map-legend-high)' },
  { key: 'luxury', colorVar: 'var(--color-map-legend-luxury)' },
];

@Component({
  selector: 'app-map-container',
  standalone: true,
  imports: [LocationPopupComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './map-container.component.html',
  styleUrl: './map-container.component.scss',
})
export class MapContainerComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly tr = inject(TranslationService);
  readonly store = inject(MapsStore);
  private readonly api = inject(LocationsApiService);
  private readonly zone = inject(NgZone);

  @ViewChild('mapWrapper') private wrapperRef!: ElementRef<HTMLDivElement>;
  @ViewChild('mapSvg') private svgRef!: ElementRef<SVGSVGElement>;

  // Exposed constants for template
  readonly MIN_SCALE = MIN_SCALE;
  readonly MAX_SCALE = MAX_SCALE;
  readonly legendItems = LEGEND_ITEMS;
  readonly bottomStats = BOTTOM_STATS;

  // Pan/zoom state
  private readonly _scale = signal<number>(1);
  private readonly _translate = signal<{ x: number; y: number }>({ x: 0, y: 0 });
  readonly scale = this._scale.asReadonly();
  readonly isDragging = signal<boolean>(false);

  // Info card anchor: set on polygon click; NOT updated on marker click (OQ-10, intentional per spec §5d)
  private readonly tooltipAnchor = signal<LatLngLiteral | null>(null);

  // Container pixel dimensions tracked via ResizeObserver
  private readonly _containerW = signal<number>(1000);
  private readonly _containerH = signal<number>(600);
  private resizeObserver?: ResizeObserver;

  // Drag tracking
  private dragActive = false;
  private dragStart = { px: 0, py: 0, tx: 0, ty: 0 };
  // rAF animation
  private animRafId?: number;

  // Computed SVG transform string (SVG attribute — no CSS px ambiguity)
  readonly svgTransform = computed(() => {
    const { x, y } = this._translate();
    const s = this._scale();
    return `translate(${x} ${y}) scale(${s})`;
  });

  // Popup pixel position for the absolutely-positioned overlay
  readonly popupPixelPos = computed(() => {
    const loc = this.store.selectedLocation();
    if (!loc) return null;
    const anchor = this.tooltipAnchor() ?? { lat: loc.lat, lng: loc.lng };
    const svgX = lngToX(anchor.lng);
    const svgY = latToY(anchor.lat);
    return toScreenPx(
      svgX, svgY,
      this._scale(), this._translate().x, this._translate().y,
      this._containerW(), this._containerH(),
    );
  });

  constructor() {
    // Pan to selected location when selection changes.
    // untracked() prevents _scale/_translate reads from being tracked as effect
    // dependencies — without it, every animation frame would re-trigger the effect.
    effect(() => {
      const id = this.store.selectedLocationId();
      if (id === null) return;
      const loc = this.store.selectedLocation();
      if (!loc) return;
      untracked(() => {
        const cx = lngToX(loc.lng);
        const cy = latToY(loc.lat);
        const newScale = Math.max(this._scale(), SELECT_SCALE);
        const targetTx = VIEWBOX_W / 2 - cx * newScale;
        const targetTy = VIEWBOX_H / 2 - cy * newScale;
        this.animatePan(newScale, targetTx, targetTy);
      });
    });
  }

  ngOnInit(): void {
    this.api.getLocations().subscribe({
      next: items => this.store.setLocations(items),
      error: () => {
        this.store.error.set(this.tr.t('map.error_body'));
        this.store.loading.set(false);
      },
    });
  }

  ngAfterViewInit(): void {
    const el = this.wrapperRef.nativeElement;
    this._containerW.set(el.clientWidth || 1000);
    this._containerH.set(el.clientHeight || 600);

    this.resizeObserver = new ResizeObserver(entries => {
      const rect = entries[0].contentRect;
      // ResizeObserver fires outside NgZone; signal updates schedule CD automatically
      this._containerW.set(rect.width);
      this._containerH.set(rect.height);
    });
    this.resizeObserver.observe(el);
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    if (this.animRafId) cancelAnimationFrame(this.animRafId);
  }

  // ── Pan / Zoom ──────────────────────────────────────────────────────────────

  onWheel(event: WheelEvent): void {
    event.preventDefault();
    const rect = this.wrapperRef.nativeElement.getBoundingClientRect();
    const pxX = event.clientX - rect.left;
    const pxY = event.clientY - rect.top;
    const mx = pxX * VIEWBOX_W / this._containerW();
    const my = pxY * VIEWBOX_H / this._containerH();
    const factor = event.deltaY > 0 ? 1 / ZOOM_FACTOR : ZOOM_FACTOR;
    const curScale = this._scale();
    const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, curScale * factor));
    const { x: tx, y: ty } = this._translate();
    // Zoom toward cursor: keep the point under the cursor fixed
    const newTx = mx - (mx - tx) * (newScale / curScale);
    const newTy = my - (my - ty) * (newScale / curScale);
    this._scale.set(newScale);
    this._translate.set({ x: newTx, y: newTy });
  }

  onPointerDown(event: PointerEvent): void {
    if (event.button !== 0) return;
    this.svgRef.nativeElement.setPointerCapture(event.pointerId);
    this.dragActive = true;
    this.isDragging.set(true);
    const rect = this.wrapperRef.nativeElement.getBoundingClientRect();
    this.dragStart = {
      px: event.clientX - rect.left,
      py: event.clientY - rect.top,
      tx: this._translate().x,
      ty: this._translate().y,
    };
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.dragActive) return;
    const rect = this.wrapperRef.nativeElement.getBoundingClientRect();
    const curPx = event.clientX - rect.left;
    const curPy = event.clientY - rect.top;
    const dx = (curPx - this.dragStart.px) * VIEWBOX_W / this._containerW();
    const dy = (curPy - this.dragStart.py) * VIEWBOX_H / this._containerH();
    this._translate.set({ x: this.dragStart.tx + dx, y: this.dragStart.ty + dy });
  }

  onPointerUp(): void {
    this.dragActive = false;
    this.isDragging.set(false);
  }

  zoomIn(): void {
    const s = this._scale();
    const ns = Math.min(s * ZOOM_FACTOR, MAX_SCALE);
    const { x: tx, y: ty } = this._translate();
    const cx = VIEWBOX_W / 2;
    const cy = VIEWBOX_H / 2;
    // Zoom toward center of viewport
    this._scale.set(ns);
    this._translate.set({
      x: cx - (cx - tx) * (ns / s),
      y: cy - (cy - ty) * (ns / s),
    });
  }

  zoomOut(): void {
    const s = this._scale();
    const ns = Math.max(s / ZOOM_FACTOR, MIN_SCALE);
    const { x: tx, y: ty } = this._translate();
    const cx = VIEWBOX_W / 2;
    const cy = VIEWBOX_H / 2;
    this._scale.set(ns);
    this._translate.set({
      x: cx - (cx - tx) * (ns / s),
      y: cy - (cy - ty) * (ns / s),
    });
  }

  resetView(): void {
    this.store.selectLocation(null);
    this.tooltipAnchor.set(null);
    this.animatePan(1, 0, 0);
  }

  // Arrow key + +/- keyboard pan/zoom on the map wrapper
  onMapKeydown(event: KeyboardEvent): void {
    const PAN_STEP = 40;
    const { x: tx, y: ty } = this._translate();
    switch (event.key) {
      case 'ArrowLeft':  this._translate.set({ x: tx + PAN_STEP, y: ty }); break;
      case 'ArrowRight': this._translate.set({ x: tx - PAN_STEP, y: ty }); break;
      case 'ArrowUp':    this._translate.set({ x: tx, y: ty + PAN_STEP }); break;
      case 'ArrowDown':  this._translate.set({ x: tx, y: ty - PAN_STEP }); break;
      case '+': case '=': this.zoomIn(); break;
      case '-': case '_': this.zoomOut(); break;
      default: return;
    }
    event.preventDefault();
  }

  // ── Click handlers ──────────────────────────────────────────────────────────

  onPolygonClick(loc: MapLocation, event: MouseEvent): void {
    event.stopPropagation();
    // Polygon click: update tooltipAnchor to click position (per OQ-10 / spec §5d)
    const rect = this.wrapperRef.nativeElement.getBoundingClientRect();
    const pxX = event.clientX - rect.left;
    const pxY = event.clientY - rect.top;
    const { svgX, svgY } = toSvgRaw(
      pxX, pxY,
      this._scale(), this._translate().x, this._translate().y,
      this._containerW(), this._containerH(),
    );
    const latLng = svgToLatLng(svgX, svgY);
    this.tooltipAnchor.set(latLng);
    this.store.selectLocation(loc.id);
  }

  // Marker click does NOT update tooltipAnchor — intentional per OQ-10 / MAP-SPEC.md §5d
  // Info card falls back to last polygon-click position or centroid
  onMarkerClick(locId: number, event: MouseEvent): void {
    event.stopPropagation();
    this.store.selectLocation(locId);
  }

  onPolygonKeydown(event: KeyboardEvent, loc: MapLocation): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.tooltipAnchor.set({ lat: loc.lat, lng: loc.lng });
      this.store.selectLocation(loc.id);
    }
  }

  onMarkerKeydown(event: KeyboardEvent, locId: number): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.store.selectLocation(locId);
    }
  }

  // ── Style helpers ───────────────────────────────────────────────────────────

  pathPoints(loc: MapLocation): string {
    return pathsToPoints(loc.paths);
  }

  polyColor(loc: MapLocation): string {
    return loc.color ?? POLY_FALLBACK_FILL;
  }

  polyStrokeColor(loc: MapLocation): string {
    return loc.color ?? POLY_FALLBACK_STROKE;
  }

  polyFillOpacity(loc: MapLocation): number {
    return this.store.selectedLocationId() === loc.id ? 0.35 : 0.12;
  }

  polyStrokeWidth(loc: MapLocation): number {
    return this.store.selectedLocationId() === loc.id ? 3 : 1.5;
  }

  polyAriaLabel(loc: MapLocation): string {
    return `${loc.name}, ${loc.emirate}`;
  }

  markerBg(locId: number): string {
    return this.store.selectedLocationId() === locId ? MARKER_SELECTED_BG : MARKER_DEFAULT_BG;
  }

  formatPop(pop?: number): string {
    return formatPopulation(pop ?? 0);
  }

  markerWidth(loc: MapLocation): number {
    const label = this.formatPop(loc.population);
    return Math.max(90, label.length * 12 + 30);
  }

  /** Transform placing marker at map position, counter-scaled for constant visual size. */
  markerGroupTransform(loc: MapLocation): string {
    const cx = lngToX(loc.lng);
    const cy = latToY(loc.lat);
    const inv = 1 / this._scale();
    return `translate(${cx} ${cy}) scale(${inv})`;
  }

  /** Triangle pointer polygon points in local (anchor=origin) coords. Half-width=8 per spec §5b. */
  markerTriangle(_loc: MapLocation): string {
    return `-8,-10 8,-10 0,0`;
  }

  markerAriaLabel(loc: MapLocation): string {
    const pop = loc.population ? `, ${this.tr.t('map.popup_pop_prefix')} ${loc.population.toLocaleString('en-US')}` : '';
    return `${loc.name}, ${loc.emirate}${pop}`;
  }

  // ── Animation ───────────────────────────────────────────────────────────────

  private animatePan(targetScale: number, targetTx: number, targetTy: number): void {
    if (this.animRafId) cancelAnimationFrame(this.animRafId);
    const startScale = this._scale();
    const startTx = this._translate().x;
    const startTy = this._translate().y;
    const startTime = performance.now();
    const DURATION = 380;

    const step = (now: number) => {
      const t = Math.min((now - startTime) / DURATION, 1);
      const ease = 1 - Math.pow(1 - t, 3); // ease-out cubic
      this._scale.set(startScale + (targetScale - startScale) * ease);
      this._translate.set({
        x: startTx + (targetTx - startTx) * ease,
        y: startTy + (targetTy - startTy) * ease,
      });
      if (t < 1) this.animRafId = requestAnimationFrame(step);
    };

    this.zone.runOutsideAngular(() => {
      this.animRafId = requestAnimationFrame(step);
    });
  }
}
