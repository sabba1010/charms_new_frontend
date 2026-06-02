import React, { useState } from 'react';
import Swal from 'sweetalert2';
import {
  MapPin, Check, ArrowRightCircle, Upload,
  HelpCircle, Image as ImageIcon, MessageCircle,
  Music, Eye, Info, Film, Loader2, Trash2, CheckCircle
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const blackMarkerIcon = new L.DivIcon({
  className: 'custom-div-icon-black',
  html: `<div style="background-color:#111c1e;width:24px;height:24px;border-radius:50%;border:2px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.3);"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const MapRecenter = ({ lat, lng }: { lat: number; lng: number }) => {
  const map = useMap();
  React.useEffect(() => {
    map.setView([lat, lng], map.getZoom());
  }, [lat, lng, map]);
  return null;
};

const MapEventsHandler = ({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) => {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

const listingTypes = [
  { id: 'service', label: 'Service' },
  // { id: 'rental',  label: 'Rental' },
  // { id: 'event',   label: 'Event' },
];

const packages = [
  {
    id: 'monthly',
    name: 'Monthly',
    description: 'Monthly subscription for unlimited listings and availability',
    price: '$10.00',
    features: ['Unlimited number of listings', 'Unlimited availability of listings', 'Edit packages in WP Admin → Products']
  },
  {
    id: 'yearly',
    name: 'Yearly',
    description: 'Yearly subscription for unlimited listings and availability',
    price: '$100.00',
    badge: 'Best Value',
    features: ['Unlimited number of listings', 'Unlimited availability of listings', 'Edit packages in WP Admin → Products']
  },
];

const FacebookIcon = ({ size, className }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = ({ size, className }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const YoutubeIcon = ({ size, className }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.14 1 12 1 12s0 3.86.42 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.86 23 12 23 12s0-3.86-.42-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);

const InstagramIcon = ({ size, className }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// Form Section Component
const FormSection = ({ title, icon: Icon, children, toggle = false, isToggled = false, onToggle }: any) => (
  <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden mb-8">
    <div className="px-8 py-5 border-b border-slate-50 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Icon size={18} className="text-slate-400" />
        <h3 className="text-[15px] font-bold text-slate-800">{title}</h3>
      </div>
      {toggle && (
        <div
          onClick={onToggle}
          className={`w-10 h-5 rounded-full relative cursor-pointer transition-all duration-300 ${isToggled ? 'bg-[#111c1e]' : 'bg-slate-200'
            }`}
        >
          <div
            className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 ${isToggled ? 'left-[22px]' : 'left-0.5'
              }`}
          />
        </div>
      )}
    </div>
    <div className={`p-8 transition-all duration-300 ${toggle && !isToggled ? 'opacity-40 pointer-events-none' : ''}`}>
      {children}
    </div>
  </div>
);

interface InputFieldProps {
  label: string;
  placeholder?: string;
  name: string;
  type?: string;
  help?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const InputField = ({ label, placeholder, name, type = "text", help = false, value, onChange }: InputFieldProps) => (
  <div className="space-y-2">
    <div className="flex items-center gap-1.5">
      <label className="text-[12px] font-bold text-slate-700">{label}</label>
      {help && <HelpCircle size={12} className="text-slate-300" />}
    </div>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-[13px] text-slate-600 focus:outline-none focus:border-slate-400 transition-all"
    />
  </div>
);

interface SellerAddListingProps {
  isRegistrationFlow?: boolean;
  onContinueRegistration?: (payload: any) => void;
}

const SellerAddListing: React.FC<SellerAddListingProps> = ({ isRegistrationFlow = false, onContinueRegistration }) => {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<string>('basic');

  // Form fields state
  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    keywords: '',
    address: '',
    friendlyAddress: '',
    region: 'Choose Region',
    googlePlaceId: '',
    longitude: '',
    latitude: '',
    description: '',
    phone: '',
    website: '',
    email: '',
    minPrice: '',
    maxPrice: '',
    facebook: '',
    twitter: '',
    youtube: '',
    instagram: '',
    whatsapp: '',
    tiktok: '',
  });

  const [category, setCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [imageUploadStatus, setImageUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [videoUploadedUrl, setVideoUploadedUrl] = useState('');

  const [logoUrl, setLogoUrl] = useState('');
  const [logoUploadStatus, setLogoUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');

  // Toggles for different form sections
  const [enablePricing, setEnablePricing] = useState(false);
  const [enableOpeningHours, setEnableOpeningHours] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Video upload / link state
  const [videoSource, setVideoSource] = useState<'url' | 'file'>('url');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string>('');
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);

  // Contact Widget Toggle state
  const [enableContactWidget, setEnableContactWidget] = useState(false);

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processVideoFile(file);
    }
  };

  const processVideoFile = async (file: File) => {
    if (!file.type.startsWith('video/')) {
      Swal.fire({
        title: 'Error!',
        text: 'Please select a valid video file.',
        icon: 'error',
        confirmButtonColor: '#111c1e'
      });
      return;
    }

    setVideoFile(file);
    setUploadStatus('uploading');
    setUploadProgress(10);

    try {
      const token = localStorage.getItem('token');
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);

      const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';
      setUploadProgress(30);

      const uploadUrl = token ? `${apiUrl}/upload` : `${apiUrl}/upload/public`;
      const headers: any = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(uploadUrl, {
        method: 'POST',
        headers,
        body: formDataUpload
      });

      setUploadProgress(70);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Video upload failed');
      }

      setUploadProgress(100);
      setUploadStatus('success');
      setVideoUploadedUrl(data.fileUrl);
      setVideoPreviewUrl(data.fileUrl);
    } catch (err: any) {
      console.error(err);
      setUploadStatus('error');
      Swal.fire({
        title: 'Error!',
        text: err.message || 'Failed to upload video',
        icon: 'error',
        confirmButtonColor: '#111c1e'
      });
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      uploadImageFiles(Array.from(files));
    }
  };

  const uploadImageFiles = async (files: File[]) => {
    setImageUploadStatus('uploading');
    try {
      const token = localStorage.getItem('token');
      const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';

      const newUrls: string[] = [];

      for (const file of files) {
        if (!file.type.startsWith('image/')) {
          Swal.fire({
            title: 'Skipped File',
            text: `Skipping ${file.name}: Only images are allowed.`,
            icon: 'info',
            confirmButtonColor: '#111c1e'
          });
          continue;
        }

        const formDataUpload = new FormData();
        formDataUpload.append('file', file);

        const uploadUrl = token ? `${apiUrl}/upload` : `${apiUrl}/upload/public`;
        const headers: any = {};
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(uploadUrl, {
          method: 'POST',
          headers,
          body: formDataUpload
        });

        const data = await response.json();
        if (response.ok && data.fileUrl) {
          newUrls.push(data.fileUrl);
        } else {
          throw new Error(data.message || `Failed to upload image: ${file.name}`);
        }
      }

      setUploadedImages(prev => [...prev, ...newUrls]);
      setImageUploadStatus('success');
    } catch (err: any) {
      console.error(err);
      setImageUploadStatus('error');
      Swal.fire({
        title: 'Error!',
        text: err.message || 'Image upload failed',
        icon: 'error',
        confirmButtonColor: '#111c1e'
      });
    }
  };

  const handleLogoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      Swal.fire({
        title: 'Error!',
        text: 'Only images are allowed for the logo/icon.',
        icon: 'error',
        confirmButtonColor: '#111c1e'
      });
      return;
    }

    setLogoUploadStatus('uploading');
    try {
      const token = localStorage.getItem('token');
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);

      const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';
      const uploadUrl = token ? `${apiUrl}/upload` : `${apiUrl}/upload/public`;
      const headers: any = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(uploadUrl, {
        method: 'POST',
        headers,
        body: formDataUpload
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Logo upload failed');
      }

      setLogoUrl(data.fileUrl);
      setLogoUploadStatus('success');
    } catch (err: any) {
      console.error(err);
      setLogoUploadStatus('error');
      Swal.fire({
        title: 'Error!',
        text: err.message || 'Logo upload failed',
        icon: 'error',
        confirmButtonColor: '#111c1e'
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processVideoFile(file);
    }
  };

  const handleRemoveVideo = () => {
    setVideoFile(null);
    setUploadStatus('idle');
    setUploadProgress(0);
    if (videoPreviewUrl) {
      URL.revokeObjectURL(videoPreviewUrl);
      setVideoPreviewUrl('');
    }
  };

  // Pricing & Bookable Services state
  const [pricingServices, setPricingServices] = useState([
    { service: "Basic Care", price: "$20.00", desc: "Standard dog walking or drop-in visit" },
    { service: "Premium Boarding", price: "$50.00", desc: "Full boarding with overnight stay and play" }
  ]);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');
  const [newServiceDesc, setNewServiceDesc] = useState('');

  const handlePublish = async () => {
    if (!formData.title) {
      Swal.fire({
        title: 'Warning!',
        text: 'Listing Title is required!',
        icon: 'warning',
        confirmButtonColor: '#111c1e'
      });
      return;
    }
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const token = localStorage.getItem('token');
      if (!isRegistrationFlow && !token) {
        throw new Error('Please login to create a listing');
      }

      const payload = {
        title: formData.title,
        tagline: formData.tagline,
        logo: logoUrl,
        category: category,
        keywords: formData.keywords,
        type: selectedType || 'service',
        package: selectedPackage || 'monthly',
        address: formData.address,
        friendlyAddress: formData.friendlyAddress,
        region: formData.region,
        googlePlaceId: formData.googlePlaceId,
        longitude: (formData.longitude && !isNaN(Number(formData.longitude))) ? Number(formData.longitude) : undefined,
        latitude: (formData.latitude && !isNaN(Number(formData.latitude))) ? Number(formData.latitude) : undefined,
        description: formData.description,
        images: uploadedImages,
        videoSource: videoSource,
        videoUrl: videoUrl,
        videoFile: videoUploadedUrl,
        phone: formData.phone,
        website: formData.website,
        email: formData.email,
        enableContactWidget: enableContactWidget,
        socialLinks: enableContactWidget ? {
          facebook: formData.facebook,
          twitter: formData.twitter,
          youtube: formData.youtube,
          instagram: formData.instagram,
          whatsapp: formData.whatsapp,
          tiktok: formData.tiktok,
        } : {},
        minPrice: (formData.minPrice && !isNaN(Number(formData.minPrice))) ? Number(formData.minPrice) : undefined,
        maxPrice: (formData.maxPrice && !isNaN(Number(formData.maxPrice))) ? Number(formData.maxPrice) : undefined,
        enableBooking: false,
        enablePricing: enablePricing,
        enableOpeningHours: enableOpeningHours,
        services: pricingServices,
        openingHours: enableOpeningHours ? openingHours : [],
      };

      if (isRegistrationFlow && onContinueRegistration) {
        onContinueRegistration(payload);
        setIsSubmitting(false);
        return;
      }

      const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';
      const response = await fetch(`${apiUrl}/listings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit listing');
      }

      Swal.fire({
        title: 'Success!',
        text: 'Listing published successfully!',
        icon: 'success',
        confirmButtonColor: '#111c1e'
      }).then(() => {
        window.location.href = '/seller-dashboard';
      });
    } catch (err: any) {
      console.error(err);
      setSubmitError(err.message || 'Submission error');
      Swal.fire({
        title: 'Submission Error',
        text: err.message || 'Submission error',
        icon: 'error',
        confirmButtonColor: '#111c1e'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Weekly Opening Hours state
  const [openingHours, setOpeningHours] = useState([
    { day: 'Monday', isOpen: true, openTime: '09:00 AM', closeTime: '07:00 PM' },
    { day: 'Tuesday', isOpen: true, openTime: '09:00 AM', closeTime: '07:00 PM' },
    { day: 'Wednesday', isOpen: true, openTime: '09:00 AM', closeTime: '07:00 PM' },
    { day: 'Thursday', isOpen: true, openTime: '09:00 AM', closeTime: '07:00 PM' },
    { day: 'Friday', isOpen: true, openTime: '09:00 AM', closeTime: '07:00 PM' },
    { day: 'Saturday', isOpen: true, openTime: '10:00 AM', closeTime: '09:00 PM' },
    { day: 'Sunday', isOpen: true, openTime: '10:00 AM', closeTime: '09:00 PM' }
  ]);

  // FormSection and InputField are now defined at the module scope level to prevent recreation/losing input focus on render.

  if (step === 1) {
    return (
      <div className="space-y-10">
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-8 py-5 border-b border-slate-50">
            <h2 className="text-[15px] font-bold text-slate-800">Choose Listing Type</h2>
          </div>
          <div className="p-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {listingTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => { setSelectedType(type.id); setStep(2); }}
                className="flex flex-col items-center justify-center gap-5 py-12 px-6 rounded-xl border-2 border-transparent bg-slate-50 hover:bg-slate-100 hover:border-slate-200 transition-all duration-200 group"
              >
                <div className="w-14 h-14 rounded-full bg-[#111c1e] flex items-center justify-center">
                  <MapPin size={22} className="text-white" />
                </div>
                <span className="text-[14px] font-semibold text-slate-600 group-hover:text-[#111c1e]">{type.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="space-y-8 pb-12">
        <h2 className="text-[16px] font-bold text-slate-800 ml-1">Buy New Package</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => {
            const isSelected = selectedPackage === pkg.id;
            return (
              <div key={pkg.id} className={`bg-white rounded-xl border p-8 flex flex-col relative transition-all duration-300 ${isSelected ? 'border-slate-200 shadow-sm' : 'border-slate-100'}`}>
                {pkg.badge && <span className="absolute top-6 right-6 bg-slate-100 text-slate-600 text-[10px] font-bold px-3 py-1 rounded-full border border-slate-200">{pkg.badge}</span>}
                <div className="mb-6"><h3 className="text-[18px] font-bold text-slate-900 mb-6">{pkg.name}</h3><p className="text-[13px] text-slate-400 leading-relaxed min-h-[40px]">{pkg.description}</p></div>
                <div className="bg-slate-50 rounded-lg py-6 flex items-center justify-center mb-8"><span className="text-[26px] font-bold text-slate-800">{pkg.price}</span></div>
                <div className="flex-1 mb-10"><p className="text-[12px] font-bold text-slate-900 mb-4">{pkg.name} features:</p><ul className="space-y-3">{pkg.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3"><div className="bg-slate-100 rounded-full p-0.5 mt-0.5"><Check size={10} className="text-slate-600" /></div><span className="text-[12px] text-slate-400">{feat}</span></li>
                ))}</ul></div>
                <button onClick={() => setSelectedPackage(pkg.id)} className={`w-full py-3.5 rounded-full text-[13px] font-bold transition-all ${isSelected ? 'bg-[#111c1e] text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>{isSelected ? <span className="flex items-center justify-center gap-2"><Check size={14} /> Selected</span> : 'Select This Package'}</button>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center pt-6"><button onClick={() => setStep(3)} className="bg-[#111c1e] text-white px-8 py-3 rounded-full text-[13px] font-bold flex items-center gap-3 hover:bg-[#1a2e35] transition-all group shadow-lg">{isRegistrationFlow ? 'Next Step' : 'Submit Listing'} <ArrowRightCircle size={18} className="group-hover:translate-x-1 transition-transform" /></button></div>
      </div>
    );
  }

  const parsedLat = Number(formData.latitude);
  const parsedLng = Number(formData.longitude);
  const safeLat = (!isNaN(parsedLat) && isFinite(parsedLat)) ? parsedLat : 51.505;
  const safeLng = (!isNaN(parsedLng) && isFinite(parsedLng)) ? parsedLng : -0.09;

  return (
    <div className="pb-20">
      {/* 1. Basic Information */}
      <FormSection title="Basic Information" icon={Check}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Listing Title" placeholder="Your listing title" name="title" help={true} value={formData.title} onChange={handleInputChange} />
          <div className="space-y-2">
            <label className="text-[12px] font-bold text-slate-700 flex items-center gap-1.5">Listing Logo/icon <HelpCircle size={12} className="text-slate-300" /></label>
            <div className="border-2 border-dashed border-slate-200 rounded-lg p-2.5 flex items-center justify-between bg-slate-50">
              {logoUrl ? (
                <div className="flex items-center gap-2">
                  <img src={logoUrl} alt="Logo" className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                  <span className="text-[12px] text-[#5cb85c] font-semibold">Uploaded successfully</span>
                </div>
              ) : logoUploadStatus === 'uploading' ? (
                <span className="text-[12px] text-slate-500 animate-pulse">Uploading...</span>
              ) : (
                <span className="text-[12px] text-slate-400 italic">No file chosen</span>
              )}
              <button
                type="button"
                onClick={() => document.getElementById('logo-upload-input')?.click()}
                className="bg-white hover:bg-slate-50 border border-slate-200 px-4 py-1 rounded text-[11px] font-bold text-slate-600 shadow-sm cursor-pointer"
              >
                SELECT FILES
              </button>
              <input
                id="logo-upload-input"
                type="file"
                accept="image/*"
                onChange={handleLogoFileChange}
                className="hidden"
              />
            </div>
            <p className="text-[10px] text-slate-400">Maximum files size: 2 MB</p>
          </div>
          <div className="space-y-2">
            <label className="text-[12px] font-bold text-slate-700">Service Category</label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full appearance-none bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-[13px] text-slate-600 outline-none"
              >
                <option value="">Choose Service Category</option>
                <option value="pet-sitting">Pet Sitting</option>
                <option value="dog-walking">Dog Walking</option>
                <option value="pet-boarding">Pet Boarding</option>
                <option value="pet-day-care">Pet Day Care</option>
                <option value="holiday-home-sitting">Holiday Home Sitting</option>
                <option value="security-checks">Security Checks</option>
                <option value="drop-in-visits">Drop-In Visits</option>
                <option value="pet-taxi">Pet Taxi</option>
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
          <InputField label="Keywords" placeholder="Keywords" name="keywords" help={true} value={formData.keywords} onChange={handleInputChange} />
        </div>
        <div className="mt-6 bg-yellow-50 border border-yellow-100 rounded-lg p-4 flex items-center gap-3">
          <Info size={16} className="text-yellow-600" />
          <p className="text-[12px] text-yellow-700">Please choose category to display available features</p>
        </div>
      </FormSection>

      {/* 2. Location */}
      <FormSection title="Location" icon={MapPin}>
        <div className="h-64 rounded-xl overflow-hidden border border-slate-100 mb-6 relative group">
          <MapContainer
            center={[safeLat, safeLng]}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker
              position={[safeLat, safeLng]}
              icon={blackMarkerIcon}
              draggable={true}
              eventHandlers={{
                dragend: (e: any) => {
                  const marker = e.target;
                  if (marker != null) {
                    const position = marker.getLatLng();
                    setFormData(prev => ({
                      ...prev,
                      latitude: position.lat.toFixed(6),
                      longitude: position.lng.toFixed(6)
                    }));
                  }
                }
              }}
            />
            <MapRecenter
              lat={safeLat}
              lng={safeLng}
            />
            <MapEventsHandler
              onMapClick={(lat, lng) => {
                setFormData(prev => ({
                  ...prev,
                  latitude: lat.toFixed(6),
                  longitude: lng.toFixed(6)
                }));
              }}
            />
          </MapContainer>
          <div className="absolute top-2 right-2 z-[1000] bg-[#111c1e] text-white px-3 py-1 rounded text-[10px] font-bold shadow pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
            🖱️ Click or Drag Marker to Select Location
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Address" placeholder="Address" name="address" value={formData.address} onChange={handleInputChange} />
          <InputField label="Friendly Address" placeholder="Friendly Address" name="friendlyAddress" help={true} value={formData.friendlyAddress} onChange={handleInputChange} />
          <div className="space-y-2">
            <label className="text-[12px] font-bold text-slate-700">Region</label>
            <div className="relative">
              <select
                name="region"
                value={formData.region}
                onChange={handleInputChange}
                className="w-full appearance-none bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-[13px] text-slate-600 outline-none"
              >
                <option value="Choose Region">Choose Region</option>
                <option value="New York">New York</option>
                <option value="California">California</option>
                <option value="Texas">Texas</option>
                <option value="Florida">Florida</option>
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
          <InputField label="Google Place ID" placeholder="Google Place ID" name="googlePlaceId" help={true} value={formData.googlePlaceId} onChange={handleInputChange} />
          <InputField label="Longitude" placeholder="Longitude" name="longitude" value={formData.longitude} onChange={handleInputChange} />
          <InputField label="Latitude" placeholder="Latitude" name="latitude" value={formData.latitude} onChange={handleInputChange} />
        </div>
      </FormSection>

      {/* 3. Gallery */}
      <FormSection title="Gallery" icon={ImageIcon}>
        <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4 text-[12px] text-blue-700 mb-6">
          Upload photos to display in your listing's gallery. The first image will be used as the featured card thumbnail.
        </div>

        {/* Upload Button */}
        <div
          onClick={() => document.getElementById('image-upload-input')?.click()}
          className="border-2 border-dashed border-slate-200 hover:border-[#111c1e] rounded-xl p-8 text-center bg-slate-50 hover:bg-slate-100/50 transition-all duration-200 flex flex-col items-center gap-3 cursor-pointer group mb-6"
        >
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-slate-200 shadow-sm text-slate-400 group-hover:scale-105 transition-all">
            <Upload size={20} className="text-slate-500" />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-slate-700">Click to upload photos</p>
            <p className="text-[11px] text-slate-400 mt-1">Supports PNG, JPG, JPEG, WEBP (Max 2MB per image)</p>
          </div>
          <input
            id="image-upload-input"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageFileChange}
            className="hidden"
          />
        </div>

        {/* Upload Status */}
        {imageUploadStatus === 'uploading' && (
          <div className="text-center text-xs text-slate-500 font-semibold mb-4 animate-pulse flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 text-[#111c1e] animate-spin" /> Uploading images...
          </div>
        )}

        {/* Preview Gallery */}
        {uploadedImages.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
            {uploadedImages.map((url, idx) => (
              <div key={idx} className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50 aspect-video group shadow-sm">
                <img
                  src={url}
                  alt={`Listing image ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                {idx === 0 && (
                  <span className="absolute top-2 left-2 bg-[#111c1e] text-white text-[9px] font-extrabold px-2 py-0.5 rounded shadow">
                    FEATURED
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setUploadedImages(prev => prev.filter((_, i) => i !== idx))}
                  className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-red-50 text-slate-600 hover:text-red-500 rounded-lg shadow transition-all opacity-0 group-hover:opacity-100 duration-200 cursor-pointer"
                  title="Delete Image"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        )}
      </FormSection>

      {/* 4. Details */}
      <FormSection title="Details" icon={Check}>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[12px] font-bold text-slate-700">Description *</label>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-200 p-2 flex gap-2">
                <div className="px-2 py-1 bg-white border border-slate-200 rounded text-[11px] font-bold">P</div>
                <div className="flex gap-1 border-l border-slate-200 pl-2">
                  <div className="w-6 h-6 flex items-center justify-center hover:bg-white rounded cursor-pointer">B</div>
                  <div className="w-6 h-6 flex items-center justify-center hover:bg-white rounded italic cursor-pointer">I</div>
                </div>
              </div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full h-40 p-4 text-[13px] text-slate-600 outline-none"
                placeholder="Description content..."
              />
            </div>
          </div>
          {/* Video Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-[12px] font-bold text-slate-700 flex items-center gap-1.5">
                Video Presentation <HelpCircle size={12} className="text-slate-300 animate-pulse" />
              </label>
              <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200/50">
                <button
                  type="button"
                  onClick={() => setVideoSource('url')}
                  className={`px-3 py-1 rounded-md text-[11px] font-bold transition-all duration-200 cursor-pointer ${videoSource === 'url'
                      ? 'bg-white text-slate-800 shadow-sm'
                      : 'text-slate-400 hover:text-slate-600'
                    }`}
                >
                  Video URL
                </button>
                <button
                  type="button"
                  onClick={() => setVideoSource('file')}
                  className={`px-3 py-1 rounded-md text-[11px] font-bold transition-all duration-200 cursor-pointer ${videoSource === 'file'
                      ? 'bg-white text-slate-800 shadow-sm'
                      : 'text-slate-400 hover:text-slate-600'
                    }`}
                >
                  Upload File
                </button>
              </div>
            </div>

            {videoSource === 'url' ? (
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="URL to external supported service (e.g. YouTube, Vimeo)"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-[13px] text-slate-600 focus:outline-none focus:border-slate-400 transition-all shadow-sm"
                />
                <p className="text-[10px] text-slate-400">Pasting a link will embed an interactive player for sitters and visitors.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {uploadStatus === 'idle' && (
                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('video-upload-input')?.click()}
                    className="border-2 border-dashed border-slate-200 hover:border-[#111c1e] rounded-xl p-8 text-center bg-slate-50 hover:bg-slate-100/50 transition-all duration-200 flex flex-col items-center gap-3 cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-slate-200 shadow-sm text-slate-400 group-hover:scale-105 transition-all">
                      <Upload size={18} className="text-slate-500" />
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-slate-700">Drag & drop video or click to upload</p>
                      <p className="text-[11px] text-slate-400 mt-1">Supports MP4, MOV, AVI, WEBM (Max 100MB)</p>
                    </div>
                    <input
                      id="video-upload-input"
                      type="file"
                      accept="video/*"
                      onChange={handleVideoFileChange}
                      className="hidden"
                    />
                  </div>
                )}

                {uploadStatus === 'uploading' && (
                  <div className="border border-slate-100 rounded-xl p-6 bg-slate-50 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500 animate-pulse">
                          <Film size={16} />
                        </div>
                        <div>
                          <p className="text-[12px] font-bold text-slate-700 line-clamp-1">{videoFile?.name}</p>
                          <p className="text-[10px] text-slate-400 font-medium">Uploading video... {uploadProgress}%</p>
                        </div>
                      </div>
                      <div className="w-5 h-5 flex items-center justify-center">
                        <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />
                      </div>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-indigo-500 h-full rounded-full transition-all duration-200 ease-out"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {uploadStatus === 'success' && (
                  <div className="space-y-4">
                    <div className="border border-emerald-100 rounded-xl p-4 bg-emerald-50/30 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                          <CheckCircle size={16} />
                        </div>
                        <div>
                          <p className="text-[12px] font-bold text-slate-700 line-clamp-1">{videoFile?.name}</p>
                          <p className="text-[10px] text-slate-400 font-medium text-emerald-600">
                            {videoFile?.size ? (videoFile.size / (1024 * 1024)).toFixed(1) : 0} MB • Uploaded successfully
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveVideo}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                        title="Remove Video"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {videoPreviewUrl && (
                      <div className="relative rounded-xl overflow-hidden border border-slate-100 bg-black aspect-video max-h-60 w-full group shadow-md">
                        <video
                          src={videoPreviewUrl}
                          controls
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputField label="Phone" placeholder="Phone" name="phone" value={formData.phone} onChange={handleInputChange} />
            <InputField label="Website" placeholder="Website" name="website" value={formData.website} onChange={handleInputChange} />
            <InputField label="E-mail" placeholder="E-mail" name="email" value={formData.email} onChange={handleInputChange} />
          </div>
          <div className="flex items-center justify-between py-4 border-y border-slate-50">
            <label className="text-[12px] font-bold text-slate-700 flex items-center gap-1.5">Enable Contact Widget <HelpCircle size={12} className="inline text-slate-300" /></label>
            <div
              onClick={() => setEnableContactWidget(!enableContactWidget)}
              className={`w-10 h-5 rounded-full relative cursor-pointer transition-all duration-300 ${enableContactWidget ? 'bg-[#111c1e]' : 'bg-slate-200'
                }`}
            >
              <div
                className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 ${enableContactWidget ? 'left-[22px]' : 'left-0.5'
                  }`}
              />
            </div>
          </div>
          {enableContactWidget && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 transition-all duration-300">
              <div className="space-y-2"><label className="text-[11px] font-bold text-slate-700 flex items-center gap-2"><FacebookIcon size={14} className="text-blue-600" /> Facebook</label><input name="facebook" value={formData.facebook} onChange={handleInputChange} className="w-full border-b border-slate-200 py-1 text-[13px] outline-none focus:border-[#111c1e] transition-colors" placeholder="https://facebook.com/..." /></div>
              <div className="space-y-2"><label className="text-[11px] font-bold text-slate-700 flex items-center gap-2"><TwitterIcon size={14} className="text-black" /> X (Twitter)</label><input name="twitter" value={formData.twitter} onChange={handleInputChange} className="w-full border-b border-slate-200 py-1 text-[13px] outline-none focus:border-[#111c1e] transition-colors" placeholder="https://x.com/..." /></div>
              <div className="space-y-2"><label className="text-[11px] font-bold text-slate-700 flex items-center gap-2"><YoutubeIcon size={14} className="text-red-600" /> YouTube</label><input name="youtube" value={formData.youtube} onChange={handleInputChange} className="w-full border-b border-slate-200 py-1 text-[13px] outline-none focus:border-[#111c1e] transition-colors" placeholder="https://youtube.com/..." /></div>
              <div className="space-y-2"><label className="text-[11px] font-bold text-slate-700 flex items-center gap-2"><InstagramIcon size={14} className="text-pink-600" /> Instagram</label><input name="instagram" value={formData.instagram} onChange={handleInputChange} className="w-full border-b border-slate-200 py-1 text-[13px] outline-none focus:border-[#111c1e] transition-colors" placeholder="https://instagram.com/..." /></div>
              <div className="space-y-2"><label className="text-[11px] font-bold text-slate-700 flex items-center gap-2"><MessageCircle size={14} className="text-emerald-500" /> WhatsApp</label><input name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} className="w-full border-b border-slate-200 py-1 text-[13px] outline-none focus:border-[#111c1e] transition-colors" placeholder="WhatsApp phone link..." /></div>
              <div className="space-y-2"><label className="text-[11px] font-bold text-slate-700 flex items-center gap-2"><Music size={14} className="text-slate-900" /> TikTok</label><input name="tiktok" value={formData.tiktok} onChange={handleInputChange} className="w-full border-b border-slate-200 py-1 text-[13px] outline-none focus:border-[#111c1e] transition-colors" placeholder="https://tiktok.com/@..." /></div>
            </div>
          )}
          {/* Price range fields hidden - managed via Pricing & Bookable Services section */}
        </div>
      </FormSection>

      {/* Togglable Sections */}
      <FormSection title="Pricing & Bookable Services" icon={Check}>
        <div className="space-y-6">
          <p className="text-[12px] text-slate-400">
            Define different bookable service packages and specific rates for this listing. These will display in your public listings.
          </p>

          {/* List of current services */}
          <div className="space-y-3">
            {pricingServices.map((service, index) => (
              <div key={index} className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100/60 shadow-sm">
                <div>
                  <h4 className="text-[13px] font-bold text-[#111c1e]">{service.service}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{service.desc}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[13px] font-extrabold text-[#111c1e] bg-white border border-slate-100 px-3 py-1 rounded-md shadow-sm">{service.price}</span>
                  <button
                    type="button"
                    onClick={() => setPricingServices(prev => prev.filter((_, i) => i !== index))}
                    className="text-red-500 hover:text-red-700 text-[11px] font-bold transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Service Form */}
          <div className="bg-slate-50/50 p-5 rounded-xl border border-slate-100 space-y-4">
            <h4 className="text-[12px] font-bold text-slate-700">Add Custom Bookable Service</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500">Service Name</label>
                <input
                  type="text"
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  placeholder="e.g. Overnight Boarding"
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-[12px] text-slate-600 focus:outline-none focus:border-slate-400 transition-all shadow-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500">Price Rate</label>
                <input
                  type="text"
                  value={newServicePrice}
                  onChange={(e) => setNewServicePrice(e.target.value)}
                  placeholder="e.g. $40.00"
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-[12px] text-slate-600 focus:outline-none focus:border-slate-400 transition-all shadow-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500">Description</label>
                <input
                  type="text"
                  value={newServiceDesc}
                  onChange={(e) => setNewServiceDesc(e.target.value)}
                  placeholder="Brief description..."
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-[12px] text-slate-600 focus:outline-none focus:border-slate-400 transition-all shadow-sm"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                if (newServiceName && newServicePrice) {
                  setPricingServices(prev => [...prev, { service: newServiceName, price: newServicePrice, desc: newServiceDesc }]);
                  setNewServiceName('');
                  setNewServicePrice('');
                  setNewServiceDesc('');
                }
              }}
              className="bg-[#111c1e] text-white px-5 py-2 rounded-lg text-[11px] font-bold hover:bg-[#1a2e35] transition-all shadow-sm active:scale-95"
            >
              + Add Service Pack
            </button>
          </div>
        </div>
      </FormSection>
      <FormSection title="Opening Hours" icon={Check} toggle={true} isToggled={enableOpeningHours} onToggle={() => setEnableOpeningHours(!enableOpeningHours)}>
        <div className="space-y-6">
          <p className="text-[12px] text-slate-400">
            Configure your weekly schedule and daily operational hours. This will display on your public listing pages.
          </p>

          <div className="space-y-4">
            {openingHours.map((item, index) => (
              <div key={item.day} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100/60 shadow-sm">
                {/* Day name & toggle status */}
                <div className="flex items-center gap-3 min-w-[120px]">
                  <input
                    type="checkbox"
                    checked={item.isOpen}
                    onChange={(e) => {
                      const updated = [...openingHours];
                      updated[index].isOpen = e.target.checked;
                      setOpeningHours(updated);
                    }}
                    className="w-4 h-4 rounded text-[#111c1e] border-slate-300 focus:ring-[#111c1e]"
                  />
                  <span className="text-[13px] font-bold text-slate-700">{item.day}</span>
                </div>

                {/* Open / Close Time inputs */}
                {item.isOpen ? (
                  <div className="flex items-center gap-3">
                    <div className="space-y-1">
                      <span className="block text-[10px] text-slate-400 uppercase font-semibold">Open Time</span>
                      <select
                        value={item.openTime}
                        onChange={(e) => {
                          const updated = [...openingHours];
                          updated[index].openTime = e.target.value;
                          setOpeningHours(updated);
                        }}
                        className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-[12px] text-slate-600 outline-none focus:border-slate-400 font-medium"
                      >
                        {['06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'].map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    <span className="text-slate-400 text-xs font-bold mt-4">to</span>

                    <div className="space-y-1">
                      <span className="block text-[10px] text-slate-400 uppercase font-semibold">Close Time</span>
                      <select
                        value={item.closeTime}
                        onChange={(e) => {
                          const updated = [...openingHours];
                          updated[index].closeTime = e.target.value;
                          setOpeningHours(updated);
                        }}
                        className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-[12px] text-slate-600 outline-none focus:border-slate-400 font-medium"
                      >
                        {['04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM', '11:00 PM', '12:00 AM', '01:00 AM', '02:00 AM', '03:00 AM'].map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ) : (
                  <span className="text-xs font-bold text-red-500 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100/50">
                    Closed (No hours set)
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </FormSection>


      <div className="flex gap-4 pt-4">
        <button
          onClick={handlePublish}
          disabled={isSubmitting}
          className="bg-[#111c1e] text-white px-10 py-3.5 rounded-full text-[14px] font-bold flex items-center gap-3 hover:bg-[#1a2e35] transition-all group shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
          ) : (
            <>{isRegistrationFlow ? 'Next Step' : 'Publish Listing'} <ArrowRightCircle size={20} className="group-hover:translate-x-1 transition-transform" /></>
          )}
        </button>
      </div>
    </div>
  );
};

const ChevronDown = ({ size, className }: any) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
);

export default SellerAddListing;
