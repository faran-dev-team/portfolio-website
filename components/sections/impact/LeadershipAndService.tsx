"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { PORTFOLIO_CONTENT } from "@/lib/content";
import { Heart, Handshake, Mic } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import AnimatedText from "@/components/ui/AnimatedText";
import { CARD_STAGGER, CARD_ITEM, FADE_UP_VARIANTS } from "@/lib/animations";
import { useRef } from "react";

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "heart": return <Heart className="w-5 h-5" />;
    case "handshake": return <Handshake className="w-5 h-5" />;
    case "mic": return <Mic className="w-5 h-5" />;
    default: return <Heart className="w-5 h-5" />;
  }
};

export default function LeadershipAndService() {
  const data = PORTFOLIO_CONTENT.impact.leadershipAndService;
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
          03 / GLOBAL CITIZENSHIP
        </motion.p>
        <AnimatedText
          text="Leadership & Service"
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
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {data.map((item, idx) => (
          <motion.div key={idx} variants={CARD_ITEM}>
            <TiltCard
              maxTilt={10}
              hoverScale={1.02}
              className="p-8 bg-card/50 rounded-3xl border border-border/50 hover:border-accent/50 transition-colors flex flex-col h-full"
            >
              <div className="flex items-center gap-4 mb-8">
                <motion.div
                  initial={prefersReducedMotion ? false : { scale: 0.7, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: idx * 0.12 + 0.2,
                    type: "spring",
                    stiffness: 350,
                    damping: 22,
                  }}
                  className="w-12 h-12 rounded-xl bg-background border border-border/50 flex items-center justify-center text-muted-foreground shrink-0"
                >
                  {getIcon(item.icon)}
                </motion.div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {item.tag}
                </div>
              </div>

              <div className="mt-auto">
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
