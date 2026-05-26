import React from 'react';
import { motion } from 'framer-motion';
import banner from '../../assets/Banners 2.png';

const FindSitterBanner = () => {
    return (
        <section className="relative h-[60vh] md:h-[80vh] min-h-[500px] md:min-h-[800px] w-full flex items-center justify-center overflow-hidden font-sans">
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
                    {/* Main Heading */}
                    <h1 className="font-fraunces text-4xl md:text-[50px] mt-4 md:mt-10 font-semibold text-white tracking-tight drop-shadow-xl whitespace-normal md:whitespace-nowrap overflow-visible leading-tight md:leading-normal mb-4">
                        Find a Sitter
                    </h1>

                    {/* Sub Heading */}
                    <h2 className="font-fraunces text-2xl md:text-[32px] font-semibold text-white tracking-tight drop-shadow-md mb-4">
                        Trusted care for your pets and home
                    </h2>

                    {/* Sentence */}
                    <p className="font-sans text-[14px] md:text-[20px] text-[#D1D1D1] font-medium max-w-xs md:max-w-none mx-auto leading-relaxed whitespace-normal">
                        Search South Africa's most trusted pet & home care community.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default FindSitterBanner;
