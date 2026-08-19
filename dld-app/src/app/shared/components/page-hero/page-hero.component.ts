import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';

export interface Breadcrumb {
  label: string;
  url?: string;
}

@Component({
  selector: 'app-page-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-hero" aria-label="Page header">
      @if (watermark()) {
        <div class="hero-watermark" aria-hidden="true">{{ watermark() }}</div>
      }
      <div class="main-container hero-body">
        <div class="hero-text">
          @if (breadcrumbs().length) {
            <nav aria-label="Breadcrumb" class="hero-breadcrumb">
              <ol class="bc-list">
                @for (crumb of breadcrumbs(); track crumb.label; let last = $last) {
                  <li class="bc-item">
                    @if (!last && crumb.url) {
                      <a [href]="crumb.url" class="bc-link">{{ crumb.label }}</a>
                    } @else {
                      <span [class.bc-current]="last">{{ crumb.label }}</span>
                    }
                    @if (!last) {
                      <span class="bc-sep" aria-hidden="true">
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" width="12" height="12">
                          <path d="M6 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                      </span>
                    }
                  </li>
                }
              </ol>
            </nav>
          }
          <h1 class="hero-title">{{ resolvedTitle() }}</h1>
          @if (resolvedSubtitle()) {
            <p class="hero-subtitle">{{ resolvedSubtitle() }}</p>
          }
        </div>
        @if (illustrationSrc()) {
          <div class="hero-illustration" aria-hidden="true">
            <img [src]="illustrationSrc()" [alt]="illustrationAlt()" class="hero-illus-img" />
          </div>
        }
      </div>
    </section>
  `,
  styleUrl: './page-hero.component.scss',
})
export class PageHeroComponent {
  /** New API */
  readonly title = input<string>('');
  readonly subtitle = input<string>('');
  /** Legacy API — kept for backward compatibility */
  readonly heading = input<string>('');
  readonly tagline = input<string>('');

  readonly breadcrumbs = input<Breadcrumb[]>([]);
  readonly illustrationSrc = input<string>('');
  readonly illustrationAlt = input<string>('');
  readonly watermark = input<string>('');
  readonly theme = input<'green'>('green');

  /** Resolves title from either new or legacy input */
  readonly resolvedTitle = computed(() => this.title() || this.heading());
  /** Resolves subtitle from either new or legacy input */
  readonly resolvedSubtitle = computed(() => this.subtitle() || this.tagline());
}
