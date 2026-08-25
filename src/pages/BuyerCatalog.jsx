import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../services/firebase';

const MOCK_PRODUCTS = [
  { id: 'm1', title: 'Handwoven Silk Sari', price: 4500, category: 'Textiles', region: 'Assam', material: 'Silk', image: 'https://images.unsplash.com/photo-1610030469983-98e550d615ef?auto=format&fit=crop&q=80&w=800' },
  { id: 'm2', title: 'Terracotta Clay Pot', price: 850, category: 'Pottery', region: 'Rajasthan', material: 'Clay', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=800' },
  { id: 'm3', title: 'Carved Wooden Elephant', price: 1200, category: 'Woodwork', region: 'Odisha', material: 'Wood', image: 'https://images.unsplash.com/photo-1611077544795-c2666ee3cecb?auto=format&fit=crop&q=80&w=800' },
  { id: 'm4', title: 'Brass Temple Bell', price: 2100, category: 'Metalwork', region: 'Gujarat', material: 'Brass', image: 'https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?auto=format&fit=crop&q=80&w=800' },
];

export default function BuyerCatalog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const q = query(collection(db, 'listings'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetchedProducts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        if (fetchedProducts.length > 0) {
          // Combine fetched with mock, or just use fetched
          setProducts([...fetchedProducts, ...MOCK_PRODUCTS]);
        }
      } catch (error) {
        console.warn("Firestore fetch failed, using fallback mock data. Error:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProducts();
  }, []);

  const categories = [...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center" style={{ marginBottom: '2rem', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Artisan Catalog</h1>
          <p>Discover authentic handmade crafts.</p>
        </div>
        
        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
            <Search className="w-5 h-5 text-muted" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="Search crafts..." 
              style={{ paddingLeft: '3rem' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div style={{ position: 'relative' }}>
            <Filter className="w-4 h-4 text-muted" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <select 
              className="form-select" 
              style={{ paddingLeft: '2.5rem', appearance: 'none' }}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem' }}>Loading catalog...</div>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="card glass-panel flex flex-col">
                <div style={{ height: '200px', overflow: 'hidden', position: 'relative', backgroundColor: 'var(--border-color)' }}>
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }} 
                    className="hover-scale"
                    onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80'}
                  />
                  <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
                    <span className="badge badge-primary" style={{ backgroundColor: 'rgba(255,255,255,0.95)', boxShadow: 'var(--shadow-sm)' }}>{product.category}</span>
                  </div>
                </div>
                
                <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', lineHeight: '1.4' }}>{product.title}</h3>
                  <div className="flex gap-2" style={{ marginBottom: '1rem', flexWrap: 'wrap' }}>
                    {product.region && product.region !== 'Unknown' && <span className="badge">{product.region}</span>}
                    {product.material && product.material !== 'Unknown' && <span className="badge">{product.material}</span>}
                  </div>
                  <div className="flex justify-between items-center" style={{ marginTop: 'auto' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary-color)' }}>₹{product.price}</span>
                    <button className="btn btn-primary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}>Buy</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <p>No products found matching your search.</p>
              <button className="btn btn-secondary mt-4" style={{ marginTop: '1rem' }} onClick={() => {setSearchTerm(''); setSelectedCategory('')}}>Clear Filters</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
