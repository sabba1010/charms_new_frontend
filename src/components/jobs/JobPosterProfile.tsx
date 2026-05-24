import React from 'react';
import { 
  MapPin, Phone, Briefcase, Star, 
  ShieldCheck, MessageCircle, Home, 
  Cigarette, Shield, Check
} from 'lucide-react';

const JobPosterProfile = () => {
  const data = {
    name: "Sarah & Mark Wilson",
    location: "Pretoria",
    phone: "(071) 123-4367",
    occupations: "Marketing Manager & Engineer",
    about: "Hi!-We're Sarah and Mark, pet lovers who frequently travel for work and weekend getaways. We have three adorable pets who need trusted care when we're away, and we're looking for reliable sitters who can provide loving attention and security for.",
    cover: "https://images.unsplash.com/photo-1581579186913-45ac3e6efe93?q=80&w=1200&h=400&fit=crop",
    avatar: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=200&h=200&fit=crop",
    pets: [
      { name: "Buddy", type: "Dog / 5 Years Old", rating: 4.6, img: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=200&h=250&fit=crop" },
      { name: "Bella", type: "Tubby - Cat", rating: 5.3, img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=200&h=250&fit=crop" },
      { name: "Rocky", type: "Rabba / 2 Years Old", rating: 5.3, img: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?q=80&w=200&h=250&fit=crop" }
    ],
    homeFeatures: [
      "Non smoking, secure family home",
      "Spacious backyard with a pool",
      "Security alarm system and electric gate",
      "Basic home security checks"
    ]
  };

  return (
    <div className="bg-[#FDFBF7] rounded-[2.5rem] overflow-hidden shadow-sm border border-[#F3EDE2] mb-12 font-sans">
      {/* Header Section */}
      <div className="relative h-48 md:h-64">
        <img src={data.cover} alt="Cover" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      <div className="px-6 md:px-10 pb-10 relative">
        {/* Avatar */}
        <div className="absolute -top-16 left-6 md:left-10">
          <div className="w-32 h-32 rounded-full border-4 border-[#FDFBF7] overflow-hidden shadow-xl">
            <img src={data.avatar} alt={data.name} className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="pt-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#2D2926] leading-tight">
                  {data.name.split(' ')[0]} & {data.name.split(' ')[2]} <span className="text-[#6B7A5F]">{data.name.split(' ')[3]}</span>
                </h1>
                <ShieldCheck size={20} className="text-[#6B7A5F]" />
              </div>
              <div className="flex items-center gap-2 text-[#8C8273] font-medium">
                <MapPin size={16} className="text-[#6B7A5F]" />
                <span className="text-sm">{data.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab-like bar */}
        <div className="mt-8 flex gap-8 border-b border-[#F3EDE2] pb-4">
          {['Profile', 'Availability', 'Reviews'].map((tab, i) => (
            <button key={tab} className={`text-sm font-bold tracking-wider uppercase ${i === 0 ? 'text-[#2D2926] relative after:absolute after:-bottom-4 after:left-0 after:right-0 after:h-0.5 after:bg-[#6B7A5F]' : 'text-[#8C8273]'}`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Contact & Bio Info */}
        <div className="mt-8 flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-[#5C564E]">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-[#F3EDE2] flex items-center justify-center text-[#6B7A5F]">
                  <Home size={18} />
                </div>
                <span className="font-bold text-sm">3 Pets - Non-Smoking Home</span>
              </div>
              <div className="flex items-center gap-4 text-[#5C564E]">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-[#F3EDE2] flex items-center justify-center text-[#6B7A5F]">
                  <Phone size={18} />
                </div>
                <span className="font-bold text-sm">{data.phone}</span>
              </div>
              <div className="flex items-center gap-4 text-[#5C564E]">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-[#F3EDE2] flex items-center justify-center text-[#6B7A5F]">
                  <Briefcase size={18} />
                </div>
                <span className="font-bold text-sm">{data.occupations}</span>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <h2 className="text-2xl font-serif font-bold text-[#2D2926]">About Us</h2>
              <p className="text-[#5C564E] leading-relaxed font-medium">
                {data.about}
              </p>
            </div>
          </div>

          <div className="md:w-64 pt-4">
            <button className="w-full bg-[#6B7A5F] text-white py-4 rounded-xl font-bold text-sm shadow-lg hover:bg-[#5D6246] transition-all transform hover:-translate-y-1">
              Contact Sarah & Mark
            </button>
          </div>
        </div>

        {/* Meet Our Pets */}
        <div className="mt-12">
          <h2 className="text-2xl font-serif font-bold text-[#2D2926] mb-8">Meet Our Pets</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.pets.map((pet, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#F3EDE2] group hover:border-[#6B7A5F]/30 transition-all">
                <div className="h-48 overflow-hidden">
                  <img src={pet.img} alt={pet.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-[#2D2926]">{pet.name}</h3>
                  <p className="text-sm text-[#8C8273] font-medium mb-4">{pet.type}</p>
                  <div className="flex gap-0.5 mb-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={12} className={`${s <= Math.floor(pet.rating) ? 'text-[#C9A567] fill-[#C9A567]' : 'text-[#D9D1C4]'}`} />
                    ))}
                    <span className="text-[10px] font-bold text-[#C9A567] ml-2">{pet.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Home */}
        <div className="mt-12">
          <h2 className="text-2xl font-serif font-bold text-[#2D2926] mb-6">Our Home</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.homeFeatures.map((feature, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-white border border-[#F3EDE2] rounded-2xl">
                <div className="w-6 h-6 bg-[#6B7A5F] rounded-full flex items-center justify-center shadow-sm">
                  <Check size={14} className="text-white" strokeWidth={3} />
                </div>
                <span className="text-sm font-bold text-[#5C564E]">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#F3EDE2]">
          <button className="w-full bg-[#c28876] text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-3">
            <MessageCircle size={20} />
            Message Sarah & Mark
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobPosterProfile;
