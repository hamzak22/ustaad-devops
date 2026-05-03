import React, { useState, useEffect } from 'react';
import { FiSearch, FiMapPin, FiCrosshair, FiGrid } from 'react-icons/fi';
import ProCard from '../components/ProCard';
import { categories, locations, professionals } from '../data/mockData';

const GeographicLanding = () => {
  const [userCity, setUserCity] = useState('');
  const [isDetecting, setIsDetecting] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  // Simulate location detection
  useEffect(() => {
    const timer = setTimeout(() => {
      // Defaulting to San Francisco for the demo
      setUserCity('San Francisco');
      setSearchLocation('San Francisco');
      setIsDetecting(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchLocation) {
      setUserCity(searchLocation);
    }
  };

  const localPros = professionals.filter(pro => pro.city === userCity);
  
  // Group pros by some categories for display
  const topPlumbers = localPros.filter(pro => pro.category === 'Plumbers').slice(0, 4);
  const topElectricians = localPros.filter(pro => pro.category === 'Electricians').slice(0, 4);
  const otherPros = localPros.filter(pro => !['Plumbers', 'Electricians'].includes(pro.category)).slice(0, 4);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-primary-900 text-white pt-20 pb-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Abstract Background shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary-800 opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-primary-700 opacity-40 blur-2xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Find the right pro, <br className="hidden sm:block" />
            <span className="text-primary-300">right in your neighborhood.</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-100 mb-10 max-w-2xl">
            Book trusted, background-checked professionals for all your home service needs. From quick fixes to major renovations.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="w-full max-w-4xl bg-white p-2 rounded-2xl shadow-xl flex flex-col md:flex-row gap-2">
            <div className="flex-1 relative flex items-center">
              <FiSearch className="absolute left-4 text-gray-400 h-5 w-5" />
              <input 
                type="text" 
                placeholder="What service do you need?" 
                className="w-full pl-12 pr-4 py-3 md:py-4 bg-transparent border-none focus:ring-0 text-gray-900 placeholder-gray-500 rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="hidden md:block w-px bg-gray-200 my-2"></div>
            <div className="flex-1 relative flex items-center border-t md:border-t-0 border-gray-100">
              <FiMapPin className="absolute left-4 text-gray-400 h-5 w-5" />
              <input 
                type="text" 
                placeholder="City or zip code" 
                className="w-full pl-12 pr-12 py-3 md:py-4 bg-transparent border-none focus:ring-0 text-gray-900 placeholder-gray-500 rounded-xl"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
              <button 
                type="button" 
                className="absolute right-4 text-primary-600 hover:text-primary-800"
                title="Use current location"
                onClick={() => setSearchLocation('San Francisco')}
              >
                <FiCrosshair className="h-5 w-5" />
              </button>
            </div>
            <button 
              type="submit" 
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 md:py-4 rounded-xl font-bold transition-colors shadow-md"
            >
              Search
            </button>
          </form>

          {/* Quick Links */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <span className="text-primary-200 text-sm font-medium self-center mr-2">Popular:</span>
            {['Plumbing', 'Electrical', 'House Cleaning', 'HVAC Repair'].map((term) => (
              <button key={term} className="px-4 py-1.5 rounded-full border border-primary-700 hover:bg-primary-800 text-sm font-medium transition-colors">
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Status indicator */}
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              {isDetecting ? 'Detecting your location...' : `Professionals in ${userCity}`}
            </h2>
            {!isDetecting && (
              <p className="text-gray-500 mt-2 flex items-center gap-2">
                <FiMapPin /> Displaying top-rated pros ready to work in your area.
              </p>
            )}
          </div>
        </div>

        {/* Loading State */}
        {isDetecting ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-white rounded-xl h-80 border border-gray-100 shadow-sm p-6 flex flex-col">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-16">
            
            {/* Top Plumbers Section */}
            {topPlumbers.length > 0 && (
              <section>
                <div className="flex justify-between items-end mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Top Rated Plumbers</h3>
                  <button className="text-primary-600 font-medium hover:text-primary-800 text-sm">See all Plumbers</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {topPlumbers.map(pro => (
                    <ProCard key={pro.id} pro={pro} />
                  ))}
                </div>
              </section>
            )}

            {/* Top Electricians Section */}
            {topElectricians.length > 0 && (
              <section>
                <div className="flex justify-between items-end mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Electricians near you</h3>
                  <button className="text-primary-600 font-medium hover:text-primary-800 text-sm">See all Electricians</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {topElectricians.map(pro => (
                    <ProCard key={pro.id} pro={pro} />
                  ))}
                </div>
              </section>
            )}

            {/* Other Pros Section */}
            {otherPros.length > 0 && (
              <section>
                <div className="flex justify-between items-end mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">More Experts in {userCity}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {otherPros.map(pro => (
                    <ProCard key={pro.id} pro={pro} />
                  ))}
                </div>
              </section>
            )}
            
            {localPros.length === 0 && (
              <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-400 mb-4">
                  <FiMapPin className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No professionals found in {userCity}</h3>
                <p className="text-gray-500 max-w-md mx-auto">We are rapidly expanding. Check back soon or try searching for another nearby city like San Francisco or New York.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Categories Grid */}
      <div className="bg-white border-t border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Browse all categories</h2>
            <p className="text-gray-500 mt-2">Discover the talent you need for any project.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <div key={cat.id} className="border border-gray-200 rounded-xl p-6 text-center hover:shadow-md hover:border-primary-300 cursor-pointer transition-all group">
                <div className="w-12 h-12 mx-auto bg-gray-50 text-primary-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary-50 transition-colors">
                  <FiGrid className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-gray-900">{cat.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeographicLanding;
