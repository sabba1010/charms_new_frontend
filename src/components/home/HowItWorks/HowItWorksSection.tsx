import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import searchIcon from '../../../assets/WhatsApp-Image-search.svg';
import calendarIcon from '../../../assets/Screenshot_2026-05-23_171912-removebg-preview.png';
import houseIcon from '../../../assets/Screenshot 2026-05-23 17233012.png';
import StarIcon from '../../../assets/logo/WhatsApp_Image_2026-05-12_at_8.30.56_AM__2_-removebg-preview.png';
import cardBg from '../../../assets/cardbackground.png';

const steps = [
  {
    number: "1",
    title: "Create a listing",
    description: "Create a listing for sitters to apply or find vetted sitters in your area by searching.",
    icon: searchIcon
  },
  {
    number: "2",
    title: "Connect & Book",
    description: "Review applications. Connect with sitters you like and book.",
    icon: calendarIcon
  },
  {
    number: "3",
    title: "Travel with peace of mind",
    description: "Focus on what matters while your home and pets are in safe hands.",
    icon: houseIcon
  },
  {
    number: "4",
    title: "Rate and Review",
    description: "Share your experience to help the community grow.",
    icon: StarIcon
  }
];

const HowItWorksSection = () => {
  return (
    <section className="bg-[#eee9df] pt-[80px] pb-[80px] font-sans">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-[40px] font-bold text-[#1a2e35] mb-4 font-fraunces">
            How Home Paw work
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 justify-items-center">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-[#fdfdfd] rounded-[10px] p-6 pt-5 w-[280px] h-[240px] mx-auto overflow-hidden flex flex-col items-center text-center shadow-sm group hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500"
            >
              {/* Background Image with White Opacity Overlay */}
              <div
                className="absolute inset-0 z-0 pointer-events-none transition-all duration-500 group-hover:opacity-80"
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(253, 253, 253, 1) 0%, rgba(253, 253, 253, 0.7) 40%, rgba(253, 253, 253, 0.4) 100%), url(${cardBg})`,
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
              <div className="relative z-10">
                <h3 className="text-[20px] font-extrabold text-[#1a2e35] mb-2 leading-tight">
                  {step.title}
                </h3>
                <p className="text-[#1a2e35]/80 text-[16px] md:text-[17px] font-medium leading-relaxed max-w-[240px] mx-auto">
                  {step.description}
                </p>
              </div>

              <div className={`mt-auto w-full pt-4 relative z-10 flex justify-center items-end ${index === 1 || index === 3 ? '-mb-6' : ''}`}>
                {typeof step.icon === 'string' ? (
                  <img
                    src={step.icon}
                    alt={step.title}
                    className={`w-auto object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-500 ${index === 3 ? 'h-[75px] max-w-[150px]' : 'h-[85px] max-w-[150px]'
                      }`}
                  />
                ) : (
                  <div className={`flex items-end justify-center drop-shadow-md group-hover:scale-110 transition-transform duration-500 ${index === 3 ? 'h-[75px] w-[75px]' : 'h-[85px] w-[85px]'
                    }`}>
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
