import { ServiceCard } from '../models/service-card.model';

// TODO(backend): Update RawServiceItem to match actual API response schema.
export interface RawServiceItem {
  id: string | number;
  name: string;
  description?: string;
  icon?: string;
  url?: string;
  audience?: string;
}

export function adaptServiceItem(raw: RawServiceItem): ServiceCard {
  return {
    id: String(raw.id),
    iconName: raw.icon ?? 'default',
    title: raw.name,
    description: raw.description ?? '',
    linkUrl: raw.url ?? '#',
    category: (raw.audience as ServiceCard['category']) ?? 'popular',
  };
}

export function adaptServiceItems(raws: RawServiceItem[]): ServiceCard[] {
  return raws.map(adaptServiceItem);
}
