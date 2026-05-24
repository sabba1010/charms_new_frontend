import React from 'react';
import { Link } from 'react-router-dom';

const HowItWorksCTA = () => {
  return (
    <section className="bg-[#f9f5eb] py-16 px-6 font-sans">
      {/* Container with specific dark charcoal/teal color and high border radius */}
      <div className="max-w-[1200px] mx-auto bg-[#1a2e31] rounded-[2rem] py-20 px-8 text-center text-white">

        <div className="max-w-2xl mx-auto">
          {/* Heading: Serif font, medium weight, tight line height */}
          <h2 className="text-[42px] md:text-[48px] font-serif font-medium mb-6 leading-[1.1] tracking-tight">
            Find trusted care for your pets and home today.
          </h2>

          {/* Subtext: Light weight, slightly desaturated white */}
          <p className="text-white/80 text-[15px] md:text-[16px] mb-10 max-w-xl mx-auto leading-relaxed">
            We take verification seriously so you can focus on what matters: your pets, your home, your peace of mind.
          </p>

          {/* Buttons: Specific muted olive and dusty rose colors */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/listings"
              className="bg-[#8b8b4e] text-white px-10 py-3 rounded-xl font-bold text-[15px] hover:brightness-110 transition-all min-w-[180px]"
            >
              Find a Sitter
            </Link>
            <Link
              to="/become-sitter"
              className="bg-[#c28876] text-white px-10 py-3 rounded-xl font-bold text-[15px] hover:brightness-110 transition-all min-w-[180px]"
            >
              Become a Sitter
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksCTA;