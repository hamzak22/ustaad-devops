import { Link } from 'react-router-dom';
import { FiCamera, FiClock, FiFileText, FiZap, FiChevronRight, FiMapPin } from 'react-icons/fi';

const modules = [
    {
        id: 'punch',
        to: '/worker/on-the-job/punch-clock',
        title: 'Mobile Punch Clock',
        subtitle: 'Start and end shift with location verification.',
        badge: 'GPS-locked',
        icon: FiClock,
        color: 'bg-primary-600'
    },
    {
        id: 'photos',
        to: '/worker/on-the-job/photos',
        title: 'Before/After Photos',
        subtitle: 'Capture work evidence and send for customer approval.',
        badge: 'Camera-ready',
        icon: FiCamera,
        color: 'bg-emerald-600'
    },
    {
        id: 'invoice',
        to: '/worker/on-the-job/invoice',
        title: 'Invoice Generator',
        subtitle: 'Create a PDF invoice with fees and tax auto-calculated.',
        badge: 'PDF export',
        icon: FiFileText,
        color: 'bg-slate-900'
    },
    {
        id: 'dispatch',
        to: '/worker/on-the-job/dispatch',
        title: 'Dispatch Alerts',
        subtitle: 'Accept or decline fresh leads in seconds.',
        badge: 'Instant leads',
        icon: FiZap,
        color: 'bg-amber-500'
    }
];

const OnTheJobHub = () => {
    return (
        <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 sm:py-10">
            <div className="mx-auto w-full max-w-md sm:max-w-4xl">
                <section className="overflow-hidden rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl sm:p-10">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-primary-100">
                        Worker Mode
                    </div>
                    <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">On-the-Job Toolkit</h1>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                        Built for field work. Clock hours on-site, capture evidence, generate invoices, and react to new job alerts from one mobile-ready flow.
                    </p>
                    <div className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200">
                        <FiMapPin className="h-4 w-4 text-primary-300" /> Lahore, Sector C - GPS coverage active
                    </div>
                </section>

                <section className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2">
                    {modules.map((module) => {
                        const Icon = module.icon;
                        return (
                            <Link
                                key={module.id}
                                to={module.to}
                                className="group rounded-[1.75rem] border border-gray-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className={`flex h-11 w-11 items-center justify-center rounded-2xl text-white ${module.color}`}>
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <span className="rounded-full bg-gray-100 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-gray-500">
                                        {module.badge}
                                    </span>
                                </div>
                                <h2 className="mt-4 text-xl font-black text-gray-900">{module.title}</h2>
                                <p className="mt-2 text-sm leading-relaxed text-gray-500">{module.subtitle}</p>
                                <div className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary-600">
                                    Open module <FiChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </Link>
                        );
                    })}
                </section>
            </div>
        </div>
    );
};

export default OnTheJobHub;