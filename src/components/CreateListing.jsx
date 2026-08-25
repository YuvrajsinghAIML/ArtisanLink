import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, MapPin, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';

export default function CreateListing() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  
  // Location State
  const [location, setLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState('');
  
  // AI Generation State
  const [aiDetails, setAiDetails] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Manual Input State
  const [price, setPrice] = useState('');
  
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const detectLocation = () => {
    setIsLocating(true);
    setLocationError('');
    
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          
          const state = data.address.state || data.address.region || '';
          const district = data.address.state_district || data.address.county || data.address.city || '';
          
          setLocation(`${district ? district + ', ' : ''}${state}`);
        } catch (error) {
          setLocationError('Failed to fetch location details');
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        setLocationError('Unable to retrieve your location');
        setIsLocating(false);
      }
    );
  };

  const generateAIDetails = async () => {
    if (!image) {
      alert("Please upload an image first!");
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate 2-second AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setAiDetails({
      title: "Handcrafted Traditional Masterpiece",
      description: "A beautiful, locally sourced handcrafted piece showcasing extraordinary artisan skill. Perfect for bringing an authentic, cultural touch to any modern living space.",
      category: "Pottery",
      material: "Clay"
    });
    
    setIsGenerating(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image || !price) {
      alert("Please upload an image and enter a price.");
      return;
    }
    
    const payload = {
      image: image.name,
      location: location || 'Not specified',
      aiDetails: aiDetails || 'Not generated',
      price: price
    };
    
    console.log("FINAL LISTING PAYLOAD:", payload);
    alert("Product Listed! Check console for details.");
  };

  return (
    <div className="min-h-screen text-white p-6 flex justify-center items-center" style={{ backgroundColor: '#121212' }}>
      <div className="max-w-md w-full p-6 rounded-2xl border border-gray-800 shadow-2xl" style={{ backgroundColor: '#1e1e1e' }}>
        <h1 className="text-3xl font-bold mb-6 text-center" style={{ 
          background: 'linear-gradient(to right, #7c3aed, #ec4899)', 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent' 
        }}>
          New Listing
        </h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          {/* Image Upload Area */}
          <div 
            className="relative w-full h-56 rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all duration-300"
            style={{ 
              borderColor: imagePreview ? '#ec4899' : '#7c3aed',
              backgroundColor: 'rgba(124, 58, 237, 0.05)'
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
            ) : (
              <div className="flex flex-col items-center p-4 text-center">
                <UploadCloud className="w-12 h-12 mb-2" style={{ color: '#7c3aed' }} />
                <p className="font-semibold text-lg text-gray-200">Tap to Upload Photo</p>
                <p className="text-xs mt-1" style={{ color: '#9ca3af' }}>Make sure the item is well-lit</p>
              </div>
            )}
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleImageChange} 
            />
          </div>

          {/* Location Button */}
          <div className="flex flex-col gap-2">
            <button 
              type="button" 
              onClick={detectLocation}
              disabled={isLocating}
              className="flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-colors"
              style={{ 
                backgroundColor: 'rgba(124, 58, 237, 0.1)',
                color: '#c4b5fd',
                border: '1px solid rgba(124, 58, 237, 0.3)'
              }}
            >
              {isLocating ? <Loader2 className="w-5 h-5 animate-spin" /> : <MapPin className="w-5 h-5" />}
              {isLocating ? 'Detecting Location...' : 'Detect My Location'}
            </button>
            {location && (
              <div className="flex items-center justify-center gap-1 text-sm mt-1" style={{ color: '#34d399' }}>
                <CheckCircle2 className="w-4 h-4" /> {location}
              </div>
            )}
            {locationError && (
              <p className="text-xs text-center" style={{ color: '#f87171' }}>{locationError}</p>
            )}
          </div>

          {/* AI Auto-Generate Button */}
          <div className="flex flex-col gap-2">
            <button 
              type="button" 
              onClick={generateAIDetails}
              disabled={isGenerating || !image}
              className="flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-colors"
              style={{ 
                background: !image ? '#374151' : 'linear-gradient(45deg, #7c3aed, #ec4899)',
                color: !image ? '#9ca3af' : 'white',
                border: 'none',
                boxShadow: !image ? 'none' : '0 4px 15px rgba(236, 72, 153, 0.3)',
                cursor: !image ? 'not-allowed' : 'pointer'
              }}
            >
              {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
              {isGenerating ? 'Analyzing Image...' : 'Auto-Generate Details (AI)'}
            </button>
            
            {/* AI Generated Details Display */}
            {aiDetails && !isGenerating && (
              <div className="p-4 rounded-xl mt-2 text-sm flex flex-col gap-2" style={{ backgroundColor: '#2a2a2a', border: '1px solid #374151' }}>
                <p className="font-semibold text-lg" style={{ color: '#ec4899' }}>{aiDetails.title}</p>
                <p className="italic" style={{ color: '#d1d5db' }}>"{aiDetails.description}"</p>
                <div className="flex gap-2 mt-1">
                  <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(124, 58, 237, 0.2)', color: '#c4b5fd' }}>
                    🏷️ {aiDetails.category}
                  </span>
                  <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(236, 72, 153, 0.2)', color: '#fbcfe8' }}>
                    ✂️ {aiDetails.material}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Minimal Input - Price */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" style={{ color: '#9ca3af' }}>Price (₹)</label>
            <input 
              type="number" 
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g. 500" 
              className="w-full rounded-xl px-4 py-3 focus:outline-none transition-colors"
              style={{ 
                backgroundColor: '#2a2a2a', 
                border: '1px solid #374151',
                color: 'white'
              }}
              required
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full py-4 rounded-xl font-bold text-lg mt-4 transition-transform"
            style={{ 
              backgroundColor: '#ec4899',
              color: 'white',
              boxShadow: '0 4px 20px rgba(236, 72, 153, 0.4)',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            List Product
          </button>
          
        </form>
      </div>
    </div>
  );
}
