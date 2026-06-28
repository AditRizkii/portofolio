"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapReveal } from "@/hooks/useGsapReveal";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "React", icon: "react", color: "#61DAFB", group: "Frontend" },
  { name: "Next.js", icon: "nextdotjs", color: "#FFFFFF", group: "Frontend" },
  {
    name: "TypeScript",
    icon: "typescript",
    color: "#3178C6",
    group: "Frontend",
  },
  {
    name: "JavaScript",
    icon: "javascript",
    color: "#F7DF1E",
    group: "Frontend",
  },
  {
    name: "TailwindCSS",
    icon: "tailwindcss",
    color: "#06B6D4",
    group: "Frontend",
  },
  { name: "HTML5", icon: "html5", color: "#E34F26", group: "Frontend" },
  { name: "CSS3", icon: "css", color: "#1572B6", group: "Frontend" },
  { name: "Node.js", icon: "nodedotjs", color: "#339933", group: "Backend" },
  { name: "Express", icon: "express", color: "#FFFFFF", group: "Backend" },
  { name: "MySQL", icon: "mysql", color: "#4479A1", group: "Database" },
  { name: "MongoDB", icon: "mongodb", color: "#47A248", group: "Database" },
  { name: "Kotlin", icon: "kotlin", color: "#7F52FF", group: "Tools" },
  { name: "Figma", icon: "figma", color: "#F24E1E", group: "Tools" },
  { name: "Git", icon: "git", color: "#F05032", group: "Tools" },
];

const groups = ["Frontend", "Backend", "Database", "Tools"];

const educationData = [
  {
    school: "University of Syiah Kuala",
    major: "Informatics",
    period: "2021 — 2025",
  },
  {
    school: "BANGKIT 2024 Batch 6",
    major: "Cohort, Cloud Computing",
    period: "2024",
  },
];

const certs = [
  "Getting Started with Basic Programming to Become a Software Developer",
  "Learn to Make Android Apps for Beginners",
  "Learn Structured Query Language (SQL)",
  "Learn Programming with Haskell",
  "Learn Python",
  "Learn Machine Learning for Beginners",
  "Learn Programming with Kotlin",
  "Learn SOLID Principal",
  "Learn Fundamental Android",
  "Learn Intermediate Android",
  "Learn Machine Learning for Android",
];

export function AboutSection() {
  const [activeTab, setActiveTab] = useState("skills");
  const sectionRef = useRef<HTMLElement>(null!);
  const leftRef = useRef<HTMLDivElement>(null!);
  const rightRef = useRef<HTMLDivElement>(null!);
  const tabContentRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
      gsap.from(rightRef.current, {
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      gsap.from(tabContentRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          gsap.set(tabContentRef.current, {
            opacity: 1,
            y: 0,
            clearProps: "transform",
          });
        },
      });

      if (activeTab === "skills" && !prefersReduced) {
        const cards = tabContentRef.current.querySelectorAll(".skill-chip");
        if (cards.length) {
          gsap.from(cards, {
            scale: 0.85,
            opacity: 0,
            duration: 0.35,
            stagger: 0.04,
            ease: "back.out(1.5)",
            onComplete: () => {
              gsap.set(cards, {
                opacity: 1,
                scale: 1,
                clearProps: "transform",
              });
            },
          });
        }
      }
    }, tabContentRef);

    return () => ctx.revert();
  }, [activeTab]);

  return (
    <section ref={sectionRef} id="about" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <h2
          className="font-display text-display-2 font-bold"
          style={{ color: "rgb(var(--text-1))" }}
        >
          About Me
        </h2>

        <div className="mt-12 grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: ID Card (Vertical) */}
          <div ref={leftRef} className="lg:col-span-4">
            <div
              className="relative overflow-hidden rounded-2xl text-center"
              style={{
                background: "rgb(var(--bg-card))",
                border: "1px solid rgb(var(--border) / 0.1)",
                boxShadow: "0 0 80px rgb(var(--accent-glow) / 0.08)",
              }}
            >
              {/* Top accent bar */}
              <div
                className="h-1.5 w-full"
                style={{
                  background:
                    "linear-gradient(90deg, rgb(var(--accent)), rgb(var(--cyan)))",
                }}
              />

              <div className="p-6 flex flex-col items-center">
                {/* Photo */}
                <div
                  className="relative h-28 w-28 overflow-hidden rounded-xl -mt-1"
                  style={{
                    border: "2px solid rgb(var(--border) / 0.1)",
                    background:
                      "linear-gradient(135deg, rgb(var(--accent) / 0.2), rgb(var(--cyan) / 0.2))",
                  }}
                >
                  <img
                    src="/images/profile.jpg"
                    alt="Aditya Rizki Ramadhan"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        const fb = document.createElement("span");
                        fb.className =
                          "flex h-full w-full items-center justify-center font-display text-2xl font-extrabold";
                        fb.style.color = "rgb(var(--accent))";
                        fb.textContent = "AR";
                        parent.appendChild(fb);
                      }
                    }}
                  />
                </div>

                {/* Name & Title */}
                <h3
                  className="mt-4 font-display text-lg font-bold"
                  style={{ color: "rgb(var(--text-1))" }}
                >
                  Aditya Rizki Ramadhan
                </h3>
                <p
                  className="mt-0.5 text-xs font-medium"
                  style={{ color: "rgb(var(--accent))" }}
                >
                  Full Stack Developer
                </p>
                <p
                  className="mt-0.5 text-xs"
                  style={{ color: "rgb(var(--text-3))" }}
                >
                  Unsyiah · Informatics
                </p>

                {/* Divider */}
                <div
                  className="my-4 w-full"
                  style={{ borderTop: "1px dashed rgb(var(--border) / 0.08)" }}
                />

                {/* Stack badges */}
                <div className="flex flex-wrap justify-center gap-1.5">
                  {["React", "Node.js", "Figma"].map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-medium"
                      style={{
                        background: "rgb(var(--accent) / 0.08)",
                        color: "rgb(var(--accent))",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                  <span
                    className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-medium"
                    style={{
                      background: "rgb(var(--bg-base))",
                      color: "rgb(var(--text-3))",
                      border: "1px solid rgb(var(--border) / 0.06)",
                    }}
                  >
                    +11
                  </span>
                </div>

                {/* Divider */}
                <div
                  className="my-4 w-full"
                  style={{ borderTop: "1px dashed rgb(var(--border) / 0.08)" }}
                />

                {/* ID Number + Email */}
                <span
                  className="rounded-md px-2.5 py-0.5 text-[9px] font-mono font-semibold uppercase tracking-wider"
                  style={{
                    background: "rgb(var(--bg-base))",
                    color: "rgb(var(--text-3))",
                    border: "1px solid rgb(var(--border) / 0.06)",
                  }}
                >
                  ID: AR-2026
                </span>
                <p
                  className="mt-2 text-[10px] font-mono"
                  style={{ color: "rgb(var(--text-3))" }}
                >
                  adityarizkiramadhan2@gmail.com
                </p>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div ref={rightRef} className="lg:col-span-8">
            <div className="space-y-4">
              <p
                className="text-base leading-relaxed"
                style={{ color: "rgb(var(--text-2))" }}
              >
                I&apos;m an informatics student at Universitas Syiah Kuala who
                found my way into software through curiosity, tearing apart
                websites to see how they worked, then rebuilding them better.
                What started as tinkering turned into a genuine craft.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: "rgb(var(--text-2))" }}
              >
                I build full-stack applications with React, Next.js, and
                Node.js, and I&apos;ve recently been diving into Kotlin for
                Android development. I care about clean architecture, thoughtful
                UX, and code that doesn&apos;t embarrass me six months later.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: "rgb(var(--text-2))" }}
              >
                Outside of coding, I&apos;m into UI/UX design, machine learning,
                and finding better ways to explain complex things simply.
                I&apos;m always learning, currently exploring cloud
                infrastructure and system design.
              </p>
            </div>

            {/* Tabs */}
            <div
              className="mt-8 flex gap-6"
              style={{ borderBottom: "1px solid rgb(var(--border) / 0.06)" }}
              role="tablist"
              aria-label="About sections"
            >
              {["Skills", "Education", "Certifications"].map((tab) => (
                <button
                  key={tab.toLowerCase()}
                  role="tab"
                  aria-selected={activeTab === tab.toLowerCase()}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`tab-underline pb-3 text-sm font-medium transition-colors focus-ring ${
                    activeTab === tab.toLowerCase() ? "active" : ""
                  }`}
                  style={{
                    color:
                      activeTab === tab.toLowerCase()
                        ? "rgb(var(--accent))"
                        : "rgb(var(--text-2))",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div ref={tabContentRef} className="mt-6 min-h-[200px]">
              {activeTab === "skills" && (
                <div className="space-y-7">
                  {groups.map((group) => {
                    const gSkills = skills.filter((s) => s.group === group);
                    return (
                      <div key={group}>
                        <div className="mb-3 flex items-center gap-3">
                          <p
                            className="text-[10px] font-bold uppercase tracking-[0.15em]"
                            style={{ color: "rgb(var(--text-3))" }}
                          >
                            {group}
                          </p>
                          <div
                            className="flex-1 h-px"
                            style={{
                              background:
                                "linear-gradient(90deg, rgb(var(--border) / 0.1), transparent)",
                            }}
                          />
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {gSkills.map((s) => (
                            <span
                              key={s.name}
                              className="skill-chip inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] cursor-default"
                              style={{
                                background: "rgb(var(--bg-card))",
                                border: "1px solid rgb(var(--border) / 0.08)",
                                color: "rgb(var(--text-1))",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = s.color;
                                e.currentTarget.style.background =
                                  "rgb(var(--bg-card-hover))";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor =
                                  "rgb(var(--border) / 0.08)";
                                e.currentTarget.style.background =
                                  "rgb(var(--bg-card))";
                              }}
                            >
                              <img
                                src={`https://cdn.simpleicons.org/${s.icon}/${s.color.slice(1)}`}
                                alt={s.name}
                                width="16"
                                height="16"
                                className="shrink-0"
                                loading="lazy"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                              />
                              {s.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {activeTab === "education" && (
                <div className="space-y-0">
                  {educationData.map((ed, i) => (
                    <div
                      key={ed.school}
                      className="relative pl-6 pb-6 last:pb-0"
                    >
                      <div className="tl-dot absolute left-0" />
                      {i < educationData.length - 1 && (
                        <div className="tl-line" />
                      )}
                      <p
                        className="font-display text-sm font-bold"
                        style={{ color: "rgb(var(--accent))" }}
                      >
                        {ed.period}
                      </p>
                      <p
                        className="mt-1 font-medium"
                        style={{ color: "rgb(var(--text-1))" }}
                      >
                        {ed.school}
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: "rgb(var(--text-2))" }}
                      >
                        {ed.major}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "certifications" && (
                <div className="max-h-64 overflow-y-auto pr-2 space-y-0">
                  {certs.map((cert, i) => (
                    <div key={cert} className="relative pl-6 pb-4 last:pb-0">
                      <div
                        className="tl-dot absolute left-0"
                        style={{
                          width: 6,
                          height: 6,
                          background: "rgb(var(--cyan))",
                        }}
                      />
                      {i < certs.length - 1 && <div className="tl-line" />}
                      <p
                        className="text-sm"
                        style={{ color: "rgb(var(--text-2))" }}
                      >
                        {cert}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
