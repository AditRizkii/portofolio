"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProjectCard } from "./ProjectCard";
import { Tag } from "@/components/ui/Tag";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

const projectsData: Project[] = [
  {
    id: 1,
    title: "DESUS",
    description: "Depression Diagnose",
    image: "/images/projects/desus.png",
    tags: ["All", "Web", "Mobile"],
    gitUrl: "https://github.com/AditRizkii/DESUS",
    previewUrl: "/",
  },
  {
    id: 2,
    title: "Manajemen Uang Kas",
    description: "Website for management kas",
    image: "/images/projects/uang-kas.png",
    tags: ["All", "Web"],
    gitUrl: "https://github.com/AditRizkii/ManajemenKas-fe",
    previewUrl: "/",
  },
  {
    id: 3,
    title: "Flow Pet Clinic",
    description: "Build Landing page for pet care",
    image: "/images/projects/petcare.png",
    tags: ["All", "Web", "Mobile"],
    gitUrl: "/",
    previewUrl: "https://flowpetclinic.netlify.app/",
  },
  {
    id: 4,
    title: "KreditTepat",
    description: "Website for analysis worthy for credit card",
    image: "/images/projects/kredittepat.png",
    tags: ["All", "Web", "Mobile"],
    gitUrl: "https://github.com/AditRizkii/Sistem-KreditTepat",
    previewUrl: "https://kredittepat.netlify.app/",
  },
  {
    id: 5,
    title: "TrashPorter",
    description: "Trash Pickup Service",
    image: "/images/projects/trashporter.png",
    tags: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 6,
    title: "Wedding Invitation Web",
    description: "Build wedding invitation website",
    image: "/images/projects/undangan.png",
    tags: ["All", "Web", "Mobile"],
    gitUrl: "/",
    previewUrl: "https://humam-rika-invitation-aditrizkii.vercel.app/",
  },
  {
    id: 7,
    title: "Fixing Report Web",
    description: "Build report template pdf for goverment instance",
    image: "/images/projects/laporanperbaikan.png",
    tags: ["All", "Web", "Mobile"],
    gitUrl: "https://github.com/AditRizkii/Laporan-Perbaikan",
    previewUrl: "https://humam-rika-invitation-aditrizkii.vercel.app/",
  },
  {
    id: 8,
    title: "EZFarm App",
    description: "Build plant disease detection android app",
    image: "/images/projects/ezfarm.png",
    tags: ["All", "Mobile"],
    gitUrl: "https://github.com/fakhri-rasyad/capstone_project_ezfarm",
    previewUrl: "/",
  },
];

const filterTags = ["All", "Web", "Mobile"] as const;

export function ProjectsSection() {
  const [activeTag, setActiveTag] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const gridRef = useRef<HTMLUListElement>(null!);
  const sectionRef = useScrollReveal<HTMLElement>({ y: 20 });

  const itemsPerPage = 6;

  const filteredProjects = projectsData.filter((p) =>
    p.tags.includes(activeTag as Project["tags"][number])
  );
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleTagChange = (tag: string) => {
    setActiveTag(tag);
    setCurrentPage(1);
  };

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(gridRef.current.children, {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        overwrite: "auto",
      });
    }, gridRef);

    return () => ctx.revert();
  }, [activeTag, currentPage]);

  return (
    <section ref={sectionRef} id="projects" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          My Projects
        </h2>
        <span className="signature-line mt-3" />

        <div className="mt-8 flex flex-wrap gap-3" role="tablist" aria-label="Project filters">
          {filterTags.map((tag) => (
            <Tag
              key={tag}
              label={tag}
              selected={activeTag === tag}
              onClick={() => handleTagChange(tag)}
            />
          ))}
        </div>

        <ul
          ref={gridRef}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {currentProjects.map((project) => (
            <li key={project.id}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>

        {totalPages > 1 && (
          <nav
            className="mt-10 flex items-center justify-center gap-4"
            aria-label="Project pagination"
          >
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={cn(
                "rounded-full border border-border px-5 py-2 text-sm font-medium transition-all focus-ring",
                currentPage === 1
                  ? "cursor-not-allowed opacity-40"
                  : "text-text-primary hover:border-accent hover:text-accent"
              )}
            >
              Previous
            </button>
            <span className="text-sm text-text-muted tabular-nums">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages, p + 1))
              }
              disabled={currentPage === totalPages}
              className={cn(
                "rounded-full border border-border px-5 py-2 text-sm font-medium transition-all focus-ring",
                currentPage === totalPages
                  ? "cursor-not-allowed opacity-40"
                  : "text-text-primary hover:border-accent hover:text-accent"
              )}
            >
              Next
            </button>
          </nav>
        )}
      </div>
    </section>
  );
}
