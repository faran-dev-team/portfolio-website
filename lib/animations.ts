import type { Variants, Transition } from "framer-motion";

// ─── Spring Presets ───────────────────────────────────────────────────────────
// Prefer springs over duration-based tweens for anything interactive.
// Springs feel alive; tweens feel scripted.

export const SPRING_SNAPPY: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
  mass: 0.8,
};

export const SPRING_GENTLE: Transition = {
  type: "spring",
  stiffness: 180,
  damping: 25,
  mass: 1,
};

export const SPRING_MAGNETIC: Transition = {
  type: "spring",
  stiffness: 600,
  damping: 40,
  mass: 0.5,
};

export const SPRING_TILT: Transition = {
  type: "spring",
  stiffness: 200,
  damping: 20,
  mass: 0.8,
};

export const SPRING_SOFT: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 1.2,
};

// ─── Easing ───────────────────────────────────────────────────────────────────
// expo-out: feels premium, not bouncy. Used for entrance animations.
export const EXPO_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── Word / Line Reveal ───────────────────────────────────────────────────────
// Each word rises from below with blur-to-focus. Parent staggers children.

export const STAGGER_CONTAINER: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0,
    },
  },
};

export const STAGGER_CONTAINER_SLOW: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0,
    },
  },
};

export const WORD_REVEAL_VARIANTS: Variants = {
  hidden: {
    y: "120%",
    opacity: 0,
    filter: "blur(8px)",
  },
  visible: {
    y: "0%",
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: EXPO_OUT,
    },
  },
};

// ─── Fade Up ──────────────────────────────────────────────────────────────────
// Generic scroll-reveal: up + fade. Used for cards, paragraphs, etc.

export const FADE_UP_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: EXPO_OUT,
    },
  },
};

export const FADE_IN_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: EXPO_OUT },
  },
};

// ─── Clip-Path Reveal ─────────────────────────────────────────────────────────
// Wipe from left to right. Used for image blocks, badges, underlines.

export const CLIP_REVEAL_LEFT: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.8, ease: EXPO_OUT },
  },
};

// Wipe from bottom up (for text masks)
export const CLIP_REVEAL_UP: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)" },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 0.7, ease: EXPO_OUT },
  },
};

// ─── Scale Entrance ───────────────────────────────────────────────────────────
export const SCALE_ENTRANCE: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: SPRING_GENTLE as object,
  },
};

// ─── Card Stagger (parent) ────────────────────────────────────────────────────
export const CARD_STAGGER: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

export const CARD_ITEM: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: EXPO_OUT,
    },
  },
};
