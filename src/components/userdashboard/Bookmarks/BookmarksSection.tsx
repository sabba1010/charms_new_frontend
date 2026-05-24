import React from 'react';

const BookmarksSection = () => {
  return (
    <div className="space-y-6">
      {/* Empty State Info Boxes */}
      <div className="p-5 bg-[#e0f2f1]/40 border border-[#e0f2f1] rounded-lg text-[14px] text-slate-500">
        No bookmarks! You haven't saved anything yet!
      </div>
      
      <div className="p-5 bg-[#e0f2f1]/40 border border-[#e0f2f1] rounded-lg text-[14px] text-slate-500">
        You don't have any bookmarks yet.
      </div>

      <div className="pt-20 flex flex-col items-center justify-center text-center">
        <p className="text-slate-300 italic text-[14px]">Your bookmarks will appear here once you save listings.</p>
      </div>
    </div>
  );
};

export default BookmarksSection;
