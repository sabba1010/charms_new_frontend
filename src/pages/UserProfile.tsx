import React, { useState, useEffect } from 'react';
import {
  MapPin, Star, ShieldCheck,
  MessageCircle, Home, Check,
  Calendar, Phone, Briefcase,
  Share2, Heart, ChevronLeft,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
      // If it's the demo ID "1", immediately load the mock data and avoid API call
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
            { name: "Bella", type: "Tubby - Cat", rating: 5.0, image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=200&h=250&fit=crop" },
            { name: "Rocky", type: "Rabbit / 2 Years Old", rating: 4.9, image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?q=80&w=200&h=250&fit=crop" }
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
        <Loader2 className="animate-spin text-[#6B7A5F]" size={32} />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center pt-24 px-4 text-center">
        <p className="text-rose-500 font-bold text-lg mb-4">{error || 'User not found'}</p>
        <Link to="/" className="px-6 py-2.5 bg-[#6B7A5F] text-white rounded-xl text-xs font-bold shadow-md">
          Go Back Home
        </Link>
      </div>
    );
  }

  const name = user.displayName || `${user.firstName} ${user.lastName}`;
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

  const homeFeatures = [];
  if (user.homeFeatures?.nonSmoking) homeFeatures.push("Non smoking, secure family home");
  if (user.homeFeatures?.spaciousBackyard) homeFeatures.push("Spacious backyard with a pool");
  if (user.homeFeatures?.securityAlarm) homeFeatures.push("Security alarm system and electric gate");
  if (user.homeFeatures?.homeChecks) homeFeatures.push("Basic home security checks");

  const isLoggedIn = true; // Always allow view avatar on public profile for now or keep original logic


  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-24 md:pt-32 pb-20">
      {/* Outer Container to center everything including Back button */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-10">

        {/* Back Button - Aligned with the card */}
        <div className="mb-6 md:mb-10">
          <Link to={-1 as any} className="inline-flex items-center gap-2 text-[#8C8273] hover:text-[#6B7A5F] transition-all font-bold group">
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform md:w-5 md:h-5" />
            <span className="text-sm md:text-base uppercase tracking-widest">Back</span>
          </Link>
        </div>

        {/* Header Section */}
        <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-[#F3EDE2] mb-10">
          <div className="h-48 md:h-72 relative">
            <img src={cover} alt="Cover" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

          <div className="px-6 md:px-12 pb-10 md:pb-12 relative">
            {/* Avatar - overlapping cover */}
            <div className="absolute -top-14 md:-top-20 left-6 md:left-12">
              <div className="w-28 h-28 md:w-40 md:h-40 rounded-full border-[6px] border-white overflow-hidden shadow-2xl relative bg-white">
                <img
                  src={avatar}
                  alt={name}
                  className={`w-full h-full object-cover transition-all duration-700 ${!isLoggedIn ? 'blur-xl scale-110' : ''}`}
                />
                {!isLoggedIn && (
                  <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                    <div className="w-4 h-4 bg-white/30 rounded-full animate-ping" />
                  </div>
                )}
              </div>
            </div>

            <div className="pt-20 md:pt-24">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
                <div className="space-y-3">
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-[#2D2926] leading-tight">
                    {name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 md:gap-6">
                    <div className="flex items-center gap-2 text-[#8C8273] text-sm font-medium">
                      <div className="bg-[#FDFBF7] p-1.5 rounded-lg border border-[#F3EDE2]">
                        <MapPin size={16} className="text-[#6B7A5F]" />
                      </div>
                      <span>{location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#8C8273] text-[10px] font-bold uppercase tracking-[0.1em] bg-[#F9F7F3] px-3 py-1.5 rounded-full border border-[#F3EDE2]">
                      <ShieldCheck size={12} className="text-[#6B7A5F]" />
                      <span>Verified Poster</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 w-full lg:w-auto">
                  <button className="flex-1 lg:flex-none bg-[#6B7A5F] text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-lg hover:bg-[#5D6246] transition-all transform hover:-translate-y-1">
                    Contact {name.split(' ')[0]}
                  </button>
                  <button className="p-3.5 bg-white border border-[#F3EDE2] rounded-xl text-[#8C8273] hover:text-red-500 hover:border-red-100 transition-all shadow-sm group">
                    <Heart size={20} className="group-hover:fill-red-500 transition-colors" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8 md:space-y-12">
            {/* Tab Navigation */}
            <div className="bg-[#E9E4DB]/40 p-1 rounded-[1.5rem] flex sticky top-24 z-20 backdrop-blur-lg shadow-sm border border-[#F3EDE2]/50">
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
                  className={`flex-1 py-2.5 md:py-3 text-sm font-bold rounded-xl transition-all duration-300 ${activeTab === tab
                      ? 'bg-white text-[#2D2926] shadow-sm transform scale-[1.01]'
                      : 'text-[#8C8273] hover:text-[#2D2926]'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Sections Container */}
            <div className="space-y-12">
              {/* About Us */}
              <section id="profile" className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-[#F3EDE2] scroll-mt-36">
                <h2 className="text-xl md:text-2xl font-serif font-bold text-[#2D2926] mb-8 text-center">About Us</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                  <div className="flex flex-col items-center p-6 bg-[#FDFBF7] rounded-[1.5rem] border border-[#F3EDE2] hover:border-[#6B7A5F]/20 transition-colors">
                    <Home size={22} className="text-[#6B7A5F] mb-3" />
                    <span className="text-sm font-bold text-[#2D2926]">{pets.length} Pets</span>
                    <span className="text-[10px] text-[#8C8273] font-bold uppercase tracking-widest mt-1">Family size</span>
                  </div>
                  <div className="flex flex-col items-center p-6 bg-[#FDFBF7] rounded-[1.5rem] border border-[#F3EDE2] hover:border-[#6B7A5F]/20 transition-colors">
                    <Phone size={22} className="text-[#6B7A5F] mb-3" />
                    <span className="text-sm font-bold text-[#2D2926]">{phone}</span>
                    <span className="text-[10px] text-[#8C8273] font-bold uppercase tracking-widest mt-1">Verified Contact</span>
                  </div>
                  <div className="flex flex-col items-center p-6 bg-[#FDFBF7] rounded-[1.5rem] border border-[#F3EDE2] hover:border-[#6B7A5F]/20 transition-colors">
                    <Briefcase size={22} className="text-[#6B7A5F] mb-3" />
                    <span className="text-sm font-bold text-[#2D2926] text-center truncate max-w-full">{occupations}</span>
                    <span className="text-[10px] text-[#8C8273] font-bold uppercase tracking-widest mt-1">Profession</span>
                  </div>
                </div>
                <p className="text-[#5C564E] text-base leading-relaxed font-medium">
                  {about}
                </p>
              </section>

              {/* Meet Our Pets */}
              <section id="availability" className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-[#F3EDE2] scroll-mt-36">
                <h2 className="text-xl md:text-2xl font-serif font-bold text-[#2D2926] mb-8">Meet Our Pets</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {pets.length === 0 ? (
                    <p className="col-span-3 text-xs text-[#8C8273] italic text-center py-4 bg-[#FDFBF7] rounded-xl border border-[#F3EDE2]">No pets listed yet.</p>
                  ) : (
                    pets.map((pet, i) => (
                      <div key={i} className="group">
                        <div className="h-48 rounded-[1.5rem] overflow-hidden mb-4 shadow-md relative">
                          <img src={pet.img} alt={pet.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm flex items-center gap-1">
                            <Star size={10} className="text-[#C9A567] fill-[#C9A567]" />
                            <span className="text-[10px] font-black text-[#2D2926]">{pet.rating}</span>
                          </div>
                        </div>
                        <h3 className="text-lg font-bold text-[#2D2926] mb-0.5">{pet.name}</h3>
                        <p className="text-[10px] text-[#8C8273] font-bold uppercase tracking-widest">{pet.type}</p>
                      </div>
                    ))
                  )}
                </div>
              </section>

              {/* Our Home */}
              <section id="reviews" className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-[#F3EDE2] scroll-mt-36">
                <h2 className="text-xl md:text-2xl font-serif font-bold text-[#2D2926] mb-8">Our Home</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {homeFeatures.length === 0 ? (
                    <p className="col-span-2 text-xs text-[#8C8273] italic text-center py-4 bg-[#FDFBF7] rounded-xl border border-[#F3EDE2]">No home features listed.</p>
                  ) : (
                    homeFeatures.map((feature, i) => (
                      <div key={i} className="flex items-center gap-4 p-5 bg-[#FDFBF7] border border-[#F3EDE2] rounded-2xl group hover:border-[#6B7A5F]/40 transition-all duration-300">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-[#6B7A5F] shrink-0 transform group-hover:rotate-12 transition-transform">
                          <Check size={16} strokeWidth={3} />
                        </div>
                        <span className="text-sm font-bold text-[#5C564E]">{feature}</span>
                      </div>
                    ))
                  )}
                </div>
              </section>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-10">
            <div className="sticky top-24 space-y-8">
              <section className="bg-[#111d21] text-white rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#6B7A5F]/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-[#6B7A5F]/20 transition-colors"></div>
                <h3 className="text-2xl font-serif font-bold mb-6 relative">Send a Message</h3>
                <p className="text-slate-400 text-base mb-10 leading-relaxed relative">
                  Contact {name.split(' ')[0]} to discuss job details or introduce yourself. They are usually quick to respond!
                </p>
                <button className="w-full bg-[#6B7A5F] text-white py-5 rounded-2xl font-bold text-xl hover:bg-[#5D6246] transition-all flex items-center justify-center gap-4 group/btn shadow-lg">
                  <MessageCircle size={24} className="group-hover/btn:scale-110 transition-transform" />
                  Message Now
                </button>
              </section>

              <div className="bg-white rounded-[2.5rem] p-10 border border-[#F3EDE2] text-center shadow-sm">
                <p className="text-sm font-bold text-[#8C8273] uppercase tracking-[0.2em] mb-6">Share this Profile</p>
                <div className="flex justify-center gap-6">
                  <button className="p-4 bg-[#FDFBF7] rounded-2xl border border-[#F3EDE2] text-[#8C8273] hover:text-[#6B7A5F] hover:border-[#6B7A5F]/30 transition-all shadow-sm">
                    <Share2 size={24} />
                  </button>
                  <button className="p-4 bg-[#FDFBF7] rounded-2xl border border-[#F3EDE2] text-[#8C8273] hover:text-[#6B7A5F] hover:border-[#6B7A5F]/30 transition-all shadow-sm">
                    <Share2 size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
