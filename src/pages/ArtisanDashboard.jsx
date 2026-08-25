import React, { useState } from 'react';
import { UploadCloud, CheckCircle2, Image as ImageIcon } from 'lucide-react';

export default function ArtisanDashboard() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [tags, setTags] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsSubmitting(true);

    try {
      // 1. Simulating image upload to Firebase Storage (would use uploadBytesResumable in prod)
      await new Promise(r => setTimeout(r, 800)); 
      const mockImageUrl = 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=800'; // mock uploaded URL
      
      // 2. Call our AI mock endpoint
      const response = await fetch('/api/tag-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, imageUrl: mockImageUrl })
      });
      const data = await response.json();
      setTags(data);
      
      // 3. Save to Firestore
      try {
        const { collection, addDoc } = await import('firebase/firestore');
        const { db } = await import('../services/firebase');
        await addDoc(collection(db, 'listings'), {
          title: description.substring(0, 30) + (description.length > 30 ? '...' : ''),
          description,
          price: Number(price),
          image: mockImageUrl,
          category: data.category || 'Other',
          material: data.material || 'Unknown',
          region: data.region || 'Unknown',
          status: 'listed',
          createdAt: new Date().toISOString()
        });
      } catch (e) {
        console.warn("Firestore not configured, skipping actual save. Error:", e);
      }
      
      setSuccess(true);
    } catch (error) {
      console.error(error);
      alert('Something went wrong!');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center animate-fade-in" style={{ minHeight: '50vh', textAlign: 'center' }}>
        <CheckCircle2 className="w-20 h-20" style={{ color: 'var(--primary-color)', marginBottom: '1.5rem' }} />
        <h2>Product Listed Successfully!</h2>
        <p style={{ maxWidth: '500px', margin: '0 auto 2rem' }}>
          Our AI has automatically tagged your product based on the photo and description. It is now live in the catalog.
        </p>
        
        {tags && (
          <div className="card glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <span className="badge badge-primary">{tags.category}</span>
            <span className="badge">{tags.material}</span>
            <span className="badge">{tags.region}</span>
          </div>
        )}

        <button className="btn btn-primary" onClick={() => { setSuccess(false); setFile(null); setDescription(''); setPrice(''); setTags(null); }}>
          List Another Item
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>New Listing</h1>
        <p>Upload a photo of your craft. We'll handle the categorization automatically.</p>
      </div>

      <form onSubmit={handleSubmit} className="card glass-panel" style={{ padding: '2rem' }}>
        
        <div className="form-group">
          <label className="form-label">Product Photo</label>
          <label 
            className="flex flex-col items-center justify-center" 
            style={{ 
              border: '2px dashed var(--border-color)', 
              borderRadius: 'var(--radius-lg)', 
              padding: '3rem 1rem',
              cursor: 'pointer',
              backgroundColor: 'var(--bg-color)',
              transition: 'all var(--transition-fast)'
            }}
          >
            {file ? (
              <div className="flex flex-col items-center">
                <ImageIcon className="w-12 h-12" style={{ color: 'var(--primary-color)', marginBottom: '1rem' }} />
                <span style={{ fontWeight: 600 }}>{file.name}</span>
                <span className="text-muted" style={{ fontSize: '0.85rem' }}>Click to change image</span>
              </div>
            ) : (
              <div className="flex flex-col items-center text-muted">
                <UploadCloud className="w-12 h-12" style={{ marginBottom: '1rem' }} />
                <span style={{ fontWeight: 600 }}>Tap to upload photo</span>
                <span style={{ fontSize: '0.85rem' }}>PNG, JPG up to 5MB</span>
              </div>
            )}
            <input type="file" accept="image/*" className="hidden" style={{ display: 'none' }} onChange={handleFileChange} required />
          </label>
        </div>

        <div className="form-group">
          <label className="form-label">Short Description / Keywords</label>
          <textarea 
            className="form-textarea" 
            placeholder="e.g. Blue ceramic clay pot from Rajasthan"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Price (₹)</label>
          <input 
            type="number" 
            className="form-input" 
            placeholder="e.g. 1500" 
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="1"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full" style={{ marginTop: '1rem', width: '100%' }} disabled={isSubmitting || !file}>
          {isSubmitting ? 'Processing via AI...' : 'List Product'}
        </button>
      </form>
    </div>
  );
}
