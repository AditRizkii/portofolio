"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapReveal } from "@/hooks/useGsapReveal";

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  { metric: "Projects", value: 10, suffix: "+", icon: "folder" },
  { metric: "Users", value: 40, prefix: "~", suffix: "+", icon: "users" },
  { metric: "Awards", value: 2, suffix: "", icon: "trophy" },
  { metric: "Years", value: 4, suffix: "+", icon: "calendar" },
];

const IconFolder = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);
const IconUsers = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IconTrophy = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);
const IconCalendar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const icons: Record<string, React.ReactNode> = {
  folder: <IconFolder />,
  users: <IconUsers />,
  trophy: <IconTrophy />,
  calendar: <IconCalendar />,
};

export function AchievementsSection() {
  const sectionRef = useRef<HTMLElement>(null!);
  const countRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      countRefs.current.forEach((el, i) => {
        if (!el) return;
        const target = achievements[i].value;
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.textContent = Math.floor(obj.val).toString();
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="shimmer-border py-12 sm:py-14"
      style={{
        borderTop: "1px solid rgb(var(--border) / 0.06)",
        borderBottom: "1px solid rgb(var(--border) / 0.06)",
        background: "rgb(var(--bg-layer))",
      }}
    >
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="flex flex-col items-center sm:flex-row sm:justify-center">
          {achievements.map((item, i) => (
            <div
              key={item.metric}
              className="flex w-full sm:w-auto items-center justify-center"
            >
              <div className="flex flex-col items-center px-8 py-5 sm:py-0">
                <div style={{ color: "rgb(var(--accent) / 0.5)" }} className="mb-2">
                  {icons[item.icon]}
                </div>
                <span
                  className="font-display text-3xl font-extrabold sm:text-4xl"
                  style={{ color: "rgb(var(--accent))" }}
                >
                  {item.prefix || ""}
                  <span ref={(el) => { countRefs.current[i] = el; }}>0</span>
                  {item.suffix || ""}
                </span>
                <span
                  className="mt-1 text-xs font-medium uppercase tracking-widest"
                  style={{ color: "rgb(var(--text-2))" }}
                >
                  {item.metric}
                </span>
              </div>
              {i < achievements.length - 1 && (
                <div className="divider-v hidden sm:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
