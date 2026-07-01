"use client";

import { useRef, useCallback, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { SPRING_TILT } from "@/lib/animations";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Max tilt angle in degrees (default 12) */
  maxTilt?: number;
  /** Scale on hover (default 1.02) */
  hoverScale?: number;
  /** Whether to add a subtle glare effect */
  glare?: boolean;
}

/**
 * TiltCard — 3D tilt-on-hover using pointer position.
 * rotateX/rotateY mapped to mouse delta relative to card center.
 * Spring damping ensures it feels physical, not jiggly.
 * Degrades gracefully with prefers-reduced-motion.
 */
export default function TiltCard({
  children,
  className,
  maxTilt = 12,
  hoverScale = 1.02,
  glare = false,
}: TiltCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rawGlareX = useMotionValue(50);
  const rawGlareY = useMotionValue(50);
  const rawScale = useMotionValue(1);

  const rotateX = useSpring(rawRotateX, SPRING_TILT);
  const rotateY = useSpring(rawRotateY, SPRING_TILT);
  const scale = useSpring(rawScale, { stiffness: 200, damping: 20 });

  const glareX = useTransform(rawGlareX, [0, 100], ["0%", "100%"]);
  const glareY = useTransform(rawGlareY, [0, 100], ["0%", "100%"]);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width;  // 0–1
      const relY = (e.clientY - rect.top) / rect.height;  // 0–1
      // Map to -maxTilt → +maxTilt degrees
      rawRotateY.set((relX - 0.5) * maxTilt * 2);
      rawRotateX.set(-(relY - 0.5) * maxTilt * 2);
      rawGlareX.set(relX * 100);
      rawGlareY.set(relY * 100);
      rawScale.set(hoverScale);
    },
    [prefersReducedMotion, rawRotateX, rawRotateY, rawGlareX, rawGlareY, rawScale, maxTilt, hoverScale]
  );

  const onMouseLeave = useCallback(() => {
    rawRotateX.set(0);
    rawRotateY.set(0);
    rawGlareX.set(50);
    rawGlareY.set(50);
    rawScale.set(1);
  }, [rawRotateX, rawRotateY, rawGlareX, rawGlareY, rawScale]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      data-cursor-burst="true"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={className}
    >
      {/* Glare overlay */}
      {glare && (
        <motion.div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            background: "radial-gradient(circle at var(--gx) var(--gy), rgba(255,255,255,0.07) 0%, transparent 60%)",
            "--gx": glareX,
            "--gy": glareY,
            pointerEvents: "none",
            zIndex: 1,
            mixBlendMode: "screen",
          } as React.CSSProperties}
        />
      )}
      {children}
    </motion.div>
  );
}
