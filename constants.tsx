
import { Product } from './types';

/**
 * لوحة التحكم في المنتجات الأولية
 */
export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'سيروم فيتامين سي المطور',
    description: 'سيروم مركز يحتوي على حمض الهيالورونيك وفيتامين سي لتفتيح البشرة ومحاربة علامات الشيخوخة، يمنحك إشراقة فورية.',
    price: 180,
    category: 'عناية بالبشرة',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800',
    isNew: true,
    rating: 4.8,
    reviews: [
      { id: 'r1', user: 'ليلى أحمد', comment: 'أفضل سيروم جربته في حياتي، وجهي صار مشرق جداً!', rating: 5, date: '2024-05-15' }
    ]
  },
  {
    id: '2',
    name: 'لوحة ظلال العيون الذهبية',
    description: '12 لوناً من الدرجات الدافئة والمخملية، ثبات عالي وسهولة في الدمج، مثالية للإطلالات اليومية والمسائية.',
    price: 240,
    category: 'مكياج',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800',
    isFeatured: true,
    rating: 4.9,
    reviews: []
  },
  {
    id: '4',
    name: 'عطر مسك صبوحة الخاص',
    description: 'رائحة المسك الأبيض النقي مع لمسات من زهور الياسمين، عطر هادئ ويدوم لأكثر من 24 ساعة.',
    price: 350,
    category: 'عطور',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800',
    isFeatured: true,
    rating: 5.0,
    reviews: [
      { id: 'r2', user: 'نادية عمر', comment: 'ريحته خيال وهادية، الكل بيسألني شو حاطة.', rating: 5, date: '2024-06-01' }
    ]
  }
];

export const CATEGORIES = ['الكل', 'عناية بالبشرة', 'مكياج', 'عطور', 'عناية بالشعر', 'أدوات تجميل'];

export const THEME = {
  background: '#fdf2f4',
  primary: '#a6314a',    // لون العناوين المحدث (درجة عنابية فاخرة)
  secondary: '#d4af37',
  text: '#1a1a1a',
};

export const CONTACT_INFO = {
  address: 'فلسطين، قلقيلية - شارع نابلس',
  phone: '+970 599 766 630',
  facebook: 'https://www.facebook.com/people/%D8%A8%D9%88%D8%AA%D9%8A%D9%83-%D8%B5%D8%A8%D9%88%D8%AD%D8%A9/100058747969334/',
  instagram: 'https://www.instagram.com/sabouha_boutique/',
  email: 'sabouha.boutique@gmail.com'
};
