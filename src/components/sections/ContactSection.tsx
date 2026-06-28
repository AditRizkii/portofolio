"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const [sent, setSent] = useState(false);
  const sectionRef = useRef<HTMLElement>(null!);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const subject = (form.elements.namedItem("subject") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
    const mailto = `mailto:adityarizkiramadhan2@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${email}\n\n${message}`)}`;
    window.location.href = mailto;
    setSent(true);
  };

  return (
    <section ref={sectionRef} id="contact" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <h2
          className="font-display text-display-2 font-bold"
          style={{ color: "rgb(var(--text-1))" }}
        >
          Get in Touch
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
          <div className="space-y-6">
            <p className="text-base leading-relaxed" style={{ color: "rgb(var(--text-2))", lineHeight: "1.8" }}>
              I&apos;m currently looking for new opportunities. Whether you have
              a question or just want to say hi, I&apos;ll try my best to get
              back to you.
            </p>

            <Link
              href="mailto:adityarizkiramadhan2@gmail.com"
              className="block font-display text-xl font-semibold transition-colors focus-ring"
              style={{ color: "rgb(var(--accent))" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "rgb(var(--cyan))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgb(var(--accent))";
              }}
            >
              adityarizkiramadhan2@gmail.com
            </Link>

            <div className="flex gap-4 pt-2">
              <Link
                href="https://github.com/AditRizkii"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200 hover:scale-110 focus-ring"
                style={{
                  border: "1px solid rgb(var(--border) / 0.1)",
                  color: "rgb(var(--text-2))",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgb(var(--accent) / 0.4)";
                  e.currentTarget.style.color = "rgb(var(--accent))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgb(var(--border) / 0.1)";
                  e.currentTarget.style.color = "rgb(var(--text-2))";
                }}
                aria-label="GitHub profile"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </Link>
              <Link
                href="https://www.linkedin.com/in/aditrizkii/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200 hover:scale-110 focus-ring"
                style={{
                  border: "1px solid rgb(var(--border) / 0.1)",
                  color: "rgb(var(--text-2))",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgb(var(--accent) / 0.4)";
                  e.currentTarget.style.color = "rgb(var(--accent))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgb(var(--border) / 0.1)";
                  e.currentTarget.style.color = "rgb(var(--text-2))";
                }}
                aria-label="LinkedIn profile"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Link>
            </div>
          </div>

          <div>
            {sent ? (
              <div
                className="rounded-xl p-8 text-center"
                style={{
                  border: "1px solid rgb(var(--accent) / 0.2)",
                  background: "rgb(var(--accent) / 0.05)",
                }}
                role="alert"
                aria-live="polite"
              >
                <p className="font-medium" style={{ color: "rgb(var(--accent))" }}>
                  Your email client opened!
                </p>
                <p className="mt-2 text-sm" style={{ color: "rgb(var(--text-2))" }}>
                  Thanks for reaching out &mdash; hit send and I&apos;ll get back to you soon.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-4 text-sm font-medium transition-colors focus-ring"
                  style={{ color: "rgb(var(--accent))" }}
                  onMouseEnter={(e) => { e.currentTarget.style.textDecoration = "underline"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.textDecoration = "none"; }}
                >
                  Compose another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1 block text-[10px] font-medium uppercase tracking-[0.15em]"
                    style={{ color: "rgb(var(--text-2))" }}
                  >
                    Your email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="adit@example.com"
                    className="input-underline"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-1 block text-[10px] font-medium uppercase tracking-[0.15em]"
                    style={{ color: "rgb(var(--text-2))" }}
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    placeholder="Just saying hi"
                    className="input-underline"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1 block text-[10px] font-medium uppercase tracking-[0.15em]"
                    style={{ color: "rgb(var(--text-2))" }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    required
                    placeholder="Let&apos;s talk about..."
                    className="input-underline resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-all duration-200 hover:scale-[1.02] focus-ring"
                  style={{
                    background: "rgb(var(--accent))",
                    color: "#fff",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 24px rgb(var(--accent-glow) / 0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
