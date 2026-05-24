import React, { useEffect, useState } from 'react';
import {
  Search, MapPin, Calendar,
  Check, X, Briefcase, User, DollarSign,
  Loader2, AlertCircle, Eye, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  owner?: {
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
  };
}

const AdminAllJobsSection = () => {
  const [currentTab, setCurrentTab] = useState<'pending' | 'rejected' | 'active'>('pending');
  const [searchQuery, setSearchQuery] = useState('');

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [viewingJob, setViewingJob] = useState<Job | null>(null);

  const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';
  const token = localStorage.getItem('token');

  const fetchJobs = async () => {
    try {
      const res = await fetch(`${apiUrl}/jobs`, {
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
    fetchJobs();
  }, []);

  const updateStatus = async (id: string, status: 'Active' | 'Rejected' | 'Pending') => {
    setUpdating(id);
    try {
      const res = await fetch(`${apiUrl}/jobs/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        setJobs(prev => prev.map(j => j._id === id ? { ...j, status } : j));
        if (viewingJob && viewingJob._id === id) {
          setViewingJob({ ...viewingJob, status });
        }
      }
    } catch (err) {
      console.error('Error updating job status:', err);
    } finally {
      setUpdating(null);
    }
  };

  const filteredJobs = jobs.filter(item => {
    const matchesTab = item.status.toLowerCase() === currentTab;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.owner?.firstName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.owner?.lastName || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const pendingCount = jobs.filter(b => b.status === 'Pending').length;
  const rejectedCount = jobs.filter(b => b.status === 'Rejected').length;
  const activeCount = jobs.filter(b => b.status === 'Active').length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-slate-400">
        <Loader2 size={22} className="animate-spin mr-3" />
        <span className="text-sm font-medium">Loading jobs...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20 relative">
      {/* Header & Filter Bar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-slate-50 text-slate-800">
            <Briefcase size={20} />
          </div>
          <div>
            <h2 className="text-[16px] font-bold text-slate-900">All Jobs System</h2>
            <p className="text-[12px] text-slate-400 mt-0.5">Admin command center for active, pending and rejected jobs.</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-grow lg:w-72">
            <input
              type="text"
              placeholder="Search by title or owner..."
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
          Pending Jobs
          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${currentTab === 'pending' ? 'bg-[#f0ad4e] text-white' : 'bg-slate-100 text-slate-400'}`}>
            {pendingCount}
          </span>
        </button>
        <button
          onClick={() => setCurrentTab('rejected')}
          className={`flex items-center gap-3 pb-4 px-6 text-sm font-bold border-b-2 transition-all relative ${currentTab === 'rejected' ? 'text-[#d9534f] border-[#d9534f]' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
        >
          Rejected Jobs
          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${currentTab === 'rejected' ? 'bg-[#d9534f] text-white' : 'bg-slate-100 text-slate-400'}`}>
            {rejectedCount}
          </span>
        </button>
        <button
          onClick={() => setCurrentTab('active')}
          className={`flex items-center gap-3 pb-4 px-6 text-sm font-bold border-b-2 transition-all relative ${currentTab === 'active' ? 'text-[#5cb85c] border-[#5cb85c]' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
        >
          Active Jobs
          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${currentTab === 'active' ? 'bg-[#5cb85c] text-white' : 'bg-slate-100 text-slate-400'}`}>
            {activeCount}
          </span>
        </button>
      </div>

      {/* Main Reservation List Panel */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-100">
          <AnimatePresence mode="popLayout">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <motion.div
                  key={job._id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-8 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-8 group hover:bg-slate-50/20 transition-all duration-300"
                >

                  {/* Left: Client Profile Avatar & Main booking Info */}
                  <div className="flex flex-col md:flex-row items-start gap-5 flex-grow cursor-pointer" onClick={() => setViewingJob(job)}>
                    <div className="relative">
                      {job.owner?.avatar ? (
                        <div className="w-14 h-14 rounded-full overflow-hidden border border-slate-200 bg-slate-50">
                          <img src={job.owner.avatar} alt="Owner" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-14 h-14 rounded-full overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center">
                          <User className="text-slate-400" />
                        </div>
                      )}

                      <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full text-white text-[9px] font-extrabold flex items-center justify-center border-2 border-white shadow-sm ${job.status === 'Active' ? 'bg-[#5cb85c]' : job.status === 'Pending' ? 'bg-[#f0ad4e]' : 'bg-[#d9534f]'}`}>
                        {job.status === 'Active' ? 'A' : job.status === 'Pending' ? 'P' : 'R'}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h4 className="text-[15px] font-bold text-slate-800 hover:text-[#1a2e35] transition-colors">
                          {job.owner ? `${job.owner.firstName} ${job.owner.lastName}` : 'Unknown'}
                        </h4>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100/50">
                          Pet Owner
                        </span>
                      </div>

                      <p className="text-[14px] text-slate-800 font-semibold mb-2">
                        Posted <span className="text-[#3b82f6] hover:underline font-bold">"{job.title}"</span> in <span className="text-slate-600 font-bold">{job.location}</span>
                      </p>

                      {job.petImages && job.petImages.length > 0 && (
                        <div className={`grid gap-2 mb-4 w-full max-w-lg ${job.petImages.length === 1 ? 'grid-cols-1' : job.petImages.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                          {job.petImages.map((img, idx) => (
                            <div key={idx} className={`w-full ${job.petImages!.length === 1 ? 'h-48' : 'h-24'} rounded-xl overflow-hidden bg-slate-50 border border-slate-100`}>
                              <img src={img} alt={`${job.title} ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                            </div>
                          ))}
                        </div>
                      )}

                      <p className="text-[12px] text-slate-500 leading-relaxed max-w-2xl line-clamp-2">
                        {job.description}
                      </p>

                      {/* Booking meta info */}
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-semibold pt-1">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={13} className="text-slate-300" />
                          {job.startDate} → {job.endDate}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                        <span className="flex items-center gap-1.5">
                          🐾 {job.petType}
                        </span>
                        {job.budget && (
                          <>
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                            <span className="flex items-center gap-1.5">
                              💰 {job.budget}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-row xl:flex-col items-center xl:items-end justify-between xl:justify-center gap-3 w-full xl:w-48 border-t xl:border-t-0 pt-4 xl:pt-0 border-slate-100">
                    <button
                      onClick={() => setViewingJob(job)}
                      className="w-full flex items-center justify-center gap-1.5 border border-slate-200 text-slate-600 hover:bg-slate-50 px-4 py-2 rounded-xl text-xs font-bold transition-all mb-2"
                    >
                      <Eye size={13} /> View Details
                    </button>

                    {job.status === 'Pending' && (
                      <div className="flex items-center gap-2 w-full justify-end">
                        <button
                          onClick={() => updateStatus(job._id, 'Active')}
                          disabled={updating === job._id}
                          className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white px-2 py-2 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 disabled:opacity-50"
                        >
                          {updating === job._id ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />}
                        </button>
                        <button
                          onClick={() => updateStatus(job._id, 'Rejected')}
                          disabled={updating === job._id}
                          className="flex-1 flex items-center justify-center gap-1.5 bg-rose-500 hover:bg-rose-600 text-white px-2 py-2 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 disabled:opacity-50"
                        >
                          {updating === job._id ? <Loader2 size={13} className="animate-spin" /> : <X size={13} />}
                        </button>
                      </div>
                    )}

                    {job.status === 'Active' && (
                      <div className="w-full text-right">
                        <span className="text-[11px] font-bold px-2 py-1 rounded-lg border bg-emerald-50 text-emerald-600 border-emerald-100 block text-center mb-2">
                          Active
                        </span>
                        <button
                          onClick={() => updateStatus(job._id, 'Rejected')}
                          disabled={updating === job._id}
                          className="w-full flex items-center justify-center gap-1.5 border border-rose-200 text-rose-500 hover:bg-rose-50 px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 disabled:opacity-50"
                        >
                          {updating === job._id ? <Loader2 size={13} className="animate-spin" /> : <X size={13} />} Revoke
                        </button>
                      </div>
                    )}

                    {job.status === 'Rejected' && (
                      <div className="w-full text-right">
                        <span className="text-[11px] font-bold px-2 py-1 rounded-lg border bg-rose-50 text-rose-600 border-rose-100 block text-center mb-2">
                          Rejected
                        </span>
                        <button
                          onClick={() => updateStatus(job._id, 'Active')}
                          disabled={updating === job._id}
                          className="w-full flex items-center justify-center gap-1.5 border border-emerald-200 text-emerald-600 hover:bg-emerald-50 px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 disabled:opacity-50"
                        >
                          {updating === job._id ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />} Re-Approve
                        </button>
                      </div>
                    )}
                  </div>

                </motion.div>
              ))
            ) : (
              <div className="p-20 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">💼</span>
                </div>
                <h3 className="text-slate-800 font-bold text-sm">No Jobs Found</h3>
                <p className="text-slate-400 text-xs mt-1">There are no jobs matching this status category.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Statistics */}
        <div className="p-8 border-t border-slate-50 text-center bg-slate-50/50">
          <p className="text-slate-400 text-[13px] font-bold uppercase tracking-wider">
            Consolidated total: {filteredJobs.length} {currentTab} {filteredJobs.length === 1 ? 'job' : 'jobs'}
          </p>
        </div>
      </div>

      {/* View Job Modal */}
      <AnimatePresence>
        {viewingJob && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="px-8 py-5 border-b border-slate-50 bg-slate-50 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <Briefcase className="text-slate-400" size={20} />
                  <h3 className="text-[16px] font-bold text-slate-900">Job Details</h3>
                </div>
                <button
                  onClick={() => setViewingJob(null)}
                  className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-200/50 rounded-full transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="p-8 overflow-y-auto flex-grow space-y-8">
                {/* Owner Info */}
                <div className="flex items-center gap-4 p-4 bg-blue-50/50 border border-blue-100 rounded-2xl">
                  {viewingJob.owner?.avatar ? (
                    <img src={viewingJob.owner.avatar} className="w-12 h-12 rounded-full object-cover shadow-sm" alt="Owner" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center">
                      <User className="text-slate-500" />
                    </div>
                  )}
                  <div>
                    <h4 className="text-[14px] font-bold text-slate-900">{viewingJob.owner?.firstName} {viewingJob.owner?.lastName}</h4>
                    <p className="text-[12px] text-slate-500">{viewingJob.owner?.email}</p>
                  </div>
                  <div className="ml-auto text-right">
                    <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${viewingJob.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                        viewingJob.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                          'bg-rose-100 text-rose-700'
                      }`}>
                      {viewingJob.status}
                    </span>
                  </div>
                </div>

                {/* Images */}
                {viewingJob.petImages && viewingJob.petImages.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Pet Photos</h4>
                    <div className={`grid gap-3 w-full ${viewingJob.petImages.length === 1 ? 'grid-cols-1' : viewingJob.petImages.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                      {viewingJob.petImages.map((img, idx) => (
                        <div key={idx} className={`w-full ${viewingJob.petImages!.length === 1 ? 'h-64' : 'h-32'} rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 shadow-sm`}>
                          <a href={img} target="_blank" rel="noreferrer">
                            <img src={img} alt={`Pet ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform cursor-zoom-in" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Job Info */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2 font-serif">{viewingJob.title}</h2>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 font-medium">
                      <span className="flex items-center gap-1.5"><MapPin size={16} className="text-[#1a2e35]/60" /> {viewingJob.location}</span>
                      <span className="flex items-center gap-1.5"><Calendar size={16} className="text-[#1a2e35]/60" /> {viewingJob.startDate} to {viewingJob.endDate}</span>
                      <span className="flex items-center gap-1.5">🐾 {viewingJob.petType}</span>
                      <span className="flex items-center gap-1.5"><DollarSign size={16} className="text-emerald-500" /> {viewingJob.budget}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Job Description</h4>
                    <div className="bg-slate-50 p-6 rounded-2xl text-[14px] text-slate-700 leading-relaxed whitespace-pre-wrap border border-slate-100">
                      {viewingJob.description}
                    </div>
                  </div>
                </div>

              </div>

              {/* Actions Footer */}
              <div className="px-8 py-5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3 sticky bottom-0">
                <button
                  onClick={() => setViewingJob(null)}
                  className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-xl text-[13px] font-bold transition-all"
                >
                  Close View
                </button>
                {viewingJob.status === 'Pending' && (
                  <button
                    onClick={() => updateStatus(viewingJob._id, 'Active')}
                    disabled={updating === viewingJob._id}
                    className="px-6 py-2.5 bg-emerald-500 text-white hover:bg-emerald-600 rounded-xl text-[13px] font-bold transition-all shadow-sm active:scale-95 flex items-center gap-2"
                  >
                    {updating === viewingJob._id ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />} Approve Job
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AdminAllJobsSection;
