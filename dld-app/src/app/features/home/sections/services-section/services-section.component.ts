import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { TranslationService } from '../../../../core/services/translation.service';
import { ServicesDataService } from '../../../../core/services/services-data.service';
import { TabGroupComponent } from '../../../../shared/components/tab-group/tab-group.component';
import { ServiceCardComponent } from '../../../../shared/components/service-card/service-card.component';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { ServiceCard } from '../../../../core/models/service-card.model';
import { Tab } from '../../../../shared/components/tab-group/tab-group.component';

const TABS: Tab[] = [
  { id: 'popular', label: 'Popular Services & Tools' },
  { id: 'owner',   label: 'Owner' },
  { id: 'tenant',  label: 'Tenant' },
  { id: 'broker',  label: 'Broker' },
  { id: 'developer', label: 'Developer' },
  { id: 'management', label: 'Management Companies' },
  { id: 'partners',   label: 'Partners' },
];

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [TabGroupComponent, ServiceCardComponent, SectionHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="services-section" aria-labelledby="services-heading">
      <div class="container">
        <app-section-header
          label="Services"
          title="What would you like to do today?"
          subtitle="Access the most-used DLD services instantly. Switch tabs to find services by your role."
        />

        <app-tab-group
          [tabs]="tabs"
          initialId="popular"
          ariaLabel="Service categories"
          (tabChange)="onTabChange($event)"
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
            <button class="btn-view-more" (click)="viewMore()">View More</button>
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
