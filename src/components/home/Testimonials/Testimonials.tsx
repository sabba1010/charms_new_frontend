import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";


const testimonials = [
  {
    id: 1,
    content:
      "Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from nanotechnology",
    author: "Tom Baker",
    role: "Clothing Store Owner",
    image: "https://i.pravatar.cc/150?u=tom",
  },
  {
    id: 2,
    content:
      "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking the overall proposition",
    author: "Jack Paden",
    role: "Restaurant Owner",
    image: "https://i.pravatar.cc/150?u=jack",
  },
  {
    id: 3,
    content:
      "Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from nanotechnology",
    author: "Tom Baker",
    role: "Clothing Store Owner",
    image: "https://i.pravatar.cc/150?u=tom2",
  },
  {
    id: 4,
    content:
      "Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits.",
    author: "Sarah Jenkins",
    role: "Freelance Designer",
    image: "https://i.pravatar.cc/150?u=sarah",
  },
];

const ChevronLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 6 15 12 9 18" />
  </svg>
);

const QuoteIcon = ({ faded }: { faded?: boolean }) => (
  <svg
    width="42"
    height="42"
    viewBox="0 0 24 24"
    fill={faded ? "#e2e8f0" : "rgba(255,255,255,0.10)"}
    style={{ position: "absolute", top: 24, left: 24 }}
  >
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
  </svg>
);

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const { isLoggedIn } = useAuth();


  const n = testimonials.length;
  const prev = (currentIndex - 1 + n) % n;
  const next = (currentIndex + 1) % n;
  const visible = [prev, currentIndex, next];

  const goNext = () => setCurrentIndex((p) => (p + 1) % n);
  const goPrev = () => setCurrentIndex((p) => (p - 1 + n) % n);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .testi-section * { box-sizing: border-box; margin: 0; padding: 0; }
        .testi-section { font-family: 'DM Sans', sans-serif; }

        .testi-card-side {
          opacity: 1;
          transition: all 0.4s ease;
        }

        .testi-dot {
          height: 10px;
          border-radius: 999px;
          background: #dde1e7;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          padding: 0;
        }
        .testi-dot.active {
          width: 24px !important;
          background: #111 !important;
        }

        .testi-nav-btn {
          width: 40px; height: 40px;
          border-radius: 50%;
          border: 1px solid #e2e8f0;
          background: #fff;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: #94a3b8;
          transition: background 0.2s, color 0.2s;
        }
        .testi-nav-btn:hover {
          background: #f8fafc;
          color: #333;
        }

        .testi-blur {
          filter: blur(12px) grayscale(100%);
          transition: all 0.5s ease;
        }
        .testi-no-blur {
          filter: blur(0) grayscale(0%);
          transition: all 0.5s ease;
        }

        .testi-avatar-center {
          width: 72px; height: 72px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid #f1f5f9;
          box-shadow: 0 4px 16px rgba(0,0,0,0.12);
          display: block;
        }
        .testi-avatar-side {
          width: 56px; height: 56px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #f8fafc;
          filter: grayscale(100%);
          opacity: 0.5;
          display: block;
        }

        .testi-bubble-center {
          animation: fadeInUp 0.4s ease both;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>

      <section
        className="testi-section"
        style={{
          background: "#f5f5f0",
          padding: "80px 0 72px",
          overflow: "hidden",
          width: "100%",
        }}
      >
        <div style={{ width: "100%", padding: "0 48px" }}>

          {/* ── Header ── */}
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <h2
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "40px",
                fontWeight: 600,
                color: "#111",
                letterSpacing: "-0.5px",
                marginBottom: 20,
              }}
              className="font-fraunces"
            >
              What Our Users Say
            </h2>
            <div
              style={{
                width: 48,
                height: 2,
                background: "#111",
                margin: "0 auto 24px",
                borderRadius: 2,
              }}
            />
            <p
              style={{
                fontSize: 20,
                color: "#666666",
                maxWidth: 560,
                margin: "0 auto",
                lineHeight: 1.75,
                fontWeight: 400,
              }}
            >
              We collect reviews from our users so you can get an honest opinion of what
              they experience to be a part of our community.
            </p>
          </div>

          {/* ── 3-column layout ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.2fr 1fr",
              gap: 32,
              alignItems: "flex-end",
              minHeight: 420,
            }}
          >
            {visible.map((idx, col) => {
              const isCenter = col === 1;
              const t = testimonials[idx];

              return (
                <div
                  key={`${t.id}-${col}`}
                  className={isCenter ? "testi-bubble-center" : "testi-card-side"}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 0,
                  }}
                >
                  {/* Bubble */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      marginBottom: isCenter ? 28 : 20,
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        padding: isCenter ? "44px 36px 36px" : "8px 8px 8px 0",
                        borderRadius: isCenter ? 12 : 0,
                        minHeight: isCenter ? 220 : "auto",
                        background: isCenter ? "#111c1e" : "transparent",
                        display: "flex",
                        alignItems: isCenter ? "center" : "flex-start",
                        boxShadow: isCenter ? "0 20px 60px rgba(0,0,0,0.18)" : "none",
                      }}
                    >
                      <QuoteIcon faded={!isCenter} />

                      <p
                        style={{
                          position: "relative",
                          zIndex: 1,
                          fontSize: isCenter ? 16 : 14.5,
                          lineHeight: 1.85,
                          textAlign: isCenter ? "center" : "left",
                          color: isCenter ? "#fff" : "#94a3b8",
                          fontWeight: isCenter ? 500 : 400,
                          paddingLeft: isCenter ? 0 : 8,
                          marginTop: isCenter ? 0 : 16,
                        }}
                      >
                        {t.content}
                      </p>

                      {/* Downward arrow on center bubble */}
                      {isCenter && (
                        <div
                          style={{
                            position: "absolute",
                            bottom: -14,
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: 0,
                            height: 0,
                            borderLeft: "14px solid transparent",
                            borderRight: "14px solid transparent",
                            borderTop: "14px solid #111c1e",
                          }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Author */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <img
                      src={t.image}
                      alt={t.author}
                      className={`${isCenter ? "testi-avatar-center" : "testi-avatar-side"} ${!isLoggedIn ? 'testi-blur' : 'testi-no-blur'}`}
                    />

                    <span
                      style={{
                        fontSize: isCenter ? 17 : 14,
                        fontWeight: isCenter ? 700 : 500,
                        color: isCenter ? "#111" : "#94a3b8",
                      }}
                    >
                      {t.author}
                    </span>
                    <div
                      style={{
                        padding: "5px 14px",
                        borderRadius: 999,
                        background: isCenter ? "#f1f5f9" : "#f8fafc",
                        fontSize: 12,
                        fontWeight: 500,
                        color: isCenter ? "#64748b" : "#cbd5e1",
                      }}
                    >
                      {t.role}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Navigation ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
              marginTop: 56,
            }}
          >
            {/* Dots */}
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`testi-dot${currentIndex === i ? " active" : ""}`}
                  style={{ width: currentIndex === i ? 24 : 10 }}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div style={{ display: "flex", gap: 10 }}>
              <button className="testi-nav-btn" onClick={goPrev} aria-label="Previous">
                <ChevronLeft />
              </button>
              <button className="testi-nav-btn" onClick={goNext} aria-label="Next">
                <ChevronRight />
              </button>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}