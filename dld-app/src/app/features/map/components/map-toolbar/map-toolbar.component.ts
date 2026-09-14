import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../../../../core/services/translation.service';
import { MapsStore } from '../../../../core/services/maps-store.service';
import { ThemeService } from '../../../../core/services/theme.service';

@Component({
  selector: 'app-map-toolbar',
  standalone: true,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './map-toolbar.component.html',
  styleUrl: './map-toolbar.component.scss',
})
export class MapToolbarComponent {
  readonly tr = inject(TranslationService);
  readonly store = inject(MapsStore);
  readonly theme = inject(ThemeService);

  get searchValue(): string {
    return this.store.searchQuery();
  }

  set searchValue(val: string) {
    this.store.searchQuery.set(val);
  }

  get emirateValue(): string {
    return this.store.emirateFilter();
  }

  set emirateValue(val: string) {
    this.store.emirateFilter.set(val);
  }

  get themeAriaLabel(): string {
    return this.theme.isDark()
      ? this.tr.t('map.theme_to_light')
      : this.tr.t('map.theme_to_dark');
  }
}
