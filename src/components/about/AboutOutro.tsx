import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const AboutOutro = () => {
  return (
    <section className="py-24 px-6 bg-[#1a2e35] text-white text-center">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <Heart className="w-12 h-12 mx-auto text-pink-400 mb-8" fill="currentColor" />
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8 leading-tight">
            At its heart, House <span style={{ fontFamily: 'serif', fontWeight: 600 }}>&</span> Paw is about trust, care, and connection.
          </h2>
          <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
            What began as a personal search for someone to care for my own pets has grown into a mission to help households across South Africa find the support they need and the peace of mind they deserve.
          </p>
          <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed">
            Because when you’re away, you should be free to enjoy the journey, knowing that your pets, your home, and everything you care about are in trusted hands.
          </p>
          <div className="space-y-2">
            <p className="text-2xl font-serif italic text-white">Welcome to House <span style={{ fontFamily: 'serif', fontWeight: 600 }}>&</span> Paw.</p>
            <p className="text-amber-400 font-bold uppercase tracking-widest text-sm pt-4">Charmaine van der Rijst</p>
            <p className="text-slate-400 text-sm">Founder, House <span style={{ fontFamily: 'serif', fontWeight: 600 }}>&</span> Paw</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutOutro;
