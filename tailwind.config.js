/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        base: "rgb(var(--bg-base) / <alpha-value>)",
        layer: "rgb(var(--bg-layer) / <alpha-value>)",
        card: "rgb(var(--bg-card) / <alpha-value>)",
        "card-hover": "rgb(var(--bg-card-hover) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-dim": "rgb(var(--accent-dim) / 0.15)",
        "accent-glow": "rgb(var(--accent-glow) / <alpha-value>)",
        cyan: "rgb(var(--cyan) / <alpha-value>)",
        "cyan-dim": "rgb(var(--cyan-dim) / 0.12)",
        "text-1": "rgb(var(--text-1) / <alpha-value>)",
        "text-2": "rgb(var(--text-2) / <alpha-value>)",
        "text-3": "rgb(var(--text-3) / <alpha-value>)",
        border: "rgb(var(--border) / 0.06)",
        "border-bright": "rgb(var(--border-bright) / 0.12)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "display-1": ["clamp(3rem, 7vw, 5.5rem)", { lineHeight: "1.05" }],
        "display-2": ["2rem", { lineHeight: "1.15" }],
        "display-3": ["1.25rem", { lineHeight: "1.3" }],
      },
      transitionDuration: {
        250: "250ms",
      },
    },
  },
  plugins: [],
};
