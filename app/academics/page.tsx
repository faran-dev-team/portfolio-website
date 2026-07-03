"use client";

import { motion } from "framer-motion";
import InstitutionalRecognition from "@/components/sections/academics/InstitutionalRecognition";
import InnovationVentures from "@/components/sections/academics/InnovationVentures";
import StrategicMilestones from "@/components/sections/academics/StrategicMilestones";
import DeepExpertise from "@/components/sections/academics/DeepExpertise";
import ExcellenceInEducation from "@/components/sections/academics/ExcellenceInEducation";
import { Trophy } from "lucide-react";

export default function AcademicsPage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20">
              <Trophy className="w-5 h-5 text-accent" />
            </div>
            <p className="text-sm font-bold tracking-widest text-muted-foreground uppercase">
              Academic & Global Leadership
            </p>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading mb-8 leading-tight">
            ACADEMIC<br />EXCELLENCE
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
            High-achieving profile (4.0 GPA) focused on the intersection of AI,
            entrepreneurship, and global policy.
          </p>
        </motion.div>

        <div className="flex flex-col gap-32">
          <InstitutionalRecognition />
          <InnovationVentures />
          <StrategicMilestones />
          <DeepExpertise />
          <ExcellenceInEducation />
        </div>
      </div>
    </main>
  );
}
