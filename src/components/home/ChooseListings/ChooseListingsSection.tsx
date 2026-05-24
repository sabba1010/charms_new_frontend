import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Import images
import housingImg from "../../../assets/hero-banner-new.png";
import sittingImg from "../../../assets/hero-bg.png";
import boardingImg from "../../../assets/categories/What-Is-A-Pet-Boarding-Service.jpg";
import dropinImg from "../../../assets/categories/dropin.png";
import visitingImg from "../../../assets/categories/visiting.png";
import groomingImg from "../../../assets/categories/grooming.png";
import trainingImg from "../../../assets/categories/training.png";

const categories = ["Housing", "Sitting", "Pet Boarding", "Drop-In", "Visiting", "Pet Grooming", "Pet Training"];

// SVG Icons
const Icons = {
  ChevronLeft: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
  ChevronRight: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 6 15 12 9 18" />
    </svg>
  ),
  Lightbulb: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 4 12.874V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.126A7 7 0 0 1 12 2z" />
    </svg>
  ),
  Scissors: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c084a0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
      <line x1="20" y1="4" x2="8.12" y2="15.88" />
      <line x1="14.47" y1="14.48" x2="20" y2="20" />
      <line x1="8.12" y1="8.12" x2="12" y2="12" />
    </svg>
  ),
  GraduationCap: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#4a9070" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  Clock: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  MapPin: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
};

const cards = [
  {
    id: "cs-1",
    type: "case-study",
    title: "Advertise Your Pet Business",
    emoji: "📢",
    description: (
      <>
        Are you a local vet clinic, pet food brand, puppy trainer, or mobile dog grooming service?{" "}
        <strong style={{ color: "#1a1a1a", fontWeight: 600 }}>
          Reach thousands of dedicated pet parents
        </strong>{" "}
        in your local area by promoting your services directly on Home Paw.{" "}
        <strong style={{ color: "#1a1a1a", fontWeight: 600 }}>
          Connect with clients exactly when they need care.
        </strong>
      </>
    ),
    buttonText: "Partner With Us",
    width: 560,
  },
  {
    id: "cta-1",
    type: "cta",
    title: "Brand Partnerships",
    description:
      "Promote your premium pet foods, organic treats, toys, and veterinary care services right here.",
    width: 320,
  },
  {
    id: "info-1",
    type: "info",
    title: "Local Services Spotlight",
    description: (
      <>
        Feature your local dog washing, cat hotels, or obedience bootcamps.{" "}
        <strong style={{ color: "#fff", fontWeight: 600 }}>
          Home Paw provides custom listing categories for every professional pet service.
        </strong>
      </>
    ),
    width: 320,
  },
  {
    id: "cat-1",
    type: "category",
    title: "Housing",
    description: "Find premium housing solutions for you and your pets.",
    count: "0 listings",
    Icon: null, // No icon as per request
    bgImage: housingImg,
    bg: "rgba(254, 249, 231, 0.88)",
    titleColor: "#7a5c3a",
    badgeBg: "rgba(0,0,0,0.07)",
    badgeColor: "#a08060",
    width: 320,
  },
  {
    id: "cat-2",
    type: "category",
    title: "Sitting",
    description: "Trusted sitters to care for your home and pets.",
    count: "24 listings",
    Icon: null, // No icon as per request
    bgImage: sittingImg,
    bg: "rgba(229, 229, 229, 0.88)",
    titleColor: "#555",
    badgeBg: "rgba(0,0,0,0.08)",
    badgeColor: "#666",
    width: 320,
  },
  {
    id: "cat-3",
    type: "category",
    title: "Pet Boarding",
    description: "Safe and happy stays for your furry friends.",
    count: "12 listings",
    Icon: null, // No icon as per request
    bgImage: boardingImg,
    bg: "rgba(212, 212, 212, 0.88)",
    titleColor: "#555",
    badgeBg: "rgba(0,0,0,0.08)",
    badgeColor: "#666",
    width: 320,
  },
  {
    id: "cat-4",
    type: "category",
    title: "Drop-In",
    description: "Quick check-ins for feeding and playtime.",
    count: "12 listings",
    Icon: Icons.Clock,
    bgImage: dropinImg,
    bg: "rgba(253, 242, 248, 0.92)",
    titleColor: "#9a6080",
    badgeBg: "rgba(0,0,0,0.06)",
    badgeColor: "#b080a0",
    width: 320,
  },
  {
    id: "cat-5",
    type: "category",
    title: "Visiting",
    description: "Extended home visits for personalized pet care.",
    count: "9 listings",
    Icon: Icons.MapPin,
    bgImage: visitingImg,
    bg: "rgba(236, 253, 245, 0.92)",
    titleColor: "#3a7060",
    badgeBg: "rgba(0,0,0,0.06)",
    badgeColor: "#4a9070",
    width: 320,
  },
  {
    id: "cat-6",
    type: "category",
    title: "Pet Grooming",
    description: "Keep your pets looking and feeling their best.",
    count: "15 listings",
    Icon: Icons.Scissors,
    bgImage: groomingImg,
    bg: "rgba(253, 242, 248, 0.92)",
    titleColor: "#9a6080",
    badgeBg: "rgba(0,0,0,0.06)",
    badgeColor: "#b080a0",
    width: 320,
  },
  {
    id: "cat-7",
    type: "category",
    title: "Pet Training",
    description: "Professional training for your companion.",
    count: "8 listings",
    Icon: Icons.GraduationCap,
    bgImage: trainingImg,
    bg: "rgba(236, 253, 245, 0.92)",
    titleColor: "#3a7060",
    badgeBg: "rgba(0,0,0,0.06)",
    badgeColor: "#4a9070",
    width: 320,
  },
];

const STEP = 320 + 24; // card width + gap
const MAX_INDEX = cards.length - 1;

// Maps carousel index → which tab should be highlighted
const indexToTab: Record<number, string> = {
  0: "Housing",
  1: "Housing",
  2: "Sitting",
  3: "Pet Boarding",
  4: "Sitting",
  5: "Pet Boarding",
  6: "Drop-In",
  7: "Visiting",
  8: "Pet Grooming",
  9: "Pet Training",
};

// Maps tab name → which carousel index to jump to
const tabToIndex: Record<string, number> = {
  "Housing": 0,
  "Sitting": 4,
  "Pet Boarding": 5,
  "Drop-In": 6,
  "Visiting": 7,
  "Pet Grooming": 8,
  "Pet Training": 9,
};

export default function ChooseListingsSection() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("Housing");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(MAX_INDEX);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      let visibleWidth = window.innerWidth - 64;
      if (containerRef.current) {
        visibleWidth = containerRef.current.clientWidth - 64; // subtracting padding
      }
      const visibleCards = Math.max(1, Math.floor(visibleWidth / STEP));
      setMaxIndex(Math.max(0, cards.length - visibleCards));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const syncTab = (newIndex: number) => {
    const tab = indexToTab[newIndex];
    if (tab) setActiveCategory(tab);
  };

  const goNext = () => {
    const next = Math.min(currentIndex + 1, maxIndex);
    setCurrentIndex(next);
    syncTab(next);
  };

  const goPrev = () => {
    const prev = Math.max(currentIndex - 1, 0);
    setCurrentIndex(prev);
    syncTab(prev);
  };

  const handleTabClick = (cat: string) => {
    setActiveCategory(cat);
    const idx = tabToIndex[cat] ?? 0;
    setCurrentIndex(Math.min(idx, maxIndex));
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=DM+Sans:wght@300;400;500;600&display=swap');
        .cls-section { font-family: 'DM Sans', sans-serif; }
        .cls-card { transition: box-shadow 0.35s ease, transform 0.35s ease; }
        .cls-card:hover { box-shadow: 0 8px 30px rgba(0,0,0,0.08); transform: translateY(-4px); }
        .cls-cta-img { transition: transform 1.5s ease; }
        .cls-cta-wrap:hover .cls-cta-img { transform: scale(1.06); }
        .cls-tab-underline { transition: opacity 0.2s; }
        .cls-nav-btn { transition: background 0.2s, color 0.2s; }
        .cls-nav-btn:hover { background: #f0f0f0!important; color: #333!important; }
        .cls-read-btn { transition: background 0.2s; }
        .cls-read-btn:hover { background: #e2e8ec!important; }
      `}</style>

      <section
        className="cls-section"
        style={{ width: "100%", background: "#F5F2EB", padding: "64px 0 48px", overflow: "hidden" }}
      >
        {/* ── Heading ── */}
        <div style={{ textAlign: "center", marginBottom: 8, padding: "0 32px" }}>
          <h2
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 500,
              color: "#111",
              margin: 0,
            }}
            className="text-4xl md:text-4xl lg:text-[40px]"
          >
            Choose Listings
          </h2>
          <div
            style={{
              width: 48,
              height: 2,
              background: "#111",
              margin: "10px auto 0",
              borderRadius: 2,
            }}
          />
        </div>

        {/* ── Tabs ── */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 8,
            margin: "36px 32px 48px",
          }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <div key={cat} style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <button
                  onClick={() => handleTabClick(cat)}
                  style={{
                    padding: "10px 20px",
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: "pointer",
                    border: "none",
                    background: isActive ? "#f5f5f5" : "#fafafa",
                    color: isActive ? "#111" : "#666",
                    fontFamily: "'DM Sans', sans-serif",
                    outline: "none",
                  }}
                >
                  {cat}
                </button>
                {isActive && (
                  <div
                    className="cls-tab-underline"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      height: 2,
                      background: "#111",
                      borderRadius: 1,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* ── Carousel ── */}
        <div ref={containerRef} style={{ overflow: "hidden", padding: "0 32px" }}>
          <div
            style={{
              display: "flex",
              gap: 24,
              transform: `translateX(-${currentIndex * STEP}px)`,
              transition: "transform 0.55s cubic-bezier(0.22,0.8,0.36,1)",
              willChange: "transform",
            }}
          >
            {cards.map((card) => {
              // ── Case Study ──
              if (card.type === "case-study") {
                return (
                  <div
                    key={card.id}
                    className="cls-card"
                    onClick={() => navigate("/contact")}
                    style={{
                      flexShrink: 0,
                      width: card.width,
                      height: 320,
                      borderRadius: 12,
                      background: "#fff",
                      border: "1px solid rgba(0,0,0,0.06)",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.04)",
                      padding: "40px",
                      display: "flex",
                      flexDirection: "column",
                      cursor: "pointer",
                      overflow: "hidden",
                    }}
                  >
                    <h3 style={{ fontSize: 22, fontWeight: 500, color: "#111", margin: "0 0 16px", display: "flex", alignItems: "center", gap: 8 }}>
                      {card.title} <span>{card.emoji}</span>
                    </h3>
                    <div style={{ fontSize: 14, lineHeight: 1.6, color: "#666", margin: 0, maxWidth: "95%", fontWeight: 400 }}>
                      {card.description}
                    </div>
                    <button
                      className="cls-read-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/contact");
                      }}
                      style={{
                        marginTop: "auto",
                        alignSelf: "flex-start",
                        padding: "12px 24px",
                        background: "#e8ecef",
                        borderRadius: 999,
                        fontSize: 14,
                        fontWeight: 500,
                        color: "#222",
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {card.buttonText}
                    </button>
                  </div>
                );
              }

              // ── CTA ──
              if (card.type === "cta") {
                return (
                  <div
                    key={card.id}
                    className="cls-card cls-cta-wrap"
                    onClick={() => navigate("/contact")}
                    style={{
                      flexShrink: 0,
                      width: card.width,
                      height: 320,
                      borderRadius: 20,
                      border: "1px solid rgba(0,0,0,0.05)",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                      position: "relative",
                      overflow: "hidden",
                      cursor: "pointer",
                    }}
                  >
                    {/* Gradient bg */}
                    <div
                      className="cls-cta-img"
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(135deg, #c8836a 0%, #9b4a3a 40%, #6b2d2d 100%)",
                      }}
                    />
                    {/* Decorative leaf shapes */}
                    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.25 }} viewBox="0 0 320 320">
                      <ellipse cx="160" cy="320" rx="90" ry="130" fill="white" transform="rotate(-20 160 320)" />
                      <ellipse cx="80" cy="200" rx="60" ry="110" fill="white" transform="rotate(15 80 200)" />
                      <ellipse cx="240" cy="150" rx="50" ry="95" fill="white" transform="rotate(-10 240 150)" />
                      <ellipse cx="160" cy="80" rx="40" ry="70" fill="white" transform="rotate(5 160 80)" />
                    </svg>
                    {/* Overlay */}
                    <div style={{ position: "absolute", inset: 0, background: "rgba(80,20,20,0.35)" }} />
                    {/* Content */}
                    <div style={{
                      position: "absolute", inset: 0,
                      display: "flex", flexDirection: "column",
                      alignItems: "center", justifyContent: "center",
                      textAlign: "center", padding: 32, color: "#fff", zIndex: 2,
                    }}>
                      <div style={{ marginBottom: 16, opacity: 0.9 }}>
                        <Icons.Lightbulb />
                      </div>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 500, margin: "0 0 12px" }}>
                        {card.title}
                      </h3>
                      <p style={{ fontSize: 13, opacity: 0.88, lineHeight: 1.6, maxWidth: 200, fontWeight: 300, margin: 0 }}>
                        {card.description}
                      </p>
                    </div>
                  </div>
                );
              }

              // ── Info ──
              if (card.type === "info") {
                return (
                  <div
                    key={card.id}
                    className="cls-card"
                    onClick={() => navigate("/contact")}
                    style={{
                      flexShrink: 0,
                      width: card.width,
                      height: 320,
                      borderRadius: 20,
                      background: "#1a1a1a",
                      border: "1px solid rgba(0,0,0,0.05)",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                      padding: "36px 32px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      cursor: "pointer",
                      overflow: "hidden",
                    }}
                  >
                    <h3 style={{ fontSize: 18, fontWeight: 500, color: "#f0f0f0", margin: "0 0 16px" }}>
                      {card.title}
                    </h3>
                    <div style={{ fontSize: 13.5, lineHeight: 1.65, color: "#888", margin: 0 }}>
                      {card.description}
                    </div>
                  </div>
                );
              }

              // ── Category ──
              if (card.type === "category") {
                const CategoryIcon = (card as any).Icon;
                return (
                  <div
                    key={card.id}
                    className="cls-card"
                    style={{
                      flexShrink: 0,
                      width: card.width,
                      height: 320,
                      borderRadius: 20,
                      position: "relative",
                      overflow: "hidden",
                      border: "1px solid rgba(0,0,0,0.05)",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                      cursor: "pointer",
                    }}
                  >
                    {/* Background Image */}
                    <img
                      src={(card as any).bgImage}
                      alt={card.title}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        zIndex: 0
                      }}
                    />
                    {/* Background Overlay */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: (card as any).bg,
                        zIndex: 1
                      }}
                    />

                    {/* Content */}
                    <div style={{
                      position: "relative",
                      zIndex: 2,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      padding: 36,
                    }}>
                      {CategoryIcon && (
                        <div style={{ marginBottom: 20, opacity: 0.9 }}>
                          <CategoryIcon />
                        </div>
                      )}
                      <h3 style={{ fontSize: 20, fontWeight: 600, color: (card as any).titleColor, margin: "0 0 14px", letterSpacing: "0.3px" }}>
                        {card.title}
                      </h3>
                      <p style={{ fontSize: 13, lineHeight: 1.6, color: (card as any).titleColor, opacity: 0.85, margin: "0 0 24px", maxWidth: "85%", fontWeight: 500 }}>
                        {(card as any).description}
                      </p>
                      <div
                        style={{
                          padding: "6px 18px",
                          background: (card as any).badgeBg,
                          borderRadius: 999,
                          fontSize: 12,
                          fontWeight: 600,
                          color: (card as any).badgeColor,
                          backdropFilter: "blur(4px)",
                          border: "1px solid rgba(0,0,0,0.05)"
                        }}
                      >
                        {card.count}
                      </div>
                    </div>
                  </div>
                );
              }

              return null;
            })}
          </div>
        </div>

        {/* ── Nav Buttons ── */}
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 36 }}>
          <button
            className="cls-nav-btn"
            onClick={goPrev}
            disabled={currentIndex === 0}
            style={{
              width: 40, height: 40, borderRadius: "50%",
              border: "1px solid #e8e8e8", background: "#fafafa",
              cursor: currentIndex === 0 ? "default" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: currentIndex === 0 ? "#ccc" : "#999",
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
              opacity: currentIndex === 0 ? 0.5 : 1,
            }}
          >
            <Icons.ChevronLeft />
          </button>
          <button
            className="cls-nav-btn"
            onClick={goNext}
            disabled={currentIndex >= maxIndex}
            style={{
              width: 40, height: 40, borderRadius: "50%",
              border: "1px solid #e8e8e8", background: "#fafafa",
              cursor: currentIndex >= maxIndex ? "default" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: currentIndex >= maxIndex ? "#ccc" : "#999",
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
              opacity: currentIndex >= maxIndex ? 0.5 : 1,
            }}
          >
            <Icons.ChevronRight />
          </button>
        </div>
      </section>
    </>
  );
}