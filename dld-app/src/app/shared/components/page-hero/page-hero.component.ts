import { Component, ChangeDetectionStrategy, input } from '@angular/core';

export interface Breadcrumb {
  label: string;
  url?: string;
}

@Component({
  selector: 'app-page-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-hero" [style.background-image]="bgImage()">
      <div class="hero-overlay" aria-hidden="true"></div>
      <div class="container hero-inner">
        @if (breadcrumbs().length) {
          <nav aria-label="Breadcrumb" class="breadcrumb-nav">
            <ol class="breadcrumb-list">
              @for (crumb of breadcrumbs(); track crumb.label; let last = $last) {
                <li class="breadcrumb-item" [class.active]="last">
                  @if (!last && crumb.url) {
                    <a [href]="crumb.url">{{ crumb.label }}</a>
                  } @else {
                    <span>{{ crumb.label }}</span>
                  }
                  @if (!last) { <span class="sep" aria-hidden="true">/</span> }
                </li>
              }
            </ol>
          </nav>
        }
        <h1 class="hero-heading">{{ heading() }}</h1>
        @if (tagline()) {
          <p class="hero-tagline">{{ tagline() }}</p>
        }
      </div>
    </section>
  `,
  styleUrl: './page-hero.component.scss',
})
export class PageHeroComponent {
  readonly heading     = input.required<string>();
  readonly tagline     = input<string>('');
  readonly breadcrumbs = input<Breadcrumb[]>([]);
  readonly bgImage     = input<string>('');
}
