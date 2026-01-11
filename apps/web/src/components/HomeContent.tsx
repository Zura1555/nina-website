"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/ProjectCard";
import { BlogCard } from "@/components/BlogCard";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { imageConfig } from "@/config/images";
import type { ExtendedProject } from "@/components/ProjectCard";
import type { BlogPost } from "@/components/BlogCard";

interface HomeContentProps {
  featuredProjects: ExtendedProject[];
  latestPosts: (BlogPost & { _key?: string })[];
}

function getPostKey(post: BlogPost & { _key?: string }, index: number): string {
  // Check for Sanity _id first
  if ('_id' in post && post._id) {
    return post._id;
  }
  // Check for mock slug (string)
  if ('slug' in post && typeof post.slug === 'string') {
    return post.slug;
  }
  // Check for Sanity slug object
  if ('slug' in post && post.slug && typeof post.slug === 'object' && 'current' in post.slug) {
    return post.slug.current;
  }
  // Fallback to _key or index
  return post._key || `post-${index}`;
}

export function HomeContent({ featuredProjects, latestPosts }: HomeContentProps) {
  return (
    <>
      {/* Hero Section */}
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
                <span className="text-6xl md:text-7xl">{imageConfig.placeholders.profile}</span>
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

      {/* About Section */}
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
                Welcome to my corner of the internet! I&apos;m Nina, a curious soul
                navigating the beautiful chaos of life and career. By day, I&apos;m
                building my professional path; by night, I&apos;m reflecting on the
                lessons learned along the way.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                I believe in the power of sharing stories. Whether it&apos;s a triumph
                at work, a moment of vulnerability, or simply a random thought
                that struck me on a Tuesday afternoon—I find joy in putting words
                to experiences.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                When I&apos;m not writing, you&apos;ll find me exploring new coffee shops,
                diving into a good book, or planning my next adventure. This space
                is where I document it all—the wins, the lessons, and everything
                in between.
              </p>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Featured Projects */}
      <section className="py-20">
        <Container>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <div className="flex items-center justify-between mb-12">
              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold text-foreground"
              >
                Featured Projects
              </motion.h2>
              <motion.div variants={fadeInUp}>
                <Link href="/projects">
                  <Button variant="ghost">
                    View All
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-20 bg-muted/30">
        <Container>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <div className="flex items-center justify-between mb-12">
              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold text-foreground"
              >
                Latest from the Blog
              </motion.h2>
              <motion.div variants={fadeInUp}>
                <Link href="/blog">
                  <Button variant="ghost">
                    Read All Posts
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map((post, index) => (
                <BlogCard key={getPostKey(post, index)} post={post} index={index} />
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20">
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
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              Stay in the Loop
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-muted-foreground mb-8 max-w-md mx-auto"
            >
              Subscribe to get notified when I publish new articles. No spam,
              just good reads.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link href="/contact">
                <Button size="lg">
                  Get in Touch
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
