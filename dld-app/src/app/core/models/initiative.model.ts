export interface Initiative {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  deadline?: string;    // ISO 8601 or human-readable date string
  status: 'open' | 'closed' | 'upcoming';
  ctaPrimary: { label: string; url: string };
  ctaSecondary?: { label: string; url: string };
}
