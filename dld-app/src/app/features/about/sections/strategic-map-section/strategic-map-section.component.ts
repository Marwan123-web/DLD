import { Component, ChangeDetectionStrategy } from '@angular/core';

interface StratCard {
  id: string;
  iconPath: string;
  title: string;
  description: string;
}

const STRAT_CARDS: StratCard[] = [
  {
    id: 'financing',
    iconPath: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    title: 'Financing Real Estate Model',
    description: 'Developing accessible and innovative financing frameworks that unlock property ownership for a broader segment of Dubai residents.',
  },
  {
    id: 'innovation',
    iconPath: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    title: 'Real Estate Innovation Platform',
    description: 'A dedicated ecosystem for PropTech startups and innovation labs to co-create the next generation of real estate solutions.',
  },
  {
    id: 'research',
    iconPath: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    title: 'Agile Research & Development',
    description: 'Continuous market intelligence and data-driven research enabling rapid policy responses to global and local real estate dynamics.',
  },
];

@Component({
  selector: 'app-strategic-map-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="strategic-section" aria-labelledby="strategic-heading">
      <div class="main-container">
        <div class="section-intro">
          <span class="section-label">Strategic Map</span>
          <h2 id="strategic-heading" class="section-title">Our Strategic Pillars</h2>
          <p class="section-subtitle">
            Three interconnected pillars drive DLD's vision for a world-class real estate ecosystem.
          </p>
        </div>

        <div class="strat-grid" role="list">
          @for (card of cards; track card.id) {
            <article class="strat-card" role="listitem">
              <div class="strat-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"
                     width="28" height="28">
                  <path [attr.d]="card.iconPath"/>
                </svg>
              </div>
              <h3 class="strat-title">{{ card.title }}</h3>
              <p class="strat-desc">{{ card.description }}</p>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styleUrl: './strategic-map-section.component.scss',
})
export class StrategicMapSectionComponent {
  readonly cards = STRAT_CARDS;
}
