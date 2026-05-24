import React from 'react';
import { Calendar, User, Clock } from 'lucide-react';
import { useSitterBookings } from '../../hooks/useSitterBookings';
import { normalizeBookingTime } from '../../lib/bookingSlot';

const SellerBookingsCalendar: React.FC = () => {
  const { bookings, loading } = useSitterBookings();

  const activeBookings = bookings.filter((b) => b.status !== 'Cancelled');

  const grouped = activeBookings.reduce<Record<string, typeof activeBookings>>((acc, b) => {
    const key = b.date || 'Unknown date';
    if (!acc[key]) acc[key] = [];
    acc[key].push(b);
    return acc;
  }, {});

  const sortedDates = Object.keys(grouped).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-50">
        <h2 className="text-[16px] font-bold text-slate-900">Bookings Calendar</h2>
        <p className="text-[13px] text-slate-400 mt-1">
          One owner per date &amp; time slot. New bookings cannot overlap an existing slot.
        </p>
      </div>

      {loading ? (
        <div className="p-12 py-20 text-center text-slate-400 text-[14px]">Loading calendar...</div>
      ) : sortedDates.length === 0 ? (
        <div className="p-12 py-20 text-center">
          <Calendar className="w-10 h-10 text-slate-200 mx-auto mb-3" />
          <p className="text-slate-400 italic text-[14px]">No bookings scheduled yet.</p>
        </div>
      ) : (
        <div className="divide-y divide-slate-50">
          {sortedDates.map((date) => (
            <div key={date} className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar size={16} className="text-[#5bc0de]" />
                <h3 className="text-[14px] font-bold text-slate-800">{date}</h3>
                <span className="text-[11px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
                  {grouped[date].length} booking{grouped[date].length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="space-y-3 ml-1">
                {grouped[date].map((booking) => {
                  const slotKey = `${booking.date}-${normalizeBookingTime(booking.time)}`;
                  const sameSlotCount = grouped[date].filter(
                    (b) =>
                      b.status !== 'Cancelled' &&
                      `${b.date}-${normalizeBookingTime(b.time)}` === slotKey
                  ).length;
                  return (
                  <div
                    key={booking.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg border border-slate-100 bg-slate-50/50"
                  >
                    <div>
                      <p className="text-[14px] font-bold text-slate-900">{booking.clientName}</p>
                      <p className="text-[12px] text-slate-500">{booking.listingName}</p>
                      <div className="flex flex-wrap gap-3 mt-1.5 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {booking.scheduleLabel}
                        </span>
                        <span className="flex items-center gap-1">
                          <User size={12} /> {booking.petType}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${
                          booking.status === 'Approved'
                            ? 'bg-emerald-50 text-emerald-600'
                            : 'bg-amber-50 text-amber-600'
                        }`}
                      >
                        {booking.status}
                      </span>
                      {sameSlotCount > 1 && (
                        <span className="text-[10px] text-rose-500 font-bold">Duplicate slot</span>
                      )}
                    </div>
                  </div>
                );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerBookingsCalendar;
