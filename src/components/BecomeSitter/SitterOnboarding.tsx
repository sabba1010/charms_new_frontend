import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import searchIcon from '../../assets/png/Artboard2@2x.png';
import securityChecksIcon from '../../assets/png2/9.png';
import verifiedIcon from '../../assets/png2/4.png';
import houseIcon from '../../assets/png/Artboard3@2x.png';
import cardBg from '../../assets/cardbackground.png';

const SitterOnboarding = () => {
  const steps = [
    {
      number: "1",
      title: "Create profile",
      text: "Create your profile and tell us about yourself",
      icon: searchIcon,
      customWidth: "auto",
      customHeight: "90px"
    },
    {
      number: "2",
      title: "Apply for vetted documents",
      text: "Apply for ID, address and police clearance by following the steps",
      icon: securityChecksIcon,
      customWidth: "auto",
      customHeight: "90px"
    },
    {
      number: "3",
      title: "Get verified",
      text: "Please wait for documents and upload all verifications",
      icon: verifiedIcon,
      customWidth: "auto",
      customHeight: "90px"
    },
    {
      number: "4",
      title: "Receive booking",
      text: "Receive your first booking request",
      icon: houseIcon,
      customWidth: "auto",
      customHeight: "90px"
    }
  ];

  return (
    <section className="bg-[#eee9df] py-24 px-6 font-sans">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[40px] font-fraunces font-bold text-[#1a2e35] mb-4">
            Four steps to your first booking
          </h2>
          <h3 className="text-[20px] font-medium text-[#1a2e35]/90 mb-6">
            How to join
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 justify-items-center">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative bg-white rounded-[12px] p-6 pt-6 w-full max-w-[310px] h-[280px] mx-auto overflow-hidden flex flex-col items-center text-center shadow-sm group hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500"
              style={{
                backgroundImage: `url(${cardBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* Number Badge */}
              <div className="w-8 h-8 rounded-full bg-[#B87D6D] flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0 mb-2.5">
                {step.number}
              </div>

              {/* Text Content */}
              <div className="relative z-10 flex-1 w-full flex flex-col">
                <h3 className="text-[17px] font-extrabold text-[#1a2e35] mb-2 leading-tight">
                  {step.title}
                </h3>
                <p className="text-[#1a2e35]/80 text-[13px] font-medium leading-relaxed max-w-[245px] mx-auto">
                  {step.text}
                </p>
              </div>

              {/* Icon Container */}
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
