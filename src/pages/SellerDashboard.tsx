import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SellerSidebar from '../components/seller/SellerSidebar';
import SellerStatsCards from '../components/seller/SellerStatsCards';
import SellerRecentActivities from '../components/seller/SellerRecentActivities';
import SellerListingPackages from '../components/seller/SellerListingPackages';
import SellerBookingsSection from '../components/seller/SellerBookingsSection';
import SellerBookingList from '../components/seller/SellerBookingList';
import SellerBookingsCalendar from '../components/seller/SellerBookingsCalendar';
import { useSitterBookings } from '../hooks/useSitterBookings';
import SellerMessagesSection from '../components/seller/SellerMessagesSection';
import SellerWalletSection from '../components/seller/SellerWalletSection';
import SellerActiveListings from '../components/seller/SellerActiveListings';
import SellerStatisticsSection from '../components/seller/SellerStatisticsSection';
import SellerAddListing from '../components/seller/SellerAddListing';
import SellerReviewsSection from '../components/seller/SellerReviewsSection';
import SellerSearchAlerts from '../components/seller/SellerSearchAlerts';
import SellerJobsSection from '../components/seller/SellerJobsSection';
import SellerProfileSettings from '../components/seller/SellerProfileSettings';
import SellerNotificationsSection from '../components/seller/SellerNotificationsSection';
import logo from '../assets/logo/OPPAS LOGO (1).png';

const SellerDashboard: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isUnderReview, setIsUnderReview] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [checkingStatus, setCheckingStatus] = useState(true);
  const { counts } = useSitterBookings();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab) setActiveTab(tab);
  }, [location]);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';
        const res = await fetch(`${apiUrl}/listings/my-listings`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
          const hasPending = data.data.some((l: any) => l.status === 'Pending');
          const hasActive = data.data.some((l: any) => l.status === 'Active');
          const rejectedListings = data.data.filter((l: any) => l.status === 'Rejected');
          
          if (hasPending && !hasActive) {
            setIsUnderReview(true);
          } else if (rejectedListings.length > 0 && !hasActive && !hasPending) {
            setIsRejected(true);
            setRejectionReason(rejectedListings[0].rejectionReason || 'Your documents or profile did not meet our requirements.');
          }
        }
      } catch (e) {
        console.error('Failed to check review status', e);
      } finally {
        setCheckingStatus(false);
      }
    };
    checkStatus();
  }, []);

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Hello omiman !';
      case 'my-bookings': return 'My Bookings';
      case 'messages': return 'Messages';
      case 'notifications': return 'Notifications';
      case 'my-jobs': return 'My Applied Jobs';
      case 'wallet': return 'Wallet';
      case 'search-alerts': return 'Search Alerts';
      case 'listings-active': return 'My Listings';
      case 'statistics': return 'Statistics';
      case 'add-listing': return 'Add Listing';
      case 'reviews': return 'Reviews';
      case 'profile': return 'My Public Profile';
      case 'bookings-calendar': return 'Calendar View';
      case 'bookings-pending': return 'Pending Bookings';
      case 'bookings-approved': return 'Approved Bookings';
      case 'bookings-cancelled': return 'Cancelled Bookings';
      default: return activeTab.replace('-', ' ');
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex pt-[72px] relative">
      {isUnderReview && !checkingStatus && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center backdrop-blur-md bg-white/40">
          <div className="bg-white p-10 rounded-3xl shadow-2xl border border-slate-100 text-center max-w-md mx-4 transform transition-all">
            <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-amber-100">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-[24px] font-bold text-slate-800 mb-4 font-serif">Under Review</h2>
            <p className="text-slate-500 text-[15px] leading-relaxed font-medium">
              Your profile and verification documents are currently being reviewed by our team. You will gain full access once approved.
            </p>
          </div>
        </div>
      )}

      <div className={`flex flex-1 w-full transition-all duration-500 ${isUnderReview && !checkingStatus ? 'blur-md pointer-events-none select-none opacity-40' : ''}`}>
        {/* Sidebar */}
        <SellerSidebar activeTab={activeTab} setActiveTab={setActiveTab} bookingCounts={counts} />

        {/* Main Content Area */}
        <main className="flex-1 ml-64 p-6 lg:p-8">
        {/* Rejected Alert Banner */}
        {isRejected && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-2xl p-6 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center shrink-0">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-[18px] font-bold text-red-800">Application Rejected</h3>
              <p className="text-red-600 mt-1 text-[14px]">
                Your registration was reviewed and has been rejected. Reason: <strong>{rejectionReason}</strong>
              </p>
              <p className="text-red-500 mt-2 text-[13px] font-medium">
                You can review your details in "My Listings" and resubmit if necessary, or contact support for assistance.
              </p>
            </div>
          </div>
        )}

        {/* Header & Breadcrumb */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-[32px] font-serif font-medium text-slate-900">
              {getPageTitle()}
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[12px] text-slate-400">
              <Link to="/" className="hover:text-slate-600">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="font-medium text-slate-600">Dashboard</span>
            </div>
            <button
              onClick={() => setActiveTab('notifications')}
              className="relative p-2.5 bg-white border border-slate-100 rounded-full shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              <Bell size={20} className="text-slate-600" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#5cb85c] rounded-full border-2 border-white shadow-sm" />
            </button>
          </div>
        </div>

        {/* Dynamic Content */}
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
                {/* Stats Grid */}
                <SellerStatsCards />

                {/* Layout Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                  <div className="lg:col-span-3 space-y-8">
                    <SellerRecentActivities />
                  </div>
                  <div className="lg:col-span-2 space-y-8">
                    <SellerListingPackages />
                  </div>
                </div>
              </div>
            ) : activeTab === 'my-bookings' ? (
              <SellerBookingsSection />
            ) : activeTab === 'add-listing' ? (
              <SellerAddListing />
            ) : activeTab === 'listings-active' ? (
              <SellerActiveListings />
            ) : activeTab === 'statistics' ? (
              <SellerStatisticsSection />
            ) : activeTab === 'reviews' ? (
              <SellerReviewsSection />
            ) : activeTab === 'search-alerts' ? (
              <SellerSearchAlerts />
            ) : activeTab === 'messages' ? (
              <SellerMessagesSection />
            ) : activeTab === 'notifications' ? (
              <SellerNotificationsSection />
            ) : activeTab === 'my-jobs' ? (
              <SellerJobsSection />
            ) : activeTab === 'wallet' ? (
              <SellerWalletSection />
            ) : activeTab === 'profile' ? (
              <SellerProfileSettings />
            ) : activeTab === 'bookings-calendar' ? (
              <SellerBookingsCalendar />
            ) : activeTab === 'bookings-pending' ? (
              <SellerBookingList title="Pending Bookings" statusFilter="Pending" />
            ) : activeTab === 'bookings-approved' ? (
              <SellerBookingList title="Approved Bookings" statusFilter="Approved" />
            ) : activeTab === 'bookings-cancelled' ? (
              <SellerBookingList title="Cancelled Bookings" statusFilter="Cancelled" />
            ) : (
              <div className="bg-white rounded-xl border border-slate-100 p-20 text-center shadow-sm flex flex-col items-center">
                <div className="mb-6 flex flex-col items-center gap-4">
                  <img src={logo} alt="Home Paw" className="h-16 w-auto grayscale opacity-20" />
                  <span className="text-slate-200 font-serif text-[24px] font-medium italic">Home Paw</span>
                </div>
                <h2 className="text-[20px] font-bold text-slate-900 mb-2 capitalize">
                  {activeTab.replace('-', ' ')}
                </h2>
                <p className="text-slate-400">This section is currently under development.</p>
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

export default SellerDashboard;
