"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { CodeRain } from "./CodeRain";
import { Terminal } from "./Terminal";

const roles = [
  "Full Stack Developer",
  "Backend Developer",
  "Frontend Developer",
];
const TYPING_SPEED = 80;
const DELETING_SPEED = 40;
const PAUSE = 2000;

interface HeroSectionProps {
  onCvOpen?: () => void;
}

export function HeroSection({ onCvOpen }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null!);
  const eyebrowRef = useRef<HTMLDivElement>(null!);
  const helloRef = useRef<HTMLSpanElement>(null!);
  const nameRef = useRef<HTMLHeadingElement>(null!);
  const roleRef = useRef<HTMLSpanElement>(null!);
  const descRef = useRef<HTMLParagraphElement>(null!);
  const ctaRef = useRef<HTMLDivElement>(null!);
  const socialRef = useRef<HTMLDivElement>(null!);
  const terminalRef = useRef<HTMLDivElement>(null!);
  const badgesRef = useRef<HTMLDivElement>(null!);
  const [roleText, setRoleText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // ── Typewriter effect ──
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (roleText.length < currentRole.length) {
        timer = setTimeout(() => {
          setRoleText(currentRole.slice(0, roleText.length + 1));
        }, TYPING_SPEED);
      } else {
        timer = setTimeout(() => setIsDeleting(true), PAUSE);
      }
    } else {
      if (roleText.length > 0) {
        timer = setTimeout(() => {
          setRoleText(roleText.slice(0, -1));
        }, DELETING_SPEED);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timer);
  }, [roleText, roleIndex, isDeleting]);

  // ── GSAP entrance ──
  const ctxRef = useRef<gsap.Context | null>(null);
  const animate = useCallback(() => {
    if (ctxRef.current) ctxRef.current.revert();

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    ctxRef.current = gsap.context(() => {
      if (prefersReduced) {
        [
          eyebrowRef,
          helloRef,
          nameRef,
          roleRef,
          descRef,
          ctaRef,
          socialRef,
          terminalRef,
          badgesRef,
        ].forEach((r) => {
          if (r.current) gsap.set(r.current, { opacity: 1, x: 0, y: 0 });
        });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(eyebrowRef.current, { y: 30, opacity: 0, duration: 0.6 })
        .from(helloRef.current, { y: 30, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(nameRef.current, { y: 30, opacity: 0, duration: 0.6 }, "-=0.15")
        .from(roleRef.current, { y: 20, opacity: 0, duration: 0.5 }, "-=0.2")
        .from(descRef.current, { y: 20, opacity: 0, duration: 0.5 }, "-=0.15")
        .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.4 }, "-=0.1")
        .from(socialRef.current, { y: 20, opacity: 0, duration: 0.4 }, "-=0.1")
        .from(
          terminalRef.current,
          { x: 60, opacity: 0, duration: 0.7 },
          "-=0.4",
        );

      if (badgesRef.current) {
        tl.from(
          badgesRef.current.children,
          { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 },
          "-=0.3",
        );
      }
    }, containerRef);
  }, []);

  useEffect(() => {
    animate();
    return () => ctxRef.current?.revert();
  }, [animate]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Code rain background */}
      <div className="absolute inset-0 z-0">
        <CodeRain />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 py-28 lg:grid-cols-12 lg:px-8 lg:py-36">
        {/* Left */}
        <div className="lg:col-span-6">
          <div
            ref={eyebrowRef}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{
              background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(34,197,94,0.2)",
              color: "#22C55E",
            }}
          >
            <span className="availability-dot" />
            Open to work
          </div>

          <span
            ref={helloRef}
            className="block mt-8 text-lg"
            style={{ color: "rgb(var(--text-2))" }}
          >
            Hello, I&apos;m
          </span>

          <h1
            ref={nameRef}
            className="font-display text-display-1 font-extrabold tracking-tight"
            style={{ color: "rgb(var(--text-1))" }}
          >
            Aditya Rizki
          </h1>

          <span
            ref={roleRef}
            className="inline-block mt-1 font-display text-xl font-semibold sm:text-2xl min-h-[2rem]"
            style={{ color: "rgb(var(--accent))" }}
          >
            {roleText}
            <span
              className="inline-block w-[3px] h-[1.1em] ml-0.5 align-middle animate-pulse"
              style={{ background: "rgb(var(--accent))" }}
            />
          </span>

          <p
            ref={descRef}
            className="mt-4 max-w-lg text-base leading-relaxed"
            style={{ color: "rgb(var(--text-2))", lineHeight: "1.8" }}
          >
            Informatics student at Universitas Syiah Kuala. I build full-stack
            web and mobile experiences with clean design and thoughtful
            engineering.
          </p>

          <div ref={ctaRef} className="mt-8 flex flex-wrap gap-4">
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg px-7 py-3 text-sm font-medium transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] focus-ring"
              style={{
                background: "rgb(var(--accent))",
                color: "#fff",
                boxShadow: "0 0 0 0 rgb(var(--accent-glow) / 0.4)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 24px rgb(var(--accent-glow) / 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 0 0 0 transparent";
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Hire Me
            </Link>
            <button
              onClick={onCvOpen}
              className="inline-flex items-center gap-2 rounded-lg border px-7 py-3 text-sm font-medium transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] focus-ring"
              style={{
                borderColor: "rgb(var(--border-bright))",
                color: "rgb(var(--text-1))",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgb(var(--bg-card))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              View CV
            </button>
          </div>

          <div ref={socialRef} className="mt-8 flex items-center gap-4">
            <Link
              href="https://github.com/AditRizkii"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[rgb(var(--accent))] focus-ring"
              style={{ color: "rgb(var(--text-2))" }}
              aria-label="GitHub"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </Link>
            <Link
              href="https://www.linkedin.com/in/aditrizkii/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[rgb(var(--accent))] focus-ring"
              style={{ color: "rgb(var(--text-2))" }}
              aria-label="LinkedIn"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Right: Terminal + floating badges */}
        <div className="lg:col-span-6 relative flex justify-center">
          <div ref={terminalRef} className="w-full max-w-md relative">
            <Terminal />

            {/* Floating badges */}
            <div ref={badgesRef} className="hidden sm:block">
              <div
                className="float-badge"
                style={{ top: "-16px", right: "-24px", rotate: "-8deg" }}
              >
                React ⚛
              </div>
              <div
                className="float-badge"
                style={{ bottom: "-12px", left: "-20px", rotate: "6deg" }}
              >
                Node.js 🟢
              </div>
              <div
                className="float-badge"
                style={{ bottom: "40px", right: "-16px", rotate: "-4deg" }}
              >
                Figma 🎨
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgb(var(--accent) / 0.5), transparent)",
        }}
      />
    </section>
  );
}
