import React, { useState } from 'react';
import { MOCK_FEES } from '../constants';
import { FeeRecord } from '../types';

export const FeePayment: React.FC = () => {
  const [fees, setFees] = useState<FeeRecord[]>(MOCK_FEES);
  const [selectedFee, setSelectedFee] = useState<FeeRecord | null>(MOCK_FEES.find(f => f.status !== 'PAID') || MOCK_FEES[0]);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'CARD' | 'WIRE' | 'SCHOLARSHIP'>('CARD');
  const [paymentReceipt, setPaymentReceipt] = useState<FeeRecord | null>(null);

  // Card form state
  const [cardDetails, setCardDetails] = useState({
    number: '•••• •••• •••• 4242',
    name: 'Alex Johnson',
    expiry: '08/28',
    cvv: '921',
  });

  const totalOutstanding = fees
    .filter(f => f.status !== 'PAID')
    .reduce((sum, f) => sum + f.amount, 0);

  const totalPaid = fees
    .filter(f => f.status === 'PAID')
    .reduce((sum, f) => sum + f.amount, 0);

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFee) return;

    setIsPaying(true);

    setTimeout(() => {
      const receiptNum = `LA-RCP-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
      const paidDate = new Date().toISOString().split('T')[0];

      const updatedFees = fees.map(f => {
        if (f.id === selectedFee.id) {
          const updated: FeeRecord = {
            ...f,
            status: 'PAID',
            receiptNumber: receiptNum,
            paidDate: paidDate,
          };
          setPaymentReceipt(updated);
          return updated;
        }
        return f;
      });

      setFees(updatedFees);
      setIsPaying(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-serif text-slate-900">
            Pupil Term Fees & Bursary Center
          </h2>
          <p className="text-xs text-slate-500">
            Automated secondary school bursary ledger, electronic payment gateway, and verified receipts for terminal examination clearance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Bursary Clearance:</span>
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
            totalOutstanding === 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900 border border-amber-300'
          }`}>
            {totalOutstanding === 0 ? '✓ Fully Cleared' : `Outstanding Balance: $${totalOutstanding}.00`}
          </span>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Outstanding Term Balance</span>
          <div className="text-3xl font-black font-serif text-rose-600 mt-1">${totalOutstanding}.00</div>
          <p className="text-[11px] text-slate-500 mt-1">Due before midterm examination week</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Settled to Date</span>
          <div className="text-3xl font-black font-serif text-emerald-700 mt-1">${totalPaid}.00</div>
          <p className="text-[11px] text-slate-500 mt-1">Receipts verified by bursary office</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Scholarship & Merit Credit</span>
          <div className="text-3xl font-black font-serif text-slate-900 mt-1">$1,080.00</div>
          <p className="text-[11px] text-amber-800 font-semibold mt-1">Secondary Academic Scholar Fellowship Applied</p>
        </div>
      </div>

      {/* Payment Receipt Modal / Card */}
      {paymentReceipt && (
        <div className="bg-white p-8 rounded-3xl border-2 border-emerald-500 shadow-xl space-y-6 animate-in zoom-in-95">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold font-serif text-slate-900">Official Secondary Bursary Receipt</h3>
                <p className="text-xs text-slate-500">Transaction ID: <span className="font-mono text-slate-900 font-bold">{paymentReceipt.receiptNumber}</span></p>
              </div>
            </div>

            <button
              onClick={() => setPaymentReceipt(null)}
              className="text-xs text-slate-400 hover:text-slate-700 p-1 font-bold"
            >
              ✕ Close
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Item Description</span>
              <span className="font-bold text-slate-800">{paymentReceipt.description}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Amount Paid</span>
              <span className="font-bold text-slate-800">${paymentReceipt.amount}.00</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Date Processed</span>
              <span className="font-bold text-slate-800">{paymentReceipt.paidDate}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Status</span>
              <span className="font-bold text-emerald-700">Settled & Cleared</span>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => window.print()}
              className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              <span>Download & Print PDF Receipt</span>
            </button>
            <button
              onClick={() => setPaymentReceipt(null)}
              className="px-5 py-2.5 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 transition-all"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Main Ledger & Payment Gateway */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Itemized Fee Invoices */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold font-serif text-slate-900">
              Term 1 Fee Invoices & Levies
            </h3>
            <span className="text-xs text-slate-400">Select an invoice to settle</span>
          </div>

          <div className="space-y-3">
            {fees.map((fee) => {
              const isSelected = selectedFee?.id === fee.id;
              const isPaid = fee.status === 'PAID';

              return (
                <div
                  key={fee.id}
                  onClick={() => !isPaid && setSelectedFee(fee)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected && !isPaid
                      ? 'border-amber-500 bg-amber-50/50 shadow-xs'
                      : isPaid
                      ? 'border-slate-100 bg-slate-50/60 opacity-80'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        fee.status === 'PAID' ? 'bg-emerald-100 text-emerald-800' :
                        fee.status === 'OVERDUE' ? 'bg-rose-100 text-rose-800' :
                        'bg-amber-100 text-amber-900'
                      }`}>
                        {fee.status}
                      </span>
                      <span className="text-xs text-slate-400">Due: {fee.dueDate}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-800">{fee.description}</h4>
                    {fee.receiptNumber && (
                      <p className="text-[11px] font-mono text-emerald-700">Receipt: {fee.receiptNumber}</p>
                    )}
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className="text-lg font-bold font-serif text-slate-900">${fee.amount}.00</span>
                    <div className="mt-1">
                      {isPaid ? (
                        <span className="text-[11px] text-emerald-600 font-bold">Cleared</span>
                      ) : (
                        <span className="text-[11px] text-amber-800 font-bold hover:underline">
                          {isSelected ? 'Selected' : 'Pay This →'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Payment Gateway Box */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold font-serif text-slate-900">
              Bursary Payment Gateway
            </h3>
            <p className="text-xs text-slate-500">Secure 256-bit SSL encrypted tuition portal</p>
          </div>

          {selectedFee && selectedFee.status !== 'PAID' ? (
            <form onSubmit={handleProcessPayment} className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Paying for:</span>
                <p className="font-bold text-slate-800 text-sm">{selectedFee.description}</p>
                <p className="text-xl font-black font-serif text-slate-900 pt-1">${selectedFee.amount}.00</p>
              </div>

              {/* Payment Methods */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'CARD', label: 'Credit Card' },
                  { id: 'WIRE', label: 'Bank Wire' },
                  { id: 'SCHOLARSHIP', label: 'Scholarship' },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                      paymentMethod === m.id
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              {/* Card inputs */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Parent / Cardholder Name</label>
                  <input
                    type="text"
                    required
                    value={cardDetails.name}
                    onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Card Number</label>
                  <input
                    type="text"
                    required
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      required
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">CVV Code</label>
                    <input
                      type="password"
                      required
                      maxLength={4}
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isPaying}
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isPaying ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin"></div>
                    <span>Processing Payment with Bursary Gateway...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm & Pay ${selectedFee.amount}.00</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="py-12 text-center text-slate-400 text-xs space-y-2">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-bold text-slate-700 text-sm">No Pending Invoice Selected</p>
              <p>All fees are either cleared or select an outstanding item from the ledger.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeePayment;
