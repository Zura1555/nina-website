"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardImage } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { fadeInUp } from "@/lib/animations";
import { urlFor } from "@/sanity/image";
import { imageConfig } from "@/config/images";

// Extended Project interface that supports both Sanity and legacy mock formats
export interface ExtendedProject {
  _id?: string;
  id?: string;
  _type?: string;
  title: string;
  slug?: { current: string };
  description: string;
  tags: string[];
  featured?: boolean;
  mainImage?: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
    };
    alt?: string;
  };
  image?: string;
  link?: string;
  github?: string;
  publishedAt?: string;
}

interface ProjectCardProps {
  project: ExtendedProject;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  // Support both Sanity image and legacy mock image
  const imageUrl = project.mainImage
    ? urlFor(project.mainImage).width(600).height(450).url()
    : project.image;

  // Generate href from link or slug
  const href = project.link || (project.slug ? `/projects/${project.slug.current}` : '#');

  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1 }}
    >
      <Card href={href}>
        {/* Project Image */}
        <div className="aspect-[4/3] bg-gradient-to-br from-primary-lighter to-muted flex items-center justify-center overflow-hidden">
          {imageUrl ? (
            <CardImage
              src={imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-4xl">{imageConfig.placeholders.project}</span>
          )}
        </div>

        <CardContent>
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
            {project.title}
            {project.link && (
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            )}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
