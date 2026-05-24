import React, { useState, useEffect } from 'react';
import {
  ChevronDown, Calendar, Check, X, Clock,
  User, DollarSign, MessageSquare, Star, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../lib/utils';
import DateRangePicker from '../DateRangePicker';
import ChatBox from '../../chat/ChatBox';

interface Booking {
  id: number;
  sitterName: string;
  sitterAvatar: string;
  sitterRating: number;
  petName: string;
  serviceType: string;
  dates: string;
  price: number;
  status: 'Pending' | 'Approved' | 'Cancelled';
}

interface BookingsSectionProps {
  onViewMessages?: () => void;
}

const BookingsSection: React.FC<BookingsSectionProps> = ({ onViewMessages }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState({ start: 'May 1, 2026', end: 'May 31, 2026' });

  const getImageUrl = (url: string) => {
    if (!url) return 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&fit=crop';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
      return url;
    }
    const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';
    const backendUrl = apiUrl.replace('/api', '');
    return `${backendUrl}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  // chat state
  const [chatBooking, setChatBooking] = useState<string | number | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const openChat = (id: string | number) => {
    setChatBooking(id);
    setIsChatOpen(true);
  };
  const closeChat = () => {
    setIsChatOpen(false);
    setChatBooking(null);
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';
        const res = await fetch(`${apiUrl}/bookings/my-bookings`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (data.success) {
          const formattedBookings = data.data.map((b: any) => ({
            id: b._id,
            sitterName: b.sitter ? `${b.sitter.firstName || ''} ${b.sitter.lastName || ''}`.trim() || b.sitter.username : 'Unknown Sitter',
            sitterAvatar: getImageUrl(b.listing?.logo),
            sitterRating: 5.0,
            petName: `${b.petCount} Pet(s)`,
            serviceType: b.listing?.title || 'Pet Care',
            dates: `${b.date} at ${b.time}`,
            price: b.totalAmount || 0,
            status: b.status
          }));
          setBookings(formattedBookings);
        }
      } catch (err) {
        console.error('Error fetching bookings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleCancelBooking = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';
      const res = await fetch(`${apiUrl}/bookings/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: 'Cancelled' })
      });
      const data = await res.json();
      if (data.success) {
        setBookings(prev =>
          prev.map(b => b.id === id ? { ...b, status: 'Cancelled' } : b)
        );
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // filteredBookings is now just bookings
  const filteredBookings = bookings;

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'Approved':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold uppercase tracking-wider">
            <Check size={12} /> Confirmed
          </span>
        );
      case 'Cancelled':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-500 rounded-full text-xs font-bold uppercase tracking-wider">
            <X size={12} /> Cancelled
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-xs font-bold uppercase tracking-wider animate-pulse">
            <Clock size={12} /> Pending Approval
          </span>
        );
    }
  };

  return (
    <div className="space-y-8">
      {/* Tab Filter bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-slate-100 gap-4 relative">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-slate-900">Your Bookings</h2>
        </div>

        <div className="relative self-start sm:self-center">
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="flex items-center gap-2 text-slate-500 text-[13px] font-medium hover:text-slate-900 transition-colors"
          >
            <span>{selectedDateRange.start} - {selectedDateRange.end}</span>
            <ChevronDown className={cn("w-4 h-4 transition-transform", showDatePicker ? "rotate-180" : "")} />
          </button>

          <AnimatePresence>
            {showDatePicker && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 top-full mt-4 z-50"
              >
                <DateRangePicker
                  onApply={(range: { start: string; end: string }) => {
                    setSelectedDateRange(range);
                    setShowDatePicker(false);
                  }}
                  onCancel={() => setShowDatePicker(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Booking List Container */}
      <div className="divide-y divide-slate-50">
        {loading ? (
          <div className="py-20 text-center flex flex-col items-center gap-2">
            <p className="text-slate-400 text-[14px]">Loading your bookings...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center gap-2">
            <p className="text-slate-400 italic text-[14px]">You don't have any bookings matching this category yet.</p>
          </div>
        ) : (
          filteredBookings.map((booking) => (
            <div key={booking.id} className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-50/40 px-4 rounded-xl transition-all">
              <div className="flex flex-col sm:flex-row items-start gap-5">
                {/* Sitter Avatar with Star Rating */}
                <div className="relative flex-shrink-0">
                  <img
                    src={booking.sitterAvatar}
                    alt={booking.sitterName}
                    className="w-14 h-14 rounded-full object-cover ring-4 ring-slate-100"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-white border border-slate-100 rounded-full px-1 py-0.5 flex items-center gap-0.5 shadow-sm">
                    <Star size={10} className="text-amber-400 fill-amber-400" />
                    <span className="text-[10px] font-bold text-slate-700">{booking.sitterRating}</span>
                  </div>
                </div>

                {/* Sitter / Pet Info details */}
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-[15px] font-bold text-slate-900">{booking.sitterName}</h3>
                    {getStatusBadge(booking.status)}
                  </div>
                  <p className="text-[13px] text-[#111c1e] font-semibold flex items-center gap-2">
                    {booking.serviceType}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} className="text-slate-400" />
                      {booking.dates}
                    </span>
                    <span className="flex items-center gap-1">
                      <User size={13} className="text-slate-400" />
                      Pet: {booking.petName}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center md:flex-col md:items-end justify-between md:justify-center gap-4 border-t border-slate-50 md:border-none pt-4 md:pt-0">
                <div className="text-left md:text-right">
                  <span className="text-xs text-slate-400 block uppercase tracking-wider font-bold">Total Paid</span>
                  <span className="text-2.5xl font-extrabold text-[#111c1e]">${booking.price.toFixed(2)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openChat(booking.id)}
                    className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-[#111c1e] px-4 py-2 rounded-full text-xs font-bold transition-all"
                  >
                    <MessageSquare size={13} /> Chat with Sitter
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {isChatOpen && chatBooking && (
        <ChatBox bookingId={chatBooking} onClose={closeChat} title="Chat with Sitter" />
      )}
    </div>
  );
};

export default BookingsSection;
