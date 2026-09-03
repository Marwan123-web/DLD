import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../core/services/translation.service';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { NumberedCardComponent } from '../../shared/components/numbered-card/numbered-card.component';
import { PartnersSectionComponent } from '../home/sections/partners-section/partners-section.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    RouterLink,
    SectionHeaderComponent,
    NumberedCardComponent,
    PartnersSectionComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  readonly tr = inject(TranslationService);

  readonly strategicCards = computed(() => {
    const t = (k: string) => this.tr.t(k);
    return [
      {
        number: '01',
        eyebrow: t('about.sm_01_eyebrow'),
        icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
        title: t('about.sm_01_title'),
        bullets: [t('about.sm_01_bullet1'), t('about.sm_01_bullet2')],
      },
      {
        number: '02',
        eyebrow: t('about.sm_02_eyebrow'),
        icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
        title: t('about.sm_02_title'),
        bullets: [t('about.sm_02_bullet1'), t('about.sm_02_bullet2')],
      },
      {
        number: '03',
        eyebrow: t('about.sm_03_eyebrow'),
        icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
        title: t('about.sm_03_title'),
        bullets: [t('about.sm_03_bullet1'), t('about.sm_03_bullet2')],
      },
      {
        number: '04',
        eyebrow: t('about.sm_04_eyebrow'),
        icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
        title: t('about.sm_04_title'),
        bullets: [t('about.sm_04_bullet1'), t('about.sm_04_bullet2'), t('about.sm_04_bullet3')],
      },
      {
        number: '05',
        eyebrow: t('about.sm_05_eyebrow'),
        icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
        title: t('about.sm_05_title'),
        bullets: [t('about.sm_05_bullet1'), t('about.sm_05_bullet2'), t('about.sm_05_bullet3')],
      },
    ];
  });

  readonly valuesItems = computed(() => [
    this.tr.t('about.value1'),
    this.tr.t('about.value2'),
    this.tr.t('about.value3'),
    this.tr.t('about.value4'),
    this.tr.t('about.value5'),
  ]);
}
