"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { PORTFOLIO_CONTENT } from "@/lib/content";
import { Building2, Layers } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import AnimatedText from "@/components/ui/AnimatedText";
import { CARD_STAGGER, CARD_ITEM, CLIP_REVEAL_LEFT, FADE_UP_VARIANTS } from "@/lib/animations";
import { useRef } from "react";

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "building": return <Building2 className="w-5 h-5" />;
    case "layers": return <Layers className="w-5 h-5" />;
    default: return <Building2 className="w-5 h-5" />;
  }
};

export default function StrategicEcosystem() {
  const data = PORTFOLIO_CONTENT.work.strategicEcosystem;
  const prefersReducedMotion = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isGridInView = useInView(gridRef, { once: true, margin: "-60px" });
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section className="mb-32">
      <div ref={headerRef} className="mb-12">
        <motion.div
          variants={CLIP_REVEAL_LEFT}
          initial={prefersReducedMotion ? "visible" : "hidden"}
          animate={isHeaderInView ? "visible" : "hidden"}
          className="flex items-center gap-4 mb-6"
        >
          <div className="w-12 h-px bg-accent/50" />
          <p className="text-sm font-bold tracking-widest text-muted-foreground uppercase">
            STRATEGIC ECOSYSTEM
          </p>
        </motion.div>

        <AnimatedText
          text={data.title}
          as="h2"
          className="text-5xl md:text-7xl font-bold font-heading mb-6 uppercase"
          staggerDelay={0.06}
          delay={0.05}
        />

        <motion.p
          variants={FADE_UP_VARIANTS}
          initial={prefersReducedMotion ? "visible" : "hidden"}
          animate={isHeaderInView ? "visible" : "hidden"}
          className="text-xl text-muted-foreground"
        >
          {data.subtitle}
        </motion.p>
      </div>

      <motion.div
        ref={gridRef}
        variants={CARD_STAGGER}
        initial={prefersReducedMotion ? "visible" : "hidden"}
        animate={isGridInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {data.cards.map((card, idx) => (
          <motion.div key={idx} variants={CARD_ITEM}>
            <TiltCard
              maxTilt={8}
              hoverScale={1.02}
              glare
              className="p-8 md:p-12 bg-card/50 rounded-3xl border border-border/50 hover:border-accent/50 transition-colors flex flex-col"
            >
              <motion.div
                initial={prefersReducedMotion ? false : { scale: 0.7, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12 + 0.2, type: "spring", stiffness: 350, damping: 22 }}
                className="w-12 h-12 rounded-xl bg-background border border-border/50 flex items-center justify-center text-muted-foreground mb-8"
              >
                {getIcon(card.icon)}
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold mb-4 uppercase">{card.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{card.description}</p>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
