import React, { useState } from 'react';
import { Star, MessageSquare, Edit3, ShieldAlert, Award, Calendar, Dog, Sparkles, Check } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface Review {
  id: number;
  sitterName: string;
  sitterAvatar: string;
  serviceType: string;
  dates: string;
  rating: number;
  comment: string;
  timeAgo: string;
  petName?: string;
}

const ReviewsSection = () => {
  const [activeSubTab, setActiveSubTab] = useState<'written' | 'received'>('received');

  // 1. Mock reviews written by the client to sitters
  const [reviewsWritten, setReviewsWritten] = useState<Review[]>([
    {
      id: 1,
      sitterName: 'Emma Thompson',
      sitterAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
      serviceType: 'Boarding',
      dates: 'May 20 - May 25, 2026',
      rating: 5,
      comment: 'Emma was absolutely wonderful with Bella! She sent daily photos, gave regular updates, and Bella came home extremely happy and relaxed. The fenced yard is gorgeous and secure. Will absolutely book Emma again!',
      timeAgo: '2 weeks ago',
      petName: 'Bella (Golden Retriever)'
    },
    {
      id: 2,
      sitterName: 'James Wilson',
      sitterAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      serviceType: 'Dog Walking',
      dates: 'May 10 - May 15, 2026',
      rating: 4,
      comment: 'James was very punctual and active. Rocky got some great exercise! Kept me updated with GPS walk maps. Deducted one star only because of a small scheduling delay on Tuesday, but overall exceptional work.',
      timeAgo: '1 month ago',
      petName: 'Rocky (French Bulldog)'
    }
  ]);

  // 2. Mock reviews received by the client/their pets from sitters
  const [reviewsReceived, setReviewsReceived] = useState<Review[]>([
    {
      id: 1,
      sitterName: 'Emma Thompson',
      sitterAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
      serviceType: 'Boarding',
      dates: 'May 20 - May 25, 2026',
      rating: 5,
      comment: 'Bella was an absolute angel to host! So gentle, well-behaved, and got along perfectly with my other dogs. She followed commands instantly and was incredibly loving. Sarah & Mark are amazing owners with very detailed instructions!',
      timeAgo: '1 week ago',
      petName: 'Bella (Golden Retriever)'
    },
    {
      id: 2,
      sitterName: 'Sophia Miller',
      sitterAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
      serviceType: 'Doggy Day Care',
      dates: 'Jun 02, 2026',
      rating: 5,
      comment: 'Bella was a absolute joy to watch today! We went on two long walks, played with fetch toys, and had quiet cuddle sessions. Super well-socialized pet! Highly recommended guests.',
      timeAgo: '3 weeks ago',
      petName: 'Bella (Golden Retriever)'
    }
  ]);

  // 3. New Review form simulator state
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({
    sitterName: 'Sophia Miller',
    sitterAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    serviceType: 'Doggy Day Care',
    rating: 5,
    comment: '',
    petName: 'Bella (Golden Retriever)'
  });

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.comment.trim()) return;

    const added: Review = {
      id: reviewsWritten.length + 1,
      ...newReview,
      dates: 'Recent Booking (June 2026)',
      timeAgo: 'Just now'
    };

    setReviewsWritten(prev => [added, ...prev]);
    setNewReview(prev => ({ ...prev, comment: '' }));
    setShowForm(false);
  };

  // Helper to render star rating row
  const renderStars = (count: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={cn(
              i < count ? "text-amber-400 fill-amber-400" : "text-slate-200"
            )}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">

      {/* 1. Header with Title and write review button */}
      <div className="pb-6 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-[18px] font-bold text-slate-900">Your Reviews Center</h2>
          <p className="text-xs text-slate-400 mt-1">Manage ratings given to sitters and view feedback on your pets.</p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#111c1e] text-white px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors shadow-sm active:scale-95 self-start sm:self-auto"
        >
          <Edit3 size={14} /> {showForm ? "View Reviews List" : "Write a Review"}
        </button>
      </div>

      {/* 2. Rating Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100/80 flex items-center gap-4">
          <div className="p-3 bg-amber-50 rounded-lg text-amber-500">
            <Star size={20} className="fill-amber-400" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Average Rating</span>
            <span className="text-xl font-extrabold text-[#111c1e]">4.9 / 5.0</span>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100/80 flex items-center gap-4">
          <div className="p-3 bg-indigo-50 rounded-lg text-indigo-500">
            <MessageSquare size={20} />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Reviews</span>
            <span className="text-xl font-extrabold text-[#111c1e]">{reviewsWritten.length + reviewsReceived.length} Total</span>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100/80 flex items-center gap-4">
          <div className="p-3 bg-emerald-50 rounded-lg text-emerald-500">
            <Award size={20} />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Pet Reputation</span>
            <span className="text-xl font-extrabold text-[#111c1e]">Elite Guest</span>
          </div>
        </div>
      </div>

      {/* ================= SIMULATOR FORM ================= */}
      {showForm && (
        <form onSubmit={handleAddReview} className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 space-y-4 animate-in slide-in-from-top-4 duration-300">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Sparkles size={15} className="text-amber-500" />
            Write Feedback for a Recent Sitter
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Select Sitter</label>
              <select
                value={newReview.sitterName}
                onChange={(e) => {
                  const val = e.target.value;
                  const avatar = val === 'Sophia Miller'
                    ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop'
                    : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop';
                  const service = val === 'Sophia Miller' ? 'Doggy Day Care' : 'Dog Walking';
                  setNewReview(prev => ({ ...prev, sitterName: val, sitterAvatar: avatar, serviceType: service }));
                }}
                className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs outline-none focus:border-[#111c1e]"
              >
                <option value="Sophia Miller">Sophia Miller (Day Care)</option>
                <option value="James Wilson">James Wilson (Dog Walking)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Pet Concerned</label>
              <input
                type="text"
                value={newReview.petName}
                onChange={(e) => setNewReview(prev => ({ ...prev, petName: e.target.value }))}
                className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs outline-none focus:border-[#111c1e]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Rating Stars</label>
              <select
                value={newReview.rating}
                onChange={(e) => setNewReview(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
                className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs outline-none focus:border-[#111c1e]"
              >
                <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
                <option value={4}>⭐⭐⭐⭐ (4/5)</option>
                <option value={3}>⭐⭐⭐ (3/5)</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-500 uppercase">Your Review Details</label>
            <textarea
              rows={3}
              placeholder="Emma took excellent care of our rabbit..."
              value={newReview.comment}
              onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
              className="w-full bg-white border border-slate-200 rounded-lg p-3 text-xs outline-none focus:border-[#111c1e] resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#111c1e] text-white py-2.5 rounded-xl text-xs font-bold hover:bg-black transition-colors"
          >
            Post Review to Dashboard
          </button>
        </form>
      )}

      {/* ================= TABS SELECTOR ================= */}
      <div className="flex items-center gap-3 border-b border-slate-100 pb-0.5">
        <button
          onClick={() => setActiveSubTab('received')}
          className={cn(
            "pb-3.5 text-xs font-bold border-b-2 px-1 transition-all duration-300 relative",
            activeSubTab === 'received'
              ? "border-[#111c1e] text-slate-900"
              : "border-transparent text-slate-400 hover:text-slate-600"
          )}
        >
          <span>Reviews About You & Your Pets ({reviewsReceived.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('written')}
          className={cn(
            "pb-3.5 text-xs font-bold border-b-2 px-1 transition-all duration-300 relative",
            activeSubTab === 'written'
              ? "border-[#111c1e] text-slate-900"
              : "border-transparent text-slate-400 hover:text-slate-600"
          )}
        >
          <span>Reviews You've Written ({reviewsWritten.length})</span>
        </button>
      </div>

      {/* ================= REVIEWS STREAM ================= */}
      <div className="space-y-4">

        {activeSubTab === 'received' ? (
          reviewsReceived.map((rev) => (
            <div key={rev.id} className="bg-white border border-slate-100 rounded-xl p-5 hover:bg-slate-50/40 hover:shadow-sm transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={rev.sitterAvatar} alt={rev.sitterName} className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-50" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-800">{rev.sitterName}</h4>
                      <span className="text-[9px] bg-slate-100 text-slate-400 font-bold px-1.5 py-0.5 rounded uppercase">Pet Sitter</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[10px] text-slate-400 font-semibold mt-0.5">
                      <span className="flex items-center gap-1"><Dog size={11} /> Service: {rev.serviceType}</span>
                      <span className="flex items-center gap-1"><Calendar size={11} /> {rev.dates}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center sm:flex-col sm:items-end justify-between sm:justify-start gap-1">
                  {renderStars(rev.rating)}
                  <span className="text-[10px] text-slate-400 font-semibold">{rev.timeAgo}</span>
                </div>
              </div>

              {/* Pet Name Tag indicator */}
              {rev.petName && (
                <div className="mt-3 inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 border border-emerald-100 rounded-full text-[9px] font-extrabold text-emerald-600 uppercase tracking-wide">
                  <Check size={9} strokeWidth={3} /> Review Target: {rev.petName}
                </div>
              )}

              {/* Comment text */}
              <p className="mt-3 text-xs text-slate-500 leading-relaxed font-medium italic">
                "{rev.comment}"
              </p>

            </div>
          ))
        ) : (
          reviewsWritten.map((rev) => (
            <div key={rev.id} className="bg-white border border-slate-100 rounded-xl p-5 hover:bg-slate-50/40 hover:shadow-sm transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={rev.sitterAvatar} alt={rev.sitterName} className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-50" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-800">{rev.sitterName}</h4>
                      <span className="text-[9px] bg-slate-100 text-slate-400 font-bold px-1.5 py-0.5 rounded uppercase">Pet Sitter</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[10px] text-slate-400 font-semibold mt-0.5">
                      <span className="flex items-center gap-1"><Dog size={11} /> Service: {rev.serviceType}</span>
                      <span className="flex items-center gap-1"><Calendar size={11} /> {rev.dates}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center sm:flex-col sm:items-end justify-between sm:justify-start gap-1">
                  {renderStars(rev.rating)}
                  <span className="text-[10px] text-slate-400 font-semibold">{rev.timeAgo}</span>
                </div>
              </div>

              {/* Pet Name Tag indicator */}
              {rev.petName && (
                <div className="mt-3 inline-flex items-center gap-1 px-2.5 py-0.5 bg-slate-100 border border-slate-200 rounded-full text-[9px] font-extrabold text-slate-500 uppercase tracking-wide">
                  Concerned Pet: {rev.petName}
                </div>
              )}

              {/* Comment text */}
              <p className="mt-3 text-xs text-slate-500 leading-relaxed font-medium italic">
                "{rev.comment}"
              </p>

            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default ReviewsSection;
