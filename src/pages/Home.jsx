import React from 'react';
import { Link } from 'react-router-dom';
import { Store, User, ArrowRight } from 'lucide-react';
import WaveBackground from '../components/WaveBackground';

export default function Home() {
  return (
    <>
      <WaveBackground />
      <div className="flex flex-col items-center justify-center animate-fade-in" style={{ minHeight: '60vh', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Empowering Artisans, Connecting Markets
      </h1>
      <p style={{ fontSize: '1.25rem', maxWidth: '600px', marginBottom: '3rem' }}>
        ArtisanLink uses AI to help marginalized artisans easily catalog and sell their authentic handmade crafts to a global audience.
      </p>

      <div className="grid sm:grid-cols-2 gap-6 w-full" style={{ maxWidth: '800px' }}>
        
        <div className="card glass-panel" style={{ padding: '2rem', textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
          <div style={{ background: 'hsla(var(--primary-hue), 85%, 55%, 0.1)', width: '60px', height: '60px', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--primary-color)' }}>
            <Store className="w-8 h-8" />
          </div>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>I am an Artisan</h2>
          <p style={{ flex: 1, marginBottom: '2rem' }}>Snap a photo of your craft. Our AI will automatically tag and list it for buyers.</p>
          <Link to="/artisan" className="btn btn-primary w-full" style={{ justifyContent: 'space-between' }}>
            Start Selling <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="card glass-panel" style={{ padding: '2rem', textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
          <div style={{ background: 'hsla(340, 85%, 55%, 0.1)', width: '60px', height: '60px', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--accent-color)' }}>
            <User className="w-8 h-8" />
          </div>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>I am a Buyer</h2>
          <p style={{ flex: 1, marginBottom: '2rem' }}>Discover authentic, beautifully crafted goods directly from the makers.</p>
          <Link to="/catalog" className="btn btn-secondary w-full" style={{ justifyContent: 'space-between', borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}>
            Shop Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </div>
    </>
  );
}
