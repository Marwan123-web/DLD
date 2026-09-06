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
    route: '/news-media/latest-news',
    titleKey: 'news_hub.cards.latest_title',
    subtitleKey: 'news_hub.cards.latest_subtitle',
    icon: 'archive-book',
    bullets: [
      'news_hub.bullets.latest_news',
      'news_hub.bullets.market_updates',
      'news_hub.bullets.regulatory_news',
      'news_hub.bullets.events',
    ],
  },
  {
    route: '/news-media/announcements',
    titleKey: 'news_hub.cards.ann_title',
    subtitleKey: 'news_hub.cards.ann_subtitle',
    icon: 'buildings-2',
    bullets: [
      'news_hub.bullets.announcements',
      'news_hub.bullets.initiatives',
      'news_hub.bullets.press_releases',
    ],
  },
  {
    route: '/news-media/latest-news',
    titleKey: 'news_hub.cards.media_title',
    subtitleKey: 'news_hub.cards.media_subtitle',
    icon: 'folder',
    bullets: [
      'news_hub.bullets.photos',
      'news_hub.bullets.videos',
      'news_hub.bullets.press_kit',
    ],
  },
];

@Component({
  selector: 'app-news-hub',
  standalone: true,
  imports: [RouterLink, IconComponent, PartnersSectionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './news-hub.component.html',
  styleUrl: './news-hub.component.scss',
})
export class NewsHubComponent {
  readonly tr = inject(TranslationService);
  readonly cards = HUB_CARDS;
}
