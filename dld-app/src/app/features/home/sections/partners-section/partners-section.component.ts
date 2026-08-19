import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-partners-section',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="partners-section" aria-label="Our Partners">
      <div class="main-container">
        <div class="partners-inner">
          <img src="assets/images/footercarerrs.svg" alt="Our partners: Dubai Careers and Dubai Pulse" class="partners-img" />
        </div>
      </div>
    </section>
  `,
  styleUrl: './partners-section.component.scss',
})
export class PartnersSectionComponent {}
