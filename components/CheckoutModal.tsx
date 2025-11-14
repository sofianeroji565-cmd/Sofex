import React, { useState, useMemo } from 'react';
import type { OrderItem, OrderDetails } from '../types';
import CloseIcon from './icons/CloseIcon';
import { algerianWilayas } from '../data/wilayas';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderItems: OrderItem[];
  onSubmit: (details: OrderDetails) => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, orderItems, onSubmit }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [wilaya, setWilaya] = useState(algerianWilayas[0]);
  const [deliveryMethod, setDeliveryMethod] = useState<'home' | 'office'>('home');

  const total = useMemo(() => {
    return orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [orderItems]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderItems.length === 0) return;
    onSubmit({
      fullName,
      phone,
      wilaya,
      deliveryMethod,
      items: orderItems,
      total,
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-2xl font-bold text-gray-800">إتمام الطلب</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <CloseIcon />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">ملخص الطلب</h3>
            <div className="space-y-3 mb-6 border-b pb-6">
                {orderItems.map(item => (
                    <div key={`${item.id}-${item.size}`} className="flex justify-between items-center text-sm">
                        <div>
                            <p className="font-bold">{item.name} {item.size && `(${item.size})`}</p>
                            <p className="text-gray-500">الكمية: {item.quantity}</p>
                        </div>
                        <p className="font-semibold">{(item.price * item.quantity).toLocaleString()} د.ج</p>
                    </div>
                ))}
            </div>
             <div className="flex justify-between items-center font-extrabold text-xl mb-6">
                <span>المجموع الإجمالي</span>
                <span className="text-emerald-600">{total.toLocaleString()} د.ج</span>
            </div>

            <form onSubmit={handleSubmit}>
                <h3 className="text-xl font-semibold mb-4 text-gray-700">معلومات التوصيل</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 font-medium">الاسم الكامل</label>
                        <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} required className="w-full p-2 border rounded-md" />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">رقم الهاتف</label>
                        <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} required className="w-full p-2 border rounded-md" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block mb-1 font-medium">الولاية</label>
                        <select value={wilaya} onChange={e => setWilaya(e.target.value)} required className="w-full p-2 border rounded-md bg-white">
                            {algerianWilayas.map(w => <option key={w} value={w}>{w}</option>)}
                        </select>
                    </div>
                     <div className="md:col-span-2">
                        <label className="block mb-1 font-medium">طريقة التوصيل</label>
                        <div className="flex gap-4">
                            <label className="flex items-center p-3 border rounded-md cursor-pointer flex-1"><input type="radio" name="delivery" value="home" checked={deliveryMethod === 'home'} onChange={() => setDeliveryMethod('home')} className="ms-2"/>توصيل للمنزل</label>
                            <label className="flex items-center p-3 border rounded-md cursor-pointer flex-1"><input type="radio" name="delivery" value="office" checked={deliveryMethod === 'office'} onChange={() => setDeliveryMethod('office')} className="ms-2"/>استلام من المكتب</label>
                        </div>
                    </div>
                </div>
                 <button type="submit" className="w-full mt-6 py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-colors text-lg">
                    تأكيد وإرسال الطلب
                </button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
