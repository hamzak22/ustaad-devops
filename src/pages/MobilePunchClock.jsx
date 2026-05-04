import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiClock, FiMapPin, FiPlay, FiSquare, FiCheckCircle, FiNavigation } from 'react-icons/fi';

const JOB_SITE = {
    lat: 31.5204,
    lng: 74.3587,
    radiusMeters: 300,
    label: 'Model Town Block A, Lahore'
};

const toRadians = (value) => (value * Math.PI) / 180;

const getDistanceMeters = (lat1, lng1, lat2, lng2) => {
    const earthRadius = 6371000;
    const deltaLat = toRadians(lat2 - lat1);
    const deltaLng = toRadians(lng2 - lng1);

    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2)
        + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2))
        * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadius * c;
};

const formatElapsed = (seconds) => {
    const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
};

const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported on this device.'));
            return;
        }

        navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 10000
        });
    });
};

const MobilePunchClock = () => {
    const [status, setStatus] = useState('idle');
    const [gpsState, setGpsState] = useState('idle');
    const [gpsMessage, setGpsMessage] = useState('Ready to verify location');
    const [distanceFromSite, setDistanceFromSite] = useState(null);
    const [shiftStartMs, setShiftStartMs] = useState(null);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        if (status !== 'running' || !shiftStartMs) {
            return undefined;
        }

        const interval = setInterval(() => {
            const seconds = Math.floor((Date.now() - shiftStartMs) / 1000);
            setElapsedSeconds(seconds);
        }, 1000);

        return () => clearInterval(interval);
    }, [status, shiftStartMs]);

    const totalTrackedHours = useMemo(() => {
        const historicalSeconds = sessions.reduce((sum, session) => sum + session.durationSeconds, 0);
        const activeSeconds = status === 'running' ? elapsedSeconds : 0;
        return ((historicalSeconds + activeSeconds) / 3600).toFixed(2);
    }, [elapsedSeconds, sessions, status]);

    const verifyAndPunch = async (type) => {
        try {
            setGpsState('checking');
            setGpsMessage('Verifying your on-site GPS...');

            const position = await getCurrentPosition();
            const { latitude, longitude } = position.coords;
            const distance = getDistanceMeters(latitude, longitude, JOB_SITE.lat, JOB_SITE.lng);
            setDistanceFromSite(distance);

            if (distance > JOB_SITE.radiusMeters) {
                setGpsState('invalid');
                setGpsMessage(`You are ${Math.round(distance)}m away from the site. Move within ${JOB_SITE.radiusMeters}m to continue.`);
                return;
            }

            setGpsState('valid');
            setGpsMessage('GPS validated. You are checked in at the job location.');

            if (type === 'start') {
                const start = Date.now();
                setShiftStartMs(start);
                setElapsedSeconds(0);
                setStatus('running');
            }

            if (type === 'end' && shiftStartMs) {
                const endTime = Date.now();
                const durationSeconds = Math.floor((endTime - shiftStartMs) / 1000);
                setSessions((prev) => [
                    {
                        id: `session-${endTime}`,
                        start: new Date(shiftStartMs).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        end: new Date(endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        durationSeconds
                    },
                    ...prev
                ]);
                setStatus('idle');
                setShiftStartMs(null);
                setElapsedSeconds(0);
            }
        } catch (error) {
            setGpsState('error');
            setGpsMessage(error?.message || 'Unable to validate GPS. Please allow location permission and retry.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 sm:py-10">
            <div className="mx-auto w-full max-w-md sm:max-w-4xl">
                <div className="mb-4">
                    <Link to="/worker/on-the-job" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700">
                        <FiArrowLeft className="h-4 w-4" /> Back to toolkit
                    </Link>
                </div>

                <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_18rem]">
                    <section className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-xs font-black uppercase tracking-[0.18em] text-primary-500">Mobile Punch Clock</p>
                                <h1 className="mt-1 text-2xl font-black text-gray-900">On-site time tracker</h1>
                            </div>
                            <div className="rounded-2xl bg-primary-50 p-3 text-primary-600">
                                <FiClock className="h-6 w-6" />
                            </div>
                        </div>

                        <div className="mt-6 rounded-3xl bg-slate-950 p-6 text-white">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-200">Current shift</p>
                            <div className="mt-3 text-4xl font-black tracking-tight">{formatElapsed(elapsedSeconds)}</div>
                            <div className="mt-2 text-sm text-slate-300">
                                {status === 'running' ? 'Shift is active' : 'No active shift'}
                            </div>
                        </div>

                        <div className="mt-5 grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => verifyAndPunch('start')}
                                disabled={status === 'running' || gpsState === 'checking'}
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary-600 px-4 py-4 text-sm font-black text-white shadow-lg shadow-primary-200 transition-all hover:bg-primary-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                            >
                                <FiPlay className="h-4 w-4" /> Start Job
                            </button>
                            <button
                                type="button"
                                onClick={() => verifyAndPunch('end')}
                                disabled={status !== 'running' || gpsState === 'checking'}
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gray-900 px-4 py-4 text-sm font-black text-white transition-all hover:bg-black disabled:cursor-not-allowed disabled:bg-gray-300"
                            >
                                <FiSquare className="h-4 w-4" /> End Job
                            </button>
                        </div>

                        <div className="mt-5 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                <FiNavigation className="h-4 w-4 text-primary-600" /> GPS validation
                            </div>
                            <p className="mt-2 text-sm text-gray-600">{gpsMessage}</p>
                            <div className="mt-3 text-xs text-gray-500">
                                Job site: {JOB_SITE.label}
                            </div>
                            {distanceFromSite !== null && (
                                <div className="mt-1 text-xs font-semibold text-gray-700">
                                    Current distance: {Math.round(distanceFromSite)}m
                                </div>
                            )}
                        </div>
                    </section>

                    <aside className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm">
                        <h2 className="text-sm font-black uppercase tracking-[0.18em] text-gray-500">Today</h2>
                        <div className="mt-4 rounded-2xl bg-emerald-50 p-4 text-emerald-900">
                            <div className="text-xs font-semibold uppercase tracking-[0.14em]">Tracked hours</div>
                            <div className="mt-1 text-3xl font-black">{totalTrackedHours}h</div>
                        </div>

                        <div className="mt-5 space-y-3">
                            {sessions.length === 0 && (
                                <div className="rounded-2xl border border-dashed border-gray-300 p-4 text-sm text-gray-500">
                                    No completed sessions yet.
                                </div>
                            )}
                            {sessions.map((session) => (
                                <div key={session.id} className="rounded-2xl border border-gray-100 bg-gray-50 p-3">
                                    <div className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">Shift</div>
                                    <div className="mt-1 text-sm font-bold text-gray-800">{session.start} - {session.end}</div>
                                    <div className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                                        <FiCheckCircle className="h-3.5 w-3.5" /> {formatElapsed(session.durationSeconds)} logged
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-5 flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-500">
                            <FiMapPin className="h-3.5 w-3.5" /> Punch actions require geolocation permission.
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default MobilePunchClock;