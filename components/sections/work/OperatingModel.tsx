"use client";

import { motion } from "framer-motion";
import { PORTFOLIO_CONTENT } from "@/lib/content";
import { Wifi, Users, Settings } from "lucide-react";

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

  return (
    <section className="mb-32">
      
      {/* Top Framework Section */}
      <div className="mb-16">
        <div className="mb-12">
          <p className="text-sm font-bold tracking-widest text-muted-foreground uppercase mb-2">
            03 / PROCESS
          </p>
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            How Ventures Are Built
          </h2>
          <p className="text-lg text-muted-foreground">
            Our process is designed to turn high-impact theories into sustainable, market-ready realities through three foundational layers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {framework.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 bg-card/50 rounded-3xl border border-border/50 hover:border-accent/50 transition-colors flex flex-col h-full relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 text-7xl font-bold font-heading text-background/10 group-hover:text-accent/5 transition-colors -z-10 pointer-events-none select-none">
                {item.id}
              </div>
              
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Process Section */}
      <div>
        <div className="mb-12">
          <p className="text-sm font-bold tracking-widest text-muted-foreground uppercase mb-2">
            04 / FRAMEWORK
          </p>
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            Operating Model
          </h2>
          <p className="text-lg text-muted-foreground">
            A framework for repeatable success across borders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {process.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 bg-card/50 rounded-3xl border border-border/50 hover:border-accent/50 transition-colors flex items-start gap-6 h-full"
            >
              <div className="w-12 h-12 rounded-xl bg-background border border-border/50 flex items-center justify-center text-muted-foreground shrink-0">
                {getIcon(item.icon)}
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
