import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main id="main-content" class="not-found-page">
      <h1>{{ tr.t('not_found.title') }}</h1>
      <p>{{ tr.t('not_found.subtitle') }}</p>
      <a routerLink="/" class="btn-home">{{ tr.t('not_found.go_home') }}</a>
    </main>
  `,
  styles: [`
    .not-found-page {
      min-height: 60vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 2rem;
      gap: 1rem;
    }
    .btn-home {
      background: var(--color-primary);
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: var(--radius-pill);
      text-decoration: none;
    }
  `],
})
export class NotFoundComponent {
  readonly tr = inject(TranslationService);
}
