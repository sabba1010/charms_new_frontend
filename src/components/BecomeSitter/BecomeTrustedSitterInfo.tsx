import React from 'react';
import { motion } from 'framer-motion';
// Using placeholderImg as a temporary placeholder until you send the new picture
import placeholderImg from '../../assets/logo/Become a sitter page.png';

const BecomeTrustedSitterInfo = () => {
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
              Become a Trusted Sitter
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-[#1a2e35]/80 font-sans space-y-6"
            >
              <p className="text-[15px] leading-relaxed">
                Love animals, enjoy helping others, or simply want flexible opportunities that fit your lifestyle? We connects trusted sitters with pet owners and homeowners looking for reliable care and peace of mind while they travel, work, or need extra support.
              </p>
              
              <p className="text-[15px] leading-relaxed">
                Whether you're looking to earn extra income through pet sitting and house sitting, or enjoy complimentary stays in beautiful homes across South Africa, our platform gives you the opportunity to do what you love while becoming part of a trusted and caring community.
              </p>

              <p className="text-[15px] leading-relaxed">
                From playful puppies and affectionate cats to birds, rabbits, reptiles, and other small pets, every sit is unique and rewarding. Sitters can choose the services that suit them best, including pet boarding, overnight stays, drop-in visits, dog walking, holiday home sitting, and more.
              </p>

              <p className="text-[15px] leading-relaxed">
                Our focus is on trust, safety, and meaningful connections. With verified profiles, secure communication, and honest community reviews, we aim to create a safe and welcoming experience for both sitters and owners alike.
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
                alt="Become a Trusted Sitter"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default BecomeTrustedSitterInfo;
