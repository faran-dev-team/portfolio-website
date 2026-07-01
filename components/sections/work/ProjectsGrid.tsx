"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PORTFOLIO_CONTENT } from "@/lib/content";
import Link from "next/link";
import { LayoutGrid } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import AnimatedText from "@/components/ui/AnimatedText";
import { CARD_STAGGER, CARD_ITEM, CLIP_REVEAL_LEFT } from "@/lib/animations";
import { useRef } from "react";
import { useInView } from "framer-motion";

export default function ProjectsGrid() {
  const { projects } = PORTFOLIO_CONTENT.work;
  const prefersReducedMotion = useReducedMotion();
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingRef, { once: true, margin: "-60px" });
  const isGridInView = useInView(gridRef, { once: true, margin: "-40px" });

  return (
    <section>
      {/* Section Header */}
      <div
        ref={headingRef}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-t border-border/50 pt-16"
      >
        <div>
          <motion.div
            variants={CLIP_REVEAL_LEFT}
            initial={prefersReducedMotion ? "visible" : "hidden"}
            animate={isHeadingInView ? "visible" : "hidden"}
            className="flex items-center gap-4 mb-4"
          >
            <div className="w-8 h-px bg-accent/50" />
            <p className="text-sm font-bold tracking-widest text-muted-foreground uppercase">
              SELECTED WORK
            </p>
          </motion.div>

          <AnimatedText
            text="What We Build"
            as="h2"
            className="text-5xl md:text-7xl font-bold font-heading uppercase mb-4"
            staggerDelay={0.06}
            delay={0.1}
          />

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-muted-foreground"
          >
            Modern solutions that drive growth and scale with you.
          </motion.p>
        </div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
          animate={isHeadingInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            href="#projects"
            className="inline-flex items-center gap-3 px-6 py-3 border border-border/50 hover:border-accent hover:text-accent rounded-full transition-colors font-bold text-sm uppercase tracking-wider"
          >
            VIEW ALL PROJECTS
            <LayoutGrid className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      {/* Cards Grid — stagger container */}
      <motion.div
        ref={gridRef}
        variants={CARD_STAGGER}
        initial={prefersReducedMotion ? "visible" : "hidden"}
        animate={isGridInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {projects.map((project, idx) => (
          <motion.div key={idx} variants={CARD_ITEM}>
            <TiltCard
              maxTilt={10}
              hoverScale={1.02}
              glare={true}
              className="flex flex-col h-[500px] rounded-3xl border border-border/50 hover:border-accent/50 transition-colors overflow-hidden bg-card/20 relative"
            >
              {/* Top portion - Project Info */}
              <div className="p-8 z-10 relative">
                <div className="inline-block px-3 py-1 rounded bg-blue-600 text-white text-[10px] font-bold tracking-widest uppercase mb-4">
                  {project.tag}
                </div>
                <h3 className="text-3xl font-bold mb-2 uppercase tracking-tighter">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              {/* Bottom portion - Image block with clip-path wipe reveal */}
              <motion.div
                variants={{
                  hidden: { clipPath: "inset(0 100% 0 0)" },
                  visible: {
                    clipPath: "inset(0 0% 0 0)",
                    transition: {
                      duration: 0.9,
                      ease: [0.22, 1, 0.36, 1],
                      delay: idx * 0.06,
                    },
                  },
                }}
                className={`mt-auto h-1/2 w-full ${project.imageColor} relative overflow-hidden flex items-center justify-center p-6 border-t border-border/20`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="relative z-10 w-full h-full border-2 border-background/20 rounded-xl flex items-center justify-center text-center p-4 shadow-2xl backdrop-blur-sm">
                  <h4 className="text-xl md:text-2xl font-bold text-foreground/80 font-heading">
                    {project.imageText}
                  </h4>
                </div>
              </motion.div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
