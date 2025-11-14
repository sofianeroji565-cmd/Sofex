import React, { useState, useMemo } from 'react';
import type { VariantProduct, OrderItem } from '../types';

interface ProductWithOptionsCardProps {
  product: VariantProduct;
  onOrderNow: (items: OrderItem[]) => void;
}

const ProductWithOptionsCard: React.FC<ProductWithOptionsCardProps> = ({ product, onOrderNow }) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const selectedVariant = useMemo(() => {
    return product.variants[selectedVariantIndex];
  }, [selectedVariantIndex, product.variants]);
  
  const handleOrder = () => {
    onOrderNow([{
      id: product.id,
      name: product.name,
      price: selectedVariant.price,
      quantity: quantity,
      size: selectedVariant.size
    }]);
  };

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  return (
    <div className="bg-white rounded-lg custom-shadow overflow-hidden flex flex-col justify-between transform hover:scale-105 transition-transform duration-300">
      <div className="w-full h-56 bg-gray-100 p-2">
        <img className="w-full h-full object-contain" src={product.imageUrl} alt={product.name} />
      </div>
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>
        <div className="mb-4">
          <label htmlFor={`size-${product.id}`} className="block text-sm font-medium text-gray-700 mb-1">اختر الحجم:</label>
          <select
            id={`size-${product.id}`}
            value={selectedVariantIndex}
            onChange={(e) => setSelectedVariantIndex(parseInt(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
          >
            {product.variants.map((variant, index) => (
              <option key={index} value={index}>
                {variant.size} - {variant.price.toLocaleString()} د.ج
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="p-6 bg-gray-50">
        <div className="flex justify-between items-center mb-4">
          <p className="text-2xl font-bold text-emerald-600">{selectedVariant.price.toLocaleString()} د.ج</p>
          {selectedVariant.originalPrice && (
            <span className="text-lg font-medium text-red-500 line-through">
              {selectedVariant.originalPrice.toLocaleString()} د.ج
            </span>
          )}
        </div>
         <div className="flex items-center justify-between mb-4">
            <label htmlFor={`quantity-options-${product.id}`} className="font-medium text-gray-700">الكمية:</label>
            <div className="flex items-center border rounded-md">
                <button onClick={() => handleQuantityChange(-1)} className="px-3 py-1 text-lg font-bold text-gray-600 hover:bg-gray-200 rounded-r-md">-</button>
                <input
                    id={`quantity-options-${product.id}`}
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 text-center border-x"
                />
                <button onClick={() => handleQuantityChange(1)} className="px-3 py-1 text-lg font-bold text-gray-600 hover:bg-gray-200 rounded-l-md">+</button>
            </div>
        </div>
        <button
          onClick={handleOrder}
          className="w-full px-4 py-3 bg-emerald-600 text-white font-bold rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 transition-colors"
        >
          اطلب الآن
        </button>
      </div>
    </div>
  );
};

export default ProductWithOptionsCard;