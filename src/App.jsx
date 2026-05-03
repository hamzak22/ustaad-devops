import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import GeographicLanding from './pages/GeographicLanding';
import GigListingPage from './pages/GigListingPage';
import ProfessionalProfilePage from './pages/ProfessionalProfilePage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<GeographicLanding />} />
            <Route path="/services" element={<GigListingPage />} />
            <Route path="/profile/:profileId" element={<ProfessionalProfilePage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
