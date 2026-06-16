import { Link } from 'react-router-dom';
import logo from '../../assets/logo/300-logo-mkv copy.svg';

const Footer = () => {
  return (
    <footer className="bg-[#122023] text-slate-300 py-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20">
        {/* Brand Column */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Home Paw" className="h-14 md:h-16 w-auto object-contain" />
          </Link>
          <p className="text-sm leading-relaxed max-w-xs text-slate-400">
            Trusted pet and home care across South Africa. Verified sitters, real reviews, peace of mind.
          </p>
        </div>

        {/* Services Column */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6 font-serif">Services</h3>
          <ul className="space-y-4 text-sm">
            <li><Link to="#" className="hover:text-white transition-colors">Pet sitting</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors">House sitting</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors">Dog walking</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors">Security checks</Link></li>
          </ul>
        </div>

        {/* Company Column */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6 font-serif">Company</h3>
          <ul className="space-y-4 text-sm">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/how-it-works" className="hover:text-white transition-colors">How it works</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/become-sitter" className="hover:text-white transition-colors">Become a sitter</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Trust & Safety Column */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6 font-serif">Trust & Safety</h3>
          <ul className="space-y-4 text-sm">
            <li><Link to="#" className="hover:text-white transition-colors">ID verified members</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors">Police clearance</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} Home Paw. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
