import React, { useState } from 'react';
import { FiChevronRight, FiChevronLeft, FiUpload, FiCamera, FiCheckCircle, FiClock, FiMapPin, FiDollarSign } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const PostJobWizard = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    location: '',
    budgetType: 'estimate',
    budgetAmount: '',
    images: []
  });

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const steps = [
    { id: 1, title: 'The Problem', description: 'What needs fixing?' },
    { id: 2, title: 'Details', description: 'Tell us more' },
    { id: 3, title: 'Visuals', description: 'Upload photos/videos' },
    { id: 4, title: 'Budget', description: 'Price & Timeline' }
  ];

  const categories = [
    'Plumbing', 'Electrical', 'Carpentry', 'Painting', 'HVAC', 'General Repair'
  ];

  const handleImageUpload = (e) => {
    // Mock image upload
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: [...formData.images, ...files.map(f => URL.createObjectURL(f))] });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-10">
      <div className="max-w-3xl mx-auto px-4">
        {/* Progress Header */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            {steps.map((s) => (
              <div key={s.id} className="flex flex-col items-center flex-1 relative">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm z-10 transition-all duration-300 ${
                    step >= s.id ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' : 'bg-white border-2 border-gray-200 text-gray-400'
                  }`}
                >
                  {step > s.id ? <FiCheckCircle className="w-6 h-6" /> : s.id}
                </div>
                <div className="mt-2 text-center">
                  <p className={`text-xs font-bold uppercase tracking-wider ${step >= s.id ? 'text-primary-700' : 'text-gray-400'}`}>
                    {s.title}
                  </p>
                </div>
                {s.id < 4 && (
                  <div className={`absolute top-5 left-1/2 w-full h-0.5 -z-0 ${step > s.id ? 'bg-primary-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden transition-all duration-500">
          <div className="p-8 sm:p-12">
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div>
                  <h2 className="text-3xl font-black text-gray-900 mb-2">What's the issue?</h2>
                  <p className="text-gray-500">Give your project a clear title and select a category.</p>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Project Title</label>
                    <input 
                      type="text" 
                      placeholder="e.g., Leaking pipe under kitchen sink"
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-primary-50 focus:border-primary-500 transition-all outline-none text-lg"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Category</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setFormData({...formData, category: cat})}
                          className={`px-4 py-3 rounded-xl border-2 text-sm font-bold transition-all ${
                            formData.category === cat 
                              ? 'border-primary-600 bg-primary-50 text-primary-700' 
                              : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-200'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div>
                  <h2 className="text-3xl font-black text-gray-900 mb-2">Describe the job</h2>
                  <p className="text-gray-500">The more details you provide, the better quotes you'll get.</p>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Detailed Description</label>
                    <textarea 
                      rows="6"
                      placeholder="Please describe what happened, when it started, and if you've tried any temporary fixes..."
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-primary-50 focus:border-primary-500 transition-all outline-none text-lg resize-none"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    ></textarea>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-amber-50 border border-amber-100 rounded-2xl text-amber-800">
                    <FiClock className="w-6 h-6 flex-shrink-0" />
                    <p className="text-sm font-medium">Pros usually respond within 2 hours for urgent leaks!</p>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div>
                  <h2 className="text-3xl font-black text-gray-900 mb-2">Show the problem</h2>
                  <p className="text-gray-500">Photos and videos help pros understand the scale of work.</p>
                </div>
                <div className="space-y-6">
                  <div 
                    className="border-3 border-dashed border-gray-200 rounded-3xl p-10 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100/50 hover:border-primary-300 transition-all cursor-pointer group"
                    onClick={() => document.getElementById('file-upload').click()}
                  >
                    <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <FiCamera className="w-8 h-8 text-primary-600" />
                    </div>
                    <p className="text-xl font-bold text-gray-900">Upload Media</p>
                    <p className="text-gray-500 mt-1">Tap to select photos or videos</p>
                    <input id="file-upload" type="file" multiple className="hidden" onChange={handleImageUpload} />
                  </div>

                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-3 gap-4">
                      {formData.images.map((img, i) => (
                        <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 relative group">
                          <img src={img} alt="Preview" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button className="p-2 bg-red-500 text-white rounded-full">
                              <FiUpload className="w-4 h-4 rotate-180" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div>
                  <h2 className="text-3xl font-black text-gray-900 mb-2">Final details</h2>
                  <p className="text-gray-500">Where should the pro come, and what's your budget?</p>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
                    <div className="relative">
                      <FiMapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input 
                        type="text" 
                        placeholder="e.g., Street 5, Phase 4, DHA"
                        className="w-full pl-12 pr-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-primary-50 focus:border-primary-500 transition-all outline-none text-lg"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Budget Estimate (Optional)</label>
                    <div className="relative">
                      <FiDollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input 
                        type="number" 
                        placeholder="How much are you looking to spend?"
                        className="w-full pl-12 pr-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-primary-50 focus:border-primary-500 transition-all outline-none text-lg"
                        value={formData.budgetAmount}
                        onChange={(e) => setFormData({...formData, budgetAmount: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-100 flex justify-between items-center">
            <button
              onClick={prevStep}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                step === 1 ? 'opacity-0 pointer-events-none' : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              <FiChevronLeft className="w-5 h-5" /> Back
            </button>
            <button
              onClick={step === 4 ? () => navigate('/') : nextStep}
              className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-primary-200 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              {step === 4 ? 'Post Project' : 'Next Step'} <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJobWizard;
