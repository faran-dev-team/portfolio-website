"use client";

import { motion } from "framer-motion";
import { PORTFOLIO_CONTENT } from "@/lib/content";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const { hero } = PORTFOLIO_CONTENT.home;

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-24 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-bold tracking-widest uppercase mb-8">
            <Sparkles className="w-4 h-4" />
            {hero.badge}
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading leading-[1.1] tracking-tight mb-4">
            {hero.title.split(' ').map((word, i, arr) => (
              <span key={i} className={i === arr.length - 1 || i === arr.length - 2 ? "text-foreground" : "text-foreground"}>
                {word}{" "}
              </span>
            ))}
          </h1>
          
          <h2 className="text-xl md:text-2xl text-accent font-medium mb-6">
            {hero.subtitle}
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-8">
            {hero.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-bold tracking-widest text-muted-foreground uppercase mb-12">
            {hero.tags.map((tag, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <span>{tag}</span>
                {idx !== hero.tags.length - 1 && <div className="w-1 h-1 rounded-full bg-border" />}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Link 
              href="/projects" 
              className="px-8 py-4 bg-accent hover:bg-accent/90 text-background font-bold rounded-full transition-colors flex items-center gap-2 text-sm uppercase tracking-wider"
            >
              {hero.primaryAction} →
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 bg-transparent border border-border hover:border-accent hover:text-accent font-bold rounded-full transition-colors text-sm uppercase tracking-wider"
            >
              {hero.secondaryAction}
            </Link>
          </div>
        </motion.div>

        {/* Right Content - Circular Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative z-10 hidden lg:flex justify-end"
        >
          <div className="relative w-[500px] h-[500px] rounded-full overflow-hidden border border-accent/20 bg-card/30 flex items-center justify-center">
            {/* We will use a placeholder element since we don't have the exact image file */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-transparent"></div>
            <div className="text-center p-8">
              <span className="text-muted-foreground/30 text-sm tracking-widest uppercase block mb-2">[Portrait Image Placeholder]</span>
              <p className="text-muted-foreground/50 text-xs">A circular image of the founder goes here.</p>
            </div>
            
            {/* Optional: Add glowing effects behind the circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent/5 blur-3xl -z-10 rounded-full"></div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
