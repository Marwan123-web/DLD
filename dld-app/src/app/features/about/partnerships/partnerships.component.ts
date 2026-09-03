import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../../core/services/translation.service';
import { PartnersSectionComponent } from '../../home/sections/partners-section/partners-section.component';

interface PartnerItem {
  name: string;
  logoSrc?: string;
}

const GOVERNMENTAL_PARTNERS: PartnerItem[] = [
  { name: 'wasl properties', logoSrc: 'assets/images/partner-wasl.png' },
  { name: 'Dubai Municipality', logoSrc: 'assets/images/partner-dubai-municipality.png' },
  { name: 'Beit Al Khair Society', logoSrc: 'assets/images/partner-beit-al-khair.png' },
  { name: 'Central Bank of the U.A.E.', logoSrc: 'assets/images/partner-central-bank.png' },
  { name: 'Civil Defense', logoSrc: 'assets/images/partner-civil-defense.png' },
  { name: 'Ministry of Climate Change & Environment', logoSrc: 'assets/images/partner-moccae.png' },
  { name: 'Supreme Council of Energy', logoSrc: 'assets/images/partner-supreme-energy.png' },
  { name: 'DEWA', logoSrc: 'assets/images/partner-dewa.png' },
  { name: 'Dubai International Financial Centre', logoSrc: 'assets/images/partner-difc.png' },
  { name: 'DMCC', logoSrc: 'assets/images/partner-dmcc.png' },
  { name: 'Dubai South', logoSrc: 'assets/images/partner-dubai-south.png' },
  { name: 'Dubai Courts', logoSrc: 'assets/images/partner-dubai-courts.png' },
  { name: 'Government of Dubai (DED)', logoSrc: 'assets/images/partner-ded.png' },
  { name: 'Emirates Auction', logoSrc: 'assets/images/partner-emirates-auction.png' },
  { name: 'Emirates Real Estate Corp.', logoSrc: 'assets/images/partner-emirates-real-estate.png' },
  { name: 'Roads and Transport Authority' },
  { name: 'Dubai Health Authority' },
  { name: 'Dubai Police' },
  { name: 'Dubai Airport Free Zone Authority' },
  { name: 'Dubai Tourism (DTCM)' },
  { name: 'Dubai Chamber' },
  { name: 'Knowledge and Human Development Authority' },
  { name: 'Dubai Sports Council' },
  { name: 'Dubai Culture' },
  { name: 'Dubai Media Incorporated' },
  { name: 'Dubai Future Foundation' },
  { name: 'Smart Dubai' },
  { name: 'Dubai Digital Authority' },
  { name: 'Dubai Economy & Tourism' },
  { name: 'General Directorate of Residency' },
];

const REAL_ESTATE_PARTNERS: PartnerItem[] = [
  { name: 'Emaar Properties' },
  { name: 'Nakheel' },
  { name: 'DAMAC Properties' },
  { name: 'Aldar Properties' },
  { name: 'Sobha Realty' },
  { name: 'Meraas' },
  { name: 'Dubai Holding' },
  { name: 'Azizi Developments' },
];

const INTERNATIONAL_PARTNERS: PartnerItem[] = [
  { name: 'United Nations Human Settlements Programme' },
  { name: 'World Bank' },
  { name: 'International Monetary Fund' },
  { name: 'OECD' },
  { name: 'World Economic Forum' },
];

const REGIONAL_PARTNERS: PartnerItem[] = [
  { name: 'Saudi Real Estate General Authority' },
  { name: 'Abu Dhabi Department of Municipalities' },
  { name: 'Jordan Land Authority' },
  { name: 'Egyptian Real Estate Registration Authority' },
];

const PARTNER_MAP: Record<string, PartnerItem[]> = {
  governmental: GOVERNMENTAL_PARTNERS,
  'real-estate': REAL_ESTATE_PARTNERS,
  international: INTERNATIONAL_PARTNERS,
  regional: REGIONAL_PARTNERS,
};

@Component({
  selector: 'app-partnerships',
  standalone: true,
  imports: [RouterLink, PartnersSectionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './partnerships.component.html',
  styleUrl: './partnerships.component.scss',
})
export class PartnershipsComponent {
  readonly tr = inject(TranslationService);

  readonly activeFilter = signal<string>('governmental');

  readonly filters = computed(() => [
    { key: 'governmental', label: this.tr.t('partnerships.filter_governmental') },
    { key: 'real-estate', label: this.tr.t('partnerships.filter_real_estate') },
    { key: 'international', label: this.tr.t('partnerships.filter_international') },
    { key: 'regional', label: this.tr.t('partnerships.filter_regional') },
  ]);

  readonly activeSectionTitle = computed(() => {
    const map: Record<string, string> = {
      governmental: this.tr.t('partnerships.partners_govt_title'),
      'real-estate': this.tr.t('partnerships.partners_re_title'),
      international: this.tr.t('partnerships.partners_intl_title'),
      regional: this.tr.t('partnerships.partners_regional_title'),
    };
    return map[this.activeFilter()] ?? this.tr.t('partnerships.partners_govt_title');
  });

  readonly activeSectionSubtitle = computed(() => {
    const map: Record<string, string> = {
      governmental: this.tr.t('partnerships.partners_govt_subtitle'),
      'real-estate': this.tr.t('partnerships.partners_re_subtitle'),
      international: this.tr.t('partnerships.partners_intl_subtitle'),
      regional: this.tr.t('partnerships.partners_regional_subtitle'),
    };
    return map[this.activeFilter()] ?? '';
  });

  readonly activePartners = computed(() => PARTNER_MAP[this.activeFilter()] ?? GOVERNMENTAL_PARTNERS);

  setFilter(key: string): void {
    this.activeFilter.set(key);
  }
}
