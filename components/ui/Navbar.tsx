"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "About", href: "/measm" },
  { name: "Work", href: "/projects" },
  { name: "Impact", href: "/impact" },
  { name: "Awards", href: "/awards" },
  { name: "Academics", href: "/academics" },
  { name: "Testimonials", href: "/#testimonials" },
  { name: "Contact", href: "/contact" }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border/50 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tighter">
          Measm<span className="text-accent">.</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive ? "text-accent" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <Link 
            href="/contact"
            className="px-5 py-2.5 bg-accent text-background rounded-full text-sm font-semibold hover:bg-accent-hover transition-colors"
          >
            Get in touch
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-4">
          <Link 
            href="/contact"
            className="px-4 py-2 bg-accent text-background rounded-full text-sm font-semibold hover:bg-accent-hover transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
