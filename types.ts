
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  isNew?: boolean;
  isFeatured?: boolean;
  rating: number;
  reviews: Review[];
  colors?: string[];
}

export type Category = 'عناية بالبشرة' | 'مكياج' | 'عطور' | 'عناية بالشعر' | 'أدوات تجميل';

export interface Review {
  id: string;
  user: string;
  comment: string;
  rating: number;
  date: string;
}

export interface CartItem extends Product {
  quantity: number;
}
