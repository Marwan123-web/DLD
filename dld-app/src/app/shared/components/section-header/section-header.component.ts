import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (label()) {
      <span class="section-label">{{ label() }}</span>
    }
    <h2 class="section-title">{{ title() }}</h2>
    @if (subtitle()) {
      <p class="section-subtitle">{{ subtitle() }}</p>
    }
  `,
  styles: [`
    :host { display: block; margin-block-end: 2rem; }
    .section-label { display: inline-block; background: var(--color-primary-light); color: var(--color-primary-dark); font-size: var(--text-sm); font-weight: var(--weight-medium); letter-spacing: .08em; text-transform: uppercase; padding: .25rem 1rem; border-radius: var(--radius-pill); margin-block-end: .75rem; }
    .section-title { font-size: var(--text-xl); font-weight: var(--weight-bold); color: var(--color-text-primary); margin: 0 0 .75rem; }
    .section-subtitle { font-size: var(--text-base); color: var(--color-text-muted); max-width: 620px; line-height: 1.6; margin: 0; }
  `],
})
export class SectionHeaderComponent {
  readonly label    = input<string>('');
  readonly title    = input.required<string>();
  readonly subtitle = input<string>('');
}
