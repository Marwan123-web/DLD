export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body?: string;
  imageUrl: string;
  date: string;       // ISO 8601
  category: string;
}
