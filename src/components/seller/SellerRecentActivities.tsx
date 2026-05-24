import React from 'react';

const SellerRecentActivities = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between">
        <h2 className="text-[15px] font-bold text-slate-800">Recent Activities</h2>
        <button className="text-[10px] font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded border border-slate-100 hover:bg-slate-100 transition-colors uppercase">
          Clear All
        </button>
      </div>
      <div className="p-12 text-center">
        <p className="text-slate-400 text-[13px] italic">You don't have any activities logged yet.</p>
      </div>
    </div>
  );
};

export default SellerRecentActivities;
