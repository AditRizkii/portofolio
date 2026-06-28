"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/types";

gsap.registerPlugin(ScrollTrigger);

const projectsData: Project[] = [
  {
    id: 1,
    title: "DESUS",
    description: "Depression Diagnose",
    image: "/images/projects/desus.png",
    tags: ["All", "Web", "Mobile"],
    gitUrl: "https://github.com/AditRizkii/DESUS",
    previewUrl: "/",
    tech: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 2,
    title: "Manajemen Uang Kas",
    description: "Website for management kas",
    image: "/images/projects/uang-kas.png",
    tags: ["All", "Web"],
    gitUrl: "https://github.com/AditRizkii/ManajemenKas-fe",
    previewUrl: "/",
    tech: ["React", "MySQL", "Node.js"],
  },
  {
    id: 3,
    title: "Flow Pet Clinic",
    description: "Build Landing page for pet care",
    image: "/images/projects/petcare.png",
    tags: ["All", "Web", "Mobile"],
    gitUrl: "/",
    previewUrl: "https://flowpetclinic.netlify.app/",
    tech: ["React", "TailwindCSS"],
  },
  {
    id: 4,
    title: "KreditTepat",
    description: "Website for analysis worthy for credit card",
    image: "/images/projects/kredittepat.png",
    tags: ["All", "Web", "Mobile"],
    gitUrl: "https://github.com/AditRizkii/Sistem-KreditTepat",
    previewUrl: "https://kredittepat.netlify.app/",
    tech: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 5,
    title: "TrashPorter",
    description: "Trash Pickup Service",
    image: "/images/projects/trashporter.png",
    tags: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/",
    tech: ["React", "Node.js", "MySQL"],
  },
  {
    id: 6,
    title: "Wedding Invitation Web",
    description: "Build wedding invitation website",
    image: "/images/projects/undangan.png",
    tags: ["All", "Web", "Mobile"],
    gitUrl: "/",
    previewUrl: "https://humam-rika-invitation-aditrizkii.vercel.app/",
    tech: ["React", "Next.js"],
  },
  {
    id: 7,
    title: "Fixing Report Web",
    description: "Build report template pdf for goverment instance",
    image: "/images/projects/laporanperbaikan.png",
    tags: ["All", "Web", "Mobile"],
    gitUrl: "https://github.com/AditRizkii/Laporan-Perbaikan",
    previewUrl: "/",
    tech: ["React", "Node.js"],
  },
  {
    id: 8,
    title: "EZFarm App",
    description: "Build plant disease detection android app",
    image: "/images/projects/ezfarm.png",
    tags: ["All", "Mobile"],
    gitUrl: "https://github.com/fakhri-rasyad/capstone_project_ezfarm",
    previewUrl: "/",
    tech: ["Kotlin", "TensorFlow", "Android"],
  },
];

const filterTags = ["All", "Web", "Mobile"] as const;

interface ProjectsSectionProps {
  onProjectClick?: (project: Project) => void;
}

export function ProjectsSection({ onProjectClick }: ProjectsSectionProps) {
  const [activeTag, setActiveTag] = useState<"All" | "Web" | "Mobile">("All");
  const gridRef = useRef<HTMLDivElement>(null!);
  const sectionRef = useRef<HTMLElement>(null!);

  const filteredProjects = projectsData.filter((p) =>
    p.tags.includes(activeTag),
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!gridRef.current || !gridRef.current.children.length) return;

    const ctx = gsap.context(() => {
      gsap.from(gridRef.current.children, {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
          // markers: true, // aktifkan kalau mau debug visual posisi trigger
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        onComplete: () => {
          // safety net: pastikan akhirnya selalu opacity 1, apapun yang terjadi
          gsap.set(gridRef.current.children, {
            opacity: 1,
            y: 0,
            clearProps: "transform",
          });
        },
      });
    }, gridRef);

    // recalculate posisi trigger setelah layout & gambar settle
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    const t = setTimeout(() => ScrollTrigger.refresh(), 500);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
      ctx.revert();
    };
  }, [activeTag, filteredProjects]);

  return (
    <section ref={sectionRef} id="projects" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2
              className="font-display text-display-2 font-bold"
              style={{ color: "rgb(var(--text-1))" }}
            >
              Selected Work
            </h2>
            <p className="mt-1 text-sm" style={{ color: "rgb(var(--text-2))" }}>
              A curated collection of things I&apos;ve built.
            </p>
          </div>
          <div
            className="flex gap-5"
            role="tablist"
            aria-label="Project filters"
          >
            {filterTags.map((tag) => (
              <button
                key={tag}
                role="tab"
                aria-selected={activeTag === tag}
                onClick={() => setActiveTag(tag)}
                className="tab-underline pb-1 text-sm font-medium transition-colors focus-ring"
                style={{
                  color:
                    activeTag === tag
                      ? "rgb(var(--accent))"
                      : "rgb(var(--text-2))",
                }}
              >
                {tag}
                {activeTag === tag && (
                  <span
                    className="block h-0.5 mt-0.5"
                    style={{
                      background: "rgb(var(--accent))",
                      transform: "scaleX(1)",
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={gridRef}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => onProjectClick?.(project)}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <p
            className="mt-16 text-center text-sm"
            style={{ color: "rgb(var(--text-2))" }}
          >
            No projects found for this category.
          </p>
        )}
      </div>
    </section>
  );
}
