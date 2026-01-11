"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function About() {
  return (
    <section className="py-20 bg-muted/30">
      <Container size="narrow">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold text-foreground mb-8"
          >
            About Me
          </motion.h2>

          <motion.div
            variants={fadeInUp}
            className="prose prose-lg mx-auto text-left"
          >
            <p className="text-muted-foreground leading-relaxed">
              Welcome to my corner of the internet! I'm Nina, a curious soul
              navigating the beautiful chaos of life and career. By day, I'm
              building my professional path; by night, I'm reflecting on the
              lessons learned along the way.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              I believe in the power of sharing stories. Whether it's a triumph
              at work, a moment of vulnerability, or simply a random thought
              that struck me on a Tuesday afternoon—I find joy in putting words
              to experiences.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              When I'm not writing, you'll find me exploring new coffee shops,
              diving into a good book, or planning my next adventure. This space
              is where I document it all—the wins, the lessons, and everything
              in between.
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
