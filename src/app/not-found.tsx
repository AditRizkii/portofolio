import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-6"
      style={{ background: "rgb(var(--bg-base))" }}
    >
      <span
        className="font-display text-[clamp(6rem,15vw,10rem)] font-extrabold leading-none"
        style={{ color: "rgb(var(--accent) / 0.15)" }}
      >
        404
      </span>
      <h1
        className="mt-4 font-display text-2xl font-bold md:text-3xl"
        style={{ color: "rgb(var(--text-1))" }}
      >
        Page not found
      </h1>
      <p
        className="mt-2 max-w-sm text-center text-sm"
        style={{ color: "rgb(var(--text-2))" }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-all duration-200 hover:scale-[1.02] focus-ring"
        style={{
          background: "rgb(var(--accent))",
          color: "#fff",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        Back to Home
      </Link>
    </div>
  );
}
