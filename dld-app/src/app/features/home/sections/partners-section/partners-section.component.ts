import { Component, ChangeDetectionStrategy } from '@angular/core';

const PARTNERS = [
  { id: 'dubai-careers', name: 'Dubai Careers', logoUrl: 'assets/images/partner-dubai-careers.svg' },
  { id: 'dubai-pulse',   name: 'Dubai Pulse',   logoUrl: 'assets/images/partner-dubai-pulse.svg'   },
];

@Component({
  selector: 'app-partners-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="partners-section" aria-label="Partners">
      <div class="container">
        <p class="partners-label">Our Partners</p>
        <div class="partners-row">
          @for (p of partners; track p.id) {
            <div class="partner-logo">
              <img [src]="p.logoUrl" [alt]="p.name" height="48" loading="lazy" />
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styleUrl: './partners-section.component.scss',
})
export class PartnersSectionComponent {
  readonly partners = PARTNERS;
}
