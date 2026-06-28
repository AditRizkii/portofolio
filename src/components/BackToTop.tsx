"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full transition-all duration-250 focus-ring ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      style={{
        background: "rgb(var(--accent) / 0.9)",
        color: "#fff",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      }}
      onMouseEnter={(e) => {
        gsap.to(e.currentTarget, { scale: 1.1, duration: 0.2 });
      }}
      onMouseLeave={(e) => {
        gsap.to(e.currentTarget, { scale: 1, duration: 0.2 });
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m18 15-6-6-6 6" />
      </svg>
    </button>
  );
}
