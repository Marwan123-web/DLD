import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { NewsService } from '../../core/services/news.service';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { NewsCardComponent } from '../../shared/components/news-card/news-card.component';
import { NewsArticle } from '../../core/models/news-article.model';

const CATEGORY_LABELS: Record<string, string> = {
  all: 'All News',
  Transactions: 'Transactions',
  Technology: 'Technology',
  Initiatives: 'Initiatives',
  Events: 'Events',
  Regulation: 'Regulation',
  'Market Data': 'Market Data',
};

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [PageHeroComponent, NewsCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main id="main-content">
      <app-page-hero
        heading="News and Media"
        tagline="The latest updates, announcements, and insights from Dubai Land Department."
        [breadcrumbs]="breadcrumbs"
      />

      <!-- Featured news -->
      <section class="featured-section" aria-labelledby="featured-heading">
        <div class="main-container">
          <div class="section-intro">
            <span class="section-label">Latest News</span>
            <h2 id="featured-heading" class="section-title">Top Stories</h2>
          </div>
          <div class="featured-grid" role="list">
            @for (article of svc.featured(); track article.id) {
              <div role="listitem">
                <app-news-card [article]="article" variant="hero" />
              </div>
            }
          </div>
        </div>
      </section>

      <!-- All news with filter -->
      <section class="all-news-section" aria-labelledby="all-news-heading">
        <div class="main-container">
          <div class="all-news-header">
            <div class="section-intro">
              <span class="section-label">Archive</span>
              <h2 id="all-news-heading" class="section-title">All News</h2>
            </div>

            <!-- Category filter -->
            <div class="cat-filters" role="list" aria-label="Filter by category">
              @for (cat of categories(); track cat) {
                <button
                  class="cat-btn"
                  [class.active]="activeCategory() === cat"
                  (click)="setCategory(cat)"
                  [attr.aria-pressed]="activeCategory() === cat"
                  role="listitem"
                >{{ labelFor(cat) }}</button>
              }
            </div>
          </div>

          <div class="news-list" role="list">
            @for (article of filteredList(); track article.id) {
              <div role="listitem">
                <app-news-card [article]="article" variant="list" />
              </div>
            } @empty {
              <p class="no-results">No articles found in this category.</p>
            }
          </div>

          <!-- Load more / count -->
          <div class="load-more-wrap">
            <p class="result-count">
              Showing {{ filteredList().length }} of {{ filteredTotal() }} results
            </p>
            @if (showLoadMore()) {
              <button class="btn-load-more" (click)="loadMore()">Load More</button>
            }
          </div>
        </div>
      </section>
    </main>
  `,
  styleUrl: './news.component.scss',
})
export class NewsComponent {
  readonly svc = inject(NewsService);

  readonly breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'News and Media' },
  ];

  readonly categories = computed(() => this.svc.getCategories());
  readonly activeCategory = signal('all');
  private readonly _shownCount = signal(6);

  readonly filteredAll = computed<NewsArticle[]>(() =>
    this.svc.getByCategory(this.activeCategory())
  );

  constructor() {
    this.svc.load();
  }

  readonly filteredTotal = computed(() => this.filteredAll().length);

  readonly filteredList = computed<NewsArticle[]>(() =>
    this.filteredAll().slice(0, this._shownCount())
  );

  readonly showLoadMore = computed(() =>
    this._shownCount() < this.filteredTotal()
  );

  setCategory(cat: string): void {
    this.activeCategory.set(cat);
    this._shownCount.set(6);
  }

  loadMore(): void {
    this._shownCount.update(n => n + 6);
  }

  labelFor(cat: string): string {
    return CATEGORY_LABELS[cat] ?? cat;
  }
}
