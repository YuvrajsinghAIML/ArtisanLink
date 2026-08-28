import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../services/firebase';

const MOCK_PRODUCTS = [
  { id: 'm1', title: 'Handwoven Silk Sari', price: 4500, category: 'Textiles', region: 'Assam', material: 'Silk', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'm2', title: 'Terracotta Clay Pot', price: 850, category: 'Pottery', region: 'Rajasthan', material: 'Clay', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'm3', title: 'Carved Wooden Elephant', price: 1200, category: 'Woodwork', region: 'Odisha', material: 'Wood', image: '/images/products/wooden-elephant.png' },
  { id: 'm4', title: 'Brass Temple Bell', price: 2100, category: 'Metalwork', region: 'Gujarat', material: 'Brass', image: '/images/products/brass-bell.png' },
  { id: 'm5', title: 'Madhubani Folk Painting', price: 3200, category: 'Paintings', region: 'Bihar', material: 'Canvas', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'm6', title: 'Kashmiri Pashmina Shawl', price: 12500, category: 'Textiles', region: 'Kashmir', material: 'Pashmina', image: '/images/products/pashmina-shawl.png' },
  { id: 'm7', title: 'Blue Pottery Vase', price: 1450, category: 'Pottery', region: 'Jaipur', material: 'Ceramic', image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'm8', title: 'Dhokra Art Figurine', price: 1800, category: 'Metalwork', region: 'Chhattisgarh', material: 'Brass', image: 'https://images.unsplash.com/photo-1567225477277-c8162eb4991d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
];

export default function BuyerCatalog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const q = query(collection(db, 'listings'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetchedProducts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          image: doc.data().imageUrl || doc.data().image, // Map imageUrl to image if it exists
          ...doc.data()
        }));
        setProducts([...fetchedProducts, ...MOCK_PRODUCTS]);
      } catch (error) {
        console.error("Firestore fetch failed:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchProducts();
  }, []);

  // Intersection Observer for scroll reveal animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -20px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => revealObserver.observe(el));

    return () => revealObserver.disconnect();
  }, [products, isLoading, searchTerm, selectedCategory]);

  const categories = [...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="flex-grow pt-36 pb-24 px-6 relative z-10 min-h-screen selection-red">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-12 reveal">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight font-serif">Artisan Catalog</h1>
          <p className="text-xl text-gray-400 font-light">Discover authentic handmade crafts.</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 reveal" style={{ transitionDelay: '100ms' }}>
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <iconify-icon icon="lucide:search" className="text-gray-400 text-xl"></iconify-icon>
            </div>
            <input 
              type="text" 
              placeholder="Search crafts..." 
              className="w-full bg-[#111] border border-white/10 text-white rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-[#FF4500] focus:ring-1 focus:ring-[#FF4500]/50 transition-all placeholder-gray-500 shadow-inner"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
              <iconify-icon icon="lucide:filter" className="text-gray-400 text-xl"></iconify-icon>
            </div>
            <select
              className="appearance-none relative flex items-center justify-center gap-2 bg-[#111] border border-white/10 text-white pl-12 pr-10 py-4 rounded-xl hover:border-[#FF4500]/50 hover:bg-[#151515] transition-all cursor-pointer focus:outline-none focus:border-[#FF4500] focus:ring-1 focus:ring-[#FF4500]/50 h-full w-full md:w-auto min-w-[200px]"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {/* Custom dropdown arrow */}
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400 z-10">
              <iconify-icon icon="lucide:chevron-down"></iconify-icon>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 reveal">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
              <div key={n} className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden flex flex-col animate-pulse">
                <div className="h-48 md:h-56 bg-white/5 w-full"></div>
                <div className="p-5 flex flex-col gap-3">
                  <div className="h-6 bg-white/5 rounded w-3/4"></div>
                  <div className="flex gap-2 mb-4">
                    <div className="h-5 bg-white/5 rounded-full w-16"></div>
                    <div className="h-5 bg-white/5 rounded-full w-16"></div>
                  </div>
                  <div className="mt-auto flex justify-between items-center pt-2">
                    <div className="h-6 bg-white/5 rounded w-1/4"></div>
                    <div className="h-8 bg-white/5 rounded w-16"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 reveal" style={{ transitionDelay: '200ms' }}>
              {filteredProducts.map(product => (
                <div key={product.id} className="product-card bg-[#111] border border-white/10 rounded-2xl overflow-hidden flex flex-col group transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(255,69,0,0.15)] hover:border-[#FF4500]/30 cursor-pointer">
                  <div className="relative h-48 md:h-56 bg-[#1a1a1a] overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-cover product-img-zoom transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80'}
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-xs font-semibold text-[#FF4500]">{product.category}</span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-white mb-3">{product.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {product.region && product.region !== 'Unknown' && (
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300">{product.region}</span>
                      )}
                      {product.material && product.material !== 'Unknown' && (
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300">{product.material}</span>
                      )}
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-xl font-bold text-[#FF4500]">₹{product.price}</span>
                      <button className="bg-[#FF4500] hover:bg-[#ff571a] text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors shadow-[0_4px_10px_rgba(255,69,0,0.3)] hover:shadow-[0_4px_15px_rgba(255,69,0,0.5)]">
                        Buy
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20 text-gray-400 reveal">
                <p>No products found matching your search.</p>
                <button 
                  className="mt-6 px-6 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                  onClick={() => {setSearchTerm(''); setSelectedCategory('');}}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}

