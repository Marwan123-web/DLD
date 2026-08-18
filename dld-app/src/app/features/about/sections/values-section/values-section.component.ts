import { Component, ChangeDetectionStrategy } from '@angular/core';

const VALUES = ['Trust', 'Vision', 'Growth', 'Integrity'];

@Component({
  selector: 'app-values-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="values-section" aria-label="Our Values">
      <div class="values-bg-photo" aria-hidden="true"></div>
      <div class="values-overlay" aria-hidden="true"></div>
      <div class="watermark" aria-hidden="true">
        @for (v of values; track v) {
          <span class="wm-word">{{ v }}</span>
        }
      </div>
      <div class="container values-content">
        <span class="values-label">Our Foundation</span>
        <h2 class="values-title">The values that guide everything we do</h2>
        <div class="values-grid" role="list">
          @for (v of values; track v) {
            <div class="value-card" role="listitem">
              <span class="value-name">{{ v }}</span>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styleUrl: './values-section.component.scss',
})
export class ValuesSectionComponent {
  readonly values = VALUES;
}
