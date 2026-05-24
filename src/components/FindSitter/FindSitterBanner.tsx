import React from 'react';
import { motion } from 'framer-motion';
import banner from '../../assets/Banners 2.png';

const FindSitterBanner = () => {
    return (
        <section className="relative h-[80vh] min-h-[800px] w-full flex items-center justify-center overflow-hidden font-sans">
            {/* Background Image Container */}
            <div className="absolute inset-0 z-0">
                <img
                    src={banner}
                    alt="Find a Sitter"
                    className="w-full h-full object-cover object-top"
                />
                {/* The "Vignette/Dimmed" Overlay to match your image */}
                <div className="absolute inset-0 bg-black/45" />
            </div>

            {/* Content Layer */}
            <div className="relative z-10 text-center px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {/* Small Top Label */}
                    <span className="text-white text-sm md:text-base font-semibold mb-3 block tracking-tight">
                        Find a Sitter
                    </span>

                    {/* Main Serif Heading */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-[1.1] font-serif">
                        Trusted care for your pets and home
                    </h1>

                    {/* Subtext/Description */}
                    <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-none mx-auto font-normal leading-relaxed whitespace-nowrap">
                        Search South Africa's most trusted pet & home care community.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default FindSitterBanner;
