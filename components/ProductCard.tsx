
import React from 'react';
import { Heart, Star, Eye } from 'lucide-react';
import { Product } from '../types';
import { THEME } from '../constants';

interface ProductCardProps {
  product: Product;
  onView: (id: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onView, isWishlisted, onToggleWishlist }) => {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-rose-50">
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-rose-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              جديد
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-amber-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              مميز
            </span>
          )}
        </div>

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button 
            onClick={() => onToggleWishlist(product)}
            className={`p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 ${isWishlisted ? 'bg-rose-600 text-white' : 'bg-white hover:bg-rose-50'}`}
          >
            <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} style={{ color: isWishlisted ? 'white' : THEME.primary }} />
          </button>
          <button 
            onClick={() => onView(product.id)}
            className="p-3 bg-white rounded-full shadow-lg hover:bg-rose-50 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75"
          >
            <Eye size={20} style={{ color: THEME.primary }} />
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="p-5 text-center">
        <p className="text-xs text-rose-400 font-medium mb-1 uppercase tracking-widest">{product.category}</p>
        <h3 className="text-lg font-bold mb-2 group-hover:text-rose-800 transition-colors truncate px-2" style={{ color: THEME.text }}>
          {product.name}
        </h3>
        
        <div className="flex items-center justify-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className={i < Math.floor(product.rating) ? "fill-current" : "text-gray-200"} style={{ color: i < Math.floor(product.rating) ? THEME.primary : undefined }} />
          ))}
          <span className="text-xs text-gray-400 mr-1">({product.rating})</span>
        </div>

        <div className="flex items-center justify-center gap-2">
          <span className="text-xl font-bold" style={{ color: THEME.primary }}>
            {product.price} <span className="text-sm font-normal">₪</span>
          </span>
        </div>
      </div>
      
      {/* Quick Add Button */}
      <button 
        onClick={() => onView(product.id)}
        className="w-full py-3 bg-stone-900 text-white font-bold text-sm hover:bg-black transition-colors"
      >
        عرض التفاصيل
      </button>
    </div>
  );
};

export default ProductCard;
