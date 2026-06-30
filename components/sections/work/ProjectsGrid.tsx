"use client";

import { motion } from "framer-motion";
import { PORTFOLIO_CONTENT } from "@/lib/content";
import Link from "next/link";
import { LayoutGrid } from "lucide-react";

export default function ProjectsGrid() {
  const { projects } = PORTFOLIO_CONTENT.work;

  return (
    <section>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-t border-border/50 pt-16">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-1 h-px bg-accent/50" />
            <p className="text-sm font-bold tracking-widest text-muted-foreground uppercase">
              SELECTED WORK
            </p>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold font-heading uppercase mb-4">
            What We<br/>Build
          </h2>
          <p className="text-lg text-muted-foreground">
            Modern solutions that drive growth and scale with you.
          </p>
        </div>
        
        <Link 
          href="#projects"
          className="inline-flex items-center gap-3 px-6 py-3 border border-border/50 hover:border-accent hover:text-accent rounded-full transition-colors font-bold text-sm uppercase tracking-wider"
        >
          VIEW ALL PROJECTS
          <LayoutGrid className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group flex flex-col h-[500px] rounded-3xl border border-border/50 hover:border-accent/50 transition-colors overflow-hidden bg-card/20 relative"
          >
            {/* Top portion - Project Info */}
            <div className="p-8 z-10 relative">
              <div className="inline-block px-3 py-1 rounded bg-blue-600 text-white text-[10px] font-bold tracking-widest uppercase mb-4">
                {project.tag}
              </div>
              <h3 className="text-3xl font-bold mb-2 uppercase tracking-tighter">{project.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {project.description}
              </p>
            </div>

            {/* Bottom portion - Faux Image Block matching screenshots */}
            <div className={`mt-auto h-1/2 w-full ${project.imageColor} relative overflow-hidden flex items-center justify-center p-6 border-t border-border/20`}>
               <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
               <div className="relative z-10 w-full h-full border-2 border-background/20 rounded-xl flex items-center justify-center text-center p-4 shadow-2xl backdrop-blur-sm">
                  <h4 className="text-xl md:text-2xl font-bold text-foreground/80 font-heading">
                    {project.imageText}
                  </h4>
               </div>
            </div>
            
          </motion.div>
        ))}
      </div>
    </section>
  );
}
