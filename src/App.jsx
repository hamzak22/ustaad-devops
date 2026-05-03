import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSearch, FiMenu, FiBell } from 'react-icons/fi';

// Placeholder components
const Navbar = () => (
  <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16">
        <div className="flex items-center">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-primary-600 tracking-tight">Ustaad</span>
          </div>
          <div className="hidden md:ml-8 md:flex md:space-x-8">
            <a href="#" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-primary-500 text-sm font-medium">Find Work</a>
            <a href="#" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">My Jobs</a>
            <a href="#" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">Messages</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-gray-700">
            <FiSearch className="h-5 w-5" />
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <FiBell className="h-5 w-5" />
          </button>
          <div className="h-8 w-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold">
            U
          </div>
          <button className="md:hidden text-gray-500 hover:text-gray-700">
            <FiMenu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  </nav>
);

const Home = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900">Recommended Jobs</h1>
      <p className="text-gray-500 mt-1">Based on your skills and preferences</p>
    </div>

    <div className="flex flex-col lg:flex-row gap-8">
      <div className="lg:w-3/4 space-y-4">
        {[1, 2, 3, 4].map((job) => (
          <div key={job} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 hover:text-primary-600 transition-colors">Experienced React Developer Needed for Marketplace</h2>
                <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                  <span className="font-medium text-gray-700">Hourly: $30.00 - $50.00</span>
                  <span>&bull;</span>
                  <span>Intermediate</span>
                  <span>&bull;</span>
                  <span>Est. Time: 1 to 3 months, Less than 30 hrs/week</span>
                </div>
              </div>
            </div>
            
            <p className="mt-4 text-gray-600 line-clamp-3">
              We are looking for an experienced React developer to help us build out new features for our existing service marketplace platform. The ideal candidate will have strong experience with React, Vite, Tailwind CSS, and state management. You will be working closely with our design team to implement responsive and pixel-perfect UIs...
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {['React', 'Tailwind CSS', 'Vite', 'Frontend Development'].map((tag) => (
                <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-6 flex items-center text-sm text-gray-500 gap-4">
              <div className="flex items-center gap-1">
                <span className="font-medium text-gray-700">Payment verified</span>
              </div>
              <div className="flex items-center gap-1">
                <span>$10k+ spent</span>
              </div>
              <div className="flex items-center gap-1">
                <span>United States</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="lg:w-1/4">
        <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Profile</h3>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-xl">
              U
            </div>
            <div>
              <div className="font-medium text-gray-900">Ustaad User</div>
              <div className="text-sm text-gray-500">Frontend Developer</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Profile Completeness</span>
                <span className="font-medium text-gray-900">80%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary-500 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
          </div>

          <button className="mt-6 w-full py-2 px-4 bg-white border-2 border-primary-600 text-primary-600 font-medium rounded-lg hover:bg-primary-50 transition-colors">
            Update Profile
          </button>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
