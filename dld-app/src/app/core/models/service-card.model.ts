export interface ServiceCard {
  id: string;
  iconName: string;   // filename in assets/icons/services/ (without extension)
  title: string;
  description: string;
  linkUrl: string;
  category: 'popular' | 'owner' | 'tenant' | 'broker' | 'developer' | 'management' | 'partners';
}
