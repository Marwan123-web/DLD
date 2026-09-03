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
      <!-- Decorative translucent ellipses -->
      <div class="lc-deco lc-deco--lg" aria-hidden="true"></div>
      <div class="lc-deco lc-deco--sm" aria-hidden="true"></div>

      <!-- Text content -->
      <div class="lc-content">
        <span class="lc-badge">{{ data().badge }}</span>
        <div class="lc-title-block">
          <h3 class="lc-role">{{ data().role }}</h3>
          <p class="lc-name">{{ data().name }}</p>
        </div>
        <div class="lc-divider" aria-hidden="true"></div>
        <p class="lc-excerpt">{{ data().excerpt }}</p>
        <button class="lc-btn" type="button" (click)="readMore.emit()">{{ buttonLabel() }}</button>
      </div>

      <!-- Portrait -->
      <div class="lc-portrait">
        <img
          [src]="data().portraitSrc"
          [alt]="data().portraitAlt"
          class="lc-img"
          loading="lazy"
        />
      </div>
    </article>
  `,
  styles: [
    `
      :host {
        display: block;
        flex: 1 1 0;
        min-width: 0;
      }

      .lc-card {
        position: relative;
        display: flex;
        align-items: center;
        border-radius: 20px;
        overflow: hidden;
        height: 349px;
        padding: var(--space-6);
        gap: var(--space-6);
      }

      // Figma: Chairman — linear left-to-right #0a2e24 → #00a875
      .lc-green { background: linear-gradient(90deg, #0a2e24 0%, #00a875 100%); }
      // Figma: DG — 3-stop #0a142e → #0f1f42 48% → #1c3366
      .lc-navy  { background: linear-gradient(90deg, #0a142e 0%, #0f1f42 48%, #1c3366 100%); }

      // Figma: two decorative circles inside each card (top-right / mid-right)
      .lc-deco {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.06);
        pointer-events: none;
        user-select: none;
      }
      // Figma: 200×200 at x=511,y=-55 in 672px-wide card → right edge at 672-(511+200) = -39px
      .lc-deco--lg {
        width: 200px;
        height: 200px;
        inset-block-start: -55px;
        inset-inline-end: -39px;
      }
      // Figma: 140×140 at x=401,y=234 → inset-inline-end = 672-401-140 = 131px; block-start = 234px
      .lc-deco--sm {
        width: 140px;
        height: 140px;
        inset-block-start: 234px;
        inset-inline-end: 131px;
      }

      .lc-content {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
        position: relative;
        z-index: 1;
      }

      // Figma: white translucent pill — rgba(255,255,255,0.2), h=26, px=16, border-radius=13
      .lc-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        align-self: flex-start;
        height: 26px;
        padding: 0 16px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 13px;
        font-size: 0.625rem;
        font-weight: var(--weight-medium);
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: #fff;
        white-space: nowrap;
      }

      .lc-title-block {
        display: flex;
        flex-direction: column;
        gap: 5px;
      }

      // Figma: 26px bold white
      .lc-role {
        font-size: 1.625rem;
        font-weight: var(--weight-bold);
        color: #fff;
        margin: 0;
        line-height: 1.2;
      }

      // Figma: 13px, green-tinted for chairman / blue-tinted for DG
      .lc-name { font-size: 0.8125rem; margin: 0; }
      .lc-green .lc-name { color: #a6d1bf; }
      .lc-navy  .lc-name { color: #b9c2db; }

      // Figma: rgba(255,255,255,0.12) — more subtle than previous 0.25
      .lc-divider {
        height: 1px;
        background: rgba(255, 255, 255, 0.12);
      }

      .lc-excerpt {
        font-size: 0.8125rem;
        line-height: 1.6;
        margin: 0;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .lc-green .lc-excerpt { color: #b8d6cc; }
      .lc-navy  .lc-excerpt { color: #b9c2db; }

      // Figma: solid white fill, dark green text #0a3227 — NOT outlined/transparent
      .lc-btn {
        align-self: flex-start;
        margin-block-start: var(--space-1);
        padding: 12px 24px;
        border: none;
        border-radius: var(--radius-pill);
        background: #fff;
        color: #0a3227;
        font-size: 0.8125rem;
        font-weight: var(--weight-medium);
        cursor: pointer;
        transition: opacity 0.2s;
        white-space: nowrap;

        &:hover { opacity: 0.88; }
        &:focus-visible { outline: 2px solid rgba(255, 255, 255, 0.8); outline-offset: 2px; }
      }

      // Figma: 202×225px, border-radius 21px (not full-height stretch)
      .lc-portrait {
        flex-shrink: 0;
        width: 202px;
        height: 225px;
        border-radius: 21px;
        overflow: hidden;
        position: relative;
        z-index: 1;
      }

      .lc-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top center;
      }

      @media (max-width: 576px) {
        .lc-card {
          height: auto;
          flex-direction: column;
          align-items: flex-start;
          padding: var(--space-6);
        }
        .lc-portrait {
          width: 100%;
          height: 200px;
          border-radius: var(--radius-lg);
        }
      }
    `,
  ],
})
export class LeadershipCardComponent {
  readonly data = input.required<LeadershipCardData>();
  readonly buttonLabel = input<string>('Read more');
  readonly readMore = output<void>();
}
