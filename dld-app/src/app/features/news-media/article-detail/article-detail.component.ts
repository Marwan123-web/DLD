import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { DatePipe } from '@angular/common';
import { NewsService } from '../../../core/services/news.service';
import { PartnersSectionComponent } from '../../home/sections/partners-section/partners-section.component';
import { TranslationService } from '../../../core/services/translation.service';

@Component({
  selector: 'app-news-media-article-detail',
  standalone: true,
  imports: [RouterLink, DatePipe, PartnersSectionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.scss',
})
export class ArticleDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly svc = inject(NewsService);
  readonly tr = inject(TranslationService);

  private readonly articleId = toSignal(
    this.route.params.pipe(map(p => p['id'] as string)),
    { initialValue: '' }
  );

  readonly article = computed(() => {
    const id = this.articleId();
    return this.svc.allArticles().find(a => a.id === id) ?? null;
  });

  readonly relatedArticles = computed(() => {
    const current = this.article();
    if (!current) return this.svc.allArticles().slice(0, 3);
    return this.svc.allArticles()
      .filter(a => a.id !== current.id && a.category === current.category)
      .slice(0, 3)
      .concat(
        this.svc.allArticles().filter(
          a => a.id !== current.id && a.category !== current.category
        )
      )
      .slice(0, 3);
  });

  readonly relatedCategories = computed(() => {
    const cats = new Set(this.relatedArticles().map(a => a.category));
    return Array.from(cats);
  });
}
