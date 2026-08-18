import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { StatItem } from '../../../core/models/stat-item.model';

@Component({
  selector: 'app-stat-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="stat-bar" role="list">
      @for (stat of stats(); track stat.label) {
        <div class="stat-item" role="listitem">
          <span class="stat-value">{{ stat.value }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      }
    </div>
  `,
  styleUrl: './stat-bar.component.scss',
})
export class StatBarComponent {
  readonly stats = input.required<StatItem[]>();
}
