"use client";
import { useEffect } from "react";
import { gsap } from "gsap";

export function useCursorFollow() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const follower = document.createElement("div");
    follower.id = "cursor-follower";
    document.body.appendChild(follower);

    const quickTo = gsap.quickTo(follower, "x", {
      duration: 0.3,
      ease: "power2.out",
    });
    const quickToY = gsap.quickTo(follower, "y", {
      duration: 0.3,
      ease: "power2.out",
    });

    const onMove = (e: MouseEvent) => {
      quickTo(e.clientX - 4);
      quickToY(e.clientY - 4);
    };

    const onHover = () => follower.classList.add("expanded");
    const onLeave = () => follower.classList.remove("expanded");

    document.addEventListener("mousemove", onMove);
    document
      .querySelectorAll("a, button, [role=button], input, textarea, .skill-card")
      .forEach((el) => {
        el.addEventListener("mouseenter", onHover);
        el.addEventListener("mouseleave", onLeave);
      });

    return () => {
      document.removeEventListener("mousemove", onMove);
      document
        .querySelectorAll("a, button, [role=button], input, textarea, .skill-card")
        .forEach((el) => {
          el.removeEventListener("mouseenter", onHover);
          el.removeEventListener("mouseleave", onLeave);
        });
      follower.remove();
    };
  }, []);
}
