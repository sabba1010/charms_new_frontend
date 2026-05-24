import React, { useState } from 'react';
import { Calendar, Check, X, Clock, User, MessageSquare } from 'lucide-react';
import { useSitterBookings, SitterBooking } from '../../hooks/useSitterBookings';
import ChatBox from '../chat/ChatBox';

interface SellerBookingListProps {
  title: string;
  statusFilter?: SitterBooking['status'];
}

const SellerBookingList: React.FC<SellerBookingListProps> = ({ title, statusFilter }) => {
  const { bookings, loading, updateStatus } = useSitterBookings();
  const [chatBooking, setChatBooking] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [actingId, setActingId] = useState<string | null>(null);

  const isPendingView = statusFilter === 'Pending' || title.toLowerCase().includes('pending');

  const filteredBookings = bookings.filter((b) => {
    if (statusFilter) return b.status === statusFilter;
    return true;
  });

  const handleAction = async (id: string, status: 'Approved' | 'Cancelled') => {
    setActingId(id);
    await updateStatus(id, status);
    setActingId(null);
  };

  return (
    <div className="space-y-6">
      {isPendingView && (
        <p className="text-[13px] text-slate-500 bg-amber-50 border border-amber-100 rounded-lg px-4 py-3">
          Review who booked and when. Accept only if the time works for you — otherwise decline.
        </p>
      )}

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50">
          <h2 className="text-[16px] font-bold text-slate-900">{title}</h2>
        </div>

        <div className="divide-y divide-slate-50">
          {loading ? (
            <div className="p-12 py-20 text-center">
              <p className="text-slate-400 text-[14px]">Loading bookings...</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="p-12 py-20 text-center">
              <p className="text-slate-400 italic text-[14px]">No bookings in this list.</p>
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-4 min-w-0">
                  {booking.clientAvatar && (
                    <img
                      src={booking.clientAvatar}
                      alt=""
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100 shrink-0"
                    />
                  )}
                  <div className="space-y-2 min-w-0">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Booked by
                    </p>
                    <h3 className="text-[17px] font-bold text-slate-900">{booking.clientName}</h3>

                    <div className="flex items-center gap-2 text-[14px] text-[#111c1e] font-semibold">
                      <Calendar size={15} className="text-[#5bc0de] shrink-0" />
                      <span>{booking.scheduleLabel}</span>
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-slate-500">
                      {booking.listingName && (
                        <span>Listing: {booking.listingName}</span>
                      )}
                      <span className="flex items-center gap-1">
                        <User size={12} /> {booking.petType}
                      </span>
                      {booking.price > 0 && (
                        <span>${booking.price.toFixed(2)}</span>
                      )}
                    </div>

                    {booking.requirements && (
                      <p className="text-[12px] text-slate-500 bg-slate-50 rounded-lg px-3 py-2 max-w-lg">
                        Note: {booking.requirements}
                      </p>
                    )}

                    {booking.status !== 'Pending' && (
                      <span
                        className={`inline-flex text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${
                          booking.status === 'Approved'
                            ? 'bg-emerald-50 text-emerald-600'
                            : 'bg-rose-50 text-rose-500'
                        }`}
                      >
                        {booking.status}
                      </span>
                    )}
                  </div>
                </div>

                {booking.status === 'Pending' ? (
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                    <button
                      disabled={actingId === booking.id}
                      onClick={() => handleAction(booking.id, 'Approved')}
                      className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md"
                    >
                      <Check size={18} />
                      Accept
                    </button>
                    <button
                      disabled={actingId === booking.id}
                      onClick={() => handleAction(booking.id, 'Cancelled')}
                      className="flex items-center justify-center gap-2 bg-white border-2 border-rose-200 text-rose-600 hover:bg-rose-50 disabled:opacity-60 px-6 py-3 rounded-xl font-bold text-sm transition-all"
                    >
                      <X size={18} />
                      Decline
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setChatBooking(booking.id);
                      setIsChatOpen(true);
                    }}
                    className="flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shrink-0"
                  >
                    <MessageSquare size={14} /> Message
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {isChatOpen && chatBooking && (
        <ChatBox bookingId={chatBooking} onClose={() => setIsChatOpen(false)} title="Chat with Client" />
      )}
    </div>
  );
};

export default SellerBookingList;
