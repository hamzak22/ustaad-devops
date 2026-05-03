import React from 'react';
import { FiStar, FiMapPin, FiCheckCircle } from 'react-icons/fi';

const ProCard = ({ pro }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col h-full cursor-pointer">
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4">
            <div className="relative">
              <img 
                src={pro.avatar} 
                alt={pro.name} 
                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm group-hover:border-primary-100 transition-colors"
              />
              <div className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-white" title="Online"></div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1">
                {pro.name}
              </h3>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <FiMapPin className="mr-1 h-3.5 w-3.5" />
                <span>{pro.city}</span>
              </div>
              <div className="flex items-center mt-1.5 gap-1 text-sm font-medium">
                <FiStar className="text-amber-400 fill-amber-400 h-4 w-4" />
                <span className="text-gray-900">{pro.rating}</span>
                <span className="text-gray-400 font-normal">({pro.reviewsCount})</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-gray-900">${pro.hourlyRate}</div>
            <div className="text-xs text-gray-500">/hr</div>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">{pro.category} Professional</h4>
          <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
            {pro.bio}
          </p>
        </div>

        <div className="mt-auto pt-4 flex flex-wrap gap-2">
          {pro.tags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="border-t border-gray-100 p-4 bg-gray-50 flex items-center justify-between group-hover:bg-primary-50 transition-colors">
        <div className="flex items-center text-sm text-gray-500 gap-1.5">
          <FiCheckCircle className="text-green-500" />
          <span>{pro.completedJobs} jobs done</span>
        </div>
        <button className="text-primary-600 font-semibold text-sm hover:text-primary-700 transition-colors">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default ProCard;
