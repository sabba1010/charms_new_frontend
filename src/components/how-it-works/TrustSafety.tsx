import React from 'react';
import { UserCheck, MapPin, FileText, Star } from 'lucide-react';

const TrustSafety = () => {
  const items = [
    {
      icon: UserCheck,
      title: "ID verified",
      desc: "Government-issued ID checked for every member."
    },
    {
      icon: MapPin,
      title: "Address verified",
      desc: "Confirmed home address on file before approval."
    },
    {
      icon: FileText,
      title: "Police clearance",
      desc: "Recent SAPS clearance certificate required."
    },
    {
      icon: Star,
      title: "Real reviews",
      desc: "Only verified customers can leave reviews."
    }
  ];

  return (
    <section className="bg-[#f9f5eb] py-20 px-8">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Content */}
        <div className="flex-1">
          <span className="text-[15px] font-bold text-black mb-4 block">
            Trust & safety
          </span>
          <h2 className="text-[52px] font-serif font-medium text-black mb-6 leading-[1.1] whitespace-nowrap">
            Your safety comes first.
          </h2>
          <p className="text-[#333333] text-lg leading-relaxed max-w-md">
            We take verification seriously so you can focus on what matters: your pets, your home, your peace of mind.
          </p>
        </div>

        {/* Right Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <div 
              key={i} 
              className="bg-[#fcfcfc]/50 p-8 rounded-2xl border border-black/5 flex flex-col min-h-[180px]"
            >
              {/* Icon Container - Olive Green Circle */}
              <div className="w-10 h-10 rounded-full bg-[#8b8b4e] flex items-center justify-center text-white mb-6">
                <item.icon size={20} strokeWidth={2.5} />
              </div>
              
              <h3 className="text-[17px] font-bold text-black mb-3">
                {item.title}
              </h3>
              <p className="text-[#555555] text-[14px] leading-snug">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TrustSafety;