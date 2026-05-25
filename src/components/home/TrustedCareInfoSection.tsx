import React from 'react';
import { motion } from 'framer-motion';
//import image66cb6f from '../../assets/logo/house2.png';
//import petsittingImg from '../../assets/logo/save2.png';
//import securitypetImg from '../../assets/logo/love2.png';
// Using safeHandsImg as a temporary placeholder until you send the new picture
import placeholderImg from '../../assets/logo/Become a sitter page.png';

const TrustedCareInfoSection = () => {
  return (
    <section className="bg-[#fdfbf7] py-20 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          
          {/* Right Content (Text) */}
          <div className="flex-1 max-w-xl py-4 flex flex-col justify-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[40px] font-fraunces font-semibold text-[#1a2e35] mb-6 leading-[1.15]"
            >
              Trusted Care for Your Home <span style={{ fontFamily: 'serif', fontWeight: 600 }}>&</span> Pets
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-[#1a2e35]/80 font-sans space-y-6"
            >
              <p className="text-[15px] leading-relaxed">
                Looking for trusted care for your pets and home while you're away? From playful puppies and curious cats to senior pets needing extra attention, finding the right care can sometimes feel overwhelming. That's why more pet owners are choosing trusted pet and home sitting ... a caring alternative designed to keep pets safe, comfortable, and happy in the environment that suits them best.
              </p>
              
              <p className="text-[15px] leading-relaxed">
                Whether your pets stay in their own home or with a trusted sitter, personalized care helps reduce stress and keeps pets in a loving, familiar routine. For many pets, staying with a trusted sitter can also be a more comfortable and personal alternative to traditional pet hotels, boarding kennels, and catteries.
              </p>

              <p className="text-[15px] leading-relaxed">
                Our services are not limited to cats and dogs. We welcome a variety of pets, including birds, rabbits, small reptiles, and other small animals that deserve trusted care and attention too.
              </p>

              <p className="text-[15px] leading-relaxed">
                Connect with trusted sitters who care for your pets and home while you travel, work, or simply need extra support, giving you greater peace of mind knowing everything is being looked after with care.
              </p>
            </motion.div>
          </div>

          {/* Left Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 w-full"
          >
            <div className="relative rounded-[20px] overflow-hidden shadow-md h-[400px] lg:h-[550px]">
              <img
                src={placeholderImg}
                alt="Trusted Care"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default TrustedCareInfoSection;
