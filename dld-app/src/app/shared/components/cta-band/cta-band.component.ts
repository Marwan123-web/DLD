import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';

@Component({
  selector: 'app-cta-band',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="cta-band">
      <div class="container-xxl cta-inner">
        <div class="cta-text">
          <h2 class="cta-title">{{ title() }}</h2>
          @if (subtitle()) {
            <p class="cta-sub">{{ subtitle() }}</p>
          }
        </div>
        <div class="cta-action">
          @if (buttonUrl()) {
            <a [href]="buttonUrl()" class="cta-btn">{{ buttonLabel() }}</a>
          } @else {
            <button type="button" class="cta-btn" (click)="buttonClick.emit()">
              {{ buttonLabel() }}
            </button>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }

    .cta-band {
      background: var(--gradient-app);
      padding-block: var(--space-12);
    }

    .cta-inner {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-8);
      flex-wrap: wrap;
    }

    .cta-text {
      flex: 1 1 300px;
    }

    .cta-title {
      font-size: var(--text-xl);
      font-weight: var(--weight-bold);
      color: #fff;
      margin: 0 0 var(--space-2);
      line-height: 1.25;
    }

    .cta-sub {
      font-size: var(--text-base);
      color: rgba(255, 255, 255, 0.85);
      margin: 0;
      line-height: 1.6;
    }

    .cta-action {
      flex-shrink: 0;
    }

    .cta-btn {
      display: inline-block;
      padding: var(--space-4) var(--space-8);
      background: var(--color-white);
      color: var(--color-primary-dark);
      font-size: var(--text-base);
      font-weight: var(--weight-bold);
      border-radius: var(--radius-pill);
      border: none;
      cursor: pointer;
      text-decoration: none;
      transition: transform var(--transition-base), box-shadow var(--transition-base);
      white-space: nowrap;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
      }

      &:focus-visible {
        outline: 3px solid rgba(255, 255, 255, 0.8);
        outline-offset: 2px;
      }
    }

    @media (max-width: 768px) {
      .cta-inner {
        flex-direction: column;
        text-align: center;
      }

      .cta-text { flex: 1 1 auto; }
    }
  `],
})
export class CtaBandComponent {
  readonly title = input.required<string>();
  readonly subtitle = input<string>('');
  readonly buttonLabel = input<string>('');
  readonly buttonUrl = input<string>('');
  readonly buttonClick = output<void>();
}
