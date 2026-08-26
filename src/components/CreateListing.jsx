import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, MapPin, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';

export default function CreateListing() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  
  // Location State
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState('');
  
  // AI Generation State
  const [aiDetails, setAiDetails] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Manual Input State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
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
          const postcode = data.address.postcode || '';
          
          setAddress(`${district ? district + ', ' : ''}${state}`);
          setPincode(postcode);
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
    
    setTitle("Handcrafted Traditional Masterpiece");
    setDescription("A beautiful, locally sourced handcrafted piece showcasing extraordinary artisan skill. Perfect for bringing an authentic, cultural touch to any modern living space.");
    setAiDetails({
      category: "Pottery",
      material: "Clay",
      specialty: "Hand-painted Traditional Motifs"
    });
    
    setIsGenerating(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image || !price || !title || !description) {
      alert("Please fill all required fields and upload an image.");
      return;
    }
    
    const payload = {
      image: image.name,
      title,
      description,
      address,
      pincode,
      aiDetails: aiDetails || 'Not generated',
      price: price
    };
    
    console.log("FINAL LISTING PAYLOAD:", payload);
    alert("Product Listed! Check console for details.");
  };

  return (
    <main className="flex-grow flex flex-col items-center justify-center pt-[120px] pb-20 relative z-10 px-6">
      
      {/* Aurora Background Elements (Subtle) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="aurora-blade w-[600px] h-[300px] -top-20 -left-20 rotate-12 animate-float opacity-30"></div>
          <div className="aurora-blade w-[500px] h-[400px] bottom-0 -right-20 -rotate-12 animate-float opacity-30" style={{ animationDelay: '-5s' }}></div>
      </div>

      {/* Header */}
      <div className="text-center mb-8 relative z-20">
          <h1 className="text-5xl md:text-6xl font-serif font-semibold text-white mb-4">
              New <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF1493] to-[#FF4500]">Listing</span>
          </h1>
          <p className="text-gray-400 text-lg font-light">Snap a photo and our AI will help you list it</p>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-[480px] relative z-20">
          
          {/* Photo Upload Section */}
          <div 
            className="w-full h-48 bg-[#1a1a1a] rounded-xl border border-dashed flex flex-col items-center justify-center mb-8 cursor-pointer hover:bg-[#1f1f1f] transition-all group overflow-hidden" 
            style={{ borderColor: imagePreview ? '#FF4500' : 'rgba(255, 255, 255, 0.2)' }}
            onClick={() => fileInputRef.current?.click()}
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
            ) : (
              <div className="flex flex-col items-center">
                <UploadCloud className="w-10 h-10 text-[#FF1493] mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-white font-medium mb-1">Tap to Upload Photo</span>
                <span className="text-gray-500 text-sm">Make sure the item is well-lit</span>
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

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              {/* Location Button */}
              <button 
                type="button" 
                onClick={detectLocation}
                disabled={isLocating}
                className="w-full bg-blue-900/30 border border-blue-500/20 text-blue-400 hover:bg-blue-900/50 hover:border-blue-500/40 py-4 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors font-medium"
              >
                  {isLocating ? <Loader2 className="w-5 h-5 animate-spin" /> : <MapPin className="w-5 h-5" />}
                  {isLocating ? 'Detecting Location...' : 'Detect My Location'}
              </button>
              
              {locationError && (
                <p className="text-xs text-center text-red-400">{locationError}</p>
              )}

              {/* Address Fields */}
              <div className="space-y-4">
                  <div className="flex flex-col">
                      <label htmlFor="address" className="text-gray-300 text-sm font-medium mb-2">Address</label>
                      <input 
                        type="text" 
                        id="address" 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="e.g. Jaipur, Rajasthan" 
                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#FF4500] focus:ring-1 focus:ring-[#FF4500] transition-colors text-sm" 
                        required
                      />
                  </div>
                  <div className="flex flex-col">
                      <label htmlFor="pincode" className="text-gray-300 text-sm font-medium mb-2">Pincode</label>
                      <input 
                        type="text" 
                        id="pincode" 
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="e.g. 302001" 
                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#FF4500] focus:ring-1 focus:ring-[#FF4500] transition-colors text-sm" 
                        required
                      />
                  </div>
              </div>

              {/* AI Generate Button */}
              <button 
                type="button" 
                onClick={generateAIDetails}
                disabled={isGenerating || !image}
                className="w-full bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border border-gray-600 text-gray-300 hover:text-white hover:border-[#FF4500]/50 py-4 px-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_15px_rgba(255,69,0,0.15)] mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                  {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5 text-[#FF4500]" />}
                  {isGenerating ? 'Analyzing Image...' : 'Auto-Generate Details (AI)'}
              </button>
              
              {/* AI Generated Details Display */}
              {aiDetails && !isGenerating && (
                <div className="p-4 rounded-xl mt-2 text-sm flex flex-col gap-2 bg-[#1a1a1a] border border-white/10">
                  <p className="text-gray-300 font-medium mb-1">Generated Tags:</p>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 rounded text-xs bg-purple-900/30 text-purple-300 border border-purple-500/20">
                      🏷️ {aiDetails.category}
                    </span>
                    <span className="px-2 py-1 rounded text-xs bg-pink-900/30 text-pink-300 border border-pink-500/20">
                      ✂️ {aiDetails.material}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-1">
                    <span className="px-2 py-1 rounded text-xs bg-green-900/30 text-green-300 border border-green-500/20">
                      ✨ {aiDetails.specialty}
                    </span>
                  </div>
                </div>
              )}

              {/* Product Details */}
              <div className="space-y-4 mt-2">
                  <div className="flex flex-col">
                      <label htmlFor="title" className="text-gray-300 text-sm font-medium mb-2">Title</label>
                      <input 
                        type="text" 
                        id="title" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Handcrafted Wooden Bowl" 
                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#FF4500] focus:ring-1 focus:ring-[#FF4500] transition-colors text-sm" 
                        required
                      />
                  </div>
                  
                  <div className="flex flex-col">
                      <label htmlFor="description" className="text-gray-300 text-sm font-medium mb-2">Description</label>
                      <textarea 
                        id="description" 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4" 
                        placeholder="Describe your product..." 
                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#FF4500] focus:ring-1 focus:ring-[#FF4500] transition-colors text-sm resize-none"
                        required
                      ></textarea>
                  </div>

                  <div className="flex flex-col">
                      <label htmlFor="price" className="text-gray-300 text-sm font-medium mb-2">Price (₹)</label>
                      <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                          <input 
                            type="number" 
                            id="price" 
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="e.g. 500" 
                            className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg py-3 pl-8 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#FF4500] focus:ring-1 focus:ring-[#FF4500] transition-colors text-sm" 
                            required
                          />
                      </div>
                  </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="w-full bg-[#FF4500] text-white font-semibold py-4 rounded-xl hover:bg-[#ff571a] transition-all hover:shadow-[0_0_20px_rgba(255,69,0,0.4)] hover:scale-[1.02] mt-6 flex items-center justify-center gap-2"
              >
                  List Product <Sparkles className="w-5 h-5" />
              </button>

          </form>
      </div>
    </main>
  );
}
