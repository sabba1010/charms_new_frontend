import React from 'react';
import { motion } from 'framer-motion';
import searchIcon from '../../assets/WhatsApp-Image-search.svg';
import calendarIcon from '../../assets/WhatsApp-Image-calendar.svg';
import houseIcon from '../../assets/WhatsApp-Image-House.svg';
import reviewIcon from '../../assets/logo/remov iocns/Pet_Taxi-removebg-preview.png';
import verifiedIcon from '../../assets/logo/remov iocns/House_Sitting-removebg-preview.png';
import cardBg from '../../assets/cardbackground.png';

const WhyChooseUsOwner = () => {
  const items = [
    {
      icon: searchIcon,
      number: "1",
      title: "Find your perfect match",
      desc: "Search by location, dates and specific needs to find the ideal match for your home and pets.",
      customWidth: "auto",
      customHeight: "75px"
    },
    {
      icon: verifiedIcon,
      number: "2",
      title: "Verified sitters only",
      desc: "All sitters must pass a background check and provide ID and address verification.",
      customWidth: "auto",
      customHeight: "75px"
    },
    {
      icon: houseIcon,
      number: "3",
      title: "Keep your pets at home",
      desc: "Avoid the stress of boarding by keeping your pets in their own comfortable environment.",
      customWidth: "auto",
      customHeight: "75px"
    },
    {
      icon: reviewIcon,
      number: "4",
      title: "Real community reviews",
      desc: "Read honest feedback from other pet owners before you book.",
      customWidth: "auto",
      customHeight: "75px"
    }
  ];

  return (
    <section className="bg-[#eee9df] py-24 px-6 font-sans">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <span className="text-[13px] font-bold uppercase tracking-widest text-[#1a2e35] mb-4 block">
            FOR OWNERS
          </span>
          <h2 className="text-[40px] lg:text-[40px] font-semibold text-[#1a2e35] font-fraunces leading-tight">
            The better way to travel
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {items.map((item, i) => (
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
                {item.number}
              </div>

              {/* Title and Description */}
              <div className="relative z-10 flex-1 w-full">
                <h3 className="text-base font-extrabold text-[#1a2e35] mb-2 leading-tight">
                  {item.title}
                </h3>
                <p className="text-[#1a2e35]/80 text-[13px] font-medium leading-relaxed max-w-[200px] mx-auto">
                  {item.desc}
                </p>
              </div>

              {/* Icon Container */}
              <div className="absolute bottom-0 left-0 w-full h-[100px] flex justify-center items-end pb-4 z-10">
                <img
                  src={item.icon}
                  alt={item.title}
                  style={{ width: item.customWidth, height: item.customHeight }}
                  className="object-contain drop-shadow-md transition-all group-hover:scale-110"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsOwner;
