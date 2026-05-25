import React from 'react';
import HowItWorksHero from '../components/how-it-works/HowItWorksHero';
import HowItWorksIntro from '../components/how-it-works/HowItWorksIntro';
import HowItWorksSteps from '../components/home/HowItWorks/HowItWorksSection';
import TrustSafety from '../components/how-it-works/TrustSafety';
import SafetyTips from '../components/how-it-works/SafetyTips';
import HowItWorksCTA from '../components/how-it-works/HowItWorksCTA';
import { Link } from 'react-router-dom';

const HowItWorks: React.FC = () => {
  return (
    <div className="min-h-screen font-sans bg-white">
      <HowItWorksHero />
      <HowItWorksIntro />
      <HowItWorksSteps />
      
      <TrustSafety />
      <SafetyTips />
      <HowItWorksCTA />

      {/* <section className="bg-[#fdf8f1] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold text-[#1a2e35] mb-10 font-serif">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {[
                  { q: "How do I know a sitter is trustworthy?", a: "All sitters must pass a background check and are reviewed by community members." },
                  { q: "What does the insurance cover?", a: "Our comprehensive plan covers property damage and emergency pet care." },
                  { q: "Can I meet the sitter before booking?", a: "Yes, we highly recommend a 'meet and greet' before finalizing any stay." }
                ].map((item, i) => (
                  <div key={i} className="p-8 bg-[#F7F3ED] rounded-[2rem] border border-[#f2ebe1] shadow-sm">
                    <h4 className="font-bold text-[#1a2e35] mb-3 text-lg">{item.q}</h4>
                    <p className="text-slate-600 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#122023] rounded-[3rem] p-16 text-white flex flex-col justify-center shadow-2xl">
              <h2 className="text-4xl font-bold mb-6 font-serif">Still have questions?</h2>
              <p className="text-slate-400 mb-10 text-lg leading-relaxed">
                Our 24/7 support team is here to help you with anything you need to feel confident.
              </p>
              <Link 
                to="/contact" 
                className="bg-[#a3a362] text-white px-10 py-4 rounded-xl font-bold hover:bg-[#b8b875] transition-all self-start text-lg shadow-lg"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default HowItWorks;
