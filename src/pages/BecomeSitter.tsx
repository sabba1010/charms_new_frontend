import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, DollarSign, Calendar, Heart } from 'lucide-react';
import BecomeSitterBanner from '../components/BecomeSitter/becomeSitterbanner';
import PricingBlocks from '../components/BecomeSitter/PricingBlocks';
import WhySitWithUs from '../components/BecomeSitter/WhySitWithUs';
//import BecomeTrustedSitterInfo from '../components/BecomeSitter/BecomeTrustedSitterInfo';
import SitterOnboarding from '../components/BecomeSitter/SitterOnboarding';

const BecomeSitter: React.FC = () => {
  return (
    <div className="min-h-screen font-sans bg-white">
      <BecomeSitterBanner />
      <PricingBlocks />
      <WhySitWithUs />
      {/* <BecomeTrustedSitterInfo /> */}
      <SitterOnboarding />
    </div>


  );
};

export default BecomeSitter;
