import React from 'react';

const Header: React.FC = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerOffset = 90; // مساحة للشريط العلوي الثابت
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
    
      window.scrollTo({
         top: offsetPosition,
         behavior: "smooth"
      });
    }
  };

  return (
    <header className="bg-white custom-shadow sticky top-0 z-40">
      <div className="container mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="text-center sm:text-right">
          <h1 className="text-3xl font-extrabold text-gray-800">
            سوفيكس <span className="text-emerald-600">Sofex</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">شريكك الموثوق لمعدات السلامة والحماية</p>
        </div>
        <nav className="mt-4 sm:mt-0">
          <a href="#products" onClick={(e) => handleScroll(e, 'products')} className="text-gray-600 hover:text-emerald-600 px-3 py-2 rounded-md font-medium transition-colors">المنتجات</a>
          <a href="#bundles" onClick={(e) => handleScroll(e, 'bundles')} className="text-gray-600 hover:text-emerald-600 px-3 py-2 rounded-md font-medium transition-colors">الباقات</a>
          <a href="#contact" onClick={(e) => handleScroll(e, 'contact')} className="text-gray-600 hover:text-emerald-600 px-3 py-2 rounded-md font-medium transition-colors">اتصل بنا</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;