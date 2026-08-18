import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { NewsArticle } from '../../../core/models/news-article.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (variant() === 'hero') {
      <article class="nc-hero">
        <a [href]="'/news/' + article().slug" class="nc-hero-link" [attr.aria-label]="article().title">
          <div class="nc-hero-img-wrap">
            <img [src]="article().imageUrl" [alt]="article().title" class="nc-hero-img" loading="lazy" />
            <span class="nc-category">{{ article().category }}</span>
          </div>
          <div class="nc-hero-body">
            <time class="nc-date" [attr.datetime]="article().date">
              {{ article().date | date:'d MMM yyyy' }}
            </time>
            <h3 class="nc-hero-title">{{ article().title }}</h3>
            <p class="nc-hero-excerpt">{{ article().excerpt }}</p>
          </div>
        </a>
      </article>
    }

    @if (variant() === 'list') {
      <article class="nc-list">
        <a [href]="'/news/' + article().slug" class="nc-list-img-wrap" [attr.aria-label]="article().title + ' — read more'">
          <img [src]="article().imageUrl" [alt]="" class="nc-list-img" loading="lazy" aria-hidden="true" />
        </a>
        <div class="nc-list-body">
          <div class="nc-meta">
            <span class="nc-category">{{ article().category }}</span>
            <time class="nc-date" [attr.datetime]="article().date">
              {{ article().date | date:'d MMM yyyy' }}
            </time>
          </div>
          <h3 class="nc-list-title">
            <a [href]="'/news/' + article().slug">{{ article().title }}</a>
          </h3>
          <p class="nc-list-excerpt">{{ article().excerpt }}</p>
          <a [href]="'/news/' + article().slug" class="nc-read-more">
            Read More
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="14" height="14" aria-hidden="true">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </a>
        </div>
      </article>
    }
  `,
  styleUrl: './news-card.component.scss',
})
export class NewsCardComponent {
  readonly article = input.required<NewsArticle>();
  readonly variant = input<'hero' | 'list'>('list');
}
