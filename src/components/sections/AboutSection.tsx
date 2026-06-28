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
    name: "JavaScript",
    icon: "javascript",
    color: "#F7DF1E",
    group: "Frontend",
  },
  {
    name: "TypeScript",
    icon: "typescript",
    color: "#3178C6",
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
    period: "2022 — Present",
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

interface SkillCardProps {
  name: string;
  icon: string;
  color: string;
}

function SkillCard({ name, icon, color }: SkillCardProps) {
  return (
    <div
      className="skill-card group"
      style={
        {
          "--hover-color": color,
        } as React.CSSProperties
      }
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = color;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "";
      }}
    >
      <img
        src={`https://cdn.simpleicons.org/${icon}/${color.slice(1)}`}
        alt={name}
        width="32"
        height="32"
        loading="lazy"
      />
      <span
        className="text-xs font-medium text-center leading-tight"
        style={{ color: "rgb(var(--text-2))" }}
      >
        {name}
      </span>
    </div>
  );
}

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
    const ctx = gsap.context(() => {
      gsap.from(tabContentRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.3,
        ease: "power2.out",
      });
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
          {/* Left: Personal Card */}
          <div ref={leftRef} className="lg:col-span-4">
            <div
              className="rounded-2xl p-8"
              style={{
                background: "rgb(var(--bg-card))",
                border: "1px solid rgb(var(--border-bright))",
                boxShadow: "0 0 80px rgb(var(--accent-glow) / 0.08)",
              }}
            >
              <div
                className="flex h-[120px] w-[120px] items-center justify-center rounded-2xl mx-auto lg:mx-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgb(var(--accent)), rgb(var(--cyan)))",
                }}
              >
                <span className="font-display text-4xl font-extrabold text-white">
                  AR
                </span>
              </div>

              <h3
                className="mt-5 font-display text-lg font-bold"
                style={{ color: "rgb(var(--text-1))" }}
              >
                Aditya Rizki Ramadhan
              </h3>
              <p className="text-sm" style={{ color: "rgb(var(--text-2))" }}>
                Full Stack Developer &amp; Backend Developer &amp; Frontend
                Developer
              </p>
              <p
                className="mt-0.5 text-xs italic"
                style={{ color: "rgb(var(--text-3))" }}
              >
                Unsyiah · Informatics
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {["React", "Node.js", "Figma"].map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium"
                    style={{
                      background: "rgb(var(--accent-dim))",
                      border: "1px solid rgb(var(--accent) / 0.2)",
                      color: "rgb(var(--text-1))",
                    }}
                  >
                    <img
                      src={`https://cdn.simpleicons.org/${s.toLowerCase() === "node.js" ? "nodedotjs" : s.toLowerCase() === "figma" ? "figma" : "react"}`}
                      alt=""
                      width="12"
                      height="12"
                    />
                    {s}
                  </span>
                ))}
              </div>

              <div
                className="mt-5 pt-5 flex items-center gap-3"
                style={{ borderTop: "1px solid rgb(var(--border) / 0.06)" }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: "rgb(var(--text-3))" }}
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span
                  className="text-xs"
                  style={{ color: "rgb(var(--text-3))" }}
                >
                  adityarizkiramadhan2@gmail.com
                </span>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div ref={rightRef} className="lg:col-span-8">
            <p
              className="text-base leading-relaxed"
              style={{ color: "rgb(var(--text-2))", lineHeight: "1.8" }}
            >
              I am a full stack web developer with a passion for creating
              interactive and responsive web applications. I have experience
              working with JavaScript, React, Node.js, MySQL, HTML, CSS, and
              Git. I am a quick learner and always looking to expand my skill
              set.
            </p>

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
                <div className="space-y-8">
                  {groups.map((group) => {
                    const gSkills = skills.filter((s) => s.group === group);
                    return (
                      <div key={group}>
                        <p
                          className="mb-3 text-[10px] font-bold uppercase tracking-[0.15em]"
                          style={{ color: "rgb(var(--text-3))" }}
                        >
                          {group}
                        </p>
                        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2.5">
                          {gSkills.map((s) => (
                            <SkillCard key={s.name} {...s} />
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
