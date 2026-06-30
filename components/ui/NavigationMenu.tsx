"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/measm" },
  { name: "Work", href: "/projects" },
  { name: "Impact", href: "/impact" },
  { name: "Awards", href: "/awards" },
  { name: "Academics", href: "/academics" },
  { name: "Testimonials", href: "/#testimonials" },
  { name: "Contact", href: "/contact" },
];

export default function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-background text-foreground flex flex-col justify-center items-center"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 md:top-12 md:right-12 p-2 hover:text-accent transition-colors"
            >
              <X className="w-10 h-10" />
            </button>

            <nav className="flex flex-col gap-6 md:gap-8 text-center">
              {links.map((link, idx) => (
                <div key={link.name} className="overflow-hidden">
                  <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-5xl md:text-7xl font-heading font-bold hover:text-accent transition-colors ${
                        pathname === link.href ? "text-accent" : ""
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
