
import React, { useState } from 'react';
import { ChevronRight, Star, Heart, Share2, ShoppingCart, Shield, Truck } from 'lucide-react';
import { Product } from '../types';
import { THEME } from '../constants';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, isWishlisted, onToggleWishlist }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Breadcrumb */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-rose-800 mb-8 transition-colors"
      >
        <ChevronRight size={20} style={{ color: THEME.primary }} />
        <span>العودة للمتجر</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Gallery */}
        <div className="space-y-4">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-white border border-rose-100 shadow-sm">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden bg-white border border-rose-50 cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
                 <img src={product.image} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="text-rose-500 font-bold uppercase tracking-widest text-sm">{product.category}</span>
            <h1 className="text-4xl font-bold luxury-font text-gray-900 leading-tight">{product.name}</h1>
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-1">
                 {[...Array(5)].map((_, i) => (
                   <Star key={i} size={18} className={i < Math.floor(product.rating) ? "fill-current" : "text-gray-200"} style={{ color: i < Math.floor(product.rating) ? THEME.primary : undefined }} />
                 ))}
                 <span className="text-sm font-medium text-gray-500 mr-2">({product.rating} تقييم)</span>
               </div>
               <div className="h-4 w-[1px] bg-gray-200"></div>
               <span className="text-sm text-green-600 font-medium">متوفر في المخزن</span>
            </div>
            <div className="text-3xl font-bold" style={{ color: THEME.primary }}>
              {product.price} <span className="text-lg font-normal">₪</span>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed text-lg">
            {product.description}
          </p>

          <div className="space-y-6 pt-6 border-t border-rose-100">
            {/* Quantity */}
            <div className="flex items-center gap-6">
              <span className="font-bold text-gray-900">الكمية</span>
              <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-rose-50 transition-colors"
                > - </button>
                <span className="px-6 font-bold">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-rose-50 transition-colors"
                > + </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button className="flex-1 bg-black text-white py-4 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-stone-800 transition-all shadow-lg active:scale-95">
                <ShoppingCart size={20} />
                إضافة للسلة
              </button>
              <button 
                onClick={() => onToggleWishlist(product)}
                className={`p-4 rounded-full border transition-all ${isWishlisted ? 'bg-rose-600 border-rose-600 text-white' : 'border-gray-200 hover:border-rose-400'}`}
              >
                <Heart size={24} fill={isWishlisted ? 'currentColor' : 'none'} style={{ color: isWishlisted ? 'white' : THEME.primary }} />
              </button>
              <button className="p-4 rounded-full border border-gray-200 hover:border-rose-400 transition-all">
                <Share2 size={24} style={{ color: THEME.primary }} />
              </button>
            </div>
          </div>

          {/* Extra Info */}
          <div className="bg-rose-50/50 p-6 rounded-2xl space-y-4">
            <div className="flex items-center gap-3 text-sm text-gray-700">
               <Shield size={20} style={{ color: THEME.primary }} />
               <p>ضمان جودة وأصالة المنتج 100%</p>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700">
               <Truck size={20} style={{ color: THEME.primary }} />
               <p>شحن مجاني للطلبات فوق 500 شيكل</p>
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div className="pt-10">
            <h3 className="text-2xl font-bold luxury-font mb-6">آراء العملاء</h3>
            <div className="space-y-6">
              {product.reviews.length > 0 ? (
                product.reviews.map(review => (
                  <div key={review.id} className="bg-white p-6 rounded-2xl border border-rose-50 shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-bold text-gray-900">{review.user}</p>
                        <div className="flex gap-0.5">
                          {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" style={{ color: THEME.primary }} />)}
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">{review.date}</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 italic">لا توجد مراجعات حالياً. كن أول من يكتب مراجعة!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
