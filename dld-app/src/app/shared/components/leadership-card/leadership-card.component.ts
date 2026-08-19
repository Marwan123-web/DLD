import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';

export interface LeadershipCardData {
  badge: string;
  role: string;
  name: string;
  excerpt: string;
  portraitSrc: string;
  portraitAlt: string;
  theme: 'green' | 'navy';
}

@Component({
  selector: 'app-leadership-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article
      class="lc-card"
      [class.lc-green]="data().theme === 'green'"
      [class.lc-navy]="data().theme === 'navy'"
    >
      <div class="lc-content">
        <span class="lc-badge">{{ data().badge }}</span>
        <h3 class="lc-role">{{ data().role }}</h3>
        <p class="lc-name">{{ data().name }}</p>
        <p class="lc-excerpt">{{ data().excerpt }}</p>
        <button class="lc-btn" type="button" (click)="readMore.emit()">Read more</button>
      </div>
      <div class="lc-portrait" aria-hidden="true">
        <img
          [src]="data().portraitSrc"
          [alt]="data().portraitAlt"
          class="lc-img"
          loading="lazy"
        />
      </div>
    </article>
  `,
  styles: [`
    :host { display: block; }

    .lc-card {
      display: flex;
      align-items: stretch;
      border-radius: var(--radius-xl);
      overflow: hidden;
      min-height: 220px;
      flex: 1 1 340px;
    }

    .lc-green { background: linear-gradient(135deg, #0C6B4A 0%, #00A776 100%); }
    .lc-navy  { background: var(--color-navy); }

    .lc-content {
      flex: 1;
      padding: var(--space-8);
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }

    .lc-badge {
      display: inline-block;
      font-size: 0.6875rem;
      font-weight: var(--weight-semibold);
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.7);
      margin-block-end: var(--space-2);
    }

    .lc-role {
      font-size: var(--text-lg);
      font-weight: var(--weight-bold);
      color: #fff;
      margin: 0;
      line-height: 1.3;
    }

    .lc-name {
      font-size: var(--text-base);
      color: rgba(255,255,255,0.85);
      margin: 0;
    }

    .lc-excerpt {
      font-size: var(--text-sm);
      color: rgba(255,255,255,0.75);
      line-height: 1.6;
      margin: 0;
      flex: 1;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .lc-btn {
      align-self: flex-start;
      margin-block-start: var(--space-4);
      padding: var(--space-2) var(--space-6);
      border: 1.5px solid rgba(255,255,255,0.6);
      border-radius: var(--radius-pill);
      background: transparent;
      color: #fff;
      font-size: var(--text-sm);
      font-weight: var(--weight-medium);
      cursor: pointer;
      transition: background var(--transition-base);

      &:hover { background: rgba(255,255,255,0.15); }
      &:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
    }

    .lc-portrait {
      flex: 0 0 auto;
      width: 200px;
      position: relative;
      overflow: hidden;
      align-self: stretch;
    }

    .lc-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
    }

    @media (max-width: 576px) {
      .lc-card { flex-direction: column; }
      .lc-portrait { width: 100%; height: 200px; }
    }
  `],
})
export class LeadershipCardComponent {
  readonly data = input.required<LeadershipCardData>();
  readonly readMore = output<void>();
}
