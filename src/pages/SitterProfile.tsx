import React, { useState } from 'react';
import { 
  MapPin, ShieldCheck, Star, Calendar, MessageCircle, 
  ChevronRight, Check, Heart, Share2, Award, Clock,
  PawPrint, Briefcase, Dog, Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data to match the image (Lisa Jacobs)
const SITTER_DATA = {
  name: "Lisa Jacobs",
  location: "Cape Town",
  avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&fit=crop",
  cover: "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?q=80&w=1200&h=400&fit=crop",
  lastActive: "2 hours ago",
  rating: 4.8,
  reviewsCount: 26,
  verified: true,
  about: "Experienced pet and house sitter with a love for animals. Offering trustworthy care for your pets and home while you're away. Passionate about giving your furry friends lots of love and attention!",
  services: [
    { name: "Pet Sitting", price: "R200/day", icon: <PawPrint size={16} /> },
    { name: "Dog Walking", price: "R150/hr", icon: <Dog size={16} /> }
  ],
  verifications: [
    "ID Verified",
    "Address Verified",
    "Police Clearance"
  ],
  availability: [
    { day: "Tor", slots: [true, true, false, true, false, true, false, true] },
    { day: "Sat", slots: [true, true, false, true, true, false, true, true] },
    { day: "Suin", slots: [true, true, false, false, false, false, false, false] }
  ],
  reviews: [
    {
      id: 1,
      author: "Rachel M.",
      location: "Cape Town",
      date: "3 weeks ago",
      rating: 4.5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&fit=crop",
      text: "Experienced pet sitter Lisa is rasy fniste; and wherl exores; exyys. Sitters fight home attirraat li's a'lvle of time, resar bice."
    },
    {
      id: 2,
      author: "Stephen T.",
      location: "Cape Town",
      date: "2 months ago",
      rating: 4.8,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&fit=crop",
      text: "Excellent pet sitter Grege ( Cee'l is pool1ove lise tt3-clit, and my calt loved her: Highly recommend!: taad mars."
    }
  ]
};

const SitterProfile = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  
  const tabs = ['Profile', 'Availability', 'Reviews'];

  const isLoggedIn = localStorage.getItem('isAdmin') === 'true' || 
                     localStorage.getItem('isSuperUser') === 'true' || 
                     localStorage.getItem('isSeller') === 'true';

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-24 md:pt-32 pb-20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-10">
        
        {/* Header Section */}
        <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-sm border border-[#F3EDE2] mb-8">
          {/* Cover Photo */}
          <div className="h-40 md:h-64 relative">
            <img 
              src={SITTER_DATA.cover} 
              alt="Cover" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
          
          {/* Profile Basic Info */}
          <div className="px-6 md:px-10 pb-8 md:pb-10 relative">
            {/* Avatar - overlapping cover */}
            <div className="absolute -top-12 md:-top-16 left-6 md:left-10">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white overflow-hidden shadow-xl relative">
                <img 
                  src={SITTER_DATA.avatar} 
                  alt={SITTER_DATA.name} 
                  className={`w-full h-full object-cover transition-all duration-700 ${!isLoggedIn ? 'blur-xl scale-110' : ''}`} 
                />
                {!isLoggedIn && (
                  <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
                    <div className="w-3 h-3 bg-white/20 rounded-full animate-pulse" />
                  </div>
                )}
              </div>
            </div>
            
            <div className="pt-16 md:pt-20">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="w-full">
                  <h1 className="text-xl md:text-3xl font-serif font-bold text-[#2D2926] mb-1.5">{SITTER_DATA.name}</h1>
                  <div className="flex flex-wrap items-center gap-4 md:gap-5">
                    <div className="flex items-center gap-2 text-[#8C8273] text-sm font-medium">
                      <div className="bg-[#E9E4DB] p-1 rounded-lg">
                        <MapPin size={14} className="text-[#6B7A5F]" />
                      </div>
                      <span>{SITTER_DATA.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} size={14} className={`${s <= Math.floor(SITTER_DATA.rating) ? 'text-[#C9A567] fill-[#C9A567]' : 'text-[#D9D1C4]'}`} />
                        ))}
                      </div>
                      <span className="text-xs text-[#8C8273] font-bold underline cursor-pointer">{SITTER_DATA.reviewsCount} reviews</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#8C8273] text-[10px] font-bold uppercase tracking-wider bg-[#F9F7F3] px-3 py-1.5 rounded-full border border-[#F3EDE2]">
                      <ShieldCheck size={12} className="text-[#6B7A5F]" />
                      <span>Last active: {SITTER_DATA.lastActive}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3 w-full md:w-auto">
                  <button className="flex-1 md:flex-none bg-[#6B7A5F] text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-[#5D6246] transition-all transform hover:-translate-y-1">
                    Request Booking
                  </button>
                  <button className="p-3 bg-white border border-[#F3EDE2] rounded-xl text-[#8C8273] hover:text-red-500 hover:border-red-100 transition-all shadow-sm">
                    <Heart size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8">
          
          {/* Left Column: Main Content */}
          <div className="space-y-8 md:space-y-10">
            {/* Tab Navigation (Scroll Navigation) */}
            <div className="bg-[#E9E4DB]/50 p-1 rounded-[1.5rem] flex sticky top-20 md:top-24 z-10 backdrop-blur-md shadow-sm border border-[#F3EDE2]/50">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    const element = document.getElementById(tab.toLowerCase());
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }}
                  className={`flex-1 py-2.5 text-xs md:text-sm font-bold rounded-xl transition-all ${
                    activeTab === tab 
                    ? 'bg-white text-[#2D2926] shadow-sm' 
                    : 'text-[#8C8273] hover:text-[#2D2926]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* About Me Section */}
            <section id="profile" className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 shadow-sm border border-[#F3EDE2] scroll-mt-24 md:scroll-mt-32">
              <h2 className="text-lg md:text-xl font-serif font-bold text-[#2D2926] mb-4">About Me</h2>
              <p className="text-[#5C564E] text-sm md:text-base leading-relaxed font-medium">
                {SITTER_DATA.about}
              </p>
              
              <div className="mt-8 pt-8 border-t border-[#F3EDE2]">
                <h3 className="text-[10px] md:text-xs font-bold text-[#8C8273] uppercase tracking-[0.2em] mb-4">Services Offered</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {SITTER_DATA.services.map((service, i) => (
                    <div key={i} className="flex items-center justify-between bg-[#FDFBF7] border border-[#F3EDE2] p-4 rounded-xl group hover:border-[#6B7A5F]/30 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="bg-white p-2.5 rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                          <div className="text-[#6B7A5F]">{service.icon}</div>
                        </div>
                        <span className="font-bold text-sm text-[#2D2926]">{service.name}</span>
                      </div>
                      <span className="text-[10px] font-black text-[#6B7A5F] bg-white px-2.5 py-1 rounded-md shadow-sm">{service.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Availability Grid */}
            <section id="availability" className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 shadow-sm border border-[#F3EDE2] scroll-mt-24 md:scroll-mt-32">
              <div className="flex items-center justify-between mb-6 md:mb-8">
                <h2 className="text-xl md:text-2xl font-serif font-bold text-[#2D2926]">Availability</h2>
                <Calendar className="text-[#E9E4DB]" size={24} />
              </div>
              <div className="overflow-x-auto -mx-2 px-2">
                <table className="w-full border-collapse min-w-[300px]">
                  <thead>
                    <tr className="border-b border-[#F3EDE2]">
                      <th className="p-2 md:p-4"></th>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                        <th key={n} className="p-2 md:p-4 text-[10px] md:text-xs font-bold text-[#8C8273]">{n}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {SITTER_DATA.availability.map((row, i) => (
                      <tr key={i} className="border-b border-[#F3EDE2] last:border-0">
                        <td className="p-2 md:p-4 text-[10px] md:text-sm font-bold text-[#8C8273] w-12 md:w-20">{row.day}</td>
                        {row.slots.map((slot, j) => (
                          <td key={j} className="p-2 md:p-4 text-center">
                            <div className={`w-6 h-6 md:w-8 md:h-8 mx-auto rounded-lg md:rounded-xl flex items-center justify-center transition-all ${slot ? 'bg-[#E9E4DB] text-[#6B7A5F] shadow-sm' : 'bg-transparent text-transparent'}`}>
                              {slot && <Check size={12} className="md:w-4 md:h-4" strokeWidth={3} />}
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Reviews Section */}
            <section id="reviews" className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 shadow-sm border border-[#F3EDE2] scroll-mt-24 md:scroll-mt-32">
              <h2 className="text-xl md:text-2xl font-serif font-bold text-[#2D2926] mb-8 md:mb-10">{SITTER_DATA.name.split(' ')[0]}'s Reviews</h2>
              <div className="space-y-8 md:space-y-12">
                {SITTER_DATA.reviews.map((review) => (
                  <div key={review.id} className="group">
                    <div className="flex justify-between items-start mb-4 md:mb-6">
                      <div className="flex items-center gap-3 md:gap-5">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl overflow-hidden border-2 border-white shadow-md shrink-0">
                          <img src={review.avatar} alt={review.author} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="text-base md:text-lg font-bold text-[#2D2926]">{review.author}</h4>
                          <div className="flex items-center gap-2 md:gap-3 mt-1">
                            <div className="flex gap-0.5">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <Star key={s} size={10} className={`${s <= Math.floor(review.rating) ? 'text-[#C9A567] fill-[#C9A567]' : 'text-[#D9D1C4]'}`} />
                              ))}
                            </div>
                            <span className="text-[10px] md:text-xs font-bold text-[#8C8273]">{review.location}</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] md:text-xs font-bold text-[#8C8273] bg-[#FDFBF7] px-2 md:px-3 py-1 md:py-1.5 rounded-lg border border-[#F3EDE2]">{review.date}</span>
                    </div>
                    <p className="text-[#5C564E] text-sm md:text-base leading-relaxed font-medium">
                      "{review.text}"
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-8">
            {/* Quick Contact Card */}
            <section className="bg-[#111d21] text-white rounded-[2rem] p-8 shadow-xl shadow-slate-200">
              <h3 className="text-xl font-serif font-bold mb-6">Send a Message</h3>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                Want to book {SITTER_DATA.name.split(' ')[0]}? Send a direct message to discuss your needs.
              </p>
              <button className="w-full bg-[#6B7A5F] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#5D6246] transition-all flex items-center justify-center gap-3 group">
                <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
                Message Now
              </button>
            </section>

            {/* Verification Sidebar Card */}
            <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-[#F3EDE2]">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-[#6B7A5F] rounded-xl flex items-center justify-center shadow-md">
                  <Shield size={20} className="text-white" />
                </div>
                <h3 className="text-lg font-serif font-bold text-[#2D2926]">Verifications</h3>
              </div>
              <div className="space-y-4">
                {SITTER_DATA.verifications.map((v, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-[#FDFBF7] border border-[#F3EDE2] rounded-2xl">
                    <span className="text-sm font-bold text-[#2D2926]">{v}</span>
                    <div className="bg-green-100 p-1 rounded-full">
                      <Check size={12} className="text-green-600" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-[#F3EDE2]">
                <div className="flex items-center gap-3 text-[#6B7A5F]">
                  <Award size={20} />
                  <span className="text-xs font-black uppercase tracking-widest">Top Rated Sitter</span>
                </div>
              </div>
            </section>

            {/* Share Card */}
            <div className="bg-[#FDFBF7] rounded-[2rem] p-8 border border-dashed border-[#E9E4DB] text-center">
              <p className="text-xs font-bold text-[#8C8273] uppercase tracking-widest mb-4">Share Profile</p>
              <div className="flex justify-center gap-4">
                <button className="p-3 bg-white rounded-xl shadow-sm hover:text-[#6B7A5F] transition-all"><Share2 size={20} /></button>
                <button className="p-3 bg-white rounded-xl shadow-sm hover:text-[#6B7A5F] transition-all"><Share2 size={20} /></button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SitterProfile;
