import React from 'react';
import { motion } from 'framer-motion';
import cardBg from '../../assets/cardbackground.png';
import icon1 from '../../assets/png/Artboard2@2x.png';
import icon2 from '../../assets/png/Artboard2copy@2x.png';
import icon3 from '../../assets/png/Artboard4@2x.png';

const supportSteps = [
  {
    number: "1",
    title: "Platform Support",
    description: "We offer full technical help and support for anything related to the platform itself, including account management, bookings, and navigation.",
    icon: icon1,
    customWidth: "auto",
    customHeight: "70px",
    translateY: "12px"
  },
  {
    number: "2",
    title: "Disputes",
    description: "We do not get involved in disputes between users. We ask that all members communicate openly and resolve issues amicably amongst themselves.",
    icon: icon2,
    customWidth: "auto",
    customHeight: "55px",
    translateY: "5px"
  },
  {
    number: "3",
    title: "Complaints",
    description: "If you have a serious complaint regarding behavior that violates our terms of service, please use the contact form above to reach our safety team.",
    icon: icon3,
    customWidth: "auto",
    customHeight: "70px",
    translateY: "14px"
  }
];

const ContactSupportInfo = () => {
  return (
    <section className="bg-[#eee9df] pt-[80px] pb-[80px] font-sans">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-[26px] md:text-[40px] font-bold text-[#1a2e35] mb-4 font-fraunces">
            Support <span style={{ fontFamily: 'serif', fontWeight: 600 }}>&</span> Guidelines
          </h2>
          <p className="text-[16px] md:text-[20px] text-[#666] max-w-3xl mx-auto leading-relaxed">
            We are dedicated to providing you with the best platform experience. Here is what you need to know about our support policies.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 justify-items-center max-w-[900px] mx-auto">
          {supportSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-white rounded-[10px] p-6 pt-5 w-full max-w-[280px] h-[290px] mx-auto overflow-hidden flex flex-col items-center text-center shadow-sm group hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500"
            >
              {/* Background Image without Gradient to match HowItWorksSection */}
              <div
                className="absolute inset-0 z-0 pointer-events-none transition-all duration-500 group-hover:opacity-80"
                style={{
                  backgroundImage: `url(${cardBg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              />

              {/* Number Badge centered horizontally */}
              <div className="w-8 h-8 rounded-full bg-[#B87D6D] flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0 z-20 mb-2">
                {step.number}
              </div>

              {/* Title and Description at the Top */}
              <div className="relative z-10 flex-1 w-full">
                <h3 className="text-[16px] font-extrabold text-[#1a2e35] mb-2 leading-tight">
                  {step.title}
                </h3>
                <p className="text-[#1a2e35]/80 text-[13px] font-medium leading-relaxed max-w-[240px] mx-auto">
                  {step.description}
                </p>
              </div>

              {/* Icon Container matching HowItWorksSection exactly */}
              <div className="absolute bottom-0 left-0 w-full h-[100px] flex justify-center items-center z-10">
                <img
                  src={step.icon}
                  alt={step.title}
                  style={{ width: step.customWidth, height: step.customHeight, transform: `translateY(${step.translateY})` }}
                  className="object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSupportInfo;
