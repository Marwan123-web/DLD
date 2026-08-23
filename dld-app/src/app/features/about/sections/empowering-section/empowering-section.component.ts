import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-empowering-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="empower-section" aria-label="Our Mission">
      <div class="empower-photo" aria-hidden="true"></div>
      <div class="empower-overlay" aria-hidden="true"></div>
      <div class="main-container empower-content">
        <span class="empower-label">Our Mission</span>
        <h2 class="empower-title">
          Empowering people. <br />Transforming real estate.
        </h2>
        <p class="empower-subtitle">
          DLD drives the growth of Dubai's real estate sector by delivering world-class services,
          protecting the rights of all parties, and shaping a thriving, globally connected market.
        </p>
        <a href="#" class="empower-cta">Explore our strategic vision</a>
      </div>
    </section>
  `,
  styleUrl: './empowering-section.component.scss',
})
export class EmpoweringSectionComponent {}
