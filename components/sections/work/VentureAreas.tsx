"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { PORTFOLIO_CONTENT } from "@/lib/content";
import { Leaf, Monitor, GraduationCap, Globe } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import AnimatedText from "@/components/ui/AnimatedText";
import { CARD_STAGGER, CARD_ITEM, FADE_UP_VARIANTS } from "@/lib/animations";
import { useRef } from "react";

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "leaf": return <Leaf className="w-5 h-5" />;
    case "monitor": return <Monitor className="w-5 h-5" />;
    case "graduationCap": return <GraduationCap className="w-5 h-5" />;
    case "globe": return <Globe className="w-5 h-5" />;
    default: return <Globe className="w-5 h-5" />;
  }
};

export default function VentureAreas() {
  const data = PORTFOLIO_CONTENT.work.ventureAreas;
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
          02 / VERTICAL FOCUS
        </motion.p>
        <AnimatedText
          text="Venture Areas"
          as="h2"
          className="text-4xl md:text-5xl font-bold font-heading"
          staggerDelay={0.06}
        />
      </div>

      <motion.div
        ref={gridRef}
        variants={CARD_STAGGER}
        initial={prefersReducedMotion ? "visible" : "hidden"}
        animate={isGridInView ? "visible" : "hidden"}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {data.map((item, idx) => (
          <motion.div key={idx} variants={CARD_ITEM}>
            <TiltCard
              maxTilt={10}
              hoverScale={1.03}
              className="p-8 bg-card/50 rounded-3xl border border-border/50 hover:border-accent/50 transition-colors flex flex-col h-full"
            >
              <motion.div
                initial={prefersReducedMotion ? false : { scale: 0.7, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 + 0.15, type: "spring", stiffness: 350, damping: 22 }}
                className="w-12 h-12 rounded-xl bg-background border border-border/50 flex items-center justify-center text-muted-foreground mb-8 shrink-0"
              >
                {getIcon(item.icon)}
              </motion.div>
              <div className="mt-auto">
                <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
