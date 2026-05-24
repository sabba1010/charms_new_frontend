import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { MapPin, ChevronDown, Search } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Helper component to dynamic re-center map on coordinates change
const ChangeMapCenter = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 12);
  }, [center, map]);
  return null;
};

// Custom white circle marker to match the image
const customMarkerIcon = new L.DivIcon({
  className: 'custom-div-icon',
  html: `<div style="background-color:white;width:24px;height:24px;border-radius:50%;border:2px solid #333;box-shadow:0 2px 4px rgba(0,0,0,0.3);"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

// Custom black circle marker for the active/center listing
const blackMarkerIcon = new L.DivIcon({
  className: 'custom-div-icon-black',
  html: `<div style="background-color:#111d21;width:24px;height:24px;border-radius:50%;border:2px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.3);"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

// Custom user pulsing marker
const userMarkerIcon = new L.DivIcon({
  className: 'custom-div-icon-user',
  html: `<div style="background-color:#111d21;width:24px;height:24px;border-radius:50%;border:3px solid white;box-shadow:0 0 0 4px rgba(17,29,33,0.3);position:relative;">
    <div style="position:absolute;top:-3px;left:-3px;width:24px;height:24px;border-radius:50%;border:2px solid #111d21;animation:pulse-user 2s infinite;"></div>
  </div>
  <style>
    @keyframes pulse-user {
      0% { transform: scale(0.95); opacity: 1; }
      70% { transform: scale(1.6); opacity: 0; }
      100% { transform: scale(0.95); opacity: 0; }
    }
  </style>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const CATEGORIES = [
  'Pet Sitting',
  'Dog Walking',
  'Pet Boarding',
  'Pet Day Care',
  'Holiday Home Sitting',
  'Security Checks',
  'Drop-In Visits',
  'Pet Taxi'
];

const FullListbanner = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const [locInput, setLocInput] = useState(searchParams.get('location') || '');
  const [selectedCat, setSelectedCat] = useState(searchParams.get('category') || 'All Categories');

  const [catOpen, setCatOpen] = useState(false);
  const [catSearch, setCatSearch] = useState('');
  const catRef = useRef<HTMLDivElement>(null);
  const keywordRef = useRef<HTMLDivElement>(null);

  // Map instance state to control zoom from custom buttons
  const [map, setMap] = useState<L.Map | null>(null);

  const [mapCenter, setMapCenter] = useState<[number, number]>([40.7306, -73.7]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  // Geolocation trigger on mount
  useEffect(() => {
    const fallbackIPLocation = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        if (data.latitude && data.longitude) {
          const pos: [number, number] = [data.latitude, data.longitude];
          setMapCenter(pos);
          setUserLocation(pos);
          if (map) {
            map.setView(pos, 12);
          }
        }
      } catch (err) {
        console.error('IP Geolocation fallback failed:', err);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const pos: [number, number] = [latitude, longitude];
          setMapCenter(pos);
          setUserLocation(pos);
          if (map) {
            map.setView(pos, 12);
          }
        },
        (error) => {
          console.warn('HTML5 Geolocation denied/failed, falling back to IP Geolocation:', error);
          fallbackIPLocation();
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      fallbackIPLocation();
    }
  }, [map]);

  const [dbListings, setDbListings] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';
        const res = await fetch(`${apiUrl}/listings`);
        const data = await res.json();
        if (data.success) {
          setDbListings(data.data);
        }
      } catch (err) {
        console.error('Error fetching listings for suggestions:', err);
      }
    };
    fetchListings();
  }, []);

  const getSuggestions = () => {
    if (!keyword.trim()) return [];
    const searchVal = keyword.toLowerCase();
    const suggestionsSet = new Set<string>();

    dbListings.forEach((listing) => {
      if (listing.title && listing.title.toLowerCase().includes(searchVal)) {
        suggestionsSet.add(listing.title);
      }
      if (listing.category && listing.category.toLowerCase().includes(searchVal)) {
        suggestionsSet.add(listing.category.charAt(0).toUpperCase() + listing.category.slice(1).replace('-', ' '));
      }
      if (listing.type && listing.type.toLowerCase().includes(searchVal)) {
        suggestionsSet.add(listing.type.charAt(0).toUpperCase() + listing.type.slice(1));
      }
      if (listing.keywords) {
        const kwList = listing.keywords.split(/[,;\s]+/).map((k: string) => k.trim());
        kwList.forEach((kw: string) => {
          if (kw && kw.toLowerCase().includes(searchVal)) {
            suggestionsSet.add(kw.charAt(0).toUpperCase() + kw.slice(1));
          }
        });
      }
    });

    return Array.from(suggestionsSet).slice(0, 6);
  };

  const suggestions = getSuggestions();

  // Sync state if URL changes externally and update map if location is provided
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const locParam = params.get('location') || '';
    setKeyword(params.get('keyword') || '');
    setLocInput(locParam);
    setSelectedCat(params.get('category') || 'All Categories');

    if (locParam && locParam.trim() !== '') {
      const fetchCoords = async () => {
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locParam)}`);
          const data = await res.json();
          if (data && data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);
            setMapCenter([lat, lon]);
            if (map) {
              map.flyTo([lat, lon], 12, { duration: 1.5 });
            }
          }
        } catch (err) {
          console.error('Error fetching search location coordinates:', err);
        }
      };
      fetchCoords();
    }
  }, [location.search, map]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (catRef.current && !catRef.current.contains(e.target as Node)) {
        setCatOpen(false);
      }
      if (keywordRef.current && !keywordRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = CATEGORIES.filter((c) =>
    c.toLowerCase().includes(catSearch.toLowerCase())
  );

  const selectCategory = (cat: string) => {
    setSelectedCat(cat);
    setCatOpen(false);
    setCatSearch('');
  };

  const handleSearchSubmit = () => {
    const params = new URLSearchParams();
    if (keyword.trim()) params.append('keyword', keyword.trim());
    if (locInput.trim()) params.append('location', locInput.trim());
    if (selectedCat !== 'All Categories') params.append('category', selectedCat);
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <section className="w-full flex flex-col">

      {/* ── Map area ─────────────────────────────────────────────── */}
      <div className="relative w-full h-[45vh] md:h-[600px] border-b border-gray-200 z-0">
        <MapContainer
          center={mapCenter}
          zoom={10}
          scrollWheelZoom={false}
          dragging={true}
          touchZoom={true}
          doubleClickZoom={true}
          className="h-full w-full"
          zoomControl={false}
          ref={setMap} // Attach map instance to state
        >
          <ChangeMapCenter center={mapCenter} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {dbListings.map((listing) => {
            if (!listing.latitude || !listing.longitude) return null;
            return (
              <Marker
                key={listing._id}
                position={[listing.latitude, listing.longitude]}
                icon={customMarkerIcon}
              >
                <Popup>
                  <div className="text-center font-sans">
                    <h3 className="font-bold text-gray-800 m-0">{listing.title}</h3>
                    {listing.category && <p className="text-xs text-gray-500 mt-1 mb-2 capitalize">{listing.category.replace('-', ' ')}</p>}
                    <button
                      onClick={() => navigate(`/listings/${listing._id}`)}
                      className="text-xs font-semibold text-[#111d21] underline"
                    >
                      View Details
                    </button>
                  </div>
                </Popup>
              </Marker>
            );
          })}
          {userLocation && (
            <Marker position={userLocation} icon={userMarkerIcon}>
              <Popup>You are here!</Popup>
            </Marker>
          )}
        </MapContainer>

        {/* ── Top-left button ────────────────────────────────────────────── */}
        <div className="absolute top-10 left-6 z-40">
          <button className="bg-white px-4 py-2 rounded-[20px] shadow-md text-sm font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors border border-gray-200">
            <span>Show next 4 listings</span>
            <span className="text-base">→</span>
          </button>
        </div>

        {/* ── Custom zoom controls ───────────────────────────────────────── */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-40 flex flex-col">
          <button
            onClick={() => map?.zoomIn()}
            className="bg-white w-8 h-8 flex items-center justify-center rounded-t-md border border-gray-300 shadow-sm font-bold text-gray-600 hover:bg-gray-50 text-lg leading-none transition-colors"
          >
            +
          </button>
          <button
            onClick={() => map?.zoomOut()}
            className="bg-white w-8 h-8 flex items-center justify-center rounded-b-md border border-t-0 border-gray-300 shadow-sm font-bold text-gray-600 hover:bg-gray-50 text-lg leading-none transition-colors"
          >
            −
          </button>
        </div>
      </div>

      {/* ── Search bar ─────────────────────────────────────────── */}
      <div className="w-full px-4 md:px-6 py-4 md:py-0 md:-mt-10 relative z-40">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl md:rounded-full shadow-2xl border border-gray-100 flex flex-col md:flex-row items-stretch md:items-center overflow-visible">

          <div className="flex-1 flex flex-col relative px-4 md:px-5 border-b md:border-b-0 md:border-r border-gray-100 min-w-0" ref={keywordRef}>
            <div className="flex items-center w-full">
              <input
                type="text"
                placeholder="Type..."
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                className="w-full py-2.5 md:py-4 outline-none text-gray-700 placeholder:text-gray-400 text-[13px] md:text-sm font-medium bg-transparent"
              />
            </div>
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute bottom-full mb-2 left-0 right-0 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 py-1 max-h-60 overflow-y-auto">
                {suggestions.map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setKeyword(sug);
                      setShowSuggestions(false);
                    }}
                    className="w-full text-left px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 border-b border-gray-50 last:border-b-0"
                  >
                    <span className="text-gray-400 text-xs">🔍</span>
                    <span className="font-medium text-gray-800">{sug}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Location */}
          <div className="flex-1 flex items-center px-4 md:px-5 border-b md:border-b-0 md:border-r border-gray-100 min-w-0">
            <input
              type="text"
              placeholder="Location"
              value={locInput}
              onChange={(e) => setLocInput(e.target.value)}
              className="w-full py-2.5 md:py-4 outline-none text-gray-700 placeholder:text-gray-400 text-[13px] md:text-sm font-medium bg-transparent"
            />
            <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 ml-2" />
          </div>

          {/* All Categories — with dropdown */}
          <div className="relative flex-1 min-w-0" ref={catRef}>
            <button
              id="fl-category-btn"
              onClick={() => setCatOpen(!catOpen)}
              className="w-full flex items-center justify-between px-4 md:px-5 py-2.5 md:py-4 text-[13px] md:text-sm text-gray-500 hover:text-gray-700 transition-colors font-medium md:font-normal"
            >
              <span className={selectedCat !== 'All Categories' ? 'text-gray-800 font-medium' : ''}>
                {selectedCat}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 flex-shrink-0 ml-2 transition-transform duration-200 ${catOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Dropdown panel */}
            {catOpen && (
              <div className="absolute bottom-full mb-2 left-0 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                {/* Search input */}
                <div className="p-2 border-b border-gray-100">
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search"
                    value={catSearch}
                    onChange={(e) => setCatSearch(e.target.value)}
                    className="w-full px-3 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg outline-none placeholder:text-gray-400 border border-gray-200 focus:border-gray-300 transition-colors"
                  />
                </div>

                {/* Category list */}
                <div className="py-1 max-h-60 overflow-y-auto">
                  {/* All Categories option */}
                  <button
                    onClick={() => selectCategory('All Categories')}
                    className={`block w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-gray-50
                      ${selectedCat === 'All Categories' ? 'text-gray-900 font-semibold' : 'text-gray-700'}`}
                  >
                    All Categories
                  </button>

                  {filtered.length > 0 ? (
                    filtered.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => selectCategory(cat)}
                        className={`block w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-gray-50
                          ${selectedCat === cat ? 'text-gray-900 font-semibold' : 'text-gray-700'}`}
                      >
                        {cat}
                      </button>
                    ))
                  ) : (
                    <p className="px-4 py-3 text-sm text-gray-400">No categories found</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Search button */}
          <div className="p-2 md:p-0 flex shrink-0">
            <button
              onClick={handleSearchSubmit}
              className="w-full md:w-auto bg-[#111d21] text-white px-8 py-2.5 md:py-4 rounded-xl md:rounded-full font-bold hover:bg-[#1a2e35] transition-all flex-shrink-0 text-[13px] md:text-sm active:scale-95 flex items-center justify-center"
            >
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>

    </section>
  );
};

export default FullListbanner;