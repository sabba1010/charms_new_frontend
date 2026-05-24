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
          <span className="text-white text-lg font-medium mb-4 block opacity-90">Contact</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight font-serif">
            We're here to help you.
          </h1>
          <p className="text-lg md:text-xl text-slate-100 max-w-2xl mx-auto opacity-90">
            Have questions or need support? Get in touch anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactHero;
