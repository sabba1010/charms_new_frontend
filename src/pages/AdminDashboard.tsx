import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/admin/Sidebar';
import AdminStatsCards from '../components/admin/AdminStatsCards';
import RecentActivities from '../components/admin/RecentActivities';
import ListingViewsSection from '../components/admin/ListingViewsSection';
import AdminBookingsSection from '../components/admin/AdminBookingsSection';
import AdminMessagesSection from '../components/admin/AdminMessagesSection';
import AdminWalletSection from '../components/admin/AdminWalletSection';
import AdminActiveListings from '../components/admin/AdminActiveListings';
import AdminStatisticsSection from '../components/admin/AdminStatisticsSection';
import AdminAddListing from '../components/admin/AdminAddListing';
import AdminReviewsSection from '../components/admin/AdminReviewsSection';
import AdminSearchAlerts from '../components/admin/AdminSearchAlerts';
import AdminJobsSection from '../components/admin/AdminJobsSection';
import AdminAllJobsSection from '../components/admin/AdminAllJobsSection';
import AdminAllUsersSection from '../components/admin/AdminAllUsersSection';
import { useAdminDashboard } from '../hooks/useAdminDashboard';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { stats, recentActivities, bookingsChart, loading, error } = useAdminDashboard();

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Hello admin !';
      case 'my-bookings': return 'My Bookings';
      case 'messages': return 'Messages';
      case 'my-jobs': return 'My Jobs';
      case 'all-jobs': return 'All Jobs';
      case 'all-users': return 'All Users';
      case 'wallet': return 'Wallet';
      case 'search-alerts': return 'Search Alerts';
      case 'listings-active': return 'My Listings';
      case 'statistics': return 'Statistics';
      case 'add-listing': return 'Add Listing';
      case 'reviews': return 'Reviews';
      case 'bookings-pending': return 'Pending Bookings';
      case 'bookings-approved': return 'Approved Bookings';
      case 'bookings-cancelled': return 'Cancelled Bookings';
      default: return activeTab.replace('-', ' ');
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex pt-[72px]">
      {/* Sidebar - Positioned fixed to match layout */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-6 lg:p-8">
        {/* Header & Breadcrumb */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-[32px] font-serif font-medium text-slate-900">
              {getPageTitle()}
            </h1>
            <p className="text-[14px] text-slate-400 mt-1">Welcome back to your administration panel.</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[12px] text-slate-400">
              <Link to="/" className="hover:text-slate-600">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="font-medium text-slate-600">Dashboard</span>
            </div>
            <button className="relative p-2.5 bg-white border border-slate-100 rounded-full shadow-sm hover:shadow-md transition-all">
              <Bell size={20} className="text-slate-600" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white shadow-sm" />
            </button>
          </div>
        </div>

        {/* Dynamic Content Transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="space-y-12"
          >
            {activeTab === 'dashboard' ? (
              <div className="space-y-12">
                {error && (
                  <p className="text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-lg px-4 py-3">
                    {error}
                  </p>
                )}
                <AdminStatsCards stats={stats} loading={loading} />

                <div className="grid grid-cols-1 xl:grid-cols-5 gap-12 items-start">
                  <div className="xl:col-span-3">
                    <RecentActivities activities={recentActivities} loading={loading} />
                  </div>
                  <div className="xl:col-span-2">
                    <ListingViewsSection
                      stats={stats}
                      bookingsChart={bookingsChart}
                      loading={loading}
                    />
                  </div>
                </div>
              </div>
            ) : activeTab === 'my-bookings' ? (
              <AdminBookingsSection />
            ) : activeTab === 'messages' ? (
              <AdminMessagesSection />
            ) : activeTab === 'my-jobs' ? (
              <AdminJobsSection />
            ) : activeTab === 'all-jobs' ? (
              <AdminAllJobsSection />
            ) : activeTab === 'all-users' ? (
              <AdminAllUsersSection />
            ) : activeTab === 'wallet' ? (
              <AdminWalletSection />
            ) : activeTab === 'search-alerts' ? (
              <AdminSearchAlerts />
            ) : (activeTab === 'listings-active' || activeTab === 'listings-pending' || activeTab === 'listings-rejected' || activeTab === 'my-listings') ? (
              <AdminActiveListings activeSubTab={activeTab} />
            ) : activeTab === 'statistics' ? (
              <AdminStatisticsSection />
            ) : activeTab === 'add-listing' ? (
              <AdminAddListing />
            ) : activeTab === 'reviews' ? (
              <AdminReviewsSection />
            ) : (
              <div className="bg-white rounded-xl border border-slate-100 p-20 text-center shadow-sm">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-[32px]">⚡</span>
                </div>
                <h2 className="text-[20px] font-bold text-slate-900 mb-2 capitalize">
                  {activeTab.replace('-', ' ')}
                </h2>
                <p className="text-slate-400">This section is currently under development.</p>
                <div className="mt-8 flex justify-center">
                  <button 
                    onClick={() => setActiveTab('dashboard')}
                    className="text-[#111c1e] font-bold text-[13px] underline hover:text-black transition-colors"
                  >
                    Return to Overview
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Sticky Footer */}
        <div className="mt-20 pt-8 border-t border-slate-50 flex items-center justify-between text-[13px] text-slate-400">
          <p>© All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="#" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
