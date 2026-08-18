import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { LeadersService } from '../../../core/services/leaders.service';
import { PageHeroComponent } from '../../../shared/components/page-hero/page-hero.component';
import { LeaderCardComponent } from '../../../shared/components/leader-card/leader-card.component';
import { OrgChartComponent } from './org-chart/org-chart.component';

@Component({
  selector: 'app-leadership',
  standalone: true,
  imports: [PageHeroComponent, LeaderCardComponent, OrgChartComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main id="main-content">
      <app-page-hero
        heading="Leadership &amp; Organization"
        tagline="The people driving Dubai's real estate vision forward."
        [breadcrumbs]="breadcrumbs"
      />

      <section class="messages-section" aria-labelledby="messages-heading">
        <div class="container">
          <div class="section-intro">
            <span class="section-label">Leadership</span>
            <h2 id="messages-heading" class="section-title">Messages from Leadership</h2>
          </div>

          <div class="leaders-list">
            @for (leader of leaders; track leader.id) {
              <app-leader-card [leader]="leader" />
            }
          </div>
        </div>
      </section>

      <app-org-chart />
    </main>
  `,
  styles: [`
    #main-content{
      padding-top: 120px;
    }
    .messages-section {
      padding-block: 4rem;
      background: var(--color-bg-light);
    }
    .section-intro { margin-block-end: 2.5rem; }
    .section-label {
      display: inline-block;
      background: var(--color-primary-light);
      color: var(--color-primary-dark);
      font-size: var(--text-sm);
      font-weight: var(--weight-medium);
      letter-spacing: .08em;
      text-transform: uppercase;
      padding: .25rem 1rem;
      border-radius: var(--radius-pill);
      margin-block-end: .75rem;
    }
    .section-title {
      font-size: var(--text-xl);
      font-weight: var(--weight-bold);
      color: var(--color-text-primary);
      margin: 0;
    }
    .leaders-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
  `],
})
export class LeadershipComponent {
  private readonly svc = inject(LeadersService);
  readonly leaders = this.svc.getAll();

  readonly breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'About Us', url: '/about' },
    { label: 'Leadership & Organization' },
  ];
}
