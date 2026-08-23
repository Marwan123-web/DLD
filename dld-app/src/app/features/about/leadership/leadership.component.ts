import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { PageHeroComponent } from '../../../shared/components/page-hero/page-hero.component';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { LeadershipCardComponent, LeadershipCardData } from '../../../shared/components/leadership-card/leadership-card.component';
import { LeadershipMessageModalComponent, LeadershipModalData } from '../../../shared/components/leadership-message-modal/leadership-message-modal.component';
import { PartnersSectionComponent } from '../../home/sections/partners-section/partners-section.component';

const CHAIRMAN_DATA: LeadershipCardData = {
  badge: 'LEADERSHIP',
  role: 'Chairman Message',
  name: 'H.E. Marwan bin Ghalita',
  excerpt:
    "Dubai's real estate market has reached unprecedented heights, powered by visionary leadership and a commitment to transparency. At DLD, we're not just registering transactions — we're building the infrastructure for a world-class property ecosystem.",
  portraitSrc: 'assets/images/chairman-portrait.jpg',
  portraitAlt: 'H.E. Marwan bin Ghalita - Chairman',
  theme: 'green' as const,
};

const DG_DATA: LeadershipCardData = {
  badge: 'LEADERSHIP',
  role: 'Director General Message',
  name: 'H.E. Omar Bu Shehab',
  excerpt:
    "Under the wise guidance of our visionary leadership, Dubai continues to solidify its position as a global hub for investment, innovation, and sustainable development. This momentum is fuelled by an ambitious strategic vision that strengthens competitiveness while advancing the pillars of economic diversification and long-term resilience.",
  portraitSrc: 'assets/images/dg-portrait.jpg',
  portraitAlt: 'H.E. Omar Bu Shehab - Director General',
  theme: 'navy' as const,
};

const CHAIRMAN_MODAL: LeadershipModalData = {
  theme: 'green',
  watermarkLines: ['Chairman', 'Message'],
  portraitSrc: 'assets/images/chairman-portrait.jpg',
  portraitAlt: 'H.E. Marwan bin Ghalita',
  portraitSide: 'start',
  eyebrow: 'LEADERSHIP',
  title: 'Message from the Chairman',
  paragraphs: [
    "Dubai's real estate market has reached unprecedented heights, powered by visionary leadership and a commitment to transparency. At DLD, we're not just registering transactions — we're building the infrastructure for a world-class property ecosystem.",
    "Through RERA, our open data platforms, and digital transformation initiatives, we continue to uphold Dubai's position as the most trusted and investable real estate market in the world. Our AED 761 billion 2024 achievement is a testament to the confidence of investors worldwide.",
    'We remain committed to innovation, sustainability, and excellence as we look forward to surpassing these milestones in the years ahead.',
  ],
  signature: 'H.E. Marwan bin Ghalita · Director General, Dubai Land Department',
};

const DG_MODAL: LeadershipModalData = {
  theme: 'navy',
  watermarkLines: ['Director General', 'Message'],
  portraitSrc: 'assets/images/dg-portrait.jpg',
  portraitAlt: 'H.E. Omar Bu Shehab',
  portraitSide: 'end',
  eyebrow: 'LEADERSHIP',
  title: 'Message from the Director General',
  paragraphs: [
    'Under the wise guidance of our visionary leadership, Dubai continues to solidify its position as a global hub for investment, innovation, and sustainable development. This momentum is fuelled by an ambitious strategic vision that strengthens competitiveness while advancing the pillars of economic diversification and long-term resilience. At the heart of this transformation lies the real estate sector, one of the key enablers of economic growth and quality of life in the emirate.',
    "At Dubai Land Department, we are guided by the vision of His Highness Sheikh Mohammed bin Rashid Al Maktoum, Vice President and Prime Minister of the UAE and Ruler of Dubai. Inspired by advanced strategic frameworks, we are implementing a comprehensive roadmap to build a sustainable, resilient, and data-driven real estate sector that acts as a catalyst for other sectors and enhances Dubai's global competitiveness.",
    "We operate with a spirit of collaboration and institutional integration to empower the real estate sector in fulfilling its critical role in driving economic progress. This includes delivering proactive, customer-centric services, developing forward-looking legislation, and establishing a robust digital infrastructure, all supported by a skilled national workforce. We are equally committed to harnessing real estate data and emerging technologies to elevate transparency, optimise decision-making, and enable all stakeholders to thrive within a knowledge-based ecosystem.",
    "Our unwavering commitment to the Dubai Real Estate Strategy 2033 remains central to our vision. This includes increasing the sector's added value, promoting homeownership, improving construction quality, and advancing urban sustainability and community well-being. To accelerate these outcomes, we are expanding partnerships across both the public and private sectors—unlocking new opportunities and attracting high-quality investments from strategic global markets.",
    "Aligned with the Dubai Economic Agenda D33, which aims to double the size of the emirate's economy and position it among the world's top three economic cities, we believe that the real estate sector is one of the most powerful enablers of these national ambitions—given its direct and far-reaching influence on multiple sectors of the economy.",
    'As we enter a new era of transformative growth, we are confident that the trust of investors, residents, and strategic partners will remain the cornerstone of our success. With confidence, collaboration, and clarity of vision, Dubai will continue to lead with purpose, shaping a future of sustainable prosperity for generations to come.',
  ],
  signature: 'His Excellency Omar Bu Shehab, Director General of Dubai Land Department',
};

@Component({
  selector: 'app-leadership',
  standalone: true,
  imports: [
    PageHeroComponent,
    SectionHeaderComponent,
    LeadershipCardComponent,
    LeadershipMessageModalComponent,
    PartnersSectionComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './leadership.component.html',
  styleUrl: './leadership.component.scss',
})
export class LeadershipComponent {
  readonly chairmanData = CHAIRMAN_DATA;
  readonly dgData = DG_DATA;
  readonly chairmanModal = CHAIRMAN_MODAL;
  readonly dgModal = DG_MODAL;

  readonly chairmanModalOpen = signal(false);
  readonly dgModalOpen = signal(false);

  readonly breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Leadership & Organization' },
  ];

  openChairmanModal(): void {
    this.chairmanModalOpen.set(true);
  }

  openDgModal(): void {
    this.dgModalOpen.set(true);
  }

  printOrgChart(): void {
    window.print();
  }
}
