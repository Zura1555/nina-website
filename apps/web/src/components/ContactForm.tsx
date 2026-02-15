"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: "", email: "", message: "" });
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-primary-lighter rounded-xl p-8 text-center"
      >
        <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Message Sent!
        </h3>
        <p className="text-muted-foreground mb-4">
          Thanks for reaching out. I&apos;ll get back to you soon.
        </p>
        <Button variant="secondary" onClick={() => setIsSuccess(false)}>
          Send Another Message
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial="initial"
      animate="animate"
      variants={staggerContainer}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <motion.div variants={fadeInUp}>
        <Input
          label="Name"
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Textarea
          label="Message"
          name="message"
          placeholder="Tell me about your project, question, or just say hi..."
          rows={6}
          value={formData.message}
          onChange={handleChange}
          required
        />
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Button type="submit" size="lg" isLoading={isSubmitting} className="w-full sm:w-auto">
          <Send className="w-4 h-4 mr-2" />
          Send Message
        </Button>
      </motion.div>
    </motion.form>
  );
}
