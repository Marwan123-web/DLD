import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NewsService } from '../../../core/services/news.service';
import { NewsCardComponent } from '../../../shared/components/news-card/news-card.component';
import { PartnersSectionComponent } from '../../home/sections/partners-section/partners-section.component';
import { TranslationService } from '../../../core/services/translation.service';

const PAGE_SIZE = 6;

@Component({
  selector: 'app-latest-news',
  standalone: true,
  imports: [RouterLink, NewsCardComponent, PartnersSectionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './latest-news.component.html',
  styleUrl: './latest-news.component.scss',
})
export class LatestNewsComponent {
  private readonly svc = inject(NewsService);
  readonly tr = inject(TranslationService);

  readonly featured = this.svc.featured;
  readonly categories = this.svc.getCategories();

  readonly searchQuery = signal('');
  readonly selectedCategory = signal('all');
  readonly dateFrom = signal('');
  readonly dateTo = signal('');
  readonly currentPage = signal(1);

  readonly filteredArticles = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const cat = this.selectedCategory();
    const from = this.dateFrom();
    const to = this.dateTo();

    return this.svc.allArticles.filter(a => {
      const matchesCat = cat === 'all' || a.category === cat;
      const matchesSearch = !q || a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q);
      const matchesFrom = !from || a.date >= from;
      const matchesTo = !to || a.date <= to + 'T23:59:59Z';
      return matchesCat && matchesSearch && matchesFrom && matchesTo;
    });
  });

  readonly totalResults = computed(() => this.filteredArticles().length);
  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.totalResults() / PAGE_SIZE)));

  readonly pagedArticles = computed(() => {
    const page = this.currentPage();
    const start = (page - 1) * PAGE_SIZE;
    return this.filteredArticles().slice(start, start + PAGE_SIZE);
  });

  readonly pageNumbers = computed(() => {
    const total = this.totalPages();
    return Array.from({ length: total }, (_, i) => i + 1);
  });

  readonly showingFrom = computed(() => {
    const total = this.totalResults();
    if (total === 0) return 0;
    return (this.currentPage() - 1) * PAGE_SIZE + 1;
  });

  readonly showingTo = computed(() =>
    Math.min(this.currentPage() * PAGE_SIZE, this.totalResults())
  );

  setCategory(cat: string): void {
    this.selectedCategory.set(cat);
    this.currentPage.set(1);
  }

  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  goToPage(event: Event): void {
    const input = event.target as HTMLInputElement;
    const page = parseInt(input.value, 10);
    if (!isNaN(page)) {
      this.setPage(page);
    }
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
    this.currentPage.set(1);
  }

  onDateFrom(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.dateFrom.set(input.value);
    this.currentPage.set(1);
  }

  onDateTo(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.dateTo.set(input.value);
    this.currentPage.set(1);
  }

  applyFilters(): void {
    this.currentPage.set(1);
  }
}
