import React from 'react';
import { motion } from 'framer-motion';
import searchIcon from '../../assets/png/Artboard2@2x.png';
import verifiedIcon from '../../assets/png2/9.png';
import houseIcon from '../../assets/png2/4.png';
import reviewIcon from '../../assets/png/Artboard4@2x.png';
import cardBg from '../../assets/cardbackground.png';

const WhyChooseUsOwner = () => {
  const items = [
    {
      icon: searchIcon,
      number: "1",
      title: "Find your perfect match",
      desc: "Create a listing or search by location, dates, services to find trusted sitters perfectly suited for your home and pets.",
      customWidth: "auto",
      customHeight: "90px"
    },
    {
      icon: verifiedIcon,
      number: "2",
      title: "Verified sitters only",
      desc: "All sitters go through third party profile verification, including ID and address checks as well as Police clearance, helping you book with greater confidence and peace of mind.",
      customWidth: "auto",
      customHeight: "90px"
    },
    {
      icon: houseIcon,
      number: "3",
      title: "Flexible Care for every need",
      desc: "From in-home pet care and boarding to house sitting and holiday home stays, find trusted care options tailored to your lifestyle, travel plans, and your pets needs.",
      customWidth: "auto",
      customHeight: "90px"
    },
    {
      icon: reviewIcon,
      number: "4",
      title: "Trusted Community Reviews",
      desc: "Read genuine reviews and experience from other homeowners and pet owners before choosing the right sitter for your needs.",
      customWidth: "auto",
      customHeight: "90px"
    }
  ];

  return (
    <section className="bg-[#eee9df] py-24 px-6 font-sans">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[40px] font-fraunces font-bold text-[#1a2e35] mb-4">
            The better way to travel
          </h2>
          <h3 className="text-[20px] font-medium text-[#1a2e35]/90 mb-6">
            For owners
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
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

export default WhyChooseUsOwner;
