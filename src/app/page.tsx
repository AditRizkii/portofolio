"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { CurrentlyBuilding } from "@/components/sections/CurrentlyBuilding";
import { MarqueeStrip } from "@/components/sections/MarqueeStrip";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";
import { BackToTop } from "@/components/BackToTop";
import { ProjectDetailModal } from "@/components/sections/ProjectDetailModal";
import { CVPreview } from "@/components/sections/CVPreview";
import type { Project } from "@/types";

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null!);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [cvOpen, setCvOpen] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (!prefersReduced) {
        gsap.from(pageRef.current, { opacity: 0, duration: 0.5, ease: "power2.out" });
      } else {
        pageRef.current.style.opacity = "1";
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      <Navbar />
      <main>
        <HeroSection onCvOpen={() => setCvOpen(true)} />
        <CurrentlyBuilding />
        <MarqueeStrip />
        <AchievementsSection />
        <AboutSection />
        <ProjectsSection onProjectClick={(p) => setSelectedProject(p)} />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />

      <BackToTop />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
      <CVPreview open={cvOpen} onClose={() => setCvOpen(false)} />
    </div>
  );
}
