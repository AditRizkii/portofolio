"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface UsePageEntranceOptions {
  duration?: number;
  stagger?: number;
  y?: number;
}

export function usePageEntrance<T extends HTMLElement>(
  options: UsePageEntranceOptions = {}
) {
  const ref = useRef<T>(null!);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;
    if (!ref.current) return;

    const { duration = 0.7, stagger = 0.12, y = 40 } = options;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(ref.current.children, {
        y,
        opacity: 0,
        duration,
        stagger,
      });
    }, ref);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
