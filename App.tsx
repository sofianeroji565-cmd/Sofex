import React, { useState } from 'react';
import type { OrderItem, OrderDetails } from './types';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Footer from './components/Footer';
import CheckoutModal from './components/CheckoutModal';
import SafetyBundles from './components/SafetyBundles';
import SafetyChatbot from './components/SafetyChatbot';

const App: React.FC = () => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [currentOrderItems, setCurrentOrderItems] = useState<OrderItem[]>([]);

  const handleOrderNow = (items: OrderItem[]) => {
    setCurrentOrderItems(items);
    setIsCheckoutOpen(true);
  };

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false);
    setCurrentOrderItems([]);
  };

  const sendTelegramNotification = async (orderDetails: OrderDetails) => {
    // !!! تحذير أمني هام !!!
    // لا تكشف عن معرف البوت (Bot Token) في كود الواجهة الأمامية في تطبيق حقيقي.
    // هذا يشكل خطراً أمنياً كبيراً.
    // يجب نقل هذا المنطق إلى خادم خلفي آمن (backend) أو دالة سحابية (serverless function).
    // للحصول على Bot Token: تحدث إلى @BotFather على تليجرام.
    // للحصول على Chat ID: تحدث إلى @userinfobot على تليجرام.
    const botToken = 'YOUR_TELEGRAM_BOT_TOKEN'; // <--- استبدل هذا بالتوكن الحقيقي
    const chatId = 'YOUR_TELEGRAM_CHAT_ID'; // <--- استبدل هذا بمعرف الدردشة الحقيقي

    const itemsText = orderDetails.items.map(item =>
      `- ${item.name} ${item.size ? `(${item.size})` : ''} x ${item.quantity} = ${(item.price * item.quantity).toLocaleString()} د.ج`
    ).join('\n');

    const message = `
📢 **طلب جديد!** 📢
------------------------
**الاسم:** ${orderDetails.fullName}
**الهاتف:** ${orderDetails.phone}
**الولاية:** ${orderDetails.wilaya}
**التوصيل:** ${orderDetails.deliveryMethod === 'home' ? 'للمنزل' : 'استلام من المكتب'}
------------------------
**الطلبات:**
${itemsText}
------------------------
**💰 المجموع الإجمالي: ${orderDetails.total.toLocaleString()} د.ج**
    `;

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('فشل في إرسال رسالة تليجرام:', errorData);
      } else {
        console.log('تم إرسال إشعار تليجرام بنجاح!');
      }
    } catch (error) {
      console.error('خطأ أثناء إرسال إشعار تليجرام:', error);
    }
  };


  const handleSubmitOrder = (orderDetails: OrderDetails) => {
    console.log("New Order Submitted:", orderDetails);
    
    // إرسال الإشعار إلى تليجرام
    sendTelegramNotification(orderDetails);
    
    alert(`شكراً لك ${orderDetails.fullName}! تم استلام طلبك بنجاح. سنتواصل معك قريباً على الرقم ${orderDetails.phone}.`);
    handleCloseCheckout();
  };

  return (
    <div className="bg-slate-50 min-h-screen text-gray-900">
      <Header />
      <main>
        <div className="text-center py-16 bg-white">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
                    تجهيزات السلامة ومكافحة الحرائق <span className="text-emerald-600">الأكثر موثوقية</span>
                </h1>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                    نوفر في سوفيكس مجموعة متكاملة من معدات الحماية المعتمدة لضمان سلامة الأفراد والممتلكات.
                </p>
            </div>
        </div>
        <ProductList onOrderNow={handleOrderNow} />
        <SafetyBundles onOrderNow={handleOrderNow} />
      </main>
      <Footer />
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={handleCloseCheckout}
        orderItems={currentOrderItems}
        onSubmit={handleSubmitOrder}
      />
      <SafetyChatbot />
    </div>
  );
};

export default App;