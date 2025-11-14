import React from 'react';
import type { SimpleProduct, VariantProduct, OrderItem } from '../types';
import ProductCard from './ProductCard';
import ProductWithOptionsCard from './ProductWithOptionsCard';

const variantProducts: VariantProduct[] = [
  {
    id: 1,
    name: 'طفاية حريق بودرة جافة (ABC)',
    description: 'فعالة ضد جميع فئات الحرائق (A, B, C). مثالية للمكاتب، المستودعات، والمركبات.',
    imageUrl: 'https://i.postimg.cc/cLLQS9bc/photo-6044356863949737063-x.jpg',
    variants: [
      { size: '1 كغ', price: 2400 },
      { size: '2 كغ', price: 2800 },
      { size: '4 كغ', price: 4500, originalPrice: 5000 },
      { size: '6 كغ', price: 5500, originalPrice: 6200 },
      { size: '9 كغ', price: 6700, originalPrice: 7500 },
      { size: '50 كغ', price: 29500, originalPrice: 33000 },
    ]
  },
  {
    id: 2,
    name: 'طفاية حريق ثاني أكسيد الكربون (CO2)',
    description: 'لا تترك بقايا، مثالية للحرائق الكهربائية والسوائل (الفئة B و E)، والمختبرات والمعدات الإلكترونية.',
    imageUrl: 'https://i.postimg.cc/NFvzCqb9/photo-6030787958451325248-y.jpg',
    variants: [
        { size: '2 كغ', price: 5500, originalPrice: 6000 },
        { size: '6 كغ', price: 12500, originalPrice: 22000 },
    ]
  },
];

const simpleProducts: SimpleProduct[] = [
    {
        id: 3,
        name: 'مثلث السلامة العاكس',
        description: 'أداة أساسية للتحذير على الطرقات، مرئية ليلاً ونهاراً لزيادة الأمان.',
        price: 1050,
        originalPrice: 1200,
        imageUrl: 'https://i.postimg.cc/vBCsQNhF/photo-6030787958451325250-x.jpg',
    },
    {
        id: 4,
        name: 'علبة الإسعافات الأولية الشاملة',
        description: 'مجهزة بالكامل للتعامل مع الإصابات الشائعة. تصميم متين ومنظم للمنزل أو السيارة.',
        price: 1350,
        originalPrice: 1500,
        imageUrl: 'https://i.postimg.cc/wvfCwbZP/photo-6019079770228248871-y.jpg',
    },
]

interface ProductListProps {
  onOrderNow: (items: OrderItem[]) => void;
}

const ProductList: React.FC<ProductListProps> = ({ onOrderNow }) => {
  return (
    <div id="products" className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-10">منتجاتنا المتميزة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
            {variantProducts.map(product => (
                <ProductWithOptionsCard key={product.id} product={product} onOrderNow={onOrderNow} />
            ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
             {simpleProducts.map(product => (
                <ProductCard key={product.id} product={product} onOrderNow={onOrderNow} />
            ))}
        </div>
    </div>
  );
};

export default ProductList;