import Hero from '../components/home/Hero/Hero';
import HowItWorksSection from '../components/home/HowItWorks/HowItWorksSection';
//import TrustedCareInfoSection from '../components/home/TrustedCareInfoSection';
import SafeHandsSection from '../components/home/SafeHands/SafeHandsSection';
//import ChooseListingsSection from '../components/home/ChooseListings/ChooseListingsSection';
import WhatWeOfferSection from '../components/home/WhatWeOfferSection';
import Testimonials from '../components/home/Testimonials/Testimonials';
import GetStartedCTA from '../components/home/GetStartedCTA';
import TrustAndSittersSection from '../components/home/TrustAndSittersSection';
// import Filter from '../components/home/Filter/Filter';

const Home = () => {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <HowItWorksSection />
      {/* <TrustedCareInfoSection /> */}
      <SafeHandsSection />
      <TrustAndSittersSection />
      {/* <ChooseListingsSection /> */}
      <WhatWeOfferSection />
      <Testimonials />
      <GetStartedCTA />
      {/* <Filter /> */}
    </div>
  );
};

export default Home;
