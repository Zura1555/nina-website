"use client";

import { motion } from "framer-motion";
import { Instagram, Linkedin, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/ContactForm";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: Instagram,
    username: "@nina",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: Linkedin,
    username: "Nina",
  },
];

export default function ContactPage() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="mb-12 md:mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a question, want to collaborate, or just want to say hi?
              I&apos;d love to hear from you. Fill out the form below or reach out
              through social media.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Form */}
            <motion.div variants={fadeInUp} className="lg:col-span-3">
              <div className="bg-card rounded-2xl border border-card-border p-6 md:p-8">
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  Send a Message
                </h2>
                <ContactForm />
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={fadeInUp} className="lg:col-span-2 space-y-8">
              {/* Email */}
              <div className="bg-card rounded-2xl border border-card-border p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary-lighter flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <p className="text-sm text-muted-foreground">
                      Preferred for inquiries
                    </p>
                  </div>
                </div>
                <a
                  href="mailto:hello@nina.com"
                  className="text-primary hover:underline"
                >
                  hello@nina.com
                </a>
              </div>

              {/* Social Links */}
              <div className="bg-card rounded-2xl border border-card-border p-6">
                <h3 className="font-semibold text-foreground mb-4">
                  Follow Me
                </h3>
                <div className="space-y-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary-lighter transition-colors">
                        <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {social.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {social.username}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-primary-lighter rounded-2xl p-6">
                <p className="text-sm text-primary">
                  <strong>Quick Response:</strong> I typically respond within
                  24-48 hours. For urgent matters, please reach out via social
                  media.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
