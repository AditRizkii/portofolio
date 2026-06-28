// hooks/useScrollReveal.ts
"use client";

import { useEffect, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  selector: string;
  start?: string;
  y?: number;
  stagger?: number;
  duration?: number;
}

export function useScrollReveal(
  triggerRef: RefObject<HTMLElement>,
  options: ScrollRevealOptions,
) {
  const {
    selector,
    start = "top 85%",
    y = 30,
    stagger = 0.1,
    duration = 0.6,
  } = options;

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced || !triggerRef.current) return;

    const targets = triggerRef.current.querySelectorAll(selector);
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        scrollTrigger: {
          trigger: triggerRef.current,
          start,
          toggleActions: "play none none none",
        },
        y,
        opacity: 0,
        stagger,
        duration,
        ease: "power2.out",
        onComplete: () => {
          // safety net — pastikan tidak pernah nyangkut di opacity 0
          gsap.set(targets, { opacity: 1, y: 0, clearProps: "transform" });
        },
      });
    }, triggerRef);

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    const t = setTimeout(() => ScrollTrigger.refresh(), 500);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
      ctx.revert();
    };
  }, [triggerRef, selector, start, y, stagger, duration]);
}
