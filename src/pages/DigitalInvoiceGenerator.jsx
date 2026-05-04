import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { FiArrowLeft, FiDownload, FiFileText, FiPercent, FiDollarSign } from 'react-icons/fi';

const currency = (value) => `$${value.toFixed(2)}`;

const DigitalInvoiceGenerator = () => {
    const [invoiceData, setInvoiceData] = useState({
        invoiceNo: 'UST-2048',
        customerName: 'Sarah Ahmed',
        serviceTitle: 'Bathroom Leak Repair & Regrouting',
        laborHours: '6',
        hourlyRate: '38',
        materialsCost: '45',
        taxRate: '8.5',
        platformFeeRate: '10'
    });

    const [pdfState, setPdfState] = useState('idle');

    const numbers = useMemo(() => {
        const laborHours = Number(invoiceData.laborHours) || 0;
        const hourlyRate = Number(invoiceData.hourlyRate) || 0;
        const materialsCost = Number(invoiceData.materialsCost) || 0;
        const taxRate = Number(invoiceData.taxRate) || 0;
        const platformFeeRate = Number(invoiceData.platformFeeRate) || 0;

        const laborAmount = laborHours * hourlyRate;
        const subTotal = laborAmount + materialsCost;
        const platformFee = (subTotal * platformFeeRate) / 100;
        const taxable = subTotal + platformFee;
        const taxAmount = (taxable * taxRate) / 100;
        const grandTotal = taxable + taxAmount;

        return {
            laborHours,
            hourlyRate,
            materialsCost,
            taxRate,
            platformFeeRate,
            laborAmount,
            subTotal,
            platformFee,
            taxAmount,
            grandTotal
        };
    }, [invoiceData]);

    const handleChange = (field, value) => {
        setInvoiceData((prev) => ({ ...prev, [field]: value }));
    };

    const downloadPdf = () => {
        const doc = new jsPDF();
        setPdfState('generating');

        doc.setFontSize(20);
        doc.text('Ustaad Worker Invoice', 20, 24);
        doc.setFontSize(11);
        doc.text(`Invoice No: ${invoiceData.invoiceNo}`, 20, 36);
        doc.text(`Customer: ${invoiceData.customerName}`, 20, 44);
        doc.text(`Service: ${invoiceData.serviceTitle}`, 20, 52);
        doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 60);

        doc.line(20, 66, 190, 66);

        doc.text('Labor', 20, 76);
        doc.text(`${numbers.laborHours}h x ${currency(numbers.hourlyRate)}`, 120, 76, { align: 'right' });
        doc.text(currency(numbers.laborAmount), 190, 76, { align: 'right' });

        doc.text('Materials', 20, 84);
        doc.text(currency(numbers.materialsCost), 190, 84, { align: 'right' });

        doc.text(`Platform Fee (${numbers.platformFeeRate}%)`, 20, 92);
        doc.text(currency(numbers.platformFee), 190, 92, { align: 'right' });

        doc.text(`Tax (${numbers.taxRate}%)`, 20, 100);
        doc.text(currency(numbers.taxAmount), 190, 100, { align: 'right' });

        doc.line(20, 108, 190, 108);
        doc.setFontSize(14);
        doc.text('Total', 20, 118);
        doc.text(currency(numbers.grandTotal), 190, 118, { align: 'right' });

        doc.setFontSize(10);
        doc.text('Thank you for choosing Ustaad. Payment due within 7 days.', 20, 132);
        doc.save(`${invoiceData.invoiceNo}.pdf`);

        setPdfState('ready');
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 sm:py-10">
            <div className="mx-auto w-full max-w-md sm:max-w-6xl">
                <div className="mb-4">
                    <Link to="/worker/on-the-job" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700">
                        <FiArrowLeft className="h-4 w-4" /> Back to toolkit
                    </Link>
                </div>

                <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
                    <section className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">Digital Invoice Generator</p>
                                <h1 className="mt-1 text-2xl font-black text-gray-900">Convert completed work into invoice PDF</h1>
                            </div>
                            <FiFileText className="h-8 w-8 text-slate-900" />
                        </div>

                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                            <label className="text-sm font-semibold text-gray-700">
                                Invoice Number
                                <input
                                    value={invoiceData.invoiceNo}
                                    onChange={(event) => handleChange('invoiceNo', event.target.value)}
                                    className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2.5 outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-50"
                                />
                            </label>
                            <label className="text-sm font-semibold text-gray-700">
                                Customer
                                <input
                                    value={invoiceData.customerName}
                                    onChange={(event) => handleChange('customerName', event.target.value)}
                                    className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2.5 outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-50"
                                />
                            </label>
                        </div>

                        <label className="mt-4 block text-sm font-semibold text-gray-700">
                            Service Title
                            <input
                                value={invoiceData.serviceTitle}
                                onChange={(event) => handleChange('serviceTitle', event.target.value)}
                                className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2.5 outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-50"
                            />
                        </label>

                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            <label className="text-sm font-semibold text-gray-700">
                                Labor Hours
                                <input
                                    type="number"
                                    min="0"
                                    value={invoiceData.laborHours}
                                    onChange={(event) => handleChange('laborHours', event.target.value)}
                                    className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2.5 outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-50"
                                />
                            </label>
                            <label className="text-sm font-semibold text-gray-700">
                                Hourly Rate
                                <div className="relative mt-2">
                                    <FiDollarSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="number"
                                        min="0"
                                        value={invoiceData.hourlyRate}
                                        onChange={(event) => handleChange('hourlyRate', event.target.value)}
                                        className="w-full rounded-xl border border-gray-200 py-2.5 pl-9 pr-3 outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-50"
                                    />
                                </div>
                            </label>
                            <label className="text-sm font-semibold text-gray-700">
                                Materials Cost
                                <div className="relative mt-2">
                                    <FiDollarSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="number"
                                        min="0"
                                        value={invoiceData.materialsCost}
                                        onChange={(event) => handleChange('materialsCost', event.target.value)}
                                        className="w-full rounded-xl border border-gray-200 py-2.5 pl-9 pr-3 outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-50"
                                    />
                                </div>
                            </label>
                            <label className="text-sm font-semibold text-gray-700">
                                Tax Rate (%)
                                <div className="relative mt-2">
                                    <FiPercent className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="number"
                                        min="0"
                                        value={invoiceData.taxRate}
                                        onChange={(event) => handleChange('taxRate', event.target.value)}
                                        className="w-full rounded-xl border border-gray-200 py-2.5 pl-9 pr-3 outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-50"
                                    />
                                </div>
                            </label>
                            <label className="text-sm font-semibold text-gray-700 sm:col-span-2">
                                Platform Fee (%)
                                <div className="relative mt-2">
                                    <FiPercent className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="number"
                                        min="0"
                                        value={invoiceData.platformFeeRate}
                                        onChange={(event) => handleChange('platformFeeRate', event.target.value)}
                                        className="w-full rounded-xl border border-gray-200 py-2.5 pl-9 pr-3 outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-50"
                                    />
                                </div>
                            </label>
                        </div>

                        <button
                            type="button"
                            onClick={downloadPdf}
                            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary-600 px-4 py-3 text-sm font-black text-white shadow-lg shadow-primary-200 transition-all hover:bg-primary-700"
                        >
                            <FiDownload className="h-4 w-4" />
                            {pdfState === 'generating' ? 'Generating invoice...' : 'Download Invoice PDF'}
                        </button>
                    </section>

                    <aside className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm">
                        <h2 className="text-xs font-black uppercase tracking-[0.18em] text-gray-500">Invoice Summary</h2>
                        <div className="mt-4 space-y-3 text-sm">
                            <div className="flex items-center justify-between text-gray-600">
                                <span>Labor</span>
                                <span className="font-semibold text-gray-900">{currency(numbers.laborAmount)}</span>
                            </div>
                            <div className="flex items-center justify-between text-gray-600">
                                <span>Materials</span>
                                <span className="font-semibold text-gray-900">{currency(numbers.materialsCost)}</span>
                            </div>
                            <div className="flex items-center justify-between text-gray-600">
                                <span>Platform Fee</span>
                                <span className="font-semibold text-gray-900">{currency(numbers.platformFee)}</span>
                            </div>
                            <div className="flex items-center justify-between text-gray-600">
                                <span>Tax</span>
                                <span className="font-semibold text-gray-900">{currency(numbers.taxAmount)}</span>
                            </div>
                        </div>

                        <div className="mt-4 rounded-2xl bg-slate-950 p-4 text-white">
                            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-200">Grand Total</div>
                            <div className="mt-2 text-3xl font-black tracking-tight">{currency(numbers.grandTotal)}</div>
                        </div>

                        <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-3 text-xs text-gray-500">
                            PDF invoices include customer info, itemized charges, platform fee, tax, and total payable.
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default DigitalInvoiceGenerator;