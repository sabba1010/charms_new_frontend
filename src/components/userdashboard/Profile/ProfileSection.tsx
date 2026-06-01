import React, { useState, useEffect } from 'react';
import {
  Camera, MapPin, Check, Plus, Trash2, Pencil, X,
  User, Phone, Briefcase, Star, Home,
  Loader2, Save, Eye, Sparkles
} from 'lucide-react';

interface Pet {
  id: number;
  name: string;
  type: string;
  age: string;
  image: string;
  rating: number;
}

const DEFAULT_HOME_FEATURES = [
  'Non smoking, secure family home',
  'Spacious backyard with a pool',
  'Security alarm system and electric gate',
  'Basic home security checks',
];

const inputCls =
  'w-full px-4 py-2.5 rounded-lg border border-[#E8E2D8] bg-white text-[13px] text-[#4A4743] focus:border-[#788564] focus:ring-2 focus:ring-[#788564]/10 outline-none transition-all placeholder:text-[#C5BEB4]';

const labelCls = 'block text-[12px] font-bold text-[#5A5550] mb-1 uppercase tracking-wide';

/* ── small star row ── */
const StarRow = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-[2px]">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={9} className="fill-[#C9A567] text-[#C9A567]" strokeWidth={0} />
    ))}
    <span className="text-[10px] font-bold text-[#2D2926] ml-1">{rating}</span>
  </div>
);

const ProfileSection = () => {
  const [loading,    setLoading]    = useState(true);
  const [saving,     setSaving]     = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg,   setErrorMsg]   = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const [profile, setProfile] = useState({
    displayName: '',
    avatar:      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    coverImage:  'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=800&auto=format&fit=crop',
    location:    '',
    phone:       '',
    profession:  '',
    aboutUs:     '',
  });

  // Dynamic home features as a plain string array
  const [homeFeatures, setHomeFeatures] = useState<string[]>([]);
  const [newFeature,   setNewFeature]   = useState('');
  const [editingIdx,   setEditingIdx]   = useState<number | null>(null);
  const [editingText,  setEditingText]  = useState('');

  const [pets,   setPets]   = useState<Pet[]>([]);
  const [newPet, setNewPet] = useState({ name: '', type: 'Dog', age: '', image: '', rating: 5.0 });

  const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';

  /* ── fetch ── */
  useEffect(() => {
    const go = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const res  = await fetch(`${apiUrl}/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
        const data = await res.json();
        if (data.success && data.user) {
          const u = data.user;
          setProfile({
            displayName: u.displayName || `${u.firstName} ${u.lastName}`,
            avatar:      u.avatar      || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
            coverImage:  u.coverImage  || 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=800&auto=format&fit=crop',
            location:   u.location   || '',
            phone:      u.phone      || '',
            profession: u.profession || '',
            aboutUs:    u.aboutUs    || '',
          });
          // Support both old boolean-object format and new string-array format
          if (Array.isArray(u.homeFeatures)) {
            setHomeFeatures(u.homeFeatures);
          } else if (u.homeFeatures && typeof u.homeFeatures === 'object') {
            const legacy: string[] = [];
            if (u.homeFeatures.nonSmoking)       legacy.push('Non smoking, secure family home');
            if (u.homeFeatures.spaciousBackyard) legacy.push('Spacious backyard with a pool');
            if (u.homeFeatures.securityAlarm)    legacy.push('Security alarm system and electric gate');
            if (u.homeFeatures.homeChecks)       legacy.push('Basic home security checks');
            setHomeFeatures(legacy);
          } else {
            setHomeFeatures([]);
          }
          if (u.pets && Array.isArray(u.pets)) {
            setPets(u.pets.map((p: any, i: number) => ({ id: i + 1, ...p })));
          }
        }
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    go();
  }, [apiUrl]);

  /* ── upload ── */
  const uploadImage = async (file: File): Promise<string> => {
    const fd    = new FormData();
    fd.append('file', file);
    const token = localStorage.getItem('token');
    const res   = await fetch(`${apiUrl}/upload`, { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd });
    const data  = await res.json();
    if (data.success) {
      return data.fileUrl.startsWith('http') ? data.fileUrl : `${apiUrl.replace('/api', '')}/${data.fileUrl.replace(/^\//, '')}`;
    }
    throw new Error('Upload failed');
  };

  const handleInput  = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setProfile(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try { setProfile(p => ({ ...p, [key]: URL.createObjectURL(file) })); const url = await uploadImage(file); setProfile(p => ({ ...p, [key]: url })); }
    catch { setErrorMsg('Image upload failed'); }
  };

  const handlePetFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try { const url = await uploadImage(file); setNewPet(p => ({ ...p, image: url })); }
    catch { setErrorMsg('Pet image upload failed'); }
  };

  // Home feature handlers
  const addFeature = () => {
    const text = newFeature.trim();
    if (!text) return;
    setHomeFeatures(p => [...p, text]);
    setNewFeature('');
  };
  const removeFeature   = (i: number) => setHomeFeatures(p => p.filter((_, idx) => idx !== i));
  const startEdit       = (i: number) => { setEditingIdx(i); setEditingText(homeFeatures[i]); };
  const cancelEdit      = () => { setEditingIdx(null); setEditingText(''); };
  const commitEdit      = (i: number) => {
    const text = editingText.trim();
    if (!text) return;
    setHomeFeatures(p => p.map((v, idx) => idx === i ? text : v));
    cancelEdit();
  };

  const addPet = () => {
    if (!newPet.name.trim()) return;
    const id  = pets.length > 0 ? Math.max(...pets.map(p => p.id)) + 1 : 1;
    const img = newPet.image || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=200&auto=format&fit=crop';
    setPets(p => [...p, { id, ...newPet, image: img }]);
    setNewPet({ name: '', type: 'Dog', age: '', image: '', rating: 5.0 });
  };

  const deletePet = (id: number) => setPets(p => p.filter(x => x.id !== id));

  /* ── save ── */
  const save = async () => {
    setSaving(true); setErrorMsg(''); setSuccessMsg('');
    try {
      const token = localStorage.getItem('token');
      const res   = await fetch(`${apiUrl}/auth/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...profile, homeFeatures, pets: pets.map(({ id, ...r }) => r) }),
      });
      const data = await res.json();
      if (data.success) { setSuccessMsg('Profile saved!'); setTimeout(() => setSuccessMsg(''), 3000); }
      else setErrorMsg(data.message || 'Save failed');
    } catch { setErrorMsg('Connection error'); }
    finally { setSaving(false); }
  };

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <Loader2 className="animate-spin text-[#788564]" size={28} />
    </div>
  );

  const firstName = profile.displayName.split(' ')[0] || 'User';
  const lastName  = profile.displayName.split(' ').slice(-1)[0] || '';

  return (
    <div className="space-y-0">

      {/* ── Top bar ── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[20px] font-serif font-bold text-[#2D2926]">Profile Settings</h2>
          <p className="text-[12px] text-[#9A9188] mt-0.5">Edit your public pet owner profile</p>
        </div>
        <button
          onClick={() => setShowPreview(v => !v)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#E8E2D8] text-[12px] font-bold text-[#5A5550] hover:border-[#788564] hover:text-[#788564] transition-all"
        >
          <Eye size={14} />
          {showPreview ? 'Hide Preview' : 'Live Preview'}
        </button>
      </div>

      <div className={`grid gap-8 items-start ${showPreview ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1 max-w-2xl'}`}>

        {/* ════════════════════════════════════════
            LEFT — EDIT FORM
        ════════════════════════════════════════ */}
        <div className="space-y-6">

          {/* Cover + Avatar upload */}
          <div className="bg-[#FAF8F5] rounded-2xl border border-[#EEE8DC] overflow-hidden">
            {/* Cover preview strip */}
            <div className="h-[120px] relative overflow-hidden">
              <img src={profile.coverImage} alt="Cover" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <label className="flex items-center gap-2 bg-white/90 text-[#2D2926] px-4 py-2 rounded-lg text-xs font-bold cursor-pointer shadow">
                  <Camera size={13} /> Change Cover
                  <input type="file" accept="image/*" className="hidden" onChange={e => handleFile(e, 'coverImage')} />
                </label>
              </div>
            </div>

            {/* Avatar row */}
            <div className="px-5 pb-5 relative">
              <div className="absolute -top-10 left-5">
                <div className="relative w-[76px] h-[76px]">
                  <img src={profile.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover border-[3px] border-white shadow-md" />
                  <label className="absolute inset-0 rounded-full flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                    <Camera size={14} className="text-white" />
                    <input type="file" accept="image/*" className="hidden" onChange={e => handleFile(e, 'avatar')} />
                  </label>
                </div>
              </div>
              <div className="pt-10 flex items-end justify-between">
                <div>
                  <p className="text-[14px] font-bold text-[#2D2926]">{profile.displayName || 'Your Name'}</p>
                  {profile.location && (
                    <p className="flex items-center gap-1 text-[11px] text-[#9A9188] mt-0.5">
                      <MapPin size={11} className="text-[#788564]" />{profile.location}
                    </p>
                  )}
                </div>
                <p className="text-[10px] text-[#B5AEA5] italic">Hover photos to change</p>
              </div>
            </div>
          </div>

          {/* Basic info fields */}
          <div className="bg-white rounded-2xl border border-[#EEE8DC] p-6 space-y-4">
            <h3 className="text-[13px] font-bold text-[#2D2926] border-b border-[#F0EAE0] pb-2">Basic Information</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Display Name</label>
                <input name="displayName" value={profile.displayName} onChange={handleInput} placeholder="Sarah & Mark Wilson" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Location City</label>
                <input name="location" value={profile.location} onChange={handleInput} placeholder="Pretoria" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Contact Number</label>
                <input name="phone" value={profile.phone} onChange={handleInput} placeholder="(071) 123-4567" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Profession</label>
                <input name="profession" value={profile.profession} onChange={handleInput} placeholder="Marketing Manager & Engineer" className={inputCls} />
              </div>
            </div>

            <div>
              <label className={labelCls}>About Us</label>
              <textarea
                rows={4}
                name="aboutUs"
                value={profile.aboutUs}
                onChange={handleInput}
                placeholder="Tell sitters about your family and your pets..."
                className={`${inputCls} resize-none`}
              />
            </div>
          </div>

          {/* Home Features — fully dynamic */}
          <div className="bg-white rounded-2xl border border-[#EEE8DC] p-6 space-y-4">
            <h3 className="text-[13px] font-bold text-[#2D2926] border-b border-[#F0EAE0] pb-2 flex items-center gap-2">
              <Home size={14} className="text-[#788564]" /> Our Home Features
              <span className="ml-auto text-[10px] font-normal text-[#9A9188] normal-case tracking-normal">{homeFeatures.length} item{homeFeatures.length !== 1 ? 's' : ''}</span>
            </h3>

            {/* Existing features list */}
            <div className="space-y-2">
              {homeFeatures.length === 0 && (
                <p className="text-[12px] text-[#C5BEB4] italic text-center py-3">No features added yet. Add one below.</p>
              )}
              {homeFeatures.map((feat, i) => (
                <div key={i} className="flex items-center gap-2 group">
                  {editingIdx === i ? (
                    /* ── inline edit mode ── */
                    <>
                      <div className="w-5 h-5 rounded-full bg-[#788564] flex items-center justify-center shrink-0">
                        <Check size={10} strokeWidth={3} className="text-white" />
                      </div>
                      <input
                        autoFocus
                        value={editingText}
                        onChange={e => setEditingText(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') commitEdit(i); if (e.key === 'Escape') cancelEdit(); }}
                        className="flex-1 px-3 py-1.5 rounded-lg border border-[#788564] bg-white text-[12px] text-[#2D2926] outline-none focus:ring-2 focus:ring-[#788564]/20"
                      />
                      <button onClick={() => commitEdit(i)} className="p-1.5 rounded-lg bg-[#788564] text-white hover:bg-[#626E51] transition-colors">
                        <Check size={12} strokeWidth={3} />
                      </button>
                      <button onClick={cancelEdit} className="p-1.5 rounded-lg bg-[#F0EAE0] text-[#9A9188] hover:bg-[#E8E2D8] transition-colors">
                        <X size={12} />
                      </button>
                    </>
                  ) : (
                    /* ── display mode ── */
                    <>
                      <div className="w-5 h-5 rounded-full bg-[#788564] flex items-center justify-center shrink-0">
                        <Check size={10} strokeWidth={3} className="text-white" />
                      </div>
                      <span className="flex-1 text-[13px] text-[#4A4743] font-medium">{feat}</span>
                      <button
                        onClick={() => startEdit(i)}
                        className="p-1.5 rounded-lg text-[#B5AEA5] hover:text-[#788564] hover:bg-[#F2F6EE] opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Pencil size={12} />
                      </button>
                      <button
                        onClick={() => removeFeature(i)}
                        className="p-1.5 rounded-lg text-[#B5AEA5] hover:text-rose-500 hover:bg-rose-50 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 size={12} />
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Add new feature row */}
            <div className="flex items-center gap-2 pt-1 border-t border-[#F0EAE0]">
              <input
                value={newFeature}
                onChange={e => setNewFeature(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addFeature()}
                placeholder="e.g. Fenced garden, pet-friendly area…"
                className="flex-1 px-3 py-2.5 rounded-lg border border-[#E8E2D8] bg-white text-[12px] text-[#4A4743] focus:border-[#788564] focus:ring-2 focus:ring-[#788564]/10 outline-none transition-all placeholder:text-[#C5BEB4]"
              />
              <button
                onClick={addFeature}
                disabled={!newFeature.trim()}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-[#788564] hover:bg-[#626E51] disabled:opacity-40 text-white rounded-lg text-[12px] font-bold transition-all shrink-0"
              >
                <Plus size={13} /> Add
              </button>
            </div>

            {/* Quick-add default suggestions */}
            {homeFeatures.length === 0 && (
              <div className="space-y-1.5">
                <p className="text-[10px] font-bold text-[#9A9188] uppercase tracking-wide">Quick add:</p>
                <div className="flex flex-wrap gap-2">
                  {DEFAULT_HOME_FEATURES.map(s => (
                    <button
                      key={s}
                      onClick={() => setHomeFeatures(p => [...p, s])}
                      className="px-3 py-1.5 rounded-full border border-dashed border-[#C5B9A8] text-[11px] text-[#7A746B] hover:border-[#788564] hover:text-[#788564] hover:bg-[#F2F6EE] transition-all"
                    >
                      + {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Pets */}
          <div className="bg-white rounded-2xl border border-[#EEE8DC] p-6 space-y-4">
            <h3 className="text-[13px] font-bold text-[#2D2926] border-b border-[#F0EAE0] pb-2">
              Meet Our Pets <span className="text-[#9A9188] font-normal">({pets.length})</span>
            </h3>

            {/* Existing pets */}
            {pets.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {pets.map(pet => (
                  <div key={pet.id} className="relative group bg-[#FAF8F5] rounded-xl overflow-hidden border border-[#EEE8DC]">
                    <div className="h-[75px] overflow-hidden">
                      <img src={pet.image} alt={pet.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="p-2">
                      <p className="text-[12px] font-bold text-[#2D2926] truncate">{pet.name}</p>
                      <p className="text-[10px] text-[#9A9188] truncate">{pet.type}{pet.age ? ` · ${pet.age}` : ''}</p>
                    </div>
                    <button
                      onClick={() => deletePet(pet.id)}
                      className="absolute top-1.5 right-1.5 w-6 h-6 bg-white/90 rounded-full flex items-center justify-center text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                    >
                      <Trash2 size={11} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add pet form */}
            <div className="bg-[#FAF8F5] rounded-xl border border-[#EEE8DC] p-4 space-y-3">
              <p className="text-[11px] font-bold text-[#788564] uppercase tracking-wide">Add a Pet</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Name</label>
                  <input value={newPet.name} onChange={e => setNewPet(p => ({ ...p, name: e.target.value }))} placeholder="Buddy" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Type</label>
                  <input value={newPet.type} onChange={e => setNewPet(p => ({ ...p, type: e.target.value }))} placeholder="Dog / Cat" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Age / Description</label>
                  <input value={newPet.age} onChange={e => setNewPet(p => ({ ...p, age: e.target.value }))} placeholder="5 years old" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Photo</label>
                  <label className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-[#E8E2D8] bg-white text-[12px] text-[#5A5550] font-semibold cursor-pointer hover:border-[#788564] transition-all">
                    <Camera size={12} className="text-[#788564]" />
                    {newPet.image ? <span className="text-[#788564]">Image ready</span> : <span>Choose file</span>}
                    <input type="file" accept="image/*" className="hidden" onChange={handlePetFile} />
                  </label>
                </div>
              </div>
              <button
                onClick={addPet}
                disabled={!newPet.name.trim()}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#788564] hover:bg-[#626E51] disabled:opacity-40 text-white rounded-lg text-[12px] font-bold transition-all"
              >
                <Plus size={14} /> Add Pet
              </button>
            </div>
          </div>

          {/* Save button */}
          <div className="space-y-2">
            {errorMsg   && <p className="text-rose-500   text-[12px] font-bold text-center">{errorMsg}</p>}
            {successMsg && <p className="text-[#788564] text-[12px] font-bold text-center flex items-center justify-center gap-1"><Check size={13} />{successMsg}</p>}
            <button
              onClick={save}
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#2D2926] hover:bg-black text-white rounded-xl font-bold text-[13px] tracking-wide transition-all shadow-md active:scale-95 disabled:opacity-50"
            >
              {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
              {saving ? 'Saving…' : 'Save Profile Changes'}
            </button>
          </div>
        </div>

        {/* ════════════════════════════════════════
            RIGHT — LIVE PREVIEW  (mirrors UserProfile)
        ════════════════════════════════════════ */}
        {showPreview && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[10px] font-bold text-[#9A9188] uppercase tracking-widest px-1">
              <Sparkles size={12} className="text-amber-500" /> Live Preview
            </div>

            <div className="bg-[#FAF8F5] rounded-2xl border border-[#EEE8DC] overflow-hidden shadow-sm">

              {/* Cover */}
              <div className="h-[140px] relative">
                <img src={profile.coverImage} alt="Cover" className="w-full h-full object-cover" />
              </div>

              {/* Avatar + Name */}
              <div className="px-5 pb-5 relative">
                <div className="absolute -top-[46px] left-5">
                  <div className="w-[92px] h-[92px] rounded-full border-[4px] border-white overflow-hidden shadow-md">
                    <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="pt-[56px]">
                  <h3 className="text-[18px] font-serif font-bold text-[#2D2926] leading-tight">
                    {profile.displayName || <span className="text-[#C5BEB4]">Your Name</span>}
                  </h3>
                  {profile.location && (
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin size={12} className="text-[#788564]" />
                      <span className="text-[11px] text-[#6B6560] font-medium">{profile.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Tabs */}
              <div className="flex items-center border-t border-[#EEE8DC] px-5">
                {['Profile', 'Availability', 'Reviews'].map((t, i) => (
                  <React.Fragment key={t}>
                    <span className={`py-2.5 px-2 text-[11px] font-semibold relative ${i === 0 ? 'text-[#2D2926]' : 'text-[#C5BEB4]'}`}>
                      {t}
                      {i === 0 && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#788564] rounded-t-full" />}
                    </span>
                    {i < 2 && <span className="text-[#DDD8CF] mx-0.5 text-xs">|</span>}
                  </React.Fragment>
                ))}
              </div>

              {/* Profile content */}
              <div className="px-5 pb-6 pt-4 space-y-5">

                {/* Info row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Home size={12} className="text-[#788564]" strokeWidth={2.5} />
                      <span className="text-[11px] text-[#4A4743]"><strong>{pets.length} Pets</strong>{homeFeatures.length > 0 ? ` – ${homeFeatures[0]}` : ''}</span>
                    </div>
                    {profile.phone && (
                      <div className="flex items-center gap-2">
                        <User size={12} className="text-[#788564]" strokeWidth={2.5} />
                        <span className="text-[11px] text-[#4A4743]">{profile.phone}</span>
                      </div>
                    )}
                    {profile.profession && (
                      <div className="flex items-center gap-2">
                        <Briefcase size={12} className="text-[#788564]" strokeWidth={2.5} />
                        <span className="text-[11px] text-[#4A4743]">{profile.profession}</span>
                      </div>
                    )}
                  </div>
                  <button className="bg-[#788564] text-white px-3 py-2 rounded-[6px] text-[10px] font-bold shrink-0 whitespace-nowrap">
                    Contact {firstName}
                  </button>
                </div>

                {/* About Us */}
                {profile.aboutUs && (
                  <div>
                    <h4 className="text-[13px] font-serif font-bold text-[#2D2926] mb-1.5">About Us</h4>
                    <p className="text-[11px] text-[#5A5550] leading-[1.7]">{profile.aboutUs}</p>
                  </div>
                )}

                {/* Pets */}
                {pets.length > 0 && (
                  <div>
                    <h4 className="text-[13px] font-serif font-bold text-[#2D2926] mb-2.5">Meet Our Pets</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {pets.map(pet => (
                        <div key={pet.id} className="bg-white rounded-xl overflow-hidden border border-[#EAE5DA] shadow-sm">
                          <div className="h-[70px] overflow-hidden">
                            <img src={pet.image} alt={pet.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="p-1.5">
                            <p className="text-[11px] font-bold text-[#2D2926] truncate">{pet.name}</p>
                            <p className="text-[9px] text-[#9A9188] truncate">{pet.type}</p>
                            <StarRow rating={pet.rating} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Home features */}
                {homeFeatures.length > 0 && (
                  <div>
                    <h4 className="text-[13px] font-serif font-bold text-[#2D2926] mb-2.5">Our Home</h4>
                    <div className="space-y-2">
                      {homeFeatures.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-[16px] h-[16px] rounded-full bg-[#788564] flex items-center justify-center shrink-0">
                            <Check size={9} strokeWidth={3} className="text-white" />
                          </div>
                          <span className="text-[11px] text-[#4A4743] font-medium">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Message button */}
                <div className="flex justify-center pt-1">
                  <button className="bg-[#C5997A] text-white px-8 py-2.5 rounded-[6px] text-[11px] font-bold shadow-sm">
                    Message {firstName} &amp; {lastName}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;
