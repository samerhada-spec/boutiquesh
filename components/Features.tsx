
import React from 'react';
import { Truck, ShieldCheck, Award, Headphones } from 'lucide-react';
import { THEME } from '../constants';

const FeatureItem = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="flex flex-col items-center text-center p-6 space-y-3 bg-white/50 rounded-xl hover:shadow-md transition-all">
    <div className="w-14 h-14 bg-rose-50 rounded-full flex items-center justify-center" style={{ color: THEME.primary }}>
      <Icon size={28} strokeWidth={1.5} />
    </div>
    <h3 className="font-bold text-gray-900">{title}</h3>
    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
  </div>
);

const Features: React.FC = () => {
  return (
    <section className="py-20 bg-rose-50/30">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <FeatureItem 
          icon={Truck} 
          title="توصيل سريع" 
          desc="توصيل لباب منزلك في جميع مدن الضفة الغربية والقدس والداخل." 
        />
        <FeatureItem 
          icon={ShieldCheck} 
          title="دفع آمن" 
          desc="خيارات دفع متعددة وآمنة تماماً لضمان راحتك أثناء التسوق." 
        />
        <FeatureItem 
          icon={Award} 
          title="منتجات أصلية" 
          desc="نضمن لك جودة جميع المنتجات المعروضة في متجرنا وأصالتها." 
        />
        <FeatureItem 
          icon={Headphones} 
          title="دعم فني" 
          desc="فريق دعم متاح لمساعدتك والرد على استفساراتك على مدار الساعة." 
        />
      </div>
    </section>
  );
};

export default Features;
