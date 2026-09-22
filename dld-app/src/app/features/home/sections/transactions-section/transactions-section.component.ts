import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { TranslationService } from '../../../../core/services/translation.service';
import { TransactionsService } from '../../../../core/services/transactions.service';

const PRICE_MARKERS = [
  { id: '1', label: 'AED 650K',  top: '30%', left: '12%', color: 'navy'   as const },
  { id: '2', label: 'AED 850K',  top: '45%', left: '25%', color: 'navy'   as const },
  { id: '3', label: 'AED 1.2M',  top: '25%', left: '40%', color: 'navy'   as const },
  { id: '4', label: 'AED 1.45M', top: '55%', left: '52%', color: 'navy'   as const },
  { id: '5', label: 'AED 1.9M',  top: '35%', left: '60%', color: 'yellow' as const },
  { id: '6', label: 'AED 1.45M', top: '65%', left: '65%', color: 'navy'   as const },
  { id: '7', label: 'AED 2.9M',  top: '20%', left: '72%', color: 'navy'   as const },
  { id: '8', label: 'AED 3.5M',  top: '50%', left: '78%', color: 'navy'   as const },
  { id: '9', label: 'AED 1.45M', top: '70%', left: '35%', color: 'navy'   as const },
];

// SVG circle geometry: viewBox 220x220, center 110,110, r=80, stroke-width=30
const CX = 110;
const CY = 110;
const R = 80;
const SW = 30;
const C = 2 * Math.PI * R; // ≈ 502.655
const GAP = 5; // visual gap in px between segments

@Component({
  selector: 'app-transactions-section',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './transactions-section.component.html',
  styleUrl: './transactions-section.component.scss',
})
export class TransactionsSectionComponent {
  readonly tr = inject(TranslationService);
  private readonly txService = inject(TransactionsService);

  readonly activeView = signal<'analytics' | 'map'>('analytics');
  readonly priceMarkers = PRICE_MARKERS;

  // undefined = loading, null = error, object = data
  readonly analyticsData = toSignal(
    this.txService.getAnalytics().pipe(catchError(() => of(null))),
  );

  readonly donutSegments = computed(() => {
    const data = this.analyticsData();
    if (!data) return [];
    let cumulative = 0;
    return data.segments.map(seg => {
      const raw = (seg.percent / 100) * C;
      const dash = Math.max(raw - GAP, 0);
      const gap = C - dash;
      const offset = cumulative;
      cumulative += raw;
      return { ...seg, dash, gap, offset };
    });
  });

  readonly tooltipSegment = computed(() => {
    const data = this.analyticsData();
    if (!data) return null;
    return data.segments.find(s => s.key === data.tooltipSegmentKey) ?? null;
  });

  readonly cx = CX;
  readonly cy = CY;
  readonly r = R;
  readonly sw = SW;
  readonly circumference = C;

  onViewAll(): void {
    // TODO: navigate to full transactions listing
  }
}
