"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { PORTFOLIO_CONTENT } from "@/lib/content";
import { GraduationCap, BookOpen, Shield } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import AnimatedText from "@/components/ui/AnimatedText";
import { CARD_STAGGER, CARD_ITEM, FADE_UP_VARIANTS, SCALE_ENTRANCE } from "@/lib/animations";
import { useRef } from "react";

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "graduationCap": return <GraduationCap className="w-6 h-6" />;
    case "bookOpen": return <BookOpen className="w-6 h-6" />;
    case "shield": return <Shield className="w-6 h-6" />;
    default: return <BookOpen className="w-6 h-6" />;
  }
};

export default function InstitutionalRecognition() {
  const data = PORTFOLIO_CONTENT.academics.institutionalRecognition;
  const prefersReducedMotion = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);
  const isGridInView = useInView(gridRef, { once: true, margin: "-60px" });

  return (
    <section>
      <div className="mb-12">
        <motion.p
          variants={FADE_UP_VARIANTS}
          initial={prefersReducedMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true }}
          className="text-sm font-bold tracking-widest text-muted-foreground uppercase mb-2"
        >
          01 / EDUCATION & HONORS
        </motion.p>
        <AnimatedText
          text="Institutional Recognition"
          as="h2"
          className="text-4xl md:text-5xl font-bold font-heading"
          staggerDelay={0.05}
        />
      </div>

      <motion.div
        ref={gridRef}
        variants={CARD_STAGGER}
        initial={prefersReducedMotion ? "visible" : "hidden"}
        animate={isGridInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {data.map((item, idx) => (
          <motion.div key={item.id} variants={CARD_ITEM}>
            <TiltCard
              maxTilt={8}
              hoverScale={1.02}
              glare
              className="p-8 bg-card/50 rounded-3xl border border-border/50 hover:border-accent/50 transition-colors relative flex flex-col h-full"
            >
              {/* ID badge */}
              <div className="absolute top-8 right-8 w-8 h-8 rounded-full bg-background flex items-center justify-center text-sm font-bold">
                {item.id}
              </div>

              <motion.div
                initial={prefersReducedMotion ? false : { scale: 0.7, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 + 0.15, type: "spring", stiffness: 350, damping: 22 }}
                className="w-14 h-14 rounded-2xl bg-background border border-border/50 flex items-center justify-center text-muted-foreground mb-8"
              >
                {getIcon(item.icon)}
              </motion.div>

              <div className="mt-auto">
                {item.tag1 && (
                  <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                    className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider mb-4 border border-accent/20"
                  >
                    {item.tag1}
                  </motion.div>
                )}
                <h3 className="text-2xl font-bold mb-3 uppercase">{item.title}</h3>
                {item.description && (
                  <p className="text-muted-foreground leading-relaxed text-sm">{item.description}</p>
                )}
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
