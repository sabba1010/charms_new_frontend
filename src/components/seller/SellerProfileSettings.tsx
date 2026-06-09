import React, { useState } from 'react';
import { 
  Camera, MapPin, Plus, Trash2, Check, Shield, Briefcase, 
  Dog, Info, Calendar, Clock, Star, Heart, Sparkles, MessageSquare 
} from 'lucide-react';
import { cn } from '../../lib/utils';

import logo1 from '../../assets/png/1 (1).png';
import logo2 from '../../assets/png/2 (1).png';
import logo3 from '../../assets/png/3 (1).png';

const EXPERIENCES_OPTIONS = [
  'Dogs', 'Cats', 'Birds', 'Fish', 'Rabbits', 'Guinea Pigs', 'Reptiles', 'Horses',
  'Farm Animals', 'Livestock', 'Poultry', 'Puppy Care', 'Senior Pets', 'Rescue Animals',
  'Medication Administration', 'Disabled Pets', 'Large Breed Dogs', 'Multiple Pet Households',
  'Breeding Kennels', 'Whelping & Puppy Care', 'Farm Management Assistance', 'Small Holdings',
  'Farms', 'Holiday Homes', 'Security Presence While Away', 'Garden & Plant Care', 'Pool Maintenance Checks'
];

interface Service {
  id: number;
  name: string;
  price: string;
  unit: string;
}

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

const SellerProfileSettings = () => {
  // 1. Core Profile Details state
  const [profile, setProfile] = useState({
    fullName: 'Lisa Jacobs',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
    location: 'Cape Town',
    bio: 'Experienced pet and house sitter with a love for animals. Offering trustworthy care for your pets and home while you\'re away. Passionate about giving your furry friends lots of love and attention!',
    lastActive: '3 hours ago',
    reviewsCount: 25,
    rating: 4.8,
    idVerified: true,
    addressVerified: true,
    policeClearance: true,
    experiencesWith: ['Dogs', 'Cats', 'Puppy Care'] as string[]
  });

  // 2. Services list state
  const [services, setServices] = useState<Service[]>([
    { id: 1, name: 'Pet Sitting', price: '200', unit: 'day' },
    { id: 2, name: 'Dog Walking', price: '150', unit: 'hr' },
  ]);

  const [newService, setNewService] = useState({ name: '', price: '', unit: 'day' });

  // 3. Availability matrix state
  const [availability, setAvailability] = useState({
    Tor: [true, true, false, true, false, true, false, true],
    Kar: [true, true, false, true, true, false, true, true],
    Suir: [true, true, false, false, false, false, false, false]
  });

  // 4. State updates
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setProfile(prev => ({ ...prev, [key]: objectUrl }));
    }
  };

  const handleToggleVerification = (key: 'idVerified' | 'addressVerified' | 'policeClearance') => {
    setProfile(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const addService = () => {
    if (newService.name && newService.price) {
      setServices([...services, { ...newService, id: Date.now() }]);
      setNewService({ name: '', price: '', unit: 'day' });
    }
  };

  const removeService = (id: number) => {
    setServices(services.filter(s => s.id !== id));
  };

  const toggleAvailability = (row: 'Tor' | 'Kar' | 'Suir', index: number) => {
    setAvailability(prev => {
      const updatedRow = [...prev[row]];
      updatedRow[index] = !updatedRow[index];
      return { ...prev, [row]: updatedRow };
    });
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* ================= LEFT COLUMN: CONFIGURATION FORMS ================= */}
      <div className="xl:col-span-6 space-y-8">
        
        {/* Visuals Configuration */}
        <section className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm space-y-6">
          <div>
            <h3 className="text-[16px] font-bold text-slate-900">Profile Visuals</h3>
            <p className="text-xs text-slate-400 mt-1">Configure your avatar image and background banner backdrop.</p>
          </div>

          <div className="space-y-4 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-slate-900 block">Profile Banner / Cover Photo</label>
              <div className="flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-2 px-4 py-2 border border-slate-200 hover:border-[#6B7A5F] bg-white hover:bg-slate-50 rounded-lg cursor-pointer transition-all text-xs font-bold text-slate-700 shadow-sm">
                  <Camera size={14} />
                  <span>Upload Banner File</span>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'coverImage')}
                    className="hidden" 
                  />
                </label>
                <span className="text-[11px] text-slate-400 italic">Select cover banner image file</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-bold text-slate-900 block">Avatar Picture</label>
              <div className="flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-2 px-4 py-2 border border-slate-200 hover:border-[#6B7A5F] bg-white hover:bg-slate-50 rounded-lg cursor-pointer transition-all text-xs font-bold text-slate-700 shadow-sm">
                  <Camera size={14} />
                  <span>Upload Avatar File</span>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'avatar')}
                    className="hidden" 
                />
              </label>
              <span className="text-[11px] text-slate-400 italic">Select circular avatar picture file</span>
            </div>
          </div>
        </div>
        </section>

        {/* Basic Sitter Info */}
        <section className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm space-y-6">
          <div>
            <h3 className="text-[16px] font-bold text-slate-900">About Me Settings</h3>
            <p className="text-xs text-slate-400 mt-1">Describe your passion and experience with pets.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-slate-900">Full Name</label>
              <input 
                type="text" 
                name="fullName"
                value={profile.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-[13px] text-slate-600 focus:border-[#6B7A5F] outline-none transition-all" 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-slate-900">Location City</label>
              <input 
                type="text" 
                name="location"
                value={profile.location}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-[13px] text-slate-600 focus:border-[#6B7A5F] outline-none transition-all" 
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] font-bold text-slate-900">Bio Description</label>
            <textarea 
              rows={4} 
              name="bio"
              value={profile.bio}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-[13px] text-slate-600 focus:border-[#6B7A5F] outline-none transition-all resize-none" 
            />
          </div>
        </section>

        {/* Services & Pricing Manager */}
        <section className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm space-y-6">
          <div>
            <h3 className="text-[16px] font-bold text-slate-900">Services & Pricing Offered</h3>
            <p className="text-xs text-slate-400 mt-1">Manage the services you offer and set competitive rates.</p>
          </div>

          {/* Current list in form */}
          <div className="space-y-2">
            {services.map((service) => (
              <div key={service.id} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-lg border border-slate-100 text-[#6B7A5F]">
                    <Dog size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{service.name}</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">R{service.price} / {service.unit}</p>
                  </div>
                </div>
                <button 
                  onClick={() => removeService(service.id)}
                  className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>

          {/* Add service panel */}
          <div className="bg-[#fcfbf9] border border-[#f3eee5] rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">Add New Service</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input 
                type="text" 
                placeholder="e.g. House Sitting"
                value={newService.name}
                onChange={(e) => setNewService(prev => ({ ...prev, name: e.target.value }))}
                className="bg-white border border-slate-200 rounded-lg p-2.5 text-xs outline-none"
              />
              <div className="flex gap-2">
                <input 
                  type="number" 
                  placeholder="Price"
                  value={newService.price}
                  onChange={(e) => setNewService(prev => ({ ...prev, price: e.target.value }))}
                  className="bg-white border border-slate-200 rounded-lg p-2.5 text-xs outline-none flex-1 w-20"
                />
                <select 
                  value={newService.unit}
                  onChange={(e) => setNewService(prev => ({ ...prev, unit: e.target.value }))}
                  className="bg-white border border-slate-200 rounded-lg p-2.5 text-xs outline-none w-20"
                >
                  <option value="day">/day</option>
                  <option value="hr">/hr</option>
                  <option value="visit">/visit</option>
                </select>
              </div>
              <button 
                onClick={addService}
                className="bg-[#6B7A5F] hover:bg-[#57644e] text-white py-2.5 rounded-lg text-xs font-bold transition-colors"
              >
                Add Service
              </button>
            </div>
          </div>
        </section>

        {/* Availability grids */}
        <section className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm space-y-6">
          <div>
            <h3 className="text-[16px] font-bold text-slate-900">Availability Grid</h3>
            <p className="text-xs text-slate-400 mt-1">Configure your weekly slots by clicking checkmarks.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-2"></th>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                    <th key={n} className="p-2 text-[11px] font-bold text-slate-400">{n}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(['Tor', 'Kar', 'Suir'] as const).map((row) => (
                  <tr key={row} className="border-t border-slate-50">
                    <td className="p-2 text-xs font-bold text-slate-600 w-16">{row}</td>
                    {availability[row].map((isActive, index) => (
                      <td key={index} className="p-2 text-center">
                        <button 
                          onClick={() => toggleAvailability(row, index)}
                          className={cn(
                            "w-7 h-7 rounded-md border flex items-center justify-center transition-all mx-auto",
                            isActive 
                              ? "bg-[#6B7A5F] border-[#6B7A5F] text-white shadow-sm" 
                              : "border-slate-100 hover:border-slate-300 text-slate-300 bg-slate-50/50"
                          )}
                        >
                          <Check size={14} className={cn("transition-opacity", isActive ? "opacity-100" : "opacity-10")} />
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Experiences With config */}
        <section className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm space-y-6">
          <div>
            <h3 className="text-[16px] font-bold text-slate-900">Experiences With</h3>
            <p className="text-xs text-slate-400 mt-1">Select the types of animals and care you have experience with.</p>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {EXPERIENCES_OPTIONS.map(exp => {
              const isSelected = profile.experiencesWith.includes(exp);
              return (
                <button
                  key={exp}
                  onClick={() => {
                    setProfile(prev => ({
                      ...prev,
                      experiencesWith: isSelected
                        ? prev.experiencesWith.filter(x => x !== exp)
                        : [...prev.experiencesWith, exp]
                    }));
                  }}
                  className={`px-3 py-1.5 rounded-full border text-[11px] font-medium transition-all ${
                    isSelected 
                      ? 'bg-[#6B7A5F] border-[#6B7A5F] text-white shadow-sm'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-[#6B7A5F] hover:text-[#6B7A5F]'
                  }`}
                >
                  {isSelected && <Check size={10} className="inline-block mr-1 -mt-0.5" />}
                  {exp}
                </button>
              );
            })}
          </div>
        </section>

        {/* Trust Badges config */}
        <section className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm space-y-6">
          <div>
            <h3 className="text-[16px] font-bold text-slate-900">Verification Checklist</h3>
            <p className="text-xs text-slate-400 mt-1">Earn trust flags to make your profile look premier.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'idVerified', label: 'ID Verified' },
              { id: 'addressVerified', label: 'Address Verified' },
              { id: 'policeClearance', label: 'Police Clearance' }
            ].map((v) => (
              <label key={v.id} className="flex items-center gap-2.5 p-3.5 bg-slate-50 border border-slate-100 rounded-xl cursor-pointer select-none text-xs font-bold text-slate-700">
                <input 
                  type="checkbox" 
                  checked={profile[v.id as keyof typeof profile] as boolean}
                  onChange={() => handleToggleVerification(v.id as 'idVerified' | 'addressVerified' | 'policeClearance')}
                  className="rounded border-slate-200 text-[#6B7A5F] focus:ring-[#6B7A5F] w-4.5 h-4.5"
                />
                <span>{v.label}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Save */}
        <div className="flex justify-end pt-4">
          <button className="w-full bg-[#111c1e] text-white py-3.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-black transition-all shadow-lg active:scale-95">
            Save Changes
          </button>
        </div>

      </div>

      {/* ================= RIGHT COLUMN: INTERACTIVE PREVIEW CARD ================= */}
      <div className="xl:col-span-6 space-y-4">
        
        {/* Preview header */}
        <div className="flex items-center gap-2 px-1 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
          <Sparkles size={13} className="text-amber-500" />
          <span>Real-time Live Sitter Profile Preview</span>
        </div>

        {/* Main preview container mirroring SitterProfile.tsx */}
        <div className="space-y-5 bg-[#FAF8F5] p-5 rounded-2xl border border-slate-100 shadow-inner overflow-hidden">
          
          {/* Main card */}
          <div className="bg-white rounded-2xl border border-[#EEE8DC] overflow-hidden shadow-sm">
            {/* Cover */}
            <div className="h-[140px] overflow-hidden">
              <img src={profile.coverImage} alt="cover" className="w-full h-full object-cover" />
            </div>
            {/* Avatar + info */}
            <div className="px-6 pb-6 relative">
              <div className="absolute -top-[45px] left-6">
                <img src={profile.avatar} alt="avatar" className="w-[90px] h-[90px] rounded-full border-[4px] border-white object-cover shadow-lg" />
              </div>

              <div className="pt-[52px] flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-[20px] font-serif font-bold text-[#2D2926] leading-tight">{profile.fullName || 'Sitter Name'}</h1>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={12} className="text-[#788564]" />
                      <span className="text-[12px] text-[#6B6560] font-medium">{profile.location || 'Location'}</span>
                      <span className="flex items-center gap-1 bg-[#F2F6EE] border border-[#C5D1B2] text-[#5D7050] text-[10px] font-bold px-2 py-0.5 rounded-full ml-1">
                        <Check size={10} strokeWidth={3} /> Verified
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <StarRow rating={profile.rating} size={12} />
                      <span className="text-[11px] text-[#9A9188] underline">{profile.reviewsCount} reviews</span>
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1.5 text-[10px] text-[#9A9188] justify-end mb-2">
                    <Clock size={10} /> Last active {profile.lastActive}
                  </div>
                  <button className="bg-[#788564] text-white px-4 py-2 rounded-lg text-[12px] font-bold shadow-sm whitespace-nowrap">
                    Request Booking
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center border-t border-[#EEE8DC] px-6">
              {['Profile', 'Availability', 'Reviews'].map((t, i) => (
                <React.Fragment key={t}>
                  <div className={`relative py-3 px-3 text-[12px] font-semibold ${i === 0 ? 'text-[#2D2926]' : 'text-[#B5AEA5]'}`}>
                    {t}
                    {i === 0 && <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#788564] rounded-t-full" />}
                  </div>
                  {i < 2 && <span className="text-[#DDD8CF] mx-1">|</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Verified banner */}
          {(profile.idVerified || profile.addressVerified || profile.policeClearance) && (
            <div className="bg-white rounded-2xl border border-[#EEE8DC] p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-[20px] h-[20px] rounded-full bg-[#788564] flex items-center justify-center shrink-0">
                  <Check size={12} strokeWidth={3} className="text-white" />
                </div>
                <span className="text-[15px] font-bold text-[#3D5030]">Fully Verified Member</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {[
                  { id: 'idVerified', label: 'ID Verified' },
                  { id: 'addressVerified', label: 'Address Verified' },
                  { id: 'policeClearance', label: 'Police Clearance' }
                ].map((v, i) => {
                  if (!profile[v.id as keyof typeof profile]) return null;
                  return (
                    <div key={v.id} className="flex items-center gap-2 bg-[#FAF8F5] border border-[#E8E2D8] rounded-[10px] px-3.5 py-2">
                      <img src={[logo1, logo2, logo3][i]} alt={v.label} className="w-[28px] h-[28px] object-contain drop-shadow-sm" />
                      <span className="text-[12px] font-bold text-[#1B365D]">{v.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Services Offered */}
          <div className="bg-white rounded-2xl border border-[#EEE8DC] p-5 shadow-sm">
            <h3 className="text-[11px] font-bold text-[#9A9188] uppercase tracking-widest mb-3.5">Services Offered</h3>
            <div className="flex flex-wrap gap-3">
              {services.length === 0 ? <p className="text-xs text-slate-400 italic">No services</p> : services.map(s => (
                <div key={s.id} className="flex items-center gap-2.5 bg-[#FAF8F5] border border-[#E8E2D8] rounded-[10px] px-4 py-2.5">
                  <Dog size={16} className="text-[#788564]" />
                  <span className="text-[13px] font-bold text-[#2D2926]">{s.name}</span>
                  <span className="text-[11px] font-semibold text-[#8C8273]">R{s.price}/{s.unit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* About Me */}
          <div className="bg-white rounded-2xl border border-[#EEE8DC] p-5 shadow-sm">
            <h3 className="text-[15px] font-serif font-bold text-[#2D2926] mb-2">About Me</h3>
            <p className="text-[12px] text-[#5A5550] leading-[1.75] whitespace-pre-line">{profile.bio}</p>
          </div>

          {/* Experiences With Preview */}
          {profile.experiencesWith.length > 0 && (
            <div className="bg-white rounded-2xl border border-[#EEE8DC] p-5 shadow-sm">
              <h3 className="text-[15px] font-serif font-bold text-[#2D2926] mb-4">Experiences With</h3>
              <div className="flex flex-wrap gap-1.5">
                {profile.experiencesWith.map(exp => (
                  <span key={exp} className="px-2.5 py-1 bg-[#F2F6EE] border border-[#C5D1B2] text-[#5D7050] rounded-md text-[10px] font-bold">
                    {exp}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Availability Grid */}
          <div className="bg-white rounded-2xl border border-[#EEE8DC] p-5 shadow-sm overflow-x-auto">
            <h3 className="text-[15px] font-serif font-bold text-[#2D2926] mb-4">Availability</h3>
            <table className="w-full text-[12px] min-w-[400px]">
              <thead>
                <tr>
                  <th className="pb-3 w-[50px]"></th>
                  {[20, 21, 22, 24, 25, 26, 23, 28].map(d => (
                    <th key={d} className="pb-3 text-center text-[#9A9188] font-semibold">{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(['Tor', 'Kar', 'Suir'] as const).map(row => (
                  <tr key={row} className="border-b border-[#F0EAE0] last:border-0">
                    <td className="py-2.5 text-left font-bold text-[#9A9188]">{row}</td>
                    {availability[row].map((s, j) => (
                      <td key={j} className="py-2.5 px-1 text-center">
                        {s && (
                          <div className="w-[20px] h-[20px] mx-auto rounded-md bg-[#F2F6EE] border border-[#C5D1B2] flex items-center justify-center">
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

          {/* Reviews */}
          <div className="bg-white rounded-2xl border border-[#EEE8DC] p-5 shadow-sm space-y-5">
            <h3 className="text-[15px] font-serif font-bold text-[#2D2926]">{profile.fullName.split(' ')[0]}'s Reviews</h3>
            
            <div className="border-b border-[#F0EAE0] pb-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" alt="Reviewer" className="w-9 h-9 rounded-full object-cover shrink-0" />
                  <div>
                    <p className="text-[12px] font-bold text-[#2D2926]">Rachel M.</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <StarRow rating={4} size={10} />
                      <span className="text-[10px] font-semibold text-[#8C8273]">Cape Town</span>
                    </div>
                  </div>
                </div>
                <span className="text-[10px] text-[#9A9188] font-medium">3 weeks ago</span>
              </div>
              <p className="text-[12px] text-[#5A5550] leading-[1.6]">Experienced pet sitter {profile.fullName.split(' ')[0]} is friendly and warm. Highly reliable and very caring.</p>
            </div>

            <div className="pb-1">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" alt="Reviewer" className="w-9 h-9 rounded-full object-cover shrink-0" />
                  <div>
                    <p className="text-[12px] font-bold text-[#2D2926]">Stephen T.</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <StarRow rating={5} size={10} />
                      <span className="text-[10px] font-semibold text-[#8C8273]">Cape Town</span>
                    </div>
                  </div>
                </div>
                <span className="text-[10px] text-[#9A9188] font-medium">2 months ago</span>
              </div>
              <p className="text-[12px] text-[#5A5550] leading-[1.6]">Excellent pet sitter! Highly recommend to anyone seeking peaceful pet care.</p>
            </div>
          </div>

          {/* Message button */}
          <div className="flex justify-center pb-2">
            <button className="bg-[#2D2926] text-white px-12 py-3 rounded-xl font-bold text-[13px] shadow-md">
              Message {profile.fullName.split(' ')[0]}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default SellerProfileSettings;
