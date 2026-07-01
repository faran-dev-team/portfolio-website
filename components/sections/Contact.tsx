"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { PORTFOLIO_CONTENT } from "@/lib/content";
import Link from "next/link";
import {
  Mail, MessageCircle, Instagram, Calendar, Send, Sparkles,
  ChevronLeft, ChevronRight
} from "lucide-react";
import { useRef } from "react";
import AnimatedText from "@/components/ui/AnimatedText";
import TiltCard from "@/components/ui/TiltCard";
import MagneticButton from "@/components/ui/MagneticButton";
import { CARD_STAGGER, CARD_ITEM, FADE_UP_VARIANTS } from "@/lib/animations";

export default function Contact() {
  const { contact } = PORTFOLIO_CONTENT;
  const prefersReducedMotion = useReducedMotion();

  const cardsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const isCardsInView = useInView(cardsRef, { once: true, margin: "-60px" });
  const isFormInView = useInView(formRef, { once: true, margin: "-60px" });

  return (
    <section id="contact" className="py-32 px-6 md:px-12 lg:px-24 bg-background">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            variants={FADE_UP_VARIANTS}
            initial={prefersReducedMotion ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6 text-sm font-bold tracking-widest text-muted-foreground uppercase border-t border-b border-accent/20 py-1 px-4 text-accent"
          >
            GET IN TOUCH
          </motion.div>
          <AnimatedText
            text={contact.cta}
            as="h2"
            className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading mb-4 uppercase"
            staggerDelay={0.05}
          />
          <motion.p
            variants={FADE_UP_VARIANTS}
            initial={prefersReducedMotion ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true }}
            className="text-xl text-muted-foreground"
          >
            {contact.subtitle}
          </motion.p>
        </div>

        {/* Contact Method Cards */}
        <motion.div
          ref={cardsRef}
          variants={CARD_STAGGER}
          initial={prefersReducedMotion ? "visible" : "hidden"}
          animate={isCardsInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {[
            {
              icon: <Mail className="w-5 h-5" />,
              label: "EMAIL",
              value: contact.email,
              href: `mailto:${contact.email}`,
            },
            {
              icon: <MessageCircle className="w-5 h-5" />,
              label: "WHATSAPP",
              value: contact.whatsapp,
              href: `https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, "")}`,
            },
            {
              icon: <Instagram className="w-5 h-5" />,
              label: "INSTAGRAM",
              value: contact.instagram,
              href: `https://instagram.com/${contact.instagram.replace("@", "")}`,
            },
          ].map((item, idx) => (
            <motion.div key={idx} variants={CARD_ITEM}>
              <TiltCard
                maxTilt={8}
                hoverScale={1.02}
                glare
                className="p-8 bg-card/50 rounded-3xl border border-border/50 hover:border-accent/50 transition-colors flex flex-col h-full"
              >
                <div className="w-12 h-12 rounded-xl bg-background border border-border/50 flex items-center justify-center text-muted-foreground mb-8">
                  {item.icon}
                </div>
                <p className="text-sm font-bold tracking-widest text-muted-foreground uppercase mb-2">
                  {item.label}
                </p>
                <p className="text-lg font-bold mb-6 truncate">{item.value}</p>
                <Link
                  href={item.href}
                  className="mt-auto text-sm text-muted-foreground hover:text-accent transition-colors flex items-center gap-2 group"
                >
                  Connect Now
                  <span className="text-lg transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Message Form & Schedule Section */}
        <motion.div
          ref={formRef}
          variants={FADE_UP_VARIANTS}
          initial={prefersReducedMotion ? "visible" : "hidden"}
          animate={isFormInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Left Column (Schedule & Expectation) */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
              animate={isFormInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-8 bg-card/50 rounded-3xl border border-border/50"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-background border border-border/50 flex items-center justify-center text-muted-foreground">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold uppercase tracking-wider">SCHEDULE A CALL</h3>
                  <p className="text-sm text-muted-foreground">Pick your preferred date</p>
                </div>
              </div>

              {/* Mock Calendar Widget */}
              <div className="bg-background rounded-2xl p-4 border border-border/50">
                <div className="flex justify-between items-center mb-4 px-2">
                  <ChevronLeft className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
                  <span className="font-bold text-sm">June 2026</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
                </div>
                <div className="grid grid-cols-7 text-center text-xs mb-2 text-muted-foreground">
                  <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                </div>
                <div className="grid grid-cols-7 text-center text-sm gap-y-2">
                  <span className="text-muted-foreground/30">31</span>
                  <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span>
                  <span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span>
                  <span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span>
                  <span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span>
                  <span>28</span><span>29</span>
                  <span className="bg-accent/10 text-accent font-bold rounded-full w-7 h-7 flex items-center justify-center mx-auto ring-1 ring-accent/30">
                    30
                  </span>
                  <span className="text-muted-foreground/30">1</span>
                  <span className="text-muted-foreground/30">2</span>
                  <span className="text-muted-foreground/30">3</span>
                  <span className="text-muted-foreground/30">4</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
              animate={isFormInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 bg-card/50 rounded-3xl border border-border/50"
            >
              <div className="flex items-center gap-4 mb-4">
                <Sparkles className="w-5 h-5 text-accent" />
                <h3 className="font-bold uppercase tracking-wider">WHAT TO EXPECT</h3>
              </div>
              <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
                <li>30-minute consultation call</li>
              </ul>
            </motion.div>
          </div>

          {/* Right Column (Form) */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
            animate={isFormInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-2 p-8 md:p-12 bg-card/50 rounded-3xl border border-border/50 flex flex-col"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold uppercase tracking-wider mb-2">SEND A MESSAGE</h3>
              <p className="text-muted-foreground">Fill out the form below and I&apos;ll get back to you soon.</p>
            </div>

            <form className="flex flex-col gap-6 flex-grow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="bg-background border border-border/50 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors text-sm"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                    EMAIL *
                  </label>
                  <input
                    type="email"
                    placeholder="john@company.com"
                    className="bg-background border border-border/50 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                    COMPANY
                  </label>
                  <input
                    type="text"
                    placeholder="Your Company"
                    className="bg-background border border-border/50 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors text-sm"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                    PROJECT TYPE *
                  </label>
                  <select className="bg-background border border-border/50 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors text-sm appearance-none">
                    <option value="">Select type</option>
                    <option value="consulting">Consulting</option>
                    <option value="development">Development</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2 flex-grow">
                <label className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                  YOUR MESSAGE *
                </label>
                <textarea
                  placeholder="Tell me about your project, goals, and timeline..."
                  className="bg-background border border-border/50 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors text-sm resize-none h-full min-h-[150px]"
                />
              </div>

              {/* Submit — magnetic button with spring tap */}
              <MagneticButton strength={0.15} className="mt-4">
                <button
                  type="button"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors uppercase tracking-wider text-sm"
                >
                  <Send className="w-4 h-4" />
                  SEND MESSAGE →
                </button>
              </MagneticButton>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
