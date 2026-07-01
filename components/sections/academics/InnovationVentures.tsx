"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { PORTFOLIO_CONTENT } from "@/lib/content";
import { Rocket, Zap, Star } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import AnimatedText from "@/components/ui/AnimatedText";
import { CARD_STAGGER, CARD_ITEM, SCALE_ENTRANCE, FADE_UP_VARIANTS } from "@/lib/animations";
import { useRef } from "react";

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "rocket": return <Rocket className="w-6 h-6" />;
    case "zap": return <Zap className="w-6 h-6" />;
    case "star": return <Star className="w-6 h-6" />;
    default: return <Star className="w-6 h-6" />;
  }
};

export default function InnovationVentures() {
  const data = PORTFOLIO_CONTENT.academics.innovationAndVentures;
  const prefersReducedMotion = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);
  const isGridInView = useInView(gridRef, { once: true, margin: "-60px" });

  return (
    <section>
      <div className="mb-12 flex items-center gap-6">
        <motion.div
          variants={SCALE_ENTRANCE}
          initial={prefersReducedMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true }}
          className="w-12 h-12 rounded-2xl bg-accent text-black font-bold flex items-center justify-center text-xl shrink-0"
        >
          02
        </motion.div>
        <div>
          <motion.p
            variants={FADE_UP_VARIANTS}
            initial={prefersReducedMotion ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true }}
            className="text-sm font-bold tracking-widest text-muted-foreground uppercase mb-1"
          >
            SCHOLARSHIPS & ACCELERATORS
          </motion.p>
          <AnimatedText
            text="Innovation & Ventures"
            as="h2"
            className="text-4xl md:text-5xl font-bold font-heading"
            staggerDelay={0.05}
          />
        </div>
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
              maxTilt={10}
              hoverScale={1.02}
              className="p-8 bg-card/50 rounded-3xl border border-border/50 hover:border-accent/50 transition-colors flex flex-col h-full"
            >
              <motion.div
                initial={prefersReducedMotion ? false : { scale: 0.7, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 + 0.15, type: "spring", stiffness: 350, damping: 22 }}
                className="w-12 h-12 rounded-xl bg-background border border-border/50 flex items-center justify-center text-muted-foreground mb-8"
              >
                {getIcon(item.icon)}
              </motion.div>
              <div className="mt-auto">
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{item.description}</p>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
