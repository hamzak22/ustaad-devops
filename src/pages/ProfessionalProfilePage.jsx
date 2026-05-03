import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiAward, FiCheckCircle, FiClock, FiMapPin, FiStar, FiArrowLeft, FiGrid, FiShield, FiMessageSquare } from 'react-icons/fi';
import GigCard from '../components/GigCard';
import { getGigsByProfessionalId, getProfessionalById, professionals } from '../data/siteData';

const ProfessionalProfilePage = () => {
  const { profileId } = useParams();
  const professional = getProfessionalById(profileId);

  const relatedPros = useMemo(() => {
    if (!professional) return [];
    return professionals.filter((pro) => pro.category === professional.category && pro.id !== professional.id).slice(0, 3);
  }, [professional]);

  if (!professional) {
    return (
      <div className="mx-auto flex max-w-3xl flex-1 flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="text-3xl font-black text-gray-900">Profile not found</h1>
        <p className="mt-3 text-gray-500">The professional you were looking for does not exist.</p>
        <Link to="/services" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700">
          Browse service scopes <FiArrowLeft />
        </Link>
      </div>
    );
  }

  const gigs = getGigsByProfessionalId(professional.id);

  return (
    <div className="bg-gray-50">
      <section className="bg-slate-950 px-4 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-200 hover:text-white">
            <FiArrowLeft /> Back to gigs
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur">
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div className="flex items-start gap-5">
                  <div className="relative">
                    <img src={professional.avatar} alt={professional.name} className="h-24 w-24 rounded-3xl object-cover ring-4 ring-white/10" />
                    {professional.verified && (
                      <span className="absolute -bottom-2 -right-2 inline-flex items-center rounded-full bg-emerald-500 px-2.5 py-1 text-xs font-semibold text-white shadow-lg">
                        Verified
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary-500/20 px-3 py-1 text-xs font-semibold text-primary-100">
                      {professional.category}
                    </div>
                    <h1 className="mt-3 text-3xl font-black tracking-tight text-white">{professional.name}</h1>
                    <p className="mt-2 text-lg text-slate-300">{professional.role}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-300">
                      <span className="inline-flex items-center gap-1.5"><FiMapPin /> {professional.city}</span>
                      <span className="inline-flex items-center gap-1.5"><FiClock /> {professional.responseTime}</span>
                      <span className="inline-flex items-center gap-1.5"><FiShield /> {professional.completedJobs} completed jobs</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl bg-white p-5 text-slate-950 shadow-xl">
                  <div className="text-sm font-medium text-slate-500">Starting price</div>
                  <div className="mt-1 text-3xl font-black">${professional.startingPrice}</div>
                  <div className="mt-1 text-sm text-slate-500">Fixed scope packages available</div>
                  <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-amber-500">
                    <FiStar className="fill-amber-400" /> {professional.rating} from {professional.reviewsCount} reviews
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link to={`/services?professional=${professional.id}`} className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-slate-100">
                  See all service scopes
                </Link>
                <Link to="/services" className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                  Compare other pros
                </Link>
              </div>

              <p className="mt-8 max-w-3xl text-base leading-8 text-slate-300">
                {professional.bio}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {professional.serviceScopes.map((scope) => (
                  <div key={scope} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-sm font-semibold text-white">{scope}</div>
                    <div className="mt-1 text-xs text-slate-400">Clear scope, fixed deliverables, and direct booking path.</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-gray-200">
                <div className="flex items-center gap-2 text-sm font-semibold text-primary-600">
                  <FiAward /> Certifications and licenses
                </div>
                <div className="mt-4 space-y-3">
                  {professional.certifications.map((cert) => (
                    <div key={cert} className="flex items-center gap-3 rounded-2xl bg-gray-50 p-4">
                      <FiCheckCircle className="text-green-500" />
                      <span className="text-sm font-medium text-gray-700">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-gray-200">
                <div className="flex items-center gap-2 text-sm font-semibold text-primary-600">
                  <FiMessageSquare /> Verified review highlights
                </div>
                <div className="mt-4 space-y-4">
                  {professional.reviews.map((review) => (
                    <div key={review.id} className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="font-semibold text-gray-900">{review.name}</div>
                        <div className="flex items-center gap-1 text-sm font-semibold text-amber-500">
                          <FiStar className="fill-amber-400" /> {review.rating}
                        </div>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-gray-600">“{review.quote}”</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Portfolio gallery</h2>
            <p className="mt-1 text-gray-500">Past work that shows quality, scope, and finish before booking.</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-gray-200">
            <FiGrid className="text-primary-600" /> {professional.gallery.length} project photos
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {professional.gallery.map((image, index) => (
            <div key={image} className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-200">
              <img src={image} alt={`${professional.name} project ${index + 1}`} className="h-64 w-full object-cover transition-transform duration-300 hover:scale-105" />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Marketplace gigs from this pro</h2>
            <p className="mt-1 text-gray-500">The profile links directly to a structured set of service scopes.</p>
          </div>
          <Link to={`/services?professional=${professional.id}`} className="text-sm font-semibold text-primary-600 hover:text-primary-700">
            View all service scopes
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {gigs.map((gig) => (
            <GigCard key={gig.id} gig={gig} seller={professional} />
          ))}
        </div>

        {gigs.length === 0 && (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-10 text-center shadow-sm">
            <p className="text-gray-500">This profile does not have service listings attached yet.</p>
          </div>
        )}
      </section>

      {relatedPros.length > 0 && (
        <section className="border-t border-gray-200 bg-white px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Similar verified pros</h2>
              <p className="mt-1 text-gray-500">Browse nearby specialists in the same category.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPros.map((pro) => (
                <Link key={pro.id} to={`/profile/${pro.id}`} className="rounded-3xl border border-gray-200 bg-gray-50 p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex items-center gap-4">
                    <img src={pro.avatar} alt={pro.name} className="h-14 w-14 rounded-2xl object-cover" />
                    <div>
                      <div className="font-semibold text-gray-900">{pro.name}</div>
                      <div className="text-sm text-gray-500">{pro.city}</div>
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-gray-600">{pro.role}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProfessionalProfilePage;