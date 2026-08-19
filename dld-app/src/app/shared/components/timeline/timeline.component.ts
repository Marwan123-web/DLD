import { Component, ChangeDetectionStrategy, input } from '@angular/core';

export interface TimelineItem {
  year: string;
  title: string;
  caption: string;
}

@Component({
  selector: 'app-timeline',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="timeline-wrap">
      <div class="timeline-track" role="list">
        @for (item of items(); track item.year; let i = $index) {
          <div class="tl-item" role="listitem">
            <div class="tl-connector">
              <div class="tl-line tl-line-before" [class.invisible]="i === 0"></div>
              <div class="tl-dot"></div>
              <div class="tl-line tl-line-after" [class.invisible]="i === items().length - 1"></div>
            </div>
            <div class="tl-content">
              <span class="tl-year">{{ item.year }}</span>
              <h4 class="tl-title">{{ item.title }}</h4>
              <p class="tl-caption">{{ item.caption }}</p>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }

    .timeline-wrap {
      overflow-x: auto;
      padding-block: var(--space-4);
      -webkit-overflow-scrolling: touch;
      scrollbar-width: thin;
      scrollbar-color: var(--color-primary) transparent;
    }

    .timeline-track {
      display: flex;
      align-items: flex-start;
      min-width: max-content;
      padding-inline: var(--space-4);
    }

    .tl-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 160px;
      flex-shrink: 0;
    }

    .tl-connector {
      display: flex;
      align-items: center;
      width: 100%;
      height: 24px;
    }

    .tl-line {
      flex: 1;
      height: 2px;
      background: var(--color-primary);

      &.invisible { visibility: hidden; }
    }

    .tl-dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: var(--color-primary);
      flex-shrink: 0;
      border: 2px solid var(--color-primary-light);
      box-shadow: 0 0 0 2px var(--color-primary);
    }

    .tl-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: var(--space-3) var(--space-4) 0;
      gap: var(--space-1);
    }

    .tl-year {
      font-size: var(--text-base);
      font-weight: var(--weight-bold);
      color: var(--color-primary);
    }

    .tl-title {
      font-size: var(--text-sm);
      font-weight: var(--weight-semibold);
      color: var(--color-heading);
      margin: 0;
      line-height: 1.3;
    }

    .tl-caption {
      font-size: var(--text-sm);
      color: var(--color-muted);
      margin: 0;
      line-height: 1.5;
      max-width: 140px;
    }
  `],
})
export class TimelineComponent {
  readonly items = input.required<TimelineItem[]>();
}
