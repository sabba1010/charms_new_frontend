import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User, Globe, FileText, Heart, Mail, Power, Star, Bell, LayoutDashboard, LayoutList, BarChart3, Layers, ShieldAlert, PlusCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import logo from '../../assets/300-logo-white.gif';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperUser, setIsSuperUser] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    // Check auth state on mount and when location changes
    const adminState = localStorage.getItem('isAdmin') === 'true';
    const superState = localStorage.getItem('isSuperUser') === 'true';
    const sellerState = localStorage.getItem('isSeller') === 'true';
    const ownerState = localStorage.getItem('isOwner') === 'true';
    const hasToken = !!localStorage.getItem('token');
    const userLoggedIn = adminState || superState || sellerState || ownerState || hasToken;
    setIsLoggedIn(userLoggedIn);
    setIsAdmin(adminState);
    setIsSuperUser(superState);
    setIsSeller(sellerState);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  const userStr = localStorage.getItem('user');
  let userId = '1';
  if (userStr) {
    try {
      const u = JSON.parse(userStr);
      userId = u.id || u._id || '1';
    } catch (e) { }
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Listings', path: '/listings', hasDropdown: true, icon: <Layers className="w-4 h-4" /> },
    { name: 'Jobs Offered', path: '/jobs-offered' },
    { name: 'Find a Sitter', path: '/find-sitter' },
    { name: 'Become a sitter', path: '/become-sitter' },
    { name: 'How it works', path: '/how-it-works' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4',
        isHomePage
          ? (isScrolled ? 'bg-[#122023]/95 backdrop-blur-sm py-3 shadow-xl' : 'bg-transparent')
          : 'bg-[#122023] py-4 shadow-xl'
      )}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-10">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Home Paw" className="h-10 md:h-11 w-auto object-contain" />
            {/* <span className="text-white font-serif text-[20px] font-bold hidden sm:block">Home Paw</span> */}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <div key={link.name} className="relative group/nav">
                  <Link
                    to={link.path}
                    className={cn(
                      'text-[14px] font-medium transition-all duration-300 px-4 py-2 rounded-full flex items-center gap-2',
                      isActive
                        ? 'bg-[#1a282b] text-white shadow-lg'
                        : 'text-slate-100 hover:text-white'
                    )}
                  >
                    {link.icon && <span className="opacity-70">{link.icon}</span>}
                    <span>{link.name}</span>
                    {link.hasDropdown && <ChevronDown className="w-3 h-3 opacity-60 group-hover/nav:translate-y-0.5 transition-transform" />}
                  </Link>

                  {/* Dropdown Menu for Listings */}
                  {link.hasDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 py-3 z-50 border border-slate-100 translate-y-2 group-hover/nav:translate-y-0">
                      <div className="flex flex-col px-2">
                        <Link
                          to="/listings"
                          className="flex items-center gap-3 px-4 py-3 text-[14px] text-slate-600 hover:text-[#111c1e] hover:bg-slate-50 rounded-lg transition-all font-medium"
                        >
                          Full Width + Map
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-6">
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              {/* Account Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-2.5 text-white">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden">
                      <User className="w-6 h-6 text-white/80" />
                    </div>
                    {/* Green Online Dot */}
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#4ade80] border-2 border-[#122023] rounded-full" />
                  </div>
                  <div className="hidden md:flex items-center gap-1.5 font-medium text-[14px]">
                    <span>My Account</span>
                    <ChevronDown className="w-4 h-4 opacity-70 group-hover:translate-y-0.5 transition-transform" />
                  </div>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-3 z-50 border border-slate-100">
                  <div className="flex flex-col gap-0.5 px-2">
                    {(isSuperUser ? [
                      { name: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" />, path: '/dashboard' },
                      { name: 'Notifications', icon: <Bell className="w-4 h-4" />, path: '/dashboard?tab=notifications' },
                      { name: 'Messages', icon: <Mail className="w-4 h-4" />, path: '/dashboard?tab=messages' },
                      { name: 'Reviews', icon: <Star className="w-4 h-4" />, path: '/dashboard?tab=reviews' },
                      { name: 'My Profile', icon: <User className="w-4 h-4" />, path: `/user-profile/${userId}` },
                    ] : isAdmin ? [
                      { name: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" />, path: '/admin?tab=dashboard' },
                      { name: 'All Listings', icon: <LayoutList className="w-4 h-4" />, path: '/admin?tab=my-listings' },
                      { name: 'Reviews', icon: <Star className="w-4 h-4" />, path: '/admin?tab=reviews' },
                      { name: 'All Users', icon: <User className="w-4 h-4" />, path: '/admin?tab=all-users' },
                      { name: 'Statistics', icon: <BarChart3 className="w-4 h-4" />, path: '/admin?tab=statistics' },
                      { name: 'My Profile', icon: <User className="w-4 h-4" />, path: `/sitter-profile/${userId}` },
                    ] : isSeller ? [
                      { name: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" />, path: '/seller-dashboard?tab=dashboard' },
                      { name: 'My Listings', icon: <LayoutList className="w-4 h-4" />, path: '/seller-dashboard?tab=listings-active' },
                      { name: 'Bookings', icon: <FileText className="w-4 h-4" />, path: '/seller-dashboard?tab=my-bookings', badge: 0 },
                      { name: 'Messages', icon: <Mail className="w-4 h-4" />, path: '/seller-dashboard?tab=messages' },
                      { name: 'Reviews', icon: <Star className="w-4 h-4" />, path: '/seller-dashboard?tab=reviews' },
                      { name: 'My Profile', icon: <User className="w-4 h-4" />, path: `/sitter-profile/${userId}` },
                    ] : [
                      { name: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" />, path: '/dashboard' },
                      { name: 'Notifications', icon: <Bell className="w-4 h-4" />, path: '/dashboard?tab=notifications' },
                      { name: 'Messages', icon: <Mail className="w-4 h-4" />, path: '/dashboard?tab=messages' },
                      { name: 'Reviews', icon: <Star className="w-4 h-4" />, path: '/dashboard?tab=reviews' },
                      { name: 'My Profile', icon: <User className="w-4 h-4" />, path: `/user-profile/${userId}` },
                    ]).map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="flex items-center justify-between px-4 py-2.5 text-[14px] font-medium text-slate-600 hover:text-[#111c1e] hover:bg-slate-50 rounded-lg transition-all group/item"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-slate-400 group-hover/item:text-slate-600 transition-colors">{item.icon}</span>
                          <span className="font-medium">{item.name}</span>
                        </div>
                        {item.badge !== undefined && (
                          <span className="w-5 h-5 flex items-center justify-center rounded-full bg-[#5cb85c] text-white text-[10px] font-bold">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    ))}

                    <hr className="my-2 border-slate-50 mx-4" />

                    <button
                      onClick={() => {
                        localStorage.removeItem('isAdmin');
                        localStorage.removeItem('isSuperUser');
                        localStorage.removeItem('isSeller');
                        localStorage.removeItem('isOwner');
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        localStorage.setItem('showLogoutLoader', 'true');
                        window.location.href = '/';
                      }}
                      className="flex items-center gap-4 px-4 py-2.5 text-[14px] font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all w-full text-left"
                    >
                      <span className="text-slate-400"><Power className="w-4 h-4" /></span>
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Add Listing Button */}
              {isSeller && (
                <Link
                  to="/seller-dashboard?tab=add-listing"
                  className="hidden md:flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-full text-[14px] font-medium transition-all border border-white/20 shadow-lg active:scale-95"
                >
                  <span>Add Listing</span>
                  <PlusCircle className="w-4 h-4" />
                </Link>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 bg-[#131b25] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-opacity-90 transition-all shadow-lg active:scale-95"
            >
              <span>Sign Up or Register</span>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#122023] mt-4 rounded-2xl overflow-hidden border border-white/10"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    'text-lg font-medium px-4 py-2 rounded-xl flex items-center gap-3',
                    location.pathname === link.path ? 'bg-white/10 text-white' : 'text-slate-300'
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.icon && link.icon}
                  {link.name}
                </Link>
              ))}
              <hr className="border-white/10 my-2" />
              {isLoggedIn ? (
                <>
                  <Link to="/account" className="text-white font-medium px-4 py-2" onClick={() => setIsOpen(false)}>My Account</Link>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 bg-[#131b25] text-white px-6 py-4 rounded-xl font-bold"
                  onClick={() => setIsOpen(false)}
                >
                  <span>Sign Up or Register</span>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
