import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

import { ShieldCheck, Home, Star } from "lucide-react";
import verifiedImg from '../../assets/logo/Screenshot 2026-05-14 093706.png';
import petsittingImg from '../../assets/logo/Screenshot 2026-05-14 094108.png';
import securitypetImg from '../../assets/logo/WhatsApp_Image_2026-05-12_at_8.30.56_AM__2_-removebg-preview.png';

const sitters = [
  {
    id: 1,
    name: "lijh ihjio",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&h=600&fit=crop",
    role: "Experienced pet sitter",
    features: ["Administers medication", "Verified"],
    rating: 5,
  },
  {
    id: 2,
    name: "Rhia",
    image: "https://images.unsplash.com/photo-1551730459-92db2a308d6a?w=500&h=600&fit=crop",
    role: "Experienced pet sitter",
    features: ["Administers medication", "Verified"],
    rating: 5,
  },
  {
    id: 3,
    name: "Elena Marla",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=600&fit=crop",
    role: "Experienced pet sitter",
    features: ["Administers medication", "Verified"],
    rating: 5,
  },
  {
    id: 4,
    name: "David K.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=600&fit=crop",
    role: "Experienced pet sitter",
    features: ["Administers medication", "Verified"],
    rating: 5,
  },
];

const IconChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const IconChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 6 15 12 9 18" />
  </svg>
);
const IconHeart = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const IconShield = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);
const IconStarWhite = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const IconStarBlack = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#111" stroke="#111" strokeWidth="0.5">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default function TrustAndSittersSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { isLoggedIn } = useAuth();

  const maxIndex = sitters.length - 2;

  const goNext = () => setCurrentIndex((p) => (p >= maxIndex ? 0 : p + 1));
  const goPrev = () => setCurrentIndex((p) => (p <= 0 ? maxIndex : p - 1));

  useEffect(() => {
    const t = setInterval(goNext, 5000);
    return () => clearInterval(t);
  }, [currentIndex]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;700&display=swap');

        .ts-root * { box-sizing: border-box; margin: 0; padding: 0; }
        .ts-root { font-family: 'DM Sans', sans-serif; }

        .ts-card {
          position: relative;
          border-radius: 10px;
          overflow: hidden;
          flex-shrink: 0;
          width: calc(50% - 8px);
          aspect-ratio: 4 / 3.2;
          box-shadow: 0 6px 24px rgba(0,0,0,0.14);
        }
        .ts-card img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
        }
        .ts-overlay {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 48%;
          background: rgba(20,20,20,0.91);
          clip-path: polygon(0 24%, 100% 0%, 100% 100%, 0% 100%);
        }
        .ts-card-body {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 14px 16px 16px;
          color: #fff;
        }
        .ts-card-body h3 {
          font-family: 'Playfair Display', serif;
          font-size: 19px;
          font-weight: 700;
          margin-bottom: 7px;
        }
        .ts-feat-row {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          opacity: 0.93;
          margin-bottom: 3px;
        }
        .ts-stars {
          display: flex;
          align-items: center;
          gap: 2px;
          margin-top: 8px;
        }
        .ts-reviews {
          font-size: 12px;
          font-weight: 600;
          margin-left: 5px;
        }
        .ts-slider-box {
          position: relative;
        }
        .ts-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%) scale(0.9);
          width: 36px; height: 36px;
          background: #8a9e6e;
          border: none;
          border-radius: 6px;
          color: #fff;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          z-index: 30;
          box-shadow: 0 3px 12px rgba(0,0,0,0.22);
          opacity: 0;
          transition: opacity 0.2s ease, transform 0.2s ease, background 0.15s;
        }
        .ts-slider-box:hover > .ts-nav {
          opacity: 1;
          transform: translateY(-50%) scale(1);
        }
        .ts-nav:hover { background: #738654 !important; }
        .ts-nav.left  { left:  14px; }
        .ts-nav.right { right: 14px; }
        .ts-feat-item {
          display: flex;
          align-items: center;
          gap: 14px;
        }
      `}</style>

      <section
        className="ts-root"
        style={{
          width: "100%",
          background: "#F5F2EB",
          padding: "56px 48px",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 72,
          }}
        >
          {/* ── LEFT: card slider box ── */}
          <div
            className="ts-slider-box"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              width: "58%",
              flexShrink: 0,
              background: "#edecea",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.07)",
              padding: "24px 28px",
              position: "relative",
            }}
          >
            {/* arrows — visible on hover */}
            <button
              className="ts-nav left"
              onClick={goPrev}
              style={{
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? "translateY(-50%) scale(1)" : "translateY(-50%) scale(0.85)",
                pointerEvents: isHovered ? "auto" : "none",
              }}
            >
              <IconChevronLeft />
            </button>
            <button
              className="ts-nav right"
              onClick={goNext}
              style={{
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? "translateY(-50%) scale(1)" : "translateY(-50%) scale(0.85)",
                pointerEvents: isHovered ? "auto" : "none",
              }}
            >
              <IconChevronRight />
            </button>

            <div style={{ overflow: "hidden", position: "relative" }}>
              {/* sliding track */}
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  transition: "transform 0.55s cubic-bezier(0.22,0.8,0.36,1)",
                  transform: `translateX(calc(-${currentIndex * 50}% - ${currentIndex * 8}px))`,
                  willChange: "transform",
                }}
              >
                {sitters.map((sitter) => (
                  <div key={sitter.id} className="ts-card">
                    <img 
                      src={sitter.image} 
                      alt={sitter.name} 
                      style={!isLoggedIn ? { filter: 'blur(8px) grayscale(100%)', transition: 'filter 0.5s ease' } : { transition: 'filter 0.5s ease' }}
                    />

                    <div className="ts-overlay" />
                    <div className="ts-card-body">
                      <h3>{sitter.name}</h3>
                      <div className="ts-feat-row">
                        <IconHeart />
                        <span>{sitter.role}</span>
                      </div>
                      {sitter.features.map((f, i) => (
                        <div key={i} className="ts-feat-row">
                          <IconShield />
                          <span>{f}</span>
                        </div>
                      ))}
                      <div className="ts-stars">
                        {Array.from({ length: sitter.rating }).map((_, i) => (
                          <IconStarWhite key={i} />
                        ))}
                        <span className="ts-reviews">Reviews</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: features ── */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <h2
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 600,
                color: "#111111",
                lineHeight: 1.2,
                marginBottom: 20,
                letterSpacing: "-0.5px",
              }}
              className="text-4xl md:text-4xl lg:text-[40px]"
            >
              Find a pet or home sitter you can trust
            </h2>

            <p
              style={{
                fontSize: 20,
                color: "#666",
                lineHeight: 1.6,
                marginBottom: 40,
                fontWeight: 500,
              }}
            >
              We have a growing community of trusted sitters who<br /> you can rely on for safe and loving care.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {[
                {
                  title: "Verified & Vetted",
                  desc: "Third-party verification, including ID, address and police clearance checks for your peace of mind.",
                  icon: <img src={verifiedImg} alt="Verified" className="w-12 h-12 object-contain" />
                },
                {
                  title: "Home & Pet Care",
                  desc: "Honest reviews from pet and home owners.",
                  icon: <img src={petsittingImg} alt="Home & Pet Care" className="w-12 h-12 object-contain" />
                },
                {
                  title: "Trusted Reviews",
                  desc: "Access to our support team to help you with your registration process.",
                  icon: <img src={securitypetImg} alt="Trusted Reviews" className="w-12 h-12 object-contain" />
                }
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <div className="shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    {/* <h4 style={{ fontSize: 20, fontWeight: 800, color: "#1a2e35", margin: "0 0 4px" }}>
                      {item.title}
                    </h4> */}
                    <p style={{ fontSize: 18, color: "#777", fontWeight: 500, margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}