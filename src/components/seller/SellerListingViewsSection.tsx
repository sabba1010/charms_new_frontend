import React from 'react';
import { ChevronDown, BarChart3 } from 'lucide-react';

const SellerListingViewsSection = () => {
  return (
    <div className="space-y-6">
      {/* Listing Packages */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50">
          <h2 className="text-[16px] font-bold text-slate-900">Your Listing Packages</h2>
        </div>
        <div className="p-8 py-10">
          <p className="text-slate-400 italic text-[14px]">You don't have any listing packages yet</p>
        </div>
      </div>

      {/* Listing Views Chart */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
          <h2 className="text-[16px] font-bold text-slate-900">Your Listings Views</h2>
          <button className="flex items-center gap-2 text-[12px] font-medium text-slate-400 hover:text-slate-900 transition-colors">
            <span>May 7, 2026 - May 13, 2026</span>
            <ChevronDown size={14} />
          </button>
        </div>
        
        <div className="p-8 h-[400px] flex flex-col items-center justify-center relative group">
          {/* Mock Chart Visualization */}
          <div className="absolute inset-x-8 top-12 bottom-12 flex items-end justify-between gap-1">
             {[30, 45, 20, 85, 40, 60, 35].map((height, i) => (
               <div key={i} className="flex-1 flex flex-col items-center justify-end gap-2 group/bar">
                  <div 
                    className="w-full max-w-[40px] bg-[#e0f2f1]/60 rounded-t-lg transition-all duration-500 group-hover/bar:bg-[#4db6ac]/20 relative overflow-hidden"
                    style={{ height: `${height}%` }}
                  >
                    <div className="absolute bottom-0 left-0 right-0 bg-[#4db6ac] transition-all duration-700 h-[2px]" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">{`05-0${i+7}`}</span>
               </div>
             ))}
          </div>

          {/* Chart Labels Overlay (Matching Image) */}
          <div className="absolute top-8 right-8 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-2 bg-[#4db6ac] rounded-full" />
              <span className="text-[11px] font-medium text-slate-500">Total Views</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-2 bg-[#3f51b5] rounded-full" />
              <span className="text-[11px] font-medium text-slate-500">Unique Visitors</span>
            </div>
          </div>

          {/* Large decorative icon for empty/loading state if no data */}
          <BarChart3 size={48} className="text-slate-100 mb-4 opacity-50" />
          <p className="text-slate-300 italic text-[14px] relative z-10">Analytics visualization loading...</p>
        </div>

        <div className="p-6 border-t border-slate-50">
          <button className="bg-slate-900 text-white px-8 py-2.5 rounded-full text-[12px] font-bold hover:bg-black transition-all shadow-lg active:scale-95">
            Check more stats
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerListingViewsSection;
