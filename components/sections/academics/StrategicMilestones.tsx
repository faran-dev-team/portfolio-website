"use client";

import { motion } from "framer-motion";
import { PORTFOLIO_CONTENT } from "@/lib/content";
import { Briefcase, Globe, Target } from "lucide-react";

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "briefcase": return <Briefcase className="w-6 h-6" />;
    case "globe": return <Globe className="w-6 h-6" />;
    case "target": return <Target className="w-6 h-6" />;
    default: return <Target className="w-6 h-6" />;
  }
};

export default function StrategicMilestones() {
  const data = PORTFOLIO_CONTENT.academics.strategicMilestones;

  return (
    <section>
      <div className="mb-12 flex items-center gap-6">
        <div className="w-12 h-12 rounded-2xl bg-accent text-black font-bold flex items-center justify-center text-xl shrink-0">
          03
        </div>
        <div>
          <p className="text-sm font-bold tracking-widest text-muted-foreground uppercase mb-1">
            ACADEMIC BENCHMARKS (AGE 16)
          </p>
          <h2 className="text-4xl md:text-5xl font-bold font-heading">
            Strategic Milestones
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="p-8 bg-card/50 rounded-3xl border border-border/50 hover:border-accent/50 transition-colors flex flex-col h-full relative"
          >
            <div className="absolute top-8 right-8 px-3 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-wider border border-accent/20">
              {item.tag}
            </div>
            
            <div className="w-12 h-12 rounded-xl bg-background border border-border/50 flex items-center justify-center text-muted-foreground mb-8">
              {getIcon(item.icon)}
            </div>

            <div className="mt-auto">
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
