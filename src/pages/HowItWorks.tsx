import React from 'react';
import HowItWorksHero from '../components/how-it-works/HowItWorksHero';
import HowItWorksIntro from '../components/how-it-works/HowItWorksIntro';
// import HowItWorksSteps from '../components/home/HowItWorks/HowItWorksSection';
// import TrustSafety from '../components/how-it-works/TrustSafety';
// import SafetyTips from '../components/how-it-works/SafetyTips';
import HowItWorksCTA from '../components/how-it-works/HowItWorksCTA';
import { Link } from 'react-router-dom';

const HowItWorks: React.FC = () => {
  return (
    <div className="min-h-screen font-sans bg-white">
      <HowItWorksHero />
      <HowItWorksIntro />
      
      {/* <HowItWorksSteps /> */}
      {/* <TrustSafety /> */}
      {/* <SafetyTips /> */}
      
      <HowItWorksCTA />
    </div>
  );
};

export default HowItWorks;
