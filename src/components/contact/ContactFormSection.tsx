import { Mail, MapPin, Clock } from 'lucide-react';

const ContactFormSection = () => {
  return (
    <section className="bg-[#fdf8f1] py-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2 bg-[#f2ebe1] p-10 rounded-[2rem]">
            <h2 className="text-3xl font-bold text-[#1a2e35] mb-8 font-serif">Send us a message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#1a2e35] mb-2">Name</label>
                  <input 
                    type="text" 
                    className="w-full px-6 py-3.5 bg-[#F7F3ED] border-none rounded-xl outline-none focus:ring-2 focus:ring-[#1a2e35]/10 transition-all shadow-sm" 
                    placeholder="" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1a2e35] mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-6 py-3.5 bg-[#F7F3ED] border-none rounded-xl outline-none focus:ring-2 focus:ring-[#1a2e35]/10 transition-all shadow-sm" 
                    placeholder="" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1a2e35] mb-2">Subject</label>
                <input 
                  type="text" 
                  className="w-full px-6 py-3.5 bg-[#F7F3ED] border-none rounded-xl outline-none focus:ring-2 focus:ring-[#1a2e35]/10 transition-all shadow-sm" 
                  placeholder="" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1a2e35] mb-2">Message</label>
                <textarea 
                  rows={5} 
                  className="w-full px-6 py-4 bg-[#F7F3ED] border-none rounded-xl outline-none focus:ring-2 focus:ring-[#1a2e35]/10 transition-all resize-none shadow-sm" 
                  placeholder=""
                ></textarea>
              </div>
              <button className="w-full bg-[#1a2e35] text-white py-3.5 rounded-xl font-bold text-lg hover:bg-[#111f24] transition-all shadow-xl">
                Send message
              </button>
            </form>
          </div>

          {/* Info Cards Section */}
          <div className="space-y-4">
            {[
              { 
                icon: Mail, 
                title: "Email", 
                desc: "Reach out anytime for support", 
                detail: "info@houseandpaw.co.za" 
              },
              { 
                icon: MapPin, 
                title: "Location", 
                desc: "Proudly serving South Africa", 
                detail: "Cape Town  Johannesburg  Durban" 
              },
              { 
                icon: Clock, 
                title: "Response time", 
                desc: "We reply quickly", 
                detail: "Within 24 hours" 
              }
            ].map((item, i) => (
              <div key={i} className="bg-[#F7F3ED] p-6 rounded-2xl shadow-sm border border-[#f2ebe1]">
                <div className="w-8 h-8 rounded-full bg-[#a3a362] flex items-center justify-center text-white mb-4">
                  <item.icon className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold text-[#1a2e35] mb-1">{item.title}</h3>
                <p className="text-xs text-slate-500 mb-1">{item.desc}</p>
                <p className="text-sm font-medium text-[#1a2e35]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
