"use client";

import { motion, useReducedMotion, useInView, useScroll, useTransform } from "framer-motion";
import { PORTFOLIO_CONTENT } from "@/lib/content";
import { Quote, Star } from "lucide-react";
import { useRef } from "react";
import AnimatedText from "@/components/ui/AnimatedText";
import { CARD_STAGGER, CARD_ITEM, FADE_UP_VARIANTS, SCALE_ENTRANCE } from "@/lib/animations";

export default function Testimonials() {
  const { testimonials, testimonial, vision } = PORTFOLIO_CONTENT;
  const prefersReducedMotion = useReducedMotion();

  const gridRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const isGridInView = useInView(gridRef, { once: true, margin: "-60px" });

  // Subtle scroll parallax on featured testimonial quote
  const { scrollYProgress: quoteScrollY } = useScroll({
    target: featuredRef,
    offset: ["start end", "end start"],
  });
  const quoteScale = useTransform(quoteScrollY, [0, 0.5, 1], [0.96, 1, 0.96]);
  const quoteOpacity = useTransform(quoteScrollY, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="testimonials" className="py-32 px-6 md:px-12 lg:px-24 bg-background border-t border-border/50">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <motion.p
            variants={FADE_UP_VARIANTS}
            initial={prefersReducedMotion ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true }}
            className="text-sm font-bold tracking-widest text-muted-foreground uppercase mb-2"
          >
            VOICES
          </motion.p>
          <AnimatedText
            text="From Our Partners"
            as="h2"
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading"
            staggerDelay={0.06}
          />
        </div>

        {/* Testimonial Cards — stagger container */}
        <motion.div
          ref={gridRef}
          variants={CARD_STAGGER}
          initial={prefersReducedMotion ? "visible" : "hidden"}
          animate={isGridInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32"
        >
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              variants={CARD_ITEM}
              whileHover={prefersReducedMotion ? {} : { y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className="p-8 bg-card/50 rounded-3xl border border-border/50 hover:border-accent/50 transition-colors flex flex-col h-full"
            >
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, rotate: -10, scale: 0.8 }}
                whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, type: "spring", stiffness: 300, damping: 20 }}
              >
                <Quote className="w-10 h-10 text-muted-foreground/30 mb-6" />
              </motion.div>

              <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">
                &ldquo;{item.quote}&rdquo;
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex-shrink-0 overflow-hidden">
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
        </motion.div>

        {/* Featured Quote — scroll-driven scale parallax */}
        <div className="max-w-4xl mx-auto text-center border-t border-border/50 pt-24">
          <motion.div
            ref={featuredRef}
            style={prefersReducedMotion ? {} : { scale: quoteScale, opacity: quoteOpacity }}
            className="mb-24 relative"
          >
            <motion.div
              variants={SCALE_ENTRANCE}
              initial={prefersReducedMotion ? "visible" : "hidden"}
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Quote className="w-16 h-16 text-accent/20 mx-auto mb-8" />
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-heading leading-tight mb-8">
              &ldquo;{testimonial.quote}&rdquo;
            </h2>
            <p className="text-muted-foreground uppercase tracking-widest text-sm font-bold">
              — {testimonial.author}
            </p>
          </motion.div>

          <motion.div
            variants={FADE_UP_VARIANTS}
            initial={prefersReducedMotion ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true }}
            className="p-12 rounded-3xl bg-card border border-border/50"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-4">Vision & Mission</h3>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-4">
              {vision.statement}
            </p>
            <p className="text-accent font-medium">{vision.goal}</p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
