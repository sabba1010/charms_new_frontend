import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  FileText, Mail, Bell, Star, Heart, User, Power,
  ChevronRight, Calendar, Search
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

  // Sync tab with URL hash or state if needed
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab) setActiveTab(tab);
  }, [location]);

  const menuItems = [
    { id: 'messages', name: 'Messages', icon: <Mail className="w-5 h-5" />, group: 'MAIN' },
    { id: 'notifications', name: 'Notifications', icon: <Bell className="w-5 h-5" />, group: 'MAIN' },
    // { id: 'alerts', name: 'Search Alerts', icon: <Search className="w-5 h-5" />, group: 'MAIN' },
    { id: 'bookings', name: 'My Bookings', icon: <Calendar className="w-5 h-5" />, group: 'LISTINGS' },
    { id: 'my-jobs', name: 'My Jobs', icon: <FileText className="w-5 h-5" />, group: 'LISTINGS' },
    // { id: 'reviews', name: 'Reviews', icon: <Star className="w-5 h-5" />, group: 'LISTINGS' },
    // { id: 'bookmarks', name: 'Bookmarks', icon: <Heart className="w-5 h-5" />, group: 'LISTINGS' },
    { id: 'profile', name: 'Profile Settings', icon: <User className="w-5 h-5" />, group: 'ACCOUNT' },
  ];

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

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex pt-[72px]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-100 flex flex-col fixed left-0 top-[72px] bottom-0 z-20">
        <div className="p-8 border-b border-slate-50">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Home Paw" className="h-10 w-auto" />
            <span className="text-black font-serif text-[18px] font-medium">Home Paw</span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {['MAIN', 'LISTINGS', 'ACCOUNT'].map((group) => {
            const groupItems = menuItems.filter((item) => item.group === group);
            if (groupItems.length === 0) return null;
            return (
              <div key={group} className="mb-8">
                <p className="text-[10px] font-bold text-slate-400 tracking-[0.15em] mb-4 ml-4">
                  {group}
                </p>
                <div className="space-y-1">
                  {groupItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        navigate(`/dashboard?tab=${item.id}`);
                      }}
                      className={cn(
                        "w-full flex items-center gap-4 px-4 py-3 rounded-full text-[14px] font-medium transition-all",
                        activeTab === item.id
                          ? "bg-[#111c1e] text-white shadow-lg"
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                      <span className={cn(activeTab === item.id ? "text-white" : "text-slate-400")}>
                        {item.icon}
                      </span>
                      {item.name}
                    </button>
                  ))}
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
              onClick={() => {
                setActiveTab('notifications');
                navigate('/dashboard?tab=notifications');
              }}
              className="relative p-2.5 bg-white border border-slate-100 rounded-full shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center justify-center"
            >
              <Bell size={20} className="text-slate-600" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#5cb85c] rounded-full border-2 border-white shadow-sm" />
            </button>
          </div>
        </div>

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
            {activeTab === 'profile' && <ProfileSection />}
            {activeTab === 'bookmarks' && <BookmarksSection />}
            {activeTab === 'reviews' && <ReviewsSection />}
            {activeTab === 'alerts' && <AlertsSection />}
            {activeTab === 'messages' && <MessagesSection />}
            {activeTab === 'notifications' && <UserNotificationsSection />}
            {activeTab === 'my-jobs' && <AdminJobsSection />}
            {activeTab === 'bookings' && <BookingsSection onViewMessages={() => { setActiveTab('messages'); navigate('/dashboard?tab=messages'); }} />}

            {/* Other tabs placeholders */}
            {activeTab !== 'profile' &&
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
  );
};

export default UserDashboard;
