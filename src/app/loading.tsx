export default function Loading() {
  return (
    <div className="page-loader">
      <div className="flex items-center gap-1.5">
        <span />
        <span />
        <span />
      </div>
      <p
        className="font-mono text-xs tracking-widest uppercase"
        style={{ color: "rgb(var(--text-3))" }}
      >
        Loading
      </p>
    </div>
  );
}
