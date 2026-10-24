import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="type-heading text-ink">Projects</h2>

      <ul className="grid gap-4 sm:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </ul>
    </div>
  );
}
