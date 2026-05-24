import React, { useState, useEffect } from 'react';
import {
  ChevronRight, Share2, Video, Camera, Globe,
  Music2, MessageCircle, MapPin, Check, Plus, Trash2,
  User, Phone, Briefcase, Heart, Star, Sparkles, Home, Shield,
  Loader2
} from 'lucide-react';
import { cn } from '../../../lib/utils';

interface Pet {
  id: number;
  name: string;
  type: string;
  age: string;
  image: string;
  rating: number;
}

const ProfileSection = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // 1. Profile State
  const [profile, setProfile] = useState({
    displayName: '',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=800&auto=format&fit=crop',
    location: '',
    phone: '',
    profession: '',
    aboutUs: "",
    homeFeatures: {
      nonSmoking: false,
      spaciousBackyard: false,
      securityAlarm: false,
      homeChecks: false
    }
  });

  // 2. Pets List State
  const [pets, setPets] = useState<Pet[]>([]);
  const [newPet, setNewPet] = useState({ name: '', type: 'DOG', age: '', image: '', rating: 5.0 });

  const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const res = await fetch(`${apiUrl}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success && data.user) {
          const u = data.user;
          setProfile({
            displayName: u.displayName || `${u.firstName} ${u.lastName}`,
            avatar: u.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
            coverImage: u.coverImage || 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=800&auto=format&fit=crop',
            location: u.location || '',
            phone: u.phone || '',
            profession: u.profession || '',
            aboutUs: u.aboutUs || '',
            homeFeatures: {
              nonSmoking: u.homeFeatures?.nonSmoking || false,
              spaciousBackyard: u.homeFeatures?.spaciousBackyard || false,
              securityAlarm: u.homeFeatures?.securityAlarm || false,
              homeChecks: u.homeFeatures?.homeChecks || false
            }
          });
          if (u.pets && Array.isArray(u.pets)) {
            setPets(u.pets.map((p: any, i: number) => ({ id: i + 1, ...p })));
          }
        }
      } catch (err) {
        console.error('Error fetching profile', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [apiUrl]);

  // Upload to Cloudinary / Backend upload endpoint logic
  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    const token = localStorage.getItem('token');
    const res = await fetch(`${apiUrl}/upload`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });
    const data = await res.json();
    if (data.success) {
      if (data.fileUrl.startsWith('http')) {
        return data.fileUrl;
      }
      // Return absolute URL assuming the backend returns relative path
      const backendUrl = apiUrl.replace('/api', '');
      return `${backendUrl}${data.fileUrl.startsWith('/') ? '' : '/'}${data.fileUrl}`;
    }
    throw new Error('Upload failed');
  };

  // 3. Handle Form Changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const url = await uploadImage(file);
        setProfile(prev => ({ ...prev, [key]: url }));
      } catch (err) {
        setErrorMsg('Failed to upload image');
      }
    }
  };

  const handlePetFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const url = await uploadImage(file);
        setNewPet(prev => ({ ...prev, image: url }));
      } catch (err) {
        setErrorMsg('Failed to upload pet image');
      }
    }
  };

  const handleCheckboxChange = (feature: keyof typeof profile.homeFeatures) => {
    setProfile(prev => ({
      ...prev,
      homeFeatures: {
        ...prev.homeFeatures,
        [feature]: !prev.homeFeatures[feature]
      }
    }));
  };

  // 4. Handle Pet additions/deletions
  const handleAddPet = () => {
    if (!newPet.name) return;
    const petId = pets.length > 0 ? Math.max(...pets.map(p => p.id)) + 1 : 1;
    const petImg = newPet.image || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=200&auto=format&fit=crop';

    setPets(prev => [...prev, { id: petId, ...newPet, image: petImg }]);
    setNewPet({ name: '', type: 'DOG', age: '', image: '', rating: 5.0 });
  };

  const handleDeletePet = (id: number) => {
    setPets(prev => prev.filter(pet => pet.id !== id));
  };

  // Save profile to backend
  const handleSaveProfile = async () => {
    setSaving(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${apiUrl}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...profile,
          pets: pets.map(({ id, ...rest }) => rest) // remove id
        })
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg('Profile updated successfully!');
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        setErrorMsg(data.message || 'Failed to update profile');
      }
    } catch (err) {
      setErrorMsg('An error occurred while saving.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center py-20 text-slate-400"><Loader2 className="animate-spin" size={24} /></div>;
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">

      {/* ================= LEFT COLUMN: PROFILE FORM SECTION ================= */}
      <div className="xl:col-span-6 bg-white rounded-2xl border border-slate-100 p-8 shadow-sm space-y-8">

        <div>
          <h2 className="text-[18px] font-bold text-slate-900">Update Profile Details</h2>
          <p className="text-xs text-slate-400 mt-1">Complete your profile to look professional and build trust with sitters.</p>
        </div>

        {/* Banner and Avatar File configuration */}
        <div className="space-y-4 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-slate-900 block">Profile Banner / Cover Photo</label>
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 px-4 py-2 border border-slate-200 hover:border-[#111c1e] bg-white hover:bg-slate-50 rounded-lg cursor-pointer transition-all text-xs font-bold text-slate-700 shadow-sm">
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
              <label className="flex items-center gap-2 px-4 py-2 border border-slate-200 hover:border-[#111c1e] bg-white hover:bg-slate-50 rounded-lg cursor-pointer transition-all text-xs font-bold text-slate-700 shadow-sm">
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

        {/* Text Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[13px] font-bold text-slate-900">Display Name / Title</label>
            <input
              type="text"
              name="displayName"
              value={profile.displayName}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-[13px] text-slate-600 focus:border-[#111c1e] outline-none transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] font-bold text-slate-900">Location City</label>
            <input
              type="text"
              name="location"
              value={profile.location}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-[13px] text-slate-600 focus:border-[#111c1e] outline-none transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] font-bold text-slate-900">Contact Number</label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-[13px] text-slate-600 focus:border-[#111c1e] outline-none transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] font-bold text-slate-900">Profession</label>
            <input
              type="text"
              name="profession"
              value={profile.profession}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-[13px] text-slate-600 focus:border-[#111c1e] outline-none transition-all"
            />
          </div>
        </div>

        {/* About me */}
        <div className="space-y-1.5">
          <label className="text-[13px] font-bold text-slate-900">About Us / Description</label>
          <textarea
            rows={4}
            name="aboutUs"
            value={profile.aboutUs}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-[13px] text-slate-600 focus:border-[#111c1e] outline-none transition-all resize-none"
          />
        </div>

        {/* 🏠 Home Features checklist */}
        <div className="space-y-3 pt-2">
          <h3 className="text-[14px] font-bold text-slate-900 border-b border-slate-50 pb-2">Home Features Checklist</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { id: 'nonSmoking', label: 'Non smoking family home' },
              { id: 'spaciousBackyard', label: 'Spacious backyard with a pool' },
              { id: 'securityAlarm', label: 'Security alarm & electric gate' },
              { id: 'homeChecks', label: 'Basic home security checks' }
            ].map((item) => (
              <label key={item.id} className="flex items-center gap-3 cursor-pointer text-xs font-semibold text-slate-600 select-none">
                <input
                  type="checkbox"
                  checked={profile.homeFeatures[item.id as keyof typeof profile.homeFeatures]}
                  onChange={() => handleCheckboxChange(item.id as keyof typeof profile.homeFeatures)}
                  className="rounded border-slate-200 text-[#111c1e] focus:ring-[#111c1e] w-4.5 h-4.5"
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 🐾 Pets Configuration list */}
        <div className="space-y-4 pt-2">
          <h3 className="text-[14px] font-bold text-slate-900 border-b border-slate-50 pb-2 flex items-center justify-between">
            <span>Meet Our Pets ({pets.length})</span>
          </h3>

          {/* New Pet inputs */}
          <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Pet Name</label>
              <input
                type="text"
                placeholder="Buddy"
                value={newPet.name}
                onChange={(e) => setNewPet(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-[12px] outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Type</label>
              <input
                type="text"
                placeholder="DOG / CAT"
                value={newPet.type}
                onChange={(e) => setNewPet(prev => ({ ...prev, type: e.target.value.toUpperCase() }))}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-[12px] outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Age / Description</label>
              <input
                type="text"
                placeholder="5 years old"
                value={newPet.age}
                onChange={(e) => setNewPet(prev => ({ ...prev, age: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-[12px] outline-none"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase block">Pet Photo</label>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 bg-white hover:bg-slate-50 rounded-lg cursor-pointer transition-all text-[11px] font-bold text-slate-700 shadow-sm">
                  <Camera size={12} />
                  <span>Choose Image File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePetFileChange}
                    className="hidden"
                  />
                </label>
                {newPet.image ? (
                  <span className="text-[10px] text-emerald-600 font-bold">Image selected!</span>
                ) : (
                  <span className="text-[10px] text-slate-400">No file chosen</span>
                )}
              </div>
            </div>

            <button
              onClick={handleAddPet}
              className="sm:col-span-2 w-full bg-[#111c1e] text-white py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <Plus size={14} /> Add Pet to Listing
            </button>
          </div>

          {/* Current Pets list in Form */}
          <div className="space-y-2">
            {pets.map((pet) => (
              <div key={pet.id} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl">
                <div className="flex items-center gap-3">
                  <img src={pet.image} alt={pet.name} className="w-10 h-10 rounded-full object-cover border border-slate-100" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{pet.name}</h4>
                    <p className="text-[10px] text-slate-400 font-semibold">{pet.type} • {pet.age}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeletePet(pet.id)}
                  className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-slate-50 space-y-3">
          {errorMsg && <p className="text-rose-500 text-xs font-bold">{errorMsg}</p>}
          {successMsg && <p className="text-emerald-500 text-xs font-bold">{successMsg}</p>}
          <button
            onClick={handleSaveProfile}
            disabled={saving}
            className="w-full bg-[#111c1e] text-white py-3.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-black transition-all shadow-lg active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : null}
            {saving ? 'Saving...' : 'Save Profile Changes'}
          </button>
        </div>

      </div>

      {/* ================= RIGHT COLUMN: INTERACTIVE PUBLIC PROFILE PREVIEW ================= */}
      <div className="xl:col-span-6 space-y-4">

        {/* Preview tag header */}
        <div className="flex items-center gap-2 px-1 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
          <Sparkles size={13} className="text-amber-500" />
          <span>Real-time Live Profile Preview</span>
        </div>

        {/* The high-fidelity preview container mimicking their actual public profile card! */}
        <div className="bg-[#fcfcfc] border border-slate-100 rounded-2xl overflow-hidden shadow-sm p-5 space-y-6">

          {/* Back button simulation */}
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <span>&lt; Back</span>
          </div>

          {/* 1. Header Card with cover & avatar overlap */}
          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm relative">

            {/* Banner Cover image */}
            <div className="h-44 w-full relative overflow-hidden bg-slate-100">
              <img
                src={profile.coverImage}
                alt="Banner cover"
                className="w-full h-full object-cover transition-all duration-300"
              />
            </div>

            {/* Profile Content and Avatar */}
            <div className="px-6 pb-6 pt-16 relative">

              {/* Profile Avatar overlapping cover */}
              <div className="absolute -top-12 left-6">
                <img
                  src={profile.avatar}
                  alt="Profile Avatar"
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-md transition-all duration-300"
                />
              </div>

              {/* Title & Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold font-serif text-slate-800 transition-all duration-300">
                    {profile.displayName || 'No Name Entered'}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                      <MapPin size={12} className="text-slate-400" />
                      {profile.location}
                    </span>
                    <span className="text-[9px] bg-emerald-50 text-emerald-600 font-bold px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-0.5 uppercase tracking-wide">
                      <Check size={9} /> Verified Poster
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="bg-[#5c7a6b] hover:bg-[#465d51] text-white px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm">
                    Contact {profile.displayName.split(' ')[0]}
                  </button>
                  <button className="p-2 border border-slate-100 rounded-full hover:bg-slate-50 text-slate-400">
                    <Heart size={14} className="fill-current text-slate-200" />
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* 2. Simulated Sitter Tabs */}
          <div className="bg-slate-50 p-1 rounded-full border border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
            <span className="flex-1 text-center py-2 bg-white text-slate-800 rounded-full shadow-sm">Profile</span>
            <span className="flex-1 text-center py-2">Availability</span>
            <span className="flex-1 text-center py-2">Reviews</span>
          </div>

          {/* 3. About Us Card */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-6">
            <h4 className="text-sm font-bold text-slate-800 text-center uppercase tracking-wider">About Us</h4>

            {/* Three feature stats boxes */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col items-center justify-center text-center space-y-1">
                <User size={15} className="text-slate-500" />
                <span className="text-xs font-bold text-slate-700">{pets.length} Pets</span>
                <span className="text-[9px] text-slate-400 font-semibold uppercase">Family Size</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col items-center justify-center text-center space-y-1">
                <Phone size={15} className="text-slate-500" />
                <span className="text-xs font-bold text-slate-700 truncate max-w-full">{profile.phone || 'No Contact'}</span>
                <span className="text-[9px] text-slate-400 font-semibold uppercase">Verified Contact</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col items-center justify-center text-center space-y-1">
                <Briefcase size={15} className="text-slate-500" />
                <span className="text-xs font-bold text-slate-700 truncate max-w-full">{profile.profession || 'Profession'}</span>
                <span className="text-[9px] text-slate-400 font-semibold uppercase">Profession</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-500 leading-relaxed font-medium transition-all duration-300">
              {profile.aboutUs || 'Add some details about your family and pet care needs...'}
            </p>
          </div>

          {/* 4. Meet Our Pets section */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Meet Our Pets</h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {pets.length === 0 ? (
                <p className="col-span-3 text-xs text-slate-400 italic text-center py-4 bg-slate-50/50 rounded-xl">No pets listed yet.</p>
              ) : (
                pets.map((pet) => (
                  <div key={pet.id} className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm flex flex-col relative group">
                    <div className="h-28 w-full relative bg-slate-100">
                      <img src={pet.image} alt={pet.name} className="w-full h-full object-cover" />
                      <span className="absolute top-2 right-2 bg-white/95 border border-slate-100 rounded-full px-1 py-0.5 flex items-center gap-0.5 shadow-sm text-[8px] font-bold text-slate-700">
                        <Star size={8} className="text-amber-400 fill-amber-400" />
                        {pet.rating}
                      </span>
                    </div>
                    <div className="p-3 space-y-0.5">
                      <h5 className="text-xs font-bold text-slate-800">{pet.name}</h5>
                      <p className="text-[9px] text-slate-400 font-bold uppercase">{pet.type} • {pet.age}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 5. Our Home section */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Our Home</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'nonSmoking', label: 'Non smoking, secure family home' },
                { id: 'spaciousBackyard', label: 'Spacious backyard with a pool' },
                { id: 'securityAlarm', label: 'Security alarm & electric gate' },
                { id: 'homeChecks', label: 'Basic home security checks' }
              ].map((item) => {
                const isActive = profile.homeFeatures[item.id as keyof typeof profile.homeFeatures];
                return (
                  <div
                    key={item.id}
                    className={cn(
                      "p-3.5 rounded-xl border flex items-center gap-2.5 transition-all duration-300",
                      isActive
                        ? "bg-slate-50 border-slate-100/80 text-slate-700"
                        : "bg-slate-50/20 border-dashed border-slate-200 text-slate-300"
                    )}
                  >
                    <div className={cn(
                      "w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-white",
                      isActive ? "bg-[#5c7a6b]" : "bg-slate-200"
                    )}>
                      <Check size={10} strokeWidth={3} />
                    </div>
                    <span className="text-[10px] font-bold tracking-wide">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default ProfileSection;
