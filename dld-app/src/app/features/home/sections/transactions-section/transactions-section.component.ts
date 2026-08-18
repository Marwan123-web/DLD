import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';

interface DonutSegment {
  id: string;
  label: string;
  value: number;
  color: string;
}

const SEGMENTS: DonutSegment[] = [
  { id: 'mortgaged', label: 'Mortgaged', value: 435, color: '#00A776' },
  { id: 'cash',      label: 'Cash',      value: 280, color: '#2F80ED' },
  { id: 'gift',      label: 'Gift',       value: 85,  color: '#7A5AF8' },
];

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

const DONUT_RADIUS = 70;
const DONUT_CIRCUMFERENCE = 2 * Math.PI * DONUT_RADIUS;

@Component({
  selector: 'app-transactions-section',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './transactions-section.component.html',
  styleUrl: './transactions-section.component.scss',
})
export class TransactionsSectionComponent {
  readonly activeView = signal<'analytics' | 'map'>('analytics');
  readonly priceMarkers = PRICE_MARKERS;
  readonly circumference = DONUT_CIRCUMFERENCE;

  readonly donutSegments = computed(() => {
    const total = SEGMENTS.reduce((s, x) => s + x.value, 0);
    let offset = 0;
    return SEGMENTS.map(seg => {
      const dash = (seg.value / total) * DONUT_CIRCUMFERENCE;
      const co = offset;
      offset += dash;
      return { ...seg, dash, offset: co, gap: DONUT_CIRCUMFERENCE - dash };
    });
  });
}
