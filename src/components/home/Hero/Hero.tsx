import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, CheckCircle2, ChevronDown, MapPin } from 'lucide-react';
import banner from '../../../assets/banner (1).png';

const CATEGORIES = [
  'Pet Sitting',
  'Dog Walking',
  'Pet Boarding',
  'Pet Day Care',
  'Holiday Home Sitting',
  'Security Checks',
  'Drop-In Visits',
  'Pet Taxi'
];

const EXPERIENCES_OPTIONS = [
  'Dogs', 'Cats', 'Birds', 'Fish', 'Rabbits', 'Guinea Pigs', 'Reptiles', 'Horses',
  'Farm Animals', 'Livestock', 'Poultry', 'Puppy Care', 'Senior Pets', 'Rescue Animals',
  'Medication Administration', 'Disabled Pets', 'Large Breed Dogs', 'Multiple Pet Households',
  'Breeding Kennels', 'Whelping & Puppy Care', 'Farm Management Assistance', 'Small Holdings',
  'Farms', 'Holiday Homes', 'Security Presence While Away', 'Garden & Plant Care', 'Pool Maintenance Checks'
];

const Hero = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([]);
  
  const [catOpenMobile, setCatOpenMobile] = useState(false);
  const [catOpenDesktop, setCatOpenDesktop] = useState(false);
  const [expOpenMobile, setExpOpenMobile] = useState(false);
  const [expOpenDesktop, setExpOpenDesktop] = useState(false);
  const [catSearch, setCatSearch] = useState('');
  const catRefMobile = useRef<HTMLDivElement>(null);
  const catRefDesktop = useRef<HTMLDivElement>(null);
  const expRefMobile = useRef<HTMLDivElement>(null);
  const expRefDesktop = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (catRefMobile.current && !catRefMobile.current.contains(e.target as Node)) {
        setCatOpenMobile(false);
      }
      if (catRefDesktop.current && !catRefDesktop.current.contains(e.target as Node)) {
        setCatOpenDesktop(false);
      }
      if (expRefMobile.current && !expRefMobile.current.contains(e.target as Node)) {
        setExpOpenMobile(false);
      }
      if (expRefDesktop.current && !expRefDesktop.current.contains(e.target as Node)) {
        setExpOpenDesktop(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = CATEGORIES.filter((c) =>
    c.toLowerCase().includes(catSearch.toLowerCase())
  );

  const selectCategory = (cat: string) => {
    setCategory(cat);
    setCatOpenMobile(false);
    setCatOpenDesktop(false);
    setCatSearch('');
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location.trim()) params.append('location', location.trim());
    if (category && category !== 'All Categories') params.append('category', category);
    if (selectedExperiences.length > 0) params.append('experience', selectedExperiences.join(','));
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <section className="relative h-auto md:h-[800px] min-h-[100vh] md:min-h-[800px] flex items-start pt-24 md:pt-30 pb-8 md:pb-0 font-sans">
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
            <div className="bg-white rounded w-full relative" ref={catRefMobile}>
              <button
                onClick={() => setCatOpenMobile(!catOpenMobile)}
                className="w-full flex items-center justify-between px-4 py-3 text-[15px] text-slate-500 hover:text-slate-700 transition-colors"
              >
                <span className={category !== 'All Categories' ? 'text-slate-700 font-medium' : ''}>
                  {category}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 flex-shrink-0 ml-2 transition-transform duration-200 ${catOpenMobile ? 'rotate-180' : ''}`}
                />
              </button>

              {catOpenMobile && (
                <div className="absolute top-full mt-2 left-0 w-full bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[2000] py-2">
                  <div className="p-2 border-b border-gray-100">
                    <input
                      autoFocus
                      type="text"
                      placeholder="Search"
                      value={catSearch}
                      onChange={(e) => setCatSearch(e.target.value)}
                      className="w-full px-3 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg outline-none placeholder:text-gray-400 border border-gray-200 focus:border-gray-300 transition-colors"
                    />
                  </div>
                  <div className="py-1 max-h-60 overflow-y-auto">
                    <button
                      onClick={() => selectCategory('All Categories')}
                      className={`block w-full text-left px-5 py-2.5 text-sm transition-colors hover:bg-gray-50
                        ${category === 'All Categories' ? 'text-gray-900 font-semibold' : 'text-gray-700'}`}
                    >
                      All Categories
                    </button>
                    {filtered.length > 0 ? (
                      filtered.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => selectCategory(cat)}
                          className={`block w-full text-left px-5 py-2.5 text-sm transition-colors hover:bg-gray-50
                            ${category === cat ? 'text-gray-900 font-semibold' : 'text-gray-700'}`}
                        >
                          {cat}
                        </button>
                      ))
                    ) : (
                      <p className="px-5 py-3 text-sm text-gray-400">No categories found</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Experience */}
            <div className="bg-white rounded w-full relative" ref={expRefMobile}>
              <button
                onClick={() => setExpOpenMobile(!expOpenMobile)}
                className="w-full flex items-center justify-between px-4 py-3 text-[15px] text-slate-500 hover:text-slate-700 transition-colors"
              >
                <span className={selectedExperiences.length > 0 ? 'text-slate-700 font-medium truncate' : ''}>
                  {selectedExperiences.length > 0 ? `${selectedExperiences.length} Experiences` : 'Experiences With'}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 flex-shrink-0 ml-2 transition-transform duration-200 ${expOpenMobile ? 'rotate-180' : ''}`}
                />
              </button>

              {expOpenMobile && (
                <div className="absolute top-full mt-2 left-0 w-full bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[2000] py-2 max-h-60 overflow-y-auto">
                  {EXPERIENCES_OPTIONS.map(exp => (
                    <label key={exp} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={selectedExperiences.includes(exp)}
                        onChange={() => {
                          setSelectedExperiences(prev => 
                            prev.includes(exp) ? prev.filter(x => x !== exp) : [...prev, exp]
                          );
                        }}
                        className="mr-3"
                      />
                      <span className="text-sm text-gray-700">{exp}</span>
                    </label>
                  ))}
                </div>
              )}
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
              <div className="flex-[1.8] flex items-center justify-between gap-2 text-slate-500 relative" ref={catRefDesktop}>
                <button
                  onClick={() => setCatOpenDesktop(!catOpenDesktop)}
                  className="w-full h-full flex items-center justify-between px-4 py-3 text-[15px] text-slate-500 hover:text-slate-700 transition-colors"
                >
                  <span className={category !== 'All Categories' ? 'text-slate-700 font-medium' : ''}>
                    {category}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 flex-shrink-0 ml-2 transition-transform duration-200 ${catOpenDesktop ? 'rotate-180' : ''}`}
                  />
                </button>

                {catOpenDesktop && (
                  <div className="absolute top-full mt-2 left-0 w-full bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[2000] py-2">
                    <div className="p-2 border-b border-gray-100">
                      <input
                        autoFocus
                        type="text"
                        placeholder="Search"
                        value={catSearch}
                        onChange={(e) => setCatSearch(e.target.value)}
                        className="w-full px-3 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg outline-none placeholder:text-gray-400 border border-gray-200 focus:border-gray-300 transition-colors"
                      />
                    </div>
                    <div className="py-1 max-h-60 overflow-y-auto">
                      <button
                        onClick={() => selectCategory('All Categories')}
                        className={`block w-full text-left px-5 py-2.5 text-sm transition-colors hover:bg-gray-50
                          ${category === 'All Categories' ? 'text-gray-900 font-semibold' : 'text-gray-700'}`}
                      >
                        All Categories
                      </button>
                      {filtered.length > 0 ? (
                        filtered.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => selectCategory(cat)}
                            className={`block w-full text-left px-5 py-2.5 text-sm transition-colors hover:bg-gray-50
                              ${category === cat ? 'text-gray-900 font-semibold' : 'text-gray-700'}`}
                          >
                            {cat}
                          </button>
                        ))
                      ) : (
                        <p className="px-5 py-3 text-sm text-gray-400">No categories found</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex-[1] flex items-center justify-between gap-2 text-slate-500 relative" ref={expRefDesktop}>
                <button
                  onClick={() => setExpOpenDesktop(!expOpenDesktop)}
                  className="w-full h-full flex items-center justify-between px-4 py-3 text-[15px] text-slate-500 hover:text-slate-700 transition-colors border-l border-gray-200"
                >
                  <span className={selectedExperiences.length > 0 ? 'text-slate-700 font-medium truncate' : 'truncate'}>
                    {selectedExperiences.length > 0 ? `${selectedExperiences.length} Experiences` : 'Experiences With'}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 flex-shrink-0 ml-2 transition-transform duration-200 ${expOpenDesktop ? 'rotate-180' : ''}`}
                  />
                </button>

                {expOpenDesktop && (
                  <div className="absolute top-full mt-2 left-0 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[2000] py-2 max-h-80 overflow-y-auto">
                    <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase">Select Experiences</div>
                    {EXPERIENCES_OPTIONS.map(exp => (
                      <label key={exp} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                        <input 
                          type="checkbox"
                          checked={selectedExperiences.includes(exp)}
                          onChange={() => {
                            setSelectedExperiences(prev => 
                              prev.includes(exp) ? prev.filter(x => x !== exp) : [...prev, exp]
                            );
                          }}
                          className="mr-3"
                        />
                        <span className="text-sm text-gray-700">{exp}</span>
                      </label>
                    ))}
                  </div>
                )}
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
