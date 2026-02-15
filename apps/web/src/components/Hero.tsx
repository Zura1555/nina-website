"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function Hero() {
  return (
    <section className="py-20 md:py-32 overflow-hidden">
      <Container>
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="flex flex-col md:flex-row items-center gap-12 md:gap-16"
        >
          {/* Profile Image */}
          <motion.div
            variants={fadeInUp}
            className="relative flex-shrink-0 order-1 md:order-2"
          >
            {/* Decorative ring */}
            <div className="absolute -inset-4 bg-gradient-to-br from-primary-lighter via-transparent to-primary-light rounded-full opacity-50 blur-xl" />

            {/* Profile circle placeholder */}
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-primary-lighter to-primary-light flex items-center justify-center overflow-hidden border-4 border-card shadow-lg">
              <span className="text-6xl md:text-7xl">👩</span>
            </div>
          </motion.div>

          {/* Content */}
          <div className="flex-1 text-center md:text-left order-2 md:order-1">
            <motion.p
              variants={fadeInUp}
              className="text-primary font-medium mb-4"
            >
              Hey there, I&apos;m
            </motion.p>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
            >
              Nina
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto md:mx-0 mb-8"
            >
              Writer, creative, and lifelong learner. I share stories about
              career growth, life lessons, and the adventures in between.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <Link href="/blog">
                <Button size="lg">
                  Read My Blog
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/projects">
                <Button variant="secondary" size="lg">
                  View Projects
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
