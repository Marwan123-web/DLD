import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { TranslationService } from '../../../../core/services/translation.service';
import { ServicesDataService } from '../../../../core/services/services-data.service';
import { ServiceCardComponent } from '../../../../shared/components/service-card/service-card.component';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { ServiceCard } from '../../../../core/models/service-card.model';

interface ServiceTab {
  id: string;
  label: string;
  iconPath: string;
}

const TABS: ServiceTab[] = [
  {
    id: 'popular',
    label: 'Popular Services & Tools',
    iconPath: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm8 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 14a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm8 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
  },
  {
    id: 'owner',
    label: 'Owner',
    iconPath: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  },
  {
    id: 'tenant',
    label: 'Tenant',
    iconPath: 'M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z',
  },
  {
    id: 'broker',
    label: 'Broker',
    iconPath: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  },
  {
    id: 'developer',
    label: 'Developer',
    iconPath: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  },
  {
    id: 'management',
    label: 'Management Companies',
    iconPath: 'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z',
  },
  {
    id: 'partners',
    label: 'Partners',
    iconPath: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
  },
];

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [ServiceCardComponent, SectionHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="services-section" aria-labelledby="services-heading">

      <!-- Icon-card category tabs -->
      <div class="category-tabs" role="tablist" aria-label="Service categories">
        <div class="container category-tabs-inner">
          @for (tab of tabs; track tab.id) {
            <button
              role="tab"
              class="category-tab"
              [class.active]="activeTab() === tab.id"
              [attr.aria-selected]="activeTab() === tab.id"
              [attr.tabindex]="activeTab() === tab.id ? 0 : -1"
              (click)="onTabChange(tab.id)"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
                   stroke-linecap="round" stroke-linejoin="round"
                   width="28" height="28" aria-hidden="true">
                <path [attr.d]="tab.iconPath"/>
              </svg>
              <span class="tab-label">{{ tab.label }}</span>
            </button>
          }
        </div>
      </div>

      <div class="container">
        <app-section-header
          label="POPULAR SERVICES"
          [title]="tr.t('services.title')"
          [subtitle]="tr.t('services.subtitle')"
        />

        <div class="services-grid" role="list">
          @for (card of visibleCards(); track card.id) {
            <div role="listitem">
              <app-service-card [card]="card" />
            </div>
          }
          @empty {
            <p class="no-services">No services available for this category yet.</p>
          }
        </div>

        @if (hasMore()) {
          <div class="view-more-wrap">
            <button class="btn-view-more" (click)="viewMore()">
              {{ tr.t('services.view_more') }}
            </button>
          </div>
        }
      </div>
    </section>
  `,
  styleUrl: './services-section.component.scss',
})
export class ServicesSectionComponent {
  readonly tr = inject(TranslationService);
  private readonly svc = inject(ServicesDataService);

  readonly tabs = TABS;
  readonly activeTab = signal<ServiceCard['category']>('popular');
  readonly showAll = signal(false);

  readonly visibleCards = () => {
    const all = this.svc.getByCategory(this.activeTab());
    return this.showAll() ? all : all.slice(0, 6);
  };

  readonly hasMore = () => {
    const all = this.svc.getByCategory(this.activeTab());
    return !this.showAll() && all.length > 6;
  };

  onTabChange(id: string): void {
    this.activeTab.set(id as ServiceCard['category']);
    this.showAll.set(false);
  }

  viewMore(): void {
    this.showAll.set(true);
  }
}
