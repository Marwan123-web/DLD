import {
  Component, ChangeDetectionStrategy, inject, signal, HostListener, computed
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslationService } from '../../core/services/translation.service';

interface NavLink {
  labelKey: string;
  path: string;
  exact: boolean;
  hasDropdown?: boolean;
  dropdownId?: string;
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

  readonly navLinks: NavLink[] = [
    { labelKey: 'nav.home',      path: '/',          exact: true  },
    { labelKey: 'nav.about',     path: '/about',     exact: false },
    { labelKey: 'nav.services',  path: '/services',  exact: false, hasDropdown: true, dropdownId: 'services'  },
    { labelKey: 'nav.trainings', path: '/trainings', exact: false, hasDropdown: true, dropdownId: 'trainings' },
    { labelKey: 'nav.open_data', path: '/open-data', exact: false, hasDropdown: true, dropdownId: 'open_data' },
    { labelKey: 'nav.news',      path: '/news',      exact: false, hasDropdown: true, dropdownId: 'news'      },
    { labelKey: 'nav.help',      path: '/help',      exact: false, hasDropdown: true, dropdownId: 'help'      },
  ];

  isMenuOpen  = signal(false);
  activeDropdown = signal<string | null>(null);

  readonly menuLabel = computed(() =>
    this.tr.t(this.isMenuOpen() ? 'nav.menu_close' : 'nav.menu_open')
  );

  toggleMenu(): void {
    this.isMenuOpen.update(v => !v);
    if (!this.isMenuOpen()) this.activeDropdown.set(null);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
    this.activeDropdown.set(null);
  }

  toggleDropdown(id: string): void {
    this.activeDropdown.update(v => (v === id ? null : id));
  }

  isDropdownOpen(id: string): boolean {
    return this.activeDropdown() === id;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isMenuOpen()) this.closeMenu();
    else this.activeDropdown.set(null);
  }
}
