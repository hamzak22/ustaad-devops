import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiCamera, FiCheckCircle, FiImage, FiSend, FiTrash2, FiEdit3 } from 'react-icons/fi';

const createPreview = (file) => ({
    file,
    url: URL.createObjectURL(file),
    capturedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
});

const JobPhotoApproval = () => {
    const [beforePhoto, setBeforePhoto] = useState(null);
    const [afterPhoto, setAfterPhoto] = useState(null);
    const [beforeNotes, setBeforeNotes] = useState('Pre-existing water marks beside sink and cracked grout line near shower corner.');
    const [afterNotes, setAfterNotes] = useState('Installed fresh grout and resealed corners. Water marks removed and area tested dry.');
    const [approvalState, setApprovalState] = useState('idle');

    useEffect(() => {
        return () => {
            if (beforePhoto?.url) URL.revokeObjectURL(beforePhoto.url);
            if (afterPhoto?.url) URL.revokeObjectURL(afterPhoto.url);
        };
    }, [afterPhoto?.url, beforePhoto?.url]);

    const handlePhotoInput = (event, type) => {
        const selectedFile = event.target.files?.[0];
        if (!selectedFile) return;

        if (type === 'before') {
            if (beforePhoto?.url) URL.revokeObjectURL(beforePhoto.url);
            setBeforePhoto(createPreview(selectedFile));
        }

        if (type === 'after') {
            if (afterPhoto?.url) URL.revokeObjectURL(afterPhoto.url);
            setAfterPhoto(createPreview(selectedFile));
        }
    };

    const removePhoto = (type) => {
        if (type === 'before' && beforePhoto) {
            URL.revokeObjectURL(beforePhoto.url);
            setBeforePhoto(null);
        }

        if (type === 'after' && afterPhoto) {
            URL.revokeObjectURL(afterPhoto.url);
            setAfterPhoto(null);
        }
    };

    const sendForApproval = () => {
        if (!beforePhoto || !afterPhoto) return;
        setApprovalState('sending');
        window.setTimeout(() => {
            setApprovalState('sent');
        }, 1300);
    };

    const renderPhotoCard = (type, photo, notes, setNotes) => {
        const title = type === 'before' ? 'Before Photo' : 'After Photo';

        return (
            <div className="rounded-[1.75rem] border border-gray-100 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                    <h2 className="text-lg font-black text-gray-900">{title}</h2>
                    {photo && (
                        <button
                            type="button"
                            onClick={() => removePhoto(type)}
                            className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600"
                        >
                            <FiTrash2 className="h-3.5 w-3.5" /> Remove
                        </button>
                    )}
                </div>

                <label className="mt-4 block cursor-pointer rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-4 text-center transition-all hover:border-primary-300 hover:bg-primary-50/40">
                    <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        className="hidden"
                        onChange={(event) => handlePhotoInput(event, type)}
                    />
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary-600 shadow-sm">
                        <FiCamera className="h-5 w-5" />
                    </div>
                    <div className="mt-2 text-sm font-semibold text-gray-700">Tap to capture or upload</div>
                    <div className="text-xs text-gray-500">Camera opens on supported mobile devices</div>
                </label>

                {photo ? (
                    <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200 bg-white">
                        <img src={photo.url} alt={`${title} preview`} className="h-56 w-full object-cover" />
                        <div className="flex items-center justify-between border-t border-gray-100 px-3 py-2 text-xs text-gray-500">
                            <span className="inline-flex items-center gap-1"><FiImage className="h-3.5 w-3.5" /> {photo.file.name}</span>
                            <span>{photo.capturedAt}</span>
                        </div>
                    </div>
                ) : (
                    <div className="mt-4 rounded-2xl border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500">
                        No photo added yet.
                    </div>
                )}

                <div className="mt-4">
                    <label className="mb-2 inline-flex items-center gap-2 text-sm font-bold text-gray-700">
                        <FiEdit3 className="h-4 w-4 text-primary-600" /> Annotation notes
                    </label>
                    <textarea
                        rows="3"
                        value={notes}
                        onChange={(event) => setNotes(event.target.value)}
                        className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none transition-all focus:border-primary-500 focus:ring-4 focus:ring-primary-50"
                        placeholder="Add context for the customer approval request..."
                    />
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 sm:py-10">
            <div className="mx-auto w-full max-w-md sm:max-w-5xl">
                <div className="mb-4">
                    <Link to="/worker/on-the-job" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700">
                        <FiArrowLeft className="h-4 w-4" /> Back to toolkit
                    </Link>
                </div>

                <div className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-600">In-App Camera</p>
                            <h1 className="mt-1 text-2xl font-black text-gray-900">Before & after proof pack</h1>
                        </div>
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">Job #PL-218</span>
                    </div>

                    <div className="mt-6 grid gap-4 lg:grid-cols-2">
                        {renderPhotoCard('before', beforePhoto, beforeNotes, setBeforeNotes)}
                        {renderPhotoCard('after', afterPhoto, afterNotes, setAfterNotes)}
                    </div>

                    <div className="mt-6 rounded-2xl bg-slate-950 p-5 text-white">
                        <div className="text-sm font-semibold text-primary-200">Customer approval status</div>
                        <div className="mt-2 text-lg font-black">
                            {approvalState === 'idle' && 'Waiting to submit'}
                            {approvalState === 'sending' && 'Sending package...'}
                            {approvalState === 'sent' && 'Sent for approval'}
                        </div>
                        <div className="mt-2 text-sm text-slate-300">
                            Include clear framing, damage context, and completion notes to reduce revision requests.
                        </div>
                        <button
                            type="button"
                            disabled={!beforePhoto || !afterPhoto || approvalState === 'sending'}
                            onClick={sendForApproval}
                            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-900 transition-all hover:bg-slate-100 disabled:cursor-not-allowed disabled:bg-gray-200"
                        >
                            {approvalState === 'sent' ? <FiCheckCircle className="h-4 w-4" /> : <FiSend className="h-4 w-4" />}
                            {approvalState === 'sent' ? 'Approval request sent' : 'Send to customer for approval'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobPhotoApproval;