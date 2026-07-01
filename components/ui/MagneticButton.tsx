"use client";

import { useRef, useCallback, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { SPRING_MAGNETIC } from "@/lib/animations";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  /** 0–1, how strong the pull is */
  strength?: number;
}

/**
 * MagneticButton — wraps any interactive element with spring-physics magnetic pull.
 * On mousemove within bounds: element drifts toward cursor.
 * On mouseleave: springs back to rest via spring physics.
 * whileTap produces a subtle spring scale-down (feels physical, not CSS-y).
 */
export default function MagneticButton({
  children,
  className,
  strength = 0.3,
}: MagneticButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING_MAGNETIC);
  const y = useSpring(rawY, SPRING_MAGNETIC);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      rawX.set((e.clientX - centerX) * strength);
      rawY.set((e.clientY - centerY) * strength);
    },
    [prefersReducedMotion, rawX, rawY, strength]
  );

  const onMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    <motion.div
      ref={ref}
      style={prefersReducedMotion ? {} : { x, y }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
