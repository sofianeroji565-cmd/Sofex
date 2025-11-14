
import React from 'react';
import type { CartItem } from '../types';
import CloseIcon from './icons/CloseIcon';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onRemoveItem: (productId: number) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 end-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800">سلة التسوق</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
              <CloseIcon />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500 mt-8">سلة التسوق فارغة.</p>
            ) : (
              <ul className="space-y-4">
                {cartItems.map(item => (
                  <li key={item.id} className="flex items-center space-x-4 space-x-reverse">
                    <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.price.toFixed(2)} ر.س</p>
                      <div className="flex items-center mt-2">
                        <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 border rounded-md">-</button>
                        <span className="px-3">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 border rounded-md">+</button>
                      </div>
                    </div>
                    <button onClick={() => onRemoveItem(item.id)} className="text-red-500 hover:text-red-700 me-2">
                      <CloseIcon className="w-5 h-5"/>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {cartItems.length > 0 && (
            <div className="p-6 border-t">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium text-gray-700">المجموع</span>
                <span className="text-2xl font-bold text-red-600">{total.toFixed(2)} ر.س</span>
              </div>
              <button className="w-full py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors">
                إتمام عملية الشراء
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
