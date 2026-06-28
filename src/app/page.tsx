"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { MarqueeStrip } from "@/components/sections/MarqueeStrip";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";
import { useCursorFollow } from "@/hooks/useCursorFollow";

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null!);
  useCursorFollow();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(mainRef.current, { opacity: 0, duration: 0.3, ease: "power2.out" });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />
      <main ref={mainRef}>
        <HeroSection />
        <MarqueeStrip />
        <AchievementsSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
