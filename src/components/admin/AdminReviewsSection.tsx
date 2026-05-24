import React, { useState } from 'react';
import { ChevronDown, Star, MessageSquare, ShieldAlert, Trash2, CheckCircle, UserCheck } from 'lucide-react';

interface Review {
  id: number;
  authorName: string;
  authorAvatar: string;
  authorRole: 'Pet Owner' | 'Sitter';
  targetTitle: string;
  targetName: string;
  rating: number;
  date: string;
  comment: string;
  status: 'Approved' | 'Pending' | 'Flagged';
}

const AdminReviewsSection = () => {
  const [activeType, setActiveType] = useState<'all' | 'owner' | 'sitter'>('all');
  
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      authorName: 'Emma Thompson',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
      authorRole: 'Pet Owner',
      targetTitle: 'Sunny Apartment',
      targetName: 'Lisa (Sitter)',
      rating: 5,
      date: 'May 14, 2026',
      comment: 'Lisa was absolutely amazing with Bella! She sent regular photo updates, was extremely responsive, and took fantastic care of her. Bella returned happy and well-rested. I will definitely book Lisa again!',
      status: 'Approved'
    },
    {
      id: 2,
      authorName: 'James Wilson',
      authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
      authorRole: 'Pet Owner',
      targetTitle: 'Sunny Apartment',
      targetName: 'Lisa (Sitter)',
      rating: 5,
      date: 'May 08, 2026',
      comment: 'Highly professional sitter! Rocky loved his walks and the huge play yard. It is a relief knowing Rocky is in such reliable hands. Five stars!',
      status: 'Approved'
    },
    {
      id: 3,
      authorName: 'Lisa (Sitter)',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      authorRole: 'Sitter',
      targetTitle: 'Sunny Apartment Hosting',
      targetName: 'Sophia Green (Pet Owner)',
      rating: 5,
      date: 'May 02, 2026',
      comment: 'Sophia was a wonderful guest to host! She left clear feeding instructions for her pup, checked in regularly, and left the apartment in immaculate condition. Highly recommended guest!',
      status: 'Approved'
    },
    {
      id: 4,
      authorName: 'Sophia Miller',
      authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
      authorRole: 'Pet Owner',
      targetTitle: 'Daily Neighborhood Dog Walking',
      targetName: 'Alex (Sitter)',
      rating: 4,
      date: 'April 28, 2026',
      comment: 'Excellent walking routine. Rocky always comes back content and tired. Appreciate the punctuality!',
      status: 'Approved'
    },
    {
      id: 5,
      authorName: 'David (Sitter)',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      authorRole: 'Sitter',
      targetTitle: 'Neighborhood Walk Session',
      targetName: 'James Wilson (Pet Owner)',
      rating: 5,
      date: 'April 25, 2026',
      comment: 'James was prompt, clear in communication, and Rocky was a pleasure to walk. Looking forward to future sessions!',
      status: 'Approved'
    }
  ]);

  const handleAction = (id: number, action: 'approve' | 'flag' | 'delete') => {
    if (action === 'delete') {
      setReviews(prev => prev.filter(r => r.id !== id));
    } else {
      setReviews(prev => prev.map(r => {
        if (r.id === id) {
          return {
            ...r,
            status: action === 'approve' ? 'Approved' : 'Flagged'
          };
        }
        return r;
      }));
    }
  };

  const filteredReviews = reviews.filter(r => {
    if (activeType === 'all') return true;
    if (activeType === 'owner') return r.authorRole === 'Pet Owner';
    if (activeType === 'sitter') return r.authorRole === 'Sitter';
    return true;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        size={13} 
        className={`${i < rating ? 'text-[#f0ad4e] fill-[#f0ad4e]' : 'text-slate-200'}`} 
      />
    ));
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Moderation Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setActiveType('all')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeType === 'all' ? 'bg-[#111c1e] text-white shadow-sm' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
          >
            All Reviews ({reviews.length})
          </button>
          <button 
            onClick={() => setActiveType('owner')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeType === 'owner' ? 'bg-[#3b82f6] text-white shadow-sm' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
          >
            User Reviews ({reviews.filter(r => r.authorRole === 'Pet Owner').length})
          </button>
          <button 
            onClick={() => setActiveType('sitter')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeType === 'sitter' ? 'bg-[#5cb85c] text-white shadow-sm' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
          >
            Seller Reviews ({reviews.filter(r => r.authorRole === 'Sitter').length})
          </button>
        </div>

        <button className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-white border border-slate-200 rounded-lg px-4 py-2.5 hover:bg-slate-50 transition-all shadow-sm">
          Filter by Status
          <ChevronDown size={14} />
        </button>
      </div>

      {/* Main Reviews Panel */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-8 py-5 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <MessageSquare size={18} className="text-slate-400" />
            <h2 className="text-[15px] font-bold text-slate-800">
              {activeType === 'all' ? 'All Submitted Reviews' : activeType === 'owner' ? 'User (Pet Owner) Reviews' : 'Seller (Sitter) Reviews'}
            </h2>
          </div>
          <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
            Showing {filteredReviews.length} records
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              <div key={review.id} className="p-8 space-y-4 group hover:bg-slate-50/20 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Author details */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200 bg-slate-50">
                        <img src={review.authorAvatar} alt={review.authorName} className="w-full h-full object-cover" />
                      </div>
                      <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full text-white text-[9px] font-extrabold flex items-center justify-center border-2 border-white shadow-sm ${review.authorRole === 'Pet Owner' ? 'bg-[#3b82f6]' : 'bg-[#5cb85c]'}`} title={review.authorRole}>
                        {review.authorRole === 'Pet Owner' ? 'U' : 'S'}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-[14px] font-bold text-slate-800">{review.authorName}</h4>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${review.authorRole === 'Pet Owner' ? 'bg-blue-50 text-blue-600 border border-blue-100/50' : 'bg-green-50 text-green-600 border border-green-100/50'}`}>
                          {review.authorRole}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-semibold mt-0.5">
                        Reviewed <span className="text-[#337ab7]">{review.targetName}</span> for <span className="text-slate-500 font-bold">"{review.targetTitle}"</span>
                      </p>
                    </div>
                  </div>

                  {/* Star Rating, Status & Actions */}
                  <div className="flex flex-wrap items-center gap-4 md:justify-end">
                    <div className="flex flex-col md:items-end gap-1">
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-[11px] text-slate-400 font-medium">{review.date}</span>
                    </div>
                    
                    {/* Status Badge */}
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${review.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                      {review.status}
                    </span>

                    {/* Quick Admin Actions */}
                    <div className="flex items-center gap-1 border-l border-slate-100 pl-3">
                      {review.status !== 'Approved' && (
                        <button 
                          onClick={() => handleAction(review.id, 'approve')}
                          className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" 
                          title="Approve Review"
                        >
                          <CheckCircle size={16} />
                        </button>
                      )}
                      {review.status !== 'Flagged' && (
                        <button 
                          onClick={() => handleAction(review.id, 'flag')}
                          className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" 
                          title="Flag Review"
                        >
                          <ShieldAlert size={16} />
                        </button>
                      )}
                      <button 
                        onClick={() => handleAction(review.id, 'delete')}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                        title="Delete Review"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-[13px] text-slate-600 leading-relaxed pl-1 md:pl-16 italic">
                  "{review.comment}"
                </p>
              </div>
            ))
          ) : (
            <div className="p-16 text-center">
              <p className="text-slate-400 text-sm italic">No reviews found matching the filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminReviewsSection;
