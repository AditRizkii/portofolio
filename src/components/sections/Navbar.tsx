"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";

const navLinks = [
  { title: "About", path: "#about" },
  { title: "Work", path: "#projects" },
  { title: "Contact", path: "#contact" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const navRef = useRef<HTMLElement>(null!);
  const lastScroll = useRef(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (!prefersReduced) {
        gsap.from(navRef.current, {
          y: -60,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.1,
        });
      }
    }, navRef);

    const handleScroll = () => {
      const current = window.scrollY;
      if (current > 100 && current > lastScroll.current) {
        if (!hidden) {
          setHidden(true);
          if (!prefersReduced) {
            gsap.to(navRef.current, {
              y: -100,
              opacity: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        }
      } else if (current < lastScroll.current) {
        if (hidden) {
          setHidden(false);
          if (!prefersReduced) {
            gsap.to(navRef.current, {
              y: 0,
              opacity: 1,
              duration: 0.4,
              ease: "power2.out",
            });
          } else {
            navRef.current.style.transform = "";
            navRef.current.style.opacity = "";
          }
        }
      }
      lastScroll.current = current;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      ctx.revert();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hidden]);

  useEffect(() => {
    const sectionIds = ["about", "projects", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path.startsWith("#")) {
      e.preventDefault();
      const id = path.slice(1);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  };

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(8,8,16,0.8)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: "1px solid rgb(var(--border) / 0.06)",
      }}
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display text-lg font-bold text-[rgb(var(--text-1))] transition-colors hover:text-[rgb(var(--accent))]"
        >
          <span
            className="inline-block w-2 h-2 rotate-45"
            style={{ background: "rgb(var(--accent))" }}
            aria-hidden="true"
          />
          Aditya Rizki
        </Link>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={(e) => handleClick(e, link.path)}
                className={cn(
                  "nav-link text-sm font-medium transition-colors",
                  activeSection === link.path.slice(1)
                    ? "text-[rgb(var(--accent))] active"
                    : "text-[rgb(var(--text-2))] hover:text-[rgb(var(--text-1))]"
                )}
              >
                {link.title}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={(e) => handleClick(e, "#contact")}
              className="inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-[1.02] focus-ring"
              style={{
                borderColor: "rgb(var(--accent) / 0.4)",
                color: "rgb(var(--accent))",
              }}
            >
              Let&apos;s Talk
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center justify-center rounded-md p-2 md:hidden focus-ring"
            style={{ color: "rgb(var(--text-2))" }}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              {mobileOpen ? (
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              ) : (
                <path d="M3 4.75A.75.75 0 013.75 4h12.5a.75.75 0 010 1.5H3.75A.75.75 0 013 4.75zM3 9.25a.75.75 0 01.75-.75h12.5a.75.75 0 010 1.5H3.75A.75.75 0 013 9.25zM3 13.75a.75.75 0 01.75-.75h12.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div style={{ borderTop: "1px solid rgb(var(--border) / 0.06)", background: "rgb(var(--bg-base) / 0.98)" }}>
          <ul className="flex flex-col px-6 py-4 md:hidden">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  onClick={(e) => {
                    handleClick(e, link.path);
                  }}
                  className={cn(
                    "nav-link block py-3 text-sm font-medium",
                    activeSection === link.path.slice(1)
                      ? "text-[rgb(var(--accent))] active"
                      : "text-[rgb(var(--text-2))]"
                  )}
                >
                  {link.title}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="#contact"
                onClick={(e) => handleClick(e, "#contact")}
                className="inline-flex items-center gap-1.5 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors"
                style={{
                  borderColor: "rgb(var(--accent) / 0.4)",
                  color: "rgb(var(--accent))",
                }}
              >
                Let&apos;s Talk
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
