"use client";

import { useState, useTransition } from "react";
import dynamic from "next/dynamic";
import aboutAnimation from "@/data/about-animation.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import type { TabData } from "@/types";

const tabData: TabData[] = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="space-y-2">
        {["Node.js", "MySQL", "MongoDB", "JavaScript", "ReactJS", "NextJS", "Kotlin"].map(
          (skill) => (
            <li key={skill} className="flex items-center gap-2 text-text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {skill}
            </li>
          )
        )}
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="space-y-3">
        <li>
          <p className="font-medium text-text-primary">
            University of Syiah Kuala
          </p>
          <p className="text-sm text-text-muted">Banda Aceh, Informatics</p>
        </li>
        <li>
          <p className="font-medium text-text-primary">
            BANGKIT 2024 Batch 6
          </p>
          <p className="text-sm text-text-muted">Cohort</p>
        </li>
      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <ul className="space-y-2">
        {[
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
        ].map((cert) => (
          <li key={cert} className="flex items-start gap-2 text-sm text-text-muted">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-secondary" />
            {cert}
          </li>
        ))}
      </ul>
    ),
  },
];

export function AboutSection() {
  const [activeTab, setActiveTab] = useState("skills");
  const [, startTransition] = useTransition();
  const sectionRef = useScrollReveal<HTMLElement>({ y: 30 });

  const handleTabChange = (id: string) => {
    startTransition(() => setActiveTab(id));
  };

  const activeContent = tabData.find((t) => t.id === activeTab)?.content;

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          About Me
        </h2>
        <span className="signature-line mt-3" />

        <div className="mt-12 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex justify-center">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/10 to-accent-secondary/10 blur-xl"
              />
              <Lottie
                animationData={aboutAnimation}
                className="relative h-72 w-72 sm:h-96 sm:w-96"
                aria-hidden="true"
              />
            </div>
          </div>

          <div>
            <p className="text-base leading-relaxed text-text-muted sm:text-lg">
              I am a full stack web developer with a passion for creating
              interactive and responsive web applications. I have experience
              working with JavaScript, React, Node.js, MySQL, HTML, CSS, and
              Git. I am a quick learner and I am always looking to expand my
              knowledge and skill set.
            </p>

            <div
              className="mt-8 flex gap-6 border-b border-border"
              role="tablist"
              aria-label="About sections"
            >
              {tabData.map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={cn(
                    "relative pb-3 text-sm font-medium transition-colors focus-ring",
                    activeTab === tab.id
                      ? "text-accent"
                      : "text-text-muted hover:text-text-primary"
                  )}
                >
                  {tab.title}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
                  )}
                </button>
              ))}
            </div>

            <div
              className="mt-6 min-h-[160px]"
              role="tabpanel"
              aria-label={`${activeTab} content`}
            >
              {activeContent}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
