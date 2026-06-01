import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin, Heart, Share2, Calendar, Clock,
  DollarSign, CheckCircle2, ChevronLeft,
  Dog, Info, Home, Bed, Bath, Wifi,
  Cigarette, Star, User, ChevronRight, ShieldCheck,
  Loader2, Briefcase, PawPrint
} from 'lucide-react';
import { motion } from 'framer-motion';
import safetyBannerImg from '../assets/Gemini_Generated_Image_ulc5i9ulc5i9ulc5.png';
import shieldIcon from '../assets/png/Screenshot 2026-06-01 104415.png';
import PosterCard from '../components/jobs/PosterCard';
import { useAuth } from '../hooks/useAuth';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const customMarkerIcon = new L.DivIcon({
  className: 'custom-div-icon-black',
  html: `<div style="background-color:#c28876;width:24px;height:24px;border-radius:50%;border:2px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.3);"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

interface JobData {
  _id: string;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  petType: string;
  serviceType?: string;
  budget: string;
  status: string;
  petImages: string[];
  owner: {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
    isVerified?: boolean;
  };
  applicants?: any[];
  createdAt: string;
}

const mockApplicants = [
  {
    firstName: "Emily",
    lastName: "Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&fit=crop",
    rating: 5.0,
    reviews: 24,
    completedJobs: 2
  },
  {
    firstName: "Michael",
    lastName: "Brown",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop",
    rating: 4.9,
    reviews: 18,
    completedJobs: 3
  },
  {
    firstName: "Sarah",
    lastName: "Williams",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&fit=crop",
    rating: 5.0,
    reviews: 31,
    completedJobs: 5
  }
];

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [mapCoords, setMapCoords] = useState<{ lat: number, lng: number } | null>(null);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const { isLoggedIn } = useAuth();

  const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';

  useEffect(() => {
    if (job?.location) {
      const fetchCoords = async () => {
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(job.location)}`);
          const data = await res.json();
          if (data && data.length > 0) {
            setMapCoords({ lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) });
          }
        } catch (err) {
          console.error('Error fetching coords:', err);
        }
      };
      fetchCoords();
    }
  }, [job?.location]);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`${apiUrl}/jobs/public/${id}`);
        const data = await res.json();
        if (data.success) {
          setJob(data.data);
          const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
          if (appliedJobs.includes(id)) {
            setHasApplied(true);
          }
        }
      } catch (err) {
        console.error('Error fetching job details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id, apiUrl]);

  const handleApply = async () => {
    if (!isLoggedIn) {
      setErrorMsg('Please log in to apply for this job.');
      return;
    }
    setApplying(true);
    setErrorMsg('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${apiUrl}/jobs/${id}/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setHasApplied(true);
        const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
        if (!appliedJobs.includes(id)) {
          appliedJobs.push(id);
          localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
        }
      } else {
        setErrorMsg(data.message || 'Failed to apply.');
        if (data.message === 'You have already applied to this job.') {
          setHasApplied(true);
          const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
          if (!appliedJobs.includes(id)) {
            appliedJobs.push(id);
            localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
          }
        }
      }
    } catch (err) {
      setErrorMsg('An error occurred while applying.');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F7F3] pt-40 pb-20 flex items-center justify-center text-slate-400">
        <Loader2 className="w-10 h-10 animate-spin mr-3 text-[#5A7E49]" />
        <span className="font-semibold text-lg text-slate-600">Loading job details...</span>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-[#F8F7F3] pt-40 pb-20 flex flex-col items-center justify-center text-slate-400">
        <h2 className="text-2xl font-bold text-slate-700 mb-4">Job Not Found</h2>
        <p className="mb-6">This job might have been removed or is no longer active.</p>
        <Link to="/jobs-offered" className="px-6 py-3 bg-[#5A7E49] text-white rounded-xl font-bold hover:bg-[#4C7A34] transition-all">
          Back to Jobs
        </Link>
      </div>
    );
  }

  const getDaysAgo = (dateStr: string) => {
    const diff = new Date().getTime() - new Date(dateStr).getTime();
    const days = Math.floor(diff / (1000 * 3600 * 24));
    return days <= 0 ? 'Today' : `${days} days ago`;
  };

  const calcNights = (start: string, end: string) => {
    const s = new Date(start).getTime();
    const e = new Date(end).getTime();
    const diff = Math.floor((e - s) / (1000 * 3600 * 24));
    return diff > 0 ? diff : 1;
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const getJobImages = (j: JobData) => {
    const images = j.petImages && j.petImages.filter(Boolean).length > 0 ? j.petImages : [];
    const defaults = [
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=800&auto=format&fit=crop", // Golden Retriever
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop", // House exterior
      "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=800&auto=format&fit=crop", // House interior
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=800&auto=format&fit=crop"  // Yard/garden
    ];
    const finalImages = [...images];
    while (finalImages.length < 4) {
      finalImages.push(defaults[finalImages.length % 4]);
    }
    return finalImages;
  };

  const nights = calcNights(job.startDate, job.endDate);
  const budgetNum = parseInt(job.budget.replace(/[^0-9]/g, '')) || 0;
  const dailyRate = nights > 0 ? Math.round(budgetNum / nights) : budgetNum;
  const budgetDisplay = job.budget.startsWith('$') ? job.budget : `$${job.budget}`;
  const offerText = `${budgetDisplay} ($${dailyRate} per day)`;

  const descriptionText = job.description || "We're looking for a caring and responsible sitter to look after our golden retriever, Buddy, while we're away on vacation. Buddy is friendly, well-behaved, and loves company. Our home is comfortable and in a quiet neighborhood.";
  const isLongDesc = descriptionText.length > 180;
  const displayDesc = isLongDesc && !isDescExpanded ? `${descriptionText.slice(0, 180)}...` : descriptionText;
  const jobImages = getJobImages(job);

  return (
    <div className="min-h-screen bg-[#F8F7F3] pt-28 pb-16 font-sans">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Back Button */}
        <Link
          to="/jobs-offered"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-[#5A7E49] transition-colors mb-6 group font-bold text-sm"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Listings</span>
        </Link>

        {/* Outer 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-12">
          
          {/* Left Column (2/3) - Unified Card Container */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-100/90 flex flex-col gap-8">
            
            {/* Title Section */}
            <div className="w-full">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h1 className="text-3xl font-extrabold text-[#1a2e35] leading-tight">
                      {job.title}
                    </h1>
                    <span className="bg-[#E2F0D9] text-[#5A7E49] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {job.status === 'Active' ? 'Open' : job.status}
                    </span>
                  </div>
                  <div className="flex items-center text-slate-400 text-sm gap-1.5">
                    <MapPin size={16} className="text-[#5A7E49]" />
                    <span className="font-semibold">{job.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm hover:border-[#5A7E49]/30 hover:bg-[#5A7E49]/5 transition-all text-slate-400 hover:text-[#5A7E49]">
                    <Heart size={18} />
                  </button>
                  <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold text-slate-600 shadow-sm hover:border-[#5A7E49]/30 hover:bg-[#5A7E49]/5 transition-all">
                    <Share2 size={16} className="text-slate-400" />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              {/* Three Quick Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="flex items-center gap-4 bg-[#F8F7F3] p-5 rounded-2xl border border-slate-100">
                  <div className="w-12 h-12 rounded-xl bg-[#EAF0E5] text-[#5A7E49] flex items-center justify-center shrink-0 font-bold">
                    <Calendar size={22} />
                  </div>
                  <div>
                    <p className="text-[14px] font-extrabold text-[#1a2e35] leading-tight">{formatDate(job.startDate)} – {formatDate(job.endDate)}</p>
                    <p className="text-xs font-bold text-slate-400 mt-0.5">{nights} nights</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-[#F8F7F3] p-5 rounded-2xl border border-slate-100">
                  <div className="w-12 h-12 rounded-xl bg-[#EAF0E5] text-[#5A7E49] flex items-center justify-center shrink-0 font-bold">
                    <Dog size={22} />
                  </div>
                  <div>
                    <p className="text-[14px] font-extrabold text-[#1a2e35] leading-tight">{job.serviceType || 'Dog Sitting'}</p>
                    <p className="text-xs font-bold text-slate-400 mt-0.5">1 {job.petType || 'Dog'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-[#F8F7F3] p-5 rounded-2xl border border-slate-100">
                  <div className="w-12 h-12 rounded-xl bg-[#EAF0E5] text-[#5A7E49] flex items-center justify-center shrink-0 font-bold">
                    <DollarSign size={22} />
                  </div>
                  <div>
                    <p className="text-[14px] font-extrabold text-[#1a2e35] leading-tight">{budgetDisplay}</p>
                    <p className="text-xs font-bold text-slate-400 mt-0.5">Total Offer</p>
                  </div>
                </div>
              </div>

              {/* Collapsible Description text */}
              <div className="mt-6 border-t border-slate-100 pt-6">
                <p className="text-slate-600 leading-relaxed font-medium text-sm whitespace-pre-wrap">
                  {displayDesc}
                </p>
                {isLongDesc && (
                  <button
                    onClick={() => setIsDescExpanded(!isDescExpanded)}
                    className="text-[#5A7E49] hover:text-[#4C7A34] font-bold text-xs mt-2 flex items-center gap-1 hover:underline"
                  >
                    <span>{isDescExpanded ? 'Read less' : 'Read more'}</span>
                    <span className="text-[10px]">{isDescExpanded ? '▲' : '▼'}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Photos Gallery Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[420px]">
              <div className="md:col-span-2 rounded-3xl overflow-hidden relative h-full border border-slate-100">
                <img src={jobImages[0]} alt="Pet Primary" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="grid grid-rows-3 gap-4 h-full">
                <div className="rounded-2xl overflow-hidden relative h-full border border-slate-100">
                  <img src={jobImages[1]} alt="Pet 2" className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden relative h-full border border-slate-100">
                  <img src={jobImages[2]} alt="Pet 3" className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden relative h-full border border-slate-100">
                  <img src={jobImages[3]} alt="Pet 4" className="absolute inset-0 w-full h-full object-cover" />
                  {jobImages.length > 4 && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-white text-lg font-bold">+{jobImages.length - 3}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="border-t border-slate-100 pt-8">
              <h3 className="text-xl font-bold text-[#1a2e35] mb-6">Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                {[
                  { label: "Service Type", value: job.serviceType || 'Dog Sitting', icon: <Briefcase size={18} /> },
                  { label: "Pets", value: `1 ${job.petType || 'Dog'} (${job.petType === 'Cat' ? 'Cat' : 'Golden Retriever'})`, icon: <Dog size={18} /> },
                  { label: "Pet's Age", value: "3 Years", icon: <Clock size={18} /> },
                  { label: "Size", value: "Large (22 – 30 kg)", icon: <Info size={18} /> },
                  { label: "Start Date", value: formatDate(job.startDate), icon: <Calendar size={18} /> },
                  { label: "End Date", value: formatDate(job.endDate), icon: <Calendar size={18} /> },
                  { label: "Total Offer", value: offerText, icon: <DollarSign size={18} /> },
                  { label: "Location", value: job.location, icon: <MapPin size={18} /> },
                ].map((detail, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#EAF0E5] flex items-center justify-center text-[#5A7E49] shrink-0 font-bold">
                      {detail.icon}
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{detail.label}</p>
                      <p className="text-sm font-extrabold text-[#1a2e35]">{detail.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Care Instructions Section */}
            <div className="border-t border-slate-100 pt-8">
              <h3 className="text-xl font-bold text-[#1a2e35] mb-4">Care Instructions</h3>
              <p className="text-slate-600 leading-relaxed font-semibold text-sm">
                Buddy is friendly and loves people. He enjoys daily walks, playtime in the yard, and cuddles on the couch. Please feed him twice a day and make sure he gets plenty of attention. Water the plants and bring in the mail.
              </p>
            </div>

            {/* Home Details Section */}
            <div className="border-t border-slate-100 pt-8">
              <h3 className="text-xl font-bold text-[#1a2e35] mb-6">Home Details</h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
                <div className="flex items-center gap-3">
                  <Home className="text-[#5A7E49] shrink-0" size={20} />
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Type</p>
                    <p className="text-sm font-extrabold text-[#1a2e35]">House</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Bed className="text-[#5A7E49] shrink-0" size={20} />
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Bedrooms</p>
                    <p className="text-sm font-extrabold text-[#1a2e35]">3</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Bath className="text-[#5A7E49] shrink-0" size={20} />
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Bathrooms</p>
                    <p className="text-sm font-extrabold text-[#1a2e35]">2</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Wifi className="text-[#5A7E49] shrink-0" size={20} />
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Internet</p>
                    <p className="text-sm font-extrabold text-[#1a2e35]">Yes</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Cigarette className="text-[#5A7E49] shrink-0" size={20} />
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Smoking</p>
                    <p className="text-sm font-extrabold text-[#1a2e35]">No</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Section */}
            {mapCoords && (
              <div className="border-t border-slate-100 pt-8">
                <h3 className="text-xl font-bold text-[#1a2e35] mb-6 flex items-center gap-2">
                  <MapPin className="text-[#5A7E49]" size={22} />
                  Location Map
                </h3>
                <div className="h-64 md:h-80 w-full rounded-2xl overflow-hidden border border-slate-200 z-0 relative">
                  <MapContainer
                    center={[mapCoords.lat, mapCoords.lng]}
                    zoom={14}
                    style={{ height: '100%', width: '100%', zIndex: 1 }}
                    scrollWheelZoom={false}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[mapCoords.lat, mapCoords.lng]} icon={customMarkerIcon} />
                  </MapContainer>
                </div>
              </div>
            )}

          </div>

          {/* Right Column (Sidebar 1/3) */}
          <div className="space-y-8">
            
            {/* About the Home Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100/80">
              <h3 className="text-xl font-bold text-[#1a2e35] mb-6">About the Home</h3>
              <div className="space-y-4">
                {[
                  "Fenced Yard",
                  "Pet Friendly Home",
                  "Non-Smoking Home",
                  "Air Conditioning",
                  "Wi-Fi Available"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#E2F0D9] text-[#5A7E49] flex items-center justify-center shrink-0">
                      <CheckCircle2 size={14} className="fill-[#5A7E49] text-white" />
                    </div>
                    <span className="text-sm font-semibold text-[#1a2e35]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Apply Card */}
            <div className="bg-[#EBF1E6] rounded-3xl p-8 border border-[#DCE6D5] relative overflow-hidden shadow-sm">
              <h3 className="text-[17px] font-extrabold text-[#1c2f35] mb-6 text-left tracking-tight">
                Apply for this Listing
              </h3>
              <div className="relative z-10 text-center flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-[#D6E2CE] flex items-center justify-center text-[#5E784C] mb-4 shadow-sm">
                  {hasApplied ? (
                    <CheckCircle2 size={36} className="text-[#5E784C]" />
                  ) : (
                    <PawPrint size={36} className="fill-[#5E784C] text-[#5E784C]" />
                  )}
                </div>
                <h4 className="text-[16px] font-bold text-[#1c2f35] mb-1.5">
                  {hasApplied ? 'Application Sent!' : 'Interested in helping out?'}
                </h4>
                <p className="text-slate-500 text-[13px] font-medium leading-relaxed mb-6 max-w-[260px]">
                  {hasApplied 
                    ? `Your application has been received by ${job.owner.firstName || 'the owner'}.` 
                    : `Send an application to the owner.`
                  }
                </p>
                {errorMsg && (
                  <p className="text-rose-500 text-xs font-bold mb-4">{errorMsg}</p>
                )}
                <button
                  onClick={handleApply}
                  disabled={hasApplied || applying}
                  className={`w-full py-3.5 rounded-2xl font-bold transition-all shadow-sm flex justify-center items-center gap-2 text-sm
                    ${hasApplied
                      ? 'bg-[#DCE6D5] text-[#5E784C] cursor-not-allowed'
                      : 'bg-[#758D5E] hover:bg-[#647C4E] text-white hover:shadow-md'
                    }`}
                >
                  {applying ? (
                    <><Loader2 size={16} className="animate-spin" /> Applying...</>
                  ) : hasApplied ? (
                    <><CheckCircle2 size={16} /> Applied</>
                  ) : (
                    'Apply Now'
                  )}
                </button>
              </div>
            </div>

            {/* Applications List Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100/80">
              <h3 className="text-xl font-bold text-[#1a2e35] mb-6">
                Applications ({job.applicants?.length || 3})
              </h3>
              
              <div className="space-y-6">
                {job.applicants && job.applicants.length > 0 ? (
                  job.applicants.slice(0, 3).map((app: any, idx: number) => (
                    <div key={app._id || idx} className="flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <img 
                          src={app.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&h=200&fit=crop"} 
                          alt={app.firstName} 
                          className="w-12 h-12 rounded-full object-cover border border-slate-100"
                        />
                        <div>
                          <h4 className="font-extrabold text-[#1a2e35] text-sm group-hover:text-[#5A7E49] transition-colors">
                            {app.firstName} {app.lastName}
                          </h4>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <Star size={12} className="text-yellow-400 fill-yellow-400" />
                            <span className="text-xs font-bold text-[#1a2e35]">{app.rating?.toFixed(1) || "5.0"}</span>
                            <span className="text-xs font-medium text-slate-400">({app.reviews || 24} reviews)</span>
                          </div>
                          <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                            {app.completedJobs || 2} Completed Jobs
                          </p>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-slate-300 group-hover:text-[#5A7E49] transition-colors cursor-pointer" />
                    </div>
                  ))
                ) : (
                  mockApplicants.map((app, idx) => (
                    <div key={idx} className="flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <img 
                          src={app.avatar} 
                          alt={app.firstName} 
                          className="w-12 h-12 rounded-full object-cover border border-slate-100"
                        />
                        <div>
                          <h4 className="font-extrabold text-[#1a2e35] text-sm group-hover:text-[#5A7E49] transition-colors">
                            {app.firstName} {app.lastName}
                          </h4>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <Star size={12} className="text-yellow-400 fill-yellow-400" />
                            <span className="text-xs font-bold text-[#1a2e35]">{app.rating.toFixed(1)}</span>
                            <span className="text-xs font-medium text-slate-400">({app.reviews} reviews)</span>
                          </div>
                          <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                            {app.completedJobs} Completed Jobs
                          </p>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-slate-300 group-hover:text-[#5A7E49] transition-colors cursor-pointer" />
                    </div>
                  ))
                )}
              </div>
              
              <Link 
                to="/jobs-offered" 
                className="w-full mt-8 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all text-center block"
              >
                View All Applications
              </Link>
            </div>

          </div>

        </div>

        {/* Safety Banner */}
        <div className="w-full relative rounded-3xl overflow-hidden border border-[#DCE6D5] flex items-center p-8 bg-[#EAEFE4] mt-16 min-h-[140px] md:h-44 shadow-sm">
          {/* Dog and Cat Image aligned to the right */}
          <div className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 select-none pointer-events-none z-0">
            <img 
              src={safetyBannerImg} 
              className="w-full h-full object-cover object-[right_15%]" 
              alt="Sleeping dog and cat" 
            />
            {/* Fade overlay from solid color to transparent only on the left edge */}
            <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#EAEFE4] to-transparent pointer-events-none" />
          </div>

          {/* Content Block */}
          <div className="relative z-10 flex items-center gap-8 max-w-2xl">
            {/* Custom Shield Image */}
            <img src={shieldIcon} className="w-[120px] h-[120px] shrink-0 object-contain drop-shadow-sm select-none pointer-events-none" alt="Shield Icon" />

            <div className="flex flex-col items-start">
              <h3 className="text-[21px] md:text-[23px] font-bold text-[#1c2f35] leading-tight">
                Safe. Trusted. Loving Care.
              </h3>
              <p className="text-[14px] md:text-[15px] text-slate-600 font-semibold mt-2 mb-5 leading-relaxed max-w-[420px]">
                Every sitter is background-checked and reviewed by pet and home owners like you.
              </p>
              <Link to="/how-it-works" className="px-6 py-2.5 rounded-xl border border-[#C2CFB9] bg-[#EAEFE4] hover:bg-[#DDE8D6] text-[13px] font-extrabold text-[#1c2f35] transition-all shadow-sm inline-block">
                Learn More
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default JobDetails;


