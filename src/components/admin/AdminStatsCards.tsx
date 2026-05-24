import React from 'react';
import { MapPin, MessageSquare, Briefcase, Loader2 } from 'lucide-react';
import { AdminDashboardStats } from '../../hooks/useAdminDashboard';

interface AdminStatsCardsProps {
  stats: AdminDashboardStats | null;
  loading?: boolean;
}

const AdminStatsCards: React.FC<AdminStatsCardsProps> = ({ stats, loading }) => {
  const cards = [
    {
      label: 'Active Listings',
      value: stats?.activeListings ?? 0,
      icon: <MapPin className="w-8 h-8" />,
      color: 'text-[#4db6ac]',
      bg: 'bg-[#e0f2f1]/40',
    },
    {
      label: 'Total Reviews',
      value: stats?.totalReviews ?? 0,
      icon: <MessageSquare className="w-8 h-8" />,
      color: 'text-[#fbc02d]',
      bg: 'bg-[#fff9c4]/40',
    },
    {
      label: 'Total Jobs',
      value: stats?.totalJobs ?? 0,
      icon: <Briefcase className="w-8 h-8" />,
      color: 'text-[#5c6bc0]',
      bg: 'bg-[#e8eaf6]/40',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-xl border border-slate-100 p-8 shadow-sm flex items-center justify-between"
        >
          <div>
            <p className="text-[13px] font-medium mb-1 text-slate-500">{stat.label}</p>
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin text-slate-300 mt-2" />
            ) : (
              <p className={`text-[28px] font-bold ${stat.color}`}>{stat.value}</p>
            )}
          </div>
          <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>{stat.icon}</div>
        </div>
      ))}
    </div>
  );
};

export default AdminStatsCards;
