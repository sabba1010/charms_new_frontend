import React from 'react';
import { motion } from 'framer-motion';

const AboutFocus = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-8 text-lg text-slate-600 leading-relaxed">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100"
        >
          <p className="mb-6">
            House <span style={{ fontFamily: 'serif', fontWeight: 600 }}>&</span> Paw was built specifically for South African households. We understand that every home and every pet is different. While dogs and cats are often at the heart of what we do, our community also supports the care of birds, rabbits, fish, reptiles, horses, farm animals, and holiday properties.
          </p>
          <p className="mb-6">
            What makes House <span style={{ fontFamily: 'serif', fontWeight: 600 }}>&</span> Paw different is our focus on building trust and long-term relationships. Through profile verification, reviews, and transparent information, we’re creating a community where owners can confidently find care and sitters can build lasting connections with the families they support.
          </p>
          <p>
            As our community grows, so does our vision. We aim to create a place where pet owners, homeowners, sitters, breeders, and trusted service providers can come together, share knowledge, support one another, and access valuable services in one trusted space.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutFocus;
