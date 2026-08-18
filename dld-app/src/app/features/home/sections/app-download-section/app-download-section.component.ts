import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { TranslationService } from '../../../../core/services/translation.service';

const STORES = [
  {
    id: 'appstore',
    label: 'App Store',
    sublabel: 'Download on the',
    url: '#',
    // Apple logo path
    iconPath: 'M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z',
  },
  {
    id: 'googleplay',
    label: 'Google Play',
    sublabel: 'Get it on',
    url: '#',
    // Play store triangle path
    iconPath: 'M3.18 23.77c.22.12.47.17.72.14l12.9-7.45L13.5 13l-10.32 10.77zM.5 1.12A1.5 1.5 0 000 2.25v19.5c0 .46.18.88.5 1.13L.62 23 12.38 11.25v-.5L.62 1z M20.72 10.27l-2.84-1.64-3.38 3.37 3.38 3.38 2.87-1.66a1.5 1.5 0 000-2.58l-.03.13zM3.18.23L13.5 11l3.3-3.32L3.9.09a1.5 1.5 0 00-.72-.14c-.03.09 0 .19 0 .28z',
  },
  {
    id: 'appgallery',
    label: 'AppGallery',
    sublabel: 'Explore it on',
    url: '#',
    // Simple H icon representing Huawei
    iconPath: 'M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 0h6v6h-6z',
  },
];

@Component({
  selector: 'app-app-download-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="app-section" aria-label="Download DLD App">
      <div class="container">
        <div class="app-layout">
          <div class="app-text">
            <span class="app-eyebrow">Mobile App</span>
            <h2 class="app-title">Dubai Land Department in your pocket</h2>
            <p class="app-desc">
              Access all DLD services, track your transactions, and get real-time property
              insights — anytime, anywhere.
            </p>
            <div class="store-badges">
              @for (store of stores; track store.id) {
                <a [href]="store.url" class="store-badge" [attr.aria-label]="store.sublabel + ' ' + store.label">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" aria-hidden="true">
                    <path [attr.d]="store.iconPath"/>
                  </svg>
                  <span class="badge-text">
                    <small>{{ store.sublabel }}</small>
                    <strong>{{ store.label }}</strong>
                  </span>
                </a>
              }
            </div>
          </div>

          <div class="app-mockup" aria-hidden="true">
            <img src="assets/images/app-mockup.png" alt="" width="320" height="480" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './app-download-section.component.scss',
})
export class AppDownloadSectionComponent {
  readonly tr = inject(TranslationService);
  readonly stores = STORES;
}
