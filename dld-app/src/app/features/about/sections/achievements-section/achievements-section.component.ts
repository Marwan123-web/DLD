import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AchievementsService } from '../../../../core/services/achievements.service';

@Component({
  selector: 'app-achievements-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="achievements-section" aria-labelledby="achievements-heading">
      <div class="main-container">
        <div class="section-intro">
          <span class="ach-label">By the Numbers</span>
          <h2 id="achievements-heading" class="ach-title">DLD Achievements</h2>
        </div>

        <div class="ach-grid" role="list">
          @for (stat of stats(); track stat.label) {
            <div class="ach-card" role="listitem">
              <span class="ach-value">{{ stat.value }}</span>
              <span class="ach-label-text">{{ stat.label }}</span>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styleUrl: './achievements-section.component.scss',
})
export class AchievementsSectionComponent {
  private readonly svc = inject(AchievementsService);
  readonly stats = toSignal(this.svc.getAchievements(), { initialValue: [] });
}
