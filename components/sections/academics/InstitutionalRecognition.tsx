"use client";

import { motion } from "framer-motion";
import { PORTFOLIO_CONTENT } from "@/lib/content";
import { GraduationCap, BookOpen, Shield } from "lucide-react";

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "graduationCap": return <GraduationCap className="w-6 h-6" />;
    case "bookOpen": return <BookOpen className="w-6 h-6" />;
    case "shield": return <Shield className="w-6 h-6" />;
    default: return <BookOpen className="w-6 h-6" />;
  }
};

export default function InstitutionalRecognition() {
  const data = PORTFOLIO_CONTENT.academics.institutionalRecognition;

  return (
    <section>
      <div className="mb-12">
        <p className="text-sm font-bold tracking-widest text-muted-foreground uppercase mb-2">
          01 / EDUCATION & HONORS
        </p>
        <h2 className="text-4xl md:text-5xl font-bold font-heading">
          Institutional Recognition
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="p-8 bg-card/50 rounded-3xl border border-border/50 hover:border-accent/50 transition-colors relative flex flex-col h-full"
          >
            <div className="absolute top-8 right-8 w-8 h-8 rounded-full bg-background flex items-center justify-center text-sm font-bold">
              {item.id}
            </div>
            
            <div className="w-14 h-14 rounded-2xl bg-background border border-border/50 flex items-center justify-center text-muted-foreground mb-8">
              {getIcon(item.icon)}
            </div>

            <div className="mt-auto">
              {item.tag1 && (
                <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider mb-4 border border-accent/20">
                  {item.tag1}
                </div>
              )}
              <h3 className="text-2xl font-bold mb-3 uppercase">{item.title}</h3>
              {item.description && (
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {item.description}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
