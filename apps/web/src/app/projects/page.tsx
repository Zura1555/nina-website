import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ProjectCard";
import { getProjects } from "@/sanity/queries";
import type { ExtendedProject } from "@/components/ProjectCard";

export const metadata = {
  title: "Projects & Work",
  description: "A collection of projects, initiatives, and creative endeavors I've worked on.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <section className="py-16 md:py-24">
      <Container>
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Projects & Work
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A collection of projects, initiatives, and creative endeavors I&apos;ve
            worked on. Each one represents a piece of my journey and the lessons
            I&apos;ve learned along the way.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project._id} project={project as ExtendedProject} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
