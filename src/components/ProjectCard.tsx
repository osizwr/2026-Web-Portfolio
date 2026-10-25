import type { CSSProperties } from "react";
import { ChevronRight, Image as ImageIcon } from "lucide-react";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  /** Position in its list, used to stagger the entrance animation. */
  index?: number;
  /** Extra classes for the <li>, e.g. sizing inside a carousel. */
  className?: string;
  /** True for carousel clones: keeps them out of the tab order and off AT. */
  hidden?: boolean;
};

export default function ProjectCard({
  project,
  index = 0,
  className = "",
  hidden = false,
}: ProjectCardProps) {
  const { title, category, description, tags, href } = project;

  return (
    <li
      inert={hidden || undefined}
      aria-hidden={hidden || undefined}
      style={{ animationDelay: `${index * 60}ms` } as CSSProperties}
      className={`fill-mode-both fade-in slide-in-from-bottom-2 animation-duration-300 motion-safe:animate-in ${className}`}
    >
      <a
        href={href}
        className="group flex h-full flex-col bg-canvas-soft transition duration-200 hover:bg-background hover:ring-1 hover:ring-card-border motion-safe:hover:-translate-y-0.5"
      >
        <div className="flex aspect-video items-center justify-center bg-fog">
          <ImageIcon
            aria-hidden
            size={28}
            strokeWidth={1.5}
            className="text-ink-tertiary"
          />
        </div>

        <div className="flex flex-1 flex-col gap-2 p-5">
          <p className="type-ui text-ink-tertiary">{category}</p>
          <h3 className="type-title-md text-ink">{title}</h3>
          <p className="type-body text-ink-secondary">{description}</p>

          <ul className="flex flex-wrap gap-2 pt-1">
            {tags.map((tag) => (
              <li
                key={tag}
                className="type-caption rounded-xs bg-background px-2 py-0.5 text-ink-secondary"
              >
                {tag}
              </li>
            ))}
          </ul>

          <span className="type-body mt-auto inline-flex items-center gap-1 pt-3 text-link-blue">
            Learn More
            <ChevronRight aria-hidden size={14} />
          </span>
        </div>
      </a>
    </li>
  );
}
