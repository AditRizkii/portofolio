"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface UseScrollRevealOptions {
  y?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  start?: string;
  toggleActions?: string;
  trigger?: Element;
  disabled?: boolean;
}

export function useScrollReveal<T extends HTMLElement>(
  options: UseScrollRevealOptions = {}
) {
  const ref = useRef<T>(null!);

  useEffect(() => {
    if (options.disabled) return;
    if (!ref.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const {
      y = 30,
      duration = 0.7,
      delay = 0,
      stagger,
      start = "top 85%",
      toggleActions = "play none none none",
    } = options;

    const ctx = gsap.context(() => {
      const targets = stagger ? ref.current.children : ref.current;

      gsap.from(targets, {
        scrollTrigger: {
          trigger: options.trigger || ref.current,
          start,
          toggleActions,
        },
        y,
        opacity: 0,
        duration,
        delay,
        stagger,
        ease: "power2.out",
        overwrite: "auto",
      });
    }, ref);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
