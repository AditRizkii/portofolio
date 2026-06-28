"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGsapCounter(
  elRef: React.RefObject<HTMLSpanElement | null>,
  target: number,
  startTrigger: React.RefObject<HTMLElement | null>
) {
  useEffect(() => {
    if (!elRef.current || !startTrigger.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const obj = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: target,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: startTrigger.current!,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          if (elRef.current) {
            elRef.current.textContent = Math.floor(obj.val).toString();
          }
        },
      });
    });

    return () => ctx.revert();
  }, [target]);
}
