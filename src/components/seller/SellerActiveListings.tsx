import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import {
  Search, ChevronDown, MapPin,
  Calendar, Edit3, RefreshCw, Trash2
} from 'lucide-react';

const SellerActiveListings = () => {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchListings = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setListings([]);
        setLoading(false);
        return;
      }
      const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';
      const res = await fetch(`${apiUrl}/listings/my-listings`, {
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
              text: 'Listing has been deleted successfully.',
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

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-12 text-center text-slate-500 font-medium">
        <div className="animate-pulse flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-4 border-[#111c1e] border-t-transparent animate-spin"></div>
          <span>Loading active listings...</span>
        </div>
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-12 text-center text-slate-500 font-medium">
        <p className="text-slate-600 mb-2">No active listings found in your account.</p>
        <p className="text-xs text-slate-400">Click "Add Listing" on the sidebar to create your first pet care service listing!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Header with Search & Filter */}
      <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row items-center justify-between gap-4">
        <h2 className="text-[16px] font-bold text-slate-900">Active Listings</h2>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <input
              type="text"
              placeholder="Search listing"
              className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 text-[13px] focus:outline-none focus:border-slate-400 transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-4 py-2 text-[13px] text-slate-500 hover:bg-slate-50 transition-colors whitespace-nowrap">
            <span>All Categories</span>
            <ChevronDown size={14} />
          </button>
          <button className="bg-slate-100 p-2.5 rounded-lg text-slate-500 hover:bg-slate-200 transition-colors">
            <Search size={16} />
          </button>
        </div>
      </div>

      {/* Listings List */}
      <div className="divide-y divide-slate-50">
        {listings.map((listing) => {
          const mainTag = listing.category ? (listing.category.charAt(0).toUpperCase() + listing.category.slice(1)) : 'Pet Care';
          const defaultImage = "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=300&fit=crop"; // Premium dog image
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

          const rawImage = listing.logo || (listing.images && listing.images.length > 0 && listing.images[0]) || defaultImage;

          const listingImage = getImageUrl(rawImage);
          return (
            <div key={listing._id} className="p-8 flex flex-col xl:flex-row items-start xl:items-center gap-8 group hover:bg-slate-50/30 transition-colors">
              {/* Image */}
              <div className="w-40 h-28 rounded-lg overflow-hidden border border-slate-100 flex-shrink-0">
                <img src={listingImage} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>

              {/* Content */}
              <div className="flex-1 space-y-3">
                <h3 className="text-[18px] font-medium text-slate-900">{listing.title}</h3>

                <div className="flex flex-wrap gap-2">
                  <span className="bg-[#111c1e]/5 text-[#111c1e] text-[11px] font-medium px-3 py-1 rounded-full">
                    {mainTag}
                  </span>
                  {listing.type && (
                    <span className="bg-slate-100 text-slate-500 text-[11px] font-medium px-3 py-1 rounded-full capitalize">
                      {listing.type}
                    </span>
                  )}
                  {listing.package && (
                    <span className="bg-slate-100 text-slate-400 text-[11px] font-medium px-3 py-1 rounded-full capitalize">
                      {listing.package} Package
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-slate-400 text-[13px]">
                  <MapPin size={14} />
                  <span>{listing.address || listing.friendlyAddress || listing.region || 'No location set'}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="bg-slate-50 border border-slate-100 text-slate-400 text-[11px] font-medium px-3 py-1 rounded-full">
                    Price: {listing.minPrice ? `$${listing.minPrice}` : 'N/A'} - {listing.maxPrice ? `$${listing.maxPrice}` : 'N/A'}
                  </span>
                  <span className="bg-slate-50 border border-slate-100 text-slate-400 text-[11px] font-medium px-3 py-1 rounded-full">
                    Services: {listing.services?.length || 0} Listed
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 xl:justify-end">
                <button className="flex items-center gap-2 bg-slate-100 text-slate-500 px-4 py-2 rounded-lg text-[12px] font-bold hover:bg-slate-200 transition-colors">
                  <Calendar size={14} />
                  iCal
                </button>
                <button className="flex items-center gap-2 bg-slate-100 text-slate-500 px-4 py-2 rounded-lg text-[12px] font-bold hover:bg-slate-200 transition-colors">
                  <Edit3 size={14} />
                  Edit
                </button>
                <button className="flex items-center gap-2 bg-slate-100 text-slate-500 px-4 py-2 rounded-lg text-[12px] font-bold hover:bg-slate-200 transition-colors">
                  <RefreshCw size={14} />
                  Change Package
                </button>
                <button
                  onClick={() => handleDelete(listing._id)}
                  className="flex items-center gap-2 bg-slate-100 text-slate-500 px-4 py-2 rounded-lg text-[12px] font-bold hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="p-8 border-t border-slate-50 text-center">
        <p className="text-slate-400 text-[14px] font-medium">
          Showing {listings.length} of {listings.length} listings
        </p>
      </div>
    </div>
  );
};

export default SellerActiveListings;
