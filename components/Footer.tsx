
import React from 'react';
import { Instagram, Facebook, MessageCircle, Mail, MapPin, Phone } from 'lucide-react';
import { THEME, CONTACT_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6 text-right">
             <h2 className="text-3xl font-bold luxury-font" style={{ color: THEME.primary }}>بوتيك صبوحة</h2>
             <p className="text-gray-400 leading-relaxed">
               وجهتك الأولى لمنتجات العناية بالبشرة والكوزمتكس. ننتقي لكِ أجود المكونات والمنتجات لتنعمي بجمال طبيعي وبشرة صحية.
             </p>
             <div className="flex gap-4 justify-end">
               <a href={CONTACT_INFO.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-rose-600 transition-all">
                 <Instagram size={20} style={{ color: THEME.primary }} />
               </a>
               <a href={CONTACT_INFO.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-rose-600 transition-all">
                 <Facebook size={20} style={{ color: THEME.primary }} />
               </a>
               <a href={`https://wa.me/${CONTACT_INFO.phone.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-rose-600 transition-all">
                 <MessageCircle size={20} style={{ color: THEME.primary }} />
               </a>
             </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold border-r-4 pr-4" style={{ borderColor: THEME.primary }}>روابط سريعة</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-rose-400 transition-colors">قصتنا</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">سياسة الشحن</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">دليل العناية بالبشرة</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">اتصل بنا</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold border-r-4 pr-4" style={{ borderColor: THEME.primary }}>تواصل معنا</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-3 justify-end text-right">
                <span>{CONTACT_INFO.address}</span>
                <MapPin size={20} className="shrink-0" style={{ color: THEME.primary }} />
              </li>
              <li className="flex items-center gap-3 justify-end">
                <span dir="ltr">{CONTACT_INFO.phone}</span>
                <Phone size={20} className="shrink-0" style={{ color: THEME.primary }} />
              </li>
              <li className="flex items-center gap-3 justify-end">
                <span>{CONTACT_INFO.email}</span>
                <Mail size={20} className="shrink-0" style={{ color: THEME.primary }} />
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold border-r-4 pr-4" style={{ borderColor: THEME.primary }}>انضمي إلينا</h3>
            <p className="text-gray-400 text-sm">احصلي على نصائح جمالية وعروض حصرية في بريدك.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="بريدك الإلكتروني" 
                className="bg-white/5 border border-white/10 px-4 py-3 rounded-r-md w-full focus:outline-none focus:ring-1 focus:ring-rose-500 text-right"
              />
              <button className="bg-rose-600 hover:bg-rose-700 px-6 py-3 rounded-l-md font-bold transition-all shrink-0">
                اشترك
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} متجر بوتيك صبوحة للكوزمتكس. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
