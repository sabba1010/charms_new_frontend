import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, CheckCircle2, ChevronDown, MapPin } from 'lucide-react';
import banner from '../../../assets/banner (1).png';

const Hero = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location.trim()) params.append('location', location.trim());
    if (category) params.append('category', category);
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <section className="relative h-auto md:h-[800px] min-h-[100vh] md:min-h-[800px] flex items-start pt-24 md:pt-30 pb-8 md:pb-0 overflow-hidden font-sans">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={banner}
          alt="Trusted Sitter Background"
          className="w-full h-full object-cover object-center md:object-[center_right]"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left mb-10 w-full max-w-6xl flex flex-col items-center md:items-start"
        >
          <h1 className="font-fraunces text-4xl md:text-[50px] mt-10 font-semibold text-white tracking-tight drop-shadow-xl whitespace-normal md:whitespace-nowrap overflow-visible leading-tight md:leading-normal">
            Find Trusted Pet, House <span style={{ fontFamily: 'serif', fontWeight: 600 }}>&</span> Security Sitters Near You.
          </h1>
          <div className="w-full flex justify-center max-w-6xl mt-4 md:mt-0">
            <p className="font-sans text-[16px] md:text-[20px] text-[#D1D1D1] font-medium text-center">
              Reliable care for your pets and home while you travel.
            </p>
          </div>
        </motion.div>

        {/* Search Bar Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-6xl mb-12"
        >
          {/* ── MOBILE: Styled card layout ── */}
          <div className="flex flex-col md:hidden gap-2 bg-[#122E29] p-3 rounded-xl shadow-2xl">
            {/* Location */}
            <div className="bg-white rounded px-4 py-3 w-full flex items-center justify-between">
              <input
                type="text"
                placeholder="Enter your city"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-slate-700 placeholder:text-slate-500 text-[15px] font-medium"
              />
              <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
            </div>
            {/* Category */}
            <div className="bg-white rounded px-4 py-3 w-full flex items-center justify-between relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-slate-700 text-[15px] font-medium appearance-none cursor-pointer pr-8 focus:ring-0 focus:outline-none"
              >
                <option value="">Services: Pet Sitting, House...</option>
                <option value="Pet Sitting">Pet Sitting</option>
                <option value="Dog Walking">Dog Walking</option>
                <option value="Pet Boarding">Pet Boarding</option>
                <option value="Pet Day Care">Pet Day Care</option>
                <option value="Holiday Home Sitting">Holiday Home Sitting</option>
                <option value="Security Checks">Security Checks</option>
                <option value="Drop-In Visits">Drop-In Visits</option>
                <option value="Pet Taxi">Pet Taxi</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 pointer-events-none" />
            </div>
            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="bg-[#8A9138] hover:bg-[#78802d] text-white w-full py-3.5 rounded font-bold text-[15px] transition-all active:scale-95 mt-1"
            >
              Search
            </button>
          </div>

          {/* ── DESKTOP: Styled like photo ── */}
          <div className="hidden md:flex bg-[#122E29] p-3 rounded-lg shadow-2xl items-stretch gap-3">
            <div className="flex-[2.5] bg-white rounded flex items-center">
              <div className="flex-[1.2] px-4 py-3 border-r border-gray-200 flex items-center gap-3 text-slate-500">
                <input
                  type="text"
                  placeholder="Enter your city"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-slate-700 placeholder:text-slate-500 text-[15px] font-medium"
                />
                <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
              </div>
              <div className="flex-[1.8] px-4 py-3 flex items-center justify-between gap-2 text-slate-500 relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-slate-700 text-[15px] font-medium appearance-none cursor-pointer pr-8 focus:ring-0 focus:outline-none"
                >
                  <option value="">Services: Pet Sitting, House Sitting...</option>
                  <option value="Pet Sitting">Pet Sitting</option>
                  <option value="Dog Walking">Dog Walking</option>
                  <option value="Pet Boarding">Pet Boarding</option>
                  <option value="Pet Day Care">Pet Day Care</option>
                  <option value="Holiday Home Sitting">Holiday Home Sitting</option>
                  <option value="Security Checks">Security Checks</option>
                  <option value="Drop-In Visits">Drop-In Visits</option>
                  <option value="Pet Taxi">Pet Taxi</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 pointer-events-none" />
              </div>
            </div>
            <button
              onClick={handleSearch}
              className="bg-[#8A9138] hover:bg-[#78802d] text-white px-8 py-3 rounded font-bold transition-all text-[15px] shadow-sm active:scale-95 shrink-0"
            >
              Search
            </button>
          </div>
        </motion.div>

        {/* Features & CTA - Left aligned list with CTA button */}
        <div className="w-full max-w-6xl flex flex-col items-start gap-6 md:gap-8 pb-8 md:pb-0">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col gap-3 md:gap-4"
          >
            {[
              'Verified & Vetted Sitters',
              'Real Reviews and Ratings',
              'Secure Messaging',
              'No Hidden Fees',
              'No Booking Commission',
              '24/7 Support'
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3 bg-[#122E29]/40 px-4 py-2 rounded-full w-fit shadow-md">
                <div className="w-6 h-6 rounded-full bg-[#8A9138] flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-white" strokeWidth={3.5} />
                </div>
                <span className="text-white font-medium tracking-wide text-[15px] pr-2">
                  {text}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
    </section>
  );
};

export default Hero;
