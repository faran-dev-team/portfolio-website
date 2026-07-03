"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { PORTFOLIO_CONTENT } from "@/lib/content";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useRef } from "react";
import AnimatedText from "@/components/ui/AnimatedText";
import MagneticButton from "@/components/ui/MagneticButton";
import { EXPO_OUT, FADE_UP_VARIANTS, CLIP_REVEAL_LEFT, SCALE_ENTRANCE } from "@/lib/animations";

const galaxyDots = [
  { top: "10%", left: "15%", size: 3, delay: 0.2, duration: 4, yOffset: -15, xOffset: 10, opacity: 0.6 },
  { top: "25%", left: "80%", size: 4, delay: 1.1, duration: 5.5, yOffset: 20, xOffset: -10, opacity: 0.8 },
  { top: "75%", left: "10%", size: 2, delay: 0.5, duration: 3.5, yOffset: -10, xOffset: 15, opacity: 0.4 },
  { top: "85%", left: "85%", size: 5, delay: 2.0, duration: 6, yOffset: 25, xOffset: -20, opacity: 0.7 },
  { top: "50%", left: "5%", size: 3, delay: 0.8, duration: 4.5, yOffset: 15, xOffset: 10, opacity: 0.5 },
  { top: "15%", left: "60%", size: 2, delay: 1.5, duration: 3.8, yOffset: -12, xOffset: -12, opacity: 0.4 },
  { top: "90%", left: "40%", size: 4, delay: 0.3, duration: 5, yOffset: 18, xOffset: 18, opacity: 0.9 },
  { top: "40%", left: "90%", size: 2, delay: 2.5, duration: 4.2, yOffset: -15, xOffset: -15, opacity: 0.5 },
  { top: "5%", left: "40%", size: 3, delay: 1.8, duration: 4.8, yOffset: 10, xOffset: 12, opacity: 0.6 },
  { top: "60%", left: "95%", size: 2, delay: 0.9, duration: 3.2, yOffset: -8, xOffset: -10, opacity: 0.3 },
  { top: "95%", left: "70%", size: 3, delay: 1.2, duration: 5.2, yOffset: 22, xOffset: 14, opacity: 0.7 },
  { top: "35%", left: "20%", size: 4, delay: 0.1, duration: 4.1, yOffset: -18, xOffset: 16, opacity: 0.8 },
  { top: "80%", left: "25%", size: 2, delay: 2.2, duration: 3.6, yOffset: 12, xOffset: -8, opacity: 0.4 },
  { top: "20%", left: "35%", size: 3, delay: 0.7, duration: 4.6, yOffset: -14, xOffset: -14, opacity: 0.5 },
  { top: "55%", left: "75%", size: 4, delay: 1.6, duration: 5.8, yOffset: 24, xOffset: 20, opacity: 0.9 },
];

export default function Hero() {
  const { hero } = PORTFOLIO_CONTENT.home;
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-driven parallax for the right-side circle
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const circleY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const circleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Stagger timings for the entrance sequence
  const badgeDelay = 0.1;
  const titleDelay = 0.3;
  const subtitleDelay = 0.65;
  const descDelay = 0.85;
  const tagsDelay = 1.0;
  const ctaDelay = 1.1;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center pt-32 pb-24 overflow-hidden bg-background"
    >
      {/* Background ambient glow — breathing animation */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px]"
          style={{
            animation: "hero-glow-pulse 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/3 blur-[100px]"
          style={{
            animation: "hero-glow-pulse 10s ease-in-out infinite 2s",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

        {/* Left Content */}
        <div className="relative">

          {/* Badge — clip-path wipe reveal */}
          <motion.div
            variants={CLIP_REVEAL_LEFT}
            initial={prefersReducedMotion ? "visible" : "hidden"}
            animate="visible"
            transition={{ delay: badgeDelay, duration: 0.8, ease: EXPO_OUT }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-mono font-bold tracking-widest uppercase mb-8"
            data-gravity="repel"
          >
            <Sparkles className="w-4 h-4" />
            {hero.badge}
          </motion.div>

          {/* Title — word-level stagger with blur-to-focus + hover effect */}
          <motion.div
            whileHover={prefersReducedMotion ? {} : { scale: 1.03, x: 8 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="origin-left cursor-default inline-block"
          >
            <AnimatedText
              text={hero.title}
              as="h1"
              className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading leading-[1.1] tracking-tight mb-4"
              staggerDelay={0.05}
              delay={titleDelay}
              triggerOnView={false}
            />
          </motion.div>

          {/* Subtitle — AnimatedText with offset delay */}
          <AnimatedText
            text={hero.subtitle}
            as="h2"
            className="text-xl md:text-2xl text-accent font-medium mb-6"
            staggerDelay={0.04}
            delay={subtitleDelay}
            triggerOnView={false}
          />

          {/* Description */}
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: EXPO_OUT, delay: descDelay }}
            className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-8"
          >
            {hero.description}
          </motion.p>

          {/* Tags */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: tagsDelay }}
            className="flex flex-wrap items-center gap-4 text-xs font-bold tracking-widest text-muted-foreground uppercase mb-12"
          >
            {hero.tags.map((tag, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <span>{tag}</span>
                {idx !== hero.tags.length - 1 && (
                  <div className="w-1 h-1 rounded-full bg-border" />
                )}
              </div>
            ))}
          </motion.div>

          {/* CTAs — spring scale entrance + magnetic pull */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: EXPO_OUT, delay: ctaDelay }}
            className="flex flex-wrap items-center gap-6"
          >
            <MagneticButton strength={0.2}>
              <Link
                href="/projects"
                transitionTypes={["nav-forward"]}
                data-gravity="repel"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-background font-bold rounded-full transition-colors text-sm uppercase tracking-wider"
              >
                {hero.primaryAction}
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </MagneticButton>

            <MagneticButton strength={0.2}>
              <Link
                href="/contact"
                transitionTypes={["nav-forward"]}
                data-gravity="repel"
                className="inline-flex items-center px-8 py-4 bg-transparent border border-border hover:border-accent hover:text-accent font-bold rounded-full transition-colors text-sm uppercase tracking-wider"
              >
                {hero.secondaryAction}
              </Link>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right Content — Circular element with scroll parallax */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.88, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.1, ease: EXPO_OUT, delay: 0.4 }}
          style={prefersReducedMotion ? {} : { y: circleY, opacity: circleOpacity }}
          className="relative z-10 hidden lg:flex justify-end"
        >
          {/* Galaxy dots field — placed behind the image */}
          <div className="absolute inset-[-20%] pointer-events-none -z-10" aria-hidden="true">
            {galaxyDots.map((dot, i) => (
              <motion.div
                key={i}
                animate={prefersReducedMotion ? {} : {
                  y: [0, dot.yOffset, 0],
                  x: [0, dot.xOffset, 0],
                  opacity: [0.1, dot.opacity, 0.1],
                }}
                transition={{ duration: dot.duration, repeat: Infinity, ease: "easeInOut", delay: dot.delay }}
                className="absolute rounded-full bg-accent"
                style={{
                  top: dot.top,
                  left: dot.left,
                  width: dot.size,
                  height: dot.size,
                }}
              />
            ))}
          </div>

          <div className="relative z-20 w-[470px] h-[470px] rounded-full overflow-hidden border border-accent/20 bg-card flex items-center justify-center mb-90">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-transparent pointer-events-none" />
            <img
              src="/logo/hero.jpeg"
              alt="Measm Raza"
              className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-110 hover:opacity-100"
            />
          </div>

          {/* Glowing ring behind circle - reduced spread */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[105%] h-[105%] bg-accent/5 blur-2xl -z-20 rounded-full pointer-events-none" />
        </motion.div>

      </div>
    </section>
  );
}
