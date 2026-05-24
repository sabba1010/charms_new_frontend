import React, { useState, useEffect, useRef } from 'react';
import {
  Briefcase, MapPin, Calendar, DollarSign, Clock,
  CheckCircle, XCircle, User, RefreshCw, ChevronRight,
  AlertTriangle, LogOut, Loader2, MessageCircle, Send,
  ChevronDown
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { getSocket } from '../../lib/socket';

const API_BASE = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';

interface Owner {
  _id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  email?: string;
  phone?: string;
}

interface AppliedJob {
  _id: string;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  petType: string;
  budget: string;
  status: 'Pending' | 'Active' | 'Rejected';
  applicants: string[];
  owner: Owner;
  createdAt: string;
  isAccepted?: boolean;
  isFilled?: boolean;
}

interface ChatMessage {
  _id: string;
  sender: { _id: string; firstName: string; lastName: string; avatar?: string };
  content: string;
  createdAt: string;
}

interface JobChat {
  bookingId: string | null;
  messages: ChatMessage[];
  client: { _id: string; firstName: string; lastName: string; avatar?: string } | null;
}

const statusConfig: Record<string, { label: string; bg: string; text: string; icon: React.ReactNode }> = {
  Active: { label: 'Open', bg: 'bg-emerald-50', text: 'text-emerald-600', icon: <CheckCircle size={13} /> },
  Pending: { label: 'Under Review', bg: 'bg-amber-50', text: 'text-amber-600', icon: <Clock size={13} /> },
  Rejected: { label: 'Closed', bg: 'bg-red-50', text: 'text-red-500', icon: <XCircle size={13} /> },
};

/* ─── Withdraw Confirm Modal ──────────────────────────────── */
const WithdrawModal: React.FC<{
  jobTitle: string; loading: boolean;
  onConfirm: () => void; onCancel: () => void;
}> = ({ jobTitle, loading, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onCancel} />
    <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-4">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
          <AlertTriangle size={26} className="text-red-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">Withdraw Application?</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Are you sure you want to withdraw from{' '}
            <span className="font-semibold text-slate-600">"{jobTitle}"</span>?
            <br /><span className="text-xs mt-1 inline-block">You can re-apply anytime.</span>
          </p>
        </div>
        <div className="flex gap-3 w-full mt-2">
          <button onClick={onCancel} disabled={loading}
            className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all disabled:opacity-50">
            Cancel
          </button>
          <button onClick={onConfirm} disabled={loading}
            className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm font-bold hover:bg-red-600 transition-all flex items-center justify-center gap-2 disabled:opacity-70">
            {loading ? <><Loader2 size={15} className="animate-spin" /> Withdrawing...</> : <><LogOut size={15} /> Withdraw</>}
          </button>
        </div>
      </div>
    </div>
  </div>
);

/* ─── Inline Job Chat Panel ───────────────────────────────── */
const JobChatPanel: React.FC<{ jobId: string; jobTitle: string; ownerName: string }> = ({ jobId, jobTitle, ownerName }) => {
  const [chat, setChat] = useState<JobChat | null>(null);
  const [loadingChat, setLoadingChat] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [sending, setSending] = useState(false);
  const [open, setOpen] = useState(false);
  const [acceptNotice, setAcceptNotice] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const currentUserId = user._id || user.id;

  const fetchChat = async () => {
    setLoadingChat(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/jobs/${jobId}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setChat({ bookingId: data.bookingId, messages: data.messages, client: data.client });
    } catch { /* silent */ }
    finally { setLoadingChat(false); }
  };

  const sendMessage = async () => {
    if (!chatInput.trim() || !chat?.bookingId || sending) return;
    setSending(true);
    setChatInput(''); // clear immediately for snappy UX
    try {
      const token = localStorage.getItem('token');
      await fetch(`${API_BASE}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ bookingId: chat.bookingId, content: chatInput.trim() }),
      });
      // Socket will push the message back via 'new_message' event
    } catch { /* silent */ }
    finally { setSending(false); }
  };

  // ── Initial load + Socket.io real-time ──────────────────
  useEffect(() => {
    if (open && !chat) fetchChat();
  }, [open]);

  useEffect(() => {
    if (!open || !chat?.bookingId) return;
    const socket = getSocket();
    // Join the booking room
    socket.emit('join_booking', chat.bookingId);
    // Listen for incoming messages
    const handleNewMessage = (msg: ChatMessage) => {
      setChat(prev => {
        if (!prev) return prev;
        // Deduplicate by _id
        const exists = prev.messages.some(m => m._id === msg._id);
        if (exists) return prev;
        return { ...prev, messages: [...prev.messages, msg] };
      });
    };
    socket.on('new_message', handleNewMessage);

    // Notify sitter when owner accepts & pays
    const handleAccepted = (data: { jobTitle: string; amount: number; paymentMethod: string }) => {
      setAcceptNotice(`🎉 Owner accepted your application and paid $${data.amount} via ${data.paymentMethod}! Check your bookings.`);
    };
    socket.on('booking_accepted', handleAccepted);

    return () => {
      socket.emit('leave_booking', chat.bookingId);
      socket.off('new_message', handleNewMessage);
      socket.off('booking_accepted', handleAccepted);
    };
  }, [open, chat?.bookingId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat?.messages]);

  const unread = chat?.messages.filter(m => {
    const sid = m.sender?._id || m.sender;
    return sid !== currentUserId;
  }).length || 0;

  const getImageUrl = (url?: string) => {
    if (!url) return null;
    if (url.startsWith('http') || url.startsWith('data:')) return url;
    return `${API_BASE.replace('/api', '')}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  return (
    <div className="border-t border-slate-100 bg-white">
      {/* Accepted notice banner */}
      {acceptNotice && (
        <div className="flex items-start gap-3 mx-4 mt-3 mb-1 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-sm text-emerald-700 font-medium">
          <CheckCircle size={16} className="flex-shrink-0 mt-0.5" />
          <span>{acceptNotice}</span>
          <button onClick={() => setAcceptNotice('')} className="ml-auto flex-shrink-0 text-emerald-400 hover:text-emerald-600">
            <XCircle size={15} />
          </button>
        </div>
      )}
      {/* Toggle header */}
      <button
        onClick={() => { setOpen(o => !o); if (!open && !chat) fetchChat(); }}
        className="w-full flex items-center justify-between px-6 py-3.5 hover:bg-slate-50 transition-colors group"
      >
        <div className="flex items-center gap-2.5">
          <MessageCircle size={16} className={cn('transition-colors', open ? 'text-[#111c1e]' : 'text-slate-400 group-hover:text-slate-600')} />
          <span className={cn('text-sm font-semibold transition-colors', open ? 'text-slate-800' : 'text-slate-500 group-hover:text-slate-700')}>
            Messages from Owner
          </span>
          {/* Unread badge */}
          {!open && unread > 0 && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {unread} new
            </span>
          )}
          {!open && chat && chat.messages.length > 0 && unread === 0 && (
            <span className="bg-slate-100 text-slate-500 text-[10px] font-medium px-2 py-0.5 rounded-full">
              {chat.messages.length} msg{chat.messages.length !== 1 ? 's' : ''}
            </span>
          )}
          {!open && !chat && (
            <span className="text-[11px] text-slate-300 italic">tap to load</span>
          )}
        </div>
        <ChevronDown size={15} className={cn('text-slate-400 transition-transform', open && 'rotate-180')} />
      </button>

      {/* Chat body */}
      {open && (
        <div className="border-t border-slate-50">
          {loadingChat && !chat ? (
            <div className="flex items-center justify-center gap-2 py-8 text-slate-400 text-sm">
              <Loader2 size={16} className="animate-spin" /> Loading messages...
            </div>
          ) : !chat?.bookingId ? (
            <div className="px-6 py-8 text-center">
              <MessageCircle size={28} className="text-slate-200 mx-auto mb-3" />
              <p className="text-sm text-slate-400">No conversation yet.</p>
              <p className="text-xs text-slate-300 mt-1">
                The owner hasn't initiated a chat for this job yet.
              </p>
            </div>
          ) : (
            <>
              {/* Owner info bar */}
              <div className="flex items-center gap-3 px-5 py-3 bg-slate-50/60 border-b border-slate-100">
                {chat.client?.avatar && getImageUrl(chat.client.avatar) ? (
                  <img src={getImageUrl(chat.client.avatar)!} alt="" className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200" />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center">
                    <User size={13} className="text-slate-400" />
                  </div>
                )}
                <span className="text-xs font-semibold text-slate-600">
                  {chat.client ? `${chat.client.firstName} ${chat.client.lastName}` : ownerName}
                </span>
                <span className="ml-auto text-[10px] text-slate-400 bg-white border border-slate-100 px-2 py-0.5 rounded-full">
                  Pet Owner
                </span>
              </div>

              {/* Messages */}
              <div className="px-5 py-4 space-y-3 max-h-56 overflow-y-auto bg-slate-50/20">
                {chat.messages.length === 0 ? (
                  <p className="text-center text-slate-300 text-xs italic py-4">No messages yet. Say hello!</p>
                ) : (
                  chat.messages.map(msg => {
                    const senderId = msg.sender?._id || (msg.sender as any);
                    const isMe = senderId === currentUserId;
                    return (
                      <div key={msg._id} className={cn('flex flex-col', isMe ? 'items-end' : 'items-start')}>
                        <div className={cn(
                          'max-w-[80%] px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed shadow-sm',
                          isMe
                            ? 'bg-[#111c1e] text-white rounded-tr-none'
                            : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'
                        )}>
                          {msg.content}
                        </div>
                        <span className="text-[10px] text-slate-300 mt-1 px-1">
                          {isMe ? 'You' : (msg.sender?.firstName || 'Owner')} · {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="flex items-center gap-2 px-5 py-3 border-t border-slate-100 bg-white">
                <input
                  type="text"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  placeholder="Reply to owner..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-[13px] text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-300 transition-all"
                />
                <button
                  onClick={sendMessage}
                  disabled={!chatInput.trim() || sending}
                  className={cn(
                    'w-9 h-9 rounded-full flex items-center justify-center transition-all',
                    chatInput.trim() && !sending
                      ? 'bg-[#111c1e] text-white hover:bg-black shadow-md'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  )}
                >
                  {sending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

/* ─── Main Component ───────────────────────────────────────── */
const SellerJobsSection = () => {
  const [jobs, setJobs] = useState<AppliedJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [withdrawTarget, setWithdrawTarget] = useState<AppliedJob | null>(null);
  const [withdrawing, setWithdrawing] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState('');

  const fetchAppliedJobs = async () => {
    setLoading(true); setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/jobs/applied`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setJobs(data.data);
      else setError(data.message || 'Failed to load applied jobs.');
    } catch { setError('Network error. Please try again.'); }
    finally { setLoading(false); }
  };

  const handleWithdraw = async () => {
    if (!withdrawTarget) return;
    setWithdrawing(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/jobs/${withdrawTarget._id}/withdraw`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setJobs(prev => prev.filter(j => j._id !== withdrawTarget._id));
        setWithdrawSuccess(`Application for "${withdrawTarget.title}" withdrawn.`);
        setTimeout(() => setWithdrawSuccess(''), 4000);
        if (expandedJob === withdrawTarget._id) setExpandedJob(null);
        setWithdrawTarget(null);
      } else alert(data.message || 'Failed to withdraw.');
    } catch { alert('Network error.'); }
    finally { setWithdrawing(false); }
  };

  useEffect(() => { fetchAppliedJobs(); }, []);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (loading) return (
    <div className="space-y-4">
      {[1, 2, 3].map(i => (
        <div key={i} className="bg-white rounded-xl border border-slate-100 p-6 animate-pulse shadow-sm">
          <div className="h-5 w-2/3 bg-slate-100 rounded mb-3" />
          <div className="h-3 w-1/3 bg-slate-100 rounded mb-2" />
          <div className="h-3 w-1/2 bg-slate-100 rounded" />
        </div>
      ))}
    </div>
  );

  if (error) return (
    <div className="bg-white rounded-xl border border-red-100 p-10 text-center shadow-sm">
      <XCircle size={36} className="text-red-300 mx-auto mb-3" />
      <p className="text-red-500 font-medium mb-4">{error}</p>
      <button onClick={fetchAppliedJobs}
        className="flex items-center gap-2 mx-auto px-5 py-2.5 bg-[#111c1e] text-white rounded-full text-sm font-bold hover:bg-black transition-all">
        <RefreshCw size={15} /> Retry
      </button>
    </div>
  );

  if (jobs.length === 0) return (
    <div className="bg-white rounded-xl border border-slate-100 p-16 text-center shadow-sm">
      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-5">
        <Briefcase size={28} className="text-slate-300" />
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-2">No Applied Jobs Yet</h3>
      <p className="text-slate-400 text-sm max-w-xs mx-auto mb-6">
        You haven't applied to any jobs yet. Browse available jobs and start applying!
      </p>
      <a href="/jobs-offered"
        className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#5cb85c] text-white rounded-full text-sm font-bold hover:bg-[#4cae4c] transition-all shadow-md">
        Browse Jobs <ChevronRight size={16} />
      </a>
    </div>
  );

  return (
    <>
      {withdrawTarget && (
        <WithdrawModal
          jobTitle={withdrawTarget.title}
          loading={withdrawing}
          onConfirm={handleWithdraw}
          onCancel={() => setWithdrawTarget(null)}
        />
      )}

      <div className="space-y-6">
        {/* Success toast */}
        {withdrawSuccess && (
          <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 px-5 py-3 rounded-xl text-sm font-medium shadow-sm">
            <CheckCircle size={16} className="flex-shrink-0" /> {withdrawSuccess}
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Jobs You Applied To</h2>
            <p className="text-sm text-slate-400 mt-0.5">{jobs.length} job{jobs.length !== 1 ? 's' : ''} applied</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full">
              {jobs.filter(j => j.status === 'Active').length} Open
            </span>
            <span className="px-3 py-1 bg-amber-50 text-amber-600 text-xs font-bold rounded-full">
              {jobs.filter(j => j.status === 'Pending').length} Pending
            </span>
            <button onClick={fetchAppliedJobs}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-full transition-all" title="Refresh">
              <RefreshCw size={16} />
            </button>
          </div>
        </div>

        {/* Job Cards */}
        <div className="space-y-4">
          {jobs.map(job => {
            const statusInfo = statusConfig[job.status] || statusConfig['Pending'];
            const isExpanded = expandedJob === job._id;
            const isAccepted = !!job.isAccepted;
            const canWithdraw = job.status !== 'Rejected' && !isAccepted;
            const ownerName = job.owner ? `${job.owner.firstName} ${job.owner.lastName}` : 'Owner';

            return (
              <div key={job._id} className="bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden">

                {/* Main Row */}
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      {/* Title + badges */}
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-base font-bold text-slate-800 leading-tight">{job.title}</h3>
                        <span className={cn('flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide', statusInfo.bg, statusInfo.text)}>
                          {statusInfo.icon} {statusInfo.label}
                        </span>
                        {isAccepted && (
                          <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide bg-[#111c1e] text-white">
                            <CheckCircle size={13} /> Accepted
                          </span>
                        )}
                        <span className="px-2.5 py-0.5 bg-slate-50 text-slate-400 text-[11px] font-bold rounded-full uppercase tracking-wide">
                          {job.petType}
                        </span>
                      </div>
                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-400">
                        <div className="flex items-center gap-1.5"><MapPin size={13} className="text-slate-300" />{job.location}</div>
                        <div className="flex items-center gap-1.5"><Calendar size={13} className="text-slate-300" />{formatDate(job.startDate)} — {formatDate(job.endDate)}</div>
                        <div className="flex items-center gap-1.5 text-[#5cb85c] font-semibold"><DollarSign size={13} />{job.budget}</div>
                        <div className="flex items-center gap-1.5"><Clock size={13} className="text-slate-300" />Applied {formatDate(job.createdAt)}</div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {canWithdraw && (
                        <button onClick={() => setWithdrawTarget(job)}
                          className="flex items-center gap-1.5 px-4 py-2 border border-red-100 text-red-400 rounded-lg text-sm font-medium hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all">
                          <LogOut size={14} /> Withdraw
                        </button>
                      )}
                      <button onClick={() => setExpandedJob(isExpanded ? null : job._id)}
                        className="flex items-center gap-1.5 px-4 py-2 border border-slate-100 text-slate-500 rounded-lg text-sm font-medium hover:bg-slate-50 hover:text-slate-800 transition-all">
                        {isExpanded ? 'Hide' : 'Details'}
                        <ChevronRight size={15} className={cn('transition-transform', isExpanded && 'rotate-90')} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-slate-50 bg-slate-50/40 px-6 py-5 space-y-4">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Job Description</p>
                      <p className="text-sm text-slate-600 leading-relaxed">{job.description}</p>
                    </div>
                    {job.owner && (
                      <div className="flex items-center gap-4 bg-white rounded-lg border border-slate-100 p-4">
                        {job.owner.avatar ? (
                          <img src={job.owner.avatar} alt="" className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                            <User size={18} className="text-slate-400" />
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5">Posted By</p>
                          <p className="text-sm font-bold text-slate-800">{ownerName}</p>
                          {job.owner.email && <p className="text-xs text-slate-400">{job.owner.email}</p>}
                        </div>
                        <div className="ml-auto">
                          <span className="px-3 py-1 bg-[#111c1e]/5 text-[#111c1e] text-xs font-bold rounded-full">Pet Owner</span>
                        </div>
                      </div>
                    )}
                    {isAccepted ? (
                      <div className="flex items-start gap-2.5 bg-emerald-50 border border-emerald-100 rounded-lg px-4 py-3">
                        <CheckCircle size={15} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-slate-700 font-medium">
                          The owner accepted you for this job. Withdraw is not allowed anymore.
                        </p>
                      </div>
                    ) : canWithdraw ? (
                      <div className="flex items-start justify-between gap-3 bg-[#5cb85c]/5 border border-[#5cb85c]/20 rounded-lg px-4 py-3">
                        <div className="flex items-start gap-2.5">
                          <CheckCircle size={15} className="text-[#5cb85c] mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-slate-600">Your application is submitted. The owner will contact you if interested.</p>
                        </div>
                        <button onClick={() => setWithdrawTarget(job)}
                          className="flex-shrink-0 flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-600 transition-colors whitespace-nowrap">
                          <LogOut size={12} /> Withdraw
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-start gap-2.5 bg-red-50/60 border border-red-100 rounded-lg px-4 py-3">
                        <XCircle size={15} className="text-red-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-slate-500">This job is closed. Applications are no longer accepted.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* ── Inline Message Panel ── */}
                <JobChatPanel jobId={job._id} jobTitle={job.title} ownerName={ownerName} />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="pt-2">
          <a href="/jobs-offered"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-700 font-medium transition-colors">
            <Briefcase size={15} /> Browse more jobs <ChevronRight size={14} />
          </a>
        </div>
      </div>
    </>
  );
};

export default SellerJobsSection;
