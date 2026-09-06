import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../../core/services/translation.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { PartnersSectionComponent } from '../../home/sections/partners-section/partners-section.component';

export type EntryKind = 'year' | 'world-first' | 'dot-labeled' | 'iso-grid';

export interface AwardChip {
  icon: string;
  labelKey: string;
}

export interface AwardCard {
  icon: string;
  titleKey: string;
  subtitleKey: string;
}

export interface StatBox {
  valueKey: string;
  labelKey: string;
  descKey?: string;
}

export interface TimelineEntry {
  kind: EntryKind;
  year?: string;
  dark?: boolean;
  sectionLabelKey?: string;
  headlineKey: string;
  bodyKey?: string;
  bodyKey2?: string;
  bodyKey3?: string;
  chips?: AwardChip[];
  statBoxes?: StatBox[];
  awardCards?: AwardCard[];
  quoteKey?: string;
  quoteSuffixKey?: string;
  quoteSuffixLabelKey?: string;
  isoKeys?: string[];
  decorIcon?: string;
  sideStatBoxes?: StatBox[];
}

const TIMELINE: TimelineEntry[] = [
  {
    kind: 'year',
    year: '2014',
    headlineKey: 'achievements.y2014_headline',
    bodyKey: 'achievements.y2014_body',
    chips: [
      { icon: 'magic-star', labelKey: 'achievements.y2014_award1' },
      { icon: 'star',        labelKey: 'achievements.y2014_award2' },
      { icon: 'medal-star-g',  labelKey: 'achievements.y2014_award3' },
    ],
  },
  {
    kind: 'year',
    year: '2015',
    headlineKey: 'achievements.y2015_headline',
    bodyKey: 'achievements.y2015_body1',
    bodyKey2: 'achievements.y2015_body2',
    sideStatBoxes: [
      { valueKey: 'achievements.y2015_stat1_val', labelKey: 'achievements.y2015_stat1_lbl' },
      { valueKey: 'achievements.y2015_stat2_val', labelKey: 'achievements.y2015_stat2_lbl' },
    ],
    chips: [
      { icon: 'global',      labelKey: 'achievements.y2015_award1' },
      { icon: 'magic-star',  labelKey: 'achievements.y2015_award2' },
    ],
  },
  {
    kind: 'year',
    year: '2016',
    headlineKey: 'achievements.y2016_headline',
    bodyKey: 'achievements.y2016_body',
    statBoxes: [
      { valueKey: 'achievements.y2016_stat1_val', labelKey: 'achievements.y2016_stat1_lbl' },
      { valueKey: 'achievements.y2016_stat2_val', labelKey: 'achievements.y2016_stat2_lbl' },
      { valueKey: 'achievements.y2016_stat3_val', labelKey: 'achievements.y2016_stat3_lbl' },
      { valueKey: 'achievements.y2016_stat4_val', labelKey: 'achievements.y2016_stat4_lbl' },
    ],
  },
  {
    kind: 'year',
    year: '2017',
    dark: true,
    sectionLabelKey: 'achievements.world_first_label',
    headlineKey: 'achievements.y2017_headline',
    bodyKey: 'achievements.y2017_body',
    decorIcon: 'security-safe',
  },
  {
    kind: 'year',
    year: '2018',
    headlineKey: 'achievements.y2018_headline',
    bodyKey: 'achievements.y2018_body1',
    bodyKey2: 'achievements.y2018_body2',
    bodyKey3: 'achievements.y2018_body3',
    awardCards: [
      { icon: 'medal-star-g', titleKey: 'achievements.y2018_card1_title', subtitleKey: 'achievements.y2018_card1_sub' },
      { icon: 'medal',      titleKey: 'achievements.y2018_card2_title', subtitleKey: 'achievements.y2018_card2_sub' },
      { icon: 'medal',      titleKey: 'achievements.y2018_card3_title', subtitleKey: 'achievements.y2018_card3_sub' },
    ],
  },
  {
    kind: 'dot-labeled',
    sectionLabelKey: 'achievements.sustained_title',
    headlineKey: 'achievements.sustained_headline',
    bodyKey: 'achievements.sustained_body',
    quoteKey: 'achievements.sustained_quote',
    quoteSuffixKey: 'achievements.sustained_stat',
    quoteSuffixLabelKey: 'achievements.sustained_stat_lbl',
    decorIcon: 'ranking',

  },
  {
    kind: 'year',
    year: '2021',
    headlineKey: 'achievements.y2021_headline',
    bodyKey: 'achievements.y2021_body1',
    bodyKey2: 'achievements.y2021_body2',
    chips: [
      { icon: 'star',       labelKey: 'achievements.y2021_award1' },
      { icon: 'medal-star-g', labelKey: 'achievements.y2021_award2' },
    ],
  },
  {
    kind: 'dot-labeled',
    dark: true,
    sectionLabelKey: 'achievements.global_index_title',
    headlineKey: 'achievements.global_idx_headline',
    bodyKey: 'achievements.global_idx_subtitle',
    statBoxes: [
      { valueKey: 'achievements.global_idx_stat1_val', labelKey: 'achievements.global_idx_stat1_lbl', descKey: 'achievements.global_idx_stat1_body' },
      { valueKey: 'achievements.global_idx_stat2_val', labelKey: 'achievements.global_idx_stat2_lbl', descKey: 'achievements.global_idx_stat2_body' },
    ],
  },
  {
    kind: 'iso-grid',
    sectionLabelKey: 'achievements.certified_title',
    headlineKey: 'achievements.cert_headline',
    bodyKey: 'achievements.cert_body',
    isoKeys: [
      'achievements.iso_1',
      'achievements.iso_2',
      'achievements.iso_3',
      'achievements.iso_4',
      'achievements.iso_5',
      'achievements.iso_6',
      'achievements.iso_7',
      'achievements.iso_8',
      'achievements.iso_9',
      'achievements.iso_10',
      'achievements.iso_11',
      'achievements.iso_12',
    ],
  },
];

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [RouterLink, IconComponent, PartnersSectionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.scss',
})
export class AchievementsComponent {
  readonly tr = inject(TranslationService);
  readonly timeline = TIMELINE;
}
