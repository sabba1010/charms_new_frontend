import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, Search, MapPin, Calendar, 
  Check, X, AlertTriangle, User, DollarSign, Undo2, Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Booking {
  id: number;
  clientName: string;
  clientAvatar: string;
  serviceTitle: string;
  hostName: string;
  dateRange: string;
  price: number;
  petCount: number;
  status: 'Pending' | 'Rejected' | 'Active';
  rejectionReason?: string;
}

interface AdminBookingListProps {
  activeSubTab?: string;
}

const AdminBookingList: React.FC<AdminBookingListProps> = ({ activeSubTab }) => {
  const [currentTab, setCurrentTab] = useState<'pending' | 'rejected' | 'active'>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals state
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);
  const [rejectionReasonInput, setRejectionReasonInput] = useState('');
  const [rejectionError, setRejectionError] = useState('');

  // Prepopulated mock booking requests
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 501,
      clientName: 'Sophia Green',
      clientAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
      serviceTitle: 'Sunny Apartment Hosting',
      hostName: 'Lisa (Sitter)',
      dateRange: 'May 20 - May 24, 2026',
      price: 180.00,
      petCount: 1,
      status: 'Pending'
    },
    {
      id: 502,
      clientName: 'Emma Thompson',
      clientAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
      serviceTitle: 'Daily Neighborhood Dog Walking',
      hostName: 'Alex (Sitter)',
      dateRange: 'May 22, 2026',
      price: 35.00,
      petCount: 2,
      status: 'Pending'
    },
    {
      id: 503,
      clientName: 'Sarah Jenkins',
      clientAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
      serviceTitle: 'Obedience Class Day Session',
      hostName: 'Chris (Sitter)',
      dateRange: 'May 25, 2026',
      price: 90.00,
      petCount: 1,
      status: 'Pending'
    },
    {
      id: 601,
      clientName: 'David Miller',
      clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      serviceTitle: 'Premium Grooming Combo',
      hostName: 'George (Sitter)',
      dateRange: 'May 14, 2026',
      price: 120.00,
      petCount: 1,
      status: 'Rejected',
      rejectionReason: 'Sitter is fully booked for this holiday weekend.'
    },
    {
      id: 701,
      clientName: 'James Wilson',
      clientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
      serviceTitle: 'Sunny Apartment Hosting',
      hostName: 'Lisa (Sitter)',
      dateRange: 'May 10 - May 12, 2026',
      price: 90.00,
      petCount: 1,
      status: 'Active'
    },
    {
      id: 702,
      clientName: 'Sophia Green',
      clientAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
      serviceTitle: 'Daily Neighborhood Dog Walking',
      hostName: 'Alex (Sitter)',
      dateRange: 'May 08, 2026',
      price: 35.00,
      petCount: 1,
      status: 'Active'
    }
  ]);

  // Sync tab with activeSubTab prop (Pending first, then Rejected, then Active)
  useEffect(() => {
    if (activeSubTab === 'bookings-pending' || activeSubTab === 'bookings') {
      setCurrentTab('pending');
    } else if (activeSubTab === 'bookings-rejected') {
      setCurrentTab('rejected');
    } else if (activeSubTab === 'bookings-approved') {
      setCurrentTab('active');
    }
  }, [activeSubTab]);

  const handleApprove = (id: number) => {
    setBookings(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, status: 'Active', rejectionReason: undefined };
      }
      return item;
    }));
  };

  const handleOpenRejectModal = (id: number) => {
    setSelectedBookingId(id);
    setRejectionReasonInput('');
    setRejectionError('');
    setShowRejectModal(true);
  };

  const handleConfirmRejection = () => {
    if (!rejectionReasonInput.trim()) {
      setRejectionError('A rejection reason is strictly required.');
      return;
    }

    setBookings(prev => prev.map(item => {
      if (item.id === selectedBookingId) {
        return {
          ...item,
          status: 'Rejected',
          rejectionReason: rejectionReasonInput.trim()
        };
      }
      return item;
    }));

    setShowRejectModal(false);
    setSelectedBookingId(null);
  };

  const handleRestore = (id: number) => {
    setBookings(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, status: 'Pending', rejectionReason: undefined };
      }
      return item;
    }));
  };

  const handleDelete = (id: number) => {
    setBookings(prev => prev.filter(item => item.id !== id));
  };

  const filteredBookings = bookings.filter(item => {
    const matchesTab = item.status.toLowerCase() === currentTab;
    const matchesSearch = item.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.serviceTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.hostName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const pendingCount = bookings.filter(b => b.status === 'Pending').length;
  const rejectedCount = bookings.filter(b => b.status === 'Rejected').length;
  const activeCount = bookings.filter(b => b.status === 'Active').length;

  return (
    <div className="space-y-8 pb-20 relative">
      {/* Booking Header & Filter Bar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-slate-50 text-slate-800">
            <Calendar size={20} />
          </div>
          <div>
            <h2 className="text-[16px] font-bold text-slate-900">All Booking System</h2>
            <p className="text-[12px] text-slate-400 mt-0.5">Admin command center for active, pending and rejected reservations.</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-grow lg:w-72">
            <input 
              type="text" 
              placeholder="Search by client, listing or host..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-transparent rounded-xl pl-5 pr-10 py-2.5 text-[13px] outline-none focus:bg-white focus:border-slate-200 transition-all text-slate-700"
            />
            <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Tabs list matching user request (Pending first, then Rejected, then Active) */}
      <div className="flex gap-2 border-b border-slate-100 pb-[1px]">
        <button 
          onClick={() => setCurrentTab('pending')}
          className={`flex items-center gap-3 pb-4 px-6 text-sm font-bold border-b-2 transition-all relative ${currentTab === 'pending' ? 'text-[#f0ad4e] border-[#f0ad4e]' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
        >
          Pending Bookings
          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${currentTab === 'pending' ? 'bg-[#f0ad4e] text-white' : 'bg-slate-100 text-slate-400'}`}>
            {pendingCount}
          </span>
        </button>
        <button 
          onClick={() => setCurrentTab('rejected')}
          className={`flex items-center gap-3 pb-4 px-6 text-sm font-bold border-b-2 transition-all relative ${currentTab === 'rejected' ? 'text-[#d9534f] border-[#d9534f]' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
        >
          Rejected Bookings
          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${currentTab === 'rejected' ? 'bg-[#d9534f] text-white' : 'bg-slate-100 text-slate-400'}`}>
            {rejectedCount}
          </span>
        </button>
        <button 
          onClick={() => setCurrentTab('active')}
          className={`flex items-center gap-3 pb-4 px-6 text-sm font-bold border-b-2 transition-all relative ${currentTab === 'active' ? 'text-[#5cb85c] border-[#5cb85c]' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
        >
          Active Bookings
          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${currentTab === 'active' ? 'bg-[#5cb85c] text-white' : 'bg-slate-100 text-slate-400'}`}>
            {activeCount}
          </span>
        </button>
      </div>

      {/* Main Reservation List Panel */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-100">
          <AnimatePresence mode="popLayout">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <motion.div 
                  key={booking.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-8 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-8 group hover:bg-slate-50/20 transition-all duration-300"
                >
                  
                  {/* Left: Client Profile Avatar & Main booking Info */}
                  <div className="flex flex-col md:flex-row items-start gap-5 flex-grow">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-full overflow-hidden border border-slate-200 bg-slate-50">
                        <img src={booking.clientAvatar} alt={booking.clientName} className="w-full h-full object-cover" />
                      </div>
                      <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full text-white text-[9px] font-extrabold flex items-center justify-center border-2 border-white shadow-sm ${booking.status === 'Active' ? 'bg-[#5cb85c]' : booking.status === 'Pending' ? 'bg-[#f0ad4e]' : 'bg-[#d9534f]'}`}>
                        {booking.status === 'Active' ? 'A' : booking.status === 'Pending' ? 'P' : 'R'}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h4 className="text-[15px] font-bold text-slate-800">{booking.clientName}</h4>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100/50">
                          Client Request
                        </span>
                      </div>

                      <p className="text-[14px] text-slate-800 font-semibold">
                        Reserved <span className="text-[#3b82f6] hover:underline font-bold">"{booking.serviceTitle}"</span> hosted by <span className="text-slate-600 font-bold">{booking.hostName}</span>
                      </p>

                      {/* Booking meta info */}
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-semibold pt-1">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={13} className="text-slate-300" />
                          {booking.dateRange}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                        <span className="flex items-center gap-1.5">
                          <User size={13} className="text-slate-300" />
                          {booking.petCount} {booking.petCount === 1 ? 'Pet' : 'Pets'}
                        </span>
                      </div>

                      {/* Rejection Reason block */}
                      {booking.status === 'Rejected' && booking.rejectionReason && (
                        <div className="mt-4 p-4 bg-red-50 border border-red-100/50 rounded-xl flex items-start gap-3 max-w-[600px]">
                          <AlertTriangle className="text-red-500 flex-shrink-0 mt-0.5" size={16} />
                          <div>
                            <h4 className="text-xs font-bold text-red-800 uppercase tracking-wider">Rejection Reason:</h4>
                            <p className="text-[13px] text-red-600 mt-1 leading-relaxed italic">
                              "{booking.rejectionReason}"
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Pricing info and Interactive Controls */}
                  <div className="flex flex-row xl:flex-col items-center xl:items-end justify-between xl:justify-center gap-6 w-full xl:w-72 border-t xl:border-t-0 pt-4 xl:pt-0 border-slate-100">
                    <div className="text-left xl:text-right">
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Total Payment</span>
                      <div className="flex items-center gap-1 text-[20px] font-extrabold text-slate-800 mt-0.5">
                        <DollarSign size={18} className="text-emerald-500 -mr-1" />
                        <span>{booking.price.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <span className={`text-[12px] font-bold px-4 py-2 rounded-xl border ${
                        booking.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                        booking.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                        'bg-rose-50 text-rose-600 border-rose-100'
                      }`}>
                        {booking.status === 'Active' ? 'Approved & Active' : booking.status === 'Pending' ? 'Pending Approval' : 'Rejected / Cancelled'}
                      </span>
                    </div>
                  </div>

                </motion.div>
              ))
            ) : (
              <div className="p-20 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">📅</span>
                </div>
                <h3 className="text-slate-800 font-bold text-sm">No Bookings Found</h3>
                <p className="text-slate-400 text-xs mt-1">There are no bookings matching this status category.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Statistics */}
        <div className="p-8 border-t border-slate-50 text-center bg-slate-50/50">
          <p className="text-slate-400 text-[13px] font-bold uppercase tracking-wider">
            Consolidated total: {filteredBookings.length} {currentTab} {filteredBookings.length === 1 ? 'booking' : 'bookings'}
          </p>
        </div>
      </div>

      {/* Booking Rejection Modal */}
      <AnimatePresence>
        {showRejectModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-2xl w-full max-w-[500px] overflow-hidden"
            >
              {/* Header */}
              <div className="px-8 py-5 border-b border-slate-50 bg-[#d9534f]/5 flex items-center gap-3">
                <AlertTriangle className="text-[#d9534f]" size={20} />
                <h3 className="text-[16px] font-bold text-[#d9534f]">Confirm Booking Rejection</h3>
              </div>

              {/* Body */}
              <div className="p-8 space-y-5">
                <p className="text-[14px] text-slate-600 leading-relaxed">
                  Are you sure you want to reject this booking? You must provide a clear reason for the rejection to help the client understand why the reservation was refused.
                </p>

                <div className="space-y-2">
                  <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Reason for Rejection *</label>
                  <textarea 
                    placeholder="e.g. Sitter fully booked, schedule conflict, or holiday rate adjustments required..."
                    value={rejectionReasonInput}
                    onChange={(e) => {
                      setRejectionReasonInput(e.target.value);
                      if (e.target.value.trim()) setRejectionError('');
                    }}
                    className={`w-full h-32 bg-slate-50 border rounded-xl p-4 text-[13px] outline-none transition-all text-slate-700 resize-none ${rejectionError ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:bg-white focus:border-slate-400'}`}
                  />
                  {rejectionError && (
                    <span className="text-[11px] text-red-500 font-bold block">{rejectionError}</span>
                  )}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="px-8 py-5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
                <button 
                  onClick={() => setShowRejectModal(false)}
                  className="px-5 py-2.5 bg-white border border-slate-200 text-slate-500 hover:bg-slate-100 rounded-xl text-[12px] font-bold transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleConfirmRejection}
                  className="px-5 py-2.5 bg-[#d9534f] text-white hover:bg-[#c9302c] rounded-xl text-[12px] font-bold transition-all shadow-sm active:scale-95"
                >
                  Confirm Rejection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminBookingList;
