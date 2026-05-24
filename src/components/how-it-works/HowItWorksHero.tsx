import { motion } from 'framer-motion';
import banner from '../../assets/Banners 26.png';

const HowItWorksHero = () => {
  return (
    <section className="relative h-[80vh] min-h-[800px] flex items-center justify-center overflow-hidden font-sans">
      <div className="absolute inset-0 z-0">
        <img
          src={banner}
          alt="How it works"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-white text-lg font-medium mb-4 block opacity-90">How it works</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight font-serif">
            Care, simplified
          </h1>
          <p className="text-lg md:text-xl text-slate-100 max-w-3xl mx-auto opacity-90">
            From searching to booking to coming home here's exactly what to expect.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksHero;
