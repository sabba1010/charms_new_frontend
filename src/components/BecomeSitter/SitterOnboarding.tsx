import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import searchIcon from '../../assets/WhatsApp-Image-search.svg';
import calendarIcon from '../../assets/WhatsApp-Image-calendar.svg';
import houseIcon from '../../assets/WhatsApp-Image-House.svg';
import cardBg from '../../assets/cardbackground.png';

const SitterOnboarding = () => {
  const steps = [
    {
      number: "1",
      title: "Create profile",
      text: "Create your profile and tell us about yourself",
      icon: searchIcon
    },
    {
      number: "2",
      title: "Submit ID",
      text: "Submit ID, address and police clearance",
      icon: calendarIcon
    },
    {
      number: "3",
      title: "Get verified",
      text: "Get verified within 48 hours",
      icon: searchIcon // Reusing search icon
    },
    {
      number: "4",
      title: "Receive booking",
      text: "Receive your first booking request",
      icon: houseIcon
    }
  ];

  return (
    <section className="bg-[#eee9df] py-24 px-6 font-sans">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <span className="text-[13px] font-bold uppercase tracking-widest text-[#1a2e35] mb-4 block">
            HOW TO JOIN
          </span>
          <h2 className="text-[40px] lg:text-[40px] font-semibold text-[#1a2e35] font-fraunces leading-tight">
            Four steps to your first booking
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 justify-items-center">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative bg-white rounded-[10px] p-6 pt-5 w-full max-w-[280px] h-[260px] mx-auto overflow-hidden flex flex-col items-center text-center shadow-sm group hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500"
              style={{
                backgroundImage: `url(${cardBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* Number Badge */}
              <div className="w-8 h-8 rounded-full bg-[#B87D6D] flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0 mb-2">
                {step.number}
              </div>

              {/* Text Content */}
              <div className="relative z-10">
                <h3 className="text-base font-extrabold text-[#1a2e35] mb-2 leading-tight">
                  {step.title}
                </h3>
                <p className="text-[#1a2e35] font-extrabold text-[14px] leading-tight max-w-[200px] mx-auto opacity-80">
                  {step.text}
                </p>
              </div>

              {/* Icon Container with Mountain Background */}
              <div className="mt-auto w-full pt-4 relative z-10 flex justify-center items-center">
                <img
                  src={step.icon}
                  alt={step.title}
                  className="h-24 w-auto max-w-[120px] object-contain drop-shadow-md transition-all group-hover:scale-110"
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            to="/register"
            className="bg-[#2d373b] text-white px-12 py-4 rounded-xl font-bold hover:bg-[#1a2e35] transition-all text-base shadow-lg"
          >
            Apply to be a sitter
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SitterOnboarding;
