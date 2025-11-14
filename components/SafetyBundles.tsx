import React from 'react';
import type { OrderItem } from '../types';

interface Bundle {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    originalPrice: number;
    items: OrderItem[];
    features: string[];
}

const bundles: Bundle[] = [
    {
        id: 'car-bundle',
        name: 'باقة السلامة للسيارة',
        description: 'الباقة الأساسية التي يجب أن تتوفر في كل سيارة لمواجهة الطوارئ على الطريق.',
        imageUrl: 'https://i.postimg.cc/zfR7s2yc/photo-6044356863949737050-y.jpg',
        price: 4500,
        originalPrice: 4800,
        items: [
            { id: 1, name: 'طفاية حريق بودرة جافة', size: '1 كغ', price: 2400, quantity: 1 },
            { id: 3, name: 'مثلث السلامة العاكس', price: 1050, quantity: 1 },
            { id: 4, name: 'علبة الإسعافات الأولية', price: 1350, quantity: 1 },
        ],
        features: ['طفاية حريق 1 كغ', 'مثلث سلامة عاكس', 'علبة إسعافات أولية']
    },
    {
        id: 'home-bundle',
        name: 'باقة الحماية الأساسية',
        description: 'باقة أساسية توفر حماية أولية ضد الحرائق وتزيد من الأمان في حالات الطوارئ بفضل السترة العاكسة والمثلث.',
        imageUrl: 'https://i.postimg.cc/x1GMLrNW/photo-6030787958451325289-y.jpg',
        price: 4200,
        originalPrice: 4500,
        items: [
            { id: 1, name: 'طفاية حريق بودرة جافة', size: '2 كغ', price: 2800, quantity: 1 },
            { id: 3, name: 'مثلث السلامة العاكس', price: 1050, quantity: 1 },
            { id: 5, name: 'سترة واقية عاكسة', price: 650, quantity: 1 },
        ],
        features: ['طفاية بودرة 2 كغ', 'مثلث سلامة عاكس', 'سترة واقية عاكسة']
    },
     {
        id: 'premium-bundle',
        name: 'الباقة الممتازة للأعمال',
        description: 'الحل المتكامل للمكاتب والورشات، يضم طفاية حريق، سترة واقية، ومعدات أساسية أخرى لتلبية متطلبات السلامة المهنية.',
        imageUrl: 'https://i.postimg.cc/QCRxyMwW/photo-6030787958451325275-y.jpg',
        price: 4850,
        originalPrice: 5850,
        items: [
            { id: 1, name: 'طفاية حريق بودرة جافة', size: '2 كغ', price: 2800, quantity: 1 },
            { id: 5, name: 'سترة واقية عاكسة', price: 650, quantity: 1 },
            { id: 3, name: 'مثلث السلامة العاكس', price: 1050, quantity: 1 },
            { id: 4, name: 'علبة الإسعافات الأولية', price: 1350, quantity: 1 },
        ],
        features: ['طفاية بودرة 2 كغ', 'سترة واقية عاكسة', 'مثلث سلامة عاكس', 'علبة إسعافات أولية']
    }
]

interface SafetyBundlesProps {
  onOrderNow: (items: OrderItem[]) => void;
}

const SafetyBundles: React.FC<SafetyBundlesProps> = ({ onOrderNow }) => {
    return (
        <div id="bundles" className="bg-white py-16">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">باقات السلامة المتكاملة</h2>
                <p className="text-center text-gray-600 mb-10 max-w-xl mx-auto">وفر الوقت والمال مع باقاتنا المجهزة خصيصاً لتلبية احتياجاتك المختلفة.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {bundles.map(bundle => (
                        <div key={bundle.id} className="border rounded-lg custom-shadow overflow-hidden flex flex-col transform hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-full h-48 bg-gray-100 p-2">
                                <img src={bundle.imageUrl} alt={bundle.name} className="w-full h-full object-contain" />
                            </div>
                            <div className="p-6 flex-grow flex flex-col">
                                <span className="bg-red-100 text-red-700 text-sm font-bold px-3 py-1 rounded-full self-start mb-3">
                                    توفير {(bundle.originalPrice - bundle.price).toLocaleString()} د.ج
                                </span>
                                <h3 className="text-xl font-bold text-gray-800">{bundle.name}</h3>
                                <p className="text-gray-600 text-sm my-3 flex-grow">{bundle.description}</p>
                                <ul className="space-y-2 text-sm mb-4">
                                    {bundle.features.map(feature => (
                                       <li key={feature} className="flex items-center">
                                            <svg className="w-4 h-4 text-green-500 me-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                            {feature}
                                       </li> 
                                    ))}
                                </ul>
                            </div>
                             <div className="p-6 bg-gray-50 mt-auto">
                                <div className="flex justify-between items-center mb-4">
                                  <p className="text-2xl font-bold text-emerald-600">{bundle.price.toLocaleString()} د.ج</p>
                                  <span className="text-lg font-medium text-red-500 line-through">
                                    {bundle.originalPrice.toLocaleString()} د.ج
                                  </span>
                                </div>
                                <button
                                    onClick={() => onOrderNow(bundle.items)}
                                    className="w-full px-4 py-3 bg-emerald-600 text-white font-bold rounded-md hover:bg-emerald-700 transition-colors"
                                >
                                    اطلب الباقة الآن
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SafetyBundles;