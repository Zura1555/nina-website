import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "personal-brand",
    title: "Personal Brand Redesign",
    description:
      "A complete overhaul of my online presence, including this website, social media profiles, and professional identity.",
    tags: ["Branding", "Design", "Strategy"],
    featured: true,
  },
  {
    id: "career-toolkit",
    title: "Career Growth Toolkit",
    description:
      "A collection of resources, templates, and guides I've created to help others navigate their career journey.",
    tags: ["Resources", "Career", "Templates"],
    featured: true,
  },
  {
    id: "writing-challenge",
    title: "30-Day Writing Challenge",
    description:
      "A personal project where I committed to writing every day for a month. The results surprised me.",
    tags: ["Writing", "Challenge", "Personal"],
    featured: true,
  },
  {
    id: "community-project",
    title: "Local Community Initiative",
    description:
      "Volunteering and helping organize events for my local community, bringing people together through shared experiences.",
    tags: ["Community", "Volunteer", "Events"],
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
