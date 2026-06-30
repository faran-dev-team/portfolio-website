"use client";

import { motion } from "framer-motion";
import AwardsAndNominations from "@/components/sections/impact/AwardsAndNominations";
import GlobalPrograms from "@/components/sections/impact/GlobalPrograms";
import LeadershipAndService from "@/components/sections/impact/LeadershipAndService";

export default function ImpactPage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-1 h-px bg-accent/50" />
            <p className="text-sm font-bold tracking-widest text-muted-foreground uppercase">
              GLOBAL RECOGNITION & SERVICE
            </p>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold font-heading mb-6 tracking-tight leading-none uppercase">
            IMPACT.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium mb-16">
            Proof of responsibility.
          </p>
        </motion.div>

        <AwardsAndNominations />
        <GlobalPrograms />
        <LeadershipAndService />
        
      </div>
    </main>
  );
}
