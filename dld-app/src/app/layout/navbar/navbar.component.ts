import { Component, ChangeDetectionStrategy, signal, computed, HostListener, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslationService } from '../../core/services/translation.service';

interface MegaMenuColumn {
  iconPath: string;
  title: string;
  caption: string;
  links: string[];
  fullLink: string;
}

interface MegaMenuConfig {
  title: string;
  tagline: string;
  columns: MegaMenuColumn[];
}

interface NavLink {
  label: string;
  path: string;
  hasDropdown: boolean;
  exact?: boolean;
  megaKey?: string;
  megaMenu?: MegaMenuConfig;
}


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  readonly tr = inject(TranslationService);

  readonly navLinks = computed<NavLink[]>(() => {
    const t = (k: string) => this.tr.t(k);
    return [
      { label: t('nav.home'), path: '/', hasDropdown: false, exact: true },
      {
        label: t('nav.about'),
        path: '/about-dld',
        hasDropdown: true,
        // No megaKey/megaMenu — About DLD navigates to the hub route (routed-hub flow)
      },
      { label: t('nav.services'), path: '/services', hasDropdown: true },
      { label: t('nav.trainings'), path: '/trainings', hasDropdown: false },
      { label: t('nav.open_data'), path: '/open-data', hasDropdown: true },
      {
        label: t('nav.news'),
        path: '/news-media/latest-news',
        hasDropdown: true,
        megaKey: 'news',
        megaMenu: {
          title: t('nav.news'),
          tagline: t('nav.mega.news.tagline'),
          columns: [
            {
              iconPath: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7z',
              title: t('news.latest_title'),
              caption: t('nav.mega.news.latest_caption'),
              links: [
                t('news.latest_title'),
                t('nav.mega.news.link_market'),
                t('nav.mega.news.link_regulatory'),
                t('nav.mega.news.link_events'),
              ],
              fullLink: '/news-media/latest-news',
            },
            {
              iconPath: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z',
              title: t('nav.mega.news.ann_title'),
              caption: t('nav.mega.news.ann_caption'),
              links: [
                t('nav.mega.news.link_announcements'),
                t('nav.mega.news.link_initiatives'),
                t('nav.mega.news.link_press'),
              ],
              fullLink: '/news-media/announcements',
            },
            {
              iconPath: 'M15 10l4.553-2.069A1 1 0 0121 8.845v6.31a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z',
              title: t('nav.mega.news.media_title'),
              caption: t('nav.mega.news.media_caption'),
              links: [
                t('nav.mega.news.link_photos'),
                t('nav.mega.news.link_videos'),
                t('nav.mega.news.link_press_kit'),
              ],
              fullLink: '/news-media/latest-news',
            },
          ],
        },
      },
      { label: t('nav.help'), path: '/help', hasDropdown: true },
    ];
  });
  readonly isScrolled = signal(this.atHome ? false : true);
  readonly isMenuOpen = signal(false);
  readonly megaMenuOpen = signal<string | null>(null);

  @HostListener('window:scroll')
  onScroll(): void {
    const threshold = window.location.pathname === '/' ? 500 : 300;
    this.isScrolled.set(window.scrollY > threshold);
  }

  toggleMenu(): void {
    this.isMenuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  openMegaMenu(key: string): void {
    this.megaMenuOpen.set(key);
  }

  closeMegaMenu(): void {
    this.megaMenuOpen.set(null);
  }

  toggleMegaMenu(key: string): void {
    this.megaMenuOpen.update(v => v === key ? null : key);
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    if (this.megaMenuOpen()) { this.closeMegaMenu(); return; }
    this.closeMenu();
  }

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    if (!target.closest('.site-header')) {
      this.closeMegaMenu();
    }
  }

  get atHome(): boolean {
    const path = window.location.pathname;
    // Transparent navbar on home and all About DLD routes (they all have dark gradient heroes)
    return path === '/' || path.startsWith('/about-dld');
  }
}
