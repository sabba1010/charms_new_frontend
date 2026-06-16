import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import founderImage from '../../assets/founder_and_cat.png';

const AboutStory = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-[#E7F5E7] rounded-[2rem] transform -rotate-3 scale-105 -z-10"></div>
            <img 
              src={founderImage} 
              alt="Charmaine van der Rijst, Founder of House & Paw" 
              className="rounded-[2rem] shadow-2xl w-full h-auto object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4 hidden md:flex">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-500">
                <Heart fill="currentColor" />
              </div>
              <div>
                <p className="font-bold text-[#1a2e35]">Charmaine van der Rijst</p>
                <p className="text-sm text-slate-500">Founder</p>
              </div>
            </div>
          </motion.div>

          {/* Text Column */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-slate-600 leading-relaxed text-lg"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1a2e35] mb-8">
              Every great idea starts with a personal experience.
            </h2>
            <p>
              A few months ago, I moved to a new city with my two cats and my daughters. Like many pet owners, my pets are family. When the time came for me to travel, I found myself facing a challenge I hadn’t anticipated: finding someone I could truly trust to care for my cats and my home.
            </p>
            <p>
              I didn’t know many people in the area, I wasn’t comfortable leaving my pets with a stranger, and I didn’t want to disrupt their routine by placing them in a kennel. What should have been a simple arrangement quickly became stressful.
            </p>
            <p>
              As I searched for solutions, I realised I wasn’t alone. Across South Africa, countless pet owners and homeowners face the same challenge every day. Whether travelling for work, taking a family holiday, visiting loved ones, or simply needing a helping hand, finding reliable and trustworthy care isn’t always easy.
            </p>
            <p className="font-bold text-[#1a2e35] text-xl pt-4">
              That experience inspired the creation of House <span style={{ fontFamily: 'serif', fontWeight: 600 }}>&</span> Paw.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutStory;
