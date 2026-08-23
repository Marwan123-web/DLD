import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="'section-hdr align-' + align()">
      @if (eyebrow() || label()) {
        <span class="sh-eyebrow">{{ eyebrow() || label() }}</span>
      }
      <h2 class="sh-title">{{ title() }}</h2>
      @if (underline()) {
        <div class="sh-underline" aria-hidden="true"></div>
      }
      @if (subtitle()) {
        <p class="sh-subtitle">{{ subtitle() }}</p>
      }
    </div>
  `,
  styles: [`
    :host { display: block; margin-block-end: 2rem; }

    .section-hdr { display: flex; flex-direction: column; }

    .align-center {
      align-items: center;
      text-align: center;
    }

    .align-start {
      align-items: flex-start;
      text-align: start;
    }

    .sh-eyebrow {
      font-size: var(--text-sm);
      font-weight: var(--weight-semibold);
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--color-primary);
      margin-block-end: var(--space-3);
    }

    .sh-title {
      font-size: var(--text-xl);
      font-weight: var(--weight-bold);
      color: var(--color-heading);
      margin: 0;
      line-height: 1.25;
    }

    .sh-underline {
      width: 40px;
      height: 3px;
      background: var(--color-primary);
      border-radius: 2px;
      margin-block-start: var(--space-3);
    }

    .sh-subtitle {
      font-size: var(--text-base);
      color: var(--color-muted);
      max-width: 620px;
      line-height: 1.6;
      margin: var(--space-4) 0 0;
    }

    .align-center .sh-subtitle {
      margin-inline: auto;
    }
  `],
})
export class SectionHeaderComponent {
  /** New API */
  readonly eyebrow = input<string>('');
  readonly underline = input<boolean>(false);
  readonly align = input<'start' | 'center'>('start');
  /** Kept for backward compatibility */
  readonly label = input<string>('');

  readonly title = input.required<string>();
  readonly subtitle = input<string>('');
}
