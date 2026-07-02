"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import MagneticButton from "@/components/ui/MagneticButton";
import { SPRING_GENTLE, EXPO_OUT } from "@/lib/animations";

const navLinks = [
  { name: "About", href: "/measm" },
  { name: "Work", href: "/projects" },
  { name: "Impact", href: "/impact" },
  { name: "Awards", href: "/awards" },
  { name: "Academics", href: "/academics" },
  { name: "Testimonials", href: "/#testimonials" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      // viewTransitionName anchors this element so it never slides during route transitions
      style={{ viewTransitionName: "site-header" } as React.CSSProperties}
      initial={prefersReducedMotion ? false : { y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EXPO_OUT, delay: 0.1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-background/80 backdrop-blur-md border-b border-border/50 py-4"
        : "bg-transparent py-6"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center group"
          transitionTypes={["nav-back"]}
        >
          <img
            src="/logo/wordmark-on-ink.png"
            alt="Measm."
            className="h-18 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href.split("#")[0]) && link.href.split("#")[0] !== "/";

            return (
              <Link
                key={link.name}
                href={link.href}
                transitionTypes={["nav-forward"]}
                className={`relative text-sm font-medium transition-colors group ${isActive
                  ? "text-accent"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {link.name}

                {/* Active sliding pill */}
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
                    transition={SPRING_GENTLE as object}
                  />
                )}

                {/* Hover underline draw (for non-active links) */}
                {!isActive && (
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-px bg-foreground/40 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
                  />
                )}
              </Link>
            );
          })}

          {/* CTA Button with magnetic pull */}
          <MagneticButton strength={0.25}>
            <Link
              href="/contact"
              transitionTypes={["nav-forward"]}
              className="px-5 py-2.5 bg-accent text-background rounded-full text-sm font-semibold hover:bg-accent-hover transition-colors block"
            >
              Get in touch
            </Link>
          </MagneticButton>
        </nav>

        {/* Mobile CTA */}
        <div className="md:hidden flex items-center gap-4">
          <Link
            href="/contact"
            transitionTypes={["nav-forward"]}
            className="px-4 py-2 bg-accent text-background rounded-full text-sm font-semibold hover:bg-accent-hover transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
