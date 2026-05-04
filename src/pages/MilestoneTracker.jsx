import React, { useState } from 'react';
import { FiCheckCircle, FiCircle, FiPlay, FiAlertTriangle, FiPlus, FiArrowRight, FiFileText, FiDollarSign, FiClock, FiX } from 'react-icons/fi';

const MilestoneTracker = () => {
  const [showChangeOrder, setShowChangeOrder] = useState(false);
  const [milestones, setMilestones] = useState([
    { id: 1, title: 'Demolition & Site Prep', status: 'completed', date: 'Oct 12, 2023', description: 'Removed old tiles, bathtub and cleared debris.' },
    { id: 2, title: 'Plumbing & Electrical', status: 'in-progress', date: 'Est. Oct 15, 2023', description: 'Installing new water lines and vanity wiring.' },
    { id: 3, title: 'Tiling & Grouting', status: 'pending', date: 'Est. Oct 18, 2023', description: 'Ceramic tile installation and waterproofing.' },
    { id: 4, title: 'Finishing & Cleanup', status: 'pending', date: 'Est. Oct 20, 2023', description: 'Final fixtures installation and deep cleaning.' },
  ]);

  const [changeOrderData, setChangeOrderData] = useState({
    reason: '',
    amount: '',
    type: 'add'
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Project Header */}
        <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 border border-gray-100 shadow-xl shadow-gray-200/50 mb-8 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-10 opacity-5">
            <FiCheckCircle className="w-40 h-40" />
          </div>
          
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-xs font-black uppercase tracking-widest border border-primary-100">
                In Progress
              </span>
              <span className="text-gray-400 font-medium flex items-center gap-2 text-sm">
                <FiClock className="w-4 h-4" /> Updated 24m ago
              </span>
            </div>
            
            <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Luxury Bathroom Remodel</h1>
            <p className="text-gray-500 text-lg max-w-2xl leading-relaxed mb-8">
              Ongoing renovation at Phase 5, DHA. Project includes full tiling, new fixtures, and custom vanity installation.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-gray-100">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Budget</p>
                <p className="text-2xl font-black text-gray-900">$4,850</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Paid to Date</p>
                <p className="text-2xl font-black text-primary-600">$1,200</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Progress</p>
                <p className="text-2xl font-black text-gray-900">25%</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Est. Completion</p>
                <p className="text-2xl font-black text-gray-900">Oct 20</p>
              </div>
            </div>
          </div>
        </div>

        {/* Milestone List */}
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-4 px-2">
            <h2 className="text-2xl font-black text-gray-900">Project Timeline</h2>
            <button 
              onClick={() => setShowChangeOrder(true)}
              className="flex items-center gap-2 text-sm font-bold text-amber-600 hover:text-amber-700 bg-amber-50 px-4 py-2 rounded-xl border border-amber-100 transition-all hover:shadow-md"
            >
              <FiPlus className="w-4 h-4" /> Request Change Order
            </button>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-10 bottom-10 w-0.5 bg-gray-200 -z-0" />

            {milestones.map((milestone, index) => (
              <div key={milestone.id} className="relative z-10 flex gap-8 mb-10 last:mb-0 group">
                <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center flex-shrink-0 transition-all duration-500 shadow-lg ${
                  milestone.status === 'completed' ? 'bg-green-500 text-white shadow-green-100' :
                  milestone.status === 'in-progress' ? 'bg-primary-600 text-white shadow-primary-100 scale-110' :
                  'bg-white text-gray-300 border-2 border-gray-100 shadow-sm'
                }`}>
                  {milestone.status === 'completed' ? <FiCheckCircle className="w-7 h-7" /> :
                   milestone.status === 'in-progress' ? <FiPlay className="w-7 h-7 animate-pulse" /> :
                   <FiCircle className="w-7 h-7" />}
                </div>
                
                <div className={`flex-1 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-gray-200/50 ${
                  milestone.status === 'in-progress' ? 'ring-2 ring-primary-500 ring-offset-4' : ''
                }`}>
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-3">
                    <div>
                      <h3 className={`text-xl font-black ${milestone.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                        {milestone.title}
                      </h3>
                      <p className="text-sm font-bold text-primary-500 mt-1">{milestone.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      milestone.status === 'completed' ? 'bg-green-50 text-green-700' :
                      milestone.status === 'in-progress' ? 'bg-primary-50 text-primary-700' :
                      'bg-gray-50 text-gray-400'
                    }`}>
                      {milestone.status.replace('-', ' ')}
                    </span>
                  </div>
                  <p className="text-gray-500 leading-relaxed text-sm sm:text-base">
                    {milestone.description}
                  </p>
                  
                  {milestone.status === 'in-progress' && (
                    <div className="mt-6 flex gap-3">
                      <button className="px-5 py-2 bg-primary-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-primary-100">
                        Mark as Complete
                      </button>
                      <button className="px-5 py-2 bg-white text-gray-600 text-sm font-bold rounded-xl border border-gray-200 hover:bg-gray-50">
                        Post Update
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Change Order Overlay/Modal */}
        {showChangeOrder && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowChangeOrder(false)} />
            <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="p-8 sm:p-10">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Request Change Order</h2>
                    <p className="text-gray-500 mt-2">Adjust scope or price for the current project.</p>
                  </div>
                  <button onClick={() => setShowChangeOrder(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <FiX className="w-6 h-6 text-gray-400" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Reason for Change</label>
                    <textarea 
                      rows="3"
                      placeholder="e.g., Hidden water damage discovered behind tiles, needs extra repair work."
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-primary-50 focus:border-primary-500 transition-all outline-none"
                      value={changeOrderData.reason}
                      onChange={(e) => setChangeOrderData({...changeOrderData, reason: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">Adjustment Type</label>
                      <div className="flex p-1 bg-gray-50 rounded-xl border border-gray-200">
                        <button 
                          onClick={() => setChangeOrderData({...changeOrderData, type: 'add'})}
                          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${changeOrderData.type === 'add' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-400'}`}
                        >
                          Add Cost
                        </button>
                        <button 
                          onClick={() => setChangeOrderData({...changeOrderData, type: 'subtract'})}
                          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${changeOrderData.type === 'subtract' ? 'bg-white shadow-sm text-red-600' : 'text-gray-400'}`}
                        >
                          Deduct
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">Amount Adjustment</label>
                      <div className="relative">
                        <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                          type="number"
                          placeholder="0.00"
                          className="w-full pl-10 pr-5 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-primary-50 outline-none font-bold"
                          value={changeOrderData.amount}
                          onChange={(e) => setChangeOrderData({...changeOrderData, amount: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-start gap-3">
                    <FiAlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs font-medium text-amber-800 leading-relaxed">
                      Submitting a change order will pause the project until the customer approves the new price and scope.
                    </p>
                  </div>

                  <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-4 rounded-2xl font-black shadow-xl shadow-primary-200 transition-all hover:-translate-y-1 flex items-center justify-center gap-3">
                    Send Request <FiArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MilestoneTracker;
