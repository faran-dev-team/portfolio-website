"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * GravityField — cursor proximity repulsion/attraction effect.
 *
 * Any element with `data-gravity="repel"` is pushed away from the cursor.
 * Any element with `data-gravity="attract"` is pulled toward the cursor.
 *
 * Uses direct DOM manipulation + RAF for 60fps with zero React re-renders.
 * Elements spring back smoothly via lerp when cursor moves away.
 *
 * Usage: add `data-gravity="repel"` to any element you want affected.
 */

const RADIUS = 180;          // px — how far the gravity field reaches
const MAX_DISPLACEMENT = 28; // px — maximum push/pull distance
const LERP_TOWARD = 0.18;    // how fast elements move toward target (higher = snappier)
const LERP_RETURN = 0.10;    // how fast elements return to rest (lower = more spring)

interface TrackedElement {
  el: HTMLElement;
  mode: "repel" | "attract";
  currentX: number;
  currentY: number;
  targetX: number;
  targetY: number;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function GravityField() {
  const prefersReducedMotion = useReducedMotion();
  const cursorRef = useRef({ x: -9999, y: -9999 });
  const elementsRef = useRef<TrackedElement[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (window.matchMedia("(hover: none)").matches) return;

    // Collect all gravity elements
    const collect = () => {
      elementsRef.current = Array.from(
        document.querySelectorAll<HTMLElement>("[data-gravity]")
      ).map((el) => ({
        el,
        mode: (el.dataset.gravity as "repel" | "attract") ?? "repel",
        currentX: 0,
        currentY: 0,
        targetX: 0,
        targetY: 0,
      }));
    };
    collect();

    // Re-collect when DOM changes (lazy-mounted sections, etc.)
    const observer = new MutationObserver(collect);
    observer.observe(document.body, { childList: true, subtree: true });

    const onMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
    };
    document.addEventListener("mousemove", onMove, { passive: true });

    const animate = () => {
      const { x: cx, y: cy } = cursorRef.current;

      for (const tracked of elementsRef.current) {
        const rect = tracked.el.getBoundingClientRect();
        const elCx = rect.left + rect.width / 2;
        const elCy = rect.top + rect.height / 2;

        const dx = cx - elCx;
        const dy = cy - elCy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < RADIUS && dist > 0) {
          // Force magnitude: 1 at center, 0 at radius edge (quadratic falloff)
          const force = Math.pow(1 - dist / RADIUS, 2);
          const magnitude = force * MAX_DISPLACEMENT;

          if (tracked.mode === "repel") {
            // Push away from cursor (normalize dx/dy then scale)
            tracked.targetX = -(dx / dist) * magnitude;
            tracked.targetY = -(dy / dist) * magnitude;
          } else {
            // Pull toward cursor
            tracked.targetX = (dx / dist) * magnitude;
            tracked.targetY = (dy / dist) * magnitude;
          }
        } else {
          // Outside radius — return to rest
          tracked.targetX = 0;
          tracked.targetY = 0;
        }

        // Lerp current toward target
        const isMoving = dist < RADIUS && dist > 0;
        const t = isMoving ? LERP_TOWARD : LERP_RETURN;
        tracked.currentX = lerp(tracked.currentX, tracked.targetX, t);
        tracked.currentY = lerp(tracked.currentY, tracked.targetY, t);

        // Apply — only update DOM if there's meaningful displacement
        if (
          Math.abs(tracked.currentX) > 0.05 ||
          Math.abs(tracked.currentY) > 0.05
        ) {
          tracked.el.style.transform = `translate(${tracked.currentX.toFixed(2)}px, ${tracked.currentY.toFixed(2)}px)`;
          tracked.el.style.willChange = "transform";
        } else {
          tracked.el.style.transform = "";
          tracked.el.style.willChange = "";
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
      // Reset all elements
      for (const tracked of elementsRef.current) {
        tracked.el.style.transform = "";
        tracked.el.style.willChange = "";
      }
    };
  }, [prefersReducedMotion]);

  // This component renders nothing — it's a pure behavior layer
  return null;
}
