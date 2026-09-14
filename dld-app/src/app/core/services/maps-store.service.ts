import { Injectable, signal, computed } from '@angular/core';
import { MapLocation } from '../models/map-location.model';

@Injectable({ providedIn: 'root' })
export class MapsStore {
  // Writable signals
  readonly loading = signal<boolean>(true);
  readonly error = signal<string | null>(null);
  readonly locations = signal<MapLocation[]>([]);
  readonly searchQuery = signal<string>('');
  readonly emirateFilter = signal<string>('All');
  readonly selectedLocationId = signal<number | null>(null);
  readonly popupOpen = signal<boolean>(false);

  // Signal emitting the id of the location the user wants analytics for
  // TODO: route to analytics — subscribe to this signal in MapPageComponent
  readonly viewAnalyticsRequested = signal<number | null>(null);

  // Computed: ['All', ...sorted unique emirates]
  readonly emirates = computed<string[]>(() => {
    const unique = [...new Set(this.locations().map(l => l.emirate))].sort();
    return ['All', ...unique];
  });

  // Computed: locations filtered by searchQuery AND emirateFilter
  readonly filteredLocations = computed<MapLocation[]>(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const emirate = this.emirateFilter();
    return this.locations().filter(l => {
      const matchSearch = !query || l.name.toLowerCase().includes(query);
      const matchEmirate = emirate === 'All' || l.emirate === emirate;
      return matchSearch && matchEmirate;
    });
  });

  // Computed: currently selected MapLocation or null
  readonly selectedLocation = computed<MapLocation | null>(() => {
    const id = this.selectedLocationId();
    if (id === null) return null;
    return this.locations().find(l => l.id === id) ?? null;
  });

  setLocations(items: MapLocation[]): void {
    this.locations.set(items);
    this.loading.set(false);
  }

  selectLocation(id: number | null): void {
    this.selectedLocationId.set(id);
    this.popupOpen.set(id !== null);
  }

  resetFilters(): void {
    this.searchQuery.set('');
    this.emirateFilter.set('All');
  }

  requestViewAnalytics(id: number): void {
    // TODO: route to analytics — wire in MapPageComponent
    this.viewAnalyticsRequested.set(id);
  }
}
