"use client";
import { useEffect, useRef, useState } from "react";

interface UseCounterOptions {
  end: number;
  duration?: number;
  enabled?: boolean;
}

export function useCounter({
  end,
  duration = 2000,
  enabled = true,
}: UseCounterOptions) {
  const [count, setCount] = useState(0);
  const startTime = useRef<number>(0);
  const rafId = useRef<number>(0);

  useEffect(() => {
    if (!enabled) return;

    startTime.current = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        rafId.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    rafId.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafId.current);
  }, [end, duration, enabled]);

  return count;
}
