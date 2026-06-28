const techLogos = [
  { name: "React", icon: "react" },
  { name: "Next.js", icon: "nextdotjs" },
  { name: "Node.js", icon: "nodedotjs" },
  { name: "TypeScript", icon: "typescript" },
  { name: "JavaScript", icon: "javascript" },
  { name: "MySQL", icon: "mysql" },
  { name: "MongoDB", icon: "mongodb" },
  { name: "Kotlin", icon: "kotlin" },
  { name: "Figma", icon: "figma" },
  { name: "Git", icon: "git" },
  { name: "TailwindCSS", icon: "tailwindcss" },
];

export function MarqueeStrip() {
  const items = (
    <>
      {techLogos.map((t) => (
        <div
          key={t.name}
          className="flex items-center gap-2 mx-6"
        >
          <img
            src={`https://cdn.simpleicons.org/${t.icon}/888`}
            alt={t.name}
            width="20"
            height="20"
            className="inline-block"
            loading="lazy"
          />
          <span
            className="text-xs font-medium whitespace-nowrap"
            style={{ color: "rgb(var(--text-3))" }}
          >
            {t.name}
          </span>
          <span style={{ color: "rgb(var(--text-3))", marginLeft: "6px" }}>·</span>
        </div>
      ))}
    </>
  );

  return (
    <div
      className="w-full overflow-hidden py-6"
      style={{
        borderTop: "1px solid rgb(var(--border) / 0.06)",
        borderBottom: "1px solid rgb(var(--border) / 0.06)",
        background: "rgb(var(--bg-layer) / 0.5)",
      }}
    >
      <div
        className="marquee-track"
        style={{
          filter: "grayscale(0.3)",
          opacity: 0.6,
          transition: "opacity 0.3s, filter 0.3s",
        }}
      >
        {items}
        {items}
      </div>
    </div>
  );
}
