import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { StatBarComponent } from '../../shared/components/stat-bar/stat-bar.component';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { WatermarkTextComponent } from '../../shared/components/watermark-text/watermark-text.component';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';
import { NumberedCardComponent } from '../../shared/components/numbered-card/numbered-card.component';
import { IconListComponent } from '../../shared/components/icon-list/icon-list.component';
import { TimelineComponent } from '../../shared/components/timeline/timeline.component';
import { IllustrationCardComponent } from '../../shared/components/illustration-card/illustration-card.component';
import { PartnersSectionComponent } from '../home/sections/partners-section/partners-section.component';

const STATS = [
  { value: '500K+',    label: 'Annual Transactions' },
  { value: 'AED 528B', label: 'Market Value 2024' },
  { value: '45+',      label: 'Digital Services' },
  { value: '60+',      label: 'Years of Excellence' },
  { value: '3M+',      label: 'Properties Registered' },
];

const STRATEGIC_CARDS = [
  {
    number: '01',
    eyebrow: 'Sector Foundation',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    title: 'Pioneering RE Model',
    bullets: [
      'Enhance sector readiness and sustainability',
      'Ensure effective governance for the RE sector',
    ],
  },
  {
    number: '02',
    eyebrow: 'Innovation Hub',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    title: 'RE Innovation Incubator',
    bullets: [
      'Foster a globally attractive RE sector',
      'Harness technology to enable RE solutions development',
    ],
  },
  {
    number: '03',
    eyebrow: 'Smart Intelligence',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    title: 'Data-Driven Sector',
    bullets: [
      'Maximize value creation from sector data',
      'Raise awareness, trust and transparency in the RE sector',
    ],
  },
  {
    number: '04',
    eyebrow: 'Organizational Excellence',
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    title: 'Agile DLD',
    bullets: [
      'Cultivate a flourishing digital ecosystem',
      'Foster partnership with public and private sectors',
      'Enhance DLD operations & corporate governance efficiency',
    ],
  },
  {
    number: '05',
    eyebrow: 'People Experience',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    title: 'Exceptional Journeys',
    bullets: [
      'Shift to an employee-first culture',
      "Move to a proactive and 'human'-focused approach",
      'Refresh DLD identity and enhance its position',
    ],
  },
];

const ACHIEVEMENT_STATS = [
  {
    value: 'AED 761B+',
    label: 'Total 2024 Market Value',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    value: '226,000+',
    label: 'Transactions Registered 2024',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  },
  {
    value: 'No. 1',
    label: 'Arab World Real Estate Market',
    icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
  },
  {
    value: '800+',
    label: 'Licensed Brokers & Developers',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  },
];

const TIMELINE_ITEMS = [
  { year: '1960', title: 'DLD Established',  caption: "Founded as Dubai's official land registry" },
  { year: '2000', title: 'RERA Created',      caption: 'Real Estate Regulatory Agency launched' },
  { year: '2013', title: 'Smart Government',  caption: 'Digital transformation initiative launched' },
  { year: '2017', title: 'Blockchain Pilot',  caption: 'First blockchain property registry in MENA' },
  { year: '2021', title: 'Strategic Map',     caption: '5-year roadmap 2021–2026 launched' },
  { year: '2024', title: 'AED 761B Record',   caption: 'Highest-ever annual transaction value' },
];

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    PageHeroComponent,
    StatBarComponent,
    SectionHeaderComponent,
    WatermarkTextComponent,
    StatCardComponent,
    NumberedCardComponent,
    IconListComponent,
    TimelineComponent,
    IllustrationCardComponent,
    PartnersSectionComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  readonly stats = STATS;
  readonly strategicCards = STRATEGIC_CARDS;
  readonly achievementStats = ACHIEVEMENT_STATS;
  readonly timelineItems = TIMELINE_ITEMS;
  readonly valuesItems = ['Proficient Team', 'People-centric', 'Justice', 'Passion', 'Boldness'];

  readonly breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Who We Are' },
  ];
}
