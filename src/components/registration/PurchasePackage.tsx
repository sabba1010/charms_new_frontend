import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface PurchasePackageProps {
  onPackageSelected: (packageType: 'monthly' | 'annual') => void;
  onBack: () => void;
}

const MONTHLY_FEATURES = [
  'Unlimited access to home & pet care',
  'No Booking Fees',
  'Cancel any time',
  'Unlimited listings',
  'Member support',
];

const ANNUAL_FEATURES = [
  'Unlimited access to home & pet care',
  'No Booking fees',
  'Member support',
  'Save 2 months',
  'No monthly renewal or interruptions',
  'Always stay connected for when emergency service is needed.',
];

const PurchasePackage: React.FC<PurchasePackageProps> = ({ onPackageSelected, onBack }) => {
  const [selected, setSelected] = useState<'monthly' | 'annual' | null>(null);

  return (
    <div className="max-w-[860px] mx-auto">
      {/* Page heading */}
      <h2 className="text-[18px] font-bold text-[#1a1a2e] mb-8">Buy New Package</h2>

      {/* Cards row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        {/* ── Monthly Card ── */}
        <div
          className={`bg-white rounded-2xl border-2 p-7 flex flex-col transition-all duration-200 cursor-pointer ${
            selected === 'monthly'
              ? 'border-[#1a1a2e] shadow-md'
              : 'border-[#e5e7eb] hover:border-[#c0c4cc]'
          }`}
          onClick={() => setSelected('monthly')}
        >
          {/* Title + badge */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[17px] font-extrabold text-[#1a1a2e]">Monthly Membership</h3>
            <span className="text-[10px] font-bold uppercase tracking-widest bg-[#f0f0f5] text-[#6b6b80] px-3 py-1 rounded-full">
              Flexible
            </span>
          </div>

          {/* Subtitle */}
          <p className="text-[13px] text-[#9ca3af] mb-5">Pay as you go, cancel anytime.</p>

          {/* Price box */}
          <div className="bg-[#f5f6fa] rounded-xl flex items-center justify-center py-6 mb-6">
            <span className="text-[28px] font-extrabold text-[#1a1a2e] tracking-tight">R190/mo</span>
          </div>

          {/* Features */}
          <p className="text-[13px] font-extrabold text-[#1a1a2e] mb-3">Monthly Membership features:</p>
          <ul className="space-y-2 mb-8 flex-1">
            {MONTHLY_FEATURES.map((feat) => (
              <li key={feat} className="flex items-start gap-2.5">
                <Check size={13} className="text-[#6b8cff] mt-0.5 shrink-0" strokeWidth={2.5} />
                <span className="text-[13px] text-[#6b7280]">{feat}</span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelected('monthly');
              onPackageSelected('monthly');
            }}
            className={`w-full py-3.5 rounded-full border-2 text-[13px] font-bold transition-all ${
              selected === 'monthly'
                ? 'border-[#1a1a2e] bg-[#1a1a2e] text-white'
                : 'border-[#d1d5db] bg-white text-[#1a1a2e] hover:border-[#1a1a2e]'
            }`}
          >
            Select This Package
          </button>
        </div>

        {/* ── Annual Card ── */}
        <div
          className={`bg-white rounded-2xl border-2 p-7 flex flex-col transition-all duration-200 cursor-pointer ${
            selected === 'annual'
              ? 'border-[#1a1a2e] shadow-md'
              : 'border-[#e5e7eb] hover:border-[#c0c4cc]'
          }`}
          onClick={() => setSelected('annual')}
        >
          {/* Title + badge */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[17px] font-extrabold text-[#1a1a2e]">Annual Membership</h3>
            <span className="text-[10px] font-bold uppercase tracking-widest bg-[#f0f0f5] text-[#6b6b80] px-3 py-1 rounded-full">
              Save 2 Months
            </span>
          </div>

          {/* Subtitle */}
          <p className="text-[13px] text-[#9ca3af] mb-5">The best way to build your sitting reputation.</p>

          {/* Price box */}
          <div className="bg-[#f5f6fa] rounded-xl flex items-center justify-center py-6 mb-6">
            <span className="text-[28px] font-extrabold text-[#1a1a2e] tracking-tight">R1900/yr</span>
          </div>

          {/* Features */}
          <p className="text-[13px] font-extrabold text-[#1a1a2e] mb-3">Annual Membership features:</p>
          <ul className="space-y-2 mb-8 flex-1">
            {ANNUAL_FEATURES.map((feat) => (
              <li key={feat} className="flex items-start gap-2.5">
                <Check size={13} className="text-[#6b8cff] mt-0.5 shrink-0" strokeWidth={2.5} />
                <span className="text-[13px] text-[#6b7280]">{feat}</span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelected('annual');
              onPackageSelected('annual');
            }}
            className={`w-full py-3.5 rounded-full border-2 text-[13px] font-bold transition-all ${
              selected === 'annual'
                ? 'border-[#1a1a2e] bg-[#1a1a2e] text-white'
                : 'border-[#d1d5db] bg-white text-[#1a1a2e] hover:border-[#1a1a2e]'
            }`}
          >
            Select This Package
          </button>
        </div>
      </div>

      {/* Back button */}
      <div className="mt-8">
        <button
          type="button"
          onClick={onBack}
          className="bg-white border border-slate-200 text-slate-600 px-8 py-3.5 rounded-full font-bold text-xs hover:bg-slate-50 transition-all shadow-sm active:scale-[0.98] uppercase tracking-wider"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default PurchasePackage;
