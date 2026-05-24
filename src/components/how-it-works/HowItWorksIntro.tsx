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
            
            <div className="space-y-4 text-slate-600 text-base leading-relaxed">
              <p>
                We connect pet owners with trusted, verified sitters in their local area.
                From finding the right match to booking and communication, everything is
                designed to be simple, safe, and stress-free.
              </p>
              <p>
                Whether you're away for a day or a longer trip, you can relax knowing your pet
                is in caring hands.
              </p>
              <p>
                Each sitter on our platform is carefully reviewed for reliability, experience, and
                genuine care. You can browse profiles, read reviews, and choose the sitter that
                best fits your needs.
              </p>
              <p>
                Our secure system lets you connect, ask questions, and book with confidence
                all in one place. We also ensure clear communication so there are no surprises
                along the way.
              </p>
              <p>
                With flexible options and a smooth process, managing your pet's care becomes
                effortless. Because it's not just about finding a sitter, it's about finding someone
                who treats your pet like family.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksIntro;
