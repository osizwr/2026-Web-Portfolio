import type { CSSProperties } from "react";
import { ChevronRight, Image as ImageIcon } from "lucide-react";

// Placeholder content — swap titles, copy, tags and links for real projects.
const projects = [
  {
    title: "Project One",
    category: "Web App",
    description:
      "Short description of what this project does and the problem it solves.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    href: "#",
  },
  {
    title: "Project Two",
    category: "Dashboard",
    description:
      "Short description of what this project does and the problem it solves.",
    tags: ["React", "Node.js", "PostgreSQL"],
    href: "#",
  },
  {
    title: "Project Three",
    category: "Website",
    description:
      "Short description of what this project does and the problem it solves.",
    tags: ["Laravel", "PHP", "MySQL"],
    href: "#",
  },
  {
    title: "Project Four",
    category: "Automation",
    description:
      "Short description of what this project does and the problem it solves.",
    tags: ["Python", "Django", "Vercel"],
    href: "#",
  },
];

export default function Projects() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="type-heading text-ink">Projects</h2>

      <ul className="grid gap-4 sm:grid-cols-2">
        {projects.map(({ title, category, description, tags, href }, index) => (
          <li
            key={title}
            style={{ animationDelay: `${index * 60}ms` } as CSSProperties}
            className="fill-mode-both fade-in slide-in-from-bottom-2 animation-duration-300 motion-safe:animate-in"
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
        ))}
      </ul>
    </div>
  );
}
