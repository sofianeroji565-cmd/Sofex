import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-gray-800 text-white mt-16">
      <div className="container mx-auto px-6 py-10">
        <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">
                سوفيكس <span className="text-emerald-500">Sofex</span>
            </h3>
            <p className="mb-4 text-gray-300">نلتزم بتوفير أعلى معايير السلامة لحمايتك وحماية ممتلكاتك.</p>
            <div className="mb-4">
                <a href="https://wa.me/213655110977" target="_blank" rel="noopener noreferrer" className="mx-2 hover:text-emerald-400">تواصل عبر واتساب</a>
                <span className="text-gray-500">|</span>
                <a href="mailto:contact@sofex.dz" className="mx-2 hover:text-emerald-400">راسلنا عبر البريد</a>
            </div>
            <p className="text-sm text-gray-400">&copy; 2025 سوفيكس. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;