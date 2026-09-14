import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { TranslationService } from '../../../../core/services/translation.service';
import { MapsStore } from '../../../../core/services/maps-store.service';
import { MapLocation } from '../../../../core/models/map-location.model';
import { formatPopulation } from '../../utils/map-projection.utils';

@Component({
  selector: 'app-location-list-sidebar',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './location-list-sidebar.component.html',
  styleUrl: './location-list-sidebar.component.scss',
})
export class LocationListSidebarComponent {
  readonly tr = inject(TranslationService);
  readonly store = inject(MapsStore);

  selectLocation(loc: MapLocation): void {
    this.store.selectLocation(loc.id);
  }

  formatPop(pop?: number): string {
    return pop ? formatPopulation(pop) : '—';
  }

  isActive(loc: MapLocation): boolean {
    return this.store.selectedLocationId() === loc.id;
  }
}
