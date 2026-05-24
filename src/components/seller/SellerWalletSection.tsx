import React from 'react';
import { 
  ArrowRightLeft, Wallet, ShoppingCart, 
  Coins, CreditCard, FolderOpen 
} from 'lucide-react';

const SellerWalletSection = () => {
  return (
    <div className="space-y-10">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Withdrawable Balance */}
        <div className="bg-[#e0f2f1]/20 border border-[#e0f2f1] rounded-xl p-8 flex items-center justify-between">
          <div>
            <p className="text-[#4db6ac] text-[15px] font-medium mb-2 flex items-center gap-1">
              Withdrawable Balance <span className="text-[12px] opacity-70">$</span>
            </p>
            <p className="text-[#4db6ac] text-[32px] font-bold">0.00</p>
          </div>
          <div className="p-4 bg-[#e0f2f1]/60 rounded-xl text-[#4db6ac]">
            <ArrowRightLeft size={32} />
          </div>
        </div>

        {/* Total Earnings */}
        <div className="bg-[#fff9c4]/20 border border-[#fff9c4] rounded-xl p-8 flex items-center justify-between">
          <div>
            <p className="text-[#fbc02d] text-[15px] font-medium mb-2 flex items-center gap-1">
              Total Earnings <span className="text-[12px] opacity-70">$</span>
            </p>
            <p className="text-[#fbc02d] text-[32px] font-bold">0.00</p>
          </div>
          <div className="p-4 bg-[#fff9c4]/60 rounded-xl text-[#fbc02d]">
            <Coins size={32} />
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-[#e8eaf6]/20 border border-[#e8eaf6] rounded-xl p-8 flex items-center justify-between">
          <div>
            <p className="text-[#3f51b5] text-[15px] font-medium mb-2">Total Orders</p>
            <p className="text-[#3f51b5] text-[32px] font-bold">0</p>
          </div>
          <div className="p-4 bg-[#e8eaf6]/60 rounded-xl text-[#3f51b5]">
            <ShoppingCart size={32} />
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Earnings */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm flex flex-col h-fit">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <h2 className="text-[16px] font-bold text-slate-900">Earnings</h2>
            <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-3 py-1 rounded uppercase">Fee: 10%</span>
          </div>
          <div className="p-12 flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100">
              <ShoppingCart size={14} className="text-slate-300" />
            </div>
            <p className="text-slate-400 italic text-[14px]">You don't have any earnings yet</p>
          </div>
        </div>

        {/* Right: Payout Methods & History */}
        <div className="space-y-10">
          {/* Payout Methods */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm flex flex-col overflow-hidden">
            <div className="p-6 border-b border-slate-50">
              <h2 className="text-[16px] font-bold text-slate-900">Payout Methods</h2>
            </div>
            <div className="p-8 space-y-6">
              <div className="bg-slate-50/50 p-6 rounded-xl space-y-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-5 h-5 rounded-full border-2 border-slate-200 flex items-center justify-center group-hover:border-[#111c1e] transition-colors">
                    <div className="w-2 h-2 rounded-full bg-[#111c1e] opacity-0 group-hover:opacity-10" />
                  </div>
                  <span className="text-[14px] text-slate-500 font-medium">PayPal</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-5 h-5 rounded-full border-2 border-slate-200 flex items-center justify-center group-hover:border-[#111c1e] transition-colors">
                    <div className="w-2 h-2 rounded-full bg-[#111c1e] opacity-0 group-hover:opacity-10" />
                  </div>
                  <span className="text-[14px] text-slate-500 font-medium">Bank Transfer</span>
                </label>
              </div>
              <button className="bg-[#111c1e] text-white px-8 py-2.5 rounded-full text-[12px] font-bold hover:bg-black transition-all shadow-lg">
                Save
              </button>
            </div>
          </div>

          {/* Payout History */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm flex flex-col">
            <div className="p-6 border-b border-slate-50">
              <h2 className="text-[16px] font-bold text-slate-900">Payout History</h2>
            </div>
            <div className="p-10 flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100">
                <FolderOpen size={14} className="text-slate-300" />
              </div>
              <p className="text-slate-400 italic text-[14px]">You don't have any payouts yet.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerWalletSection;
