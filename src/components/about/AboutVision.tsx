import React from 'react';
import { motion } from 'framer-motion';
import houseIcon from '../../assets/png/Artboard3@2x.png';
import calendarIcon from '../../assets/png/Artboard2copy@2x.png';
import searchIcon from '../../assets/png/Artboard2@2x.png';
import cardBg from '../../assets/cardbackground.png';



const supportSteps = [
  {
    number: "1",
    title: "Familiar Surroundings",
    description: "We believe pets thrive when they can remain in familiar surroundings with people who genuinely care for them.",
    icon: houseIcon,
    customWidth: "auto",
    customHeight: "90px"
  },
  {
    number: "2",
    title: "Peace of Mind",
    description: "Homeowners deserve peace of mind knowing their property is being looked after while they’re away.",
    icon: calendarIcon,
    customWidth: "auto",
    customHeight: "90px"
  },
  {
    number: "3",
    title: "Professional Platform",
    description: "Dedicated sitters deserve a professional platform to showcase their experience and build their reputation.",
    icon: searchIcon,
    customWidth: "auto",
    customHeight: "90px"
  }
];


const AboutVision = () => {
  return (
    <section className="bg-[#eee9df] pt-[80px] pb-[80px] font-sans">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-[26px] md:text-[40px] font-bold text-[#1a2e35] mb-4 font-fraunces">
           Our Vision
          </h2>
          <p className="text-[16px] md:text-[20px] text-[#666] max-w-3xl mx-auto leading-relaxed">
            My name is Charmaine van der Rijst, and I founded House <span style={{ fontFamily: 'serif', fontWeight: 600 }}>&</span> Paw with a simple vision: to create a trusted community where pet owners, homeowners, and caring sitters can connect with confidence.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 justify-items-center max-w-[1200px] mx-auto">
          {supportSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-white rounded-[12px] p-6 pt-6 w-full max-w-[310px] h-[340px] mx-auto overflow-hidden flex flex-col items-center text-center shadow-sm group hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500"
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
              <div className="w-8 h-8 rounded-full bg-[#B87D6D] flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0 z-20 mb-2.5">
                {step.number}
              </div>

              {/* Title and Description at the Top */}
              <div className="relative z-10 flex-1 w-full flex flex-col">
                <h3 className="text-[17px] font-extrabold text-[#1a2e35] mb-2 leading-tight">
                  {step.title}
                </h3>
                <p className="text-[#1a2e35]/80 text-[13px] font-medium leading-relaxed max-w-[245px] mx-auto">
                  {step.description}
                </p>
              </div>

              {/* Icon Container matching WhyChooseUsOwner exactly */}
              <div className="absolute bottom-0 left-0 w-full h-[120px] flex justify-center items-end pb-4 z-10">
                <img
                  src={step.icon}
                  alt={step.title}
                  style={{ width: step.customWidth, height: step.customHeight }}
                  className="object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutVision;