import React from 'react';
import { BarChart3, Briefcase, Calendar, Users, Loader2 } from 'lucide-react';
import { AdminDashboardStats, BookingsChartPoint } from '../../hooks/useAdminDashboard';

interface ListingViewsSectionProps {
  stats: AdminDashboardStats | null;
  bookingsChart: BookingsChartPoint[];
  loading?: boolean;
}

const ListingViewsSection: React.FC<ListingViewsSectionProps> = ({
  stats,
  bookingsChart,
  loading,
}) => {
  const maxCount = Math.max(...bookingsChart.map((d) => d.count), 1);

  const summaryRows = [
    { label: 'Total Jobs', value: stats?.totalJobs ?? 0, sub: `${stats?.activeJobs ?? 0} open · ${stats?.pendingJobs ?? 0} pending review` },
    { label: 'Filled Jobs', value: stats?.filledJobs ?? 0, sub: 'Owner accepted a sitter' },
    { label: 'Total Bookings', value: stats?.totalBookings ?? 0, sub: `${stats?.pendingBookings ?? 0} pending · ${stats?.approvedBookings ?? 0} approved` },
    { label: 'Listings', value: stats?.totalListings ?? 0, sub: `${stats?.activeListings ?? 0} active · ${stats?.pendingListings ?? 0} pending` },
    { label: 'Users', value: stats?.totalUsers ?? 0, sub: 'Registered accounts' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50">
          <h2 className="text-[16px] font-bold text-slate-900">Platform Overview</h2>
          <p className="text-[12px] text-slate-400 mt-1">Real counts from your database</p>
        </div>
        {loading ? (
          <div className="p-10 flex justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-slate-300" />
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {summaryRows.map((row) => (
              <div key={row.label} className="px-6 py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Briefcase size={16} className="text-slate-300" />
                  <div>
                    <p className="text-[13px] font-bold text-slate-800">{row.label}</p>
                    <p className="text-[11px] text-slate-400">{row.sub}</p>
                  </div>
                </div>
                <span className="text-[22px] font-bold text-[#111c1e]">{row.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
          <h2 className="text-[16px] font-bold text-slate-900">Bookings (Last 7 Days)</h2>
          <Calendar size={16} className="text-slate-300" />
        </div>

        <div className="p-8 h-[280px] flex flex-col">
          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-slate-300" />
            </div>
          ) : bookingsChart.every((d) => d.count === 0) ? (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
              <BarChart3 size={40} className="text-slate-200 mb-2" />
              <p className="text-[13px] italic">No bookings in the last 7 days</p>
            </div>
          ) : (
            <div className="flex-1 flex items-end justify-between gap-2">
              {bookingsChart.map((point) => (
                <div key={point.date} className="flex-1 flex flex-col items-center justify-end gap-2">
                  <span className="text-[10px] font-bold text-slate-500">{point.count}</span>
                  <div
                    className="w-full max-w-[36px] bg-[#4db6ac] rounded-t-md transition-all min-h-[4px]"
                    style={{ height: `${Math.max((point.count / maxCount) * 100, 4)}%` }}
                  />
                  <span className="text-[9px] text-slate-400 font-medium">{point.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="px-6 pb-6 flex items-center gap-2 text-[11px] text-slate-400">
          <Users size={12} />
          <span>New bookings per day</span>
        </div>
      </div>
    </div>
  );
};

export default ListingViewsSection;
