import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import searchIcon from '../../../assets/png/Artboard2@2x.png';
import calendarIcon from '../../../assets/png/Artboard2copy@2x.png';
import houseIcon from '../../../assets/png/Artboard3@2x.png';
import StarIcon from '../../../assets/png/Artboard4@2x.png';
import cardBg from '../../../assets/cardbackground.png';

const steps = [
  {
    number: "1",
    title: "Create a listing",
    description: "Create a listing for sitters to apply or find vetted sitters in your area by searching.",
    icon: searchIcon,
    customWidth: "auto",
    customHeight: "75px"
  },
  {
    number: "2",
    title: "Connect & Book",
    description: "Review applications. Connect with sitters you like and book.",
    icon: calendarIcon,
    customWidth: "auto",
    customHeight: "75px"
  },
  {
    number: "3",
    title: "Travel with peace of mind",
    description: "Focus on what matters while your home and pets are in safe hands.",
    icon: houseIcon,
    customWidth: "auto",
    customHeight: "75px"
  },
  {
    number: "4",
    title: "Rate and Review",
    description: "Share your experience to help the community grow.",
    icon: StarIcon,
    customWidth: "auto",
    customHeight: "75px"
  }
];

const HowItWorksSection = () => {
  return (
    <section className="bg-[#eee9df] pt-[80px] pb-[80px] font-sans">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-[26px] md:text-[40px] font-bold text-[#1a2e35] mb-4 font-fraunces">
            How Home Paw work
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 justify-items-center">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-white rounded-[10px] p-6 pt-5 w-full max-w-[280px] h-[260px] mx-auto overflow-hidden flex flex-col items-center text-center shadow-sm group hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500"
            >
              {/* Background Image without Gradient to match FindSitterSteps */}
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

              {/* Icon Container matching FindSitterSteps exactly */}
              <div className="absolute bottom-0 left-0 w-full h-[100px] flex justify-center items-center z-10">
                {typeof step.icon === 'string' ? (
                  <img
                    src={step.icon}
                    alt={step.title}
                    style={{ width: step.customWidth, height: step.customHeight }}
                    className="object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div
                    style={{ width: step.customWidth, height: step.customHeight }}
                    className="flex items-center justify-center drop-shadow-md group-hover:scale-110 transition-transform duration-500"
                  >
                    {step.icon}
                  </div>
                )}
              </div>

            </motion.div>
          ))}
        </div>

        {/* <div className="flex justify-center">
          <button className="bg-[#a3a362] hover:bg-[#8e8e56] text-white px-8 py-3 rounded-lg font-bold text-base shadow-lg transition-all hover:scale-105 active:scale-95">
            Get Started
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default HowItWorksSection;
