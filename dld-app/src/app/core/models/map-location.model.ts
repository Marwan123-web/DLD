export interface LatLngLiteral {
  lat: number;
  lng: number;
}

export interface MapLocation {
  id: number;
  name: string;
  emirate: string;
  lat: number;
  lng: number;
  population?: number;
  description?: string;
  /** Optional district image path; shown in info card only when set (OQ-2) */
  image?: string;
  color?: string;
  paths: LatLngLiteral[];
}

export interface LocationStats {
  activityIndex: number;
  growthIndex: number;
  mobilityScore: number;
}
