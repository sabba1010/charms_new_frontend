import React from 'react';
import ContactHero from '../components/contact/ContactHero';
import ContactFormSection from '../components/contact/ContactFormSection';
import ContactMap from '../components/contact/ContactMap';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <ContactHero />
      <ContactFormSection />
      <ContactMap />
    </div>
  );
};

export default Contact;
