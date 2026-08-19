import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { PartnerLogoCardComponent } from '../partner-logo-card/partner-logo-card.component';

export interface PartnerItem {
  name: string;
  logoSrc?: string;
  logoAlt?: string;
}

@Component({
  selector: 'app-partner-logo-grid',
  standalone: true,
  imports: [PartnerLogoCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="plg-grid" role="list" aria-label="Partner logos">
      @for (p of partners(); track p.name) {
        <div class="plg-item" role="listitem">
          <app-partner-logo-card
            [name]="p.name"
            [logoSrc]="p.logoSrc || ''"
            [logoAlt]="p.logoAlt || p.name"
          />
        </div>
      }
    </div>
  `,
  styles: [`
    :host { display: block; }

    .plg-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: var(--space-4);
    }

    @media (max-width: 992px) {
      .plg-grid { grid-template-columns: repeat(3, 1fr); }
    }

    @media (max-width: 576px) {
      .plg-grid { grid-template-columns: repeat(2, 1fr); }
    }
  `],
})
export class PartnerLogoGridComponent {
  readonly partners = input.required<PartnerItem[]>();
}
