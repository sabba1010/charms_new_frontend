import React, { useEffect, useState } from 'react';
import { Star, MessageSquare, CornerDownRight, User, Loader2 } from 'lucide-react';

interface Review {
  _id: string;
  name: string;
  email: string;
  rating: number;
  comment: string;
  createdAt: string;
  listing?: { _id: string; title: string };
  user?: { firstName: string; lastName: string; avatar?: string };
}

const SellerReviewsSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem('token');
        const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';
        const res = await fetch(`${apiUrl}/reviews/sitter/my-reviews`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setReviews(data.data);
        }
      } catch (err) {
        console.error('Error fetching sitter reviews:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={i < rating ? 'text-[#f0ad4e] fill-[#f0ad4e]' : 'text-slate-200'}
      />
    ));

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '—';

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-slate-400">
        <Loader2 size={24} className="animate-spin mr-3" />
        <span className="text-sm font-medium">Loading reviews...</span>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-16">

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Reviews', value: reviews.length },
          { label: 'Average Rating', value: avgRating },
          { label: '5-Star Reviews', value: reviews.filter(r => r.rating === 5).length },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-center">
            <span className="block text-3xl font-extrabold text-[#1a2e35] mb-1">{stat.value}</span>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Visitor Reviews Section */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-8 py-5 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <MessageSquare size={18} className="text-slate-400" />
            <h2 className="text-[15px] font-bold text-slate-800">
              Visitor Reviews ({reviews.length})
            </h2>
          </div>
        </div>

        {reviews.length === 0 ? (
          <div className="py-16 flex flex-col items-center gap-3 text-slate-400">
            <MessageSquare size={32} className="opacity-30" />
            <p className="text-sm font-medium">No reviews on your listings yet.</p>
            <p className="text-xs">Reviews will appear here after guests complete a booking and submit a review.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {reviews.map((review) => (
              <div key={review._id} className="p-8 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Reviewer Details */}
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center">
                      {review.user?.avatar ? (
                        <img src={review.user.avatar} alt={review.name} className="w-full h-full object-cover" />
                      ) : (
                        <User size={20} className="text-slate-400" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-slate-800">{review.name}</h4>
                      <p className="text-[11px] text-slate-400 font-semibold mt-0.5">
                        on{' '}
                        <span className="text-[#337ab7]">
                          {review.listing?.title || 'Your Listing'}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Rating & Date */}
                  <div className="flex flex-col sm:items-end gap-1.5">
                    <div className="flex items-center gap-0.5">{renderStars(review.rating)}</div>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {new Date(review.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                {/* Review Comment */}
                <p className="text-[13px] text-slate-600 leading-relaxed pl-1 sm:pl-15 italic">
                  "{review.comment}"
                </p>

                {/* Post Reply placeholder */}
                <div className="pl-1 sm:pl-15 pt-1">
                  <button className="text-xs font-bold text-[#337ab7] hover:underline flex items-center gap-1.5">
                    <CornerDownRight size={12} /> Post Reply
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default SellerReviewsSection;
