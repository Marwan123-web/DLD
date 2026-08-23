import { Component, ChangeDetectionStrategy, signal, computed, HostListener, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslationService } from '../../core/services/translation.service';

interface MegaMenuLink {
  label: string;
  routerLink: string;
  fragment?: string;
}

interface MegaMenuColumn {
  iconPath: string;
  title: string;
  caption: string;
  links: MegaMenuLink[];
  fullLink: string;
  fullLinkLabel?: string;
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
        megaKey: 'about',
        megaMenu: {
          title: t('nav.about'),
          tagline: t('nav.mega.about.tagline'),
          columns: [
            {
              iconPath: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8zm7.5 3a4 4 0 01.5 7.5',
              title: t('about.who_we_are'),
              caption: t('nav.mega.about.who_caption'),
              links: [
                { label: t('nav.about'), routerLink: '/about-dld', fragment: 'about' },
                { label: t('nav.mega.about.link_values'), routerLink: '/about-dld', fragment: 'values' },
                { label: t('nav.mega.about.link_vision'), routerLink: '/about-dld', fragment: 'vision' },
                { label: t('nav.mega.about.link_strategic'), routerLink: '/about-dld', fragment: 'strategic-map' },
                { label: t('nav.mega.about.link_achievements'), routerLink: '/about-dld', fragment: 'achievements' },
              ],
              fullLink: '/about-dld',
            },
            {
              iconPath: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
              title: t('leadership.title'),
              caption: t('nav.mega.about.leadership_caption'),
              links: [
                { label: t('nav.mega.about.link_message'), routerLink: '/about-dld/leadership', fragment: 'messages' },
                { label: t('nav.mega.about.link_org'), routerLink: '/about-dld/leadership', fragment: 'org-chart' },
              ],
              fullLink: '/about-dld/leadership',
            },
            {
              iconPath: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
              title: t('nav.mega.about.partnership_title'),
              caption: t('nav.mega.about.partnership_caption'),
              links: [
                { label: t('nav.mega.about.link_partnership'), routerLink: '/about-dld/partnerships', fragment: 'commitment' },
                { label: t('nav.mega.about.link_contact_partners'), routerLink: '/about-dld/partnerships', fragment: 'contact' },
                { label: t('nav.mega.about.link_partners'), routerLink: '/about-dld/partnerships', fragment: 'partners' },
              ],
              fullLink: '/about-dld/partnerships',
            },
          ],
        },
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
                { label: t('news.latest_title'), routerLink: '/news-media/latest-news' },
                { label: t('nav.mega.news.link_market'), routerLink: '/news-media/latest-news' },
                { label: t('nav.mega.news.link_regulatory'), routerLink: '/news-media/latest-news' },
                { label: t('nav.mega.news.link_events'), routerLink: '/news-media/latest-news' },
              ],
              fullLink: '/news-media/latest-news',
              fullLinkLabel: t('nav.mega.news.full_latest'),
            },
            {
              iconPath: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z',
              title: t('nav.mega.news.ann_title'),
              caption: t('nav.mega.news.ann_caption'),
              links: [
                { label: t('nav.mega.news.link_announcements'), routerLink: '/news-media/announcements' },
                { label: t('nav.mega.news.link_initiatives'), routerLink: '/news-media/announcements' },
                { label: t('nav.mega.news.link_press'), routerLink: '/news-media/announcements' },
              ],
              fullLink: '/news-media/announcements',
              fullLinkLabel: t('nav.mega.news.full_ann'),
            },
            {
              iconPath: 'M15 10l4.553-2.069A1 1 0 0121 8.845v6.31a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z',
              title: t('nav.mega.news.media_title'),
              caption: t('nav.mega.news.media_caption'),
              links: [
                { label: t('nav.mega.news.link_photos'), routerLink: '/news-media/latest-news' },
                { label: t('nav.mega.news.link_videos'), routerLink: '/news-media/latest-news' },
                { label: t('nav.mega.news.link_press_kit'), routerLink: '/news-media/latest-news' },
              ],
              fullLink: '/news-media/latest-news',
              fullLinkLabel: t('nav.mega.news.full_media'),
            },
          ],
        },
      },
      { label: t('nav.help'), path: '/help', hasDropdown: true },
    ];
  });
  readonly isScrolled = signal(this.atHome ? false: true);
  readonly isMenuOpen = signal(false);
  readonly megaMenuOpen = signal<string | null>(null);

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set( window.scrollY > (this.atHome ? 500 :0));
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

  get atHome(){    
   return  window.location.pathname == '/'
  }
}
