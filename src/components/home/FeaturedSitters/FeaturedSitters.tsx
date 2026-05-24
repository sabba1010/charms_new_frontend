import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, ShieldCheck, Heart } from 'lucide-react';

const sitters = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "London, UK",
    rating: 4.9,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    tags: ["Dog Lover", "House Proud"],
    price: "£45/day",
    verified: true
  },
  {
    id: 2,
    name: "David Miller",
    location: "New York, USA",
    rating: 5.0,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    tags: ["Security Expert", "Cat Sitter"],
    price: "£60/day",
    verified: true
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    location: "Madrid, Spain",
    rating: 4.8,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    tags: ["Vet Student", "Small Pets"],
    price: "£35/day",
    verified: true
  },
  {
    id: 4,
    name: "James Wilson",
    location: "Sydney, Australia",
    rating: 4.9,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    tags: ["Home Security", "Gardening"],
    price: "£50/day",
    verified: true
  }
];

const FeaturedSitters = () => {
  return (
    <section className="section-padding">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Meet Our Top-Rated Sitters
          </h2>
          <p className="text-slate-600 max-w-xl">
            Our sitters are background-checked and reviewed by pet owners just like you. Find the perfect match for your home today.
          </p>
        </div>
        <Link
          to="/listings"
          className="text-brand-blue font-bold hover:underline underline-offset-4 flex items-center gap-2"
        >
          View all sitters
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {sitters.map((sitter, index) => (
          <motion.div
            key={sitter.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 block"
          >
            <Link to={`/sitter-profile/${sitter.id}`}>
              <div className="relative aspect-[4/5] overflow-hidden">
              <img 
                src={sitter.image} 
                alt={sitter.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <Link 
                to="/favorites"
                className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-brand-blue hover:text-white transition-colors"
              >
                <Heart className="w-5 h-5" />
              </Link>
              {sitter.verified && (
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-brand-green" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-800">Verified</span>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-900/80 to-transparent">
                <p className="text-white font-bold text-lg">{sitter.price}</p>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg text-slate-900">{sitter.name}</h3>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-brand-yellow fill-brand-yellow" />
                  <span className="text-sm font-bold">{sitter.rating}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-1 text-slate-500 text-sm mb-4">
                <MapPin className="w-4 h-4" />
                <span>{sitter.location}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {sitter.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-slate-50 text-slate-600 text-[11px] font-medium border border-slate-100">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedSitters;
