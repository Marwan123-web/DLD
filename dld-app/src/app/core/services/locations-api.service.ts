import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MapLocation, LocationStats } from '../models/map-location.model';

// Seed data verbatim from MAP-SPEC.md §3b (OQ-3: hardcoded paths, not GeoJSON)
const LOCATIONS: MapLocation[] = [
  {
    id: 101,
    name: 'Dubai Marina',
    emirate: 'Dubai',
    lat: 25.0772, lng: 55.139,
    population: 55000,
    description: 'High-density waterfront district with residential towers, retail promenade, and marina.',
    image: 'assets/images/districts/dubai-marina.jpg',
    color: '#4F46E5',
    paths: [
      { lat: 25.0915, lng: 55.1265 }, { lat: 25.0925, lng: 55.1485 },
      { lat: 25.0805, lng: 55.1545 }, { lat: 25.0665, lng: 55.1510 },
      { lat: 25.0615, lng: 55.1365 }, { lat: 25.0695, lng: 55.1245 },
    ],
  },
  {
    id: 102,
    name: 'Downtown Dubai',
    emirate: 'Dubai',
    lat: 25.1972, lng: 55.2744,
    population: 80000,
    description: 'Iconic mixed-use hub around Burj Khalifa and Dubai Mall, with premium real estate.',
    color: '#06B6D4',
    paths: [
      { lat: 25.2140, lng: 55.2590 }, { lat: 25.2145, lng: 55.2865 },
      { lat: 25.2015, lng: 55.2940 }, { lat: 25.1855, lng: 55.2895 },
      { lat: 25.1800, lng: 55.2705 }, { lat: 25.1905, lng: 55.2560 },
    ],
  },
  {
    id: 201,
    name: 'Al Reem Island',
    emirate: 'Abu Dhabi',
    lat: 24.4995, lng: 54.4089,
    population: 120000,
    description: 'Fast-growing island community near Abu Dhabi city center with modern residential zones.',
    color: '#22C55E',
    paths: [
      { lat: 24.5180, lng: 54.3890 }, { lat: 24.5235, lng: 54.4175 },
      { lat: 24.5070, lng: 54.4335 }, { lat: 24.4860, lng: 54.4290 },
      { lat: 24.4780, lng: 54.4045 }, { lat: 24.4895, lng: 54.3870 },
    ],
  },
  {
    id: 202,
    name: 'Khalifa City',
    emirate: 'Abu Dhabi',
    lat: 24.4244, lng: 54.5776,
    population: 150000,
    description: 'Suburban district popular for families, villas, and proximity to major highways and schools.',
    color: '#F97316',
    paths: [
      { lat: 24.4530, lng: 54.5420 }, { lat: 24.4545, lng: 54.6125 },
      { lat: 24.4305, lng: 54.6280 }, { lat: 24.3980, lng: 54.6195 },
      { lat: 24.3895, lng: 54.5675 }, { lat: 24.4050, lng: 54.5385 },
    ],
  },
  {
    id: 301,
    name: 'Al Majaz',
    emirate: 'Sharjah',
    lat: 25.33, lng: 55.385,
    population: 65000,
    description: 'Urban waterfront neighborhood near Khalid Lagoon with parks, cultural venues, and cafes.',
    color: '#A855F7',
    paths: [
      { lat: 25.3475, lng: 55.3660 }, { lat: 25.3480, lng: 55.3990 },
      { lat: 25.3335, lng: 55.4075 }, { lat: 25.3150, lng: 55.4020 },
      { lat: 25.3115, lng: 55.3780 }, { lat: 25.3230, lng: 55.3625 },
    ],
  },
];

@Injectable({ providedIn: 'root' })
export class LocationsApiService {
  // TODO(backend): Replace of(LOCATIONS) with HttpClient call to DLD Locations API
  getLocations(): Observable<MapLocation[]> {
    return of(LOCATIONS).pipe(delay(250));
  }

  // TODO(backend): Replace with GET /locations/:id
  getLocationById(id: number): Observable<MapLocation | undefined> {
    return of(LOCATIONS.find(l => l.id === id)).pipe(delay(250));
  }

  // TODO(backend): Replace with GET /locations/:id/stats (OQ-7: not rendered yet)
  getLocationStats(_id: number): Observable<LocationStats> {
    return of({ activityIndex: 74, growthIndex: 61, mobilityScore: 69 }).pipe(delay(200));
  }
}
