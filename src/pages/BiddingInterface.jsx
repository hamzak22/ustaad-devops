import React, { useState } from 'react';
import { FiDollarSign, FiClock, FiFileText, FiTool, FiBriefcase, FiAlertCircle, FiSend } from 'react-icons/fi';
import { useParams, useNavigate } from 'react-router-dom';

const BiddingInterface = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [laborCost, setLaborCost] = useState('');
  const [materialCost, setMaterialCost] = useState('');
  const [timeline, setTimeline] = useState('1-2 days');
  const [proposal, setProposal] = useState('');

  const totalCost = (Number(laborCost) || 0) + (Number(materialCost) || 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for submitting bid
    alert('Bid submitted successfully!');
    navigate('/services');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">
        
        {/* Left Column: Job Summary */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
              <FiBriefcase className="w-3 h-3" /> Active Project
            </div>
            <h1 className="text-2xl font-black text-gray-900 leading-tight mb-4">Complete Bathroom Tile Renovation</h1>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Needs removal of old tiles and installation of new ceramic tiles in a 10x10 bathroom. 
              Subfloor might need some leveling.
            </p>
            
            <div className="space-y-4 border-t border-gray-100 pt-6">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                  <FiAlertCircle />
                </div>
                <div>
                  <p className="text-gray-400 font-medium">Customer Budget</p>
                  <p className="text-gray-900 font-bold">$1,200 - $1,500</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                  <FiClock />
                </div>
                <div>
                  <p className="text-gray-400 font-medium">Posted</p>
                  <p className="text-gray-900 font-bold">2 hours ago</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary-900 rounded-3xl p-8 text-white shadow-xl shadow-primary-200">
            <h3 className="text-lg font-bold mb-2">Pro Tip</h3>
            <p className="text-primary-100 text-sm leading-relaxed">
              Splitting your costs between Labor and Materials builds trust with customers. They like to see exactly where their money is going.
            </p>
          </div>
        </div>

        {/* Right Column: Bidding Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
            <div className="p-8 sm:p-10">
              <h2 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-3">
                Submit Your Quote
              </h2>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Cost Breakdown */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                      <FiBriefcase className="text-primary-600" /> Labor Costs
                    </label>
                    <div className="relative">
                      <FiDollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input 
                        type="number" 
                        required
                        placeholder="0.00"
                        className="w-full pl-12 pr-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-primary-50 focus:border-primary-500 transition-all outline-none text-xl font-bold"
                        value={laborCost}
                        onChange={(e) => setLaborCost(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                      <FiTool className="text-primary-600" /> Material Costs
                    </label>
                    <div className="relative">
                      <FiDollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input 
                        type="number" 
                        required
                        placeholder="0.00"
                        className="w-full pl-12 pr-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-primary-50 focus:border-primary-500 transition-all outline-none text-xl font-bold"
                        value={materialCost}
                        onChange={(e) => setMaterialCost(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Total Preview */}
                <div className="bg-gray-50 rounded-2xl p-6 flex justify-between items-center border border-gray-100">
                  <div>
                    <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Total Project Quote</p>
                    <p className="text-3xl font-black text-gray-900">${totalCost.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 mb-1 font-medium">Timeline Estimate</p>
                    <select 
                      className="bg-white border border-gray-200 rounded-xl px-4 py-2 font-bold text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                    >
                      <option>1-2 days</option>
                      <option>3-5 days</option>
                      <option>1 week</option>
                      <option>2+ weeks</option>
                    </select>
                  </div>
                </div>

                {/* Proposal */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <FiFileText className="text-primary-600" /> Professional Proposal
                  </label>
                  <textarea 
                    rows="5"
                    required
                    placeholder="Describe how you plan to approach this project, your experience with similar jobs, and any questions you have for the customer..."
                    className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-primary-50 focus:border-primary-500 transition-all outline-none text-lg resize-none"
                    value={proposal}
                    onChange={(e) => setProposal(e.target.value)}
                  ></textarea>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => navigate(-1)}
                    className="flex-1 px-8 py-4 rounded-2xl border-2 border-gray-100 font-bold text-gray-600 hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-[2] bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-primary-200 transition-all hover:-translate-y-1 flex items-center justify-center gap-3"
                  >
                    <FiSend className="w-5 h-5" /> Submit Proposal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BiddingInterface;
