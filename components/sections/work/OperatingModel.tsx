"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { PORTFOLIO_CONTENT } from "@/lib/content";
import { Wifi, Users, Settings } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import AnimatedText from "@/components/ui/AnimatedText";
import { CARD_STAGGER, CARD_ITEM, FADE_UP_VARIANTS } from "@/lib/animations";
import { useRef } from "react";

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "wifi": return <Wifi className="w-5 h-5" />;
    case "users": return <Users className="w-5 h-5" />;
    case "settings": return <Settings className="w-5 h-5" />;
    default: return <Settings className="w-5 h-5" />;
  }
};

export default function OperatingModel() {
  const { framework, process } = PORTFOLIO_CONTENT.work.operatingModel;
  const prefersReducedMotion = useReducedMotion();

  const frameworkRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const isFrameworkInView = useInView(frameworkRef, { once: true, margin: "-60px" });
  const isProcessInView = useInView(processRef, { once: true, margin: "-60px" });

  return (
    <section className="mb-32">

      {/* Top Framework Section */}
      <div className="mb-16">
        <div className="mb-12">
          <motion.p
            variants={FADE_UP_VARIANTS}
            initial={prefersReducedMotion ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true }}
            className="text-sm font-bold tracking-widest text-muted-foreground uppercase mb-2"
          >
            03 / PROCESS
          </motion.p>
          <AnimatedText
            text="How Ventures Are Built"
            as="h2"
            className="text-4xl md:text-5xl font-bold font-heading mb-4"
            staggerDelay={0.05}
          />
          <motion.p
            variants={FADE_UP_VARIANTS}
            initial={prefersReducedMotion ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true }}
            className="text-lg text-muted-foreground"
          >
            Our process is designed to turn high-impact theories into sustainable, market-ready realities through three foundational layers.
          </motion.p>
        </div>

        <motion.div
          ref={frameworkRef}
          variants={CARD_STAGGER}
          initial={prefersReducedMotion ? "visible" : "hidden"}
          animate={isFrameworkInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {framework.map((item, idx) => (
            <motion.div key={item.id} variants={CARD_ITEM}>
              <TiltCard
                maxTilt={8}
                hoverScale={1.02}
                className="p-8 bg-card/50 rounded-3xl border border-border/50 hover:border-accent/50 transition-colors flex flex-col h-full relative overflow-hidden group"
              >
                {/* Large ID watermark */}
                <div className="absolute top-0 right-0 p-8 text-7xl font-bold font-heading text-background/10 group-hover:text-accent/5 transition-colors -z-10 pointer-events-none select-none">
                  {item.id}
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Process Section */}
      <div>
        <div className="mb-12">
          <motion.p
            variants={FADE_UP_VARIANTS}
            initial={prefersReducedMotion ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true }}
            className="text-sm font-bold tracking-widest text-muted-foreground uppercase mb-2"
          >
            04 / FRAMEWORK
          </motion.p>
          <AnimatedText
            text="Operating Model"
            as="h2"
            className="text-4xl md:text-5xl font-bold font-heading mb-4"
            staggerDelay={0.06}
          />
          <motion.p
            variants={FADE_UP_VARIANTS}
            initial={prefersReducedMotion ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true }}
            className="text-lg text-muted-foreground"
          >
            A framework for repeatable success across borders.
          </motion.p>
        </div>

        <motion.div
          ref={processRef}
          variants={CARD_STAGGER}
          initial={prefersReducedMotion ? "visible" : "hidden"}
          animate={isProcessInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {process.map((item, idx) => (
            <motion.div key={idx} variants={CARD_ITEM}>
              <TiltCard
                maxTilt={8}
                className="p-8 bg-card/50 rounded-3xl border border-border/50 hover:border-accent/50 transition-colors flex items-start gap-6 h-full"
              >
                <motion.div
                  initial={prefersReducedMotion ? false : { scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 + 0.2, type: "spring", stiffness: 300, damping: 25 }}
                  className="w-12 h-12 rounded-xl bg-background border border-border/50 flex items-center justify-center text-muted-foreground shrink-0"
                >
                  {getIcon(item.icon)}
                </motion.div>
                <div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
