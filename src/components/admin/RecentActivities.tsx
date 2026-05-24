import React from 'react';
import { RefreshCw, Loader2 } from 'lucide-react';
import { AdminActivity } from '../../hooks/useAdminDashboard';

interface RecentActivitiesProps {
  activities: AdminActivity[];
  loading?: boolean;
}

const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities, loading }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm">
      <div className="p-6 border-b border-slate-50 flex items-center justify-between">
        <h2 className="text-[16px] font-bold text-slate-900">Recent Activities</h2>
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Live from database
        </span>
      </div>

      <div className="divide-y divide-slate-50 min-h-[200px]">
        {loading ? (
          <div className="p-12 flex justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-slate-300" />
          </div>
        ) : activities.length === 0 ? (
          <div className="p-12 text-center text-slate-400 italic text-[14px]">
            No recent activity yet.
          </div>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="p-4 flex items-center gap-4 hover:bg-slate-50/50 transition-colors"
            >
              <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100">
                <RefreshCw size={14} className="text-slate-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] text-slate-600 truncate">
                  <span className="font-bold text-slate-900">{activity.title}</span> {activity.action}
                </p>
              </div>
              <span className="text-[11px] font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100 shrink-0">
                {activity.time}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentActivities;
