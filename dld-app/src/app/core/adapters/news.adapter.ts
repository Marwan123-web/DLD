import { NewsArticle } from '../models/news-article.model';

// Raw shape from the backend API (to be confirmed when API docs are available).
// TODO(backend): Update RawNewsItem to match actual API response schema.
export interface RawNewsItem {
  id: string | number;
  title: string;
  summary?: string;
  description?: string;
  body?: string;
  thumbnail?: string;
  image?: string;
  published_at?: string;
  created_at?: string;
  category?: string;
  slug?: string;
}

export function adaptNewsItem(raw: RawNewsItem): NewsArticle {
  return {
    id: String(raw.id),
    slug: raw.slug ?? String(raw.id),
    title: raw.title,
    excerpt: raw.summary ?? raw.description ?? '',
    body: raw.body,
    imageUrl: raw.thumbnail ?? raw.image ?? 'assets/images/news-placeholder.jpg',
    date: raw.published_at ?? raw.created_at ?? new Date().toISOString(),
    category: raw.category ?? 'General',
  };
}

export function adaptNewsItems(raws: RawNewsItem[]): NewsArticle[] {
  return raws.map(adaptNewsItem);
}
