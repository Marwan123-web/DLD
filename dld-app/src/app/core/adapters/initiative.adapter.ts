import { Initiative } from '../models/initiative.model';

// TODO(backend): Update RawInitiative to match actual API response schema.
export interface RawInitiative {
  id: string | number;
  title: string;
  description?: string;
  image?: string;
  deadline?: string;
  status?: string;
  cta_primary_label?: string;
  cta_primary_url?: string;
  cta_secondary_label?: string;
  cta_secondary_url?: string;
}

export function adaptInitiative(raw: RawInitiative): Initiative {
  return {
    id: String(raw.id),
    title: raw.title,
    description: raw.description ?? '',
    imageUrl: raw.image ?? 'assets/images/news-placeholder.jpg',
    deadline: raw.deadline,
    status: (raw.status as Initiative['status']) ?? 'open',
    ctaPrimary: {
      label: raw.cta_primary_label ?? 'Apply now',
      url: raw.cta_primary_url ?? '#',
    },
    ctaSecondary: raw.cta_secondary_label
      ? { label: raw.cta_secondary_label, url: raw.cta_secondary_url ?? '#' }
      : undefined,
  };
}

export function adaptInitiatives(raws: RawInitiative[]): Initiative[] {
  return raws.map(adaptInitiative);
}
