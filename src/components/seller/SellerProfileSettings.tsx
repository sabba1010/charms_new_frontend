import React, { useState } from 'react';
import { 
  Camera, MapPin, Plus, Trash2, Check, Shield, Briefcase, 
  Dog, Info, Calendar, Clock, Star, Heart, Sparkles, MessageSquare 
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface Service {
  id: number;
  name: string;
  price: string;
  unit: string;
}

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
    policeClearance: true
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

        {/* Main preview container mimicking their second uploaded screenshot exactly! */}
        <div className="bg-[#fcfcfc] border border-slate-100 rounded-2xl p-5 space-y-6 shadow-sm">
          
          {/* Header Visual Box */}
          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm relative">
            
            {/* Banner Backdrop */}
            <div className="h-44 w-full relative overflow-hidden bg-slate-100">
              <img 
                src={profile.coverImage} 
                alt="Sitter banner cover" 
                className="w-full h-full object-cover transition-all duration-300"
              />
            </div>

            {/* Profile Avatar and Info */}
            <div className="px-6 pb-6 pt-16 relative">
              
              {/* Avatar overlapping backdrop banner */}
              <div className="absolute -top-12 left-6">
                <img 
                  src={profile.avatar} 
                  alt="Sitter portrait" 
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-md transition-all duration-300"
                />
              </div>

              {/* Title & Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold font-serif text-slate-800 transition-all duration-300">
                    {profile.fullName || 'No Name Configured'}
                  </h3>
                  
                  {/* Badges row */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] text-slate-400 font-semibold">
                    <span className="flex items-center gap-0.5">
                      <MapPin size={12} /> {profile.location}
                    </span>
                    <span className="flex items-center gap-0.5">
                      <Star size={11} className="text-amber-400 fill-amber-400" />
                      <Star size={11} className="text-amber-400 fill-amber-400" />
                      <Star size={11} className="text-amber-400 fill-amber-400" />
                      <Star size={11} className="text-amber-400 fill-amber-400" />
                      <span className="text-slate-500 font-bold ml-1">{profile.reviewsCount} reviews</span>
                    </span>
                    <span className="text-[9px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
                      <Clock size={10} /> Last Active: {profile.lastActive}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="bg-[#5c7a6b] hover:bg-[#465d51] text-white px-4.5 py-2 rounded-full text-xs font-bold transition-all shadow-sm">
                    Request Booking
                  </button>
                  <button className="p-2 border border-slate-100 rounded-full hover:bg-slate-50 text-slate-400">
                    <Heart size={14} className="fill-current text-slate-200" />
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Navigation tabs simulation */}
          <div className="bg-slate-50 p-1 rounded-full border border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
            <span className="flex-1 text-center py-2 bg-white text-slate-800 rounded-full shadow-sm">Profile</span>
            <span className="flex-1 text-center py-2">Availability</span>
            <span className="flex-1 text-center py-2">Reviews</span>
          </div>

          {/* About Me Section Card */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">About Me</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium transition-all duration-300">
                {profile.bio || 'Tell potential clients about yourself...'}
              </p>
            </div>

            {/* Dynamic Services offered Cards grid */}
            <div className="space-y-3 pt-2">
              <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Services Offered</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.length === 0 ? (
                  <p className="col-span-2 text-xs text-slate-400 italic py-2">No services configured yet.</p>
                ) : (
                  services.map((service) => (
                    <div key={service.id} className="bg-slate-50/50 border border-slate-100/80 rounded-xl p-3.5 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-slate-700">
                        <Dog size={16} className="text-[#6B7A5F]" />
                        <span className="text-xs font-bold">{service.name}</span>
                      </div>
                      <span className="text-xs font-extrabold text-slate-800">R{service.price}/{service.unit}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Availability Grid Box */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-50 pb-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Availability</h4>
              <Calendar size={14} className="text-slate-400" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="p-1"></th>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                      <th key={n} className="p-1 text-[9px] font-bold text-slate-300">{n}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(['Tor', 'Kar', 'Suir'] as const).map((row) => (
                    <tr key={row} className="border-t border-slate-50/50">
                      <td className="p-1.5 text-[10px] font-bold text-slate-400">{row}</td>
                      {availability[row].map((isActive, index) => (
                        <td key={index} className="p-1.5 text-center">
                          {isActive && (
                            <div className="w-4 h-4 bg-[#6B7A5F]/10 text-[#6B7A5F] rounded-full flex items-center justify-center mx-auto">
                              <Check size={10} strokeWidth={3} />
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

          {/* Sitter reviews simulator block */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-5">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">{profile.fullName.split(' ')[0]}'s Reviews</h4>
            
            <div className="space-y-4 divide-y divide-slate-50">
              {/* Review 1 */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" 
                      alt="Reviewer Rachel" 
                      className="w-8 h-8 rounded-full object-cover" 
                    />
                    <div>
                      <h5 className="text-[11px] font-bold text-slate-800">Rachel M.</h5>
                      <span className="text-[9px] text-slate-400 font-bold uppercase">Cape Town • ⭐⭐⭐⭐</span>
                    </div>
                  </div>
                  <span className="text-[9px] text-slate-400 font-semibold">3 weeks ago</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium italic">
                  "Experienced pet sitter {profile.fullName.split(' ')[0]} is easy, highly reliable, and very caring. Sitters like her are hard to find!"
                </p>
              </div>

              {/* Review 2 */}
              <div className="space-y-2 pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" 
                      alt="Reviewer Stephen" 
                      className="w-8 h-8 rounded-full object-cover" 
                    />
                    <div>
                      <h5 className="text-[11px] font-bold text-slate-800">Stephen T.</h5>
                      <span className="text-[9px] text-slate-400 font-bold uppercase">Cape Town • ⭐⭐⭐⭐⭐</span>
                    </div>
                  </div>
                  <span className="text-[9px] text-slate-400 font-semibold">2 months ago</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium italic">
                  "Excellent pet sitter! Bella and Rocky absolutely loved her. Highly recommend to anyone seeking peaceful pet care."
                </p>
              </div>
            </div>
          </div>

          {/* Send Message visual box */}
          <div className="bg-[#111c1e] text-white p-5 rounded-2xl shadow-sm text-center space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider">Send a Message</h4>
            <p className="text-[11px] text-slate-300">Want to book {profile.fullName.split(' ')[0]}? Send a direct message to discuss your needs.</p>
            <button className="w-full bg-[#5c7a6b] hover:bg-[#4d6659] text-white py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors">
              <MessageSquare size={13} /> Message Now
            </button>
          </div>

          {/* Verifications panel list */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-50 pb-2 text-slate-800">
              <Shield size={15} className="text-[#6B7A5F]" />
              <h4 className="text-xs font-bold uppercase tracking-wider">Verifications</h4>
            </div>

            <div className="space-y-2">
              {[
                { id: 'idVerified', label: 'ID Verified' },
                { id: 'addressVerified', label: 'Address Verified' },
                { id: 'policeClearance', label: 'Police Clearance' }
              ].map((v) => {
                const isCheck = profile[v.id as keyof typeof profile] as boolean;
                return (
                  <div key={v.id} className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-100/50 rounded-xl">
                    <span className="text-xs font-bold text-slate-700">{v.label}</span>
                    <div className={cn(
                      "w-4 h-4 rounded-full flex items-center justify-center text-white",
                      isCheck ? "bg-emerald-500" : "bg-slate-200"
                    )}>
                      <Check size={10} strokeWidth={3} />
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="pt-2 flex items-center gap-1.5 text-[9px] font-extrabold text-[#6B7A5F] uppercase tracking-wider">
              <span>🏆 Top Rated Sitter</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default SellerProfileSettings;
