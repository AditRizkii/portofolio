"use client";

import { useRef, useState, useEffect } from "react";
import { useCounter } from "@/hooks/useCounter";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { Achievement } from "@/types";

const achievements: Achievement[] = [
  { metric: "Projects", value: 10, postfix: "+" },
  { metric: "Users", value: 40, prefix: "~" },
  { metric: "Awards", value: 2 },
  { metric: "Years", value: 4 },
];

function AnimatedMetric({ achievement }: { achievement: Achievement }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const count = useCounter({ end: achievement.value, enabled: isVisible });

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center"
    >
      <span className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
        {achievement.prefix}
        {count}
        {achievement.postfix}
      </span>
      <span className="mt-1 text-sm text-text-muted">{achievement.metric}</span>
    </div>
  );
}

export function AchievementsSection() {
  const ref = useScrollReveal<HTMLDivElement>({
    y: 20,
    duration: 0.6,
  });

  return (
    <section className="py-12 sm:py-20">
      <div
        ref={ref}
        className="mx-auto max-w-4xl rounded-xl border border-border bg-surface px-8 py-10 sm:px-16 sm:py-12"
      >
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {achievements.map((achievement) => (
            <AnimatedMetric
              key={achievement.metric}
              achievement={achievement}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
