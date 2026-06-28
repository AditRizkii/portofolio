"use client";

import { useEffect, useRef } from "react";

const chars = "{}()=>;constlet=/><*01".split("");

interface Drop {
  x: number;
  y: number;
  speed: number;
  length: number;
  opacity: number;
}

export function CodeRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const dropsRef = useRef<Drop[]>([]);
  const animIdRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      initDrops();
    };

    const initDrops = () => {
      const cols = Math.floor(canvas.width / 22);
      dropsRef.current = Array.from({ length: cols }, (_, i) => ({
        x: i * 22,
        y: Math.random() * canvas.height,
        speed: 0.3 + Math.random() * 0.6,
        length: 8 + Math.floor(Math.random() * 16),
        opacity: 0.02 + Math.random() * 0.05,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = "13px Fira Code, monospace";
      ctx.textAlign = "center";

      for (const drop of dropsRef.current) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = `rgba(123, 111, 224, ${drop.opacity})`;
        ctx.fillText(char, drop.x, drop.y);

        drop.y += drop.speed;
        if (drop.y > canvas.height + 20) {
          drop.y = -20;
          drop.speed = 0.3 + Math.random() * 0.6;
          drop.opacity = 0.02 + Math.random() * 0.05;
        }
      }

      animIdRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    animIdRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animIdRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="code-rain"
      aria-hidden="true"
    />
  );
}
