"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { EXPO_OUT, STAGGER_CONTAINER, WORD_REVEAL_VARIANTS } from "@/lib/animations";

interface AnimatedTextProps {
  /** The text content to animate */
  text: string;
  /** HTML tag to render as */
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  className?: string;
  /** Override stagger delay per word (seconds) */
  staggerDelay?: number;
  /** Extra delay before the whole sequence starts (seconds) */
  delay?: number;
  /** Trigger via InView (default) or always animate from mount */
  triggerOnView?: boolean;
}

/**
 * AnimatedText — word-level split text reveal.
 * Each word rises from below with blur-to-focus effect, staggered 50ms per word.
 * Uses overflow-hidden masking so words clip cleanly as they rise.
 * Degrades gracefully with prefers-reduced-motion (renders plain text instantly).
 */
export default function AnimatedText({
  text,
  as: Tag = "div",
  className,
  staggerDelay = 0.05,
  delay = 0,
  triggerOnView = true,
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(" ");

  const shouldAnimate = triggerOnView ? isInView : true;

  if (prefersReducedMotion) {
    const PlainTag = Tag;
    return <PlainTag className={className}>{text}</PlainTag>;
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  return (
    <Tag className={className}>
      <motion.span
        ref={ref as React.RefObject<HTMLSpanElement>}
        variants={containerVariants}
        initial="hidden"
        animate={shouldAnimate ? "visible" : "hidden"}
        aria-label={text}
        style={{ display: "flex", flexWrap: "wrap", gap: "0.25em" }}
      >
        {words.map((word, i) => (
          <span
            key={i}
            style={{ overflow: "hidden", display: "inline-block", lineHeight: 1.2 }}
          >
            <motion.span
              variants={WORD_REVEAL_VARIANTS}
              style={{ display: "inline-block" }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
