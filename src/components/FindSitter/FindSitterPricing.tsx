import React from 'react';
import { motion } from 'framer-motion';

const FindSitterPricing: React.FC = () => {
    return (
        <section className="bg-white py-20 px-6 font-sans">
            <div className="max-w-7xl mx-auto">
                {/* Heading Sentence */}
                <div className="text-center mb-20">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-[32px] md:text-[42px] lg:text-[48px] font-semibold text-[#1a2e35] tracking-tight leading-[1.1] max-w-5xl mx-auto font-fraunces"
                    >
                        Monthly and yearly plans for pet and home owners.
                    </motion.h2>
                    <div className="w-24 h-1 bg-[#8b8b4e] mx-auto mt-8 rounded-full" />
                </div>

                {/* Pricing Blocks Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                    {/* Monthly Block */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="bg-white p-10 md:p-14 rounded-[40px] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-all text-center flex flex-col justify-center min-h-[350px] relative"
                    >
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                            Flexible
                        </div>
                        <h3 className="text-2xl font-bold text-[#1a2e35] mb-6">Monthly Membership</h3>
                        <div className="flex items-baseline justify-center gap-1">
                            <span className="text-5xl md:text-7xl font-bold text-[#1a2e35] font-serif">R190</span>
                            <span className="text-slate-400 text-xl">/mo</span>
                        </div>
                        <p className="mt-8 text-slate-500 font-medium text-lg italic">
                            Pay as you go, cancel anytime.
                        </p>
                    </motion.div>

                    {/* Yearly Block */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="bg-[#1a2e35] p-10 md:p-14 rounded-[40px] shadow-[0_20px_50px_rgba(26,46,53,0.3)] text-center flex flex-col justify-center min-h-[350px] relative overflow-hidden group"
                    >
                        {/* Premium Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2e35] to-[#253d45]" />
                        
                        {/* Abstract Background Element */}
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#8b8b4e]/10 rounded-full blur-[80px]" />
                        <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#8b8b4e]/10 rounded-full blur-[80px]" />
                        
                        <div className="relative z-10">
                            <div className="inline-block bg-[#8b8b4e] text-white text-[12px] font-black px-5 py-2 rounded-full mb-8 uppercase tracking-widest shadow-lg">
                                Save 2 Months
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-6">Annual Membership</h3>
                            <div className="flex items-baseline justify-center gap-1">
                                <span className="text-5xl md:text-7xl font-bold text-white font-serif">R1900</span>
                                <span className="text-white/40 text-xl">/yr</span>
                            </div>
                            <p className="mt-8 text-white/70 font-medium text-lg">
                                The best way to build your <br className="hidden sm:block" /> sitting reputation.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default FindSitterPricing;
