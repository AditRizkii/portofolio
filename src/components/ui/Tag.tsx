"use client";

import { cn } from "@/lib/utils";

interface TagProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export function Tag({ label, selected, onClick }: TagProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-5 py-2 text-sm font-medium transition-all duration-200 focus-ring",
        selected
          ? "border-accent bg-accent/10 text-accent"
          : "border-border text-text-muted hover:border-text-muted hover:text-text-primary"
      )}
    >
      {label}
    </button>
  );
}
