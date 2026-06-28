"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const codeLines = [
  { text: "", cls: "tk-comment", delay: 0.1 },
  { text: "const developer = {", cls: "", delay: 0 },
  { text: '  name: "Aditya Rizki",', cls: "", delay: 0 },
  { text: '  role: ["UI/UX Designer", "Full Stack Dev"],', cls: "", delay: 0 },
  { text: '  stack: ["React", "Next.js", "Node.js"],', cls: "", delay: 0 },
  { text: '  database: ["MySQL", "MongoDB"],', cls: "", delay: 0 },
  { text: '  mobile: ["Kotlin"],', cls: "", delay: 0 },
  { text: '  status: "available ✓",', cls: "", delay: 0 },
  { text: '  university: "Unsyiah · Informatika",', cls: "", delay: 0 },
  { text: "}", cls: "", delay: 0 },
];

export function Terminal() {
  const containerRef = useRef<HTMLDivElement>(null!);
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      linesRef.current.forEach((el, i) => {
        if (!el) return;
        const line = codeLines[i];
        const chars = line.text.split("");
        el.innerHTML = "";

        if (prefersReduced) {
          el.innerHTML = syntaxHighlight(line.text);
          el.style.opacity = "1";
          return;
        }

        // Type each character
        const charSpans = chars.map((ch) => {
          const span = document.createElement("span");
          span.textContent = ch;
          span.style.opacity = "0";
          el.appendChild(span);
          return span;
        });

        tl.to(charSpans, {
          opacity: 1,
          duration: 0.03,
          stagger: 0.025,
          ease: "none",
        });

        tl.to(el, { opacity: 1, duration: 0.01 }, "+=0.05");

        if (i === codeLines.length - 1) {
          tl.to({}, { duration: 0.3 });
        } else {
          tl.to({}, { duration: 0.5 });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="terminal-window w-full max-w-md">
      <div className="terminal-header">
        <span className="terminal-dot" style={{ background: "#ff5f57" }} />
        <span className="terminal-dot" style={{ background: "#febc2e" }} />
        <span className="terminal-dot" style={{ background: "#28c840" }} />
        <span
          className="ml-3 text-xs font-mono"
          style={{ color: "rgb(var(--text-3))" }}
        >
          aditya.config.js
        </span>
      </div>
      <div className="terminal-body">
        {codeLines.map((line, i) => (
          <div
            key={i}
            ref={(el) => { linesRef.current[i] = el; }}
            className="terminal-line"
            style={{ minHeight: "1.5em" }}
          >
            {line.cls === "tk-comment" ? (
              <span className="tk-comment">{'// developer profile'}</span>
            ) : null}
          </div>
        ))}
        <div className="flex items-center gap-1 mt-1">
          <span className="tk-punct">▸</span>
          <span className="terminal-cursor" />
        </div>
      </div>
    </div>
  );
}

function syntaxHighlight(line: string): string {
  return line
    .replace(/\b(const|let|return|function)\b/g, '<span class="tk-keyword">$1</span>')
    .replace(/"([^"]+)"/g, '<span class="tk-string">"$1"</span>')
    .replace(/(\{|\[|\]|\})/g, '<span class="tk-punct">$1</span>')
    .replace(/\b(true|false)\b/g, '<span class="tk-value">$1</span>');
}
