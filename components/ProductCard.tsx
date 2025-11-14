import React, { useState } from 'react';
import type { SimpleProduct, OrderItem } from '../types';

interface ProductCardProps {
  product: SimpleProduct;
  onOrderNow: (items: OrderItem[]) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onOrderNow }) => {
  const [quantity, setQuantity] = useState(1);

  const handleOrder = () => {
    onOrderNow([{
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity
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
      </div>
      <div className="p-6 bg-gray-50">
        <div className="flex justify-between items-center mb-4">
          <p className="text-2xl font-bold text-emerald-600">{product.price.toLocaleString()} د.ج</p>
          {product.originalPrice && (
            <span className="text-lg font-medium text-red-500 line-through">
              {product.originalPrice.toLocaleString()} د.ج
            </span>
          )}
        </div>
        <div className="flex items-center justify-between mb-4">
            <label htmlFor={`quantity-${product.id}`} className="font-medium text-gray-700">الكمية:</label>
            <div className="flex items-center border rounded-md">
                <button onClick={() => handleQuantityChange(-1)} className="px-3 py-1 text-lg font-bold text-gray-600 hover:bg-gray-200 rounded-r-md">-</button>
                <input
                    id={`quantity-${product.id}`}
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

export default ProductCard;