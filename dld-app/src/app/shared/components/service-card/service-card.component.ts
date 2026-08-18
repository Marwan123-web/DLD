import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { ServiceCard } from '../../../core/models/service-card.model';

@Component({
  selector: 'app-service-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a [href]="card().linkUrl" class="service-card" [attr.aria-label]="card().title">
      <div class="card-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" width="28" height="28">
          <path [attr.d]="card().iconName"/>
        </svg>
      </div>
      <div class="card-body">
        <h3 class="card-title">{{ card().title }}</h3>
        <p class="card-desc">{{ card().description }}</p>
      </div>
      <div class="card-arrow" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="16" height="16">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </div>
    </a>
  `,
  styleUrl: './service-card.component.scss',
})
export class ServiceCardComponent {
  readonly card = input.required<ServiceCard>();
}
