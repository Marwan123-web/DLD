import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { PageHeroComponent } from '../../../shared/components/page-hero/page-hero.component';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { WatermarkTextComponent } from '../../../shared/components/watermark-text/watermark-text.component';
import { FilterPillsComponent } from '../../../shared/components/filter-pills/filter-pills.component';
import { PartnerLogoGridComponent } from '../../../shared/components/partner-logo-grid/partner-logo-grid.component';
import { CtaBandComponent } from '../../../shared/components/cta-band/cta-band.component';
import { PartnersSectionComponent } from '../../home/sections/partners-section/partners-section.component';

const GOVERNMENTAL_PARTNERS = [
  { name: 'wasl properties' },
  { name: 'Dubai Municipality' },
  { name: 'Beit Al Khair Society' },
  { name: 'Central Bank of the U.A.E.' },
  { name: 'Civil Defense' },
  { name: 'Ministry of Climate Change & Environment' },
  { name: 'Supreme Council of Energy' },
  { name: 'DEWA' },
  { name: 'Dubai International Financial Centre' },
  { name: 'DMCC' },
  { name: 'Dubai South' },
  { name: 'Dubai Courts' },
  { name: 'Government of Dubai (DED)' },
  { name: 'Emirates Auction' },
  { name: 'Emirates Real Estate Corp' },
];

const REAL_ESTATE_PARTNERS = [
  { name: 'Emaar Properties' },
  { name: 'Nakheel' },
  { name: 'DAMAC Properties' },
  { name: 'Aldar Properties' },
  { name: 'Sobha Realty' },
  { name: 'Meraas' },
  { name: 'Dubai Holding' },
  { name: 'Azizi Developments' },
];

const INTERNATIONAL_PARTNERS = [
  { name: 'United Nations Human Settlements Programme' },
  { name: 'World Bank' },
  { name: 'International Monetary Fund' },
  { name: 'OECD' },
  { name: 'World Economic Forum' },
];

const REGIONAL_PARTNERS = [
  { name: 'Saudi Real Estate General Authority' },
  { name: 'Abu Dhabi Department of Municipalities' },
  { name: 'Jordan Land Authority' },
  { name: 'Egyptian Real Estate Registration Authority' },
];

const PILLS = [
  { key: 'governmental',  label: 'Governmental Partners' },
  { key: 'real-estate',   label: 'Real Estate Partners' },
  { key: 'international', label: 'International Partners or Organizations' },
  { key: 'regional',      label: 'Regional & International Relations' },
];

const PARTNER_MAP: Record<string, typeof GOVERNMENTAL_PARTNERS> = {
  'governmental':  GOVERNMENTAL_PARTNERS,
  'real-estate':   REAL_ESTATE_PARTNERS,
  'international': INTERNATIONAL_PARTNERS,
  'regional':      REGIONAL_PARTNERS,
};

@Component({
  selector: 'app-partnerships',
  standalone: true,
  imports: [
    PageHeroComponent,
    SectionHeaderComponent,
    WatermarkTextComponent,
    FilterPillsComponent,
    PartnerLogoGridComponent,
    CtaBandComponent,
    PartnersSectionComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './partnerships.component.html',
  styleUrl: './partnerships.component.scss',
})
export class PartnershipsComponent {
  readonly pills = PILLS;

  readonly breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Partnership & International Relations' },
  ];

  readonly activeFilter = signal<string>('governmental');

  onFilterChange(key: string): void {
    this.activeFilter.set(key);
  }

  readonly activeWatermark = computed(() => {
    const map: Record<string, string> = {
      'governmental':  'Partnerships',
      'real-estate':   'Partners',
      'international': 'International',
      'regional':      'Regional',
    };
    return map[this.activeFilter()] ?? 'Partnerships';
  });

  readonly activeSectionEyebrow = computed(() => 'Partnerships');

  readonly activeSectionTitle = computed(() => {
    const map: Record<string, string> = {
      'governmental':  'Governmental Partners',
      'real-estate':   'Real Estate Partners',
      'international': 'International Partners or Organizations',
      'regional':      'Regional & International Relations',
    };
    return map[this.activeFilter()] ?? 'Partners';
  });

  readonly activeSectionSubtitle = computed(() => {
    const map: Record<string, string> = {
      'governmental':
        'This category includes partners in the government and private sector in the United Arab Emirates. These are mostly strategic partners, as they are working with DLD with a plan to achieve a goal or to provide services.',
      'real-estate':
        "Our real estate industry partners who collaborate to develop and promote Dubai's real estate market.",
      'international':
        'International organizations and bodies that collaborate with DLD on global real estate standards and best practices.',
      'regional':
        'Regional entities and international bodies that maintain strategic relations with Dubai Land Department.',
    };
    return map[this.activeFilter()] ?? '';
  });

  readonly activePartners = computed(() => {
    return PARTNER_MAP[this.activeFilter()] ?? GOVERNMENTAL_PARTNERS;
  });
}
