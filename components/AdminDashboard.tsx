
import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Save, X, Package, DollarSign, Tag, Lock, LogIn, Loader2 } from 'lucide-react';
import { Product, Category } from '../types';
import { THEME, CATEGORIES } from '../constants';

interface AdminDashboardProps {
  products: Product[];
  onUpdateProducts: (products: Product[]) => Promise<void>;
  onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ products, onUpdateProducts, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const ADMIN_PASSWORD = 'Sabouha@2025';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 2000);
    }
  };

  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    price: 0,
    description: '',
    category: 'عناية بالبشرة',
    image: '',
    isNew: false,
    isFeatured: false
  });

  const handleSave = async () => {
    if (!formData.name || !formData.price || !formData.image) {
      alert("يرجى ملء البيانات الأساسية: الاسم، السعر، والصورة");
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingId) {
        const updated = products.map(p => p.id === editingId ? { ...p, ...formData } as Product : p);
        await onUpdateProducts(updated);
        setEditingId(null);
      } else {
        const newProduct: Product = {
          ...formData as Product,
          id: Date.now().toString(),
          rating: 5,
          reviews: []
        };
        await onUpdateProducts([newProduct, ...products]);
        setIsAdding(false);
      }
      setFormData({ name: '', price: 0, description: '', category: 'عناية بالبشرة', image: '', isNew: false, isFeatured: false });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("هل أنتِ متأكدة من حذف هذا المنتج نهائياً؟")) {
      setIsSubmitting(true);
      try {
        await onUpdateProducts(products.filter(p => p.id !== id));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData(product);
    setIsAdding(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in duration-300 text-center border border-rose-100">
          <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <Lock size={48} style={{ color: THEME.primary }} />
          </div>
          <h2 className="text-3xl font-bold luxury-font mb-2" style={{ color: THEME.primary }}>منطقة الإدارة</h2>
          <p className="text-gray-400 mb-10 text-sm">تسجيل الدخول لتعديل محتوى المتجر</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="كلمة المرور الفاخرة"
                className={`w-full p-5 pr-14 rounded-2xl border ${loginError ? 'border-red-500 animate-shake' : 'border-rose-100'} focus:ring-2 focus:ring-rose-200 outline-none text-center font-bold tracking-widest`}
                autoFocus
              />
              <Lock className="absolute right-5 top-1/2 -translate-y-1/2 text-rose-200" size={24} />
            </div>
            {loginError && <p className="text-red-500 text-sm font-bold">كلمة المرور غير صالحة!</p>}
            <button 
              type="submit" 
              className="w-full bg-stone-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl active:scale-95"
            >
              <LogIn size={20} /> دخول للوحة التحكم
            </button>
            <button 
              type="button"
              onClick={onClose}
              className="w-full py-2 text-gray-400 text-sm hover:text-rose-900 transition-colors"
            >
              إلغاء والعودة للجمال
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col animate-in slide-in-from-bottom duration-500 border border-rose-50">
        
        {/* Header */}
        <div className="p-8 border-b border-rose-100 flex items-center justify-between bg-rose-50/20 backdrop-blur-md">
          <div>
            <h2 className="text-3xl font-bold luxury-font" style={{ color: THEME.primary }}>لوحة تحكم صبوحة</h2>
            <p className="text-sm text-gray-400 mt-1">تعديل المنتجات والعروض مباشرة على قاعدة البيانات</p>
          </div>
          <div className="flex items-center gap-6">
             {isSubmitting && <Loader2 className="animate-spin text-rose-600" size={20} />}
             <button onClick={() => setIsAuthenticated(false)} className="text-xs font-bold text-gray-400 hover:text-rose-900 uppercase tracking-widest">خروج</button>
             <button onClick={onClose} className="p-3 hover:bg-rose-100 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="flex-grow overflow-auto p-8 bg-[#fdf2f4]/30">
          {isAdding ? (
            <div className="space-y-8 max-w-3xl mx-auto bg-white p-10 rounded-[2.5rem] shadow-xl border border-rose-50">
              <h3 className="text-2xl font-bold luxury-font mb-6">{editingId ? 'تحديث تفاصيل المنتج' : 'إضافة منتج جديد للرفوف'}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-60 flex items-center gap-2"><Package size={14}/> اسم المنتج</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full p-4 rounded-xl bg-rose-50/30 border border-rose-100 focus:ring-2 focus:ring-rose-200 outline-none font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-60 flex items-center gap-2"><DollarSign size={14}/> السعر (₪)</label>
                  <input 
                    type="number" 
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                    className="w-full p-4 rounded-xl bg-rose-50/30 border border-rose-100 focus:ring-2 focus:ring-rose-200 outline-none font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-60 flex items-center gap-2"><Tag size={14}/> القسم</label>
                  <select 
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value as Category})}
                    className="w-full p-4 rounded-xl bg-rose-50/30 border border-rose-100 focus:ring-2 focus:ring-rose-200 outline-none font-medium"
                  >
                    {CATEGORIES.filter(c => c !== 'الكل').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-60">رابط صورة المنتج</label>
                  <input 
                    type="text" 
                    value={formData.image}
                    placeholder="https://..."
                    onChange={e => setFormData({...formData, image: e.target.value})}
                    className="w-full p-4 rounded-xl bg-rose-50/30 border border-rose-100 focus:ring-2 focus:ring-rose-200 outline-none font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest opacity-60">وصف المنتج الفاخر</label>
                <textarea 
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full p-4 rounded-xl bg-rose-50/30 border border-rose-100 h-32 outline-none font-medium resize-none"
                ></textarea>
              </div>

              <div className="flex gap-8 p-6 bg-rose-50/20 rounded-2xl border border-rose-100/50">
                 <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" checked={formData.isNew} onChange={e => setFormData({...formData, isNew: e.target.checked})} className="w-5 h-5 rounded-lg accent-rose-700 cursor-pointer" />
                    <span className="text-sm font-bold group-hover:text-rose-900 transition-colors">منتج جديد (سيظهر في شريط التمرير)</span>
                 </label>
                 <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" checked={formData.isFeatured} onChange={e => setFormData({...formData, isFeatured: e.target.checked})} className="w-5 h-5 rounded-lg accent-amber-600 cursor-pointer" />
                    <span className="text-sm font-bold group-hover:text-amber-900 transition-colors">منتج مميز (سيظهر في التوصيات)</span>
                 </label>
              </div>

              <div className="flex gap-4 pt-6">
                <button 
                  disabled={isSubmitting}
                  onClick={handleSave} 
                  className="flex-1 bg-stone-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                  حفظ البيانات في السحاب
                </button>
                <button 
                  disabled={isSubmitting}
                  onClick={() => {setIsAdding(false); setEditingId(null);}} 
                  className="flex-1 bg-rose-50 text-rose-900 py-5 rounded-2xl font-bold hover:bg-rose-100 transition-all disabled:opacity-50"
                >
                  إلغاء
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-rose-50 group">
                <div>
                  <h3 className="text-xl font-bold luxury-font">إجمالي المنتجات ({products.length})</h3>
                  <p className="text-xs text-gray-400 font-medium">إدارة مخزون بوتيك صبوحة</p>
                </div>
                <button 
                  onClick={() => setIsAdding(true)}
                  className="bg-rose-700 text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-all duration-500 opacity-0 group-hover:opacity-100 hover:bg-rose-600 shadow-lg active:scale-95"
                >
                  <Plus size={20} /> إضافة منتج جديد
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {products.map(product => (
                  <div key={product.id} className="flex items-center gap-6 p-6 bg-white border border-rose-50 rounded-[2rem] hover:shadow-xl transition-all group overflow-hidden relative">
                    <div className="w-24 h-24 shrink-0 rounded-2xl overflow-hidden shadow-md">
                      <img src={product.image} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-bold text-xl text-stone-900">{product.name}</h4>
                      <p className="text-sm font-bold text-rose-500 mt-1">{product.price} ₪ • <span className="text-gray-400 font-normal">{product.category}</span></p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button 
                        onClick={() => startEdit(product)} 
                        className="p-3 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all active:scale-90"
                        title="تعديل"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button 
                        disabled={isSubmitting}
                        onClick={() => handleDelete(product.id)} 
                        className="p-3 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-xl transition-all active:scale-90 disabled:opacity-50"
                        title="حذف"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    {/* Status Indicators */}
                    <div className="absolute top-0 left-0 flex gap-1 p-2">
                       {product.isNew && <div className="w-2 h-2 rounded-full bg-rose-500"></div>}
                       {product.isFeatured && <div className="w-2 h-2 rounded-full bg-amber-500"></div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
