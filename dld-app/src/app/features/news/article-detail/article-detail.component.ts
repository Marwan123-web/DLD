import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { PageHeroComponent } from '../../../shared/components/page-hero/page-hero.component';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [PageHeroComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main id="main-content">
      <app-page-hero
        heading="Article"
        [breadcrumbs]="breadcrumbs"
      />
      <div class="container stub-body">
        <p class="stub-note">
          Article detail page — full implementation out of scope for this phase.
        </p>
        <a routerLink="/news" class="back-link">← Back to News</a>
      </div>
    </main>
  `,
  styles: [`
    #main-content{
      padding-top: 120px;
    }
    .stub-body {
      padding-block: 4rem;
      text-align: center;
    }
    .stub-note {
      font-size: var(--text-base);
      color: var(--color-text-muted);
      margin: 0 0 1.5rem;
    }
    .back-link {
      color: var(--color-primary);
      font-weight: var(--weight-medium);
      text-decoration: none;
      &:hover { text-decoration: underline; }
    }
  `],
})
export class ArticleDetailComponent {
  readonly breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'News and Media', url: '/news' },
    { label: 'Article' },
  ];
}
