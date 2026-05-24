import React from 'react';
import { 
  BarChart3, Eye, Users, MousePointer2, 
  CalendarCheck, CreditCard, DollarSign, 
  Percent, ChevronDown, BarChart, TrendingUp
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area,
  BarChart as RechartsBarChart, Bar, Cell
} from 'recharts';

const dataLine = [
  { name: '2026-05-01', total: 2, unique: 2 },
  { name: '2026-05-03', total: 10, unique: 9 },
  { name: '2026-05-05', total: 3, unique: 3 },
  { name: '2026-05-07', total: 5, unique: 5 },
];

const dataBar = [
  { name: 'Sunny Apartment', value: 4 },
  { name: "George's Barber Shop", value: 3 },
  { name: 'Burger House', value: 3 },
  { name: 'Villa Saint', value: 2 },
  { name: 'iPhone 12 Pro - Mint Condition', value: 1 },
  { name: "Tom's Restaurant", value: 1 },
];

const StatCard = ({ icon: Icon, title, value, color, hasArrow = true }: any) => (
  <div className="bg-white rounded-xl border border-slate-100 p-6 flex flex-col justify-between shadow-sm">
    <div className="flex items-center gap-3 mb-4">
      <div className={`p-2 rounded-lg bg-opacity-10`} style={{ backgroundColor: `${color}10`, color: color }}>
        <Icon size={18} />
      </div>
      <span className="text-[13px] font-medium text-slate-500">{title}</span>
    </div>
    <div className="flex items-end justify-between">
      <div className="flex items-center gap-2">
        <span className="text-[28px] font-bold text-slate-900">{value}</span>
        {hasArrow && <TrendingUp size={18} className="text-emerald-500 mb-1" />}
      </div>
    </div>
  </div>
);

const SellerStatisticsSection = () => {
  return (
    <div className="space-y-10">
      {/* Top Filter Bar */}
      <div className="flex flex-wrap items-center gap-6 pb-2">
        <div className="flex items-center gap-3">
          <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">Time Range:</span>
          <button className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-4 py-2 text-[13px] text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            Last 30 Days
            <ChevronDown size={14} className="text-slate-400" />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">Filter by Listing:</span>
          <button className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-4 py-2 text-[13px] text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            All Listings
            <ChevronDown size={14} className="text-slate-400" />
          </button>
        </div>
      </div>

      {/* Overall Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-slate-900">
          <BarChart3 size={20} className="text-slate-400" />
          <h2 className="text-[18px] font-bold">Overall</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={Eye} title="Total Listing" value="15" color="#3b82f6" />
          <StatCard icon={Users} title="Message" value="14" color="#8b5cf6" />
          <StatCard icon={MousePointer2} title="Contact Clicks" value="0" color="#f59e0b" />
          <StatCard icon={BarChart} title="Booking" value="0" color="#ef4444" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Views Over Time */}
          <div className="bg-white rounded-xl border border-slate-100 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-[15px] font-bold text-slate-800">Stats Over Time</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-1.5 rounded-full bg-blue-500" />
                  <span className="text-[11px] text-slate-400 font-medium">Total Listing</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[11px] text-slate-400 font-medium">Message</span>
                </div>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dataLine} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorUnique" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#cbd5e1' }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#cbd5e1' }} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '12px', 
                      border: 'none', 
                      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                      fontSize: '12px'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="total" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorTotal)" 
                    dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="unique" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorUnique)" 
                    dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Performing Services */}
          <div className="bg-white rounded-xl border border-slate-100 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-[15px] font-bold text-slate-800">Top Performing Services</h3>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400 font-medium">Show:</span>
                <button className="flex items-center gap-2 bg-slate-50 rounded px-2 py-1 text-[11px] font-bold text-slate-600">
                  10
                  <ChevronDown size={12} />
                </button>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart layout="vertical" data={dataBar} margin={{ top: 0, right: 30, left: 100, bottom: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#64748b', fontWeight: 500 }}
                    width={120}
                  />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="value" fill="#0266b3" radius={[0, 4, 4, 0]} barSize={20} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Empty States placeholders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl border border-slate-100 p-12 text-center shadow-sm">
            <p className="text-slate-400 text-[14px] italic">No contact data available</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-100 p-12 text-center shadow-sm">
            <p className="text-slate-400 text-[14px] italic">No social media data available</p>
          </div>
        </div>
      </div>

      {/* Booking & Revenue Section */}
      <div className="space-y-6 pt-10">
        <div className="flex items-center gap-2 text-slate-900">
          <BarChart3 size={20} className="text-slate-400" />
          <h2 className="text-[18px] font-bold">Booking & Revenue Statistics</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <StatCard icon={CalendarCheck} title="Total Bookings" value="0" color="#3b82f6" />
          <StatCard icon={CalendarCheck} title="Paid Bookings" value="0" color="#8b5cf6" />
          <StatCard icon={DollarSign} title="Total Revenue" value="$0.00" color="#10b981" />
          <StatCard icon={CreditCard} title="Total Commissions" value="$0.00" color="#f59e0b" hasArrow={false} />
          <StatCard icon={Percent} title="Booking Conversion" value="0.00%" color="#ec4899" hasArrow={false} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl border border-slate-100 p-12 text-center shadow-sm">
            <p className="text-slate-400 text-[14px] italic">No booking data available</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-100 p-12 text-center shadow-sm">
            <p className="text-slate-400 text-[14px] italic">No booking status data available</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerStatisticsSection;
