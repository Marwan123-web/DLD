import { Component, ChangeDetectionStrategy, inject, output } from '@angular/core';
import { TranslationService } from '../../../../core/services/translation.service';
import { SearchBarComponent } from '../../../../shared/components/search-bar/search-bar.component';

const QUICK_LINKS = [
  { label: 'Rental Index',      url: '#' },
  { label: 'Property Search',   url: '#' },
  { label: 'Ejari',            url: '#' },
  { label: 'Map View',          url: '#' },
  { label: 'Valuation',         url: '#' },
];

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [SearchBarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="hero" aria-label="Hero">
      <div class="hero-bg" aria-hidden="true"></div>
      <div class="hero-overlay" aria-hidden="true"></div>

      <div class="hero-content container">
        <h1 class="hero-title">{{ tr.t('hero.title') }}</h1>
        <p class="hero-subtitle">{{ tr.t('hero.subtitle') }}</p>

        <app-search-bar
          [placeholder]="tr.t('hero.search_placeholder')"
          [submitLabel]="tr.t('nav.search')"
          (searched)="onSearch($event)"
        />

        <div class="quick-links" role="list">
          @for (link of quickLinks; track link.label) {
            <a [href]="link.url" class="quick-chip" role="listitem">{{ link.label }}</a>
          }
        </div>
      </div>
    </section>
  `,
  styleUrl: './hero-section.component.scss',
})
export class HeroSectionComponent {
  readonly tr = inject(TranslationService);
  readonly searched = output<string>();
  readonly quickLinks = QUICK_LINKS;

  onSearch(query: string): void {
    this.searched.emit(query);
  }
}
