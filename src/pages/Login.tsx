import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, User, Eye, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide username/email and password.');
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Invalid email or password. Please try again.');
      }

      // Clear previous authentication tokens/states
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('isSuperUser');
      localStorage.removeItem('isSeller');
      localStorage.removeItem('isOwner');

      // Store new auth session details
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Handle Role-based Navigation
      if (data.user.role === 'superuser') {
        localStorage.setItem('isSuperUser', 'true');
        navigate('/superuser-dashboard');
      } else if (data.user.role === 'admin') {
        localStorage.setItem('isAdmin', 'true');
        navigate('/admin');
      } else if (data.user.role === 'sitter') {
        localStorage.setItem('isSeller', 'true');
        navigate('/seller-dashboard');
      } else {
        localStorage.setItem('isOwner', 'true');
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Invalid email/username or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-40 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header & Breadcrumb */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-slate-100">
          <h1 className="text-[2.5rem] font-light text-slate-900 leading-none">My Profile</h1>
          <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-4 md:mt-0 uppercase tracking-[0.2em]">
            <Link to="/" className="hover:text-slate-600 transition-colors">Home Paw</Link>
            <ChevronRight className="w-3 h-3 opacity-50" />
            <span className="text-slate-400 font-medium">My Profile</span>
          </div>
        </div>

        {/* Login Form Container */}
        <div className="max-w-[540px] mx-auto">
          {/* Tabs */}
          <div className="flex gap-10 border-b border-slate-100 mb-10">
            <button className="pb-4 text-sm font-bold text-slate-900 border-b-2 border-slate-900 -mb-[2px] transition-all">
              Log In
            </button>
            <Link to="/register" className="pb-4 text-sm font-medium text-slate-400 hover:text-slate-600 transition-all">
              Register
            </Link>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-xs rounded-md">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Input Fields */}
            <div className="space-y-4">
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-slate-900 transition-colors duration-300" />
                <input
                  type="text"
                  placeholder="charms001"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-white border border-slate-400 rounded-md outline-none focus:border-slate-900 transition-all duration-300 text-slate-800 placeholder:text-slate-300 text-sm"
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-slate-900 transition-colors duration-300" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="•••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-white border border-slate-400 rounded-md outline-none focus:border-slate-900 transition-all duration-300 text-slate-800 placeholder:text-slate-300 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-900 transition-colors duration-300"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="pt-2">
              <button type="button" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">
                Lost Your Password?
              </button>
            </div>

            {/* Login Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="bg-[#0F172A] text-white px-12 py-3.5 rounded-full font-bold text-xs hover:bg-slate-800 transition-all shadow-lg active:scale-[0.98] uppercase tracking-wider"
              >
                Login
              </button>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center gap-3 pt-4">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer accent-slate-900"
              />
              <label htmlFor="remember" className="text-xs text-slate-400 cursor-pointer hover:text-slate-600 transition-colors">
                Remember Me
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

