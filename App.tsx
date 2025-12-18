
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import Features from './components/Features';
import Footer from './components/Footer';
import ProductDetail from './components/ProductDetail';
import AdminDashboard from './components/AdminDashboard';
import { CATEGORIES, THEME, CONTACT_INFO } from './constants';
import { Product } from './types';
import { dbService } from './services/api';
import { Sparkles, TrendingUp, Heart, ShieldCheck, Loader2, MessageSquareText } from 'lucide-react';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // تحميل المنتجات من قاعدة البيانات عند فتح التطبيق
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const data = await dbService.getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleUpdateProducts = async (newProducts: Product[]) => {
    setIsLoading(true);
    try {
      await dbService.saveProducts(newProducts);
      setProducts(newProducts);
    } catch (error) {
      alert("فشل تحديث قاعدة البيانات");
    } finally {
      setIsLoading(false);
    }
  };

  const tickerItems = useMemo(() => {
    return products.filter(p => p.isNew || p.isFeatured);
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products;
    if (selectedCategory !== 'الكل') {
      result = result.filter(p => p.category === selectedCategory);
    }
    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return result;
  }, [selectedCategory, searchQuery, products]);

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) return prev.filter(p => p.id !== product.id);
      return [...prev, product];
    });
  };

  const handleProductView = (id: string) => {
    setSelectedProductId(id);
    setActivePage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedProduct = useMemo(() => 
    products.find(p => p.id === selectedProductId), 
    [selectedProductId, products]
  );

  const handleConsultation = () => {
    const whatsappUrl = `https://wa.me/${CONTACT_INFO.phone.replace(/\s+/g, '')}?text=${encodeURIComponent('مرحباً بوتيك صبوحة، أود الحصول على استشارة بخصوص المنتجات المناسبة لبشرتي.')}`;
    window.open(whatsappUrl, '_blank');
  };

  // شاشة تحميل فاخرة
  if (isLoading && products.length === 0) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#fdf2f4]" style={{ color: THEME.primary }}>
        <div className="relative">
          <Loader2 className="animate-spin" size={60} strokeWidth={1} />
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles size={20} className="animate-pulse" />
          </div>
        </div>
        <h2 className="mt-6 luxury-font text-2xl animate-pulse">يتم تحميل عالم الجمال...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: THEME.background }}>
      <Header 
        onSearch={setSearchQuery} 
        onNavigate={(page) => {
          setActivePage(page);
          setSelectedProductId(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        wishlistCount={wishlist.length}
      />

      {/* Admin Toggle Floating Button - Hidden by default, appears on hover */}
      <div className="fixed bottom-0 left-0 w-24 h-24 z-[60] group pointer-events-none">
        <button 
          onClick={() => setIsAdminOpen(true)}
          className="absolute bottom-4 left-4 p-3 rounded-full bg-stone-900 text-white shadow-2xl transition-all duration-500 opacity-0 group-hover:opacity-100 pointer-events-auto hover:scale-110 active:scale-95"
          title="لوحة الإدارة"
        >
          <ShieldCheck size={20} />
        </button>
      </div>

      {isAdminOpen && (
        <AdminDashboard 
          products={products} 
          onUpdateProducts={handleUpdateProducts} 
          onClose={() => setIsAdminOpen(false)} 
        />
      )}

      {/* Ticker / New Arrivals Ribbon */}
      {tickerItems.length > 0 && (
        <div className="bg-stone-900 text-white py-3 overflow-hidden whitespace-nowrap border-b border-rose-900/20">
          <div className="flex animate-marquee">
            {[...tickerItems, ...tickerItems].map((item, idx) => (
              <div 
                key={`${item.id}-${idx}`}
                className="inline-flex items-center gap-4 mx-8 cursor-pointer hover:text-rose-300 transition-colors"
                onClick={() => handleProductView(item.id)}
              >
                <Sparkles size={16} style={{ color: THEME.secondary }} />
                <span className="text-sm font-bold tracking-wide">{item.name} {item.isNew ? 'أضيف حديثاً' : 'منتج مميز'}</span>
                <span className="text-xs opacity-60">|</span>
                <span className="text-sm font-bold text-amber-200">اكتشفي الآن</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <main className="flex-grow">
        {activePage === 'home' && (
          <div className="space-y-20 pb-20">
            <Hero />
            
            <section className="max-w-7xl mx-auto px-4">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div className="space-y-2 text-right">
                  <div className="flex items-center gap-2 font-bold tracking-[0.2em] uppercase text-[10px] justify-end opacity-60">
                    <span>Explore Collections</span>
                    <TrendingUp size={12} />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold luxury-font" style={{ color: THEME.primary }}>كولكشن صبوحة المتميز</h2>
                </div>

                <div className="flex flex-wrap gap-2 justify-end">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-6 py-2 rounded-full text-sm font-bold transition-all border ${
                        selectedCategory === cat 
                          ? 'bg-stone-900 text-white border-stone-900' 
                          : 'bg-white text-gray-600 border-rose-100 hover:border-rose-400'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredProducts.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onView={handleProductView}
                      isWishlisted={wishlist.some(p => p.id === product.id)}
                      onToggleWishlist={toggleWishlist}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center space-y-4">
                  <p className="text-gray-400 text-xl italic text-center">لم نجد أي منتجات تطابق بحثك حالياً.</p>
                  <button 
                    onClick={() => {setSearchQuery(''); setSelectedCategory('الكل');}} 
                    className="font-bold hover:underline"
                    style={{ color: THEME.primary }}
                  >
                    عرض جميع المنتجات
                  </button>
                </div>
              )}
            </section>

            <Features />

            {/* Consultation Section (Replaced Special Offers) */}
            <section className="bg-stone-900 text-white py-24 relative overflow-hidden rounded-[3rem] mx-4 md:mx-10 shadow-2xl">
               <div className="absolute top-0 right-0 w-96 h-96 bg-rose-900/40 blur-[150px] rounded-full"></div>
               <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 blur-[150px] rounded-full"></div>
               
               <div className="max-w-7xl mx-auto px-10 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div className="space-y-8 text-right">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600/20 border border-rose-600/30 rounded-full text-rose-400 text-xs font-bold tracking-widest uppercase">
                       <Sparkles size={14} />
                       <span>خدمة حصرية لزبائن صبوحة</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold luxury-font leading-tight">استشارة جمالية <br /><span className="text-rose-400">خاصة ومجانية</span></h2>
                    <p className="text-gray-400 text-xl leading-relaxed max-w-lg">
                      محتارة أي منتج يناسب نوع بشرتك؟ خبراؤنا في صبوحة هنا لمساعدتك في اختيار الروتين المثالي لجمالك وتألقكِ الدائم. اطلبي استشارتك الآن وتحدثي معنا مباشرة.
                    </p>
                    <button 
                      onClick={handleConsultation}
                      className="px-12 py-5 bg-rose-700 rounded-full font-bold hover:bg-rose-600 transition-all shadow-xl shadow-rose-950/40 active:scale-95 flex items-center gap-3 justify-center md:justify-start"
                    >
                      <MessageSquareText size={20} />
                      تحدثي مع خبيرة التجميل الآن
                    </button>
                  </div>
                  <div className="relative group perspective-1000">
                    <div className="absolute -inset-4 bg-rose-500/20 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <img 
                      src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800" 
                      alt="Product Consultation" 
                      className="rounded-3xl shadow-2xl transition-all duration-700 group-hover:rotate-1 group-hover:scale-[1.03] relative z-10"
                    />
                  </div>
               </div>
            </section>
          </div>
        )}

        {activePage === 'product-detail' && selectedProduct && (
          <ProductDetail 
            product={selectedProduct} 
            onBack={() => setActivePage('home')}
            isWishlisted={wishlist.some(p => p.id === selectedProduct.id)}
            onToggleWishlist={toggleWishlist}
          />
        )}

        {activePage === 'wishlist' && (
          <div className="max-w-7xl mx-auto px-4 py-20 space-y-12 animate-in fade-in duration-500">
             <div className="text-center space-y-4">
               <h1 className="text-4xl font-bold luxury-font" style={{ color: THEME.primary }}>قائمتي المفضلة</h1>
               <p className="text-gray-500">المنتجات التي نالت إعجابك وتودين العودة إليها لاحقاً.</p>
             </div>

             {wishlist.length > 0 ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                 {wishlist.map(product => (
                   <ProductCard 
                     key={product.id} 
                     product={product} 
                     onView={handleProductView}
                     isWishlisted={true}
                     onToggleWishlist={toggleWishlist}
                   />
                 ))}
               </div>
             ) : (
               <div className="py-20 text-center border-2 border-dashed border-rose-100 rounded-[3rem] space-y-6 bg-white/50 backdrop-blur-sm">
                 <Heart size={48} className="mx-auto" style={{ color: THEME.primary }} />
                 <p className="text-gray-400 italic">قائمة مفضلاتك فارغة حالياً.</p>
                 <button 
                  onClick={() => setActivePage('home')}
                  className="px-8 py-3 bg-stone-900 text-white rounded-full font-bold hover:bg-black transition-all"
                >
                  اكتشفي المنتجات
                </button>
               </div>
             )}
          </div>
        )}
      </main>

      {/* Loading Overlay for Global Actions */}
      {isLoading && products.length > 0 && (
        <div className="fixed inset-0 z-[200] bg-white/20 backdrop-blur-sm flex items-center justify-center pointer-events-auto cursor-wait">
           <div className="bg-white p-6 rounded-2xl shadow-2xl flex items-center gap-4 border border-rose-50">
              <Loader2 className="animate-spin text-rose-600" size={24} />
              <span className="font-bold text-rose-900">يتم الحفظ...</span>
           </div>
        </div>
      )}

      <Footer />

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default App;
