import React from 'react';
import { motion } from 'framer-motion';
// Ensure the path to your image is correct
import banner from '../../assets/Banners 12.png';

const BecomeSitterBanner = () => {
    return (
        <section className="relative h-[80vh] min-h-[800px] w-full flex items-center justify-center overflow-hidden font-sans">
            {/* Background Image Container */}
            <div className="absolute inset-0 z-0">
                <img
                    src={banner}
                    alt="Become a Sitter"
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
                        Become a Sitter
                    </h1>

                    {/* Sub Heading */}
                    <h2 className="font-fraunces text-2xl md:text-[32px] font-semibold text-white tracking-tight drop-shadow-md mb-4">
                        Earn by Caring for Pets
                    </h2>

                    {/* Sentence */}
                    <p className="font-sans text-[16px] md:text-[20px] text-[#D1D1D1] font-medium max-w-none mx-auto leading-relaxed whitespace-nowrap">
                        Join our platform, connect with pet owners, and earn by providing safe and loving care for pets in your area.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default BecomeSitterBanner;