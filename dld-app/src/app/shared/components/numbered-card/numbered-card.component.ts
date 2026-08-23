import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-numbered-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="num-card">
      <div class="nc-faint-num" aria-hidden="true">{{ number() }}</div>
      <div class="d-flex flex-row gap-2">
        <div class="nc-icon" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            width="22"
            height="22"
          >
            <path
              [attr.d]="icon()"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div class="d-flex flex-column">
          @if (eyebrow()) {
          <span class="nc-eyebrow">{{ eyebrow() }}</span>
          }
          <h3 class="nc-title">{{ title() }}</h3>
        </div>
      </div>

      @if (bullets().length) {
      <ul class="nc-bullets">
        @for (b of bullets(); track b) {
        <li>{{ b }}</li>
        }
      </ul>
      }
    </article>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .num-card {
        background: var(--color-white);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        padding: var(--space-6);
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
        height: 100%;
      }

      .nc-faint-num {
        position: absolute;
        bottom: -0.5rem;
        inset-inline-end: -0.5rem;
        font-size: 5rem;
        font-weight: var(--weight-bold);
        color: rgba(0, 167, 118, 0.08);
        line-height: 1;
        pointer-events: none;
        user-select: none;
      }

      .nc-icon {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: var(--color-primary-light);
        color: var(--color-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        margin-block-end: var(--space-2);
      }

      .nc-eyebrow {
        font-size: var(--text-sm);
        font-weight: var(--weight-semibold);
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--color-primary);
      }

      .nc-title {
        font-size: var(--text-md);
        font-weight: var(--weight-bold);
        color: var(--color-heading);
        margin: 0;
        line-height: 1.3;
      }

      .nc-bullets {
        list-style: none;
        margin: var(--space-2) 0 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: var(--space-2);

        li {
          font-size: var(--text-sm);
          color: var(--color-body);
          line-height: 1.5;
          padding-inline-start: var(--space-4);
          position: relative;

          &::before {
            content: '';
            position: absolute;
            inset-inline-start: 0;
            top: 0.45em;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: var(--color-primary);
            flex-shrink: 0;
          }
        }
      }
    `,
  ],
})
export class NumberedCardComponent {
  readonly number = input<string>('');
  readonly eyebrow = input<string>('');
  readonly icon = input<string>('');
  readonly title = input.required<string>();
  readonly bullets = input<string[]>([]);
}
