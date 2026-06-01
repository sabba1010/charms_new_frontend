import React, { useState, useEffect } from 'react';
import {
  MapPin, Star, ShieldCheck,
  MessageCircle, Home, Check,
  Calendar, Phone, Briefcase,
  ChevronLeft, Loader2
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const UserProfile = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('Profile');
  const tabs = ['Profile', 'Availability', 'Reviews'];

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState<any>(null);

  const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (id === '1') {
        setUser({
          displayName: "Sarah & Mark Wilson",
          location: "Pretoria",
          phone: "(071) 123-4367",
          profession: "Marketing Manager & Engineer",
          aboutUs: "Hi! We're Sarah and Mark, pet lovers who frequently travel for work and weekend getaways. We have three adorable pets who need trusted care when we're away, and we're looking for reliable sitters who can provide loving attention and security.",
          coverImage: "https://images.unsplash.com/photo-1581579186913-45ac3e6efe93?q=80&w=1200&h=400&fit=crop",
          avatar: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=200&h=200&fit=crop",
          pets: [
            { name: "Buddy", type: "Dog / 5 Years Old", rating: 4.6, image: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=200&h=250&fit=crop" },
            { name: "Bella", type: "Tubby - Cat", rating: 5.3, image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=200&h=250&fit=crop" },
            { name: "Rocky", type: "Rabbit / 2 Years Old", rating: 5.3, image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?q=80&w=200&h=250&fit=crop" }
          ],
          homeFeatures: {
            nonSmoking: true,
            spaciousBackyard: true,
            securityAlarm: true,
            homeChecks: true
          }
        });
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${apiUrl}/auth/profile/${id}`);
        const data = await res.json();
        if (data.success) {
          setUser(data.user);
        } else {
          setError(data.message || 'Failed to load user profile');
        }
      } catch (err) {
        setError('Error connecting to server');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchUserProfile();
  }, [id, apiUrl]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center pt-24">
        <Loader2 className="animate-spin text-[#5C7A6B]" size={32} />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center pt-24 px-4 text-center">
        <p className="text-rose-500 font-bold text-lg mb-4">{error || 'User not found'}</p>
        <Link to="/" className="px-6 py-2.5 bg-[#5C7A6B] text-white rounded-xl text-xs font-bold shadow-md">
          Go Back Home
        </Link>
      </div>
    );
  }

  const name = user.displayName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Unknown User';
  const location = user.location || 'Not Specified';
  const phone = user.phone || 'Not Specified';
  const occupations = user.profession || 'Not Specified';
  const about = user.aboutUs || 'No description provided.';
  const cover = user.coverImage || 'https://images.unsplash.com/photo-1581579186913-45ac3e6efe93?q=80&w=1200&h=400&fit=crop';
  const avatar = user.avatar || 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=200&h=200&fit=crop';

  const pets = user.pets && Array.isArray(user.pets) ? user.pets.map((pet: any) => ({
    name: pet.name,
    type: pet.type || 'Pet',
    rating: pet.rating || 5.0,
    img: pet.image || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=200&h=250&fit=crop'
  })) : [];

  const homeFeatures = [
    { key: 'nonSmoking', label: 'Non smoking, secure family home' },
    { key: 'spaciousBackyard', label: 'Spacious backyard with a pool' },
    { key: 'securityAlarm', label: 'Security alarm system and electric gate' },
    { key: 'homeChecks', label: 'Basic home security checks' },
  ].filter(f => user.homeFeatures?.[f.key]);

  // Render star rating
  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center gap-[2px]">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={10} className="fill-[#C9A567] text-[#C9A567]" strokeWidth={0} />
      ))}
      <span className="text-[10px] font-bold text-[#2D2926] ml-1">{rating}</span>
    </div>
  );

  return (
    <>
      {/* ======================= */}
      {/* MOBILE LAYOUT */}
      {/* ======================= */}
      <div className="block md:hidden bg-white min-h-screen w-full pb-10 pt-[72px]">

        {/* Cover Image */}
        <div className="relative">
          <div className="absolute top-3 left-3 z-20">
            <Link
              to={-1 as any}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm shadow text-[#2D2926]"
            >
              <ChevronLeft size={18} />
            </Link>
          </div>
          <div className="h-[180px] w-full">
            <img src={cover} alt="Cover" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Avatar overlapping cover */}
        <div className="relative px-4">
          <div className="absolute -top-[52px] left-4 z-10">
            <div className="w-[104px] h-[104px] rounded-full border-[4px] border-white overflow-hidden shadow-md bg-white">
              <img src={avatar} alt={name} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Name + location (below avatar) */}
          <div className="pt-[60px] pb-1">
            <h1 className="text-[22px] font-serif font-bold text-[#2D2926] leading-tight">
              {name}
            </h1>
            <div className="flex items-center gap-1 mt-1">
              <MapPin size={13} className="text-[#788564]" />
              <span className="text-[12px] text-[#6B6560] font-medium">{location}</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center px-4 mt-3 mb-1 border-b border-[#E8E2D8]">
          {tabs.map((tab, i) => (
            <React.Fragment key={tab}>
              <button
                onClick={() => setActiveTab(tab)}
                className={`relative py-2.5 px-3 text-[13px] font-semibold transition-colors ${
                  activeTab === tab ? 'text-[#2D2926]' : 'text-[#9A9188]'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#788564] rounded-t-full" />
                )}
              </button>
              {i < tabs.length - 1 && <span className="text-[#D5CEC0] mx-0.5 text-sm">|</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Tab Content */}
        <div className="px-4 pt-4">

          {/* ── PROFILE TAB ── */}
          {activeTab === 'Profile' && (
            <div>
              {/* Info row + Contact button */}
              <div className="flex items-start justify-between gap-3 mb-6">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2.5">
                    <Home size={14} className="text-[#788564] shrink-0" strokeWidth={2.5} />
                    <span className="text-[12.5px] text-[#4A4743]">
                      <strong className="text-[#2D2926]">{pets.length}.Pets</strong>
                      {user.homeFeatures?.nonSmoking ? ' - Non-Smoking Home' : ''}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone size={14} className="text-[#788564] shrink-0" strokeWidth={2.5} />
                    <span className="text-[12.5px] text-[#4A4743]">{phone}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Briefcase size={14} className="text-[#788564] shrink-0" strokeWidth={2.5} />
                    <span className="text-[12.5px] text-[#4A4743]">{occupations}</span>
                  </div>
                </div>

                <button className="bg-[#788564] hover:bg-[#626E51] active:scale-95 text-white px-3.5 py-2.5 rounded-[6px] text-[11px] font-bold shadow-sm shrink-0 whitespace-nowrap transition-all">
                  Contact {name.split(' ')[0]} &amp; {name.split(' ').slice(-1)[0]}
                </button>
              </div>

              {/* About Us */}
              <section className="mb-6">
                <h2 className="text-[19px] font-serif font-bold text-[#2D2926] mb-2.5">About Us</h2>
                <p className="text-[12.5px] text-[#5A5550] leading-[1.7]">{about}</p>
              </section>

              {/* Meet Our Pets */}
              <section className="mb-6">
                <h2 className="text-[19px] font-serif font-bold text-[#2D2926] mb-3">Meet Our Pets</h2>
                {pets.length === 0 ? (
                  <p className="text-[12px] text-[#8C8273] italic">No pets listed yet.</p>
                ) : (
                  <div className="grid grid-cols-3 gap-2.5">
                    {pets.map((pet: any, i: number) => (
                      <div key={i} className="bg-white rounded-xl overflow-hidden border border-[#EAE5DA] shadow-sm">
                        <div className="h-[90px] w-full overflow-hidden">
                          <img src={pet.img} alt={pet.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-2 pb-2.5">
                          <h3 className="text-[12.5px] font-bold text-[#2D2926] leading-tight">{pet.name}</h3>
                          <p className="text-[10px] text-[#7A746B] mt-0.5 leading-tight">{pet.type}</p>
                          <div className="mt-1.5">
                            <StarRating rating={pet.rating} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* Our Home */}
              <section className="mb-8">
                <h2 className="text-[19px] font-serif font-bold text-[#2D2926] mb-3">Our Home</h2>
                {homeFeatures.length === 0 ? (
                  <p className="text-[12px] text-[#8C8273] italic">No home features listed.</p>
                ) : (
                  <div className="space-y-2.5">
                    {homeFeatures.map((f, i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <div className="w-[18px] h-[18px] rounded-full bg-[#788564] flex items-center justify-center shrink-0">
                          <Check size={10} strokeWidth={3} className="text-white" />
                        </div>
                        <span className="text-[12.5px] text-[#4A4743] font-medium">{f.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* Message Button */}
              <div className="flex justify-center pb-2">
                <button className="bg-[#C5997A] hover:bg-[#B38568] active:scale-95 text-white px-12 py-3 rounded-[6px] text-[13px] font-bold shadow-md transition-all">
                  Message {name.split(' ')[0]} &amp; {name.split(' ').slice(-1)[0]}
                </button>
              </div>
            </div>
          )}

          {/* ── AVAILABILITY TAB ── */}
          {activeTab === 'Availability' && (
            <div className="py-12 text-center border border-[#EAE5DA] rounded-xl bg-white/60">
              <Calendar className="w-8 h-8 text-[#D5CEC0] mx-auto mb-2" />
              <p className="text-[#8C8273] text-[12px] font-medium">No availability calendar set up yet.</p>
            </div>
          )}

          {/* ── REVIEWS TAB ── */}
          {activeTab === 'Reviews' && (
            <div className="py-12 text-center border border-[#EAE5DA] rounded-xl bg-white/60">
              <Star className="w-8 h-8 text-[#D5CEC0] mx-auto mb-2" />
              <p className="text-[#8C8273] text-[12px] font-medium">No reviews available for this user yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* ======================= */}
      {/* DESKTOP LAYOUT */}
      {/* ======================= */}
      <div className="hidden md:block min-h-screen bg-[#FDFBF7] pt-28 pb-20">
        <div className="max-w-[900px] mx-auto px-6">

          {/* Back Button */}
          <div className="mb-8">
            <Link
              to={-1 as any}
              className="inline-flex items-center gap-2 text-[#8C8273] hover:text-[#5C7A6B] transition-colors font-semibold text-[14px] group"
            >
              <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
              <span>Back</span>
            </Link>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#EEE8DC] mb-6">
            {/* Cover */}
            <div className="h-[220px] relative">
              <img src={cover} alt="Cover" className="w-full h-full object-cover" />
            </div>

            {/* Avatar + Name row */}
            <div className="px-8 pb-6 relative">
              {/* Avatar */}
              <div className="absolute -top-[52px] left-8">
                <div className="w-[104px] h-[104px] rounded-full border-[4px] border-white overflow-hidden shadow-lg bg-white">
                  <img src={avatar} alt={name} className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="pt-[62px]">
                <div className="flex items-end justify-between gap-6">
                  <div>
                    <h1 className="text-[28px] font-serif font-bold text-[#2D2926] leading-tight">{name}</h1>
                    <div className="flex items-center gap-1.5 mt-1">
                      <MapPin size={14} className="text-[#788564]" />
                      <span className="text-[13px] text-[#6B6560] font-medium">{location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs row */}
            <div className="flex items-center px-8 border-t border-[#EEE8DC]">
              {tabs.map((tab, i) => (
                <React.Fragment key={tab}>
                  <button
                    onClick={() => setActiveTab(tab)}
                    className={`relative py-3.5 px-4 text-[14px] font-semibold transition-colors ${
                      activeTab === tab ? 'text-[#2D2926]' : 'text-[#9A9188] hover:text-[#5C7A6B]'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#788564] rounded-t-full" />
                    )}
                  </button>
                  {i < tabs.length - 1 && <span className="text-[#D5CEC0] mx-1">|</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'Profile' && (
            <div className="bg-white rounded-2xl border border-[#EEE8DC] shadow-sm p-8 space-y-8">

              {/* Info row + Contact button */}
              <div className="flex items-start justify-between gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Home size={16} className="text-[#788564] shrink-0" strokeWidth={2.5} />
                    <span className="text-[14px] text-[#4A4743]">
                      <strong className="text-[#2D2926]">{pets.length}.Pets</strong>
                      {user.homeFeatures?.nonSmoking ? ' - Non-Smoking Home' : ''}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-[#788564] shrink-0" strokeWidth={2.5} />
                    <span className="text-[14px] text-[#4A4743]">{phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Briefcase size={16} className="text-[#788564] shrink-0" strokeWidth={2.5} />
                    <span className="text-[14px] text-[#4A4743]">{occupations}</span>
                  </div>
                </div>

                <button className="bg-[#788564] hover:bg-[#626E51] active:scale-95 text-white px-5 py-3 rounded-[8px] text-[13px] font-bold shadow-sm shrink-0 whitespace-nowrap transition-all">
                  Contact {name.split(' ')[0]} &amp; {name.split(' ').slice(-1)[0]}
                </button>
              </div>

              {/* About Us */}
              <section>
                <h2 className="text-[22px] font-serif font-bold text-[#2D2926] mb-3">About Us</h2>
                <p className="text-[14px] text-[#5A5550] leading-[1.75]">{about}</p>
              </section>

              {/* Meet Our Pets */}
              <section>
                <h2 className="text-[22px] font-serif font-bold text-[#2D2926] mb-4">Meet Our Pets</h2>
                {pets.length === 0 ? (
                  <p className="text-[13px] text-[#8C8273] italic">No pets listed yet.</p>
                ) : (
                  <div className="grid grid-cols-3 gap-4">
                    {pets.map((pet: any, i: number) => (
                      <div key={i} className="bg-white rounded-xl overflow-hidden border border-[#EAE5DA] shadow-sm hover:shadow-md transition-shadow group">
                        <div className="h-[130px] w-full overflow-hidden">
                          <img
                            src={pet.img}
                            alt={pet.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-3 pb-4">
                          <h3 className="text-[15px] font-bold text-[#2D2926]">{pet.name}</h3>
                          <p className="text-[11px] text-[#7A746B] mt-0.5">{pet.type}</p>
                          <div className="mt-2">
                            <StarRating rating={pet.rating} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* Our Home */}
              <section>
                <h2 className="text-[22px] font-serif font-bold text-[#2D2926] mb-4">Our Home</h2>
                {homeFeatures.length === 0 ? (
                  <p className="text-[13px] text-[#8C8273] italic">No home features listed.</p>
                ) : (
                  <div className="space-y-3">
                    {homeFeatures.map((f, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-[20px] h-[20px] rounded-full bg-[#788564] flex items-center justify-center shrink-0">
                          <Check size={11} strokeWidth={3} className="text-white" />
                        </div>
                        <span className="text-[14px] text-[#4A4743] font-medium">{f.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* Message Button */}
              <div className="flex justify-center pt-2">
                <button className="bg-[#C5997A] hover:bg-[#B38568] active:scale-95 text-white px-14 py-3.5 rounded-[8px] text-[14px] font-bold shadow-md transition-all">
                  Message {name.split(' ')[0]} &amp; {name.split(' ').slice(-1)[0]}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'Availability' && (
            <div className="bg-white rounded-2xl border border-[#EEE8DC] shadow-sm py-20 text-center">
              <Calendar className="w-12 h-12 text-[#D5CEC0] mx-auto mb-3" />
              <p className="text-[#8C8273] text-[14px] font-medium">No availability calendar set up yet.</p>
            </div>
          )}

          {activeTab === 'Reviews' && (
            <div className="bg-white rounded-2xl border border-[#EEE8DC] shadow-sm py-20 text-center">
              <Star className="w-12 h-12 text-[#D5CEC0] mx-auto mb-3" />
              <p className="text-[#8C8273] text-[14px] font-medium">No reviews available for this user yet.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
