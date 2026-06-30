"use client";

import { motion } from "framer-motion";
import { PORTFOLIO_CONTENT } from "@/lib/content";
import { Quote, Star } from "lucide-react";
import Image from "next/image";

export default function Testimonials() {
  const { testimonials, testimonial, vision } = PORTFOLIO_CONTENT;

  return (
    <section id="testimonials" className="py-32 px-6 md:px-12 lg:px-24 bg-background border-t border-border/50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-sm font-bold tracking-widest text-muted-foreground uppercase mb-2">
            VOICES
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading">
            From Our Partners
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 bg-card/50 rounded-3xl border border-border/50 hover:border-accent/50 transition-colors flex flex-col h-full"
            >
              <Quote className="w-10 h-10 text-muted-foreground/30 mb-6" />
              
              <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">
                "{item.quote}"
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex-shrink-0 overflow-hidden relative">
                  {/* Using a placeholder since no images were provided, but creating the container for it */}
                  <div className="w-full h-full bg-accent/30 flex items-center justify-center text-accent font-bold">
                    {item.author.charAt(0)}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-sm">{item.author}</h4>
                  <p className="text-muted-foreground text-xs">{item.role}</p>
                  <div className="flex gap-1 mt-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Keeping the original vision/mission section at the bottom as it's part of the original design context */}
        <div className="max-w-4xl mx-auto text-center border-t border-border/50 pt-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-24 relative"
          >
            <Quote className="w-16 h-16 text-accent/20 mx-auto mb-8" />
            <h2 className="text-3xl md:text-5xl font-heading leading-tight mb-8">
              &ldquo;{testimonial.quote}&rdquo;
            </h2>
            <p className="text-muted-foreground uppercase tracking-widest text-sm font-bold">
              — {testimonial.author}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="p-12 rounded-3xl bg-card border border-border/50"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-4">Vision & Mission</h3>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-4">
              {vision.statement}
            </p>
            <p className="text-accent font-medium">
              {vision.goal}
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
