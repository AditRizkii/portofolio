"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import { gsap } from "gsap";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const card = cardRef.current;

      card.addEventListener("mouseenter", () => {
        gsap.to(card.querySelector(".card-overlay"), {
          opacity: 1,
          duration: 0.25,
          ease: "power2.out",
        });
        gsap.to(card.querySelector(".card-actions"), {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
          stagger: 0.05,
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card.querySelector(".card-overlay"), {
          opacity: 0,
          duration: 0.25,
          ease: "power2.out",
        });
        gsap.to(card.querySelector(".card-actions"), {
          y: 10,
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
        });
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={cardRef} className="group">
      <div
        className="relative h-52 overflow-hidden rounded-t-xl bg-surface-hover md:h-72"
        style={
          {
            "--bg-url": `url(${project.image})`,
            background: "var(--bg-url)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          } as React.CSSProperties
        }
      >
        <div
          className="card-overlay absolute inset-0 flex items-center justify-center gap-3 bg-gradient-to-t from-bg/90 via-bg/60 to-transparent opacity-0 transition-all duration-300"
          aria-hidden="true"
        >
          {project.gitUrl && project.gitUrl !== "/" && (
            <Link
              href={project.gitUrl}
              className="card-actions flex h-12 w-12 translate-y-2 items-center justify-center rounded-full border border-white/30 text-white opacity-0 transition-colors hover:border-white hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} source code`}
            >
              <CodeBracketIcon className="h-6 w-6" />
            </Link>
          )}
          {project.previewUrl && project.previewUrl !== "/" && (
            <Link
              href={project.previewUrl}
              className="card-actions flex h-12 w-12 translate-y-2 items-center justify-center rounded-full border border-white/30 text-white opacity-0 transition-colors hover:border-white hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Preview ${project.title}`}
            >
              <EyeIcon className="h-6 w-6" />
            </Link>
          )}
        </div>
      </div>
      <div className="rounded-b-xl border-x border-b border-border bg-surface p-5">
        <h3 className="font-display text-lg font-semibold text-text-primary">
          {project.title}
        </h3>
        <p className="mt-1 text-sm text-text-muted">{project.description}</p>
      </div>
    </div>
  );
}
