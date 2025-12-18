
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { THEME } from '../constants';

const Hero: React.FC = () => {
  return (
    <section className="relative h-[90vh] min-h-[700px] overflow-hidden flex items-center justify-center text-center">
      {/* Background with soft luxury gradient to match the image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1596462502278-27bfad450516?q=80&w=2000" 
          alt="Luxury Skincare and Cosmetics" 
          className="w-full h-full object-cover"
        />
        {/* The central glow effect seen in the user's image */}
        <div className="absolute inset-0 bg-[#fdf2f4]/60 backdrop-blur-[2px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/40 rounded-full blur-[100px]"></div>
      </div>

      {/* Centered Content - Replicating the image's centered focus */}
      <div className="relative z-10 max-w-4xl px-4 space-y-8 animate-in fade-in zoom-in duration-1000">
        <div className="space-y-4">
          <h2 className="text-rose-400 font-bold tracking-[0.4em] text-sm uppercase">مرحباً بكِ في عالم الجمال</h2>
          <h1 className="text-6xl md:text-8xl font-bold luxury-font leading-tight drop-shadow-sm" style={{ color: THEME.primary }}>
            بوتيك صبوحة
          </h1>
          <div className="w-24 h-[2px] bg-amber-500 mx-auto"></div>
        </div>
        
        <p className="text-xl text-gray-800 font-medium max-w-2xl mx-auto leading-relaxed">
          السر وراء إشراقتكِ الدائمة. نقدم لكِ أرقى منتجات العناية بالبشرة والكوزمتكس العالمية بأعلى معايير الجودة.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <button className="px-10 py-4 bg-stone-900 text-white font-bold rounded-full hover:bg-black transition-all shadow-xl hover:-translate-y-1">
            تسوقي الآن
          </button>
          <button className="px-10 py-4 bg-white border border-rose-100 text-rose-800 font-bold rounded-full hover:bg-rose-50 transition-all shadow-lg hover:-translate-y-1">
            اكتشفي المجموعات
          </button>
        </div>
      </div>

      {/* Decorative floral elements hints (inspired by the pampas/leaves in the image) */}
      <div className="absolute bottom-0 right-0 p-10 opacity-30 pointer-events-none hidden lg:block">
        <div className="text-8xl text-rose-200 luxury-font">Sabouha</div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer text-rose-300">
        <ChevronDown size={32} />
      </div>
    </section>
  );
};

export default Hero;
