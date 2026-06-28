"use client";

import { useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

interface Props {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDetailModal({ project, onClose }: Props) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!project) return;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!prefersReduced) {
      gsap.from(".modal-content", {
        y: 30,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, handleKeyDown]);

  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={project.title}>
      <div
        className="modal-content relative"
        onClick={(e) => e.stopPropagation()}
        style={{ position: "relative" }}
      >
        <button
          className="project-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
          </svg>
        </button>

        <div
          className="mb-5 aspect-video w-full rounded-lg overflow-hidden"
          style={{ background: "rgb(var(--bg-base))" }}
        >
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 text-xs font-mono rounded-md"
              style={{
                background: "rgb(var(--accent) / 0.1)",
                color: "rgb(var(--accent))",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <h3
          className="mb-3 font-display text-2xl font-bold"
          style={{ color: "rgb(var(--text-1))" }}
        >
          {project.title}
        </h3>

        <p
          className="mb-6 text-sm leading-relaxed"
          style={{ color: "rgb(var(--text-2))" }}
        >
          {project.description}
        </p>

        <div className="flex flex-wrap gap-3">
          {project.previewUrl && project.previewUrl !== "/" && (
            <a
              href={project.previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-[1.02] focus-ring"
              style={{
                background: "rgb(var(--accent))",
                color: "#fff",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Live
            </a>
          )}
          {project.gitUrl && project.gitUrl !== "/" && (
            <a
              href={project.gitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-[1.02] focus-ring"
              style={{
                borderColor: "rgb(var(--border) / 0.12)",
                color: "rgb(var(--text-2))",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              Source
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
