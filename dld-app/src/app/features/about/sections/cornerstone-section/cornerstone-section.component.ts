import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-cornerstone-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="cornerstone-section" aria-label="About DLD">
      <div class="main-container cornerstone-layout">
        <div class="cornerstone-visual" aria-hidden="true">
          <div class="cs-emblem">
            <!-- Stylised DLD icon as geometric SVG placeholder -->
            <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="120" height="120">
              <circle cx="60" cy="60" r="58" stroke="var(--color-primary)" stroke-width="2" opacity=".3"/>
              <path d="M30 85 L60 35 L90 85 Z" fill="var(--color-primary)" opacity=".15"/>
              <path d="M40 85 L60 45 L80 85 Z" fill="var(--color-primary)" opacity=".3"/>
              <path d="M50 85 L60 55 L70 85 Z" fill="var(--color-primary)" opacity=".6"/>
              <circle cx="60" cy="35" r="5" fill="var(--color-primary)"/>
            </svg>
          </div>
        </div>

        <div class="cornerstone-content">
          <span class="cs-label">Who We Are</span>
          <h2 class="cs-title">The Cornerstone of Dubai's Real Estate Future</h2>
          <p class="cs-body">
            Established in 1960, the Dubai Land Department (DLD) is the government entity
            responsible for the registration, organisation, and promotion of real estate in Dubai.
            Through innovation, digital transformation, and a commitment to transparency, DLD
            sets the global standard for real estate governance.
          </p>
          <p class="cs-body">
            Our mandate spans from property registration and licensing to market oversight,
            investor protection, and strategic research — all in service of making Dubai the world's
            most attractive and trusted real estate destination.
          </p>
          <a href="#" class="cs-cta">Learn more about our mission</a>
        </div>
      </div>
    </section>
  `,
  styleUrl: './cornerstone-section.component.scss',
})
export class CornerstoneSectionComponent {}
