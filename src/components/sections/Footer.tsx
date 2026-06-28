import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="border-t py-8"
      style={{ borderColor: "rgb(var(--border) / 0.06)" }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row lg:px-8">
        <span
          className="flex items-center gap-2 font-display text-sm font-bold"
          style={{ color: "rgb(var(--text-1))" }}
        >
          <span
            className="inline-block w-2 h-2 rotate-45"
            style={{ background: "rgb(var(--accent))" }}
            aria-hidden="true"
          />
          Aditya Rizki Ramadhan
        </span>
        <p className="text-xs" style={{ color: "rgb(var(--text-3))" }}>
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
        <div className="flex gap-5">
          <Link
            href="https://github.com/AditRizkii"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium transition-colors focus-ring"
            style={{ color: "rgb(var(--text-3))" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "rgb(var(--accent))"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgb(var(--text-3))"; }}
          >
            GitHub
          </Link>
          <Link
            href="https://www.linkedin.com/in/aditrizkii/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium transition-colors focus-ring"
            style={{ color: "rgb(var(--text-3))" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "rgb(var(--accent))"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgb(var(--text-3))"; }}
          >
            LinkedIn
          </Link>
        </div>
      </div>
    </footer>
  );
}
