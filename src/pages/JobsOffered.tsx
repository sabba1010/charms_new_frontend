import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Calendar, Clock, DollarSign, ChevronRight, Filter, Star, Loader2, Briefcase, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import bannerImg from '../assets/Banner of Jobs offered.png';

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

interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  petType: string;
  serviceType?: string;
  petImages?: string[];
  budget: string;
  createdAt: string;
  owner?: {
    firstName: string;
    lastName: string;
    avatar?: string;
    isVerified?: boolean;
  };
}

const JobsOffered = () => {
  const [locInput, setLocInput] = useState('');
  const [selectedCat, setSelectedCat] = useState('All Categories');
  
  const [catOpenMobile, setCatOpenMobile] = useState(false);
  const [catOpenDesktop, setCatOpenDesktop] = useState(false);
  const [catSearch, setCatSearch] = useState('');
  const catRefMobile = useRef<HTMLDivElement>(null);
  const catRefDesktop = useRef<HTMLDivElement>(null);

  const filteredCategories = CATEGORIES.filter((c) =>
    c.toLowerCase().includes(catSearch.toLowerCase())
  );

  const selectCategory = (cat: string) => {
    setSelectedCat(cat);
    setCatOpenMobile(false);
    setCatOpenDesktop(false);
    setCatSearch('');
  };

  const { isLoggedIn } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${apiUrl}/jobs/public`);
        const data = await res.json();
        if (data.success) {
          setJobs(data.data);
        }
      } catch (error) {
        console.error('Error fetching public jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (catRefMobile.current && !catRefMobile.current.contains(e.target as Node)) {
        setCatOpenMobile(false);
      }
      if (catRefDesktop.current && !catRefDesktop.current.contains(e.target as Node)) {
        setCatOpenDesktop(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filteredJobs = jobs.filter(job => {
    const locMatch = locInput ? job.location.toLowerCase().includes(locInput.toLowerCase()) : true;
    
    let catMatchActual = true;
    if (selectedCat !== 'All Categories') {
      const catVal = selectedCat.toLowerCase().replace(/ /g, '');
      const petType = (job.petType || '').toLowerCase().replace(/ /g, '');
      const serviceType = (job.serviceType || '').toLowerCase().replace(/ /g, '');
      const title = (job.title || '').toLowerCase().replace(/ /g, '');
      if (!petType.includes(catVal) && !serviceType.includes(catVal) && !title.includes(catVal) && !catVal.includes(petType) && !title.includes(selectedCat.toLowerCase())) {
         catMatchActual = false;
      }
    }

    return locMatch && catMatchActual;
  });

  const getDaysAgo = (dateStr: string) => {
    const diff = new Date().getTime() - new Date(dateStr).getTime();
    const days = Math.floor(diff / (1000 * 3600 * 24));
    return days <= 0 ? 'Today' : `${days} days ago`;
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-20 font-sans">
      {/* Banner Section */}
      <section className="relative h-auto md:h-[800px] min-h-[100vh] md:min-h-[800px] w-full flex flex-col items-center justify-center font-sans pt-24 pb-12 md:pt-30 md:pb-0">
        <div className="absolute inset-0 z-0">
          <img
            src={bannerImg}
            alt="Jobs Offered"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>
        <div className="relative z-10 text-center px-6 w-full max-w-6xl pt-4 md:pt-16 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-4xl"
          >
            <span className="text-white text-sm md:text-base font-semibold mb-3 block tracking-tight uppercase">
              Jobs Offered
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-[1.1] font-serif">
              Discover opportunities
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto font-normal leading-relaxed">
              Find and apply to pet, house, and security service jobs from our trusted owners.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-4xl mt-10 md:mt-12 text-left"
          >
            {/* ── MOBILE: Styled card layout ── */}
            <div className="flex flex-col md:hidden gap-2 bg-[#122E29] p-3 rounded-xl shadow-2xl relative z-[50]">
              {/* Location */}
              <div className="bg-white rounded px-4 py-3 w-full flex items-center justify-between">
                <input
                  type="text"
                  placeholder="Location"
                  value={locInput}
                  onChange={(e) => setLocInput(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-slate-700 placeholder:text-slate-500 text-[15px] font-medium"
                />
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
              </div>
              {/* Category */}
              <div className="bg-white rounded w-full relative" ref={catRefMobile}>
                <button
                  onClick={() => setCatOpenMobile(!catOpenMobile)}
                  className="w-full flex items-center justify-between px-4 py-3 text-[15px] text-slate-500 hover:text-slate-700 transition-colors"
                >
                  <span className={selectedCat !== 'All Categories' ? 'text-slate-700 font-medium' : ''}>
                    {selectedCat}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 flex-shrink-0 ml-2 transition-transform duration-200 ${catOpenMobile ? 'rotate-180' : ''}`}
                  />
                </button>

                {catOpenMobile && (
                  <div className="absolute top-full mt-2 left-0 w-full bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[2000] py-2">
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
                    <div className="py-1 max-h-60 overflow-y-auto">
                      <button
                        onClick={() => selectCategory('All Categories')}
                        className={`block w-full text-left px-5 py-2.5 text-sm transition-colors hover:bg-gray-50
                          ${selectedCat === 'All Categories' ? 'text-gray-900 font-semibold' : 'text-gray-700'}`}
                      >
                        All Categories
                      </button>
                      {filteredCategories.length > 0 ? (
                        filteredCategories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => selectCategory(cat)}
                            className={`block w-full text-left px-5 py-2.5 text-sm transition-colors hover:bg-gray-50
                              ${selectedCat === cat ? 'text-gray-900 font-semibold' : 'text-gray-700'}`}
                          >
                            {cat}
                          </button>
                        ))
                      ) : (
                        <p className="px-5 py-3 text-sm text-gray-400">No categories found</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ── DESKTOP: Styled like photo ── */}
            <div className="hidden md:flex bg-[#122E29] p-3 rounded-lg shadow-2xl items-stretch gap-3 relative z-[50]">
              <div className="flex-[2.5] bg-white rounded flex items-center">
                <div className="flex-[1.2] px-4 py-3 border-r border-gray-200 flex items-center gap-3 text-slate-500">
                  <input
                    type="text"
                    placeholder="Location"
                    value={locInput}
                    onChange={(e) => setLocInput(e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-slate-700 placeholder:text-slate-500 text-[15px] font-medium"
                  />
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                </div>
                <div className="flex-[1.8] flex items-center justify-between gap-2 text-slate-500 relative" ref={catRefDesktop}>
                  <button
                    onClick={() => setCatOpenDesktop(!catOpenDesktop)}
                    className="w-full h-full flex items-center justify-between px-4 py-3 text-[15px] text-slate-500 hover:text-slate-700 transition-colors"
                  >
                    <span className={selectedCat !== 'All Categories' ? 'text-slate-700 font-medium' : ''}>
                      {selectedCat}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 flex-shrink-0 ml-2 transition-transform duration-200 ${catOpenDesktop ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {catOpenDesktop && (
                    <div className="absolute top-full mt-2 left-0 w-full bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[2000] py-2">
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
                      <div className="py-1 max-h-60 overflow-y-auto">
                        <button
                          onClick={() => selectCategory('All Categories')}
                          className={`block w-full text-left px-5 py-2.5 text-sm transition-colors hover:bg-gray-50
                            ${selectedCat === 'All Categories' ? 'text-gray-900 font-semibold' : 'text-gray-700'}`}
                        >
                          All Categories
                        </button>
                        {filteredCategories.length > 0 ? (
                          filteredCategories.map((cat) => (
                            <button
                              key={cat}
                              onClick={() => selectCategory(cat)}
                              className={`block w-full text-left px-5 py-2.5 text-sm transition-colors hover:bg-gray-50
                                ${selectedCat === cat ? 'text-gray-900 font-semibold' : 'text-gray-700'}`}
                            >
                              {cat}
                            </button>
                          ))
                        ) : (
                          <p className="px-5 py-3 text-sm text-gray-400">No categories found</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <button
                className="bg-[#8A9138] hover:bg-[#78802d] text-white px-8 py-3 rounded font-bold transition-all text-[15px] shadow-sm active:scale-95 shrink-0"
              >
                Search
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 mt-12">
        {/* Jobs Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 text-slate-400">
            <Loader2 className="w-10 h-10 animate-spin mb-4 text-[#c28876]" />
            <span className="font-medium">Loading opportunities...</span>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-slate-400">
            <Briefcase className="w-16 h-16 opacity-20 mb-4" />
            <span className="font-medium text-lg">No active jobs found.</span>
            <p className="text-sm mt-2">Try adjusting your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredJobs.map((job, index) => (
                <Link
                  key={job._id}
                  to={`/jobs/${job._id}`}
                  className="group bg-white border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-500 flex flex-col h-full"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex flex-col h-full"
                  >
                    {/* Job Category Tag */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="px-4 py-1.5 bg-[#c28876]/10 text-[#c28876] text-[10px] font-bold uppercase tracking-wider rounded-full">
                        {job.serviceType || job.petType || 'Pet Sitting'}
                      </span>
                      <span className="text-slate-400 text-[10px] font-medium uppercase tracking-widest">
                        Posted {getDaysAgo(job.createdAt)}
                      </span>
                    </div>

                    {/* Pet Images */}
                    {job.petImages && job.petImages.length > 0 && (
                      <div className={`grid gap-2 mb-6 w-full ${job.petImages.length === 1 ? 'grid-cols-1' : job.petImages.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                        {job.petImages.slice(0, 3).map((img, idx) => (
                          <div key={idx} className={`w-full ${job.petImages!.length === 1 ? 'h-48' : 'h-24'} rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 relative`}>
                            <img src={img} alt={`${job.title} ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                            {idx === 2 && job.petImages!.length > 3 && (
                              <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-xl backdrop-blur-[2px]">
                                +{job.petImages!.length - 3}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Job Title */}
                    <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-[#c28876] transition-colors leading-tight font-serif">
                      {job.title}
                    </h3>

                    {/* Job Meta Info */}
                    <div className="space-y-3 mb-8 flex-grow">
                      <div className="flex items-center gap-3 text-slate-500 text-sm">
                        <MapPin className="w-4 h-4 opacity-70 text-[#c28876]/60 flex-shrink-0" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-500 text-sm">
                        <Calendar className="w-4 h-4 opacity-70 text-[#c28876]/60 flex-shrink-0" />
                        <span>{job.startDate} → {job.endDate}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-500 text-sm">
                        <DollarSign className="w-4 h-4 opacity-70 text-[#c28876] flex-shrink-0" />
                        <span className="font-bold text-slate-900">{job.budget}</span>
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed mt-4 line-clamp-3">
                        {job.description}
                      </p>
                    </div>

                    {/* Author & Apply Action */}
                    <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={job.owner?.avatar || 'https://via.placeholder.com/150'}
                          alt={job.owner?.firstName || 'Owner'}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                          style={!isLoggedIn ? { filter: 'blur(5px) grayscale(100%)', transition: 'filter 0.5s ease' } : { transition: 'filter 0.5s ease' }}
                        />

                        <div>
                          <p className="text-sm font-bold text-slate-900 leading-none mb-1">
                            {job.owner ? `${job.owner.firstName} ${job.owner.lastName}` : 'Unknown Owner'}
                          </p>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                              {job.owner?.isVerified ? 'Verified Owner' : 'Owner'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-[#c28876] text-white px-6 py-3 rounded-full text-xs font-bold hover:brightness-110 transition-all shadow-lg active:scale-95 group-hover:px-8 duration-300">
                        Apply Now
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Empty State / Load More */}
        {!loading && filteredJobs.length > 0 && (
          <div className="mt-20 flex flex-col items-center">
            <p className="text-slate-400 text-sm mb-8 font-light italic">Showing {filteredJobs.length} active jobs</p>
            <button className="px-10 py-4 bg-white border border-slate-200 text-slate-900 rounded-full font-bold text-sm hover:border-slate-900 transition-all active:scale-95 shadow-sm">
              Load More Opportunities
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsOffered;
