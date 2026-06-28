"use client";

import { useEffect, useCallback } from "react";
import { gsap } from "gsap";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function CVPreview({ open, onClose }: Props) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!prefersReduced) {
      gsap.from(".cv-modal-content", {
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
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="CV Preview">
      <div
        className="cv-modal-content modal-content max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3
            className="font-display text-lg font-bold"
            style={{ color: "rgb(var(--text-1))" }}
          >
            Curriculum Vitae
          </h3>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-md transition-colors focus-ring"
            style={{ color: "rgb(var(--text-2))" }}
            onClick={onClose}
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div
          className="rounded-lg border p-6 text-sm leading-relaxed"
          style={{
            background: "rgb(var(--bg-base))",
            borderColor: "rgb(var(--border) / 0.06)",
          }}
        >
          <div className="mb-5 text-center">
            <p className="font-display text-xl font-bold" style={{ color: "rgb(var(--text-1))" }}>Aditya Rizki</p>
            <p className="text-xs" style={{ color: "rgb(var(--text-3))" }}>Full Stack Developer</p>
          </div>

          <Section title="Experience">
            <Item
              title="Senior Full Stack Developer"
              subtitle="TechCorp · 2022–Present"
              desc="Architected and rebuilt the core product frontend in Next.js, migrated legacy Rails API to FastAPI microservices, reducing p95 latency by 60%. Led team of 4 engineers."
            />
            <Item
              title="Frontend Developer"
              subtitle="StartupXYZ · 2020–2022"
              desc="Built React component library consumed by 3 product teams. Implemented real-time collaboration features with WebSocket. Improved Lighthouse scores from 45 to 92."
            />
            <Item
              title="Junior Developer"
              subtitle="Digital Agency · 2018–2020"
              desc="Delivered 12+ client projects using React, Vue, and Node.js. Introduced TypeScript to the team. Built internal tooling that reduced deployment time by 40%."
            />
          </Section>

          <Section title="Skills">
            <div className="flex flex-wrap gap-2">
              {["React", "Next.js", "TypeScript", "Node.js", "FastAPI", "PostgreSQL", "MongoDB", "Docker", "AWS", "GSAP", "Figma"].map((s) => (
                <span
                  key={s}
                  className="px-2 py-0.5 text-xs rounded"
                  style={{
                    background: "rgb(var(--accent) / 0.1)",
                    color: "rgb(var(--accent))",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </Section>

          <Section title="Education">
            <Item title="B.Sc. Computer Science" subtitle="University of Indonesia · 2014–2018" desc="GPA: 3.85/4.00. Thesis: Real-time collaborative code editing using CRDT." />
          </Section>
        </div>

        <div className="mt-4 flex justify-center">
          <button
            className="rounded-lg px-5 py-2 text-sm font-medium transition-all focus-ring"
            style={{
              background: "rgb(var(--accent))",
              color: "#fff",
            }}
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <p
        className="mb-2 font-display text-sm font-semibold uppercase tracking-wider"
        style={{ color: "rgb(var(--accent))" }}
      >
        {title}
      </p>
      {children}
    </div>
  );
}

function Item({ title, subtitle, desc }: { title: string; subtitle: string; desc: string }) {
  return (
    <div className="mb-3 last:mb-0">
      <p className="font-semibold" style={{ color: "rgb(var(--text-1))" }}>{title}</p>
      <p className="text-xs" style={{ color: "rgb(var(--text-3))" }}>{subtitle}</p>
      <p className="mt-1 text-xs leading-relaxed" style={{ color: "rgb(var(--text-2))" }}>{desc}</p>
    </div>
  );
}
