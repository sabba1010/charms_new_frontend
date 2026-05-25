import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import searchIcon from '../../assets/WhatsApp-Image-search.svg';
import calendarIcon from '../../assets/WhatsApp-Image-calendar.svg';
import houseIcon from '../../assets/WhatsApp-Image-House.svg';
import reviewIcon from '../../assets/logo/remov iocns/Pet_Taxi-removebg-preview.png';
import verifiedIcon from '../../assets/logo/remov iocns/House_Sitting-removebg-preview.png';
import cardBg from '../../assets/cardbackground.png';

const FindSitterSteps = () => {
  const steps = [
    {
      number: "1",
      title: "Search",
      text: "Post your stay or browse local sitters",
      icon: searchIcon,
      customWidth: "auto",
      customHeight: "75px"
    },
    {
      number: "2",
      title: "Connect",
      text: "Message sitters and arrange a meet-and-greet",
      icon: calendarIcon,
      customWidth: "auto",
      customHeight: "75px"
    },
    {
      number: "3",
      title: "Book",
      text: "Book with confidence through our secure platform",
      icon: verifiedIcon,
      customWidth: "auto",
      customHeight: "75px"
    },
    {
      number: "4",
      title: "Relax",
      text: "Enjoy your trip while your pets are cared for",
      icon: houseIcon,
      customWidth: "auto",
      customHeight: "75px"
    }
  ];

  return (
    <section className="bg-[#eee9df] py-24 px-6 font-sans">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[40px] font-fraunces font-bold text-[#1a2e35] mb-4">
            Find a sitter in four simple steps
          </h2>
          <h3 className="text-[20px] font-medium text-[#1a2e35]/90 mb-6">
            How it works
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center mb-16">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative bg-white rounded-[10px] p-6 pt-5 w-full max-w-[310px] h-[260px] mx-auto overflow-hidden flex flex-col items-center text-center shadow-sm group hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500"
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
              <div className="relative z-10 flex-1 w-full">
                <h3 className="text-[18px] font-extrabold text-[#1a2e35] mb-2 leading-tight">
                  {step.title}
                </h3>
                <p className="text-[#1a2e35] font-extrabold text-[14px] leading-tight max-w-[200px] mx-auto opacity-80">
                  {step.text}
                </p>
              </div>

              {/* Icon Container */}
              <div className="absolute bottom-0 left-0 w-full h-[100px] flex justify-center items-end pb-4 z-10">
                <img
                  src={step.icon}
                  alt={step.title}
                  style={{ width: step.customWidth, height: step.customHeight }}
                  className="object-contain drop-shadow-md transition-all group-hover:scale-110"
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
            Find a sitter now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FindSitterSteps;
