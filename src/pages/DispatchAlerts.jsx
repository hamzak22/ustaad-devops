import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiBell, FiCheck, FiClock, FiMapPin, FiX, FiZap } from 'react-icons/fi';

const seedLeads = [
    {
        id: 'lead-1',
        title: 'Emergency Leak Fix',
        location: 'DHA Phase 4',
        distanceKm: 1.8,
        budget: '$95 - $140',
        eta: 'Starts in 45 mins',
        urgency: 'High'
    },
    {
        id: 'lead-2',
        title: 'Ceiling Fan Wiring',
        location: 'Johar Town',
        distanceKm: 3.2,
        budget: '$55 - $90',
        eta: 'Today evening',
        urgency: 'Medium'
    },
    {
        id: 'lead-3',
        title: 'Water Heater Inspection',
        location: 'Gulberg III',
        distanceKm: 5.6,
        budget: '$70 - $110',
        eta: 'Tomorrow 9:00 AM',
        urgency: 'Medium'
    }
];

const DispatchAlerts = () => {
    const [leads] = useState(seedLeads);
    const [actionState, setActionState] = useState({});

    const pendingCount = useMemo(
        () => leads.filter((lead) => !actionState[lead.id]).length,
        [actionState, leads]
    );

    const updateLeadAction = (leadId, action) => {
        setActionState((prev) => ({ ...prev, [leadId]: action }));
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 sm:py-10">
            <div className="mx-auto w-full max-w-md sm:max-w-5xl">
                <div className="mb-4">
                    <Link to="/worker/on-the-job" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700">
                        <FiArrowLeft className="h-4 w-4" /> Back to toolkit
                    </Link>
                </div>

                <section className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-600">Instant Dispatch</p>
                            <h1 className="mt-1 text-2xl font-black text-gray-900">New lead alerts</h1>
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-amber-700">
                            <FiBell className="h-3.5 w-3.5" /> {pendingCount} pending
                        </div>
                    </div>

                    <div className="mt-6 rounded-2xl bg-slate-950 p-4 text-white">
                        <div className="text-sm font-semibold text-primary-200">Dispatcher note</div>
                        <p className="mt-2 text-sm text-slate-300">
                            Fast responses increase ranking. Leads accepted in under 60 seconds are prioritized for future dispatch.
                        </p>
                    </div>

                    <div className="mt-6 space-y-4">
                        {leads.map((lead) => {
                            const state = actionState[lead.id] || 'pending';
                            const accepted = state === 'accepted';
                            const declined = state === 'declined';

                            return (
                                <article key={lead.id} className="rounded-[1.5rem] border border-gray-100 bg-gray-50 p-4">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <h2 className="text-lg font-black text-gray-900">{lead.title}</h2>
                                            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-medium text-gray-500">
                                                <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1">
                                                    <FiMapPin className="h-3.5 w-3.5" /> {lead.location}
                                                </span>
                                                <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1">
                                                    <FiZap className="h-3.5 w-3.5" /> {lead.urgency} urgency
                                                </span>
                                                <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1">
                                                    <FiClock className="h-3.5 w-3.5" /> {lead.eta}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-semibold text-gray-500">Budget</div>
                                            <div className="text-base font-black text-gray-900">{lead.budget}</div>
                                            <div className="text-xs text-gray-500">{lead.distanceKm} km away</div>
                                        </div>
                                    </div>

                                    <div className="mt-4 grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => updateLeadAction(lead.id, 'accepted')}
                                            className={`inline-flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-black transition-all ${accepted ? 'bg-emerald-600 text-white' : 'bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50'}`}
                                        >
                                            <FiCheck className="h-4 w-4" /> Accept
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => updateLeadAction(lead.id, 'declined')}
                                            className={`inline-flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-black transition-all ${declined ? 'bg-red-600 text-white' : 'bg-white text-red-700 border border-red-200 hover:bg-red-50'}`}
                                        >
                                            <FiX className="h-4 w-4" /> Decline
                                        </button>
                                    </div>

                                    {accepted && (
                                        <div className="mt-3 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                                            Lead accepted. Dispatching customer contact details...
                                        </div>
                                    )}
                                    {declined && (
                                        <div className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">
                                            Lead declined. We will reassign this request.
                                        </div>
                                    )}
                                </article>
                            );
                        })}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DispatchAlerts;