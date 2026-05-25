import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const PricingBlocks = () => {
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
                        Monthly and yearly plans for pet and home sitters.
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
                        className="bg-[#E9D3C5] p-10 md:p-14 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-all text-center flex flex-col justify-start min-h-[350px] relative"
                    >
                        <div className="h-[40px] flex items-center justify-center mb-8">
                            <div className="inline-block text-[11px] font-bold text-[#1a2e35] uppercase tracking-[0.2em]">
                                Flexible
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-[#1a2e35] mb-6">Monthly Membership</h3>
                        <div className="flex items-baseline justify-center gap-1">
                            <span className="text-5xl md:text-7xl font-bold text-[#1a2e35] font-serif">R170</span>
                            <span className="text-[#1a2e35] text-xl">/mo</span>
                        </div>
                        <div className="mt-6 border-b border-[#d4bead] pb-6 mb-6 flex flex-col justify-start h-[84px]">
                            <p className="text-[#1a2e35] font-medium text-lg italic">
                                Pay as you go, cancel anytime.
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <ul className="space-y-4 text-left">
                                <li className="flex items-start gap-3 text-[#1a2e35]"><Check className="w-5 h-5 text-[#8b8b4e] shrink-0 mt-0.5" /> <span>Unlimited access to home & pet jobs</span></li>
                                <li className="flex items-start gap-3 text-[#1a2e35]"><Check className="w-5 h-5 text-[#8b8b4e] shrink-0 mt-0.5" /> <span>No Booking Fees</span></li>
                                <li className="flex items-start gap-3 text-[#1a2e35]"><Check className="w-5 h-5 text-[#8b8b4e] shrink-0 mt-0.5" /> <span>Member support</span></li>
                                <li className="flex items-start gap-3 text-[#1a2e35]"><Check className="w-5 h-5 text-[#8b8b4e] shrink-0 mt-0.5" /> <span>Cancel any time</span></li>
                                <li className="flex items-start gap-3 text-[#1a2e35]"><Check className="w-5 h-5 text-[#8b8b4e] shrink-0 mt-0.5" /> <span>Unlimited job applications</span></li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Yearly Block */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="bg-[#1a2e35] p-10 md:p-14 rounded-[40px] shadow-[0_20px_50px_rgba(26,46,53,0.3)] text-center flex flex-col justify-start min-h-[350px] relative overflow-hidden group"
                    >
                        {/* Premium Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2e35] to-[#253d45]" />
                        
                        {/* Abstract Background Element */}
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#8b8b4e]/10 rounded-full blur-[80px]" />
                        <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#8b8b4e]/10 rounded-full blur-[80px]" />
                        
                        <div className="relative z-10">
                            <div className="h-[40px] flex items-center justify-center mb-8">
                                <div className="inline-block bg-[#8b8b4e] text-white text-[12px] font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-lg">
                                    Save 2 Months
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-6">Annual Membership</h3>
                            <div className="flex items-baseline justify-center gap-1">
                                <span className="text-5xl md:text-7xl font-bold text-white font-serif">R1700</span>
                                <span className="text-white/40 text-xl">/yr</span>
                            </div>
                            <div className="mt-6 border-b border-white/10 pb-6 mb-6 flex flex-col justify-start h-[84px]">
                                <p className="text-white/70 font-medium text-lg">
                                    The best way to build your <br className="hidden sm:block" /> sitting reputation.
                                </p>
                            </div>
                            <div className="flex flex-col items-center">
                                <ul className="space-y-4 text-left">
                                    <li className="flex items-start gap-3 text-white/90"><Check className="w-5 h-5 text-[#a3a362] shrink-0 mt-0.5" /> <span>Unlimited access to home & pet jobs</span></li>
                                    <li className="flex items-start gap-3 text-white/90"><Check className="w-5 h-5 text-[#a3a362] shrink-0 mt-0.5" /> <span>No Booking fees</span></li>
                                    <li className="flex items-start gap-3 text-white/90"><Check className="w-5 h-5 text-[#a3a362] shrink-0 mt-0.5" /> <span>Member support</span></li>
                                    <li className="flex items-start gap-3 text-white/90"><Check className="w-5 h-5 text-[#a3a362] shrink-0 mt-0.5" /> <span>Save 2 months</span></li>
                                    <li className="flex items-start gap-3 text-white/90"><Check className="w-5 h-5 text-[#a3a362] shrink-0 mt-0.5" /> <span>No monthly renewal or interruptions</span></li>
                                    <li className="flex items-start gap-3 text-white/90"><Check className="w-5 h-5 text-[#a3a362] shrink-0 mt-0.5" /> <span>Always stay connected to see new jobs posted</span></li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default PricingBlocks;
