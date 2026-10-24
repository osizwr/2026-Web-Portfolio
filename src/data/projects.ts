// Placeholder content — swap titles, copy, tags and links for real projects.
export type Project = {
  title: string;
  category: string;
  description: string;
  tags: string[];
  href: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Project One",
    category: "Web App",
    description:
      "Short description of what this project does and the problem it solves.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    href: "#",
    featured: true,
  },
  {
    title: "Project Two",
    category: "Dashboard",
    description:
      "Short description of what this project does and the problem it solves.",
    tags: ["React", "Node.js", "PostgreSQL"],
    href: "#",
    featured: true,
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

export const featuredProjects = projects.filter((project) => project.featured);
