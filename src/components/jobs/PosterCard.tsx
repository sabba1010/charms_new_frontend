import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Mail } from 'lucide-react';

interface PosterCardProps {
  id: string;
  name: string;
  avatar: string;
  email: string;
}
const PosterCard: React.FC<PosterCardProps> = ({ id, name, avatar, email }) => {
  const isLoggedIn = localStorage.getItem('isAdmin') === 'true' || 
                     localStorage.getItem('isSuperUser') === 'true' || 
                     localStorage.getItem('isSeller') === 'true';
  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8 mb-8">
      <div className="flex items-center gap-5 mb-6">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border-2 border-slate-50 shadow-sm shrink-0 relative">
          {avatar ? (
            <img 
              src={avatar} 
              alt={name} 
              className={`w-full h-full object-cover transition-all duration-500 ${!isLoggedIn ? 'blur-md scale-110' : ''}`} 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-300">
              <span className="text-xl font-bold">{name.charAt(0)}</span>
            </div>
          )}
          {!isLoggedIn && (
             <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
                <div className="w-2 h-2 bg-white/20 rounded-full animate-pulse" />
             </div>
          )}
        </div>
        <div>
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest block mb-1">Added by</span>
          <h4 className="text-lg font-bold text-[#1a2e35] mb-0.5">{name}</h4>
          <Link 
            to={`/user-profile/${id}`} 
            className="text-[#c28876] text-xs font-bold hover:underline flex items-center gap-1 transition-all"
          >
            View Profile <ChevronRight size={10} />
          </Link>
        </div>
      </div>
      
      <div className="flex items-center gap-3 text-slate-500 text-sm bg-[#F9F6F1] p-3 rounded-xl border border-slate-100/50">
        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#c28876]/70 shrink-0 shadow-sm">
          <Mail size={14} />
        </div>
        <span className="truncate font-medium">{email}</span>
      </div>
    </div>
  );
};

export default PosterCard;
