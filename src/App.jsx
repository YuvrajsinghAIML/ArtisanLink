import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import ArtisanDashboard from './pages/ArtisanDashboard';
import BuyerCatalog from './pages/BuyerCatalog';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="artisan" element={<ArtisanDashboard />} />
          <Route path="catalog" element={<BuyerCatalog />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
