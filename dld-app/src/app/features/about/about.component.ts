import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AchievementsService } from '../../core/services/achievements.service';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { StatBarComponent } from '../../shared/components/stat-bar/stat-bar.component';
import { CornerstoneSectionComponent } from './sections/cornerstone-section/cornerstone-section.component';
import { ValuesSectionComponent } from './sections/values-section/values-section.component';
import { EmpoweringSectionComponent } from './sections/empowering-section/empowering-section.component';
import { StrategicMapSectionComponent } from './sections/strategic-map-section/strategic-map-section.component';
import { AchievementsSectionComponent } from './sections/achievements-section/achievements-section.component';
import { PartnersSectionComponent } from '../home/sections/partners-section/partners-section.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    RouterLink,
    PageHeroComponent,
    StatBarComponent,
    CornerstoneSectionComponent,
    ValuesSectionComponent,
    EmpoweringSectionComponent,
    StrategicMapSectionComponent,
    AchievementsSectionComponent,
    PartnersSectionComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main id="main-content">
      <app-page-hero
        heading="Who We Are"
        tagline="Dubai Land Department — registering and regulating Dubai's real estate since 1960."
        [breadcrumbs]="breadcrumbs"
      />

      <app-stat-bar [stats]="statsBar" />

      <app-cornerstone-section />

      <app-values-section />

      <app-empowering-section />

      <app-strategic-map-section />

      <app-achievements-section />

      <section class="leadership-cta-section">
        <div class="container lc-inner">
          <h2 class="lc-title">Meet Our Leadership</h2>
          <p class="lc-desc">
            Learn about the visionary leaders steering DLD's mission and strategy.
          </p>
          <a routerLink="/about/leadership" class="lc-btn">Leadership &amp; Organization</a>
        </div>
      </section>

      <app-partners-section />
    </main>
  `,
  styles: [`
    .leadership-cta-section {
      padding-block: 4rem;
      background: var(--color-bg-light);
      border-block-start: 1px solid var(--color-border);
    }
    .lc-inner { text-align: center; }
    .lc-title {
      font-size: var(--text-xl);
      font-weight: var(--weight-bold);
      color: var(--color-text-primary);
      margin: 0 0 .75rem;
    }
    .lc-desc {
      font-size: var(--text-base);
      color: var(--color-text-muted);
      margin: 0 0 1.75rem;
    }
    .lc-btn {
      display: inline-block;
      padding: .75rem 2rem;
      background: var(--color-primary);
      color: #fff;
      font-size: var(--text-base);
      font-weight: var(--weight-medium);
      border-radius: var(--radius-md);
      text-decoration: none;
      transition: background var(--transition-base);
      &:hover { background: var(--color-primary-dark); }
    }
  `],
})
export class AboutComponent {
  private readonly ach = inject(AchievementsService);

  readonly breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'About Us' },
  ];

  readonly statsBar = this.ach.getStatsBar();
}
