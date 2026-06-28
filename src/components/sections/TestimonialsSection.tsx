"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollReveal } from "@/hooks/useScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Lead, TechCorp",
    text: "One of the sharpest developers I've worked with. Aditya turns ambiguity into clean architecture, ships fast, and communicates clearly. Exactly the person you want on a critical project.",
    color: "var(--accent)",
  },
  {
    name: "Alex Rivera",
    role: "CTO, StartupXYZ",
    text: "We needed a full-stack refresh on a tight timeline. Aditya rebuilt our entire frontend in React while cleaning up a messy Rails backend. Performance improved 3x, our team actually enjoys the codebase now.",
    color: "var(--cyan)",
  },
  {
    name: "Maya Patel",
    role: "Design Lead, DesignStudio",
    text: "Aditya bridges design and engineering naturally. He pushed for accessibility and animation quality that our previous devs glossed over. Our signup conversions went up 22% after his frontend overhaul.",
    color: "var(--accent)",
  },
  {
    name: "James Wilson",
    role: "Engineering Manager, FinServ Inc",
    text: "Aditya led our migration from a legacy monolith to a Next.js + Go microservices architecture. Zero downtime during cutover, and our deployment frequency went from weekly to daily.",
    color: "var(--cyan)",
  },
];

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null!);

  useScrollReveal(sectionRef, {
    selector: ".testimonial-card",
    y: 40,
    stagger: 0.15,
    duration: 0.7,
  });

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative px-6 py-28 lg:px-8"
    >
      <div className="mx-auto max-w-5xl">
        <h2
          className="mb-2 text-center text-xs font-mono uppercase tracking-[0.2em]"
          style={{ color: "rgb(var(--text-3))" }}
        >
          Kind words
        </h2>
        <p
          className="mb-12 text-center font-display text-3xl font-bold md:text-4xl"
          style={{ color: "rgb(var(--text-1))" }}
        >
          What People Say
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="testimonial-card rounded-xl border p-6 transition-all duration-250"
              style={{
                background: "rgb(var(--bg-card))",
                borderColor: "rgb(var(--border) / 0.08)",
              }}
            >
              <svg
                className="mb-3 h-6 w-6 opacity-40"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{
                  color: `rgb(${t.color === "var(--accent)" ? "123 111 224" : "79 195 247"})`,
                }}
              >
                <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
              </svg>
              <p
                className="mb-4 text-sm leading-relaxed"
                style={{ color: "rgb(var(--text-2))" }}
              >
                {t.text}
              </p>
              <div className="mt-auto">
                <p
                  className="text-sm font-semibold"
                  style={{ color: "rgb(var(--text-1))" }}
                >
                  {t.name}
                </p>
                <p className="text-xs" style={{ color: "rgb(var(--text-3))" }}>
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
