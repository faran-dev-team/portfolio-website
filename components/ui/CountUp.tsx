"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useInView, useReducedMotion, useTransform } from "framer-motion";

interface CountUpProps {
  /** The full value string, e.g. "15+", "1000+", "7" */
  value: string;
  className?: string;
  /** Spring stiffness (default 80 for a smooth, weighty feel) */
  stiffness?: number;
  damping?: number;
}

/**
 * CountUp — animates a numeric value counting up on scroll-enter.
 * Handles "15+", "1000+", "7" formats — strips suffix, animates number, appends suffix.
 * Spring-driven so count feels physical, not mechanical.
 */
export default function CountUp({
  value,
  className,
  stiffness = 80,
  damping = 18,
}: CountUpProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  // Parse numeric portion and suffix
  const numericMatch = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const numericValue = numericMatch ? parseFloat(numericMatch[1]) : 0;
  const suffix = numericMatch ? numericMatch[2] : value;

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness, damping, mass: 1 });
  const displayValue = useTransform(springValue, (v) =>
    Math.round(v).toLocaleString()
  );

  useEffect(() => {
    if (isInView && !prefersReducedMotion) {
      motionValue.set(numericValue);
    }
  }, [isInView, prefersReducedMotion, motionValue, numericValue]);

  if (prefersReducedMotion) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
}
