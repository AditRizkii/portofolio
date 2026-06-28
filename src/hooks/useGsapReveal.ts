"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseGsapRevealOptions {
  from?: gsap.TweenVars;
  scrollTrigger?: ScrollTrigger.Vars;
  disabled?: boolean;
}

export function useGsapReveal<T extends HTMLElement>(
  options: UseGsapRevealOptions = {}
) {
  const ref = useRef<T>(null!);

  useEffect(() => {
    if (options.disabled || !ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        ...options.from,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none none",
          ...options.scrollTrigger,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
}
