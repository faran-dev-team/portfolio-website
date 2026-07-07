"use client";

import { motion } from "framer-motion";
import { PORTFOLIO_CONTENT } from "@/lib/content";
import { Globe, Users, Rocket, Trophy } from "lucide-react";

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "globe": return <Globe className="w-6 h-6" />;
    case "users": return <Users className="w-6 h-6" />;
    case "rocket": return <Rocket className="w-6 h-6" />;
    case "trophy": return <Trophy className="w-6 h-6" />;
    default: return <Globe className="w-6 h-6" />;
  }
};

export default function MeasmPage() {
  const { about } = PORTFOLIO_CONTENT;

  return (
    <main className="min-h-screen pt-32 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24"
        >
          <h1 className="text-6xl md:text-8xl font-bold font-heading mb-6 tracking-tight leading-none uppercase">
            {about.title}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium mb-16">
            {about.subtitle}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left Column - Text */}
            <div className="space-y-8">
              {about.paragraphs.map((paragraph, idx) => (
                <p key={idx} className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Right Column - Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {about.stats.map((stat, idx) => (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-8 bg-card/50 rounded-3xl border border-border/50 flex flex-col items-center justify-center text-center hover:border-accent/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-background border border-border/50 flex items-center justify-center text-muted-foreground mb-6">
                    {getIcon(stat.icon)}
                  </div>
                  <div className="text-4xl font-bold mb-2 tracking-tighter">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground tracking-wider uppercase font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
            
          </div>
        </motion.div>

        {/* Secondary Stats Strip (From screenshot 3) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 pt-16 border-t border-border/50"
        >
          <h2 className="text-3xl md:text-4xl text-accent font-heading mb-6">
            {about.secondaryStats.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mb-16 leading-relaxed">
            {about.secondaryStats.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {about.secondaryStats.stats.map((stat, idx) => (
              <div key={idx}>
                <div className="text-5xl md:text-7xl font-bold font-heading mb-4 tracking-tighter">
                  {stat.value}
                </div>
                <div className="text-sm font-bold tracking-widest text-muted-foreground uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </main>
  );
}
