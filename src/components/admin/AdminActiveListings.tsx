import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import {
  Search, ChevronDown, MapPin,
  Check, X, AlertTriangle, MessageSquare, Trash2, Undo2, Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AdminActiveListingsProps {
  activeSubTab?: string;
}

const AdminActiveListings: React.FC<AdminActiveListingsProps> = ({ activeSubTab }) => {
  const [currentTab, setCurrentTab] = useState<'pending' | 'rejected' | 'active'>('pending');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);
  const [rejectionReasonInput, setRejectionReasonInput] = useState('');
  const [rejectionError, setRejectionError] = useState('');
  const [viewingListing, setViewingListing] = useState<any | null>(null);

  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getImageUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
      return url;
    }
    if (url.startsWith('/uploads') || url.startsWith('uploads/')) {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';
      const backendUrl = apiUrl.replace('/api', '');
      return `${backendUrl}${url.startsWith('/') ? '' : '/'}${url}`;
    }
    return url;
  };

  const fetchListings = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setListings([]);
        setLoading(false);
        return;
      }
      const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';
      const res = await fetch(`${apiUrl}/listings?adminView=true`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setListings(data.data);
      } else {
        setError(data.message || 'Failed to fetch listings');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error fetching listings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  // Sync tab with sidebar sub-tabs
  useEffect(() => {
    if (activeSubTab === 'listings-pending' || activeSubTab === 'my-listings') {
      setCurrentTab('pending');
    } else if (activeSubTab === 'listings-rejected') {
      setCurrentTab('rejected');
    } else if (activeSubTab === 'listings-active') {
      setCurrentTab('active');
    }
  }, [activeSubTab]);

  const handleApprove = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';
      const res = await fetch(`${apiUrl}/listings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: 'Active', rejectionReason: '' })
      });
      const data = await res.json();
      if (data.success) {
        Swal.fire({
          title: 'Approved!',
          text: 'Listing approved and published successfully!',
          icon: 'success',
          confirmButtonColor: '#111c1e'
        });
        fetchListings();
      } else {
        Swal.fire({
          title: 'Error!',
          text: data.message || 'Failed to approve listing',
          icon: 'error',
          confirmButtonColor: '#111c1e'
        });
      }
    } catch (err: any) {
      Swal.fire({
        title: 'Error!',
        text: err.message || 'Error approving listing',
        icon: 'error',
        confirmButtonColor: '#111c1e'
      });
    }
  };

  const handleOpenRejectModal = (id: string) => {
    setSelectedListingId(id);
    setRejectionReasonInput('');
    setRejectionError('');
    setShowRejectModal(true);
  };

  const handleConfirmRejection = async () => {
    if (!rejectionReasonInput.trim()) {
      setRejectionError('A rejection reason is strictly required.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';
      const res = await fetch(`${apiUrl}/listings/${selectedListingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: 'Rejected', rejectionReason: rejectionReasonInput.trim() })
      });
      const data = await res.json();
      if (data.success) {
        Swal.fire({
          title: 'Rejected!',
          text: 'Listing rejected successfully!',
          icon: 'success',
          confirmButtonColor: '#111c1e'
        });
        setShowRejectModal(false);
        setSelectedListingId(null);
        fetchListings();
      } else {
        Swal.fire({
          title: 'Error!',
          text: data.message || 'Failed to reject listing',
          icon: 'error',
          confirmButtonColor: '#111c1e'
        });
      }
    } catch (err: any) {
      Swal.fire({
        title: 'Error!',
        text: err.message || 'Error rejecting listing',
        icon: 'error',
        confirmButtonColor: '#111c1e'
      });
    }
  };

  const handleRestore = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';
      const res = await fetch(`${apiUrl}/listings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: 'Pending', rejectionReason: '' })
      });
      const data = await res.json();
      if (data.success) {
        Swal.fire({
          title: 'Restored!',
          text: 'Listing restored to Pending approval!',
          icon: 'success',
          confirmButtonColor: '#111c1e'
        });
        fetchListings();
      } else {
        Swal.fire({
          title: 'Error!',
          text: data.message || 'Failed to restore listing',
          icon: 'error',
          confirmButtonColor: '#111c1e'
        });
      }
    } catch (err: any) {
      Swal.fire({
        title: 'Error!',
        text: err.message || 'Error restoring listing',
        icon: 'error',
        confirmButtonColor: '#111c1e'
      });
    }
  };

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this listing? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#111c1e',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem('token');
          const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';
          const res = await fetch(`${apiUrl}/listings/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await res.json();
          if (data.success) {
            Swal.fire({
              title: 'Deleted!',
              text: 'Listing deleted successfully!',
              icon: 'success',
              confirmButtonColor: '#111c1e'
            });
            fetchListings();
          } else {
            Swal.fire({
              title: 'Error!',
              text: data.message || 'Failed to delete listing',
              icon: 'error',
              confirmButtonColor: '#111c1e'
            });
          }
        } catch (err: any) {
          Swal.fire({
            title: 'Error!',
            text: err.message || 'Error deleting listing',
            icon: 'error',
            confirmButtonColor: '#111c1e'
          });
        }
      }
    });
  };

  const filteredListings = listings.filter(item => {
    const matchesTab = (item.status || 'Pending').toLowerCase() === currentTab;
    const sellerName = item.user ? `${item.user.firstName || ''} ${item.user.lastName || ''} (${item.user.username || item.user.email || ''})` : 'Unknown Sitter';
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sellerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const pendingCount = listings.filter(l => (l.status || 'Pending') === 'Pending').length;
  const rejectedCount = listings.filter(l => l.status === 'Rejected').length;
  const activeCount = listings.filter(l => l.status === 'Active').length;

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-12 text-center text-slate-500 font-medium">
        <div className="animate-pulse flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-4 border-[#111c1e] border-t-transparent animate-spin"></div>
          <span>Loading listings database...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20 relative">
      {/* Search and Custom Header */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-slate-50 text-slate-800">
            <Search size={20} />
          </div>
          <div>
            <h2 className="text-[16px] font-bold text-slate-900">Listings Database</h2>
            <p className="text-[12px] text-slate-400 mt-0.5">Admin approval console for sitters and packages.</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-grow lg:w-72">
            <input
              type="text"
              placeholder="Search by listing name or seller..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-transparent rounded-xl pl-5 pr-10 py-2.5 text-[13px] outline-none focus:bg-white focus:border-slate-200 transition-all text-slate-700"
            />
            <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Tabs navigation matching user instructions (Pending first, then Rejected, then Active) */}
      <div className="flex gap-2 border-b border-slate-100 pb-[1px]">
        <button
          onClick={() => setCurrentTab('pending')}
          className={`flex items-center gap-3 pb-4 px-6 text-sm font-bold border-b-2 transition-all relative ${currentTab === 'pending' ? 'text-[#f0ad4e] border-[#f0ad4e]' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
        >
          Pending Approval
          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${currentTab === 'pending' ? 'bg-[#f0ad4e] text-white' : 'bg-slate-100 text-slate-400'}`}>
            {pendingCount}
          </span>
        </button>
        <button
          onClick={() => setCurrentTab('rejected')}
          className={`flex items-center gap-3 pb-4 px-6 text-sm font-bold border-b-2 transition-all relative ${currentTab === 'rejected' ? 'text-[#d9534f] border-[#d9534f]' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
        >
          Rejected
          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${currentTab === 'rejected' ? 'bg-[#d9534f] text-white' : 'bg-slate-100 text-slate-400'}`}>
            {rejectedCount}
          </span>
        </button>
        <button
          onClick={() => setCurrentTab('active')}
          className={`flex items-center gap-3 pb-4 px-6 text-sm font-bold border-b-2 transition-all relative ${currentTab === 'active' ? 'text-[#5cb85c] border-[#5cb85c]' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
        >
          Active Listings
          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${currentTab === 'active' ? 'bg-[#5cb85c] text-white' : 'bg-slate-100 text-slate-400'}`}>
            {activeCount}
          </span>
        </button>
      </div>

      {/* Main List panel */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-100">
          <AnimatePresence mode="popLayout">
            {filteredListings.length > 0 ? (
              filteredListings.map((listing) => {
                const sellerName = listing.user ? `${listing.user.firstName || ''} ${listing.user.lastName || ''} (${listing.user.username || listing.user.email || ''})` : 'Unknown Seller';
                const formattedDate = listing.createdAt ? new Date(listing.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : 'Unknown Date';
                const fallbackImage = listing.category === 'boarding'
                  ? 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop'
                  : 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=300&fit=crop';

                const rawImage = listing.logo || (listing.images && listing.images.length > 0 && listing.images[0]) || fallbackImage;

                const listingImage = getImageUrl(rawImage);
                const statusValue = listing.status || 'Pending';

                return (
                  <motion.div
                    key={listing._id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-8 flex flex-col xl:flex-row items-start xl:items-center gap-8 group hover:bg-slate-50/20 transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="w-44 h-32 rounded-xl overflow-hidden border border-slate-100 flex-shrink-0 relative">
                      <img src={listingImage} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

                      {/* Corner Tag */}
                      <span className={`absolute top-2 left-2 text-[9px] font-extrabold px-2 py-0.5 rounded-md text-white shadow-sm ${statusValue === 'Active' ? 'bg-[#5cb85c]' : statusValue === 'Pending' ? 'bg-[#f0ad4e]' : 'bg-[#d9534f]'}`}>
                        {statusValue}
                      </span>
                    </div>

                    {/* Content Info */}
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-[18px] font-bold text-slate-800">{listing.title}</h3>
                        <span className="text-xs text-slate-400 font-semibold bg-slate-50 px-2.5 py-0.5 rounded border border-slate-100">
                          By {sellerName}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {listing.category && (
                          <span className="bg-blue-50 text-blue-600 border border-blue-100 text-[11px] font-bold px-3 py-1 rounded-full capitalize">
                            {listing.category}
                          </span>
                        )}
                        {listing.type && (
                          <span className="bg-slate-50 text-slate-500 border border-slate-100 text-[11px] font-bold px-3 py-1 rounded-full capitalize">
                            {listing.type}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-slate-400 text-[13px] font-medium">
                        <MapPin size={14} className="text-slate-300" />
                        <span>{listing.friendlyAddress || listing.address || 'No Location Provided'}</span>
                      </div>

                      {/* Meta Stats Row */}
                      <div className="flex items-center gap-4 text-[11px] text-slate-400 font-semibold">
                        <span>Submitted: {formattedDate}</span>
                        {statusValue === 'Active' && (
                          <>
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                            <span className="text-[#3b82f6]">Views: {listing.views || 0}</span>
                          </>
                        )}
                      </div>

                      {/* Rejection Reason Block */}
                      {statusValue === 'Rejected' && listing.rejectionReason && (
                        <div className="mt-4 p-4 bg-red-50 border border-red-100/50 rounded-xl flex items-start gap-3">
                          <AlertTriangle className="text-red-500 flex-shrink-0 mt-0.5" size={16} />
                          <div>
                            <h4 className="text-xs font-bold text-red-800 uppercase tracking-wider">Rejection Reason:</h4>
                            <p className="text-[13px] text-red-600 mt-1 leading-relaxed italic">
                              "{listing.rejectionReason}"
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Controls */}
                    <div className="flex flex-wrap gap-2 xl:justify-end xl:w-72">
                      {statusValue === 'Pending' && (
                        <>
                          <button
                            onClick={() => setViewingListing(listing)}
                            className="flex items-center gap-2 bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/50 px-5 py-2.5 rounded-xl text-[12px] font-bold transition-all active:scale-95 cursor-pointer"
                          >
                            <Eye size={14} />
                            View Details
                          </button>
                          <button
                            onClick={() => handleApprove(listing._id)}
                            className="flex items-center gap-2 bg-[#5cb85c] text-white px-5 py-2.5 rounded-xl text-[12px] font-bold hover:bg-[#4ea24e] transition-all shadow-sm active:scale-95 cursor-pointer"
                          >
                            <Check size={14} />
                            Approve Active
                          </button>
                          <button
                            onClick={() => handleOpenRejectModal(listing._id)}
                            className="flex items-center gap-2 bg-[#d9534f] text-white px-5 py-2.5 rounded-xl text-[12px] font-bold hover:bg-[#c9302c] transition-all shadow-sm active:scale-95 cursor-pointer"
                          >
                            <X size={14} />
                            Reject Listing
                          </button>
                        </>
                      )}

                      {statusValue === 'Rejected' && (
                        <>
                          <button
                            onClick={() => setViewingListing(listing)}
                            className="flex items-center gap-2 bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/50 px-5 py-2.5 rounded-xl text-[12px] font-bold transition-all active:scale-95 cursor-pointer"
                          >
                            <Eye size={14} />
                            View Details
                          </button>
                          <button
                            onClick={() => handleRestore(listing._id)}
                            className="flex items-center gap-2 bg-slate-100 text-slate-600 px-5 py-2.5 rounded-xl text-[12px] font-bold hover:bg-slate-200 transition-all active:scale-95 cursor-pointer"
                          >
                            <Undo2 size={14} />
                            Restore to Pending
                          </button>
                          <button
                            onClick={() => handleDelete(listing._id)}
                            className="flex items-center gap-2 bg-red-50 text-red-600 px-5 py-2.5 rounded-xl text-[12px] font-bold hover:bg-red-100 transition-all cursor-pointer"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </>
                      )}

                      {statusValue === 'Active' && (
                        <>
                          <button
                            onClick={() => setViewingListing(listing)}
                            className="flex items-center gap-2 bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/50 px-5 py-2.5 rounded-xl text-[12px] font-bold transition-all active:scale-95 cursor-pointer"
                          >
                            <Eye size={14} />
                            View Details
                          </button>
                          <button
                            onClick={() => handleOpenRejectModal(listing._id)}
                            className="flex items-center gap-2 bg-amber-50 text-[#f0ad4e] border border-amber-100 px-5 py-2.5 rounded-xl text-[12px] font-bold hover:bg-amber-100 transition-all active:scale-95 cursor-pointer"
                          >
                            <X size={14} />
                            Reject / Revoke
                          </button>
                          <button
                            onClick={() => handleDelete(listing._id)}
                            className="flex items-center gap-2 bg-red-50 text-red-600 px-5 py-2.5 rounded-xl text-[12px] font-bold hover:bg-red-100 transition-all cursor-pointer"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="p-20 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">🗂️</span>
                </div>
                <h3 className="text-slate-800 font-bold text-sm">No Listings Found</h3>
                <p className="text-slate-400 text-xs mt-1">There are no listings matching this status category.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Statistics */}
        <div className="p-8 border-t border-slate-50 text-center bg-slate-50/50">
          <p className="text-slate-400 text-[13px] font-bold uppercase tracking-wider">
            Consolidated total: {filteredListings.length} {currentTab} {filteredListings.length === 1 ? 'listing' : 'listings'}
          </p>
        </div>
      </div>

      {/* Rejection Modal (Premium overlay matching user requirements) */}
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
                <h3 className="text-[16px] font-bold text-[#d9534f]">Confirm Listing Rejection</h3>
              </div>

              {/* Body */}
              <div className="p-8 space-y-5">
                <p className="text-[14px] text-slate-600 leading-relaxed">
                  Are you sure you want to reject this listing? You must provide a clear reason for the rejection below to notify the seller.
                </p>

                <div className="space-y-2">
                  <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Reason for Rejection *</label>
                  <textarea
                    placeholder="e.g. Unsafe pet environment, missing business license details, or substandard photos..."
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

      {/* Detailed Viewer Modal (Premium slide-over or full overlay) */}
      <AnimatePresence>
        {viewingListing && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-2xl w-full max-w-4xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="px-8 py-5 border-b border-slate-100 bg-[#111c1e] text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {viewingListing.logo ? (
                    <img src={getImageUrl(viewingListing.logo)} alt="Logo" className="w-10 h-10 rounded-full object-cover border-2 border-white/20" />
                  ) : (
                    <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=100&h=100&fit=crop" alt="Logo" className="w-10 h-10 rounded-full object-cover border-2 border-white/20" />
                  )}
                  <div>
                    <h3 className="text-[16px] font-bold flex items-center gap-2">
                      {viewingListing.title}
                      <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md text-white ${viewingListing.status === 'Active' ? 'bg-[#5cb85c]' : viewingListing.status === 'Pending' ? 'bg-[#f0ad4e]' : 'bg-[#d9534f]'}`}>
                        {viewingListing.status || 'Pending'}
                      </span>
                    </h3>
                    <p className="text-[11px] text-slate-300 mt-0.5">{viewingListing.tagline || 'No tagline provided'}</p>
                  </div>
                </div>
                <button
                  onClick={() => setViewingListing(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                {/* Basic Badges Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Category</p>
                    <p className="text-xs font-extrabold text-slate-700 capitalize mt-1">{viewingListing.category || 'N/A'}</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Type</p>
                    <p className="text-xs font-extrabold text-slate-700 capitalize mt-1">{viewingListing.type || 'N/A'}</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Package</p>
                    <p className="text-xs font-extrabold text-slate-700 capitalize mt-1">{viewingListing.package || 'N/A'}</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Price Range</p>
                    <p className="text-xs font-extrabold text-[#5cb85c] mt-1">
                      {viewingListing.minPrice ? `$${viewingListing.minPrice}` : 'N/A'} - {viewingListing.maxPrice ? `$${viewingListing.maxPrice}` : 'N/A'}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <h4 className="text-[12px] font-bold text-slate-800 uppercase tracking-wider border-l-4 border-[#111c1e] pl-2">Description</h4>
                  <p className="text-[13px] text-slate-600 leading-relaxed bg-slate-50 border border-slate-100 p-4 rounded-xl whitespace-pre-line">
                    {viewingListing.description || 'No description provided.'}
                  </p>
                </div>

                {/* Contact & Location Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Contact Widget Info */}
                  <div className="space-y-4">
                    <h4 className="text-[12px] font-bold text-slate-800 uppercase tracking-wider border-l-4 border-[#111c1e] pl-2">Contact Details</h4>
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-2 text-[12px]">
                      <p className="flex justify-between"><span className="text-slate-400">Phone:</span> <span className="font-semibold text-slate-700">{viewingListing.phone || 'N/A'}</span></p>
                      <p className="flex justify-between"><span className="text-slate-400">Email:</span> <span className="font-semibold text-slate-700">{viewingListing.email || 'N/A'}</span></p>
                      <p className="flex justify-between"><span className="text-slate-400">Website:</span> <span className="font-semibold text-slate-700">{viewingListing.website || 'N/A'}</span></p>
                      {viewingListing.socialLinks && (
                        <div className="border-t border-slate-200/50 pt-2 mt-2 space-y-1">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Social Channels</p>
                          {Object.entries(viewingListing.socialLinks as Record<string, any>).map(([channel, link]) => !!link && (
                            <p key={channel} className="flex justify-between capitalize"><span className="text-slate-400">{channel}:</span> <span className="font-semibold text-slate-700 max-w-[200px] truncate">{String(link)}</span></p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Location Info */}
                  <div className="space-y-4">
                    <h4 className="text-[12px] font-bold text-slate-800 uppercase tracking-wider border-l-4 border-[#111c1e] pl-2">Location & Map Coordinates</h4>
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-2 text-[12px]">
                      <p className="flex justify-between"><span className="text-slate-400">Address:</span> <span className="font-semibold text-slate-700">{viewingListing.address || 'N/A'}</span></p>
                      <p className="flex justify-between"><span className="text-slate-400">Friendly Address:</span> <span className="font-semibold text-slate-700">{viewingListing.friendlyAddress || 'N/A'}</span></p>
                      <p className="flex justify-between"><span className="text-slate-400">Region:</span> <span className="font-semibold text-slate-700">{viewingListing.region || 'N/A'}</span></p>
                      <p className="flex justify-between"><span className="text-slate-400">Coordinates:</span> <span className="font-semibold text-slate-700">{viewingListing.latitude ? `${viewingListing.latitude}, ${viewingListing.longitude}` : 'N/A'}</span></p>
                    </div>
                  </div>
                </div>

                {/* Services */}
                {viewingListing.services && viewingListing.services.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-[12px] font-bold text-slate-800 uppercase tracking-wider border-l-4 border-[#111c1e] pl-2">Services & Pricing</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {viewingListing.services.map((srv: any, idx: number) => (
                        <div key={idx} className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col justify-between">
                          <div>
                            <h5 className="text-[13px] font-bold text-slate-800">{srv.service}</h5>
                            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{srv.desc}</p>
                          </div>
                          <span className="text-xs font-extrabold text-[#5cb85c] mt-3 self-start bg-[#5cb85c]/10 px-2.5 py-0.5 rounded-full">
                            {srv.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Opening Hours */}
                {viewingListing.openingHours && viewingListing.openingHours.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-[12px] font-bold text-slate-800 uppercase tracking-wider border-l-4 border-[#111c1e] pl-2">Weekly Opening Hours</h4>
                    <div className="bg-slate-50 border border-slate-100 rounded-xl overflow-hidden">
                      <table className="w-full text-left text-[12px]">
                        <thead>
                          <tr className="bg-slate-100 text-slate-500 font-bold border-b border-slate-200">
                            <th className="px-6 py-3">Day</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Hours</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200/50">
                          {viewingListing.openingHours.map((hr: any, idx: number) => (
                            <tr key={idx} className="hover:bg-slate-100/50 transition-colors">
                              <td className="px-6 py-2.5 font-bold text-slate-700">{hr.day}</td>
                              <td className="px-6 py-2.5">
                                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${hr.isOpen ? 'bg-[#5cb85c]/10 text-[#5cb85c]' : 'bg-red-50 text-red-500 border border-red-100'}`}>
                                  {hr.isOpen ? 'Open' : 'Closed'}
                                </span>
                              </td>
                              <td className="px-6 py-2.5 text-slate-500">{hr.isOpen ? `${hr.openTime} - ${hr.closeTime}` : '—'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Image Gallery */}
                {((viewingListing.images && viewingListing.images.length > 0) || viewingListing.image) && (
                  <div className="space-y-4">
                    <h4 className="text-[12px] font-bold text-slate-800 uppercase tracking-wider border-l-4 border-[#111c1e] pl-2">Uploaded Gallery</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {viewingListing.images && viewingListing.images.length > 0 ? (
                        viewingListing.images.map((img: string, idx: number) => (
                          <div key={idx} className="h-28 rounded-xl overflow-hidden border border-slate-200 relative group">
                            <img src={getImageUrl(img)} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            <a href={getImageUrl(img)} target="_blank" rel="noreferrer" className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-[10px] font-bold">
                              🔍 Open Image
                            </a>
                          </div>
                        ))
                      ) : (
                        <div className="h-28 rounded-xl overflow-hidden border border-slate-200 relative group">
                          <img src={getImageUrl(viewingListing.image)} alt="Listing Image" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          <a href={getImageUrl(viewingListing.image)} target="_blank" rel="noreferrer" className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-[10px] font-bold">
                            🔍 Open Image
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Video Review */}
                {(() => {
                  const isValidVideo = (url: string) => {
                    if (!url || typeof url !== 'string') return false;
                    const trimmed = url.trim();
                    if (trimmed === '' || trimmed === 'undefined' || trimmed === 'null') return false;
                    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) return false;
                    if ((trimmed.includes('localhost:') || trimmed.includes('127.0.0.1')) && !trimmed.includes('/uploads/')) return false;
                    return true;
                  };

                  const hasVideoFile = isValidVideo(viewingListing.videoFile);
                  const hasVideoUrl = isValidVideo(viewingListing.videoUrl);

                  if (!hasVideoFile && !hasVideoUrl) return null;

                  return (
                    <div className="space-y-4">
                      <h4 className="text-[12px] font-bold text-slate-800 uppercase tracking-wider border-l-4 border-[#111c1e] pl-2">Uploaded Video Review</h4>
                      <div className="rounded-xl overflow-hidden border border-slate-100 bg-slate-900 aspect-video max-w-lg">
                        {hasVideoFile ? (
                          <video src={getImageUrl(viewingListing.videoFile)} controls className="w-full h-full object-contain" />
                        ) : (
                          <iframe
                            src={viewingListing.videoUrl}
                            title="Review Video"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Action Buttons Footer */}
              <div className="px-8 py-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-bold uppercase">Seller: {viewingListing.user ? `${viewingListing.user.firstName || ''} ${viewingListing.user.lastName || ''}` : 'Unknown'}</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setViewingListing(null)}
                    className="px-5 py-2.5 bg-white border border-slate-200 text-slate-500 hover:bg-slate-100 rounded-xl text-[12px] font-bold transition-all"
                  >
                    Close Viewer
                  </button>
                  {viewingListing.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => { handleApprove(viewingListing._id); setViewingListing(null); }}
                        className="flex items-center gap-2 bg-[#5cb85c] text-white px-5 py-2.5 rounded-xl text-[12px] font-bold hover:bg-[#4ea24e] transition-all shadow-sm active:scale-95 cursor-pointer"
                      >
                        <Check size={14} />
                        Approve Active
                      </button>
                      <button
                        onClick={() => { handleOpenRejectModal(viewingListing._id); setViewingListing(null); }}
                        className="flex items-center gap-2 bg-[#d9534f] text-white px-5 py-2.5 rounded-xl text-[12px] font-bold hover:bg-[#c9302c] transition-all shadow-sm active:scale-95 cursor-pointer"
                      >
                        <X size={14} />
                        Reject Listing
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminActiveListings;
