import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MessageSquare, Handshake, ShieldCheck } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: "Search & Discover",
    description: "Browse thousands of verified sitters based on your location, dates, and specific needs.",
    color: "bg-blue-500"
  },
  {
    icon: MessageSquare,
    title: "Chat & Connect",
    description: "Message potential sitters directly to discuss your requirements and get to know them.",
    color: "bg-purple-500"
  },
  {
    icon: Handshake,
    title: "Book with Confidence",
    description: "Secure your booking through our protected platform with comprehensive insurance coverage.",
    color: "bg-green-500"
  },
  {
    icon: ShieldCheck,
    title: "Travel Stress-Free",
    description: "Relax on your trip knowing your home and pets are in safe, loving hands.",
    color: "bg-orange-500"
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section className="bg-slate-900 py-24 text-white overflow-hidden relative">
      {/* Decorative background blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/10 blur-[120px] rounded-full -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full -ml-64 -mb-64" />

      <div className="section-padding relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">How SitterTrusted Works</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Finding a reliable sitter is easy, secure, and designed to give you ultimate peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          {/* Connector line for desktop */}
          <div className="hidden lg:block absolute top-1/4 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-slate-700 to-transparent z-0" />
          
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className={`w-20 h-20 rounded-3xl ${step.color} flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-500 rotate-3 group-hover:rotate-6`}>
                <step.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">{step.title}</h3>
              <p className="text-slate-400 leading-relaxed">
                {step.description}
              </p>
              
              {/* Step number badge */}
              <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-400">
                0{index + 1}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link
            to="/register"
            className="inline-block bg-white text-slate-900 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-slate-100 transition-all shadow-xl active:scale-95"
          >
            Get Started Today
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
