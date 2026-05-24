import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert, Users, Database, Globe,
  Settings, Key, BarChart3, Bell,
  Search, Filter, Lock, Unlock, UserPlus,
  ChevronRight, Activity, FileText, Mail,
  Star, Heart, User, Power
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import { cn } from '../lib/utils';
import logo from '../assets/logo/OPPAS LOGO (1).png';

// User elements from userdashboard folder
import BookingsSection from '../components/userdashboard/Bookings/BookingsSection';
import ProfileSection from '../components/userdashboard/Profile/ProfileSection';
import BookmarksSection from '../components/userdashboard/Bookmarks/BookmarksSection';
import ReviewsSection from '../components/userdashboard/Reviews/ReviewsSection';
import AlertsSection from '../components/userdashboard/Alerts/AlertsSection';
import MessagesSection from '../components/userdashboard/Messages/MessagesSection';

const SuperUserDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('my-bookings');

  const menuItems = [
    { id: 'my-bookings', name: 'My Bookings', icon: <FileText className="w-5 h-5" />, group: 'MAIN' },
    { id: 'messages', name: 'Messages', icon: <Mail className="w-5 h-5" />, group: 'MAIN' },
    { id: 'alerts', name: 'Search Alerts', icon: <Bell className="w-5 h-5" />, group: 'MAIN' },
    { id: 'reviews', name: 'Reviews', icon: <Star className="w-5 h-5" />, group: 'LISTINGS' },
    { id: 'bookmarks', name: 'Bookmarks', icon: <Heart className="w-5 h-5" />, group: 'LISTINGS' },
    { id: 'profile', name: 'My Profile', icon: <User className="w-5 h-5" />, group: 'ACCOUNT' },
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

  const getPageTitle = () => {
    switch (activeTab) {
      case 'my-bookings': return 'My Bookings';
      case 'messages': return 'Messages';
      case 'profile': return 'My Profile';
      case 'bookmarks': return 'Bookmarks';
      case 'reviews': return 'Reviews';
      case 'alerts': return 'Search Alerts';
      default: return activeTab.replace('-', ' ');
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex pt-[72px]">
      {/* Sidebar - Root Style */}
      <aside className="w-64 bg-white border-r border-slate-100 flex flex-col fixed left-0 top-[72px] bottom-0 z-20">
        <div className="p-8 border-b border-slate-50">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Home Paw" className="h-10 w-auto" />
            <span className="text-black font-serif text-[18px] font-medium">Home Paw</span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          {['MAIN', 'LISTINGS', 'ACCOUNT'].map((group) => (
            <div key={group} className="mb-8 last:mb-0">
              <p className="text-[10px] font-bold text-slate-400 tracking-[0.15em] mb-4 ml-4 uppercase">
                {group}
              </p>
              <div className="space-y-1">
                {menuItems
                  .filter((item) => item.group === group)
                  .map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={cn(
                        "w-full flex items-center gap-4 px-4 py-3 rounded-full text-[14px] font-medium transition-all group",
                        activeTab === item.id
                          ? "bg-[#111c1e] text-white shadow-lg"
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                      <span className={cn(
                        "transition-colors",
                        activeTab === item.id ? "text-white" : "text-slate-400 group-hover:text-slate-600"
                      )}>
                        {item.icon}
                      </span>
                      <span className="flex-1 text-left">{item.name}</span>
                    </button>
                  ))}
              </div>
            </div>
          ))}

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-full text-[14px] font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all mt-4 mb-8"
          >
            <Power className="w-5 h-5 text-slate-400" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-6 lg:p-8">
        {/* Header & Breadcrumb */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-[32px] font-serif font-medium text-slate-900 leading-tight capitalize">
              {getPageTitle()}
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[12px] text-slate-400">
              <Link to="/" className="hover:text-slate-600 transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="font-medium text-slate-600">Dashboard</span>
            </div>
            <button className="relative p-2.5 bg-white border border-slate-100 rounded-full shadow-sm hover:shadow-md transition-all">
              <Bell size={20} className="text-slate-600" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white shadow-sm" />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-12"
          >
            {activeTab === 'my-bookings' ? (
              <div className="bg-white rounded-[32px] border border-slate-100 p-10 shadow-sm relative min-h-[500px]">
                <BookingsSection />
                <div className="absolute bottom-8 left-10 text-[12px] text-slate-300">
                  © All Rights Reserved.
                </div>
              </div>
            ) : activeTab === 'profile' ? (
              <div className="bg-white rounded-[32px] border border-slate-100 p-10 shadow-sm relative min-h-[500px]">
                <ProfileSection />
                <div className="absolute bottom-8 left-10 text-[12px] text-slate-300">
                  © All Rights Reserved.
                </div>
              </div>
            ) : activeTab === 'bookmarks' ? (
              <div className="bg-white rounded-[32px] border border-slate-100 p-10 shadow-sm relative min-h-[500px]">
                <BookmarksSection />
                <div className="absolute bottom-8 left-10 text-[12px] text-slate-300">
                  © All Rights Reserved.
                </div>
              </div>
            ) : activeTab === 'reviews' ? (
              <div className="bg-white rounded-[32px] border border-slate-100 p-10 shadow-sm relative min-h-[500px]">
                <ReviewsSection />
                <div className="absolute bottom-8 left-10 text-[12px] text-slate-300">
                  © All Rights Reserved.
                </div>
              </div>
            ) : activeTab === 'alerts' ? (
              <div className="bg-white rounded-[32px] border border-slate-100 p-10 shadow-sm relative min-h-[500px]">
                <AlertsSection />
                <div className="absolute bottom-8 left-10 text-[12px] text-slate-300">
                  © All Rights Reserved.
                </div>
              </div>
            ) : activeTab === 'messages' ? (
              <div className="bg-white rounded-[32px] border border-slate-100 p-10 shadow-sm relative min-h-[500px]">
                <MessagesSection />
                <div className="absolute bottom-8 left-10 text-[12px] text-slate-300">
                  © All Rights Reserved.
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-[32px] border border-slate-100 p-20 text-center shadow-sm relative min-h-[500px]">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-[32px]">⚡</span>
                </div>
                <h2 className="text-[20px] font-bold text-slate-900 mb-2 capitalize">
                  {activeTab.replace('-', ' ')}
                </h2>
                <p className="text-slate-400 font-medium">This section is currently under development.</p>
                <div className="absolute bottom-8 left-10 text-[12px] text-slate-300 text-left">
                  © All Rights Reserved.
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default SuperUserDashboard;
