import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserCircle, Briefcase, Pencil, Eye, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import SellerAddListing from '../components/seller/SellerAddListing';

const Register: React.FC = () => {
  const [role, setRole] = useState<'owner' | 'sitter'>('sitter');
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isVerifiedClicked, setIsVerifiedClicked] = useState(false);
  const [verificationReport, setVerificationReport] = useState('');
  const [uploading, setUploading] = useState(false);
  const [policeVerification, setPoliceVerification] = useState('');
  const [uploadingPolice, setUploadingPolice] = useState(false);
  const [registrationStep, setRegistrationStep] = useState(1);
  const [listingPayload, setListingPayload] = useState<any>(null);
  const navigate = useNavigate();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';
      const response = await fetch(`${apiUrl}/upload/public`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'File upload failed');
      }

      setVerificationReport(data.fileUrl);
    } catch (err: any) {
      setError(err.message || 'Error uploading verification report');
    } finally {
      setUploading(false);
    }
  };

  const handlePoliceUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPolice(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';
      const response = await fetch(`${apiUrl}/upload/public`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'File upload failed');
      }

      setPoliceVerification(data.fileUrl);
    } catch (err: any) {
      setError(err.message || 'Error uploading police verification');
    } finally {
      setUploadingPolice(false);
    }
  };

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username || !email || !password || !firstName || !lastName) {
      setError('Please fill in all the fields.');
      return;
    }

    if (role === 'sitter') {
      setRegistrationStep(2);
    } else {
      setRegistrationStep(3);
    }
  };

  const handleContinueFromListing = (payload: any) => {
    setListingPayload(payload);
    setRegistrationStep(3);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (isVerifiedClicked && !verificationReport) {
      setError('Please upload the verification report before registering.');
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';
      
      // 1. Register User
      const response = await fetch(`${apiUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          firstName,
          lastName,
          role, // 'owner' or 'sitter'
          verificationReport,
          policeVerification,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Registration failed.');
      }

      // Store credentials and sign in automatically
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('isSuperUser');
      localStorage.removeItem('isSeller');
      localStorage.removeItem('isOwner');

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // 2. If sitter and listing payload exists, create listing
      if (data.user.role === 'sitter') {
        localStorage.setItem('isSeller', 'true');
        
        if (listingPayload) {
          setSuccess('Account created! Setting up your listing...');
          const listingResponse = await fetch(`${apiUrl}/listings`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${data.token}`
            },
            body: JSON.stringify(listingPayload)
          });
          
          if (!listingResponse.ok) {
            console.error('Failed to create listing automatically');
          }
        }
        
        setSuccess('Registration complete! Redirecting...');
        setTimeout(() => navigate('/seller-dashboard'), 1500);
      } else {
        localStorage.setItem('isOwner', 'true');
        setSuccess('Registration complete! Redirecting...');
        setTimeout(() => navigate('/dashboard'), 1500);
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong during registration.');
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

        {/* Registration Form Container */}
        {registrationStep === 1 ? (
          <div className="max-w-[540px] mx-auto">
          {/* Tabs */}
          <div className="flex gap-10 border-b border-slate-100 mb-10">
            <Link to="/login" className="pb-4 text-sm font-medium text-slate-400 hover:text-slate-600 transition-all">
              Log In
            </Link>
            <button className="pb-4 text-sm font-bold text-slate-900 border-b-2 border-slate-900 -mb-[2px] transition-all">
              Register
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-xs rounded-md">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-100 text-green-600 text-xs rounded-md">
              {success}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleNextStep1}>
            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <button
                type="button"
                onClick={() => setRole('owner')}
                className={cn(
                  "flex items-center justify-center gap-3 py-5 rounded-md transition-all duration-500 group",
                  role === 'owner'
                    ? "bg-[#0F172A] text-white shadow-xl shadow-slate-200"
                    : "bg-[#F4F6F8] text-slate-400 hover:bg-slate-200"
                )}
              >
                <UserCircle className={cn("w-5 h-5 transition-transform group-hover:scale-110", role === 'owner' ? "text-white" : "text-slate-400")} />
                <span className="text-sm font-medium tracking-tight">Pet owner</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('sitter')}
                className={cn(
                  "flex items-center justify-center gap-3 py-5 rounded-md transition-all duration-500 group",
                  role === 'sitter'
                    ? "bg-[#0F172A] text-white shadow-xl shadow-slate-200"
                    : "bg-[#F4F6F8] text-slate-400 hover:bg-slate-200"
                )}
              >
                <Briefcase className={cn("w-5 h-5 transition-transform group-hover:scale-110", role === 'sitter' ? "text-white" : "text-slate-400")} />
                <span className="text-sm font-medium tracking-tight">Sitter</span>
              </button>
            </div>

            {/* Input Fields */}
            <div className="space-y-4">
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-slate-900 transition-colors duration-300" />
                <input
                  type="text"
                  placeholder="charms001"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-white border border-slate-400 rounded-md outline-none focus:border-slate-900 transition-all duration-300 text-slate-800 placeholder:text-slate-300 text-sm"
                />
              </div>

              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-slate-900 transition-colors duration-300" />
                <input
                  type="email"
                  placeholder="Email Address"
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

              <div className="relative group">
                <Pencil className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-slate-900 transition-colors duration-300" />
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-white border border-slate-400 rounded-md outline-none focus:border-slate-900 transition-all duration-300 text-slate-800 placeholder:text-slate-300 text-sm"
                />
              </div>

              <div className="relative group">
                <Pencil className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-slate-900 transition-colors duration-300" />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-white border border-slate-400 rounded-md outline-none focus:border-slate-900 transition-all duration-300 text-slate-800 placeholder:text-slate-300 text-sm"
                />
              </div>
            </div>
 
            {/* Next Button */}
            <div className="pt-8 text-left">
              <button
                type="submit"
                className="bg-[#0F172A] text-white px-10 py-3.5 rounded-full font-bold text-xs hover:bg-slate-800 transition-all shadow-lg active:scale-[0.98] uppercase tracking-wider"
              >
                Next
              </button>
            </div>
          </form>
        </div>
        ) : registrationStep === 2 ? (
          <div className="w-full animate-in fade-in zoom-in duration-500">
            <SellerAddListing isRegistrationFlow={true} onContinueRegistration={handleContinueFromListing} />
          </div>
        ) : (
          <div className="max-w-[540px] mx-auto animate-in slide-in-from-right duration-500">
            {/* Tabs */}
            <div className="flex gap-10 border-b border-slate-100 mb-10">
              <button className="pb-4 text-sm font-bold text-slate-900 border-b-2 border-slate-900 -mb-[2px] transition-all">
                Final Step: Verification
              </button>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-xs rounded-md">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-100 text-green-600 text-xs rounded-md">
                {success}
              </div>
            )}

            <form onSubmit={handleFinalSubmit} className="space-y-5">
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4 mt-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Verification</h4>
                  <p className="text-[11px] text-slate-500 mt-1">Get verified on backgroundcheck.co.za to obtain your report.</p>
                </div>
                <a
                  href="https://www.backgroundcheck.co.za"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsVerifiedClicked(true)}
                  className="bg-[#5A7E49] text-white text-[11px] font-bold px-4 py-2 rounded-lg text-center hover:bg-[#4C7A34] transition-all shadow-sm shrink-0"
                >
                  Get Verified
                </a>
              </div>

              {/* Upload Field - Conditionally Rendered */}
              {isVerifiedClicked && (
                <div className="space-y-1.5 pt-3 border-t border-slate-200/60">
                  <label className="text-[11px] font-bold text-slate-600 flex items-center gap-1.5">
                    <span>Upload Verification Report</span>
                    <span className="text-red-500 font-bold">* (Required)</span>
                  </label>
                  <input
                    type="file"
                    required
                    onChange={handleFileUpload}
                    accept=".pdf,.png,.jpg,.jpeg"
                    className="w-full text-xs text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-semibold file:bg-[#EAF0E5] file:text-[#5A7E49] hover:file:bg-[#DDE8D6] cursor-pointer"
                  />
                  {uploading && <p className="text-[10px] text-slate-400">Uploading report...</p>}
                  {verificationReport && (
                    <p className="text-[10px] text-[#5A7E49] font-semibold flex items-center gap-1">
                      ✓ Report uploaded successfully
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Police Verification Section */}
            {role === 'sitter' && (
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4 mt-6">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Police Clearance</h4>
                    <p className="text-[11px] text-slate-500 mt-1">Upload your police clearance certificate.</p>
                  </div>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-slate-200/60">
                  <label className="text-[11px] font-bold text-slate-600 flex items-center gap-1.5">
                    <span>Upload Police Verification</span>
                    <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="file"
                    onChange={handlePoliceUpload}
                    accept=".pdf,.png,.jpg,.jpeg"
                    className="w-full text-xs text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-semibold file:bg-slate-200 file:text-slate-700 hover:file:bg-slate-300 cursor-pointer"
                  />
                  {uploadingPolice && <p className="text-[10px] text-slate-400">Uploading file...</p>}
                  {policeVerification && (
                    <p className="text-[10px] text-slate-600 font-semibold flex items-center gap-1">
                      ✓ Police verification uploaded successfully
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Privacy Policy Checkbox */}
            <div className="flex items-center gap-3 pt-4">
              <input
                type="checkbox"
                id="privacy"
                required
                className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer accent-slate-900"
              />
              <label htmlFor="privacy" className="text-xs text-slate-400 cursor-pointer hover:text-slate-600 transition-colors">
                I agree to the <Link to="/privacy" className="text-slate-700 font-medium hover:underline">Privacy Policy</Link>
              </label>
            </div>

            {/* Register Button */}
            <div className="pt-8 flex gap-4">
              <button
                type="button"
                onClick={() => setRegistrationStep(role === 'sitter' ? 2 : 1)}
                className="bg-white border border-slate-200 text-slate-600 px-8 py-3.5 rounded-full font-bold text-xs hover:bg-slate-50 transition-all shadow-sm active:scale-[0.98] uppercase tracking-wider"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-[#0F172A] text-white px-10 py-3.5 rounded-full font-bold text-xs hover:bg-slate-800 transition-all shadow-lg active:scale-[0.98] uppercase tracking-wider"
              >
                Register
              </button>
            </div>
          </form>
        </div>
        )}
      </div>
    </div>
  );
};

export default Register;


