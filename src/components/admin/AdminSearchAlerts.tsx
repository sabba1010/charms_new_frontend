import React from 'react';
import { Info } from 'lucide-react';

const AdminSearchAlerts = () => {
  return (
    <div className="space-y-8">
      {/* Saved Searches Card */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-8 py-5 border-b border-slate-50">
          <h2 className="text-[15px] font-bold text-slate-800">
            Saved Searches <span className="text-slate-400 font-normal ml-1">(0/10)</span>
          </h2>
        </div>
        
        <div className="p-8">
          <div className="bg-[#eef8ff] border border-[#d1e9ff] rounded-lg p-5 flex items-start gap-4">
            <div className="mt-0.5">
              <Info size={18} className="text-[#0070e0]" />
            </div>
            <p className="text-[14px] text-[#004e9a] leading-relaxed">
              No saved searches! You haven't saved any searches yet. Use the search page to find listings and save your search to get email alerts when new listings match your criteria.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="pt-4">
        <p className="text-slate-400 text-[12px]">© All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default AdminSearchAlerts;
