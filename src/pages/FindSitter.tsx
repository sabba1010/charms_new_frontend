import React from 'react';
import { Search, MapPin } from 'lucide-react';
import FindSitterBanner from '../components/FindSitter/FindSitterBanner';
import WhyChooseUsOwner from '../components/FindSitter/WhyChooseUsOwner';
import FindSitterSteps from '../components/FindSitter/FindSitterSteps';
import FindSitterPricing from '../components/FindSitter/FindSitterPricing';
import TrustedCareInfoSection from '../components/home/TrustedCareInfoSection';
//import FeaturedSitters from '../components/home/FeaturedSitters/FeaturedSitters';

const FindSitter: React.FC = () => {
  return (
    <div className="min-h-screen font-sans bg-white">
      <FindSitterBanner />
      
      {/* Search & Filter Section (Equivalent to SitterPricing in layout) */}
      {/* <section className="relative -mt-12 z-20 px-6">
        <div className="max-w-5xl mx-auto bg-white p-6 md:p-8 rounded-[2rem] shadow-2xl border border-slate-100 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 w-full relative group">
            <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8b8b4e] transition-colors" />
            <input 
              type="text" 
              placeholder="Where do you need care?" 
              className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-[#8b8b4e]/30 focus:ring-4 focus:ring-[#8b8b4e]/10 transition-all text-slate-700 font-medium"
            />
          </div>
          <div className="flex-1 w-full relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8b8b4e] transition-colors" />
            <input 
              type="text" 
              placeholder="Sitter type or skill..." 
              className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-[#8b8b4e]/30 focus:ring-4 focus:ring-[#8b8b4e]/10 transition-all text-slate-700 font-medium"
            />
          </div>
          <button className="bg-[#1a2e35] text-white px-10 py-4 rounded-2xl font-bold hover:bg-[#253d45] transition-all shadow-lg active:scale-95 w-full md:w-auto">
            Search
          </button>
        </div>
      </section> */}
       {/* Pricing Section */}
      <FindSitterPricing />

      <WhyChooseUsOwner />
      <TrustedCareInfoSection />
      <FindSitterSteps />

      {/* Pricing Section */}
      {/* <FindSitterPricing /> */}

      {/* <div className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <h2 className="text-[44px] lg:text-[56px] font-bold text-[#1a2e35] font-serif leading-tight mb-4">
            Available Sitters
          </h2>
          <p className="text-slate-500 text-lg lg:text-xl max-w-2xl">
            Browse through our community of verified sitters who are ready to care for your home and pets.
          </p>
        </div>
        <FeaturedSitters />
      </div> */}
    </div>
  );
};

export default FindSitter;
