"use client";

import { motion } from "framer-motion";
import { PORTFOLIO_CONTENT } from "@/lib/content";
import { Trophy, Award } from "lucide-react";

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "trophy": return <Trophy className="w-5 h-5" />;
    case "award": return <Award className="w-5 h-5" />;
    default: return <Trophy className="w-5 h-5" />;
  }
};

export default function AwardsAndNominations() {
  const data = PORTFOLIO_CONTENT.impact.awardsAndNominations;

  return (
    <section className="mb-32">
      <div className="mb-12">
        <p className="text-sm font-bold tracking-widest text-muted-foreground uppercase mb-2">
          01 / RECOGNITION
        </p>
        <h2 className="text-4xl md:text-5xl font-bold font-heading">
          Awards & Nominations
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="p-8 md:p-12 bg-card/50 rounded-3xl border border-border/50 hover:border-accent/50 transition-colors flex flex-col h-full"
          >
            <div className="w-12 h-12 rounded-xl bg-background border border-border/50 flex items-center justify-center text-muted-foreground mb-8">
              {getIcon(item.icon)}
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 uppercase">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-auto flex flex-wrap gap-2">
              {item.tags.map((tag, i) => (
                <div key={i} className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider border border-accent/20">
                  {tag}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
