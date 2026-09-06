import { Injectable, signal, computed } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { NewsArticle } from '../models/news-article.model';
import { adaptNewsItem, adaptNewsItems, RawNewsItem } from '../adapters/news.adapter';
import { BackendUrls } from '../constants/backend-urls.constants';
import { BaseService } from './base.service';

// TODO(backend): Replace with DLD News API via NewsAdapter.
const ALL_ARTICLES: NewsArticle[] = [
  {
    id: '1', slug: 'dld-real-estate-transactions-record-q1-2026',
    title: 'DLD Records AED 120 Billion in Real Estate Transactions for Q1 2026',
    excerpt: 'Dubai Land Department has announced a record-breaking first quarter, with total real estate transactions reaching AED 120 billion — a 22% year-on-year increase driven by strong residential and commercial demand.',
    body: 'Dubai Land Department (DLD) has announced record-breaking performance for the first quarter of 2026, with total real estate transactions reaching AED 120 billion — representing a significant 22% year-on-year increase. This milestone reflects the sustained confidence of local and international investors in Dubai\'s real estate market.\n\nThe residential sector led growth, accounting for AED 78 billion of total transactions, while commercial and industrial properties contributed the remaining AED 42 billion. Off-plan sales surged 35% compared to the same period last year, driven by new mega-project launches across Downtown, Dubai Creek Harbour, and Jumeirah Village Circle.\n\nH.E. Marwan bin Ghalita, Director General of DLD, stated: "These figures are a testament to Dubai\'s enduring attractiveness as a global real estate destination. Our regulatory framework, digital infrastructure, and commitment to transparency continue to set the benchmark for real estate markets worldwide."\n\nDLD\'s blockchain-powered transaction system processed over 47,000 individual deals during the quarter, with average transaction times reduced to under 8 minutes — a world-first in real estate registry efficiency.',
    imageUrl: 'assets/images/news-placeholder.jpg',
    date: '2026-04-15T09:00:00Z', category: 'Transactions',
  },
  {
    id: '2', slug: 'smart-rental-index-ai-valuations',
    title: 'DLD Launches Enhanced Smart Rental Index with AI-Powered Valuations',
    excerpt: 'The updated Rental Index now incorporates machine-learning models trained on 10 years of transaction data, delivering more accurate and hyper-local rental benchmarks for landlords and tenants across Dubai.',
    body: 'Dubai Land Department has unveiled the next generation of its Smart Rental Index, incorporating advanced machine-learning algorithms trained on a decade of granular transaction data. The enhanced platform delivers hyper-local rental benchmarks accurate to individual building level across all 118 Dubai communities.\n\nThe AI models analyse over 200 variables including floor level, view type, building age, amenity proximity, and seasonal demand patterns to generate precise rental range recommendations. Landlords and tenants can now access real-time rental guidance through the Dubai REST app and the DLD web portal.\n\nThe system processes over 2,000 rental contract registrations daily through Ejari integration, continuously refining its models with fresh market data. Property managers report that disputes over rental increases have decreased by 40% in pilot communities where the enhanced index was first deployed.\n\n"This is part of our broader commitment to data transparency," said the Director of the Real Estate Regulatory Agency. "When both parties in a tenancy have access to the same authoritative benchmark, the market becomes fairer and more efficient for everyone."',
    imageUrl: 'assets/images/about-dubai.jpg',
    date: '2026-04-08T08:30:00Z', category: 'Technology',
  },
  {
    id: '3', slug: 'emirati-incubator-cohort-3-graduates',
    title: 'Third Cohort of Emirati Real Estate Companies Incubator Graduates',
    excerpt: 'Twenty-four Emirati entrepreneurs completed the third cohort of DLD\'s flagship incubator programme, with six companies already receiving their real estate brokerage licences.',
    body: 'The Dubai Land Department celebrated the graduation of the third cohort of the Emirati Real Estate Companies Incubator, with 24 Emirati entrepreneurs completing the intensive six-month programme. Six of the graduates have already received their full real estate brokerage licences and commenced commercial operations.\n\nThe programme — fully free and accommodating working professionals through evening and weekend scheduling — combines business management training, mentorship from established real estate leaders, and direct market access through partnerships with leading developers.\n\nThis cohort surpassed previous performance metrics, with participants collectively establishing real estate companies valued at over AED 45 million in combined initial capital. Three graduates secured partnership agreements with international real estate firms as part of their business development milestones.\n\nApplications for the fourth cohort open in June 2026, with 30 places available for Emirati nationals aged 21 and above. Priority is given to applicants with existing real estate industry experience and those who demonstrate a clear business plan.',
    imageUrl: 'assets/images/about-dubai-night.jpg',
    date: '2026-03-28T10:00:00Z', category: 'Initiatives',
  },
  {
    id: '4', slug: 'dubai-real-estate-forum-2026',
    title: 'Dubai Real Estate Forum 2026 to Bring Together 5,000 Global Experts',
    excerpt: 'DLD and RERA will host the annual Dubai Real Estate Forum in October 2026, gathering policymakers, investors, and PropTech pioneers to discuss the future of urban real estate.',
    body: 'The Dubai Real Estate Forum 2026 will convene over 5,000 participants from 90 countries at the Madinat Jumeirah Convention Centre from 14–16 October 2026. Co-hosted by Dubai Land Department and the Real Estate Regulatory Agency, the forum has grown into one of the world\'s premier platforms for real estate policy, investment, and technology dialogue.\n\nThis year\'s theme, "Real Estate at the Intersection of Intelligence and Sustainability," will address the convergence of artificial intelligence, green building standards, and smart city infrastructure in shaping the next generation of urban development.\n\nKeynote speakers include global property fund managers, urban planning ministers from 12 countries, and the CEOs of leading PropTech unicorns. Workshop sessions will cover topics from tokenised real estate ownership to climate-resilient community design.\n\nRegistration for the forum is open through the Dubai REST app. Early registration closes 30 July 2026, with limited places available for the exclusive C-Suite Leadership Roundtables.',
    imageUrl: 'assets/images/hero-dubai.jpg',
    date: '2026-03-20T11:00:00Z', category: 'Events',
  },
  {
    id: '5', slug: 'rera-developer-ratings-2026',
    title: 'RERA Releases 2026 Developer Rating Report — Quality Builders Recognised',
    excerpt: 'The Real Estate Regulatory Agency has published its annual developer performance report, rating 312 active developers across delivery timelines, construction quality, and customer satisfaction.',
    body: 'The Real Estate Regulatory Agency (RERA) has published its comprehensive 2026 Developer Performance Rating Report, evaluating 312 active real estate developers operating in Dubai. The report rates developers across five categories: on-time delivery, construction quality, customer service, financial transparency, and regulatory compliance.\n\nThis year, 48 developers achieved the highest five-star rating, up from 31 last year, reflecting industry-wide improvements in delivery and quality standards. The report also identifies 18 developers placed on enhanced monitoring status due to project delays or customer complaint volumes.\n\nRERA\'s Director noted that the publication of these ratings has significantly improved market accountability. Off-plan buyers are increasingly referencing developer ratings in their purchase decisions, with survey data showing 72% of buyers consulting the report before committing to a purchase.\n\nThe full ratings database is accessible through the DLD portal and the Dubai REST app, enabling investors to filter projects by developer rating, location, and completion percentage in real time.',
    imageUrl: 'assets/images/folder-images/news-placeholder.png',
    date: '2026-03-12T09:00:00Z', category: 'Regulation',
  },
  {
    id: '6', slug: 'your-first-home-programme-expansion',
    title: "'Your First Home' Programme Expands to Include Ready Properties",
    excerpt: 'DLD\'s \'Your First Home in Dubai\' initiative now covers ready-to-move properties in addition to off-plan developments, following strong demand from first-time buyers aged 25–35.',
    body: 'Dubai Land Department has expanded the \'Your First Home in Dubai\' initiative to include ready-to-move properties, responding to strong demand from first-time buyers seeking immediate occupancy. The programme, which previously focused exclusively on off-plan developments, will now cover a curated selection of completed properties priced between AED 600,000 and AED 1.5 million.\n\nBeneficiaries of the expanded programme receive mortgage facilitation support, reduced registration fees, and access to DLD\'s dedicated first-time buyer advisory service. The average buyer profile in the programme is 29 years old, with a household income between AED 15,000 and AED 25,000 per month.\n\nSince its launch in 2024, the initiative has helped over 3,200 families purchase their first home in Dubai. The ready-property expansion is expected to add a further 2,500 beneficiaries in 2026, supported by a network of 47 participating developers and 180 certified real estate brokers.\n\nApplications are processed entirely through the Dubai REST app, with eligibility decisions typically delivered within 72 hours of submission.',
    imageUrl: 'assets/images/folder-images/news-placeholder2.png',
    date: '2026-03-01T08:00:00Z', category: 'Initiatives',
  },
  {
    id: '7', slug: 'proptech-acceleration-programme-2026',
    title: 'DLD PropTech Acceleration Programme Opens Applications for 2026 Cycle',
    excerpt: 'The Real Estate Evolution Space (REES) is accepting applications from global PropTech startups seeking to pilot solutions in Dubai\'s regulated real estate environment.',
    body: 'Dubai Land Department\'s Real Estate Evolution Space (REES) has officially opened applications for the 2026 PropTech Acceleration Programme, inviting startups from around the world to pilot innovative solutions within Dubai\'s live real estate ecosystem. This cycle offers 20 places for companies across six focus areas: transaction automation, property valuation AI, smart building management, sustainable construction, tenant experience platforms, and regulatory technology.\n\nSelected startups receive a dedicated sandbox environment with access to anonymised DLD transaction data spanning 15 years, mentorship from DLD\'s technology leadership team, and introductions to a network of over 200 developers, property managers, and institutional investors.\n\nLast year\'s cohort included 22 companies from 14 countries. Of those, nine secured commercial pilots with Dubai-based real estate firms, three received follow-on investment from regional venture capital funds, and two integrated their solutions directly into DLD\'s operational platform.\n\nApplications close 15 June 2026. Shortlisted companies will be invited to present at the Dubai PropTech Showcase in August 2026.',
    imageUrl: 'assets/images/news-placeholder.jpg',
    date: '2026-02-20T10:30:00Z', category: 'Technology',
  },
  {
    id: '8', slug: 'tayseer-initiative-10000-beneficiaries',
    title: 'Tayseer Initiative Reaches 10,000 Service Charge Beneficiaries',
    excerpt: 'The flexible payment plan programme for service charges has assisted over 10,000 property owners since its launch, with AED 800 million in deferred payments facilitated through partner management companies.',
    body: 'The Tayseer Initiative, Dubai Land Department\'s flexible service charge payment programme, has reached a landmark 10,000 beneficiaries, with AED 800 million in deferred payments successfully facilitated through a network of 65 partner property management companies.\n\nThe initiative was launched to support property owners facing temporary cash-flow challenges by enabling service charge payments to be spread across quarterly or bi-annual instalments without interest or penalties. Eligible properties include residential units in strata communities across all Dubai districts.\n\nData shows that communities participating in the Tayseer programme have seen a 28% reduction in service charge collection disputes and a measurable improvement in building maintenance standards, as management companies report more predictable cash flows.\n\nThe programme has been particularly impactful in supporting investors who hold multiple units across different developments. DLD is in discussions with additional management companies to expand the network to 100 partners by the end of 2026, targeting 15,000 total beneficiaries within the year.',
    imageUrl: 'assets/images/about-dubai.jpg',
    date: '2026-02-10T09:00:00Z', category: 'Initiatives',
  },
  {
    id: '9', slug: 'foreign-investment-record-2025',
    title: 'Foreign Investment in Dubai Real Estate Hits Record High in 2025',
    excerpt: 'Investors from over 190 nationalities participated in Dubai\'s real estate market in 2025, contributing AED 280 billion in purchases and reflecting the emirate\'s growing position as a global investment hub.',
    body: 'Foreign investment in Dubai\'s real estate market reached a record AED 280 billion in 2025, with investors from 190 nationalities collectively purchasing 52,400 properties across the emirate. This represents a 31% increase over 2024 and marks the third consecutive year of record foreign investment.\n\nEuropean buyers led the list of new entrants by volume, followed by South and Southeast Asian investors, with significant growth also recorded from Latin American buyers entering the market for the first time. The luxury segment — properties above AED 5 million — saw the strongest growth at 44% year-on-year.\n\nDLD\'s analysis identifies regulatory transparency, the absence of property taxes, and the strength of the UAE dirham as key factors attracting global capital. The golden visa programme, which grants long-term residency to property investors above AED 2 million, contributed to a surge in hold-to-reside purchases in premium communities.\n\nDigital transaction capabilities introduced by DLD allowed 23% of overseas transactions to be completed entirely remotely in 2025, up from 8% in 2023. DLD is targeting 40% remote transaction capability by end of 2026.',
    imageUrl: 'assets/images/about-dubai-night.jpg',
    date: '2026-01-28T11:00:00Z', category: 'Market Data',
  },
  {
    id: '10', slug: 'dld-rera-digital-services-portal',
    title: 'DLD & RERA Launch Unified Digital Services Portal for Real Estate Professionals',
    excerpt: 'A new integrated portal consolidates licensing, registration, and regulatory services for brokers, developers, and property managers into a single digital platform.',
    body: 'Dubai Land Department and the Real Estate Regulatory Agency have jointly launched the Unified Real Estate Professional Services Portal, consolidating over 80 individual licensing, registration, and compliance services into a single digital platform accessible through desktop and the Dubai REST app.\n\nThe portal serves the approximately 22,000 licensed real estate brokers, 312 active developers, and 650 registered property management companies operating in Dubai. Key features include automated licence renewal, digital good-conduct certificate issuance, online NOC applications, and a unified payment gateway that accepts over 30 currencies.\n\nLicence renewal times have been reduced from an average of 4 days to 45 minutes for straightforward cases. Developers can now submit and track off-plan escrow account documentation entirely online, with DLD approval timelines cut from 3 weeks to 5 business days.\n\nReal estate brokers who complete the mandatory RERA training through the portal\'s integrated learning management system receive expedited processing for all subsequent applications. The portal is available in English and Arabic, with Hindi and Russian language support scheduled for Q3 2026.',
    imageUrl: 'assets/images/hero-dubai.jpg',
    date: '2026-01-15T10:00:00Z', category: 'Technology',
  },
  {
    id: '11', slug: 'dld-sustainability-green-buildings-initiative',
    title: 'DLD Introduces Green Building Credits for Certified Sustainable Developments',
    excerpt: 'New green building incentives offer reduced registration fees and expedited approvals for developments meeting LEED Gold or Dubai Green Building standards.',
    body: 'Dubai Land Department has launched a comprehensive green building incentive programme, offering tangible financial benefits to developers and buyers of properties that meet internationally recognised sustainability standards. Developments certified to LEED Gold or above, or compliant with Dubai\'s Green Building Regulations, will qualify for reduced registration fees, expedited title deed processing, and enhanced marketing support through DLD channels.\n\nThe programme aligns with Dubai\'s Net Zero 2050 strategic initiative and responds to increasing demand from institutional investors who require ESG-compliant assets in their portfolios. DLD\'s analysis shows that green-certified properties in Dubai command an average 8% premium over comparable non-certified developments.\n\nFor buyers, the incentive structure includes a 50% reduction in Dubai Land Department fees at the time of purchase, applicable to first owners of newly certified properties. This equates to savings of up to AED 75,000 on a AED 3 million property.\n\nDLD estimates that the programme will drive green certification of an additional 15,000 residential and commercial units by 2027, contributing meaningfully to Dubai\'s sustainable development goals and positioning the emirate as a leader in green real estate globally.',
    imageUrl: 'assets/images/folder-images/news-placeholder.png',
    date: '2026-01-05T09:00:00Z', category: 'Regulation',
  },
  {
    id: '12', slug: 'dld-partnerships-global-real-estate-organisations',
    title: 'DLD Signs Strategic Partnerships with Six Global Real Estate Organisations',
    excerpt: 'New MOUs with real estate bodies from the UK, France, Canada, Singapore, South Korea, and Brazil will facilitate knowledge exchange and open pathways for bilateral investment.',
    body: 'Dubai Land Department has formalised strategic partnerships with six leading global real estate organisations through Memoranda of Understanding signed during the Dubai Real Estate International Forum. The agreements cover knowledge exchange, joint research programmes, bilateral investment facilitation, and cross-recognition of professional certifications.\n\nPartner organisations include the Royal Institution of Chartered Surveyors (RICS) in the UK, the Conseil National de l\'Immobilier in France, the Canadian Real Estate Association, the Real Estate Developers Association of Singapore, the Korea Real Estate Board, and the Brazilian Real Estate Chamber (CBIC).\n\nThe partnerships will enable licensed real estate professionals from these countries to have their qualifications recognised in Dubai under a streamlined pathway, reducing the registration requirements for internationally experienced professionals entering the Dubai market.\n\nJoint market research publications will be produced biannually, providing data-driven insights into comparative real estate market performance across the partnered regions. DLD will also facilitate dedicated investment roadshows in each partner country, presenting Dubai\'s investment proposition to local institutional and private investors.',
    imageUrl: 'assets/images/folder-images/news-placeholder2.png',
    date: '2025-12-18T11:00:00Z', category: 'Partnerships',
  },
];

const MOCK_NEWS_ITEMS: RawNewsItem[] = ALL_ARTICLES.map(article => ({
  id: article.id,
  slug: article.slug,
  title: article.title,
  summary: article.excerpt,
  thumbnail: article.imageUrl,
  published_at: article.date,
  category: article.category,
  body: article.body,
}));

const PAGE_SIZE = 6;

@Injectable({ providedIn: 'root' })
export class NewsService extends BaseService<NewsArticle, Partial<NewsArticle>, Partial<NewsArticle>, string, RawNewsItem> {
  private readonly _articles = signal<NewsArticle[]>([]);
  private readonly _page = signal(1);

  constructor() {
    super(BackendUrls.news, MOCK_NEWS_ITEMS);
    this.load();
  }

  readonly featured = computed(() => this._articles().slice(0, 5));

  readonly allArticles = computed(() => this._articles());

  readonly visibleCount = computed(() => Math.min(this._page() * PAGE_SIZE, this._articles().length));

  readonly visibleList = computed(() => this._articles().slice(0, this.visibleCount()));

  readonly hasMore = computed(() => this.visibleCount() < this._articles().length);

  load(): void {
    this.getAll().subscribe(articles => this._articles.set(articles));
  }

  override getAll(params?: HttpParams): Observable<NewsArticle[]> {
    return this.api
      .get<RawNewsItem[]>(BackendUrls.news, params)
      .pipe(map(adaptNewsItems));
  }

  override getById(id: string): Observable<NewsArticle> {
    return this.api
      .get<RawNewsItem>(`${BackendUrls.news}/${encodeURIComponent(id)}`)
      .pipe(map(adaptNewsItem));
  }

  loadMore(): void {
    this._page.update(p => p + 1);
  }

  getByCategory(category: string): NewsArticle[] {
    const articles = this._articles();
    if (category === 'all') return articles;
    return articles.filter(a => a.category === category);
  }

  getCategories(): string[] {
    return ['all', ...new Set(this._articles().map(a => a.category))];
  }
}
