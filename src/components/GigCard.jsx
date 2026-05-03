import React from 'react';
import { Link } from 'react-router-dom';
import { FiClock, FiMapPin, FiStar, FiCheckCircle } from 'react-icons/fi';

const GigCard = ({ gig, seller }) => {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="border-b border-gray-100 bg-gradient-to-br from-primary-50 to-white p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">
            {gig.badge}
          </span>
          <div className="text-right">
            <div className="text-2xl font-black text-gray-900">${gig.price}</div>
            <div className="text-xs font-medium uppercase tracking-wide text-gray-500">{gig.priceType}</div>
          </div>
        </div>

        <h3 className="text-xl font-bold leading-tight text-gray-900">{gig.title}</h3>
        <p className="mt-3 text-sm leading-6 text-gray-600">{gig.shortDescription}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {gig.scopeItems.slice(0, 3).map((item) => (
            <span key={item} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-200">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="flex-1 p-6">
        <div className="flex items-center justify-between gap-4 rounded-2xl bg-gray-50 p-4">
          <div className="flex items-center gap-3">
            <img src={seller.avatar} alt={seller.name} className="h-12 w-12 rounded-full object-cover ring-2 ring-white" />
            <div>
              <div className="font-semibold text-gray-900">{seller.name}</div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <FiMapPin className="h-3.5 w-3.5" />
                <span>{gig.city}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-sm font-semibold text-gray-900">
              <FiStar className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span>{gig.rating}</span>
            </div>
            <div className="text-xs text-gray-500">{gig.reviewsCount} reviews</div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <FiClock className="h-4 w-4 text-primary-600" />
            <span>{gig.delivery} delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <FiCheckCircle className="h-4 w-4 text-green-500" />
            <span>{seller.responseTime} from {seller.verified ? 'verified' : 'unverified'} pro</span>
          </div>
        </div>

        <p className="mt-5 text-sm leading-6 text-gray-600">{gig.highlight}</p>
      </div>

      <div className="border-t border-gray-100 bg-gray-50 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            to={`/profile/${seller.id}`}
            className="rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
          >
            View profile
          </Link>
          <div className="text-sm text-gray-500">Fixed scope • no surprise hourly billing</div>
        </div>
      </div>
    </div>
  );
};

export default GigCard;