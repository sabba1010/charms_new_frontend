import React from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const SitterPricing = () => {
  const features = [
    "Unlimited booking requests",
    "Verified profile badge",
    "Secure in-app messaging & payments",
    "Public review profile",
    "24-hour support"
  ];

  return (
    <section className="bg-white py-20 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div className="max-w-xl">
            <span className="text-[13px] font-bold uppercase tracking-tight text-black mb-4 block">
              FOR SITTERS
            </span>
            <h2 className="text-[44px] lg:text-[56px] font-bold text-[#0a1418] font-serif mb-6 leading-[1.1]">
              Turn your love for animals into trusted income.
            </h2>
            <p className="text-[#6b7280] text-base lg:text-[17px] mb-8 leading-relaxed max-w-[450px]">
              Join South Africa's most trusted pet & home care community. Membership from R39/month.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                to="/register"
                className="bg-[#2d373b] text-white px-7 py-3 rounded-lg font-bold hover:bg-[#1a2e35] transition-all text-[15px] w-full sm:w-auto text-center"
              >
                Apply to be a sitter+
              </Link>
              <Link
                to="/how-it-works"
                className="bg-white text-[#2d373b] border border-[#e5e7eb] px-10 py-3 rounded-lg font-bold hover:bg-slate-50 transition-all text-[15px] w-full sm:w-auto text-center"
              >
                Learn more
              </Link>
            </div>
          </div>

          {/* Right Pricing Card */}
          <div className="flex justify-center lg:justify-end">
            <div className="bg-white w-full max-w-[500px] rounded-xl border border-[#d1d5db] p-8 md:p-10 shadow-sm">
              <div>
                <h3 className="text-[28px] font-semibold text-[#0a1418] font-serif mb-4">
                  Sitter membership
                </h3>

                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-[52px] font-bold text-[#0a1418] font-serif">R39</span>
                  <span className="text-[#6b7280] text-[15px]">/month</span>
                </div>

                <p className="text-[#9ca3af] text-[14px] mb-8">
                  Up to R49/month for premium tier. Yearly plans available.
                </p>

                <ul className="space-y-3 mb-10">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#374151] text-[15px]">
                      <Check className="w-4 h-4 text-black mt-1 shrink-0" strokeWidth={3} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/register"
                  className="block bg-[#2d373b] text-white text-center py-3.5 rounded-lg font-bold hover:bg-[#1a2e35] transition-all text-[15px]"
                >
                  Get started
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SitterPricing;