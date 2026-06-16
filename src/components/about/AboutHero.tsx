import React from 'react';
import { motion } from 'framer-motion';
import aboutBanner from '../../assets/Banners 26.png';

const AboutHero = () => {
  return (
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
  );
};

export default AboutHero;
