import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  const [isVisible, setIsVisible] = useState(true);

  // Navigation scroll effect
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Smart scroll visibility: hide when scrolling down, show when scrolling up or at top
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      lastScrollY = currentScrollY;

      const nav = document.querySelector('#main-nav');
      if (nav) {
        if (currentScrollY > 50) {
          nav.classList.add('py-2', 'bg-black/80', 'border-gray-700');
          nav.classList.remove('py-4', 'bg-black/40', 'border-gray-800');
        } else {
          nav.classList.remove('py-2', 'bg-black/80', 'border-gray-700');
          nav.classList.add('py-4', 'bg-black/40', 'border-gray-800');
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] relative selection-red text-white" style={{ viewTransitionName: 'main-content' }}>
      <div className="noise-overlay"></div>

      {/* Navigation */}
      <nav id="main-nav" className={`fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[95%] md:w-fit md:min-w-[700px] z-50 flex items-center justify-between px-6 md:px-10 py-3 md:py-4 rounded-full border border-gray-800 backdrop-blur-md bg-black/40 shadow-2xl transition-all duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-[250%]'}`} style={{ viewTransitionName: 'main-nav' }}>
          <Link to="/" className="text-lg md:text-xl font-bold tracking-tighter font-serif shrink-0">ArtisanLink.</Link>
          
          <div className="flex items-center gap-4 md:gap-12 shrink-0">
              <Link to="/catalog" className="text-[10px] md:text-sm uppercase tracking-widest font-semibold text-gray-300 hover:text-white transition-colors">Catalog</Link>
              <Link to="/artisan" className="text-[10px] md:text-sm uppercase tracking-widest font-semibold text-gray-300 hover:text-white transition-colors">Sell Craft</Link>
          </div>
      </nav>

      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="py-32 border-t border-white/5 bg-[#050505] relative overflow-hidden" style={{ viewTransitionName: 'main-footer' }}>
          <div className="container mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                  <div>
                      <h2 className="text-[14vw] leading-[0.7] tracking-tighter text-white/5 font-bold select-none">
                          ARTISANLINK.
                      </h2>
                  </div>
                  
                  <div className="flex flex-col gap-10 text-right min-w-[200px]">
                      <div className="flex flex-col gap-4 text-gray-500 uppercase tracking-widest text-xs">
                          <a href="#" className="hover:text-[#FF4500] transition-colors">Instagram</a>
                          <a href="#" className="hover:text-[#FF4500] transition-colors">Twitter</a>
                      </div>
                      <p className="text-[10px] text-white/20 font-mono tracking-widest">© 2026 ARTISANLINK. ALL RIGHTS RESERVED.</p>
                  </div>
              </div>
          </div>
      </footer>
    </div>
  );
}
