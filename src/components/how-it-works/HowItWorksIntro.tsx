import introImg from '../../assets/245378.jpg';

const HowItWorksIntro = () => {
  return (
    <section className="bg-[#fdf8f1] py-[70px] px-6 font-sans text-slate-700">
      <div className="max-w-6xl mx-auto space-y-20">
        
        {/* Intro Section */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-[45px] font-bold text-[#1a2e35] font-fraunces leading-[1.15]">
              How House <span style={{ fontFamily: 'serif', fontWeight: 600 }}>&</span> Paw Works
            </h2>
            <p className="text-[18px] leading-relaxed font-medium text-[#1a2e35]/80">
              House <span style={{ fontFamily: 'serif', fontWeight: 600 }}>&</span> Paw makes it easy for pet owners and homeowners to connect with trusted sitters across South Africa. Whether you’re looking for someone to care for your pets and home while you’re away or you’re a sitter looking for opportunities, getting started is simple.
            </p>
          </div>
          <div className="flex-1 w-full">
            <img
              src={introImg}
              alt="How it works"
              className="w-full h-[350px] lg:h-[450px] object-cover rounded-[2rem] shadow-xl"
            />
          </div>
        </div>

        {/* Two Columns for Owners and Sitters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {/* Owners */}
          <div className="space-y-8">
            <div className="border-b-2 border-[#a3a362] pb-3 inline-block">
              <h3 className="text-2xl md:text-[28px] font-bold text-[#1a2e35] font-fraunces">For Pet <span style={{ fontFamily: 'serif', fontWeight: 600 }}>&</span> Home Owners</h3>
            </div>
            <div className="space-y-6">
              {[
                { step: "Step 1: Create Your Profile", desc: "Register an account and choose the membership package that best suits your needs. Complete your profile with information about yourself, your pets, your home, and the type of care you’re looking for." },
                { step: "Step 2: Verify Your Profile", desc: "To help build a safer and more trusted community, owners have the option to complete identity and address verification." },
                { step: "Step 3: Create Your Listing (Job Listing)", desc: "Post a listing outlining your requirements, including your location, travel dates, the services you need, and any important information about your pets or home." },
                { step: "Step 4: Review Applications", desc: "Sitters can browse available listings and apply for opportunities that match their experience and availability. You’ll be able to review sitter profiles, verification badges, experience, and reviews before deciding who may be the best fit." },
                { step: "Step 5: Connect & Arrange Care", desc: "Use our secure messaging system to communicate directly with sitters, ask questions, discuss expectations, and arrange the details of the sit." },
                { step: "Step 6: Leave a Review", desc: "After the service is completed, both owners and sitters can leave reviews, helping to build trusted reputations within the House & Paw community." },
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-[#f2ebe1] hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-[#1a2e35] text-[17px] mb-2">{item.step}</h4>
                  <p className="text-[15px] leading-relaxed text-[#1a2e35]/80">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sitters */}
          <div className="space-y-8">
            <div className="border-b-2 border-[#e57a55] pb-3 inline-block">
              <h3 className="text-2xl md:text-[28px] font-bold text-[#1a2e35] font-fraunces">For Sitters</h3>
            </div>
            <div className="space-y-6">
              {[
                { step: "Step 1: Create Your Profile", desc: "Register an account, choose a membership package, and tell owners about yourself, your experience, services offered, preferred locations, and the types of pets or properties you’re comfortable caring for." },
                { step: "Step 2: Complete Verification", desc: "To help build trust with owners, sitters complete identity and address verification and submit a police clearance certificate for review. Approved verification badges are displayed on sitter profiles." },
                { step: "Step 3: Browse Listings", desc: "Search available opportunities and find pet and home sitting assignments that match your skills, experience, and location preferences." },
                { step: "Step 4: Apply for Opportunities", desc: "Submit applications to listings that interest you and explain why you’d be a good fit for the owner’s requirements." },
                { step: "Step 5: Connect with Owners", desc: "Once an owner expresses interest, communicate through our secure messaging system to discuss routines, responsibilities, expectations, and any special requirements." },
                { step: "Step 6: Build Your Reputation", desc: "After each completed sit, reviews help you establish credibility, showcase your experience, and build lasting relationships with owners." },
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-[#f2ebe1] hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-[#1a2e35] text-[17px] mb-2">{item.step}</h4>
                  <p className="text-[15px] leading-relaxed text-[#1a2e35]/80">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="bg-[#1a2e35] text-white p-10 md:p-14 lg:p-16 rounded-[2rem] shadow-2xl text-center space-y-10 mt-16 relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#a3a362] opacity-10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
          
          <div className="max-w-4xl mx-auto space-y-6 relative z-10">
            <h3 className="text-[28px] md:text-[36px] font-bold font-fraunces mb-6">Building a Trusted Community</h3>
            <p className="text-[16px] md:text-[18px] leading-relaxed text-slate-200">
              Trust is at the heart of everything we do. Through profile verification, reviews, and transparent member profiles, House <span style={{ fontFamily: 'serif', fontWeight: 600 }}>&</span> Paw helps owners and sitters make informed decisions when choosing who they would like to work with.
            </p>
            <p className="text-[16px] md:text-[18px] leading-relaxed text-slate-200">
              While House <span style={{ fontFamily: 'serif', fontWeight: 600 }}>&</span> Paw provides the platform for members to connect, owners and sitters are responsible for conducting their own assessments and ensuring they are comfortable with any arrangements before proceeding.
            </p>
          </div>

          <div className="max-w-4xl mx-auto pt-10 border-t border-slate-700/50 space-y-8 relative z-10">
            <h3 className="text-[28px] md:text-[36px] font-bold font-fraunces mb-6 text-[#e57a55]">Trusted Care Starts Here</h3>
            <p className="text-[18px] md:text-[20px] leading-relaxed font-medium">
              Whether you’re travelling for business, taking a holiday, or looking for meaningful pet and home sitting opportunities, House <span style={{ fontFamily: 'serif', fontWeight: 600 }}>&</span> Paw is here to help you connect with confidence.
            </p>
            <p className="text-[22px] md:text-[26px] font-serif italic text-[#a3a362] mt-8 font-semibold">
              Because trusted care starts at home.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorksIntro;
