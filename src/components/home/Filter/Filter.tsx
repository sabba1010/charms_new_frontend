import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dog, Home, Shield, Cat, Bird, Trees as Tree } from 'lucide-react';
import { cn } from '../../../lib/utils';

const categories = [
  { id: 'pet', name: 'Pet Sitting', icon: Dog, color: 'bg-orange-500' },
  { id: 'house', name: 'House Sitting', icon: Home, color: 'bg-blue-500' },
  { id: 'security', name: 'Security Sitting', icon: Shield, color: 'bg-red-500' },
  { id: 'cat', name: 'Cat Sitting', icon: Cat, color: 'bg-purple-500' },
  { id: 'garden', name: 'Garden Care', icon: Tree, color: 'bg-green-500' },
  { id: 'small-pets', name: 'Small Pets', icon: Bird, color: 'bg-cyan-500' },
];

const Filter = () => {
  const [activeTab, setActiveTab] = useState('pet');

  return (
    <section className="bg-slate-50 py-12 border-b border-slate-200">
      <div className="section-padding py-0">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(cat.id)}
              className={cn(
                "group flex flex-col items-center gap-3 p-4 min-w-[120px] rounded-2xl transition-all duration-300",
                activeTab === cat.id 
                  ? "bg-white shadow-xl shadow-slate-200/50 scale-110" 
                  : "hover:bg-white/50"
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center text-white transition-transform group-hover:scale-110",
                cat.color,
                activeTab === cat.id ? "shadow-lg" : "opacity-80"
              )}>
                <cat.icon className="w-6 h-6" />
              </div>
              <span className={cn(
                "text-sm font-semibold transition-colors",
                activeTab === cat.id ? "text-slate-900" : "text-slate-500 group-hover:text-slate-700"
              )}>
                {cat.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Filter;
