import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin, Heart, Share2, Star, CheckCircle2,
  Calendar, Users, Info, MessageCircle, Phone,
  Mail,
  ChevronRight, Camera, DollarSign, Clock, ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookedSlot, isSlotBooked } from '../lib/bookingSlot';

const SLOT_TAKEN_MSG = 'This date and time is already booked. Please choose another slot.';

const ListingDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('Overview');

  const isLoggedIn = localStorage.getItem('isAdmin') === 'true' ||
    localStorage.getItem('isSuperUser') === 'true' ||
    localStorage.getItem('isSeller') === 'true' ||
    localStorage.getItem('isOwner') === 'true' ||
    !!localStorage.getItem('token');

  const [selectedDate, setSelectedDate] = useState('2026-05-20');
  const [selectedTime, setSelectedTime] = useState('10:00');
  const [petCount, setPetCount] = useState(1);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1); // 1 = Summary, 2 = Payment, 3 = Success
  const [userName, setUserName] = useState('Jane Doe');
  const [userEmail, setUserEmail] = useState('jane.doe@example.com');
  const [requirements, setRequirements] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>([]);

  const slotTaken = isSlotBooked(bookedSlots, selectedDate, selectedTime);

  const fetchBookedSlots = async (listingId: string) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';
      const res = await fetch(`${apiUrl}/bookings/availability?listingId=${listingId}`);
      const data = await res.json();
      if (data.success) {
        setBookedSlots(data.data);
      }
    } catch (err) {
      console.error('Error fetching booked slots:', err);
    }
  };

  useEffect(() => {
    if (listing) {
      if (listing.services && listing.services.length > 0) {
        setSelectedService(listing.services[0]);
      } else {
        setSelectedService({
          service: 'General Pet Boarding',
          price: listing.minPrice || 30.00,
          desc: 'Standard daily care'
        });
      }
    }
  }, [listing]);

  useEffect(() => {
    const fetchListingDetail = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';
        const res = await fetch(`${apiUrl}/listings/id/${id}`);
        const data = await res.json();
        if (data.success) {
          setListing(data.data);
          fetchBookedSlots(data.data._id);
        }
      } catch (err) {
        console.error('Error fetching listing details:', err);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchListingDetail();
    }
  }, [id]);

  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewName, setReviewName] = useState('');
  const [reviewEmail, setReviewEmail] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  const fetchReviews = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';
      const res = await fetch(`${apiUrl}/reviews/${id}`);
      const data = await res.json();
      if (data.success) {
        setReviews(data.data);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  useEffect(() => {
    if (id) {
      fetchReviews();
    }
  }, [id]);

  const [hasBooking, setHasBooking] = useState(false);

  useEffect(() => {
    const checkBookingStatus = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';
        const res = await fetch(`${apiUrl}/bookings/my-bookings`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          const match = data.data.some((b: any) => {
            const bookingListingId = b.listing?._id || b.listing;
            return bookingListingId === id;
          });
          setHasBooking(match);
        }
      } catch (err) {
        console.error('Error checking booking status for review:', err);
      }
    };
    if (id && isLoggedIn) {
      checkBookingStatus();
    }
  }, [id, isLoggedIn]);

  const getImageUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
      return url;
    }
    if (url.startsWith('/uploads') || url.startsWith('uploads/')) {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';
      const backendUrl = apiUrl.replace('/api', '');
      return `${backendUrl}${url.startsWith('/') ? '' : '/'}${url}`;
    }
    return url;
  };

  const getListingImages = (lst: any) => {
    const listImages: string[] = [];
    if (lst.logo) {
      listImages.push(getImageUrl(lst.logo));
    }
    if (lst.images && lst.images.length > 0) {
      lst.images.forEach((img: string) => {
        if (img) listImages.push(getImageUrl(img));
      });
    }
    const defaultPics = [
      "https://images.unsplash.com/photo-1513584684374-8bdb7489feef?q=80&w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=600&h=400&fit=crop"
    ];
    while (listImages.length < 4) {
      listImages.push(defaultPics[listImages.length % 4]);
    }
    return listImages;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F6F1] pt-24 pb-12 flex flex-col items-center justify-center text-slate-400 font-sans">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-[#1a2e35] rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold">Loading listing details...</p>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-[#F9F6F1] pt-24 pb-12 flex flex-col items-center justify-center text-slate-400 font-sans">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-3xl">📭</div>
        <p className="text-sm font-semibold">Listing not found</p>
        <Link to="/listings" className="text-xs font-bold text-[#1a2e35] hover:underline mt-2">Go back to listings</Link>
      </div>
    );
  }

  const listImages = getListingImages(listing);
  const priceRange = listing.minPrice || listing.maxPrice ? `$${listing.minPrice || 0} - $${listing.maxPrice || 0}` : 'Contact for Price';
  const locationText = listing.friendlyAddress || listing.address || 'No Location Provided';

  const features = listing.keywords
    ? listing.keywords.split(',').map((kw: string) => ({ name: kw.trim(), icon: "🐾" }))
    : [
      { name: "Pet Friendly", icon: "🐾" },
      { name: "First Aid Kit", icon: "🩹" },
      { name: "Special Needs Experience", icon: "❤️" },
      { name: "Fenced Yard", icon: "🏡" }
    ];

  const pricing = (listing.services && listing.services.length > 0)
    ? listing.services.map((s: any) => ({ service: s.service, price: `$` + s.price, desc: s.desc || 'Quality service' }))
    : [
      { service: "General Pet Boarding", price: listing.minPrice ? `$` + listing.minPrice : "$30.00", desc: "Standard daily care" }
    ];

  const host = {
    id: listing.user?._id || listing.user,
    name: listing.user ? `${listing.user.firstName || ''} ${listing.user.lastName || ''}`.trim() || listing.user.username || 'System Sitter' : 'Oppas Haven Sitter',
    email: listing.user?.email || 'sitter@oppashaven.com',
    avatar: listing.logo ? getImageUrl(listing.logo) : "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&fit=crop"
  };

  const tabs = ['Overview', 'Gallery', 'Pricing', 'Location', 'Reviews', 'Add Review'];

  return (
    <div className="min-h-screen bg-[#F9F6F1] pt-24 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-white px-3 py-1 rounded-full text-[11px] font-bold text-slate-500 shadow-sm uppercase tracking-wider">{listing.category || 'Pet Care'}</span>
              <span className="bg-white px-3 py-1 rounded-full text-[11px] font-bold text-slate-500 shadow-sm uppercase tracking-wider">{listing.region || 'New York'}</span>
              <span className="bg-[#E7F5E7] px-3 py-1 rounded-full text-[11px] font-bold text-[#4CAF50] shadow-sm uppercase tracking-wider">{priceRange}</span>
            </div>
            <h1 className="text-4xl font-bold text-[#1a2e35] mb-2 font-serif">{listing.title}</h1>
            <div className="flex items-center text-slate-500 text-sm gap-1">
              <MapPin size={16} className="text-slate-400" />
              <span>{locationText}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            {!isLoggedIn && (
              <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg text-sm font-bold text-slate-700 shadow-sm hover:shadow-md transition-all border border-slate-100">
                <Heart size={16} className="text-pink-500" />
                <span>Login To Bookmark Items</span>
              </button>
            )}
            <span className="text-[12px] text-slate-400 font-medium">{listing.views || 0} people viewed this place</span>
          </div>
        </div>

        {/* Image Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8 h-[500px]">
          <div className="rounded-2xl overflow-hidden h-full shadow-lg">
            <img src={listImages[0]} alt="Main" className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-2 gap-4 h-full">
            <div className="rounded-2xl overflow-hidden h-[242px] shadow-lg">
              <img src={listImages[1]} alt="Gallery 1" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden h-[242px] shadow-lg">
              <img src={listImages[2]} alt="Gallery 2" className="w-full h-full object-cover" />
            </div>
            <div className="col-span-2 rounded-2xl overflow-hidden h-[242px] shadow-lg">
              <img src={listImages[3]} alt="Gallery 3" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Column */}
          <div className="lg:col-span-2">

            {/* Tabs */}
            <div className="flex border-b border-slate-200 mb-8 overflow-x-auto no-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab
                    ? 'text-[#1a2e35] border-b-2 border-[#1a2e35]'
                    : 'text-slate-400 hover:text-slate-600'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-12">
              {activeTab === 'Overview' && (
                <div className="space-y-12">
                  {/* Basic Overview */}
                  <section>
                    <div className="prose prose-slate max-w-none mb-8">
                      <p className="text-slate-600 leading-relaxed">
                        {listing.description || "No description provided for this listing."}
                      </p>
                      {listing.tagline && (
                        <p className="text-slate-500 italic mt-4">
                          "{listing.tagline}"
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-4 mb-10">
                      {listing.phone && (
                        <button className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-lg text-sm font-bold text-slate-700 shadow-sm border border-slate-100 hover:bg-slate-50 transition-all">
                          <Phone size={16} />
                          <span>{listing.phone}</span>
                        </button>
                      )}
                      {listing.email && (
                        <button className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-lg text-sm font-bold text-slate-700 shadow-sm border border-slate-100 hover:bg-slate-50 transition-all">
                          <Mail size={16} />
                          <span>{listing.email}</span>
                        </button>
                      )}
                    </div>
                  </section>

                  {/* Features Section */}
                  <section>
                    <h2 className="text-xl font-bold text-[#1a2e35] mb-6 font-serif">Features</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                      {features.map((feature: any, i: number) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="bg-slate-100 p-1.5 rounded-md text-sm">
                            {feature.icon}
                          </div>
                          <span className="text-sm font-medium text-slate-600">{feature.name}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Gallery Section */}
                  <section>
                    <h2 className="text-xl font-bold text-[#1a2e35] mb-6 font-serif">Gallery</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                      {listImages.map((img, i) => (
                        <div key={i} className="rounded-xl overflow-hidden aspect-video shadow-md hover:scale-[1.02] hover:shadow-lg transition-all duration-300">
                          <img src={img} className="w-full h-full object-cover" alt={`Gallery ${i}`} />
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Pricing Section */}
                  <section>
                    <h2 className="text-xl font-bold text-[#1a2e35] mb-6 font-serif">Pricing</h2>
                    <div className="space-y-4">
                      {pricing.map((item: any, i: number) => (
                        <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center">
                          <div>
                            <h4 className="font-bold text-[#1a2e35]">{item.service}</h4>
                            <p className="text-slate-400 text-xs font-medium uppercase mt-1">{item.desc}</p>
                          </div>
                          <span className="text-lg font-bold text-slate-700">{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Location Section */}
                  <section>
                    <h2 className="text-xl font-bold text-[#1a2e35] mb-6 font-serif">Location</h2>
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 overflow-hidden h-[400px] relative">
                      <div className="absolute top-8 left-8 z-10">
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(locationText)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white px-4 py-2 rounded-lg text-xs font-bold text-slate-700 shadow-lg border border-slate-100 flex items-center gap-2 hover:bg-slate-50 transition-colors"
                        >
                          <MapPin size={14} />
                          Get Directions
                        </a>
                      </div>
                      {locationText && locationText !== 'No Location Provided' ? (
                        <div className="w-full h-full rounded-xl overflow-hidden">
                          <iframe
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Listing Location Map Overview"
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(locationText)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full bg-[#f0f0f0] rounded-xl flex items-center justify-center relative overflow-hidden">
                          <p className="text-slate-400 font-medium text-xs">No address specified for this listing.</p>
                        </div>
                      )}
                    </div>
                  </section>

                  {/* Reviews Section */}
                  <section className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 space-y-6">
                    <h2 className="text-2xl font-bold text-[#1a2e35] mb-2 font-serif">Visitor Reviews ({reviews.length})</h2>

                    {reviews.length === 0 ? (
                      <div className="text-center py-12 text-slate-400">
                        <p className="text-sm italic font-medium">No reviews have been written for this sitter yet. Be the first to book and write a review!</p>
                      </div>
                    ) : (
                      <div className="space-y-6 divide-y divide-slate-100">
                        {reviews.map((rev) => (
                          <div key={rev._id} className="pt-6 first:pt-0 space-y-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-bold text-slate-800 text-sm">{rev.name}</h4>
                                <span className="text-[10px] text-slate-400 font-medium">
                                  {new Date(rev.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                </span>
                              </div>
                              <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    size={12}
                                    className={i < rev.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-200"}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed font-medium italic">
                              "{rev.comment}"
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>

                  {/* Add Review Section */}
                  <section className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100">
                    <h2 className="text-2xl font-bold text-[#1a2e35] mb-2 font-serif">Add Review</h2>

                    {!isLoggedIn ? (
                      <div className="text-center py-12 px-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center mt-6">
                        <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-4">
                          <Info size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-[#1a2e35] mb-2 font-serif">Login Required</h3>
                        <p className="text-slate-500 text-sm max-w-sm leading-relaxed mb-4">
                          Please log in to your account and make a booking to write a review.
                        </p>
                        <Link to="/login" className="bg-[#1a2e35] text-white px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-black transition-all">
                          Login Now
                        </Link>
                      </div>
                    ) : !hasBooking ? (
                      <div className="text-center py-12 px-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center mt-6">
                        <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mb-4 shadow-sm">
                          <ShieldCheck size={32} className="text-amber-500" />
                        </div>
                        <h3 className="text-lg font-bold text-[#1a2e35] mb-2 font-serif">Review Lock</h3>
                        <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
                          You can only submit a review after you have booked this service. Once you have a completed or active booking, the review option will become available.
                        </p>
                      </div>
                    ) : (
                      <>
                        <p className="text-slate-400 text-sm mb-8 font-medium">Your email address will not be published. Required fields are marked *</p>

                        <div className="mb-8">
                          <span className="block text-xs font-bold text-slate-600 mb-2">Overall Rating *</span>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                size={20}
                                onClick={() => setReviewRating(s)}
                                className={`cursor-pointer transition-colors ${s <= reviewRating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-slate-200 hover:text-yellow-300"
                                  }`}
                              />
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <label className="block text-xs font-bold text-slate-600 mb-2">Name *</label>
                            <input
                              type="text"
                              value={reviewName}
                              onChange={(e) => setReviewName(e.target.value)}
                              required
                              className="w-full bg-[#F9F6F1] border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#1a2e35] transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-600 mb-2">Email *</label>
                            <input
                              type="email"
                              value={reviewEmail}
                              onChange={(e) => setReviewEmail(e.target.value)}
                              required
                              className="w-full bg-[#F9F6F1] border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#1a2e35] transition-all"
                            />
                          </div>
                        </div>

                        <div className="mb-6">
                          <label className="block text-xs font-bold text-slate-600 mb-2">Comment *</label>
                          <textarea
                            rows={6}
                            value={reviewComment}
                            onChange={(e) => setReviewComment(e.target.value)}
                            required
                            className="w-full bg-[#F9F6F1] border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#1a2e35] transition-all"
                          ></textarea>
                        </div>

                        <div className="flex items-center gap-2 mb-8">
                          <input type="checkbox" id="save-info-overview" className="rounded text-[#1a2e35] focus:ring-[#1a2e35]" />
                          <label htmlFor="save-info-overview" className="text-xs text-slate-500 font-medium">Save my name, email, and website in this browser for the next time I comment.</label>
                        </div>

                        <button
                          onClick={async (e) => {
                            e.preventDefault();
                            if (!reviewName || !reviewEmail || !reviewComment) {
                              alert('Please fill out all fields.');
                              return;
                            }
                            setSubmittingReview(true);
                            try {
                              const token = localStorage.getItem('token');
                              const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';
                              const response = await fetch(`${apiUrl}/reviews`, {
                                method: 'POST',
                                headers: {
                                  'Content-Type': 'application/json',
                                  'Authorization': `Bearer ${token}`
                                },
                                body: JSON.stringify({
                                  listingId: id,
                                  rating: reviewRating,
                                  comment: reviewComment,
                                  name: reviewName,
                                  email: reviewEmail
                                })
                              });
                              const data = await response.json();
                              if (data.success) {
                                setReviewComment('');
                                setReviewRating(5);
                                fetchReviews();
                                setActiveTab('Overview');
                              } else {
                                alert('Error submitting review: ' + data.message);
                              }
                            } catch (err) {
                              console.error('Error submitting review:', err);
                              alert('An error occurred while submitting your review.');
                            } finally {
                              setSubmittingReview(false);
                            }
                          }}
                          disabled={submittingReview}
                          className="bg-[#1a2e35] text-white px-10 py-3.5 rounded-xl font-bold hover:bg-black transition-all shadow-lg disabled:opacity-50"
                        >
                          {submittingReview ? 'Submitting...' : 'Submit Review'}
                        </button>
                      </>
                    )}
                  </section>
                </div>
              )}

              {activeTab === 'Gallery' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                  {listImages.map((img, i) => (
                    <div key={i} className="rounded-xl overflow-hidden aspect-video shadow-md hover:scale-[1.02] hover:shadow-lg transition-all duration-300">
                      <img src={img} className="w-full h-full object-cover" alt={`Gallery ${i}`} />
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'Pricing' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-[#1a2e35] mb-6 font-serif">Pricing</h2>
                  <div className="space-y-4">
                    {pricing.map((item: any, i: number) => (
                      <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-[#1a2e35]">{item.service}</h4>
                          <p className="text-slate-400 text-xs font-medium uppercase mt-1">{item.desc}</p>
                        </div>
                        <span className="text-lg font-bold text-slate-700">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'Location' && (
                <section>
                  <h2 className="text-xl font-bold text-[#1a2e35] mb-6 font-serif">Location</h2>
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 overflow-hidden h-[400px] relative">
                    <div className="absolute top-8 left-8 z-10">
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(locationText)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white px-4 py-2 rounded-lg text-xs font-bold text-slate-700 shadow-lg border border-slate-100 flex items-center gap-2 hover:bg-slate-50 transition-colors"
                      >
                        <MapPin size={14} />
                        Get Directions
                      </a>
                    </div>
                    {locationText && locationText !== 'No Location Provided' ? (
                      <div className="w-full h-full rounded-xl overflow-hidden">
                        <iframe
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          loading="lazy"
                          allowFullScreen
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Listing Location Map"
                          src={`https://maps.google.com/maps?q=${encodeURIComponent(locationText)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full bg-[#f0f0f0] rounded-xl flex items-center justify-center relative overflow-hidden">
                        <p className="text-slate-400 font-medium text-xs">No address specified for this listing.</p>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {activeTab === 'Reviews' && (
                <section className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 space-y-6">
                  <h2 className="text-2xl font-bold text-[#1a2e35] mb-2 font-serif">Visitor Reviews ({reviews.length})</h2>

                  {reviews.length === 0 ? (
                    <div className="text-center py-12 text-slate-400">
                      <p className="text-sm italic font-medium">No reviews have been written for this sitter yet. Be the first to book and write a review!</p>
                    </div>
                  ) : (
                    <div className="space-y-6 divide-y divide-slate-100">
                      {reviews.map((rev) => (
                        <div key={rev._id} className="pt-6 first:pt-0 space-y-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-bold text-slate-800 text-sm">{rev.name}</h4>
                              <span className="text-[10px] text-slate-400 font-medium">
                                {new Date(rev.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                              </span>
                            </div>
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={12}
                                  className={i < rev.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-200"}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed font-medium italic">
                            "{rev.comment}"
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {activeTab === 'Add Review' && (
                <section className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100">
                  <h2 className="text-2xl font-bold text-[#1a2e35] mb-2 font-serif">Add Review</h2>

                  {!isLoggedIn ? (
                    <div className="text-center py-12 px-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center mt-6">
                      <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-4">
                        <Info size={32} />
                      </div>
                      <h3 className="text-lg font-bold text-[#1a2e35] mb-2 font-serif">Login Required</h3>
                      <p className="text-slate-500 text-sm max-w-sm leading-relaxed mb-4">
                        Please log in to your account and make a booking to write a review.
                      </p>
                      <Link to="/login" className="bg-[#1a2e35] text-white px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-black transition-all">
                        Login Now
                      </Link>
                    </div>
                  ) : !hasBooking ? (
                    <div className="text-center py-12 px-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center mt-6">
                      <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mb-4 shadow-sm">
                        <ShieldCheck size={32} className="text-amber-500" />
                      </div>
                      <h3 className="text-lg font-bold text-[#1a2e35] mb-2 font-serif">Review Lock</h3>
                      <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
                        You can only submit a review after you have booked this service. Once you have a completed or active booking, the review option will become available.
                      </p>
                    </div>
                  ) : (
                    <>
                      <p className="text-slate-400 text-sm mb-8 font-medium">Your email address will not be published. Required fields are marked *</p>

                      <div className="mb-8">
                        <span className="block text-xs font-bold text-slate-600 mb-2">Overall Rating *</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              size={20}
                              onClick={() => setReviewRating(s)}
                              className={`cursor-pointer transition-colors ${s <= reviewRating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-slate-200 hover:text-yellow-300"
                                }`}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-2">Name *</label>
                          <input
                            type="text"
                            value={reviewName}
                            onChange={(e) => setReviewName(e.target.value)}
                            required
                            className="w-full bg-[#F9F6F1] border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#1a2e35] transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-2">Email *</label>
                          <input
                            type="email"
                            value={reviewEmail}
                            onChange={(e) => setReviewEmail(e.target.value)}
                            required
                            className="w-full bg-[#F9F6F1] border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#1a2e35] transition-all"
                          />
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className="block text-xs font-bold text-slate-600 mb-2">Comment *</label>
                        <textarea
                          rows={6}
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          required
                          className="w-full bg-[#F9F6F1] border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#1a2e35] transition-all"
                        ></textarea>
                      </div>

                      <div className="flex items-center gap-2 mb-8">
                        <input type="checkbox" id="save-info" className="rounded text-[#1a2e35] focus:ring-[#1a2e35]" />
                        <label htmlFor="save-info" className="text-xs text-slate-500 font-medium">Save my name, email, and website in this browser for the next time I comment.</label>
                      </div>

                      <button
                        onClick={async (e) => {
                          e.preventDefault();
                          if (!reviewName || !reviewEmail || !reviewComment) {
                            alert('Please fill out all fields.');
                            return;
                          }
                          setSubmittingReview(true);
                          try {
                            const token = localStorage.getItem('token');
                            const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';
                            const response = await fetch(`${apiUrl}/reviews`, {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                              },
                              body: JSON.stringify({
                                listingId: id,
                                rating: reviewRating,
                                comment: reviewComment,
                                name: reviewName,
                                email: reviewEmail
                              })
                            });
                            const data = await response.json();
                            if (data.success) {
                              setReviewComment('');
                              setReviewRating(5);
                              fetchReviews();
                              setActiveTab('Reviews');
                            } else {
                              alert('Error submitting review: ' + data.message);
                            }
                          } catch (err) {
                            console.error('Error submitting review:', err);
                            alert('An error occurred while submitting your review.');
                          } finally {
                            setSubmittingReview(false);
                          }
                        }}
                        disabled={submittingReview}
                        className="bg-[#1a2e35] text-white px-10 py-3.5 rounded-xl font-bold hover:bg-black transition-all shadow-lg disabled:opacity-50"
                      >
                        {submittingReview ? 'Submitting...' : 'Submit Review'}
                      </button>
                    </>
                  )}
                </section>
              )}

            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">

            {/* Verified Badge */}
            <div className="bg-[#4CAF50] text-white py-4 px-6 rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-green-100">
              <ShieldCheck size={24} />
              <span className="font-bold text-lg">Verified Listing</span>
            </div>

            {/* Booking Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
              <div className="flex items-center gap-2 mb-8 border-b border-slate-50 pb-4">
                <Calendar className="text-slate-400" size={20} />
                <h3 className="text-xl font-bold text-[#1a2e35]">Booking</h3>
              </div>

              <div className="space-y-4 mb-8">
                {/* Date Selection */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-500 ml-1">Select Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full bg-[#F9F6F1] border-none rounded-xl p-4 text-sm text-slate-700 font-medium focus:ring-2 focus:ring-[#1a2e35] transition-all"
                    />
                  </div>
                </div>

                {/* Time Selection */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-500 ml-1">Select Time</label>
                  <div className="relative">
                    <input
                      type="time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full bg-[#F9F6F1] border-none rounded-xl p-4 text-sm text-slate-700 font-medium focus:ring-2 focus:ring-[#1a2e35] transition-all"
                    />
                  </div>
                </div>

                {slotTaken && (
                  <p className="text-[12px] font-semibold text-rose-600 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">
                    {SLOT_TAKEN_MSG}
                  </p>
                )}

                {/* Service Selection */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-500 ml-1">Select Service</label>
                  <div className="relative">
                    <select
                      value={selectedService ? JSON.stringify(selectedService) : ''}
                      onChange={(e) => {
                        try {
                          setSelectedService(JSON.parse(e.target.value));
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      className="w-full bg-[#F9F6F1] border-none rounded-xl p-4 text-sm appearance-none cursor-pointer text-slate-700 font-medium focus:ring-2 focus:ring-[#1a2e35] transition-all"
                    >
                      {listing.services && listing.services.length > 0 ? (
                        listing.services.map((s: any, idx: number) => (
                          <option key={idx} value={JSON.stringify(s)}>
                            {s.service} (${s.price})
                          </option>
                        ))
                      ) : (
                        <option value={JSON.stringify({ service: "General Pet Boarding", price: listing.minPrice || 30.00, desc: "Standard daily care" })}>
                          General Pet Boarding (${listing.minPrice || 30.00})
                        </option>
                      )}
                    </select>
                    <ChevronRight size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 rotate-90 pointer-events-none" />
                  </div>
                </div>

                {/* How Many Pets Selection */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-500 ml-1">How many pets?</label>
                  <div className="relative">
                    <select
                      value={petCount}
                      onChange={(e) => setPetCount(Number(e.target.value))}
                      className="w-full bg-[#F9F6F1] border-none rounded-xl p-4 text-sm appearance-none cursor-pointer text-slate-700 font-medium focus:ring-2 focus:ring-[#1a2e35] transition-all"
                    >
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Pet' : 'Pets'}</option>
                      ))}
                    </select>
                    <ChevronRight size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 rotate-90 pointer-events-none" />
                  </div>
                </div>
              </div>

              {isLoggedIn ? (
                <button
                  disabled={slotTaken}
                  onClick={() => {
                    if (slotTaken) return;
                    setShowConfirmModal(true);
                    setCheckoutStep(1);
                  }}
                  className="w-full bg-[#1a2e35] text-white py-4 rounded-xl font-bold hover:bg-black transition-all shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {slotTaken ? 'Slot Unavailable' : 'Book Now'}
                </button>
              ) : (
                <Link
                  to="/login"
                  className="w-full bg-[#1a2e35] text-white py-4 rounded-xl font-bold hover:bg-black transition-all shadow-xl block text-center"
                >
                  Login to Book
                </Link>
              )}
            </div>

            {/* Host Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border-2 border-slate-50 shadow-sm">
                  {host.avatar ? (
                    <img src={host.avatar} alt={host.name} className="w-full h-full object-cover" />
                  ) : (
                    <Users size={32} className="text-slate-300" />
                  )}
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Added by</span>
                  <h4 className="text-lg font-bold text-[#1a2e35]">{host.name}</h4>
                  <Link to={`/sitter-profile/${host.id}`} className="text-[#1a2e35] text-xs font-bold hover:underline flex items-center gap-1 mt-0.5">
                    View Profile <ChevronRight size={10} />
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-3 text-slate-500 text-sm bg-[#F9F6F1] p-3 rounded-xl border border-slate-100/50">
                <Mail size={16} className="text-slate-400" />
                <span className="truncate">{host.email}</span>
              </div>
            </div>

            {/* Opening Hours Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 relative overflow-hidden">
              {/* Corner Ribbon */}
              <div className="absolute top-0 right-0">
                <div className="bg-[#4CAF50] text-white text-[9px] font-bold uppercase tracking-wider py-1 px-7 rotate-45 translate-x-5 translate-y-3 shadow-sm text-center w-24">
                  Now Open
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6 border-b border-slate-50 pb-4">
                <Clock className="text-slate-400" size={20} />
                <h3 className="text-xl font-bold text-[#1a2e35]">Opening Hours</h3>
              </div>

              <div className="space-y-3.5">
                {(listing.enableOpeningHours && listing.openingHours && listing.openingHours.length > 0) ? (
                  listing.openingHours.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-slate-500 capitalize">{item.day}</span>
                      <span className="font-bold text-[#1a2e35]/80">
                        {item.isOpen ? `${item.openTime} - ${item.closeTime}` : 'Closed'}
                      </span>
                    </div>
                  ))
                ) : (
                  ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
                    <div key={index} className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-slate-500">{day}</span>
                      <span className="font-bold text-[#1a2e35]/80">09:00 AM - 07:00 PM</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Bookmark & Share */}
            <div className="text-center space-y-6">
              {!isLoggedIn && (
                <div className="space-y-2">
                  <button className="flex items-center gap-2 bg-white px-6 py-2.5 rounded-lg text-[13px] font-bold text-slate-700 shadow-sm border border-slate-100 mx-auto hover:bg-slate-50 transition-all">
                    <Heart size={16} className="text-pink-500" />
                    <span>Login To Bookmark Items</span>
                  </button>
                  <p className="text-[11px] text-slate-400 font-medium">2 people bookmarked this listing</p>
                </div>
              )}

              <div className="flex flex-wrap justify-center gap-2">
                {[
                  { icon: <Share2 size={14} />, label: 'Share', color: 'bg-[#3b5998]' },
                  { icon: <Share2 size={14} />, label: 'Tweet', color: 'bg-[#1da1f2]' },
                  { icon: <Share2 size={14} />, label: 'Share', color: 'bg-[#0077b5]' },
                  { icon: <Share2 size={14} />, label: 'Share', color: 'bg-[#e4405f]' },
                ].map((social, i) => (
                  <button key={i} className={`${social.color} text-white flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold hover:brightness-110 transition-all`}>
                    {social.icon}
                    {social.label}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Dynamic Step-by-Step Booking & Payment Modal */}
      <AnimatePresence>
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with premium blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowConfirmModal(false)}
              className="absolute inset-0 bg-[#122023]/60 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden relative z-10 border border-slate-100 max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h3 className="text-xl font-bold text-[#1a2e35] font-serif">
                  {checkoutStep === 1 && "Booking Summary"}
                  {checkoutStep === 2 && "Checkout & Payment"}
                  {checkoutStep === 3 && "Booking Confirmed!"}
                </h3>
                {checkoutStep < 3 && (
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="p-1 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Scrollable Form Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {checkoutStep === 1 && (
                  <div className="space-y-6">
                    {/* Sitter & Listing Context Info */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-3">
                      <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Sitter & Listing</h4>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                          {host.avatar ? (
                            <img src={host.avatar} className="w-full h-full object-cover" alt={host.name} />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold">L</div>
                          )}
                        </div>
                        <div>
                          <h5 className="font-bold text-[#1a2e35]">{host.name}</h5>
                          <p className="text-xs text-slate-500 font-medium">{listing.title} • {listing.category || 'Pet Care'}</p>
                        </div>
                      </div>
                      <div className="border-t border-slate-200/60 pt-3 grid grid-cols-2 gap-4 text-xs font-semibold text-slate-600">
                        <div>
                          <span className="block text-[10px] text-slate-400 uppercase">Selected Date</span>
                          <span className="text-[#1a2e35] font-bold">{selectedDate}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] text-slate-400 uppercase">Selected Time</span>
                          <span className="text-[#1a2e35] font-bold">{selectedTime}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] text-slate-400 uppercase">Number of Pets</span>
                          <span className="text-[#1a2e35] font-bold">{petCount} {petCount === 1 ? 'Pet' : 'Pets'}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] text-slate-400 uppercase">Selected Service</span>
                          <span className="text-[#1a2e35] font-bold">{selectedService?.service} (${selectedService?.price})</span>
                        </div>
                      </div>
                    </div>

                    {/* Customer Info Form */}
                    <div className="space-y-4">
                      <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Your Information</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-500 mb-1.5 ml-1">Name</label>
                          <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-700 font-semibold focus:ring-2 focus:ring-[#1a2e35] focus:bg-white transition-all outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-500 mb-1.5 ml-1">Email</label>
                          <input
                            type="email"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-700 font-semibold focus:ring-2 focus:ring-[#1a2e35] focus:bg-white transition-all outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Requirements input */}
                    <div className="space-y-2">
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">User Requirements & Special Requests</label>
                      <textarea
                        rows={4}
                        placeholder="Tell the sitter about your pet's routine, diet, behavior, or any specific requirements..."
                        value={requirements}
                        onChange={(e) => setRequirements(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-700 font-medium focus:ring-2 focus:ring-[#1a2e35] focus:bg-white transition-all outline-none leading-relaxed"
                      />
                    </div>
                  </div>
                )}

                {checkoutStep === 2 && (
                  <div className="space-y-6">
                    {/* Amount Info */}
                    <div className="bg-[#E7F5E7] p-5 rounded-2xl border border-[#cbeacb] flex justify-between items-center text-[#1e4620]">
                      <div>
                        <h4 className="font-bold text-sm">Total Checkout Amount</h4>
                        <p className="text-xs opacity-80 mt-0.5">Secure payment via credit card</p>
                      </div>
                      <span className="text-2xl font-extrabold">$240.00</span>
                    </div>

                    {/* Credit Card inputs */}
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold text-slate-500 ml-1">Cardholder Name</label>
                        <input
                          type="text"
                          placeholder="JANE DOE"
                          className="w-full bg-white border border-slate-200 rounded-xl p-3.5 text-xs text-slate-700 font-bold uppercase placeholder-slate-300 focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all shadow-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold text-slate-500 ml-1">Card Number</label>
                        <input
                          type="text"
                          placeholder="4111 2222 3333 4444"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').substring(0, 16))}
                          className="w-full bg-white border border-slate-200 rounded-xl p-3.5 text-xs text-slate-700 font-bold placeholder-slate-300 focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all shadow-sm tracking-[0.1em]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="block text-[11px] font-bold text-slate-500 ml-1">Expiration Date</label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value.substring(0, 5))}
                            className="w-full bg-white border border-slate-200 rounded-xl p-3.5 text-xs text-slate-700 font-bold placeholder-slate-300 focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all shadow-sm text-center"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-[11px] font-bold text-slate-500 ml-1">CVC Code</label>
                          <input
                            type="password"
                            placeholder="123"
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, '').substring(0, 3))}
                            className="w-full bg-white border border-slate-200 rounded-xl p-3.5 text-xs text-slate-700 font-bold placeholder-slate-300 focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all shadow-sm text-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {checkoutStep === 3 && (
                  <div className="py-8 text-center flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-[#E7F5E7] text-[#4CAF50] rounded-full flex items-center justify-center shadow-lg border border-[#cbeacb] animate-bounce">
                      <CheckCircle2 size={32} />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="text-xl font-bold text-slate-800">Booking Paid & Complete!</h4>
                      <p className="text-slate-400 text-xs max-w-sm leading-relaxed px-4">
                        Your booking has been confirmed with <strong>{host.name}</strong>. A chat thread has been initialized for you in your dashboard to coordinate details.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex flex-col gap-2.5">
                {checkoutStep === 1 && (
                  <button
                    disabled={slotTaken}
                    onClick={() => !slotTaken && setCheckoutStep(2)}
                    className="w-full bg-[#1a2e35] text-white py-4 rounded-xl font-bold hover:bg-black transition-all shadow-lg text-sm flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Proceed to Checkout
                  </button>
                )}
                {checkoutStep === 2 && (
                  <button
                    disabled={slotTaken}
                    onClick={async () => {
                      if (slotTaken) {
                        alert(SLOT_TAKEN_MSG);
                        return;
                      }
                      try {
                        const token = localStorage.getItem('token');
                        const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';

                        const response = await fetch(`${apiUrl}/bookings`, {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                          },
                          body: JSON.stringify({
                            listingId: listing._id,
                            sitterId: host.id,
                            date: selectedDate,
                            time: selectedTime,
                            petCount: petCount,
                            requirements: requirements,
                            customerName: userName,
                            customerEmail: userEmail,
                            totalAmount: Number(selectedService?.price) || Number(listing.minPrice) || 0,
                            serviceType: selectedService?.service || listing.title
                          })
                        });

                        const data = await response.json();
                        if (data.success) {
                          const newBookingMsg = {
                            sitterName: host.name,
                            sitterAvatar: host.avatar,
                            date: selectedDate,
                            time: selectedTime,
                            petCount: petCount,
                            requirements: requirements,
                            listingTitle: listing.title,
                            id: data.data._id
                          };
                          localStorage.setItem('recentBooking', JSON.stringify(newBookingMsg));
                          await fetchBookedSlots(listing._id);
                          setCheckoutStep(3);
                          setHasBooking(true);
                        } else {
                          if (response.status === 409) {
                            await fetchBookedSlots(listing._id);
                          }
                          alert(data.message || 'Failed to process booking');
                        }
                      } catch (err) {
                        console.error('Error submitting booking:', err);
                        alert('An error occurred while submitting your booking.');
                      }
                    }}
                    className="w-full bg-[#4CAF50] text-white py-4 rounded-xl font-bold hover:bg-green-600 transition-all shadow-lg text-sm flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {slotTaken ? 'Slot Unavailable' : 'Pay & Complete Booking'}
                  </button>
                )}
                {checkoutStep === 3 && (
                  <Link
                    to="/dashboard?tab=messages"
                    className="w-full bg-[#1a2e35] text-white py-4 rounded-xl font-bold hover:bg-black transition-all shadow-lg text-sm flex items-center justify-center gap-2 text-center"
                  >
                    Go to Inbox & Chat with Sitter
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ListingDetails;
