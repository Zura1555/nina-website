"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, Command } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Kbd } from "@/components/ui/Kbd";
import { CommandPalette } from "@/components/CommandPalette";
import { useCommandPalette } from "@/hooks/useCommandPalette";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isOpen: isCommandOpen, setIsOpen: setCommandOpen } = useCommandPalette();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md border-b border-border/50" />
      <Container className="relative">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-semibold text-foreground hover:text-primary transition-colors"
          >
            Nina
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Search/Command Palette Trigger */}
            <button
              onClick={() => setCommandOpen(true)}
              className={cn(
                "hidden md:flex items-center gap-2 px-3 py-1.5",
                "bg-muted hover:bg-muted/80 rounded-lg",
                "text-muted-foreground text-sm transition-colors",
                "border border-border"
              )}
              aria-label="Open command palette"
            >
              <Search className="w-4 h-4" />
              <span className="text-muted-foreground/70">Search...</span>
              <div className="flex items-center gap-1 ml-2">
                <Kbd className="px-1.5 py-0 text-xs">⌘</Kbd>
                <Kbd className="px-1.5 py-0 text-xs">K</Kbd>
              </div>
            </button>

            <ThemeToggle />

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-muted hover:bg-primary-lighter transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </nav>
      </Container>

      {/* Command Palette */}
      <CommandPalette open={isCommandOpen} onOpenChange={setCommandOpen} />

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/60 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-card border-l border-border shadow-lg md:hidden"
            >
              <div className="flex flex-col h-full pt-20 px-6">
                <motion.nav
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex flex-col gap-2"
                >
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block py-3 px-4 rounded-lg text-lg font-medium text-foreground hover:bg-muted transition-colors"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </motion.nav>

                {/* Social links in mobile menu */}
                <div className="mt-auto pb-8">
                  <p className="text-sm text-muted-foreground mb-4">
                    Follow me
                  </p>
                  <div className="flex gap-4">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      Instagram
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
