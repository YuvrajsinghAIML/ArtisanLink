import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Package } from 'lucide-react';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="navbar glass-panel">
        <div className="container nav-container">
          <Link to="/" className="nav-logo">
            <Package className="w-8 h-8" />
            <span>ArtisanLink</span>
          </Link>
          <nav className="flex gap-4 items-center">
            <Link to="/catalog" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Shop Catalog</Link>
            <Link to="/artisan" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Artisan Portal</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 container" style={{ paddingBottom: '3rem', paddingTop: '2rem' }}>
        <Outlet />
      </main>

      <footer className="glass-panel" style={{ padding: '2rem 0', marginTop: 'auto', borderTop: '1px solid var(--border-color)' }}>
        <div className="container flex justify-between items-center">
          <p className="text-muted" style={{ margin: 0, fontSize: '0.9rem' }}>&copy; 2026 ArtisanLink - By Aura Artisans</p>
        </div>
      </footer>
    </div>
  );
}
