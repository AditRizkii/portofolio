"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseGsapStaggerOptions {
  y?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  disabled?: boolean;
}

export function useGsapStagger<T extends HTMLElement>(
  options: UseGsapStaggerOptions = {}
) {
  const ref = useRef<T>(null!);

  useEffect(() => {
    if (options.disabled || !ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const {
      y = 40,
      duration = 0.6,
      stagger = 0.08,
      start = "top 85%",
    } = options;

    const ctx = gsap.context(() => {
      gsap.from(ref.current.children, {
        scrollTrigger: {
          trigger: ref.current,
          start,
          toggleActions: "play none none none",
        },
        y,
        opacity: 0,
        duration,
        stagger,
        ease: "power2.out",
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
}
