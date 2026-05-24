import React, { useState } from 'react';
import { Calendar, Check, X, User, MessageSquare } from 'lucide-react';
import { useSitterBookings } from '../../hooks/useSitterBookings';
import ChatBox from '../chat/ChatBox';

const SellerBookingsSection = () => {
  const { bookings, loading, counts, updateStatus } = useSitterBookings();
  const [chatBooking, setChatBooking] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [actingId, setActingId] = useState<string | null>(null);

  const handleAction = async (id: string, status: 'Approved' | 'Cancelled') => {
    setActingId(id);
    await updateStatus(id, status);
    setActingId(null);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm">
          <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">Total</span>
          <span className="text-[28px] font-bold text-slate-900 mt-2 block">{counts.total}</span>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm">
          <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">Pending</span>
          <span className="text-[28px] font-bold text-amber-500 mt-2 block">{counts.pending}</span>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm">
          <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">Approved</span>
          <span className="text-[28px] font-bold text-emerald-500 mt-2 block">{counts.approved}</span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50">
          <h2 className="text-[16px] font-bold text-slate-900">All Bookings</h2>
        </div>

        <div className="divide-y divide-slate-50">
          {loading ? (
            <div className="p-12 py-20 text-center text-slate-400 text-[14px]">Loading...</div>
          ) : bookings.length === 0 ? (
            <div className="p-12 py-20 text-center text-slate-400 italic text-[14px]">No bookings yet.</div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <p className="text-[11px] font-bold text-slate-400 uppercase">Booked by</p>
                  <h3 className="text-[16px] font-bold text-slate-900">{booking.clientName}</h3>
                  <p className="text-[14px] font-semibold text-[#111c1e] flex items-center gap-2">
                    <Calendar size={14} className="text-[#5bc0de]" />
                    {booking.scheduleLabel}
                  </p>
                  <p className="text-[12px] text-slate-500 flex items-center gap-1">
                    <User size={12} /> {booking.petType}
                    {booking.listingName ? ` · ${booking.listingName}` : ''}
                  </p>
                  <span className="text-[10px] font-bold uppercase text-slate-400">{booking.status}</span>
                </div>

                {booking.status === 'Pending' ? (
                  <div className="flex gap-3">
                    <button
                      disabled={actingId === booking.id}
                      onClick={() => handleAction(booking.id, 'Approved')}
                      className="flex items-center gap-2 bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm"
                    >
                      <Check size={16} /> Accept
                    </button>
                    <button
                      disabled={actingId === booking.id}
                      onClick={() => handleAction(booking.id, 'Cancelled')}
                      className="flex items-center gap-2 border-2 border-rose-200 text-rose-600 px-5 py-2.5 rounded-xl font-bold text-sm"
                    >
                      <X size={16} /> Decline
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setChatBooking(booking.id);
                      setIsChatOpen(true);
                    }}
                    className="flex items-center gap-1.5 bg-slate-100 text-slate-600 px-4 py-2 rounded-xl text-sm font-bold"
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

export default SellerBookingsSection;
