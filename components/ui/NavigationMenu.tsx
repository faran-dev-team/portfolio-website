"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { EXPO_OUT } from "@/lib/animations";

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/measm" },
  { name: "Impact", href: "/impact" },
  { name: "Awards", href: "/awards" },
  { name: "Academics", href: "/academics" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 p-6 md:p-12 flex justify-between items-center mix-blend-difference text-white">
        <Link href="/" className="text-2xl font-bold tracking-tighter">
          Measm<span className="text-accent">.</span>
        </Link>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 hover:opacity-80 transition-opacity"
          aria-label="Open Menu"
        >
          <Menu className="w-8 h-8" />
        </button>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EXPO_OUT }}
            className="fixed inset-0 z-[60] bg-background text-foreground flex flex-col justify-center items-center"
          >
            {/* Close button */}
            <motion.button
              onClick={() => setIsOpen(false)}
              initial={prefersReducedMotion ? false : { opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.4, ease: EXPO_OUT }}
              className="absolute top-6 right-6 md:top-12 md:right-12 p-2 hover:text-accent transition-colors"
            >
              <X className="w-10 h-10" />
            </motion.button>

            {/* Background accent blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/3 blur-[100px]" />
            </div>

            {/* Nav Links */}
            <nav className="flex flex-col gap-2 md:gap-4 text-center relative z-10" aria-label="Full screen navigation">
              {links.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <div key={link.name} className="overflow-hidden">
                    <motion.div
                      initial={prefersReducedMotion ? false : { y: "110%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      transition={{
                        delay: 0.15 + idx * 0.07,
                        duration: 0.65,
                        ease: EXPO_OUT,
                      }}
                    >
                      <Link
                        href={link.href}
                        transitionTypes={["nav-forward"]}
                        onClick={() => setIsOpen(false)}
                        className={`group relative text-5xl md:text-7xl font-heading font-bold transition-colors block leading-tight py-1 ${
                          isActive ? "text-accent" : "hover:text-accent"
                        }`}
                      >
                        {/* Hover: underline draw */}
                        <span className="relative inline-block">
                          {link.name}
                          {!isActive && (
                            <span
                              className="absolute -bottom-1 left-0 right-0 h-1 bg-accent/40 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"
                              style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
                            />
                          )}
                        </span>
                      </Link>
                    </motion.div>
                  </div>
                );
              })}
            </nav>

            {/* Footer row */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5, ease: EXPO_OUT }}
              className="absolute bottom-8 left-0 right-0 px-12 flex justify-between text-muted-foreground text-xs tracking-widest uppercase"
            >
              <span>© 2026 Measm.</span>
              <span>Climate-Tech · Global Impact</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
