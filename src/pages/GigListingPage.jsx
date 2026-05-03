import React, { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FiFilter, FiMapPin, FiSearch, FiArrowRight } from 'react-icons/fi';
import GigCard from '../components/GigCard';
import { categories, gigListings, professionals } from '../data/siteData';

const GigListingPage = () => {
  const [searchParams] = useSearchParams();
  const serviceQuery = searchParams.get('service')?.toLowerCase() || '';
  const locationQuery = searchParams.get('location')?.toLowerCase() || '';
  const categoryQuery = searchParams.get('category')?.toLowerCase() || '';
  const professionalQuery = searchParams.get('professional') || '';

  const filteredGigs = useMemo(() => {
    return gigListings.filter((gig) => {
      const seller = professionals.find((pro) => pro.id === gig.professionalId);
      const matchesService = !serviceQuery || gig.title.toLowerCase().includes(serviceQuery) || gig.shortDescription.toLowerCase().includes(serviceQuery);
      const matchesLocation = !locationQuery || gig.city.toLowerCase().includes(locationQuery);
      const matchesCategory = !categoryQuery || gig.category.toLowerCase().includes(categoryQuery);
      const matchesProfessional = !professionalQuery || gig.professionalId === professionalQuery;
      return matchesService && matchesLocation && matchesCategory && matchesProfessional && Boolean(seller);
    });
  }, [categoryQuery, locationQuery, professionalQuery, serviceQuery]);

  const activeLabel = serviceQuery || categoryQuery || locationQuery || professionalQuery ? 'Filtered results' : 'All service scopes';

  return (
    <div className="bg-gray-50">
      <section className="relative overflow-hidden bg-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="absolute -right-16 -top-16 h-80 w-80 rounded-full bg-primary-700/40 blur-3xl" />
        <div className="absolute -bottom-20 left-0 h-72 w-72 rounded-full bg-amber-500/20 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-primary-100 backdrop-blur">
              <FiFilter /> {activeLabel}
            </div>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
              Service scopes built for real jobs, not generic resumes.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Browse fixed-price gigs for common home projects, compare deliverables, and jump straight to a verified pro profile.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/" className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-slate-100">
              Back to home
            </Link>
            <Link to={`/profile/${professionals[0].id}`} className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
              View a verified profile
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.6fr_0.8fr]">
          <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Browse gigs</h2>
                <p className="mt-1 text-gray-500">Each card has a fixed scope, clear pricing, and a direct path to the seller profile.</p>
              </div>
              <div className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-gray-200">
                {filteredGigs.length} listings found
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
              {filteredGigs.map((gig) => {
                const seller = professionals.find((pro) => pro.id === gig.professionalId);
                return <GigCard key={gig.id} gig={gig} seller={seller} />;
              })}
            </div>

            {filteredGigs.length === 0 && (
              <div className="mt-8 rounded-3xl border border-dashed border-gray-300 bg-white p-10 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                  <FiSearch className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-gray-900">No gigs match your filters</h3>
                <p className="mx-auto mt-2 max-w-xl text-gray-500">
                  Try a broader service name, remove the location filter, or jump back to the home page to explore featured scopes.
                </p>
                <Link to="/services" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700">
                  Clear filters <FiArrowRight />
                </Link>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900">Common scopes</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/services?category=${encodeURIComponent(category.name)}`}
                    className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-primary-50 hover:text-primary-700"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-xl">
              <h3 className="text-lg font-bold">How this marketplace is structured</h3>
              <div className="mt-4 space-y-4 text-sm leading-6 text-slate-300">
                <p><strong className="text-white">Fixed scope:</strong> Every gig has deliverables, not just a vague estimate.</p>
                <p><strong className="text-white">Verified seller:</strong> The profile page shows certifications, gallery work, and reviews.</p>
                <p><strong className="text-white">Linked flow:</strong> Gig listings connect back to each professional’s portfolio page.</p>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900">Quick jump</h3>
              <div className="mt-4 space-y-3">
                {professionals.slice(0, 3).map((pro) => (
                  <Link
                    key={pro.id}
                    to={`/profile/${pro.id}`}
                    className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 p-4 transition-colors hover:border-primary-200 hover:bg-primary-50"
                  >
                    <div>
                      <div className="font-semibold text-gray-900">{pro.name}</div>
                      <div className="text-sm text-gray-500">{pro.category} • {pro.city}</div>
                    </div>
                    <FiArrowRight className="text-primary-600" />
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default GigListingPage;