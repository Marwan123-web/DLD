import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="stat-card">
      @if (icon()) {
        <div class="sc-icon" aria-hidden="true">
          <svg
            [attr.viewBox]="iconViewBox()"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            width="28"
            height="28"
          >
            <path [attr.d]="icon()" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      }
      <span class="sc-value">{{ value() }}</span>
      <span class="sc-label">{{ label() }}</span>
    </article>
  `,
  styles: [`
    :host { display: block; }

    .stat-card {
      background: var(--color-white);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-card);
      padding: var(--space-8);
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      min-width: 160px;
      gap: var(--space-2);
    }

    .sc-icon {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: var(--color-primary-light);
      color: var(--color-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-block-end: var(--space-2);
      flex-shrink: 0;
    }

    .sc-value {
      font-size: var(--text-lg);
      font-weight: var(--weight-bold);
      color: var(--color-primary);
      line-height: 1.2;
    }

    .sc-label {
      font-size: var(--text-sm);
      color: var(--color-muted);
      font-weight: var(--weight-medium);
      line-height: 1.4;
    }
  `],
})
export class StatCardComponent {
  readonly value = input.required<string>();
  readonly label = input.required<string>();
  readonly icon = input<string>('');
  readonly iconViewBox = input<string>('0 0 24 24');
}
