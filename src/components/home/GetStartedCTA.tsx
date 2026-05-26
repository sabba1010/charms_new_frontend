import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const GetStartedCTA = () => {
  return (
    <section className="w-full bg-[#F7F6F2] pb-8 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto bg-[#111c1e] rounded-[32px] overflow-hidden py-10 md:py-14 px-4 sm:px-8 text-center"
      >
        {/* Heading */}
        <h2 className="text-[32px] md:text-[48px] font-fraunces font-medium text-white mb-6 leading-tight max-w-4xl mx-auto">
          Find a Trusted Sitter or Earn Money Caring for Pets <span style={{ fontFamily: 'serif', fontWeight: 600 }}>&</span> Homes.
        </h2>

        {/* Subheading */}
        <p className="text-[15px] md:text-[17px] text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed mt-[-20px]">
          We take verification seriously so you can focus on what matters your pets, your home, your peace of mind.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-[-20px]">
          <Link
            to="/listings"
            className="w-full sm:w-auto px-10 py-4 bg-[#948a54] text-white rounded-xl font-bold text-[16px] hover:bg-[#837a4a] transition-all duration-300 shadow-lg active:scale-95"
          >
            Find a Sitter
          </Link>
          <Link
            to="/become-sitter"
            className="w-full sm:w-auto px-10 py-4 bg-[#c88d7d] text-white rounded-xl font-bold text-[16px] hover:bg-[#b87d6d] transition-all duration-300 shadow-lg active:scale-95"
          >
            Become a Sitter
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default GetStartedCTA;
