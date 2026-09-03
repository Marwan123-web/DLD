import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../../core/services/translation.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { PartnersSectionComponent } from '../../home/sections/partners-section/partners-section.component';

interface HubCard {
  route: string;
  titleKey: string;
  subtitleKey: string;
  icon: string;
  bullets: string[];
}

const HUB_CARDS: HubCard[] = [
  {
    route: '/about-dld/who-we-are',
    titleKey: 'about_hub.cards.who_we_are_title',
    subtitleKey: 'about_hub.cards.who_we_are_subtitle',
    icon: 'courthouse',
    bullets: [
      'about_hub.bullets.about_dld',
      'about_hub.bullets.values',
      'about_hub.bullets.vision_mission',
      'about_hub.bullets.strategic_map',
    ],
  },
  {
    route: '/about-dld/leadership',
    titleKey: 'about_hub.cards.leadership_title',
    subtitleKey: 'about_hub.cards.leadership_subtitle',
    icon: 'profile-2user',
    bullets: [
      'about_hub.bullets.management_message',
      'about_hub.bullets.org_chart',
    ],
  },
  {
    route: '/about-dld/partnerships',
    titleKey: 'about_hub.cards.partnerships_title',
    subtitleKey: 'about_hub.cards.partnerships_subtitle',
    icon: 'global',
    bullets: [
      'about_hub.bullets.partnership',
      'about_hub.bullets.our_partners',
      'about_hub.bullets.contact_partnerships',
    ],
  },
  {
    route: '/about-dld/achievements',
    titleKey: 'about_hub.cards.achievements_title',
    subtitleKey: 'about_hub.cards.achievements_subtitle',
    icon: 'medal-star',
    bullets: [
      'about_hub.bullets.milestones',
      'about_hub.bullets.world_first',
      'about_hub.bullets.sustained',
      'about_hub.bullets.global_index',
      'about_hub.bullets.certified',
    ],
  },
];

@Component({
  selector: 'app-about-hub',
  standalone: true,
  imports: [RouterLink, IconComponent, PartnersSectionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about-hub.component.html',
  styleUrl: './about-hub.component.scss',
})
export class AboutHubComponent {
  readonly tr = inject(TranslationService);
  readonly cards = HUB_CARDS;
}
