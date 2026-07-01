"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { PORTFOLIO_CONTENT } from "@/lib/content";
import { Trophy, Award } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import AnimatedText from "@/components/ui/AnimatedText";
import { CARD_STAGGER, CARD_ITEM, FADE_UP_VARIANTS } from "@/lib/animations";
import { useRef } from "react";

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "trophy": return <Trophy className="w-5 h-5" />;
    case "award": return <Award className="w-5 h-5" />;
    default: return <Trophy className="w-5 h-5" />;
  }
};

export default function AwardsAndNominations() {
  const data = PORTFOLIO_CONTENT.impact.awardsAndNominations;
  const prefersReducedMotion = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);
  const isGridInView = useInView(gridRef, { once: true, margin: "-60px" });

  return (
    <section className="mb-32">
      <div className="mb-12">
        <motion.p
          variants={FADE_UP_VARIANTS}
          initial={prefersReducedMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true }}
          className="text-sm font-bold tracking-widest text-muted-foreground uppercase mb-2"
        >
          01 / RECOGNITION
        </motion.p>
        <AnimatedText
          text="Awards & Nominations"
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
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {data.map((item, idx) => (
          <motion.div key={idx} variants={CARD_ITEM}>
            <TiltCard
              maxTilt={8}
              hoverScale={1.02}
              glare
              className="p-8 md:p-12 bg-card/50 rounded-3xl border border-border/50 hover:border-accent/50 transition-colors flex flex-col h-full"
            >
              <motion.div
                initial={prefersReducedMotion ? false : { scale: 0.7, opacity: 0, rotate: -10 }}
                whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12 + 0.15, type: "spring", stiffness: 350, damping: 22 }}
                className="w-12 h-12 rounded-xl bg-background border border-border/50 flex items-center justify-center text-muted-foreground mb-8"
              >
                {getIcon(item.icon)}
              </motion.div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 uppercase">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>

              <div className="mt-auto flex flex-wrap gap-2">
                {item.tags.map((tag, i) => (
                  <motion.div
                    key={i}
                    initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 + 0.3, type: "spring", stiffness: 300, damping: 20 }}
                    className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider border border-accent/20"
                  >
                    {tag}
                  </motion.div>
                ))}
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
