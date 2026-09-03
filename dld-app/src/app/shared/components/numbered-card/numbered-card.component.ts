import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-numbered-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="num-card">
      <div class="nc-faint-num" aria-hidden="true">{{ number() }}</div>
      <div class="d-flex flex-row gap-2 align-items-start">
        <div class="nc-icon" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            width="26"
            height="26"
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
        <div class="nc-divider" aria-hidden="true"></div>
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
        // Figma: linear-gradient(138.76deg, #e0f6ef 1.4%, #fff 50.8%)
        background: linear-gradient(138.76deg, #e0f6ef 1.4%, #ffffff 50.8%);
        border: 1.2px solid rgba(0, 168, 117, 0.25);
        border-radius: var(--radius-lg);
        padding: var(--space-6);
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
        height: 100%;
        box-shadow: 0px 8px 22px 0px rgba(8, 50, 32, 0.05);
      }

      .nc-faint-num {
        position: absolute;
        bottom: 0.5rem;
        inset-inline-end: 0.5rem;
        // Figma: 64px, rgba(0,168,117,0.06)
        font-size: 4rem;
        font-weight: var(--weight-bold);
        color: rgba(0, 168, 117, 0.06);
        line-height: 1;
        pointer-events: none;
        user-select: none;
      }

      .nc-icon {
        // Figma: rounded square, 54px, bg rgba(0,168,117,0.12), border-radius 14px
        width: 54px;
        height: 54px;
        border-radius: 14px;
        background: rgba(0, 168, 117, 0.12);
        color: var(--color-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        margin-block-end: var(--space-2);
      }

      .nc-eyebrow {
        // Figma: 10px, green, bold
        font-size: 0.625rem;
        font-weight: var(--weight-bold);
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--color-primary);
        line-height: 1.5px;
      }

      .nc-title {
        // Figma: 19px, black bold
        font-size: 1.1875rem;
        font-weight: var(--weight-bold);
        color: #000;
        margin: 0;
        line-height: 1.25;
        margin-top: 0.88rem;
      }

      .nc-divider {
        height: 2px;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        margin-block: var(--space-3);
      }

      .nc-bullets {
        list-style: disc;
        margin: 0;
        padding-inline-start: var(--space-6);
        display: flex;
        flex-direction: column;
        gap: var(--space-2);

        li {
          // Figma: 16px, rgba(0,0,0,0.9)
          font-size: 1rem;
          color: rgba(0, 0, 0, 0.9);
          line-height: 1.125;
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
