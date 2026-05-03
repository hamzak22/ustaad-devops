import React from 'react';
import { FiSearch, FiBell, FiMenu } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-black text-primary-600 tracking-tight">Ustaad</span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link to="/" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-primary-500 text-sm font-semibold">
                Find Pros
              </Link>
              <a href="#" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium transition-colors">
                My Bookings
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium transition-colors">
                Messages
              </a>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <button className="text-gray-500 hover:text-gray-900 transition-colors">
              <span className="sr-only">Search</span>
              <FiSearch className="h-5 w-5" />
            </button>
            <button className="text-gray-500 hover:text-gray-900 transition-colors relative">
              <span className="sr-only">Notifications</span>
              <FiBell className="h-5 w-5" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>
            <div className="hidden md:flex items-center gap-3 ml-2 pl-4 border-l border-gray-200">
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">Ustaad User</div>
                <div className="text-xs text-gray-500">Customer</div>
              </div>
              <div className="h-9 w-9 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold shadow-sm border border-primary-200 cursor-pointer">
                U
              </div>
            </div>
            <button className="md:hidden text-gray-500 hover:text-gray-900">
              <span className="sr-only">Open menu</span>
              <FiMenu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
