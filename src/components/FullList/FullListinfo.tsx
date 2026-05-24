import React, { useState, useEffect } from 'react';
import {
  ChevronDown, Heart, MapPin, CheckCircle2,
  Grid, List, Star, ChevronLeft, ChevronRight,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';


/* ── Slider thumb styles ─────────────────────────────────────────────────── */
const sliderCSS = `
  .fl-thumb::-webkit-slider-thumb{appearance:none;width:16px;height:16px;background:#111827;border-radius:50%;cursor:pointer;}
  .fl-thumb::-moz-range-thumb{width:16px;height:16px;background:#111827;border-radius:50%;cursor:pointer;border:none;}
`;

/* ── Helper functions for dynamic listings ───────────────────────────────── */
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

const getListingImages = (listing: any) => {
  const listImages: string[] = [];
  if (listing.logo) {
    listImages.push(getImageUrl(listing.logo));
  }
  if (listing.images && listing.images.length > 0) {
    listing.images.forEach((img: string) => {
      if (img) listImages.push(getImageUrl(img));
    });
  }
  if (listImages.length === 0) {
    listImages.push("https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&h=420&fit=crop");
  }
  return listImages;
};

const getListingPrice = (listing: any) => {
  if (listing.minPrice || listing.maxPrice) {
    return `$${listing.minPrice || 0} - $${listing.maxPrice || 0}`;
  }
  return 'Contact for Pricing';
};

const getListingLocation = (listing: any) => {
  return listing.friendlyAddress || listing.address || 'No Location Provided';
};

/* ── Image Carousel ──────────────────────────────────────────────────────── */
const Carousel: React.FC<{ images: string[]; alt: string; isLoggedIn: boolean }> = ({ images, alt, isLoggedIn }) => {
  const [cur, setCur] = useState(0);
  const go = (dir: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCur((c) => (c + dir + images.length) % images.length);
  };
  return (
    <div className="relative w-full h-full overflow-hidden group/car">
      {/* Track */}
      <div
        className={`flex h-full transition-all duration-500 ${!isLoggedIn ? 'blur-md grayscale' : ''}`}
        style={{ transform: `translateX(-${cur * 100}%)`, transition: 'transform 0.35s ease' }}
      >
        {images.map((src, i) => (
          <img
            key={i} src={src} alt={`${alt} ${i + 1}`}
            className="w-full h-full object-cover flex-shrink-0"
            style={{ minWidth: '100%' }}
          />
        ))}
      </div>

      {!isLoggedIn && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/10 backdrop-blur-[2px] transition-all duration-300">
          <div className="bg-white/90 px-4 py-2 rounded-full shadow-lg border border-white/50 transform -rotate-3 hover:rotate-0 transition-transform cursor-default">
            <span className="text-[11px] font-bold text-gray-900 tracking-wider uppercase">Login to view photos</span>
          </div>
        </div>
      )}

      {/* Prev arrow — visible on hover */}
      {images.length > 1 && (
        <button
          onClick={(e) => go(-1, e)}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/90 rounded-full shadow-md
                     flex items-center justify-center opacity-0 group-hover/car:opacity-100 transition-opacity z-10"
        >
          <ChevronLeft size={14} className="text-gray-800" />
        </button>
      )}
      {images.length > 1 && (
        <button
          onClick={(e) => go(1, e)}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/90 rounded-full shadow-md
                     flex items-center justify-center opacity-0 group-hover/car:opacity-100 transition-opacity z-10"
        >
          <ChevronRight size={14} className="text-gray-800" />
        </button>
      )}

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
          {images.map((_, i) => (
            <span
              key={i}
              className={`block w-1.5 h-1.5 rounded-full transition-colors ${i === cur ? 'bg-white' : 'bg-white/50'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/* ── Main Component ──────────────────────────────────────────────────────── */
const FullListinfo = () => {
  const [selectedSort, setSelectedSort] = useState('Featured');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedDist, setSelectedDist] = useState('Distance Radius');
  const [isDistOpen, setIsDistOpen] = useState(false);
  const [radius, setRadius] = useState(5);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const { isLoggedIn } = useAuth();

  const locationState = useLocation();

  // Extract query params
  const searchParams = new URLSearchParams(locationState.search);
  const qKeyword = searchParams.get('keyword') || '';
  const qLocation = searchParams.get('location') || '';
  const qCategory = searchParams.get('category') || '';

  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userCoords, setUserCoords] = useState<[number, number] | null>(null);

  useEffect(() => {
    // Attempt to fetch user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserCoords([pos.coords.latitude, pos.coords.longitude]),
        (err) => console.log('Geolocation permission denied or error', err)
      );
    }
  }, []);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';
        const res = await fetch(`${apiUrl}/listings`);
        const data = await res.json();
        if (data.success) {
          setListings(data.data);
        }
      } catch (err) {
        console.error('Error fetching active listings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  const filteredListings = listings.filter((listing) => {
    // 1. Keyword Filter
    if (qKeyword) {
      const kw = qKeyword.toLowerCase();
      const titleMatch = listing.title?.toLowerCase().includes(kw);
      const descMatch = listing.description?.toLowerCase().includes(kw);
      const tagMatch = listing.tagline?.toLowerCase().includes(kw);
      const keywordsMatch = listing.keywords?.toLowerCase().includes(kw);
      const typeMatch = listing.type?.toLowerCase().includes(kw);
      const categoryMatch = listing.category?.toLowerCase().includes(kw);
      const addressMatch = listing.address?.toLowerCase().includes(kw);
      const friendlyMatch = listing.friendlyAddress?.toLowerCase().includes(kw);
      const regionMatch = listing.region?.toLowerCase().includes(kw);
      const cityMatch = listing.city?.toLowerCase().includes(kw);

      if (
        !titleMatch &&
        !descMatch &&
        !tagMatch &&
        !keywordsMatch &&
        !typeMatch &&
        !categoryMatch &&
        !addressMatch &&
        !friendlyMatch &&
        !regionMatch &&
        !cityMatch
      ) {
        return false;
      }
    }

    // 2. Location Filter
    if (qLocation) {
      const loc = qLocation.toLowerCase();
      const addressMatch = listing.address?.toLowerCase().includes(loc);
      const friendlyMatch = listing.friendlyAddress?.toLowerCase().includes(loc);
      const regionMatch = listing.region?.toLowerCase().includes(loc);
      const cityMatch = listing.city?.toLowerCase().includes(loc);
      if (!addressMatch && !friendlyMatch && !regionMatch && !cityMatch) return false;
    }

    // 3. Category Filter
    if (qCategory) {
      const cat = qCategory.toLowerCase().replace(/[\s-_]+/g, '');
      const listCat = listing.category?.toLowerCase().replace(/[\s-_]+/g, '');
      if (listCat !== cat) return false;
    }

    // 4. Distance Radius Filter
    if (selectedDist !== 'Distance Radius' && userCoords && listing.latitude && listing.longitude) {
      const appliedRadius = parseInt(selectedDist);
      if (!isNaN(appliedRadius)) {
        // Haversine formula for distance in miles
        const R = 3958.8;
        const lat1 = userCoords[0];
        const lon1 = userCoords[1];
        const lat2 = listing.latitude;
        const lon2 = listing.longitude;

        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(lat1 * (Math.PI / 180)) *
          Math.cos(lat2 * (Math.PI / 180)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const dist = R * c;

        if (dist > appliedRadius) return false;
      }
    }

    return true;
  });

  // Apply sorting
  const finalListings = [...filteredListings].sort((a, b) => {
    if (selectedSort === 'Featured') {
      const aFeatured = a.package === 'premium' || a.package === 'yearly' ? 1 : 0;
      const bFeatured = b.package === 'premium' || b.package === 'yearly' ? 1 : 0;
      if (aFeatured !== bFeatured) return bFeatured - aFeatured;
    }
    if (selectedSort === 'Newest Listings') {
      return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
    }
    if (selectedSort === 'Highest Rated') {
      return (b.rating || 0) - (a.rating || 0);
    }
    if (selectedSort === 'Most Reviewed') {
      const aReviews = a.reviews?.length || 0;
      const bReviews = b.reviews?.length || 0;
      return bReviews - aReviews;
    }
    return 0; // Default Order
  });

  /* inject slider CSS */
  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = sliderCSS;
    document.head.appendChild(el);
    return () => { document.head.removeChild(el); };
  }, []);

  const toggleLike = (id: string) =>
    setLiked((p) => ({ ...p, [id]: !p[id] }));

  const closeAll = () => { setIsSortOpen(false); setIsDistOpen(false); setIsFiltersOpen(false); };

  return (
    <div
      className="w-full max-w-7xl mx-auto px-6 pb-16 pt-6 font-sans"
      onClick={closeAll}
    >
      {/* ── Filter bar ───────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between py-4 mb-4 border-b border-gray-100">

        {/* View toggles */}
        <div className="flex items-center gap-1">
          <button
            id="fl-grid-btn"
            onClick={(e) => { e.stopPropagation(); setViewMode('grid'); }}
            className={`p-2 rounded border transition-colors
              ${viewMode === 'grid' ? 'bg-gray-100 border-gray-300' : 'border-transparent hover:bg-gray-50'}`}
          >
            <Grid size={17} className="text-gray-700" />
          </button>
          <button
            id="fl-list-btn"
            onClick={(e) => { e.stopPropagation(); setViewMode('list'); }}
            className={`p-2 rounded border transition-colors
              ${viewMode === 'list' ? 'bg-gray-100 border-gray-300' : 'border-transparent hover:bg-gray-50'}`}
          >
            <List size={17} className="text-gray-700" />
          </button>
        </div>

        {/* Sort / Distance / Filters */}
        <div className="flex items-center gap-6" onClick={(e) => e.stopPropagation()}>

          {/* Highest Rated */}
          <div className="relative">
            <button
              id="fl-sort-btn"
              onClick={() => { setIsSortOpen(!isSortOpen); setIsDistOpen(false); setIsFiltersOpen(false); }}
              className="flex items-center gap-0.5 text-[13px] font-semibold text-[#131B25] hover:text-black transition-colors"
            >
              {selectedSort}
              <ChevronDown size={13} className={`mt-px transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
            </button>
            {isSortOpen && (
              <div className="absolute right-0 z-50 mt-2 w-48 bg-white rounded-lg shadow-2xl border border-gray-100 py-1">
                {['Featured', 'Highest Rated', 'Most Reviewed', 'Newest Listings', 'Default Order'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { setSelectedSort(opt); setIsSortOpen(false); }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Distance Radius */}
          <div className="relative">
            <button
              id="fl-dist-btn"
              onClick={() => { setIsDistOpen(!isDistOpen); setIsSortOpen(false); setIsFiltersOpen(false); }}
              className="flex items-center gap-0.5 text-[13px] font-semibold text-[#131B25] hover:text-black transition-colors"
            >
              {selectedDist}
              <ChevronDown size={13} className={`mt-px transition-transform ${isDistOpen ? 'rotate-180' : ''}`} />
            </button>
            {isDistOpen && (
              <div className="absolute right-0 z-50 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-xs font-bold text-gray-700">Radius</span>
                  <span className="text-xs font-bold text-blue-600">{radius} miles</span>
                </div>
                <input
                  type="range" min={1} max={50} value={radius}
                  onChange={(e) => setRadius(+e.target.value)}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer fl-thumb mb-4"
                />
                <button
                  onClick={() => { setSelectedDist(`${radius} miles`); setIsDistOpen(false); }}
                  className="w-full bg-gray-900 text-white text-xs py-2 rounded-lg font-bold hover:bg-black"
                >
                  Apply Radius
                </button>
              </div>
            )}
          </div>

          {/* More Filters */}
          <div className="relative">
            <button
              id="fl-filters-btn"
              onClick={() => { setIsFiltersOpen(!isFiltersOpen); setIsSortOpen(false); setIsDistOpen(false); }}
              className="flex items-center gap-0.5 text-[13px] font-semibold text-[#131B25] hover:text-black transition-colors"
            >
              More Filters <ChevronDown size={13} className={`mt-px transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`} />
            </button>
            {isFiltersOpen && (
              <div className="absolute right-0 z-50 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 p-4">
                <p className="text-xs text-gray-500 mb-2">Additional filters (Coming soon)</p>
                <label className="flex items-center gap-2 mb-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-gray-900 border-gray-300 focus:ring-gray-900" />
                  <span className="text-sm font-medium text-gray-700">Open Now</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-gray-900 border-gray-300 focus:ring-gray-900" />
                  <span className="text-sm font-medium text-gray-700">Has Verified Badge</span>
                </label>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Cards grid ───────────────────────────────────────────────────── */}
      <div
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'
            : 'flex flex-col gap-4'
        }
      >
        {loading ? (
          <div className="w-full py-20 flex flex-col items-center justify-center text-slate-400">
            <div className="w-12 h-12 border-4 border-slate-200 border-t-[#111c1e] rounded-full animate-spin mb-4" />
            <p className="text-sm font-semibold">Loading active listings...</p>
          </div>
        ) : finalListings.length > 0 ? (
          finalListings.map((listing) => {
            const listImages = getListingImages(listing);
            const priceText = getListingPrice(listing);
            const locationText = getListingLocation(listing);
            const hasOpening = listing.openingHours && listing.openingHours.some((h: any) => h.isOpen);

            return (
              <Link
                key={listing._id}
                to={`/listings/${listing._id}`}
                className={`
                  group/card bg-white rounded-lg border border-gray-200
                  shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex
                  ${viewMode === 'list' ? 'flex-col sm:flex-row sm:h-48' : 'flex-col'}
                `}
              >
                {/* ── Image ── */}
                <div className={`relative flex-shrink-0 ${viewMode === 'list' ? 'w-full h-[200px] sm:w-64 sm:h-full' : 'h-[200px] w-full'}`}>
                  <Carousel images={listImages} alt={listing.title} isLoggedIn={isLoggedIn} />

                  {/* Category pill */}
                  {listing.category && (
                    <span className="absolute top-3 left-3 z-10 bg-gray-900 text-white text-[10px] font-bold px-3 py-[5px] rounded-full tracking-wide leading-none capitalize">
                      {listing.category}
                    </span>
                  )}

                  {/* Now Open pill */}
                  {hasOpening && (
                    <span className="absolute bottom-3 left-3 z-10 bg-green-500 text-white text-[10px] font-bold px-3 py-[5px] rounded-full leading-none">
                      Now Open
                    </span>
                  )}

                  {/* Heart */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleLike(listing._id);
                    }}
                    className="absolute top-3 right-3 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                  >
                    <Heart
                      size={15}
                      className={liked[listing._id] ? 'text-red-500 fill-red-500' : 'text-gray-700 fill-transparent'}
                    />
                  </button>
                </div>

                {/* ── Info ── */}
                <div className="p-4 flex-1 flex flex-col min-w-0">
                  {/* Featured */}
                  {(listing.package === 'premium' || listing.package === 'yearly') && (
                    <div className="flex items-center gap-1 mb-1.5">
                      <Star size={11} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-[11px] font-bold text-yellow-600 uppercase tracking-wide">Featured</span>
                    </div>
                  )}

                  {/* Title + verified */}
                  <div className="flex items-start gap-1.5 mb-1">
                    <h3 className="text-[15px] font-bold text-gray-900 leading-snug line-clamp-2 flex-1">
                      {listing.title}
                    </h3>
                    <CheckCircle2
                      size={16}
                      className="text-green-500 fill-green-500 flex-shrink-0 mt-0.5"
                      strokeWidth={2.5}
                    />
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-1 text-gray-400">
                    <MapPin size={12} className="flex-shrink-0 text-pink-400" />
                    <span className="text-[12px] font-medium text-gray-400 truncate">{locationText}</span>
                  </div>

                  {/* Spacer */}
                  <div className="flex-1" />

                  {/* Price */}
                  <div className="mt-3 pt-3 border-t border-gray-100 flex justify-end min-h-[26px]">
                    <span className="text-[12px] font-bold text-gray-700">{priceText}</span>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="w-full py-20 text-center border border-dashed border-gray-200 rounded-xl">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              📭
            </div>
            <h3 className="text-gray-900 font-bold text-sm">No Listings Found</h3>
            <p className="text-gray-400 text-xs mt-1">There are no approved active listings matching your query.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FullListinfo;
