import React from 'react';
import { motion } from 'framer-motion';
import searchIcon from '../../assets/png/Artboard2@2x.png';
import calendarIcon from '../../assets/png/Artboard2copy@2x.png';
import houseIcon from '../../assets/png/Artboard3@2x.png';
import verifiedIcon from '../../assets/png2/9.png';
import cardBg from '../../assets/cardbackground.png';

const WhySitWithUs = () => {
  const items = [
    {
      icon: searchIcon,
      number: "1",
      title: "Flexible way to earn or travel",
      desc: "Choose paid and house sitting opportunities or enjoy complimentary stays in beautiful homes across South Africa.",
      customWidth: "auto",
      customHeight: "90px"
    },
    {
      icon: calendarIcon,
      number: "2",
      title: "Flexible Schedule",
      desc: "Set your own availability, choose the service you offer, and connect with owners looking for the exact care and support you provide.",
      customWidth: "auto",
      customHeight: "90px"
    },
    {
      icon: houseIcon,
      number: "3",
      title: "Do what you love",
      desc: "Spend time with amazing pets, help families travel with peace of mind, and turn your love for animals and travel into rewarding opportunities.",
      customWidth: "auto",
      customHeight: "90px"
    },
    {
      icon: verifiedIcon,
      number: "4",
      title: "Safe & Trusted Community",
      desc: "Join a platform focused on verified profiles, secure communication, honest reviews, and trusted connections between owners and sitters.",
      customWidth: "auto",
      customHeight: "90px"
    }
  ];

  return (
    <section className="bg-[#eee9df] py-24 px-6 font-sans">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[26px] md:text-[40px] font-fraunces font-bold text-[#1a2e35] mb-4">
             Why sit with HomePaw
          </h2>
          <h3 className="text-[16px] md:text-[20px] font-medium text-[#1a2e35]/90 mb-6">
            Build for sitters that love pets and travel.
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative bg-white rounded-[12px] p-6 pt-6 w-full max-w-[310px] h-[340px] mx-auto overflow-hidden flex flex-col items-center text-center shadow-sm group hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500"
              style={{
                backgroundImage: `url(${cardBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* Number Badge */}
              <div className="w-8 h-8 rounded-full bg-[#B87D6D] flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0 mb-2.5">
                {item.number}
              </div>

              {/* Title and Description */}
              <div className="relative z-10 flex-1 w-full flex flex-col">
                <h3 className="text-[17px] font-extrabold text-[#1a2e35] mb-2 leading-tight">
                  {item.title}
                </h3>
                <p className="text-[#1a2e35]/80 text-[13px] font-medium leading-relaxed max-w-[245px] mx-auto">
                  {item.desc}
                </p>
              </div>

              {/* Icon Container */}
              <div className="absolute bottom-0 left-0 w-full h-[120px] flex justify-center items-end pb-4 z-10">
                <img
                  src={item.icon}
                  alt={item.title}
                  style={{ width: item.customWidth, height: item.customHeight }}
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

export default WhySitWithUs;
