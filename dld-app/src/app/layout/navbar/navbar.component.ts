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
        path: '/news-media',
        hasDropdown: true,
        // No megaKey/megaMenu — News navigates to the hub route (routed-hub flow)
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
