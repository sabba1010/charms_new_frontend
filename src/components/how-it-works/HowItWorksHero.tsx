import { motion } from 'framer-motion';
import banner from '../../assets/Banners 26.png';

const HowItWorksHero = () => {
  return (
    <section className="relative h-[60vh] md:h-[80vh] min-h-[500px] md:min-h-[800px] flex items-center justify-center overflow-hidden font-sans">
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
          <h1 className="font-fraunces text-4xl md:text-[50px] mt-4 md:mt-10 font-semibold text-white tracking-tight drop-shadow-xl whitespace-normal md:whitespace-nowrap overflow-visible leading-tight md:leading-normal mb-4">
            How it works
          </h1>
          <h2 className="font-fraunces text-2xl md:text-[32px] font-semibold text-white tracking-tight drop-shadow-md mb-4">
            Care, simplified
          </h2>
          <p className="font-sans text-[16px] md:text-[20px] text-[#D1D1D1] font-medium max-w-3xl mx-auto leading-relaxed">
            From your first search to your final booking, Home Paw makes pet and home sitting safe and worry free.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksHero;
