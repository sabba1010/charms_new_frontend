import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin, Heart, Share2, Calendar, Clock,
  DollarSign, CheckCircle2, ChevronLeft,
  Dog, Info, Home, Bed, Bath, Wifi,
  Cigarette, Star, User, ChevronRight, ShieldCheck,
  Loader2, Briefcase
} from 'lucide-react';
import { motion } from 'framer-motion';
import safetyBannerImg from '../assets/Gemini_Generated_Image_ulc5i9ulc5i9ulc5.png';
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
  createdAt: string;
}

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [mapCoords, setMapCoords] = useState<{ lat: number, lng: number } | null>(null);
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
          // Check if applied locally (in case we want to show it immediately if they visit again, though we don't have user ID in frontend easily)
          // As a workaround, we'll just let the backend reject with 400 if they already applied, or we can check localStorage
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
      <div className="min-h-screen bg-[#F9F5EF] pt-40 pb-20 flex items-center justify-center text-slate-400">
        <Loader2 className="w-10 h-10 animate-spin mr-3 text-[#c28876]" />
        <span className="font-medium text-lg">Loading job details...</span>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-[#F9F5EF] pt-40 pb-20 flex flex-col items-center justify-center text-slate-400">
        <h2 className="text-2xl font-bold text-slate-700 mb-4">Job Not Found</h2>
        <p className="mb-6">This job might have been removed or is no longer active.</p>
        <Link to="/jobs-offered" className="px-6 py-3 bg-[#c28876] text-white rounded-xl font-bold">
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

  const nights = calcNights(job.startDate, job.endDate);

  return (
    <div className="min-h-screen bg-[#F9F5EF] pt-28 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-6">

        {/* Back Button */}
        <Link
          to="/jobs-offered"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-[#c28876] transition-colors mb-8 group"
        >
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-100 group-hover:border-[#c28876]/30 group-hover:bg-[#c28876]/5 transition-all">
            <ChevronLeft size={18} />
          </div>
          <span className="text-sm font-bold tracking-tight">Back to Listings</span>
        </Link>

        {/* Main Header Card */}
        <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 mb-8 relative overflow-hidden">
          {/* Subtle Rose Accent Gradient */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#c28876]/5 to-transparent pointer-events-none" />

          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-3xl md:text-4xl font-bold text-[#1a2e35] font-serif leading-tight">
                  {job.title}
                </h1>
                <span className="bg-[#E7F5E7] text-[#4CAF50] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  {job.status}
                </span>
              </div>
              <div className="flex items-center text-slate-400 text-sm gap-2 mb-2">
                <MapPin size={16} className="text-[#c28876]/60" />
                <span className="font-medium tracking-tight">{job.location}</span>
              </div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                Posted {getDaysAgo(job.createdAt)}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="w-11 h-11 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-sm hover:border-[#c28876]/30 hover:bg-[#c28876]/5 transition-all text-slate-400 hover:text-[#c28876]">
                <Heart size={20} />
              </button>
              <button className="flex items-center gap-2 bg-white border border-slate-100 px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 shadow-sm hover:border-[#c28876]/30 hover:bg-[#c28876]/5 transition-all group">
                <Share2 size={18} className="text-[#c28876]/70 group-hover:scale-110 transition-transform" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 bg-[#F9F6F1] p-6 rounded-2xl border border-slate-100/50">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm text-[#c28876]">
                <Calendar size={22} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{job.startDate} - {job.endDate}</p>
                <p className="text-sm font-extrabold text-[#1a2e35]">{nights} night(s)</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-[#F9F6F1] p-6 rounded-2xl border border-slate-100/50">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm text-[#c28876]">
                <Dog size={22} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Pet Type</p>
                <p className="text-sm font-extrabold text-[#1a2e35]">{job.petType}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-[#F9F6F1] p-6 rounded-2xl border border-slate-100/50">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm text-[#c28876]">
                <DollarSign size={22} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Offer / Budget</p>
                <p className="text-sm font-extrabold text-[#1a2e35]">{job.budget}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Layout Grid: Content + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">

            {/* Job Poster Card */}
            <PosterCard
              id={job.owner._id || ''}
              name={`${job.owner.firstName} ${job.owner.lastName}`}
              email={job.owner.email}
              avatar={job.owner.avatar || "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=200&h=200&fit=crop"}
            />

            {/* Gallery Section */}
            {job.petImages && job.petImages.length > 0 && (
              <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-slate-100">
                <h2 className="text-2xl font-bold text-[#1a2e35] font-serif mb-6">Photos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[450px] overflow-hidden">
                  <div className="rounded-[2rem] overflow-hidden shadow-lg border border-white h-full relative">
                    <img src={job.petImages[0]} alt="Pet Primary" className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                  {job.petImages.length > 1 && (
                    <div className="grid grid-rows-2 gap-4 h-full">
                      {job.petImages.length === 2 ? (
                        <div className="rounded-3xl overflow-hidden shadow-md border border-white h-full row-span-2 relative">
                          <img src={job.petImages[1]} alt="Pet 2" className="absolute inset-0 w-full h-full object-cover" />
                        </div>
                      ) : (
                        <>
                          <div className="grid grid-cols-2 gap-4 h-full">
                            <div className="rounded-3xl overflow-hidden shadow-md border border-white relative h-full">
                              <img src={job.petImages[1]} alt="Pet 2" className="absolute inset-0 w-full h-full object-cover" />
                            </div>
                            {job.petImages.length > 2 && (
                              <div className="rounded-3xl overflow-hidden shadow-md border border-white relative h-full">
                                <img src={job.petImages[2]} alt="Pet 3" className="absolute inset-0 w-full h-full object-cover" />
                              </div>
                            )}
                          </div>
                          {job.petImages.length > 3 && (
                            <div className="rounded-3xl overflow-hidden shadow-md border border-white relative group cursor-pointer h-full">
                              <img src={job.petImages[3]} alt="Pet 4" className="absolute inset-0 w-full h-full object-cover" />
                              {job.petImages.length > 4 && (
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-all z-10">
                                  <span className="text-white text-2xl font-bold font-serif">+{job.petImages.length - 4}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Description Section */}
            <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-[#1a2e35] font-serif mb-6">Job Description & Requirements</h2>
              <p className="text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">
                {job.description}
              </p>
            </div>

            {/* Details Section */}
            <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-[#1a2e35] font-serif mb-8">Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                {[
                  { label: "Service", value: job.serviceType || 'Not specified', icon: <Briefcase size={18} /> },
                  { label: "Pet Type", value: job.petType, icon: <Dog size={18} /> },
                  { label: "Start Date", value: job.startDate, icon: <Calendar size={18} /> },
                  { label: "Location", value: job.location, icon: <MapPin size={18} /> },
                  { label: "End Date", value: job.endDate, icon: <Calendar size={18} /> },
                  { label: "Total Offer", value: job.budget, icon: <DollarSign size={18} /> },
                  { label: "Duration", value: `${nights} Night(s)`, icon: <Clock size={18} /> },
                ].map((detail, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#F9F6F1] flex items-center justify-center text-[#c28876]/70 shrink-0">
                      {detail.icon}
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">{detail.label}</p>
                      <p className="text-[15px] font-extrabold text-[#1a2e35]">{detail.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Section */}
            {mapCoords && (
              <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-slate-100">
                <h2 className="text-2xl font-bold text-[#1a2e35] font-serif mb-6 flex items-center gap-2">
                  <MapPin className="text-[#c28876]" size={24} />
                  Location Map
                </h2>
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

          {/* Sidebar */}
          <div className="space-y-8">

            {/* Apply Card */}
            <div className="bg-[#f0f9f0] rounded-3xl p-8 border border-[#e0f0e0] relative overflow-hidden">
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 rounded-full bg-white/80 mx-auto flex items-center justify-center text-[#4CAF50] mb-6 shadow-sm">
                  {hasApplied ? <CheckCircle2 size={32} className="text-emerald-500" /> : <Dog size={32} />}
                </div>
                <h3 className="text-xl font-bold text-[#1a2e35] mb-2">
                  {hasApplied ? 'Application Sent!' : 'Interested in helping out?'}
                </h3>
                <p className="text-slate-500 text-sm mb-8 font-medium">
                  {hasApplied ? 'The owner has received your application.' : 'Send an application to the owner.'}
                </p>
                {errorMsg && (
                  <p className="text-rose-500 text-xs font-bold mb-4">{errorMsg}</p>
                )}
                <button
                  onClick={handleApply}
                  disabled={hasApplied || applying}
                  className={`w-full py-4 rounded-2xl font-bold transition-all shadow-xl transform hover:-translate-y-1 flex justify-center items-center gap-2
                    ${hasApplied
                      ? 'bg-emerald-100 text-emerald-600 shadow-emerald-100/20 hover:translate-y-0 cursor-not-allowed'
                      : 'bg-[#c28876] text-white hover:brightness-110 shadow-[#c28876]/20'
                    }`}
                >
                  {applying ? (
                    <><Loader2 size={18} className="animate-spin" /> Applying...</>
                  ) : hasApplied ? (
                    <><CheckCircle2 size={18} /> Applied</>
                  ) : (
                    'Apply Now'
                  )}
                </button>
              </div>
              {/* Decorative Circle */}
              <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-white/20 rounded-full blur-2xl pointer-events-none" />
            </div>

            {/* Trust and Safety Badge */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck size={32} />
              </div>
              <h4 className="font-bold text-slate-800 mb-2">Secure Platform</h4>
              <p className="text-xs text-slate-500">All payments and communications should go through our secure platform for your safety.</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default JobDetails;
