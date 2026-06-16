import Hero from '../components/home/Hero/Hero';
import HowItWorksSection from '../components/home/HowItWorks/HowItWorksSection';
//import TrustedCareInfoSection from '../components/home/TrustedCareInfoSection';
import SafeHandsSection from '../components/home/SafeHands/SafeHandsSection';
//import ChooseListingsSection from '../components/home/ChooseListings/ChooseListingsSection';
import WhatWeOfferSection from '../components/home/WhatWeOfferSection';
import Testimonials from '../components/home/Testimonials/Testimonials';
import GetStartedCTA from '../components/home/GetStartedCTA';
import TrustAndSittersSection from '../components/home/TrustAndSittersSection';
//import BecomeTrustedSitterInfo from '../components/BecomeSitter/BecomeTrustedSitterInfo';

// import Filter from '../components/home/Filter/Filter';

const Home = () => {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <WhatWeOfferSection />
      <SafeHandsSection />
      <HowItWorksSection />
      <TrustAndSittersSection />
      
      <Testimonials />
      <GetStartedCTA />
      
      {/* <TrustedCareInfoSection /> */}
      {/* <BecomeTrustedSitterInfo /> */}
      {/* <ChooseListingsSection /> */}
      {/* <Filter /> */}
    </div>
  );
};

export default Home;
