import { Component, ChangeDetectionStrategy, signal, HostListener, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslationService } from '../../core/services/translation.service';

interface NavLink {
  label: string;
  path: string;
  hasDropdown: boolean;
  exact?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Home',                 path: '/',          hasDropdown: false, exact: true },
  { label: 'About DLD',            path: '/about',     hasDropdown: true  },
  { label: 'Services',             path: '/services',  hasDropdown: true  },
  { label: 'Trainings & Programs', path: '/trainings', hasDropdown: false },
  { label: 'Open Data & Insights', path: '/open-data', hasDropdown: true  },
  { label: 'News and Media',       path: '/news',      hasDropdown: true  },
  { label: 'Help and Support',     path: '/help',      hasDropdown: true  },
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

  @HostListener('document:keydown.escape')
  onEsc(): void {
    this.closeMenu();
  }
}
