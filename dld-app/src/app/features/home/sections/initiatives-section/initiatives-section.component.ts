import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Initiative } from '../../../../core/models/persona-tab.model';

const INITIATIVES: Initiative[] = [
  {
    id: '1',
    imageUrl: 'assets/images/logo2outline.svg',
    date: 'May 25, 2026',
    title: 'Emirati Real Estate Companies Incubator',
    description: 'Application Deadline May 25, 2026 Register and submit your application for Phase Two 2026.',
  },
  {
    id: '2',
    imageUrl: 'assets/images/about-dubai.jpg',
    date: 'Jun 10, 2026',
    title: 'Your First Home in Dubai',
    description: 'Register your interest & connect to approved developers in Dubai.',
  },
  {
    id: '3',
    imageUrl: 'assets/images/about-dubai-night.jpg',
    date: 'Jul 1, 2026',
    title: 'MENA Real Estate Forum 2026',
    description: 'Join Dubai Land Department for the annual MENA real estate innovation summit.',
  },
];

@Component({
  selector: 'app-initiatives-section',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './initiatives-section.component.html',
  styleUrl: './initiatives-section.component.scss',
})
export class InitiativesSectionComponent {
  readonly initiatives = INITIATIVES;
}
