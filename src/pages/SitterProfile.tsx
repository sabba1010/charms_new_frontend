import React, { useState } from 'react';
import {
  MapPin, ShieldCheck, Star, Check, MessageCircle,
  PawPrint, Dog, ChevronLeft, Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import logo1 from '../assets/png/1 (1).png';
import logo2 from '../assets/png/2 (1).png';
import logo3 from '../assets/png/3 (1).png';

/* ─── Mock data (replace with API data later) ─── */
const SITTER = {
  name: 'Lisa Jacobs',
  location: 'Cape Town',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&fit=crop',
  cover: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?q=80&w=800&fit=crop',
  lastActive: '2 hours ago',
  rating: 4.8,
  reviewsCount: 26,
  verifications: ['ID Verified', 'Address Verified', 'Police Clearance'],
  services: [
    { label: 'Pet Sitting', price: 'R200/day', icon: <PawPrint size={30} /> },
    { label: 'Dog Walking', price: 'R150/hr', icon: <Dog size={30} /> },
  ],
  experiencesWith: ['Dogs', 'Cats', 'Puppy Care'],
  about: "Experienced pet and house sitter with a love for animals. Offering trustworthy care for your pets and home while you're away. Passionate about giving your furry friends lots of love and attention!",
  availability: {
    dates: [20, 21, 22, 24, 25, 26, 23, 28, 29, 30],
    rows: [
      { day: 'Tor', slots: [true, true, false, true, false, true, false, true, false, false] },
      { day: 'Sat', slots: [true, true, false, true, true, false, true, true, false, false] },
      { day: 'Sun', slots: [true, true, false, false, false, false, false, false, false, false] },
    ],
  },
  reviews: [
    {
      id: 1,
      author: 'Rachel M.',
      location: 'Cape Town',
      date: '3 weeks ago',
      rating: 4.5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&fit=crop',
      text: 'Experienced pet sitter Lisa is very friendly and warm. Sitters fight home attitrat it\'s a lot of time. read more',
    },
    {
      id: 2,
      author: 'Stephen T.',
      location: 'Cape Town',
      date: '2 months ago',
      rating: 4.1,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&fit=crop',
      text: 'Excellent pet sitter! Carl\'s pool\'s love like it, and my cat loved her. Highly recommend! read more',
    },
  ],
};

const StarRow = ({ rating, size = 13 }: { rating: number; size?: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map(s => (
      <Star key={s} size={size}
        className={s <= Math.round(rating) ? 'fill-[#C9A567] text-[#C9A567]' : 'fill-[#E8E2D8] text-[#E8E2D8]'}
        strokeWidth={0}
      />
    ))}
  </div>
);

/* ─── Component ─── */
const SitterProfile = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  const navigate = useNavigate();
  const tabs = ['Profile', 'Availability', 'Reviews'];
  const firstName = SITTER.name.split(' ')[0];

  return (
    <div className="min-h-screen bg-[#F5F2ED] pt-20 pb-16">

      {/* ══════════ MOBILE layout (< md) ══════════ */}
      <div className="block md:hidden">

        {/* Back */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[12px] text-[#6B6560] font-semibold px-4 pt-3 pb-2">
          <ChevronLeft size={16} /> Back
        </button>

        {/* Main card */}
        <div className="mx-3 bg-white rounded-2xl border border-[#EEE8DC] overflow-hidden shadow-sm">

          {/* Cover */}
          <div className="h-[140px] relative overflow-hidden">
            <img src={SITTER.cover} alt="cover" className="w-full h-full object-cover" />
          </div>

          {/* Avatar + name row */}
          <div className="px-4 pb-4 relative">
            <div className="absolute -top-[46px] left-4">
              <img src={SITTER.avatar} alt={SITTER.name}
                className="w-[88px] h-[88px] rounded-full border-[4px] border-white object-cover shadow-md" />
            </div>
            <div className="pt-[50px] flex items-start justify-between">
              <div>
                <h1 className="text-[18px] font-serif font-bold text-[#2D2926] leading-tight">{SITTER.name}</h1>
              </div>
              <div className="text-right mt-1">
                <p className="text-[10px] text-[#9A9188]">Last active</p>
                <p className="text-[11px] font-bold text-[#2D2926]">{SITTER.lastActive}</p>
              </div>
            </div>

            {/* Location + verified */}
            <div className="flex items-center gap-2 mt-1.5">
              <MapPin size={12} className="text-[#788564]" />
              <span className="text-[12px] text-[#6B6560] font-medium">{SITTER.location}</span>
              <span className="flex items-center gap-0.5 bg-[#F2F6EE] border border-[#C5D1B2] text-[#5D7050] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                <Check size={9} strokeWidth={3} /> Verified
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <StarRow rating={SITTER.rating} />
              <span className="text-[11px] text-[#9A9188] underline cursor-pointer">{SITTER.reviewsCount} reviews</span>
            </div>

            {/* Request Booking */}
            <button className="mt-3 w-full bg-[#788564] hover:bg-[#626E51] text-white py-2.5 rounded-lg text-[13px] font-bold transition-all shadow-sm">
              Request Booking
            </button>
          </div>

          {/* Tabs */}
          <div className="flex items-center border-t border-[#EEE8DC] px-4">
            {tabs.map((t, i) => (
              <React.Fragment key={t}>
                <button
                  onClick={() => setActiveTab(t)}
                  className={`relative py-2.5 px-2 text-[12px] font-semibold transition-colors ${activeTab === t ? 'text-[#2D2926]' : 'text-[#B5AEA5]'}`}
                >
                  {t}
                  {activeTab === t && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#788564] rounded-t-full" />}
                </button>
                {i < tabs.length - 1 && <span className="text-[#DDD8CF] mx-1 text-xs">|</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="mx-3 mt-3 space-y-3">
          {activeTab === 'Profile' && <MobileProfileTab sitter={SITTER} firstName={firstName} />}
          {activeTab === 'Availability' && <MobileAvailabilityTab sitter={SITTER} />}
          {activeTab === 'Reviews' && <MobileReviewsTab sitter={SITTER} firstName={firstName} />}

          {/* Message button */}
          <button className="w-full bg-[#2D2926] hover:bg-black text-white py-3.5 rounded-xl font-bold text-[14px] flex items-center justify-center gap-2 shadow-md transition-all">
            Message {firstName}
          </button>
        </div>
      </div>

      {/* ══════════ DESKTOP layout (≥ md) ══════════ */}
      <div className="hidden md:block">
        <div className="max-w-[1100px] mx-auto px-6">

          {/* Back */}
          <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-[13px] text-[#6B6560] font-semibold mb-6 hover:text-[#2D2926] transition-colors">
            <ChevronLeft size={16} /> Back
          </button>

          {/* Main card */}
          <div className="bg-white rounded-2xl border border-[#EEE8DC] overflow-hidden shadow-sm mb-5">

            {/* Cover */}
            <div className="h-[200px] overflow-hidden">
              <img src={SITTER.cover} alt="cover" className="w-full h-full object-cover" />
            </div>

            {/* Avatar + info */}
            <div className="px-8 pb-7 relative">
              <div className="absolute -top-[56px] left-8">
                <img src={SITTER.avatar} alt={SITTER.name}
                  className="w-[110px] h-[110px] rounded-full border-[4px] border-white object-cover shadow-lg" />
              </div>

              <div className="pt-[62px] flex items-start justify-between gap-6">
                <div>
                  <h1 className="text-[26px] font-serif font-bold text-[#2D2926] leading-tight">{SITTER.name}</h1>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-[#788564]" />
                      <span className="text-[13px] text-[#6B6560] font-medium">{SITTER.location}</span>
                      <span className="flex items-center gap-1 bg-[#F2F6EE] border border-[#C5D1B2] text-[#5D7050] text-[11px] font-bold px-2 py-0.5 rounded-full ml-1">
                        <Check size={10} strokeWidth={3} /> Verified
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <StarRow rating={SITTER.rating} size={14} />
                      <span className="text-[12px] text-[#9A9188] underline cursor-pointer">{SITTER.reviewsCount} reviews</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1.5 text-[12px] text-[#9A9188] justify-end mb-3">
                    <Clock size={12} /> Last active {SITTER.lastActive}
                  </div>
                  <button className="bg-[#788564] hover:bg-[#626E51] text-white px-7 py-2.5 rounded-lg text-[14px] font-bold transition-all shadow-sm">
                    Request Booking
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center border-t border-[#EEE8DC] px-8">
              {tabs.map((t, i) => (
                <React.Fragment key={t}>
                  <button
                    onClick={() => setActiveTab(t)}
                    className={`relative py-3 px-3 text-[14px] font-semibold transition-colors ${activeTab === t ? 'text-[#2D2926]' : 'text-[#B5AEA5] hover:text-[#6B6560]'}`}
                  >
                    {t}
                    {activeTab === t && <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#788564] rounded-t-full" />}
                  </button>
                  {i < tabs.length - 1 && <span className="text-[#DDD8CF] mx-1">|</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div className="space-y-5">
            {activeTab === 'Profile' && <DesktopProfileTab sitter={SITTER} firstName={firstName} />}
            {activeTab === 'Availability' && <DesktopAvailabilityTab sitter={SITTER} />}
            {activeTab === 'Reviews' && <DesktopReviewsTab sitter={SITTER} firstName={firstName} />}

            {/* Message button */}
            <div className="flex justify-center pb-4">
              <button className="bg-[#2D2926] hover:bg-black text-white px-16 py-3.5 rounded-xl font-bold text-[15px] flex items-center justify-center gap-2 shadow-md transition-all">
                Message {firstName}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   SHARED CONTENT BLOCKS
───────────────────────────────────────── */

/* Verified banner */
const VERIFICATION_LOGOS = [logo1, logo2, logo3];

const VerifiedBanner = ({ sitter }: { sitter: typeof SITTER }) => (
  <div className="bg-white rounded-2xl border border-[#EEE8DC] p-5 shadow-sm space-y-4">
    <div className="flex items-center gap-3">
      <div className="w-[24px] h-[24px] rounded-full bg-[#788564] flex items-center justify-center shrink-0">
        <Check size={14} strokeWidth={3} className="text-white" />
      </div>
      <span className="text-[17px] font-bold text-[#3D5030]">Fully Verified Member</span>
    </div>
    <div className="flex flex-wrap gap-4">
      {sitter.verifications.map((v, i) => (
        <div key={i} className="flex items-center gap-3 bg-[#FAF8F5] border border-[#E8E2D8] rounded-[12px] px-4 py-2.5">
          <img
            src={VERIFICATION_LOGOS[i]}
            alt={v}
            className="w-[40px] h-[40px] object-contain drop-shadow-sm"
          />
          <span className="text-[15px] font-bold text-[#1B365D]">{v}</span>
        </div>
      ))}
    </div>
  </div>
);

/* Services row */
const ServicesRow = ({ sitter }: { sitter: typeof SITTER }) => (
  <div className="bg-white rounded-2xl border border-[#EEE8DC] p-5 shadow-sm">
    <h3 className="text-[12px] font-bold text-[#9A9188] uppercase tracking-widest mb-3.5">Services Offered</h3>
    <div className="flex flex-wrap gap-3">
      {sitter.services.map((s, i) => (
        <div key={i} className="flex items-center gap-2.5 bg-[#FAF8F5] border border-[#E8E2D8] rounded-[10px] px-4 py-2.5">
          <span className="text-[#788564]">{s.icon}</span>
          <span className="text-[14px] font-bold text-[#2D2926]">{s.label}</span>
          <span className="text-[12px] font-semibold text-[#8C8273]">{s.price}</span>
        </div>
      ))}
    </div>
  </div>
);

/* About section */
const AboutSection = ({ sitter }: { sitter: typeof SITTER }) => (
  <div className="bg-white rounded-2xl border border-[#EEE8DC] p-5 shadow-sm space-y-5">
    <div>
      <h3 className="text-[16px] font-serif font-bold text-[#2D2926] mb-2">About Me</h3>
      <p className="text-[13px] text-[#5A5550] leading-[1.75]">{sitter.about}</p>
    </div>
    
    {sitter.experiencesWith && sitter.experiencesWith.length > 0 && (
      <div>
        <h3 className="text-[16px] font-serif font-bold text-[#2D2926] mb-3">Experiences With</h3>
        <div className="flex flex-wrap gap-1.5">
          {sitter.experiencesWith.map(exp => (
            <span key={exp} className="px-2.5 py-1 bg-[#F2F6EE] border border-[#C5D1B2] text-[#5D7050] rounded-md text-[11px] font-bold">
              {exp}
            </span>
          ))}
        </div>
      </div>
    )}
  </div>
);

/* Availability grid */
const AvailGrid = ({ sitter }: { sitter: typeof SITTER }) => (
  <div className="bg-white rounded-2xl border border-[#EEE8DC] p-5 shadow-sm">
    <h3 className="text-[16px] font-serif font-bold text-[#2D2926] mb-4">Services Offered</h3>
    <div className="overflow-x-auto">
      <table className="w-full text-center text-[12px]">
        <thead>
          <tr className="border-b border-[#F0EAE0]">
            <th className="py-2 pr-4 text-left w-10"></th>
            {sitter.availability.dates.map((d, i) => (
              <th key={i} className="py-2 px-1.5 font-bold text-[#9A9188]">{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sitter.availability.rows.map((row, i) => (
            <tr key={i} className="border-b border-[#F0EAE0] last:border-0">
              <td className="py-2 pr-4 text-left font-bold text-[#9A9188]">{row.day}</td>
              {row.slots.map((s, j) => (
                <td key={j} className="py-2 px-1.5">
                  {s && (
                    <div className="w-6 h-6 mx-auto rounded-lg bg-[#F2F6EE] border border-[#C5D1B2] flex items-center justify-center">
                      <Check size={10} strokeWidth={3} className="text-[#788564]" />
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

/* Reviews list */
const ReviewsList = ({ sitter, firstName }: { sitter: typeof SITTER; firstName: string }) => (
  <div className="bg-white rounded-2xl border border-[#EEE8DC] p-5 shadow-sm space-y-5">
    <h3 className="text-[16px] font-serif font-bold text-[#2D2926]">{firstName}'s Reviews</h3>
    {sitter.reviews.map(r => (
      <div key={r.id} className="border-b border-[#F0EAE0] last:border-0 pb-5 last:pb-0">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-3">
            <img src={r.avatar} alt={r.author} className="w-10 h-10 rounded-full object-cover shrink-0" />
            <div>
              <p className="text-[13px] font-bold text-[#2D2926]">{r.author}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <StarRow rating={r.rating} size={11} />
                <span className="text-[11px] text-[#9A9188]">{r.location}</span>
              </div>
            </div>
          </div>
          <span className="text-[10px] text-[#B5AEA5] font-semibold shrink-0 mt-1">{r.date}</span>
        </div>
        <p className="text-[12px] text-[#5A5550] leading-[1.7]">{r.text}</p>
      </div>
    ))}
  </div>
);

/* ─── Mobile tab views ─── */
const MobileProfileTab = ({ sitter, firstName }: any) => (
  <div className="space-y-3">
    <VerifiedBanner sitter={sitter} />
    <ServicesRow sitter={sitter} />
    <AboutSection sitter={sitter} />
  </div>
);
const MobileAvailabilityTab = ({ sitter }: any) => <AvailGrid sitter={sitter} />;
const MobileReviewsTab = ({ sitter, firstName }: any) => <ReviewsList sitter={sitter} firstName={firstName} />;

/* ─── Desktop tab views ─── */
const DesktopProfileTab = ({ sitter, firstName }: any) => (
  <div className="space-y-5">
    <VerifiedBanner sitter={sitter} />
    <ServicesRow sitter={sitter} />
    <AboutSection sitter={sitter} />
    <AvailGrid sitter={sitter} />
    <ReviewsList sitter={sitter} firstName={firstName} />
  </div>
);
const DesktopAvailabilityTab = ({ sitter }: any) => <AvailGrid sitter={sitter} />;
const DesktopReviewsTab = ({ sitter, firstName }: any) => <ReviewsList sitter={sitter} firstName={firstName} />;

export default SitterProfile;
