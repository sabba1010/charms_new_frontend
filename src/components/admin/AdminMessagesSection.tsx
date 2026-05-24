import React from 'react';

const AdminMessagesSection = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm">
      <div className="p-6 border-b border-slate-50">
        <h2 className="text-[16px] font-bold text-slate-900">Inbox</h2>
      </div>
      <div className="p-8 py-20">
        <p className="text-slate-400 italic text-[14px]">
          You don't have any messages yet
        </p>
      </div>
    </div>
  );
};

export default AdminMessagesSection;
