import { Injectable, signal, computed } from '@angular/core';
import { NewsArticle } from '../models/news-article.model';

// TODO(backend): Replace with DLD News API via NewsAdapter.
const ALL_ARTICLES: NewsArticle[] = [
  {
    id: '1', slug: 'dld-real-estate-transactions-record-q1-2026',
    title: 'DLD Records AED 120 Billion in Real Estate Transactions for Q1 2026',
    excerpt: 'Dubai Land Department has announced a record-breaking first quarter, with total real estate transactions reaching AED 120 billion — a 22% year-on-year increase driven by strong residential and commercial demand.',
    imageUrl: 'assets/images/news-placeholder.jpg',
    date: '2026-04-15T09:00:00Z', category: 'Transactions',
  },
  {
    id: '2', slug: 'smart-rental-index-launch',
    title: 'DLD Launches Enhanced Smart Rental Index with AI-Powered Valuations',
    excerpt: 'The updated Rental Index now incorporates machine-learning models trained on 10 years of transaction data, delivering more accurate and hyper-local rental benchmarks for landlords and tenants across Dubai.',
    imageUrl: 'assets/images/news-placeholder.jpg',
    date: '2026-04-08T08:30:00Z', category: 'Technology',
  },
  {
    id: '3', slug: 'emirati-incubator-cohort-3',
    title: 'Third Cohort of Emirati Real Estate Companies Incubator Graduates',
    excerpt: 'Twenty-four Emirati entrepreneurs completed the third cohort of DLD\'s flagship incubator programme, with six companies already receiving their real estate brokerage licences.',
    imageUrl: 'assets/images/news-placeholder.jpg',
    date: '2026-03-28T10:00:00Z', category: 'Initiatives',
  },
  {
    id: '4', slug: 'dubai-real-estate-forum-2026',
    title: 'Dubai Real Estate Forum 2026 to Bring Together 5,000 Global Experts',
    excerpt: 'DLD and RERA will host the annual Dubai Real Estate Forum in October 2026, gathering policymakers, investors, and PropTech pioneers to discuss the future of urban real estate.',
    imageUrl: 'assets/images/news-placeholder.jpg',
    date: '2026-03-20T11:00:00Z', category: 'Events',
  },
  {
    id: '5', slug: 'rera-developer-ratings-2026',
    title: 'RERA Releases 2026 Developer Rating Report — Quality Builders Recognised',
    excerpt: 'The Real Estate Regulatory Agency has published its annual developer performance report, rating 312 active developers across delivery timelines, construction quality, and customer satisfaction.',
    imageUrl: 'assets/images/news-placeholder.jpg',
    date: '2026-03-12T09:00:00Z', category: 'Regulation',
  },
  {
    id: '6', slug: 'first-home-dubai-programme-expansion',
    title: "'Your First Home' Programme Expands to Include Ready Properties",
    excerpt: 'DLD\'s \'Your First Home in Dubai\' initiative now covers ready-to-move properties in addition to off-plan developments, following strong demand from first-time buyers aged 25–35.',
    imageUrl: 'assets/images/news-placeholder.jpg',
    date: '2026-03-01T08:00:00Z', category: 'Initiatives',
  },
  {
    id: '7', slug: 'proptech-acceleration-programme',
    title: 'DLD PropTech Acceleration Programme Opens Applications for 2026 Cycle',
    excerpt: 'The Real Estate Evolution Space (REES) is accepting applications from global PropTech startups seeking to pilot solutions in Dubai\'s regulated real estate environment.',
    imageUrl: 'assets/images/news-placeholder.jpg',
    date: '2026-02-20T10:30:00Z', category: 'Technology',
  },
  {
    id: '8', slug: 'tayseer-initiative-reaches-10000-beneficiaries',
    title: 'Tayseer Initiative Reaches 10,000 Service Charge Beneficiaries',
    excerpt: 'The flexible payment plan programme for service charges has assisted over 10,000 property owners since its launch, with AED 800 million in deferred payments facilitated through partner management companies.',
    imageUrl: 'assets/images/news-placeholder.jpg',
    date: '2026-02-10T09:00:00Z', category: 'Initiatives',
  },
  {
    id: '9', slug: 'foreign-investment-dubai-real-estate-2025',
    title: 'Foreign Investment in Dubai Real Estate Hits Record High in 2025',
    excerpt: 'Investors from over 190 nationalities participated in Dubai\'s real estate market in 2025, contributing AED 280 billion in purchases and reflecting the emirate\'s growing position as a global investment hub.',
    imageUrl: 'assets/images/news-placeholder.jpg',
    date: '2026-01-28T11:00:00Z', category: 'Market Data',
  },
];

const PAGE_SIZE = 6;

@Injectable({ providedIn: 'root' })
export class NewsService {
  private readonly _page = signal(1);

  readonly featured = ALL_ARTICLES.slice(0, 3);

  readonly allArticles = ALL_ARTICLES;

  readonly visibleCount = computed(() => Math.min(this._page() * PAGE_SIZE, ALL_ARTICLES.length));

  readonly visibleList = computed(() => ALL_ARTICLES.slice(0, this.visibleCount()));

  readonly hasMore = computed(() => this.visibleCount() < ALL_ARTICLES.length);

  loadMore(): void {
    this._page.update(p => p + 1);
  }

  getByCategory(category: string): NewsArticle[] {
    if (category === 'all') return ALL_ARTICLES;
    return ALL_ARTICLES.filter(a => a.category === category);
  }

  getCategories(): string[] {
    return ['all', ...new Set(ALL_ARTICLES.map(a => a.category))];
  }
}
