import React, { useEffect, useState } from 'react';
import {
  Search, User, Mail, Shield, Ban, Trash2, Loader2,
  ChevronDown, ChevronUp, Calendar, CheckCircle, XCircle, Clock
} from 'lucide-react';
import { cn } from '../../lib/utils';

const API_BASE = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';

interface AdminUser {
  _id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isBlocked?: boolean;
  avatar?: string;
  createdAt: string;
  sitterBookingsCount: number;
  clientBookingsCount: number;
  listingsCount: number;
}

interface BookingRow {
  _id: string;
  date: string;
  time: string;
  status: string;
  totalAmount?: number;
  petCount?: number;
  customerName?: string;
  listing?: { title?: string };
  client?: { firstName?: string; lastName?: string; username?: string };
  sitter?: { firstName?: string; lastName?: string; username?: string };
}

const roleBadge = (role: string) => {
  const styles: Record<string, string> = {
    admin: 'bg-slate-800 text-white',
    superuser: 'bg-purple-100 text-purple-700',
    sitter: 'bg-emerald-50 text-emerald-700',
    owner: 'bg-blue-50 text-blue-700',
  };
  return styles[role] || 'bg-slate-100 text-slate-600';
};

const statusIcon = (status: string) => {
  if (status === 'Approved') return <CheckCircle size={12} className="text-emerald-500" />;
  if (status === 'Cancelled') return <XCircle size={12} className="text-rose-500" />;
  return <Clock size={12} className="text-amber-500" />;
};

const AdminAllUsersSection: React.FC = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [bookingsLoading, setBookingsLoading] = useState<string | null>(null);
  const [sitterBookings, setSitterBookings] = useState<BookingRow[]>([]);
  const [clientBookings, setClientBookings] = useState<BookingRow[]>([]);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const token = localStorage.getItem('token');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setUsers(data.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const loadBookings = async (userId: string) => {
    if (expandedId === userId) {
      setExpandedId(null);
      return;
    }
    setExpandedId(userId);
    setSitterBookings([]);
    setClientBookings([]);
    setBookingsLoading(userId);
    try {
      const res = await fetch(`${API_BASE}/admin/users/${userId}/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setSitterBookings(data.data.asSitter || []);
        setClientBookings(data.data.asClient || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setBookingsLoading(null);
    }
  };

  const toggleBlock = async (user: AdminUser) => {
    const action = user.isBlocked ? 'unblock' : 'block';
    if (!confirm(`${action === 'block' ? 'Block' : 'Unblock'} ${user.firstName} ${user.lastName}?`)) return;
    setActionLoading(user._id);
    try {
      const res = await fetch(`${API_BASE}/admin/users/${user._id}/block`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setUsers((prev) =>
          prev.map((u) => (u._id === user._id ? { ...u, isBlocked: data.data.isBlocked } : u))
        );
      } else alert(data.message);
    } catch {
      alert('Network error');
    } finally {
      setActionLoading(null);
    }
  };

  const deleteUser = async (user: AdminUser) => {
    if (!confirm(`Delete ${user.firstName} ${user.lastName}? This cannot be undone.`)) return;
    setActionLoading(user._id);
    try {
      const res = await fetch(`${API_BASE}/admin/users/${user._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setUsers((prev) => prev.filter((u) => u._id !== user._id));
        if (expandedId === user._id) setExpandedId(null);
      } else alert(data.message);
    } catch {
      alert('Network error');
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    const name = `${u.firstName} ${u.lastName}`.toLowerCase();
    return (
      name.includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.username.toLowerCase().includes(q) ||
      u.role.toLowerCase().includes(q)
    );
  });

  const nameOf = (b: BookingRow, as: 'client' | 'sitter') => {
    const p = as === 'client' ? b.client : b.sitter;
    if (p) return `${p.firstName || ''} ${p.lastName || ''}`.trim() || p.username;
    return b.customerName || '—';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">All Users</h2>
          <p className="text-sm text-slate-500">
            Manage users, block accounts, and view sitter bookings
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, role..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-slate-300" />
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="divide-y divide-slate-50">
            {filtered.length === 0 ? (
              <p className="p-12 text-center text-slate-400 italic">No users found.</p>
            ) : (
              filtered.map((user) => {
                const isExpanded = expandedId === user._id;
                const isAdmin = user.role === 'admin' || user.role === 'superuser';

                return (
                  <div key={user._id}>
                    <div className="p-5 flex flex-col lg:flex-row lg:items-center gap-4">
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden shrink-0">
                          {user.avatar ? (
                            <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <User size={22} className="text-slate-400" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-bold text-slate-900">
                              {user.firstName} {user.lastName}
                            </p>
                            <span className={cn('text-[10px] font-bold uppercase px-2 py-0.5 rounded-full', roleBadge(user.role))}>
                              {user.role}
                            </span>
                            {user.isBlocked && (
                              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-rose-100 text-rose-600 flex items-center gap-1">
                                <Ban size={10} /> Blocked
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                            <Mail size={11} /> {user.email}
                          </p>
                          <p className="text-[11px] text-slate-400 mt-1">
                            Sitter bookings: <strong className="text-slate-700">{user.sitterBookingsCount}</strong>
                            {' · '}
                            As owner: <strong className="text-slate-700">{user.clientBookingsCount}</strong>
                            {' · '}
                            Listings: <strong className="text-slate-700">{user.listingsCount}</strong>
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        <button
                          onClick={() => loadBookings(user._id)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50"
                        >
                          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          Bookings
                        </button>
                        {!isAdmin && (
                          <>
                            <button
                              disabled={actionLoading === user._id}
                              onClick={() => toggleBlock(user)}
                              className={cn(
                                'flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold transition-all',
                                user.isBlocked
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : 'bg-amber-50 text-amber-700 border border-amber-200'
                              )}
                            >
                              {actionLoading === user._id ? (
                                <Loader2 size={14} className="animate-spin" />
                              ) : (
                                <Ban size={14} />
                              )}
                              {user.isBlocked ? 'Unblock' : 'Block'}
                            </button>
                            <button
                              disabled={actionLoading === user._id}
                              onClick={() => deleteUser(user)}
                              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-rose-50 text-rose-600 border border-rose-100 text-sm font-bold hover:bg-rose-100"
                            >
                              <Trash2 size={14} /> Delete
                            </button>
                          </>
                        )}
                        {isAdmin && (
                          <span className="flex items-center gap-1 text-xs text-slate-400 px-2">
                            <Shield size={12} /> Protected
                          </span>
                        )}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="px-5 pb-5 bg-slate-50/80 border-t border-slate-100">
                        {bookingsLoading === user._id ? (
                          <div className="py-8 flex justify-center">
                            <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
                            <div>
                              <h4 className="text-[13px] font-bold text-slate-800 mb-3 uppercase tracking-wider">
                                Sitter Bookings ({sitterBookings.length})
                              </h4>
                              {sitterBookings.length === 0 ? (
                                <p className="text-sm text-slate-400 italic">No sitter bookings.</p>
                              ) : (
                                <div className="space-y-2">
                                  {sitterBookings.map((b) => (
                                    <div
                                      key={b._id}
                                      className="bg-white rounded-lg border border-slate-100 p-3 text-sm"
                                    >
                                      <div className="flex items-center justify-between gap-2">
                                        <span className="font-semibold text-slate-800">
                                          {b.listing?.title || 'Job / Listing'}
                                        </span>
                                        <span className="flex items-center gap-1 text-[11px] font-bold uppercase text-slate-500">
                                          {statusIcon(b.status)} {b.status}
                                        </span>
                                      </div>
                                      <p className="text-slate-500 text-xs mt-1">
                                        Owner: {nameOf(b, 'client')} · {b.date} {b.time !== 'N/A' ? `at ${b.time}` : ''}
                                      </p>
                                      <p className="text-xs text-slate-400 mt-0.5">
                                        {b.petCount} pet(s) · ${Number(b.totalAmount || 0).toFixed(2)}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div>
                              <h4 className="text-[13px] font-bold text-slate-800 mb-3 uppercase tracking-wider">
                                Bookings as Owner ({clientBookings.length})
                              </h4>
                              {clientBookings.length === 0 ? (
                                <p className="text-sm text-slate-400 italic">No bookings as owner.</p>
                              ) : (
                                <div className="space-y-2">
                                  {clientBookings.map((b) => (
                                    <div
                                      key={b._id}
                                      className="bg-white rounded-lg border border-slate-100 p-3 text-sm"
                                    >
                                      <div className="flex items-center justify-between gap-2">
                                        <span className="font-semibold text-slate-800">
                                          {b.listing?.title || 'Listing'}
                                        </span>
                                        <span className="flex items-center gap-1 text-[11px] font-bold uppercase text-slate-500">
                                          {statusIcon(b.status)} {b.status}
                                        </span>
                                      </div>
                                      <p className="text-slate-500 text-xs mt-1">
                                        Sitter: {nameOf(b, 'sitter')} · <Calendar size={10} className="inline" /> {b.date}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAllUsersSection;
