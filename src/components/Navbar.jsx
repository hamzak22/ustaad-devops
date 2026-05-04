import React, { useEffect, useState } from 'react';
import { FiSearch, FiBell, FiMenu, FiX, FiChevronRight, FiGrid, FiHome, FiUser, FiBriefcase, FiZap, FiDroplet, FiCheckCircle, FiPlus } from 'react-icons/fi';
import { Link, NavLink } from 'react-router-dom';
import { categories, gigListings, professionals } from '../data/siteData';

const featuredProfile = professionals[0];
const featuredGig = gigListings[0];

const primaryLinks = [
  { to: '/', label: 'Find Pros', icon: FiHome, end: true },
  { to: '/services', label: 'Gig Marketplace', icon: FiBriefcase },
  { to: '/project/1', label: 'My Projects', icon: FiCheckCircle },
];

const categoryIcons = {
  Plumbers: FiDroplet,
  Electricians: FiZap,
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 gap-4">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-black text-primary-600 tracking-tight">Ustaad</span>
            </Link>
            <div className="hidden lg:ml-10 lg:flex lg:items-center lg:space-x-2">
              {primaryLinks.map(({ to, label, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition-colors ${isActive ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`
                  }
                >
                  {label}
                </NavLink>
              ))}
              <Link
                to="/post-job"
                className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-4 py-2 text-sm font-bold text-white transition-all hover:bg-primary-700 shadow-lg shadow-primary-200 ml-4"
              >
                <FiPlus className="h-4 w-4" /> Post a Job
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-5">
            <Link
              to={`/services?professional=${featuredProfile.id}`}
              className="hidden xl:inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700"
            >
              <FiGrid className="h-4 w-4" /> Quick scope view
            </Link>
            <button className="text-gray-500 hover:text-gray-900 transition-colors hidden sm:inline-flex">
              <span className="sr-only">Search</span>
              <FiSearch className="h-5 w-5" />
            </button>
            <button className="text-gray-500 hover:text-gray-900 transition-colors relative hidden sm:inline-flex">
              <span className="sr-only">Notifications</span>
              <FiBell className="h-5 w-5" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>
            <div className="hidden lg:flex items-center gap-3 ml-2 pl-4 border-l border-gray-200">
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">Ustaad User</div>
                <div className="text-xs text-gray-500">Customer</div>
              </div>
              <div className="h-9 w-9 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold shadow-sm border border-primary-200 cursor-pointer">
                U
              </div>
            </div>
            <button
              className="lg:hidden inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white p-2 text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open menu</span>
              <FiMenu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/50"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu overlay"
          />
          <aside className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <div>
                <div className="text-lg font-black text-primary-600">Ustaad</div>
                <div className="text-xs text-gray-500">Marketplace navigation</div>
              </div>
              <button
                type="button"
                className="rounded-xl border border-gray-200 p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            <div className="h-[calc(100%-4rem)] overflow-y-auto px-5 py-5">
              <div className="space-y-2">
                {primaryLinks.map(({ to, label, icon: Icon, end }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={end}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors ${isActive ? 'border-primary-200 bg-primary-50 text-primary-700' : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700'}`
                    }
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      {label}
                    </span>
                    <FiChevronRight className="h-4 w-4" />
                  </NavLink>
                ))}
              </div>

              <div className="mt-6 rounded-3xl bg-slate-950 p-5 text-white">
                <div className="text-sm font-semibold text-primary-200">Featured marketplace view</div>
                <div className="mt-2 text-lg font-bold">{featuredGig.title}</div>
                <div className="mt-3 flex items-center justify-between text-sm text-slate-300">
                  <span>${featuredGig.price} fixed price</span>
                  <Link to={`/services?professional=${featuredProfile.id}`} onClick={() => setIsMenuOpen(false)} className="font-semibold text-white underline underline-offset-4">
                    Open listing
                  </Link>
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Category shortcuts</div>
                <div className="space-y-2">
                  {categories.map((category) => {
                    const Icon = categoryIcons[category.name] || FiGrid;
                    return (
                      <NavLink
                        key={category.id}
                        to={`/services?category=${encodeURIComponent(category.name)}`}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-between rounded-2xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700"
                      >
                        <span className="flex items-center gap-3">
                          <Icon className="h-4 w-4 text-primary-600" />
                          {category.name}
                        </span>
                        <FiChevronRight className="h-4 w-4" />
                      </NavLink>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 rounded-3xl border border-gray-200 bg-gray-50 p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Quick links</div>
                <div className="mt-3 grid gap-2">
                  <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-sm font-semibold text-primary-700 hover:text-primary-800">
                    Home landing
                  </Link>
                  <Link to="/services" onClick={() => setIsMenuOpen(false)} className="text-sm font-semibold text-primary-700 hover:text-primary-800">
                    Gig marketplace
                  </Link>
                  <Link to={`/profile/${featuredProfile.id}`} onClick={() => setIsMenuOpen(false)} className="text-sm font-semibold text-primary-700 hover:text-primary-800">
                    Featured profile
                  </Link>
                  <Link to="/bids/1" onClick={() => setIsMenuOpen(false)} className="text-sm font-semibold text-primary-700 hover:text-primary-800">
                    Submit Bid (Pro View)
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
