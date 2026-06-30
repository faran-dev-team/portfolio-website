"use client";

import { motion } from "framer-motion";
import { PORTFOLIO_CONTENT } from "@/lib/content";
import { Heart, Handshake, Mic } from "lucide-react";

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

  return (
    <section className="mb-32">
      <div className="mb-12">
        <p className="text-sm font-bold tracking-widest text-muted-foreground uppercase mb-2">
          03 / GLOBAL CITIZENSHIP
        </p>
        <h2 className="text-4xl md:text-5xl font-bold font-heading">
          Leadership & Service
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="p-8 bg-card/50 rounded-3xl border border-border/50 hover:border-accent/50 transition-colors flex flex-col h-full"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-background border border-border/50 flex items-center justify-center text-muted-foreground shrink-0">
                {getIcon(item.icon)}
              </div>
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
          </motion.div>
        ))}
      </div>
    </section>
  );
}
