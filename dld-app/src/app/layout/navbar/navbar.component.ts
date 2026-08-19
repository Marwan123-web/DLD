import { Component, ChangeDetectionStrategy, signal, computed, HostListener, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslationService } from '../../core/services/translation.service';

interface NavLink {
  label: string;
  path: string;
  hasDropdown: boolean;
  exact?: boolean;
  megaKey?: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Home',                 path: '/',           hasDropdown: false, exact: true },
  { label: 'About DLD',            path: '/about-dld',  hasDropdown: true,  megaKey: 'about' },
  { label: 'Services',             path: '/services',   hasDropdown: true  },
  { label: 'Trainings & Programs', path: '/trainings',  hasDropdown: false },
  { label: 'Open Data & Insights', path: '/open-data',  hasDropdown: true  },
  { label: 'News and Media',       path: '/news',       hasDropdown: true  },
  { label: 'Help and Support',     path: '/help',       hasDropdown: true  },
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
  readonly isScrolled = signal(false);
  readonly isMenuOpen = signal(false);
  readonly megaMenuOpen = signal<string | null>(null);

  readonly isAboutActive = computed(() => {
    return this.megaMenuOpen() === 'about';
  });

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 100);
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
    if (!target.closest('.has-mega-menu')) {
      this.closeMegaMenu();
    }
  }
}
