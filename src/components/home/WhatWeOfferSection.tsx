import React from 'react';
import { motion } from 'framer-motion';

// Import images from assets/logo
import petSittingImg from '../../assets/png2/3.png';
import dogWalkingImg from '../../assets/png2/7.png';
import dogBoardingImg from '../../assets/png2/6.png';
import doggyDayCareImg from '../../assets/png2/5.png';
import houseSittingImg from '../../assets/png2/4.png';
import securityChecksImg from '../../assets/png2/9.png';
import dropInVisitsImg from '../../assets/png2/10.png';
import petTaxiImg from '../../assets/png2/2.png';
import cardBg from '../../assets/cardbackground.png';

const offers = [
  {
    title: "Pet Sitting",
    description: "Trusted sitters take care of your pets in your home so that they stay relaxed in their familiar surroundings.",
    image: petSittingImg,
    customWidth: "auto",
    customHeight: "90px"
  },
  {
    title: "Dog Walking",
    description: "Daily walks tailored to your dog's pace and personality to keep them healthy and happy.",
    image: doggyDayCareImg,
    customWidth: "auto",
    customHeight: "90px"
  },
  {
    title: "Dog Boarding",
    description: "Your pets stays in a vetted sitter's loving home overnight for however long you need.",
    image: dropInVisitsImg,
    customWidth: "auto",
    customHeight: "90px"
  },
  {
    title: "Doggy Day Care",
    description: "Trusted sitters provide companionship, supervision, playtime and care to keep your pets happy and relaxed while you work, travel or attend to daily responsibilities.",
    image: dogWalkingImg,
    customWidth: "auto",
    customHeight: "90px"
  },
  {
    title: "House Sitting",
    description: "A trusted exchange where home owners find vetted sitters to care for their home while they travel and sitters enjoy complimentary stays in homes around South Africa.",
    image: houseSittingImg,
    customWidth: "auto",
    customHeight: "90px"
  },
  {
    title: "Security Checks",
    description: "Scheduled visits to check gates, alarms, lights, water plants and overall security while you are away.",
    image: securityChecksImg,
    customWidth: "auto",
    customHeight: "90px"
  },
  {
    title: "Drop-In Visits",
    description: "Trusted sitters stop by during the day to provide feeding, companionship, playtime, bathroom breaks, medication and loving care while you're away or busy.",
    image: dogBoardingImg,
    customWidth: "auto",
    customHeight: "90px"
  },
  {
    title: "Pet Taxi",
    description: "Safe transport by vetted sitters to take your pet to any appointment that you can not do yourself.",
    image: petTaxiImg,
    customWidth: "auto",
    customHeight: "90px"
  }
];

const WhatWeOfferSection = () => {
  return (
    <section className="w-full bg-[#eee9df] pt-24 pb-24 px-6 font-sans overflow-hidden">
      <div className="max-w-[1360px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-[26px] md:text-[40px] font-fraunces font-bold text-[#1a2e35] mb-4">
            Services we offer
          </h2>
          <h3 className="text-[16px] md:text-[20px] font-medium text-[#1a2e35]/90 mb-6">
            Trusted care for your home <span style={{ fontFamily: 'serif', fontWeight: 600 }}>&</span> pets
          </h3>
          <p className="text-[16px] md:text-[20px] text-[#666] max-w-3xl mx-auto leading-relaxed">
            Whether you need daily pet care, a trusted house sitter, or peace of mind while you travel, Home Paw connects you with reliable, vetted sitters who care for your home and pets as if they were their own.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-white rounded-[12px] p-6 pt-6 w-full max-w-[310px] h-[340px] mx-auto overflow-hidden flex flex-col items-center text-center shadow-sm group hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500"
              style={{
                backgroundImage: `url(${cardBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* Number Badge centered horizontally */}
              <div className="w-8 h-8 rounded-full bg-[#B87D6D] flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0 z-20 mb-2.5">
                {index + 1}
              </div>

              {/* Title and Description at the Top */}
              <div className="relative z-10 w-full">
                <h3 className="text-[17px] font-extrabold text-[#1a2e35] mb-2 leading-tight">
                  {offer.title}
                </h3>
                <p className="text-[#1a2e35]/80 text-[13px] font-medium leading-relaxed max-w-[245px] mx-auto">
                  {offer.description}
                </p>
              </div>

              {/* Icon Container - centered and bottom-aligned for pixel-perfect baseline alignment */}
              <div className="absolute bottom-0 left-0 w-full h-[120px] flex justify-center items-end pb-4 z-10">
                <img
                  src={offer.image}
                  alt={offer.title}
                  style={{ width: offer.customWidth, height: offer.customHeight }}
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

export default WhatWeOfferSection;
