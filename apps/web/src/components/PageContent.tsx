"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { imageConfig } from "@/config/images";
import { urlFor } from "@/sanity/image";
import type { Page, PageSection } from "@/types/sanity";
import { PortableText } from "@portabletext/react";

interface PageContentProps {
  page: Page;
}

type HeroSectionData = Extract<PageSection, { _type: "hero" }>;
type TextImageSectionData = Extract<PageSection, { _type: "textImage" }> & { caption?: string };
type TextSectionData = Extract<PageSection, { _type: "text" }>;
type ImageSectionData = Extract<PageSection, { _type: "image" }>;
type CTASectionData = Extract<PageSection, { _type: "cta" }>;

export function PageContent({ page }: PageContentProps) {
  const sections = page.sections || [];

  return (
    <>
      {/* Page Icon & Title */}
      <section className="py-8 md:py-16 lg:py-20 px-4">
        <Container>
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="text-center"
          >
            {page.icon && (
              <motion.span
                variants={fadeInUp}
                className="text-5xl md:text-6xl lg:text-7xl mb-4 md:mb-6 block"
              >
                {page.icon}
              </motion.span>
            )}
            <motion.h1
              variants={fadeInUp}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground"
            >
              {page.title}
            </motion.h1>
          </motion.div>
        </Container>
      </section>

      {/* Page Sections */}
      {sections.map((section) => {
        switch (section._type) {
          case "hero":
            return <HeroSection key={section._key} section={section} />;
          case "textImage":
            return <TextImageSection key={section._key} section={section} />;
          case "text":
            return <TextSection key={section._key} section={section} />;
          case "image":
            return <ImageSection key={section._key} section={section} />;
          case "cta":
            return <CTASection key={section._key} section={section} />;
          default:
            return null;
        }
      })}
    </>
  );
}

function HeroSection({ section }: { section: HeroSectionData }) {
  return (
    <section className="py-8 md:py-12 lg:py-16 px-4 overflow-hidden">
      <Container>
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16"
        >
          {/* Icon/Image */}
          <motion.div
            variants={fadeInUp}
            className="relative flex-shrink-0 order-1 md:order-2"
          >
            <div className="absolute -inset-3 md:-inset-4 bg-gradient-to-br from-primary-lighter via-transparent to-primary-light rounded-full opacity-50 blur-xl" />
            <div className="relative w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-full bg-gradient-to-br from-primary-lighter to-primary-light flex items-center justify-center overflow-hidden border-4 border-card shadow-lg">
              {section.icon ? (
                <span className="text-4xl md:text-5xl lg:text-6xl">{section.icon}</span>
              ) : (
                <span className="text-4xl md:text-5xl lg:text-6xl">{imageConfig.placeholders.profile}</span>
              )}
            </div>
          </motion.div>

          {/* Content */}
          <div className="flex-1 text-center md:text-left order-2 md:order-1">
            {section.tagline && (
              <motion.p variants={fadeInUp} className="text-primary font-medium mb-3 md:mb-4">
                {section.tagline}
              </motion.p>
            )}
            <motion.h1
              variants={fadeInUp}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6"
            >
              {section.heading}
            </motion.h1>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

function TextImageSection({ section }: { section: TextImageSectionData }) {
  const { layout = "imageLeft" } = section;
  const imageUrl = section.image ? urlFor(section.image).width(800).height(600).url() : null;

  // Skip rendering image if layout is textOnly
  if (layout === "textOnly") {
    return (
      <section className="py-8 md:py-12 bg-muted/30 px-4">
        <Container size="narrow">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {section.heading && (
              <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                {section.heading}
              </motion.h2>
            )}
            {section.body && (
              <motion.div variants={fadeInUp} className="prose prose-lg mx-auto">
                <PortableText value={section.body} />
              </motion.div>
            )}
          </motion.div>
        </Container>
      </section>
    );
  }

  // Skip rendering text if layout is imageOnly
  if (layout === "imageOnly") {
    return (
      <section className="py-8 md:py-12 px-4">
        <Container>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="flex justify-center"
          >
            <motion.div variants={fadeInUp} className="relative w-full max-w-2xl md:max-w-4xl">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={section.imageAlt || section.heading || ""}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              )}
              {section.caption && (
                <p className="text-sm text-muted-foreground mt-3 text-center">{section.caption}</p>
              )}
            </motion.div>
          </motion.div>
        </Container>
      </section>
    );
  }

  // Image Left or Image Right layout
  const isImageLeft = layout === "imageLeft";

  return (
    <section className="py-8 md:py-12 bg-muted/30 px-4">
      <Container>
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className={`flex flex-col ${isImageLeft ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8 md:gap-12`}
        >
          {/* Image */}
          <motion.div variants={fadeInUp} className="flex-1 w-full">
            {imageUrl && (
              <img
                src={imageUrl}
                alt={section.imageAlt || section.heading || ""}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            )}
            {section.caption && !section.body && (
              <p className="text-sm text-muted-foreground mt-3">{section.caption}</p>
            )}
          </motion.div>

          {/* Text */}
          <motion.div variants={fadeInUp} className="flex-1">
            {section.heading && (
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 md:mb-6">
                {section.heading}
              </h2>
            )}
            {section.body && (
              <div className="prose prose-lg">
                <PortableText value={section.body} />
              </div>
            )}
            {section.caption && section.body && (
              <p className="text-sm text-muted-foreground mt-4">{section.caption}</p>
            )}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

function TextSection({ section }: { section: TextSectionData }) {
  return (
    <section className="py-8 md:py-12 px-4">
      <Container size="narrow">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          {section.heading && (
            <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              {section.heading}
            </motion.h2>
          )}
          {section.body && (
            <motion.div variants={fadeInUp} className="prose prose-lg mx-auto">
              <PortableText value={section.body} />
            </motion.div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}

function ImageSection({ section }: { section: ImageSectionData }) {
  const imageUrl = section.image ? urlFor(section.image).width(1200).height(800).url() : null;

  return (
    <section className="py-8 md:py-12 px-4">
      <Container>
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="flex justify-center"
        >
          <motion.div variants={fadeInUp} className="relative w-full max-w-2xl md:max-w-4xl">
            {imageUrl && (
              <img
                src={imageUrl}
                alt={section.imageAlt || section.caption || ""}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            )}
            {section.caption && (
              <p className="text-sm text-muted-foreground mt-3 text-center">{section.caption}</p>
            )}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

function CTASection({ section }: { section: CTASectionData }) {
  return (
    <section className="py-12 md:py-16 px-4">
      <Container size="narrow">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="text-center"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-2xl md:text-3xl font-bold text-foreground mb-3 md:mb-4"
          >
            {section.heading || "Get Started"}
          </motion.h2>
          {section.description && (
            <motion.p variants={fadeInUp} className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-md mx-auto">
              {section.description}
            </motion.p>
          )}
          {section.buttonText && (
            <motion.div variants={fadeInUp}>
              <Link href={section.buttonUrl || "/contact"}>
                <Button size="lg">
                  {section.buttonText}
                  <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                </Button>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
