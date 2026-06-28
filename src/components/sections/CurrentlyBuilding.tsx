"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: "HireGenie",
    desc: "AI-powered recruitment dashboard with real-time candidate scoring",
    stack: "Next.js · FastAPI · OpenAI · Redis",
    status: "70%",
  },
  {
    name: "CodeCollab",
    desc: "Real-time collaborative code editor with WebSocket sync",
    stack: "React · Node.js · WebSocket · CRDT",
    status: "45%",
  },
  {
    name: "FinDash Lite",
    desc: "Personal finance visualizer with Plaid integration",
    stack: "Next.js · Prisma · PostgreSQL · Chart.js",
    status: "20%",
  },
];

export function CurrentlyBuilding() {
  const sectionRef = useRef<HTMLElement>(null!);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from(".building-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => {
          gsap.set(".building-card", {
            opacity: 1,
            y: 0,
            clearProps: "transform",
          });
        },
      });

      // hapus block ini kalau .building-bar-fill memang tidak dipakai lagi
      // gsap.from(".building-bar-fill", { ... });
    }, sectionRef);

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    const t = setTimeout(() => ScrollTrigger.refresh(), 500);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="building"
      className="relative px-6 py-28 lg:px-8"
    >
      <div className="mx-auto max-w-4xl">
        <p
          className="mb-2 font-mono text-xs uppercase tracking-[0.2em]"
          style={{ color: "rgb(var(--text-3))" }}
        >
          {/* ponytail: static status header, not configurable */}
          Now Cooking
        </p>
        <h2
          className="mb-12 text-3xl font-display font-bold md:text-4xl"
          style={{ color: "rgb(var(--text-1))" }}
        >
          Currently Building
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          {projects.map((p) => (
            <div
              key={p.name}
              className="building-card group rounded-xl border p-5 transition-all duration-250"
              style={{
                background: "rgb(var(--bg-card))",
                borderColor: "rgb(var(--border) / 0.08)",
              }}
            >
              <div
                className="mb-3 flex items-center gap-2 text-xs font-mono"
                style={{ color: "rgb(var(--text-3))" }}
              >
                <span
                  className="inline-block w-2 h-2 rounded-full animate-pulse"
                  style={{ background: "rgb(var(--cyan))" }}
                />
                {p.status}
              </div>
              <h3
                className="mb-1.5 font-display text-base font-semibold transition-colors group-hover:text-[rgb(var(--accent))]"
                style={{ color: "rgb(var(--text-1))" }}
              >
                {p.name}
              </h3>
              <p
                className="mb-3 text-sm leading-relaxed"
                style={{ color: "rgb(var(--text-2))" }}
              >
                {p.desc}
              </p>
              <p
                className="text-xs font-mono"
                style={{ color: "rgb(var(--text-3))" }}
              >
                {p.stack}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
