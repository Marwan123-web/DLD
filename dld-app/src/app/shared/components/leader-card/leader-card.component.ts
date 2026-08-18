import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { LeaderProfile } from '../../../core/models/leader-profile.model';
import { TranslationService } from '../../../core/services/translation.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-leader-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="leader-card">
      <div class="leader-photo-wrap">
        <img
          [src]="leader().photoUrl"
          [alt]="isAr() ? leader().nameAr : leader().name"
          class="leader-photo"
          loading="lazy"
          width="120"
          height="120"
        />
      </div>
      <div class="leader-body">
        <p class="leader-title">{{ isAr() ? leader().titleAr : leader().title }}</p>
        <h3 class="leader-name">{{ isAr() ? leader().nameAr : leader().name }}</h3>
        <blockquote class="leader-excerpt">
          "{{ isAr() ? leader().messageExcerptAr : leader().messageExcerpt }}"
        </blockquote>
      </div>
    </article>
  `,
  styleUrl: './leader-card.component.scss',
})
export class LeaderCardComponent {
  readonly leader = input.required<LeaderProfile>();
  readonly tr = inject(TranslationService);
  readonly isAr = () => this.tr.currentLang() === 'ar';
}
