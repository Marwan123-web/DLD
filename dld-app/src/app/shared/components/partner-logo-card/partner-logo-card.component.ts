import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-partner-logo-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="plc-card">
      @if (logoSrc()) {
        <img
          [src]="logoSrc()"
          [alt]="logoAlt() || name()"
          class="plc-logo"
          loading="lazy"
        />
      } @else {
        <span class="plc-name">{{ name() }}</span>
      }
    </div>
  `,
  styles: [`
    :host { display: block; }

    .plc-card {
      background: var(--color-white);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-card);
      padding: var(--space-4);
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 90px;
      transition: box-shadow var(--transition-base), transform var(--transition-base);

      &:hover {
        box-shadow: var(--shadow-dropdown);
        transform: translateY(-2px);
      }
    }

    .plc-logo {
      max-height: 60px;
      max-width: 100%;
      width: auto;
      object-fit: contain;
    }

    .plc-name {
      font-size: var(--text-sm);
      font-weight: var(--weight-medium);
      color: var(--color-body);
      text-align: center;
    }
  `],
})
export class PartnerLogoCardComponent {
  readonly name = input.required<string>();
  readonly logoSrc = input<string>('');
  readonly logoAlt = input<string>('');
}
