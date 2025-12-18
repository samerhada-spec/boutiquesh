
import { Product } from '../types';
import { PRODUCTS as initialProducts } from '../constants';

const DB_KEY = 'sabouha_real_db_v1';

/**
 * خدمة محاكاة لقاعدة بيانات (API Service)
 * تم تصميمها لتعمل بشكل غير متزامن (Async) لتمثيل تجربة قاعدة البيانات الحقيقية
 */
export const dbService = {
  // جلب كافة المنتجات من "قاعدة البيانات"
  getProducts: async (): Promise<Product[]> => {
    return new Promise((resolve) => {
      // محاكاة تأخير الشبكة (800ms)
      setTimeout(() => {
        const stored = localStorage.getItem(DB_KEY);
        if (stored) {
          resolve(JSON.parse(stored));
        } else {
          // إذا كانت قاعدة البيانات فارغة، نستخدم المنتجات الأولية ونحفظها
          localStorage.setItem(DB_KEY, JSON.stringify(initialProducts));
          resolve(initialProducts);
        }
      }, 800);
    });
  },

  // حفظ قائمة المنتجات بالكامل
  saveProducts: async (products: Product[]): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem(DB_KEY, JSON.stringify(products));
        resolve();
      }, 1000);
    });
  },

  // إضافة منتج واحد (محاكاة)
  addProduct: async (newProduct: Product): Promise<void> => {
    const products = await dbService.getProducts();
    await dbService.saveProducts([newProduct, ...products]);
  },

  // حذف منتج (محاكاة)
  deleteProduct: async (id: string): Promise<void> => {
    const products = await dbService.getProducts();
    await dbService.saveProducts(products.filter(p => p.id !== id));
  }
};
