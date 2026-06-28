import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
}

export function Card({ className, children, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface transition-all duration-300",
        hover && "hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-0.5",
        className
      )}
    >
      {children}
    </div>
  );
}
