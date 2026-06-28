"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";

export function Footer() {
  const ref = useRef<HTMLElement>(null!);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 95%",
          toggleActions: "play none none none",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={ref}
      className="border-t border-border"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row lg:px-8">
        <span className="text-sm font-medium text-text-primary">
          Aditya Rizki Ramadhan
        </span>
        <p className="text-sm text-text-muted">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link
            href="https://github.com/AditRizkii"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-muted transition-colors hover:text-accent"
          >
            GitHub
          </Link>
          <Link
            href="https://www.linkedin.com/in/aditrizkii/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-muted transition-colors hover:text-accent"
          >
            LinkedIn
          </Link>
        </div>
      </div>
    </footer>
  );
}
