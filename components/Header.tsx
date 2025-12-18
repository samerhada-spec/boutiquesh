
import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { THEME } from '../constants';

interface HeaderProps {
  onSearch: (term: string) => void;
  onNavigate: (page: string) => void;
  wishlistCount: number;
}

const Header: React.FC<HeaderProps> = ({ onSearch, onNavigate, wishlistCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-rose-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
        {/* Mobile Menu Toggle */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden" style={{ color: THEME.primary }}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <div 
          onClick={() => onNavigate('home')} 
          className="flex flex-col items-center cursor-pointer group"
        >
          <h1 
            className="text-2xl md:text-3xl font-bold luxury-font transition-colors duration-300"
            style={{ color: THEME.primary }}
          >
            بوتيك صبوحة
          </h1>
          <span className="text-[10px] tracking-[0.2em] text-gray-400 uppercase font-light">Boutique Sabouha</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <button onClick={() => onNavigate('home')} className="hover:text-rose-800 transition-colors">الرئيسية</button>
          <button onClick={() => onNavigate('shop')} className="hover:text-rose-800 transition-colors">المتجر</button>
          <button onClick={() => onNavigate('offers')} className="hover:text-rose-800 transition-colors">العروض</button>
        </nav>

        {/* Search & Icons */}
        <div className="flex items-center gap-4 flex-1 justify-end">
          <form onSubmit={handleSearchSubmit} className="hidden sm:flex relative items-center max-w-xs w-full">
            <input
              type="text"
              placeholder="ابحث عن منتج..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-rose-50/50 border border-rose-100 rounded-full py-2 px-10 text-sm focus:outline-none focus:ring-2 focus:ring-rose-200 transition-all"
            />
            <Search className="absolute right-3" size={18} style={{ color: THEME.primary }} />
          </form>

          <button onClick={() => onNavigate('wishlist')} className="relative p-2 transition-colors hover:scale-110">
            <Heart size={22} style={{ color: THEME.primary }} />
            {wishlistCount > 0 && (
              <span className="absolute top-0 left-0 bg-rose-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>
          
          <button className="p-2 transition-colors hover:scale-110">
            <ShoppingBag size={22} style={{ color: THEME.primary }} />
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-rose-100 p-4 space-y-4 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-4 text-right">
            <button onClick={() => { onNavigate('home'); setIsMenuOpen(false); }} className="text-gray-700 font-medium">الرئيسية</button>
            <button onClick={() => { onNavigate('shop'); setIsMenuOpen(false); }} className="text-gray-700 font-medium">المتجر</button>
            <button onClick={() => { onNavigate('offers'); setIsMenuOpen(false); }} className="text-gray-700 font-medium">العروض</button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
