import React from 'react';
import { MapPin, BarChart3, MessageSquare, Heart } from 'lucide-react';

const SellerStatsCards = () => {
  const stats = [
    { 
      label: 'Active Listings', 
      value: '0', 
      icon: <MapPin className="w-8 h-8" />, 
      color: 'text-[#5cb85c]',
      borderColor: 'border-[#5cb85c]',
      bg: 'bg-[#5cb85c]/5'
    },
    { 
      label: 'Total Reviews', 
      value: '0', 
      icon: <MessageSquare className="w-8 h-8" />, 
      color: 'text-[#f0ad4e]',
      borderColor: 'border-[#f0ad4e]',
      bg: 'bg-[#f0ad4e]/5'
    },
    { 
      label: 'Times Bookmarked', 
      value: '0', 
      icon: <Heart className="w-8 h-8" />, 
      color: 'text-[#d9534f]',
      borderColor: 'border-[#d9534f]',
      bg: 'bg-[#d9534f]/5'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div 
          key={index}
          className={`bg-white rounded-lg border-2 ${stat.borderColor} p-6 shadow-sm flex items-center justify-between transition-all hover:scale-[1.02]`}
        >
          <div>
            <p className={`text-[13px] font-bold mb-2 ${stat.color}`}>
              {stat.label}
            </p>
            <p className="text-[32px] font-bold text-slate-800">
              {stat.value}
            </p>
          </div>
          <div className={stat.color}>
            {stat.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SellerStatsCards;
