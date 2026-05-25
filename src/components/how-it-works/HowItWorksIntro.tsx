import introImg from '../../assets/245378.jpg';

const HowItWorksIntro = () => {
  return (
    <section className="bg-[#fdf8f1] py-[70px] px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image Column */}
          <div className="relative">
            <img
              src={introImg}
              alt="Care You Can Count On"
              className="w-full h-[50vh] object-cover rounded-[1.5rem] shadow-lg"
            />
          </div>

          {/* Content Column */}
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1a2e35] font-serif leading-tight">
              Care You Can Count On
            </h2>

            <div className="space-y-4 text-slate-600 text-[15px] leading-relaxed">
              <p>
                Home Paw connects trusted pet owners and homeowners with caring sitters across South Africa.
                Whether you need someone to care for your pets and home while you travel, or you're looking to
                become a sitter yourself, our platform is designed to make the process simple, safe, and reliable for
                everyone involved.
              </p>
              <p>
                Pet and home owners can create a listing by selecting the service they need, adding dates, location
                details, photos, and information about their pets or home. Owners can then review sitter
                applications, chat with interested sitters, read reviews, and choose the person they feel most
                comfortable trusting with their pets and property.
              </p>
              <p>
                Sitters can create a profile showcasing their experience, services offered, availability, photos, and
                verification details. Once registered, sitters can browse listings, apply for opportunities that suit their
                lifestyle, and connect directly with owners through secure messaging on the platform.
              </p>
              <p>
                Our services are not limited to cats and dogs only. Owners can also find care for birds, rabbits,
                reptiles, fish, and other small pets depending on the sitter's experience and preferences.
              </p>
              <p>
                While we focus on verified profiles, honest reviews, and building a trusted community, we also
                encourage both owners and sitters to take sensible safety precautions before confirming any booking
                or arrangement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksIntro;
