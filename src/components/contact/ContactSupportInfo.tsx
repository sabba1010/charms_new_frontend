import React from 'react';
import { motion } from 'framer-motion';
import cardBg from '../../assets/cardbackground.png';
import { HelpCircle, AlertCircle, MessageSquare } from 'lucide-react';

const ContactSupportInfo = () => {
  return (
    <section className="w-full bg-[#eee9df] py-20 px-6 font-sans">
      <div className="max-w-[1360px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-[26px] md:text-[40px] font-fraunces font-bold text-[#1a2e35] mb-4">
            Support <span style={{ fontFamily: 'serif', fontWeight: 600 }}>&</span> Guidelines
          </h2>
          <p className="text-[16px] md:text-[20px] text-[#666] max-w-3xl mx-auto leading-relaxed">
            We are dedicated to providing you with the best platform experience. Here is what you need to know about our support policies.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative bg-white rounded-[12px] p-8 overflow-hidden flex flex-col items-center text-center shadow-sm group hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500"
            style={{
              backgroundImage: `url(${cardBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* <div className="w-12 h-12 rounded-full bg-[#B87D6D] flex items-center justify-center text-white shadow-sm flex-shrink-0 z-20 mb-6">
              <HelpCircle size={24} />
            </div> */}
            
            <div className="relative z-10 w-full">
              <h3 className="text-[20px] font-extrabold text-[#1a2e35] mb-4 leading-tight">
                Platform Support
              </h3>
              <p className="text-[#1a2e35]/80 text-[15px] font-medium leading-relaxed">
                We offer full technical help and support for anything related to the platform itself, including account management, bookings, and navigation.
              </p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative bg-white rounded-[12px] p-8 overflow-hidden flex flex-col items-center text-center shadow-sm group hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500"
            style={{
              backgroundImage: `url(${cardBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* <div className="w-12 h-12 rounded-full bg-[#B87D6D] flex items-center justify-center text-white shadow-sm flex-shrink-0 z-20 mb-6">
              <AlertCircle size={24} />
            </div> */}
            
            <div className="relative z-10 w-full">
              <h3 className="text-[20px] font-extrabold text-[#1a2e35] mb-4 leading-tight">
                Disputes
              </h3>
              <p className="text-[#1a2e35]/80 text-[15px] font-medium leading-relaxed">
                We do not get involved in disputes between users. We ask that all members communicate openly and resolve issues amicably amongst themselves.
              </p>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="relative bg-white rounded-[12px] p-8 overflow-hidden flex flex-col items-center text-center shadow-sm group hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500"
            style={{
              backgroundImage: `url(${cardBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* <div className="w-12 h-12 rounded-full bg-[#B87D6D] flex items-center justify-center text-white shadow-sm flex-shrink-0 z-20 mb-6">
              <MessageSquare size={24} />
            </div> */}
            
            <div className="relative z-10 w-full">
              <h3 className="text-[20px] font-extrabold text-[#1a2e35] mb-4 leading-tight">
                Complaints
              </h3>
              <p className="text-[#1a2e35]/80 text-[15px] font-medium leading-relaxed">
                If you have a serious complaint regarding behavior that violates our terms of service, please use the contact form above to reach our safety team.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSupportInfo;
