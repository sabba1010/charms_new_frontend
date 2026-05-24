import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, FileText, Mail, Calendar,
  Wallet, Search, PlusCircle, LayoutList,
  BarChart3, Megaphone, Ticket, Star,
  Heart, User, Power, ChevronDown, Bell, Briefcase
} from 'lucide-react';
import { cn } from '../../lib/utils';
import logo from '../../assets/logo/OPPAS LOGO (1).png';

interface BookingCounts {
  pending: number;
  approved: number;
  cancelled: number;
  total: number;
}

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  bookingCounts?: BookingCounts;
}

interface MenuItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  hasDropdown?: boolean;
  subItems?: {
    id: string;
    name: string;
    count?: number;
    countBg?: string;
  }[];
}

interface MenuGroup {
  title: string;
  items: MenuItem[];
}

const SellerSidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, bookingCounts }) => {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const bookingSubCounts: Record<string, number | undefined> = {
    'bookings-pending': bookingCounts?.pending,
    'bookings-approved': bookingCounts?.approved,
    'bookings-cancelled': bookingCounts?.cancelled,
  };

  const menuGroups: MenuGroup[] = [
    {
      title: 'MAIN',
      items: [
        { id: 'dashboard', name: 'Dashboard', icon: <LayoutDashboard size={18} /> },
        { id: 'my-bookings', name: 'My Bookings', icon: <FileText size={18} /> },
        { id: 'messages', name: 'Messages', icon: <Mail size={18} /> },
        { id: 'notifications', name: 'Notifications', icon: <Bell size={18} /> },
        { id: 'my-jobs', name: 'My Jobs', icon: <Briefcase size={18} /> },
        {
          id: 'bookings',
          name: 'Bookings',
          icon: <Calendar size={18} />,
          hasDropdown: true,
          subItems: [
            { id: 'bookings-calendar', name: 'Calendar View' },
            { id: 'bookings-pending', name: 'Pending', count: bookingCounts?.pending, countBg: 'bg-[#5bc0de]' },
            { id: 'bookings-approved', name: 'Approved', count: bookingCounts?.approved, countBg: 'bg-[#5cb85c]' },
            { id: 'bookings-cancelled', name: 'Cancelled', count: bookingCounts?.cancelled, countBg: 'bg-[#d9534f]' },
          ]
        },
        { id: 'add-listing', name: 'Add Listing', icon: <PlusCircle size={18} /> },
        {
          id: 'my-listings',
          name: 'My Listings',
          icon: <LayoutList size={18} />,
          hasDropdown: true,
          subItems: [
            { id: 'listings-active', name: 'Active', count: 12, countBg: 'bg-[#5cb85c]' },
            { id: 'listings-pending', name: 'Pending' },
            { id: 'listings-expired', name: 'Expired' },
          ]
        },
        { id: 'wallet', name: 'Wallet', icon: <Wallet size={18} /> },
        // { id: 'search-alerts', name: 'Search Alerts', icon: <Search size={18} /> },
      ]
    },
    {
      title: 'LISTINGS',
      items: [
        // { id: 'statistics', name: 'Statistics', icon: <BarChart3 size={18} /> },
        // { id: 'ad-campaign', name: 'Ad Campaign', icon: <Megaphone size={18} /> },
        // { id: 'coupons', name: 'Coupons', icon: <Ticket size={18} /> },
        { id: 'reviews', name: 'Reviews', icon: <Star size={18} /> },
        // { id: 'bookmarks', name: 'Bookmarks', icon: <Heart size={18} /> },
      ]
    },
    {
      title: 'ACCOUNT',
      items: [
        { id: 'profile', name: 'Profile Settings', icon: <User size={18} /> },
      ]
    }
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
    <aside className="w-64 bg-white border-r border-slate-100 flex flex-col fixed left-0 top-[72px] bottom-0 z-20">
      <div className="p-8 border-b border-slate-50">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Home Paw" className="h-10 w-auto" />
          <span className="text-black font-serif text-[18px] font-medium">Home Paw</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
        {menuGroups.map((group) => (
          <div key={group.title} className="mb-8 last:mb-0">
            <p className="text-[10px] font-bold text-slate-400 tracking-[0.15em] mb-4 ml-4 uppercase">
              {group.title}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => (
                <div key={item.id}>
                  <button
                    onClick={() => {
                      if (item.hasDropdown) {
                        setOpenDropdown(openDropdown === item.id ? null : item.id);
                      } else {
                        setActiveTab(item.id);
                      }
                    }}
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
                    {item.hasDropdown && (
                      <ChevronDown
                        size={14}
                        className={cn(
                          "transition-transform",
                          openDropdown === item.id ? "rotate-180" : ""
                        )}
                      />
                    )}
                  </button>

                  {item.hasDropdown && openDropdown === item.id && (
                    <div className="ml-12 mt-1 space-y-1">
                      {item.subItems?.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => setActiveTab(sub.id)}
                          className={cn(
                            "w-full flex items-center justify-between py-2 pr-4 text-[13px] transition-colors",
                            activeTab === sub.id ? "text-slate-900 font-bold" : "text-slate-400 hover:text-slate-900"
                          )}
                        >
                          <span>{sub.name}</span>
                          {(bookingSubCounts[sub.id] ?? 0) > 0 && (
                            <span className={cn(
                              "w-5 h-5 flex items-center justify-center rounded-full text-white text-[10px] font-bold",
                              sub.countBg
                            )}>
                              {bookingSubCounts[sub.id]}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
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
  );
};

export default SellerSidebar;
