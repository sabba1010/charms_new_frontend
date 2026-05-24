import React from 'react';
import { motion } from 'framer-motion';

// Import images from assets/logo
import petSittingImg from '../../assets/logo/remov iocns/Pet_Sitting-removebg-preview.png';
import dogWalkingImg from '../../assets/logo/remov iocns/Dog_Walking-removebg-preview.png';
import dogBoardingImg from '../../assets/logo/remov iocns/Dog_Boarding-removebg-preview.png';
import doggyDayCareImg from '../../assets/logo/remov iocns/Doggy_Day_Care-removebg-preview.png';
import houseSittingImg from '../../assets/logo/remov iocns/House_Sitting-removebg-preview.png';
import securityChecksImg from '../../assets/logo/remov iocns/Security_Checks-removebg-preview.png';
import dropInVisitsImg from '../../assets/logo/remov iocns/5abb80491a7440c1b9f41ab47679c361.png';
import petTaxiImg from '../../assets/logo/remov iocns/Pet_Taxi-removebg-preview.png';
import cardBg from '../../assets/cardbackground.png';

const offers = [
  {
    title: "Pet Sitting",
    description: "Trusted sitters take care of your pets in your home so that they stay relaxed in their familiar surroundings.",
    image: petSittingImg
  },
  {
    title: "Dog Walking",
    description: "Daily walks tailored to your dog's pace and personality to keep them healthy and happy.",
    image: doggyDayCareImg
  },
  {
    title: "Dog Boarding",
    description: "Your pets stays in a vetted sitter's loving home overnight for however long you need.",
    image: dropInVisitsImg
  },
  {
    title: "Doggy Day Care",
    description: "Trusted sitters provide companionship, supervision, playtime and care to keep your pets happy and relaxed while you work, travel or attend to daily responsibilities.",
    image: dogWalkingImg
  },
  {
    title: "House Sitting",
    description: "A trusted exchange where home owners find vetted sitters to care for their home while they travel and sitters enjoy complimentary stays in homes around South Africa.",
    image: houseSittingImg
  },
  {
    title: "Security Checks",
    description: "Scheduled visits to check gates, alarms, lights, water plants and overall security while you are away.",
    image: securityChecksImg
  },
  {
    title: "Drop-In Visits",
    description: "Trusted sitters stop by during the day to provide feeding, companionship, playtime, bathroom breaks, medication and loving care while you're away or busy.",
    image: dogBoardingImg
  },
  {
    title: "Pet Taxi",
    description: "Safe transport by vetted sitters to take your pet to any appointment that you can not do yourself.",
    image: petTaxiImg
  }
];

const WhatWeOfferSection = () => {
  return (
    <section className="w-full bg-[#eee9df] pt-24 pb-24 px-6 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h4 className="text-[14px] font-semibold uppercase tracking-[0.2em] text-[#111] mb-6 font-fraunces">
            Services we offer
          </h4>
          <h2 className="text-[40px] md:text-[40px] font-fraunces font-semibold text-[#111] mb-6 leading-tight uppercase">
            Trusted care for your home <span style={{ fontFamily: 'serif', fontWeight: 600 }}>&</span> pets
          </h2>
          <p className="text-[17px] text-[#666] max-w-3xl mx-auto leading-relaxed">
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
              className="relative bg-white rounded-[10px] p-6 pt-5 w-full max-w-[280px] h-[340px] mx-auto overflow-hidden flex flex-col items-center text-center shadow-sm group hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500"
              style={{
                backgroundImage: `url(${cardBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* Number Badge centered horizontally */}
              <div className="w-8 h-8 rounded-full bg-[#B87D6D] flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0 z-20 mb-2">
                {index + 1}
              </div>

              {/* Title and Description at the Top */}
              <div className="relative z-10">
                <h3 className="text-base font-extrabold text-[#1a2e35] mb-2 leading-tight">
                  {offer.title}
                </h3>
                <p className="text-[#1a2e35]/80 text-[13px] font-medium leading-relaxed max-w-[200px] mx-auto">
                  {offer.description}
                </p>
              </div>

              {/* Icon Container with Mountain Background - Large, Visually Strong Icon at the Bottom */}
              <div className="mt-auto w-full pt-4 relative z-10 flex justify-center items-center">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="h-20 w-auto max-w-[80px] object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-500"
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
