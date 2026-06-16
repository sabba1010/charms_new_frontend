import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShieldCheck, Users, Home as HomeIcon } from 'lucide-react';
import founderImage from '../assets/founder_and_cat.png';
import houseIcon from '../assets/WhatsApp-Image-House.svg';
import calendarIcon from '../assets/WhatsApp-Image-calendar.svg';
import searchIcon from '../assets/WhatsApp-Image-search.svg';
import aboutBanner from '../assets/Banners 26.png';
import cardBg from '../assets/cardbackground.png';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F9F6F1] font-sans">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] min-h-[500px] md:min-h-[800px] w-full flex items-center justify-center overflow-hidden font-sans">
        <div className="absolute inset-0 z-0">
          <img
            src={aboutBanner}
            alt="About House & Paw"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="font-fraunces text-4xl md:text-[50px] mt-4 md:mt-10 font-semibold text-white tracking-tight drop-shadow-xl whitespace-normal md:whitespace-nowrap overflow-visible leading-tight md:leading-normal mb-4">
              About House <span style={{ fontFamily: 'serif', fontWeight: 600 }}>&</span> Paw
            </h1>
            <p className="font-sans text-[14px] md:text-[20px] text-[#D1D1D1] font-medium max-w-2xl mx-auto leading-relaxed whitespace-normal">
              Where trusted care starts at home. Building a community of reliable sitters, homeowners, and pet lovers across South Africa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Story Section */}
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

      {/* Vision & Values */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1a2e35] mb-6">Our Vision</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              My name is Charmaine van der Rijst, and I founded House <span style={{ fontFamily: 'serif', fontWeight: 600 }}>&</span> Paw with a simple vision: to create a trusted community where pet owners, homeowners, and caring sitters can connect with confidence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center mb-16">
            {[
              {
                icon: houseIcon,
                title: "Familiar Surroundings",
                desc: "We believe pets thrive when they can remain in familiar surroundings with people who genuinely care for them."
              },
              {
                icon: calendarIcon,
                title: "Peace of Mind",
                desc: "Homeowners deserve peace of mind knowing their property is being looked after while they’re away."
              },
              {
                icon: searchIcon,
                title: "Professional Platform",
                desc: "Dedicated sitters deserve a professional platform to showcase their experience and build their reputation."
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative bg-white rounded-[12px] p-6 pt-6 w-full max-w-[310px] h-[280px] mx-auto overflow-hidden flex flex-col items-center text-center shadow-sm group hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500"
                style={{
                  backgroundImage: `url(${cardBg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                {/* Number Badge */}
                <div className="w-8 h-8 rounded-full bg-[#B87D6D] flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0 mb-2.5">
                  {i + 1}
                </div>

                {/* Text Content */}
                <div className="relative z-10 flex-1 w-full">
                  <h3 className="text-[17px] font-extrabold text-[#1a2e35] mb-2 leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-[#1a2e35]/80 text-[13px] font-medium leading-relaxed max-w-[245px] mx-auto">
                    {feature.desc}
                  </p>
                </div>

                {/* Icon Container */}
                <div className="absolute bottom-0 left-0 w-full h-[120px] flex justify-center items-end pb-4 z-10">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="h-[90px] w-auto object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* South Africa Focus */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-8 text-lg text-slate-600 leading-relaxed">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100"
          >
            <p className="mb-6">
              House <span style={{ fontFamily: 'serif', fontWeight: 600 }}>&</span> Paw was built specifically for South African households. We understand that every home and every pet is different. While dogs and cats are often at the heart of what we do, our community also supports the care of birds, rabbits, fish, reptiles, horses, farm animals, and holiday properties.
            </p>
            <p className="mb-6">
              What makes House <span style={{ fontFamily: 'serif', fontWeight: 600 }}>&</span> Paw different is our focus on building trust and long-term relationships. Through profile verification, reviews, and transparent information, we’re creating a community where owners can confidently find care and sitters can build lasting connections with the families they support.
            </p>
            <p>
              As our community grows, so does our vision. We aim to create a place where pet owners, homeowners, sitters, breeders, and trusted service providers can come together, share knowledge, support one another, and access valuable services in one trusted space.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Outro */}
      <section className="py-24 px-6 bg-[#1a2e35] text-white text-center">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Heart className="w-12 h-12 mx-auto text-pink-400 mb-8" fill="currentColor" />
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8 leading-tight">
              At its heart, House <span style={{ fontFamily: 'serif', fontWeight: 600 }}>&</span> Paw is about trust, care, and connection.
            </h2>
            <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
              What began as a personal search for someone to care for my own pets has grown into a mission to help households across South Africa find the support they need and the peace of mind they deserve.
            </p>
            <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed">
              Because when you’re away, you should be free to enjoy the journey, knowing that your pets, your home, and everything you care about are in trusted hands.
            </p>
            <div className="space-y-2">
              <p className="text-2xl font-serif italic text-white">Welcome to House <span style={{ fontFamily: 'serif', fontWeight: 600 }}>&</span> Paw.</p>
              <p className="text-amber-400 font-bold uppercase tracking-widest text-sm pt-4">Charmaine van der Rijst</p>
              <p className="text-slate-400 text-sm">Founder, House <span style={{ fontFamily: 'serif', fontWeight: 600 }}>&</span> Paw</p>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default About;
