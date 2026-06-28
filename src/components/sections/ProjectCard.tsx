"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const hasPreview = project.previewUrl && project.previewUrl !== "/";
  const hasSource = project.gitUrl && project.gitUrl !== "/";

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") onClick?.(); }}
      className={cn(
        "group relative overflow-hidden rounded-2xl transition-all duration-400 cursor-pointer",
        "hover:-translate-y-1.5 focus-ring"
      )}
      style={{
        background: "rgb(var(--bg-card))",
        border: "1px solid rgb(var(--border) / 0.08)",
      }}
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-400 group-hover:opacity-100 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgb(var(--accent) / 0.08), transparent 60%)",
        }}
      />

      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-[rgb(var(--bg-layer))]">
        <div
          className="h-full w-full bg-cover bg-center transition-all duration-500 group-hover:scale-105"
          style={{
            backgroundImage: `url(${project.image})`,
          }}
        />

        {/* Gradient vignette always visible at bottom */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, rgb(var(--bg-base) / 0.6) 0%, transparent 50%)",
          }}
        />

        {/* Hover overlay — slides up from bottom */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 translate-y-4 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100"
          style={{
            background: "rgb(var(--bg-base) / 0.75)",
            backdropFilter: "blur(4px)",
          }}
        >
          {hasPreview && (
            <Link
              href={project.previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 focus-ring"
              style={{
                background: "rgb(var(--accent))",
                color: "#fff",
              }}
              aria-label={`Preview ${project.title}`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Live Demo
            </Link>
          )}
          {hasSource && (
            <Link
              href={project.gitUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 focus-ring"
              style={{
                borderColor: "rgb(var(--border-bright) / 0.2)",
                color: "rgb(var(--text-1))",
                background: "rgb(var(--bg-card) / 0.6)",
              }}
              aria-label={`View ${project.title} source`}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              Source
            </Link>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-5">
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ background: "rgb(var(--accent))" }}
          />
          <span
            className="text-[10px] font-semibold uppercase tracking-wider"
            style={{ color: "rgb(var(--text-3))" }}
          >
            {project.tags.find((t) => t !== "All") || "Web"}
          </span>
        </div>

        <h3
          className="mt-2 font-display text-lg font-bold transition-colors duration-300 group-hover:text-[rgb(var(--accent))]"
          style={{ color: "rgb(var(--text-1))" }}
        >
          {project.title}
        </h3>

        <p
          className="mt-1 text-sm leading-relaxed line-clamp-2"
          style={{ color: "rgb(var(--text-2))" }}
        >
          {project.description}
        </p>

        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="inline-block px-2 py-0.5 rounded text-[10px] font-medium"
              style={{
                background: "rgb(var(--accent) / 0.08)",
                color: "rgb(var(--accent))",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
