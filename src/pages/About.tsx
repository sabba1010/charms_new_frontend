import React from 'react';
import AboutHero from '../components/about/AboutHero';
import AboutStory from '../components/about/AboutStory';
import AboutVision from '../components/about/AboutVision';
import AboutFocus from '../components/about/AboutFocus';
import AboutOutro from '../components/about/AboutOutro';
//import WhyChooseUsOwner from '../components/FindSitter/WhyChooseUsOwner';

const About: React.FC = () => {
  return (
    <div className="min-h-screen font-sans bg-white">
      <AboutHero />
      <AboutStory />
      <AboutVision />
      {/* <WhyChooseUsOwner /> */}
      <AboutFocus />
      <AboutOutro />
    </div>
  );
};

export default About;
