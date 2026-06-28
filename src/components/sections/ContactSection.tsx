"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type FormStatus = "idle" | "sending" | "success" | "error";

export function ContactSection() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const sectionRef = useScrollReveal<HTMLElement>({ y: 20 });
  const formRef = useRef<HTMLFormElement>(null!);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      email: form.email.value,
      subject: form.subject.value,
      message: form.message.value,
    };

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        const err = await response.json();
        setErrorMessage(err.error?.message || "Failed to send message");
        setStatus("error");
      }
    } catch {
      setErrorMessage("Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Get in Touch
        </h2>
        <span className="signature-line mt-3" />

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: intro + socials */}
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-text-muted sm:text-lg">
              I&apos;m currently looking for new opportunities. Whether you have
              a question or just want to say hi, I&apos;ll try my best to get
              back to you.
            </p>

            <div className="flex gap-4">
              <Link
                href="https://github.com/AditRizkii"
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-accent hover:text-accent"
                aria-label="GitHub profile"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link
                href="https://www.linkedin.com/in/aditrizkii/"
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-accent hover:text-accent"
                aria-label="LinkedIn profile"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right: form */}
          <div>
            {status === "success" ? (
              <div
                className="rounded-xl border border-accent/30 bg-accent/5 p-8 text-center"
                role="alert"
                aria-live="polite"
              >
                <p className="font-medium text-accent">
                  Message sent successfully!
                </p>
                <p className="mt-2 text-sm text-text-muted">
                  Thanks for reaching out — I&apos;ll get back to you soon.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-4 text-sm font-medium text-accent hover:underline focus-ring"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-text-primary"
                  >
                    Your email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="adit@example.com"
                    disabled={status === "sending"}
                    className="focus-ring w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text-primary placeholder-text-muted/50 transition-colors disabled:opacity-50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-medium text-text-primary"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    placeholder="Just saying hi"
                    disabled={status === "sending"}
                    className="focus-ring w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text-primary placeholder-text-muted/50 transition-colors disabled:opacity-50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-text-primary"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Let&apos;s talk about..."
                    disabled={status === "sending"}
                    className="focus-ring w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text-primary placeholder-text-muted/50 transition-colors resize-y disabled:opacity-50"
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-500" role="alert">
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="focus-ring inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-accent to-accent-secondary px-8 py-3 text-sm font-medium text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === "sending" ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="h-4 w-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
