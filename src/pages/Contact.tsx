import React from 'react';
import ContactHero from '../components/contact/ContactHero';
import ContactFormSection from '../components/contact/ContactFormSection';
import ContactSupportInfo from '../components/contact/ContactSupportInfo';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <ContactHero />
      <ContactFormSection />
      <ContactSupportInfo />
    </div>
  );
};

export default Contact;
