"use client";

import { motion } from "framer-motion";
import { PORTFOLIO_CONTENT } from "@/lib/content";
import { Building2, Layers } from "lucide-react";

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "building": return <Building2 className="w-5 h-5" />;
    case "layers": return <Layers className="w-5 h-5" />;
    default: return <Building2 className="w-5 h-5" />;
  }
};

export default function StrategicEcosystem() {
  const data = PORTFOLIO_CONTENT.work.strategicEcosystem;

  return (
    <section className="mb-32">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-1 h-px bg-accent/50" />
          <p className="text-sm font-bold tracking-widest text-muted-foreground uppercase">
            STRATEGIC ECOSYSTEM
          </p>
        </div>
        <h2 className="text-5xl md:text-7xl font-bold font-heading mb-6 uppercase">
          {data.title}
        </h2>
        <p className="text-xl text-muted-foreground">
          {data.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.cards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="p-8 md:p-12 bg-card/50 rounded-3xl border border-border/50 hover:border-accent/50 transition-colors flex flex-col"
          >
            <div className="w-12 h-12 rounded-xl bg-background border border-border/50 flex items-center justify-center text-muted-foreground mb-8">
              {getIcon(card.icon)}
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 uppercase">{card.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {card.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
