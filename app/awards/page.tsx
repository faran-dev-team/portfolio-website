"use client";

import { motion } from "framer-motion";
import MajorAwards from "@/components/sections/awards/MajorAwards";
import InternationalRecognition from "@/components/sections/awards/InternationalRecognition";
import GlobalService from "@/components/sections/awards/GlobalService";
import Testimonials from "@/components/sections/Testimonials";

export default function AwardsPage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-24">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold font-heading mb-16"
        >
          Recognition.
        </motion.h1>
        
        <div className="flex flex-col gap-32">
          <MajorAwards />
          <InternationalRecognition />
          <GlobalService />
        </div>
      </div>
      
      <Testimonials />
    </main>
  );
}
