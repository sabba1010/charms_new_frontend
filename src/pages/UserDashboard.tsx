import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  FileText, Mail, Bell, Star, Heart, User, Power,
  ChevronRight, Calendar, Search, CheckCircle2, Clock, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import logo from '../assets/logo/OPPAS LOGO (1).png';

import BookingsSection from '../components/userdashboard/Bookings/BookingsSection';
import ProfileSection from '../components/userdashboard/Profile/ProfileSection';
import BookmarksSection from '../components/userdashboard/Bookmarks/BookmarksSection';
import ReviewsSection from '../components/userdashboard/Reviews/ReviewsSection';
import AlertsSection from '../components/userdashboard/Alerts/AlertsSection';
import MessagesSection from '../components/userdashboard/Messages/MessagesSection';
import UserNotificationsSection from '../components/userdashboard/Notifications/UserNotificationsSection';
import AdminJobsSection from '../components/admin/AdminJobsSection';

const UserDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('messages');

  // ── Approval & profile state ────────────────────────────────────────────
  const [isApproved, setIsApproved] = useState(false);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  // locked = admin hasn't approved yet
  // profile_pending = approved but profile not complete
  // ready = all unlocked
  type GateState = 'locked' | 'profile_pending' | 'ready';
  const [gateState, setGateState] = useState<GateState>('locked');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab) setActiveTab(tab);
  }, [location]);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';
        const res = await fetch(`${apiUrl}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success && data.user) {
          const u = data.user;
          const approved = !!u.isApproved;
          const profileDone = !!u.profileCompleted;
          setIsApproved(approved);
          setProfileCompleted(profileDone);
          if (!approved) {
            setGateState('locked');
          } else if (approved && !profileDone) {
            setGateState('profile_pending');
            setActiveTab('profile'); // force to profile settings
          } else {
            setGateState('ready');
          }
        }
      } catch (e) {
        console.error('Failed to check user status', e);
      } finally {
        setCheckingStatus(false);
      }
    };
    fetchStatus();
  }, []);

  const menuItems = [
    { id: 'messages', name: 'Messages', icon: <Mail className="w-5 h-5" />, group: 'MAIN' },
    { id: 'notifications', name: 'Notifications', icon: <Bell className="w-5 h-5" />, group: 'MAIN' },
    { id: 'bookings', name: 'My Bookings', icon: <Calendar className="w-5 h-5" />, group: 'LISTINGS' },
    { id: 'my-jobs', name: 'My Jobs', icon: <FileText className="w-5 h-5" />, group: 'LISTINGS' },
    { id: 'profile', name: 'Profile Settings', icon: <User className="w-5 h-5" />, group: 'ACCOUNT' },
  ];

  // Which tabs are always accessible after approval (profile settings always accessible once approved)
  const alwaysAccessible = ['profile'];

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isSuperUser');
    localStorage.removeItem('isSeller');
    localStorage.removeItem('isOwner');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('recentBooking');
    navigate('/');
  };

  // Handle tab click — block navigation if profile not done
  const handleTabClick = (id: string) => {
    if (gateState === 'profile_pending' && !alwaysAccessible.includes(id)) return;
    if (gateState === 'locked') return;
    setActiveTab(id);
    navigate(`/dashboard?tab=${id}`);
  };

  const isTabLocked = (id: string) => {
    if (gateState === 'locked') return true;
    if (gateState === 'profile_pending' && !alwaysAccessible.includes(id)) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex pt-[72px]">

      {/* ── GATE: Under Review (not approved yet) ── */}
      {gateState === 'locked' && !checkingStatus && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center backdrop-blur-md bg-white/40">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-10 rounded-3xl shadow-2xl border border-slate-100 text-center max-w-md mx-4"
          >
            <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-amber-100">
              <Clock className="w-10 h-10" />
            </div>
            <h2 className="text-[24px] font-bold text-slate-800 mb-4 font-serif">Awaiting Approval</h2>
            <p className="text-slate-500 text-[15px] leading-relaxed font-medium">
              Your account is pending admin approval. Once approved, you'll be directed to complete your profile to unlock all features.
            </p>
          </motion.div>
        </div>
      )}

      <div className={`flex flex-1 w-full transition-all duration-500 ${gateState === 'locked' && !checkingStatus ? 'blur-md pointer-events-none select-none opacity-40' : ''}`}>

        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-100 flex flex-col fixed left-0 top-[72px] bottom-0 z-20">
          <div className="p-8 border-b border-slate-50">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="Home Paw" className="h-10 w-auto" />
              <span className="text-black font-serif text-[18px] font-medium">Home Paw</span>
            </Link>
          </div>

          {/* Profile complete banner */}
          {gateState === 'profile_pending' && (
            <div className="mx-4 mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-700 font-medium leading-relaxed">
              <p className="font-bold mb-1 flex items-center gap-1.5"><CheckCircle2 size={12} /> Profile Required</p>
              <p>Complete your profile settings to unlock all dashboard features.</p>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-6">
            {['MAIN', 'LISTINGS', 'ACCOUNT'].map((group) => {
              const groupItems = menuItems.filter((item) => item.group === group);
              if (groupItems.length === 0) return null;
              return (
                <div key={group} className="mb-8">
                  <p className="text-[10px] font-bold text-slate-400 tracking-[0.15em] mb-4 ml-4">{group}</p>
                  <div className="space-y-1">
                    {groupItems.map((item) => {
                      const locked = isTabLocked(item.id);
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleTabClick(item.id)}
                          title={locked ? 'Complete your profile to unlock this section' : ''}
                          className={cn(
                            'w-full flex items-center gap-4 px-4 py-3 rounded-full text-[14px] font-medium transition-all',
                            activeTab === item.id
                              ? 'bg-[#111c1e] text-white shadow-lg'
                              : locked
                                ? 'text-slate-300 cursor-not-allowed'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                          )}
                        >
                          <span className={cn(
                            activeTab === item.id ? 'text-white' : locked ? 'text-slate-300' : 'text-slate-400'
                          )}>
                            {item.icon}
                          </span>
                          {item.name}
                          {locked && gateState !== 'locked' && (
                            <span className="ml-auto text-[9px] bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded-full font-bold uppercase">
                              Locked
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-full text-[14px] font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all mt-4"
            >
              <Power className="w-5 h-5 text-slate-400" />
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 ml-64 p-8">
          {/* Breadcrumb & Header */}
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-[32px] font-serif font-medium text-slate-900 capitalize">
              {activeTab.replace('-', ' ')}
            </h1>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-[12px] text-slate-400">
                <Link to="/" className="hover:text-slate-600">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="font-medium text-slate-600">Dashboard</span>
              </div>
              <button
                onClick={() => handleTabClick('notifications')}
                className="relative p-2.5 bg-white border border-slate-100 rounded-full shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center justify-center"
              >
                <Bell size={20} className="text-slate-600" />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#5cb85c] rounded-full border-2 border-white shadow-sm" />
              </button>
            </div>
          </div>

          {/* Profile completion CTA banner */}
          {gateState === 'profile_pending' && activeTab !== 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 bg-gradient-to-r from-[#F8F5ED] to-[#EEF2E8] border border-[#D8C89A] rounded-2xl p-6 flex items-center justify-between gap-4 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#788564]/15 rounded-full flex items-center justify-center shrink-0">
                  <User className="text-[#788564]" size={22} />
                </div>
                <div>
                  <p className="text-[14px] font-bold text-[#2D2926]">Complete Your Profile to Unlock All Features</p>
                  <p className="text-[12px] text-[#7A6E62] mt-0.5">Your account is approved! Set up your profile to access messages, bookings, and more.</p>
                </div>
              </div>
              <button
                onClick={() => handleTabClick('profile')}
                className="flex items-center gap-2 bg-[#788564] text-white px-5 py-2.5 rounded-full text-[12px] font-bold hover:bg-[#626E51] transition-all shrink-0"
              >
                Complete Now <ArrowRight size={13} />
              </button>
            </motion.div>
          )}

          {/* Content Section */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl border border-slate-100 p-8 shadow-sm min-h-[400px] relative"
            >
              {activeTab === 'profile' && <ProfileSection onProfileCompleted={() => {
                setProfileCompleted(true);
                setGateState('ready');
              }} />}
              {activeTab === 'bookmarks' && gateState === 'ready' && <BookmarksSection />}
              {activeTab === 'reviews' && gateState === 'ready' && <ReviewsSection />}
              {activeTab === 'alerts' && gateState === 'ready' && <AlertsSection />}
              {activeTab === 'messages' && gateState === 'ready' && <MessagesSection />}
              {activeTab === 'notifications' && gateState === 'ready' && <UserNotificationsSection />}
              {activeTab === 'my-jobs' && gateState === 'ready' && <AdminJobsSection />}
              {activeTab === 'bookings' && gateState === 'ready' && (
                <BookingsSection onViewMessages={() => { handleTabClick('messages'); }} />
              )}

              {/* Locked state for non-profile tabs while profile pending */}
              {gateState === 'profile_pending' && activeTab !== 'profile' && (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <User size={24} className="text-slate-300" />
                  </div>
                  <p className="text-slate-400 font-medium mb-2">This section is locked</p>
                  <p className="text-slate-400 text-sm italic">Complete your Profile Settings to unlock all features.</p>
                  <button
                    onClick={() => handleTabClick('profile')}
                    className="mt-6 flex items-center gap-2 bg-[#788564] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#626E51] transition-all"
                  >
                    Go to Profile Settings <ArrowRight size={13} />
                  </button>
                </div>
              )}

              {/* Placeholder for unimplemented tabs */}
              {gateState === 'ready' &&
                activeTab !== 'profile' &&
                activeTab !== 'bookmarks' &&
                activeTab !== 'reviews' &&
                activeTab !== 'alerts' &&
                activeTab !== 'messages' &&
                activeTab !== 'notifications' &&
                activeTab !== 'my-jobs' &&
                activeTab !== 'bookings' && (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <p className="text-slate-400 italic">No information available in {activeTab} yet.</p>
                  </div>
                )}
            </motion.div>
          </AnimatePresence>

          {/* Footer */}
          <div className="mt-20 pt-8 border-t border-slate-50 text-[13px] text-slate-400">
            <p>© All Rights Reserved.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
