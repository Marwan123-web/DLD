import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Initiative } from '../../../core/models/initiative.model';

@Component({
  selector: 'app-initiative-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="initiative-card">
      <img [src]="initiative().imageUrl" [alt]="initiative().title" class="card-img" loading="lazy" />
      <div class="card-overlay">
        @if (initiative().deadline) {
          <span class="card-badge">Deadline: {{ initiative().deadline }}</span>
        }
        <h3 class="card-title">{{ initiative().title }}</h3>
        <p class="card-desc">{{ initiative().description }}</p>
        <div class="card-actions">
          <a [href]="initiative().ctaPrimary.url" class="btn-primary-sm">
            {{ initiative().ctaPrimary.label }}
          </a>
          @if (initiative().ctaSecondary) {
            <a [href]="initiative().ctaSecondary!.url" class="btn-ghost-sm">
              {{ initiative().ctaSecondary!.label }}
            </a>
          }
        </div>
      </div>
    </article>
  `,
  styleUrl: './initiative-card.component.scss',
})
export class InitiativeCardComponent {
  readonly initiative = input.required<Initiative>();
}
