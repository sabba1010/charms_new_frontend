import React from 'react';
import { motion } from 'framer-motion';

const SafetyTips = () => {
  return (
    <section className="bg-[#fdfbf7] py-24 px-6 font-sans relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Safety Tips for Owners Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[32px] p-10 md:p-12 border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500 relative overflow-hidden group"
          >
            <h3 className="text-2xl md:text-[28px] font-fraunces font-semibold text-[#1a2e35] mb-6 leading-tight">
              Safety Tips for Owners
            </h3>
            <div className="space-y-4 text-slate-600 text-[15px] leading-relaxed">
              <p>
                Before accepting a sitter, take time to carefully review their profile, references, verification badges, and reviews from previous owners. We recommend arranging a video call or meet-and-greet beforehand to discuss routines, expectations, emergency contacts, and any special care requirements.
              </p>
              <p>
                Always communicate through the platform where possible, keep copies of important information, and trust your instincts if something doesn't feel right. Clear communication and detailed instructions help create a safe and positive experience for both owners and sitters.
              </p>
            </div>
          </motion.div>

          {/* Safety Tips for Sitters Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-[32px] p-10 md:p-12 border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500 relative overflow-hidden group"
          >
            <h3 className="text-2xl md:text-[28px] font-fraunces font-semibold text-[#1a2e35] mb-6 leading-tight">
              Safety Tips for Sitters
            </h3>
            <div className="space-y-4 text-slate-600 text-[15px] leading-relaxed">
              <p>
                Sitters should always read listings carefully and ask questions before accepting a booking. Arrange a phone or video call with the owner beforehand to understand responsibilities, house rules, pet routines, and emergency procedures.
              </p>
              <p>
                We also encourage sitters to share booking details with a trusted family member or friend, especially for overnight or long-term stays. If anything feels unsafe or misleading, sitters should decline the booking and report concerns through the platform.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Building a Trusted Community Full-Width Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-[#1a2e35] rounded-[32px] p-10 md:p-16 relative overflow-hidden shadow-xl"
        >
          {/* Abstract background elements */}
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-[#8b8b4e]/20 rounded-full blur-[100px]" />
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#B87D6D]/20 rounded-full blur-[100px]" />

          <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
            <h3 className="text-3xl md:text-4xl font-fraunces font-semibold text-white mb-6 leading-tight">
              Building a Trusted Community
            </h3>
            <p className="text-white/80 text-[16px] md:text-[18px] leading-relaxed max-w-2xl mx-auto">
              At Home Paw, our goal is to create a community built on trust, respect, safety, and genuine care for pets and homes. Honest communication, verified profiles, and mutual respect between owners and sitters help create positive experiences for everyone involved.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default SafetyTips;
