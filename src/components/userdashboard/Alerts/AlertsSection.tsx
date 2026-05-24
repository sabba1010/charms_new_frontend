import React, { useState } from 'react';
import { 
  Bell, Search, MapPin, Trash2, ExternalLink, 
  Mail, Calendar, Filter, Sparkles
} from 'lucide-react';
import { cn } from '../../../lib/utils';

interface SavedSearch {
  id: number;
  title: string;
  location: string;
  frequency: 'Instant' | 'Daily' | 'Weekly' | 'Never';
  filters: string[];
  dateSaved: string;
  isActive: boolean;
}

const AlertsSection = () => {
  const [alerts, setAlerts] = useState<SavedSearch[]>([
    {
      id: 1,
      title: 'Boarding with Large Fenced Backyard',
      location: 'Hobart, Tasmania',
      frequency: 'Daily',
      filters: ['Dog Sitting', 'Fenced Backyard', 'Rating > 4.8', 'Price: $35-$60/night'],
      dateSaved: 'May 12, 2026',
      isActive: true,
    },
    {
      id: 2,
      title: 'Top Rated Dog Walking Services',
      location: 'Launceston, Tasmania',
      frequency: 'Instant',
      filters: ['Dog Walking', 'Rating > 4.5', 'Active Sitters Only'],
      dateSaved: 'May 08, 2026',
      isActive: true,
    },
    {
      id: 3,
      title: 'Cat Drop-In Sitter',
      location: 'Devonport, Tasmania',
      frequency: 'Weekly',
      filters: ['Drop-in Visits', 'Cat Experience', 'First Aid Certified'],
      dateSaved: 'April 22, 2026',
      isActive: false,
    }
  ]);

  const handleDelete = (id: number) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const handleToggleActive = (id: number) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, isActive: !a.isActive } : a));
  };

  const handleChangeFrequency = (id: number, freq: SavedSearch['frequency']) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, frequency: freq } : a));
  };

  return (
    <div className="space-y-8">
      {/* Header and Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Bell size={20} className="text-[#111c1e]" />
            Saved Searches & Alerts
          </h2>
          <p className="text-[13px] text-slate-400 mt-1 leading-relaxed">
            Get email updates when new sitters match your saved search criteria.
          </p>
        </div>
        <div className="bg-slate-50 border border-slate-100 px-4 py-2 rounded-full text-xs font-bold text-slate-600 self-start sm:self-center">
          Active Alerts: <span className="text-[#111c1e]">{alerts.filter(a => a.isActive).length} / 10</span>
        </div>
      </div>

      {alerts.length === 0 ? (
        <div className="p-8 py-20 text-center bg-white rounded-xl border border-dashed border-slate-200">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
            <Search size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">No Saved Searches yet</h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
            Use the search page to find pet sitters and save your search to get notified automatically when new matches become available.
          </p>
          <a 
            href="/find-sitter" 
            className="inline-flex items-center gap-2 bg-[#111c1e] text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-black transition-all shadow-md active:scale-95"
          >
            Start Finding Sitters <ArrowRight size={14} />
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {alerts.map((alert) => (
            <div 
              key={alert.id} 
              className={cn(
                "bg-white rounded-xl border p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-all duration-300 shadow-sm hover:shadow-md",
                alert.isActive ? "border-slate-100" : "border-slate-100 opacity-70 bg-slate-50/20"
              )}
            >
              <div className="space-y-4 flex-1">
                {/* Search Title & Location */}
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-[16px] font-bold text-slate-900 flex items-center gap-2">
                      {alert.title}
                    </h3>
                    <span className="text-[10px] bg-slate-100 border border-slate-200 text-slate-400 font-bold px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
                      <Calendar size={10} /> {alert.dateSaved}
                    </span>
                  </div>
                  <p className="text-[13px] text-slate-500 flex items-center gap-1.5 font-medium">
                    <MapPin size={14} className="text-slate-400" />
                    {alert.location}
                  </p>
                </div>

                {/* Filter tags applied */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-1">
                    <Filter size={11} /> Filters:
                  </span>
                  {alert.filters.map((filter, index) => (
                    <span 
                      key={index} 
                      className="px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-full text-[11px] font-medium text-slate-600 flex items-center gap-1"
                    >
                      <Sparkles size={10} className="text-amber-500" />
                      {filter}
                    </span>
                  ))}
                </div>
              </div>

              {/* Alert Frequency Controls & Actions */}
              <div className="flex flex-wrap items-center gap-6 pt-4 lg:pt-0 border-t border-slate-50 lg:border-none">
                {/* Notification Dropdown */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Mail size={12} /> Frequency
                  </label>
                  <div className="relative">
                    <select 
                      value={alert.frequency}
                      onChange={(e) => handleChangeFrequency(alert.id, e.target.value as SavedSearch['frequency'])}
                      className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-xs text-slate-600 font-medium outline-none focus:border-slate-400 cursor-pointer shadow-sm"
                    >
                      <option value="Instant">Instant Alerts</option>
                      <option value="Daily">Daily Summary</option>
                      <option value="Weekly">Weekly Summary</option>
                      <option value="Never">No Emails</option>
                    </select>
                    <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Toggle switch */}
                <div className="space-y-1.5 flex flex-col items-start lg:items-center">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Status
                  </span>
                  <button 
                    onClick={() => handleToggleActive(alert.id)}
                    className={cn(
                      "w-11 h-6 rounded-full relative p-0.5 transition-colors cursor-pointer",
                      alert.isActive ? "bg-[#111c1e]" : "bg-slate-200"
                    )}
                  >
                    <div 
                      className={cn(
                        "w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200",
                        alert.isActive ? "translate-x-5" : "translate-x-0"
                      )} 
                    />
                  </button>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 pt-3 sm:pt-0">
                  <a 
                    href="/find-sitter" 
                    className="p-2.5 bg-slate-50 border border-slate-100 hover:border-slate-200 text-slate-500 hover:text-slate-900 rounded-lg transition-all"
                    title="Run Search Results"
                  >
                    <ExternalLink size={16} />
                  </a>
                  <button 
                    onClick={() => handleDelete(alert.id)}
                    className="p-2.5 bg-rose-50 border border-rose-100 text-rose-400 hover:text-rose-600 rounded-lg transition-all"
                    title="Delete saved search"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ChevronDown = ({ size, className }: any) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
);

const ArrowRight = ({ size }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
);

export default AlertsSection;
