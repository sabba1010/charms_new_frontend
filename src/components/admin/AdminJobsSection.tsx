import React, { useState, useEffect, useRef } from 'react';
import { PlusCircle, MapPin, Calendar, Users, Loader2, Briefcase, Check, X, Clock, Image as ImageIcon, XCircle, MessageSquare, Star, CreditCard, Banknote, ShieldCheck, Trash2, AlertTriangle, LocateFixed } from 'lucide-react';
import { cn } from '../../lib/utils';
import ChatBox from '../chat/ChatBox';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const blackMarkerIcon = new L.DivIcon({
  className: 'custom-div-icon-black',
  html: `<div style="background-color:#111c1e;width:24px;height:24px;border-radius:50%;border:2px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.3);"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const MapRecenter = ({ lat, lng }: { lat: number; lng: number }) => {
  const map = useMap();
  React.useEffect(() => {
    map.setView([lat, lng], map.getZoom());
  }, [lat, lng, map]);
  return null;
};

const MapEventsHandler = ({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) => {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  petType: string;
  petImages?: string[];
  budget: string;
  status: 'Pending' | 'Active' | 'Rejected';
  createdAt: string;
  applicants?: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
    phone?: string;
    role?: string;
    rating?: number;
    reviews?: number;
    completedJobs?: number;
  }[];
}

/* ─── Payment Modal ─────────────────────────────────────── */
const PaymentModal: React.FC<{
  target: { jobId: string; jobTitle: string; budget: string; applicantId: string; applicantName: string };
  loading: boolean;
  onPay: (method: string, amount: string, cardLast4?: string) => void;
  onClose: () => void;
}> = ({ target, loading, onPay, onClose }) => {
  const [method, setMethod] = useState<'card' | 'cash'>('card');
  const [amount, setAmount] = useState(() => {
    const num = parseFloat(target.budget.replace(/[^0-9.]/g, ''));
    return isNaN(num) ? '' : String(num);
  });
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [step, setStep] = useState<'form' | 'confirm'>('form');

  const formatCard = (v: string) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, '').slice(0, 4);
    return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  const canProceed = () => {
    if (!amount || parseFloat(amount) <= 0) return false;
    if (method === 'card') return cardNumber.replace(/\s/g, '').length === 16 && expiry.length === 5 && cvv.length >= 3;
    return true;
  };

  const handlePay = () => {
    const cardLast4 = method === 'card' ? cardNumber.replace(/\s/g, '').slice(-4) : undefined;
    onPay(method, amount, cardLast4);
  };

  const methods = [
    { id: 'card', label: 'Credit / Debit', icon: <CreditCard size={16} /> },
    { id: 'cash', label: 'Cash', icon: <Banknote size={16} /> },
  ] as const;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#111c1e] to-[#1e3a3f] px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-white/60 text-xs font-medium mb-0.5">Accepting Sitter</p>
            <h3 className="text-white text-base font-bold">{target.applicantName}</h3>
            <p className="text-white/50 text-xs mt-0.5 truncate max-w-[280px]">for "{target.jobTitle}"</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {step === 'form' ? (
            <>
              {/* Amount */}
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5">
                  Payment Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">$</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full border border-slate-200 rounded-xl pl-8 pr-4 py-3 text-[14px] font-bold text-slate-700 focus:outline-none focus:border-[#111c1e] transition-all"
                  />
                </div>
                {target.budget && (
                  <p className="text-[11px] text-slate-400 mt-1">Suggested: {target.budget}</p>
                )}
              </div>

              {/* Payment method */}
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-2">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {methods.map(m => (
                    <button key={m.id} onClick={() => setMethod(m.id)}
                      className={cn(
                        'flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-bold transition-all',
                        method === m.id
                          ? 'border-[#111c1e] bg-[#111c1e] text-white shadow-md'
                          : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'
                      )}>
                      {m.icon} {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Card inputs */}
              {method === 'card' && (
                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">Card Number</label>
                    <input
                      value={cardNumber}
                      onChange={e => setCardNumber(formatCard(e.target.value))}
                      placeholder="0000 0000 0000 0000"
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] text-slate-700 focus:outline-none focus:border-[#111c1e] transition-all font-mono tracking-widest"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">Expiry</label>
                      <input
                        value={expiry}
                        onChange={e => setExpiry(formatExpiry(e.target.value))}
                        placeholder="MM/YY"
                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] text-slate-700 focus:outline-none focus:border-[#111c1e] transition-all font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">CVV</label>
                      <input
                        value={cvv}
                        onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                        placeholder="•••"
                        type="password"
                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] text-slate-700 focus:outline-none focus:border-[#111c1e] transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}


              {/* Cash note */}
              {method === 'cash' && (
                <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-sm text-amber-700">
                  💵 Cash payment will be recorded. Please ensure you hand over the amount to the sitter on arrival.
                </div>
              )}

              <button
                onClick={() => setStep('confirm')}
                disabled={!canProceed()}
                className="w-full py-3.5 bg-[#111c1e] text-white rounded-xl font-bold text-sm hover:bg-black transition-all shadow-lg disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Review Payment
                <ShieldCheck size={16} />
              </button>
            </>
          ) : (
            /* Confirm Step */
            <div className="space-y-5">
              <div className="bg-slate-50 rounded-xl p-5 space-y-3">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Payment Summary</p>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Sitter</span>
                  <span className="font-bold text-slate-800">{target.applicantName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Method</span>
                  <span className="font-bold text-slate-800 capitalize">{method}</span>
                </div>
                {method === 'card' && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Card</span>
                    <span className="font-bold text-slate-800 font-mono">•••• {cardNumber.replace(/\s/g, '').slice(-4)}</span>
                  </div>
                )}
                <div className="border-t border-slate-200 pt-3 flex justify-between">
                  <span className="font-bold text-slate-700">Total</span>
                  <span className="font-black text-xl text-[#111c1e]">${parseFloat(amount).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep('form')} disabled={loading}
                  className="flex-1 py-3 border border-slate-200 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all disabled:opacity-50">
                  Back
                </button>
                <button onClick={handlePay} disabled={loading}
                  className="flex-1 py-3 bg-emerald-500 text-white rounded-xl font-bold text-sm hover:bg-emerald-600 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70">
                  {loading ? <><Loader2 size={15} className="animate-spin" /> Processing...</> : <><Check size={15} /> Confirm Payment</>}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AdminJobsSection = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'post'>('active');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [viewingApplicants, setViewingApplicants] = useState<Job | null>(null);

  // Chat state
  const [chatBookingId, setChatBookingId] = useState<string | null>(null);
  const [chatTitle, setChatTitle] = useState<string>('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [initiatingChat, setInitiatingChat] = useState<string | null>(null);

  // Payment / Accept state
  const [paymentTarget, setPaymentTarget] = useState<{
    jobId: string; jobTitle: string; budget: string;
    applicantId: string; applicantName: string;
  } | null>(null);
  const [acceptedSitters, setAcceptedSitters] = useState<Set<string>>(new Set());
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [acceptSuccess, setAcceptSuccess] = useState('');

  // Delete job state
  const [deleteTarget, setDeleteTarget] = useState<Job | null>(null);
  const [deleting, setDeleting] = useState(false);

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Map state
  const [mapLat, setMapLat] = useState(40.7128);
  const [mapLng, setMapLng] = useState(-74.0060);
  const [isLocating, setIsLocating] = useState(false);

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setMapLat(lat);
          setMapLng(lng);
          try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
            const data = await res.json();
            if (data && data.display_name) {
              setForm(f => ({ ...f, location: data.display_name }));
            }
          } catch (err) {
            console.error("Reverse geocoding error:", err);
          } finally {
            setIsLocating(false);
          }
        },
        (error) => {
          console.error("Error obtaining location", error);
          setIsLocating(false);
        }
      );
    }
  };

  // Form state
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    startDate: '',
    endDate: '',
    petType: 'Dog',
    serviceType: 'Pet Sitting',
    budget: ''
  });

  const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';
  const token = localStorage.getItem('token');

  const fetchMyJobs = async () => {
    try {
      const res = await fetch(`${apiUrl}/jobs/my`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setJobs(data.data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const totalImages = imageFiles.length + filesArray.length;

      if (totalImages > 5) {
        alert("You can upload a maximum of 5 images.");
        return;
      }

      setImageFiles(prev => [...prev, ...filesArray]);
      const newPreviews = filesArray.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => {
      const newPreviews = prev.filter((_, i) => i !== index);
      // Clean up object URL to prevent memory leaks
      URL.revokeObjectURL(prev[index]);
      return newPreviews;
    });
  };

  const uploadImages = async (): Promise<string[]> => {
    if (imageFiles.length === 0) return [];

    const urls: string[] = [];
    for (const file of imageFiles) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch(`${apiUrl}/upload`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        });
        const data = await res.json();
        if (data.success) {
          urls.push(data.fileUrl);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
    return urls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.location || !form.startDate || !form.endDate || !form.budget || !form.serviceType) return;
    setSubmitting(true);

    try {
      let uploadedImageUrls: string[] = [];
      if (imageFiles.length > 0) {
        setUploadingImage(true);
        uploadedImageUrls = await uploadImages();
        setUploadingImage(false);
      }

      const res = await fetch(`${apiUrl}/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...form,
          petImages: uploadedImageUrls
        })
      });
      const data = await res.json();
      if (data.success) {
        setJobs(prev => [data.data, ...prev]);
        setForm({ title: '', description: '', location: '', startDate: '', endDate: '', petType: 'Dog', serviceType: 'Pet Sitting', budget: '' });
        setImageFiles([]);
        setImagePreviews([]);
        setSuccess(true);
        setActiveTab('active');
        setTimeout(() => setSuccess(false), 4000);
      }
    } catch (err) {
      console.error('Error posting job:', err);
    } finally {
      setSubmitting(false);
      setUploadingImage(false);
    }
  };

  const statusBadge = (status: Job['status']) => {
    const map = {
      Pending: { cls: 'bg-amber-50 text-amber-600 border-amber-100', icon: <Clock size={11} />, label: 'Pending Approval' },
      Active: { cls: 'bg-emerald-50 text-emerald-600 border-emerald-100', icon: <Check size={11} />, label: 'Active' },
      Rejected: { cls: 'bg-rose-50 text-rose-500 border-rose-100', icon: <X size={11} />, label: 'Rejected' },
    };
    const s = map[status];
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${s.cls}`}>
        {s.icon} {s.label}
      </span>
    );
  };

  const handleChatWithApplicant = async (jobId: string, applicantId: string, applicantName: string) => {
    setInitiatingChat(applicantId);
    try {
      const res = await fetch(`${apiUrl}/jobs/${jobId}/chat/${applicantId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setChatBookingId(data.bookingId);
        setChatTitle(`Chat with ${applicantName}`);
        setIsChatOpen(true);
        // We can close the modal or keep it open, closing is probably cleaner or leave it
        // setViewingApplicants(null);
      }
    } catch (err) {
      console.error('Error initiating chat:', err);
    } finally {
      setInitiatingChat(null);
    }
  };

  const handleAcceptSitter = async (paymentMethod: string, amount: string, cardLast4?: string) => {
    if (!paymentTarget) return;
    setAcceptLoading(true);
    try {
      const res = await fetch(`${apiUrl}/jobs/${paymentTarget.jobId}/accept/${paymentTarget.applicantId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ amount: parseFloat(amount) || 0, paymentMethod, cardLast4 }),
      });
      const data = await res.json();
      if (data.success) {
        setAcceptedSitters(prev => new Set([...prev, paymentTarget.applicantId]));
        setAcceptSuccess(`✅ ${paymentTarget.applicantName} accepted! Payment of $${amount} recorded.`);
        setTimeout(() => setAcceptSuccess(''), 5000);
        setPaymentTarget(null);
        // Refresh jobs to update applicant list
        fetchMyJobs();
      } else {
        alert(data.message || 'Failed to accept sitter.');
      }
    } catch {
      alert('Network error. Please try again.');
    } finally {
      setAcceptLoading(false);
    }
  };

  const handleDeleteJob = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`${apiUrl}/jobs/${deleteTarget._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setJobs(prev => prev.filter(j => j._id !== deleteTarget._id));
        setDeleteTarget(null);
      } else {
        alert(data.message || 'Failed to delete job.');
      }
    } catch {
      alert('Network error. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('active')}
            className={cn(
              "px-6 py-2 rounded-full text-sm font-bold transition-all",
              activeTab === 'active'
                ? "bg-[#111c1e] text-white"
                : "bg-white text-slate-500 border border-slate-100 hover:border-slate-200"
            )}
          >
            My Job Postings ({jobs.length})
          </button>
          <button
            onClick={() => setActiveTab('post')}
            className={cn(
              "px-6 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2",
              activeTab === 'post'
                ? "bg-[#111c1e] text-white"
                : "bg-white text-slate-500 border border-slate-100 hover:border-slate-200"
            )}
          >
            <PlusCircle size={15} /> Post New Job
          </button>
        </div>
      </div>

      {/* Success messages */}
      {success && (
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-5 py-3 flex items-center gap-2 text-emerald-700 text-sm font-semibold">
          <Check size={16} /> Job posted successfully! It is pending admin approval.
        </div>
      )}
      {acceptSuccess && (
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-5 py-3 flex items-center gap-2 text-emerald-700 text-sm font-semibold">
          <ShieldCheck size={16} /> {acceptSuccess}
        </div>
      )}

      {activeTab === 'active' ? (
        loading ? (
          <div className="flex items-center justify-center py-20 text-slate-400">
            <Loader2 size={20} className="animate-spin mr-2" />
            <span className="text-sm">Loading your jobs...</span>
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 py-20 flex flex-col items-center gap-3 text-slate-400">
            <Briefcase size={36} className="opacity-20" />
            <p className="text-sm font-medium">No jobs posted yet.</p>
            <button
              onClick={() => setActiveTab('post')}
              className="mt-2 bg-[#1a2e35] text-white px-6 py-2 rounded-full text-xs font-bold hover:bg-black transition-all"
            >
              Post Your First Job
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {jobs.map(job => (
              <div key={job._id} className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  {/* Show first image as thumbnail or an icon */}
                  {job.petImages && job.petImages.length > 0 ? (
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-100 shadow-sm flex-shrink-0">
                      <img src={job.petImages[0]} alt="Pet" className="w-full h-full object-cover" />
                      {job.petImages.length > 1 && (
                        <div className="absolute bottom-0 right-0 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded-tl-lg font-bold">
                          +{job.petImages.length - 1}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 text-slate-300">
                      <ImageIcon size={24} />
                    </div>
                  )}

                  <div className="flex-grow space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-[15px] font-bold text-slate-800">{job.title}</h3>
                      {statusBadge(job.status)}
                    </div>
                    <p className="text-[12px] text-slate-500 line-clamp-2">{job.description}</p>
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-slate-400">
                      <span className="flex items-center gap-1.5"><MapPin size={13} /> {job.location}</span>
                      <span className="flex items-center gap-1.5"><Calendar size={13} /> {job.startDate} → {job.endDate}</span>
                      <span className="flex items-center gap-1.5">🐾 {job.petType}</span>
                      <span className="flex items-center gap-1.5">💼 {(job as any).serviceType}</span>
                      {job.budget && <span>💰 {job.budget}</span>}
                    </div>
                  </div>

                  {/* Actions: View Applicants + Delete */}
                  <div className="md:ml-auto flex items-center gap-2">
                    <button
                      onClick={() => setViewingApplicants(job)}
                      className={cn(
                        "px-4 py-2 rounded-xl text-xs font-bold transition-all border",
                        job.applicants && job.applicants.length > 0
                          ? "bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100"
                          : "bg-slate-50 text-slate-400 border-slate-100 hover:bg-slate-100"
                      )}
                    >
                      View Applicants ({job.applicants?.length || 0})
                    </button>
                    {/* Delete only if no sitter accepted */}
                    {!acceptedSitters.has(job._id) && (
                      <button
                        onClick={() => setDeleteTarget(job)}
                        className="p-2 rounded-xl border border-red-100 text-red-400 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all"
                        title="Delete this job"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        /* Post New Job Form */
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
          <h3 className="text-[15px] font-bold text-slate-800 mb-6">Post a New Job</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Pet Image Upload (Multiple) */}
              <div className="md:col-span-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase block mb-2">Pet Photos (Max 5)</label>

                <div className="flex flex-wrap gap-4 mb-4">
                  {imagePreviews.map((preview, idx) => (
                    <div key={idx} className="relative w-24 h-24 rounded-xl border border-slate-200 overflow-hidden group shadow-sm">
                      <img src={preview} alt={`preview ${idx}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 bg-white/80 hover:bg-white text-rose-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                      >
                        <XCircle size={14} />
                      </button>
                    </div>
                  ))}

                  {imageFiles.length < 5 && (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="w-24 h-24 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 hover:border-[#1a2e35]/30 transition-all text-slate-400 hover:text-[#1a2e35]"
                    >
                      <PlusCircle size={20} className="mb-1" />
                      <span className="text-[10px] font-semibold">Add Photo</span>
                    </div>
                  )}
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
                <p className="text-[11px] text-slate-400">Upload up to 5 clear images of your pet (JPEG, PNG).</p>
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase">Job Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  placeholder="e.g. Reliable Dog Sitter Needed for Weekend"
                  required
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-[13px] text-slate-700 focus:outline-none focus:border-[#1a2e35] transition-all"
                />
              </div>
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase">Description *</label>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Describe what you need, your pet's routine, special requirements..."
                  required
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-[13px] text-slate-700 focus:outline-none focus:border-[#1a2e35] transition-all resize-none"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase">Location *</label>
                <div className="h-48 rounded-xl overflow-hidden border border-slate-200 mb-2 relative group">
                  <MapContainer
                    center={[mapLat, mapLng]}
                    zoom={13}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker
                      position={[mapLat, mapLng]}
                      icon={blackMarkerIcon}
                      draggable={true}
                      eventHandlers={{
                        dragend: async (e: any) => {
                          const marker = e.target;
                          if (marker != null) {
                            const position = marker.getLatLng();
                            setMapLat(position.lat);
                            setMapLng(position.lng);
                            try {
                              const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.lat}&lon=${position.lng}`);
                              const data = await res.json();
                              if (data && data.display_name) {
                                setForm(f => ({ ...f, location: data.display_name }));
                              }
                            } catch (err) {
                              console.error("Reverse geocoding error:", err);
                            }
                          }
                        }
                      }}
                    />
                    <MapRecenter lat={mapLat} lng={mapLng} />
                    <MapEventsHandler
                      onMapClick={async (lat, lng) => {
                        setMapLat(lat);
                        setMapLng(lng);
                        try {
                          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
                          const data = await res.json();
                          if (data && data.display_name) {
                            setForm(f => ({ ...f, location: data.display_name }));
                          }
                        } catch (err) {
                          console.error("Reverse geocoding error:", err);
                        }
                      }}
                    />
                  </MapContainer>
                  <div className="absolute top-2 right-2 z-[1000] bg-[#111c1e] text-white px-3 py-1 rounded text-[10px] font-bold shadow pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
                    🖱️ Click or Drag Marker to Select Location
                  </div>
                  <button
                    type="button"
                    onClick={handleLocateMe}
                    disabled={isLocating}
                    className="absolute bottom-4 right-4 z-[1000] bg-white border border-slate-200 text-[#1a2e35] p-2.5 rounded-full shadow-lg hover:bg-slate-50 transition-all flex items-center justify-center disabled:opacity-50"
                    title="Use My Location"
                  >
                    {isLocating ? <Loader2 size={18} className="animate-spin text-[#c28876]" /> : <LocateFixed size={18} />}
                  </button>
                </div>
                <input
                  type="text"
                  value={form.location}
                  onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                  placeholder="e.g. Manhattan, NY"
                  required
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-[13px] text-slate-700 focus:outline-none focus:border-[#1a2e35] transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase">Pet Type</label>
                <select
                  value={form.petType}
                  onChange={e => setForm(f => ({ ...f, petType: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-[13px] text-slate-700 focus:outline-none focus:border-[#1a2e35] transition-all bg-white"
                >
                  {['Dog', 'Cat', 'Bird', 'Fish', 'Rabbit', 'Other'].map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase">Service Required *</label>
                <select
                  value={form.serviceType}
                  onChange={e => setForm(f => ({ ...f, serviceType: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-[13px] text-slate-700 focus:outline-none focus:border-[#1a2e35] transition-all bg-white"
                >
                  {[
                    'Pet Sitting',
                    'Dog Walking',
                    'Pet Boarding',
                    'Pet Day Care',
                    'Holiday Home Sitting',
                    'Security Checks',
                    'Drop-In Visits',
                    'Pet Taxi'
                  ].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase">Start Date *</label>
                <input
                  type="date"
                  value={form.startDate}
                  onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))}
                  required
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-[13px] text-slate-700 focus:outline-none focus:border-[#1a2e35] transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase">End Date *</label>
                <input
                  type="date"
                  value={form.endDate}
                  onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))}
                  required
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-[13px] text-slate-700 focus:outline-none focus:border-[#1a2e35] transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase">Budget *</label>
                <input
                  type="text"
                  value={form.budget}
                  onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}
                  placeholder="e.g. $30/night or Negotiable"
                  required
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-[13px] text-slate-700 focus:outline-none focus:border-[#1a2e35] transition-all"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#1a2e35] text-white px-8 py-3 rounded-xl text-[13px] font-bold hover:bg-black transition-all shadow-lg active:scale-95 disabled:opacity-50 flex items-center gap-2"
              >
                {submitting ? <Loader2 size={16} className="animate-spin" /> : <PlusCircle size={16} />}
                {submitting ? (uploadingImage ? 'Uploading Images...' : 'Posting...') : 'Post Job'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('active')}
                className="px-6 py-3 border border-slate-200 text-slate-500 rounded-xl text-[13px] font-bold hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* View Applicants Modal */}
      {viewingApplicants && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-50 bg-slate-50 flex items-center justify-between sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <Users className="text-slate-400" size={18} />
                <h3 className="text-sm font-bold text-slate-900">
                  Applicants for "{viewingApplicants.title}"
                </h3>
              </div>
              <button
                onClick={() => setViewingApplicants(null)}
                className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-200/50 rounded-full transition-all"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-grow space-y-4">
              {!viewingApplicants.applicants || viewingApplicants.applicants.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <Users size={32} className="mx-auto mb-3 opacity-20" />
                  <p className="font-medium text-sm">No applicants yet.</p>
                </div>
              ) : (
                viewingApplicants.applicants.map((app, i) => (
                  <div key={app._id || i} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all">
                    <div className="flex items-center gap-3">
                      {app.avatar ? (
                        <img src={app.avatar} alt="Avatar" className="w-12 h-12 rounded-full object-cover border border-slate-200" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                          <Users size={20} />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-800">{app.firstName} {app.lastName}</h4>
                          {app.role === 'sitter' && (
                            <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 text-[9px] font-extrabold uppercase tracking-wider">
                              Sitter
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 mt-1 mb-1">
                          <div className="flex items-center gap-1">
                            <Star size={11} className="text-amber-400 fill-amber-400" />
                            <span className="text-xs font-bold text-slate-700">{app.rating || '0.0'}</span>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">({app.reviews || 0} reviews)</span>
                          </div>
                          <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">{app.completedJobs || 0} Completed Jobs</p>
                        </div>
                        <p className="text-[11px] text-slate-500">{app.email} • {app.phone || 'No phone'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto">
                      <button
                        onClick={() => handleChatWithApplicant(viewingApplicants._id, app._id, `${app.firstName} ${app.lastName}`)}
                        disabled={initiatingChat === app._id}
                        className="flex-1 md:flex-none flex justify-center items-center gap-1.5 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50 transition-all disabled:opacity-50"
                      >
                        {initiatingChat === app._id ? <Loader2 size={14} className="animate-spin" /> : <MessageSquare size={14} />} Chat
                      </button>
                      {acceptedSitters.has(app._id) ? (
                        <span className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold">
                          <Check size={13} /> Accepted
                        </span>
                      ) : (
                        <button
                          onClick={() => setPaymentTarget({
                            jobId: viewingApplicants._id,
                            jobTitle: viewingApplicants.title,
                            budget: viewingApplicants.budget,
                            applicantId: app._id,
                            applicantName: `${app.firstName} ${app.lastName}`
                          })}
                          className="flex-1 md:flex-none px-4 py-2 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-lg text-xs font-bold hover:bg-emerald-100 transition-all"
                        >
                          Accept &amp; Pay
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setViewingApplicants(null)}
                className="px-5 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-xl text-xs font-bold transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ChatBox Component */}
      {isChatOpen && chatBookingId && (
        <ChatBox
          bookingId={chatBookingId}
          onClose={() => {
            setIsChatOpen(false);
            setChatBookingId(null);
          }}
          title={chatTitle}
        />
      )}

      {/* Payment Modal */}
      {paymentTarget && (
        <PaymentModal
          target={paymentTarget}
          loading={acceptLoading}
          onPay={handleAcceptSitter}
          onClose={() => setPaymentTarget(null)}
        />
      )}

      {/* Delete Confirm Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => !deleting && setDeleteTarget(null)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-4">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
                <AlertTriangle size={26} className="text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">Delete Job?</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Are you sure you want to delete{' '}
                  <span className="font-semibold text-slate-600">"{deleteTarget.title}"</span>?
                  <br />
                  <span className="text-xs text-red-400 mt-1 inline-block">
                    All applicants will be removed. This cannot be undone.
                  </span>
                </p>
              </div>
              <div className="flex gap-3 w-full mt-2">
                <button
                  onClick={() => setDeleteTarget(null)}
                  disabled={deleting}
                  className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteJob}
                  disabled={deleting}
                  className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm font-bold hover:bg-red-600 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {deleting
                    ? <><Loader2 size={15} className="animate-spin" /> Deleting...</>
                    : <><Trash2 size={15} /> Delete Job</>
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminJobsSection;
