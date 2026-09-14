// Equirectangular projection: UAE bounding box → SVG viewBox 0 0 1000 600
// Spec §2b — lat 23.5–26.2, lng 51.5–57.0

export const VIEWBOX_W = 1000;
export const VIEWBOX_H = 600;

const LNG_MIN = 51.5;
const LNG_MAX = 57.0;
const LAT_MIN = 23.5;
const LAT_MAX = 26.2;

export function lngToX(lng: number): number {
  return ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * VIEWBOX_W;
}

export function latToY(lat: number): number {
  // SVG Y increases downward; geographic lat increases upward
  return ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * VIEWBOX_H;
}

export function pathsToPoints(paths: { lat: number; lng: number }[]): string {
  return paths
    .map(p => `${lngToX(p.lng).toFixed(2)},${latToY(p.lat).toFixed(2)}`)
    .join(' ');
}

export function formatPopulation(pop: number): string {
  if (pop >= 1_000_000) return `${(pop / 1_000_000).toFixed(1)}M`;
  if (pop >= 1_000) return `${Math.round(pop / 1_000)}K`;
  return String(pop);
}

/** Compute screen pixel position for an SVG-space coordinate given current pan/zoom. */
export function toScreenPx(
  svgX: number,
  svgY: number,
  scale: number,
  tx: number,
  ty: number,
  containerW: number,
  containerH: number,
): { x: number; y: number } {
  return {
    x: (svgX * scale + tx) * (containerW / VIEWBOX_W),
    y: (svgY * scale + ty) * (containerH / VIEWBOX_H),
  };
}

/** Inverse projection: screen pixel → SVG raw coordinate. */
export function toSvgRaw(
  pxX: number,
  pxY: number,
  scale: number,
  tx: number,
  ty: number,
  containerW: number,
  containerH: number,
): { svgX: number; svgY: number } {
  const svgX = (pxX * VIEWBOX_W) / containerW;
  const svgY = (pxY * VIEWBOX_H) / containerH;
  return {
    svgX: (svgX - tx) / scale,
    svgY: (svgY - ty) / scale,
  };
}

/** Convert SVG raw coord back to lat/lng. */
export function svgToLatLng(rawX: number, rawY: number): { lat: number; lng: number } {
  const lng = (rawX / VIEWBOX_W) * (LNG_MAX - LNG_MIN) + LNG_MIN;
  const lat = LAT_MAX - (rawY / VIEWBOX_H) * (LAT_MAX - LAT_MIN);
  return { lat, lng };
}
