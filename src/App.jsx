import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import GeographicLanding from './pages/GeographicLanding';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<GeographicLanding />} />
            {/* Future routes like search results, profile, etc. can go here */}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
