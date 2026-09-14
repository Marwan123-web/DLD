import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { TranslationService } from '../../core/services/translation.service';
import { MapToolbarComponent } from './components/map-toolbar/map-toolbar.component';
import { LocationListSidebarComponent } from './components/location-list-sidebar/location-list-sidebar.component';
import { MapContainerComponent } from './components/map-container/map-container.component';

@Component({
  selector: 'app-map-page',
  standalone: true,
  imports: [MapToolbarComponent, LocationListSidebarComponent, MapContainerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.scss',
})
export class MapPageComponent {
  readonly tr = inject(TranslationService);
}
