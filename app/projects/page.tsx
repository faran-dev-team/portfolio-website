"use client";

import { motion } from "framer-motion";
import StrategicEcosystem from "@/components/sections/work/StrategicEcosystem";
import VentureAreas from "@/components/sections/work/VentureAreas";
import OperatingModel from "@/components/sections/work/OperatingModel";
import ProjectsGrid from "@/components/sections/work/ProjectsGrid";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <StrategicEcosystem />
          <VentureAreas />
          <OperatingModel />
          <ProjectsGrid />
        </motion.div>
      </div>
    </main>
  );
}
