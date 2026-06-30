"use client";

import { motion } from "framer-motion";
import { PORTFOLIO_CONTENT } from "@/lib/content";
import { Leaf, Monitor, GraduationCap, Globe } from "lucide-react";

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

  return (
    <section className="mb-32">
      <div className="mb-12">
        <p className="text-sm font-bold tracking-widest text-muted-foreground uppercase mb-2">
          02 / VERTICAL FOCUS
        </p>
        <h2 className="text-4xl md:text-5xl font-bold font-heading">
          Venture Areas
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="p-8 bg-card/50 rounded-3xl border border-border/50 hover:border-accent/50 transition-colors flex flex-col h-full"
          >
            <div className="w-12 h-12 rounded-xl bg-background border border-border/50 flex items-center justify-center text-muted-foreground mb-8 shrink-0">
              {getIcon(item.icon)}
            </div>

            <div className="mt-auto">
              <h3 className="text-lg font-bold mb-3">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
