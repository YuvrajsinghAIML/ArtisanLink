import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [time, setTime] = useState('--:-- --');

  useEffect(() => {
    // 1. Reveal Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 2. Parallax Effect & Hero Content Parallax
    const handleScroll = () => {
        const scrolled = window.scrollY;
        
        // Cards Parallax
        document.querySelectorAll('.parallax-card').forEach(el => {
            const speed = parseFloat(el.getAttribute('data-speed'));
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });

        // Hero Parallax
        const heroContent = document.getElementById('hero-content');
        if (heroContent && scrolled < 1000) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = Math.max(0, 1 - (scrolled / 800));
        }
    };
    
    window.addEventListener('scroll', handleScroll);

    // 3. Update Clock
    const updateClock = () => {
        const now = new Date();
        let h = now.getHours();
        let m = now.getMinutes();
        const ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12 || 12;
        m = m < 10 ? '0' + m : m;
        setTime(`${h}:${m} ${ampm}`);
    };
    
    const clockInterval = setInterval(updateClock, 1000);
    updateClock();

    return () => {
      revealObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
      clearInterval(clockInterval);
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden">
          {/* Aurora Elements */}
          <div className="absolute inset-0 z-0">
              <div className="aurora-blade w-[600px] h-[300px] -top-20 -left-20 rotate-12 animate-float"></div>
              <div className="aurora-blade w-[500px] h-[400px] bottom-0 -right-20 -rotate-12 animate-float" style={{ animationDelay: '-5s' }}></div>
          </div>

          {/* Surrealist Floating Imagery */}
          <div className="absolute left-[5%] top-[20%] w-[30vw] opacity-40 mix-blend-hard-light pointer-events-none animate-float" style={{ animationDuration: '25s' }}>
              <img src="https://framerusercontent.com/images/KNhiA5A2ykNYqNkj04Hk6BVg5A.png" alt="Floating Hand" className="w-full h-auto" />
          </div>

          {/* Headline Area */}
          <div id="hero-content" className="container mx-auto px-6 text-center z-20">
              <div className="reveal" style={{ transitionDelay: '200ms' }}>
                  <h1 className="text-6xl md:text-8xl font-medium leading-[1] tracking-tight mb-6 text-white font-serif">
                      ArtisanLink. <br/>
                      <span className="italic font-light text-[#ffe0e0] opacity-80">The design agent.</span>
                  </h1>
              </div>
              
              <div className="reveal max-w-xl mx-auto mb-12" style={{ transitionDelay: '400ms' }}>
                  <p className="text-lg text-white/70 font-light leading-relaxed">
                      Turning the unseen into the unforgettable. We design the spaces where your brand truly lives through refusal and absolute clarity.
                  </p>
              </div>

              <div className="reveal flex flex-col items-center gap-8" style={{ transitionDelay: '600ms' }}>
                  <a href="#works" className="bg-[#FF4500] text-white px-10 py-4 rounded-full text-lg font-medium hover:scale-105 hover:shadow-[0_0_40px_rgba(255,69,0,0.4)] transition-all duration-300">
                      Explore The Void
                  </a>
                  
                  <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-mono text-white/40">
                      <span>{time}</span>
                      <span className="w-px h-3 bg-white/20"></span>
                      <span>NYC, USA</span>
                  </div>
              </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent"></div>
      </section>

      {/* Featured Work Section */}
      <section id="works" className="py-40 relative px-6">
          <div className="container mx-auto">
              <div className="reveal mb-24 text-center">
                  <h2 className="text-5xl md:text-7xl font-serif leading-tight text-white">
                      Empowering Artisans, <br/>
                      <span className="italic text-[#FF4500]">Connecting Markets</span>
                  </h2>
              </div>

              {/* Scrolling Product Showcase */}
              <div className="mb-24 -mx-6 reveal" style={{ transitionDelay: '200ms', width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
                {/* Row 1 - Scrolls Right to Left */}
                <div className="marquee-row mb-3">
                  <div className="marquee-track animate-marquee-left">
                    {[
                      { title: 'Handwoven Silk Sari', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                      { title: 'Terracotta Clay Pot', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                      { title: 'Carved Wooden Elephant', image: '/images/products/wooden-elephant.png' },
                      { title: 'Brass Temple Bell', image: '/images/products/brass-bell.png' },
                      { title: 'Kashmiri Pashmina Shawl', image: '/images/products/pashmina-shawl.png' },
                      { title: 'Blue Pottery Vase', image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                    ].concat([
                      { title: 'Handwoven Silk Sari', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                      { title: 'Terracotta Clay Pot', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                      { title: 'Carved Wooden Elephant', image: '/images/products/wooden-elephant.png' },
                      { title: 'Brass Temple Bell', image: '/images/products/brass-bell.png' },
                      { title: 'Kashmiri Pashmina Shawl', image: '/images/products/pashmina-shawl.png' },
                      { title: 'Blue Pottery Vase', image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                    ]).map((item, i) => (
                      <div key={`r1-${i}`} className="marquee-card flex-shrink-0 w-[280px] md:w-[340px] h-[180px] md:h-[220px] rounded-2xl overflow-hidden relative group mx-2">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <span className="text-white font-medium text-sm">{item.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Row 2 - Scrolls Left to Right */}
                <div className="marquee-row">
                  <div className="marquee-track animate-marquee-right">
                    {[
                      { title: 'Madhubani Folk Painting', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                      { title: 'Kashmiri Pashmina Shawl', image: '/images/products/pashmina-shawl.png' },
                      { title: 'Blue Pottery Vase', image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                      { title: 'Dhokra Art Figurine', image: 'https://images.unsplash.com/photo-1567225477277-c8162eb4991d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                      { title: 'Handwoven Silk Sari', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                      { title: 'Terracotta Clay Pot', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                    ].concat([
                      { title: 'Madhubani Folk Painting', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                      { title: 'Kashmiri Pashmina Shawl', image: '/images/products/pashmina-shawl.png' },
                      { title: 'Blue Pottery Vase', image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                      { title: 'Dhokra Art Figurine', image: 'https://images.unsplash.com/photo-1567225477277-c8162eb4991d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                      { title: 'Handwoven Silk Sari', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                      { title: 'Terracotta Clay Pot', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                    ]).map((item, i) => (
                      <div key={`r2-${i}`} className="marquee-card flex-shrink-0 w-[280px] md:w-[340px] h-[180px] md:h-[220px] rounded-2xl overflow-hidden relative group mx-2">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <span className="text-white font-medium text-sm">{item.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {/* Card 1: Artisan */}
                  <div className="parallax-card" data-speed="-0.02">
                      <div className="reveal bg-[#111] border border-white/10 rounded-[2rem] p-10 md:p-12 flex flex-col shadow-2xl group hover:border-[#FF4500] hover:bg-[#151515] transition-all duration-500 h-full">
                          <div className="w-16 h-16 rounded-2xl bg-blue-900/30 flex items-center justify-center mb-8 border border-blue-500/20 group-hover:border-[#FF4500]/30 transition-colors">
                              <iconify-icon icon="lucide:store" class="text-blue-400 group-hover:text-[#FF4500] text-3xl transition-colors"></iconify-icon>
                          </div>
                          
                          <div className="flex-grow">
                              <h3 className="text-3xl md:text-4xl text-white mb-4 font-serif font-medium">
                                  I am an Artisan
                              </h3>
                              <p className="text-gray-400 text-lg font-light leading-relaxed mb-10">
                                  Snap a photo of your craft. Our AI will automatically tag and list it for buyers.
                              </p>
                          </div>
                          
                          <Link to="/artisan" className="w-full bg-[#FF4500] text-white py-4 rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-[#ff571a] transition-colors shadow-[0_0_15px_rgba(255,69,0,0.2)] hover:shadow-[0_0_25px_rgba(255,69,0,0.4)]">
                              Start Selling <iconify-icon icon="lucide:arrow-right"></iconify-icon>
                          </Link>
                      </div>
                  </div>

                  {/* Card 2: Buyer */}
                  <div className="parallax-card md:mt-16" data-speed="0.02">
                      <div className="reveal bg-[#111] border border-[#FF1493]/30 rounded-[2rem] p-10 md:p-12 flex flex-col shadow-2xl group hover:border-[#FF1493] hover:bg-[#151515] transition-all duration-500 h-full" style={{ transitionDelay: '150ms' }}>
                          <div className="w-16 h-16 rounded-2xl bg-[#FF1493]/10 flex items-center justify-center mb-8 border border-[#FF1493]/20">
                              <iconify-icon icon="lucide:user" class="text-[#FF1493] text-3xl"></iconify-icon>
                          </div>
                          
                          <div className="flex-grow">
                              <h3 className="text-3xl md:text-4xl text-white mb-4 font-serif font-medium">
                                  I am a Buyer
                              </h3>
                              <p className="text-gray-400 text-lg font-light leading-relaxed mb-10">
                                  Discover authentic, beautifully crafted goods directly from the makers.
                              </p>
                          </div>
                          
                          <Link to="/catalog" className="w-full bg-[#FF1493] text-white py-4 rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-[#e6007e] transition-colors shadow-[0_0_15px_rgba(255,20,147,0.2)] hover:shadow-[0_0_25px_rgba(255,20,147,0.4)]">
                              Shop Now <iconify-icon icon="lucide:arrow-right"></iconify-icon>
                          </Link>
                      </div>
                  </div>
              </div>
          </div>

          {/* Background Pattern */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1.5px, transparent 1.5px)', backgroundSize: '80px 80px' }}>
          </div>
      </section>
    </>
  );
}
