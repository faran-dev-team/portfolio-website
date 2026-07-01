"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { FADE_UP_VARIANTS, CARD_ITEM } from "@/lib/animations";
import type { Variants } from "framer-motion";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  /** How much of the element must be in view before triggering (0-1) */
  threshold?: number;
  /** Negative margin to trigger earlier (e.g. "-80px") */
  margin?: string;
  /** Delay in seconds before animation starts */
  delay?: number;
  /** Use card-item variant (for use inside a stagger container) */
  asChild?: boolean;
}

/**
 * ScrollReveal — generic scroll-triggered reveal wrapper.
 * Triggers once when the element enters the viewport.
 * Respects prefers-reduced-motion by rendering children instantly visible.
 */
export default function ScrollReveal({
  children,
  className,
  variants,
  margin = "-80px",
  delay = 0,
  asChild = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isInView = useInView(ref, { once: true, margin: margin as any });
  const prefersReducedMotion = useReducedMotion();

  const selectedVariants = variants ?? (asChild ? CARD_ITEM : FADE_UP_VARIANTS);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      variants={selectedVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={delay}
      className={className}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </motion.div>
  );
}
