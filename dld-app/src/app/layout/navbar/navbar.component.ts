import { Component, ChangeDetectionStrategy, signal, HostListener, inject } from '@angular/core';
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

const NAV_LINKS: NavLink[] = [
  { label: 'Home', path: '/', hasDropdown: false, exact: true },
  {
    label: 'About DLD',
    path: '/about-dld',
    hasDropdown: true,
    megaKey: 'about',
    megaMenu: {
      title: 'About DLD',
      tagline: 'Learn who we are, our leadership and our partnerships.',
      columns: [
        {
          iconPath: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8zm7.5 3a4 4 0 01.5 7.5',
          title: 'Who We Are',
          caption: 'Discover DLD',
          links: [
            { label: 'About DLD', routerLink: '/about-dld', fragment: 'about' },
            { label: 'Values', routerLink: '/about-dld', fragment: 'values' },
            { label: 'Vision & Mission', routerLink: '/about-dld', fragment: 'vision' },
            { label: 'Strategic Map', routerLink: '/about-dld', fragment: 'strategic-map' },
            { label: 'Our Achievements', routerLink: '/about-dld', fragment: 'achievements' },
          ],
          fullLink: '/about-dld',
        },
        {
          iconPath: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
          title: 'Leadership & Organization',
          caption: 'How we are led',
          links: [
            { label: "Management's Message", routerLink: '/about-dld/leadership', fragment: 'messages' },
            { label: 'Organization Chart', routerLink: '/about-dld/leadership', fragment: 'org-chart' },
          ],
          fullLink: '/about-dld/leadership',
        },
        {
          iconPath: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
          title: 'Partnership & International Relations',
          caption: 'Our network',
          links: [
            { label: 'Partnership', routerLink: '/about-dld/partnerships', fragment: 'commitment' },
            { label: 'Contact the Partnerships Team', routerLink: '/about-dld/partnerships', fragment: 'contact' },
            { label: 'Our Partners', routerLink: '/about-dld/partnerships', fragment: 'partners' },
          ],
          fullLink: '/about-dld/partnerships',
        },
      ],
    },
  },
  { label: 'Services', path: '/services', hasDropdown: true },
  { label: 'Trainings & Programs', path: '/trainings', hasDropdown: false },
  { label: 'Open Data & Insights', path: '/open-data', hasDropdown: true },
  {
    label: 'News and Media',
    path: '/news-media/latest-news',
    hasDropdown: true,
    megaKey: 'news',
    megaMenu: {
      title: 'News and Media',
      tagline: 'Stay updated with the latest news from Dubai Land Department.',
      columns: [
        {
          iconPath: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7z',
          title: 'Latest News',
          caption: 'All news & updates',
          links: [
            { label: 'Latest News', routerLink: '/news-media/latest-news' },
            { label: 'Market Updates', routerLink: '/news-media/latest-news' },
            { label: 'Regulatory Updates', routerLink: '/news-media/latest-news' },
            { label: 'Events & Forums', routerLink: '/news-media/latest-news' },
          ],
          fullLink: '/news-media/latest-news',
          fullLinkLabel: 'All News',
        },
        {
          iconPath: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z',
          title: 'Announcements',
          caption: 'Official announcements',
          links: [
            { label: 'Announcements', routerLink: '/news-media/announcements' },
            { label: 'Initiatives', routerLink: '/news-media/announcements' },
            { label: 'Press Releases', routerLink: '/news-media/announcements' },
          ],
          fullLink: '/news-media/announcements',
          fullLinkLabel: 'All Announcements',
        },
        {
          iconPath: 'M15 10l4.553-2.069A1 1 0 0121 8.845v6.31a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z',
          title: 'Media Center',
          caption: 'Photos & videos',
          links: [
            { label: 'Photo Gallery', routerLink: '/news-media/latest-news' },
            { label: 'Video Library', routerLink: '/news-media/latest-news' },
            { label: 'Press Kit', routerLink: '/news-media/latest-news' },
          ],
          fullLink: '/news-media/latest-news',
          fullLinkLabel: 'Media Center',
        },
      ],
    },
  },
  { label: 'Help and Support', path: '/help', hasDropdown: true },
];

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
  readonly navLinks = NAV_LINKS;
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
