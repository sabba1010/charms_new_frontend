import React from 'react';

const SellerListingPackages = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="px-6 py-4 border-b border-slate-50">
        <h2 className="text-[15px] font-bold text-slate-800">Your Listing Packages</h2>
      </div>
      <div className="flex-1 p-8 flex items-center justify-center text-center">
        <p className="text-slate-400 text-[13px] italic">You don't have any listing packages yet.</p>
      </div>
    </div>
  );
};

export default SellerListingPackages;
