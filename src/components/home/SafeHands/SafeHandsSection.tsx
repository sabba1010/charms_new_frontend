import React from 'react';
import { motion } from 'framer-motion';
// import { ShieldCheck, Home, Star } from 'lucide-react';
import safeHandsImg from '../../../assets/PHOTO FOR HOME PAGE (1).png';
import image66cb6f from '../../../assets/logo/Screenshot 2026-05-14 093706.png';
import petsittingImg from '../../../assets/logo/Screenshot 2026-05-14 094108.png';
import securitypetImg from '../../../assets/logo/Screenshot 2026-05-14 094319.png';


const features = [
  {
    title: "Verified & Vetted",
    description: "ID Verified & Background Checked.",
    icon: image66cb6f,
    iconColor: "text-[#a3a362]"
  },
  {
    title: "Home & Pet Care",
    description: "Pet Sitting, House Sitting & Security Sitters.",
    icon: petsittingImg,
    iconColor: "text-[#e57a55]"
  },
  {
    title: "Trusted Reviews",
    description: "Rated 5-star by Local Pet Owners.",
    icon: securitypetImg,
    iconColor: "text-[#1a2e35]"
  }
];

const SafeHandsSection = () => {
  return (
    <section className="bg-[#f5f2eb] py-20 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-stretch gap-12">

          {/* Left Content */}
          <div className="flex-1 max-w-xl py-4 flex flex-col justify-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[26px] md:text-[40px] font-fraunces font-semibold text-[#1a2e35] mb-4 leading-[1.15]"
            >
              Trusted Care Starts Here
            </motion.h2>

            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[20px] md:text-[20px] font-medium text-[#1a2e35]/90 mb-6"
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              Your Pets <span style={{ fontFamily: 'serif', fontWeight: 600 }}>&</span> Home in Safe Hands
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-[#1a2e35]/80 text-[18px] leading-relaxed"
              style={{ fontFamily: 'Inter', fontWeight: 400 }}
            >
              At Home Paw, we believe your home and pets deserve trusted and reliable care. Our focus is on
              safety, verified profiles, honest reviews, and creating a community you can feel confident in.
              Whether you're leaving for a weekend, planning an extended trip or simply need a trusted daily
              service, we're here to help you find caring sitters you can trust with what matters most.
            </motion.p>
          </div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 w-full flex items-stretch"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-sm w-full h-full">
              <img
                src={safeHandsImg}
                alt="Woman with Golden Retriever"
                /* min-h-[40vh] ensures it takes up 40% of the screen height */
                /* object-center ensures the woman and dog remain the focal point */
                className="w-full h-full object-cover min-h-[40vh] object-center"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default SafeHandsSection;