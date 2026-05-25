import { motion } from 'framer-motion';
import banner from '../../assets/WhatsApp Image 2026-05-14 at 9.19.50 AM.jpeg';

const ContactHero = () => {
  return (
    <section className="relative h-[70vh] min-h-[850px] flex items-center justify-center overflow-hidden font-sans">
      <div className="absolute inset-0 z-0">
        <img
          src={banner}
          alt="Contact Us"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-fraunces text-4xl md:text-[50px] mt-4 md:mt-10 font-semibold text-white tracking-tight drop-shadow-xl whitespace-normal md:whitespace-nowrap overflow-visible leading-tight md:leading-normal mb-4">
            Contact
          </h1>
          <h2 className="font-fraunces text-2xl md:text-[32px] font-semibold text-white tracking-tight drop-shadow-md mb-4">
            We're here to help you.
          </h2>
          <p className="font-sans text-[16px] md:text-[20px] text-[#D1D1D1] font-medium max-w-2xl mx-auto leading-relaxed">
            Have questions or need support? Get in touch anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactHero;
