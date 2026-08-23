import { Injectable } from '@angular/core';
import { Initiative } from '../models/initiative.model';
import { BackendUrls } from '../constants/backend-urls.constants';
import { BaseService } from './base.service';

// TODO(backend): Replace with DLD Initiatives API response via InitiativeAdapter.
const MOCK_INITIATIVES: Initiative[] = [
  {
    id: '1',
    title: 'Emirati Real Estate Companies Incubator',
    description: 'Empowering UAE nationals to establish and scale real estate companies with licensing support, mentorship, and fee exemptions.',
    imageUrl: 'assets/images/news-placeholder.jpg',
    deadline: '01 May 2026',
    status: 'open',
    ctaPrimary:   { label: 'Apply now',   url: '#' },
    ctaSecondary: { label: 'Learn more',  url: '#' },
  },
  {
    id: '2',
    title: 'Your First Home in Dubai',
    description: 'Priority access to exclusive developer offers and end-to-end guidance for first-time home buyers in Dubai.',
    imageUrl: 'assets/images/news-placeholder.jpg',
    deadline: undefined,
    status: 'open',
    ctaPrimary:   { label: 'Register Interest', url: '#' },
    ctaSecondary: { label: 'Learn more',         url: '#' },
  },
  {
    id: '3',
    title: 'Tayseer Initiative',
    description: 'Flexible payment plans for service charges, in collaboration with jointly-owned property management companies.',
    imageUrl: 'assets/images/news-placeholder.jpg',
    deadline: undefined,
    status: 'open',
    ctaPrimary:   { label: 'View details', url: '#' },
    ctaSecondary: { label: 'Learn more',   url: '#' },
  },
  {
    id: '4',
    title: 'Real Estate Evolution Space',
    description: 'Developing the innovation ecosystem in real estate through research and strategic partnerships.',
    imageUrl: 'assets/images/news-placeholder.jpg',
    deadline: undefined,
    status: 'open',
    ctaPrimary:   { label: 'Join REES',   url: '#' },
    ctaSecondary: { label: 'Learn more',  url: '#' },
  },
];

@Injectable({ providedIn: 'root' })
export class InitiativesService extends BaseService<Initiative> {
  constructor() {
    super(BackendUrls.initiatives, MOCK_INITIATIVES);
  }
}
