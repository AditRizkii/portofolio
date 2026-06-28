"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import Link from "next/link";
import heroAnimation from "@/data/hero-animation.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const roles = [
  "Web Developer",
  "UI/UX Designer",
  "Full Stack Developer",
];

function useTypewriter(words: string[], typingSpeed = 80, deleteSpeed = 40, pauseDuration = 2000) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(currentWord.slice(0, text.length + 1));
          if (text.length === currentWord.length) {
            setTimeout(() => setIsDeleting(true), pauseDuration);
          }
        } else {
          setText(currentWord.slice(0, text.length - 1));
          if (text.length === 0) {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? deleteSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, wordIndex, isDeleting]);

  return text;
}

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null!);
  const headlineRef = useRef<HTMLHeadingElement>(null!);
  const subtitleRef = useRef<HTMLParagraphElement>(null!);
  const ctaRef = useRef<HTMLDivElement>(null!);
  const visualRef = useRef<HTMLDivElement>(null!);
  const roleText = useTypewriter(roles);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(headlineRef.current, { y: 60, opacity: 0, duration: 0.8 })
        .from(subtitleRef.current, { y: 30, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(visualRef.current, { scale: 0.8, opacity: 0, duration: 0.8 }, "-=0.5");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[calc(100vh-4rem)] flex items-center"
    >
      {/* Signature animation: morphing gradient glow behind hero */}
      {/* This creates a slow, atmospheric light shift that draws attention to the primary CTA */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute -top-40 -right-40 h-[500px] w-[500px] animate-gradient-shift rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, var(--color-accent), var(--color-accent-secondary), transparent)",
            backgroundSize: "200% 200%",
          }}
        />
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-12 lg:px-8 lg:py-32">
        <div className="lg:col-span-7">
          <h1
            ref={headlineRef}
            className="font-display text-4xl font-bold leading-tight tracking-tight text-text-primary sm:text-5xl lg:text-7xl"
          >
            <span className="block">Hello, I&apos;m</span>
            <span className="gradient-text">Aditya Rizki</span>
            <span className="block mt-2 text-2xl sm:text-3xl lg:text-4xl text-text-muted">
              {roleText}
              <span className="ml-0.5 inline-block h-[1em] w-[3px] animate-pulse bg-accent align-middle" />
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="mt-6 max-w-lg text-base leading-relaxed text-text-muted sm:text-lg"
          >
            Informatics student at Universitas Syiah Kuala. Passionate about
            building web and mobile experiences that make an impact.
          </p>

          <div ref={ctaRef} className="mt-8 flex flex-wrap gap-4">
            <Link
              href="#contact"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-accent to-accent-secondary px-8 py-3 text-sm font-medium text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] focus-ring"
            >
              Hire Me
            </Link>
            <Link
              href="/cv/CV_AdityaRizkiRamadhan.pdf"
              className="inline-flex items-center rounded-full border border-border px-8 py-3 text-sm font-medium text-text-primary transition-all duration-200 hover:border-accent hover:text-accent focus-ring"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download CV
            </Link>
          </div>
        </div>

        <div
          ref={visualRef}
          className="flex justify-center lg:col-span-5"
        >
          <div className="relative h-64 w-64 sm:h-80 sm:w-80 lg:h-96 lg:w-96">
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/20 to-accent-secondary/20 blur-2xl"
            />
            <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-border">
              {/* ponytail: using Lottie for the hero visual - the animation JSON is already in the project */}
              <Lottie
                animationData={heroAnimation}
                loop
                className="h-full w-full"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
